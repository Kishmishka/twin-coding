export interface IColors {
   [key: string]: string;
   '1': string;
   '2': string;
   '3': string;
   '4': string;
   '5': string;
}

export interface IRedactorContent {
   redactorContent: string;
   room: string;
}

export interface IPositionCursor {
   id: string;
   X: number;
   Y: number;
   room: string;
}

export interface IPositionCaret {
   id: string;
   column: number;
   row: number;
   room: string;
}

export interface ILaguage {
   language: string;
   room: string;
}

export interface IRoomParams {
   id: number;
   language: string;
   editorContent: string;
}

export interface IUser {
   id: string;
   name: string;
   room: string;
   color: string;
   seat: number;
}

export interface ICursor {
   id: string;
   X: number;
   Y: number;
   userColor: string;
   userName: string;
}

export interface ICaret {
   id: string;
   startRow: number;
   startCol: number;
   endRow: number;
   endCol: number;
   className: string;
   type: string;
}
export interface IDisconnectParams {
   room: string;
   id: string;
}
