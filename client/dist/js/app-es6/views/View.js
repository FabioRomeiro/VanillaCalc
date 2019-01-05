export class View {

    constructor(element) {
        this._element = element;
    }

    template(model) {
        throw new Error('A view class must have a "template" method');
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}