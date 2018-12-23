class CalculationHelper {

  constructor() {
      this.keyMap = this._generateMapKeys();
  }

  _generateMapKeys() {

    let keyMap = {
      '/': {
        type: 'operator',
        order: 0,
        codes: [111,191]
      },
      'x': {
        type: 'operator',
        order: 1,
        codes: [88,106]
      },
      '-': {
        type: 'operator',
        order: 2,
        codes: [109,189]
      },
      '+': {
        type: 'operator',
        order: 4,
        codes: [107,16+187]
      },
      '=': {
        type: 'equals',
        codes: [187,13]
      },
      'CE': {
        type: 'cleaner',
        codes: [8]
      },
      '.': {
        type: 'decimal',
        codes: [110,190,188]
      },
      'H': {
        type: 'command',
        codes: [72]
      }
    };

    let cont = [48,96];
    for (let i = 0; i < 10; i++) {
      keyMap[i] = {
        type: 'number',
        codes: [cont[0], cont[1]]
      };
      cont = cont.map(item => item + 1);
    }

    return keyMap;
  }

  getOperators() {

    let operators = [];

    for (let operator in this.keyMap) {
      let opInfo = this.keyMap[operator];

      if (opInfo.type === 'operator')
        operators[opInfo.order] = operator;
    }

    return operators;
  }

  isCommand(key) {
    return this.getKeyInfo(key).type === 'command';
  }

  isCleaner(key) {
    return this.getKeyInfo(key).type === 'cleaner';
  }

  isEquals(key) {
    return this.getKeyInfo(key).type === 'equals';
  }

  isOperator(key) {
    return this.getKeyInfo(key).type === 'operator';
  }

  isNumber(key) {
    return this.getKeyInfo(key).type === 'number';
  }

  validade(key, expression) {
    let last_digit = expression[expression.length - 1];

    try {
      if (this.isEquals(key) && this.isOperator(last_digit)) {
        throw new Error("The expression is missing a number to calculate");
      } else if (this.isOperator(key) && !expression) {
        throw new Error("Cannot start a expression with an operator");
      } else if (this.isOperator(key) && this.isOperator(last_digit)) {
        throw new Error("Cannot calculate a operator with another operator");
      }
    } catch (e) {
      alert(e);
      return false;
    }

    return true;
  }

  splitExpression(expression) {
    let operation = [];
    let sliceIndex = 0;

    for (let i = 0; i < expression.length; i++) {
      if (this.isOperator(expression[i]) && i !== 0) {
        operation.push(expression.slice(sliceIndex, i));
        operation.push(expression[i]);

        sliceIndex = i + 1;
      }
      if (i == expression.length - 1) {
        operation.push(expression.slice(sliceIndex, expression.length));
      }
    }

    return operation;
  }

  getKeyInfo(key) {
    return this.keyMap[key];
  }

  getCalculatorKeyByCode(code) {
    return Object
            .keys(this.keyMap)
            .find(item => this.keyMap[item].codes.includes(code))
           || undefined;
  }

}
