/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utilities = function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
    key: 'getCurrentTime',

    // Utilities
    value: function getCurrentTime() {
      var date = new Date();
      var yy = ('' + date.getFullYear()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var dd = ('0' + date.getDate()).slice(-2);
      var h = ('0' + date.getHours()).slice(-2);
      var m = ('0' + date.getMinutes()).slice(-2);
      var s = ('0' + date.getSeconds()).slice(-2);
      var time = yy + mm + dd + h + m + s;

      console.log('time = ' + time);
      return time;
    }

    // 広告URL整形Funtion

  }, {
    key: 'genAdTag',
    value: function genAdTag(adtag, deviceType, pmxd, pod) {
      var ret = adtag;
      ret = ret.replace(/\s+/g, '');
      ret = ret.replace('{device}', deviceType);
      if (pmxd) {
        ret = ret.replace('{pmxd}', pmxd);
      }
      if (pod) {
        ret = ret.replace('{pod}', pod);
      }
      return ret;
    }

    // 乱数生成Function

  }, {
    key: 'createRandom',
    value: function createRandom(n) {
      var CODE_TABLE = '0123456789';
      var r = '';
      for (var i = 0, k = CODE_TABLE.length; i < n; i += 1) {
        r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
      }
      return r;
    }

    // UUID生成Function

  }, {
    key: 'getUuid',
    value: function getUuid() {
      var generatedUuid = '';
      var i = void 0;
      var random = void 0;
      for (i = 0; i < 32; i += 1) {
        random = Math.random() * 16 | 0;
        generatedUuid += i === 8 || i === 12 || i === 16 || i === 20 ? '-' : '';
        if (i === 12) {
          generatedUuid += '4'.toString(16);
        } else if (i === 16) {
          generatedUuid += (random & 3 | 8).toString(16);
        } else {
          generatedUuid += random.toString(16);
        }
      }
      return generatedUuid;
    }

    // DeviceID取得

  }, {
    key: 'getDeviceId',
    value: function getDeviceId() {
      var devId = '';
      var tmp = localStorage.getItem('BCDeviceId');
      if (Utilities.isEmpty(tmp)) {
        // LocalStorageにBCDeviceIDが存在しない場合は、新しく生成して保存する
        devId = Utilities.getUuid();
        localStorage.setItem('BCDeviceId', devId);
      } else {
        devId = tmp;
      }
      return devId;
    }

    // 関連動画再生フラグ関連メソッド

  }, {
    key: 'getRelatedVideoPlayFlg',
    value: function getRelatedVideoPlayFlg() {
      var flg = localStorage.getItem('BCRelatedVideoPlayFlg');
      // 一度フラグ取得したら削除する
      localStorage.removeItem('BCRelatedVideoPlayFlg');
      if (!Utilities.isEmpty(flg)) {
        if (flg === 'true') {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'setRelatedVideoPlayFlg',
    value: function setRelatedVideoPlayFlg() {
      localStorage.setItem('BCRelatedVideoPlayFlg', 'true');
    }

    // 文字列Empty判定メソッド

  }, {
    key: 'isEmpty',
    value: function isEmpty(str) {
      if (str !== null && str !== undefined && str !== '' && str.length !== 0) {
        return false;
      }
      return true;
    }

    /**
     * HTMLのエスケープ処理
     */

  }, {
    key: 'escapeHtml',
    value: function escapeHtml(content) {
      if (typeof content !== 'string') {
        return '';
      }
      var ESCAPE_MAP = {
        '&': '&amp;',
        '\'': '&#39;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;'
      };
      return content.replace(/[&'"<>]/g, function (char) {
        return ESCAPE_MAP.hasOwnProperty(char) ? ESCAPE_MAP[char] : char;
      });
    }
  }]);

  return Utilities;
}();

exports.default = Utilities;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * is.js 0.8.0
 * Author: Aras Atasaygin
 */

