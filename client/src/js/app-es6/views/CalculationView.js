import { View } from './View';

export class CalculationView extends View {
    
    constructor(element) {
        super(element);
    }

    template(model) {
        return `
            <ul class="calculation-list" data-calc-list>
                ${model.calculations.map(item => `
                    <li class="calculation-list__item">
                        <span class="item-date">
                            ${this.getDateTemplate(item.date)} - ${this.getTimeTemplate(item.date)} 
                        </span>
                        <span class="item-calc">
                            ${item.expression} = ${item.result}
                        </span>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    getDateTemplate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    getTimeTemplate(date) {
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    toggleHistoryMode(calculator) {
        let className = 'vanilla-calculator--history-mode';
        
        if (calculator.classList.contains(className)) {
            return calculator.classList.remove(className);
        }

        return calculator.classList.add(className);
    }
}