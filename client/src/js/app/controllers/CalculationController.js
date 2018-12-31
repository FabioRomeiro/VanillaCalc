class CalculationController {

   constructor(){
      
      let $ = document.querySelector.bind(document);
      this._answered = false;
      this._calculatorBody = $('[data-calc]');
      
      this.Helper = new CalculationHelper();
      this._service = new CalculationService();
      this._calculationModel = new DefaultCalculation(); 
      this._calculationView = new CalculationView($('[data-calc-history]'));

      this._listCalculation = new Bind(
        new ListCalculations(),
        this._calculationView,
        'add', 'remove', 'sortByDate'
      );

      this.importCalculations();

      this._display = new Bind(
        new Display(this._calculationModel.expression, this._calculationModel.result),
        new DisplayView($('[data-display]')),
        'addToLast', 'addToCurrent'
      );

      document.addEventListener('keydown', e => {
        let key = this.Helper.getCalculatorKeyByCode(e.keyCode);
        if (key) this.processKey(key);
      });
   }

   get expression() {
     return this._calculationModel.expression;
   }

   get result() {
     return this._calculationModel.result;
   }

   importCalculations() {

      this._service.requestCalculations()
        .then(allCalculations => 
            allCalculations
              .forEach(calculation => this._listCalculation.add(calculation))
        );
   }

   resetFields() {
     this._calculationModel.expression = '';
     this._calculationModel.result = '';
     this._answered = false;
     this._display.addToLast(this._calculationModel.expression);
     this._display.addToCurrent(this._calculationModel.result);
   }

   incrementExpression(key) {
     this._calculationModel.expression += key;
     this._display.addToCurrent(this._calculationModel.expression);
   }

   defineResults(result) {
     this._calculationModel.result = result;
   }

   calculate() {
     let operation = this.Helper.splitExpression(this._calculationModel.expression);
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

      if (this._answered && this.Helper.isNumber(key))
        this._calculationModel.expression = '';

      this._answered = false;
      
      if (this.Helper.isEquals(key) && !this._calculationModel.expression)
        return;

      if (!this.Helper.validade(key, this._calculationModel.expression))
        return;

      if (this.Helper.isEquals(key)) {
        return this.concludeCalculation();
      }

      if (this.Helper.isCleaner(key))
        return this.resetFields();

      this.incrementExpression(key);
   }

   saveCalculation() {
     let calculation = new Calculation(
        new Date(), 
        this._calculationModel.expression, 
        this._calculationModel.result
      );

      this._listCalculation.add(calculation);
      this._service.postCalculation(calculation)
        .catch(err => console.log(err));

      this._display.addToLast(this._calculationModel.expression);
      this._display.addToCurrent(this._calculationModel.result);

      this._answered = true;
      this._calculationModel.expression = this._calculationModel.result = calculation.result.toString();
   }

   concludeCalculation() {

      let answer = this.calculate();
      this.defineResults(answer);
      this.saveCalculation();
   }

   deleteCalculationHistory() {
     this._listCalculation.remove();
   }

   orderCalculationHistory() {
     this._listCalculation.sortByDate();
   }

   toggleHistoryMode() {
      this._calculationView.toggleHistoryMode(this._calculatorBody);
   }
}
