export interface ILanguage {
   id: number;
   name: string;
   value: string;
   startPattern: string;
}

export interface IUser {
   id: string;
   name: string;
   room: string;
   color: string;
   seat: number;
}

export interface ICaretPosition {
   column: number;
   row: number;
}

export interface ICursorPosition {
   X: number;
   Y: number;
}

export interface IMarker {
   startRow: number;
   startCol: number;
   endRow: number;
   endCol: number;
   className: string;
   type: 'fullLine' | 'screenLine' | 'text';
   inFront?: boolean;
   id: string;
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

export interface ICursor {
   id: string;
   X: number;
   Y: number;
   userColor: string;
   userName: string;
}

export interface IAuthParams {
   id: string;
   name: string;
   room: string;
   color: string;
   editorValue: string;
   language: string;
   users: IUser[];
}

export interface ILoadRoomParams {
   language: string;
   editorContent: string;
}

export interface IDisconectParams {
   users: IUser[];
   carets: IMarker[];
   cursors: ICursor[];
}
