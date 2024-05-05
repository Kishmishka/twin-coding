export default class TextCursor {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
    className: string;
    type: string;
    id: string;

    constructor(id: string) {
        this.id = id;
        this.startRow = 0;
        this.startCol = 0;
        this.endRow = 0;
        this.endCol = 0;
        this.className = 'TextCursor_red';
        this.type = 'div';
    }
}
