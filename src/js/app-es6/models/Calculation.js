class Calculation {

  constructor(date=new Date(), expression='', result='') {
      this._date = new Date(date.getTime());
      this._expression = expression;
      this._result = result;

      Object.freeze(this); 
  }

  set date(ndate) {
    this._date = new Date(ndate.getTime());
  }

  set expression(nexpression) {
    this._expression = nexpression;
  }

  set result(nresult) {
    this._result = nresult;
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

  isEquals(otherCalculation) {
    return JSON.stringify(this) == JSON.stringify(otherCalculation);
  }
}
