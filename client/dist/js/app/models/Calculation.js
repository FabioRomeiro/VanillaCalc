"use strict";var _createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Calculation=function(){function i(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:new Date,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"";_classCallCheck(this,i),this._date=new Date(e.getTime()),this._expression=t,this._result=n,Object.freeze(this)}return _createClass(i,[{key:"isEquals",value:function(e){return JSON.stringify(this)==JSON.stringify(e)}},{key:"date",set:function(e){this._date=new Date(e.getTime())},get:function(){return new Date(this._date.getTime())}},{key:"expression",set:function(e){this._expression=e},get:function(){return this._expression}},{key:"result",set:function(e){this._result=e},get:function(){return this._result}}]),i}();
//# sourceMappingURL=Calculation.js.map
