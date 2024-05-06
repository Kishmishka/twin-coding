export interface IColors {
    [key: string]: string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
}
export interface IClientValueСhangedData {
    data: string;
    name: string;
    room: string;
}

export interface IPositionCursor {
    id: string;
    X: number;
    Y: number;
    room: string;
}
export interface IPositionTextCursor {
    id: string;
    column: number;
    row: number;
    room: string;
}
export interface ILaguage {
    language: string;
    room: string;
}
export interface IUser {
    id: string;
    name: string;
    room: string;
    cursorX: number;
    cursorY: number;
    textCursorColumn: number;
    textCursorRow: number;
    color: string;
    seat: number;
}

export interface ITextCursor {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
    className: string;
    type: string;
    id: string;
}

export interface IRoomParams {
    id: number;
    language: string;
    editorContent: string;
    seatsCount: number;
}
