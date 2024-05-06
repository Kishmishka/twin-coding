import NAMES from '../constants/NAMES.ts';

export default class User {
    id: string;
    name: string;
    room: string;
    cursorX: number;
    cursorY: number;
    textCursorColumn: number;
    textCursorRow: number;
    color: string;
    seat: number;

    constructor() {
        this.id = Math.random().toString(16).slice(2);
        this.name = NAMES[Math.floor(Math.random() * 16)];
        this.room = '0';
        this.cursorX = 0;
        this.cursorY = 0;
        this.textCursorColumn = 0;
        this.textCursorRow = 0;
        this.color = '';
        this.seat = -1;
    }
}
