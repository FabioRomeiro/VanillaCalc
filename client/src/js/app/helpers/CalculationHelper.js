'use strict';

System.register([], function (_export2, _context2) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      System.register([], function (_export, _context) {
        "use strict";

        var _createClass, keyMap, CalculationHelper;

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _generateMapKeys() {

          var keymap = {
            '/': {
              type: 'operator',
              order: 0,
              codes: [111, 191]
            },
            'x': {
              type: 'operator',
              order: 1,
              codes: [88, 106]
            },
            '-': {
              type: 'operator',
              order: 2,
              codes: [109, 189]
            },
            '+': {
              type: 'operator',
              order: 4,
              codes: [107, 16 + 187]
            },
            '=': {
              type: 'equals',
              codes: [187, 13]
            },
            'CE': {
              type: 'cleaner',
              codes: [8]
            },
            '.': {
              type: 'decimal',
              codes: [110, 190, 188]
            },
            'H': {
              type: 'command',
              codes: [72]
            }
          };

          var cont = [48, 96];
          for (var i = 0; i < 10; i++) {
            keymap[i] = {
              type: 'number',
              codes: [cont[0], cont[1]]
            };
            cont = cont.map(function (item) {
              return item + 1;
            });
          }

          return keymap;
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

            keyMap = _generateMapKeys();

            _export('CalculationHelper', CalculationHelper = function () {
              function CalculationHelper() {
                _classCallCheck(this, CalculationHelper);

                throw new Error('Cannot instantiate CalculationHelper because it is a static class');
              }

              _createClass(CalculationHelper, null, [{
                key: 'getOperators',
                value: function getOperators() {

                  var operators = [];

                  for (var operator in keyMap) {
                    var opInfo = keyMap[operator];

                    if (opInfo.type === 'operator') operators[opInfo.order] = operator;
                  }

                  return operators;
                }
              }, {
                key: 'isCommand',
                value: function isCommand(key) {
                  return this.getKeyInfo(key).type === 'command';
                }
              }, {
                key: 'isCleaner',
                value: function isCleaner(key) {
                  return this.getKeyInfo(key).type === 'cleaner';
                }
              }, {
                key: 'isEquals',
                value: function isEquals(key) {
                  return this.getKeyInfo(key).type === 'equals';
                }
              }, {
                key: 'isOperator',
                value: function isOperator(key) {
                  return this.getKeyInfo(key).type === 'operator';
                }
              }, {
                key: 'isNumber',
                value: function isNumber(key) {
                  return this.getKeyInfo(key).type === 'number';
                }
              }, {
                key: 'hasDecimal',
                value: function hasDecimal(expression) {
                  for (var i = expression.length - 1; i > 0; i--) {
                    if (this.isOperator(expression[i])) break;else if (expression[i] === '.') return true;
                  }
                  return false;
                }
              }, {
                key: 'validade',
                value: function validade(key, expression) {
                  var last_digit = expression[expression.length - 1];

                  try {
                    if (key === '.' && this.hasDecimal(expression)) {
                      throw new Error("This number is already a decimal");
                    } else if (this.isEquals(key) && this.isOperator(last_digit)) {
                      throw new Error("The expression is missing a number to calculate");
                    } else if (this.isOperator(key) && !expression) {
                      throw new Error("Cannot start a expression with an operator");
                    } else if (this.isOperator(key) && this.isOperator(last_digit)) {
                      throw new Error("Cannot calculate a operator with another operator");
                    }
                  } catch (e) {
                    alert(e);
                    return false;
                  }

                  return true;
                }
              }, {
                key: 'splitExpression',
                value: function splitExpression(expression) {
                  var operation = [];
                  var sliceIndex = 0;

                  for (var i = 0; i < expression.length; i++) {
                    if (this.isOperator(expression[i]) && i !== 0) {
                      operation.push(expression.slice(sliceIndex, i));
                      operation.push(expression[i]);

                      sliceIndex = i + 1;
                    }
                    if (i == expression.length - 1) {
                      operation.push(expression.slice(sliceIndex, expression.length));
                    }
                  }

                  return operation;
                }
              }, {
                key: 'getKeyInfo',
                value: function getKeyInfo(key) {
                  return keyMap[key];
                }
              }, {
                key: 'getCalculatorKeyByCode',
                value: function getCalculatorKeyByCode(code) {
                  return Object.keys(keyMap).find(function (item) {
                    return keyMap[item].codes.includes(code);
                  }) || undefined;
                }
              }]);

              return CalculationHelper;
            }());

            _export('CalculationHelper', CalculationHelper);
          }
        };
      });
    }
  };
});