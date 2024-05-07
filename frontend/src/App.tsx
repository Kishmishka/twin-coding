import './App.css';
import io, { Socket } from 'socket.io-client';
import useSendLanguage from './hooks/useSendLanguage.ts';
import { useLog, useRedactor } from './store.ts';
import useGetServerValue from './hooks/useGetServerValue.ts';
import useSendRedactorValue from './hooks/useSendRedactorValue.ts';
import useSendCursorPosition from './hooks/useSendCursorPosition.ts';
import useSendTextCursorPosition from './hooks/useSendTextCursorPosition.ts';
import { useBeforeunload } from 'react-beforeunload';
import SideBar from './components/SideBar/SideBar.tsx';
import CodeRedactor from './components/CodeRedactor/CodeRedactor.tsx';
import Cursor from './components/Cursor/Cursor.tsx';
import URLS from './constants/URLS.ts';
import Service from './API/Service.ts';

const socket: Socket = io(URLS.httpServer + URLS.portServer);

function App() {
    const room = useLog((state) => state.room);
    const activeUsers = useLog((state) => state.users);
    const id = useLog((state) => state.id);
    const setCursorPosition = useRedactor((state) => state.setCursorPosition);

    useGetServerValue(socket);
    useSendRedactorValue(socket);
    useSendCursorPosition(socket);
    useSendTextCursorPosition(socket);
    useSendLanguage(socket);

    useBeforeunload(() => {
        Service.disconect(room, id);
    });

    return (
        <div
            className="App"
            onMouseMove={(e) => {
                setCursorPosition(e.pageX, e.pageY);
            }}
        >
            <SideBar />
            <CodeRedactor />
            {activeUsers.map((user) => (
                <Cursor
                    key={user.id}
                    color={user.color}
                    x={user.cursorX}
                    y={user.cursorY}
                    name={user.name}
                />
            ))}
        </div>
    );
}

export default App;