// AMD with global, Node, or global
;(function(root, factory) {    // eslint-disable-line no-extra-semi
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.is = factory());
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is self)
        root.is = factory();
    }
}(this, function() {

    // Baseline
    /* -------------------------------------------------------------------------- */

    // define 'is' object and current version
    var is = {};
    is.VERSION = '0.8.0';

    // define interfaces
    is.not = {};
    is.all = {};
    is.any = {};

    // cache some methods to call later on
    var toString = Object.prototype.toString;
    var slice = Array.prototype.slice;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // helper function which reverses the sense of predicate result
    function not(func) {
        return function() {
            return !func.apply(null, slice.call(arguments));
        };
    }

    // helper function which call predicate function per parameter and return true if all pass
    function all(func) {
        return function() {
            var params = getParams(arguments);
            var length = params.length;
            for (var i = 0; i < length; i++) {
                if (!func.call(null, params[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // helper function which call predicate function per parameter and return true if any pass
    function any(func) {
        return function() {
            var params = getParams(arguments);
            var length = params.length;
            for (var i = 0; i < length; i++) {
                if (func.call(null, params[i])) {
                    return true;
                }
            }
            return false;
        };
    }

    // build a 'comparator' object for various comparison checks
    var comparator = {
        '<': function(a, b) { return a < b; },
        '<=': function(a, b) { return a <= b; },
        '>': function(a, b) { return a > b; },
        '>=': function(a, b) { return a >= b; }
    }

    // helper function which compares a version to a range
    function compareVersion(version, range) {
        var string = (range + '');
        var n = +(string.match(/\d+/) || NaN);
        var op = string.match(/^[<>]=?|/)[0];
        return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
    }

    // helper function which extracts params from arguments
    function getParams(args) {
        var params = slice.call(args);
        var length = params.length;
        if (length === 1 && is.array(params[0])) {    // support array
            params = params[0];
        }
        return params;
    }

    // Type checks
    /* -------------------------------------------------------------------------- */

    // is a given value Arguments?
    is.arguments = function(value) {    // fallback check is for IE
        return toString.call(value) === '[object Arguments]' ||
            (value != null && typeof value === 'object' && 'callee' in value);
    };

    // is a given value Array?
    is.array = Array.isArray || function(value) {    // check native isArray first
        return toString.call(value) === '[object Array]';
    };

    // is a given value Boolean?
    is.boolean = function(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    };

    // is a given value Char?
    is.char = function(value) {
        return is.string(value) && value.length === 1;
    };

    // is a given value Date Object?
    is.date = function(value) {
        return toString.call(value) === '[object Date]';
    };

    // is a given object a DOM node?
    is.domNode = function(object) {
        return is.object(object) && object.nodeType > 0;
    };

    // is a given value Error object?
    is.error = function(value) {
        return toString.call(value) === '[object Error]';
    };

    // is a given value function?
    is['function'] = function(value) {    // fallback check is for IE
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    };

    // is given value a pure JSON object?
    is.json = function(value) {
        return toString.call(value) === '[object Object]';
    };

    // is a given value NaN?
    is.nan = function(value) {    // NaN is number :) Also it is the only value which does not equal itself
        return value !== value;
    };

    // is a given value null?
    is['null'] = function(value) {
        return value === null;
    };

    // is a given value number?
    is.number = function(value) {
        return is.not.nan(value) && toString.call(value) === '[object Number]';
    };

    // is a given value object?
    is.object = function(value) {
        return Object(value) === value;
    };

    // is a given value RegExp?
    is.regexp = function(value) {
        return toString.call(value) === '[object RegExp]';
    };

    // are given values same type?
    // prevent NaN, Number same type check
    is.sameType = function(value, other) {
        var tag = toString.call(value);
        if (tag !== toString.call(other)) {
            return false;
        }
        if (tag === '[object Number]') {
            return !is.any.nan(value, other) || is.all.nan(value, other);
        }
        return true;
    };
    // sameType method does not support 'all' and 'any' interfaces
    is.sameType.api = ['not'];

    // is a given value String?
    is.string = function(value) {
        return toString.call(value) === '[object String]';
    };

    // is a given value undefined?
    is.undefined = function(value) {
        return value === void 0;
    };

    // is a given value window?
    // setInterval method is only available for window object
    is.windowObject = function(value) {
        return value != null && typeof value === 'object' && 'setInterval' in value;
    };

    // Presence checks
    /* -------------------------------------------------------------------------- */

    //is a given value empty? Objects, arrays, strings
    is.empty = function(value) {
        if (is.object(value)) {
            var length = Object.getOwnPropertyNames(value).length;
            if (length === 0 || (length === 1 && is.array(value)) ||
                    (length === 2 && is.arguments(value))) {
                return true;
            }
            return false;
        }
        return value === '';
    };

    // is a given value existy?
    is.existy = function(value) {
        return value != null;
    };

    // is a given value falsy?
    is.falsy = function(value) {
        return !value;
    };

    // is a given value truthy?
    is.truthy = not(is.falsy);

    // Arithmetic checks
    /* -------------------------------------------------------------------------- */

    // is a given number above minimum parameter?
    is.above = function(n, min) {
        return is.all.number(n, min) && n > min;
    };
    // above method does not support 'all' and 'any' interfaces
    is.above.api = ['not'];

    // is a given number decimal?
    is.decimal = function(n) {
        return is.number(n) && n % 1 !== 0;
    };

    // are given values equal? supports numbers, strings, regexes, booleans
    // TODO: Add object and array support
    is.equal = function(value, other) {
        // check 0 and -0 equity with Infinity and -Infinity
        if (is.all.number(value, other)) {
            return value === other && 1 / value === 1 / other;
        }
        // check regexes as strings too
        if (is.all.string(value, other) || is.all.regexp(value, other)) {
            return '' + value === '' + other;
        }
        if (is.all.boolean(value, other)) {
            return value === other;
        }
        return false;
    };
    // equal method does not support 'all' and 'any' interfaces
    is.equal.api = ['not'];

    // is a given number even?
    is.even = function(n) {
        return is.number(n) && n % 2 === 0;
    };

    // is a given number finite?
    is.finite = isFinite || function(n) {
        return is.not.infinite(n) && is.not.nan(n);
    };

    // is a given number infinite?
    is.infinite = function(n) {
        return n === Infinity || n === -Infinity;
    };

    // is a given number integer?
    is.integer = function(n) {
        return is.number(n) && n % 1 === 0;
    };

    // is a given number negative?
    is.negative = function(n) {
        return is.number(n) && n < 0;
    };

    // is a given number odd?
    is.odd = function(n) {
        return is.number(n) && n % 2 === 1;
    };

    // is a given number positive?
    is.positive = function(n) {
        return is.number(n) && n > 0;
    };

    // is a given number above maximum parameter?
    is.under = function(n, max) {
        return is.all.number(n, max) && n < max;
    };
    // least method does not support 'all' and 'any' interfaces
    is.under.api = ['not'];

    // is a given number within minimum and maximum parameters?
    is.within = function(n, min, max) {
        return is.all.number(n, min, max) && n > min && n < max;
    };
    // within method does not support 'all' and 'any' interfaces
    is.within.api = ['not'];

    // Regexp checks
    /* -------------------------------------------------------------------------- */
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation

    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // eppPhone match extensible provisioning protocol format
    // nanpPhone match north american number plan format
    // time match hours, minutes, and seconds, 24-hour clock
    var regexes = {
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        dateString: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
        hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
    };

    function regexpCheck(regexp, regexes) {
        is[regexp] = function(value) {
            return regexes[regexp].test(value);
        };
    }

    // create regexp checks methods from 'regexes' object
    for (var regexp in regexes) {
        if (regexes.hasOwnProperty(regexp)) {
            regexpCheck(regexp, regexes);
        }
    }

    // simplify IP checks by calling the regex helpers for IPv4 and IPv6
    is.ip = function(value) {
        return is.ipv4(value) || is.ipv6(value);
    };

    // String checks
    /* -------------------------------------------------------------------------- */

    // is a given string or sentence capitalized?
    is.capitalized = function(string) {
        if (is.not.string(string)) {
            return false;
        }
        var words = string.split(' ');
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (word.length) {
                var chr = word.charAt(0);
                if (chr !== chr.toUpperCase()) {
                    return false;
                }
            }
        }
        return true;
    };

    // is string end with a given target parameter?
    is.endWith = function(string, target) {
        if (is.not.string(string)) {
            return false;
        }
        target += '';
        var position = string.length - target.length;
        return position >= 0 && string.indexOf(target, position) === position;
    };
    // endWith method does not support 'all' and 'any' interfaces
    is.endWith.api = ['not'];

    // is a given string include parameter target?
    is.include = function(string, target) {
        return string.indexOf(target) > -1;
    };
    // include method does not support 'all' and 'any' interfaces
    is.include.api = ['not'];

    // is a given string all lowercase?
    is.lowerCase = function(string) {
        return is.string(string) && string === string.toLowerCase();
    };

    // is a given string palindrome?
    is.palindrome = function(string) {
        if (is.not.string(string)) {
            return false;
        }
        string = string.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        var length = string.length - 1;
        for (var i = 0, half = Math.floor(length / 2); i <= half; i++) {
            if (string.charAt(i) !== string.charAt(length - i)) {
                return false;
            }
        }
        return true;
    };

    // is a given value space?
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    is.space = function(value) {
        if (is.not.char(value)) {
            return false;
        }
        var charCode = value.charCodeAt(0);
        return (charCode > 8 && charCode < 14) || charCode === 32;
    };

    // is string start with a given target parameter?
    is.startWith = function(string, target) {
        return is.string(string) && string.indexOf(target) === 0;
    };
    // startWith method does not support 'all' and 'any' interfaces
    is.startWith.api = ['not'];

    // is a given string all uppercase?
    is.upperCase = function(string) {
        return is.string(string) && string === string.toUpperCase();
    };

    // Time checks
    /* -------------------------------------------------------------------------- */

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    // is a given dates day equal given day parameter?
    is.day = function(date, day) {
        return is.date(date) && day.toLowerCase() === days[date.getDay()];
    };
    // day method does not support 'all' and 'any' interfaces
    is.day.api = ['not'];

    // is a given date in daylight saving time?
    is.dayLightSavingTime = function(date) {
        var january = new Date(date.getFullYear(), 0, 1);
        var july = new Date(date.getFullYear(), 6, 1);
        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
        return date.getTimezoneOffset() < stdTimezoneOffset;
    };

    // is a given date future?
    is.future = function(date) {
        var now = new Date();
        return is.date(date) && date.getTime() > now.getTime();
    };

    // is date within given range?
    is.inDateRange = function(date, start, end) {
        if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {
            return false;
        }
        var stamp = date.getTime();
        return stamp > start.getTime() && stamp < end.getTime();
    };
    // inDateRange method does not support 'all' and 'any' interfaces
    is.inDateRange.api = ['not'];

    // is a given date in last month range?
    is.inLastMonth = function(date) {
        return is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };

    // is a given date in last week range?
    is.inLastWeek = function(date) {
        return is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };

    // is a given date in last year range?
    is.inLastYear = function(date) {
        return is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };

    // is a given date in next month range?
    is.inNextMonth = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };

    // is a given date in next week range?
    is.inNextWeek = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };

    // is a given date in next year range?
    is.inNextYear = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };

    // is the given year a leap year?
    is.leapYear = function(year) {
        return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };

    // is a given dates month equal given month parameter?
    is.month = function(date, month) {
        return is.date(date) && month.toLowerCase() === months[date.getMonth()];
    };
    // month method does not support 'all' and 'any' interfaces
    is.month.api = ['not'];

    // is a given date past?
    is.past = function(date) {
        var now = new Date();
        return is.date(date) && date.getTime() < now.getTime();
    };

    // is a given date in the parameter quarter?
    is.quarterOfYear = function(date, quarter) {
        return is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3);
    };
    // quarterOfYear method does not support 'all' and 'any' interfaces
    is.quarterOfYear.api = ['not'];

    // is a given date indicate today?
    is.today = function(date) {
        var now = new Date();
        var todayString = now.toDateString();
        return is.date(date) && date.toDateString() === todayString;
    };

    // is a given date indicate tomorrow?
    is.tomorrow = function(date) {
        var now = new Date();
        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
        return is.date(date) && date.toDateString() === tomorrowString;
    };

    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    is.weekend = function(date) {
        return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);
    };

    // is a given date weekday?
    is.weekday = not(is.weekend);

    // is a given dates year equal given year parameter?
    is.year = function(date, year) {
        return is.date(date) && is.number(year) && year === date.getFullYear();
    };
    // year method does not support 'all' and 'any' interfaces
    is.year.api = ['not'];

    // is a given date indicate yesterday?
    is.yesterday = function(date) {
        var now = new Date();
        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return is.date(date) && date.toDateString() === yesterdayString;
    };

    // Environment checks
    /* -------------------------------------------------------------------------- */

    var freeGlobal = is.windowObject(typeof global == 'object' && global) && global;
    var freeSelf = is.windowObject(typeof self == 'object' && self) && self;
    var thisGlobal = is.windowObject(typeof this == 'object' && this) && this;
    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

    var document = freeSelf && freeSelf.document;
    var previousIs = root.is;

    // store navigator properties to use later
    var navigator = freeSelf && freeSelf.navigator;
    var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
    var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
    var vendor = (navigator && navigator.vendor || '').toLowerCase();

    // is current device android?
    is.android = function() {
        return /android/.test(userAgent);
    };
    // android method does not support 'all' and 'any' interfaces
    is.android.api = ['not'];

    // is current device android phone?
    is.androidPhone = function() {
        return /android/.test(userAgent) && /mobile/.test(userAgent);
    };
    // androidPhone method does not support 'all' and 'any' interfaces
    is.androidPhone.api = ['not'];

    // is current device android tablet?
    is.androidTablet = function() {
        return /android/.test(userAgent) && !/mobile/.test(userAgent);
    };
    // androidTablet method does not support 'all' and 'any' interfaces
    is.androidTablet.api = ['not'];

    // is current device blackberry?
    is.blackberry = function() {
        return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
    };
    // blackberry method does not support 'all' and 'any' interfaces
    is.blackberry.api = ['not'];

    // is current browser chrome?
    // parameter is optional
    is.chrome = function(range) {
        var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && compareVersion(match[1], range);
    };
    // chrome method does not support 'all' and 'any' interfaces
    is.chrome.api = ['not'];

    // is current device desktop?
    is.desktop = function() {
        return is.not.mobile() && is.not.tablet();
    };
    // desktop method does not support 'all' and 'any' interfaces
    is.desktop.api = ['not'];

    // is current browser edge?
    // parameter is optional
    is.edge = function(range) {
        var match = userAgent.match(/edge\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // edge method does not support 'all' and 'any' interfaces
    is.edge.api = ['not'];

    // is current browser firefox?
    // parameter is optional
    is.firefox = function(range) {
        var match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // firefox method does not support 'all' and 'any' interfaces
    is.firefox.api = ['not'];

    // is current browser internet explorer?
    // parameter is optional
    is.ie = function(range) {
        var match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ie method does not support 'all' and 'any' interfaces
    is.ie.api = ['not'];

    // is current device ios?
    is.ios = function() {
        return is.iphone() || is.ipad() || is.ipod();
    };
    // ios method does not support 'all' and 'any' interfaces
    is.ios.api = ['not'];

    // is current device ipad?
    // parameter is optional
    is.ipad = function(range) {
        var match = userAgent.match(/ipad.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ipad method does not support 'all' and 'any' interfaces
    is.ipad.api = ['not'];

    // is current device iphone?
    // parameter is optional
    is.iphone = function(range) {
        // original iPhone doesn't have the os portion of the UA
        var match = userAgent.match(/iphone(?:.+?os (\d+))?/);
        return match !== null && compareVersion(match[1] || 1, range);
    };
    // iphone method does not support 'all' and 'any' interfaces
    is.iphone.api = ['not'];

    // is current device ipod?
    // parameter is optional
    is.ipod = function(range) {
        var match = userAgent.match(/ipod.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ipod method does not support 'all' and 'any' interfaces
    is.ipod.api = ['not'];

    // is current operating system linux?
    is.linux = function() {
        return /linux/.test(appVersion);
    };
    // linux method does not support 'all' and 'any' interfaces
    is.linux.api = ['not'];

    // is current operating system mac?
    is.mac = function() {
        return /mac/.test(appVersion);
    };
    // mac method does not support 'all' and 'any' interfaces
    is.mac.api = ['not'];

    // is current device mobile?
    is.mobile = function() {
        return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
    };
    // mobile method does not support 'all' and 'any' interfaces
    is.mobile.api = ['not'];

    // is current state offline?
    is.offline = not(is.online);
    // offline method does not support 'all' and 'any' interfaces
    is.offline.api = ['not'];

    // is current state online?
    is.online = function() {
        return !navigator || navigator.onLine === true;
    };
    // online method does not support 'all' and 'any' interfaces
    is.online.api = ['not'];

    // is current browser opera?
    // parameter is optional
    is.opera = function(range) {
        var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // opera method does not support 'all' and 'any' interfaces
    is.opera.api = ['not'];

    // is current browser phantomjs?
    // parameter is optional
    is.phantom = function(range) {
        var match = userAgent.match(/phantomjs\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // phantom method does not support 'all' and 'any' interfaces
    is.phantom.api = ['not'];

    // is current browser safari?
    // parameter is optional
    is.safari = function(range) {
        var match = userAgent.match(/version\/(\d+).+?safari/);
        return match !== null && compareVersion(match[1], range);
    };
    // safari method does not support 'all' and 'any' interfaces
    is.safari.api = ['not'];

    // is current device tablet?
    is.tablet = function() {
        return is.ipad() || is.androidTablet() || is.windowsTablet();
    };
    // tablet method does not support 'all' and 'any' interfaces
    is.tablet.api = ['not'];

    // is current device supports touch?
    is.touchDevice = function() {
        return !!document && ('ontouchstart' in freeSelf ||
            ('DocumentTouch' in freeSelf && document instanceof DocumentTouch));
    };
    // touchDevice method does not support 'all' and 'any' interfaces
    is.touchDevice.api = ['not'];

    // is current operating system windows?
    is.windows = function() {
        return /win/.test(appVersion);
    };
    // windows method does not support 'all' and 'any' interfaces
    is.windows.api = ['not'];

    // is current device windows phone?
    is.windowsPhone = function() {
        return is.windows() && /phone/.test(userAgent);
    };
    // windowsPhone method does not support 'all' and 'any' interfaces
    is.windowsPhone.api = ['not'];

    // is current device windows tablet?
    is.windowsTablet = function() {
        return is.windows() && is.not.windowsPhone() && /touch/.test(userAgent);
    };
    // windowsTablet method does not support 'all' and 'any' interfaces
    is.windowsTablet.api = ['not'];

    // Object checks
    /* -------------------------------------------------------------------------- */

    // has a given object got parameterized count property?
    is.propertyCount = function(object, count) {
        if (is.not.object(object) || is.not.number(count)) {
            return false;
        }
        var n = 0;
        for (var property in object) {
            if (hasOwnProperty.call(object, property) && ++n > count) {
                return false;
            }
        }
        return n === count;
    };
    // propertyCount method does not support 'all' and 'any' interfaces
    is.propertyCount.api = ['not'];

    // is given object has parameterized property?
    is.propertyDefined = function(object, property) {
        return is.object(object) && is.string(property) && property in object;
    };
    // propertyDefined method does not support 'all' and 'any' interfaces
    is.propertyDefined.api = ['not'];

    // Array checks
    /* -------------------------------------------------------------------------- */

    // is a given item in an array?
    is.inArray = function(value, array) {
        if (is.not.array(array)) {
            return false;
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    };
    // inArray method does not support 'all' and 'any' interfaces
    is.inArray.api = ['not'];

    // is a given array sorted?
    is.sorted = function(array, sign) {
        if (is.not.array(array)) {
            return false;
        }
        var predicate = comparator[sign] || comparator['>='];
        for (var i = 1; i < array.length; i++) {
            if (!predicate(array[i], array[i - 1])) {
                return false;
            }
        }
        return true;
    };

    // API
    // Set 'not', 'all' and 'any' interfaces to methods based on their api property
    /* -------------------------------------------------------------------------- */

    function setInterfaces() {
        var options = is;
        for (var option in options) {
            if (hasOwnProperty.call(options, option) && is['function'](options[option])) {
                var interfaces = options[option].api || ['not', 'all', 'any'];
                for (var i = 0; i < interfaces.length; i++) {
                    if (interfaces[i] === 'not') {
                        is.not[option] = not(is[option]);
                    }
                    if (interfaces[i] === 'all') {
                        is.all[option] = all(is[option]);
                    }
                    if (interfaces[i] === 'any') {
                        is.any[option] = any(is[option]);
                    }
                }
            }
        }
    }
    setInterfaces();

    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */

    // change namespace of library to prevent name collisions
    // var preferredName = is.setNamespace();
    // preferredName.odd(3);
    // => true
    is.setNamespace = function() {
        root.is = previousIs;
        return this;
    };

    // set optional regexes to methods
    is.setRegexp = function(regexp, name) {
        for (var r in regexes) {
            if (hasOwnProperty.call(regexes, r) && (name === r)) {
                regexes[r] = regexp;
            }
        }
    };

    return is;
}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Util = {
  /**
   * DOM要素の表示切り替え
   */
  setVisibility: function setVisibility(element, visibility) {
    if (element !== null) {
      try {
        element.style.visibility = visibility ? 'visible' : 'hidden';
      } catch (error) {
        console.log(error);
      }
    }
  },


  /**
   * 秒数を時分秒に変換
   */
  formatTime: function formatTime(secondTime) {
    var formatTime = '';
    var hour = Math.round(secondTime / 3600);
    var minute = Math.round(secondTime / 3600 / 60);
    var second = Math.round(secondTime % 60);

    if (second.toString().length === 1) {
      second = '0' + second;
    }

    if (hour !== 0) {
      formatTime = hour + ':' + minute + ':' + second;
    } else if (minute !== 0) {
      formatTime = minute + ':' + second;
    } else {
      formatTime = '0:' + second;
    }

    return formatTime;
  }
};

exports.default = Util;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utilities = __webpack_require__(0);

var _Utilities2 = _interopRequireDefault(_Utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Overlay = function () {
  function Overlay(application) {
    _classCallCheck(this, Overlay);

    this.application = application;
    this.overlayElement = document.createElement('div');
  }

  _createClass(Overlay, [{
    key: 'overlayStillImage',
    value: function overlayStillImage() {
      var _this = this;

      var overlayContent = void 0;
      if (this.application.stillImageUrl === '') {
        console.log('Overlay is shown, still image url is null.');
        overlayContent = '\n        <div id="overlayContent" >\n          <span id="playButton" style="background-image: url(\'' + _Utilities2.default.escapeHtml(this.application.PLAY_IMG_URL) + '\');z-index:1;position:absolute;width:100%;height:100%;display:block; background-position: center center; background-repeat: no-repeat;">\n          </span>\n        </div>';
      } else {
        console.log('Overlay is shown, still image url is ' + _Utilities2.default.escapeHtml(this.application.stillImageUrl));
        overlayContent = '\n        <div id="overlayContent" >\n          <span id="playButton" style="background-image: url(\'' + _Utilities2.default.escapeHtml(this.application.PLAY_IMG_URL) + '\');z-index:2;position:absolute;width:100%;height:100%;display:block;background-position: center center;background-repeat: no-repeat;" >\n          </span>\n          <span id="stillImage" style="background-image: url(\'' + _Utilities2.default.escapeHtml(this.application.stillImageUrl) + '\');z-index:1;position:absolute;width:100%;height:100%;display:block;background-color: #000;background-position: center center;background-repeat: no-repeat;background-size: contain;">\n          </span>\n        </div>';
      }
      this.overlayElement.className = 'vjs-overlay';
      this.overlayElement.innerHTML = overlayContent;
      this.application.player.el().appendChild(this.overlayElement);
      this.overlayElement.addEventListener('click', function () {
        _this.application.player.play();
      }, false);
    }
  }, {
    key: 'overlayBlackImage',
    value: function overlayBlackImage() {
      console.log('Black Overlay is shown');
      var overlayContent = '\n      <div id="overlayContent">\n        <span id="stillImage" style="z-index:1;position:absolute;width:100%;height:100%;display:block;background-color: #000;">\n        </span>\n      </div>';
      this.overlayElement.className = 'vjs-overlay2';
      this.overlayElement.innerHTML = overlayContent;
      this.application.player.el().appendChild(this.overlayElement);
    }
  }, {
    key: 'overlayAdPlayBtn',
    value: function overlayAdPlayBtn() {
      var _this2 = this;

      console.log('Ad Play Button Overlay is shown');
      var overlayContent = '\n      <div id="overlayContent" >\n        <span id="adClickBlock" style="z-index:2;position:absolute;width:100%;height:100%;display:block;">\n        </span>\n        <span id="playButton" style="background-image: url(\'' + _Utilities2.default.escapeHtml(this.application.PLAY_IMG_URL) + '\');z-index:1;position:absolute;width:100%;height:100%;display:block;background-position: center center;background-repeat: no-repeat;">\n        </span>\n      </div>';
      this.overlayElement = document.createElement('div');
      this.overlayElement.className = 'ad-overlay';
      this.overlayElement.innerHTML = overlayContent;
      this.application.player.el().insertBefore(this.overlayElement, this.application.player.el().getElementsByClassName('vjs-ad-control-bar')[0]);
      this.overlayElement.addEventListener('click', function () {
        _this2.application.player.ima3.adsManager.resume();
        _this2.hideOverlay();
        _this2.overlayClickBlock();
      }, false);
    }
  }, {
    key: 'overlayClickBlock',
    value: function overlayClickBlock() {
      console.log('Ad Click Block Overlay is shown');
      var overlayContent = '\n      <div id="overlayContent">\n        <span id="adClickBlock" style="z-index:1;position:absolute;top:30px;width:100%;height:100%;display:block;">\n        </span>\n      </div>';
      this.overlayElement = document.createElement('div');
      this.overlayElement.className = 'ad-overlay2';
      this.overlayElement.innerHTML = overlayContent;
      this.application.player.el().insertBefore(this.overlayElement, this.application.player.el().getElementsByClassName('vjs-ad-control-bar')[0]);
    }

    // hideAdPlayBtn() {
    //   if (overlay2 !== null) {
    //     player.el().removeChild(overlay2);
    //   }
    //   overlay2 = null;
    // }

  }, {
    key: 'hideOverlay',
    value: function hideOverlay() {
      this.application.player.el().removeChild(this.overlayElement);
      // if (this.application.overlay2 !== null) {
      //   this.player.el().removeChild(this.application.overlay2);
      // }
      // this.application.overlay2 = null;
      // if (this.application.overlay3 !== null) {
      //   this.player.el().removeChild(this.application.overlay3);
      // }
      // this.application.overlay3 = null;
      // if (this.application.overlay4 !== null) {
      //   this.player.el().removeChild(this.application.overlay4);
      // }
      // this.application.overlay4 = null;
    }
  }]);

  return Overlay;
}();

exports.default = Overlay;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = __webpack_require__(1);

var _is_js2 = _interopRequireDefault(_is_js);

var _Ad = __webpack_require__(12);

var _Ad2 = _interopRequireDefault(_Ad);

var _Overlay = __webpack_require__(3);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _RelatedVideos = __webpack_require__(13);

var _RelatedVideos2 = _interopRequireDefault(_RelatedVideos);

var _Utilities = __webpack_require__(0);

var _Utilities2 = _interopRequireDefault(_Utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ABCplayer = function () {
  function ABCplayer(player, PlayerControlSettings, abcPlayerSettings) {
    _classCallCheck(this, ABCplayer);

    this.PLAY_IMG_URL = abcPlayerSettings.PLAY_IMG_URL;
    this.ADTAG_XML_URL = abcPlayerSettings.ADTAG_XML_URL;
    this.MOBILE_IMA_SETTINGS = abcPlayerSettings.MOBILE_IMA_SETTINGS;
    this.MAX_RELATED_VIDEOS_COUNT = abcPlayerSettings.MAX_RELATED_VIDEOS_COUNT;
    this.DEFAULT_STILL_IMAGE_URL = abcPlayerSettings.DEFAULT_STILL_IMAGE_URL;
    this.MEDIA_API_TOKEN = abcPlayerSettings.MEDIA_API_TOKEN;
    this.debug_midroll_api_url = abcPlayerSettings.midroll_api_url;

    this.playerControlSettings = PlayerControlSettings;
    this.player = player;
    this.myMediaInfo = null;
    this.originalSrc = null;
    this.duration = null;
    this.info = {
      is_ad: null,
      is_live: null,
      ad_category: null,
      still_image_url: null,
      channel: null,
      is_progressivebar: null,
      midroll_api_url: null
    };
    this.vodCues = null;
    this.midrollApiUrl = '';
    this.fixedMidrollApiUrlParams = '?';
    this.livePlayStartTime = null;
    this.channelChanged = 0;
    this.upcomingMidroll = {
      startTime: null,
      adType: null,
      interval: 8,
      isRequested: null,
      activeTime: 0,
      activeTimeFlag: true
    };
    this.upcomingVodMidrollIndex = 0;

    this.beaconUrl = '';
    this.beaconTrackPoint = 0.5;
    this.isBeaconSent = false;
    this.currentVideoId = null;
    this.deviceType = null;
    this.browserType = null;

    // 動画エンベッドパラメータ取得
    // 指定動画ID（参照ID）
    this.videoRefId = PlayerControlSettings.videoId;
    // スチル画像URL
    this.stillImageUrl = '';
    if (PlayerControlSettings.stillImageUrl !== undefined) {
      this.stillImageUrl = PlayerControlSettings.stillImageUrl;
    }
    // 自動再生フラグ
    this.isAutoPlay = false;
    if (PlayerControlSettings.autoPlay !== undefined && PlayerControlSettings.autoPlay === true) {
      this.isAutoPlay = true;
    }
    // プリフェッチインターバル
    this.prefetchInterval = 60;
    if (PlayerControlSettings.prefetchInterval !== undefined) {
      this.prefetchInterval = PlayerControlSettings.prefetchInterval;
    }

    // コンテンツ終了フラグ
    this.contentEnded = false;

    // 関連動画リスト表示フラグ
    this.isShowRelatedVideos = !!PlayerControlSettings.showRelatedVideos; // 関連動画を表示するかのフラグ

    // 関連動画からの再生かどうかを示すフラグ
    this.isPlayedRelatedVideo = false;
    if (_Utilities2.default.getRelatedVideoPlayFlg()) {
      this.isPlayedRelatedVideo = true;
    }

    this.relatedVideosLoaded = null;
    // UserAgent・現在時刻取得、UUID生成
    this.agent = navigator.userAgent;
    this.uuid = _Utilities2.default.getUuid();
    this.deviceId = _Utilities2.default.getDeviceId();
    // pmxd判別用のネットワーク環境（Webブラウザでは取得できないためモバイルの場合mobile設定、それ以外はwifi）
    // 試験的にどの通信環境でもwifiとして設定
    this.network = _is_js2.default.desktop() ? 'wifi' : 'wifi'; // temporary

    // 状態フラグ
    this.isSeeking = false;
    this.isInitialPlay = true;

    // インスタンス
    this.ad = null;
    this.relatedVideos = null;
    this.stillImageOverlay = null;
    this.blackImageOverlay = null;

    // changeVideoメソッドをグローバルファンクションに設定
    window.changeVideo = this.changeVideo.bind(this);
  }

  _createClass(ABCplayer, [{
    key: 'init',
    value: function init() {
      console.log('# ABCplayer initialized');
      // ブラウザ判定
      if (this.agent.match(/MSIE/)) {
        this.browserType = 'ie10';
      } else if (this.agent.match(/Trident/)) {
        this.browserType = 'ie11';
      } else {
        this.browserType = 'non-ie';
      }
      console.log('Browser Type= ' + this.browserType + ', userAgent= ' + this.agent);

      // デバイス判定
      if (_is_js2.default.ios()) {
        this.deviceType = 'ios_mweb';
      } else if (_is_js2.default.android()) {
        this.deviceType = 'android_mweb';
      } else {
        this.deviceType = 'pc';
      }

      // イベント設定
      this.bindEvent();
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      this.player.ready(this.handlePlayerReady.bind(this));
      this.player.on('loadstart', this.handlePlayerLoadStart.bind(this));
      this.player.on('play', this.handleMediaPlay.bind(this));
      this.player.on('pause', this.handleMediaPause.bind(this));
      this.player.on('timeupdate', this.handleMediaProgress.bind(this));
      this.player.on('ended', this.handleMediaEnded.bind(this));
      this.player.one('seeking', this.handleMediaSeeking.bind(this));
      this.player.on('seeked', this.handleMediaSeeked.bind(this));
    }
  }, {
    key: 'handlePlayerReady',
    value: function handlePlayerReady() {
      var _this = this;

      console.log('Load Player');
      var videoRefId = 'ref:' + this.videoRefId;
      this.player.catalog.getVideo(videoRefId, function (error, video) {
        _this.player.catalog.load(video);
        console.log('Load Video, VideoID=' + videoRefId);
      });
    }
  }, {
    key: 'handlePlayerLoadStart',
    value: function handlePlayerLoadStart() {
      var _this2 = this;

      // iOSのloadstartやendedなどのイベントが広告でも発火するためsrcで判別するため初回load時に保存
      // 初回ページロード時と、チャンネル変更時にのみ以下のloadstartイベント処理をする
      if (!this.originalSrc) {
        this.originalSrc = this.player.el().firstChild.src;
      } else {
        // srcが保存されていない状況では以下は重複するので処理を中止（iOS対策）
        return;
      }
      /* --------------------------------------------------------
       VOD / Live 共通処理
      -------------------------------------------------------- */
      console.log('loadstart!');

      // 現在の動画IDを取得
      this.currentVideoId = this.player.mediainfo.id;

      // Beacon、midroll問合せURLなどで使う現在時刻
      var currentTime = _Utilities2.default.getCurrentTime();

      // MediaInfoからカスタムフィールド情報を取得
      this.myMediaInfo = this.player.mediainfo;

      // Custom Field取得
      Object.keys(this.info).forEach(function (setting) {
        _this2.info[setting] = null;
        var customFieldSetting = _this2.myMediaInfo.custom_fields[setting];

        // 数字文字列の場合は数値に変換
        if (!isNaN(customFieldSetting)) {
          customFieldSetting = Number(customFieldSetting);
        }
        switch (customFieldSetting) {
          case 'true':
            _this2.info[setting] = true;
            break;
          case 'false':
            _this2.info[setting] = false;
            break;
          case undefined:
            _this2.info[setting] = '';
            break;
          default:
            _this2.info[setting] = customFieldSetting;
            break;
        }
        console.log('[custom_field] ' + setting + '=' + _this2.info[setting]);
      });

      // 埋め込みオプションにスチル画像設定がない場合、カスタムフィールドを確認し、値が存在すればスチル画像に設定
      if (this.stillImageUrl === '' && this.info.still_image_url !== '') {
        this.stillImageUrl = this.info.still_image_url;
      }

      // プログレスバー表示非表示
      if (this.info.is_progressivebar === false) {
        this.hideProgressiveBar();
      }

      // ビーコン送信フラグ初期化
      this.isBeaconSent = false;

      // デバイス別ABC再生開始ビーコンURL設定
      switch (this.deviceType) {
        case 'ios_mweb':
          this.beaconUrl = 'https://l4.vk.asahi.co.jp/prod?log=4&p=' + this.videoRefId + '&t=' + currentTime + '&pid=' + this.uuid + '&did=' + this.deviceId + '&rp=' + this.isPlayedRelatedVideo;
          break;
        case 'android_mweb':
          this.beaconUrl = 'https://l5.vk.asahi.co.jp/prod?log=5&p=' + this.videoRefId + '&t=' + currentTime + '&pid=' + this.uuid + '&did=' + this.deviceId + '&rp=' + this.isPlayedRelatedVideo;
          break;
        default:
          this.beaconUrl = 'https://l1.vk.asahi.co.jp/prod?log=1&p=' + this.videoRefId + '&t=' + currentTime + '&pid=' + this.uuid + '&did=' + this.deviceId + '&rp=' + this.isPlayedRelatedVideo;
      }

      // スチル画像表示判別
      if (this.channelChanged === 0) {
        // Liveチャンネル変更からの再生でない場合はいずれかのオーバーレイを表示
        if (!this.isAutoPlay || this.deviceType !== 'pc') {
          // 自動再生なし or PC以外からの再生（モバイルは自動再生不可）の場合はスチル画像を表示
          if (!this.stillImageOverlay) {
            this.stillImageOverlay = new _Overlay2.default(this);
            this.stillImageOverlay.overlayStillImage();
          }
        } else if (this.info.is_ad) {
          // PC再生で広告有り＆自動再生の場合は黒画像を表示
          if (!this.blackImageOverlay) {
            this.blackImageOverlay = new _Overlay2.default(this);
            this.blackImageOverlay.overlayBlackImage();
          }
        }
      }

      // LiveとVODで処理を分岐
      if (this.info.is_live) {
        /* --------------------------------------------------------
         Liveの処理
        -------------------------------------------------------- */
        // 広告設定
        if (this.info.is_ad) {
          // midroll api リクエストURL生成
          if (this.debug_midroll_api_url) {
            // デバッグ用 本番では不要
            this.info.midroll_api_url = this.debug_midroll_api_url;
          }
          if (this.info.midroll_api_url !== '' && this.info.channel) {
            var cmType = function cmType() {
              switch (_this2.deviceType) {
                case 'pc':
                  return 1;
                case 'ios_mweb':
                  return 1;
                case 'android_mweb':
                  return 1;
                default:
                  return 1;
              }
            };
            this.midrollApiUrl = this.info.midroll_api_url + 'cm' + cmType() + '.xml';
          }
          this.fixedMidrollApiUrlParams = '?id=' + this.uuid + '&d=' + currentTime + '&p=' + this.videoRefId;
        }

        // チャンネル変更時は自動再生、モバイルの場合はスチル画像を表示
        if (this.channelChanged > 0) {
          if (_is_js2.default.not.desktop()) {
            if (!this.stillImageOverlay) {
              this.stillImageOverlay = new _Overlay2.default(this);
              this.stillImageOverlay.overlayStillImage();
            }
          } else {
            this.player.play();
          }
        }
      } else {
        /* --------------------------------------------------------
         VODの処理
        -------------------------------------------------------- */
        // 広告設定
        if (this.info.is_ad) {
          // VOD midrollでcueポイントからの広告判別用に動画時間を取得
          this.duration = this.myMediaInfo.duration * 1000;

          // VOD midroll の判別
          if (this.myMediaInfo.cue_points.length > 0) {
            this.vodCues = this.myMediaInfo.cue_points;
          }
        }

        // 関連動画の取得
        this.relatedVideosLoaded = false;
        if (this.isShowRelatedVideos && this.deviceType === 'pc') {
          // PCデバイス(IE10以外) & 関連動画表示ONの場合のみ関連動画リストを取得
          this.relatedVideos = new _RelatedVideos2.default(this);
          this.relatedVideos.getRelatedVideos();
        }
      }

      /* --------------------------------------------------------
       VOD / Live 共通広告設定
      -------------------------------------------------------- */
      if (this.info.is_ad) {
        // Liveのチャンネル変更時以外で広告ONの場合は、Adインスタンス生成
        if (this.channelChanged === 0) {
          this.ad = new _Ad2.default(this);
          this.ad.init();
        }
      } else if (this.isAutoPlay) {
        // 広告OFFの場合で自動再生時は本編再生開始
        this.player.play();
      }
    }
  }, {
    key: 'handleMediaPlay',
    value: function handleMediaPlay() {
      var _this3 = this;

      if (this.originalSrc !== this.player.el().firstChild.src) {
        return;
      }
      console.log('player play');
      if (this.info.is_live) {
        if (_is_js2.default.not.desktop() && this.isInitialPlay && this.info.is_ad) {
          this.isInitialPlay = false;
          console.log('SP initial play');
          return;
        }
        // 再生開始から最新時刻までシーク完了まで黒背景を表示
        this.blackImageOverlay = new _Overlay2.default(this);
        this.blackImageOverlay.overlayBlackImage();

        // シーク完了後に黒背景を削除
        this.player.one('seeked', function () {
          console.log('player seeked to the latest live');
          if (_this3.blackImageOverlay) {
            _this3.blackImageOverlay.hideOverlay();
            delete _this3.blackImageOverlay;
            _this3.blackImageOverlay = null;
          }

          // 広告有りの場合
          if (_this3.info.is_ad) {
            // Live Midroll有りの場合
            if (_this3.ad.adUrlInning !== '' || _this3.ad.adUrlGame !== '') {
              // 初回再生開始時とチャンネル変更時の再生開始時、midroll問合せURLにライブ再生開始時間を保存
              if (!_this3.livePlayStartTime) {
                _this3.livePlayStartTime = _this3.player.currentTime();
              }
              // 広告終了後の再生開始で、現在のライブ再生時間+インターバル秒数（広告非再生時間）を保存
              // 通常のpause to playで更新されないように広告再生終了後のフラグで判別
              if (_this3.upcomingMidroll.activeTimeFlag && _this3.info.is_ad) {
                _this3.upcomingMidroll.activeTimeFlag = false;
                _this3.upcomingMidroll.activeTime = _this3.player.currentTime() + _this3.prefetchInterval;
              }
              // <interval>の秒数の間隔でMidroll問合せajaxリクエストループを行う
              clearInterval(_this3.requestMidrollXml);
              delete _this3.requestMidrollXml;
              _this3.requestMidrollXml = setInterval(function () {
                var currentMidrollApiUrl = '' + _this3.midrollApiUrl + _this3.fixedMidrollApiUrlParams + '&st=' + _this3.livePlayStartTime + '&now=' + _this3.player.currentTime() + '&n=' + _this3.channelChanged;
                _this3.fetchMidrollXml(currentMidrollApiUrl);
              }, _this3.upcomingMidroll.interval * 1000);
            }
          }
        });

        // Live再生開始時に最新の映像へシーク
        this.player.currentTime(this.player.seekable().end(0));
      }

      // スチル画像を非表示（autoplayなし(&mobile) で非Preroll時）
      if (this.stillImageOverlay) {
        this.stillImageOverlay.hideOverlay();
        delete this.stillImageOverlay;
        this.stillImageOverlay = null;
      }
    }
  }, {
    key: 'handleMediaPause',
    value: function handleMediaPause() {
      if (this.originalSrc !== this.player.el().firstChild.src) {
        return;
      }
      console.log('paused');
      // 本編停止時（広告再生時）はMidroll問合せajaxリクエストループを停止
      if (this.info.is_live) {
        clearInterval(this.requestMidrollXml);
        delete this.requestMidrollXml;
      }
    }
  }, {
    key: 'handleMediaEnded',
    value: function handleMediaEnded() {
      var _this4 = this;

      console.log('Media is ended');
      if (this.originalSrc === this.player.el().firstChild.src) {
        if (this.info.is_ad) {
          if (this.ad.adUrlPostroll !== '' && !this.ad.postrollPlayed) {
            // Postroll広告を再生
            this.ad.postrollPlayed = true;
            this.ad.requestVodPostroll();
            if (_is_js2.default.not.desktop()) {
              this.player.ima3.settings.requestMode = 'ondemand';
              this.player.bcima3.playAds('postroll');
            }

            // Win7IEのFlash場合、Postroll時にcontentCompleteCalledが変更されないため手動で強制変更
            if (_is_js2.default.ie()) {
              this.player.bcima3.contentCompleteCalled = true;
            }
          } else if (this.relatedVideosLoaded) {
            // 関連動画リストを読み込み済みの場合は表示を行う
            this.relatedVideos.showRelatedVideos();
          }
        } else if (this.relatedVideosLoaded) {
          // 関連動画リストを読み込み済みの場合は表示を行う
          this.relatedVideos.showRelatedVideos();
        }
        this.contentEnded = true;
      } else if (this.contentEnded) {
        if (this.deviceType === 'ios_mweb') {
          this.player.one('ended', function () {
            _this4.player.load();
            // this.player.pause();
            console.log('The currentTime was moved to 0 because the browser is iOS_Web.');
          });
        }
      }
    }
  }, {
    key: 'handleMediaProgress',
    value: function handleMediaProgress() {
      if (this.blackImageOverlay) {
        this.blackImageOverlay.hideOverlay();
        delete this.blackImageOverlay;
        this.blackImageOverlay = null;
      }
      if (this.originalSrc !== this.player.el().firstChild.src || this.info.is＿ad && this.ad.isAdBreaking) {
        return;
      }
      var currentTime = this.player.currentTime();
      if (this.info.is_ad) {
        if (this.info.is_live) {
          // Liveのmidroll再生
          if (this.upcomingMidroll.startTime < currentTime && this.upcomingMidroll.isRequested === false) {
            this.upcomingMidroll.isRequested = true;
            if (this.upcomingMidroll.activeTime < currentTime) {
              if (_is_js2.default.not.desktop()) {
                this.player.ima3.settings.requestMode = 'ondemand';
              }
              this.player.bcima3.playAds(this.upcomingMidroll.adType);
            }
          }
        } else if (this.ad.midrolls[this.upcomingVodMidrollIndex]) {
          // VODのmidroll再生
          if (currentTime > this.ad.midrolls[this.upcomingVodMidrollIndex].startTime) {
            if (_is_js2.default.not.desktop()) {
              this.player.ima3.settings.requestMode = 'ondemand';
            }
            if (this.ad.preventMidrollTime < currentTime) {
              this.upcomingVodMidrollIndex += 1;
              this.player.bcima3.playAds('midroll_' + this.ad.midrollCount);
            }
          }
        }
      }

      if (!this.isBeaconSent) {
        if (this.ad) {
          if (this.ad.prerollPlayed || this.ad.adUrlPreroll === '') {
            console.log('[MediaProgress] currentTime = ' + currentTime);
            if (currentTime > this.beaconTrackPoint) {
              this.sendBeacon();
            }
          }
        } else {
          console.log('[MediaProgress] currentTime = ' + currentTime);
          if (currentTime > this.beaconTrackPoint) {
            this.sendBeacon();
          }
        }
      }
    }
  }, {
    key: 'handleMediaSeeking',
    value: function handleMediaSeeking() {
      this.isSeeking = true;
      if (_is_js2.default.iphone() && this.info.is_ad && !this.info.is_live) {
        this.player.pause();
      }
    }
  }, {
    key: 'handleMediaSeeked',
    value: function handleMediaSeeked() {
      var _this5 = this;

      this.isSeeking = false;
      this.player.one('seeking', this.handleMediaSeeking.bind(this));

      if (this.info.is_ad && !this.info.is_live) {
        if (this.ad.isAdBreaking) {
          this.player.pause();
        } else {
          this.ad.preventMidrollTime = 0;
        }
        this.player.one('playing', function () {
          _this5.upcomingVodMidrollIndex = _this5.ad.getNextVodMidrollIndex(_this5.player.currentTime());
        });
        if (_is_js2.default.iphone()) {
          this.player.play();
        }
      }
    }
  }, {
    key: 'sendBeacon',
    value: function sendBeacon() {
      this.isBeaconSent = true;
      // ABC Beaconログ計測
      var eve = document.createElement('img');
      eve.setAttribute('src', this.beaconUrl);
      eve.setAttribute('width', 0);
      eve.setAttribute('height', 0);
      eve.style.display = 'none';
      document.getElementsByTagName('body')[0].appendChild(eve);
      console.log('Track ABC BeaconUrl =' + this.beaconUrl);

      // VideoStart Tracking for AdobeAnalytics
      // 視聴ページ側のJSメソッドを実行
      videoStartTracking(this.videoRefId);
    }
  }, {
    key: 'hideProgressiveBar',
    value: function hideProgressiveBar() {
      $(this.player.el()).find('.vjs-time-control').hide();
    }
  }, {
    key: 'fetchMidrollXml',
    value: function fetchMidrollXml(url) {
      $.ajax({
        url: url,
        dataType: 'xml',
        context: this,
        success: function success(xml) {
          var _this6 = this;

          this.readMidrollXml(xml, function (updated) {
            if (updated) {
              clearInterval(_this6.requestMidrollXml);
              delete _this6.requestMidrollXml;
              _this6.requestMidrollXml = setInterval(function () {
                var currentMidrollApiUrl = '' + _this6.midrollApiUrl + _this6.fixedMidrollApiUrlParams + '&st=' + _this6.livePlayStartTime + '&now=' + _this6.player.currentTime() + '&n=' + _this6.channelChanged;
                _this6.fetchMidrollXml(currentMidrollApiUrl);
              }, _this6.upcomingMidroll.interval * 1000);
            }
          });
        },
        error: function error(xml) {
          console.error('[Error]Midroll XML cannot be loaded.', xml);
        }
      });
    }
  }, {
    key: 'readMidrollXml',
    value: function readMidrollXml(xml, callback) {
      var updateTime = Number($(xml).find('update').text());
      var updated = false;
      if (updateTime !== this.savedMidrollXmlUpdateTime) {
        updated = true;
        this.savedMidrollXmlUpdateTime = updateTime;
        this.upcomingMidroll.startTime = Number($(xml).find('midroll' + this.info.channel).text());
        this.upcomingMidroll.adType = $(xml).find('adType').text();
        this.upcomingMidroll.interval = Number($(xml).find('interval').text());
        this.midrollApiUrl = $(xml).find('url').text();
        this.upcomingMidroll.isRequested = false;
        console.log('Midroll Time updated. It will be played at ' + this.upcomingMidroll.startTime + ' if it has passed ' + this.prefetchInterval + ' sec after the previous ad played.');
      }
      callback(updated);
    }
  }, {
    key: 'handlePreroll',
    value: function handlePreroll(serverUrl) {
      var _this7 = this;

      if (_is_js2.default.not.desktop()) {
        // Androidでは一瞬本編再生されるので、本編音声が流れないよう音量を一度Muteに変更
        if (_is_js2.default.android()) {
          this.player.volume(0);
        }
        this.player.ima3.settings.serverUrl = serverUrl;

        this.player.one('play', function () {
          // preroll再生
          _this7.player.bcima3.playAds('preroll');
          // preroll広告再生開始まで黒画像を表示
          if (!_this7.blackImageOverlay) {
            _this7.blackImageOverlay = new _Overlay2.default(_this7);
            _this7.blackImageOverlay.overlayBlackImage();
          }
          // スチル画像を非表示
          if (_this7.stillImageOverlay) {
            _this7.stillImageOverlay.hideOverlay();
            delete _this7.stillImageOverlay;
            _this7.stillImageOverlay = null;
          }
        });
      } else {
        // prerollロード時の本編再生開始を防ぐため一時的にplayメソッドを上書き
        var playFunc = this.player.play;
        this.player.play = function () {
          // preroll広告再生開始まで黒画像を表示
          if (!_this7.blackImageOverlay) {
            _this7.blackImageOverlay = new _Overlay2.default(_this7);
            _this7.blackImageOverlay.overlayBlackImage();
          }
          // スチル画像を非表示
          if (_this7.stillImageOverlay) {
            _this7.stillImageOverlay.hideOverlay();
            delete _this7.stillImageOverlay;
            _this7.stillImageOverlay = null;
          }
          // preroll再生
          _this7.player.bcima3.playAds('preroll');
          // 上書きしたplayメソッドを元に戻す
          _this7.player.play = playFunc;
        };
      }
    }
  }, {
    key: 'changeVideo',
    value: function changeVideo(referenceId) {
      var _this8 = this;

      // チャンネル変更回数をインクリメント
      this.channelChanged += 1;
      // 各種パラメーターを初期化
      this.livePlayStartTime = null;
      this.originalSrc = null;
      // 動画読み込み
      var videoRefId = 'ref:' + referenceId;
      this.player.catalog.getVideo(videoRefId, function (error, video) {
        _this8.videoRefId = referenceId;
        _this8.player.catalog.load(video);
        console.log('Load Video, VideoID=' + videoRefId);
      });
    }
  }]);

  return ABCplayer;
}();

exports.default = ABCplayer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

var _App = __webpack_require__(8);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

videojs.plugin('bcima3', function bcima3(pluginOptions) {
  var player = this;
  var BC_IMA3 = new _App2.default(player, pluginOptions);
  videojs(player.id_).bcima3 = BC_IMA3;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdPlayer = function () {
  function AdPlayer(player) {
    _classCallCheck(this, AdPlayer);

    console.log('# AdPlayer instantiated');
    this.player = player;
    this.controller = {
      vjsPlayButton: this.player.el().getElementsByClassName('vjs-play-control')[0],
      vjsVolume: this.player.el().getElementsByClassName('vjs-volume-menu-button')[0],
      vjsVolumeBar: this.player.el().getElementsByClassName('vjs-volume-bar')[0],
      vjsVolumeLevel: this.player.el().getElementsByClassName('vjs-volume-level')[0],
      vjsCurrentTime: this.player.el().getElementsByClassName('vjs-current-time-display')[0],
      vjsDuration: this.player.el().getElementsByClassName('vjs-duration-display')[0],
      vjsProgressContainer: this.player.el().getElementsByClassName('vjs-progress-control')[0],
      vjsFullscreenButton: this.player.el().getElementsByClassName('vjs-fullscreen-control')[0],
      playButton: document.createElement('button'),
      currentTime: document.createElement('div'),
      duration: document.createElement('div'),
      progressContainer: document.createElement('div'),
      progress: document.createElement('div')
    };

    this.isLive = false;

    // 広告用にコントローラー機能を拡張
    this.expandControllerForAd();
  }

  _createClass(AdPlayer, [{
    key: 'expandControllerForAd',
    value: function expandControllerForAd() {
      console.log('# expandControllerForAd');
      // Play Button
      this.controller.playButton.classList.add('ads-button');
      this.controller.playButton.style.display = 'none';
      this.controller.vjsPlayButton.parentNode.insertBefore(this.controller.playButton, this.controller.vjsPlayButton);

      // Time Area
      this.controller.currentTime.classList.add('ads-timer');
      this.controller.currentTime.innerHTML = '0:00';
      this.controller.currentTime.style.display = 'none';
      this.controller.vjsCurrentTime.parentNode.insertBefore(this.controller.currentTime, this.controller.vjsCurrentTime);

      this.controller.duration.classList.add('ads-timer');
      this.controller.duration.innerHTML = '0:00';
      this.controller.duration.style.display = 'none';
      this.controller.vjsDuration.parentNode.insertBefore(this.controller.duration, this.controller.vjsDuration);

      // Progress Bar
      this.controller.progressContainer.classList.add('ads-progressContainer');

      this.controller.progress.classList.add('ads-progress');
      this.controller.progressContainer.appendChild(this.controller.progress);

      this.controller.vjsProgressContainer.parentNode.insertBefore(this.controller.progressContainer, this.controller.vjsProgressContainer);
    }

    /**
     * コントロールバーの本編/広告切り替え
     */

  }, {
    key: 'updateController',
    value: function updateController(isAd, duration) {
      console.log('# updateController', 'isAd:' + isAd, 'duration:' + duration);
      if (isAd) {
        // AD時間をコントローラーにセット
        this.controller.duration.innerHTML = _utilities2.default.formatTime(duration);
        if (this.player.el().classList.contains('vjs-live')) {
          this.isLive = true;
          this.player.el().classList.remove('vjs-live');
          [].forEach.call(document.getElementsByClassName('vjs-time-control'), function (element) {
            if (!element.classList.contains('vjs-remaining-time')) {
              element.style.display = 'block';
            }
          });
        }
      } else {
        // ADプログレスバーの幅を初期化
        this.controller.progress.style.width = '0%';
        if (this.isLive) {
          this.player.el().classList.add('vjs-live');
          [].forEach.call(document.getElementsByClassName('vjs-time-control'), function (element) {
            element.style.display = 'none';
          });
        }
      }
      var adElementsStyle = isAd ? 'block' : 'none';
      var vjsElementsStyle = isAd ? 'none' : 'block';

      this.controller.vjsPlayButton.style.display = vjsElementsStyle;
      this.controller.vjsCurrentTime.style.display = vjsElementsStyle;
      this.controller.vjsDuration.style.display = vjsElementsStyle;
      this.controller.vjsProgressContainer.style.display = vjsElementsStyle;

      this.controller.progress.style.display = adElementsStyle;
      this.controller.playButton.style.display = adElementsStyle;
      this.controller.currentTime.style.display = adElementsStyle;
      this.controller.duration.style.display = adElementsStyle;
      this.controller.progressContainer.style.display = adElementsStyle;
    }

    /**
    * 広告再生時間・プログレスバー更新
    */

  }, {
    key: 'updateTime',
    value: function updateTime(currentTime, duration) {
      this.controller.currentTime.innerHTML = _utilities2.default.formatTime(currentTime);
      this.controller.progress.style.width = currentTime / duration * 100 + 3 + '%';
    }

    /**
     * コントロールバーの再生/停止アイコン切り替え
     */

  }, {
    key: 'updatePlayIcon',
    value: function updatePlayIcon(isPlaying) {
      console.log('# updatePlayIcon', 'isPlaying:' + isPlaying);
      if (isPlaying) {
        this.controller.playButton.classList.remove('ads-play');
        this.controller.playButton.classList.add('ads-pause');
      } else {
        this.controller.playButton.classList.add('ads-play');
        this.controller.playButton.classList.remove('ads-pause');
      }

      // PreRoll再生時は本編再生前でコントロールバーが表示されないためクラスを追加
      if (!this.player.el().classList.contains('vjs-has-started')) {
        this.player.el().classList.add('vjs-has-started');
      }
    }
  }]);

  return AdPlayer;
}();

exports.default = AdPlayer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = __webpack_require__(1);

var _is_js2 = _interopRequireDefault(_is_js);

var _ImaSetup = __webpack_require__(10);

var _ImaSetup2 = _interopRequireDefault(_ImaSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(player, options) {
    _classCallCheck(this, App);

    console.log('# App instantiated');
    this.options = options;
    this.player = player;
    this.videoElement = player.el().firstChild;
    this.originalVideoId = null;
    this.originalSrc = null;
    this.currentSrc = null;
    this.imaSetup = null;

    this.videoSize = {
      width: player.el().offsetWidth,
      height: player.el().offsetHeight
    };

    this.adStatus = {
      isPlaying: false,
      duration: 0
    };

    this.videoSetting = {
      volume: 1,
      muted: false
    };

    this.contentCompleteCalled = false;

    this.adDisplayContainer = null;
    this.adsLoader = null;
    this.adsRenderingSettings = null;
    this.adsManager = {};
    this.currentAd = null;

    this.adTags = {};

    this.setUpIMA();
    this.bindAppEvent();
    if (_is_js2.default.desktop()) {
      this.setVideoEndedCallbackEnabled(true);
    }
  }

  _createClass(App, [{
    key: 'setUpIMA',
    value: function setUpIMA() {
      console.log('# setUpIMA');
      if (_is_js2.default.not.desktop()) {
        var options = this.options.ima3;
        if (!options.requestMode) {
          options.requestMode = 'ondemand';
        }
        options.serverUrl = '';
        this.player.ima3(options);
      } else {
        this.imaSetup = new _ImaSetup2.default(this);
      }
    }
  }, {
    key: 'bindAppEvent',
    value: function bindAppEvent() {
      var _this = this;

      console.log('# bindAppEvent');
      window.addEventListener('resize', this.updateVideoSize.bind(this), false);
      this.player.one('loadedmetadata', this.initializeVideoSettings.bind(this));
      this.player.on('loadedmetadata', this.onMetadataLoaded.bind(this));
      this.player.on('fullscreenchange', this.updateVideoSize.bind(this));
      this.player.on('volumechange', function () {
        return _this.onVolumeChange(_this.player.volume());
      });
    }
  }, {
    key: 'updateVideoSize',
    value: function updateVideoSize() {
      var _this2 = this;

      console.log('# updateVideoSize');
      this.videoSize.width = this.player.el().offsetWidth;
      this.videoSize.height = this.player.el().offsetHeight;
      var viewMode = this.player.isFullscreen() ? 'FULLSCREEN' : 'NORMAL';
      if (!_is_js2.default.empty(this.adsManager)) {
        Object.keys(this.adsManager).forEach(function (adsMgrId) {
          _this2.adsManager[adsMgrId].resize(_this2.videoSize.width, _this2.videoSize.height, google.ima.ViewMode[viewMode]);
        });
      }
    }
  }, {
    key: 'initializeVideoSettings',
    value: function initializeVideoSettings() {
      console.log('# initializeVideoSettings');
      this.originalSrc = this.videoElement.src;
      this.originalVideoId = this.player.mediainfo.id;
    }
  }, {
    key: 'onMetadataLoaded',
    value: function onMetadataLoaded() {
      console.log('# onMetadataLoaded');
      this.currentSrc = this.videoElement.src;
    }
  }, {
    key: 'onContentCompleted',
    value: function onContentCompleted() {
      console.log('# onContentCompleted');
      this.adsLoader.contentComplete();
    }
  }, {
    key: 'setVideoEndedCallbackEnabled',
    value: function setVideoEndedCallbackEnabled(enable) {
      console.log('# setVideoEndedCallbackEnabled', enable);
      this.contentEnded = this.contentEnded.bind(this);
      if (enable) {
        this.registerVideoEndedCallback(this.contentEnded);
      } else {
        this.removeVideoEndedCallback(this.contentEnded);
      }
    }
  }, {
    key: 'registerVideoEndedCallback',
    value: function registerVideoEndedCallback(callback) {
      console.log('# registerVideoEndedCallback');
      this.videoElement.addEventListener('ended', callback);
    }
  }, {
    key: 'removeVideoEndedCallback',
    value: function removeVideoEndedCallback(callback) {
      console.log('# removeVideoEndedCallback');
      this.videoElement.removeEventListener('ended', callback);
    }
  }, {
    key: 'contentEnded',
    value: function contentEnded() {
      if (!this.contentCompleteCalled) {
        console.log('# contentEnded');
        this.contentCompleteCalled = true;
        if (_is_js2.default.desktop()) {
          this.adsLoader.contentComplete();
        }
      }
    }
  }, {
    key: 'createAdsManager',
    value: function createAdsManager(options) {
      var adMgrId = options.adMgrId,
          adsRequestSettings = options.adsRequestSettings,
          adsRenderingSettings = options.adsRenderingSettings;

      if (!adMgrId) {
        console.error('adMgrId is empty, you should set an unique string as id');
      } else if (!_is_js2.default.url(adsRequestSettings.adTagUrl)) {
        console.error('adTagUrl is empty or not a valid URL', adsRequestSettings.adTagUrl);
      } else if (_is_js2.default.not.desktop()) {
        // save adTags to use mobile ima3 adrequest
        this.adTags[adMgrId] = adsRequestSettings.adTagUrl;
        console.log('saved adTadURL', adMgrId, adsRequestSettings.adTagUrl);
      } else {
        console.log('# createAdsManager', adMgrId, adsRequestSettings.adTagUrl);
        this.imaSetup.requestAds(adMgrId, adsRequestSettings, adsRenderingSettings);
      }
    }
  }, {
    key: 'playAds',
    value: function playAds(adMgrId) {
      console.log('# playAds', adMgrId);
      if (_is_js2.default.not.desktop()) {
        if (this.adTags[adMgrId]) {
          this.player.ima3.adrequest(this.adTags[adMgrId]);
        }
      } else if (this.adsManager[adMgrId]) {
        this.imaSetup.imaProcess.playAds(adMgrId);
      }
    }

    /**
     * ボリューム変更時イベント
     */

  }, {
    key: 'onVolumeChange',
    value: function onVolumeChange(volume) {
      var _this3 = this;

      console.log('# onVolumeChange');
      if (this.player.muted()) {
        if (!_is_js2.default.empty(this.adsManager)) {
          Object.keys(this.adsManager).forEach(function (adsMgrId) {
            _this3.adsManager[adsMgrId].setVolume(0);
          });
        }
        this.videoSetting.muted = true;
      } else {
        if (!_is_js2.default.empty(this.adsManager)) {
          Object.keys(this.adsManager).forEach(function (adsMgrId) {
            _this3.adsManager[adsMgrId].setVolume(volume);
          });
        }
        this.videoSetting.volume = volume;
        this.videoSetting.muted = false;
      }
    }

    /**
     * ボリューム取得
     */

  }, {
    key: 'getVolume',
    value: function getVolume() {
      console.log('# getVolume');
      return this.videoSetting.muted ? 0 : this.videoSetting.volume;
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImaProcess = function () {
  function ImaProcess(application, imaSetup) {
    _classCallCheck(this, ImaProcess);

    console.log('# ImaProcess instantiated');
    this.application = application;
    this.imaSetup = imaSetup;
  }

  _createClass(ImaProcess, [{
    key: 'onAdsManagerLoaded',
    value: function onAdsManagerLoaded(adsManagerLoadedEvent) {
      var _this = this;

      var adMgrId = adsManagerLoadedEvent.getUserRequestContext().adMgrId;
      console.log('# onAdsManagerLoaded', adMgrId);
      var settings = adsManagerLoadedEvent.getUserRequestContext().adsRenderingSettings || {};

      // ADマネージャ取得
      this.application.adsManager[adMgrId] = adsManagerLoadedEvent.getAdsManager(this.application.videoElement, Object.assign(new google.ima.AdsRenderingSettings(), settings));

      this.application.adsManager[adMgrId].addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this));

      Object.keys(google.ima.AdEvent.Type).forEach(function (eventType) {
        _this.application.adsManager[adMgrId].addEventListener(google.ima.AdEvent.Type[eventType], _this.onAdEvent.bind(_this, adMgrId), false);
        if (eventType === 'CONTENT_PAUSE_REQUESTED') {
          _this.application.adsManager[adMgrId].addEventListener(google.ima.AdEvent.Type[eventType], _this.onContentPauseRequested.bind(_this), false);
        }
        if (eventType === 'CONTENT_RESUME_REQUESTED') {
          _this.application.adsManager[adMgrId].addEventListener(google.ima.AdEvent.Type[eventType], _this.onContentResumeRequested.bind(_this), false);
        }
      });

      try {
        this.application.adsManager[adMgrId].init(this.application.videoSize.width, this.application.videoSize.height, google.ima.ViewMode.NORMAL);
      } catch (adError) {
        this.application.player.play();
        console.log(adError);
      }
    }
  }, {
    key: 'playAds',
    value: function playAds(adMgrId) {
      this.application.adDisplayContainer.initialize();
      this.application.adsManager[adMgrId].start();
    }
  }, {
    key: 'onAdError',
    value: function onAdError(adErrorEvent) {
      var adMgrId = adErrorEvent.getUserRequestContext().adMgrId;
      console.error('[' + adMgrId + '] ' + adErrorEvent.getError().toString());
      if (this.application.adsManager[adMgrId]) {
        this.application.adsManager[adMgrId].destroy();
        delete this.application.adsManager[adMgrId];
      }
    }
  }, {
    key: 'onAdEvent',
    value: function onAdEvent(adMgrId, adEvent) {
      console.log('# [' + adMgrId + ']AD_EVENT ' + adEvent.type);
      this.application.currentAd = adEvent.getAd();

      switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
          break;
        case google.ima.AdEvent.Type.STARTED:
          this.handleAdStarted(adMgrId);
          break;
        case google.ima.AdEvent.Type.PAUSED:
          this.handleAdPaused(adMgrId);
          break;
        case google.ima.AdEvent.Type.RESUMED:
          this.handleAdResumed(adMgrId);
          break;
        case google.ima.AdEvent.Type.CLICK:
          this.handleAdClicked(adMgrId);
          break;
        case google.ima.AdEvent.Type.COMPLETE:
          this.handleAdsCompleted(adMgrId);
          break;
        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
          this.handleAllAdsCompleted(adMgrId);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'onContentPauseRequested',
    value: function onContentPauseRequested() {
      console.log('# onContentPauseRequested');
      this.application.player.pause();
      if (!this.application.contentCompleteCalled) {
        this.application.setVideoEndedCallbackEnabled(false);
      }
    }
  }, {
    key: 'onContentResumeRequested',
    value: function onContentResumeRequested() {
      console.log('# onContentResumeRequested', 'contentCompleteCalled:' + this.application.contentCompleteCalled);
      // Without this check the video starts over from the beginning on a
      // post-roll's CONTENT_RESUME_REQUESTED
      if (!this.application.contentCompleteCalled) {
        this.application.player.play();
        this.application.setVideoEndedCallbackEnabled(true);
      }
    }
  }, {
    key: 'handleAdStarted',
    value: function handleAdStarted(adMgrId) {
      var _this2 = this;

      // 本体プレイヤーのローディングの非表示
      this.application.player.el().classList.remove('vjs-waiting');
      // AD時間取得
      this.application.adStatus.duration = this.application.currentAd.getDuration();
      // AD表示
      this.imaSetup.setAdContainerVisibility(true);
      // VideoJSプレイヤーの音量をadsPlayerへ連携
      this.application.adsManager[adMgrId].setVolume(this.application.getVolume());
      // コントローラーをAD仕様に変更
      this.imaSetup.adPlayer.updateController(true, this.application.adStatus.duration);
      // 広告用コントローラーの再生・停止クリックイベントを追加
      this.imaSetup.adPlayer.controller.playButton.addEventListener('click', this.adPlayToggle.bind(this, adMgrId), false);
      // Adステータスを更新
      this.application.adStatus.isPlaying = true;
      // 再生ボタンアイコンを更新
      this.imaSetup.adPlayer.updatePlayIcon(this.application.adStatus.isPlaying);
      // 現在時間表示タイマースタート
      this._adsRemainingTimer = setInterval(function () {
        _this2.imaSetup.adPlayer.updateTime(_this2.getAdCurrentTime(adMgrId), _this2.application.adStatus.duration);
      }, 100);
    }
  }, {
    key: 'handleAdPaused',
    value: function handleAdPaused(adMgrId) {
      this.application.adStatus.isPlaying = false;
      // 現在時間表示タイマー停止
      clearInterval(this._adsRemainingTimer);
      // 再生ボタンアイコンを更新
      this.imaSetup.adPlayer.updatePlayIcon(this.application.adStatus.isPlaying);
    }
  }, {
    key: 'handleAdResumed',
    value: function handleAdResumed(adMgrId) {
      var _this3 = this;

      this.application.adStatus.isPlaying = true;
      // 現在時間表示タイマー再開
      this._adsRemainingTimer = setInterval(function () {
        _this3.imaSetup.adPlayer.updateTime(_this3.getAdCurrentTime(adMgrId), _this3.application.adStatus.duration);
      }, 100);
      // 再生ボタンアイコンを更新
      this.imaSetup.adPlayer.updatePlayIcon(this.application.adStatus.isPlaying);
    }
  }, {
    key: 'handleAdClicked',
    value: function handleAdClicked(adMgrId) {
      // 広告再生を停止
      this.application.adsManager[adMgrId].pause();
    }
  }, {
    key: 'handleAdsCompleted',
    value: function handleAdsCompleted(adMgrId) {
      // 現在時間表示タイマー停止
      clearInterval(this._adsRemainingTimer);
    }
  }, {
    key: 'handleAllAdsCompleted',
    value: function handleAllAdsCompleted(adMgrId) {
      // 現在時間表示タイマー停止
      clearInterval(this._adsRemainingTimer);
      // 再生ボタンアイコンを更新
      this.imaSetup.adPlayer.updatePlayIcon(this.application.adStatus.isPlaying);
      // コントローラーを本体仕様に回帰
      this.imaSetup.adPlayer.updateController(false);
      // 広告用コントローラーの再生・停止クリックイベントを削除
      this.imaSetup.adPlayer.controller.playButton.removeEventListener('click', this.adPlayToggle.bind(this, adMgrId), false);
      // 現在のAd情報を削除
      this.application.currentAd = null;
      // Adステータスを更新
      this.application.adStatus.isPlaying = false;
      // AD非表示
      this.imaSetup.setAdContainerVisibility(false);
    }
  }, {
    key: 'getAdCurrentTime',
    value: function getAdCurrentTime(adMgrId) {
      return this.application.adStatus.duration - this.application.adsManager[adMgrId].getRemainingTime();
    }
  }, {
    key: 'adPlayToggle',
    value: function adPlayToggle(adMgrId) {
      console.log('# adPlayToggle', adMgrId);
      if (this.application.adsManager[adMgrId]) {
        if (this.application.adStatus.isPlaying) {
          this.application.adsManager[adMgrId].pause();
        } else {
          this.application.adsManager[adMgrId].resume();
        }
      }
    }
  }]);

  return ImaProcess;
}();

exports.default = ImaProcess;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImaProcess = __webpack_require__(9);

var _ImaProcess2 = _interopRequireDefault(_ImaProcess);

var _AdPlayer = __webpack_require__(7);

var _AdPlayer2 = _interopRequireDefault(_AdPlayer);

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImaSetup = function () {
  function ImaSetup(application) {
    _classCallCheck(this, ImaSetup);

    console.log('# ImaSetup instantiated');
    this.application = application;
    this.adContainerElement = null;

    this.adPlayer = new _AdPlayer2.default(application.player);

    this.createAdDisplayContainer();
    this.application.adsLoader = new google.ima.AdsLoader(this.application.adDisplayContainer);

    this.imaProcess = new _ImaProcess2.default(application, this);
    this.bindImaSetupEvent();
  }

  _createClass(ImaSetup, [{
    key: 'createAdDisplayContainer',
    value: function createAdDisplayContainer() {
      console.log('# createAdDisplayContainer');
      this.adContainerElement = document.createElement('div');
      this.adContainerElement.id = 'adContainer';
      this.application.player.el().appendChild(this.adContainerElement);

      this.application.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerElement, this.application.videoElement);

      // Must be done as the result of a user action on mobile
      this.application.adDisplayContainer.initialize();
      // initialize adContainer visibility
      this.setAdContainerVisibility(false);
    }
  }, {
    key: 'bindImaSetupEvent',
    value: function bindImaSetupEvent() {
      console.log('# bindImaSetupEvent');
      this.application.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.imaProcess.onAdsManagerLoaded.bind(this.imaProcess), false);
      this.application.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.imaProcess.onAdError.bind(this.imaProcess), false);
    }
  }, {
    key: 'requestAds',
    value: function requestAds(adMgrId, adsRequestSettings, adsRenderingSettings) {
      console.log('# requestAds');
      var adsRequest = new google.ima.AdsRequest();
      adsRequest.linearAdSlotWidth = this.application.videoSize.width;
      adsRequest.linearAdSlotHeight = this.application.videoSize.height;
      adsRequest.nonLinearAdSlotWidth = this.application.videoSize.width;
      adsRequest.nonLinearAdSlotHeight = this.application.videoSize.height;
      Object.assign(adsRequest, adsRequestSettings);

      this.application.adsLoader.requestAds(adsRequest, {
        adMgrId: adMgrId,
        adsRenderingSettings: adsRenderingSettings
      });
    }

    /**
     * AD表示切り替え
     */

  }, {
    key: 'setAdContainerVisibility',
    value: function setAdContainerVisibility(visibility) {
      console.log('# setAdContainerVisibility', visibility);
      _utilities2.default.setVisibility(this.adContainerElement, visibility);
    }
  }]);

  return ImaSetup;
}();

exports.default = ImaSetup;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @brightcove/videojs-ima3
 * @version 2.17.0
 * @copyright 2017 Brightcove, Inc.
 * @license UNLICENSED
 */
(function (f) {
  if (( false ? "undefined" : _typeof2(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.videojsIma3 = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (require, module, exports) {}, {}], 2: [function (require, module, exports) {
      (function (global) {
        var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
        var minDoc = require('min-document');

        if (typeof document !== 'undefined') {
          module.exports = document;
        } else {
          var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

          if (!doccy) {
            doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
          }

          module.exports = doccy;
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "min-document": 1 }], 3: [function (require, module, exports) {
      (function (global) {
        if (typeof window !== "undefined") {
          module.exports = window;
        } else if (typeof global !== "undefined") {
          module.exports = global;
        } else if (typeof self !== "undefined") {
          module.exports = self;
        } else {
          module.exports = {};
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 4: [function (require, module, exports) {
      (function (global) {
        'use strict';

        exports.__esModule = true;
        exports['default'] = cancelContentPlay;

        var _window = require('global/window');

        var _window2 = _interopRequireDefault(_window);

        var _document = require('global/document');

        var _document2 = _interopRequireDefault(_document);

        var _video = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _video2 = _interopRequireDefault(_video);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        function cancelContentPlay(player) {
          if (player.ads.cancelPlayTimeout) {
            // another cancellation is already in flight, so do nothing
            return;
          }

          // Avoid content flash on non-iPad iOS and iPhones on iOS10 with playsinline
          if (_video2['default'].browser.IS_IOS && _video2['default'].browser.IS_IPHONE && !player.el_.hasAttribute('playsinline')) {

            var width = player.currentWidth ? player.currentWidth() : player.width();
            var height = player.currentHeight ? player.currentHeight() : player.height();

            // A placeholder black box will be shown in the document while the player is hidden.
            var placeholder = _document2['default'].createElement('div');

            placeholder.style.width = width + 'px';
            placeholder.style.height = height + 'px';
            placeholder.style.background = 'black';
            player.el_.parentNode.insertBefore(placeholder, player.el_);

            // Hide the player. While in full-screen video playback mode on iOS, this
            // makes the player show a black screen instead of content flash.
            player.el_.style.display = 'none';

            // Unhide the player and remove the placeholder once we're ready to move on.
            player.one(['adstart', 'adtimeout', 'adserror', 'adscanceled', 'adskip', 'playing'], function () {
              player.el_.style.display = 'block';
              placeholder.remove();
            });

            // Detect fullscreen change, if returning from fullscreen and placeholder exists,
            // remove placeholder and show player whether or not playsinline was attached.
            player.on('fullscreenchange', function () {
              if (placeholder && !player.isFullscreen()) {
                player.el_.style.display = 'block';
                placeholder.remove();
              }
            });
          }

          // The timeout is necessary because pausing a video element while processing a `play`
          // event on iOS can cause the video element to continuously toggle between playing and
          // paused states.
          player.ads.cancelPlayTimeout = _window2['default'].setTimeout(function () {
            // deregister the cancel timeout so subsequent cancels are scheduled
            player.ads.cancelPlayTimeout = null;

            // pause playback so ads can be handled.
            if (!player.paused()) {
              player.pause();
            }

            // When the 'content-playback' state is entered, this will let us know to play
            player.ads.cancelledPlay = true;
          }, 1);
        } /*
          This feature makes sure the player is paused during ad loading.

          It does this by pausing the player immediately after a "play" where ads will be requested,
          then signalling that we should play after the ad is done.
          */
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "global/document": 2, "global/window": 3 }], 5: [function (require, module, exports) {
      'use strict';

      exports.__esModule = true;
      exports['default'] = initializeContentupdate;

      var _window = require('global/window');

      var _window2 = _interopRequireDefault(_window);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
      }

      // Start sending contentupdate events
      function initializeContentupdate(player) {

        // Keep track of the current content source
        // If you want to change the src of the video without triggering
        // the ad workflow to restart, you can update this variable before
        // modifying the player's source
        player.ads.contentSrc = player.currentSrc();

        // Check if a new src has been set, if so, trigger contentupdate
        var checkSrc = function checkSrc() {
          if (player.ads.state !== 'ad-playback') {
            var src = player.currentSrc();

            if (src !== player.ads.contentSrc) {
              player.trigger({
                type: 'contentupdate',
                oldValue: player.ads.contentSrc,
                newValue: src
              });
              player.ads.contentSrc = src;
            }
          }
        };

        // loadstart reliably indicates a new src has been set
        player.on('loadstart', checkSrc);
        // check immediately in case we missed the loadstart
        _window2['default'].setTimeout(checkSrc, 1);
      } /*
        This feature sends a `contentupdate` event when the player source changes.
        */
    }, { "global/window": 3 }], 6: [function (require, module, exports) {
      (function (global) {
        'use strict';

        exports.__esModule = true;
        exports.processMetadataTracks = processMetadataTracks;
        exports.setMetadataTrackMode = setMetadataTrackMode;
        exports.getSupportedAdCue = getSupportedAdCue;
        exports.getCueId = getCueId;
        exports.processAdTrack = processAdTrack;

        var _video = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _video2 = _interopRequireDefault(_video);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        /**
        * This feature allows metadata text tracks to be manipulated once they are available,
        * usually after the 'loadstart' event is observed on the player
        * @param player A reference to a player
        * @param processMetadataTrack A callback that performs some operations on a
        * metadata text track
        **/
        function processMetadataTracks(player, processMetadataTrack) {
          var tracks = player.textTracks();
          var setModeAndProcess = function setModeAndProcess(track) {
            if (track.kind === 'metadata') {
              player.ads.cueTextTracks.setMetadataTrackMode(track);
              processMetadataTrack(player, track);
            }
          };

          // Text tracks are available
          if (tracks.length > 0) {
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];

              setModeAndProcess(track);
            }
            // Wait until text tracks are added
            // We avoid always setting the event handler in case
            // integrations decide to handle this separately
            // with a different handler for the same event
          } else {
            tracks.addEventListener('addtrack', function (event) {
              var track = event.track;

              setModeAndProcess(track);
            });
          }
        }

        /**
        * Sets the track mode to one of 'disabled', 'hidden' or 'showing'
        * @see https://github.com/videojs/video.js/blob/master/docs/guides/text-tracks.md
        * Default behavior is to do nothing, @override if this is not desired
        * @param track The text track to set the mode on
        */
        /**
        * This feature allows metadata text tracks to be manipulated once available
        * @see processMetadataTracks.
        * It also allows ad implementations to leverage ad cues coming through
        * text tracks, @see processAdTrack
        **/

        function setMetadataTrackMode(track) {
          return;
        }

        /**
        * Determines whether cue is an ad cue and returns the cue data.
        * @param player A reference to the player
        * @param cue The cue to be checked
        * Returns the given cue by default @override if futher processing is required
        * @return the cueData in JSON if cue is a supported ad cue, or -1 if not
        **/
        function getSupportedAdCue(player, cue) {
          return cue;
        }

        /**
        * Gets the id associated with a cue.
        * @param cue The cue to extract an ID from
        * @returns The first occurance of 'id' in the object,
        * @override if this is not the desired cue id
        **/
        function getCueId(player, cue) {
          return cue.id;
        }

        /**
        * Checks whether a cue has already been used
        * @param cueId The Id associated with a cue
        **/
        var cueAlreadySeen = function cueAlreadySeen(player, cueId) {
          return cueId !== undefined && player.ads.includedCues[cueId];
        };

        /**
        * Indicates that a cue has been used
        * @param cueId The Id associated with a cue
        **/
        var setCueAlreadySeen = function setCueAlreadySeen(player, cueId) {
          if (cueId !== undefined && cueId !== '') {
            player.ads.includedCues[cueId] = true;
          }
        };

        /**
        * This feature allows ad metadata tracks to be manipulated in ad implementations
        * @param player A reference to the player
        * @param cues The set of cues to work with
        * @param processCue A method that uses a cue to make some
        * ad request in the ad implementation
        * @param [cancelAds] A method that dynamically cancels ads in the ad implementation
        **/
        function processAdTrack(player, cues, processCue, cancelAds) {
          player.ads.includedCues = {};

          // loop over set of cues
          for (var i = 0; i < cues.length; i++) {
            var cue = cues[i];
            var cueData = this.getSupportedAdCue(player, cue);

            // Exit if this is not a supported cue
            if (cueData === -1) {
              _video2['default'].log.warn('Skipping as this is not a supported ad cue.', cue);
              return;
            }

            // Continue processing supported cue
            var cueId = this.getCueId(player, cue);
            var startTime = cue.startTime;

            // Skip ad if cue was already used
            if (cueAlreadySeen(player, cueId)) {
              _video2['default'].log('Skipping ad already seen with ID ' + cueId);
              return;
            }

            // Process cue as an ad cue
            processCue(player, cueData, cueId, startTime);

            // Indicate that this cue has been used
            setCueAlreadySeen(player, cueId);

            // Optional dynamic ad cancellation
            if (cancelAds !== undefined) {
              cancelAds(player, cueData);
            }
          }
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 7: [function (require, module, exports) {
      (function (global) {
        'use strict';

        exports.__esModule = true;

        var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
        }; /*
           This feature provides an optional method for ad integrations to insert run-time values
           into an ad server URL or configuration.
           */

        exports['default'] = adMacroReplacement;

        var _window = require('global/window');

        var _window2 = _interopRequireDefault(_window);

        var _document = require('global/document');

        var _document2 = _interopRequireDefault(_document);

        var _video = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _video2 = _interopRequireDefault(_video);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        // Return URI encoded version of value if uriEncode is true
        var uriEncodeIfNeeded = function uriEncodeIfNeeded(value, uriEncode) {
          if (uriEncode) {
            return encodeURIComponent(value);
          }
          return value;
        };

        // Add custom field macros to macros object
        // based on given name for custom fields property of mediainfo object.
        var customFields = function customFields(mediainfo, macros, customFieldsName) {
          if (mediainfo && mediainfo[customFieldsName]) {
            var fields = mediainfo[customFieldsName];
            var fieldNames = Object.keys(fields);

            for (var i = 0; i < fieldNames.length; i++) {
              var tag = '{mediainfo.' + customFieldsName + '.' + fieldNames[i] + '}';

              macros[tag] = fields[fieldNames[i]];
            }
          }
        };

        // Public method that integrations use for ad macros.
        // "string" is any string with macros to be replaced
        // "uriEncode" if true will uri encode macro values when replaced
        // "customMacros" is a object with custom macros and values to map them to
        //  - For example: {'{five}': 5}
        // Return value is is "string" with macros replaced
        //  - For example: adMacroReplacement('{player.id}') returns a string of the player id
        function adMacroReplacement(string, uriEncode, customMacros) {

          if (uriEncode === undefined) {
            uriEncode = false;
          }

          var macros = {};

          if (customMacros !== undefined) {
            macros = customMacros;
          }

          // Static macros
          macros['{player.id}'] = this.options_['data-player'];
          macros['{mediainfo.id}'] = this.mediainfo ? this.mediainfo.id : '';
          macros['{mediainfo.name}'] = this.mediainfo ? this.mediainfo.name : '';
          macros['{mediainfo.description}'] = this.mediainfo ? this.mediainfo.description : '';
          macros['{mediainfo.tags}'] = this.mediainfo ? this.mediainfo.tags : '';
          macros['{mediainfo.reference_id}'] = this.mediainfo ? this.mediainfo.reference_id : '';
          macros['{mediainfo.duration}'] = this.mediainfo ? this.mediainfo.duration : '';
          macros['{mediainfo.ad_keys}'] = this.mediainfo ? this.mediainfo.ad_keys : '';
          macros['{player.duration}'] = this.duration();
          macros['{timestamp}'] = new Date().getTime();
          macros['{document.referrer}'] = _document2['default'].referrer;
          macros['{window.location.href}'] = _window2['default'].location.href;
          macros['{random}'] = Math.floor(Math.random() * 1000000000000);

          // Custom fields in mediainfo
          customFields(this.mediainfo, macros, 'custom_fields');
          customFields(this.mediainfo, macros, 'customFields');

          // Go through all the replacement macros and apply them to the string.
          // This will replace all occurrences of the replacement macros.
          for (var i in macros) {
            string = string.split(i).join(uriEncodeIfNeeded(macros[i], uriEncode));
          }

          // Page variables
          string = string.replace(/{pageVariable\.([^}]+)}/g, function (match, name) {
            var value = void 0;
            var context = _window2['default'];
            var names = name.split('.');

            // Iterate down multiple levels of selector without using eval
            // This makes things like pageVariable.foo.bar work
            for (var _i = 0; _i < names.length; _i++) {
              if (_i === names.length - 1) {
                value = context[names[_i]];
              } else {
                context = context[names[_i]];
              }
            }

            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            // Only allow certain types of values. Anything else is probably a mistake.
            if (value === null) {
              return 'null';
            } else if (value === undefined) {
              _video2['default'].log.warn('Page variable "' + name + '" not found');
              return '';
            } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
              _video2['default'].log.warn('Page variable "' + name + '" is not a supported type');
              return '';
            }

            return uriEncodeIfNeeded(String(value), uriEncode);
          });

          return string;
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "global/document": 2, "global/window": 3 }], 8: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var _window = require('global/window');

        var _window2 = _interopRequireDefault(_window);

        var _video = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _video2 = _interopRequireDefault(_video);

        var _redispatch = require('./redispatch.js');

        var _redispatch2 = _interopRequireDefault(_redispatch);

        var _snapshot = require('./snapshot.js');

        var snapshot = _interopRequireWildcard(_snapshot);

        var _contentupdate = require('./contentupdate.js');

        var _contentupdate2 = _interopRequireDefault(_contentupdate);

        var _cancelContentPlay = require('./cancelContentPlay.js');

        var _cancelContentPlay2 = _interopRequireDefault(_cancelContentPlay);

        var _macros = require('./macros.js');

        var _macros2 = _interopRequireDefault(_macros);

        var _cueTextTracks = require('./cueTextTracks.js');

        var cueTextTracks = _interopRequireWildcard(_cueTextTracks);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }newObj['default'] = obj;return newObj;
          }
        }

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        /*
        This main plugin file is responsible for integration logic and enabling the features
        that live in in separate files.
        */

        var VIDEO_EVENTS = _video2['default'].getTech('Html5').Events;

        /**
         * Remove the poster attribute from the video element tech, if present. When
         * reusing a video element for multiple videos, the poster image will briefly
         * reappear while the new source loads. Removing the attribute ahead of time
         * prevents the poster from showing up between videos.
         *
         * @param {Object} player The videojs player object
         */
        var removeNativePoster = function removeNativePoster(player) {
          var tech = player.$('.vjs-tech');

          if (tech) {
            tech.removeAttribute('poster');
          }
        };

        // ---------------------------------------------------------------------------
        // Ad Framework
        // ---------------------------------------------------------------------------

        // default framework settings
        var defaults = {
          // maximum amount of time in ms to wait to receive `adsready` from the ad
          // implementation after play has been requested. Ad implementations are
          // expected to load any dynamic libraries and make any requests to determine
          // ad policies for a video during this time.
          timeout: 5000,

          // maximum amount of time in ms to wait for the ad implementation to start
          // linear ad mode after `readyforpreroll` has fired. This is in addition to
          // the standard timeout.
          prerollTimeout: 100,

          // maximum amount of time in ms to wait for the ad implementation to start
          // linear ad mode after `contentended` has fired.
          postrollTimeout: 100,

          // when truthy, instructs the plugin to output additional information about
          // plugin state to the video.js log. On most devices, the video.js log is
          // the same as the developer console.
          debug: false,

          // set this to true when using ads that are part of the content video
          stitchedAds: false
        };

        var contribAdsPlugin = function contribAdsPlugin(options) {

          var player = this; // eslint-disable-line consistent-this

          var settings = _video2['default'].mergeOptions(defaults, options);

          // prefix all video element events during ad playback
          // if the video element emits ad-related events directly,
          // plugins that aren't ad-aware will break. prefixing allows
          // plugins that wish to handle ad events to do so while
          // avoiding the complexity for common usage
          var videoEvents = VIDEO_EVENTS.concat(['firstplay', 'loadedalldata', 'playing']);

          // Set up redispatching of player events
          player.on(videoEvents, _redispatch2['default']);

          // "vjs-has-started" should be present at the end of a video. This makes sure it's
          // always there.
          player.on('ended', function () {
            if (!player.hasClass('vjs-has-started')) {
              player.addClass('vjs-has-started');
            }
          });

          // We now auto-play when an ad gets loaded if we're playing ads in the same video
          // element as the content.
          // The problem is that in IE11, we cannot play in addurationchange but in iOS8, we
          // cannot play from adcanplay.
          // This will prevent ad-integrations from needing to do this themselves.
          player.on(['addurationchange', 'adcanplay'], function () {
            if (player.currentSrc() === player.ads.snapshot.currentSrc) {
              return;
            }

            player.play();
          });

          player.on('nopreroll', function () {
            player.ads.nopreroll_ = true;
          });

          player.on('nopostroll', function () {
            player.ads.nopostroll_ = true;
          });

          // Remove ad-loading class when ad plays or when content plays (in case there was no ad)
          // If you remove this class too soon you can get a flash of content!
          player.on(['ads-ad-started', 'playing'], function () {
            player.removeClass('vjs-ad-loading');
          });

          // Replace the plugin constructor with the ad namespace
          player.ads = {
            state: 'content-set',
            disableNextSnapshotRestore: false,

            // This is set to true if the content has ended once. After that, the user can
            // seek backwards and replay content, but _contentHasEnded remains true.
            _contentHasEnded: false,

            // This is an estimation of the current ad type being played
            // This is experimental currently. Do not rely on its presence or behavior!
            adType: null,

            VERSION: '4.2.5',

            reset: function reset() {
              player.ads.disableNextSnapshotRestore = false;
              player.ads._contentHasEnded = false;
              player.ads.snapshot = null;
              player.ads.adType = null;
            },

            // Call this when an ad response has been received and there are
            // linear ads ready to be played.
            startLinearAdMode: function startLinearAdMode() {
              if (player.ads.state === 'preroll?' || player.ads.state === 'content-playback' || player.ads.state === 'postroll?') {
                player.trigger('adstart');
              }
            },

            // Call this when a linear ad pod has finished playing.
            endLinearAdMode: function endLinearAdMode() {
              if (player.ads.state === 'ad-playback') {
                player.trigger('adend');
                // In the case of an empty ad response, we want to make sure that
                // the vjs-ad-loading class is always removed. We could probably check for
                // duration on adPlayer for an empty ad but we remove it here just to make sure
                player.removeClass('vjs-ad-loading');
              }
            },

            // Call this when an ad response has been received but there are no
            // linear ads to be played (i.e. no ads available, or overlays).
            // This has no effect if we are already in a linear ad mode.  Always
            // use endLinearAdMode() to exit from linear ad-playback state.
            skipLinearAdMode: function skipLinearAdMode() {
              if (player.ads.state !== 'ad-playback') {
                player.trigger('adskip');
              }
            },
            stitchedAds: function stitchedAds(arg) {
              if (arg !== undefined) {
                this._stitchedAds = !!arg;
              }
              return this._stitchedAds;
            },

            // Returns whether the video element has been modified since the
            // snapshot was taken.
            // We test both src and currentSrc because changing the src attribute to a URL that
            // AdBlocker is intercepting doesn't update currentSrc.
            videoElementRecycled: function videoElementRecycled() {
              if (!this.snapshot) {
                throw new Error('You cannot use videoElementRecycled while there is no snapshot.');
              }

              var srcChanged = player.src() !== this.snapshot.src;
              var currentSrcChanged = player.currentSrc() !== this.snapshot.currentSrc;

              return srcChanged || currentSrcChanged;
            },

            // Returns a boolean indicating if given player is in live mode.
            // Can be replaced when this is fixed: https://github.com/videojs/video.js/issues/3262
            isLive: function isLive(somePlayer) {
              if (somePlayer.duration() === Infinity) {
                return true;
              } else if (_video2['default'].browser.IOS_VERSION === '8' && somePlayer.duration() === 0) {
                return true;
              }
              return false;
            },

            // Return true if content playback should mute and continue during ad breaks.
            // This is only done during live streams on platforms where it's supported.
            // This improves speed and accuracy when returning from an ad break.
            shouldPlayContentBehindAd: function shouldPlayContentBehindAd(somePlayer) {
              return !_video2['default'].browser.IS_IOS && !_video2['default'].browser.IS_ANDROID && somePlayer.duration() === Infinity;
            }
          };

          player.ads.stitchedAds(settings.stitchedAds);

          player.ads.cueTextTracks = cueTextTracks;
          player.ads.adMacroReplacement = _macros2['default'].bind(player);

          // Start sending contentupdate events for this player
          (0, _contentupdate2['default'])(player);

          // Global contentupdate handler for resetting plugin state
          player.on('contentupdate', player.ads.reset);

          // Ad Playback State Machine
          var states = {
            'content-set': {
              events: {
                adscanceled: function adscanceled() {
                  this.state = 'content-playback';
                },
                adsready: function adsready() {
                  this.state = 'ads-ready';
                },
                play: function play() {
                  this.state = 'ads-ready?';
                  (0, _cancelContentPlay2['default'])(player);
                  // remove the poster so it doesn't flash between videos
                  removeNativePoster(player);
                },
                adserror: function adserror() {
                  this.state = 'content-playback';
                },
                adskip: function adskip() {
                  this.state = 'content-playback';
                }
              }
            },
            'ads-ready': {
              events: {
                play: function play() {
                  this.state = 'preroll?';
                  (0, _cancelContentPlay2['default'])(player);
                },
                adskip: function adskip() {
                  this.state = 'content-playback';
                },
                adserror: function adserror() {
                  this.state = 'content-playback';
                }
              }
            },
            'preroll?': {
              enter: function enter() {
                if (player.ads.nopreroll_) {
                  // This will start the ads manager in case there are later ads
                  player.trigger('readyforpreroll');

                  // If we don't wait a tick, entering content-playback will cancel
                  // cancelPlayTimeout, causing the video to not pause for the ad
                  _window2['default'].setTimeout(function () {
                    // Don't wait for a preroll
                    player.trigger('nopreroll');
                  }, 1);
                } else {
                  // change class to show that we're waiting on ads
                  player.addClass('vjs-ad-loading');
                  // schedule an adtimeout event to fire if we waited too long
                  player.ads.adTimeoutTimeout = _window2['default'].setTimeout(function () {
                    player.trigger('adtimeout');
                  }, settings.prerollTimeout);
                  // signal to ad plugin that it's their opportunity to play a preroll
                  player.trigger('readyforpreroll');
                }
              },
              leave: function leave() {
                _window2['default'].clearTimeout(player.ads.adTimeoutTimeout);
              },

              events: {
                play: function play() {
                  (0, _cancelContentPlay2['default'])(player);
                },
                adstart: function adstart() {
                  this.state = 'ad-playback';
                  player.ads.adType = 'preroll';
                },
                adskip: function adskip() {
                  this.state = 'content-playback';
                },
                adtimeout: function adtimeout() {
                  this.state = 'content-playback';
                },
                adserror: function adserror() {
                  this.state = 'content-playback';
                },
                nopreroll: function nopreroll() {
                  this.state = 'content-playback';
                }
              }
            },
            'ads-ready?': {
              enter: function enter() {
                player.addClass('vjs-ad-loading');
                player.ads.adTimeoutTimeout = _window2['default'].setTimeout(function () {
                  player.trigger('adtimeout');
                }, settings.timeout);
              },
              leave: function leave() {
                _window2['default'].clearTimeout(player.ads.adTimeoutTimeout);
                player.removeClass('vjs-ad-loading');
              },

              events: {
                play: function play() {
                  (0, _cancelContentPlay2['default'])(player);
                },
                adscanceled: function adscanceled() {
                  this.state = 'content-playback';
                },
                adsready: function adsready() {
                  this.state = 'preroll?';
                },
                adskip: function adskip() {
                  this.state = 'content-playback';
                },
                adtimeout: function adtimeout() {
                  this.state = 'content-playback';
                },
                adserror: function adserror() {
                  this.state = 'content-playback';
                }
              }
            },
            'ad-playback': {
              enter: function enter() {
                // capture current player state snapshot (playing, currentTime, src)
                if (!player.ads.shouldPlayContentBehindAd(player)) {
                  this.snapshot = snapshot.getPlayerSnapshot(player);
                }

                // Mute the player behind the ad
                if (player.ads.shouldPlayContentBehindAd(player)) {
                  this.preAdVolume_ = player.volume();
                  player.volume(0);
                }

                // add css to the element to indicate and ad is playing.
                player.addClass('vjs-ad-playing');

                // We should remove the vjs-live class if it has been added in order to
                // show the adprogress control bar on Android devices for falsely
                // determined LIVE videos due to the duration incorrectly reported as Infinity
                if (player.hasClass('vjs-live')) {
                  player.removeClass('vjs-live');
                }

                // remove the poster so it doesn't flash between ads
                removeNativePoster(player);

                // We no longer need to supress play events once an ad is playing.
                // Clear it if we were.
                if (player.ads.cancelPlayTimeout) {
                  // If we don't wait a tick, we could cancel the pause for cancelContentPlay,
                  // resulting in content playback behind the ad
                  _window2['default'].setTimeout(function () {
                    _window2['default'].clearTimeout(player.ads.cancelPlayTimeout);
                    player.ads.cancelPlayTimeout = null;
                  }, 1);
                }
              },
              leave: function leave() {
                player.removeClass('vjs-ad-playing');

                // We should add the vjs-live class back if the video is a LIVE video
                // If we dont do this, then for a LIVE Video, we will get an incorrect
                // styled control, which displays the time for the video
                if (player.ads.isLive(player)) {
                  player.addClass('vjs-live');
                }
                if (!player.ads.shouldPlayContentBehindAd(player)) {
                  snapshot.restorePlayerSnapshot(player, this.snapshot);
                }

                // Reset the volume to pre-ad levels
                if (player.ads.shouldPlayContentBehindAd(player)) {
                  player.volume(this.preAdVolume_);
                }
              },

              events: {
                adend: function adend() {
                  this.state = 'content-resuming';
                  player.ads.adType = null;
                },
                adserror: function adserror() {
                  this.state = 'content-resuming';
                  // Trigger 'adend' to notify that we are exiting 'ad-playback'
                  player.trigger('adend');
                }
              }
            },
            'content-resuming': {
              enter: function enter() {
                if (this._contentHasEnded) {
                  _window2['default'].clearTimeout(player.ads._fireEndedTimeout);
                  // in some cases, ads are played in a swf or another video element
                  // so we do not get an ended event in this state automatically.
                  // If we don't get an ended event we can use, we need to trigger
                  // one ourselves or else we won't actually ever end the current video.
                  player.ads._fireEndedTimeout = _window2['default'].setTimeout(function () {
                    player.trigger('ended');
                  }, 1000);
                }
              },
              leave: function leave() {
                _window2['default'].clearTimeout(player.ads._fireEndedTimeout);
              },

              events: {
                contentupdate: function contentupdate() {
                  this.state = 'content-set';
                },

                // This is for stitched ads only.
                contentresumed: function contentresumed() {
                  this.state = 'content-playback';
                },
                playing: function playing() {
                  this.state = 'content-playback';
                },
                ended: function ended() {
                  this.state = 'content-playback';
                }
              }
            },
            'postroll?': {
              enter: function enter() {
                this.snapshot = snapshot.getPlayerSnapshot(player);
                if (player.ads.nopostroll_) {
                  _window2['default'].setTimeout(function () {
                    // content-resuming happens after the timeout for backward-compatibility
                    // with plugins that relied on a postrollTimeout before nopostroll was
                    // implemented
                    player.ads.state = 'content-resuming';
                    player.trigger('ended');
                  }, 1);
                } else {
                  player.addClass('vjs-ad-loading');

                  player.ads.adTimeoutTimeout = _window2['default'].setTimeout(function () {
                    player.trigger('adtimeout');
                  }, settings.postrollTimeout);
                }
              },
              leave: function leave() {
                _window2['default'].clearTimeout(player.ads.adTimeoutTimeout);
                player.removeClass('vjs-ad-loading');
              },

              events: {
                adstart: function adstart() {
                  this.state = 'ad-playback';
                  player.ads.adType = 'postroll';
                },
                adskip: function adskip() {
                  this.state = 'content-resuming';
                  _window2['default'].setTimeout(function () {
                    player.trigger('ended');
                  }, 1);
                },
                adtimeout: function adtimeout() {
                  this.state = 'content-resuming';
                  _window2['default'].setTimeout(function () {
                    player.trigger('ended');
                  }, 1);
                },
                adserror: function adserror() {
                  this.state = 'content-resuming';
                  _window2['default'].setTimeout(function () {
                    player.trigger('ended');
                  }, 1);
                },
                contentupdate: function contentupdate() {
                  this.state = 'ads-ready?';
                }
              }
            },
            'content-playback': {
              enter: function enter() {
                // make sure that any cancelPlayTimeout is cleared
                if (player.ads.cancelPlayTimeout) {
                  _window2['default'].clearTimeout(player.ads.cancelPlayTimeout);
                  player.ads.cancelPlayTimeout = null;
                }

                // This was removed because now that "playing" is fixed to only play after
                // preroll, any integration should just use the "playing" event. However,
                // we found out some 3rd party code relied on this event, so we've temporarily
                // added it back in to give people more time to update their code.
                player.trigger({
                  type: 'contentplayback',
                  triggerevent: player.ads.triggerevent
                });

                // Play the content
                if (player.ads.cancelledPlay) {
                  player.ads.cancelledPlay = false;
                  if (player.paused()) {
                    player.play();
                  }
                }
              },

              events: {
                // In the case of a timeout, adsready might come in late.
                // This assumes the behavior that if an ad times out, it could still
                // interrupt the content and start playing. An integration could
                // still decide to behave otherwise.
                adsready: function adsready() {
                  player.trigger('readyforpreroll');
                },
                adstart: function adstart() {
                  this.state = 'ad-playback';
                  // This is a special case in which preroll is specifically set
                  if (player.ads.adType !== 'preroll') {
                    player.ads.adType = 'midroll';
                  }
                },
                contentupdate: function contentupdate() {
                  // We know sources have changed, so we call CancelContentPlay
                  // to avoid playback of video in the background of an ad. Playback Occurs on
                  // Android devices if we do not call cancelContentPlay. This is because
                  // the sources do not get updated in time on Android due to timing issues.
                  // So instead of checking if the sources have changed in the play handler
                  // and calling cancelContentPlay() there we call it here.
                  // This does not happen on Desktop as the sources do get updated in time.
                  if (!player.ads.shouldPlayContentBehindAd(player)) {
                    (0, _cancelContentPlay2['default'])(player);
                  }
                  if (player.paused()) {
                    this.state = 'content-set';
                  } else {
                    this.state = 'ads-ready?';
                  }
                },
                contentended: function contentended() {

                  // If _contentHasEnded is true it means we already checked for postrolls and
                  // played postrolls if needed, so now we're ready to send an ended event
                  if (this._contentHasEnded) {
                    // Causes ended event to trigger in content-resuming.enter.
                    // From there, the ended event event is not redispatched.
                    // Then we end up back in content-playback state.
                    this.state = 'content-resuming';
                    return;
                  }

                  this._contentHasEnded = true;
                  this.state = 'postroll?';
                }
              }
            }
          };

          var processEvent = function processEvent(event) {

            var state = player.ads.state;

            // Execute the current state's handler for this event
            var eventHandlers = states[state].events;

            if (eventHandlers) {
              var handler = eventHandlers[event.type];

              if (handler) {
                handler.apply(player.ads);
              }
            }

            // If the state has changed...
            if (state !== player.ads.state) {
              var previousState = state;
              var newState = player.ads.state;

              // Record the event that caused the state transition
              player.ads.triggerevent = event.type;

              // Execute "leave" method for the previous state
              if (states[previousState].leave) {
                states[previousState].leave.apply(player.ads);
              }

              // Execute "enter" method for the new state
              if (states[newState].enter) {
                states[newState].enter.apply(player.ads);
              }

              // Debug log message for state changes
              if (settings.debug) {
                _video2['default'].log('ads', player.ads.triggerevent + ' triggered: ' + previousState + ' -> ' + newState);
              }
            }
          };

          // Register our handler for the events that the state machine will process
          player.on(VIDEO_EVENTS.concat([
          // Events emitted by this plugin
          'adtimeout', 'contentupdate', 'contentplaying', 'contentended', 'contentresumed',
          // Triggered by startLinearAdMode()
          'adstart',
          // Triggered by endLinearAdMode()
          'adend',
          // Triggered by skipLinearAdMode()
          'adskip',

          // Events emitted by integrations
          'adsready', 'adserror', 'adscanceled', 'nopreroll']), processEvent);

          // If we're autoplaying, the state machine will immidiately process
          // a synthetic play event
          if (!player.paused()) {
            processEvent({ type: 'play' });
          }
        };

        var registerPlugin = _video2['default'].registerPlugin || _video2['default'].plugin;

        // Register this plugin with videojs
        registerPlugin('ads', contribAdsPlugin);
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./cancelContentPlay.js": 4, "./contentupdate.js": 5, "./cueTextTracks.js": 6, "./macros.js": 7, "./redispatch.js": 9, "./snapshot.js": 10, "global/window": 3 }], 9: [function (require, module, exports) {
      'use strict';

      exports.__esModule = true;
      exports['default'] = redispatch;
      /*
      The goal of this feature is to make player events work as an integrator would
      expect despite the presense of ads. For example, an integrator would expect
      an `ended` event to happen once the content is ended. If an `ended` event is sent
      as a result of an ad ending, that is a bug. The `redispatch` method should recognize
      such `ended` events and prefix them so they are sent as `adended`, and so on with
      all other player events.
      */

      // Stop propogation for an event
      var cancelEvent = function cancelEvent(player, event) {
        // Pretend we called stopImmediatePropagation because we want the native
        // element events to continue propagating
        event.isImmediatePropagationStopped = function () {
          return true;
        };
        event.cancelBubble = true;
        event.isPropagationStopped = function () {
          return true;
        };
      };

      // Stop propogation for an event, then send a new event with the type of the original
      // event with the given prefix added.
      var prefixEvent = function prefixEvent(player, prefix, event) {
        cancelEvent(player, event);
        player.trigger({
          type: prefix + event.type,
          state: player.ads.state,
          originalEvent: event
        });
      };

      // Handle a player event, either by redispatching it with a prefix, or by
      // letting it go on its way without any meddling.
      function redispatch(event) {

        // We do a quick play/pause before we check for prerolls. This creates a "playing"
        // event. This conditional block prefixes that event so it's "adplaying" if it
        // happens while we're in the "preroll?" state. Not every browser is in the
        // "preroll?" state for this event, so the following browsers come through here:
        //  * iPad
        //  * iPhone
        //  * Android
        //  * Safari
        // This is too soon to check videoElementRecycled because there is no snapshot
        // yet. We rely on the coincidence that all browsers for which
        // videoElementRecycled would be true also happen to send their initial playing
        // event during "preroll?"
        if (event.type === 'playing' && this.ads.state === 'preroll?') {
          prefixEvent(this, 'ad', event);

          // Here we send "adplaying" for browsers that send their initial "playing" event
          // (caused by the the initial play/pause) during the "ad-playback" state.
          // The following browsers come through here:
          // * Chrome
          // * IE11
          // If the ad plays in the content tech (aka videoElementRecycled) there will be
          // another playing event when the ad starts. We check videoElementRecycled to
          // avoid a second adplaying event. Thankfully, at this point a snapshot exists
          // so we can safely check videoElementRecycled.
        } else if (event.type === 'playing' && this.ads.state === 'ad-playback' && !this.ads.videoElementRecycled()) {
          prefixEvent(this, 'ad', event);

          // If the ad takes a long time to load, "playing" caused by play/pause can happen
          // during "ads-ready?" instead of "preroll?" or "ad-playback", skipping the
          // other conditions that would normally catch it
        } else if (event.type === 'playing' && this.ads.state === 'ads-ready?') {
          prefixEvent(this, 'ad', event);

          // When an ad is playing in content tech, we would normally prefix
          // "playing" with "ad" to send "adplaying". However, when we did a play/pause
          // before the preroll, we already sent "adplaying". This condition prevents us
          // from sending another.
        } else if (event.type === 'playing' && this.ads.state === 'ad-playback' && this.ads.videoElementRecycled()) {
          cancelEvent(this, event);
          return;

          // When ad is playing in content tech, prefix everything with "ad".
          // This block catches many events such as emptied, play, timeupdate, and ended.
        } else if (this.ads.state === 'ad-playback') {
          if (this.ads.videoElementRecycled() || this.ads.stitchedAds()) {
            prefixEvent(this, 'ad', event);
          }

          // Send contentended if ended happens during content.
          // We will make sure an ended event is sent after postrolls.
        } else if (this.ads.state === 'content-playback' && event.type === 'ended') {
          prefixEvent(this, 'content', event);

          // Event prefixing during content resuming is complicated
        } else if (this.ads.state === 'content-resuming') {

          // This does not happen during normal circumstances. I wasn't able to reproduce
          // it, but the working theory is that it handles cases where restoring the
          // snapshot takes a long time, such as in iOS7 and older Firefox.
          if (this.ads.snapshot && this.currentSrc() !== this.ads.snapshot.currentSrc) {

            // Don't prefix `loadstart` event
            if (event.type === 'loadstart') {
              return;
            }

            // All other events get "content" prefix
            return prefixEvent(this, 'content', event);

            // Content resuming after postroll
          } else if (this.ads.snapshot && this.ads.snapshot.ended) {

            // Don't prefix `pause` and `ended` events
            // They don't always happen during content-resuming, but they might.
            // It seems to happen most often on iOS and Android.
            if (event.type === 'pause' || event.type === 'ended') {
              return;
            }

            // All other events get "content" prefix
            return prefixEvent(this, 'content', event);
          }

          // Content resuming after preroll or midroll
          // Events besides "playing" get "content" prefix
          if (event.type !== 'playing') {
            prefixEvent(this, 'content', event);
          }
        }
      }
    }, {}], 10: [function (require, module, exports) {
      (function (global) {
        'use strict';

        exports.__esModule = true;
        exports.getPlayerSnapshot = getPlayerSnapshot;
        exports.restorePlayerSnapshot = restorePlayerSnapshot;

        var _window = require('global/window');

        var _window2 = _interopRequireDefault(_window);

        var _video = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _video2 = _interopRequireDefault(_video);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        /**
         * Returns an object that captures the portions of player state relevant to
         * video playback. The result of this function can be passed to
         * restorePlayerSnapshot with a player to return the player to the state it
         * was in when this function was invoked.
         * @param {Object} player The videojs player object
         */
        /*
        The snapshot feature is responsible for saving the player state before an ad, then
        restoring the player state after an ad.
        */

        function getPlayerSnapshot(player) {

          var currentTime = void 0;

          if (_video2['default'].browser.IS_IOS && player.ads.isLive(player)) {
            // Record how far behind live we are
            if (player.seekable().length > 0) {
              currentTime = player.currentTime() - player.seekable().end(0);
            } else {
              currentTime = player.currentTime();
            }
          } else {
            currentTime = player.currentTime();
          }

          var tech = player.$('.vjs-tech');
          var remoteTracks = player.remoteTextTracks ? player.remoteTextTracks() : [];
          var tracks = player.textTracks ? player.textTracks() : [];
          var suppressedRemoteTracks = [];
          var suppressedTracks = [];
          var snapshotObject = {
            ended: player.ended(),
            currentSrc: player.currentSrc(),
            src: player.src(),
            currentTime: currentTime,
            type: player.currentType()
          };

          if (tech) {
            snapshotObject.nativePoster = tech.poster;
            snapshotObject.style = tech.getAttribute('style');
          }

          for (var i = 0; i < remoteTracks.length; i++) {
            var track = remoteTracks[i];

            suppressedRemoteTracks.push({
              track: track,
              mode: track.mode
            });
            track.mode = 'disabled';
          }
          snapshotObject.suppressedRemoteTracks = suppressedRemoteTracks;

          for (var _i = 0; _i < tracks.length; _i++) {
            var _track = tracks[_i];

            suppressedTracks.push({
              track: _track,
              mode: _track.mode
            });
            _track.mode = 'disabled';
          }
          snapshotObject.suppressedTracks = suppressedTracks;

          return snapshotObject;
        }

        /**
         * Attempts to modify the specified player so that its state is equivalent to
         * the state of the snapshot.
         * @param {Object} player - the videojs player object
         * @param {Object} snapshotObject - the player state to apply
         */
        function restorePlayerSnapshot(player, snapshotObject) {

          if (player.ads.disableNextSnapshotRestore === true) {
            player.ads.disableNextSnapshotRestore = false;
            return;
          }

          // The playback tech
          var tech = player.$('.vjs-tech');

          // the number of[ remaining attempts to restore the snapshot
          var attempts = 20;

          var suppressedRemoteTracks = snapshotObject.suppressedRemoteTracks;
          var suppressedTracks = snapshotObject.suppressedTracks;
          var trackSnapshot = void 0;
          var restoreTracks = function restoreTracks() {
            for (var i = 0; i < suppressedRemoteTracks.length; i++) {
              trackSnapshot = suppressedRemoteTracks[i];
              trackSnapshot.track.mode = trackSnapshot.mode;
            }

            for (var _i2 = 0; _i2 < suppressedTracks.length; _i2++) {
              trackSnapshot = suppressedTracks[_i2];
              trackSnapshot.track.mode = trackSnapshot.mode;
            }
          };

          // finish restoring the playback state
          var resume = function resume() {
            var currentTime = void 0;

            if (_video2['default'].browser.IS_IOS && player.ads.isLive(player)) {
              if (snapshotObject.currentTime < 0) {
                // Playback was behind real time, so seek backwards to match
                if (player.seekable().length > 0) {
                  currentTime = player.seekable().end(0) + snapshotObject.currentTime;
                } else {
                  currentTime = player.currentTime();
                }
                player.currentTime(currentTime);
              }
            } else if (snapshotObject.ended) {
              player.currentTime(player.duration());
            } else {
              player.currentTime(snapshotObject.currentTime);
            }

            // Resume playback if this wasn't a postroll
            if (!snapshotObject.ended) {
              player.play();
            }
          };

          // determine if the video element has loaded enough of the snapshot source
          // to be ready to apply the rest of the state
          var tryToResume = function tryToResume() {

            // tryToResume can either have been called through the `contentcanplay`
            // event or fired through setTimeout.
            // When tryToResume is called, we should make sure to clear out the other
            // way it could've been called by removing the listener and clearing out
            // the timeout.
            player.off('contentcanplay', tryToResume);
            if (player.ads.tryToResumeTimeout_) {
              player.clearTimeout(player.ads.tryToResumeTimeout_);
              player.ads.tryToResumeTimeout_ = null;
            }

            // Tech may have changed depending on the differences in sources of the
            // original video and that of the ad
            tech = player.el().querySelector('.vjs-tech');

            if (tech.readyState > 1) {
              // some browsers and media aren't "seekable".
              // readyState greater than 1 allows for seeking without exceptions
              return resume();
            }

            if (tech.seekable === undefined) {
              // if the tech doesn't expose the seekable time ranges, try to
              // resume playback immediately
              return resume();
            }

            if (tech.seekable.length > 0) {
              // if some period of the video is seekable, resume playback
              return resume();
            }

            // delay a bit and then check again unless we're out of attempts
            if (attempts--) {
              _window2['default'].setTimeout(tryToResume, 50);
            } else {
              try {
                resume();
              } catch (e) {
                _video2['default'].log.warn('Failed to resume the content after an advertisement', e);
              }
            }
          };

          if (snapshotObject.nativePoster) {
            tech.poster = snapshotObject.nativePoster;
          }

          if ('style' in snapshotObject) {
            // overwrite all css style properties to restore state precisely
            tech.setAttribute('style', snapshotObject.style || '');
          }

          // Determine whether the player needs to be restored to its state
          // before ad playback began. With a custom ad display or burned-in
          // ads, the content player state hasn't been modified and so no
          // restoration is required

          if (player.ads.videoElementRecycled()) {
            // on ios7, fiddling with textTracks too early will cause safari to crash
            player.one('contentloadedmetadata', restoreTracks);

            // if the src changed for ad playback, reset it
            player.src({ src: snapshotObject.currentSrc, type: snapshotObject.type });
            // safari requires a call to `load` to pick up a changed source
            player.load();
            // and then resume from the snapshots time once the original src has loaded
            // in some browsers (firefox) `canplay` may not fire correctly.
            // Reace the `canplay` event with a timeout.
            player.one('contentcanplay', tryToResume);
            player.ads.tryToResumeTimeout_ = player.setTimeout(tryToResume, 2000);
          } else if (!player.ended() || !snapshotObject.ended) {
            // if we didn't change the src, just restore the tracks
            restoreTracks();
            // the src didn't change and this wasn't a postroll
            // just resume playback at the current time.
            player.play();
          }
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "global/window": 3 }], 11: [function (require, module, exports) {
      (function (global) {
        'use strict';

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        var _videoJs = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _videoJs2 = _interopRequireDefault(_videoJs);

        require('videojs-contrib-ads');

        var _globalWindow = require('global/window');

        var _globalWindow2 = _interopRequireDefault(_globalWindow);

        /**
         * Support for Google's IMA 3 SDK in Video.js
         *
         * If you're looking for information on how IMA 3 works, this is your ticket:
         *  - https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/ads
         */

        /**
         * IMA3 Plugin base object.
         */
        var plugin = _videoJs2['default'].ima3 = {};

        /**
         * Default values for optional plugin config options.
         */
        var defaults = plugin.defaults = {

          // The URL of the IMA3 SDK
          sdkurl: (/^(file|data):/.test(_globalWindow2['default'].location.protocol) ? 'http:' : '') + '//s0.2mdn.net/instream/html5/ima3.js',

          // the ad technology preference order
          adTechOrder: ['flash', 'html5'],

          // The URL of the ad server to make requests to during playback
          serverUrl: (_globalWindow2['default'].location.protocol === 'file:' ? 'http:' : '') + '//pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=%2F6062%2Fiab_vast_samples&c' + 'iu_szs=300x250%2C728x90&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_sta' + 'rt=1&url=[referrer_url]&correlator=[timestamp]&cust_params=iab_vast_samples%3Dli' + 'near',

          // the location of the IMA3 ad display SWF
          adSwf: (_globalWindow2['default'].location.protocol === 'file:' ? 'http:' : '') + '//players.brightcove.net/videojs-ima3/2.17.0/videojs.ima3.swf',

          // determines if there's a loading spinner animation while ad is loading
          loadingSpinner: false,

          // The options to use when initializing the ad control bar. The ad control
          // bar is displayed when a separate display element is used for ad playback.
          // Currently, this is only true for the Flash ad tech.
          // adControlBar: inherited at runtime from the content control bar

          // @see the `timeout` option from videojs-contrib-ads
          // this controls the following two options also:
          // @see the `prerollTimeout` option from videojs-contrib-ads
          // @see the `postrollTimeout` option from videojs-contrib-ads
          timeout: 4000,

          // When to request ads: during player load ('onload'), during playback ('onplay'),
          // ondemand ('ondemand'), cuechange ('oncue')
          requestMode: 'onload',

          // Abandon ads that finish loading after they have timed out
          hardTimeouts: true
        };

        /**
         * Copies properties from one or more objects onto an original.
         * Usage: videojs.ima3.extend(obj, arg1, arg2, ...)
         */
        var extend = _videoJs2['default'].ima3.extend = function (obj) {
          for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];

            for (var k in arg) {
              if (arg.hasOwnProperty(k)) {
                obj[k] = arg[k];
              }
            }
          }
          return obj;
        };

        /**
         * Initialize the plugin based on specified options.
         *
         * @param {object} options Options hash for specifying plugin behavior.
         * May contain the following options:
         * - sdkurl: location of the ima3.js file (optional)
         */
        var ima3 = function ima3(options) {
          var _this = this;

          var settings = extend({}, defaults, options || {});
          // grab the tech element (HTML5 video element or Flash object)
          var tech = this.el().querySelector('.vjs-tech');
          // handy alias for the adTechOrder
          var adTechOrder = settings.adTechOrder;
          // whether an appropriate ad tech can be determined
          var adTechInitialized = false;
          var adTech = undefined;

          // Hide the content and poster in autoplay
          this.addClass('vjs-ima3-not-playing-yet');

          if (options && options.useMediaCuePoints && options.requestMode !== 'oncue') {
            throw new Error('useMediaCuePoints must be used with requestMode ' + '`oncue` rather than the currently set `' + options.requestMode + '`');
          }

          // Reveal the content and poster in autoplay
          this.on(['playing'], function (e) {
            _this.removeClass('vjs-ima3-not-playing-yet');
            // Used to be this.poster(null) but that was trigging an error in Chrome 51
            // that would cause HLS to stop requesting segments.
            _this.tech_.el_.removeAttribute('poster');
          });

          // deprecation warning for prerollTimeout and postrollTimeout
          // both are replaced with a single timeout setting
          if (settings.prerollTimeout) {
            // use contribAdsPrerollTimeout if backdoor access is necessary only
            _videoJs2['default'].log.warn('The prerollTimeout option is deprecated and will be removed, ' + 'please use the timeout option. The prerollTimeout will be set to ' + 'the value of the timeout option.');
            settings.prerollTimeout = undefined;
          }
          if (settings.postrollTimeout) {
            // use contribAdsPostrollTimeout if backdoor access is necessary only
            _videoJs2['default'].log.warn('The postrollTimeout option is deprecated and will be removed, ' + 'please use the timeout option. The postrollTimeout will be set to ' + 'the value of the timeout option.');
            settings.postrollTimeout = undefined;
          }

          // timeout should set contrib-ads's prerollTimeout and postrollTimeout
          if (settings.timeout) {
            settings.prerollTimeout = settings.postrollTimeout = settings.timeout;
          }
          // allows a backdoor to contrib-ads' timeout settings
          if (settings.contribAdsPrerollTimeout) {
            settings.prerollTimeout = settings.contribAdsPrerollTimeout;
          }
          if (settings.contribAdsPostrollTimeout) {
            settings.postrollTimeout = settings.contribAdsPostrollTimeout;
          }

          // Add class for autoplay so we can use correct content-flash-hiding strategy
          if (this.autoplay() && !_videoJs2['default'].browser.IS_IOS && !_videoJs2['default'].browser.IS_ANDROID) {
            this.addClass('vjs-ima3-autoplay');
          }

          // autoplay and requestMode=onplay are incompatible, so don't allow that configuration
          // it makes no difference to the user
          if (settings.requestMode === 'onplay' && this.autoplay()) {
            settings.requestMode = 'onload';
          }

          // if no overrides were specified, use the regular control bar options
          if (!('adControlBar' in settings)) {
            var vertical = true;
            // We check this way so that the code works for both Luna and Graphite. It would
            // be nice if there was a cleaner way to check this.
            var controlBar = this.getChild('controlBar');

            if (controlBar && controlBar.getChild('volumeMenuButton')) {
              vertical = controlBar.getChild('volumeMenuButton').options_.vertical;
            }
            settings.adControlBar = extend({}, this.options_.children.controlBar, {
              name: 'adControlBar',
              volumeMenuButton: {
                vertical: vertical
              }
            });
          }
          // Adding the Brightcove Universal Events here
          settings.eventMap = {
            'ima3-click': 'ads-click',
            'ima3-started': 'ads-ad-started',
            'ima3-complete': 'ads-ad-ended',
            'ima3-first-quartile': 'ads-first-quartile',
            'ima3-midpoint': 'ads-midpoint',
            'ima3-third-quartile': 'ads-third-quartile',
            'ima3-volume-changed': 'ads-volumechange',
            'ima3-paused': 'ads-pause',
            'ima3-resumed': 'ads-play',
            'ima3-all-ads-completed': 'ads-allpods-completed',
            'ads-request': 'ads-request',
            'ads-pod-ended': 'ads-pod-ended',
            'ads-pod-started': 'ads-pod-started',
            'ads-load': 'ads-load'
          };
          // Use the option below to get the debugging results, leaving the line below as a
          // comment. Uncomment for usage.
          // settings.debug=true;

          // initialize the ad framework
          this.ads(settings);

          // Setting up the adinfo object here
          this.ads.ad = {};

          // Setting up the adpodinfo object here
          this.ads.pod = {
            id: undefined,
            size: undefined
          };

          // If request mode is 'oncue', handle cuechange events to request ads dynamically
          if (settings.requestMode === 'oncue') {
            this.on('loadstart', function () {
              var cueTextTracks = _this.ads.cueTextTracks;
              var prerollPlayed = false;
              var postrollPlayed = false;
              var usedActiveCues = {};

              var onCueChangeHandler = function onCueChangeHandler(player) {
                return function () {
                  var activeCues = this.activeCues;

                  // Don't process cuechange event if we are scrubbing
                  if (player.scrubbing()) {
                    return;
                  }

                  // Makes an IMA ad request based on the cueData and startTime
                  var processCue = function processCue(playerRef, cueData, cueId, startTime) {
                    var serverUrl = undefined;

                    // Play the ad when the plugin is ready
                    var requestAdOnCue = function requestAdOnCue() {
                      // Remove play listener on first request
                      playerRef.off('play', requestAdOnCue);
                      // Remove ended listener when requesting postroll
                      playerRef.off('contentended', requestAdOnCue);

                      // Get ad server URL
                      if (!playerRef.ima3.settings.useMediaCuePoints && cueData.serverUrl) {
                        serverUrl = cueData.serverUrl;
                      } else {
                        serverUrl = playerRef.ima3.settings.serverUrl;
                      }
                      serverUrl = playerRef.ima3.adMacroReplacement(serverUrl);
                      if (cueData.duration) {
                        if (/\?/.test(serverUrl)) {
                          serverUrl += '&breaklength=' + cueData.duration;
                        } else {
                          serverUrl += '?breaklength=' + cueData.duration;
                        }
                      }

                      // Don't request a preroll ad twice
                      if (startTime === 0) {
                        if (!prerollPlayed) {
                          prerollPlayed = true;

                          // Work around until prerolls are really prerolls
                          playerRef.ads.adType = 'preroll';
                        } else {
                          return;
                        }
                      }

                      // Don't request a postroll ad twice
                      if (Math.abs(startTime - playerRef.duration()) < 1) {
                        if (!postrollPlayed) {
                          postrollPlayed = true;
                        } else {
                          return;
                        }
                      }

                      // Only request an ad if the cue startTime
                      // is comparable to the currentTime
                      // They can be different on slower platforms(e.g Android)
                      // after scrubbing past other cue points
                      if (Math.abs(startTime - playerRef.currentTime()) > 1) {
                        return;
                      }

                      _videoJs2['default'].log('Oncue ad request at ' + startTime + ' seconds');
                      playerRef.ima3.adrequest(serverUrl);
                    };

                    // Don't make a 'preroll' ad request until we are playing
                    if (startTime === 0 && !prerollPlayed && playerRef.paused()) {
                      playerRef.one('play', requestAdOnCue);
                      return;
                    }

                    // If a cue is within a second of the duration,
                    // consider it a postroll and request ads after content ended
                    if (Math.abs(startTime - playerRef.duration()) < 1) {
                      playerRef.one('contentended', requestAdOnCue);
                      return;
                    }

                    // Remove play listener if not a preroll
                    playerRef.off('play', requestAdOnCue);
                    // Remove ended listener if not a postroll
                    playerRef.off('contentended', requestAdOnCue);

                    if (playerRef.ima3.adrequest) {
                      requestAdOnCue();
                    } else {
                      playerRef.on('ima3-ready', requestAdOnCue);
                    }
                  };

                  // Live ad cancellation based on an 'adCancel' cue
                  var cancelAds = function cancelAds(playerRef, cueData, startTime) {
                    if (!playerRef.ima3.settings.useMediaCuePoints && cueData.name === 'adCancel' && playerRef.ima3.adsManager) {
                      playerRef.ima3.adsManager.stop();
                      _videoJs2['default'].log('Cancelling ads at ' + startTime + ' seconds');
                    }
                  };

                  // Process only the most recent active cue
                  if (activeCues.length > 0) {
                    var cues = new Array(activeCues[activeCues.length - 1]);
                    var cueId = cueTextTracks.getCueId(player, cues[0]);

                    if (!cueId && cueTextTracks.getSupportedAdCue(player, cues[0]) !== -1) {
                      _videoJs2['default'].log.error('The cue does not have an ID and cannot be used', cues[0]);
                      return;
                    }

                    if (!usedActiveCues[cueId]) {
                      cueTextTracks.processAdTrack(player, cues, processCue, cancelAds);
                      usedActiveCues[cueId] = true;
                    }
                  }
                };
              };

              // Process tracks when a 'cuechange' event is observed
              var processMetadataTrack = function processMetadataTrack(player, track) {
                var cues = track.cues;
                var postrollCue = undefined;

                // Check if there is a cue that can be considered a postroll
                for (var i = 0; i < cues.length; i++) {
                  // cache is not populated yet so use catalog duration
                  if (cues[i].startTime === player.mediainfo.duration) {
                    postrollCue = cues[i];
                  }
                }

                if (!postrollCue) {
                  player.trigger('nopostroll');

                  // This is a workaround for a strange case in contrib-ads
                  // where a snapshot is taken even though nopostroll has
                  // been triggered, and is not restored.
                  // This can be removed if this is merged:
                  // https://github.com/videojs/videojs-contrib-ads/pull/232
                  player.one('ended', function () {
                    track.mode = 'hidden';
                  });
                }

                track.addEventListener('cuechange', onCueChangeHandler(player));
              };

              cueTextTracks.setMetadataTrackMode = function (track) {
                // Make sure track is 'hidden' rather than 'disabled' as it may have already
                // existed and had been 'disabled' during a playlist change
                track.mode = 'hidden';
              };

              cueTextTracks.getCueId = function (player, cue) {
                var cueData = cueTextTracks.getSupportedAdCue(player, cue);

                return player.ima3.settings.useMediaCuePoints ? cue.originalCuePoint.id : cueData.id;
              };

              // Both ID3 and mediaCuePoints are supported
              cueTextTracks.getSupportedAdCue = function (player, cue) {
                var cueData = undefined;

                // ID3 track
                if (cue && cue.value && cue.value.key === 'TXXX') {
                  // parse the cue to get the duration of ad requested and/or serverUrl.
                  try {
                    cueData = JSON.parse(cue.value.data);
                  } catch (e) {
                    _videoJs2['default'].log.error('ERROR: Parsing JSON. Please confirm that JSON is valid.', e.message);
                    return;
                  }

                  if (cueData.name && (cueData.name.toLowerCase() === 'adcue' || cueData.name.toLowerCase() === 'adcancel')) {
                    return cueData;
                  }

                  return -1;

                  // Ad cue point track
                  // A VTTCue wrapper is created around the original cuepoint
                  // which has an unique id, whereas the wrapper does not
                } else if (player.ima3.settings.useMediaCuePoints && player.ima3.settings.requestMode === 'oncue' && cue.originalCuePoint && cue.text && cue.text.toLowerCase() === 'ad') {
                  return cue;
                }

                return -1;
              };

              // Don't make oncue requests if there are no ready adTechs
              if (adTechInitialized) {
                // Process all textTracks
                cueTextTracks.processMetadataTracks(_this, processMetadataTrack);
              }
            });
          }

          // In ondemand or oncue mode, tell player ads are ready so it doesn't wait.
          // That would create an unneeded delay and an extra timeout event.
          if (settings.requestMode === 'ondemand' || settings.requestMode === 'oncue') {
            this.trigger('nopreroll');

            // We don't expect postrolls in ondemand
            if (settings.requestMode === 'ondemand') {
              this.trigger('nopostroll');
            }

            this.trigger('adsready');

            this.on('contentupdate', function () {
              _this.trigger('adsready');
            });
          }

          this.on('ima3-ready', function () {
            this.ima3.isReady_ = true;

            // restore contextmenu options
            if (this.contextmenu) {
              this.contextmenu.options.disabled = this.ima3.contextMenuPreviouslyDisabled;
            }
            // remove class
            this.removeClass('vjs-ima3-right-click');

            for (var i = 0; i < this.ima3.readyQueue_.length; i++) {
              this.ima3.readyQueue_[i].call(this);
            }
            // Reset Ready Queue
            this.ima3.readyQueue_ = [];
          });
          this.on('ads-ad-started', function () {
            // the volume that ima3 needs to sync to
            this.ima3.volume = this.volume();

            // persist volume and muted from content to ads
            if (this.muted()) {
              this.ima3.adPlayer.muted(true);
            } else {
              this.ima3.adPlayer.volume(this.volume() || this.ads.preAdVolume_);
            }

            // This'll update the duration display
            this.ima3.adPlayer.trigger('durationchange');
          });
          this.on('ads-ad-ended', function () {
            // persist volume and muted from ads to content
            this.volume(this.ima3.adPlayer.volume());
            // for live content, overwrite contrib-ads preAdVolume_
            // to match the actual ad volume for persistence
            if (this.ads.preAdVolume_) {
              this.ads.preAdVolume_ = this.volume();
            }
            this.muted(this.ima3.adPlayer.muted());
          });

          // replace the ima3 initializer with the namespace
          this.ima3 = {
            readyQueue_: [],
            isReady_: false,
            player: this,
            tech: tech,
            settings: settings,
            ready: function ready(fn) {
              if (fn) {
                if (_this.ima3.isReady_) {
                  fn.call(_this);
                } else {
                  if (_this.ima3.readyQueue_ === undefined) {
                    _this.ima3.readyQueue_ = [];
                  }
                  _this.ima3.readyQueue_.push(fn);
                }
              }
              return _this.ima3;
            },
            makeAdRequestFunction: function makeAdRequestFunction(techAdRequestFn) {
              var _this2 = this;

              return function (adTagUrl) {
                var serverUrl = adTagUrl || _this2.settings.serverUrl;

                if (_this2.player.mediainfo && _this2.player.mediainfo.economics === 'FREE') {
                  _videoJs2['default'].log('On demand adRequest attempted on video with advertising ' + 'disabled.');
                  return;
                }
                if (!serverUrl) {
                  _videoJs2['default'].log('On demand adRequest attempted without an adTagUrl!');
                  return;
                }
                _videoJs2['default'].log('Clearing any previous VAST ad data and triggering ondemand ' + 'adrequest.');
                techAdRequestFn.call(_this2, serverUrl);
              };
            },
            adMacroReplacement: function adMacroReplacement(url) {
              var customMacros = {};

              if (_this.bcAnalytics) {
                customMacros['{player.url}'] = _globalWindow2['default'].location.protocol + '//' + _this.bcAnalytics.settings.player;
              }
              return _this.ads.adMacroReplacement(url, true, customMacros);
            },

            // Insert the ad container behind player controls but in front of things that
            // might interfere with clickthroughs.
            insertAdContainer: function insertAdContainer(adContainer) {
              var bigPlayButtonElement = _this.el().querySelector('.vjs-big-play-button');

              _this.el().insertBefore(adContainer, bigPlayButtonElement);
            },

            // This is to be used by internal analytics only
            currentAdEventInfo: {},
            // Expand currentAdEventInfo to include interesting ad data,
            // initializes an empty array value if necessary
            addToCurrentAdEventInfo: function addToCurrentAdEventInfo(attr, value) {
              if (value === '') {
                return;
              }

              if (!this.currentAdEventInfo[attr]) {
                this.currentAdEventInfo[attr] = [value];
              } else {
                this.currentAdEventInfo[attr].push(value);
              }
            },

            version: '2.17.0',
            VERSION: '2.17.0'
          };

          // Translate events between the content player and the ad player
          this.on('adstart', function (event) {
            // Pause the content player so it doesn't play in the background (unless live)
            if (_this.duration() !== Infinity) {
              _this.pause();
            }
            // call player.hasStarted to make sure that BPB isn't showing and the
            // `vjs-has-started` is included
            _this.hasStarted(true);
            // reset currentAdEventInfo as we enter a new ad break
            _this.ima3.currentAdEventInfo = {};
          });
          this.on('adend', function () {
            // If live, let player know content is playing, even though it technically
            // never stopped. This gets us back into content-playback state.
            if (_this.duration() === Infinity) {
              _this.trigger('playing');
            }
          });

          // If the tech is not being re-used for ad playback, prevent the
          // content video from playing. Autoplay, for instance, can trigger
          // asynchronous play attempts that lead the content video to play
          // during linear ad mode.
          // see https://github.com/videojs/video.js/issues/1413
          this.on('adplay', function () {
            var srcChanged = _this.src() !== _this.ads.snapshot.src || _this.currentSrc() !== _this.ads.snapshot.currentSrc;

            if (!srcChanged) {
              // calling pause() in a play event handler sends iOS 6 into a
              // play/pause loop so cancel the play asynchronously
              setTimeout(function () {
                _this.pause();
              }, 0);
            }
          });

          // initialize the appropriate ad tech
          for (var i = 0; i < adTechOrder.length; i++) {
            adTech = adTechOrder[i].charAt(0).toUpperCase() + adTechOrder[i].substring(1).toLowerCase();

            if (_videoJs2['default'].getComponent(adTech).isSupported()) {
              // invoke the ad tech initializer
              _videoJs2['default'].ima3[adTech].call(this, settings);
              this.addClass('vjs-ima3-' + adTech.toLowerCase());

              // add loading spinner class
              if (settings.loadingSpinner) {
                this.addClass('ima3-loading-spinner');
              }
              adTechInitialized = true;
              break;
            }
          }

          // report an error if no ad tech could be loaded
          if (!adTechInitialized) {
            _videoJs2['default'].log('No supported ad tech available. If you have removed one of the ' + 'default ad techs, you may want to consider adding it back in.');
            return;
          }
        };

        /**
         * A minimalist player to wrap interactions with the ad player managed by IMA3.
         * This player is then specialized by the particular IMA3 integration in use to
         * provide ad controls and proxy information between the ad and content players.
         */
        _videoJs2['default'].ima3.AdPlayer = _videoJs2['default'].extend(_videoJs2['default'].getComponent('Component'), {
          constructor: function constructor() {

            // Pass `this` as the first argument to the Component constructor because
            // we want this object to be treated as a player.
            var args = [this].concat(Array.prototype.slice.call(arguments));

            _videoJs2['default'].getComponent('Component').apply(this, args);
          },
          buffered: function buffered() {
            return [];
          },
          language: function language(code) {
            if (code === undefined) {
              return this.options_.contentPlayer.language_;
            }
            return this.options_.contentPlayer.language(code);
          },
          languages: function languages() {
            return this.options_.contentPlayer.languages();
          },
          localize: function localize(string) {
            return this.options_.contentPlayer.localize(string);
          },
          remainingTime: function remainingTime() {
            return this.duration() - this.currentTime();
          },
          exitFullscreen: function exitFullscreen() {
            return this.options_.contentPlayer.exitFullscreen();
          },
          reportUserActivity: function reportUserActivity() {},
          requestFullscreen: function requestFullscreen() {
            return this.options_.contentPlayer.requestFullscreen();
          },
          textTracks: function textTracks() {},
          remoteTextTracks: function remoteTextTracks() {},
          addTextTrack: function addTextTrack() {},
          addRemoteTextTrack: function addRemoteTextTrack() {},
          removeRemoteTextTrack: function removeRemoteTextTrack() {},
          scrubbing: function scrubbing() {}
        });

        // register plugin
        _videoJs2['default'].plugin('ima3', ima3);'use strict';

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        var _videoJs = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _videoJs2 = _interopRequireDefault(_videoJs);

        var _globalWindow = require('global/window');

        var _globalWindow2 = _interopRequireDefault(_globalWindow);

        var _globalDocument = require('global/document');

        var _globalDocument2 = _interopRequireDefault(_globalDocument);

        /**
         * The JavaScript portion of the IMA3 Flash SDK integration. This object is
         * responsible for proxying data back and forth with the integration SWF and
         * displaying it properly during the playback lifecyle.
         */

        // createPath(path)
        //   Makes a JavaScript path valid by creating any needed objects.
        // EXAMPLE:
        //   createPath('google.ima.ImaSdkSettings');
        // BEFORE:
        //   // google === [Existing Object]
        //   // google.ima === undefined
        //   // google.ima.ImaSdkSettings === [Exception Thrown]
        // AFTER:
        //   // google === [Existing Object]
        //   // google.ima === {ImaSdkSettings: {}}
        //   // google.ima.ImaSdkSettings === {}
        var createPath = function createPath(path) {
          var paths = path.split('.');
          var lastObject = _globalWindow2['default'];

          // Loop over identifiers in the path
          for (var i = 0; i < paths.length; i++) {

            // Create object if it doesn't exist
            if (!lastObject[paths[i]]) {
              lastObject[paths[i]] = {};
            }

            // Keep track of the most recent object
            lastObject = lastObject[paths[i]];
          }
        };

        // The IMA3 Flash integration initializer.
        _videoJs2['default'].ima3.Flash = function (options) {
          var _this = this;

          var div = _globalDocument2['default'].createElement('div');
          var params = '<param name="flashvars" value="playerId=' + this.el().id + '&debug=' + this.ima3.settings.debug + '">' + '<param name="wmode" value="transparent">' + '<param name="AllowScriptAccess" value="always">';
          var id = this.el().id + '-ima3-flash';
          var ControlBar = _videoJs2['default'].getComponent('ControlBar');
          var object = undefined;
          var interval = undefined;
          var hardTimeoutDelayed = undefined;
          var hardTimeoutExpired = undefined;

          var prefixRelativeProtocol = function prefixRelativeProtocol(url) {
            if (url && !/^https?:|file:/.test(url)) {
              return _globalWindow2['default'].location.protocol + url;
            }
            return url;
          };

          var postrollAdtimeoutHandler = function postrollAdtimeoutHandler() {
            object.vjs_postrolltimeout();
            _this.trigger('ad-hard-timeout');
            _videoJs2['default'].log('ima3-hard-timeout');
          };

          // Resuable Function below to reset the ad meta data
          var resetAdMetaData = function resetAdMetaData() {
            _this.ads.ad = {};
            _this.ads.pod = {};
          };

          // Handle on-demand ad requests (i.e. from id3 metadata)
          var adRequest = function adRequest(adTag) {
            _this.ima3.ready(function () {
              resetAdMetaData();
              object.vjs_trigger({
                type: 'adrequest',
                adTag: this.ima3.adMacroReplacement(prefixRelativeProtocol(adTag)),
                currentTime: this.currentTime(),
                options: {}
              });
            });
          };

          this.ima3.adTech = 'flash';

          // Create deprecated vjs-global version of adrequest
          _videoJs2['default'].ima3.Flash.adrequest = function () {
            _videoJs2['default'].log.warn('videojs.ima3.Flash.adrequest is deprecated. ' + 'Use player.ima3.adrequest instead.');
            return adRequest.apply(this, arguments);
          };

          // Create player-local adrequest function
          this.ima3.adrequest = this.ima3.makeAdRequestFunction(adRequest);

          options.serverUrl = prefixRelativeProtocol(options.serverUrl);

          div.className = 'vjs-ima3-ad-container vjs-ima3-ad-background';

          // Create a cross-browser friendly SWF embed
          div.innerHTML = '<!--[if !IE]>-->' + '<object width="100%" height="100%" type="application/x-shockwave-flash" data="' + options.adSwf + '">' + params + '</object>' + '<!--<![endif]-->';

          object = div.querySelector('object');
          if (!object) {
            // Build an embed for IE<10
            div.innerHTML = '<object width="100%" height="100%" ' + 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' + '  <param name="movie" value="' + options.adSwf + '">' + params + '</object>';
            object = div.querySelector('object');
          }
          object.id = id;
          object.name = id;
          object.className = 'vjs-ima3-flash-ad-container';

          createPath('google.ima.ImaSdkSettings');
          createPath('google.ima.AdsManager');
          createPath('google.ima.AdsLoader');

          _globalWindow2['default'].google.ima.ImaSdkSettings.setAutoPlayAdBreaks = function (autoplayAdBreaks) {
            object.vjs_autoplayadbreaks(autoplayAdBreaks);
          };

          _globalWindow2['default'].google.ima.AdsManager.getRemainingTime = function () {
            return object.vjs_getRemainingTime();
          };

          _globalWindow2['default'].google.ima.AdsManager.destroy = function () {
            return object.vjs_destroyAdsManager();
          };

          _globalWindow2['default'].google.ima.AdsManager.stop = function () {
            return object.vjs_stopAdsManager();
          };

          _globalWindow2['default'].google.ima.AdsLoader.contentComplete = function () {
            return object.vjs_contentComplete();
          };

          if (this.contextmenu) {
            this.ima3.contextMenuPreviouslyDisabled = this.contextmenu.options.disabled;
            this.contextmenu.options.disabled = true;
          }
          this.addClass('vjs-ima3-right-click');

          this.ima3.insertAdContainer(div);

          // Create the custom ads controls
          var adPlayer = _videoJs2['default'].ima3.Flash.adPlayer(object, {
            contentPlayer: this
          });

          var adControlBar = new ControlBar(adPlayer, options.adControlBar);

          adControlBar.addClass('vjs-ad-control-bar');
          this.addClass('vjs-ad-controls');
          this.addChild(adControlBar);

          // Nulling out the values for the ad and pod object
          this.on(['contentupdate', 'adend', 'ima3-ready'], function () {
            resetAdMetaData();
          });

          // Destroy any AdsManager on adscanceled
          this.on('adscanceled', function () {
            if (object.vjs_destroyAdsManager) {
              object.vjs_destroyAdsManager();
            }
          });

          // destroy any AdsManager on adserror
          this.on('adserror', function () {
            this.removeClass('ima3-ad-loading');
            if (object.vjs_destroyAdsManager) {
              object.vjs_destroyAdsManager();
            }
          });

          var userActionOnFlashPlugin = function userActionOnFlashPlugin() {
            if (object.style.display === 'none') {
              // restore contextmenu options
              if (_this.contextmenu) {
                _this.contextmenu.options.disabled = _this.ima3.contextMenuPreviouslyDisabled;
              }
              // remove class
              _this.removeClass('vjs-ima3-right-click');
              // if object display is none,
              // then user chose to hide the plugin and continue with normal playback
              _this.trigger('adtimeout');
              // there is no one adding the object back, stop attempts to communicate
              _globalWindow2['default'].clearInterval(interval);
            }

            if (_this.ima3.settings.hardTimeouts && _this.ads.adTimeoutTimeout && !hardTimeoutDelayed) {
              // cancel ad timeout action untill user takes any action to run/hide flash plugin
              _globalWindow2['default'].clearTimeout(_this.ads.adTimeoutTimeout);
              // initiate a delay for hardtimeout
              hardTimeoutDelayed = true;
              // determine when the original adTimeoutTimeout is running out
              _globalWindow2['default'].setTimeout(function () {
                hardTimeoutExpired = true;
              }, _this.ima3.settings.timeout);
            }
          };

          // Trigger contentupdate once the swf is ready
          interval = _globalWindow2['default'].setInterval(function () {

            // workaround when flash plugin requires user action to run or hide
            userActionOnFlashPlugin();

            var forwardEvent = function forwardEvent(event) {
              object.vjs_trigger({
                type: event.type,
                // Send along options with each forwarded event to keep the
                // swf up to date with the current settings
                options: {
                  serverUrl: _this.ima3.adMacroReplacement(_this.ima3.settings.serverUrl)
                }
              });
            };

            if (object.vjs_trigger) {
              _this.trigger('ima3-ready');
              _globalWindow2['default'].clearInterval(interval);

              // check if adtimeout was supposed to trigger before ima3 was ready,
              // and take action now
              if (hardTimeoutExpired) {
                _this.trigger('adtimeout');
              }

              // pass along ad-related events
              _this.on('readyforpreroll', function (event) {
                var settings = _this.ima3.settings;

                if (settings.requestMode !== 'ondemand' && settings.requestMode !== 'oncue') {
                  forwardEvent(event);
                }
              });

              // only forward ended events that are from content
              _this.on('contentended', function (event) {
                if (this.ads.state === 'postroll?') {
                  this.one('adtimeout', postrollAdtimeoutHandler);
                  event.type = 'ended';
                  forwardEvent(event);
                }
              });

              _this.on(['contentupdate', 'dispose'], function () {
                _this.off('adtimeout', postrollAdtimeoutHandler);
              });

              // Forward timeupdate events with the currentTime
              _this.on('timeupdate', function (event) {
                object.vjs_trigger({
                  type: event.type,
                  currentTime: _this.currentTime()
                });
              });

              // Only forward contentupdate events if the src has changed since
              // the last time we sent one to the swf.
              _this.on('contentupdate', function (event) {
                var currentSrc = _this.currentSrc();

                // Resetting the ad and ad pod object
                resetAdMetaData();

                // No ads on videos with economics = FREE
                if (_this.mediainfo && _this.mediainfo.economics === 'FREE') {
                  _this.trigger('adscanceled');
                  _this.trigger('nopreroll');
                  _this.trigger('nopostroll');
                  return;
                }

                if (_this.ima3.currentSrc !== currentSrc) {
                  _this.ima3.currentSrc = currentSrc;

                  if (options.requestMode === 'onplay') {
                    if (!_this.paused()) {
                      // Account for the case where player is already playing,
                      // and requestMode is expected `onplay`
                      forwardEvent({ type: 'contentupdate' });
                    } else {
                      _this.one('play', function (e) {
                        // This calls vjs_trigger contentupdate which then calls AdsLoader to
                        // request ads
                        forwardEvent({ type: 'contentupdate' });
                      });
                    }
                  } else if (options.requestMode === 'onload') {
                    forwardEvent(event);
                  }
                }
              });

              // If there is a src set when the plugin initialized, immediately
              // trigger a contentupdate event to get the ads for it. Otherwise,
              // the `contentupdate` handler above will take care of it once it is
              // detected by contrib-ads.
              _this.ready(function () {
                var currentSrc = _this.currentSrc();

                _this.ads.ad = {};
                _this.ads.pod = {};

                if (currentSrc && _this.ima3.currentSrc !== currentSrc) {
                  _this.ima3.currentSrc = currentSrc;

                  // No ads on videos with economics = FREE
                  if (_this.mediainfo && _this.mediainfo.economics === 'FREE') {
                    _this.trigger('adscanceled');
                    _this.trigger('nopreroll');
                    _this.trigger('nopostroll');
                    return;
                  }

                  if (options.requestMode === 'onplay') {
                    _this.one('play', function () {
                      // This calls vjs_trigger contentupdate which then calls AdsLoader to
                      // request ads
                      forwardEvent({ type: 'contentupdate' });
                    });
                  } else if (options.requestMode === 'onload') {
                    forwardEvent({ type: 'contentupdate' });
                  }
                }
              });
              _this.on('debug', function (event) {
                object.vjs_trigger({
                  type: event.type,
                  enable: event.enable
                });
              });
            }
          }, 50);

          // export IMA3 objects
          this.ima3.adControlBar = adControlBar;
          this.ima3.adPlayer = adPlayer;
          this.ima3.el = object;
          this.ima3._object = object;
          this.ima3.adsManager = _globalWindow2['default'].google.ima.AdsManager;
          this.ima3.adsLoader = _globalWindow2['default'].google.ima.AdsLoader;
        };

        // Returns an AdPlayer decorated to proxy calls back and forth with the SWF.
        _videoJs2['default'].ima3.Flash.adPlayer = function (elem, options) {
          var contentPlayer = options.contentPlayer;
          var adPlayer = new _videoJs2['default'].ima3.AdPlayer(options);
          var oneHandlers = [];

          // Same as contentPlayer.one, except event is cancelled if there is a content update.
          var unlessContentUpdate = function unlessContentUpdate(type, handler) {
            oneHandlers.push({ type: type, handler: handler });
            contentPlayer.one(type, handler);
          };

          var cancelVmapAd = function cancelVmapAd(event) {
            // Cancel the VMAP Ad
            contentPlayer.ima3._object.vjs_cancelNextAd();
            contentPlayer.ima3._object.vjs_stopAdsManager();

            if (contentPlayer.ads.state === 'ad-playback') {
              contentPlayer.trigger('adend');
            }
          };

          // Play no ads if attempting to use media cue points
          // and oncue requestMode with VMAP ads
          contentPlayer.on('ima3-ads-manager-loaded', function (event) {
            var settings = contentPlayer.ima3.settings;
            var cuePoints = contentPlayer.ima3._object.vjs_getCuePoints();
            var isVmap = cuePoints && cuePoints.length > 0;

            if (settings.useMediaCuePoints && settings.requestMode === 'oncue' && isVmap) {
              cancelVmapAd(event);
              _videoJs2['default'].log.error('Cancelling VMAP ad because useMediaCuePoints must ' + 'be used with VAST');
            }
          });

          contentPlayer.on('contentupdate', function () {
            for (var i = 0; i < oneHandlers.length; i++) {
              var handler = oneHandlers[i];

              contentPlayer.off(handler.type, handler.handler);
            }
            oneHandlers = [];
          });

          // Return a function that invokes the method with the specified name on
          // the player object. If the method is not present, the fallback value is
          // returned.
          var proxyCall = function proxyCall(name, fallback) {
            return function () {
              var method = 'vjs_' + name;

              if (elem[method]) {
                return elem[method].apply(elem, Array.prototype.slice.call(arguments));
              }
              return fallback;
            };
          };
          var proxyDuration = proxyCall('duration', -1);
          var proxyCurrentTime = proxyCall('currentTime');
          var proxyPause = proxyCall('pause');
          var proxyPlay = proxyCall('play');
          var proxyVolume = proxyCall('volume', 1);

          // Using ExternalInterface can be expensive so we estimate our current
          // playhead position here in javascript and then sync back up with the
          // SWF less frequently
          (function () {
            var running = false;
            var updateInterval = 250;
            var typeMap = {
              '0': 'PREROLL',
              '-1': 'POSTROLL'
            };

            var updateCurrentTime = function updateCurrentTime() {

              // No progress when paused
              if (adPlayer.paused()) {
                return;
              }

              // No progress between ads
              var progressEl = _globalDocument2['default'].querySelector('.vjs-ima3-flash .vjs-ad-control-bar .vjs-play-progress');

              if (progressEl.className.match('vjs-play-progress-resetting')) {
                return;
              }

              adPlayer.trigger('timeupdate');
            };

            var runUpdate = function runUpdate() {
              if (running) {
                updateCurrentTime();
                _globalWindow2['default'].setTimeout(runUpdate, updateInterval);
              }
            };

            var fillCurrentAdInfo = function fillCurrentAdInfo(currentAd) {
              if (currentAd === undefined) {
                return;
              }
              var plugin = contentPlayer.ima3;

              // These are the same across ads in an ad pod
              plugin.currentAdEventInfo.adPodId = contentPlayer.ads.pod.id;
              plugin.currentAdEventInfo.adPodLength = contentPlayer.ads.pod.size;
              plugin.currentAdEventInfo.adType = contentPlayer.ads.adType;

              // These may be different across ads in an ad pod,
              plugin.addToCurrentAdEventInfo('adId', contentPlayer.ads.ad.id);
              plugin.addToCurrentAdEventInfo('creativeLength', contentPlayer.ads.ad.duration);
              plugin.addToCurrentAdEventInfo('creativeIndex', contentPlayer.ads.ad.index);
              plugin.addToCurrentAdEventInfo('adIsciId', currentAd.isci);
              plugin.addToCurrentAdEventInfo('creativeFormat', currentAd.contentType);
              plugin.addToCurrentAdEventInfo('creativeUrl', currentAd.mediaUrl);
              plugin.addToCurrentAdEventInfo('surveyUrl', currentAd.surveyUrl);
              plugin.addToCurrentAdEventInfo('adTitle', currentAd.title);
              plugin.addToCurrentAdEventInfo('wrapperCreativeIds', currentAd.wrapperAdIds);
              plugin.addToCurrentAdEventInfo('adSystem', currentAd.adSystem);
              plugin.addToCurrentAdEventInfo('wrapperAdSystems', currentAd.wrapperAdSystems);
            };

            // Function to populate the ad metadata into the contrib-ad BC object
            var adInfo = function adInfo(eventObject) {
              var originalType = eventObject.type;
              var contribAdsType = contentPlayer.ima3.settings.eventMap[originalType];

              // Ad data below
              if (contentPlayer.ima3.currentAd !== undefined) {
                contentPlayer.ads.ad.id = contentPlayer.ima3.currentAd.id;
                contentPlayer.ads.ad.duration = contentPlayer.ima3.currentAd.duration;
                // Contrib Ads defines it 0 based but IMA gives us value which starts at 1
                // instead of 0
                contentPlayer.ads.ad.index = contentPlayer.ima3.currentAd.adPodInfo.adPosition - 1;
                contentPlayer.ads.ad.type = typeMap[contentPlayer.ima3.currentAd.adPodInfo.timeOffset] || 'MIDROLL';
                // Ad Pod data below
                contentPlayer.ads.pod.id = contentPlayer.ima3.currentAd.adPodInfo.podIndex;
                contentPlayer.ads.pod.size = contentPlayer.ima3.currentAd.adPodInfo.totalAds;

                // Making this info available to the analytics plugin
                if (originalType === 'ima3-started') {
                  fillCurrentAdInfo(contentPlayer.ima3.currentAd);
                  contentPlayer.ima3.addToCurrentAdEventInfo('started', contentPlayer.ads.ad.index);
                } else if (originalType === 'ima3-complete') {
                  contentPlayer.ima3.addToCurrentAdEventInfo('completed', contentPlayer.ads.ad.index);
                }
              }

              // Triggering the event or translated BC contrib-ad-event here
              eventObject.type = contribAdsType ? contribAdsType : originalType;
              contentPlayer.trigger(eventObject);
            };

            adPlayer.on('play', function () {
              contentPlayer.removeClass('vjs-ima3-paused');
              running = true;
              _globalWindow2['default'].setTimeout(runUpdate, updateInterval);
            });

            adPlayer.on('pause', function () {
              contentPlayer.addClass('vjs-ima3-paused');
              running = false;
            });

            adPlayer.on('ima3-started', function (event) {
              _videoJs2['default'].log('ima3-started');

              adInfo(event);

              // Re-enable smooth progress bar movement
              var progressEl = _globalDocument2['default'].querySelector('.vjs-ima3-flash .vjs-ad-control-bar .vjs-play-progress');

              progressEl.className = progressEl.className.replace(' vjs-play-progress-resetting', '');
            });

            adPlayer.on('ima3-complete', function (event) {
              _videoJs2['default'].log('ima3-complete');

              // Disable smooth progress bar movement between ads
              var progressEl = _globalDocument2['default'].querySelector('.vjs-ima3-flash .vjs-ad-control-bar .vjs-play-progress');

              progressEl.className += ' vjs-play-progress-resetting';
              progressEl.style.width = '0';
            });

            // The type parameter determines what type of ad it is time to timeout. If it's not
            // that type of ad, this function does nothing.
            var hardTimeout = function hardTimeout(type) {
              var cuePoints = contentPlayer.ima3._object.vjs_getCuePoints();
              var isVast = cuePoints && cuePoints.length === 0;
              var hasPreroll = cuePoints && cuePoints.indexOf(0) === 0;

              if (type === 'VAST' && isVast) {

                // Cancel a VAST ad (an ad that does not use VMAP)
                // With VAST there is just one ad and it's a preroll, so we can simply
                // destroy the ads manager if we're not going to play it.
                contentPlayer.ima3._object.vjs_destroyAdsManager();
                contentPlayer.trigger('ad-hard-timeout');
                _videoJs2['default'].log('ima3-hard-timeout');
              } else if (type === 'VMAP' && hasPreroll) {

                // Cancel an ad that uses VMAP
                // With VMAP we are going to use cancelNextAd so we can decline the ad the next
                // time the adBreakReadyHandler is called.
                contentPlayer.ima3._object.vjs_cancelNextAd();
                contentPlayer.trigger('ad-hard-timeout');
                _videoJs2['default'].log('ima3-hard-timeout');
              }
            };

            // If hardTimeouts are enabled, discard ads on adtimeout events
            if (contentPlayer.ima3.settings.hardTimeouts) {
              contentPlayer.on('adtimeout', function () {

                // If the ads manager is ready, we could hard timeout vast ads right away
                if (contentPlayer.ima3._object.vjs_isAdsManagerReady && contentPlayer.ima3._object.vjs_isAdsManagerReady()) {
                  hardTimeout('VAST');
                } else {
                  // Otherwise, wait for the right time based on the type of ad
                  unlessContentUpdate('ima3-ads-manager-loaded', function () {
                    // This is the correct time to discard a vmap ad
                    hardTimeout('VMAP');
                  });
                  unlessContentUpdate('adsready', function () {
                    // This is the correct time to discard a vast ad
                    hardTimeout('VAST');
                  });
                }
              });
            }

            // Additional Flash contrib ad BC events below
            adPlayer.on('ima3-resumed', adInfo);
            adPlayer.on('ima3-paused', adInfo);
            adPlayer.on('ima3-first-quartile', adInfo);
            adPlayer.on('ima3-midpoint', adInfo);
            adPlayer.on('ima3-third-quartile', adInfo);
            adPlayer.on('ima3-volume-changed', adInfo);
            adPlayer.on('ima3-click', adInfo);
            adPlayer.on('ima3-complete', adInfo);
            adPlayer.on('ima3-all-ads-completed', adInfo);
            adPlayer.on('ads-request', adInfo);
            adPlayer.on('ads-load', adInfo);
            adPlayer.on('ads-pod-ended', adInfo);
            adPlayer.on('ads-pod-started', adInfo);
            adPlayer.on('ads-loading', adInfo);
            adPlayer.on('ads-response-received', adInfo);
          })();

          /**
           * Get current time from Flash
           *
           * @return {number} current time
           */
          adPlayer.currentTime = function () {

            // Cache Flash responses so we don't poll more often than every 250 milliseconds
            if (adPlayer.currentTimeCache && new Date().getTime() - adPlayer.currentTimeCacheTime < 250) {
              return adPlayer.currentTimeCache;
            }

            var time = proxyCurrentTime();

            time = time < 0 ? 0 : time;
            adPlayer.currentTimeCache = time;
            adPlayer.currentTimeCacheTime = new Date().getTime();
            return time;
          };

          adPlayer.on('ima3-started', function () {
            contentPlayer.removeClass('vjs-ima3-paused');
          });

          adPlayer.on('adserror', function () {
            contentPlayer.trigger('adserror');
          });

          adPlayer.on('adscanceled', function () {
            contentPlayer.trigger('adscanceled');
          });

          adPlayer.duration = function () {

            // Cache Flash responses so we don't poll more often than every 250 milliseconds
            if (adPlayer.durationCache && new Date().getTime() - adPlayer.durationCacheTime < 250) {
              return adPlayer.durationCache;
            }

            var time = proxyDuration();

            time = time < 0 ? 0 : time;
            adPlayer.durationCache = time;
            adPlayer.durationCacheTime = new Date().getTime();
            return time;
          };

          adPlayer.isFullscreen = function () {
            return contentPlayer.isFullscreen();
          };

          adPlayer.requestFullscreen = function () {
            return contentPlayer.requestFullscreen();
          };

          // proxy methods to the object element
          adPlayer.volume = function (value) {
            var currentVolume = proxyVolume();

            if (value !== undefined) {
              proxyVolume(value);
              contentPlayer.ima3.volume = value || contentPlayer.ima3.volume;
              adPlayer.trigger('volumechange');
            } else {
              // return last know volume, before muted
              return currentVolume || contentPlayer.ima3.volume;
            }
          };

          adPlayer.muted = function (value) {
            var currentVolume = proxyVolume();

            if (value !== undefined) {
              return adPlayer.volume(value ? 0 : contentPlayer.ima3.volume) === 0;
            }
            return currentVolume === 0;
          };

          adPlayer.pause = function () {
            adPlayer.trigger('pause');
            proxyPause();
          };

          adPlayer.paused = proxyCall('paused');

          adPlayer.play = function () {
            adPlayer.trigger('play');
            proxyPlay();
          };

          return adPlayer;
        };'use strict';

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { 'default': obj };
        }

        var _videoJs = typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null;

        var _videoJs2 = _interopRequireDefault(_videoJs);

        var _globalWindow = require('global/window');

        var _globalWindow2 = _interopRequireDefault(_globalWindow);

        var _globalDocument = require('global/document');

        var _globalDocument2 = _interopRequireDefault(_globalDocument);

        // alias the extend function
        var extend = _videoJs2['default'].ima3.extend;

        var computedStyle = function computedStyle(el, prop) {
          if (typeof getComputedStyle === 'function') {
            return _globalWindow2['default'].getComputedStyle(el)[prop];
          }
          return el.currentStyle[prop];
        };

        var getPlayerDimensions = function getPlayerDimensions(player) {
          var width = parseInt(computedStyle(player.el(), 'width'), 10);
          var height = parseInt(computedStyle(player.el(), 'height'), 10);

          return {
            width: width,
            height: height
          };
        };

        // Pipe all the events in `events` from source onto `player`. Returns a
        // function that unregisters all event listeners.
        var pipeEvents = function pipeEvents(source, events, player) {
          var handlers = {};
          var typeMap = {
            '0': 'PREROLL',
            '-1': 'POSTROLL'
          };
          var fillCurrentAdInfo = function fillCurrentAdInfo(currentAd) {
            if (currentAd === undefined) {
              return;
            }
            var plugin = player.ima3;

            // These are the same across ads in an ad pod
            plugin.currentAdEventInfo.adPodId = player.ads.pod.id;
            plugin.currentAdEventInfo.adPodLength = player.ads.pod.size;
            plugin.currentAdEventInfo.adType = player.ads.adType;

            // These may be different across ads in an ad pod,
            plugin.addToCurrentAdEventInfo('adId', player.ads.ad.id);
            plugin.addToCurrentAdEventInfo('creativeLength', player.ads.ad.duration);
            plugin.addToCurrentAdEventInfo('creativeIndex', player.ads.ad.index);
            plugin.addToCurrentAdEventInfo('creativeId', currentAd.getCreativeId());
            plugin.addToCurrentAdEventInfo('creativeAdId', currentAd.getCreativeAdId());
            plugin.addToCurrentAdEventInfo('creativeFormat', currentAd.getContentType());
            plugin.addToCurrentAdEventInfo('creativeUrl', currentAd.getMediaUrl());
            plugin.addToCurrentAdEventInfo('surveyUrl', currentAd.getSurveyUrl());
            plugin.addToCurrentAdEventInfo('adTitle', currentAd.getTitle());
            plugin.addToCurrentAdEventInfo('wrapperCreativeIds', currentAd.getWrapperCreativeIds());
            plugin.addToCurrentAdEventInfo('advertiserName', currentAd.getAdvertiserName());
            plugin.addToCurrentAdEventInfo('dealId', currentAd.getDealId());
            plugin.addToCurrentAdEventInfo('adSystem', currentAd.getAdSystem());
            plugin.addToCurrentAdEventInfo('wrapperAdSystems', currentAd.getWrapperAdSystems());
          };
          var pipeEvent = function pipeEvent(eventType, eventName) {
            var handler = function handler(event) {
              var eventObject = {
                emitter: source,
                originalEvent: event
              };

              eventObject.type = eventName;
              player.trigger(eventObject);

              // Adding a trigger for translated universal Brightcove events
              eventObject.type = player.ima3.settings.eventMap[eventName];
              player.trigger(eventObject);

              if (player.ima3.currentAd !== undefined) {
                player.ads.ad.id = player.ima3.currentAd.getAdId();
                player.ads.ad.duration = player.ima3.currentAd.getDuration();
                player.ads.ad.currentTime = player.ima3.currentAd.getAdPodInfo().getTimeOffset();
                player.ads.ad.index = player.ima3.currentAd.getAdPodInfo().getAdPosition() - 1;
                player.ads.ad.type = typeMap[player.ima3.currentAd.getAdPodInfo().getTimeOffset()] || 'MIDROLL';
                // function to populate the ad Pod values
                player.ads.pod.id = player.ima3.currentAd.getAdPodInfo().getPodIndex();
                player.ads.pod.size = player.ima3.currentAd.getAdPodInfo().getTotalAds();

                // Making this info available to the analytics plugin
                if (eventName === 'ima3-started') {
                  fillCurrentAdInfo(player.ima3.currentAd);
                  player.ima3.addToCurrentAdEventInfo('started', player.ads.ad.index);
                }
              }

              if (eventName === 'ima3-complete') {
                player.ima3.addToCurrentAdEventInfo('completed', player.ads.ad.index);
              }
            };

            handlers[eventType] = handler;
            source.addEventListener(eventType, handler, false);
          };

          for (var _event in events) {
            pipeEvent(events[_event][0], events[_event][1]);
          }
          return function () {
            for (var handler in handlers) {
              source.removeEventListener(handler, handlers[handler]);
            }
          };
        };

        /**
         * Load a given script asynchronously and inform callback when done.
         *
         * @param {string} url The URL to load.
         * @param {function} callback The callback to invoke once loaded.
         */
        var loadScript = function loadScript(url, callback) {
          var script = _globalDocument2['default'].createElement('script');
          var head = _globalDocument2['default'].querySelector('head');

          script.async = true;
          script.src = url;
          script.onload = script.onreadystatechange = function (ignore, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
              script.onload = script.onreadystatechange = null;
              script.parentNode.removeChild(script);
              script = null;
              callback(isAbort);
            }
          };
          head.insertBefore(script, head.firstChild);
        };

        // Translate the IMA event types.
        var eventTypes = function eventTypes(ima) {
          var types = {};
          var translate = function translate(k) {
            return 'ima3-' + k.toLowerCase().replace(/_/g, '-');
          };
          var events = ['AdErrorEvent', 'AdEvent', 'AdsManagerLoadedEvent'];
          var i = events.length;

          while (i--) {
            // skip objects that don't follow the event enum pattern
            if (!ima[events[i]] || !ima[events[i]].Type) {
              continue;
            }
            var eventType = ima[events[i]].Type;

            for (var _name in eventType) {
              if (eventType.hasOwnProperty(_name)) {
                types[eventType[_name]] = [eventType[_name], translate(_name)];
              }
            }
          }
          return types;
        };

        // Initialize the HTML-based ad integration with the specified options.
        var plugin = _videoJs2['default'].ima3.Html5 = function (settings) {
          var _this = this;

          // grab the tech element (HTML5 video element or Flash object)
          var tech = this.el().querySelector('.vjs-tech');
          // the control bar for the ad player, when running in standard
          // playback mode
          var adControlBar = undefined;
          // the ad player, when running in standard playback mode
          var adPlayer = undefined;
          // create ad container overlay element and insert into player
          var adContainer = _globalDocument2['default'].createElement('div');

          // make an ad request to get a new AdManager
          var loadAdsManager = undefined;

          // starts adManager
          var startAdsManager = undefined;

          // destroys adManager
          var destroyAdsManager = undefined;

          var postrollAdtimeoutHandler = function postrollAdtimeoutHandler() {
            if (_this.ima3 && _this.ima3.adsManager && _this.ima3.adsManager.skip) {
              _this.ima3.adsManager.skip();
            }
            destroyAdsManager();
            _this.trigger('ad-hard-timeout');
            _videoJs2['default'].log('ima3-hard-timeout');
          };
          var ima = undefined;
          var ima3Events = undefined;

          // Resuable Function below to reset the ad meta data
          var resetAdMetaData = function resetAdMetaData(player) {
            player.ads.ad = {};
            player.ads.pod = {};
          };

          this.ima3.adTech = 'html5';

          // Initialize the ad container
          adContainer.className = 'vjs-ima3-ad-container';
          this.ima3.insertAdContainer(adContainer);

          // Handle on-demand ad requests (i.e. from id3 metadata)
          var adRequest = function adRequest(adTag) {
            // Need to start linear ad mode before creating the request because
            // errors can be thrown during the request.
            _this.trigger('ads-request');
            _this.ads.startLinearAdMode();
            destroyAdsManager();
            loadAdsManager(settings, adTag);

            // We are waiting for an ad to load display spinner animation
            _this.addClass('ima3-ad-loading');
          };

          // Create deprecated vjs-global version of adrequest
          _videoJs2['default'].ima3.Html5.adrequest = function () {
            _videoJs2['default'].log.warn('videojs.ima3.Html5.adrequest is deprecated. ' + 'Use player.ima3.adrequest instead.');
            return adRequest.apply(this, arguments);
          };

          // Create player-local adrequest function
          this.ima3.adrequest = this.ima3.makeAdRequestFunction(adRequest);

          // IMA3 SDK requested content pause because an ad is starting
          this.on('ima3-content-pause-requested', function (event) {
            _this.ads.startLinearAdMode();
            // we are waiting for an ad to load
            // display spinner animation
            _this.addClass('ima3-ad-loading');
            _this.trigger('ads-pod-started');
          });

          // IMA3 SDK requested content resume because an ad is done
          this.on('ima3-content-resume-requested', function (event) {
            _this.ads.endLinearAdMode();
            _this.removeClass('ima3-ad-loading');
            _this.trigger('ads-pod-ended');
          });

          // inform the ads manager when the player enters or exits fullscreen
          this.on('fullscreenchange', function (event) {
            // This is a workaround for Safari in which the metadata text tracks
            // become disabled on fullscreen
            if (_videoJs2['default'].IS_ANY_SAFARI) {
              var textTracks = _this.textTracks();

              for (var i = 0; i < textTracks.length; i++) {
                if (textTracks[i].kind === 'metadata' && textTracks[i].mode === 'disabled') {
                  textTracks[i].mode = 'hidden';
                }
              }
            }

            var fullscreen = _this.hasClass('vjs-fullscreen');
            var retries = 3;
            var viewMode = undefined;

            // Chrome 30 on OS X reports the old player size during the
            // fullscreenchange event when testing with JPG-based static overlays.
            // Double-check the reported size for a bit after the event to make sure
            // the browser hasn't been lying to us.
            var awaitStableSize = function awaitStableSize(oldWidth, oldHeight) {
              var dimensions = getPlayerDimensions(_this);

              return function () {
                // VideoJS player dimensions reports native width/height even in
                // fullscreen mode. So we set this to the window dimensions.
                if (viewMode === ima.ViewMode.FULLSCREEN) {
                  _this.ima3.adsManager.resize(_this.el().offsetWidth, _this.el().offsetHeight, viewMode);
                } else {
                  _this.ima3.adsManager.resize(dimensions.width, dimensions.height, viewMode);
                }

                if (dimensions.width === oldWidth && dimensions.height === oldHeight) {
                  // the fullscreen transition is finished
                  return;
                }

                // check for a stable state again in a bit
                if (retries--) {
                  setTimeout(awaitStableSize(dimensions.width, dimensions.height), 1000);
                }
              };
            };

            if (!_this.ima3 || !_this.ima3.adsManager) {
              // IMA hasn't loaded yet, so ignore this event
              return;
            }

            viewMode = fullscreen ? ima.ViewMode.FULLSCREEN : ima.ViewMode.NORMAL;

            var playerDims = getPlayerDimensions(_this);

            // VideoJS player dimensions reports native width/height even in
            // fullscreen mode. So we set this to the window dimensions.
            if (viewMode === ima.ViewMode.FULLSCREEN) {
              _this.ima3.adsManager.resize(_this.el().offsetWidth, _this.el().offsetHeight, viewMode);
            } else {
              _this.ima3.adsManager.resize(playerDims.width, playerDims.height, viewMode);
            }

            setTimeout(awaitStableSize(playerDims.width, playerDims.height), 1000);
          });

          // log additional IMA3 events
          this.on('ima3-started', function () {
            _this.removeClass('ima3-ad-loading');
            _videoJs2['default'].log('ima3-started');

            // Re-enable smooth progress bar movement
            var progressEl = _globalDocument2['default'].querySelector('.vjs-ima3-html5 .vjs-ad-control-bar .vjs-play-progress');

            progressEl.className = progressEl.className.replace(' vjs-play-progress-resetting', '');
          });

          this.on('ima3-ad-error', function (event) {
            if (event.originalEvent) {
              _videoJs2['default'].log('ima3-ad-error', event.originalEvent.getError().toString(), event);
            }
            _this.removeClass('ima3-ad-loading');
            _this.trigger('adserror');
          });

          var hardTimeout = function hardTimeout() {
            if (_this.ima3.adsManager.getCuePoints().length === 0) {
              destroyAdsManager();
              _this.trigger('ad-hard-timeout');
              _videoJs2['default'].log('ima3-hard-timeout');
            } else if (_this.ima3.adsManager.getCuePoints().indexOf(0) >= 0) {
              _this.ima3.adsManager.discardAdBreak();
              _this.trigger('ad-hard-timeout');
              _videoJs2['default'].log('ima3-hard-timeout');
            }
          };

          if (settings.hardTimeouts) {
            this.on('adtimeout', function () {
              if (_this.ima3.adsManager) {
                hardTimeout();
              } else {
                _this.one('ima3-ads-manager-loaded', function () {
                  hardTimeout();
                });
              }
            });
          }

          // overlay handling
          // this workflow assumes a single overlay is displayed at a time
          this.on('ima3-loaded', function (event) {
            var ad = event.originalEvent.getAd();

            // store the current ad so it can be referred to during playback
            _this.ima3.currentAd = ad;

            // trigger ads-loading to indicate that the ad manager
            // is ready to start an ad
            _this.trigger('ads-loading');

            // A linear ad had loaded. It's time to remove spinner animation.
            _this.removeClass('ima3-ad-loading');
            if (ad && !ad.isLinear()) {
              _this.addClass('vjs-ima3-overlay');
              // This next 2 events will unpause the content video
              // preroll? -> ad-playback
              _this.trigger('adstart');
              // ad-playback -> content-resuming
              _this.trigger('adend');
            }
          });

          this.on('ima3-complete', function (event) {
            var ad = event.originalEvent.getAd();

            _videoJs2['default'].log('ima3-complete');
            // the ad has completed so remove it
            delete _this.ima3.currentAd;
            if (ad) {
              if (!ad.isLinear()) {
                _this.removeClass('vjs-ima3-overlay');
              } else {
                // Display the loading spinner in between the ads from an adPod.
                _this.addClass('ima3-ad-loading');
              }
            }

            // Disable smooth progress bar movement between ads
            var progressEl = _globalDocument2['default'].querySelector('.vjs-ima3-html5 .vjs-ad-control-bar .vjs-play-progress');

            progressEl.className += ' vjs-play-progress-resetting';
            progressEl.style.width = '0';
          });
          // inform the AdManager when the player resizes
          this.on('resize', function () {
            if (_this.ima3.adsManager) {
              var playerDims = getPlayerDimensions(_this);

              _this.ima3.adsManager.resize(playerDims.width, playerDims.height, ima.ViewMode.NORMAL);
            }
          });
          // inform the AdManager when the video begins
          this.on('readyforpreroll', function () {
            if (settings.requestMode !== 'ondemand' && settings.requestMode !== 'oncue') {
              startAdsManager();
            }
          });

          this.on('adserror', function () {
            destroyAdsManager();
          });

          this.on('adscanceled', function () {
            destroyAdsManager();
          });

          var cancelVmapAd = function cancelVmapAd(event) {
            // Cancel the VMAP ad
            _this.ima3.adsManager.discardAdBreak();
            _this.ima3.adsManager.skip();
            _this.ima3.managerCleanup = null;

            // Must exit ad mode
            if (_this.ads.state === 'ad-playback') {
              _this.trigger('adend');
            }
          };

          // initialize ads for this video when the AdsManager finishes loading
          this.on('ima3-ads-manager-loaded', function (event) {

            if (_this.ima3.managerCleanup) {
              destroyAdsManager();
            }

            var playbackComponent = {};

            playbackComponent.currentTime = _this.currentTime();
            playbackComponent.duration = _this.duration();

            _this.on('timeupdate', function () {
              playbackComponent.currentTime = _this.currentTime();
            });

            var adsManager = event.originalEvent.getAdsManager(playbackComponent);

            _this.ima3.adsManager = adsManager;

            // At this point, the ad response has been received
            // but we don't know what is in the response
            _this.trigger('ads-response-received');

            // Play no ads if attempting to use media cue points
            // and oncue requestMode with VMAP ads
            var options = _this.ima3.settings;
            var cuePoints = _this.ima3.adsManager.getCuePoints();
            var isVmap = cuePoints && cuePoints.length > 0;

            if (options.useMediaCuePoints && options.requestMode === 'oncue' && isVmap) {
              cancelVmapAd(event);
              _videoJs2['default'].log.error('Cancelling VMAP ad because useMediaCuePoints ' + 'must be used with VAST');
              return;
            }

            // Pump all the events through the player
            _this.ima3.managerCleanup = pipeEvents(adsManager, ima3Events, _this);

            // Once an adManager is created you need to start it.
            if (_this.ads.state === 'ad-playback') {
              // In the case of an on-demand request we do this immediately.
              startAdsManager();
            } else {
              // If this isn't an ondemand case, its the typical adrequest on startup
              // and we just trigger adsready to finish the preroll handhake with contrib-ads
              // The admanager will be started later, when it gets a readyforpreroll event.
              _this.trigger('adsready');
            }

            if (options.requestMode !== 'oncue') {
              // If there is no preroll / postroll, inform contrib-ads it doesn't have to wait
              // If there are no cue points, it's vast, which means there is a preroll only
              if (adsManager.getCuePoints().length && adsManager.getCuePoints().indexOf(0) < 0) {
                _this.trigger('nopreroll');
              }
              if (adsManager.getCuePoints().indexOf(-1) < 0) {
                _this.trigger('nopostroll');
              }
            }
          });

          // creates IMA AdRequest object
          var constructAdsRequest = function constructAdsRequest(settingsParam, adTag) {
            var playerDims = getPlayerDimensions(_this);

            // Cancel successive adsRequests for same content src
            if (_this.ima3.lastSrc_ && _this.ima3.lastSrc_ === _this.currentSrc() && (settingsParam.requestMode === 'onload' || settingsParam.requestMode === 'onplay')) {
              _videoJs2['default'].log('Cancelling repeat adsRequest for ' + _this.currentSrc());
              return;
            }
            _this.ima3.lastSrc_ = _this.currentSrc();

            _this.ima3.adsRequest = extend(new ima.AdsRequest(), {
              adTagUrl: _this.ima3.adMacroReplacement(adTag || _this.ima3.settings.serverUrl),
              // Specify both the linear and nonlinear slot sizes.
              // This helps the SDK to select the correct creative if multiple
              // creatives are returned.
              linearAdSlotWidth: playerDims.width,
              linearAdSlotHeight: playerDims.height,
              nonLinearAdSlotWidth: playerDims.width,
              nonLinearAdSlotHeight: playerDims.height
            });

            if (!_this.ima3.adsRequest.adTagUrl) {
              _this.trigger('adscanceled');
              return;
            }
            _this.ima3.adsLoader.requestAds(_this.ima3.adsRequest);
            _this.trigger('ads-request');
          };

          // load the AdsManager
          loadAdsManager = function loadAdsManager(settingsParam, adTag) {
            // Create a new ad request which will trigger ima3-ads-manager-loaded
            if (settingsParam.requestMode === 'onplay') {
              if (!_this.paused()) {
                // Account for the case where player is already playing,
                // and requestMode is expected `onplay`
                constructAdsRequest(settingsParam, adTag);
              } else {
                _this.one('play', function () {
                  constructAdsRequest(settingsParam, adTag);
                });
              }
            } else {
              constructAdsRequest(settingsParam, adTag);
            }
          };

          startAdsManager = function startAdsManager() {
            var playerDims = getPlayerDimensions(_this);

            try {
              // Set volume to .01 to avoid passing admuted event to DFP
              // Ad volume will sync with content volume on ima3-ads-started
              _this.ima3.adsManager.setVolume(0.01);
              _this.trigger('ads-load');
              _this.ima3.adsManager.init(playerDims.width, playerDims.height, ima.ViewMode.NORMAL);
              _this.ima3.adsManager.start();
            } catch (adError) {
              _this.trigger('adserror');
            }
          };

          destroyAdsManager = function destroyAdsManager() {
            if (_this.ima3.adsManager) {
              _this.ima3.adsManager.destroy();
              _this.ima3.adsManager = null;
            }
            if (_this.ima3.managerCleanup) {
              _this.ima3.managerCleanup();
              _this.ima3.managerCleanup = null;
            }
          };

          // Perform initialization after the IMA library has finished loading
          var finishInitialization = function finishInitialization() {
            var ControlBar = _videoJs2['default'].getComponent('ControlBar');

            ima = _globalWindow2['default'].google.ima;

            ima3Events = eventTypes(ima);

            // apply any global IMA3 settings
            if (settings.ima3SdkSettings) {
              for (var setting in settings.ima3SdkSettings) {
                var setter = 'set' + setting.charAt(0).toUpperCase() + setting.slice(1);

                if (typeof ima.settings[setter] === 'function') {
                  ima.settings[setter](settings.ima3SdkSettings[setting]);
                } else {
                  _videoJs2['default'].log.warn('Invalid ima3SdkSetting: "' + setting + '"');
                }
              }
            }

            // create a simple player to translate calls to IMA3
            adPlayer = _videoJs2['default'].ima3.Html5.adPlayer(adContainer, {
              contentPlayer: _this
            });
            adControlBar = new ControlBar(adPlayer, settings.adControlBar);
            adControlBar.addClass('vjs-ad-control-bar');
            _this.addClass('vjs-ad-controls');
            _this.addChild(adControlBar);

            // make the ad player objects accessible
            _this.ima3.adControlBar = adControlBar;
            _this.ima3.adPlayer = adPlayer;

            if (settings.vpaidMode) {
              if (typeof ima.ImaSdkSettings.VpaidMode[settings.vpaidMode] === 'number') {
                ima.settings.setVpaidMode(ima.ImaSdkSettings.VpaidMode[settings.vpaidMode]);
              } else {
                throw new Error('Invalid VPAID Mode: "' + settings.vpaidMode + '"');
              }
            }

            // set up display container
            _this.ima3.adDisplayContainer = new ima.AdDisplayContainer(adContainer, tech, settings.clickTrackingElement);

            _this.one('touchend', function () {
              _this.ima3.adDisplayContainer.initialize();
            });

            // set up the ads loader
            _this.ima3.adsLoader = new ima.AdsLoader(_this.ima3.adDisplayContainer);

            // Set the playerName and playerType for Google's analytics
            var adsLoaderSettings = _this.ima3.adsLoader.getSettings();

            adsLoaderSettings.setPlayerVersion(_this.ima3.version);
            adsLoaderSettings.setPlayerType('brightcove/player-html5');

            // Pump all the events through the player
            _this.ima3.loaderCleanup = pipeEvents(_this.ima3.adsLoader, ima3Events, _this);

            // Get the current src
            var currentSrc = _this.currentSrc();

            // if a video is ready, load the AdsManager if requestMode is 'onload' or 'onplay'
            // unless economics = FREE
            if (_this.mediainfo && _this.mediainfo.economics === 'FREE') {
              _this.trigger('adscanceled');
              _this.trigger('nopreroll');
              _this.trigger('nopostroll');
            } else if (currentSrc && currentSrc !== '' && settings.requestMode !== 'ondemand' && settings.requestMode !== 'oncue') {
              loadAdsManager(settings);
            }

            // get a new AdsManager each time the content changes
            // this is wrapped in a function so that loadAdsManager
            // is called without an args.
            _this.on('contentupdate', function () {
              currentSrc = _this.currentSrc();
              if (_this.mediainfo && _this.mediainfo.economics === 'FREE') {
                _this.trigger('adscanceled');
                _this.trigger('nopreroll');
                _this.trigger('nopostroll');
                return;
              }

              if (currentSrc && currentSrc !== '' && settings.requestMode !== 'ondemand' && settings.requestMode !== 'oncue') {
                loadAdsManager(settings);
              }
            });

            // inform the AdsLoader when content ends to trigger postrolls
            _this.on('contentended', function () {
              if (_this.ads.state === 'postroll?') {
                _this.one('adtimeout', postrollAdtimeoutHandler);
                _this.ima3.adsLoader.contentComplete();
              }
            });

            _this.on(['contentupdate', 'dispose'], function () {
              _this.off('adtimeout', postrollAdtimeoutHandler);
            });

            // Nulling out the values for ads and pod info
            _this.on(['contentupdate', 'adend', 'ima3-ready'], function () {
              resetAdMetaData(_this);
            });

            // export the ad container
            _this.ima3.el = adContainer;
          };

          // load ima3 sdk
          if (_globalWindow2['default'].google && _globalWindow2['default'].google.ima) {
            finishInitialization();
            this.trigger('ima3-ready');
          } else {
            loadScript(settings.sdkurl, function (aborted) {
              finishInitialization();
              if (aborted) {
                _this.trigger({
                  type: 'adserror',
                  info: aborted
                });
              } else {
                _this.trigger('ima3-ready');
              }
            });
          }
        };

        plugin.eventTypes = eventTypes;

        // Takes the IMA3 iframe element and an options object for the adplayer.
        // Returns an AdPlayer decorated to proxy calls back and forth to the IMA3
        // iframe.
        _videoJs2['default'].ima3.Html5.adPlayer = function (elem, options) {
          var contentPlayer = options.contentPlayer;
          var adPlayer = new _videoJs2['default'].ima3.AdPlayer(options);
          var _paused = true;
          var simulateTimeupdate = function simulateTimeupdate() {
            if (!adPlayer.paused()) {
              adPlayer.trigger('timeupdate');
            }

            // IMA HTML5 SDK has rounding errors if you check currentTime more frequently
            // than once a second.
            _globalWindow2['default'].setTimeout(simulateTimeupdate, 1000);
          };

          adPlayer.currentTime = function () {
            var duration = adPlayer.duration();

            // If we don't even have a duration, then just return 0. Also, if there
            // is no adsManager, return 0. This really shouldn't be the way to
            // address that issue - rather the adPlayer should clean itself up.
            if (!duration || !contentPlayer.ima3.adsManager) {
              return 0;
            }

            var remainingTime = contentPlayer.ima3.adsManager.getRemainingTime();

            if (remainingTime <= 0) {
              // Often, remainingTime returns a negative value once the ad has ended. In this
              // case, we will return duration so that the progress bar goes back to empty.
              return 0;
            }

            if (remainingTime > duration) {
              // Since duration is usually rounded by the IMA SDK to an int, but remainingTime
              // is not, remainingTime is slightly more than the duration sometimes and needs
              // to be handled else we will have a negative remaining time.
              return 0;
            }

            if (remainingTime > 0) {
              // Otherwise remainingTime is a positive valid value, so we can perform the
              // calculation to get currentTime.
              return duration - remainingTime;
            }
          };
          adPlayer.duration = function () {
            var ad = contentPlayer.ima3.currentAd;

            if (ad) {
              var adDuration = ad.getDuration();

              return adDuration > 0 ? adDuration : 0;
            }
            return 0;
          };
          adPlayer.pause = function () {
            _paused = true;
            contentPlayer.ima3.adsManager.pause();
          };
          adPlayer.paused = function () {
            return _paused;
          };
          adPlayer.play = function () {
            _paused = false;
            contentPlayer.ima3.adsManager.resume();

            // 2-2-2014: IMA3 is not firing RESUMED so we trigger play manually
            adPlayer.trigger('play');
          };
          adPlayer.isFullscreen = function () {
            return contentPlayer.isFullscreen();
          };
          adPlayer.requestFullscreen = function () {
            return contentPlayer.requestFullscreen();
          };
          adPlayer.volume = function (value) {
            if (!contentPlayer.ima3 || !contentPlayer.ima3.adsManager) {
              // IMA hasn't loaded yet, so ignore this event
              _videoJs2['default'].log.error('Too early to set Volume. IMA3 is not loaded');
              return;
            }
            var currentVolume = contentPlayer.ima3.adsManager.getVolume();

            if (value !== undefined) {
              contentPlayer.ima3.adsManager.setVolume(value);
              contentPlayer.ima3.volume = value || contentPlayer.ima3.volume;
              adPlayer.trigger('volumechange');
            }
            return currentVolume || contentPlayer.ima3.volume;
          };
          adPlayer.muted = function (value) {
            var currentVolume = contentPlayer.ima3.adsManager.getVolume();

            if (value !== undefined) {
              return adPlayer.volume(value ? 0 : contentPlayer.ima3.volume) === 0;
            }
            return currentVolume === 0;
          };

          // Translate IMA3 events into ad player events.
          contentPlayer.on('ima3-started', function () {
            contentPlayer.removeClass('vjs-ima3-paused');
            adPlayer.trigger('play');
            _paused = false;
          });
          contentPlayer.on('ima3-resumed', function () {
            contentPlayer.removeClass('vjs-ima3-paused');
            adPlayer.trigger('play');
            _paused = false;
          });
          contentPlayer.on('ima3-paused', function () {
            contentPlayer.addClass('vjs-ima3-paused');
            adPlayer.trigger('pause');
            _paused = true;
          });

          // trigger timeupdates regularly during playback
          simulateTimeupdate();
          return adPlayer;
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "global/document": 2, "global/window": 3, "videojs-contrib-ads": 8 }] }, {}, [11])(11);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = __webpack_require__(1);

var _is_js2 = _interopRequireDefault(_is_js);

__webpack_require__(6);

var _Overlay = __webpack_require__(3);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Utilities = __webpack_require__(0);

var _Utilities2 = _interopRequireDefault(_Utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ad = function () {
  function Ad(application) {
    _classCallCheck(this, Ad);

    this.application = application;
    this.options = application.MOBILE_IMA_SETTINGS;
    this.videoId = application.player.el().id;

    this.isAdBreaking = false;
    this.currentAdType = null;
    this.adUrlPreroll = null;
    this.prerollPlayed = null;
    this.adUrlInning = null;
    this.adUrlGame = null;
    this.pmxd = null;
    this.liveMidrollPod = null;
    this.midrollCount = 1;
    this.midrolls = null;
    this.adUrlMidroll = null;
    this.adUrlPostroll = null;
    this.postrollPlayed = null;
    this.preventMidrollTime = 0;

    this.androidAdsPlayerOverlay = null;
  }

  _createClass(Ad, [{
    key: 'init',
    value: function init() {
      this.application.player.bcima3(this.options);
      this.initializeAdTag();
      this.bindAdEvents();
    }
  }, {
    key: 'initializeAdStatus',
    value: function initializeAdStatus() {
      this.isAdBreaking = false;
      this.currentAdType = null;
      this.adUrlPreroll = '';
      this.prerollPlayed = false;
      if (this.application.info.is_live) {
        this.adUrlInning = '';
        this.adUrlGame = '';
        this.pmxd = '';
        this.liveMidrollPod = 1;
      } else {
        this.midrollCount = 1;
        this.midrolls = [];
        this.adUrlMidroll = '';
        this.adUrlPostroll = '';
        this.postrollPlayed = false;
        this.preventMidrollTime = 0;
      }
    }
  }, {
    key: 'initializeAdTag',
    value: function initializeAdTag() {
      $.ajax({
        url: this.application.ADTAG_XML_URL,
        dataType: 'xml',
        context: this,
        success: function success(xml) {
          this.readAdtagXml(xml);
          this.handleAdTagLoaded();
        },
        error: function error(xml) {
          console.error('[Error]Adtag XML cannot be loaded.', xml);
          if (this.application.isAutoPlay) {
            this.application.player.play();
          }
        }
      });
    }
  }, {
    key: 'readAdtagXml',
    value: function readAdtagXml(xml) {
      var _this = this;

      this.initializeAdStatus();
      this.pmxd = $(xml).find('pmxd').find(this.application.network).text();

      $(xml).find('adtag').each(function (index, element) {
        if ($(element).attr('id') === _this.application.info.ad_category) {
          var adtagxml = _this.application.info.is_live ? $(element).find('live') : $(element).find('vod');
          console.log('Adtag XML=', adtagxml);

          // Preroll URL取得
          _this.adUrlPreroll = $(adtagxml).find('preroll').text();

          if (_this.application.info.is_live) {
            // Midroll Inning URL取得
            _this.adUrlInning = $(adtagxml).find('midroll_inning').text();

            // Midroll Game URL取得
            _this.adUrlGame = $(adtagxml).find('midroll_game').text();
          } else {
            // VOD Midroll URL取得
            _this.adUrlMidroll = $(adtagxml).find('midroll').text();

            // VOD Postroll URL取得
            _this.adUrlPostroll = $(adtagxml).find('postroll').text();
          }
        }
      });
    }
  }, {
    key: 'handleAdTagLoaded',
    value: function handleAdTagLoaded() {
      var _this2 = this;

      // 最初の広告を準備 PostrollはPlayerのendedでリクエストするためここでは確認しない
      if (this.adUrlPreroll !== '') {
        this.requestPreroll();
      } else {
        if (this.application.info.is_live) {
          if (this.adUrlInning !== '' || this.adUrlGame !== '') {
            this.requestLiveMidroll();
          }
        } else if (this.adUrlMidroll !== '' && this.application.vodCues) {
          this.application.player.one('loadedmetadata', function () {
            _this2.requestVodMidroll();
          });
        }

        // Preroll以外でオートプレイ有りの場合は再生開始
        if (this.application.isAutoPlay) {
          this.application.player.play();
          // 黒背景を非表示
          if (this.application.blackImageOverlay) {
            this.application.blackImageOverlay.hideOverlay();
            delete this.application.blackImageOverlay;
            this.application.blackImageOverlay = null;
          }
        }
      }

      // VODにcueが存在する場合は、midrollの確認
      if (this.application.vodCues) {
        this.application.vodCues.forEach(function (cuepoint) {
          if (cuepoint.startTime > 1 && cuepoint.startTime < _this2.application.duration - 1) {
            // 動画1秒以降から終了1秒前までのキューポイントをmidrollに設定
            _this2.midrolls.push({
              startTime: cuepoint.startTime
            });
          }
        });
      }
    }
  }, {
    key: 'bindAdEvents',
    value: function bindAdEvents() {
      if (_is_js2.default.not.desktop()) {
        // mobileの場合はadManagerイベントを設定
        this.application.player.on('ads-ad-started', this.handleAdstart.bind(this));
        this.application.player.on('ads-click', this.handleAdClick.bind(this));
        this.application.player.on('ima3-ad-error', this.handleAderror.bind(this));
        this.application.player.on('ima3-all-ads-completed', this.handleAdend.bind(this));
      } else {
        // PCの場合はadsLoaderイベントを設定
        this.application.player.bcima3.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
        this.application.player.bcima3.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.handleAderror.bind(this), false);
      }
    }
  }, {
    key: 'onAdsManagerLoaded',
    value: function onAdsManagerLoaded(adsManagerLoadedEvent) {
      var adMgrId = adsManagerLoadedEvent.getUserRequestContext().adMgrId;
      if (adMgrId === 'preroll') {
        this.application.handlePreroll();
        if (this.application.isAutoPlay) {
          console.log('Adtag XML is loaded correctly, so video autoPlay starts.');
          this.application.player.play();
        }
      } else if (adMgrId === 'postroll') {
        this.application.player.bcima3.playAds('postroll');
      }
      this.application.player.bcima3.adsManager[adMgrId].addEventListener(google.ima.AdEvent.Type.CLICK, this.handleAdClick.bind(this), false);

      this.application.player.bcima3.adsManager[adMgrId].addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.handleAdend.bind(this, adMgrId), false);

      this.application.player.bcima3.adsManager[adMgrId].addEventListener(google.ima.AdEvent.Type.STARTED, this.handleAdstart.bind(this, adMgrId), false);

      this.application.player.bcima3.adsManager[adMgrId].addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.handleAderror.bind(this), false);
    }
  }, {
    key: 'handleAdend',
    value: function handleAdend(adMgrId, isError) {
      var _this3 = this;

      // 広告再生中フラグオフ
      this.isAdBreaking = false;
      // ローディングアイコンの削除をキャンセル
      $('.vjs-loading-spinner').removeAttr('style');

      // 広告終了時に現在の広告タイプをクリア
      this.currentAdType = null;

      if (typeof adMgrId !== 'string') {
        var adTags = Object.keys(this.application.player.bcima3.adTags);
        adMgrId = adTags[adTags.length - 1];
      }
      console.log('Ad ended', adMgrId);
      this.application.player.el().classList.remove('vjs-waiting');

      // Androidの広告オーバーレイがある場合は非表示
      if (this.androidAdsPlayerOverlay) {
        this.androidAdsPlayerOverlay.hideOverlay();
        delete this.androidAdsPlayerOverlay;
        this.androidAdsPlayerOverlay = null;
      }

      // 黒背景オーバーレイがある場合は非表示
      if (this.application.blackImageOverlay) {
        this.application.blackImageOverlay.hideOverlay();
        delete this.application.blackImageOverlay;
        this.application.blackImageOverlay = null;
      }

      // 連続して広告再生させないようにするための広告再生終了時間を記録するためのフラグをオン
      this.application.upcomingMidroll.activeTimeFlag = true;

      // 広告再生終了時には全てのadsManagerを削除
      Object.keys(this.application.player.bcima3.adsManager).forEach(function (id) {
        if (_this3.application.player.bcima3.adsManager[id]) {
          _this3.application.player.bcima3.adsManager[id].destroy();
          delete _this3.application.player.bcima3.adsManager[adMgrId];
        }
      });

      // 終了した広告の次に再生する広告の準備
      if (adMgrId === 'preroll') {
        // Prerollの再生終了
        this.prerollPlayed = true;

        // [AndroidWebのみ]Preroll再生終了時は動画再生を再開する
        if (this.application.deviceType === 'android_mweb') {
          console.log('Hide ClickBlock');
          this.application.player.volume(1);
          this.application.player.play();
        }

        // prerollの次に再生する広告の準備
        if (this.application.info.is_live) {
          // Live Midrollの準備
          this.requestLiveMidroll();
        } else if (this.midrolls[this.getNextVodMidrollIndex(this.application.player.currentTime())]) {
          // VOD Midrollの準備
          this.requestVodMidroll();
        }
      } else if (adMgrId === 'postroll') {
        // VOD Postrollの終了
        if (this.application.relatedVideosLoaded && isError !== true) {
          // 関連動画リストを読み込み済みの場合は表示を行う
          this.application.relatedVideos.showRelatedVideos();
        }
      } else if (this.application.info.is_live) {
        // Live midrollの終了、Podをインクリメントし、次のmidrollを準備
        this.liveMidrollPod += 1;
        this.requestLiveMidroll();
      } else {
        // VOD midrollの終了
        this.midrollCount += 1;
        // midroll終了から5秒以内のmidrollは再生させないように、再生不可時間を記録
        // （シークによって複数のmidrollポイントを跨いだ際の対応）
        this.preventMidrollTime = this.application.player.currentTime() + 5;
        // 次のmidrollを準備
        this.requestVodMidroll();
      }
    }
  }, {
    key: 'handleAdClick',
    value: function handleAdClick() {
      console.log('Ad is clicked, ad playback will be paused.');
      // [AndroidWebのみ]広告再生をリジュームするためのボタンを表示
      if (_is_js2.default.android()) {
        this.androidAdsPlayerOverlay.overlayAdPlayBtn();
      }
    }
  }, {
    key: 'handleAdstart',
    value: function handleAdstart() {
      console.log('Ad started');
      // 広告再生中フラグオン
      this.isAdBreaking = true;
      // ローディングアイコンを削除
      $('.vjs-loading-spinner').hide();

      // 黒背景を非表示
      if (this.application.blackImageOverlay) {
        this.application.blackImageOverlay.hideOverlay();
        delete this.application.blackImageOverlay;
        this.application.blackImageOverlay = null;
      }

      // [AndroidWebのみ]Preroll再生開始時は動画再生を一時停止する＋広告用コントロールパネルを非表示化
      if (_is_js2.default.android()) {
        this.application.player.ima3.adPlayer.volume(1);
        this.application.player.pause();
        var element = document.getElementsByClassName('vjs-ad-control-bar');
        for (var i = 0; i < element.length; i += 1) {
          element[i].style.display = 'none';
        }
        if (!this.androidAdsPlayerOverlay) {
          this.androidAdsPlayerOverlay = new _Overlay2.default(this.application);
          this.androidAdsPlayerOverlay.overlayClickBlock();
        }
      }

      // AdStart Tracking for AdobeAnalytics
      // 視聴ページ側のJSメソッドを実行
      adStartTracking(this.application.videoRefId, this.currentAdType);
    }
  }, {
    key: 'handleAderror',
    value: function handleAderror(adErrorEvent) {
      // 広告再生中フラグオフ
      this.isAdBreaking = false;
      // ローディングアイコンの削除をキャンセル
      $('.vjs-loading-spinner').removeAttr('style');

      var adMgrId = void 0;
      if (_is_js2.default.not.desktop()) {
        var adTags = Object.keys(this.application.player.bcima3.adTags);
        adMgrId = adTags[adTags.length - 1];
      } else {
        adMgrId = adErrorEvent.getUserRequestContext().adMgrId;
      }
      console.log(adMgrId);
      switch (adMgrId) {
        case 'preroll':
          this.prerollPlayed = true;
          this.handleAdend(adMgrId, true);
          if (_is_js2.default.android()) {
            this.application.player.volume(1);
          }
          break;
        case 'postroll':
          this.postrollPlayed = true;
          this.handleAdend(adMgrId, true);
          break;
        case 'midroll_game':
        case 'midroll_inning':
          this.application.upcomingMidroll.isRequested = true;
          this.handleAdend(adMgrId, true);
          break;
        case 'midroll_' + this.midrollCount:
          this.handleAdend(adMgrId, true);
          break;
        default:
      }
    }
  }, {
    key: 'requestPreroll',
    value: function requestPreroll() {
      this.currentAdType = 'PREROLL';
      var genAdTag = _Utilities2.default.genAdTag(this.adUrlPreroll, this.application.deviceType);
      console.log('Preroll URL=', genAdTag);
      this.application.player.bcima3.createAdsManager({
        adMgrId: 'preroll',
        adsRequestSettings: {
          adTagUrl: genAdTag
        }
      });
      // Mobileの場合はロード完了イベントは広告再生時まで発生しないので先にpreroll再生準備
      if (_is_js2.default.not.desktop()) {
        this.application.handlePreroll(genAdTag);
      }
    }
  }, {
    key: 'requestLiveMidroll',
    value: function requestLiveMidroll() {
      var _this4 = this;

      this.currentAdType = 'MIDROLL';
      if (this.adUrlInning !== '') {
        var generatedAdTag = _Utilities2.default.genAdTag(this.adUrlInning, this.application.deviceType, this.pmxd, this.liveMidrollPod);
        var prefetchTime = Math.floor(Math.random() * this.application.prefetchInterval);
        console.log('Midroll Inning URL=', generatedAdTag);
        console.log('prefetch time will be ' + prefetchTime + ' sec later');
        setTimeout(function () {
          _this4.application.player.bcima3.createAdsManager({
            adMgrId: 'inning',
            adsRequestSettings: {
              adTagUrl: generatedAdTag
            },
            adsRenderingSettings: {
              enablePreloading: true
            }
          });
        }, prefetchTime * 1000);
      }
      if (this.adUrlGame !== '') {
        var _generatedAdTag = _Utilities2.default.genAdTag(this.adUrlGame, this.application.deviceType, this.pmxd, this.liveMidrollPod + 1000);
        console.log('Midroll Game URL=', _generatedAdTag);
        this.application.player.bcima3.createAdsManager({
          adMgrId: 'game',
          adsRequestSettings: {
            adTagUrl: _generatedAdTag
          }
        });
      }
    }
  }, {
    key: 'requestVodMidroll',
    value: function requestVodMidroll() {
      this.currentAdType = 'MIDROLL';
      var generatedAdTag = _Utilities2.default.genAdTag(this.adUrlMidroll, this.application.deviceType, this.pmxd, this.midrollCount);
      console.log('Midroll URL=', generatedAdTag);
      this.application.player.bcima3.createAdsManager({
        adMgrId: 'midroll_' + this.midrollCount,
        adsRequestSettings: {
          adTagUrl: generatedAdTag
        }
      });
    }
  }, {
    key: 'requestVodPostroll',
    value: function requestVodPostroll() {
      this.currentAdType = 'POSTROLL';
      var generatedAdTag = _Utilities2.default.genAdTag(this.adUrlPostroll, this.application.deviceType);
      console.log('Postroll URL=', generatedAdTag);
      this.application.player.bcima3.createAdsManager({
        adMgrId: 'postroll',
        adsRequestSettings: {
          adTagUrl: generatedAdTag
        }
      });
    }
  }, {
    key: 'getNextVodMidrollIndex',
    value: function getNextVodMidrollIndex(mediaTime) {
      var _this5 = this;

      var nextMidrollIndex = void 0;
      this.midrolls.forEach(function (midroll, index) {
        if (mediaTime < midroll.startTime) {
          if (index > 0) {
            if (mediaTime > _this5.midrolls[index - 1].startTime) {
              nextMidrollIndex = index;
            }
          } else {
            nextMidrollIndex = index;
          }
        }
      });
      return nextMidrollIndex;
    }
  }]);

  return Ad;
}();

exports.default = Ad;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utilities = __webpack_require__(0);

var _Utilities2 = _interopRequireDefault(_Utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RelatedVideos = function () {
  function RelatedVideos(application) {
    var _this = this;

    _classCallCheck(this, RelatedVideos);

    this.application = application;
    // グローバル変数
    window.__bcplayer = application.player;
    // 定数
    this.MAX_RELATED_VIDEOS_COUNT = application.MAX_RELATED_VIDEOS_COUNT;
    this.MEDIA_API_TOKEN = application.MEDIA_API_TOKEN;
    // 変数
    this.overlayRelatedVideos = null;

    /**
     * 関連動画の更新処理
     */
    window.__bcplayer.onFindRelatedVideosCompleted = function (response) {
      // 既存の要素を削除
      _this.hideRelatedVideos();

      // タグでフィルタリング
      var videos = response ? _this.filterRelatedVideoByTags(response) : [];
      if (videos.length === 0) {
        return;
      }
      console.log('related videos are', videos);
      // 関連動画オーバーレイの作成
      var html = '';

      if (_this.application.stillImageUrl !== '') {
        html += '\n          <span id="stillImage" style="background-image: url(' + _Utilities2.default.escapeHtml(_this.application.stillImageUrl) + ');position:absolute;width:100%;height:100%;display:block;background-color: #000;background-position: center center;background-repeat: no-repeat;background-size: contain;" >\n          </span>\n        ';
      }

      html += '\n        <div class="related-video-container">\n          <ul class="related-video-list">\n      ';

      for (var i = 0; i < videos.length; i += 1) {
        var video = videos[i];

        // スチル画像URLをカスタムフィールドから取得。なければデフォルトを使用
        var stillImageUrl = _this.application.DEFAULT_STILL_IMAGE_URL;
        if (video.custom_fields && video.custom_fields.still_image_url) {
          stillImageUrl = video.custom_fields.still_image_url;
        }

        html += '\n          <li class="related-video">\n            <a href="' + _Utilities2.default.escapeHtml(video.linkURL) + '">\n              <div class="related-video-thumbnail">\n                <img src="' + _Utilities2.default.escapeHtml(stillImageUrl) + '" />\n              </div>\n              <div class="related-video-title">\n                <p>' + _Utilities2.default.escapeHtml(video.name) + '</p>\n              </div>\n            </a>\n          </li>\n        ';
      }
      html += '</ul>';
      html += '</div>';

      _this.overlayRelatedVideos = document.createElement('div');
      _this.overlayRelatedVideos.className = 'related-video-overlay';
      _this.overlayRelatedVideos.innerHTML = html;

      $(_this.overlayRelatedVideos).find('a').on('click', function () {
        _Utilities2.default.setRelatedVideoPlayFlg();
      });

      // 関連動画読み込み完了フラグをセット
      _this.application.relatedVideosLoaded = true;
      console.log('relatedVideos will be loaded, relatedVideosLoaded is ' + _this.application.relatedVideosLoaded);
    };
  }

  /**
   * 関連動画の取得
   */


  _createClass(RelatedVideos, [{
    key: 'getRelatedVideos',
    value: function getRelatedVideos() {
      // パラメータ設定
      var params = {};
      params.reference_id = this.application.player.mediainfo.reference_id;
      params.video_fields = 'referenceId,name,customFields,linkURL,tags';

      // 検索実行
      BCMAPI.token = this.MEDIA_API_TOKEN;
      BCMAPI.callback = 'window.__bcplayer.onFindRelatedVideosCompleted';
      BCMAPI.find('find_related_videos', params);
    }

    /**
     * 関連動画の更新処理
     */

  }, {
    key: 'filterRelatedVideoByTags',
    value: function filterRelatedVideoByTags(response) {
      // 設定されたタグを取得
      var tags = [];
      if (this.application.playerControlSettings.relatedVideosTags instanceof Array) {
        tags = this.application.playerControlSettings.relatedVideosTags;
      }

      // 0件の場合、全部を対象とする
      if (tags.length === 0) {
        return response.items.slice(0, this.MAX_RELATED_VIDEOS_COUNT);
      }

      // 設定されたタグを含むアイテムだけをまとめる
      var count = 0;
      var videos = [];
      for (var i = 0; i < response.items.length && count < this.MAX_RELATED_VIDEOS_COUNT; i += 1) {
        var video = response.items[i];

        var found = false;
        for (var j = 0; j < tags.length; j += 1) {
          for (var k = 0; k < video.tags.length; k += 1) {
            if (tags[j].toLowerCase() === video.tags[k].toLowerCase() && video.linkURL) {
              found = true;
              break;
            }
          }

          if (found) {
            break;
          }
        }

        if (found) {
          videos.push(video);
          count += 1;
        }
      }

      return videos;
    }

    /**
     * 関連動画の表示
     */

  }, {
    key: 'showRelatedVideos',
    value: function showRelatedVideos() {
      var _this2 = this;

      if (this.overlayRelatedVideos !== null) {
        this.application.player.el().appendChild(this.overlayRelatedVideos);
        this.application.player.one('play', function () {
          _this2.hideRelatedVideos();
        });
      }
    }

    /**
     * 関連動画の削除
     */

  }, {
    key: 'hideRelatedVideos',
    value: function hideRelatedVideos() {
      if (this.overlayRelatedVideos) {
        if (this.overlayRelatedVideos.parentNode) {
          this.overlayRelatedVideos.parentNode.removeChild(this.overlayRelatedVideos);
        }
        this.overlayRelatedVideos = null;
      }
    }
  }]);

  return RelatedVideos;
}();

exports.default = RelatedVideos;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ABCplayer = __webpack_require__(5);

var _ABCplayer2 = _interopRequireDefault(_ABCplayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

videojs.plugin('PlayerControl', function PlayerControl(settings) {
  console.log('plugin loaded!');
  var player = this;
  var abcPlayerSettings = {
    // オーバーレイ表示する再生ボタンの画像
    PLAY_IMG_URL: 'http://www.asahicom.jp/sp/koshien/virtualbaseball/images/btn_play.png',
    // ADタグXMLのURL
    ADTAG_XML_URL: 'https://99-live-koshien.s3.amazonaws.com/99/adtag.xml',
    // モバイル用ima3 pluginのオプション
    MOBILE_IMA_SETTINGS: {
      ima3: {
        serverUrl: '',
        timeout: 10000,
        hardTimeouts: true,
        requestMode: 'ondemand',
        adTechOrder: ['html5'],
        vpaidMode: 'ENABLED',
        useMediaCuePoints: false
      }
    },
    // 関連動画一覧表示上限数
    MAX_RELATED_VIDEOS_COUNT: 3,
    // 関連動画一覧表示のサムネイルに表示するデフォルト画像（動画カスタムフィールドに未設定の場合こちらを利用）
    DEFAULT_STILL_IMAGE_URL: 'http://www.asahicom.jp/koshien/virtualbaseball/images/98/player/default_image.jpg',
    // Media API トークン
    MEDIA_API_TOKEN: 'QYRAY7Cd2_j4nqf-N0qI_jTDYPS2_R6Z47yOH4FLzTobg-8Jn8GmoQ..'
  };
  window.abcPlayer = new _ABCplayer2.default(player, settings, abcPlayerSettings);
  window.abcPlayer.init();
});

/***/ })
/******/ ]);
//# sourceMappingURL=Player.js.map
