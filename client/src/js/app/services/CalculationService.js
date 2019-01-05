'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalculationService = function () {
    function CalculationService() {
        _classCallCheck(this, CalculationService);

        this._http = new HttpService();
    }

    _createClass(CalculationService, [{
        key: 'requestLocalCalculations',
        value: function requestLocalCalculations() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new CalculationDao(connection);
            }).then(function (dao) {
                return dao.listAll();
            });
        }
    }, {
        key: 'requestCalculations',
        value: function requestCalculations() {

            return Promise.all([this.requestOldCalculations(), this.requestYesterdaysCalculations(), this.requestTodaysCalculations()]).then(function (periods) {
                return periods.reduce(function (calculations, array) {
                    return calculations.concat(array);
                }, []);
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    }, {
        key: 'requestTodaysCalculations',
        value: function requestTodaysCalculations() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                _this._http.get('http://localhost:9003/calcs/day').then(function (calculations) {
                    return resolve(calculations.map(function (item) {
                        return new Calculation(new Date(item.date), item.expression, item.result);
                    }));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'requestYesterdaysCalculations',
        value: function requestYesterdaysCalculations() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                _this2._http.get('http://localhost:9003/calcs/yesterday').then(function (calculations) {
                    return resolve(calculations.map(function (item) {
                        return new Calculation(new Date(item.date), item.expression, item.result);
                    }));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'requestOldCalculations',
        value: function requestOldCalculations() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                _this3._http.get('http://localhost:9003/calcs/old').then(function (calculations) {
                    return resolve(calculations.map(function (item) {
                        return new Calculation(new Date(item.date), item.expression, item.result);
                    }));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'postCalculation',
        value: function postCalculation(calculation) {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new CalculationDao(connection);
            }).then(function (dao) {
                return dao.add(calculation);
            })
            /*.then(() => {
                 let content = {
                    date: calculation.date,
                    expression: calculation.expression,
                    result: calculation.result
                };
                 this._http
                    .post('http://localhost:9003/calc', content)                    
                    .catch(err => {
                        throw new Error(err); 
                    });
            })*/;
        }
    }, {
        key: 'clearCalculations',
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