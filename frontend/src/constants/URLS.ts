const URLS = {
   httpServer: import.meta.env.VITE_URL_SERVER,
   portServer: import.meta.env.VITE_PORT_SERVER,
   portClient: import.meta.env.VITE_PORT_CLIENT,
   saveChange: '/saveChange',
   uploadedRoomParams: 'uploadedRoomParams',
   getRooms: '/getRooms',
   createRoom: '/createRoom',
   disconnect: '/disconnect',
   update: 'update',
   connection: 'connection',
   changeIsSaved: 'changeIsSaved',
   joinNewRoom: 'joinNewRoom',
   joinExistingRoom: 'joinExistingRoom',
   newUsersArray: 'newUsersArray',
   newUserConnect: 'newUserConnect',
   auth: 'auth',
   room: '',
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
