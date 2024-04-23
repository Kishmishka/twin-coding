import { Socket } from 'socket.io-client';
import { useLog, useRedactor } from '../store';
import { useEffect } from 'react';
import { URLS } from '../constants';

function useSendRedactorValue(socket: Socket) {
    const redactorValue = useRedactor(state => state.redactorValue);
    const allowСhange = useRedactor(state => state.allowСhange);
    const name = useLog(state => state.name);
    const room = useLog(state => state.room);

    useEffect(() => {
        const params = {
            data: redactorValue,
            name: name,
            room: room,
        };

        if (allowСhange) {
            socket.emit(URLS.clientValueСhanged, params);
        }
    }, [redactorValue]);
}
export { useSendRedactorValue };
