import { useEffect } from 'react';

import { URLS } from '../constants';
import { Socket } from 'socket.io-client';
import { useRedactor, useSettingsRedactor } from '../store';

function useSendLanguage(socket: Socket) {
    const language = useSettingsRedactor(state => state.language);
    const allowСhange = useRedactor(state => state.allowСhange);
    const setRedactorValue = useRedactor(state => state.setRedactorValue);
    useEffect(() => {
        if (allowСhange) {
            socket.emit(URLS.languageChange, language.name);
            setRedactorValue(language.startPattern);
        }
    }, [language]);
}
export { useSendLanguage };
