class CalculationService {

    constructor() {
        this._http = new HttpService();
    }

    requestCalculations() {

        return Promise.all([
            this.requestOldCalculations(),
            this.requestYesterdaysCalculations(),
            this.requestTodaysCalculations()
        ]).then(periods =>
            periods.reduce((calculations, array) => calculations.concat(array), [])
        ).catch(err => {
            throw new Error(err);
        });
    }

    requestTodaysCalculations() {

        return new Promise((resolve,reject) => {

            this._http.get('http://localhost:9003/calcs/day')
                .then(calculations =>
                    resolve(calculations.map(item => new Calculation(new Date(item.date), item.expression, item.result))))
                .catch(err => reject(err));
        });
    }

    requestYesterdaysCalculations() {

        return new Promise((resolve,reject) => {

            this._http.get('http://localhost:9003/calcs/yesterday')
                .then(calculations =>
                    resolve(calculations.map(item => new Calculation(new Date(item.date), item.expression, item.result))))
                .catch(err => reject(err));
        });
    }

    requestOldCalculations() {

        return new Promise((resolve,reject) => {

            this._http.get('http://localhost:9003/calcs/old')
                .then(calculations =>
                    resolve(calculations.map(item => new Calculation(new Date(item.date), item.expression, item.result))))
                .catch(err => reject(err));
        });
    }

    postCalculation(calculation) {

        return new Promise((resolve,reject) => {

            let content = JSON.stringify({
                date: calculation.date,
                expression: calculation.expression,
                result: calculation.result
            });

            this._http.post('http://localhost:9003/calc', content)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}