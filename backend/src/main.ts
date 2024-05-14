import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import User from './entity/User.ts';
import DataBase from './DataBase.ts';
import OnlineRoomStorage from './OnlineRoomStorage.ts';
import URLS from './constants/URLS.ts';
import COLORS from './constants/COLORS.ts';
import COLORS_TEXT_CURSORS from './constants/COLORS_TEXT_CURSORS.ts';
import Caret from './entity/Caret.ts';
import Cursor from './entity/Cursor.ts';
import {
   ILaguage,
   IPositionCursor,
   IPositionCaret,
   IRedactorContent,
   IRoomParams,
   IUser,
   IDisconnectParams,
} from './interfaces.ts';

const app = express();
app.use(cors({ origin: '*' }));

const server = http.createServer(app);
const db = new DataBase();

const io = new Server(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST'],
   },
});

io.on(URLS.connection, (socket) => {
   socket.on(URLS.joinNewRoom, () => {
      db.createRoom().then((roomParams) => {
         const room = String(roomParams.id);

         OnlineRoomStorage.initializationRoom(room, '', [], [5, 4, 3, 2, 1], [], [], '');

         const newUser = new User();
         newUser.seat = OnlineRoomStorage.takeSeat(room);
         newUser.color = COLORS[newUser.seat];
         newUser.room = room;

         const newCaret = new Caret(newUser.id);
         newCaret.className = COLORS_TEXT_CURSORS[newUser.seat];

         const newCursor = new Cursor(newUser.id);
         newCursor.userColor = newUser.color;
         newCursor.userName = newUser.name;

         OnlineRoomStorage.addUser(room, newUser);
         OnlineRoomStorage.addCaret(room, newCaret);
         OnlineRoomStorage.addCursor(room, newCursor);

         socket.join(room);

         OnlineRoomStorage.setEditorContent(room, roomParams.editorContent);
         OnlineRoomStorage.setLanguage(room, roomParams.language);

         socket.emit(URLS.auth, {
            id: newUser.id,
            name: newUser.name,
            room: room,
            color: newUser.color,
            editorValue: OnlineRoomStorage.getEditorContent(room),
            language: OnlineRoomStorage.getLanguage(room),
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
         OnlineRoomStorage.getCursors(room),
         OnlineRoomStorage.getCarets(room),
         OnlineRoomStorage.getLanguage(room),
      );
      if (OnlineRoomStorage.getEmptySeats(room).length > 0) {
         const roomParams: Promise<IRoomParams> = db.getRoomParams(Number(room));
         roomParams.then((roomParams) => {
            const newUser = new User();
            newUser.seat = OnlineRoomStorage.takeSeat(room);
            newUser.color = COLORS[newUser.seat];
            newUser.room = room;

            const newCaret = new Caret(newUser.id);
            newCaret.className = COLORS_TEXT_CURSORS[newUser.seat];

            const newCursor = new Cursor(newUser.id);
            newCursor.userColor = newUser.color;
            newCursor.userName = newUser.name;

            OnlineRoomStorage.addUser(room, newUser);
            OnlineRoomStorage.addCaret(room, newCaret);
            OnlineRoomStorage.addCursor(room, newCursor);

            socket.join(room);

            OnlineRoomStorage.setEditorContent(room, roomParams.editorContent);
            OnlineRoomStorage.setLanguage(room, roomParams.language);

            socket.emit(URLS.auth, {
               id: newUser.id,
               name: newUser.name,
               room: room,
               color: newUser.color,
               editorValue: OnlineRoomStorage.getEditorContent(room),
               language: OnlineRoomStorage.getLanguage(room),
               users: OnlineRoomStorage.getUsers(room),
            });
            console.log(`${newUser.name} connect room:${room}`);
         });
      }
   });

   let lastRequestTime = 0;

   socket.on(URLS.redactorContentСhanged, (redactorContent: IRedactorContent) => {
      OnlineRoomStorage.setEditorContent(redactorContent.room, redactorContent.redactorContent);

      const currentTime = Date.now();

      if (currentTime - lastRequestTime > 50) {
         socket
            .to(redactorContent.room)
            .emit(
               URLS.newRedactorContent,
               OnlineRoomStorage.getEditorContent(redactorContent.room),
            );
         lastRequestTime = currentTime;
      }
   });

   socket.on(URLS.languageChange, (language: ILaguage) => {
      OnlineRoomStorage.setLanguage(language.room, language.language);
      socket.to(language.room).emit(URLS.serverLanguage, language.language);
   });

   socket.on(URLS.newUserConnect, (newUserArray: IUser[]) => {
      socket
         .to(newUserArray[0].room)
         .emit(URLS.newUsersArray, OnlineRoomStorage.getUsers(newUserArray[0].room));
   });

   socket.on(URLS.positionCursorChange, (positionCursor: IPositionCursor) => {
      const cursors = OnlineRoomStorage.getCursors(positionCursor.room);

      for (let cursor of cursors) {
         if (cursor.id === positionCursor.id) {
            cursor.X = positionCursor.X;
            cursor.Y = positionCursor.Y;
         }
      }

      socket.to(positionCursor.room).emit(URLS.newCursorsArray, cursors);
   });

   socket.on(URLS.positionCaretrChange, (params: IPositionCaret) => {
      const carets = OnlineRoomStorage.getCarets(params.room);

      for (let caret of carets) {
         if (caret.id === params.id) {
            caret.startRow = params.row;
            caret.startCol = params.column;
            caret.endCol = params.column + 1;
            caret.endRow = params.row;
         }
      }

      socket.to(params.room).emit(URLS.newCaretsArray, carets);
   });

   app.use(express.json());

   socket.on(URLS.disconnect, (disconnectParams: IDisconnectParams) => {
      if (disconnectParams.id) {
         OnlineRoomStorage.getUsers(disconnectParams.room).forEach((user: IUser) => {
            if (user.id === disconnectParams.id) {
               OnlineRoomStorage.freeSeats(disconnectParams.room, user.seat);
               console.log(`${user.name} disconected`);
            }
         });

         OnlineRoomStorage.deleteUser(disconnectParams.room, disconnectParams.id);
         OnlineRoomStorage.deleteCaret(disconnectParams.room, disconnectParams.id);
         OnlineRoomStorage.deleteCursor(disconnectParams.room, disconnectParams.id);

         io.to(disconnectParams.room).emit(URLS.clientDisconnect, {
            users: OnlineRoomStorage.getUsers(disconnectParams.room),
            carets: OnlineRoomStorage.getCarets(disconnectParams.room),
            cursors: OnlineRoomStorage.getCursors(disconnectParams.room),
         });
      }
   });

   app.post(URLS.saveChange, (req, _res) => {
      db.updateRoomParams({
         id: Number(req.body.room),
         language: OnlineRoomStorage.getLanguage(req.body.room),
         editorContent: OnlineRoomStorage.getEditorContent(req.body.room),
      });
      console.log('content saved');
      io.to(req.body.room).emit(URLS.changeIsSaved);
   });
});

server.listen(URLS.portServer, () => {
   console.log('server run');
   console.log(`port:${URLS.portServer}`);
});
