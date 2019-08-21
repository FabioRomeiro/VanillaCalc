"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Display = function () {
    function Display(last, current) {
        _classCallCheck(this, Display);

        this._last = last;
        this._current = current;
    }

    _createClass(Display, [{
        key: "addToLast",
        value: function addToLast(newValue) {
            this._last = newValue;
        }
    }, {
        key: "addToCurrent",
        value: function addToCurrent(newValue) {
            this._current = newValue;
        }
    }, {
        key: "last",
        get: function get() {
            return this._last;
        }
    }, {
        key: "current",
        get: function get() {
            return this._current;
        }
    }]);

    return Display;
}();