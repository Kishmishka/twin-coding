import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import User from './entity/User.ts';
import State from './entity/State.ts';
import Collection from './entity/Collection.ts';
import TextCursor from './entity/TextCursor.ts';
import DataBase from './DataBase.ts';
import OnlineRoomStorage from './entity/OnlineRoomStorage.ts';
import URLS from './constants/URLS.ts';
import COLORS from './constants/COLORS.ts';
import COLORS_TEXT_CURSORS from './constants/COLORS_TEXT_CURSORS.ts';
import {
    IClientValueСhangedData,
    ILaguage,
    IPositionCursor,
    IPositionTextCursor,
    IRoomParams,
    ITextCursor,
    IUser,
} from './interfaces.ts';

const app = express();
app.use(cors({ origin: '*' }));
const server = http.createServer(app);

const languageValue = new State('Java script');
const textCursors = new Collection();
const db = new DataBase();

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on(URLS.connection, (socket) => {
    console.log('connection established');

    socket.on(URLS.joinNewRoom, () => {
        db.createRoom().then((roomParams) => {
            const room = String(roomParams.id);

            OnlineRoomStorage.initializationRoom(room, '', [], [5, 4, 3, 2, 1]);

            const newUser = new User();
            newUser.seat = OnlineRoomStorage.takeSeat(room);
            newUser.color = COLORS[newUser.seat];
            newUser.room = room;
            OnlineRoomStorage.addUser(room, newUser);

            const newTextCursor = new TextCursor(socket.id);
            newTextCursor.className = COLORS_TEXT_CURSORS[newUser.seat];
            textCursors.add(newTextCursor);

            socket.join(room);

            OnlineRoomStorage.setEditorContent(room, roomParams.editorContent);
            languageValue.set(roomParams.language);

            socket.emit(URLS.auth, {
                id: newUser.id,
                name: newUser.name,
                room: room,
                color: newUser.color,
                editorValue: OnlineRoomStorage.getEditorContent(room),
                language: languageValue.get(),
                users: OnlineRoomStorage.getUsers(room),
            });
            console.log(`${newUser.name} connect room:${room}`);
        });
    });

    socket.on(URLS.joinExistingRoom, (room: string) => {
        OnlineRoomStorage.initializationRoom(
            room,
            OnlineRoomStorage.getEditorContent(room),
            OnlineRoomStorage.getUsers(room),
            OnlineRoomStorage.getEmptySeats(room),
        );
        if (OnlineRoomStorage.getEmptySeats(room).length > 0) {
            const params: Promise<IRoomParams> = db.getRoomParams(Number(room));
            params.then(() => {
                const newUser = new User();
                newUser.seat = OnlineRoomStorage.takeSeat(room);
                newUser.color = COLORS[newUser.seat];
                newUser.room = room;

                OnlineRoomStorage.addUser(room, newUser);

                const newTextCursor = new TextCursor(socket.id);
                newTextCursor.className = COLORS_TEXT_CURSORS[newUser.seat];
                textCursors.add(newTextCursor);

                socket.join(room);

                socket.emit(URLS.auth, {
                    id: newUser.id,
                    name: newUser.name,
                    room: room,
                    color: newUser.color,
                    editorValue: OnlineRoomStorage.getEditorContent(room),
                    language: languageValue.get(),
                    users: OnlineRoomStorage.getUsers(room),
                });
                console.log(`${newUser.name} connect room:${room}`);
            });
        }
    });

    let lastRequestTime = 0;

    socket.on(URLS.clientValueСhanged, (params: IClientValueСhangedData) => {
        OnlineRoomStorage.setEditorContent(params.room, params.data);

        const currentTime = Date.now();

        if (currentTime - lastRequestTime > 100) {
            socket
                .to(params.room)
                .emit(URLS.serverValue, OnlineRoomStorage.getEditorContent(params.room));
            lastRequestTime = currentTime;
        }
    });

    socket.on(URLS.languageChange, (response: ILaguage) => {
        languageValue.set(response.language);
        socket.to(response.room).emit(URLS.serverLanguage, languageValue.get());
    });

    socket.on(URLS.newUserConnect, (response: IUser[]) => {
        socket
            .to(response[0].room)
            .emit(URLS.newUsersArray, OnlineRoomStorage.getUsers(response[0].room));
    });

    socket.on(URLS.positionCursorChange, (params: IPositionCursor) => {
        for (let user of OnlineRoomStorage.getUsers(params.room)) {
            if (user.id === params.id) {
                user.cursorX = params.X;
                user.cursorY = params.Y;
            }
        }
        socket.to(params.room).emit(URLS.serverCursors, OnlineRoomStorage.getUsers(params.room));
    });

    socket.on(URLS.positionTextCursorChange, (params: IPositionTextCursor) => {
        for (let textCursor of textCursors.values) {
            if (textCursor.id === params.id) {
                textCursor.startRow = params.row;
                textCursor.startCol = params.column;
                textCursor.endCol = params.column + 1;
                textCursor.endRow = params.row;
            }
        }

        socket.to(params.room).emit(URLS.serverTextCursors, textCursors.values);
    });

    app.post(URLS.disconnect, (req, _res) => {
        if (req.body.id) {
            OnlineRoomStorage.getUsers(req.body.room).forEach((user: IUser) => {
                if (user.id === req.body.id) {
                    OnlineRoomStorage.freeSeats(req.body.room, user.seat);
                    console.log(`${user.name} disconected`);
                }
            });

            OnlineRoomStorage.deleteUser(req.body.room, req.body.id);

            textCursors.set(
                textCursors.values.filter(
                    (textCursor: ITextCursor) => textCursor.id !== req.body.id,
                ),
            );

            io.to(req.body.room).emit(URLS.clientDisconnect, {
                users: OnlineRoomStorage.getUsers(req.body.room),
                textCursors: textCursors.values,
            });

            if (OnlineRoomStorage.getUsers(req.body.room).length === 0) {
                db.updateRoomParams({
                    id: Number(req.body.room),
                    language: languageValue.get(),
                    editorContent: OnlineRoomStorage.getEditorContent(req.body.room),
                    seatsCount: 5,
                });
                console.log('content saved');
            }
        }
    });
});

server.listen(URLS.portServer, () => {
    console.log('server run');
    console.log(`port:${URLS.portServer}`);
});

app.post(URLS.createRoom, () => {
    db.createRoom();
});

app.get(URLS.getRooms, (_req, res) => {
    db.getRooms().then((data) => res.send(data));
});

app.use(express.json());

app.post(URLS.saveChange, (req, res) => {
    const params = db.getRoomParams(Number(req.body.room));
    params.then((data) => {
        languageValue.set(data.language);
        res.send({ languageValue, editorValue: data.editorContent });
    });
});
