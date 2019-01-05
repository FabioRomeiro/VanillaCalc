export class Display {

    constructor(last, current) {
        this._last = last;
        this._current = current;
    }

    get last() {
        return this._last;
    }

    get current() {
        return this._current;
    }

    addToLast(newValue) {
        this._last = newValue;
    }

    addToCurrent(newValue) {
        this._current = newValue;
    }
}