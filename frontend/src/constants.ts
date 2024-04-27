export const CompilingStatus = {
    //ошибка компиляции
    compilationError: 6,
    //успешная компиляция
    succes: 3,
    //стороняя ошибка
    error: 5,
    //превышен допустимый дневной лимит запросов
    manyRequest: 429,
};
export const Languages = {
    javaScript: {
        id: 63,
        name: 'Java script',
        value: 'typescript',
        startPattern: `//good luck)`,
    },
    java: {
        id: 62,
        name: 'Java',
        value: 'java',
        startPattern: `class Main{
	public static void main(String[] args) {
		//good luck)
	}
}`,
    },
    sql: {
        id: 82,
        name: 'SQL',
        value: 'sql',
        startPattern: `SELECT * FROM GoodLuck`,
    },
};

export const URLS = {
    update: 'update',
    httpServer: import.meta.env.VITE_URL_SERVER,
    port: 4040,
    connection: 'connection',
    joinNewRoom: 'joinNewRoom',
    joinExistingRoom: 'joinExistingRoom',
    auth: 'auth',
    room: '',
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
