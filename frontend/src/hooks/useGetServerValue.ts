import { useEffect } from 'react';
import { useLog, useRedactor, useSettingsRedactor } from '../store';

import { Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import URLS from '../constants/URLS';
import {
   IAuthParams,
   ICursor,
   IDisconectParams,
   ILoadRoomParams,
   IMarker,
   IUser,
} from '../interfaces';

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
   const ChangeIsSaved = useRedactor((state) => state.ChangeIsSaved);
   const setChangeIsSaved = useRedactor((state) => state.setChangeIsSaved);
   const [searchParams] = useSearchParams();

   const room = searchParams.get('room');

   useEffect(() => {
      if (room === null) {
         socket.emit(URLS.joinNewRoom);
      } else {
         socket.emit(URLS.joinExistingRoom, room);
      }

      socket.on(URLS.auth, (authParams: IAuthParams) => {
         setAllowChange(false);
         setId(authParams.id);
         setName(authParams.name);
         setRoom(authParams.room);
         setLanguage(authParams.language);
         setColor(authParams.color);
         setRedactorValue(authParams.editorValue);
         socket.emit(URLS.newUserConnect, authParams.users);
         setUsers(authParams.users);
      });

      socket.on(URLS.uploadedRoomParams, (roomParams: ILoadRoomParams) => {
         setLanguage(roomParams.language);
         setRedactorValue(roomParams.editorContent);
      });

      socket.on(URLS.newUsersArray, (users: IUser[]) => {
         setUsers(users);
      });

      socket.on(URLS.changeIsSaved, () => {
         setChangeIsSaved(true);
      });

      socket.on(URLS.newRedactorContent, (redactorContent: string) => {
         setRedactorValue(redactorContent);
         if (ChangeIsSaved) setChangeIsSaved(false);
      });

      socket.on(URLS.newCursorsArray, (cursorsArray: ICursor[]) => {
         setCursors(cursorsArray);
      });

      socket.on(URLS.newCaretsArray, (caretsArray: IMarker[]) => {
         setCarets(caretsArray);
      });

      socket.on(URLS.clientDisconnect, (clientDisconnectParams: IDisconectParams) => {
         setUsers(clientDisconnectParams.users);
         setCarets(clientDisconnectParams.carets);
         setCursors(clientDisconnectParams.cursors);
      });

      socket.on(URLS.serverLanguage, (languageValue: string) => {
         setLanguage(languageValue);
      });
   }, []);
}
