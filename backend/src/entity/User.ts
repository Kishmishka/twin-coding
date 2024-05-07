import NAMES from '../constants/NAMES.ts';

export default class User {
    id: string;
    name: string;
    room: string;
    color: string;
    seat: number;

    constructor() {
        this.id = Math.random().toString(16).slice(2);
        this.name = NAMES[Math.floor(Math.random() * 16)];
        this.room = '0';
        this.color = '';
        this.seat = -1;
    }
}
