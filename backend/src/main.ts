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
    ITextCursor,
    IUser,
} from './interfaces.ts';
const app = express();

app.use(cors({ origin: '*' }));
const editorValue = new State('');
const languageValue = new State('java');
const textCursors = new Collection();
const users = new Collection();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on(URLS.connection, socket => {
    console.log('connection established');
    socket.on(URLS.join, () => {
        const newTextCursor = new TextCursor(socket.id);
        newTextCursor.className = ColorsTextCursors[textCursors.values.length];
        textCursors.add(newTextCursor);

        const newUser = new User(socket.id);
        newUser.color = Colors[users.values.length];
        users.add(newUser);

        socket.join(newUser.room);
        socket.emit(URLS.auth, {
            id: newUser.id,
            name: newUser.name,
            room: newUser.room,
            color: newUser.color,
            editorValue: editorValue.get(),
            language: languageValue.get(),
        });
        console.log(`${newUser.id} connect`);
        console.log(`${newUser.name} connect`);
    });

    socket.on(URLS.clientValueСhanged, (params: IClientValueСhangedData) => {
        editorValue.set(params.data);
        setTimeout(() => {
            socket.to(URLS.room).emit(URLS.serverValue, editorValue.get());
        }, 1);
    });

    socket.on(URLS.languageChange, (language: string) => {
        languageValue.set(language);
        console.log(`${languageValue.get()} 2`);
        socket.broadcast
            .to(URLS.room)
            .emit(URLS.serverLanguage, languageValue.get());
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
            socket.broadcast
                .to(URLS.room)
                .emit(URLS.serverCursors, users.values);
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
            socket.broadcast
                .to(URLS.room)
                .emit(URLS.serverTextCursors, textCursors.values);
        },
    );

    socket.on(URLS.disconnect, () => {
        users.set(users.values.filter((user: IUser) => user.id !== socket.id));
        textCursors.set(
            textCursors.values.filter(
                (textCursor: ITextCursor) => textCursor.id !== socket.id,
            ),
        );
        const params = {
            users: users.values,
            textCursors: textCursors.values,
        };
        socket.broadcast.to(URLS.room).emit(URLS.clientDisconnect, params);
        console.log(`disconnect`);
    });
});

server.listen(URLS.port, () => {
    console.log('server run');
    console.log(`port:${URLS.port}`);
});
