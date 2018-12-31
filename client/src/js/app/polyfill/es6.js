if(!Array.prototype.includes) {

    console.log('Polyfill to Array.includes... Users still insist using Microsoft Browsers');

    Array.prototype.includes() = function(element) {
        return this.indexOf(element) != -1;
    };
}