class DisplayView extends View {
    
    constructor(element) {
        super(element);
    }

    template(model) {

        return `
            <p class="vanilla-calculator__last-text" data-display="last">${model.last}</p>
            <h3 class="vanilla-calculator__actual-text" data-display="current">${model.current}</h3>
        `;
    }
}