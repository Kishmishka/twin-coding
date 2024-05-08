import './App.css';
import io, { Socket } from 'socket.io-client';
import useSendLanguage from './hooks/useSendLanguage.ts';
import { useLog, useRedactor } from './store.ts';
import useGetServerValue from './hooks/useGetServerValue.ts';
import useSendRedactorValue from './hooks/useSendRedactorValue.ts';
import useSendCursorPosition from './hooks/useSendCursorPosition.ts';
import { useBeforeunload } from 'react-beforeunload';
import SideBar from './components/SideBar/SideBar.tsx';
import CodeRedactor from './components/CodeRedactor/CodeRedactor.tsx';
import Cursor from './components/Cursor/Cursor.tsx';
import URLS from './constants/URLS.ts';
import Service from './API/Service.ts';
import useSendCaretPosition from './hooks/useSendCaretPosition.ts';
import { useEffect } from 'react';

const socket: Socket = io(URLS.httpServer + URLS.portServer);

function App() {
   const room = useLog((state) => state.room);
   const cursors = useLog((state) => state.cursors);
   const id = useLog((state) => state.id);
   const setCursorPosition = useRedactor((state) => state.setCursorPosition);

   useGetServerValue(socket);
   useSendRedactorValue(socket);
   useSendCursorPosition(socket);
   useSendCaretPosition(socket);
   useSendLanguage(socket);

   window.onbeforeunload = function () {
      Service.disconect(room, id);
      return true;
   };

   // useBeforeunload(() => {
   //    Service.disconect(room, id);
   // });

   return (
      <div
         className="App"
         onMouseMove={(e) => {
            setCursorPosition(e.pageX, e.pageY);
         }}
      >
         <SideBar />
         <CodeRedactor />
         {cursors.map((cursor) => (
            <Cursor
               key={cursor.id}
               color={cursor.userColor}
               x={cursor.X}
               y={cursor.Y}
               name={cursor.userName}
            />
         ))}
      </div>
   );
}

export default App;
