"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalculationService = function () {
    function CalculationService() {
        _classCallCheck(this, CalculationService);

        this._http = new HttpService();
    }

    _createClass(CalculationService, [{
        key: "requestLocalCalculations",
        value: function requestLocalCalculations() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new CalculationDao(connection);
            }).then(function (dao) {
                return dao.listAll();
            });
        }
    }, {
        key: "postCalculation",
        value: function postCalculation(calculation) {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new CalculationDao(connection);
            }).then(function (dao) {
                return dao.add(calculation);
            });
        }
    }, {
        key: "clearCalculations",
        value: function clearCalculations() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new CalculationDao(connection);
            }).then(function (dao) {
                return dao.clearAll();
            });
        }
    }]);

    return CalculationService;
}();