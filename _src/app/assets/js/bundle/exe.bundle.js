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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016-02-17 18:47:02
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 * @requires UT
	 *
	 */
	'use strict';

	var _Page = __webpack_require__(1);

	_Page.Page.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/15 - 21:16
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
	exports.Page = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _PageTop = __webpack_require__(37);

	var _Index = __webpack_require__(39);

	var _Category = __webpack_require__(42);

	var _Single = __webpack_require__(43);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;
	var Router = UT.app.Router;

	/**
	 * <h3>ページ振り分け</h3>
	 * 全て static です
	 */

	var Page = exports.Page = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Page(target) {
	    (0, _classCallCheck3.default)(this, Page);

	    if (_symbol !== target) {

	      throw new Error('Page is static Class. not use new Page().');
	    }
	  }
	  /**
	   * Page 初期化, UT.app.Router event を listen します
	   */

	  (0, _createClass3.default)(Page, null, [{
	    key: 'init',
	    value: function init() {

	      var router = Router.factory();

	      // index
	      router.on(Router.INDEX, Page.index);
	      // category
	      router.on(Router.CATEGORY, Page.category);
	      // single(detail|p)
	      router.on(Router.SINGLE, Page.single);

	      router.route();

	      var pageTop = new _PageTop.PageTop();
	      pageTop.init();
	    }
	    /**
	     * home, index page
	     */

	  }, {
	    key: 'index',
	    value: function index() {
	      _Index.Index.start();
	    }
	    /**
	     * category page
	     * @param {Object} event Router event object
	     */

	  }, {
	    key: 'category',
	    value: function category(event) {

	      var slug = event.slug;
	      var type = event.slugType;

	      _Category.Category.start(slug, type);
	    }
	    /**
	     * single, detail page
	     * @param {Object} event Router event object
	     */

	  }, {
	    key: 'single',
	    value: function single(event) {

	      var articleId = event.id;

	      _Single.Single.start(articleId);
	    }
	  }, {
	    key: 'comment',
	    value: function comment() {}
	  }, {
	    key: 'search',
	    value: function search() {}
	  }, {
	    key: 'signup',
	    value: function signup() {}
	  }, {
	    key: 'login',
	    value: function login() {}
	  }, {
	    key: 'logout',
	    value: function logout() {}
	  }, {
	    key: 'password',
	    value: function password() {}
	  }, {
	    key: 'passwordResetting',
	    value: function passwordResetting() {}
	  }, {
	    key: 'mypage',
	    value: function mypage() {}
	  }, {
	    key: 'activities',
	    value: function activities() {}
	  }, {
	    key: 'notifications',
	    value: function notifications() {}
	  }, {
	    key: 'settings',
	    value: function settings() {}
	  }, {
	    key: 'interest',
	    value: function interest() {}
	  }, {
	    key: 'social',
	    value: function social() {}
	  }, {
	    key: 'deactivate',
	    value: function deactivate() {}
	  }]);
	  return Page;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _defineProperty = __webpack_require__(4);

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(36);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(6)
	  , global         = __webpack_require__(10)
	  , has            = __webpack_require__(11)
	  , DESCRIPTORS    = __webpack_require__(12)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(18)
	  , $fails         = __webpack_require__(13)
	  , shared         = __webpack_require__(21)
	  , setToStringTag = __webpack_require__(22)
	  , uid            = __webpack_require__(24)
	  , wks            = __webpack_require__(23)
	  , keyOf          = __webpack_require__(25)
	  , $names         = __webpack_require__(30)
	  , enumKeys       = __webpack_require__(31)
	  , isArray        = __webpack_require__(32)
	  , anObject       = __webpack_require__(33)
	  , toIObject      = __webpack_require__(26)
	  , createDesc     = __webpack_require__(20)
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

	  if(DESCRIPTORS && !__webpack_require__(35)){
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
/* 10 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(13)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(10)
	  , core      = __webpack_require__(15)
	  , ctx       = __webpack_require__(16)
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
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(17);
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
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(12) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(6).setDesc
	  , has = __webpack_require__(11)
	  , TAG = __webpack_require__(23)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(21)('wks')
	  , uid    = __webpack_require__(24)
	  , Symbol = __webpack_require__(10).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(6)
	  , toIObject = __webpack_require__(26);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27)
	  , defined = __webpack_require__(29);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(28);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(26)
	  , getNames  = __webpack_require__(6).getNames
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(6);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(28);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(34);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 36 */
/***/ function(module, exports) {

	

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/17 - 18:14
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
	exports.PageTop = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TweenLite = self.TweenLite;
	var easing = self.com.greensock.easing;

	/**
	 * page top に戻る
	 */

	var PageTop = exports.PageTop = function () {
	  /**
	   * page top に戻る motion
	   */

	  function PageTop() {
	    (0, _classCallCheck3.default)(this, PageTop);

	    this._boundComplete = this.onComplete.bind(this);
	    this._can = true;
	  }
	  /**
	   * click event を bind します
	   */

	  (0, _createClass3.default)(PageTop, [{
	    key: 'init',
	    value: function init() {
	      _Dom.Dom.pageTop().addEventListener('click', this.onClick.bind(this), false);
	    }
	    /**
	     * element event handler
	     * @param {Event} event native event, click event
	     */

	  }, {
	    key: 'onClick',
	    value: function onClick(event) {
	      event.preventDefault();

	      if (!this._can) {
	        return;
	      }

	      var complete = this._boundComplete;
	      this._can = false;

	      TweenLite.to(window, 0.5, {
	        scrollTo: {
	          y: 0,
	          autoKill: false
	        },
	        ease: easing.Power4.easeInOut,
	        onComplete: complete
	      });
	    }
	    /**
	     * page top motion complete
	     */

	  }, {
	    key: 'onComplete',
	    value: function onComplete() {
	      this._can = true;
	    }
	  }]);
	  return PageTop;
	}();

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/16 - 15:59
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
	exports.Dom = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;
	var Safety = UT.data.Safety;

	/**
	 * <h3>React Dom insert container element</h3>
	 * <p>document.getElementById で取得する element</p>
	 * 全て static です
	 */

	var Dom = exports.Dom = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Dom(target) {
	    (0, _classCallCheck3.default)(this, Dom);

	    if (_symbol !== target) {

	      throw new Error('Dom is static Class. not use new Dom().');
	    }
	  }
	  /**
	   * element を取得します
	   * @param {string} id 取得 element id
	   * @return {Element} id から取得した element を返します
	   */

	  (0, _createClass3.default)(Dom, null, [{
	    key: 'get',
	    value: function get(id) {

	      var element = document.getElementById(id);
	      if (!Safety.isElement(element)) {
	        throw new Error('element by ' + id + ' not found.');
	      }

	      return element;
	    }

	    /**
	     * pageTop container
	     * @return {Element} pageTop element を返します
	     */

	  }, {
	    key: 'pageTop',
	    value: function pageTop() {
	      return Dom.get('pageTop');
	    }
	    // header
	    /**
	     * header user profile
	     * @return {Element} 'user-profile-container' element を返します
	     */

	  }, {
	    key: 'profile',
	    value: function profile() {
	      return Dom.get('user-profile-container');
	    }
	    // sidebar
	    /**
	     * sidebar ranking
	     * @return {Element} widget-ranking-container element を返します
	     */

	  }, {
	    key: 'ranking',
	    value: function ranking() {
	      return Dom.get('widget-ranking-container');
	    }
	    /**
	     * sidebar video
	     * @return {Element} widget-recommend-container element を返します
	     */

	  }, {
	    key: 'video',
	    value: function video() {
	      return Dom.get('widget-recommend-container');
	    }
	    // home
	    /**
	     * home slide show(pickup)
	     * @return {Element} pickup-container を返します
	     */

	  }, {
	    key: 'pickup',
	    value: function pickup() {
	      return Dom.get('pickup-container');
	    }
	    /**
	     * home headline 注目の記事
	     * @return {Element} headline-container を返します
	     */

	  }, {
	    key: 'headline',
	    value: function headline() {
	      return Dom.get('headline-container');
	    }
	    // archive / category
	    /**
	     * archive container
	     * @return {Element} board-container を返します
	     */

	  }, {
	    key: 'board',
	    value: function board() {
	      return Dom.get('board-container');
	    }
	    /**
	     * archive container: more button
	     * @return {Element} board-container-more を返します
	     */

	  }, {
	    key: 'boardMore',
	    value: function boardMore() {
	      return Dom.get('board-container-more');
	    }
	    // single
	    /**
	     * single 関連記事
	     * @return {Element} single-related-container を返します
	     */

	  }, {
	    key: 'related',
	    value: function related() {
	      return Dom.get('single-related-container');
	    }
	    /**
	     * single 本文下, tag とか...
	     * @return {Element} single-footer-container を返します
	     */

	  }, {
	    key: 'singleFooter',
	    value: function singleFooter() {
	      return Dom.get('single-footer-container');
	    }
	    /**
	     * single 本文上, title, 投稿者とか...
	     * @return {Element} single-header-container を返します
	     */

	  }, {
	    key: 'singleHeader',
	    value: function singleHeader() {
	      return Dom.get('single-header-container');
	    }
	    /**
	     * single comment, 記事へのコメント
	     * @return {Element} comment-form-container を返します
	     */

	  }, {
	    key: 'commentForm',
	    value: function commentForm() {
	      return Dom.get('comment-form-container');
	    }
	    /**
	     * single comment, 自分のコメント
	     * @return {Element} comment-self-container を返します
	     */

	  }, {
	    key: 'commentSelf',
	    value: function commentSelf() {
	      return Dom.get('comment-self-container');
	    }
	    /**
	     * single comment, 公式コメント
	     * @return {Element} comment-official-container を返します
	     */

	  }, {
	    key: 'commentOfficial',
	    value: function commentOfficial() {
	      return Dom.get('comment-official-container');
	    }
	    /**
	     * single comment, みんなのコメント
	     * @return {Element} comment-normal-container を返します
	     */

	  }, {
	    key: 'commentNormal',
	    value: function commentNormal() {
	      return Dom.get('comment-normal-container');
	    }
	  }]);
	  return Dom;
	}();
	// return Dom.get( '' );

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/15 - 21:37
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
	exports.Index = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Header = __webpack_require__(40);

	var _Sidebar = __webpack_require__(41);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	/**
	 * <h3>Home(index)</h3>
	 * 全て static です
	 */

	var Index = exports.Index = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Index(target) {
	    (0, _classCallCheck3.default)(this, Index);

	    if (_symbol !== target) {

	      throw new Error('Index is static Class. not use new Index().');
	    }
	  }
	  /**
	   * home rendering 開始
	   */

	  (0, _createClass3.default)(Index, null, [{
	    key: 'start',
	    value: function start() {

	      // header
	      _Header.Header.start();

	      // ---------------------------------------------------------
	      // pickup
	      var pickup = new UT.view.home.ViewPickup(_Dom.Dom.pickup());
	      pickup.start();

	      // ---------------------------------------------------------
	      // headline
	      var headline = new UT.view.home.ViewHeadline(_Dom.Dom.headline());
	      headline.start();

	      // ---------------------------------------------------------
	      // news
	      var archiveAction = UT.app.User.sign ? UT.action.home.NewsAuth : UT.action.home.News;
	      var archive = new UT.view.ViewArchiveMasonryInfinite(_Dom.Dom.board(), _Dom.Dom.boardMore(), archiveAction);
	      archive.start();

	      // sidebar, slug なし(=all)
	      _Sidebar.Sidebar.start();
	    }
	  }]);
	  return Index;
	}();

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/15 - 21:39
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
	exports.Header = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	/**
	 * <h3>header user information / signup</h3>
	 * 全て static です
	 */

	var Header = exports.Header = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Header(target) {
	    (0, _classCallCheck3.default)(this, Header);

	    if (_symbol !== target) {

	      throw new Error('Header is static Class. not use new Header().');
	    }
	  }
	  /**
	   * header rendering 開始
	   */

	  (0, _createClass3.default)(Header, null, [{
	    key: 'start',
	    value: function start() {
	      // header.user
	      var headerUser = new UT.view.header.ViewHeaderUser(_Dom.Dom.profile());
	      headerUser.start();
	    }
	  }]);
	  return Header;
	}();

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/15 - 21:44
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
	exports.Sidebar = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	/**
	 * <h3>Sidebar ranking / video 表示</h3>
	 * 全て static です
	 */

	var Sidebar = exports.Sidebar = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Sidebar(target) {
	    (0, _classCallCheck3.default)(this, Sidebar);

	    if (_symbol !== target) {

	      throw new Error('Sidebar is static Class. not use new Sidebar().');
	    }
	  }
	  /**
	   * sidebar ranking / video rendering 開始
	   * @param {string} [slug=all] category slug
	   */

	  (0, _createClass3.default)(Sidebar, null, [{
	    key: 'start',
	    value: function start() {
	      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

	      // ranking
	      var ranking = new UT.view.sidebar.ViewRanking(_Dom.Dom.ranking(), null, slug);
	      ranking.start();

	      // video
	      var videos = new UT.view.sidebar.ViewVideos(_Dom.Dom.video(), null, slug);
	      videos.start();
	    }
	  }]);
	  return Sidebar;
	}();

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/15 - 21:49
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
	exports.Category = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Header = __webpack_require__(40);

	var _Sidebar = __webpack_require__(41);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	/**
	 * <h3>category 一覧</h3>
	 * 全て static です
	 */

	var Category = exports.Category = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Category(target) {
	    (0, _classCallCheck3.default)(this, Category);

	    if (_symbol !== target) {

	      throw new Error('Category is static Class. not use new Category().');
	    }
	  }

	  /**
	   * rendering 開始
	   * @param {string} slug category slug
	   * @param {string} [type=''] ranking | video \ '' の 3つ
	   */

	  (0, _createClass3.default)(Category, null, [{
	    key: 'start',
	    value: function start(slug) {
	      var type = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	      // header
	      _Header.Header.start();

	      // list
	      var archive = new UT.view.ViewCategory(slug, _Dom.Dom.board(), _Dom.Dom.boardMore());
	      archive.start();

	      // sidebar
	      _Sidebar.Sidebar.start(slug);

	      // title
	      console.log('type', slug, type);
	    }
	  }]);
	  return Category;
	}();

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/15 - 21:57
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// import {Header} from './Header';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Single = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Sidebar = __webpack_require__(41);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	var _prepared = 0;
	var _singleDae = null;
	var _userDae = null;
	var _viewSingle = null;
	var _headerUser = null;

	/**
	 * <h3>Single(detail)記事詳細</h3>
	 * 全て static です
	 */

	var Single = exports.Single = function () {
	  function Single(target) {
	    (0, _classCallCheck3.default)(this, Single);

	    if (_symbol !== target) {

	      throw new Error('Single is static Class. not use new Single().');
	    }
	  }
	  /**
	   * 記事詳細, 上部 / 下部 rendering 開始
	   * @param {Number} articleId 記事 Id (:article_id)
	   */

	  (0, _createClass3.default)(Single, null, [{
	    key: 'start',
	    value: function start(articleId) {

	      // header
	      // header.user
	      var headerUser = new UT.view.header.ViewHeaderUser(_Dom.Dom.profile());
	      if (UT.app.User.sign) {

	        // login user はコメント投稿可能 -> 表示アイコン必要
	        _headerUser = headerUser;
	        headerUser.on(UT.view.View.BEFORE_RENDER, Single.onHeader);
	      } else {

	        // 非ログインユーザーはアイコン取得いらない
	        ++_prepared;
	      }

	      headerUser.start();

	      // single page
	      var elements = {
	        related: _Dom.Dom.related(),
	        footer: _Dom.Dom.singleFooter()
	      };

	      var single = new UT.view.ViewSingle(articleId, _Dom.Dom.singleHeader(), elements);
	      _viewSingle = single;
	      single.on(UT.view.View.BEFORE_RENDER, Single.before);
	      single.start();
	    }
	    /**
	     * header View.BEFORE_RENDER event handler
	     * <p>ユーザー: アイコン, Id 取得のために event を bind し情報を取得します</p>
	     * @param {Object} event event object
	     */

	  }, {
	    key: 'onHeader',
	    value: function onHeader(event) {
	      _headerUser.on(UT.view.View.BEFORE_RENDER, Single.onHeader);
	      _userDae = event.args[0];
	      Single.comment();
	    }
	    /**
	     * single View.BEFORE_RENDER event handler
	     * <p>記事所属カテゴリ取得のために event を bind</p>
	     * @param {Object} event event object
	     */

	  }, {
	    key: 'before',
	    value: function before(event) {

	      _viewSingle.off(UT.view.View.BEFORE_RENDER, Single.before);

	      var single = event.args[0];
	      _singleDae = single;

	      var slug = single.category.slug;
	      // let label = single.category.label;

	      // title は backend output

	      // sidebar
	      _Sidebar.Sidebar.start(slug);

	      Single.comment();
	    }
	    /**
	     * **ログイン**
	     * <p>ユーザー情報, 記事 Id 必須</p>
	     *
	     * **非ログイン**
	     * <p>記事 Id 必須</p>
	     */

	  }, {
	    key: 'comment',
	    value: function comment() {
	      ++_prepared;

	      if (_prepared !== 2) {
	        return;
	      }

	      // user icon
	      // _userDae null check
	      //  _userDae.profilePicture undefined check
	      var picture = '';
	      if (_userDae !== null && typeof _userDae.profilePicture !== 'undefined') {
	        picture = _userDae.profilePicture;
	      }

	      // article id
	      var articleId = _singleDae.id;
	      var ViewComments = UT.view.ViewComments;

	      // comment form
	      var commentForm = new UT.view.comment.ViewCommentForm(_Dom.Dom.commentForm(), articleId, picture);
	      commentForm.start();

	      // self
	      var commentSelf = new ViewComments(articleId, _Dom.Dom.commentSelf(), UT.app.const.CommentsType.SELF);
	      if (_userDae !== null) {
	        commentSelf.user = _userDae;
	      }
	      commentSelf.start();

	      // official
	      var official = new ViewComments(articleId, _Dom.Dom.commentOfficial(), UT.app.const.CommentsType.OFFICIAL);
	      if (_userDae !== null) {
	        official.user = _userDae;
	      }
	      official.start();

	      // normal
	      var normal = new ViewComments(articleId, _Dom.Dom.commentNormal(), UT.app.const.CommentsType.NORMAL);
	      if (_userDae !== null) {
	        normal.user = _userDae;
	      }
	      normal.start();
	    }
	  }]);
	  return Single;
	}();

/***/ }
/******/ ]);