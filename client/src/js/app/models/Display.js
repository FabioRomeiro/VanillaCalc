"use strict";

System.register([], function (_export2, _context2) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            System.register([], function (_export, _context) {
                "use strict";

                var _createClass, Display;

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

                        _export("Display", Display = function () {
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
                        }());

                        _export("Display", Display);
                    }
                };
            });
        }
    };
});