import { create } from 'zustand';

import { ICursorPosition, ILanguage, IMarker, ITextCursorPosition, IUser } from './interfaces';
import COMPILINGSTATUS from './constants/COMPILINGSTATUS';
import LANGUAGES from './constants/LANGUAGES';

//Значения компиляции
//Используется в компоненте OutputSideBar.jsx
interface ICompilingState {
    compilingOutput: string;
    compilingProcess: boolean;
    setCompilingOutputManyReques: () => void;
    setCompilingOutput: (responseCompiling: any) => void;
    setCompilingProcess: (compilingProcess: boolean) => void;
}

export const useCompiling = create<ICompilingState>((set, get) => ({
    //Ответ компилятора
    compilingOutput: '',
    //Флаг стостояния процесса
    compilingProcess: false,

    setCompilingOutputManyReques: () => {
        set({
            compilingOutput:
                get().compilingOutput + '\n' + 'Quota of 50 requests exceeded for the Day!',
        });
    },
    setCompilingOutput: (responseCompiling) => {
        set({
            compilingOutput:
                get().compilingOutput +
                '\n' +
                `${responseCompiling.finished_at}` +
                '\n' +
                `status: ${responseCompiling.status?.description}` +
                (responseCompiling?.memory
                    ? '\n' + `memory consumed: ${responseCompiling?.memory} bytes`
                    : '') +
                (responseCompiling?.time ? '\n' + `time spent: ${responseCompiling?.time} s` : '') +
                '\n' +
                (responseCompiling.status.id === COMPILINGSTATUS.compilationError
                    ? `compilation error: ${atob(responseCompiling?.compile_output)}`
                    : responseCompiling.status.id === COMPILINGSTATUS.succes
                    ? `rezult: ${atob(responseCompiling.stdout)}`
                    : responseCompiling.status.id === COMPILINGSTATUS.error
                    ? `error: Time Limit Exceeded`
                    : `error: ${atob(responseCompiling?.stderr)}`),
        });
    },
    setCompilingProcess: (compilingProcess) => {
        set({ compilingProcess });
    },
}));

//Стор со значениями настроек текстового редактора
//Используется в компонентах:
//CodeRedactor.jsx, Cursor.jsx, OutputSideBar.jsx, SettingsSideBar.jsx, SideBar.jsx
//Используется в хуках:
//useGetServerValue.js useSendLanguage.js

interface ISettingsRedactorState {
    language: ILanguage;
    tabSize: number;
    themeIsBlack: boolean;
    cursorLabel: boolean;
    textCursorLabel: boolean;
    setLanguage: (value: string) => void;
    setTabSize: (tabSize: number) => void;
    swapblackTheme: () => void;
    setCursorLabel: (cursorLabel: boolean) => void;
    swapCursorLabel: () => void;
    swapTextCursorLabel: () => void;
}

export const useSettingsRedactor = create<ISettingsRedactorState>((set, get) => ({
    language: LANGUAGES.javaScript,
    tabSize: 3,
    //Флаг выбора темы
    themeIsBlack: false,
    //Флаг отображения курсоров пользователя
    cursorLabel: false,
    //Флаг отображения текстовых курсоров пользователя
    textCursorLabel: false,

    setLanguage: (value) => {
        switch (value) {
            case LANGUAGES.java.name:
                set({ language: LANGUAGES.java });
                break;
            case LANGUAGES.javaScript.name:
                set({ language: LANGUAGES.javaScript });
                break;
            case LANGUAGES.sql.name:
                set({ language: LANGUAGES.sql });
                break;
        }
    },
    setTabSize: (tabSize) => {
        set({ tabSize });
    },
    swapblackTheme: () => {
        set({ themeIsBlack: !get().themeIsBlack });
    },
    setCursorLabel: (cursorLabel) => {
        set({ cursorLabel });
    },
    swapCursorLabel: () => {
        set({ cursorLabel: !get().cursorLabel });
    },
    swapTextCursorLabel: () => {
        set({ textCursorLabel: !get().textCursorLabel });
    },
}));

// Стор со значениями пользователей
//Используется в компонентах:
//CodeRedactor.jsx, SideBar.jsx
//Используется в хуках:
//useGetServerValue.js, useSendCursorposition.js,
//useSendReadctorValue.js, useSendTextCursorPosition.js

interface ILogState {
    id: string;
    name: string;
    room: string;
    color: string;
    users: IUser[];
    markers: IMarker[];
    setMarkers: (value: IMarker[]) => void;
    setUsers: (value: IUser[]) => void;
    setId: (id: string) => void;
    setName: (value: string) => void;
    setRoom: (value: string) => void;
    setColor: (value: string) => void;
}
export const useLog = create<ILogState>((set, get) => ({
    id: '',
    name: '',
    room: '0',
    color: '',
    users: [],
    //Массив со значениями текстовых курсоров пользоваиелей
    markers: [],

    setMarkers(value) {
        const markers = value.filter((marker) => marker.id !== get().id);
        set({ markers });
    },
    setUsers(value) {
        const users = value.filter((user) => user.id !== get().id);
        set({ users });
    },
    setId: (id) => {
        set({ id });
    },
    setName: (name) => {
        set({ name });
    },
    setRoom: (room) => {
        set({ room });
    },
    setColor: (color) => {
        set({ color });
    },
}));

//Стор со значениями котрые отображаются в текстовом редакторе
//Используется в компонентах:
//CodeRedactor.jsx, OutputSideBar.jsx,  SideBar.jsx
//Используется в хуках:
//useGetServerValue.js, useSendCursorposition.js,  useSendLanguage.js
//useSendReadctorValue.js, useSendTextCursorPosition.js

interface IRedactorState {
    allowСhange: boolean;
    redactorValue: string;
    textCursorPosition: ITextCursorPosition;
    cursorPosition: ICursorPosition;
    //  setStartRedactorValue: (value: string) => void;
    setRedactorValue: (value: string) => void;
    setCursorPosition: (x: number, y: number) => void;
    setTextCursorPosition: (x: number, y: number) => void;
    setAllowChange: (alowchange: boolean) => void;
}

export const useRedactor = create<IRedactorState>((set) => ({
    //Флаг разрещающий изменения состояния текста
    allowСhange: false,
    //Значение текстового редактора
    redactorValue: '',
    textCursorPosition: {
        column: 0,
        row: 0,
    },
    cursorPosition: {
        X: 0,
        Y: 0,
    },
    setAllowChange: (allowСhange) => {
        set({ allowСhange });
    },
    //  setStartRedactorValue: value => {
    //      if (value) set({ redactorValue: value });
    //      set({ allowСhange: true });
    //  },
    setRedactorValue: (redactorValue) => {
        set({ redactorValue });
    },
    setCursorPosition(x, y) {
        set({ cursorPosition: { X: x, Y: y } });
    },
    setTextCursorPosition(x, y) {
        set({ textCursorPosition: { column: x, row: y } });
    },
}));
