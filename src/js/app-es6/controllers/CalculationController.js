class CalculationController {

   constructor(){
      
      let $ = document.querySelector.bind(document);
      this._answered = false;
      this._calculatorBody = $('[data-calc]');
      
      this._service = new CalculationService();
      this._calculationModel = new DefaultCalculation(); 
      this._calculationView = new CalculationView($('[data-calc-history]'));

      this._listCalculation = new Bind( 
        new ListCalculations(),
        this._calculationView,
        'add', 'remove', 'sortByDate'
      );
      this._listCalculationDirection = true;

      this._display = new Bind(
        new Display(this._calculationModel.expression, this._calculationModel.result),
        new DisplayView($('[data-display]')),
        'addToLast', 'addToCurrent'
      );

     this._init();
   }

   _init() {

      this._service
        .requestLocalCalculations()
        .then(calculations =>
          calculations.forEach(calculation =>
            this._listCalculation.add(calculation)));


      document.addEventListener('keydown', e => {
        let key = CalculationHelper.getCalculatorKeyByCode(e.keyCode);
        if (key) this.processKey(key);
      });
   }

   get expression() {
     return this._calculationModel.expression;
   }

   get result() {
     return this._calculationModel.result;
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
     let operation = CalculationHelper.splitExpression(this._calculationModel.expression);
     let operators = CalculationHelper.getOperators();
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

      if (this._answered && CalculationHelper.isNumber(key))
        this._calculationModel.expression = '';

      this._answered = false;
      
      if (CalculationHelper.isEquals(key) && !this._calculationModel.expression)
        return;

      if (!CalculationHelper.validade(key, this._calculationModel.expression))
        return;

      if (CalculationHelper.isEquals(key)) {
        return this.concludeCalculation();
      }

      if (CalculationHelper.isCleaner(key))
        return this.resetFields();

      this.incrementExpression(key);
   }

   saveCalculation() {

      let calculation = new Calculation(
        new Date(), 
        this._calculationModel.expression, 
        this._calculationModel.result
      );

      this._service
        .postCalculation(calculation)
        .then(() => this._listCalculation.add(calculation));
      
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

      this._service
          .clearCalculations()
          .then(() => this._listCalculation.remove());
   }

   orderCalculationHistory() {
     this._listCalculation.sortByDate(this._listCalculationDirection);
     this._listCalculationDirection = !this._listCalculationDirection;
   }

   toggleHistoryMode() {
      this._calculationView.toggleHistoryMode(this._calculatorBody);
   }
}