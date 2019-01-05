'use strict';

System.register([], function (_export2, _context2) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            System.register([], function (_export, _context) {
                "use strict";

                var _createClass, View;

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

                        _export('View', View = function () {
                            function View(element) {
                                _classCallCheck(this, View);

                                this._element = element;
                            }

                            _createClass(View, [{
                                key: 'template',
                                value: function template(model) {
                                    throw new Error('A view class must have a "template" method');
                                }
                            }, {
                                key: 'update',
                                value: function update(model) {
                                    this._element.innerHTML = this.template(model);
                                }
                            }]);

                            return View;
                        }());

                        _export('View', View);
                    }
                };
            });
        }
    };
});