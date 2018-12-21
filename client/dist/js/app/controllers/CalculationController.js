class CalculationController {

   constructor(){
      // let $ = document.querySelector.bind(document);

      this._mapKeys();
      const thisClass = this;
      document.addEventListener('keydown', function(e) {

        let key = thisClass._getCalculatorKeyByCode(e.keyCode);
        if (key)
            thisClass._processKey(key);

        // thisClass._increases(e.keyCode);
      });
   }

   _mapKeys() {

     this.keyMap = {
       '/': [111,191],
       'x': [88,106],
       '-': [109,189],
       '+': [107,16+187],
       '=': [187,13],
       'CE': [8],
       '.': [110,190,188],
       'H': [72]
     };

     let cont = [48,96];
     for (let i = 0; i < 10; i++) {
       this.keyMap[i] = [cont[0], cont[1]];
       cont[0]++;
       cont[1]++;
     }

   }

   _getCalculatorKeyByCode(code) {

     let calculatorKeys = Object.keys(this.keyMap);
     let keysValues = Object.values(this.keyMap);

     for (let i = 0; i < keysValues.length; i++) {
       if (keysValues[i].includes(code))
        return calculatorKeys[i];
     }

     return undefined;
   }

   _processKey(key) {
     this.setInput(key);
   }

   _increases(digit) {
   }

   setInput(input) {
     console.log(input);
   }
}
