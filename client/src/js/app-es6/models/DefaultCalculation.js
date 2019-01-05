export class DefaultCalculation {
    
    constructor(expression='', result='') {
        this._expression = expression;
        this._result = result;
    }

    get expression() {
        return this._expression;
    }
    set expression(newValue) {
        this._expression = newValue;
    }

    get result() {
        return this._result;
    }
    set result(newValue) {
        this._result = newValue;
    }
}