class ProxyFactory {

    constructor() {
        throw new Error('Cannot instantiate ProxyFactory class because it is a static class');
    }
    
    static create(obj, props, callback) {
        return new Proxy(obj, {
            
            get(target, prop, receiver) {
            
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop]))
            
                     return function () {
                        Reflect.apply(target[prop], target, arguments);
                        callback(target);
                    };
                return Reflect.get(...arguments);
            },
            
            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    callback(target);
                }

                return Reflect.set(...arguments);
            }
        });
    }

    static _isFunction(property) {
        return typeof (property) == typeof (Function);
    }
}