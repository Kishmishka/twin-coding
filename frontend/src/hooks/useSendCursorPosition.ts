import { useEffect } from 'react';
import { useLog, useRedactor } from '../store';
import { URLS } from '../constants';
import { Socket } from 'socket.io-client';

function useSendCursorPosition(socket: Socket) {
    const id = useLog(state => state.id);
    const cursorPosition = useRedactor(state => state.cursorPosition);

    useEffect(() => {
        const cursor = {
            id: id,
            X: cursorPosition.X,
            Y: cursorPosition.Y,
        };

        socket.emit(URLS.positionCursorChange, cursor);
    }, [cursorPosition]);
}
export { useSendCursorPosition };
