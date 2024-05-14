import { useEffect } from 'react';
import { useLog, useRedactor } from '../store';
import { Socket } from 'socket.io-client';
import URLS from '../constants/URLS';

export default function useSendCursorPosition(socket: Socket) {
    const id = useLog((state) => state.id);
    const cursorPosition = useRedactor((state) => state.cursorPosition);
    const room = useLog((state) => state.room);

    useEffect(() => {
        const cursor = {
            id,
            room,
            X: cursorPosition.X,
            Y: cursorPosition.Y,
        };

        socket.emit(URLS.positionCursorChange, cursor);
    }, [cursorPosition]);
}
