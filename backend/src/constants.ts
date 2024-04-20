import { IColors } from './interfaces.ts';

export const URLS = {
    httpServer: process.env.REACT_APP_URL_SERVER,
    port: 3030,
    connection: 'connection',
    join: 'join',
    auth: 'auth',
    room: 777,
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
    '0': '#0074E8',
    '1': '#C8333F',
    '2': '#B24D9A',
    '3': '#57B54E',
    '4': '#31B2A5',
};

export const ColorsTextCursors: IColors = {
    '0': 'TextCursor_blue',
    '1': 'TextCursor_red',
    '2': 'TextCursor_violet',
    '3': 'TextCursor_green',
    '4': 'TextCursor_turquoise',
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
