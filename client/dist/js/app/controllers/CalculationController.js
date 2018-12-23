class CalculationController {

   constructor(){
      // let $ = document.querySelector.bind(document);
      this.Helper = new CalculationHelper();
      this._listCalculation = new ListCalculations();
      this._expression = '';
      this._result = '';

      const thisClass = this;
      document.addEventListener('keydown', function(e) {
        let key = thisClass.Helper.getCalculatorKeyByCode(e.keyCode);
        if (key) thisClass.processKey(key);
      });
   }

   get expression() {
     return this._expression;
   }

   get result() {
     return this._result;
   }

   resetFields() {
     this._expression = '';
     this._result = '';
   }

   incrementExpression(key) {
     this._expression += key;
   }

   defineResults(result) {
     this._result = result;
   }

   calculate() {
     let operation = this.Helper.splitExpression(this.expression);
     let operators = this.Helper.getOperators();
     let res = Array.from(operation);
     for (var i = 0; i < operators.length; i++) {
       while (res.includes(operators[i])) {
        let operatorIndex = res.indexOf(operators[i]);
        if (operators[i] === '/') {
          res[operatorIndex-1] = parseFloat(res[operatorIndex-1]) / parseFloat(res[operatorIndex + 1]);
        } else if (operators[i] === 'x') {
          res[operatorIndex-1] = parseFloat(res[operatorIndex-1]) * parseFloat(res[operatorIndex + 1]);
        } else if (operators[i] === '-') {
          res[operatorIndex-1] = parseFloat(res[operatorIndex-1]) - parseFloat(res[operatorIndex + 1]);
        } else if (operators[i] === '+') {
          res[operatorIndex-1] = parseFloat(res[operatorIndex-1]) + parseFloat(res[operatorIndex + 1]);
        }
        res.splice(operatorIndex,2);
      }
     }

     return res[0];
   }

   processKey(key) {

      if (!this.Helper.validade(key, this.expression))
        return;

      if (this.Helper.isEquals(key))
        return this.concludeCalculation()

      this.incrementExpression(key);
   }

   saveCalculation() {
     let calculation = new Calculation(new Date(), this.expression, this.result);
     this._listCalculation.add(calculation);
     console.log(this._listCalculation.calculations);
   }

   concludeCalculation() {
     let answer = this.calculate();
     this.defineResults(answer);
     this.saveCalculation();
     this.resetFields();
   }
}
