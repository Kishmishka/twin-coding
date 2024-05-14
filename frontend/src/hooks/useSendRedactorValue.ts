import { Socket } from 'socket.io-client';
import { useLog, useRedactor } from '../store';
import { useEffect } from 'react';
import URLS from '../constants/URLS';

export default function useSendRedactorValue(socket: Socket) {
   const redactorValue = useRedactor((state) => state.redactorValue);
   const allowСhange = useRedactor((state) => state.allowСhange);
   const room = useLog((state) => state.room);
   const ChangeIsSaved = useRedactor((state) => state.ChangeIsSaved);
   const setChangeIsSaved = useRedactor((state) => state.setChangeIsSaved);

   useEffect(() => {
      const params = {
         room,
         redactorContent: redactorValue,
      };

      if (allowСhange) {
         if (ChangeIsSaved) setChangeIsSaved(false);
         socket.emit(URLS.redactorContentСhanged, params);
      }
   }, [redactorValue]);
}
