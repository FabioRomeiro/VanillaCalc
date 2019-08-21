'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calculation = function () {
  function Calculation() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var expression = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, Calculation);

    this._date = new Date(date.getTime());
    this._expression = expression;
    this._result = result;

    Object.freeze(this);
  }

  _createClass(Calculation, [{
    key: 'isEquals',
    value: function isEquals(otherCalculation) {
      return JSON.stringify(this) == JSON.stringify(otherCalculation);
    }
  }, {
    key: 'date',
    set: function set(ndate) {
      this._date = new Date(ndate.getTime());
    },
    get: function get() {
      return new Date(this._date.getTime());
    }
  }, {
    key: 'expression',
    set: function set(nexpression) {
      this._expression = nexpression;
    },
    get: function get() {
      return this._expression;
    }
  }, {
    key: 'result',
    set: function set(nresult) {
      this._result = nresult;
    },
    get: function get() {
      return this._result;
    }
  }]);

  return Calculation;
}();