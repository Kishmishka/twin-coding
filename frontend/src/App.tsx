import './App.css';

import io, { Socket } from 'socket.io-client';

import useSendLanguage from './hooks/useSendLanguage.ts';
import { URLS } from './constants.ts';
import { useLog, useRedactor } from './store.ts';
import useGetServerValue from './hooks/useGetServerValue.ts';
import useSendRedactorValue from './hooks/useSendRedactorValue.ts';
import useSendCursorPosition from './hooks/useSendCursorPosition.ts';
import useSendTextCursorPosition from './hooks/useSendTextCursorPosition.ts';
import { useBeforeunload } from 'react-beforeunload';
import SideBar from './components/SideBar/SideBar.tsx';
import CodeEditor from './components/CodeRedactor/CodeRedactor.tsx';
import Cursor from './components/Cursor/Cursor.tsx';

const socket: Socket = io(URLS.httpServer + URLS.portServer);

function App() {
    const name = useLog((state) => state.name);
    const activeUsers = useLog((state) => state.users);
    const setCursorPosition = useRedactor((state) => state.setCursorPosition);

    useGetServerValue(socket);
    useSendRedactorValue(socket);
    useSendCursorPosition(socket);
    useSendTextCursorPosition(socket);
    useSendLanguage(socket);

    useBeforeunload(() => {
        socket.emit(URLS.disconnect, name);
    });

    return (
        <div
            className="App"
            onMouseMove={(e) => {
                setCursorPosition(e.pageX, e.pageY);
            }}
        >
            <SideBar />
            <CodeEditor />
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
