'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalculationDao = function () {
    function CalculationDao(connection) {
        _classCallCheck(this, CalculationDao);

        this._connection = connection;
        this._store = 'calculations';
    }

    _createClass(CalculationDao, [{
        key: 'add',
        value: function add(calculation) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(calculation);

                request.onsuccess = function (e) {
                    return resolve();
                };
                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Failed on saving calculation into IndexedDB');
                };
            });
        }
    }, {
        key: 'listAll',
        value: function listAll() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                var calculations = [];

                cursor.onsuccess = function (e) {
                    var actual = e.target.result;

                    if (actual) {

                        var data = actual.value;

                        calculations.push(new Calculation(data._date, data._expression, data._result));

                        actual.continue();
                    } else {
                        resolve(calculations);
                    }
                };

                cursor.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Failed on listing calculation from IndexedDB');
                };
            });
        }
    }, {
        key: 'clearAll',
        value: function clearAll() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

                var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    return resolve();
                };

                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Failed on deleting calculation from IndexedDB');
                };
            });
        }
    }]);

    return CalculationDao;
}();