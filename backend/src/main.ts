import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { URLS, Colors, ColorsTextCursors } from './constants.ts';
import { User } from './entity/user.ts';
import { State } from './entity/state.ts';
import { Collection } from './entity/collection.ts';
import { TextCursor } from './entity/textCursor.ts';
import {
    IClientValueСhangedData,
    IPositionCursorChangeData,
    IPositionTextCursorChangeData,
    IRoomParams,
    ITextCursor,
    IUser,
} from './interfaces.ts';
import DB from './DB.ts';

const db = new DB();

const app = express();

app.use(cors({ origin: '*' }));
const editorValue = new State('');
const languageValue = new State('Java script');
const textCursors = new Collection();
const users = new Collection();
const server = http.createServer(app);
let lastRequestTime = 0;
let emptySeats: number[] = [5, 4, 3, 2, 1];
let RoomNotExist: boolean = false;

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on(URLS.connection, socket => {
    console.log('connection established');
    socket.on(URLS.joinNewRoom, () => {
        console.log('joinNewRoom');
        db.createRoom().then(data => {
            URLS.room = String(data.id);
            const newUser = new User(socket.id);
            newUser.seat = emptySeats.pop() || 0;
            newUser.color = Colors[newUser.seat];
            users.add(newUser);

            const newTextCursor = new TextCursor(socket.id);
            newTextCursor.className = ColorsTextCursors[newUser.seat];
            textCursors.add(newTextCursor);

            socket.join(URLS.room);
            editorValue.set(data.editorContent);
            languageValue.set(data.language);

            socket.emit(URLS.auth, {
                id: newUser.id,
                name: newUser.name,
                room: URLS.room,
                color: newUser.color,
                editorValue: editorValue.get(),
                language: languageValue.get(),
            });
            console.log(`${newUser.name} connect`);
        });
    });
    socket.on(URLS.joinExistingRoom, (room: string) => {
        URLS.room = room;
        const params: Promise<IRoomParams> = db.getRoomParams(
            Number(URLS.room),
        );
        params.then(data => {
            if (emptySeats.length > 0) {
                const newUser = new User(socket.id);
                newUser.seat = emptySeats.pop() || 0;
                newUser.color = Colors[newUser.seat];
                users.add(newUser);

                const newTextCursor = new TextCursor(socket.id);
                newTextCursor.className = ColorsTextCursors[newUser.seat];
                textCursors.add(newTextCursor);

                socket.join(URLS.room);
                //  editorValue.set(data.editorContent);
                //  languageValue.set(data.language);
                console.log(data);

                socket.emit(URLS.auth, {
                    id: newUser.id,
                    name: newUser.name,
                    room: URLS.room,
                    color: newUser.color,
                    editorValue: editorValue.get(),
                    language: languageValue.get(),
                });
                console.log(`${newUser.name} connect`);
            }
        });
    });
    socket.on(URLS.clientValueСhanged, (params: IClientValueСhangedData) => {
        editorValue.set(params.data);
        const currentTime = Date.now();

        if (currentTime - lastRequestTime > 10) {
            socket.to(URLS.room).emit(URLS.serverValue, editorValue.get());
            lastRequestTime = currentTime;
        }
    });
    socket.on(URLS.languageChange, (language: string) => {
        languageValue.set(language);
        socket.to(URLS.room).emit(URLS.serverLanguage, languageValue.get());
    });

    socket.on(
        URLS.positionCursorChange,
        (params: IPositionCursorChangeData) => {
            for (let user of users.values) {
                if (user.id === params.id) {
                    user.cursorX = params.X;
                    user.cursorY = params.Y;
                }
            }
            socket.to(URLS.room).emit(URLS.serverCursors, users.values);
        },
    );

    socket.on(
        URLS.positionTextCursorChange,
        (params: IPositionTextCursorChangeData) => {
            for (let textCursor of textCursors.values) {
                if (textCursor.id === params.id) {
                    textCursor.startRow = params.row;
                    textCursor.startCol = params.column;
                    textCursor.endCol = params.column + 1;
                    textCursor.endRow = params.row;
                }
            }
            socket
                .to(URLS.room)
                .emit(URLS.serverTextCursors, textCursors.values);
        },
    );

    socket.on(URLS.disconnect, () => {
        if (!RoomNotExist) {
            users.values.forEach((user: IUser) => {
                if (user.id === socket.id) {
                    emptySeats.push(user.seat);
                }
            });
            users.set(
                users.values.filter((user: IUser) => user.id !== socket.id),
            );
            textCursors.set(
                textCursors.values.filter(
                    (textCursor: ITextCursor) => textCursor.id !== socket.id,
                ),
            );
            const params = {
                users: users.values,
                textCursors: textCursors.values,
            };
            socket.to(URLS.room).emit(URLS.clientDisconnect, params);
            console.log(`disconnect`);

            if (!io.sockets.adapter.rooms.has(URLS.room)) {
                db.updateRoomParams({
                    id: Number(URLS.room),
                    language: languageValue.get(),
                    editorContent: editorValue.get(),
                    seatsCount: 5,
                });
            }
        }
    });
});

server.listen(URLS.port, () => {
    console.log('server run');
    console.log(`port:${URLS.port}`);
});

app.post(URLS.createRoom, () => {
    db.createRoom();
});

app.get(URLS.getRooms, (_req, res) => {
    db.getRooms().then(data => res.send(data));
});

app.post(URLS.saveChange, (_req, res) => {
    //  db.updateRoomParams({
    //      id: Number(URLS.room),
    //      language: languageValue.get(),
    //      editorContent: editorValue.get(),
    //      seatsCount: 5,
    //  });
    const params = db.getRoomParams(Number(URLS.room));
    params.then(data => {
        languageValue.set(data.language);
        editorValue.set(data.editorContent);
        res.send('reload');
    });
});
