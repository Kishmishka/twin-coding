import { Socket } from 'socket.io-client';
import { useLog, useRedactor } from '../store';
import { useEffect } from 'react';
import URLS from '../constants/URLS';

export default function useSendRedactorValue(socket: Socket) {
   const redactorValue = useRedactor((state) => state.redactorValue);
   const allowСhange = useRedactor((state) => state.allowСhange);
   const room = useLog((state) => state.room);

   useEffect(() => {
      const params = {
         room,
         redactorContent: redactorValue,
      };

      if (allowСhange) socket.emit(URLS.redactorContentСhanged, params);
   }, [redactorValue]);
}
