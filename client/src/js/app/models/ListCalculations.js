class ListCalculations {
  constructor() {
    this._calculations = [];
  }

  add(calculation) {
    this._calculations.push(calculation);
  }

  get calculations() {
    return [].concat(this._calculations);
  }
}
