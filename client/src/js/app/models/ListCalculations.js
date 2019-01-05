"use strict";

System.register([], function (_export2, _context2) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      System.register([], function (_export, _context) {
        "use strict";

        var _createClass, ListCalculations;

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        return {
          setters: [],
          execute: function () {
            _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();

            _export("ListCalculations", ListCalculations = function () {
              function ListCalculations() {
                _classCallCheck(this, ListCalculations);

                this._calculations = [];
              }

              _createClass(ListCalculations, [{
                key: "add",
                value: function add(calculation) {
                  this._calculations.push(calculation);
                }
              }, {
                key: "remove",
                value: function remove() {
                  this._calculations = [];
                }
              }, {
                key: "sortByDate",
                value: function sortByDate(increase) {
                  var ordenateAlgorithm = function ordenateAlgorithm(a, b) {
                    return a.date - b.date;
                  };
                  if (increase) {
                    this._calculations.sort(ordenateAlgorithm);
                  } else {
                    this._calculations.reverse(ordenateAlgorithm);
                  }
                }
              }, {
                key: "calculations",
                get: function get() {
                  return [].concat(this._calculations);
                }
              }]);

              return ListCalculations;
            }());

            _export("ListCalculations", ListCalculations);
          }
        };
      });
    }
  };
});