'use strict';

System.register([], function (_export2, _context2) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            System.register(['./View'], function (_export, _context) {
                "use strict";

                var View, _createClass, CalculationView;

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                function _possibleConstructorReturn(self, call) {
                    if (!self) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }

                    return call && (typeof call === "object" || typeof call === "function") ? call : self;
                }

                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    }

                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                }

                return {
                    setters: [function (_View2) {
                        View = _View2.View;
                    }],
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

                        _export('CalculationView', CalculationView = function (_View) {
                            _inherits(CalculationView, _View);

                            function CalculationView(element) {
                                _classCallCheck(this, CalculationView);

                                return _possibleConstructorReturn(this, (CalculationView.__proto__ || Object.getPrototypeOf(CalculationView)).call(this, element));
                            }

                            _createClass(CalculationView, [{
                                key: 'template',
                                value: function template(model) {
                                    var _this2 = this;

                                    return '\n            <ul class="calculation-list" data-calc-list>\n                ' + model.calculations.map(function (item) {
                                        return '\n                    <li class="calculation-list__item">\n                        <span class="item-date">\n                            ' + _this2.getDateTemplate(item.date) + ' - ' + _this2.getTimeTemplate(item.date) + ' \n                        </span>\n                        <span class="item-calc">\n                            ' + item.expression + ' = ' + item.result + '\n                        </span>\n                    </li>\n                ';
                                    }).join('') + '\n            </ul>\n        ';
                                }
                            }, {
                                key: 'getDateTemplate',
                                value: function getDateTemplate(date) {
                                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                                }
                            }, {
                                key: 'getTimeTemplate',
                                value: function getTimeTemplate(date) {
                                    return date.getHours() + ':' + date.getMinutes();
                                }
                            }, {
                                key: 'toggleHistoryMode',
                                value: function toggleHistoryMode(calculator) {
                                    var className = 'vanilla-calculator--history-mode';

                                    if (calculator.classList.contains(className)) {
                                        return calculator.classList.remove(className);
                                    }

                                    return calculator.classList.add(className);
                                }
                            }]);

                            return CalculationView;
                        }(View));

                        _export('CalculationView', CalculationView);
                    }
                };
            });
        }
    };
});