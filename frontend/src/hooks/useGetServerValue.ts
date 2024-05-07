import { useEffect } from 'react';
import { useLog, useRedactor, useSettingsRedactor } from '../store';

import { Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import URLS from '../constants/URLS';

export default function useGetServerValue(socket: Socket) {
   const setId = useLog((state) => state.setId);
   const setName = useLog((state) => state.setName);
   const setRoom = useLog((state) => state.setRoom);
   const setColor = useLog((state) => state.setColor);
   const setUsers = useLog((state) => state.setUsers);
   const setCursors = useLog((state) => state.setCursors);
   const setCarets = useLog((state) => state.setCarets);
   const setRedactorValue = useRedactor((state) => state.setRedactorValue);
   const setAllowChange = useRedactor((state) => state.setAllowChange);
   const setLanguage = useSettingsRedactor((state) => state.setLanguage);
   const [searchParams] = useSearchParams();

   const room = searchParams.get('room');

   useEffect(() => {
      if (room === null) {
         socket.emit(URLS.joinNewRoom);
      } else {
         socket.emit(URLS.joinExistingRoom, room);
      }

      socket.on(URLS.auth, (data) => {
         setAllowChange(false);
         setId(data.id);
         setName(data.name);
         setRoom(data.room);
         setLanguage(data.language);
         setColor(data.color);
         setRedactorValue(data.editorValue);
         socket.emit(URLS.newUserConnect, data.users);
         setUsers(data.users);
      });

      socket.on(URLS.uploadedRoomParams, (roomParams) => {
         setRedactorValue(roomParams.editorContent);
         setLanguage(roomParams.language);
      });

      socket.on(URLS.newUsersArray, (users) => {
         setUsers(users);
      });

      socket.on(URLS.newRedactorContent, (redactorContent) => {
         setRedactorValue(redactorContent);
      });

      socket.on(URLS.newCursorsArray, (cursorsArray) => {
         setCursors(cursorsArray);
      });

      socket.on(URLS.newCaretsArray, (caretsArray) => {
         setCarets(caretsArray);
      });

      socket.on(URLS.clientDisconnect, (clientDisconnectParams) => {
         setUsers(clientDisconnectParams.users);
         setCarets(clientDisconnectParams.textCursors);
      });

      socket.on(URLS.serverLanguage, (languageValue) => {
         setLanguage(languageValue);
      });
   }, []);
}
