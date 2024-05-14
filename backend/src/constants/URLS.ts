import dotenv from 'dotenv';
dotenv.config();

const URLS = {
   httpServer: process.env.VITE_URL_SERVER,
   portServer: process.env.VITE_PORT_SERVER,
   portClient: process.env.VITE_PORT_CLIENT,
   saveChange: '/saveChange',
   uploadedRoomParams: 'uploadedRoomParams',
   getRooms: '/getRooms',
   createRoom: '/createRoom',
   disconnect: '/disconnect',
   newUsersArray: 'newUsersArray',
   changeIsSaved: 'changeIsSaved',
   newUserConnect: 'newUserConnect',
   connection: 'connection',
   joinNewRoom: 'joinNewRoom',
   joinExistingRoom: 'joinExistingRoom',
   auth: 'auth',
   redactorContentСhanged: 'redactorContentСhanged',
   newRedactorContent: 'newRedactorContent',
   positionCursorChange: 'positionCursorChange',
   newCursorsArray: 'newCursorsArray',
   clientDisconnect: 'clientDisconnect',
   positionCaretrChange: 'positionCaretrChange',
   newCaretsArray: 'newCaretsArray',
   languageChange: 'languageChange',
   serverLanguage: 'serverLanguage',
};
export default URLS;
