export class State {
    value: string;

    constructor(startValue: string) {
        this.value = startValue;
    }

    set(newValue: string) {
        this.value = newValue;
    }

    get() {
        return this.value;
    }
}
