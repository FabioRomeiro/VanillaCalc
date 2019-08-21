class CalculationService {

    constructor() {
        this._http = new HttpService();
    }

    requestLocalCalculations() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new CalculationDao(connection))
            .then(dao => dao.listAll());
    }

    postCalculation(calculation) {
        
        return ConnectionFactory
            .getConnection()
            .then(connection => new CalculationDao(connection))
            .then(dao => dao.add(calculation));
    }

    clearCalculations() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new CalculationDao(connection))
            .then(dao => dao.clearAll());
    }
}