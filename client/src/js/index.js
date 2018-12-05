var keys = document.querySelectorAll('[data-type]');
var operators = [];

document.querySelectorAll('[data-type=operator]').forEach(function(item){
  operators.push(item.getAttribute('name'));
});

var digits = [];
var operation = [];

var display = {
  lastop: document.querySelector('[data-display=last]'),
  current: document.querySelector('[data-display=current]')
};

function calculate() {

  var result = operation;

  var has_operator = result.some(function(item) {
    return operators.includes(item);
  });

  while (result.includes("/")) {
    var divisionIndex = result.indexOf("/");

    if (divisionIndex > -1) {
      var numerador = parseFloat(result.splice(divisionIndex-1,2)[0]);
      result[divisionIndex-1] = numerador / parseFloat(result[divisionIndex-1]);
    }
  }

  while (result.includes("x")) {
    var multiplicationIndex = result.indexOf("x");

    if (multiplicationIndex > -1) {
      var numerador = parseFloat(result.splice(multiplicationIndex-1,2)[0]);
      result[multiplicationIndex-1] = numerador * parseFloat(result[multiplicationIndex-1]);
    }
  }

  // while (result.includes("-")) {
  //   var subIndex = result.indexOf("-");
  //   console.log("INDEX DO - :" + subIndex);
  //   console.log(result[1]);
  //   console.log(result[0]);
  //
  //   if (subIndex > -1) {
  //     var numerador = parseFloat(result.splice(subIndex-1,2)[0]);
  //     result[subIndex-1] = numerador - parseFloat(result[subIndex-1]);
  //   }
  // }

  return result;
}

function isolate_numbers() {
  operation.push(digits.join(''));
}

function clear_all() {
  display.current.textContent = '';
  operation = [];
  digits = [];
}

function clear_digits() {
  digits = [];
}

function update_display(digit) {
  display.current.textContent += digit;
}

function display_answer(answer) {
  display.current.textContent = answer;
}

keys.forEach(function(item) {
  if (item.getAttribute('disabled') !== null) {
    return;
  }

  item.addEventListener('click', function() {

    var key = item.getAttribute('name');
    var key_type = item.getAttribute('data-type');

    if (key_type == 'operator') {
      isolate_numbers();
      operation.push(key);
      clear_digits();
      update_display(key);
    } else if (key_type == 'number') {
      digits.push(key);
      update_display(key);
    } else if (key_type == 'cleaner') {
      clear_all();
    } else if (key_type == 'equals') {
      isolate_numbers();
      clear_digits();
      display_answer(calculate());
    }
  });
});
