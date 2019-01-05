'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultCalculation = function () {
    function DefaultCalculation() {
        var expression = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        _classCallCheck(this, DefaultCalculation);

        this._expression = expression;
        this._result = result;
    }

    _createClass(DefaultCalculation, [{
        key: 'expression',
        get: function get() {
            return this._expression;
        },
        set: function set(newValue) {
            this._expression = newValue;
        }
    }, {
        key: 'result',
        get: function get() {
            return this._result;
        },
        set: function set(newValue) {
            this._result = newValue;
        }
    }]);

    return DefaultCalculation;
}();