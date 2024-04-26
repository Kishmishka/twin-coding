import { useEffect } from 'react';
import { useLog, useRedactor, useSettingsRedactor } from '../store';
import { URLS } from '../constants';
import { Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

function useGetServerValue(socket: Socket) {
    const setId = useLog(state => state.setId);
    const setName = useLog(state => state.setName);
    const setRoom = useLog(state => state.setRoom);
    const setColor = useLog(state => state.setColor);
    const setUsers = useLog(state => state.setUsers);
    const setMarkers = useLog(state => state.setMarkers);
    const setRedactorValue = useRedactor(state => state.setRedactorValue);
    const setAllowChange = useRedactor(state => state.setAllowChange);
    //  const setStartRedactorValue = useRedactor(state => state.setStartRedactorValue);
    const setLanguage = useSettingsRedactor(state => state.setLanguage);
    const [searchParams] = useSearchParams();

    const room = searchParams.get('room');
    useEffect(() => {
        if (room === null) {
            socket.emit(URLS.joinNewRoom);
        } else {
            socket.emit(URLS.joinExistingRoom, room);
        }
        socket.on(URLS.auth, data => {
            setAllowChange(false);
            setId(data.id);
            setName(data.name);
            setRoom(data.room);
            setLanguage(data.language);
            setColor(data.color);
            setRedactorValue(data.editorValue);
        });

        socket.on(URLS.serverValue, editorValue => {
            setRedactorValue(editorValue);
        });

        socket.on(URLS.serverCursors, userss => {
            setUsers(userss);
        });

        socket.on(URLS.serverTextCursors, textCursorss => {
            setMarkers(textCursorss);
        });

        socket.on(URLS.clientDisconnect, params => {
            setUsers(params.users);
            setMarkers(params.textCursors);
        });

        socket.on(URLS.serverLanguage, languageValue => {
            setLanguage(languageValue);
        });
    }, []);
}
export { useGetServerValue };
