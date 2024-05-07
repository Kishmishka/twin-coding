export default class Caret {
    id: string;
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
    className: string;
    type: string;

    constructor(id: string) {
        this.id = id;
        this.startRow=0;
        this.startCol=0;
        this.endRow=0;
        this.endCol=0;
        this.className='';
        this.type='div';
    }
}
