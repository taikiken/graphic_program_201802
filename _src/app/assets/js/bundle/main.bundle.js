/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/js/bundle";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Loc = __webpack_require__(1);

	var _Ajax = __webpack_require__(44);

	var _Api = __webpack_require__(55);

	var _Types = __webpack_require__(56);

	var _Codes = __webpack_require__(45);

	var _User = __webpack_require__(61);

	var _Permalink = __webpack_require__(58);

	var _Query = __webpack_require__(60);

	var _Queries = __webpack_require__(63);

	var _Type = __webpack_require__(57);

	var _Action = __webpack_require__(79);

	var _Offset = __webpack_require__(80);

	var _Pickup = __webpack_require__(85);

	/**
	 * global object
	 * こんな感じで使えます
	 *
	 *    var ut = self.UT
	 */

	// net
	var UT = {
	  version: '1.0.0',
	  util: {
	    Loc: _Loc.Loc
	  },
	  net: {
	    Ajax: _Ajax.Ajax,
	    Api: _Api.Api,
	    Types: _Types.Types,
	    Codes: _Codes.Codes,
	    User: _User.User,
	    types: {
	      Permalink: _Permalink.Permalink,
	      Query: _Query.Query,
	      Queries: _Queries.Queries,
	      Type: _Type.Type
	    }
	  },
	  action: {
	    Action: _Action.Action,
	    Offset: _Offset.Offset,
	    home: {
	      Pickup: _Pickup.Pickup
	    }
	  }

	};

	// action/home

	// action

	// net/types
	/*!
	 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016-01-13 23:08:05
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	// -------------------------------------
	//  main
	//    target for babel compile
	// -------------------------------------

	// util

	self.UT = UT;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 21:40
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	'use strict';

	// window.location に関する Utility

	/**
	 * location に関する utility
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Loc = undefined;

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Loc = exports.Loc = function () {
	  /**
	   * search を繰り返し調べたい時に instance を作成します
	   */

	  function Loc() {
	    (0, _classCallCheck3.default)(this, Loc);

	    this._search = null;
	  }

	  /**
	   *
	   * @param {string} [search=''] key: value にしたい search型 文字列
	   * @returns {Loc} instance を返します
	   */

	  (0, _createClass3.default)(Loc, [{
	    key: 'parse',
	    value: function parse() {
	      var search = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      this._search = Loc.parse(search);
	      return this;
	    }

	    /**
	     * search value を keyから探します
	     * @param {string} key search name
	     * @returns {*} string|undefined|null で結果を返します
	     */

	  }, {
	    key: 'find',
	    value: function find(key) {

	      var search = this._search;
	      if (search === null) {
	        return null;
	      }

	      return search[key];
	    }

	    /**
	     *
	     * @returns {string} location.hrefを返します
	     */

	  }], [{
	    key: 'hashStrip',

	    /**
	     * hash(#example)から`#`をとります
	     * @param {string} hash hash文字列
	     * @returns {string} hash文字列から#を削除した文字列を返します
	     */
	    value: function hashStrip() {
	      var hash = arguments.length <= 0 || arguments[0] === undefined ? Loc.hash : arguments[0];

	      return hash.replace(/^[#\/]|\s+$/g, '');
	    }

	    /**
	     * pathnameを/で分解します
	     * @param {string} [pathname=Loc.pathname] location.pathname, hostなしのpath
	     * @returns {Array}
	     */

	  }, {
	    key: 'resolve',
	    value: function resolve() {
	      var pathname = arguments.length <= 0 || arguments[0] === undefined ? Loc.path : arguments[0];

	      return pathname.split('/');
	    }

	    /**
	     * location.search を key: value へ分解します
	     * @param {string} search location.search型文字列
	     * @returns {*}
	     */

	  }, {
	    key: 'parse',
	    value: function parse() {
	      var search = arguments.length <= 0 || arguments[0] === undefined ? Loc.search : arguments[0];

	      if (typeof search !== 'string' || search.length === 0) {

	        return null;
	      }

	      search = search.replace('&amp;', '&');
	      var vars = search.split('&');
	      var results = {};

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(vars), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var val = _step.value;

	          var pair = val.split('=');
	          if (Array.isArray(pair) && pair.length === 2) {

	            results[pair[0]] = pair[1];
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return results;
	    }
	  }, {
	    key: 'current',
	    get: function get() {

	      return self.location.href;
	    }

	    /**
	     *
	     * @returns {string} location.pathname(urlからprotocol+hostを除く)を返します
	     */

	  }, {
	    key: 'path',
	    get: function get() {

	      return self.location.pathname;
	    }

	    /**
	     *
	     * @returns {string} location.hashを返します
	     */

	  }, {
	    key: 'hash',
	    get: function get() {

	      return self.location.hash;
	    }

	    /**
	     * url の query 文字列
	     * @returns {string} url ? 以降の query 文字列を返します, a=xxx&b=yyy
	     */

	  }, {
	    key: 'search',
	    get: function get() {

	      return self.location.search.substring(1);
	    }
	  }]);
	  return Loc;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(32);
	module.exports = __webpack_require__(35);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var Iterators = __webpack_require__(8);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(6)
	  , step             = __webpack_require__(7)
	  , Iterators        = __webpack_require__(8)
	  , toIObject        = __webpack_require__(9);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(13)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(10)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(11);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(14)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(20)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(8)
	  , $iterCreate    = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(28)
	  , getProto       = __webpack_require__(22).getProto
	  , ITERATOR       = __webpack_require__(29)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , core      = __webpack_require__(17)
	  , ctx       = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(19);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(22)
	  , createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(22)
	  , descriptor     = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(28)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(29)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(22).setDesc
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(29)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(30)('wks')
	  , uid    = __webpack_require__(31)
	  , Symbol = __webpack_require__(16).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(16)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(33)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(13)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(34)
	  , defined   = __webpack_require__(12);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(36)
	  , get      = __webpack_require__(38);
	module.exports = __webpack_require__(17).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(37);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(39)
	  , ITERATOR  = __webpack_require__(29)('iterator')
	  , Iterators = __webpack_require__(8);
	module.exports = __webpack_require__(17).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(11)
	  , TAG = __webpack_require__(29)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _defineProperty = __webpack_require__(42);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/09 - 16:19
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ajax = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Codes = __webpack_require__(45);

	var _Result = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 非同期通信でJSONを取得します
	 */

	var Ajax = exports.Ajax = function () {
	  /**
	   * instanceを作成します
	   *
	   */

	  function Ajax() {
	    (0, _classCallCheck3.default)(this, Ajax);

	    // 実行可否判断 flag は trueです
	    this._can = true;
	  }

	  /**
	   *
	   * @param {string} url request URL
	   * @param {string} method POST|GET...
	   * @param {Function} resolve success callback
	   * @param {Function} reject fail callback
	   */

	  (0, _createClass3.default)(Ajax, [{
	    key: 'start',
	    value: function start(url, method, resolve, reject) {

	      var fetch = self.fetch;
	      var _this = this;

	      // 実行可否をチェックし, false の時は何もしません
	      if (!this.can) {

	        var error = new Error('status:999, message:duplicate or busy.');
	        error.response = {};
	        error.number = 999;
	        reject(error);
	        return;
	      }

	      // flag off
	      this.disable();

	      console.log('ajax.start: ' + url + ', ' + method);

	      // https://github.com/github/fetch
	      // request を開始します
	      fetch(url, {
	        method: method
	      }).then(function (response) {
	        // check status (Server)
	        var status = response.status;

	        if (status >= 200 && status < 300) {
	          // may be ok
	          return response;
	        } else {

	          // bad response, サーバーからのエラーメッセージ
	          var error = new Error('status:' + status + ', message:' + response.statusText);
	          error.response = response;
	          error.number = status;
	          throw error;
	        }
	      }).then(function (response) {

	        // parse JSON
	        return response.json();
	      }).then(function (json) {
	        // parsed JSON
	        var result = new _Result.Result(json);

	        if (!_Codes.Codes.status(result.status.code)) {
	          // something bad
	          var code = result.status.code;
	          var error = new Error('status:' + code + ', user:' + result.status.user_message + ', dev:' + result.status.developer_message);
	          error.response = result.response;
	          error.number = result.status.code;
	          throw error;
	        }

	        _this.enable();
	        resolve(result);
	      }).catch(function (error) {

	        _this.enable();
	        reject(error);
	      });
	    }

	    /**
	     * 実行可否 flag を true にします
	     */

	  }, {
	    key: 'enable',
	    value: function enable() {

	      this._can = true;
	    }
	    /**
	     * 実行可否 flag を false にします
	     */

	  }, {
	    key: 'disable',
	    value: function disable() {

	      this._can = false;
	    }

	    /**
	     *
	     * @return {boolean} 実行可否 flag を返します
	     */

	  }, {
	    key: 'can',
	    get: function get() {

	      return this._can;
	    }
	  }]);
	  return Ajax;
	}();

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/09 - 17:31
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Codes = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(46);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _en = {
	  200: 'OK',
	  201: 'Created',
	  202: 'Accepted',
	  204: 'No Content',

	  400: 'Bad Request',
	  401: 'Unauthorized',
	  403: 'Forbidden',
	  404: 'Not Found',
	  405: 'Method Not Allowed',
	  409: 'Conflict',
	  415: 'Unsupported Media Type',
	  429: 'Too Many Requests',
	  500: 'Internal Server Error',
	  502: 'Service Unavailable'
	};

	var _jp = {
	  200: '成功',
	  201: '新しいリソースを作成した',
	  202: 'リクエストを受け付けた',
	  204: '内容なし',

	  400: 'エラー',
	  401: '認証エラー',
	  403: 'アクセス禁止',
	  404: 'リソースが存在しない',
	  405: 'メソッドが間違っている',
	  409: 'リソースが競合している',
	  415: '指定されたメディアタイプがサポートされていない',
	  429: 'リクエストの回数制限に引っかかる',
	  500: 'サーバ側の問題',
	  502: '一時的にサービス出来ない'
	};

	var _symbol = (0, _symbol3.default)();

	/**
	 * API Response Code を管理します
	 */

	var Codes = exports.Codes = function () {
	  /**
	   * ステータスコード・メッセージを日本語と英語で保存しています
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Codes(target) {
	    (0, _classCallCheck3.default)(this, Codes);

	    if (_symbol !== target) {

	      throw new Error('Api is singleton pattern. not use new Api().');
	    }
	  }

	  /**
	   * @param {int} statusCode サーバーからのレスポンスコード int型
	   * @returns {boolean} statusCodeが成功したか(true)失敗(false)を調べ返します
	   */

	  (0, _createClass3.default)(Codes, null, [{
	    key: 'status',
	    value: function status(statusCode) {

	      return statusCode >= 200 && statusCode < 300;
	    }

	    /**
	     * status codeの意味を調べます
	     * @param {Number} code サーバーからのresponse status code
	     * @returns {{en: string|*, jp: string|*}} status codeの意味を返します
	     */

	  }, {
	    key: 'message',
	    value: function message(code) {

	      return {
	        en: Codes.en(code),
	        jp: Codes.jp(code)
	      };
	    }

	    /**
	     * @param {Number} code status code
	     * @return {*} 日本語メッセージを返します
	     */

	  }, {
	    key: 'jp',
	    value: function jp(code) {

	      return _jp[code];
	    }

	    /**
	     * @param {Number} code status code
	     * @return {*} 英語メッセージを返します
	     */

	  }, {
	    key: 'en',
	    value: function en(code) {

	      return _en[code];
	    }
	  }]);
	  return Codes;
	}();

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(53);
	module.exports = __webpack_require__(17).Symbol;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(22)
	  , global         = __webpack_require__(16)
	  , has            = __webpack_require__(26)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(20)
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(28)
	  , uid            = __webpack_require__(31)
	  , wks            = __webpack_require__(29)
	  , keyOf          = __webpack_require__(49)
	  , $names         = __webpack_require__(50)
	  , enumKeys       = __webpack_require__(51)
	  , isArray        = __webpack_require__(52)
	  , anObject       = __webpack_require__(36)
	  , toIObject      = __webpack_require__(9)
	  , createDesc     = __webpack_require__(23)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(14)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(22)
	  , toIObject = __webpack_require__(9);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(9)
	  , getNames  = __webpack_require__(22).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(22);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(11);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 15:04
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * Ajax 結果を成功時に保存します
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Result = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Result = exports.Result = function () {
	  /**
	   *  Ajax 成功時にdataを保存します
	   * @param {{status: *, responce: *}} json json パース後データ
	   */

	  function Result(json) {
	    (0, _classCallCheck3.default)(this, Result);

	    this._json = json;
	  }

	  /**
	   * parsed JSON プロパティ
	   * @returns {*} パース済みJSON(Object)を返します
	   */

	  (0, _createClass3.default)(Result, [{
	    key: 'data',
	    get: function get() {

	      return this._json;
	    }

	    /**
	     * 生 responce
	     * @returns {*} 生 responce(JSON) を返します
	     */

	  }, {
	    key: 'responce',
	    get: function get() {

	      return this.data.responce;
	    }

	    /**
	     * responce.status
	     * @returns {{code: number, user_massage: string,developer_message: string}} responce.status を返します
	     */

	  }, {
	    key: 'status',
	    get: function get() {

	      return this.data.status;
	    }
	  }]);
	  return Result;
	}();

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/09 - 16:19
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Api = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(46);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Types = __webpack_require__(56);

	var _User = __webpack_require__(61);

	var _ApiDae = __webpack_require__(62);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>サーバーリクエストAPIを管理します</h3>
	 * 全て static
	 */

	var Api = exports.Api = function () {
	  /**
	   * static class です、instance を作成できません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Api(target) {
	    (0, _classCallCheck3.default)(this, Api);

	    if (_symbol !== target) {

	      throw new Error('Api is singleton pattern. not use new Api().');
	    }
	  }

	  /**
	   * login API を取得します
	   * @returns {Types} login API をTypes instanceで返します
	   */

	  (0, _createClass3.default)(Api, null, [{
	    key: 'login',
	    value: function login() {

	      return _ApiDae.ApiDae.api('login');
	    }

	    /**
	     * home API を login している / していない に合わせ取得します
	     * @returns {Types} home API(home / self)をTypes instanceで返します
	     */

	  }, {
	    key: 'home',
	    value: function home() {

	      return _User.User.sign ? _ApiDae.ApiDae.api('self') : _ApiDae.ApiDae.api('home');
	    }

	    /**
	     * ログインなしユーザーのhome API
	     * @return {Types} ログインなしユーザーのhome APIをTypes instanceで返します
	     */

	  }, {
	    key: 'homeAPi',
	    value: function homeAPi() {

	      return _ApiDae.ApiDae.api('home');
	    }

	    /**
	     * ログイン済みユーザーのhome API
	     * @return {Types} ログイン済みユーザーのhome APIをTypes instanceで返します
	     */

	  }, {
	    key: 'selfAPi',
	    value: function selfAPi() {

	      return _ApiDae.ApiDae.api('self');
	    }

	    /**
	     * category API を取得します
	     * @returns {Types} category API を Types instance で取得します
	     */

	  }, {
	    key: 'category',
	    value: function category() {

	      return _ApiDae.ApiDae.api('category');
	    }

	    /**
	     * category API を取得します
	     * @returns {Types} category API をTypes instanceで返します
	     */

	  }, {
	    key: 'search',
	    value: function search() {

	      return _ApiDae.ApiDae.api('search');
	    }

	    /**
	     * category API を取得します
	     * @returns {Types} category API をTypes instanceで返します
	     */

	  }, {
	    key: 'detail',
	    value: function detail() {

	      return _ApiDae.ApiDae.api('detail');
	    }

	    /**
	     * bookmark API を取得します
	     * @param {string} [action=add] path option を指定します
	     * @returns {Types} bookmark API をTypes instanceで返します
	     */

	  }, {
	    key: 'bookmark',
	    value: function bookmark() {
	      var action = arguments.length <= 0 || arguments[0] === undefined ? 'add' : arguments[0];

	      switch (action) {
	        case 'delete':
	          return _ApiDae.ApiDae.api('bookmark:delete');

	        case 'add':
	          return _ApiDae.ApiDae.api('bookmark:add');

	        default:
	          console.warn('bookmark illegal action: ' + action + ', instead use default');
	          return _ApiDae.ApiDae.api('bookmark:add');
	      }
	    }

	    /**
	     * comment API を取得します
	     * @param {string} [action=''] path option を指定します
	     * @returns {Types} comment API をTypes instanceで返します
	     */

	  }, {
	    key: 'comment',
	    value: function comment() {
	      var action = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      switch (action) {
	        case 'send':
	          return _ApiDae.ApiDae.api('comment:send');

	        case 'reply':
	          return _ApiDae.ApiDae.api('comment:reply');

	        case 'send:edit':
	          return _ApiDae.ApiDae.api('comment:send:edit');

	        case 'reply:edit':
	          return _ApiDae.ApiDae.api('comment:reply:edit');

	        case 'send:delete':
	          return _ApiDae.ApiDae.api('comment:send:delete');

	        case 'reply:delete':
	          return _ApiDae.ApiDae.api('comment:reply:delete');

	        case 'good:add':
	          return _ApiDae.ApiDae.api('comment:good:add');

	        case 'good:delete':
	          return _ApiDae.ApiDae.api('comment:good:delete');

	        case 'bad:add':
	          return _ApiDae.ApiDae.api('comment:bad:add');

	        case 'bad:delete':
	          return _ApiDae.ApiDae.api('comment:bad:delete');

	        case '':
	          return _ApiDae.ApiDae.api('comment');

	        default:
	          console.warn('comment illegal action: ' + action + ', instead use default');
	          return _ApiDae.ApiDae.api('comment');
	      }
	    }

	    /**
	     * users API を取得します
	     * @param {string} [action=''] path option を指定します
	     * @returns {Types} category users をTypes instanceで返します
	     */

	  }, {
	    key: 'users',
	    value: function users() {
	      var action = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      switch (action) {
	        case 'notice':
	          return _ApiDae.ApiDae.api('users:notice');

	        case 'notice:read':
	          return _ApiDae.ApiDae.api('users:notice:read');

	        case 'bookmark':
	          return _ApiDae.ApiDae.api('users:bookmark');

	        case 'activity':
	          return _ApiDae.ApiDae.api('users:activity');

	        case '':
	          return _ApiDae.ApiDae.api('users');

	        default:
	          console.warn('users illegal action: ' + action + ', instead use default');
	          return _ApiDae.ApiDae.api('users');

	      }
	    }
	  }]);
	  return Api;
	}();

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/10 - 17:35
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Types = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Type = __webpack_require__(57);

	var _Permalink = __webpack_require__(58);

	var _Quries = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * API url, path option, query 情報を保持します
	 */

	var Types = exports.Types = function () {
	  /**
	   *
	   * @param {Type} type Type instance
	   * @param {Permalink} permalink Permalink instance
	   * @param {Queries} queries Queries instance
	   * @param {boolean} [auth=false] 認証が必要か否かの真偽値
	   */

	  function Types(type, permalink, queries) {
	    var auth = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	    (0, _classCallCheck3.default)(this, Types);

	    this._type = type;
	    this._permalink = permalink;
	    this._queries = queries;
	    this._auth = auth;
	  }

	  /**
	   *
	   * @returns {Type} Type instance を返します
	   */

	  (0, _createClass3.default)(Types, [{
	    key: 'type',
	    value: function type() {

	      return this._type;
	    }

	    /**
	     * @return {string} url を返します
	     */

	  }, {
	    key: 'permalink',

	    /**
	     *
	     * @returns {Permalink} Permalink instance を返します
	     */
	    value: function permalink() {

	      return this._permalink;
	    }

	    /**
	     *
	     * @returns {Queries} Queries instance を返します
	     */

	  }, {
	    key: 'queries',
	    value: function queries() {

	      return this._queries;
	    }

	    /**
	     *
	     * @returns {boolean} 認証が必要か否かの真偽値を返します。 true: 必要
	     */

	  }, {
	    key: 'auth',
	    value: function auth() {

	      return this._auth;
	    }
	  }, {
	    key: 'url',
	    get: function get() {

	      return this._type.url;
	    }

	    /**
	     * @return {string} method を返します
	     */

	  }, {
	    key: 'method',
	    get: function get() {

	      return this._type.method;
	    }
	  }]);
	  return Types;
	}();

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/09 - 17:03
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * method / url 2つのpropertyを持ちます
	 * method: POST | GET
	 * utl: API request先
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Type = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Type = exports.Type = function () {
	  /**
	   * @param {string} url API request先
	   * @param {string} [method=GET] POST | GET | DELETE...
	   */

	  function Type(url) {
	    var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
	    (0, _classCallCheck3.default)(this, Type);

	    this.url = url;
	    this.method = method;
	  }

	  /**
	   * @returns {string} API request先を返します
	   */

	  (0, _createClass3.default)(Type, [{
	    key: 'url',
	    get: function get() {

	      return this._url;
	    }

	    /**
	     * API request先を設定します
	     * @param {string} url API request先
	     */
	    ,
	    set: function set(url) {

	      this._url = url;
	    }

	    /**
	     * @returns {string} POST | GET を返します
	     */

	  }, {
	    key: 'method',
	    get: function get() {

	      return this._method;
	    }

	    /**
	     * POST | GET... を設定します
	     * @param {string} method POST | GET...の値
	     */
	    ,
	    set: function set(method) {

	      var methodUpper = method.toUpperCase();

	      if (!Type.validate(methodUpper)) {

	        methodUpper = 'GET';
	      }

	      this._method = methodUpper;
	    }

	    /**
	     * @static
	     * @param {string} method method type
	     * @return {boolean} method type を検証し真偽値を返します
	     */

	  }], [{
	    key: 'validate',
	    value: function validate(method) {

	      return ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) !== -1;
	    }
	  }]);
	  return Type;
	}();

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/10 - 14:37
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * Types.url へ追加可能なpathがあるかどうかを管理します
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Permalink = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Permalink = exports.Permalink = function () {
	  /**
	   * パスオプションを指定、ない時は空配列
	   *
	   *      // example
	   *      new Permalink( [ 'category', '' ] );
	   *
	   *      // searchのようにどんなワードでも良い場合は "*" を指定する
	   *      new Permalink( [ '*' ] );
	   *
	   * @param {Array} [paths] 追加 path を配列で設定
	   * @param {boolean} [need=false] 追加 path が必須かを設定。true: 必須, false: オプション
	   */

	  function Permalink() {
	    var paths = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var need = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    (0, _classCallCheck3.default)(this, Permalink);

	    this._paths = paths;
	    this._need = need;
	  }

	  /**
	   * @returns {Number} paths数を返します
	   */

	  (0, _createClass3.default)(Permalink, [{
	    key: 'length',
	    value: function length() {

	      return this._paths.length;
	    }

	    /**
	     * @param {string} path 調べたいオプションパス
	     * @returns {boolean} 指定パスが存在するかの真偽値を返します
	     */

	  }, {
	    key: 'has',
	    value: function has(path) {

	      var paths = this._paths;
	      var result = paths.indexOf(path) !== -1;

	      if (!result) {

	        result = paths.indexOf('*') !== -1;
	      }

	      return result;
	    }

	    /**
	     * @returns {boolean} オプションパスが必須かどうかを返します true: 必須
	     */

	  }, {
	    key: 'require',
	    value: function require() {

	      return this._need;
	    }
	  }]);
	  return Permalink;
	}();

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/10 - 16:46
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Queries = undefined;

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Query = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Query{key: value} を配列で管理します
	 */

	var Queries = exports.Queries = function () {
	  /**
	   * @param {Array<Query>} [queries=[]] Query{key: value} 配列
	   */

	  function Queries() {
	    var queries = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    (0, _classCallCheck3.default)(this, Queries);

	    this._queries = queries;
	  }

	  /**
	   * queries個数であるかないかの判断は可能
	   * @returns {Number} queries個数を返します
	   */

	  (0, _createClass3.default)(Queries, [{
	    key: 'length',
	    value: function length() {

	      return this._queries.length;
	    }

	    /**
	     * @returns {Array.<Query>} 全てのqueriesを返します
	     */

	  }, {
	    key: 'all',
	    value: function all() {

	      return this._queries;
	    }

	    /**
	     * key から query を探します
	     * @param {string} key query key name, ?start=0 の start
	     * @returns {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
	     */

	  }, {
	    key: 'search',
	    value: function search(key) {

	      var queries = this._queries;
	      var result;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(queries), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var query = _step.value;

	          result = query.search(key);
	          if (result !== null) {
	            break;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return result;
	    }
	  }]);
	  return Queries;
	}();

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/10 - 16:32
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * Api query option を key ごとに管理します
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Query = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Query = exports.Query = function () {
	  /**
	   * Api query option 情報を保持します
	   *
	   *    ?key=value
	   *
	   * key, value型, default値, 必須情報...
	   *
	   * @param {string} key query key
	   * @param {string} type query value type
	   * @param {string|number|null} [defaultValue=null] default value, あれば...
	   * @param {boolean} [require=false] 必須フラグ
	   */

	  function Query(key, type) {
	    var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    var require = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    (0, _classCallCheck3.default)(this, Query);

	    this._key = key;
	    this._type = type;
	    this._require = require;
	    this._value = defaultValue;
	  }

	  /**
	   * @param {string} key query key
	   * @returns {boolean} query key が存在するかを返します
	   */

	  (0, _createClass3.default)(Query, [{
	    key: 'has',
	    value: function has(key) {

	      return this._key === key;
	    }

	    /**
	     * @param {string} key query key
	     * @returns {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
	     */

	  }, {
	    key: 'search',
	    value: function search(key) {

	      if (this.has(key)) {

	        return {
	          key: this._key,
	          type: this._type,
	          require: this._require,
	          value: this._value
	        };
	      }

	      return null;
	    }
	  }]);
	  return Query;
	}();

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/12 - 15:54
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.User = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(46);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _sign = false;
	var _id = -1;

	/**
	 * <h3>ユーザー情報を管理します</h3>
	 * 全てstaticです
	 */

	var User = exports.User = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function User(target) {
	    (0, _classCallCheck3.default)(this, User);

	    if (_symbol !== target) {

	      throw new Error('User is static Class. not use new User().');
	    }
	  }

	  /**
	   * sign in / out 状態を表します
	   * @return {boolean} sign in / out 状態を返します
	   */

	  (0, _createClass3.default)(User, null, [{
	    key: 'sign',
	    get: function get() {

	      return _sign;
	    }

	    /**
	     * sign in / out 状態を表します
	     * @param {boolean} bool sign in / out 状態の真偽値, true: sign in
	     */
	    ,
	    set: function set(bool) {

	      _sign = bool;
	    }

	    /**
	     * User id 情報
	     * @return {number} User id を返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {

	      return _id;
	    }

	    /**
	     * User id を設定します
	     * @param {number} id User id
	     */
	    ,
	    set: function set(id) {

	      _id = id;
	    }
	  }]);
	  return User;
	}();

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/12 - 21:26
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ApiDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(46);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Types = __webpack_require__(56);

	var _Type = __webpack_require__(57);

	var _Permalink = __webpack_require__(58);

	var _Queries = __webpack_require__(63);

	var _Query = __webpack_require__(60);

	var _CommentType = __webpack_require__(64);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_PATH = '/api/v1';

	var _symbol = (0, _symbol3.default)();
	var _api = {
	  'login': new _Types.Types(new _Type.Type(API_PATH + '/oauth/token', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),
	  // home / self
	  'home': new _Types.Types(new _Type.Type(API_PATH + '/articles/home'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	  'self': new _Types.Types(new _Type.Type(API_PATH + '/articles/self'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]), true),
	  // 記事一覧
	  'category': new _Types.Types(new _Type.Type(API_PATH + '/articles/category/'), new _Permalink.Permalink(['all', '*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	  // 検索
	  'search': new _Types.Types(new _Type.Type(API_PATH + '/articles/search/'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	  // 詳細
	  'detail': new _Types.Types(new _Type.Type(API_PATH + '/articles/'), new _Permalink.Permalink(['*'], true), new _Queries.Queries()),
	  // ブックマーク 登録
	  'bookmark:add': new _Types.Types(new _Type.Type(API_PATH + '/articles/bookmark', 'POST'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	  // ブックマーク 削除
	  'bookmark:delete': new _Types.Types(new _Type.Type(API_PATH + '/articles/bookmark', 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	  // 記事詳細でのコメント一覧表示
	  'comment': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _CommentType.CommentType('normal|official|self'), new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	  // 記事へのコメント
	  'comment:send': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/', 'POST'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('body', 'number', '', true)]), true),
	  // コメント返信
	  'comment:reply': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/', 'POST'), new _Permalink.Permalink(['*/*'], true), new _Queries.Queries([new _Query.Query('body', 'number', '', true)]), true),
	  // 記事へのコメント編集
	  'comment:send:edit': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/', 'PUT'), new _Permalink.Permalink(['*/*'], true), new _Queries.Queries(), true),
	  // コメント返信コメント編集
	  'comment:reply:edit': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/', 'PUT'), new _Permalink.Permalink(['*/*/*'], true), new _Queries.Queries(), true),
	  // 記事へのコメント 削除
	  'comment:send:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/', 'DELETE'), new _Permalink.Permalink(['*/*'], true), new _Queries.Queries(), true),
	  // コメント返信コメント 削除
	  'comment:reply:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/', 'DELETE'), new _Permalink.Permalink(['*/*/*'], true), new _Queries.Queries(), true),
	  // コメントGood 追加
	  'comment:good:add': new _Types.Types(new _Type.Type(API_PATH + '/comments/like/', 'POST'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	  // コメントGood 削除
	  'comment:good:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/like/', 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	  // コメントBad 追加
	  'comment:bad:add': new _Types.Types(new _Type.Type(API_PATH + '/comments/bad/', 'POST'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	  // コメントBad 削除
	  'comment:bad:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/bad/', 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	  // お知らせ
	  'users:notice': new _Types.Types(new _Type.Type(API_PATH + '/users/USER_ID/notifications/'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	  // お知らせ 既読
	  'users:notice:read': new _Types.Types(new _Type.Type(API_PATH + '/users/USER_ID/notifications/read', 'POST'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	  // ユーザー詳細
	  'users': new _Types.Types(new _Type.Type(API_PATH + '/users/USER_ID'), new _Permalink.Permalink(), new _Queries.Queries()),
	  // ユーザーページのブックマーク一覧
	  'users:bookmark': new _Types.Types(new _Type.Type(API_PATH + '/users/USER_ID/bookmark'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	  // マイページの自分のアクティビティ一覧
	  'users:activity': new _Types.Types(new _Type.Type(API_PATH + '/users/USER_ID/activity'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]), true)
	};

	/**
	 * <h3>Api 詳細情報</h3>
	 * 全てstaticです
	 */

	var ApiDae = exports.ApiDae = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function ApiDae(target) {
	    (0, _classCallCheck3.default)(this, ApiDae);

	    if (_symbol !== target) {

	      throw new Error('User is static Class. not use new User().');
	    }
	  }

	  /**
	   * api list を取得します
	   * @returns {{login: Types, home: Types, self: Types, category: Types, search: Types, detail: Types, bookmark:add: Types, bookmark:delete: Types, comment: Types, comment:send: Types, comment:reply: Types, comment:send:edit: Types, comment:reply:edit: Types, comment:send:delete: Types, comment:reply:delete: Types, comment:good:add: Types, comment:good:delete: Types, comment:bad:add: Types, comment:bad:delete: Types, users:notice: Types, users:notice:read: Types, users: Types, users:bookmark: Types, users:activity: Types}}
	   * 全ての API list を返します
	   */

	  (0, _createClass3.default)(ApiDae, null, [{
	    key: 'all',
	    value: function all() {

	      return _api;
	    }

	    /**
	     * 指定キー情報を取得します
	     * @param {string} key api key を指定します
	     * @returns {Types} key に基づいた Types instance を返します
	     */

	  }, {
	    key: 'api',
	    value: function api(key) {

	      return _api[key];
	    }
	  }]);
	  return ApiDae;
	}();

/***/ },
/* 63 */
59,
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/12 - 17:22
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	// comment 取得 [type]

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CommentType = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Query2 = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事詳細でのコメント一覧表示のリクエスト・オプションです
	 */

	var CommentType = exports.CommentType = function (_Query) {
	  (0, _inherits3.default)(CommentType, _Query);

	  /**
	   *
	   * @param {string} key dog|cat|food のように | 区切りでオプションをつなげます
	   * @param {boolean} [require=false] 必須真偽値
	   */

	  function CommentType(key) {
	    var require = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    (0, _classCallCheck3.default)(this, CommentType);

	    // 'dog|cat' を分割する

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CommentType).call(this, key, 'string', '', require));

	    _this._keys = key.split('|');

	    return _this;
	  }

	  /**
	   * Query override して使います
	   * @param {string} key query key
	   * @returns {boolean} query key が存在するかを返します
	   */

	  (0, _createClass3.default)(CommentType, [{
	    key: 'has',
	    value: function has(key) {

	      return this._keys.indexOf(key) !== -1;
	    }
	  }]);
	  return CommentType;
	}(_Query2.Query);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	module.exports = __webpack_require__(17).Object.getPrototypeOf;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(68);

	__webpack_require__(69)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(15)
	  , core    = __webpack_require__(17)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = __webpack_require__(71);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

	exports.__esModule = true;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(46)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(73)["default"];

	var _Object$setPrototypeOf = __webpack_require__(75)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	module.exports = __webpack_require__(17).Object.setPrototypeOf;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(15);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(78).set});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(22).getDesc
	  , isObject = __webpack_require__(37)
	  , anObject = __webpack_require__(36);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(18)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 15:00
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Action = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Result = __webpack_require__(54);

	var _Ajax = __webpack_require__(44);

	var _Types = __webpack_require__(56);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// interface
	// 基本機能を設定し Interface として使用します

	/**
	 * Ajax 処理を行います
	 * Interface として使用します
	 * 各 Class で extends して下さい
	 */

	var Action = exports.Action = function () {
	  /**
	   * Ajax 処理, query なし
	   * @param {Types} types Types instance, Ajax request に使用します
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Action(types) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    (0, _classCallCheck3.default)(this, Action);

	    this._types = types;
	    this._resolve = resolve;
	    this._reject = reject;
	    this._ajax = new _Ajax.Ajax();
	  }

	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(Action, [{
	    key: 'start',
	    value: function start() {

	      this._ajax.start(this.url(), this._types.method, this.success.bind(this), this.fail.bind(this));
	    }

	    /**
	     * url を作成します
	     * @returns {string} 作成した url を返します
	     */

	  }, {
	    key: 'url',
	    value: function url() {
	      return this._types.url;
	    }

	    /**
	     * Ajax success callback
	     * @param {Result} result Ajax成功結果
	     */

	  }, {
	    key: 'success',
	    value: function success(result) {

	      // success
	      var resolve = this._resolve;

	      if (typeof resolve === 'function') {

	        resolve(result);
	      }
	    }

	    /**
	     * Ajax error callback
	     * @param {Error} error Ajax失敗結果
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      // error
	      var reject = this._reject;

	      if (typeof reject === 'function') {

	        reject(error);
	      }
	    }
	  }]);
	  return Action;
	}();

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 16:03
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Offset = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(81);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Result = __webpack_require__(54);

	var _Action2 = __webpack_require__(79);

	var _Types = __webpack_require__(56);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Ajax 処理を行います
	 * Interface として使用します
	 * 各 Class で extends して下さい
	 * <strong>Next 読込</strong>がある時に使用します
	 */

	var Offset = exports.Offset = function (_Action) {
	  (0, _inherits3.default)(Offset, _Action);

	  /**
	   * Ajax 処理, query
	   * @param {Type} types Types instance, Ajax request に使用します
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @param {Number} [offset=0] query offset 値
	   * @param {Number} [length=10] query length 値
	   */

	  function Offset(types) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var offset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	    var length = arguments.length <= 4 || arguments[4] === undefined ? 10 : arguments[4];
	    (0, _classCallCheck3.default)(this, Offset);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Offset).call(this, types, resolve, reject));

	    _this._offset = offset;
	    _this._length = length;
	    _this._total = -1;

	    return _this;
	  }

	  /**
	   * url を作成します
	   * @returns {string} 作成した url を返します
	   */

	  (0, _createClass3.default)(Offset, [{
	    key: 'url',
	    value: function url() {
	      return this._types.url + '?offset=' + this._offset + '&length=' + this._length;
	    }

	    /**
	     * offset 値を加算します
	     * @param {Number} [count] default 値は this._length になります。 Ajax 成功後 次のリクエスト前に Offset.next() し加算します。
	     */

	  }, {
	    key: 'next',
	    value: function next() {
	      var count = arguments.length <= 0 || arguments[0] === undefined ? this._length : arguments[0];

	      this._offset += count;
	    }

	    /**
	     * 次があるかを調べます
	     * @return {boolean} 次があるかの真偽値を返します
	     */

	  }, {
	    key: 'hasNext',
	    value: function hasNext() {

	      return this._offset < this.total;
	    }
	    /**
	     * Ajax success callback, next()を実行し offset 値をカウントアップし callback method があれば実行します
	     * @param {Result} result Ajax成功結果
	     */

	  }, {
	    key: 'success',
	    value: function success(result) {

	      this.next();
	      // success
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Offset.prototype), 'success', this).call(this, result);
	    }

	    /**
	     *
	     * @return {number|*} total件数を返します
	     */

	  }, {
	    key: 'total',
	    get: function get() {
	      return this._total;
	    }

	    /**
	     * total件数を設定します
	     * @param {Number} total total件数
	     */
	    ,
	    set: function set(total) {
	      this._total = total;
	    }
	  }]);
	  return Offset;
	}(_Action2.Action);

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(82)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    _again = false;
	    if (object === null) object = Function.prototype;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        desc = parent = undefined;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	__webpack_require__(84);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(9);

	__webpack_require__(69)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 14:49
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Pickup = undefined;

	var _getPrototypeOf = __webpack_require__(65);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(70);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(79);

	var _Api = __webpack_require__(55);

	var _Result = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Home pickup(slider)
	 */

	var Pickup = exports.Pickup = function (_Action) {
	  (0, _inherits3.default)(Pickup, _Action);

	  /**
	   * Home pickup(slider) データを取得します
	   * types: Api.home() を使用します
	   */

	  function Pickup() {
	    (0, _classCallCheck3.default)(this, Pickup);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Pickup).call(this, _Api.Api.home()));
	  }

	  /**
	   * Ajax API url を作成します
	   * Api.home().url/pickup?offset=0&length=5
	   * @returns {string} pickup API url を返します
	   */

	  (0, _createClass3.default)(Pickup, [{
	    key: 'url',
	    value: function url() {

	      return this._types.url + '/pickup?offset=0&length=5';
	    }

	    /**
	     * Ajax success callback
	     * @param {Result} result Ajax成功結果
	     */

	  }, {
	    key: 'success',
	    value: function success(result) {

	      // success
	      console.log('result: ' + result);
	    }

	    /**
	     * Ajax error callback
	     * @param {Error} error Ajax失敗結果
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      // error
	      console.log('error: ' + error);
	    }
	  }]);
	  return Pickup;
	}(_Action2.Action);

/***/ }
/******/ ])));