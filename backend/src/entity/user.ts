import { Names, URLS } from '../constants.ts';

export class User {
    id: string;
    name: string;
    room: number;
    cursorX: number;
    cursorY: number;
    textCursorColumn: number;
    textCursorRow: number;
    color: string;
    constructor(socket: string) {
        this.id = socket;
        this.name = Names[Math.floor(Math.random() * 16)];
        this.room = URLS.room;
        this.cursorX = 0;
        this.cursorY = 0;
        this.textCursorColumn = 0;
        this.textCursorRow = 0;
        this.color = '';
    }
}
