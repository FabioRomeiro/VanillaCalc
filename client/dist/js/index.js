var operation = "";

var key;
var key_type;

var numbers = []
var operators = ['/','x','-','+'];

var raw_numbers = document.querySelectorAll('[data-type=number]');

// var raw_operators = document.querySelectorAll('[data-type=operator]');
// raw_operators.forEach(function(item) {
//   operators.push(item.getAttribute('name'));
// });

raw_numbers.forEach(function(item) {
  numbers.push(item.getAttribute('name'));
});

var operators_key_map = {
  '/': [111,191],
  'x': [88,106],
  '-': [109,189],
  '+': [107,16+187],
  '=': [187,13],
  'CE': [8]
};

var numbers_key_map = {
  '.': [110,190,188]
};

function maping_numbers() {
  var cont = [48,96];
  for (var i = 0; i < 10; i++) {
    numbers_key_map[i] = [cont[0], cont[1]];
    cont[0]++;
    cont[1]++;
  }
}

var answered = false;
var answer = null;

var display = {
  last_operation: document.querySelector('[data-display=last]'),
  current_operation: document.querySelector('[data-display=current]')
};

var keys = document.querySelectorAll('[data-type]');
var click_events = document.querySelectorAll('[data-click-event]');
var calc_body = document.querySelector('[data-calc]');;
var history_list = document.querySelector('[data-calc-list]');

click_events.forEach(function(click){
  var attribute = click.getAttribute('data-click-event');

  click.addEventListener('click', function(){
      if (attribute === 'history') {
        toggle_history();
      }
  });
});

function toggle_history() {
  if (calc_body.getAttribute('history-on') !== null) {
    calc_body.classList.remove('vanilla-calculator--history-mode');
    calc_body.removeAttribute('history-on');
    return;
  }
  calc_body.setAttribute('history-on', '');
  calc_body.classList.add('vanilla-calculator--history-mode');
}

function _key_is_enabled(key) {
  return key.getAttribute('disabled') === null;
}

function _type_is_operator(key_type) {
  return key_type === 'operator';
}

function clear() {
  operation = "";
  answered = false;
  answer = null;
  _update_display('current_operation', '');
  _update_display('last_operation', '');
}

function _update_display(monitor, new_value) {
  display[monitor].textContent = new_value;
};

function _is_operator(key) {
    return operators.includes(key);
}

function _is_number(key) {
    return numbers.includes(key);
}

function _split_operation(operation_string) {
    var split_operation = [];
    var slice_index = 0;

    for (var i = 0; i < operation_string.length; i++) {
      if (_is_operator(operation_string[i]) && i !== 0) {
        split_operation.push(operation_string.slice(slice_index, i));
        split_operation.push(operation_string[i]);
        slice_index = i + 1;
      }
      if (i == operation_string.length - 1) {
        split_operation.push(operation_string.slice(slice_index, operation_string.length));
      }
    }

    return split_operation;
}

function regist_operation(op, ans) {

    var today = new Date();

    var date = today.getDate() +
               '/' + today.getMonth() +
               '/' + today.getFullYear() +
               ' - ' + today.getHours() +
               ':' + today.getMinutes();

    var dateText = document
                    .createElement('span')
                    .classList.add('item-date')
                    .textContent = date;

    var calcText = document
                    .createElement('span')
                    .classList.add('item-calc')
                    .textContent = op + ' = ' + ans;

    var li = document
              .createElement('li')
              .classList
              .add('calculation-list__item')
              .appendChild(dateText)
              .appendChild(calcText);

    history_list.appendChild(li);
}

function _already_has_decimal() {
  for (var i = operation.length - 1; i > 0; i--) {
    if (_is_operator(operation[i])) break;
    else if (operation[i] === '.') return true;
  }
  return false;
}

function valid_operation(type, key) {
  var last_key = operation[operation.length - 1];

  if ((_is_operator(key) && _is_operator(last_key)) ||
      (!operation && (key === '/' || key === 'x')) ||
      (key === '0' && last_key === '/') ||
      (key === '.' && (!_is_number(last_key) || last_key === '.' || _already_has_decimal()))){
    return false;
  }
  return true;
}

function calculate() {

  var op = _split_operation(operation);
  var res = Array.from(op);

  for (var i = 0; i < operators.length; i++) {
    while (res.includes(operators[i])) {
      var operator_index = res.indexOf(operators[i]);
      if (operators[i] === '/') {
        res[operator_index-1] = parseFloat(res[operator_index-1]) / parseFloat(res[operator_index + 1]);
      } else if (operators[i] === 'x') {
        res[operator_index-1] = parseFloat(res[operator_index-1]) * parseFloat(res[operator_index + 1]);
      } else if (operators[i] === '-') {
        res[operator_index-1] = parseFloat(res[operator_index-1]) - parseFloat(res[operator_index + 1]);
      } else if (operators[i] === '+') {
        res[operator_index-1] = parseFloat(res[operator_index-1]) + parseFloat(res[operator_index + 1]);
      }
      res.splice(operator_index,2);
    }
  }

  return res;
}

function process_digit() {

  if (!key) {
    return
  }

  if (answered && _type_is_operator(key_type)) {
    operation += answer;
  }

  if (!valid_operation('default', key)) {
    alert('Essa operação não é valida');
    return;
  }

  if (answered) {
    _update_display('last_operation', answer);
    answered = false;
  }

  if (key_type === 'equals') {

    if (!operation && answer) {
      operation = answer + 'x2';
    } else if (!operation && !answer) {
      return;
    }

    answer = calculate(operation);
    _update_display('last_operation', operation);
    _update_display('current_operation', answer);
    regist_operation(operation, answer);
    operation = "";
    answered = true;
  }
  else if (key_type === 'cleaner') {
    clear();
  }
  else {
    operation += key;
    _update_display('current_operation', operation);
  }
}

function _get_key_by_keycode(key_map, key_code) {
  var keys_sign = Object.keys(key_map);
  var keys_codes = Object.values(key_map);

  for (var i = 0; i < keys_sign.length; i++) {
    if (keys_codes[i].includes(key_code)) {
      return keys_sign[i];
    }
  }
}

function _get_keytype_by_key(typed_key) {
  if (typed_key === '=') {
    return 'equals';
  } else if(typed_key === 'CE') {
    return 'cleaner';
  } else if (operators.includes(typed_key)) {
    return 'operator';
  } else if (numbers.includes(typed_key)) {
    return 'number';
  }
}

maping_numbers();

document.addEventListener('keydown', function(e) {

  if (e.keyCode === 72) {
    return toggle_history();
  }

  key = _get_key_by_keycode(operators_key_map, e.keyCode) || _get_key_by_keycode(numbers_key_map, e.keyCode);
  key_type = _get_keytype_by_key(key);

  process_digit();
});

keys.forEach(function(item) {
  if (!_key_is_enabled(item)) {
    return;
  }

  item.addEventListener('click', function(){

    key = item.getAttribute('name');
    key_type = item.getAttribute('data-type');

    process_digit();
  });
});
