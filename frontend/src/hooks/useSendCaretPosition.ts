import { Socket } from 'socket.io-client';
import { useLog, useRedactor } from '../store';
import { useEffect } from 'react';
import URLS from '../constants/URLS';

export default function useSendCaretPosition(socket: Socket) {
   const id = useLog((state) => state.id);
   const textCursorPosition = useRedactor((state) => state.textCursorPosition);
   const room = useLog((state) => state.room);
   useEffect(() => {
      const textCursor = {
         id,
         room,
         column: textCursorPosition.column,
         row: textCursorPosition.row,
      };

      socket.emit(URLS.positionCaretrChange, textCursor);
   }, [textCursorPosition]);
}
