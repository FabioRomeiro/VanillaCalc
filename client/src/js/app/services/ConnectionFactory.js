'use strict';

System.register([], function (_export2, _context2) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            System.register([], function (_export, _context) {
                "use strict";

                var _createClass, stores, dbName, version, connection, close, ConnectionFactory;

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

                        stores = ['calculations'];
                        dbName = 'vanillaframe';
                        version = 2;
                        connection = null;
                        close = null;

                        _export('ConnectionFactory', ConnectionFactory = function () {
                            function ConnectionFactory() {
                                _classCallCheck(this, ConnectionFactory);

                                throw new Error('Cannot instantiate ConnectionFactory because it is a static class');
                            }

                            _createClass(ConnectionFactory, null, [{
                                key: 'getConnection',
                                value: function getConnection() {

                                    return new Promise(function (resolve, reject) {

                                        var openRequest = window.indexedDB.open(dbName, version);

                                        openRequest.onupgradeneeded = function (e) {
                                            ConnectionFactory._createStores(e.target.result);
                                        };

                                        openRequest.onsuccess = function (e) {

                                            if (!connection) {

                                                connection = e.target.result;

                                                close = connection.close.bind(connection);
                                                connection.close = function () {
                                                    throw new Error('You can only close the connection directly by the function ConnectionFactory.closeConnection');
                                                };
                                            }
                                            resolve(connection);
                                        };

                                        openRequest.onerror = function (e) {
                                            console.log(e.target.error);
                                            reject(e.target.error.name);
                                        };
                                    });
                                }
                            }, {
                                key: '_createStores',
                                value: function _createStores(connection) {

                                    stores.forEach(function (store) {
                                        if (connection.objectStoreNames.contains(stores)) {
                                            connection.deleteObjectStore(store);
                                        }

                                        connection.createObjectStore(store, { autoIncrement: true });
                                    });
                                }
                            }, {
                                key: 'closeConnection',
                                value: function closeConnection() {
                                    if (!connection) {
                                        return;
                                    }
                                    close();
                                    connection = null;
                                }
                            }]);

                            return ConnectionFactory;
                        }());

                        _export('ConnectionFactory', ConnectionFactory);
                    }
                };
            });
        }
    };
});