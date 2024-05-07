export class Cursor {
    id: string;
    X: number;
    Y: number;
    userColor: string;
    userName: string;
    constructor(id: string) {
        this.id = id;
        this.X = 0;
        this.Y = 0;
        this.userColor = '';
        this.userName = '';
    }
}
