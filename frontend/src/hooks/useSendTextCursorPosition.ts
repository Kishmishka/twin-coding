import { Socket } from 'socket.io-client';
import { useLog, useRedactor } from '../store';
import { useEffect } from 'react';
import { URLS } from '../constants';

function useSendTextCursorPosition(socket: Socket) {
    const id = useLog(state => state.id);
    const textCursorPosition = useRedactor(state => state.textCursorPosition);

    useEffect(() => {
        const textCursor = {
            id: id,
            column: textCursorPosition.column,
            row: textCursorPosition.row,
        };

        socket.emit(URLS.positionTextCursorChange, textCursor);
    }, [textCursorPosition]);
}
export { useSendTextCursorPosition };
