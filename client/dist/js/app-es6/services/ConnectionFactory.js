const stores = ['calculations'];
const dbName = 'vanillaframe';
const version = 2;

let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Cannot instantiate ConnectionFactory because it is a static class');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            
            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };
            
            openRequest.onsuccess = e => {

                if (!connection) {
                    
                    connection = e.target.result;
                    
                    close = connection.close.bind(connection);
                    connection.close = () => {
                        throw new Error('You can only close the connection directly by the function ConnectionFactory.closeConnection')
                    };
                }
                resolve(connection);
            };

            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection) {

        stores.forEach(store => {
            if (connection.objectStoreNames.contains(stores)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection() {
        if (!connection) {
            return;
        }
        close();
        connection = null;
    }
}