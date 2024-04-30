export default class Collection {
    values: any = [];

    add(value: any) {
        this.values.push(value);
    }

    set(newValues: any) {
        this.values = newValues;
    }
}
