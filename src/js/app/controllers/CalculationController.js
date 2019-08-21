'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalculationController = function () {
  function CalculationController() {
    _classCallCheck(this, CalculationController);

    var $ = document.querySelector.bind(document);
    this._answered = false;
    this._calculatorBody = $('[data-calc]');

    this._service = new CalculationService();
    this._calculationModel = new DefaultCalculation();
    this._calculationView = new CalculationView($('[data-calc-history]'));

    this._listCalculation = new Bind(new ListCalculations(), this._calculationView, 'add', 'remove', 'sortByDate');
    this._listCalculationDirection = true;

    this._display = new Bind(new Display(this._calculationModel.expression, this._calculationModel.result), new DisplayView($('[data-display]')), 'addToLast', 'addToCurrent');

    this._init();
  }

  _createClass(CalculationController, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      this._service.requestLocalCalculations().then(function (calculations) {
        return calculations.forEach(function (calculation) {
          return _this._listCalculation.add(calculation);
        });
      });

      document.addEventListener('keydown', function (e) {
        var key = CalculationHelper.getCalculatorKeyByCode(e.keyCode);
        if (key) _this.processKey(key);
      });
    }
  }, {
    key: 'resetFields',
    value: function resetFields() {
      this._calculationModel.expression = '';
      this._calculationModel.result = '';
      this._answered = false;
      this._display.addToLast(this._calculationModel.expression);
      this._display.addToCurrent(this._calculationModel.result);
    }
  }, {
    key: 'incrementExpression',
    value: function incrementExpression(key) {
      this._calculationModel.expression += key;
      this._display.addToCurrent(this._calculationModel.expression);
    }
  }, {
    key: 'defineResults',
    value: function defineResults(result) {
      this._calculationModel.result = result;
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      var operation = CalculationHelper.splitExpression(this._calculationModel.expression);
      var operators = CalculationHelper.getOperators();
      var res = Array.from(operation);
      for (var i = 0; i < operators.length; i++) {
        while (res.includes(operators[i])) {
          var operatorIndex = res.indexOf(operators[i]);
          if (operators[i] === '/') {
            res[operatorIndex - 1] = parseFloat(res[operatorIndex - 1]) / parseFloat(res[operatorIndex + 1]);
          } else if (operators[i] === 'x') {
            res[operatorIndex - 1] = parseFloat(res[operatorIndex - 1]) * parseFloat(res[operatorIndex + 1]);
          } else if (operators[i] === '-') {
            res[operatorIndex - 1] = parseFloat(res[operatorIndex - 1]) - parseFloat(res[operatorIndex + 1]);
          } else if (operators[i] === '+') {
            res[operatorIndex - 1] = parseFloat(res[operatorIndex - 1]) + parseFloat(res[operatorIndex + 1]);
          }
          res.splice(operatorIndex, 2);
        }
      }

      return res[0];
    }
  }, {
    key: 'processKey',
    value: function processKey(key) {

      if (this._answered && CalculationHelper.isNumber(key)) this._calculationModel.expression = '';

      this._answered = false;

      if (CalculationHelper.isEquals(key) && !this._calculationModel.expression) return;

      if (!CalculationHelper.validade(key, this._calculationModel.expression)) return;

      if (CalculationHelper.isEquals(key)) {
        return this.concludeCalculation();
      }

      if (CalculationHelper.isCleaner(key)) return this.resetFields();

      this.incrementExpression(key);
    }
  }, {
    key: 'saveCalculation',
    value: function saveCalculation() {
      var _this2 = this;

      var calculation = new Calculation(new Date(), this._calculationModel.expression, this._calculationModel.result);

      this._service.postCalculation(calculation).then(function () {
        return _this2._listCalculation.add(calculation);
      });

      this._display.addToLast(this._calculationModel.expression);
      this._display.addToCurrent(this._calculationModel.result);

      this._answered = true;
      this._calculationModel.expression = this._calculationModel.result = calculation.result.toString();
    }
  }, {
    key: 'concludeCalculation',
    value: function concludeCalculation() {

      var answer = this.calculate();
      this.defineResults(answer);
      this.saveCalculation();
    }
  }, {
    key: 'deleteCalculationHistory',
    value: function deleteCalculationHistory() {
      var _this3 = this;

      this._service.clearCalculations().then(function () {
        return _this3._listCalculation.remove();
      });
    }
  }, {
    key: 'orderCalculationHistory',
    value: function orderCalculationHistory() {
      this._listCalculation.sortByDate(this._listCalculationDirection);
      this._listCalculationDirection = !this._listCalculationDirection;
    }
  }, {
    key: 'toggleHistoryMode',
    value: function toggleHistoryMode() {
      this._calculationView.toggleHistoryMode(this._calculatorBody);
    }
  }, {
    key: 'expression',
    get: function get() {
      return this._calculationModel.expression;
    }
  }, {
    key: 'result',
    get: function get() {
      return this._calculationModel.result;
    }
  }]);

  return CalculationController;
}();