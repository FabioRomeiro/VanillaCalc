class Calculation {

  constructor(date, expression, result) {
      this._date = new Date(date.getTime());
      this._expression = expression;
      this._result = result;

      Object.freeze(this);
  }

  get date() {
    return new Date(this._date.getTime());
  }

  get expression() {
    return this._expression;
  }

  get result() {
    return this._result;
  }
}
