'use strict';

System.register([], function (_export2, _context2) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            System.register([], function (_export, _context) {
                "use strict";

                var _typeof, _createClass, ProxyFactory;

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                return {
                    setters: [],
                    execute: function () {
                        _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                            return typeof obj;
                        } : function (obj) {
                            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                        };

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

                        _export('ProxyFactory', ProxyFactory = function () {
                            function ProxyFactory() {
                                _classCallCheck(this, ProxyFactory);

                                throw new Error('Cannot instantiate ProxyFactory class because it is a static class');
                            }

                            _createClass(ProxyFactory, null, [{
                                key: 'create',
                                value: function create(obj, props, callback) {
                                    return new Proxy(obj, {
                                        get: function get(target, prop, receiver) {

                                            if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) return function () {
                                                Reflect.apply(target[prop], target, arguments);
                                                callback(target);
                                            };
                                            return Reflect.get.apply(Reflect, arguments);
                                        },
                                        set: function set(target, prop, value, receiver) {
                                            if (props.includes(prop)) {
                                                callback(target);
                                            }

                                            return Reflect.set.apply(Reflect, arguments);
                                        }
                                    });
                                }
                            }, {
                                key: '_isFunction',
                                value: function _isFunction(property) {
                                    return (typeof property === 'undefined' ? 'undefined' : _typeof(property)) == (typeof Function === 'undefined' ? 'undefined' : _typeof(Function));
                                }
                            }]);

                            return ProxyFactory;
                        }());

                        _export('ProxyFactory', ProxyFactory);
                    }
                };
            });
        }
    };
});