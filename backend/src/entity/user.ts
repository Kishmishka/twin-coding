import {Names} from '../constants.ts';

export class User {
    id: string;
    name: string;
    room: number;
    cursorX: number;
    cursorY: number;
    textCursorColumn: number;
    textCursorRow: number;
    color: string;
    seat: number;

    constructor(socket: string) {
        this.id = socket;
        this.name = Names[Math.floor(Math.random() * 16)];
        this.room = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.textCursorColumn = 0;
        this.textCursorRow = 0;
        this.color = '';
        this.seat = -1;
    }
}
