class CalculationDao {
    
    constructor(connection) {

        this._connection = connection;
        this._store = 'calculations';
    }

    add(calculation) {

        return new Promise((resolve,reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(calculation);
            
            request.onsuccess = e => resolve();
            request.onerror = e => {
                console.log(e.target.error);
                reject('Failed on saving calculation into IndexedDB');
            };
        });
    }

    listAll() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let calculations = [];

            cursor.onsuccess = e => {
                let actual = e.target.result;

                if (actual) {

                    let data = actual.value;

                    calculations.push(new Calculation(data._date, data._expression, data._result));
                    
                    actual.continue();
                } else {
                    resolve(calculations);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Failed on listing calculation from IndexedDB');
            };
        });
    }

    clearAll() {
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite') 
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve(); 

            request.onerror = e => {
                console.log(e.target.error);
                reject('Failed on deleting calculation from IndexedDB');
            };
        });
    }
}