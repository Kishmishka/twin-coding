import { useEffect } from 'react';

import { Socket } from 'socket.io-client';
import { useLog, useRedactor, useSettingsRedactor } from '../store';
import URLS from '../constants/URLS';

export default function useSendLanguage(socket: Socket) {
    const language = useSettingsRedactor((state) => state.language);
    const allowСhange = useRedactor((state) => state.allowСhange);
    const setRedactorValue = useRedactor((state) => state.setRedactorValue);
    const setAllowChange = useRedactor((state) => state.setAllowChange);
    const room = useLog((state) => state.room);

    useEffect(() => {
        if (allowСhange) {
            socket.emit(URLS.languageChange, { language: language.name, room });
            setRedactorValue(language.startPattern);
        }
    }, [language]);

    setAllowChange(true);
}
