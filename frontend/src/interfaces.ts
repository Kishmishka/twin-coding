export interface ILanguage {
    id: number;
    name: string;
    value: string;
    startPattern: string;
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
export interface ITextCursorPosition {
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
