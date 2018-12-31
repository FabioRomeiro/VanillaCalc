class ListCalculations {
  constructor() {
    this._calculations = [];
  }

  add(calculation) {
    this._calculations.push(calculation);
  }

  remove() {
    this._calculations = [];
  }

  sortByDate() {
    this._calculations.reverse((a, b) => a.date - b.date);
  }

  get calculations() {
    return [].concat(this._calculations);
  }
}
