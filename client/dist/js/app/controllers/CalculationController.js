"use strict";var _createClass=function(){function i(e,t){for(var l=0;l<t.length;l++){var i=t[l];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,l){return t&&i(e.prototype,t),l&&i(e,l),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var CalculationController=function(){function t(){_classCallCheck(this,t);var e=document.querySelector.bind(document);this._answered=!1,this._calculatorBody=e("[data-calc]"),this._service=new CalculationService,this._calculationModel=new DefaultCalculation,this._calculationView=new CalculationView(e("[data-calc-history]")),this._listCalculation=new Bind(new ListCalculations,this._calculationView,"add","remove","sortByDate"),this._listCalculationDirection=!0,this._display=new Bind(new Display(this._calculationModel.expression,this._calculationModel.result),new DisplayView(e("[data-display]")),"addToLast","addToCurrent"),this._init()}return _createClass(t,[{key:"_init",value:function(){var l=this;this._service.requestLocalCalculations().then(function(e){return e.forEach(function(e){return l._listCalculation.add(e)})}),document.addEventListener("keydown",function(e){var t=CalculationHelper.getCalculatorKeyByCode(e.keyCode);t&&l.processKey(t)})}},{key:"importCalculations",value:function(){var l=this;this._service.requestCalculations().then(function(e){return e.filter(function(t){return!l._listCalculation.calculations.some(function(e){return t.isEquals(e)})})}).then(function(e){return e.forEach(function(e){return l._listCalculation.add(e)})})}},{key:"resetFields",value:function(){this._calculationModel.expression="",this._calculationModel.result="",this._answered=!1,this._display.addToLast(this._calculationModel.expression),this._display.addToCurrent(this._calculationModel.result)}},{key:"incrementExpression",value:function(e){this._calculationModel.expression+=e,this._display.addToCurrent(this._calculationModel.expression)}},{key:"defineResults",value:function(e){this._calculationModel.result=e}},{key:"calculate",value:function(){for(var e=CalculationHelper.splitExpression(this._calculationModel.expression),t=CalculationHelper.getOperators(),l=Array.from(e),i=0;i<t.length;i++)for(;l.includes(t[i]);){var a=l.indexOf(t[i]);"/"===t[i]?l[a-1]=parseFloat(l[a-1])/parseFloat(l[a+1]):"x"===t[i]?l[a-1]=parseFloat(l[a-1])*parseFloat(l[a+1]):"-"===t[i]?l[a-1]=parseFloat(l[a-1])-parseFloat(l[a+1]):"+"===t[i]&&(l[a-1]=parseFloat(l[a-1])+parseFloat(l[a+1])),l.splice(a,2)}return l[0]}},{key:"processKey",value:function(e){if(this._answered&&CalculationHelper.isNumber(e)&&(this._calculationModel.expression=""),this._answered=!1,(!CalculationHelper.isEquals(e)||this._calculationModel.expression)&&CalculationHelper.validade(e,this._calculationModel.expression))return CalculationHelper.isEquals(e)?this.concludeCalculation():CalculationHelper.isCleaner(e)?this.resetFields():void this.incrementExpression(e)}},{key:"saveCalculation",value:function(){var e=this,t=new Calculation(new Date,this._calculationModel.expression,this._calculationModel.result);this._service.postCalculation(t).then(function(){return e._listCalculation.add(t)}),this._display.addToLast(this._calculationModel.expression),this._display.addToCurrent(this._calculationModel.result),this._answered=!0,this._calculationModel.expression=this._calculationModel.result=t.result.toString()}},{key:"concludeCalculation",value:function(){var e=this.calculate();this.defineResults(e),this.saveCalculation()}},{key:"deleteCalculationHistory",value:function(){var e=this;this._service.clearCalculations().then(function(){return e._listCalculation.remove()})}},{key:"orderCalculationHistory",value:function(){this._listCalculation.sortByDate(this._listCalculationDirection),this._listCalculationDirection=!this._listCalculationDirection}},{key:"toggleHistoryMode",value:function(){this._calculationView.toggleHistoryMode(this._calculatorBody)}},{key:"expression",get:function(){return this._calculationModel.expression}},{key:"result",get:function(){return this._calculationModel.result}}]),t}();
//# sourceMappingURL=CalculationController.js.map
