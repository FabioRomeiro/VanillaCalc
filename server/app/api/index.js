let api = {};

let dateToday = new Date();
let dateYesterday = new Date();
let dateOlder = new Date();

dateYesterday.setDate(dateToday.getDate() - 1);
dateOlder.setDate(dateToday.getDate() - 7);

let historic = [
  {date: dateToday, expression: '15x8', result: '120'},
  {date: dateToday, expression: '(45/3)+(7*12)', result: '99'},
  {date: dateToday, expression: '2+4', result: '6'},
  {date: dateYesterday, expression: '897*32-4', result: '28700'},
  {date: dateYesterday, expression: '123.56+89/-4', result: '12333.75'},
  {date: dateYesterday, expression: '789/65', result: '12.138461538'},
  {date: dateOlder, expression: '35188/456159+84945', result: '84945.077139769'},
  {date: dateOlder, expression: '543/1+3+1/351', result: '546.002849003'},
  {date: dateOlder, expression: '0/1', result: '0'}
];

api.calcsDay = (req, res) => {
  let today = new Date().getDate();

  let todaysCalcs = historic.filter(function(calc){
    return calc.date.getDate() == today;
  });

  res.json(todaysCalcs);
}

api.calcsYesterday = (req, res) => {
  let yesterday = new Date().getDate() - 1;

  let yesterdaysCalcs = historic.filter(function(calc){
    return calc.date.getDate() == yesterday;
  });

  res.json(yesterdaysCalcs);
}

api.calcsOld = (req, res) => {
  let yesterday = new Date().getDate() - 1;

  let oldCalcs = historic.filter(function(calc){
    return calc.date.getDate() < yesterday;
  });

  res.json(oldCalcs);
}

api.registerCalc = (req, res) => {

  console.log(req.body);
  req.body.date = new Date(req.body.date.replace(/-/g,'/'));
  historic.push(req.body);
  res.status(200).json("Calculation added to history");
}

module.exports = api;
