import {currentInstance} from './controllers/CalculationController';

let calculationController = currentInstance();

let $ = document.querySelector.bind(document); 

$('[action=history-mode]').onclick = calculationController.toggleHistoryMode.bind(calculationController);
$('[action=import-calculations]').onclick = calculationController.importCalculations.bind(calculationController);
$('[action=ordenate-history]').onclick = calculationController.orderCalculationHistory.bind(calculationController);
$('[action=delete-history]').onclick = calculationController.deleteCalculationHistory.bind(calculationController);

$('[type=button]').onclick = function(e) { 
    console.log(e.target);
};
