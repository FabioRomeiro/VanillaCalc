'use strict';

System.register([], function (_export2, _context2) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            System.register(['./controllers/CalculationController', './polyfill/fetch'], function (_export, _context) {
                "use strict";

                var CalculationController, calculationController;
                return {
                    setters: [function (_controllersCalculationController) {
                        CalculationController = _controllersCalculationController.CalculationController;
                    }, function (_polyfillFetch) {}],
                    execute: function () {
                        calculationController = new CalculationController();


                        console.log('ta');

                        document.querySelector('[action=history-mode]').onclick = calculationController.toggleHistoryMode.bind(calculationController);
                        document.querySelector('[action=import-calculations]').onclick = calculationController.importCalculations.bind(calculationController);
                        document.querySelector('[action=ordenate-history]').onclick = calculationController.orderCalculationHistory.bind(calculationController);
                        document.querySelector('[action=delete-history]').onclick = calculationController.deleteCalculationHistory.bind(calculationController);

                        document.querySelector('[type=button]').onclick = function (e) {
                            console.log(e.target);
                        };
                    }
                };
            });
        }
    };
});