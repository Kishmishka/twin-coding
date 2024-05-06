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
    const setMarkers = useLog((state) => state.setMarkers);
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

        socket.on(URLS.newUsersArray, (users) => {
            setUsers(users);
        });
        socket.on(URLS.serverValue, (editorValue) => {
            setRedactorValue(editorValue);
        });

        socket.on(URLS.serverCursors, (users) => {
            setUsers(users);
        });

        socket.on(URLS.serverTextCursors, (textCursorss) => {
            setMarkers(textCursorss);
        });

        socket.on(URLS.clientDisconnect, (clientDisconnectParams) => {
            setUsers(clientDisconnectParams.users);
            setMarkers(clientDisconnectParams.textCursors);
        });

        socket.on(URLS.serverLanguage, (languageValue) => {
            setLanguage(languageValue);
        });
    }, []);
}
