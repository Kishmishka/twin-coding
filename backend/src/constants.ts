import { IColors } from './interfaces.ts';

export const URLS = {
    getRooms: '/getRooms',
    createRoom: '/createRoom',
    port: 4040,
    room: '0',
    connection: 'connection',
    joinNewRoom: 'joinNewRoom',
    joinExistingRoom: 'joinExistingRoom',
    auth: 'auth',
    clientValueСhanged: 'clientValueСhanged',
    serverValue: 'serverValue',
    disconnect: 'disconnect',
    positionCursorChange: 'positionCursorChange',
    serverCursors: 'serverCursors',
    clientDisconnect: 'clientDisconnect',
    positionTextCursorChange: 'positionTextCursorChange',
    serverTextCursors: 'serverTextCursors',
    languageChange: 'languageChange',
    serverLanguage: 'serverLanguage',
};

export const Colors: IColors = {
    '1': '#0074E8',
    '2': '#C8333F',
    '3': '#B24D9A',
    '4': '#57B54E',
    '5': '#31B2A5',
};

export const ColorsTextCursors: IColors = {
    '1': 'TextCursor_blue',
    '2': 'TextCursor_red',
    '3': 'TextCursor_violet',
    '4': 'TextCursor_green',
    '5': 'TextCursor_turquoise',
};

export const Names = [
    'Загорелый пингвин',
    'Равнодушная лягушка',
    'Безудержный муравьед',
    'Суетной крокодил',
    'Мутный хамелеон',
    'Внушительный филин',
    'Неуловимая чарепаха',
    'Скрытный слон',
    'Заинтересованная акула',
    'Сухопутная рыба',
    'Приземленный тукан',
    'Прямолинейная кобра',
    'Забагованный скат',
    'Рекурсивная белка',
    'Относительная утка',
    'Виртуозный барашек',
];
