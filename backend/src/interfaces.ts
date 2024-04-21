export interface IColors {
    [key: string]: string;
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
}
export interface IClientValueСhangedData {
    data: string;
    name: string;
    room: number;
}

export interface IPositionCursorChangeData {
    id: string;
    X: number;
    Y: number;
}
export interface IPositionTextCursorChangeData {
    id: string;
    column: number;
    row: number;
}

export interface IUser {
    id: string;
    name: string;
    room: number;
    cursorX: number;
    cursorY: number;
    textCursorColumn: number;
    textCursorRow: number;
    color: string;
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