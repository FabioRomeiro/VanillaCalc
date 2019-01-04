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

  sortByDate(increase) {
    let ordenateAlgorithm = (a, b) => a.date - b.date;
    if (increase) {
      this._calculations.sort(ordenateAlgorithm);
    } else {
      this._calculations.reverse(ordenateAlgorithm);
    }
  }

  get calculations() {
    return [].concat(this._calculations);
  }
}
