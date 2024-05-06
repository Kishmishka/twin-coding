import dotenv from 'dotenv';
dotenv.config();

const URLS = {
    httpServer: process.env.VITE_URL_SERVER,
    portServer: process.env.VITE_PORT_SERVER,
    portClient: process.env.VITE_PORT_CLIENT,
    saveChange: '/saveChange',
    getRooms: '/getRooms',
    createRoom: '/createRoom',
    disconnect: '/disconnect',
    newUsersArray: 'newUsersArray',
    newUserConnect: 'newUserConnect',
    connection: 'connection',
    joinNewRoom: 'joinNewRoom',
    joinExistingRoom: 'joinExistingRoom',
    auth: 'auth',
    clientValueСhanged: 'clientValueСhanged',
    serverValue: 'serverValue',
    positionCursorChange: 'positionCursorChange',
    serverCursors: 'serverCursors',
    clientDisconnect: 'clientDisconnect',
    positionTextCursorChange: 'positionTextCursorChange',
    serverTextCursors: 'serverTextCursors',
    languageChange: 'languageChange',
    serverLanguage: 'serverLanguage',
};
export default URLS;
