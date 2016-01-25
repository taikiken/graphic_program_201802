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

	'use strict';

	var _Loc = __webpack_require__(1);

	var _Format = __webpack_require__(44);

	var _Env = __webpack_require__(53);

	var _Codes = __webpack_require__(54);

	var _Data = __webpack_require__(55);

	var _Form = __webpack_require__(56);

	var _Result = __webpack_require__(57);

	var _Ajax = __webpack_require__(58);

	var _Api = __webpack_require__(59);

	var _Types = __webpack_require__(60);

	var _User = __webpack_require__(65);

	var _Permalink = __webpack_require__(62);

	var _Query = __webpack_require__(64);

	var _Queries = __webpack_require__(67);

	var _Type = __webpack_require__(61);

	var _CommentType = __webpack_require__(68);

	var _App = __webpack_require__(83);

	var _Action = __webpack_require__(84);

	var _Offset = __webpack_require__(85);

	var _Pickup = __webpack_require__(90);

	var _Headline = __webpack_require__(91);

	var _News = __webpack_require__(92);

	var _Category = __webpack_require__(93);

	var _Ranking = __webpack_require__(94);

	var _Videos = __webpack_require__(95);

	var _Widget = __webpack_require__(96);

	var _Bookmark = __webpack_require__(97);

	var _Search = __webpack_require__(98);

	var _Detail = __webpack_require__(99);

	var _ViewArchive = __webpack_require__(100);

	var _ViewHeadline = __webpack_require__(113);

	var _ViewPickup = __webpack_require__(114);

	/**
	 * ToDo: 確認事項
	 * ToDo: 対象外OS alert
	 * ToDo: index ニュース一覧 画像なしの代替画像
	 * ToDo: title, meta, ogp
	 */

	/**
	 * global object
	 * こんな感じで使えます
	 *
	 *    var ut = self.UT
	 */

	// action/single

	// action/bookmark

	// action/archive

	// -------------------------------------
	// app/App

	// -------------------------------------
	// data

	// -------------------------------------
	// app
	/*!
	 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016-01-25 11:31:38
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 * @requires React, Sagen. IE: fetch, es5-promise
	 *
	 */
	// -------------------------------------
	//  main
	//    target for babel compile
	// -------------------------------------

	// -------------------------------------
	// util
	var UT = {
	  version: '1.0.0',
	  app: {
	    Env: _Env.Env,
	    App: _App.App,
	    Codes: _Codes.Codes
	  },
	  data: {
	    Data: _Data.Data,
	    Form: _Form.Form,
	    Result: _Result.Result
	  },
	  util: {
	    Loc: _Loc.Loc,
	    Format: _Format.Format
	  },
	  net: {
	    Ajax: _Ajax.Ajax,
	    Api: _Api.Api,
	    Types: _Types.Types,
	    User: _User.User,
	    types: {
	      Permalink: _Permalink.Permalink,
	      Query: _Query.Query,
	      Queries: _Queries.Queries,
	      Type: _Type.Type,
	      CommentType: _CommentType.CommentType
	    }
	  },
	  action: {
	    Action: _Action.Action,
	    Offset: _Offset.Offset,
	    home: {
	      Pickup: _Pickup.Pickup,
	      Headline: _Headline.Headline,
	      News: _News.News
	    },
	    archive: {
	      Category: _Category.Category,
	      Ranking: _Ranking.Ranking,
	      Videos: _Videos.Videos
	    },
	    sidebar: {
	      Widget: _Widget.Widget
	    },
	    bookmark: {
	      Bookmark: _Bookmark.Bookmark
	    },
	    search: {
	      Search: _Search.Search
	    },
	    single: {
	      Detail: _Detail.Detail
	    }
	  },
	  view: {
	    ViewArchive: _ViewArchive.ViewArchive,
	    home: {
	      ViewHeadline: _ViewHeadline.ViewHeadline,
	      ViewPickup: _ViewPickup.ViewPickup
	    }
	  }
	};

	// -------------------------------------
	// view

	// action/search

	// action/sidebar

	// action/home

	// -------------------------------------
	// action

	// net/types

	// -------------------------------------
	// net

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
	   * search を調べたい時に instance を作成します
	   */

	  function Loc() {
	    (0, _classCallCheck3.default)(this, Loc);

	    this._search = null;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {string} location.hrefを返します
	   */

	  (0, _createClass3.default)(Loc, [{
	    key: 'parse',

	    // ---------------------------------------------------
	    //  METHOD instance
	    // ---------------------------------------------------
	    /**
	     *
	     * @param {string} [search=''] key: value にしたい search型 文字列
	     * @return {Loc} instance を返します
	     */
	    value: function parse() {
	      var search = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      this._search = Loc.parse(search);
	      return this;
	    }

	    /**
	     * search value を keyから探します
	     * @param {string} key search name
	     * @return {*} string|undefined|null で結果を返します
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
	    // ---------------------------------------------------
	    //  METHOD static
	    // ---------------------------------------------------
	    /**
	     * hash(#example)から`#`をとります
	     * @param {string} hash hash文字列
	     * @return {string} hash文字列から#を削除した文字列を返します
	     */

	  }], [{
	    key: 'hashStrip',
	    value: function hashStrip() {
	      var hash = arguments.length <= 0 || arguments[0] === undefined ? Loc.hash : arguments[0];

	      return hash.replace(/^[#\/]|\s+$/g, '');
	    }
	    /**
	     * pathnameを/で分解します
	     * @param {string} [pathname=Loc.pathname] location.pathname, hostなしのpath
	     * @return {Array} pathnameを/で分解し配列にし返します
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
	     * @return {*} search を key: value へ分解し Object で返します
	     */

	  }, {
	    key: 'parse',
	    value: function parse() {
	      var search = arguments.length <= 0 || arguments[0] === undefined ? Loc.search : arguments[0];

	      // 引数が文字でない時は処理しない
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
	     * @return {string} location.pathname(urlからprotocol+hostを除く)を返します
	     */

	  }, {
	    key: 'path',
	    get: function get() {

	      return self.location.pathname;
	    }
	    /**
	     *
	     * @return {string} location.hashを返します
	     */

	  }, {
	    key: 'hash',
	    get: function get() {

	      return self.location.hash;
	    }
	    /**
	     * url の query 文字列
	     * @return {string} url ? 以降の query 文字列を返します, a=xxx&b=yyy
	     */

	  }, {
	    key: 'search',
	    get: function get() {

	      return self.location.search.substring(1);
	    }

	    /**
	     *
	     * @return {string} host name + port number を返します
	     */

	  }, {
	    key: 'host',
	    get: function get() {
	      // host + port number
	      return self.location.host;
	    }

	    /**
	     *
	     * @return {string} host name だけを返します
	     */

	  }, {
	    key: 'hostname',
	    get: function get() {
	      // host only
	      return self.location.hostname;
	    }

	    /**
	     *
	     * @return {string} port number を返します
	     */

	  }, {
	    key: 'port',
	    get: function get() {
	      // port number
	      return self.location.port;
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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Format = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 23:24
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// 日付フォーマットなど...

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>文字フォーマットに関するUtilityです</h3>
	 * 全て static<br>
	 * ** 文字を定型に変換します **
	 */

	var Format = exports.Format = function () {
	  /**
	   * static class です、instance を作成できません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Format(target) {
	    (0, _classCallCheck3.default)(this, Format);

	    if (_symbol !== target) {

	      throw new Error("Format is static Class. not use new Format().");
	    }
	  }
	  /**
	   * ISO8601 日付を 日本語形式に変換します
	   * @param {string} iso ISO8601 日付 "2016-01-14T18:25:45+09:00"
	   * @return {string} 2016年1月14日8時25分45秒 日本語へ変換し返します
	   */

	  (0, _createClass3.default)(Format, null, [{
	    key: "date",
	    value: function date(iso) {

	      // ["2016-01-14T18:25:45", "2016", "01", "14", "18", "25", "45"] 分解
	      var nums = iso.match(/(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)?/);
	      // 先頭"2016-01-14T18:25:45"除去
	      nums.shift();
	      // 数値へ変換し 頭 0 除去, 01 -> 1
	      var numbers = nums.map(function (num) {
	        return parseInt(num, 10);
	      });
	      return numbers[0] + "年" + numbers[1] + "月" + numbers[2] + "日" + numbers[3] + "時" + numbers[4] + "分" + numbers[5] + "秒";
	    }
	  }]);
	  return Format;
	}();

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47);
	__webpack_require__(52);
	module.exports = __webpack_require__(17).Symbol;

/***/ },
/* 47 */
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
	  , keyOf          = __webpack_require__(48)
	  , $names         = __webpack_require__(49)
	  , enumKeys       = __webpack_require__(50)
	  , isArray        = __webpack_require__(51)
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(11);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/21 - 17:23
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
	exports.Env = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _mode = 'production';

	/**
	 * <h3>local test / develop / production を管理します</h3>
	 * 全て static<br>
	 * 動作モードを設定します<br>
	 * <pre>
	 *    production: 実行モード
	 *    develop: 開発モード（ローカルからのテスト）
	 *    test: ローカルテストモード
	 * </pre>
	 */

	var Env = exports.Env = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Env(target) {
	    (0, _classCallCheck3.default)(this, Env);

	    if (_symbol !== target) {

	      throw new Error('Env is static Class. not use new Env().');
	    }
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {string} 現在のモードを返します
	   */

	  (0, _createClass3.default)(Env, null, [{
	    key: 'test',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * ローカルテストモードにします
	     */
	    value: function test() {

	      _mode = Env.TEST;
	    }
	    /**
	     * 開発モードにします
	     */

	  }, {
	    key: 'develop',
	    value: function develop() {

	      _mode = Env.DEVELOP;
	    }
	    /**
	     * 実行モードにします
	     */

	  }, {
	    key: 'production',
	    value: function production() {

	      _mode = Env.PRODUCTION;
	    }
	  }, {
	    key: 'mode',
	    get: function get() {

	      return _mode;
	    }

	    /**
	     * @readonly
	     * @return {string} 文字列 production を返します
	     */

	  }, {
	    key: 'PRODUCTION',
	    get: function get() {
	      return 'production';
	    }
	    /**
	     * @readonly
	     * @return {string} 文字列 production を返します
	     */

	  }, {
	    key: 'DEVELOP',
	    get: function get() {
	      return 'develop';
	    }
	    /**
	     * @readonly
	     * @return {string} 文字列 test を返します
	     */

	  }, {
	    key: 'TEST',
	    get: function get() {
	      return 'test';
	    }
	  }]);
	  return Env;
	}();

/***/ },
/* 54 */
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

	var _symbol2 = __webpack_require__(45);

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

	      throw new Error('Codes is static Class. not use new Codes().');
	    }
	  }
	  /**
	   * @param {int} statusCode サーバーからのレスポンスコード int型
	   * @return {boolean} statusCodeが成功したか(true)失敗(false)を調べ返します
	   */

	  (0, _createClass3.default)(Codes, null, [{
	    key: 'status',
	    value: function status(statusCode) {

	      return statusCode >= 200 && statusCode < 300;
	    }
	    /**
	     * status codeの意味を調べます
	     * @param {Number} code サーバーからのresponse status code
	     * @return {{en: string|*, jp: string|*}} status codeの意味を返します
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/21 - 13:39
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * FormData へ append する key, value
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Data = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Data = exports.Data = function () {
	  /**
	   * Ajax request に使用する FormData へ append する key, value
	   * @param {string} key form key(name)
	   * @param {string} value form value 値
	   */

	  function Data(key, value) {
	    (0, _classCallCheck3.default)(this, Data);

	    this._key = key;
	    this._value = value;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {string|*} form key(name) を返します
	   */

	  (0, _createClass3.default)(Data, [{
	    key: 'key',
	    get: function get() {
	      return this._key;
	    }
	    /**
	     *
	     * @return {string|*} form value 値 を返します
	     */

	  }, {
	    key: 'value',
	    get: function get() {
	      return this._value;
	    }
	  }]);
	  return Data;
	}();

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/17 - 18:20
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
	exports.Form = undefined;

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Data = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * Ajax request で送信する body 要素を作成します
	 */

	var Form = exports.Form = function () {
	  /**
	   * static class です、instance を作成できません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Form(target) {
	    (0, _classCallCheck3.default)(this, Form);

	    if (_symbol !== target) {

	      throw new Error('Form is static Class. not use new Form().');
	    }
	  }

	  /**
	   *
	   * @param {Array<Data>} option [data...] key: value 値 配列
	   * @return {FormData} 引数 option（配列）から作成したFormData instance を返します
	   */

	  (0, _createClass3.default)(Form, null, [{
	    key: 'data',
	    value: function data(option) {

	      // https://developer.mozilla.org/ja/docs/Web/Guide/Using_FormData_Objects
	      var form = new FormData();

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(option), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var data = _step.value;

	          form.append(data.key, data.value);
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

	      return form;
	    }

	    /**
	     * form element から FormData を作成します
	     *
	     * @example
	     * let data = Form.element( document.querySelector("form") )
	     *
	     * @param {Element} formElement form element
	     * @return {FormData} elemet から FormData を作成し返します
	     */

	  }, {
	    key: 'element',
	    value: function element(formElement) {

	      return new FormData(formElement);
	    }
	  }]);
	  return Form;
	}();

/***/ },
/* 57 */
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
	   * Ajax 成功時にdataを保存します<br>
	   * success event handler で結果(Result instance)を受け取れます<br>
	   *
	   * @example
	   * let success = (result) => {
	   *   // response section 取得
	   *   response.response
	   *   // status section 取得
	   *   response.status
	   * }
	   *
	   * @param {{status: *, response: *}} json json パース後データ
	   */

	  function Result(json) {
	    (0, _classCallCheck3.default)(this, Result);

	    this._json = json;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * parsed JSON プロパティ
	   * @return {*} パース済みJSON(Object)を返します
	   */

	  (0, _createClass3.default)(Result, [{
	    key: 'data',
	    get: function get() {

	      return this._json;
	    }
	    /**
	     * 取得 JSON response section
	     * @return {Object|undefined} 取得 JSON response section を返します、見つからない時は undefined を返します
	     */

	  }, {
	    key: 'response',
	    get: function get() {

	      return this.data.response;
	    }
	    /**
	     * 取得 JSON response.articles
	     * @return {Array|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
	     */

	  }, {
	    key: 'articles',
	    get: function get() {

	      var response = this.response;
	      var articles = undefined;
	      // response.articles を調べる
	      // 1. response 存在チェック
	      // 2. response に articles key が存在する
	      // 3. response.articles が配列
	      if (!!response && response.hasOwnProperty('articles') && Array.isArray(response.articles)) {

	        articles = response.articles;
	      }

	      return articles;
	    }
	    /**
	     * 取得 JSON response.count
	     * @return {Number|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
	     */

	  }, {
	    key: 'total',
	    get: function get() {

	      var response = this.response;
	      var total = undefined;

	      if (!!response && response.hasOwnProperty('count')) {

	        total = parseInt(response.count, 10);
	      }

	      return total;
	    }
	    /**
	     * alias total, 取得 JSON response.count
	     * @return {Number|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
	     */

	  }, {
	    key: 'count',
	    get: function get() {
	      return this.total;
	    }
	    /**
	     * 取得 JSON status section
	     * @return {{code: Number, user_massage: string,developer_message: string}|undefined} response.status を返します、見つからない時は undefined を返します
	     */

	  }, {
	    key: 'status',
	    get: function get() {

	      return this.data.status;
	    }
	    /**
	     * request offset, length を返します
	     * @return {{offset: Number, length: Number}|undefined} 取得 JSON request section を返します、見つからない時は undefined を返します
	     */

	  }, {
	    key: 'request',
	    get: function get() {

	      return this.data.request;
	    }
	  }]);
	  return Result;
	}();

/***/ },
/* 58 */
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

	var _Env = __webpack_require__(53);

	var _Codes = __webpack_require__(54);

	var _Result = __webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 非同期通信でJSONを取得します
	 */

	var Ajax = exports.Ajax = function () {
	  /**
	   * Ajax instanceを作成し、実行可能プロパティを可能に設定します
	   */

	  function Ajax() {
	    (0, _classCallCheck3.default)(this, Ajax);

	    // 実行可否判断 flag は trueです
	    this._can = true;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {boolean} 実行可否 flag を返します
	   */

	  (0, _createClass3.default)(Ajax, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     *
	     * @param {string} url request URL
	     * @param {string} method POST|GET...
	     * @param {Function} resolve success callback
	     * @param {Function} reject fail callback
	     * @param {FormData} [formData=null] FormData Object
	     */
	    value: function start(url, method, resolve, reject) {
	      var formData = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

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

	      var option = {
	        method: method,
	        cache: 'no-cache'
	      };

	      // local, develop mode
	      // cross domain set
	      if (_Env.Env.mode !== _Env.Env.PRODUCTION) {

	        option.mode = 'cors';
	      }

	      // body へ FormData をセット
	      if (formData !== null && typeof formData !== 'undefined') {

	        option.body = formData;
	      }

	      // https://github.com/github/fetch
	      // request を開始します
	      fetch(url, option).then(function (response) {

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

	        // 何か問題発生
	        // 注意！Promise が永遠に続くので Dom rendering error でもここに戻る
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
	  }, {
	    key: 'can',
	    get: function get() {

	      return this._can;
	    }
	  }]);
	  return Ajax;
	}();

/***/ },
/* 59 */
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

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Types = __webpack_require__(60);

	var _User = __webpack_require__(65);

	var _ApiDae = __webpack_require__(66);

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

	      throw new Error('Api is static Class. not use new Api().');
	    }
	  }
	  /**
	   * <p>/api/ 前 domain を再生成します<br>
	   * test, develop 切り替えに使用します</p>
	   * <p><code>Api.rebuild()</code>を直接実行することは推奨しません</p>
	   * <code>App.test(), App.develop(), App.production()</code>を使用してください。
	   *
	   * @example
	   * // develop
	   * App.develop();
	   *
	   * // production
	   * App.production();
	   */

	  (0, _createClass3.default)(Api, null, [{
	    key: 'rebuild',
	    value: function rebuild() {

	      _ApiDae.ApiDae.rebuild();
	    }
	    /**
	     * login API を取得します
	     * @return {Types} login API をTypes instanceで返します
	     */

	  }, {
	    key: 'login',
	    value: function login() {

	      return _ApiDae.ApiDae.api('login');
	    }
	    /**
	     * home API を user が login している / していない により取得します
	     * @return {Types} home API(home / self)をTypes instanceで返します
	     */

	  }, {
	    key: 'home',
	    value: function home() {

	      return _User.User.sign ? Api.selfAPi() : Api.homeAPi();
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
	     * @return {Types} category API を Types instance で取得します
	     */

	  }, {
	    key: 'category',
	    value: function category() {

	      return _ApiDae.ApiDae.api('category');
	    }
	    /**
	     * search API を取得します
	     * @return {Types} search API をTypes instanceで返します
	     */

	  }, {
	    key: 'search',
	    value: function search() {

	      return _ApiDae.ApiDae.api('search');
	    }
	    /**
	     * detail API （単一記事）を取得します
	     * @return {Types} detail API をTypes instanceで返します
	     */

	  }, {
	    key: 'detail',
	    value: function detail() {

	      return _ApiDae.ApiDae.api('detail');
	    }
	    /**
	     * bookmark API を取得します
	     * @param {string} [action=add] path option を指定します delete | add
	     * @return {Types} bookmark API をTypes instanceで返します
	     */

	  }, {
	    key: 'bookmark',
	    value: function bookmark() {
	      var action = arguments.length <= 0 || arguments[0] === undefined ? 'add' : arguments[0];

	      // bookmark は 登録 or 削除 機能のみ
	      // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=1840096099
	      switch (action) {
	        case 'delete':
	          return _ApiDae.ApiDae.api('bookmark:delete');

	        case 'add':
	          return _ApiDae.ApiDae.api('bookmark:add');

	        // add | delete 以外の機能をコメントへ
	        // case '':
	        //  return ApiDae.api( 'bookmark' );

	        default:
	          console.warn('bookmark illegal action: ' + action + ', instead use default');
	          return _ApiDae.ApiDae.api('bookmark:add');
	      }
	    }
	    /**
	     * comment API を取得します
	     * @param {string} [action=''] path option を指定します
	     * @return {Types} comment API をTypes instanceで返します
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
	          // 記事詳細でのコメント一覧表示
	          return _ApiDae.ApiDae.api('comment');

	        default:
	          console.warn('comment illegal action: ' + action + ', instead use default');
	          return _ApiDae.ApiDae.api('comment');
	      }
	    }
	    /**
	     * users API を取得します
	     * @param {string} [action=''] path option を指定します
	     * @return {Types} category users をTypes instanceで返します
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
	          // ユーザー詳細
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
/* 60 */
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

	var _Type = __webpack_require__(61);

	var _Permalink = __webpack_require__(62);

	var _Quries = __webpack_require__(63);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * API url, path option, query 情報を保持します
	 */

	var Types = exports.Types = function () {
	  /**
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
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Type} Type instance を返します
	   */

	  (0, _createClass3.default)(Types, [{
	    key: 'type',
	    get: function get() {

	      return this._type;
	    }

	    /**
	     * @return {string} url を返します
	     */

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

	    /**
	     * @return {Permalink} Permalink instance を返します
	     */

	  }, {
	    key: 'permalink',
	    get: function get() {

	      return this._permalink;
	    }

	    /**
	     * @return {Queries} Queries instance を返します
	     */

	  }, {
	    key: 'queries',
	    get: function get() {

	      return this._queries;
	    }

	    /**
	     * @return {boolean} 認証が必要か否かの真偽値を返します。 true: 必要
	     */

	  }, {
	    key: 'auth',
	    get: function get() {

	      return this._auth;
	    }
	  }]);
	  return Types;
	}();

/***/ },
/* 61 */
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
	   * url, method を保存します
	   * @param {string} url API request先
	   * @param {string} [method=GET] 'GET', 'POST', 'PUT', 'DELETE'...
	   */

	  function Type(url) {
	    var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
	    (0, _classCallCheck3.default)(this, Type);

	    this.url = url;
	    this.method = method;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {string} API request先を返します
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
	     * @return {string} POST | GET を返します
	     */

	  }, {
	    key: 'method',
	    get: function get() {

	      return this._method;
	    }

	    /**
	     * 'GET', 'POST', 'PUT', 'DELETE'... を設定します
	     * @param {string} method 'GET', 'POST', 'PUT', 'DELETE'...
	     */
	    ,
	    set: function set(method) {

	      var methodUpper = method.toUpperCase();

	      if (!Type.validate(methodUpper)) {

	        methodUpper = 'GET';
	      }

	      this._method = methodUpper;
	    }
	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
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
/* 62 */
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
	   * @example
	   * new Permalink( [ 'category', '' ] );
	   *
	   * @example
	   * searchのようにどんなワードでも良い場合は "*" を指定する
	   * new Permalink( [ '*' ] );
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
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * オプションパスが必須かのプロパティ
	   * @return {boolean} オプションパスが必須かどうかを返します true: 必須
	   */

	  (0, _createClass3.default)(Permalink, [{
	    key: 'length',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * option path 数
	     * @return {Number} paths数を返します
	     */
	    value: function length() {

	      return this._paths.length;
	    }

	    /**
	     * @param {string} path 調べたいオプションパス
	     * @return {boolean} 指定パスが存在するかの真偽値を返します
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
	  }, {
	    key: 'require',
	    get: function get() {

	      return this._need;
	    }
	  }]);
	  return Permalink;
	}();

/***/ },
/* 63 */
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

	var _Query = __webpack_require__(64);

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
/* 64 */
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
	   * <code>?key=value</code>
	   *
	   * key, value型, default値, 必須情報...
	   *
	   * @param {string} key query key
	   * @param {string} type query value type
	   * @param {string|Number|null} [defaultValue=null] default value, あれば...
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
	   * @return {boolean} query key が存在するかを返します
	   */

	  (0, _createClass3.default)(Query, [{
	    key: 'has',
	    value: function has(key) {

	      return this._key === key;
	    }

	    /**
	     * @param {string} key query key
	     * @return {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
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
/* 65 */
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

	var _symbol2 = __webpack_require__(45);

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
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
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
	     * @return {Number} User id を返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {

	      return _id;
	    }

	    /**
	     * User id を設定します
	     * @param {Number} id User id
	     */
	    ,
	    set: function set(id) {

	      _id = id;
	    }
	  }]);
	  return User;
	}();

/***/ },
/* 66 */
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

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Env = __webpack_require__(53);

	var _Types = __webpack_require__(60);

	var _Type = __webpack_require__(61);

	var _Permalink = __webpack_require__(62);

	var _Queries = __webpack_require__(67);

	var _Query = __webpack_require__(64);

	var _CommentType = __webpack_require__(68);

	var _Loc = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// test mode 時に api アクセス先を 0.0.0.0: + (port +2) へ
	// develop mode
	// - IP: 52.69.203.137
	// - HOST: undotsushin.com
	var apiRoot = function apiRoot(port) {

	  var n = parseInt(port, 10);

	  switch (_Env.Env.mode) {

	    case _Env.Env.TEST:
	      return 'http://0.0.0.0:' + (n + 2);

	    case _Env.Env.DEVELOP:
	      return 'http://undotsushin.com';

	    case _Env.Env.PRODUCTION:
	      return '';

	    default:
	      console.warn('illegal option: ' + _Env.Env.mode + '. instead use production.');
	      return '';

	  }
	};

	var buildPath = function buildPath() {
	  var API_PATH = apiRoot(_Loc.Loc.port) + '/api/v1';

	  return {
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
	    // 'bookmark': new Types(
	    //  new Type( `${API_PATH}/articles/bookmark`, 'POST|DELETE' ),
	    //  new Permalink( [ '*' ], true ),
	    //  new Queries(),
	    //  true
	    // ),
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
	};

	var _symbol = (0, _symbol3.default)();
	var _api = buildPath();

	/**
	 * <h3>Api 詳細情報</h3>
	 * 全てstaticです
	 * <hr>
	 *  <code>/net/Api</code> が呼び出します。<br>
	 *  直接呼び出し使うことは想定されていません。
	 *  <p><code>ApiDae.someMethod</code> を実行しなくてはいけない時は関数設計を見直した方が良いでしょう</p>
	 */

	var ApiDae = exports.ApiDae = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function ApiDae(target) {
	    (0, _classCallCheck3.default)(this, ApiDae);

	    if (_symbol !== target) {

	      throw new Error('ApiDae is static Class. not use new ApiDae().');
	    }
	  }
	  /**
	   * <p>/api/ 前 domain を再生成します<br>
	   * develop, production 切り替えに使用します</p>
	   * <p>**注意** 変更の必要がある時は
	   * <code>App.develop(), App.production()</code>
	   * を使用してください</p>
	   */

	  (0, _createClass3.default)(ApiDae, null, [{
	    key: 'rebuild',
	    value: function rebuild() {
	      _api = buildPath();
	    }
	    /**
	     * api list を取得します
	     * @return {Object} 全ての API list を返します
	     */

	  }, {
	    key: 'all',
	    value: function all() {

	      return _api;
	    }
	    /**
	     * 指定キー情報を取得します
	     * @param {string} key api key を指定します
	     * @return {Types} key に基づいた Types instance を返します
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
/* 67 */
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

	var _Query = __webpack_require__(64);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Query{key: value} を配列で管理します
	 */

	var Queries = exports.Queries = function () {
	  /**
	   * Query 情報を保持します
	   * @param {Array<Query>} [queries=[]] Query{key: value} 配列
	   */

	  function Queries() {
	    var queries = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    (0, _classCallCheck3.default)(this, Queries);

	    this._queries = queries;
	  }

	  /**
	   * queries個数であるかないかの判断は可能
	   * @return {Number} queries個数を返します
	   */

	  (0, _createClass3.default)(Queries, [{
	    key: 'length',
	    value: function length() {

	      return this._queries.length;
	    }

	    /**
	     * @return {Array.<Query>} 全てのqueriesを返します
	     */

	  }, {
	    key: 'all',
	    value: function all() {

	      return this._queries;
	    }

	    /**
	     * key から query を探します
	     * @param {string} key query key name, ?start=0 の start
	     * @return {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
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
/* 68 */
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

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Query2 = __webpack_require__(64);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事詳細でのコメント一覧表示のリクエスト・オプションです
	 */

	var CommentType = exports.CommentType = function (_Query) {
	  (0, _inherits3.default)(CommentType, _Query);

	  /**
	   * <code>/api/1/comments/artice/{:article_id}[/type]</code>
	   * <pre>
	   * 取得するコメントタイプ
	   * - なし    : すべてのユーザーのコメント
	   * - normal : 通常ユーザーのコメント
	   * - official : 公式ユーザーのコメント
	   * - self : 自分のコメント
	   * - [commend_id] : 特定のコメントのみ
	   * </pre>
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
	   * @return {boolean} query key が存在するかを返します
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	module.exports = __webpack_require__(17).Object.getPrototypeOf;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(72);

	__webpack_require__(73)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 73 */
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = __webpack_require__(75);

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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(45)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(77)["default"];

	var _Object$setPrototypeOf = __webpack_require__(79)["default"];

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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(81);
	module.exports = __webpack_require__(17).Object.setPrototypeOf;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(15);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(82).set});

/***/ },
/* 82 */
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 13:39
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
	exports.App = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Env = __webpack_require__(53);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3> application 共通項目を管理します</h3>
	 * 全て static です
	 */

	var App = exports.App = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function App(target) {
	    (0, _classCallCheck3.default)(this, App);

	    if (_symbol !== target) {

	      throw new Error('App is static Class. not use new App().');
	    }
	  }

	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * <p>**Api 接続先** を変更します</p>
	   * ローカルテストモードにします<br>
	   * localhost/api へ接続します<br>
	   * 使用しないでください
	   */

	  (0, _createClass3.default)(App, null, [{
	    key: 'test',
	    value: function test() {

	      _Env.Env.test();
	      _Api.Api.rebuild();
	    }
	    /**
	     * <p>**Api 接続先** を変更します</p>
	     * 開発モードにします<br>
	     * local から <code>http://undotsushin.com</code> へ API リクエストを行います<br>
	     * 開発中はこちらをお使いください
	     */

	  }, {
	    key: 'develop',
	    value: function develop() {

	      _Env.Env.develop();
	      _Api.Api.rebuild();
	    }
	    /**
	     * <p>**Api 接続先** を変更します</p>
	     * 実行モードにします<br>
	     * デフォルトです
	     */

	  }, {
	    key: 'production',
	    value: function production() {

	      _Env.Env.production();
	      _Api.Api.rebuild();
	    }
	  }]);
	  return App;
	}();

/***/ },
/* 84 */
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

	var _Result = __webpack_require__(57);

	var _Ajax = __webpack_require__(58);

	var _Types = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// interface
	// 基本機能を設定し Interface として使用します

	/**
	 * Ajax 処理を行います<br>
	 * Template Pattern として使用します<br>
	 * 各 Class で extends します
	 */

	var Action = exports.Action = function () {
	  /**
	   * Ajax 処理, query なし<br>
	   * 1回だけのリクエストに使用します
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
	    this._url = types.url;
	    this._method = types.method;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * url を作成します
	   * @return {string} 作成した url を返します
	   */

	  (0, _createClass3.default)(Action, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * Ajax request を開始します
	     * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
	     */
	    value: function start() {
	      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

	      this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this));
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
	  }, {
	    key: 'url',
	    get: function get() {
	      return this._url;
	    }

	    /**
	     * @return {string|*} method, GET|POST|DELETE|PUT... を返します
	     */

	  }, {
	    key: 'method',
	    get: function get() {
	      return this._method;
	    }
	  }]);
	  return Action;
	}();

/***/ },
/* 85 */
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

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(86);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Result = __webpack_require__(57);

	var _Action2 = __webpack_require__(84);

	var _Types = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Ajax 処理を行います<br>
	 * Template Pattern として使用します<br>
	 * 各 Class で extends して下さい
	 */

	var Offset = exports.Offset = function (_Action) {
	  (0, _inherits3.default)(Offset, _Action);

	  /**
	   * Ajax 処理, queryあり<br>
	   * **Next 読込** がある時に使用します
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
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Number|*} total件数を返します
	   */

	  (0, _createClass3.default)(Offset, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * start を使わずに next を使用します
	     * @override
	     * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
	     */
	    value: function start() {
	      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

	      // this._ajax.start( this.url, method, this.success.bind( this ), this.fail.bind( this ) );
	      console.warn('instead use next, ' + this.url + ', ' + method);
	    }
	    /**
	     * offset 値を加算します
	     * @param {Number} [count] default 値は this._length になります。 Ajax 成功後 次のリクエスト前に Offset.next() し加算します。
	     */

	  }, {
	    key: 'update',
	    value: function update() {
	      var count = arguments.length <= 0 || arguments[0] === undefined ? this._length : arguments[0];

	      this.offset += count;
	    }
	    /**
	     * 次があるかを調べます
	     * @return {boolean} 次があるかの真偽値を返します
	     */

	  }, {
	    key: 'hasNext',
	    value: function hasNext() {

	      // _total === -1 の時は常に true
	      // total が offset（次の読み込み開始位置）より小さい時に true
	      return this._total < 0 ? true : this.offset < this.total;
	    }
	    /**
	     * 次の読込を開始します<br>
	     * start の代わりに使用します
	     * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
	     */

	  }, {
	    key: 'next',
	    value: function next() {
	      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

	      // next data があるかないかを調べます
	      // next がある時は Ajax を実行します
	      if (this.hasNext()) {

	        this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this));
	      }
	    }
	    /**
	     * Ajax success callback, update()を実行し offset 値をカウントアップし callback method があれば実行します
	     * @param {Result} result Ajax成功結果
	     */

	  }, {
	    key: 'success',
	    value: function success(result) {

	      this.update();
	      // success
	      (0, _get3.default)((0, _getPrototypeOf2.default)(Offset.prototype), 'success', this).call(this, result);
	    }
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
	    /**
	     * @return {Number|*} lengths 取得件数を返します
	     */

	  }, {
	    key: 'length',
	    get: function get() {
	      return this._length;
	    }
	    /**
	     * length件数を設定します
	     * @param {Number} length length 取得件数
	     */
	    ,
	    set: function set(length) {
	      this._length = length;
	    }
	    /**
	     * @return {Number|*} offset 取得開始位置を返します
	     */

	  }, {
	    key: 'offset',
	    get: function get() {
	      return this._offset;
	    }
	    /**
	     * length件数を設定します
	     * @param {Number} offset offset 取得開始位置
	     */
	    ,
	    set: function set(offset) {
	      this._offset = offset;
	    }
	    /**
	     * url を作成します
	     * @return {string} 作成した url を返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this._url + '?offset=' + this.offset + '&length=' + this.length;
	    }
	  }]);
	  return Offset;
	}(_Action2.Action);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(87)["default"];

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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	__webpack_require__(89);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(9);

	__webpack_require__(73)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 90 */
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

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(84);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Home pickup(slider)
	 */

	var Pickup = exports.Pickup = function (_Action) {
	  (0, _inherits3.default)(Pickup, _Action);

	  /**
	   * Home pickup(slider) データを取得します<br>
	   * ** types: Api.home() ** を使用します
	   *
	   * @example
	   * function done( result ) {
	   *    console.log( 'success', result.response );
	   *    console.log( 'success', result.status );
	   *    console.log( 'success', result.request );
	   *  }
	   *
	   * function fail( error ) {
	   *    console.log( 'error', error );
	   *  }
	   *
	   * var headline = new Headline( done, fail );
	   * headline.start();
	   *
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Pickup() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    (0, _classCallCheck3.default)(this, Pickup);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Pickup).call(this, _Api.Api.home(), resolve, reject));
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * Ajax API url を作成します<br>
	   * <code>Api.home().url/pickup?offset=0&length=5</code>
	   * @return {string} pickup API url を返します
	   */

	  (0, _createClass3.default)(Pickup, [{
	    key: 'url',
	    get: function get() {

	      return this._url + '/pickup?offset=0&length=5';
	    }
	  }]);
	  return Pickup;
	}(_Action2.Action);

/***/ },
/* 91 */
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
	exports.Headline = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(84);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Home headline（注目ニュース）
	 */

	var Headline = exports.Headline = function (_Action) {
	  (0, _inherits3.default)(Headline, _Action);

	  /**
	   * Home headline（注目ニュース） データを取得します<br>
	   * ** types: Api.home() ** を使用します
	   *
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Headline() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    (0, _classCallCheck3.default)(this, Headline);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Headline).call(this, _Api.Api.home(), resolve, reject));
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * Ajax API url を作成します<br>
	   * <code>Api.home().url/headline?offset=0&length=6</code>
	   * @return {string} headline API url を返します
	   */

	  (0, _createClass3.default)(Headline, [{
	    key: 'url',
	    get: function get() {

	      return this._url + '/headline?offset=0&length=6';
	    }
	  }]);
	  return Headline;
	}(_Action2.Action);

/***/ },
/* 92 */
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
	exports.News = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Offset2 = __webpack_require__(85);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * home 通常記事一覧
	 */

	var News = exports.News = function (_Offset) {
	  (0, _inherits3.default)(News, _Offset);

	  /**
	   * home 通常記事一覧を取得します<br>
	   * length は取得件数です。
	   * ** default: 10 ** を必要なら変更します
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @param {Number} [offset=0] query offset 値
	   * @param {Number} [length=10] query length 値
	   */

	  function News() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var length = arguments.length <= 3 || arguments[3] === undefined ? 10 : arguments[3];
	    (0, _classCallCheck3.default)(this, News);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(News).call(this, _Api.Api.home(), resolve, reject, offset, length));
	  }

	  return News;
	}(_Offset2.Offset);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/17 - 15:38
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

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Offset2 = __webpack_require__(85);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事一覧, カテゴリー別, 全て...
	 */

	var Category = exports.Category = function (_Offset) {
	  (0, _inherits3.default)(Category, _Offset);

	  /**
	   * 記事一覧を取得します
	   * @param {string} [slug=all] category slug です
	   * @param {string} [type=''] request type, '' | 'ranking' | 'video' です
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Category() {
	    var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
	    var type = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	    var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	    (0, _classCallCheck3.default)(this, Category);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Category).call(this, _Api.Api.category(), resolve, reject));

	    _this._slug = slug;
	    _this._type = Category.normalization(type);
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {string|*} category slug を返します
	   */

	  (0, _createClass3.default)(Category, [{
	    key: 'slug',
	    get: function get() {

	      return this._slug;
	    }
	    /**
	     * @return {string|*} request type('', ranking, video) を返します
	     */

	  }, {
	    key: 'type',
	    get: function get() {

	      return this._type;
	    }
	    /**
	     * Ajax API url を作成します
	     * Api.category().url/all|slug[/ranking]?offset=0&length=5
	     * @return {string} API url を返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {

	      if (this.type === '') {

	        // type が empty, 新着順
	        return this._url + '/' + this.slug + '??offset=' + this.offset + '&length=' + this.length;
	      } else {

	        // type が ranking | video
	        return this._url + '/' + this.slug + '/' + this.type + '??offset=' + this.offset + '&length=' + this.length;
	      }
	    }

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * @param {string} type 調べる request type
	     * @return {*} type を正規化(''|ranking|video)し返します
	     */

	  }], [{
	    key: 'normalization',
	    value: function normalization(type) {

	      if (type !== '' && type !== 'ranking' && type !== 'video') {

	        type = '';
	      }

	      return type;
	    }
	  }]);
	  return Category;
	}(_Offset2.Offset);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 14:50
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
	exports.Ranking = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Category2 = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事ランキング
	 */

	var Ranking = exports.Ranking = function (_Category) {
	  (0, _inherits3.default)(Ranking, _Category);

	  /**
	   * 記事ランキングを取得します
	   * @param {string} [slug=all] category slug です
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Ranking() {
	    var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    (0, _classCallCheck3.default)(this, Ranking);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Ranking).call(this, slug, 'ranking', resolve, reject));
	  }

	  return Ranking;
	}(_Category2.Category);

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 14:50
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
	exports.Videos = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Category2 = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 動画一覧
	 */

	var Videos = exports.Videos = function (_Category) {
	  (0, _inherits3.default)(Videos, _Category);

	  /**
	   * 動画一覧を取得します
	   * @param {string} [slug=all] category slug です
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Videos() {
	    var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    (0, _classCallCheck3.default)(this, Videos);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Videos).call(this, slug, 'video', resolve, reject));
	  }

	  return Videos;
	}(_Category2.Category);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/17 - 17:16
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
	exports.Widget = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Ranking = __webpack_require__(94);

	var _Videos = __webpack_require__(95);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>Sidebar, ranking / video 一覧表示</h3>
	 * 全て static
	 * <p><code>Ranking</code>, <code>Videos</code>インスタンスを作成します</p>
	 *
	 * @example
	 * // ranking instance
	 * let ranking = Widget.ranking();
	 * // video instance
	 * let video = Widget.video();
	 */

	var Widget = exports.Widget = function () {
	  /**
	   * static class です、instance を作成できません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Widget(target) {
	    (0, _classCallCheck3.default)(this, Widget);

	    if (_symbol !== target) {

	      throw new Error('Widget is not new Widget().');
	    }
	  }

	  /**
	   * Ranking instance を作成し length を 5にセットします
	   * @param {string} [slug=all] category slug です
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @return {Ranking} Ranking instance を返します
	   */

	  (0, _createClass3.default)(Widget, null, [{
	    key: 'ranking',
	    value: function ranking() {
	      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      var rankings = new _Ranking.Ranking(slug, resolve, reject);
	      rankings.length = 5;
	      return rankings;
	    }

	    /**
	     * Videos instance を作成し length を 5にセットします
	     * @param {string} [slug=all] category slug です
	     * @param {Function} [resolve=null] Ajax 成功時の callback
	     * @param {Function} [reject=null] Ajax 失敗時の callback
	     * @return {Videos} Videos instance を返します
	     */

	  }, {
	    key: 'video',
	    value: function video() {
	      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      var videos = new _Videos.Videos(slug, resolve, reject);
	      videos.length = 5;
	      return videos;
	    }
	  }]);
	  return Widget;
	}();

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/17 - 17:28
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
	exports.Bookmark = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(84);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事のブックマーク登録 / 解除<br>
	 * <code>/api/v1/articles/bookmark/{:article_id}</code>
	 */

	var Bookmark = exports.Bookmark = function (_Action) {
	  (0, _inherits3.default)(Bookmark, _Action);

	  /**
	   * 記事のブックマーク登録 / 解除 を行います
	   * @param {Number|string} id article id 記事ID
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Bookmark(id) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    (0, _classCallCheck3.default)(this, Bookmark);

	    // 記事IDをparseIntはまずいと思う, 頭 0 が消えるから
	    // this._id = parseInt( id, 10 );

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Bookmark).call(this, _Api.Api.bookmark(), resolve, reject));

	    _this._id = id;

	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Number|*} 記事 ID を返します
	   */

	  (0, _createClass3.default)(Bookmark, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * start は使えません, add / remove を使用します
	     * @param {string} method request method
	     */
	    value: function start() {
	      var method = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      console.error('illegal operation, use start with method: ' + method);
	    }
	    /**
	     * 記事のブックマーク登録
	     */

	  }, {
	    key: 'add',
	    value: function add() {

	      this._ajax.start(this.url, 'POST', this.success.bind(this), this.fail.bind(this));
	    }
	    /**
	     * 記事のブックマーク解除
	     */

	  }, {
	    key: 'remove',
	    value: function remove() {

	      this._ajax.start(this.url, 'DELETE', this.success.bind(this), this.fail.bind(this));
	    }
	  }, {
	    key: 'id',
	    get: function get() {
	      return this._id;
	    }
	    /**
	     * url を作成します
	     * @return {string} 作成した url を返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this._url + '/' + this.id;
	    }
	  }]);
	  return Bookmark;
	}(_Action2.Action);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 14:56
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
	exports.Search = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Offset2 = __webpack_require__(85);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事検索を行います
	 */

	var Search = exports.Search = function (_Offset) {
	  (0, _inherits3.default)(Search, _Offset);

	  /**
	   * 検索キーワードを元に記事を検索します<br>
	   * ** types: Api.search() ** を使用します
	   * @param {string} word 検索キーワード
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @param {Number} [offset=0] query offset 値
	   * @param {Number} [length=10] query length 値
	   */

	  function Search(word) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var offset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	    var length = arguments.length <= 4 || arguments[4] === undefined ? 10 : arguments[4];
	    (0, _classCallCheck3.default)(this, Search);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Search).call(this, _Api.Api.search(), resolve, reject, offset, length));

	    _this._word = word;
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * 検索キーワード
	   * @return {string|*} 検索キーワードを返します
	   */

	  (0, _createClass3.default)(Search, [{
	    key: 'word',
	    get: function get() {
	      return this._word;
	    }

	    /**
	     * 検索キーワードを設定します
	     * @param {string} word 検索キーワード
	     */
	    ,
	    set: function set(word) {
	      this._word = word;
	    }
	    /**
	     * url を作成します
	     * @return {string} 作成した url を返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this._url + '/' + this.word + '?offset=' + this.offset + '&length=' + this.length;
	    }
	  }]);
	  return Search;
	}(_Offset2.Offset);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/13 - 14:54
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
	exports.Detail = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(84);

	var _Api = __webpack_require__(59);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事詳細を取得します
	 */

	var Detail = exports.Detail = function (_Action) {
	  (0, _inherits3.default)(Detail, _Action);

	  /**
	   * 記事詳細を記事IDから取得します
	   * @param {Number|String} id 記事ID
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Detail(id) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    (0, _classCallCheck3.default)(this, Detail);

	    // parseInt すると先頭0が消えるのでまずい気がする
	    // this._id = parseInt( id, 10 );

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Detail).call(this, _Api.Api.detail(), resolve, reject));

	    _this._id = id;

	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * url を作成します
	   * @return {string} 作成した url を返します
	   */

	  (0, _createClass3.default)(Detail, [{
	    key: 'url',
	    get: function get() {
	      return this._url + '/' + this.id;
	    }

	    /**
	     * 記事ID
	     * @return {Number|*} 記事IDを返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this._id;
	    }
	  }]);
	  return Detail;
	}(_Action2.Action);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/25 - 10:04
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';
	/*
	View More がある Page
	Home, Category, Search...
	 */

	// app

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewArchive = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(101);

	var _View2 = __webpack_require__(102);

	var _ViewError = __webpack_require__(103);

	var _Headline = __webpack_require__(91);

	var _Result = __webpack_require__(57);

	var _ArticleDae = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// data
	var React = self.React;
	// dae

	// action

	// view

	var ReactDOM = self.ReactDOM;
	/**
	 * <h2>View More がある 表示親クラス</h2>
	 */

	var ViewArchive = exports.ViewArchive = function (_View) {
	  (0, _inherits3.default)(ViewArchive, _View);

	  /**
	   *
	   * @param {Element} element root element, Ajax result を配置する
	   * @param {Element} moreElement more button root element, 'View More' を配置する
	   * @param {*} ActionClass Request 対象の Action Class
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewArchive(element, moreElement, ActionClass) {
	    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    (0, _classCallCheck3.default)(this, ViewArchive);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewArchive).call(this, element, option));

	    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._moreElement = moreElement;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------

	  (0, _createClass3.default)(ViewArchive, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  Method
	    // ---------------------------------------------------
	    /**
	     * Ajax request を開始します
	     */
	    value: function start() {

	      this.action.next();
	    }
	    /**
	     * Ajax response success
	     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
	     */

	  }, {
	    key: 'done',
	    value: function done(result) {

	      var articles = result.articles;

	      if (typeof articles === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        this.executeSafely('undefinedError');
	        this.showError('[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	      } else if (articles.length === 0) {

	        // articles empty
	        // request, JSON 取得に問題は無かったが data が取得できなかった
	        this.executeSafely('emptyError');
	        this.showError('[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。');
	      } else {

	        this.render(articles);
	      }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely('responseError', error);
	      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
	      // this.showError( error.message );
	    }
	    /**
	     * ViewError でエラーコンテナを作成します
	     * @param {string} message エラーメッセージ
	     */

	  }, {
	    key: 'showError',
	    value: function showError() {
	      var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      // ToDo: Error 時の表示が決まったら変更する
	      var error = new _ViewError.ViewError(this.element, this.option, message);
	      error.render();
	    }
	    /**
	     * dom を render します
	     * @param {Array} articles JSON responce.articles
	     */

	  }, {
	    key: 'render',
	    value: function render(articles) {

	      var element = this.element;
	      var moreElement = this.moreElement;
	      var _this = this;

	      // React Class
	      var ArticleDom = React.createClass({
	        displayName: 'ArticleDom',

	        propTypes: {
	          list: React.PropTypes.array.isRequired
	        },
	        render: function render() {

	          var list = this.props.list;
	          var even = [];
	          var odd = [];

	          var ArchiveDom = React.createClass({
	            displayName: 'ArchiveDom',

	            propTypes: {
	              index: React.PropTypes.number.isRequired,
	              id: React.PropTypes.string.isRequired,
	              slug: React.PropTypes.string.isRequired,
	              category: React.PropTypes.string.isRequired,
	              url: React.PropTypes.string.isRequired,
	              date: React.PropTypes.string.isRequired,
	              title: React.PropTypes.string.isRequired,
	              description: React.PropTypes.string.isRequired,
	              thumbnail: React.PropTypes.string.isRequired,
	              mediaType: React.PropTypes.string.isRequired
	            },
	            render: function render() {
	              var p = this.props;
	              console.log('ArchiveDom ', p);
	              return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                  'a',
	                  { href: p.url, id: 'archive-' + p.id, className: 'archive archive-' + p.index },
	                  React.createElement('img', { src: p.thumbnail, alt: p.title }),
	                  React.createElement(
	                    'p',
	                    { className: 'cat cat-' + p.slug },
	                    p.category
	                  ),
	                  React.createElement(
	                    'h3',
	                    { className: 'archive-title' },
	                    p.title
	                  ),
	                  React.createElement(
	                    'p',
	                    { className: 'date' },
	                    p.date
	                  ),
	                  React.createElement(
	                    'p',
	                    null,
	                    p.mediaType
	                  ),
	                  React.createElement(
	                    'p',
	                    null,
	                    p.description
	                  )
	                )
	              );
	            }
	          });

	          var makeDom = function makeDom(dae) {

	            var thumbnail = dae.mediaType === 'image' ? dae.media.images.medium : dae.media.video.thumbnail;
	            thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_MIDDLE;

	            return React.createElement(ArchiveDom, {
	              key: 'archive-' + dae.id,
	              index: dae.index,
	              id: String(dae.id),
	              slug: dae.category.slug,
	              category: dae.category.label,
	              url: dae.url,
	              date: dae.formatDate,
	              title: dae.title,
	              thumbnail: thumbnail,
	              mediaType: dae.mediaType,
	              description: dae.description
	            });
	          };

	          // even / odd setup
	          list.forEach(function (article, i) {

	            var dae = new _ArticleDae.ArticleDae(article);
	            dae.index = i;

	            if (i % 2 === 0) {
	              // even
	              even.push(dae);
	            } else {
	              // odd
	              odd.push(dae);
	            }
	          });

	          // dom
	          return React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'div',
	              { className: 'left' },
	              even.map(function (dae) {
	                return makeDom(dae);
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'right' },
	              odd.map(function (dae) {
	                return makeDom(dae);
	              })
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely('didMount');
	        }
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
	    } // render

	  }, {
	    key: 'moreElement',
	    get: function get() {
	      return this._moreElement;
	    }
	  }]);
	  return ViewArchive;
	}(_View2.View); // class

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/23 - 15:53
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
	exports.Empty = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3> 代替画像パス</h3>
	 * 全て static です
	 */

	var Empty = exports.Empty = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Empty(target) {
	    (0, _classCallCheck3.default)(this, Empty);

	    if (_symbol !== target) {

	      throw new Error('Empty is static Class. not use new Empty().');
	    }
	  }
	  // ---------------------------------------------------
	  //  CONST 代わり
	  // ---------------------------------------------------
	  /**
	   * img thumbnail 代替画像パス<br>
	   * [Ex.] headline, sidebar image...
	   * @readonly
	   * @return {string} 代替画像パス【小】
	   */

	  (0, _createClass3.default)(Empty, null, [{
	    key: 'IMG_SMALL',
	    get: function get() {

	      return 'img/common/empty.jpg';
	    }
	    /**
	     * img thumbnail 代替画像パス<br>
	     * [Ex.] 記事一覧<br>
	     * ToDo: 不要な気がする, 確認する！
	     * @readonly
	     * @return {string} 代替画像パス【中】
	     */

	  }, {
	    key: 'IMG_MIDDLE',
	    get: function get() {

	      return 'img/common/empty.jpg';
	    }
	    /**
	     * video thumbnail 代替画像パス<br>
	     * [Ex.] sidebar video...
	     * @readonly
	     * @return {string} 代替画像パス【小】
	     */

	  }, {
	    key: 'VIDEO_SMALL',
	    get: function get() {

	      return 'img/common/empty.jpg';
	    }
	  }]);
	  return Empty;
	}();

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.View = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 14:37
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// import {Action} from '../action/Action';
	// import {ViewError} from './error/ViewError';

	/**
	 * 表示を行います
	 */

	var View = exports.View = function () {
	  /**
	   * action/Headline を使い Ajax request 後 element へ dom を作成します
	   * @param {Element} element root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function View(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, View);

	    this._element = element;
	    this._option = option;
	    this._action = null;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Element|*} render root element を返します
	   */

	  (0, _createClass3.default)(View, [{
	    key: 'executeSafely',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * option Object に kyeName が存在し型が function かを調べ関数を実行する
	     * @param {string} keyName 存在チェックを行う関数キー名
	     * @param {*} [args=] 実行関数への引数
	     */
	    value: function executeSafely(keyName) {

	      var option = this.option;
	      if (option.hasOwnProperty(keyName) && typeof option[keyName] === 'function') {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        // callback 側で通常の引数として取り出せるように apply します
	        option[keyName].apply(this, args);
	      }
	    }
	  }, {
	    key: 'element',
	    get: function get() {
	      return this._element;
	    }
	    /**
	     *
	     * @return {Object|*} callback handler がセットされたObjectを返します
	     */

	  }, {
	    key: 'option',
	    get: function get() {
	      return this._option;
	    }
	    /**
	     *
	     * @return {*} Action instance を返します
	     */

	  }, {
	    key: 'action',
	    get: function get() {
	      return this._action;
	    }
	  }]);
	  return View;
	}();

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 14:33
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
	exports.ViewError = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(102);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = self.React;
	var ReactDOM = self.ReactDOM;

	/**
	 * エラーメッセージを表示します
	 */

	var ViewError = exports.ViewError = function (_View) {
	  (0, _inherits3.default)(ViewError, _View);

	  /**
	   * エラーメッセージを表示し, componentDidMount callback handler を実行します
	   *
	   * @example
	   * let element = document.getElementById( 'error-dom-parent' );
	   * let afterMount = () => {
	   *  // componentDidMount
	   * }
	   * let option = {
	   *  didMount: afterMount
	   * };
	   * let message = 'error happen.';
	   * let viewError = new ViewError( element, option, message );
	   *
	   * @example
	   * let option = {
	   *  didMount: function() { // didMount },
	   *  undefinedError: function() { // JSONにあるべきキーがない },
	   *  emptyError: function() { // 結果セット配列が空 },
	   *  responseError: function() { // Ajax Error }
	   * };
	   * @param {Element} element render root element
	   * @param {Object} [option={}] callback handler
	   * @param {string} [message=''] 表示エラーメッセージ
	   */

	  function ViewError(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var message = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	    (0, _classCallCheck3.default)(this, ViewError);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewError).call(this, element, option));

	    _this2._message = message;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {string|*} error message を返します
	   */

	  (0, _createClass3.default)(ViewError, [{
	    key: 'render',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * error dom を生成します<br>
	     * <pre>
	     *   <div class="error error-message"></div>
	     * </pre>
	     */
	    value: function render() {

	      var element = this.element;
	      var message = this.message;
	      var _this = this;

	      var ErrorDom = React.createClass({
	        displayName: 'ErrorDom',

	        render: function render() {
	          return React.createElement(
	            'div',
	            { className: 'error error-container' },
	            React.createElement(
	              'div',
	              { className: 'error error-message' },
	              message
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely('errorMount', message);
	        }
	      });

	      ReactDOM.render(React.createElement(ErrorDom, null), element);
	    }
	  }, {
	    key: 'message',
	    get: function get() {
	      return this._message;
	    }
	  }]);
	  return ViewError;
	}(_View2.View);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 17:03
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
	exports.ArticleDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(105);

	var _Format = __webpack_require__(44);

	var _CategoryDae = __webpack_require__(106);

	var _MediaDae = __webpack_require__(107);

	var _UserDae = __webpack_require__(110);

	var _CommentsPopularDae = __webpack_require__(112);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * articles 記事単1データを管理します
	 */

	var ArticleDae = exports.ArticleDae = function () {
	  /**
	   * articles データを管理
	   * @param {Object} [article={}] articles配列にセットされている article 記事1件データ
	   */

	  function ArticleDae() {
	    var article = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, ArticleDae);

	    this._article = article;
	    // article.category
	    this._category = new _CategoryDae.CategoryDae(article.category);
	    // article.media
	    this._media = new _MediaDae.MediaDae(article.media);
	    // article.user
	    this._user = new _UserDae.UserDae(article.user);
	    // article.comments_popular
	    this._popular = new _CommentsPopularDae.CommentsPopularDae(article.comments_popular);

	    // Safety.check, object に key が存在しタイプがあっているかを調べます
	    // comments_count check
	    if (!_Safety.Safety.check(article, 'comments_count', 'number')) {

	      article.comments_count = 0;
	    }
	    // date check
	    if (_Safety.Safety.check(article, 'date')) {

	      article.formatDate = _Format.Format.date(article.date);
	    }

	    this._index = -1;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {number|*|Number} index number を返します, default -1, -1 の時は未設定なので使用してはいけない
	   */

	  (0, _createClass3.default)(ArticleDae, [{
	    key: 'index',
	    get: function get() {
	      return this._index;
	    }

	    /**
	     * index number を設定します
	     * @param {Number} index index number
	     */
	    ,
	    set: function set(index) {
	      this._index = index;
	    }
	    /**
	     * @return {Object|*} article 記事単1データ
	     */

	  }, {
	    key: 'article',
	    get: function get() {
	      return this._article;
	    }
	    /**
	     *
	     * @return {CategoryDae|*} article.category
	     */

	  }, {
	    key: 'category',
	    get: function get() {
	      return this._category;
	    }
	    /**
	     *
	     * @return {Number} article.comments_count
	     */

	  }, {
	    key: 'commentsCount',
	    get: function get() {
	      return parseInt(this.article.comments_count, 10);
	    }
	    /**
	     * @return {CommentsPopularDae|*} article.comments_popular
	     */

	  }, {
	    key: 'commentsPopular',
	    get: function get() {
	      return this._popular;
	    }
	    /**
	     * @return {string} article.date
	     */

	  }, {
	    key: 'date',
	    get: function get() {
	      return this.article.date;
	    }
	    /**
	     * @return {string} article.date を日本語日付に変換し返します
	     */

	  }, {
	    key: 'formatDate',
	    get: function get() {
	      return this.article.formatDate;
	    }
	    /**
	     *
	     * @return {string} article.display_date
	     */

	  }, {
	    key: 'displayDate',
	    get: function get() {
	      return this.article.display_date;
	    }
	    /**
	     *
	     * @return {string} article.description
	     */

	  }, {
	    key: 'description',
	    get: function get() {
	      return this.article.description;
	    }
	    /**
	     *
	     * @return {string} article.id
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.article.id;
	    }
	    /**
	     *
	     * @return {boolean} article.is_bookmarked
	     */

	  }, {
	    key: 'isBookmarked',
	    get: function get() {
	      return this.article.is_bookmarked;
	    }
	    /**
	     *
	     * @return {MediaDae} article.media
	     */

	  }, {
	    key: 'media',
	    get: function get() {
	      return this._media;
	    }
	    /**
	     *
	     * @return {string} article.media_type
	     */

	  }, {
	    key: 'mediaType',
	    get: function get() {
	      return this.article.media_type;
	    }
	    /**
	     *
	     * @return {string} article.title
	     */

	  }, {
	    key: 'title',
	    get: function get() {
	      return this.article.title;
	    }
	    /**
	     *
	     * @return {string} article.url
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.article.url;
	    }
	    /**
	     *
	     * @return {UserDae} article.user
	     */

	  }, {
	    key: 'user',
	    get: function get() {
	      return this._user;
	    }
	  }]);
	  return ArticleDae;
	}();

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 16:49
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
	exports.Safety = undefined;

	var _typeof2 = __webpack_require__(75);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(45);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>データが安全かを調べます</h3>
	 * 全て static
	 */

	var Safety = exports.Safety = function () {
	  /**
	   * static class です、instance を作成できません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Safety(target) {
	    (0, _classCallCheck3.default)(this, Safety);

	    if (_symbol !== target) {

	      throw new Error('Safety is static Class. not use new Safety().');
	    }
	  }

	  /**
	   * object に keyName が存在することと type があっているかを調べます
	   * @param {Object} object 調査対象 Object
	   * @param {string} keyName 調査対象キー名称
	   * @param {string} [type=string] 調査対象型
	   * @return {boolean} 調べた結果を真偽値で返します
	   */

	  (0, _createClass3.default)(Safety, null, [{
	    key: 'check',
	    value: function check(object, keyName) {
	      var type = arguments.length <= 2 || arguments[2] === undefined ? 'string' : arguments[2];

	      return object.hasOwnProperty(keyName) && (0, _typeof3.default)(object[keyName]) === type;
	    }
	  }]);
	  return Safety;
	}();

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 17:08
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * article.category を管理します
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CategoryDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CategoryDae = exports.CategoryDae = function () {
	  /**
	   * article.category を管理します
	   * @param {Object} [category={}]
	   */

	  function CategoryDae() {
	    var category = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, CategoryDae);

	    this._category = category;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Object|*} article.category を返します
	   */

	  (0, _createClass3.default)(CategoryDae, [{
	    key: 'category',
	    get: function get() {
	      return this._category;
	    }
	    /**
	     *
	     * @return {string|undefined} article.category.label を返します
	     */

	  }, {
	    key: 'label',
	    get: function get() {
	      return this.category.label;
	    }
	    /**
	     *
	     * @return {string|undefined} article.category.slug を返します
	     */

	  }, {
	    key: 'slug',
	    get: function get() {
	      return this.category.slug;
	    }
	  }]);
	  return CategoryDae;
	}();

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 17:54
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
	exports.MediaDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _ImagesDae = __webpack_require__(108);

	var _VideoDae = __webpack_require__(109);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.media
	 */

	var MediaDae = exports.MediaDae = function () {
	  /**
	   *
	   * @param {Object} [media={}] article.media
	   */

	  function MediaDae() {
	    var media = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, MediaDae);

	    this._media = media;
	    this._images = new _ImagesDae.ImagesDae(media.images);
	    this._video = new _VideoDae.VideoDae(media.video);
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Object|*} article.media
	   */

	  (0, _createClass3.default)(MediaDae, [{
	    key: 'media',
	    get: function get() {
	      return this._media;
	    }
	    /**
	     *
	     * @return {ImagesDae|*} article.media.images
	     */

	  }, {
	    key: 'images',
	    get: function get() {
	      return this._images;
	    }
	    /**
	     *
	     * @return {VideoDae|*} article.media.video
	     */

	  }, {
	    key: 'video',
	    get: function get() {
	      return this._video;
	    }
	  }]);
	  return MediaDae;
	}();

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 17:57
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * article.media.images
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ImagesDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImagesDae = exports.ImagesDae = function () {
	  /**
	   *
	   * @param {Object} [images={}] article.media.images
	   */

	  function ImagesDae() {
	    var images = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, ImagesDae);

	    this._images = images;
	  }
	  /**
	   *
	   * @return {Object|*} article.media.images
	   */

	  (0, _createClass3.default)(ImagesDae, [{
	    key: 'images',
	    get: function get() {
	      return this._images;
	    }
	    /**
	     *
	     * @return {string} article.media.images.caption
	     */

	  }, {
	    key: 'caption',
	    get: function get() {
	      return this.images.caption;
	    }
	    /**
	     *
	     * @return {string} article.media.images.large
	     */

	  }, {
	    key: 'large',
	    get: function get() {
	      return this.images.large;
	    }
	    /**
	     *
	     * @return {string} article.media.images.medium
	     */

	  }, {
	    key: 'medium',
	    get: function get() {
	      return this.images.medium;
	    }
	    /**
	     *
	     * @return {string} article.media.images.thumbnail
	     */

	  }, {
	    key: 'thumbnail',
	    get: function get() {
	      return this.images.thumbnail;
	    }
	  }]);
	  return ImagesDae;
	}();

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 18:00
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * article.media.video
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VideoDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var VideoDae = exports.VideoDae = function () {
	  function VideoDae() {
	    (0, _classCallCheck3.default)(this, VideoDae);
	  }

	  (0, _createClass3.default)(VideoDae, [{
	    key: 'constaructor',

	    /**
	     *
	     * @param {Object} [video={}] article.media.video
	     */
	    value: function constaructor() {
	      var video = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      this._video = video;
	    }
	    /**
	     *
	     * @return {Object|*} article.media.video
	     */

	  }, {
	    key: 'video',
	    get: function get() {
	      return this._video;
	    }
	    /**
	     *
	     * @return {string} article.media.video.caption
	     */

	  }, {
	    key: 'caption',
	    get: function get() {
	      return this.video.caption;
	    }
	    /**
	     *
	     * @return {string} article.media.video.thumbnail
	     */

	  }, {
	    key: 'thumbnail',
	    get: function get() {
	      return this.video.thumbnail;
	    }
	    /**
	     *
	     * @return {string} article.media.video.url
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.video.return;
	    }
	  }]);
	  return VideoDae;
	}();

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 18:17
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
	exports.UserDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _TypeDae = __webpack_require__(111);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.user
	 */

	var UserDae = exports.UserDae = function () {
	  /**
	   * article.user
	   * @param {Object} [user={}] article.user
	   */

	  function UserDae() {
	    var user = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, UserDae);

	    this._user = user;
	    this._type = new _TypeDae.TypeDae(user.type);
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Object|*} article.user
	   */

	  (0, _createClass3.default)(UserDae, [{
	    key: 'user',
	    get: function get() {
	      return this._user;
	    }
	    /**
	     * @return {TypeDae|*} article.user.type
	     */

	  }, {
	    key: 'type',
	    get: function get() {
	      return this._type;
	    }
	    /**
	     * @return {string} article.user.id
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.user.id;
	    }
	    /**
	     * @return {string} article.user.name
	     */

	  }, {
	    key: 'userName',
	    get: function get() {
	      return this.user.name;
	    }
	    /**
	     * @return {string} article.user.profile_picture
	     */

	  }, {
	    key: 'profilePicture',
	    get: function get() {
	      return this.user.profile_picture;
	    }
	    /**
	     * @return {string} article.user.url
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.user.url;
	    }
	  }]);
	  return UserDae;
	}();

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 18:19
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * article.user.type
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TypeDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TypeDae = exports.TypeDae = function () {
	  /**
	   * article.user.type
	   * @param {Object} [type={}] article.user.type
	   */

	  function TypeDae() {
	    var type = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, TypeDae);

	    this._type = type;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Object|*} article.user.type
	   */

	  (0, _createClass3.default)(TypeDae, [{
	    key: 'type',
	    get: function get() {
	      return this._type;
	    }
	    /**
	     * @return {string|*} article.user.type.id
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.type.id;
	    }
	    /**
	     * @return {string|*} article.user.type.label
	     */

	  }, {
	    key: 'label',
	    get: function get() {
	      return this.type.label;
	    }
	  }]);
	  return TypeDae;
	}();

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 18:31
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * article.comments_popular
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CommentsPopularDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CommentsPopularDae = exports.CommentsPopularDae = function () {
	  /**
	   * article.comments_popular
	   * @param {Array} [comments=[]] article.comments_popular
	   */

	  function CommentsPopularDae() {
	    var comments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    (0, _classCallCheck3.default)(this, CommentsPopularDae);

	    this._comments = comments;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Array|*} article.comments_popular
	   */

	  (0, _createClass3.default)(CommentsPopularDae, [{
	    key: 'comments',
	    get: function get() {
	      return this._comments;
	    }
	    /**
	     * @return {Number} article.comments_popular.length
	     */

	  }, {
	    key: 'length',
	    get: function get() {
	      return this.comments.length;
	    }
	  }]);
	  return CommentsPopularDae;
	}();

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/22 - 13:54
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// app
	// import {App} from '../../app/App';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewHeadline = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(101);

	var _View2 = __webpack_require__(102);

	var _ViewError = __webpack_require__(103);

	var _Headline = __webpack_require__(91);

	var _Result = __webpack_require__(57);

	var _ArticleDae = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// data
	var React = self.React;
	// dae

	// action

	// view

	var ReactDOM = self.ReactDOM;

	/**
	 * home > headline（注目ニュース）を表示します。
	 * <ol>
	 *   <li>JSON取得(Ajax)</li>
	 *   <li>Dom作成 by React</li>
	 * </ol>
	 */

	var ViewHeadline = exports.ViewHeadline = function (_View) {
	  (0, _inherits3.default)(ViewHeadline, _View);

	  /**
	   * action/Headline を使い Ajax request 後 element へ dom を作成します
	   *
	   * @example
	   * let headline;
	   *
	   * function didMount() {
	   *    console.log( 'dom mount' );
	   *  }
	   * function errorMount( error ) {
	   *    console.log( 'dom errorMount', error );
	   *  }
	   * function undefinedError( error ) {
	   *    console.log( 'undefinedError', error );
	   *  }
	   * function emptyError( error ) {
	   *    console.log( 'emptyError', error );
	   *  }
	   * function responseError( error ) {
	   *    console.log( 'responseError', error );
	   *
	   *    headline.showError( 'error message ' + error.name + ', ' + error.message );
	   * }
	   * let option = {
	   *    didMount: didMount,
	   *    errorMount: errorMount,
	   *    undefinedError: undefinedError,
	   *    emptyError: emptyError,
	   *    responseError: responseError
	   *  };
	   *
	   * headline = new UT.view.home.ViewHeadline( document.getElementById('someId'), option );
	   * headline.start();
	   *
	   * @param {Element} element root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewHeadline(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, ViewHeadline);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeadline).call(this, element, option));

	    _this2._action = new _Headline.Headline(_this2.done.bind(_this2), _this2.fail.bind(_this2));

	    return _this2;
	  }
	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(ViewHeadline, [{
	    key: 'start',
	    value: function start() {

	      this.action.start();
	    }
	    /**
	     * Ajax response success
	     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
	     */

	  }, {
	    key: 'done',
	    value: function done(result) {

	      var articles = result.articles;

	      if (typeof articles === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        this.executeSafely('undefinedError');
	        this.showError('[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	      } else if (articles.length === 0) {

	        // articles empty
	        // request, JSON 取得に問題は無かったが data が取得できなかった
	        this.executeSafely('emptyError');
	        this.showError('[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。');
	      } else {

	        this.render(articles);
	      }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely('responseError', error);
	      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
	      // this.showError( error.message );
	    }
	    /**
	     * ViewError でエラーコンテナを作成します
	     * @param {string} message エラーメッセージ
	     */

	  }, {
	    key: 'showError',
	    value: function showError() {
	      var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      // ToDo: Error 時の表示が決まったら変更する
	      var error = new _ViewError.ViewError(this.element, this.option, message);
	      error.render();
	    }
	    /**
	     * dom を render します
	     * @param {Array} articles JSON responce.articles
	     */

	  }, {
	    key: 'render',
	    value: function render(articles) {

	      var element = this.element;
	      var _this = this;

	      // tag block
	      var HeadlineDom = React.createClass({
	        displayName: 'HeadlineDom',

	        propTypes: {
	          index: React.PropTypes.number.isRequired,
	          id: React.PropTypes.string.isRequired,
	          slug: React.PropTypes.string.isRequired,
	          category: React.PropTypes.string.isRequired,
	          url: React.PropTypes.string.isRequired,
	          date: React.PropTypes.string.isRequired,
	          title: React.PropTypes.string.isRequired,
	          thumbnail: React.PropTypes.string.isRequired
	        },
	        render: function render() {
	          var p = this.props;

	          return React.createElement(
	            'a',
	            { href: p.url, id: 'headline-' + p.id, className: 'headline headline-' + p.index },
	            React.createElement('img', { src: p.thumbnail, alt: p.title }),
	            React.createElement(
	              'p',
	              { className: 'cat cat-' + p.slug },
	              p.category
	            ),
	            React.createElement(
	              'h3',
	              { className: 'headline-title' },
	              p.title
	            ),
	            React.createElement(
	              'p',
	              { className: 'date' },
	              p.date
	            )
	          );
	        }
	      });

	      // React Class
	      var ArticleDom = React.createClass({
	        displayName: 'ArticleDom',

	        propTypes: {
	          list: React.PropTypes.array.isRequired
	        },
	        // isRequired なので getDefaultProps がいらない
	        // getDefaultProps: function() {
	        //  return {
	        //    list: []
	        //  };
	        // },
	        render: function render() {

	          var list = this.props.list;

	          return React.createElement(
	            'div',
	            null,
	            list.map(function (article, i) {

	              var dae = new _ArticleDae.ArticleDae(article);
	              var thumbnail = dae.media.images.thumbnail;
	              thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_SMALL;

	              // HeadlineDom instance を使い render
	              return React.createElement(HeadlineDom, {
	                key: 'headline-' + dae.id,
	                index: i,
	                id: String(dae.id),
	                slug: dae.category.slug,
	                category: dae.category.label,
	                url: dae.url,
	                date: dae.formatDate,
	                title: dae.title,
	                thumbnail: thumbnail
	              });
	            })
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely('didMount');
	        }
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
	    } // render

	  }]);
	  return ViewHeadline;
	}(_View2.View);

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/24 - 18:05
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// app
	// import {App} from '../../app/App';
	// import {Empty} from '../../app/Empty';

	// view

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewPickup = undefined;

	var _getPrototypeOf = __webpack_require__(69);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(74);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(102);

	var _ViewError = __webpack_require__(103);

	var _Pickup = __webpack_require__(90);

	var _Result = __webpack_require__(57);

	var _ArticleDae = __webpack_require__(104);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// global object
	// React

	// data
	var React = self.React;
	// dae

	// action

	var ReactDOM = self.ReactDOM;

	// Gasane
	var Polling = self.Gasane.Polling;

	/**
	 * home > pickup（スライダー）を表示します。
	 * <ol>
	 *   <li>JSON取得(Ajax)</li>
	 *   <li>Dom作成 by React</li>
	 * </ol>
	 */

	var ViewPickup = exports.ViewPickup = function (_View) {
	  (0, _inherits3.default)(ViewPickup, _View);

	  /**
	   * action/Pickup を使い Ajax request 後 element へ dom を作成します
	   * @see ViewHeadline
	   * @param {Element} element root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewPickup(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, ViewPickup);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewPickup).call(this, element, option));

	    _this2._action = new _Pickup.Pickup(_this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._index = 0;
	    _this2._last = 0;
	    _this2._waiting = 1000 * 5;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {number|*|Number} slideshow interval milliseconds を返します
	   */

	  (0, _createClass3.default)(ViewPickup, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * Ajax request を開始します
	     */
	    value: function start() {

	      this.action.start();
	    }
	    /**
	     * Ajax response success
	     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
	     */

	  }, {
	    key: 'done',
	    value: function done(result) {

	      var articles = result.articles;

	      if (typeof articles === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        this.executeSafely('undefinedError');
	        this.showError('[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	      } else if (articles.length === 0) {

	        // articles empty
	        // request, JSON 取得に問題は無かったが data が取得できなかった
	        this.executeSafely('emptyError');
	        this.showError('[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。');
	      } else {

	        this._last = articles.length - 1;
	        this.render(articles);
	      }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely('responseError', error);
	      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
	      // this.showError( error.message );
	    }
	    /**
	     * ViewError でエラーコンテナを作成します
	     * @param {string} message エラーメッセージ
	     */

	  }, {
	    key: 'showError',
	    value: function showError() {
	      var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      // ToDo: Error 時の表示が決まったら変更する
	      var error = new _ViewError.ViewError(this.element, this.option, message);
	      error.render();
	    }
	    /**
	     * dom を render します
	     * @param {Array} articles JSON responce.articles
	     */

	  }, {
	    key: 'render',
	    value: function render(articles) {

	      var element = this.element;
	      var last = articles.length - 1;
	      var position = 0;
	      var polling = new Polling(this.waiting);
	      var _this = this;

	      // --------------------------------------------
	      // pager
	      // --------------------------------------------
	      var PickupPager = React.createClass({
	        displayName: 'PickupPager',

	        propTypes: {
	          index: React.PropTypes.number.isRequired,
	          id: React.PropTypes.string.isRequired,
	          length: React.PropTypes.number.isRequired,
	          onPager: React.PropTypes.func.isRequired
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          console.log('click ' + event.target.innerHTML);
	          this.props.onPager(event.target.innerHTML);
	        },
	        render: function render() {
	          var p = this.props;

	          return React.createElement(
	            'li',
	            { id: 'pager-' + p.index },
	            React.createElement(
	              'a',
	              { href: '#pickup-' + p.index,
	                onClick: this.handleClick
	              },
	              React.createElement(
	                'span',
	                null,
	                p.index - p.length
	              )
	            )
	          );
	        }
	      });

	      var Pagers = React.createClass({
	        displayName: 'Pagers',

	        propTypes: {
	          offset: React.PropTypes.number.isRequired,
	          list: React.PropTypes.array.isRequired,
	          onPager: React.PropTypes.func.isRequired
	        },
	        render: function render() {
	          var list = this.props.list;
	          var length = list.length;
	          var offset = this.props.offset;
	          var onPager = this.props.onPager;

	          return React.createElement(
	            'ul',
	            { className: 'pager-list' },
	            list.map(function (article) {

	              var dae = new _ArticleDae.ArticleDae(article);

	              return React.createElement(PickupPager, {
	                key: 'pager-' + dae.id,
	                id: String(dae.id),
	                index: offset++,
	                length: length,
	                onPager: onPager
	              });
	            })
	          );
	        }
	      });

	      // --------------------------------------------
	      // Main Dom
	      // --------------------------------------------

	      // pickup slider images
	      var PickupDom = React.createClass({
	        displayName: 'PickupDom',

	        propTypes: {
	          index: React.PropTypes.number.isRequired,
	          id: React.PropTypes.string.isRequired,
	          slug: React.PropTypes.string.isRequired,
	          category: React.PropTypes.string.isRequired,
	          url: React.PropTypes.string.isRequired,
	          date: React.PropTypes.string.isRequired,
	          title: React.PropTypes.string.isRequired,
	          large: React.PropTypes.string.isRequired
	        },
	        render: function render() {
	          var p = this.props;

	          return React.createElement(
	            'li',
	            { id: 'pickup-' + p.index, className: 'pickup pickup-' + p.index },
	            React.createElement(
	              'a',
	              { href: p.url },
	              React.createElement('img', { src: p.large, alt: p.title }),
	              React.createElement(
	                'p',
	                { className: 'cat cat-' + p.slug },
	                p.category
	              ),
	              React.createElement(
	                'h3',
	                { className: 'pickup-title' },
	                p.title
	              ),
	              React.createElement(
	                'p',
	                { className: 'date' },
	                p.date
	              )
	            )
	          );
	        }
	      });

	      // React Class, pickup dom container
	      var ArticleDom = React.createClass({
	        displayName: 'ArticleDom',

	        // articles 配列を元にDomを作成する
	        propTypes: {
	          list: React.PropTypes.array.isRequired
	        },
	        // initial state を設定します
	        getInitialState: function getInitialState() {
	          return {
	            // default 0
	            index: position
	          };
	        },
	        // next slide
	        updateNext: function updateNext() {
	          // last を超えたら 0 に戻す
	          var n = position + 1;
	          if (n > last) {
	            n = 0;
	          }
	          // change slide
	          this.onJump(n);
	        },
	        // next button click
	        onNext: function onNext(event) {
	          event.preventDefault();
	          console.log('next click');
	          // next action は polling からも使うので関数化し共通化する
	          this.updateNext();
	        },
	        // prev button click
	        onPrev: function onPrev(event) {
	          event.preventDefault();
	          console.log('prev click');
	          // 0 未満になったら last へ戻す
	          var n = position - 1;
	          if (n < 0) {
	            n = last;
	          }
	          // change slide
	          this.onJump(n);
	        },
	        // slide を変更
	        onJump: function onJump(index) {
	          console.log('onJump ', index);
	          // polling reset
	          polling.stop().start();
	          // state update
	          position = index;
	          this.setState({ index: index });
	        },
	        // pager click から呼び出されます
	        onPagerClick: function onPagerClick(index) {
	          console.log('onPagerClick ', index);
	          // 子コンポーネント Pagers -> PickupPager から呼び出される
	          // innerHTML 数値を使うので
	          // Number 型へ変換する
	          this.onJump(index * 1);
	        },

	        // --------------------------------------------
	        // RENDER
	        // --------------------------------------------
	        render: function render() {

	          var list = this.props.list;
	          var count = 0;

	          // slide一つのコンテナ
	          var make = function make(article, i) {

	            var dae = new _ArticleDae.ArticleDae(article);

	            // HeadlineDom instance を使い render
	            // iteration key は index を使う
	            // コンテナを 前後に clone するため article.id が使えない
	            return React.createElement(PickupDom, {
	              key: 'pickup-' + i,
	              index: i,
	              id: String(dae.id),
	              slug: dae.category.slug,
	              category: dae.category.label,
	              url: dae.url,
	              date: dae.formatDate,
	              title: dae.title,
	              large: dae.media.images.large
	            });
	          };

	          // JSX
	          return React.createElement(
	            'div',
	            { className: 'pickup-container slide-' + this.state.index },
	            React.createElement(
	              'div',
	              { className: 'slider-wrapper' },
	              React.createElement(
	                'ul',
	                { className: 'pickup-slider' },

	                // 1.first
	                list.map(function (article) {

	                  return make(article, count++);
	                }),

	                // 2.second clone
	                list.map(function (article) {

	                  return make(article, count++);
	                }),

	                // 3.third clone
	                list.map(function (article) {

	                  return make(article, count++);
	                })
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'pagers-container' },
	              React.createElement(Pagers, {
	                list: articles,
	                offset: articles.length,
	                onPager: this.onPagerClick
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'slider-nav-container' },
	              React.createElement(
	                'div',
	                { id: 'prev' },
	                React.createElement(
	                  'a',
	                  { href: '#prev', onClick: this.onPrev },
	                  'Prev'
	                )
	              ),
	              React.createElement(
	                'div',
	                { id: 'next' },
	                React.createElement(
	                  'a',
	                  { href: '#next', onClick: this.onNext },
	                  'Next'
	                )
	              )
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          // callback
	          _this.executeSafely('didMount');
	          // interval animation
	          // mount 後 animation を開始します
	          // bind はreactが内部的にする（様子） `this.updateNext.bind(this)` は不要
	          polling.on(Polling.PAST, this.updateNext);
	          polling.start();
	        }
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
	    } // render

	  }, {
	    key: 'waiting',
	    get: function get() {
	      return this._waiting;
	    }
	    /**
	     * slideshow interval milliseconds を設定します
	     * @param {Number} milliseconds slideshow interval milliseconds
	     */
	    ,
	    set: function set(milliseconds) {
	      this._waiting = milliseconds;
	    }
	  }]);
	  return ViewPickup;
	}(_View2.View); // class

/***/ }
/******/ ]);