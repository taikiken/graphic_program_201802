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

	var _Format = __webpack_require__(60);

	var _Router = __webpack_require__(61);

	var _Env = __webpack_require__(80);

	var _Codes = __webpack_require__(82);

	var _User = __webpack_require__(78);

	var _Length = __webpack_require__(83);

	var _CommentsType = __webpack_require__(84);

	var _Title = __webpack_require__(85);

	var _Data = __webpack_require__(86);

	var _Form = __webpack_require__(87);

	var _Result = __webpack_require__(88);

	var _Ajax = __webpack_require__(89);

	var _Api = __webpack_require__(90);

	var _Types = __webpack_require__(91);

	var _Permalink = __webpack_require__(93);

	var _Query = __webpack_require__(95);

	var _Queries = __webpack_require__(98);

	var _Type = __webpack_require__(92);

	var _CommentType = __webpack_require__(99);

	var _App = __webpack_require__(100);

	var _Action = __webpack_require__(101);

	var _Offset = __webpack_require__(102);

	var _Pickup = __webpack_require__(107);

	var _Headline = __webpack_require__(108);

	var _News = __webpack_require__(109);

	var _PickupAuth = __webpack_require__(110);

	var _HeadlineAuth = __webpack_require__(113);

	var _NewsAuth = __webpack_require__(114);

	var _Category = __webpack_require__(116);

	var _Ranking = __webpack_require__(117);

	var _Videos = __webpack_require__(118);

	var _Widget = __webpack_require__(119);

	var _Bookmark = __webpack_require__(120);

	var _Search = __webpack_require__(121);

	var _Single = __webpack_require__(122);

	var _UsersSelf = __webpack_require__(123);

	var _Model = __webpack_require__(124);

	var _ModelUsersSelf = __webpack_require__(125);

	var _ModelCategories = __webpack_require__(128);

	var _View = __webpack_require__(132);

	var _ViewHeaderUser = __webpack_require__(133);

	var _ViewArchive = __webpack_require__(143);

	var _ViewArchiveMasonry = __webpack_require__(151);

	var _ViewArchiveMasonryInfinite = __webpack_require__(153);

	var _ViewCategory = __webpack_require__(156);

	var _ViewSingle = __webpack_require__(157);

	var _ViewTitle = __webpack_require__(162);

	var _ViewComments = __webpack_require__(163);

	var _ViewHeadline = __webpack_require__(168);

	var _ViewPickup = __webpack_require__(169);

	var _ViewRanking = __webpack_require__(170);

	var _ViewVideos = __webpack_require__(171);

	var _Receiver = __webpack_require__(172);

	/**
	 * ToDo: 確認事項
	 * ToDo: 対象外OS alert
	 * ToDo: title, meta, ogp
	 */

	/**
	 * global object
	 * **usage**
	 *
	 * @example
	 * var ut = self.UT
	 *
	 * @module UT
	 * @type {Object}
	 */

	// -------------------------------------
	// view

	// action/user

	// action/search

	// action/sidebar

	// -------------------------------------
	// app/App

	// -------------------------------------
	// net
	/*!
	 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016-02-10 16:27:23
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
	    Codes: _Codes.Codes,
	    User: _User.User,
	    Router: _Router.Router,
	    const: {
	      CommentsType: _CommentsType.CommentsType,
	      Title: _Title.Title
	    }
	  },
	  ui: {
	    Receiver: _Receiver.Receiver
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
	      News: _News.News,
	      PickupAuth: _PickupAuth.PickupAuth,
	      HeadlineAuth: _HeadlineAuth.HeadlineAuth,
	      NewsAuth: _NewsAuth.NewsAuth
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
	      Single: _Single.Single
	    },
	    users: {
	      UsersSelf: _UsersSelf.UsersSelf
	    }
	  },
	  view: {
	    View: _View.View,
	    ViewArchive: _ViewArchive.ViewArchive,
	    ViewArchiveMasonry: _ViewArchiveMasonry.ViewArchiveMasonry,
	    ViewArchiveMasonryInfinite: _ViewArchiveMasonryInfinite.ViewArchiveMasonryInfinite,
	    ViewCategory: _ViewCategory.ViewCategory,
	    ViewSingle: _ViewSingle.ViewSingle,
	    ViewTitle: _ViewTitle.ViewTitle,
	    ViewComments: _ViewComments.ViewComments,
	    header: {
	      ViewHeaderUser: _ViewHeaderUser.ViewHeaderUser
	    },
	    sidebar: {
	      ViewRanking: _ViewRanking.ViewRanking,
	      ViewVideos: _ViewVideos.ViewVideos
	    },
	    home: {
	      ViewHeadline: _ViewHeadline.ViewHeadline,
	      ViewPickup: _ViewPickup.ViewPickup
	    }
	  },
	  model: {
	    Model: _Model.Model,
	    users: {
	      ModelUsersSelf: _ModelUsersSelf.ModelUsersSelf
	    },
	    categories: {
	      ModelCategories: _ModelCategories.ModelCategories
	    }
	  }
	};

	// -------------------------------------
	// ui

	// sidebar

	// -------------------------------------
	// model

	// action/single

	// action/bookmark

	// action/archive

	// action/home

	// -------------------------------------
	// action

	// net/types

	// -------------------------------------
	// data

	// -------------------------------------
	// app

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

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// window.location に関する Utility

	/**
	 * location に関する utility
	 */

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

	      search = _Safety.Safety.string(search, '');
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

	      hash = _Safety.Safety.string(hash, Loc.hash);
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

	      pathname = _Safety.Safety.string(pathname, Loc.path);
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

	      search = _Safety.Safety.string(search, Loc.search);
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
	    /**
	     * host が local かを調べます
	     * @return {boolean} host が local の時に true を返します
	     */

	  }, {
	    key: 'isLocal',
	    value: function isLocal() {

	      var host = Loc.host;

	      return host.indexOf('192.168') === 0 || host.indexOf('0.0.0.0') === 0 || host.indexOf('localhost') === 0 || host.indexOf('127.0.0.1') === 0;
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

	var _isInteger = __webpack_require__(45);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _create = __webpack_require__(49);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(51);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

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

	      type = Safety.string(type, 'string');
	      type = type.toLowerCase();

	      if (type === 'array') {

	        return object.hasOwnProperty(keyName) && Array.isArray(object[keyName]);
	      } else {

	        return object.hasOwnProperty(keyName) && (0, _typeof3.default)(object[keyName]) === type;
	      }
	    }
	    /**
	     * 配列かを調べ必ず Array 型を返します
	     * @param {*} [value=[]] 配列かを調べる対象
	     * @return {Array} 必ず配列を返します。引数が配列で無い時は空配列を返します
	     */

	  }, {
	    key: 'array',
	    value: function array() {
	      var value = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	      if (!Array.isArray(value)) {
	        return [].slice(0);
	      }

	      return value;
	    }
	    /**
	     * Objectかを調べ null は {} に変え返します
	     * @param {*} [value={}] Objectかを調べる対象
	     * @return {Object} 必ずObjectを返します。引数が null の時は空Objectを返します
	     */

	  }, {
	    key: 'object',
	    value: function object() {
	      var value = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      if (value === null || typeof value === 'undefined') {
	        value = (0, _create2.default)({});
	      }

	      return value;
	    }
	    /**
	     * string 型かを調べ null の時は default value をセットします
	     * @param {string} value 調査対象
	     * @param {string} defaultValue null の時にセットする値
	     * @return {string} 文字型を返します
	     */

	  }, {
	    key: 'string',
	    value: function string(value, defaultValue) {

	      if (value === null || typeof value === 'undefined') {
	        value = defaultValue;
	      }

	      return value;
	    }
	    /**
	     * integer かを調べ null の時は default value をセットします
	     * @param {Number} value 調査対象
	     * @param {Number} defaultValue null の時にセットする値
	     * @return {Number} Number 型を返します
	     */

	  }, {
	    key: 'integer',
	    value: function integer(value, defaultValue) {

	      if (!(0, _isInteger2.default)(value)) {
	        value = defaultValue;
	      }

	      return value;
	    }
	    /**
	     * Element かどうかを調べます
	     * @param {Element} element
	     * @returns {boolean} Element かどうかの真偽値を返します
	     */

	  }, {
	    key: 'isElement',
	    value: function isElement(element) {
	      return element !== null && typeof element !== 'undefined' && 'appendChild' in element;
	    }
	  }]);
	  return Safety;
	}();

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47);
	module.exports = __webpack_require__(17).Number.isInteger;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(15);

	$export($export.S, 'Number', {isInteger: __webpack_require__(48)});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(37)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(52)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	__webpack_require__(59);
	module.exports = __webpack_require__(17).Symbol;

/***/ },
/* 54 */
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
	  , keyOf          = __webpack_require__(55)
	  , $names         = __webpack_require__(56)
	  , enumKeys       = __webpack_require__(57)
	  , isArray        = __webpack_require__(58)
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
/* 55 */
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
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(11);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	

/***/ },
/* 60 */
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

	var _symbol2 = __webpack_require__(52);

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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/31 - 18:03
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
	exports.Router = undefined;

	var _isInteger = __webpack_require__(45);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _slicedToArray2 = __webpack_require__(62);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _EventDispatcher2 = __webpack_require__(77);

	var _User = __webpack_require__(78);

	var _Loc = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _instance = null;

	/**
	 * <h3>location.pathnameから現在地を調べます</h3>
	 * 全て static です
	 */

	var Router = exports.Router = function (_EventDispatcher) {
	  (0, _inherits3.default)(Router, _EventDispatcher);

	  /**
	   * singleton class です。
	   * **routing** を管理します
	   * @example
	   * var router = Router.factory();
	   *
	   * router.on( Router.INDEX, function() {} );
	   * router.on( Router.SINGLE, function( event ) {
	   *    console.log( event.id );// article id
	   * } );
	   *
	   * router.route();
	   *
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Router(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, Router);

	    if (_symbol !== target) {

	      throw new Error('Router is static Class. not use new Router(). instead Router.factory()');
	    }

	    if (_instance === null) {
	      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Router).call(this));

	      _this2.init(_symbol);
	      _instance = _this2;
	    }
	    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this2, _ret);
	  }
	  /**
	   * inner methodです。呼び出しできません
	   * @param {Symbol} target private を担保する Symbol
	   */

	  (0, _createClass3.default)(Router, [{
	    key: 'init',
	    value: function init(target) {

	      if (_symbol !== target) {
	        throw new Error('init is private method.');
	      }

	      var _this = this;

	      this._rule = {
	        '/': _this.index,
	        '/category/': _this.category.bind(_this),
	        '/p/': _this.single.bind(_this),
	        '/search/': _this.search.bind(_this),
	        '/signup/': _this.signup.bind(_this),
	        '/login/': _this.login.bind(_this),
	        '/logout/': _this.logout.bind(_this),
	        '/reset_password/': _this.password.bind(_this),
	        // '/reset_password/resetting': _this.passwordResetting,
	        '/mypage/': _this.mypage.bind(_this),
	        // '/mypage/activities': _this.activities,
	        '/notifications': _this.notifications.bind(_this),
	        '/settings': _this.settings.bind(_this)
	        // '/settings/interest': _this.interest,
	        // '/settings/social': _this.social,
	        // '/settings/deactivate': _this.deactivate
	      };
	    }
	    /**
	     * <code>location.pathname</code> から経路探索を行います
	     */

	  }, {
	    key: 'route',
	    value: function route() {
	      var rule = this._rule;
	      var path = _Loc.Loc.path;
	      var pathLength = path.length;
	      var found = false;
	      console.log('route ', path, pathLength);
	      if (pathLength !== 1) {

	        for (var key in rule) {

	          if (rule.hasOwnProperty(key)) {

	            var keyLength = key.length;

	            if (keyLength !== 1) {

	              // not kyeLength 1,
	              // 通常 key
	              if (path.substr(0, keyLength) === key) {
	                rule[key]();
	                found = true;
	                break;
	              }
	            } // keyLength
	          } // hasOwnProperty
	        } // for
	      } else {

	          // pathname length が 1 '/'
	          this.index();
	          found = true;
	        }

	      if (!found) {
	        // path pattern に該当しない
	        this.page404();
	      }
	    }
	    /**
	     * 404 not found event fire
	     * @param {string} [fire=''] 発火場所
	     */

	  }, {
	    key: 'page404',
	    value: function page404() {
	      var fire = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      this.dispatch({ type: Router.NOT_FOUND, fire: fire });
	    }
	    /**
	     * 403 forbidden event fire
	     * @param {string} [fire=''] 発火場所
	     */

	  }, {
	    key: 'authorityError',
	    value: function authorityError() {
	      var fire = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	      this.dispatch({ type: Router.AUTHORITY_ERROR, fire: fire });
	    }
	    /**
	     * index (home) page
	     */

	  }, {
	    key: 'index',
	    value: function index() {
	      this.dispatch({ type: Router.INDEX });
	    }
	    /**
	     * category page
	     */

	  }, {
	    key: 'category',
	    value: function category() {
	      var _Loc$path$replace$spl = _Loc.Loc.path.replace('/category/', '').split('/');

	      var _Loc$path$replace$spl2 = (0, _slicedToArray3.default)(_Loc$path$replace$spl, 2);

	      var slug = _Loc$path$replace$spl2[0];
	      var slugType = _Loc$path$replace$spl2[1];

	      if (slug.indexOf('.html') !== -1) {
	        slug = '';
	      }

	      if (slug === '') {
	        slug = 'all';
	      }

	      this.dispatch({ type: Router.CATEGORY, slug: slug, slugType: slugType });
	    }
	    /**
	     * single detail page
	     */

	  }, {
	    key: 'single',
	    value: function single() {
	      // comment, comment reply 振り分け

	      var _Loc$path$replace$spl3 = _Loc.Loc.path.replace('/p/', '').split('/');

	      var _Loc$path$replace$spl4 = (0, _slicedToArray3.default)(_Loc$path$replace$spl3, 4);

	      var articleId = _Loc$path$replace$spl4[0];
	      var comment = _Loc$path$replace$spl4[1];
	      var commentId = _Loc$path$replace$spl4[2];
	      var replyId = _Loc$path$replace$spl4[3];

	      if (!!articleId && (0, _isInteger2.default)(parseInt(articleId, 10))) {

	        // article Id 存在
	        if (comment === 'comment') {

	          // in comment
	          this.comment(articleId, commentId, replyId);
	        } else {

	          // single page
	          this.dispatch({ type: Router.SINGLE, id: articleId });
	        }
	      } else {

	        // article Id ない
	        this.page404('single');
	      }
	    }
	    /**
	     * comment / comment reply page
	     * @param {string} articleId article Id 記事 Id
	     * @param {string} commentId comment Id
	     * @param {string} replyId comment reply Id
	     */

	  }, {
	    key: 'comment',
	    value: function comment(articleId, commentId, replyId) {

	      // articleId 存在チェック済み
	      if (!!commentId && (0, _isInteger2.default)(parseInt(commentId, 10))) {

	        if (!!replyId && (0, _isInteger2.default)(parseInt(replyId, 10))) {

	          // reply Id あり, comment reply page
	          this.dispatch({ type: Router.COMMENT_REPLY, article: articleId, comment: commentId, reply: replyId });
	        } else {

	          // reply Id なし, comment page
	          this.dispatch({ type: Router.COMMENT, article: articleId, comment: commentId, reply: replyId });
	        }
	      } else {

	        // comment Id がない
	        this.page404('comment');
	      }
	    }
	    /**
	     * search 検索 page
	     */

	  }, {
	    key: 'search',
	    value: function search() {
	      var _Loc$path$replace$spl5 = _Loc.Loc.path.replace('/search/', '').split('/');

	      var _Loc$path$replace$spl6 = (0, _slicedToArray3.default)(_Loc$path$replace$spl5, 1);

	      var keyword = _Loc$path$replace$spl6[0];

	      if (!!keyword) {

	        this.dispatch({ type: Router.SEARCH, keyword: keyword });
	      } else {

	        // keyword がない
	        this.page404('search');
	      }
	    }
	    /**
	     * signup / signup interest / signup account page
	     */

	  }, {
	    key: 'signup',
	    value: function signup() {
	      var _Loc$path$replace$spl7 = _Loc.Loc.path.replace('/signup/', '').split('/');

	      var _Loc$path$replace$spl8 = (0, _slicedToArray3.default)(_Loc$path$replace$spl7, 1);

	      var option = _Loc$path$replace$spl8[0];

	      if (option === 'account') {

	        // /signup/account/
	        this.dispatch({ type: Router.SIGNUP_ACCOUNT });
	      } else if (option === 'interest') {

	        // /signup/interest/
	        this.dispatch({ type: Router.SIGNUP_INTEREST });
	      } else {

	        // /signup/
	        this.dispatch({ type: Router.SIGNUP });
	      }
	    }
	    /**
	     * login page
	     */

	  }, {
	    key: 'login',
	    value: function login() {
	      this.dispatch({ type: Router.LOGIN });
	    }

	    /**
	     * logout page
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.dispatch({ type: Router.LOGOUT });
	    }

	    /**
	     * reset_password page
	     */

	  }, {
	    key: 'password',
	    value: function password() {
	      var _Loc$path$replace$spl9 = _Loc.Loc.path.replace('/reset_password/', '').split('/');

	      var _Loc$path$replace$spl10 = (0, _slicedToArray3.default)(_Loc$path$replace$spl9, 1);

	      var option = _Loc$path$replace$spl10[0];

	      if (option === 'resetting') {

	        this.passwordResetting();
	      } else {

	        this.dispatch({ type: Router.RESET_PASSWORD });
	      }
	    }

	    /**
	     * reset_password resetting page
	     */

	  }, {
	    key: 'passwordResetting',
	    value: function passwordResetting() {

	      this.dispatch({ type: Router.RESET_PASSWORD_RESETTING });
	    }
	    /**
	     * mypage
	     */

	  }, {
	    key: 'mypage',
	    value: function mypage() {
	      var _Loc$path$replace$spl11 = _Loc.Loc.path.replace('/mypage/', '').split('/');

	      var _Loc$path$replace$spl12 = (0, _slicedToArray3.default)(_Loc$path$replace$spl11, 1);

	      var activities = _Loc$path$replace$spl12[0];

	      if (activities === 'activities') {

	        this.activities();
	      } else {

	        if (_User.User.sign) {

	          this.dispatch({ type: Router.MYPAGE });
	        } else {

	          this.authorityError('mypage');
	        }
	      }
	    }
	    /**
	     * mypage activities page
	     */

	  }, {
	    key: 'activities',
	    value: function activities() {

	      if (_User.User.sign) {

	        this.dispatch({ type: Router.MYPAGE_ACTIVITIES });
	      } else {

	        this.authorityError('activities');
	      }
	    }
	    /**
	     * notifications page
	     */

	  }, {
	    key: 'notifications',
	    value: function notifications() {

	      if (_User.User.sign) {

	        this.dispatch({ type: Router.NOTIFICATIONS });
	      } else {

	        this.authorityError('notifications');
	      }
	    }
	    /**
	     * settings page
	     */

	  }, {
	    key: 'settings',
	    value: function settings() {
	      var _Loc$path$replace$spl13 = _Loc.Loc.path.replace('/settings/', '').split('/');

	      var _Loc$path$replace$spl14 = (0, _slicedToArray3.default)(_Loc$path$replace$spl13, 1);

	      var option = _Loc$path$replace$spl14[0];

	      switch (option) {

	        case 'interest':
	          this.interest();
	          break;

	        case 'social':
	          this.social();
	          break;

	        case 'deactivate':
	          this.deactivate();
	          break;

	        default:
	          if (_User.User.sign) {
	            this.dispatch({ type: Router.SETTING });
	          } else {
	            this.authorityError('setting');
	          }
	          break;

	      }
	    }
	    /**
	     * settings interest page
	     */

	  }, {
	    key: 'interest',
	    value: function interest() {
	      if (_User.User.sign) {
	        this.dispatch({ type: Router.SETTING_INTEREST });
	      } else {
	        this.authorityError('interest');
	      }
	    }
	    /**
	     * settings social page
	     */

	  }, {
	    key: 'social',
	    value: function social() {
	      if (_User.User.sign) {
	        this.dispatch({ type: Router.SETTING_SOCIAL });
	      } else {
	        this.authorityError('social');
	      }
	    }
	    /**
	     * settings deactivate page
	     */

	  }, {
	    key: 'deactivate',
	    value: function deactivate() {
	      if (_User.User.sign) {
	        this.dispatch({ type: Router.SETTING_DEACTIVATE });
	      } else {
	        this.authorityError('deactivate');
	      }
	    }
	    // ---------------------------------------------------
	    //  const
	    // ---------------------------------------------------
	    /**
	     * event type NOT_FOUND
	     * @return {string} NOT_FOUND を返します
	     */

	  }], [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  static method
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {Router} Router instance を返します
	     */
	    value: function factory() {

	      if (_instance === null) {

	        _instance = new Router(_symbol);
	      }

	      return _instance;
	    }
	    // ---------------------------------------------------
	    //  deprecated, 互換のために残します
	    //  ToDo: 問題ないことが確認できたら削除する
	    // ---------------------------------------------------
	    /**
	     * category page かを調べます
	     * @return {boolean} category page なら true を返します
	     */

	  }, {
	    key: 'isCategory',
	    value: function isCategory() {
	      return _Loc.Loc.path.substr(1, 9) === 'category/';
	    }
	    /**
	     * single page かを調べます
	     * @return {boolean} single page なら true を返します
	     */

	  }, {
	    key: 'isSingle',
	    value: function isSingle() {
	      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
	        var split = _Loc.Loc.path.replace('/p/', '').split('/');
	        if (_Loc.Loc.isLocal()) {
	          split.pop();
	        }
	        return split.length === 1;
	      }
	    }
	    /**
	     * comment page かを調べます
	     * @return {boolean} comment page なら true を返します
	     */

	  }, {
	    key: 'isComment',
	    value: function isComment() {
	      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
	        var split = _Loc.Loc.path.replace('/p/', '').split('/');
	        if (_Loc.Loc.isLocal()) {
	          split.pop();
	        }
	        if (split.length > 1 && split[1] === 'comment') {
	          return split.length === 3;
	        }
	      }
	    }
	    /**
	     * comment replay page かを調べます
	     * @return {boolean} comment replay page なら true を返します
	     */

	  }, {
	    key: 'isReply',
	    value: function isReply() {
	      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
	        var split = _Loc.Loc.path.replace('/p/', '').split('/');
	        if (_Loc.Loc.isLocal()) {
	          split.pop();
	        }
	        if (split.length > 1 && split[1] === 'comment') {
	          return split.length === 4;
	        }
	      }
	    }
	    /**
	     * search page かを調べます
	     * @return {boolean} search page なら true を返します
	     */

	  }, {
	    key: 'isSearch',
	    value: function isSearch() {
	      return _Loc.Loc.path.substr(1, 7) === 'search/';
	    }
	    /**
	     * signup page かを調べます
	     * @return {boolean} signup page なら true を返します
	     */

	  }, {
	    key: 'isSignup',
	    value: function isSignup() {
	      return _Loc.Loc.path.substr(1, 7) === 'signup/';
	    }
	    /**
	     * mypage page かを調べます
	     * @return {boolean} mypage page なら true を返します
	     */

	  }, {
	    key: 'isMypage',
	    value: function isMypage() {
	      return _Loc.Loc.path.substr(1, 7) === 'mypage/';
	    }
	    /**
	     * category slug, type を調べます
	     * @return {{slug: string, type: string}} category slug, type を返します
	     */

	  }, {
	    key: 'category',
	    value: function category() {
	      if (Router.isCategory()) {
	        var _Loc$path$replace$spl15 = _Loc.Loc.path.replace('/category/', '').split('/');

	        var _Loc$path$replace$spl16 = (0, _slicedToArray3.default)(_Loc$path$replace$spl15, 2);

	        var slug = _Loc$path$replace$spl16[0];
	        var type = _Loc$path$replace$spl16[1];

	        if (slug.indexOf('.html') !== -1) {
	          slug = '';
	        }

	        if (slug === '') {
	          slug = 'all';
	        }

	        return {
	          slug: slug,
	          type: type
	        };
	      }
	    }
	    /**
	     * search keyword を調べます
	     * @return {string} 検索キーワードを返します
	     */

	  }, {
	    key: 'keyword',
	    value: function keyword() {
	      if (Router.isSearch()) {
	        var _Loc$path$replace$spl17 = _Loc.Loc.path.replace('/search/', '').split('/');

	        var _Loc$path$replace$spl18 = (0, _slicedToArray3.default)(_Loc$path$replace$spl17, 1);

	        var _keyword = _Loc$path$replace$spl18[0];

	        return _keyword;
	      }
	    }
	    /**
	     * article Id を調べます
	     * @return {string} article Id を返します
	     */

	  }, {
	    key: 'articleId',
	    value: function articleId() {
	      if (Router.isSingle() || Router.isComment() || Router.isReply()) {
	        return _Loc.Loc.path.replace('/p/', '').split('/').shift();
	      }
	    }
	    /**
	     * comment Id を調べます
	     * @return {string} comment Id を返します
	     */

	  }, {
	    key: 'commentId',
	    value: function commentId() {
	      if (Router.isComment()) {
	        return _Loc.Loc.path.replace('/p/', '').split('/')[2];
	      }
	    }
	    /**
	     * reply Id を調べます
	     * @return {string} reply Id を返します
	     */

	  }, {
	    key: 'replyId',
	    value: function replyId() {
	      if (Router.isReply()) {
	        return _Loc.Loc.path.replace('/p/', '').split('/')[3];
	      }
	    }
	  }, {
	    key: 'NOT_FOUND',
	    get: function get() {
	      return 'routeNotFound';
	    }
	    /**
	     * event type AUTHORITY_ERROR
	     * @return {string} AUTHORITY_ERROR を返します
	     */

	  }, {
	    key: 'AUTHORITY_ERROR',
	    get: function get() {
	      return 'routeAuthorityError';
	    }
	    /**
	     * event type INDEX
	     * @return {string} INDEX を返します
	     */

	  }, {
	    key: 'INDEX',
	    get: function get() {
	      return 'routeIndex';
	    }
	    /**
	     * event type CATEGORY
	     * @return {string} CATEGORY を返します
	     */

	  }, {
	    key: 'CATEGORY',
	    get: function get() {
	      return 'routeCategory';
	    }
	    /**
	     * event type SINGLE
	     * @return {string} SINGLE を返します
	     */

	  }, {
	    key: 'SINGLE',
	    get: function get() {
	      return 'routeSingle';
	    }
	    /**
	     * event type COMMENT
	     * @return {string} COMMENT を返します
	     */

	  }, {
	    key: 'COMMENT',
	    get: function get() {
	      return 'routeComment';
	    }
	    /**
	     * event type COMMENT_REPLY
	     * @return {string} COMMENT_REPLY を返します
	     */

	  }, {
	    key: 'COMMENT_REPLY',
	    get: function get() {
	      return 'routeCommentReply';
	    }
	    /**
	     * event type SEARCH
	     * @return {string} SEARCH を返します
	     */

	  }, {
	    key: 'SEARCH',
	    get: function get() {
	      return 'routeSearch';
	    }
	    /**
	     * event type SIGNUP
	     * @return {string} SIGNUP を返します
	     */

	  }, {
	    key: 'SIGNUP',
	    get: function get() {
	      return 'routeSignup';
	    }
	    /**
	     * event type SIGNUP_ACCOUNT
	     * @return {string} SIGNUP_ACCOUNT を返します
	     */

	  }, {
	    key: 'SIGNUP_ACCOUNT',
	    get: function get() {
	      return 'routeSignupAccount';
	    }
	    /**
	     * event type SIGNUP_INTEREST
	     * @return {string} SIGNUP_INTEREST を返します
	     */

	  }, {
	    key: 'SIGNUP_INTEREST',
	    get: function get() {
	      return 'routeSignupInterest';
	    }
	    /**
	     * event type LOGIN
	     * @return {string} LOGIN を返します
	     */

	  }, {
	    key: 'LOGIN',
	    get: function get() {
	      return 'routeLogin';
	    }
	    /**
	     * event type LOGOUT
	     * @return {string} LOGOUT を返します
	     */

	  }, {
	    key: 'LOGOUT',
	    get: function get() {
	      return 'routeLogout';
	    }
	    /**
	     * event type RESET_PASSWORD
	     * @return {string} RESET_PASSWORD を返します
	     */

	  }, {
	    key: 'RESET_PASSWORD',
	    get: function get() {
	      return 'routeResetPassword';
	    }
	    /**
	     * event type RESET_PASSWORD_RESETTING
	     * @return {string} RESET_PASSWORD_RESETTING を返します
	     */

	  }, {
	    key: 'RESET_PASSWORD_RESETTING',
	    get: function get() {
	      return 'routeResetPasswordResetting';
	    }
	    /**
	     * event type MYPAGE
	     * @return {string} MYPAGE を返します
	     */

	  }, {
	    key: 'MYPAGE',
	    get: function get() {
	      return 'routeMypage';
	    }
	    /**
	     * event type MYPAGE_ACTIVITIES
	     * @return {string} MYPAGE_ACTIVITIES を返します
	     */

	  }, {
	    key: 'MYPAGE_ACTIVITIES',
	    get: function get() {
	      return 'routeMypageActivities';
	    }
	    /**
	     * event type NOTIFICATIONS
	     * @return {string} NOTIFICATIONS を返します
	     */

	  }, {
	    key: 'NOTIFICATIONS',
	    get: function get() {
	      return 'routeNotifications';
	    }
	    /**
	     * event type SETTING
	     * @return {string} SETTING を返します
	     */

	  }, {
	    key: 'SETTING',
	    get: function get() {
	      return 'routeSetting';
	    }
	    /**
	     * event type SETTING_INTEREST
	     * @return {string} SETTING_INTEREST を返します
	     */

	  }, {
	    key: 'SETTING_INTEREST',
	    get: function get() {
	      return 'routeSettingInterest';
	    }
	    /**
	     * event type SETTING_SOCIAL
	     * @return {string} SETTING_SOCIAL を返します
	     */

	  }, {
	    key: 'SETTING_SOCIAL',
	    get: function get() {
	      return 'routeSettingSocial';
	    }
	    /**
	     * event type SETTING_DEACTIVATE
	     * @return {string} SETTING_DEACTIVATE を返します
	     */

	  }, {
	    key: 'SETTING_DEACTIVATE',
	    get: function get() {
	      return 'routeSettingDeactivate';
	    }
	  }]);
	  return Router;
	}(_EventDispatcher2.EventDispatcher);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _isIterable2 = __webpack_require__(63);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(32);
	module.exports = __webpack_require__(65);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(39)
	  , ITERATOR  = __webpack_require__(29)('iterator')
	  , Iterators = __webpack_require__(8);
	module.exports = __webpack_require__(17).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	module.exports = __webpack_require__(17).Object.getPrototypeOf;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(69);

	__webpack_require__(70)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 70 */
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = __webpack_require__(51);

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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(49)["default"];

	var _Object$setPrototypeOf = __webpack_require__(73)["default"];

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

	__webpack_require__(75);
	module.exports = __webpack_require__(17).Object.setPrototypeOf;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(15);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(76).set});

/***/ },
/* 76 */
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/29 - 21:12
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * <h2>EventDispatcher</h2>
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EventDispatcher = undefined;

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EventDispatcher = exports.EventDispatcher = function () {
	  /**
	   * custom event を作成し管理します<br>
	   * **extends** して使います。
	   */

	  function EventDispatcher() {
	    (0, _classCallCheck3.default)(this, EventDispatcher);

	    this._listeners = {};
	  }

	  /**
	   * event type に リスナー関数を bind します
	   * @param {string} type event type
	   * @param {Function} listener callback関数
	   */

	  (0, _createClass3.default)(EventDispatcher, [{
	    key: 'on',
	    value: function on(type, listener) {

	      if (listener === null) {
	        // listener が null
	        // 処理しない
	        return;
	      }

	      var listeners = this._listeners;

	      // listeners.type が存在するかを調べます
	      // if ( !listeners[ type ].hasOwnProperty( type ) ) {
	      if (typeof listeners[type] === 'undefined') {

	        // listeners.type が存在しない
	        // listeners.type 新規配列を作成し
	        // listener を配列へ登録します
	        listeners[type] = [];
	        listeners[type].push(listener);
	      } else {

	        // すでに listeners.type が存在する
	        // listeners.type 配列に listener が存在しないならば登録します
	        if (listeners[type].indexOf(listener) === -1) {

	          listeners[type].push(listener);
	        }
	      }
	    }

	    /**
	     * event type からリスナー関数を remove します<br>
	     * 内部処理は一時的に null 設定にします
	     * @param {string} type event type
	     * @param {Function} listener リスナー関数
	     */

	  }, {
	    key: 'off',
	    value: function off(type, listener) {

	      if (listener === null) {
	        // listener が null
	        // 処理しない
	        return;
	      }

	      var listeners = this._listeners;

	      if (typeof listeners[type] === 'undefined') {
	        // listener.type が存在しない
	        // 処理しない
	        return;
	      }

	      var types = listeners[type];

	      // listener の配列位置を調べる
	      var index = types.indexOf(listener);

	      if (index === -1) {
	        // 配列位置が -1, 見つからなかった
	        // 処理しない
	        return;
	      }

	      // すぐに削除するのでは無く null 代入
	      // loop の中で連続で off されると index 位置が変わるとまずい
	      types[index] = null;

	      this.clean(type, types);
	    }

	    /**
	     * 内部関数<br>
	     * リスナーの中をクリンーンにします<br>
	     * リスナーリストが全て null の時に 空配列にします
	     * @param {string} type event type
	     * @param {Array<Function>} types event type に登録されている関数配列
	     */

	  }, {
	    key: 'clean',
	    value: function clean(type, types) {

	      var hasFunction = false;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(types), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var listener = _step.value;

	          if (listener !== null) {
	            hasFunction = true;
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

	      if (!hasFunction) {

	        // null 以外が無い
	        this._listeners[type] = [];
	      }
	    }

	    /**
	     * event type にリスナー関数が登録されているかを調べます
	     * @param {string} type event type
	     * @param {Function} listener リスナー関数
	     * @return {boolean} event type にリスナー関数が登録されているかの真偽値を返します
	     */

	  }, {
	    key: 'has',
	    value: function has(type, listener) {

	      if (listener === null) {
	        // listener が null
	        // 処理しない
	        return false;
	      }

	      var listeners = this._listeners;

	      if (typeof listeners[type] === 'undefined') {
	        // listener.type が存在しない
	        // 処理しない
	        return false;
	      }

	      // 存在チェック
	      return listeners[type].indexOf(listener) !== -1;
	    }
	    /**
	     * イベントを発生させリスナー関数を call します
	     * @param {Object} event type が必須です
	     */

	  }, {
	    key: 'dispatch',
	    value: function dispatch(event) {

	      var listeners = this._listeners;

	      console.log('dispatch ', event);
	      // console.log( 'listeners[ event.type ] ', listeners[ event.type ] );

	      if (typeof listeners[event.type] === 'undefined') {
	        // listener.type が存在しない
	        // 処理しない
	        return;
	      }

	      var types = listeners[event.type];
	      event.target = this;

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(types), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var listener = _step2.value;

	          if (listener !== null && typeof listener === 'function') {
	            // callback apply
	            // 第二引数がObjectの時は call する
	            listener.call(this, event);
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }

	    /**
	     * alias on,
	     * event type に リスナー関数を bind します
	     * @param {string} type event type
	     * @param {Function} listener callback関数
	     */

	  }, {
	    key: 'addEventListener',
	    value: function addEventListener(type, listener) {
	      this.on(type, listener);
	    }
	    /**
	     * alias off,
	     * event type からリスナー関数を remove します
	     * @param {string} type event type
	     * @param {Function} listener リスナー関数
	     */

	  }, {
	    key: 'removeEventListener',
	    value: function removeEventListener(type, listener) {
	      this.off(type, listener);
	    }
	    /**
	     * alias has,
	     * event type にリスナー関数が登録されているかを調べます
	     * @param {string} type event type
	     * @param {Function} listener リスナー関数
	     * @return {boolean} event type にリスナー関数が登録されているかの真偽値を返します
	     */

	  }, {
	    key: 'hasEventListener',
	    value: function hasEventListener(type, listener) {
	      return this.has(type, listener);
	    }
	    /**
	     * alias dispatch,
	     * イベントを発生させリスな関数を call します
	     *
	     * @param {Object} event type が必須です
	     */

	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(event) {
	      this.dispatch(event);
	    }
	  }]);
	  return EventDispatcher;
	}();

/***/ },
/* 78 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Cookie = __webpack_require__(79);

	var _Env = __webpack_require__(80);

	var _UserStatus = __webpack_require__(81);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _sign = false;

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
	    key: 'login',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * ログイン設定をします
	     */
	    value: function login() {
	      User.sign = true;
	    }
	    /**
	     * ログアウト設定をします
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      User.sign = false;
	    }
	  }, {
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

	      if (bool) {

	        _UserStatus.UserStatus.factory().login();
	      } else {

	        _UserStatus.UserStatus.factory().logout();
	      }
	    }
	    /**
	     *
	     * @return {string} token を返します, 見つからない時はnullを返します
	     */

	  }, {
	    key: 'token',
	    get: function get() {

	      if (_sign) {
	        switch (_Env.Env.mode) {

	          case _Env.Env.TEST:
	          case _Env.Env.DEVELOP:
	            // return [ 'fee1a989f120b99cec0f8206d68f6365', '608c8868d866a46fa3ae6566ce62e0be', '7c36cbc887ca4d0035440a3b05005f6f' ][ Math.floor( Math.random() * 3 ) ];
	            return 'fee1a989f120b99cec0f8206d68f6365';

	          case _Env.Env.PRODUCTION:
	          default:
	            return _Cookie.Cookie.item(_Cookie.Cookie.TARGET);

	        }
	      } else {
	        // 非ログインは空文字を返す
	        // debugger
	        // Authorization:OAuth realm=undotsushin.com, oautn_token=
	        return '';
	      }
	    }
	  }]);
	  return User;
	}();

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 18:48
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
	exports.Cookie = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>cookie を取得します</h3>
	 * 全て static です
	 */

	var Cookie = exports.Cookie = function () {
	  /**
	   * <p>取得機能だけを実装しました</p>
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Cookie(target) {
	    (0, _classCallCheck3.default)(this, Cookie);

	    if (_symbol !== target) {

	      throw new Error('Cookie is static Class. not use new Cookie().');
	    }
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {string} cookie key name を返します
	   */

	  (0, _createClass3.default)(Cookie, null, [{
	    key: 'item',

	    /**
	     * cookie value を取得します
	     * @param {string} keyName cookie key name
	     * @return {string|null} cookie 値を返します、取得できない時は null を返します
	     */
	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    value: function item(keyName) {
	      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(keyName).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
	    }
	  }, {
	    key: 'TARGET',
	    get: function get() {
	      return 'COOKIE_NAME';
	    }
	  }]);
	  return Cookie;
	}();

/***/ },
/* 80 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Loc = __webpack_require__(1);

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
	    key: 'local',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * ローカルテスト(vagrant)モードにします
	     */
	    value: function local() {

	      _mode = Env.LOCAL;
	    } /**
	      * ローカルテストモードにします
	      */

	  }, {
	    key: 'test',
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
	    /**
	     * @readonly
	     * @return {string} 文字列 local を返します
	     */

	  }, {
	    key: 'LOCAL',
	    get: function get() {
	      return 'local';
	    }
	  }]);
	  return Env;
	}();

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/02 - 20:54
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
	exports.UserStatus = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _EventDispatcher2 = __webpack_require__(77);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _instance = null;

	/**
	 * ログイン / ログアウト を通知
	 */

	var UserStatus = exports.UserStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(UserStatus, _EventDispatcher);

	  /**
	   * ログイン / ログアウト を通知する SingleTon
	   * @example
	   * var userStatus = UserStatus.factory();
	   *
	   * @param {Symbol} target Singleton を実現するための private symbol
	   * @return {UserStatus} UserStatus インスタンスを返します
	   */

	  function UserStatus(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, UserStatus);

	    if (_symbol !== target) {

	      throw new Error('UserStatus is static Class. not use new UserStatus().');
	    }

	    if (_instance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UserStatus).call(this));

	      _instance = _this;
	    }
	    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  // ---------------------------------------------------
	  //  method
	  // ---------------------------------------------------
	  /**
	   * UserStatus.LOGE_IN event を fire します
	   */

	  (0, _createClass3.default)(UserStatus, [{
	    key: 'login',
	    value: function login() {
	      this.dispatch({ type: UserStatus.LOGE_IN });
	    }
	    /**
	     * UserStatus.LOGE_OUT event を fire します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.dispatch({ type: UserStatus.LOGE_OUT });
	    }
	    // ---------------------------------------------------
	    //  static const
	    // ---------------------------------------------------
	    /**
	     * LOGE_IN event
	     * @return {string} LOGE_IN event type を返します
	     */

	  }], [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  static method
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {UserStatus} UserStatus instance を返します
	     */
	    value: function factory() {

	      if (_instance === null) {

	        _instance = new UserStatus(_symbol);
	      }

	      return _instance;
	    }
	  }, {
	    key: 'LOGE_IN',
	    get: function get() {
	      return 'logIn';
	    }
	    /**
	     * LOGE_OUT event
	     * @return {string} LOGE_OUT event type を返します
	     */

	  }, {
	    key: 'LOGE_OUT',
	    get: function get() {
	      return 'logOut';
	    }
	  }]);
	  return UserStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ },
/* 82 */
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

	var _symbol2 = __webpack_require__(52);

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
	   * <p>status codeからリクエストの成功・失敗を判断します</p>
	   * status code が >= 200 < 300 の間が成功です。
	   * @param {int} statusCode サーバーからのレスポンスコード int型
	   * @return {boolean} statusCodeが成功したか(true)失敗(false)を調べ返します
	   */

	  (0, _createClass3.default)(Codes, null, [{
	    key: 'status',
	    value: function status(statusCode) {

	      return statusCode >= 200 && statusCode < 300;
	    }
	    /**
	     * status codeの意味（メッセージ）を調べます
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
	     * code から 日本語メッセージを調べます
	     * @param {Number} code status code
	     * @return {*} 日本語メッセージを返します
	     */

	  }, {
	    key: 'jp',
	    value: function jp(code) {

	      return _jp[code];
	    }

	    /**
	     * code から 英語メッセージを調べます
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/29 - 16:05
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
	exports.Length = undefined;

	var _isInteger = __webpack_require__(45);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _pickup = 5;
	var _headline = 6;
	var _ranking = 5;
	var _video = 5;
	var _archive = 10;

	/**
	 * <h3>offset length default value</h3>
	 * 全て static です
	 */

	var Length = exports.Length = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Length(target) {
	    (0, _classCallCheck3.default)(this, Length);

	    if (_symbol !== target) {

	      throw new Error('Length is static Class. not use new Length().');
	    }
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Number} pickup default 取得数を返します
	   */

	  (0, _createClass3.default)(Length, null, [{
	    key: 'pickup',
	    get: function get() {
	      return _pickup;
	    }

	    /**
	     * @param {Number} value pickup default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        _pickup = value;
	      } else {
	        throw new Error('pickup: integer required. ' + value);
	      }
	    }

	    /**
	     * @return {Number} headline default 取得数を返します
	     */

	  }, {
	    key: 'headline',
	    get: function get() {
	      return _headline;
	    }
	    /**
	     * @param {Number} value headline default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        _headline = value;
	      } else {
	        throw new Error('headline: integer required. ' + value);
	      }
	    }
	    /**
	     * @return {Number} ranking default 取得数を返します
	     */

	  }, {
	    key: 'ranking',
	    get: function get() {
	      return _ranking;
	    }
	    /**
	     *
	     * @param {Number} value ranking default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        _ranking = value;
	      } else {
	        throw new Error('ranking: integer required. ' + value);
	      }
	    }
	    /**
	     * @return {Number} video default 取得数を返します
	     */

	  }, {
	    key: 'video',
	    get: function get() {
	      return _video;
	    }
	    /**
	     * @param {Number} value video default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        _video = value;
	      } else {
	        throw new Error('video: integer required. ' + value);
	      }
	    }
	    /**
	     * @return {Number} archive default 取得数を返します
	     */

	  }, {
	    key: 'archive',
	    get: function get() {
	      return _archive;
	    }
	    /**
	     * @param {Number} value archive default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        _archive = value;
	      } else {
	        throw new Error('archive: integer required. ' + value);
	      }
	    }
	  }]);
	  return Length;
	}();

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/29 - 18:09
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
	exports.CommentsType = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>コメント種類</h3>
	 * 全て static です
	 */

	var CommentsType = exports.CommentsType = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function CommentsType(target) {
	    (0, _classCallCheck3.default)(this, CommentsType);

	    if (_symbol !== target) {

	      throw new Error('CommentsType is static Class. not use new CommentsType().');
	    }
	  }
	  // ---------------------------------------------------
	  //  static METHOD
	  // ---------------------------------------------------
	  /**
	   * @return {string} comment type 'self' を返します
	   */

	  (0, _createClass3.default)(CommentsType, null, [{
	    key: 'SELF',
	    get: function get() {
	      return 'self';
	    }
	    /**
	     * @return {string} comment type 'normal' を返します
	     */

	  }, {
	    key: 'NORMAL',
	    get: function get() {
	      return 'normal';
	    }
	    /**
	     * @return {string} comment type 'official' を返します
	     */

	  }, {
	    key: 'OFFICIAL',
	    get: function get() {
	      return 'official';
	    }
	    /**
	     * @return {string} comment type '' を返します
	     */

	  }, {
	    key: 'ALL',
	    get: function get() {
	      return '';
	    }
	  }]);
	  return CommentsType;
	}();

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 15:52
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
	exports.Title = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _category = {
	  all: '新着順',
	  ranking: 'ランキング',
	  video: '動画'
	};

	/**
	 * 各ページのタイトル
	 */

	var Title = exports.Title = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Title(target) {
	    (0, _classCallCheck3.default)(this, Title);

	    if (_symbol !== target) {

	      throw new Error('Title is static Class. not use new Title().');
	    }
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {string} 検索キーワード置き換え文字列
	   */

	  (0, _createClass3.default)(Title, null, [{
	    key: 'searchTitle',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * 検索タイトルの雛形 から 検索文字列 を使用しタイトルを生成します
	     * @param {string} keyword 検索文字列
	     * @return {string} 検索タイトルの雛形 から 検索文字列 を使用しタイトルを生成し返します
	     */
	    value: function searchTitle(keyword) {
	      return Title.search.replace(Title.SEARCH_WORD, keyword);
	    }
	    /**
	     *
	     * @param {string} slug category slug, type
	     * @return {*}
	     */

	  }, {
	    key: 'categoryTitle',
	    value: function categoryTitle(slug) {
	      return _category[slug];
	    }
	  }, {
	    key: 'SEARCH_WORD',
	    get: function get() {
	      return '|__SEARCH_WORD__|';
	    }
	    /**
	     * @return {string} カテゴリー slug all のタイトルを返します
	     */

	  }, {
	    key: 'all',
	    get: function get() {
	      return _category.all;
	    }
	    /**
	     * @return {string} カテゴリー type ranking のタイトルを返します
	     */

	  }, {
	    key: 'ranking',
	    get: function get() {
	      return _category.ranking;
	    }
	    /**
	     * @return {string} カテゴリー type video のタイトルを返します
	     */

	  }, {
	    key: 'video',
	    get: function get() {
	      return _category.video;
	    }
	    /**
	     * @return {string} 検索タイトルの雛形を返します
	     */

	  }, {
	    key: 'search',
	    get: function get() {
	      return '「' + Title.SEARCH_WORD + '」の検索結果';
	    }
	  }]);
	  return Title;
	}();

/***/ },
/* 86 */
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
/* 87 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Data = __webpack_require__(86);

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
	     * @return {FormData} element から FormData を作成し返します
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
/* 88 */
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
/* 89 */
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

	var _Env = __webpack_require__(80);

	var _Codes = __webpack_require__(82);

	var _Result = __webpack_require__(88);

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
	     * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
	     * @param {Object} [headers=null] headers option, Authorization token など...
	     * @param {FormData} [formData=null] FormData Object
	     */
	    value: function start(url, method, resolve, reject) {
	      var ResultClass = arguments.length <= 4 || arguments[4] === undefined ? _Result.Result : arguments[4];
	      var headers = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
	      var formData = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];

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

	      // headers option
	      if (headers !== null && typeof headers !== 'undefined') {

	        option.headers = headers;
	        // option.body = JSON.stringify( headers );
	      }

	      console.log('ajax.start: ' + url + ', ' + method, option);

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
	        var result = new ResultClass(json);

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
/* 90 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Types = __webpack_require__(91);

	var _User = __webpack_require__(78);

	var _ApiDae = __webpack_require__(96);

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
	    // ----------------------------------
	    // login / logout
	    /**
	     * login API を取得します
	     * @return {Types} login API をTypes instanceで返します
	     */

	  }, {
	    key: 'login',
	    value: function login() {

	      return _ApiDae.ApiDae.api('users:login');
	    }
	    /**
	     * logout API を取得します
	     * @return {Types} logout API をTypes instanceで返します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {

	      return _ApiDae.ApiDae.api('users:logout');
	    }
	    // ----------------------------------
	    // user add / delete
	    /**
	     * ユーザー登録
	     * @return {Types} ユーザー登録 API をTypes instanceで返します
	     */

	  }, {
	    key: 'join',
	    value: function join() {
	      return _ApiDae.ApiDae.api('users:add');
	    }
	    /**
	     * 退会
	     * @return {Types} 退会 API をTypes instanceで返します
	     */

	  }, {
	    key: 'leave',
	    value: function leave() {
	      return _ApiDae.ApiDae.api('users:delete');
	    }

	    //  /**
	    //   * ユーザー関連の API
	    //   * @param {string} [action=''] action path option を指定します
	    //   * @return {Types}  ユーザー関連の API をTypes instanceで返します
	    //   */
	    /*
	      static user( action:string = '' ):Types {
	    
	        switch ( action ) {
	    
	          case 'edit':
	            return ApiDae.api( 'user:edit' );
	    
	          case 'add':
	            return Api.join();
	    
	          case 'delete':
	            return Api.leave();
	    
	          case '':
	            return ApiDae.api( 'user' );
	    
	          default:
	            console.warn( `user illegal action: ${action}, instead use default` );
	            return ApiDae.api( 'user' );
	    
	        }
	    
	      }
	    */
	    // ----------------------------------
	    // カテゴリー一覧
	    /**
	     *
	     * @return {Types} カテゴリー一覧 API をTypes instanceで返します
	     */

	  }, {
	    key: 'categories',
	    value: function categories() {
	      return _ApiDae.ApiDae.api('categories');
	    }
	    // ----------------------------------
	    // home / self
	    /**
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
	    // ----------------------------------
	    // 記事一覧
	    /**
	     * category API を取得します
	     * @return {Types} category API を Types instance で取得します
	     */

	  }, {
	    key: 'category',
	    value: function category() {

	      return _ApiDae.ApiDae.api('category');
	    }
	    // ----------------------------------
	    // 検索
	    /**
	     * search API を取得します
	     * @return {Types} search API をTypes instanceで返します
	     */

	  }, {
	    key: 'search',
	    value: function search() {

	      return _ApiDae.ApiDae.api('search');
	    }
	    // ----------------------------------
	    // 記事詳細
	    /**
	    /**
	     * detail API （単一記事）を取得します
	     * @return {Types} detail API をTypes instanceで返します
	     */

	  }, {
	    key: 'single',
	    value: function single() {

	      return _ApiDae.ApiDae.api('single');
	    }
	    /**
	     * @deprecated instead use Api.single
	     * @return {Types} detail API をTypes instanceで返します
	     */

	  }, {
	    key: 'detail',
	    value: function detail() {
	      console.warn('Api.detail deprecated. instead use Api.single.');
	      return Api.single();
	    }
	    // ----------------------------------
	    // bookmark
	    /**
	     * bookmark API を取得します
	     * @param {string} action path option を指定します delete | add
	     * @return {Types} bookmark API をTypes instanceで返します
	     */

	  }, {
	    key: 'bookmark',
	    value: function bookmark(action) {

	      // bookmark は 登録 or 削除 機能のみ
	      // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=1840096099
	      switch (action) {
	        case 'delete':
	          return _ApiDae.ApiDae.api('bookmark:delete');

	        case 'add':
	          return _ApiDae.ApiDae.api('bookmark:add');

	        default:
	          throw new Error('bookmark illegal action: ' + action + ',');
	      }
	    }
	    // ----------------------------------
	    // comment
	    /**
	     * comment API を取得します
	     * @param {string} action path option を指定します
	     * @return {Types} comment API をTypes instanceで返します
	     */

	  }, {
	    key: 'comment',
	    value: function comment(action) {

	      switch (action) {

	        case 'official':
	          return _ApiDae.ApiDae.api('comment:official');

	        case 'normal':
	          return _ApiDae.ApiDae.api('comment:normal');

	        case 'self':
	          return _ApiDae.ApiDae.api('comment:self');

	        case 'single':
	          return _ApiDae.ApiDae.api('comment:single');

	        case 'send':
	          return _ApiDae.ApiDae.api('comment:send');

	        case 'reply':
	          return _ApiDae.ApiDae.api('comment:reply');

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
	          // コメント一覧全部
	          return _ApiDae.ApiDae.api('comment');

	        default:
	          console.warn('comment illegal action: ' + action + ', instead use default');
	          return _ApiDae.ApiDae.api('comment');
	      }
	    }

	    // ----------------------------------
	    // my page

	    /**
	     * users API を取得します
	     * @param {string} action path option を指定します
	     * @return {Types} マイページ系 users API を Types instance で返します
	     */

	  }, {
	    key: 'users',
	    value: function users(action) {

	      switch (action) {

	        case 'self':
	          return _ApiDae.ApiDae.api('users:self');

	        case 'id':
	          return _ApiDae.ApiDae.api('users:id');

	        case 'self:bookmark':
	          return _ApiDae.ApiDae.api('users:self:bookmark');

	        case 'id:bookmark':
	          return _ApiDae.ApiDae.api('users:id:bookmark');

	        case 'activities':
	        case 'activity':
	          return _ApiDae.ApiDae.api('users:self:activities');

	        case 'notifications':
	        case 'notice':
	          return _ApiDae.ApiDae.api('users:self:notifications');

	        case 'notifications:read':
	        case 'notice:read':
	          return _ApiDae.ApiDae.api('users:self:notifications:read');

	        default:
	          throw new Error('users illegal action: ' + action + '.');

	      }
	    }

	    /**
	     * users:settings API を取得します
	     * @param {string} action path option を指定します
	     * @return {Types} マイページ系 users:settings API を Types instance で返します
	     */

	  }, {
	    key: 'settings',
	    value: function settings(action) {

	      switch (action) {

	        case 'account':
	          return _ApiDae.ApiDae.api('users:settings:account');

	        case 'account:edit':
	          return _ApiDae.ApiDae.api('users:settings:account:edit');

	        case 'interest':
	          return _ApiDae.ApiDae.api('users:settings:interest');

	        case 'interest:edit':
	          return _ApiDae.ApiDae.api('users:settings:interest:edit');

	        default:
	          throw new Error('settings illegal action: ' + action + '.');

	      }
	    }
	  }]);
	  return Api;
	}();

/***/ },
/* 91 */
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

	var _Type = __webpack_require__(92);

	var _Permalink = __webpack_require__(93);

	var _Quries = __webpack_require__(94);

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
/* 92 */
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Type = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * method / url 2つのpropertyを持ちます
	 * method: POST | GET
	 * utl: API request先
	 */

	var Type = exports.Type = function () {
	  /**
	   * url, method を保存します
	   * @param {string} url API request先
	   * @param {string} [method=GET] 'GET', 'POST', 'PUT', 'DELETE'...
	   */

	  function Type(url) {
	    var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
	    (0, _classCallCheck3.default)(this, Type);

	    method = _Safety.Safety.string(method, 'GET');
	    this.url = url;
	    this.method = method.toUpperCase();
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
/* 93 */
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
/* 94 */
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

	var _Query = __webpack_require__(95);

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
/* 95 */
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
/* 96 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Env = __webpack_require__(80);

	var _Path = __webpack_require__(97);

	var _Types = __webpack_require__(91);

	var _Type = __webpack_require__(92);

	var _Permalink = __webpack_require__(93);

	var _Queries = __webpack_require__(98);

	var _Query = __webpack_require__(95);

	var _Loc = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// test mode 時に api アクセス先を 0.0.0.0: + (port +2) へ
	// develop mode
	// - IP: 52.69.203.137
	// - HOST: undotsushin.com
	var apiRoot = function apiRoot(port) {

	  var n = parseInt(port, 10);

	  switch (_Env.Env.mode) {

	    case _Env.Env.LOCAL:
	      return 'http://192.168.33.50/';

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
	// https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=986840481
	// API 一覧より
	var buildPath = function buildPath() {
	  // 共通パス
	  // 先頭 protocol + host 部分を develop / production で変える
	  var API_PATH = apiRoot(_Loc.Loc.port) + '/api/v1';

	  return {
	    // --------------------------------------------
	    // 登録
	    'users:add': new _Types.Types(new _Type.Type(API_PATH + '/users', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // login / logout
	    'users:login': new _Types.Types(new _Type.Type(API_PATH + '/sessions', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),
	    'users:logout': new _Types.Types(new _Type.Type(API_PATH + '/sessions', 'DELETE'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // --------------------------------------------
	    // カテゴリー一覧
	    'categories': new _Types.Types(new _Type.Type(API_PATH + '/category'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // --------------------------------------------
	    // home / self
	    // /api/v1/articles/home[/|/pickup|/headline]
	    'home': new _Types.Types(new _Type.Type(API_PATH + '/articles/home'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    'self': new _Types.Types(new _Type.Type(API_PATH + '/articles/self'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]), true),
	    // --------------------------------------------
	    // 記事一覧
	    // /api/v1/articles/category/{all|:category_slug}[/|/ranking|/video]
	    'category': new _Types.Types(new _Type.Type(API_PATH + '/articles/category'), new _Permalink.Permalink(['all', '*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // --------------------------------------------
	    // 検索
	    // /api/vi/articles/search/{:keywords}
	    'search': new _Types.Types(new _Type.Type(API_PATH + '/articles/search'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // --------------------------------------------
	    // 記事詳細
	    // /api/v1/articles/{:article_id}
	    'single': new _Types.Types(new _Type.Type(API_PATH + '/articles/' + _Path.Path.ARTICLE_ID), new _Permalink.Permalink(['*'], true), new _Queries.Queries()),
	    // --------------------------------------------
	    // ブックマーク 登録
	    // /api/v1/articles/{:article_id}/bookmark
	    'bookmark:add': new _Types.Types(new _Type.Type(API_PATH + '/articles/ARTICLE_ID/bookmark', 'PUT'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // ブックマーク 削除
	    'bookmark:delete': new _Types.Types(new _Type.Type(API_PATH + '/articles/ARTICLE_ID/bookmark', 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // --------------------------------------------
	    // コメント取得
	    // --------------------------------------------
	    // 記事へのすべてのコメントを人気順で取得する
	    // /api/v1/comments/article/{:article_id}
	    'comment': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // 記事への公式コメントを人気順で取得する
	    // /api/v1/comments/article/{:article_id}/official
	    'comment:official': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/official'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // 記事へのみんなのコメントを人気順で取得する
	    // /api/v1/comments/article/{:article_id}/normal
	    'comment:normal': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/normal'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // 自分のコメントを取得する
	    // /api/v1/comments/article/{:article_id}/self
	    'comment:self': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/self'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // 特定のコメントを取得する
	    // /api/v1/comments/article/{:article_id}/{:comment_id}
	    'comment:single': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/' + _Path.Path.COMMENT_ID), new _Permalink.Permalink(['*'], true), new _Queries.Queries()),
	    // --------------------------------------------
	    // コメント操作
	    // --------------------------------------------
	    // 記事へのコメント
	    // /api/v1/comments/article/{:article_id}
	    'comment:send': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID, 'POST'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([]), true),
	    // コメント返信
	    // /api/v1/comments/article/{:article_id}/{:comment_id}
	    'comment:reply': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/' + _Path.Path.COMMENT_ID, 'POST'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('body', 'number', '', true)]), true),
	    /*
	    初期要件からはずれました。
	        // 記事へのコメント編集
	        'comment:send:edit': new Types(
	          new Type( `${API_PATH}/comments/article`, 'PUT' ),
	          new Permalink( [ '' ], true ),
	          new Queries(),
	          true
	        ),
	        // コメント返信コメント編集
	        'comment:reply:edit': new Types(
	          new Type( `${API_PATH}/comments/article`, 'PUT' ),
	          new Permalink( [ '' ], true ),
	          new Queries(),
	          true
	        ),
	    */
	    // 記事へのコメント 削除
	    // /api/v1/comments/article/{:article_id}/{:commend_id}
	    'comment:send:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/' + _Path.Path.COMMENT_ID, 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // コメント返信コメント 削除
	    // /api/v1/comments/article/{:article_id}/{:commend_id}/{:reply_id}
	    'comment:reply:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/' + _Path.Path.ARTICLE_ID + '/' + _Path.Path.COMMENT_ID + '/' + _Path.Path.REPLY_ID, 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // --------------------------------------------
	    // コメント good / bad
	    // --------------------------------------------
	    // コメントGood 追加
	    // /api/v1/comments/like/{:comment_id}
	    'comment:good:add': new _Types.Types(new _Type.Type(API_PATH + '/comments/like/' + _Path.Path.COMMENT_ID, 'PUT'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // コメントGood 削除
	    // /api/v1/comments/like/{:comment_id}
	    'comment:good:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/like/' + _Path.Path.COMMENT_ID, 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // コメントBad 追加
	    'comment:bad:add': new _Types.Types(new _Type.Type(API_PATH + '/comments/bad/' + _Path.Path.COMMENT_ID, 'PUT'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // コメントBad 削除
	    'comment:bad:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/bad/' + _Path.Path.COMMENT_ID, 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
	    // --------------------------------------------
	    // マイページ系
	    // --------------------------------------------
	    // 自分のユーザー情報を取得する
	    // /api/v1/users/self
	    'users:self': new _Types.Types(new _Type.Type(API_PATH + '/users/self'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // user_idに該当するユーザー情報を取得する
	    // /api/v1/users/{:user_id}
	    'users:id': new _Types.Types(new _Type.Type(API_PATH + '/users/' + _Path.Path.USER_ID), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // bookmark
	    // -----------------
	    // 自分のブックマークを取得する
	    // /api/v1/users/self/bookmark
	    'users:self:bookmark': new _Types.Types(new _Type.Type(API_PATH + '/users/self/bookmark'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // user_idに該当するユーザーのブックマークを取得する
	    // /api/v1/users/{:user_id}/bookmark
	    /*
	    2016-02-04 drop した模様
	    'users:id:bookmark': new Types(
	      new Type( `${API_PATH}/users/${Path.USER_ID}/bookmark` ),
	      new Permalink(),
	      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] )
	    ),
	    */
	    // -----------------
	    // activities
	    // -----------------
	    // アクティビティを取得する
	    // /api/v1/users/self/activities
	    'users:self:activities': new _Types.Types(new _Type.Type(API_PATH + '/users/self/activities'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	    // -----------------
	    // notifications
	    // -----------------
	    // お知らせを取得する, 自分のアクション(成果物)への他人からのアクション通知
	    // /api/v1/users/self/notifications
	    'users:self:notifications': new _Types.Types(new _Type.Type(API_PATH + '/users/self/notifications'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]), true),
	    // お知らせ 既読, お知らせウインドウを表示すると呼び出す
	    // /api/v1/users/self/notifications/read
	    'users:self:notifications:read': new _Types.Types(new _Type.Type(API_PATH + '/users/self/notifications/read', 'PUT'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // settings/account
	    // -----------------
	    // アカウント情報の取得と更新
	    // アカウント情報を取得
	    // /api/v1/users/self/settings/account
	    'users:settings:account': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/account'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // アカウント情報を更新
	    // /api/v1/users/self/settings/account
	    'users:settings:account:edit': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/account', 'PUT'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // settings/interest
	    // -----------------
	    // 興味のある競技を取得
	    // /api/v1/users/self/settings/interest
	    'users:settings:interest': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/interest'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // 興味のある競技を取得
	    // /api/v1/users/self/settings/interest
	    'users:settings:interest:edit': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/interest', 'PUT'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // 退会
	    // -----------------
	    // アカウントを削除する
	    // /api/v1/users/self
	    'users:delete': new _Types.Types(new _Type.Type(API_PATH + '/users/self', 'DELETE'), new _Permalink.Permalink(), new _Queries.Queries(), true)
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 15:42
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
	exports.Path = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>API URL を正規化します</h3>
	 * 全て static です
	 */

	var Path = exports.Path = function () {
	  /**
	   * <h4>API Path 定数</h4>
	   * <p>API Path 内で使われる Const 名称を定義します</p>
	   * <p>URLを正規化します</p>
	   * <p>static class です, instance を作成しません</P>
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Path(target) {
	    (0, _classCallCheck3.default)(this, Path);

	    if (_symbol !== target) {

	      throw new Error('Path is static Class. not use new Path().');
	    }
	  }
	  // ---------------------------------------------------
	  //  CONST 代わり
	  // ---------------------------------------------------
	  /**
	   * @return {string} ARTICLE_ID を返します
	   */

	  (0, _createClass3.default)(Path, null, [{
	    key: 'article',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * article id 挿入し url を完成させます
	     * @param {string} url 置き換え元 URL
	     * @param {Number} id article id
	     * @return {string} 置き換え後のURLを返します
	     */
	    value: function article(url, id) {
	      return url.replace(Path.ARTICLE, String(id));
	    }
	    /**
	     * comment id 挿入し url を完成させます
	     * @param {string} url 置き換え元 URL
	     * @param {Number} id comment id
	     * @return {string} 置き換え後のURLを返します
	     */

	  }, {
	    key: 'comment',
	    value: function comment(url, id) {
	      return url.replace(Path.COMMENT, String(id));
	    }
	    /**
	     * reply id 挿入し url を完成させます
	     * @param {string} url 置き換え元 URL
	     * @param {Number} id reply id
	     * @return {string} 置き換え後のURLを返します
	     */

	  }, {
	    key: 'reply',
	    value: function reply(url, id) {
	      return url.replace(Path.REPLY, String(id));
	    }
	    /**
	     * user id 挿入し url を完成させます
	     * @param {string} url 置き換え元 URL
	     * @param {Number} id user id
	     * @return {string} 置き換え後のURLを返します
	     */

	  }, {
	    key: 'user',
	    value: function user(url, id) {
	      return url.replace(Path.USER, String(id));
	    }
	  }, {
	    key: 'ARTICLE_ID',
	    get: function get() {
	      return 'ARTICLE_ID';
	    }
	    /**
	     * alias Path.ARTICLE_ID
	     * @return {string} ARTICLE_ID を返します
	     */

	  }, {
	    key: 'ARTICLE',
	    get: function get() {
	      return Path.ARTICLE_ID;
	    }
	    /**
	     * @return {string} COMMENT_ID を返します
	     */

	  }, {
	    key: 'COMMENT_ID',
	    get: function get() {
	      return 'COMMENT_ID';
	    }
	    /**
	     * alias Path.COMMENT_ID
	     * @return {string} COMMENT_ID を返します
	     */

	  }, {
	    key: 'COMMENT',
	    get: function get() {
	      return Path.COMMENT_ID;
	    }
	    /**
	     * @return {string} REPLY_ID を返します
	     */

	  }, {
	    key: 'REPLY_ID',
	    get: function get() {
	      return 'REPLY_ID';
	    }
	    /**
	     * alias Path.REPLY_ID
	     * @return {string} REPLY_ID を返します
	     */

	  }, {
	    key: 'REPLY',
	    get: function get() {
	      return Path.REPLY_ID;
	    }
	    /**
	     * @return {string} USER_ID を返します
	     */

	  }, {
	    key: 'USER_ID',
	    get: function get() {
	      return 'USER_ID';
	    }
	    /**
	     * alias Path.USER_ID
	     * @return {string} USER_ID を返します
	     */

	  }, {
	    key: 'USER',
	    get: function get() {
	      return Path.USER_ID;
	    }
	  }]);
	  return Path;
	}();

/***/ },
/* 98 */
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

	var _Query = __webpack_require__(95);

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
/* 99 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Query2 = __webpack_require__(95);

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
/* 100 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Env = __webpack_require__(80);

	var _Api = __webpack_require__(90);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>application 共通項目を管理します</h3>
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
	   * ローカルテスト(vagrant)モードにします<br>
	   * <code>http://192.168.33.50/</code> へ接続します</p>
	   */

	  (0, _createClass3.default)(App, null, [{
	    key: 'local',
	    value: function local() {

	      _Env.Env.local();
	      _Api.Api.rebuild();
	    }
	    /**
	     * <p>**Api 接続先** を変更します</p>
	     * ローカルテストモードにします<br>
	     * localhost/api へ接続します<br>
	     * 使用しないでください</p>
	     */

	  }, {
	    key: 'test',
	    value: function test() {

	      _Env.Env.test();
	      _Api.Api.rebuild();
	    }
	    /**
	     * <p>**Api 接続先** を変更します</p>
	     * 開発モードにします<br>
	     * local から <code>http://undotsushin.com</code> へ API リクエストを行います<br>
	     * 開発中はこちらをお使いください</p>
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
	     * デフォルトです</p>
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
/* 101 */
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

	var _Result = __webpack_require__(88);

	var _Ajax = __webpack_require__(89);

	var _Types = __webpack_require__(91);

	var _Safety = __webpack_require__(44);

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
	   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
	   */

	  function Action(types) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var ResultClass = arguments.length <= 3 || arguments[3] === undefined ? _Result.Result : arguments[3];
	    (0, _classCallCheck3.default)(this, Action);

	    this._types = types;
	    this._resolve = resolve;
	    this._reject = reject;
	    this._ajax = new _Ajax.Ajax();
	    this._url = types.url;
	    this._method = types.method;
	    this._resultClass = ResultClass;
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

	      method = _Safety.Safety.string(method, this.method);
	      this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass);
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
/* 102 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _get2 = __webpack_require__(103);

	var _get3 = _interopRequireDefault(_get2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Result = __webpack_require__(88);

	var _Action2 = __webpack_require__(101);

	var _Types = __webpack_require__(91);

	var _Length = __webpack_require__(83);

	var _Safety = __webpack_require__(44);

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
	   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
	   */

	  function Offset(types) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var offset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	    var length = arguments.length <= 4 || arguments[4] === undefined ? _Length.Length.archive : arguments[4];
	    var ResultClass = arguments.length <= 5 || arguments[5] === undefined ? _Result.Result : arguments[5];
	    (0, _classCallCheck3.default)(this, Offset);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Offset).call(this, types, resolve, reject));

	    _this._offset = offset;
	    _this._length = length;
	    _this._total = -1;
	    _this._resultClass = ResultClass;

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

	        method = _Safety.Safety.string(method, this.method);
	        this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass);
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
	      // 合計数をupdate
	      this.total = result.total;
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(104)["default"];

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
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	__webpack_require__(106);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(9);

	__webpack_require__(70)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 107 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(101);

	var _Api = __webpack_require__(90);

	var _Length = __webpack_require__(83);

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

	      return this._url + '/pickup?offset=0&length=' + _Length.Length.pickup;
	    }
	  }]);
	  return Pickup;
	}(_Action2.Action);

/***/ },
/* 108 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(101);

	var _Api = __webpack_require__(90);

	var _Length = __webpack_require__(83);

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

	      return this._url + '/headline?offset=0&length=' + _Length.Length.headline;
	    }
	  }]);
	  return Headline;
	}(_Action2.Action);

/***/ },
/* 109 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Offset2 = __webpack_require__(102);

	var _Api = __webpack_require__(90);

	var _Length = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * home 通常記事一覧
	 */

	var News = exports.News = function (_Offset) {
	  (0, _inherits3.default)(News, _Offset);

	  /**
	   * <p>home 通常記事一覧を取得します<br>
	   * length は取得件数です。</p>
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
	    var length = arguments.length <= 3 || arguments[3] === undefined ? _Length.Length.archive : arguments[3];
	    (0, _classCallCheck3.default)(this, News);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(News).call(this, _Api.Api.home(), resolve, reject, offset, length));
	  }

	  return News;
	}(_Offset2.Offset);

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 19:45
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
	exports.PickupAuth = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ActionAuth2 = __webpack_require__(111);

	var _Api = __webpack_require__(90);

	var _User = __webpack_require__(78);

	var _Length = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * **認証**（ログイン）<br>
	 * Home pickup(slider)
	 */

	var PickupAuth = exports.PickupAuth = function (_ActionAuth) {
	  (0, _inherits3.default)(PickupAuth, _ActionAuth);

	  /**
	   * <p>Home pickup(slider) データを取得します<br>
	   * ** types: Api.home() ** を使用します</p>
	   *
	   * **認証**（ログイン）
	   *
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function PickupAuth() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    (0, _classCallCheck3.default)(this, PickupAuth);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PickupAuth).call(this, _User.User.token, _Api.Api.home(), resolve, reject));
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * Ajax API url を作成します<br>
	   * <code>Api.home().url/pickup?offset=0&length=5</code>
	   * @return {string} pickup API url を返します
	   */

	  (0, _createClass3.default)(PickupAuth, [{
	    key: 'url',
	    get: function get() {

	      return this._url + '/pickup?offset=0&length=' + _Length.Length.pickup;
	    }
	  }]);
	  return PickupAuth;
	}(_ActionAuth2.ActionAuth);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 17:52
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
	exports.ActionAuth = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(101);

	var _User = __webpack_require__(78);

	var _Token = __webpack_require__(112);

	var _Safety = __webpack_require__(44);

	var _Result = __webpack_require__(88);

	var _Types = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * **要認証** Ajax 処理を行います<br>
	 * Template Pattern として使用します<br>
	 * 各 Class で extends して下さい
	 */

	var ActionAuth = exports.ActionAuth = function (_Action) {
	  (0, _inherits3.default)(ActionAuth, _Action);

	  /**
	   * **要認証** Ajax 処理
	   * @param {string} token Authorization token
	   * @param {Type} types Types instance, Ajax request に使用します
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
	   */

	  function ActionAuth(token, types) {
	    var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	    var ResultClass = arguments.length <= 4 || arguments[4] === undefined ? _Result.Result : arguments[4];
	    (0, _classCallCheck3.default)(this, ActionAuth);

	    if (!_User.User.sign) {
	      // not login
	      throw new Error('Authorization required.');
	    }

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ActionAuth).call(this, types, resolve, reject, ResultClass));

	    _this._headers = _Token.Token.token(token);
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * Ajax request を開始します
	   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
	   */

	  (0, _createClass3.default)(ActionAuth, [{
	    key: 'start',
	    value: function start() {
	      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

	      method = _Safety.Safety.string(method, this.method);
	      this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass, this._headers);
	    }
	  }]);
	  return ActionAuth;
	}(_Action2.Action);

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 18:29
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
	exports.Token = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>Fetch Request Headers [token] を作成します</h3>
	 * 全て static
	 */

	var Token = function () {
	  /**
	   * <p>Authorization token を作成します</p>
	   * static class です、instance を作成できません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function Token(target) {
	    (0, _classCallCheck3.default)(this, Token);

	    if (_symbol !== target) {

	      throw new Error('Api is static Class. not use new Api().');
	    }
	  }
	  /**
	   *
	   * @param {string} token auth token
	   * @param {Object} [option={}] headers object, ない時は新規に作ります
	   * @return {*} headers へセットする Object を返します
	   */

	  (0, _createClass3.default)(Token, null, [{
	    key: 'token',
	    value: function token(_token) {
	      var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      option = _Safety.Safety.object(option);
	      option.Authorization = 'OAuth realm=undotsushin.com, oautn_token=' + _token;
	      // option.Accept = 'application/json';
	      // option[ 'Access-Control-Allow-Origin"' ] = '*';
	      /*
	          option = new Headers();
	          option.append( 'Authorization', `OAuth realm=undotsushin.com, oautn_token=${token}` );
	          option.append( 'Access-Control-Allow-Origin', '*' );
	      */
	      return option;
	    }
	  }]);
	  return Token;
	}();

	exports.Token = Token;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 19:51
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
	exports.HeadlineAuth = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ActionAuth2 = __webpack_require__(111);

	var _Api = __webpack_require__(90);

	var _User = __webpack_require__(78);

	var _Length = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * **認証**（ログイン）<br>
	 * Home headline（注目ニュース）
	 */

	var HeadlineAuth = exports.HeadlineAuth = function (_ActionAuth) {
	  (0, _inherits3.default)(HeadlineAuth, _ActionAuth);

	  /**
	   * <p>Home headline（注目ニュース） データを取得します<br>
	   * ** types: Api.home() ** を使用します</p>
	   *
	   * **認証**（ログイン）
	   *
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function HeadlineAuth() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    (0, _classCallCheck3.default)(this, HeadlineAuth);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HeadlineAuth).call(this, _User.User.token, _Api.Api.home(), resolve, reject));
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * Ajax API url を作成します<br>
	   * <code>Api.home().url/headline?offset=0&length=6</code>
	   * @return {string} headline API url を返します
	   */

	  (0, _createClass3.default)(HeadlineAuth, [{
	    key: 'url',
	    get: function get() {

	      return this._url + '/headline?offset=0&length=' + _Length.Length.headline;
	    }
	  }]);
	  return HeadlineAuth;
	}(_ActionAuth2.ActionAuth);

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 19:55
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
	exports.NewsAuth = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _OffsetAuth2 = __webpack_require__(115);

	var _Api = __webpack_require__(90);

	var _User = __webpack_require__(78);

	var _Length = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * **認証**（ログイン）<br>
	 * home 通常記事一覧
	 */

	var NewsAuth = exports.NewsAuth = function (_OffsetAuth) {
	  (0, _inherits3.default)(NewsAuth, _OffsetAuth);

	  /**
	   * <p>home 通常記事一覧を取得します<br>
	   * length は取得件数です。</p>
	   * ** default: 10 ** を必要なら変更します
	   *
	   * **認証**（ログイン）
	   *
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @param {Number} [offset=0] query offset 値
	   * @param {Number} [length=10] query length 値
	   */

	  function NewsAuth() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var length = arguments.length <= 3 || arguments[3] === undefined ? _Length.Length.archive : arguments[3];
	    (0, _classCallCheck3.default)(this, NewsAuth);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NewsAuth).call(this, _User.User.token, _Api.Api.home(), resolve, reject, offset, length));
	  }

	  return NewsAuth;
	}(_OffsetAuth2.OffsetAuth);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/27 - 18:05
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
	exports.OffsetAuth = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Offset2 = __webpack_require__(102);

	var _Length = __webpack_require__(83);

	var _Token = __webpack_require__(112);

	var _Safety = __webpack_require__(44);

	var _Result = __webpack_require__(88);

	var _Types = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * **要認証** Ajax 処理を行います<br>
	 * Template Pattern として使用します<br>
	 * 各 Class で extends して下さい
	 */

	var OffsetAuth = exports.OffsetAuth = function (_Offset) {
	  (0, _inherits3.default)(OffsetAuth, _Offset);

	  /**
	   * **要認証** Ajax 処理, queryあり<br>
	   * **Next 読込** がある時に使用します
	   * @link Types.js
	   *
	   * @param {string} token Authorization token
	   * @param {Types} types Types instance, Ajax request に使用します
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @param {Number} [offset=0] query offset 値
	   * @param {Number} [length=10] query length 値
	   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
	   */

	  function OffsetAuth(token, types) {
	    var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	    var offset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	    var length = arguments.length <= 5 || arguments[5] === undefined ? _Length.Length.archive : arguments[5];
	    var ResultClass = arguments.length <= 6 || arguments[6] === undefined ? _Result.Result : arguments[6];
	    (0, _classCallCheck3.default)(this, OffsetAuth);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(OffsetAuth).call(this, types, resolve, reject, offset, length, ResultClass));
	    /*
	    // ログインか必須かよくわからない
	    if ( !User.sign ) {
	      // not login
	      throw new Error( `Authorization required.` );
	    }
	    */

	    _this._headers = _Token.Token.token(token);
	    return _this;
	  }
	  /**
	   * 次の読込を開始します<br>
	   * start の代わりに使用します
	   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
	   */

	  (0, _createClass3.default)(OffsetAuth, [{
	    key: 'next',
	    value: function next() {
	      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

	      // next data があるかないかを調べます
	      // next がある時は Ajax を実行します
	      if (this.hasNext()) {

	        method = _Safety.Safety.string(method, this.method);
	        this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass, this._headers);
	      }
	    }
	  }]);
	  return OffsetAuth;
	}(_Offset2.Offset);
	// import {User} from '../app/User';

/***/ },
/* 116 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Offset2 = __webpack_require__(102);

	var _Api = __webpack_require__(90);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事一覧, カテゴリー別, 全て...
	 */

	var Category = exports.Category = function (_Offset) {
	  (0, _inherits3.default)(Category, _Offset);

	  // 引数の順番を失敗した
	  // resolve, reject が先だった...
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

	    slug = _Safety.Safety.string(slug, 'all');
	    type = _Safety.Safety.string(type, '');

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
	        return this._url + '/' + this.slug + '?offset=' + this.offset + '&length=' + this.length;
	      } else {

	        // type が ranking | video
	        return this._url + '/' + this.slug + '/' + this.type + '?offset=' + this.offset + '&length=' + this.length;
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
/* 117 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Category2 = __webpack_require__(116);

	var _Safety = __webpack_require__(44);

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

	    slug = _Safety.Safety.string(slug, 'all');
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Ranking).call(this, slug, 'ranking', resolve, reject));
	  }

	  return Ranking;
	}(_Category2.Category);

/***/ },
/* 118 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Category2 = __webpack_require__(116);

	var _Safety = __webpack_require__(44);

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

	    slug = _Safety.Safety.string(slug, 'all');
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Videos).call(this, slug, 'video', resolve, reject));
	  }

	  return Videos;
	}(_Category2.Category);

/***/ },
/* 119 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Ranking = __webpack_require__(117);

	var _Videos = __webpack_require__(118);

	var _Length = __webpack_require__(83);

	var _Safety = __webpack_require__(44);

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

	      slug = _Safety.Safety.string(slug, 'all');

	      var rankings = new _Ranking.Ranking(slug, resolve, reject);
	      rankings.length = _Length.Length.ranking;
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

	      slug = _Safety.Safety.string(slug, 'all');

	      var videos = new _Videos.Videos(slug, resolve, reject);
	      videos.length = _Length.Length.video;
	      return videos;
	    }
	  }]);
	  return Widget;
	}();

/***/ },
/* 120 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Action2 = __webpack_require__(101);

	var _Api = __webpack_require__(90);

	var _Path = __webpack_require__(97);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * 記事のブックマーク登録 / 解除<br>
	 * <code>/api/v1/articles/bookmark/{:article_id}</code>
	 */

	var Bookmark = exports.Bookmark = function (_Action) {
	  (0, _inherits3.default)(Bookmark, _Action);

	  /**
	  * 記事のブックマーク登録 / 解除 を行います
	  * @ToDo 完成させる, add / remove
	  * @param {Symbol} target Factory pattern のために使用
	  * @param {string} actionType add / delete 登録
	  * @param {Number|string} id article id 記事ID
	  * @param {Function} [resolve=null] Ajax 成功時の callback
	  * @param {Function} [reject=null] Ajax 失敗時の callback
	  */

	  function Bookmark(target, actionType, id) {
	    var resolve = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	    var reject = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
	    (0, _classCallCheck3.default)(this, Bookmark);

	    if (_symbol !== target) {

	      throw new Error('not use new Bookmark(). instead Bookmark.register() or Bookmark.cancel()');
	    }

	    // 記事IDをparseIntはまずいと思う, 頭 0 が消えるから
	    // this._id = parseInt( id, 10 );

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Bookmark).call(this, _Api.Api.bookmark(actionType), resolve, reject));

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
	    // ---------------------------------------------------
	    //  static METHOD
	    // ---------------------------------------------------

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
	      // return `${this._url}/${this.id}`;
	      return _Path.Path.article(this._url, this.id);
	    }
	  }], [{
	    key: 'register',
	    value: function register(id) {
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      return new Bookmark(_symbol, 'add', id, resolve, reject);
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel(id) {
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      return new Bookmark(_symbol, 'delete', id, resolve, reject);
	    }
	  }]);
	  return Bookmark;
	}(_Action2.Action);

/***/ },
/* 121 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Offset2 = __webpack_require__(102);

	var _Api = __webpack_require__(90);

	var _Length = __webpack_require__(83);

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
	    var length = arguments.length <= 4 || arguments[4] === undefined ? _Length.Length.archive : arguments[4];
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
/* 122 */
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
	exports.Single = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(101);

	var _Api = __webpack_require__(90);

	var _Path = __webpack_require__(97);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事詳細を取得します
	 */

	var Single = exports.Single = function (_Action) {
	  (0, _inherits3.default)(Single, _Action);

	  /**
	   * 記事詳細を記事IDから取得します
	   * @param {Number|String} id 記事ID
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Single(id) {
	    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    (0, _classCallCheck3.default)(this, Single);

	    // parseInt すると先頭0が消えるのでまずい気がする
	    // this._id = parseInt( id, 10 );

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Single).call(this, _Api.Api.single(), resolve, reject));

	    _this._id = id;

	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * 記事ID
	   * @return {Number|*} 記事IDを返します
	   */

	  (0, _createClass3.default)(Single, [{
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
	      // return `${this._url}/${this.id}`;
	      return _Path.Path.article(this._url, this.id);
	    }
	  }]);
	  return Single;
	}(_Action2.Action);

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/03 - 16:03
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
	exports.UsersSelf = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ActionAuth2 = __webpack_require__(111);

	var _Api = __webpack_require__(90);

	var _User = __webpack_require__(78);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * <h4>マイページの表示に利用</h4>
	 * 自分の情報
	 */

	var UsersSelf = exports.UsersSelf = function (_ActionAuth) {
	  (0, _inherits3.default)(UsersSelf, _ActionAuth);

	  /**
	   * <p>自分の情報 を取得する</p>
	   * **認証**（ログイン）要
	   *
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function UsersSelf() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    (0, _classCallCheck3.default)(this, UsersSelf);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UsersSelf).call(this, _User.User.token, _Api.Api.users('self'), resolve, reject));
	  }

	  return UsersSelf;
	}(_ActionAuth2.ActionAuth);

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/03 - 17:02
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
	exports.Model = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher2 = __webpack_require__(77);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * View がない Api request
	 */

	var Model = exports.Model = function (_EventDispatcher) {
	  (0, _inherits3.default)(Model, _EventDispatcher);

	  /**
	   * View がない Api request, 親クラス
	   *
	   * @param {Object} [option={}] optional event handler
	   */

	  function Model() {
	    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, Model);

	    option = _Safety.Safety.object(option);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Model).call(this));

	    _this._option = option;
	    _this._action = null;
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Object|*} callback handler がセットされたObjectを返します
	   */

	  (0, _createClass3.default)(Model, [{
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
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var option = this.option;
	      if (option.hasOwnProperty(keyName) && typeof option[keyName] === 'function') {

	        // callback 側で通常の引数として取り出せるように apply します
	        option[keyName].apply(this, args);
	      }

	      this.dispatch({ type: keyName, args: args });
	    }
	    // ---------------------------------------------------
	    //  CONST
	    // ---------------------------------------------------
	    /**
	     * event UNDEFINED_ERROR
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'option',
	    get: function get() {
	      return this._option;
	    }

	    /**
	     * callback handler をセットします
	     * @param {Object} option callback handler がセットされた Object
	     */
	    ,
	    set: function set(option) {
	      this._option = option;
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
	    /**
	     * Action instance を設定します
	     * @param {*} action Action instance
	     */
	    ,
	    set: function set(action) {
	      this._action = action;
	    }
	  }], [{
	    key: 'UNDEFINED_ERROR',
	    get: function get() {
	      return 'undefinedError';
	    }
	    /**
	     * event EMPTY_ERROR
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'EMPTY_ERROR',
	    get: function get() {
	      return 'emptyError';
	    }
	    /**
	     * event RESPONSE_ERROR
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'RESPONSE_ERROR',
	    get: function get() {
	      return 'responseError';
	    }
	    /**
	     * event COMPLETE, action 終了後 success 時に使用します
	     * @return {string} actionComplete を返します
	     */

	  }, {
	    key: 'COMPLETE',
	    get: function get() {
	      return 'actionComplete';
	    }
	  }]);
	  return Model;
	}(_EventDispatcher2.EventDispatcher);

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/03 - 16:59
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
	exports.ModelUsersSelf = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Model2 = __webpack_require__(124);

	var _UsersSelf = __webpack_require__(123);

	var _UserDae = __webpack_require__(126);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 自分の情報
	 */

	var ModelUsersSelf = exports.ModelUsersSelf = function (_Model) {
	  (0, _inherits3.default)(ModelUsersSelf, _Model);

	  /**
	   * マイページの表示に利用, 自分の情報
	   * @param {Object} [option={}] optional event handler
	   */

	  function ModelUsersSelf() {
	    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, ModelUsersSelf);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ModelUsersSelf).call(this, option));

	    _this._action = new _UsersSelf.UsersSelf(_this.done.bind(_this), _this.fail.bind(_this));
	    return _this;
	  }
	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(ModelUsersSelf, [{
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

	      var response = result.response;

	      if (typeof response === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[USER_SELF:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_Model2.Model.UNDEFINED_ERROR, error);
	      } else {

	        // 成功 callback
	        this.executeSafely(_Model2.Model.COMPLETE, new _UserDae.UserDae(response));
	      }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely(_Model2.Model.RESPONSE_ERROR, error);
	    }
	  }]);
	  return ModelUsersSelf;
	}(_Model2.Model);

/***/ },
/* 126 */
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

	var _TypeDae = __webpack_require__(127);

	var _Safety = __webpack_require__(44);

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

	    user = _Safety.Safety.object(user);

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
	     * @return {Number} article.user.id ユーザーIDを返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.user.id;
	    }
	    /**
	     * @return {string} article.user.name ユーザー名を返します
	     */

	  }, {
	    key: 'userName',
	    get: function get() {
	      return this.user.name;
	    }
	    /**
	     * @return {string} article.user.profile_picture ユーザーのURLを返します
	     */

	  }, {
	    key: 'profilePicture',
	    get: function get() {
	      return this.user.profile_picture;
	    }
	    /**
	     * @return {string} article.user.url ユーザーのURLを返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.user.url;
	    }
	    /**
	     * @return {string} article.user.bio ユーザーの肩書を返します
	     */

	  }, {
	    key: 'bio',
	    get: function get() {
	      return this.user.bio;
	    }
	  }]);
	  return UserDae;
	}();

/***/ },
/* 127 */
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TypeDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.user.type
	 */

	var TypeDae = exports.TypeDae = function () {
	  /**
	   * article.user.type
	   * @param {Object} [type={}] article.user.type
	   */

	  function TypeDae() {
	    var type = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, TypeDae);

	    type = _Safety.Safety.object(type);
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
	     * ユーザータイプID
	     *
	     * @example
	     * 6 : 一般ユーザー
	     * 5 : 公式ユーザー
	     * 4 : 編集部ユーザ
	     * 3 : メディアユーザー(ex. ニッカンスポーツ)
	     *
	     * @return {Number} article.user.type.id ユーザータイプID
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.type.id;
	    }
	    /**
	     * ユーザーラベル
	     *
	     * @example
	     * 公式
	     *
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 14:45
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
	exports.ModelCategories = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Model2 = __webpack_require__(124);

	var _Categories = __webpack_require__(129);

	var _CategoriesDae = __webpack_require__(130);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * カテゴリー一覧
	 */

	var ModelCategories = exports.ModelCategories = function (_Model) {
	  (0, _inherits3.default)(ModelCategories, _Model);

	  /**
	   * カテゴリー一覧を取得し callback を発火します
	   * @param option
	   */

	  function ModelCategories() {
	    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, ModelCategories);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ModelCategories).call(this, option));

	    _this._action = new _Categories.Categories(_this.done.bind(_this), _this.fail.bind(_this));
	    return _this;
	  }
	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(ModelCategories, [{
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

	      var response = result.response;

	      if (typeof response === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[USER_SELF:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_Model2.Model.UNDEFINED_ERROR, error);
	      } else {

	        // 成功 callback
	        this.executeSafely(_Model2.Model.COMPLETE, new _CategoriesDae.CategoriesDae(response));
	      }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely(_Model2.Model.RESPONSE_ERROR, error);
	    }
	  }]);
	  return ModelCategories;
	}(_Model2.Model);

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 14:39
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
	exports.Categories = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(101);

	var _Api = __webpack_require__(90);

	var _Path = __webpack_require__(97);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Categories = exports.Categories = function (_Action) {
	  (0, _inherits3.default)(Categories, _Action);

	  function Categories() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    (0, _classCallCheck3.default)(this, Categories);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Categories).call(this, _Api.Api.categories(), resolve, reject));
	  }

	  return Categories;
	}(_Action2.Action);

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 14:50
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
	exports.CategoriesDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	var _SlugDae = __webpack_require__(131);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * カテゴリー一覧 response を管理します
	 */

	var CategoriesDae = exports.CategoriesDae = function () {
	  /**
	   * カテゴリー一覧 response を管理します
	   * @param {Object} [response={}] JSON response
	   */

	  function CategoriesDae() {
	    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, CategoriesDae);

	    response = _Safety.Safety.object(response);
	    var categories = _Safety.Safety.array(response.categories);

	    var cats = [];
	    var bank = {};

	    // categories からデータを取り出し SlugDae instance を作成
	    // cats: 配列にそのまま保持
	    // bank: slug をキーにそ保持
	    categories.forEach(function (category) {

	      var slugDae = new _SlugDae.SlugDae(category);
	      cats.push(slugDae);
	      bank[slugDae.slug] = slugDae;
	    });

	    this._response = response;
	    this._categories = categories;
	    this._cats = cats;
	    this._bank = bank;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Object|*} JSON response を返します
	   */

	  (0, _createClass3.default)(CategoriesDae, [{
	    key: 'bySlug',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * @param {string} slug 検索したい slug
	     * @return {SlugDae} 該当 SlugDae を返します
	     */
	    value: function bySlug(slug) {
	      return this._bank[slug];
	    }
	  }, {
	    key: 'response',
	    get: function get() {
	      return this._response;
	    }
	    /**
	     * @return {Array|*} JSON response.categories を返します
	     */

	  }, {
	    key: 'categories',
	    get: function get() {
	      return this._categories;
	    }
	    /**
	     * @return {Array<SlugDae>|*} response.categories を SlugDae instance 配列にし返します
	     */

	  }, {
	    key: 'all',
	    get: function get() {
	      return this._cats;
	    }
	    /**
	     * @return {{}|*} slug をキーにした SlugDae instance 全て
	     */

	  }, {
	    key: 'bank',
	    get: function get() {
	      return this._bank;
	    }
	    /**
	     * alias total
	     * @return {Number} JSON response.count を返します
	     */

	  }, {
	    key: 'count',
	    get: function get() {
	      return this.total;
	    }
	    /**
	     * @return {Number} JSON response.count を返します
	     */

	  }, {
	    key: 'total',
	    get: function get() {
	      return this.response.count;
	    }
	  }]);
	  return CategoriesDae;
	}();

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 14:54
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
	exports.SlugDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * カテゴリー一覧, カテゴリー毎のデータ
	 */

	var SlugDae = exports.SlugDae = function () {
	  /**
	   * カテゴリー一覧, カテゴリー毎のデータ
	   * @param {Object} [category={}] カテゴリー一覧, 1 カテゴリーdata
	   */

	  function SlugDae() {
	    var category = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, SlugDae);

	    category = _Safety.Safety.object(category);
	    this._category = category;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Object|*} 1 カテゴリーdata
	   */

	  (0, _createClass3.default)(SlugDae, [{
	    key: 'category',
	    get: function get() {
	      return this._category;
	    }
	    /**
	     * @return {Number} category Id を返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.category.id;
	    }
	    /**
	     * @return {string} category label を返します
	     */

	  }, {
	    key: 'label',
	    get: function get() {
	      return this.category.label;
	    }
	    /**
	     * @return {string} category slug を返します
	     */

	  }, {
	    key: 'slug',
	    get: function get() {
	      return this.category.slug;
	    }
	    /**
	     * @return {string} category url を返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.category.url;
	    }
	  }]);
	  return SlugDae;
	}();

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.View = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher2 = __webpack_require__(77);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 表示を行います
	 */
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

	var View = exports.View = function (_EventDispatcher) {
	  (0, _inherits3.default)(View, _EventDispatcher);

	  /**
	   * action/Headline を使い Ajax request 後 element へ dom を作成します
	   * @param {Element} element root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function View(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, View);

	    option = _Safety.Safety.object(option);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(View).call(this));

	    _this._element = element;
	    _this._option = option;
	    _this._action = null;

	    return _this;
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
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var option = this.option;
	      if (option.hasOwnProperty(keyName) && typeof option[keyName] === 'function') {

	        // callback 側で通常の引数として取り出せるように apply します
	        option[keyName].apply(this, args);
	      }

	      this.dispatch({ type: keyName, args: args });
	    }
	    // ---------------------------------------------------
	    //  CONST
	    // ---------------------------------------------------
	    /**
	     * event BEFORE_RENDER
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'element',
	    get: function get() {
	      return this._element;
	    }

	    /**
	     * render root element を設定します
	     * @param {Element} element render root element
	     */
	    ,
	    set: function set(element) {
	      this._element = element;
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
	     * callback handler をセットします
	     * @param {Object} option callback handler がセットされた Object
	     */
	    ,
	    set: function set(option) {
	      this._option = option;
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
	    /**
	     * Action instance を設定します
	     * @param {*} action Action instance
	     */
	    ,
	    set: function set(action) {
	      this._action = action;
	    }
	  }], [{
	    key: 'BEFORE_RENDER',
	    get: function get() {
	      return 'beforeRender';
	    }
	    /**
	     * event WILL_MOUNT
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'WILL_MOUNT',
	    get: function get() {
	      return 'willMount';
	    }
	    /**
	     * event DID_MOUNT
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'DID_MOUNT',
	    get: function get() {
	      return 'didMount';
	    }
	    /**
	     * event ERROR_MOUNT
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'ERROR_MOUNT',
	    get: function get() {
	      return 'errorMount';
	    }
	    /**
	     * event UNDEFINED_ERROR
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'UNDEFINED_ERROR',
	    get: function get() {
	      return 'undefinedError';
	    }
	    /**
	     * event EMPTY_ERROR
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'EMPTY_ERROR',
	    get: function get() {
	      return 'emptyError';
	    }
	    /**
	     * event RESPONSE_ERROR
	     * @return {string} beforeRender を返します
	     */

	  }, {
	    key: 'RESPONSE_ERROR',
	    get: function get() {
	      return 'responseError';
	    }
	  }]);
	  return View;
	}(_EventDispatcher2.EventDispatcher);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 17:44
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
	exports.ViewHeaderUser = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(132);

	var _ViewHeaderMember = __webpack_require__(134);

	var _User = __webpack_require__(78);

	var _UserStatus = __webpack_require__(81);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	var React = self.React;
	var ReactDOM = self.ReactDOM;

	/**
	 * header user 関連メニュー
	 */

	var ViewHeaderUser = exports.ViewHeaderUser = function (_View) {
	  (0, _inherits3.default)(ViewHeaderUser, _View);

	  /**
	   * <p>header user 関連メニュー<br>
	   * ログイン / 非ログイン でメニューを変更</p>
	   * @param {Element} element insert root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewHeaderUser(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, ViewHeaderUser);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderUser).call(this, element, option));
	  }
	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(ViewHeaderUser, [{
	    key: 'start',
	    value: function start() {
	      if (_User.User.sign) {
	        // login member
	        var member = new _ViewHeaderMember.ViewHeaderMember(this.element);
	        member.start();
	      } else {
	        // user menu
	        this.render();
	      }
	    }
	    /**
	     * 非メンバー Dom を生成します
	     */

	  }, {
	    key: 'render',
	    value: function render() {

	      var _this = this;

	      var UserDom = React.createClass({
	        displayName: 'UserDom',

	        render: function render() {

	          return React.createElement(
	            'div',
	            { className: 'user' },
	            React.createElement(
	              'a',
	              { className: 'user-signup', href: '/signup/' },
	              '無料登録 / ログイン'
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          _this.executeSafely(_View2.View.DID_MOUNT);
	        }
	      });

	      ReactDOM.render(React.createElement(UserDom, null), this.element);
	    }
	  }]);
	  return ViewHeaderUser;
	}(_View2.View);

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/08 - 19:45
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
	exports.ViewHeaderMember = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(132);

	var _ViewHeaderMemberNotice = __webpack_require__(135);

	var _Empty = __webpack_require__(137);

	var _UserDae = __webpack_require__(126);

	var _UsersSelf = __webpack_require__(123);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	var React = self.React;
	var ReactDOM = self.ReactDOM;

	/**
	 * header ログイン・メンバー 関連メニュー
	 */

	var ViewHeaderMember = exports.ViewHeaderMember = function (_View) {
	  (0, _inherits3.default)(ViewHeaderMember, _View);

	  /**
	   * <p>header ログイン・メンバー 関連メニュー<br>
	   * アイコン+drop down menu 表示</p>
	   *
	   * @param {Element} element insert root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewHeaderMember(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, ViewHeaderMember);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderMember).call(this, element, option));

	    _this2._action = new _UsersSelf.UsersSelf(_this2.done.bind(_this2), _this2.fail.bind(_this2));
	    return _this2;
	  }
	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(ViewHeaderMember, [{
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

	      var response = result.response;

	      if (typeof response === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[MEMBER:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else {

	          this.render(response);
	        }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
	      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
	      // this.showError( error.message );
	    }
	    /**
	     * Dom を生成します
	     * @param {Object} response JSON response object
	     */

	  }, {
	    key: 'render',
	    value: function render(response) {

	      var dae = new _UserDae.UserDae(response);
	      var _this = this;

	      // --------------------------------------------------
	      // user setting
	      var SettingDom = React.createClass({
	        displayName: 'SettingDom',

	        propTypes: {
	          userName: React.PropTypes.string.isRequired,
	          icon: React.PropTypes.string.isRequired
	        },
	        getInitialState: function getInitialState() {
	          this.timer = 0;

	          return {
	            open: 'close'
	          };
	        },
	        render: function render() {

	          var icon = this.props.icon;
	          var userName = this.props.userName;

	          if (!icon) {
	            icon = _Empty.Empty.USER_PICTURE;
	          }

	          return React.createElement(
	            'div',
	            { className: 'user' },
	            React.createElement('div', { className: 'notice-container', ref: 'notice' }),
	            React.createElement(
	              'div',
	              { className: 'preference ' + this.state.open },
	              React.createElement(
	                'a',
	                { className: 'preference-opener', href: '#', onClick: this.clickHandler },
	                React.createElement(
	                  'span',
	                  { className: 'user-avatar' },
	                  React.createElement('img', { src: icon, alt: userName })
	                )
	              ),
	              React.createElement(
	                'nav',
	                { className: 'preference-menu' },
	                React.createElement(
	                  'ul',
	                  { className: 'dropMenu' },
	                  React.createElement(
	                    'li',
	                    { className: 'dropMenu-item' },
	                    React.createElement(
	                      'a',
	                      { className: 'dropMenu-link', href: '/mypage/' },
	                      'ブックマーク',
	                      React.createElement('br', null),
	                      'アクティビティ'
	                    )
	                  ),
	                  React.createElement(
	                    'li',
	                    { className: 'dropMenu-item' },
	                    React.createElement(
	                      'a',
	                      { className: 'dropMenu-link', href: '/settings/' },
	                      '設定'
	                    )
	                  ),
	                  React.createElement(
	                    'li',
	                    { className: 'dropMenu-item' },
	                    React.createElement(
	                      'a',
	                      { className: 'dropMenu-link', href: '/logout/' },
	                      'ログアウト'
	                    )
	                  )
	                )
	              )
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // callback
	          _this.executeSafely(_View2.View.DID_MOUNT);

	          // notice make
	          var notice = new _ViewHeaderMemberNotice.ViewHeaderMemberNotice(this.refs.notice);
	          notice.start();
	        },
	        componentWillUnmount: function componentWillUnmount() {
	          this.destroy();
	        },
	        // -------------------------------------------------------
	        // 以降 custom method

	        // icon click で drop menu open / close
	        clickHandler: function clickHandler(event) {

	          event.preventDefault();
	          this.toggleState();
	        },
	        // document.body.onClick event handler
	        // drop menu open 後に 領域外 click で閉じるため
	        bodyClick: function bodyClick() {

	          if (this.state.open === 'open') {

	            // document.body が a より先に反応する
	            // native event bind と React 経由の違いかも
	            // body click 後の処理を遅延させる, 多分気づかない程度
	            this.timer = setTimeout(this.toggleState, 100);
	          }
	        },
	        // open / close toggle
	        toggleState: function toggleState() {

	          this.destroy();

	          if (this.state.open === 'close') {
	            // close -> open
	            // document.body へ click event handler bind
	            this.setState({ open: 'open' });
	            document.body.addEventListener('click', this.bodyClick, false);
	          } else {
	            // open -> close
	            this.setState({ open: 'close' });
	          }
	        },
	        // timer cancel
	        // body.click unbind
	        // 後処理
	        destroy: function destroy() {

	          // body click からの遅延処理を clear する
	          // timer を 0 にし error にならないようにする
	          clearTimeout(this.timer);
	          this.timer = 0;
	          // document.body からclick event handler unbind
	          document.body.removeEventListener('click', this.bodyClick);
	        }
	      });

	      // --------------------------------------------------
	      // user root
	      ReactDOM.render(React.createElement(SettingDom, { icon: dae.profilePicture, userName: dae.userName }), this.element);
	    }
	  }]);
	  return ViewHeaderMember;
	}(_View2.View);

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/08 - 19:46
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
	exports.ViewHeaderMemberNotice = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(132);

	var _Notice = __webpack_require__(136);

	var _Empty = __webpack_require__(137);

	var _NotificationsDae = __webpack_require__(138);

	var _NoticeAction = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	var React = self.React;
	var ReactDOM = self.ReactDOM;

	/**
	 * お知らせ(header)
	 */

	var ViewHeaderMemberNotice = exports.ViewHeaderMemberNotice = function (_View) {
	  (0, _inherits3.default)(ViewHeaderMemberNotice, _View);

	  /**
	   * お知らせ(header) for login member
	   * @param {Element} element insert root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewHeaderMemberNotice(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, ViewHeaderMemberNotice);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderMemberNotice).call(this, element, option));

	    _this2._action = new _Notice.Notice(_this2.done.bind(_this2), _this2.fail.bind(_this2), 0, 5);

	    _this2._menu = null;
	    return _this2;
	  }
	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(ViewHeaderMemberNotice, [{
	    key: 'start',
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

	      var response = result.response;

	      if (typeof response === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[MEMBER:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else {

	          this.render(response);
	        }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
	      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
	      // this.showError( error.message );
	    }

	    /**
	     * お知らせ  ログインメンバー Dom を生成します
	     * @param {Object} responseObj JSON response
	     */

	  }, {
	    key: 'render',
	    value: function render(responseObj) {

	      var notificationsDae = new _NotificationsDae.NotificationsDae(responseObj);
	      var _this = this;

	      // --------------------------------------------------
	      // user notice dropMenu action message
	      var NoticeMessage = React.createClass({
	        displayName: 'NoticeMessage',

	        propTypes: {
	          notice: React.PropTypes.object.isRequired
	        },
	        render: function render() {

	          var notice = this.props.notice;
	          var action = notice.action;
	          var message = _NoticeAction.NoticeAction.message(action);

	          if (!action) {
	            return null;
	          }

	          var user = notice.user;
	          var article = notice.article;

	          var txt = user.userName + 'さんがあなたの「' + article.title + '」へのコメントに';

	          return React.createElement(
	            'p',
	            { className: 'info-content' },
	            txt,
	            React.createElement(
	              'strong',
	              null,
	              message
	            ),
	            'しました。'
	          );
	        }
	      });

	      // --------------------------------------------------
	      // user notice dropMenu
	      var NoticeMenu = React.createClass({
	        displayName: 'NoticeMenu',

	        propTypes: {
	          notifications: React.PropTypes.array.isRequired
	        },
	        render: function render() {

	          var notifications = this.props.notifications;
	          var readAll = undefined;

	          if (notifications.length > 0) {

	            readAll = React.createElement(
	              'div',
	              { className: 'info-btn-readAll' },
	              React.createElement(
	                'a',
	                { href: '#', onClick: this.allRead },
	                'すべて既読にする'
	              )
	            );
	          } else {

	            readAll = React.createElement(
	              'div',
	              { className: 'info-btn-readAll' },
	              ' '
	            );
	          }

	          return React.createElement(
	            'nav',
	            { className: 'notice-menu' },
	            React.createElement(
	              'div',
	              { className: 'dropMenu' },
	              React.createElement(
	                'div',
	                { className: 'info' },
	                React.createElement(
	                  'h2',
	                  { className: 'info-heading' },
	                  'お知らせ'
	                ),
	                readAll,
	                React.createElement(
	                  'ul',
	                  { className: 'info-list' },
	                  notifications.map(function (notice, i) {

	                    var icon = notice.user.profilePicture;
	                    if (!icon) {
	                      icon = _Empty.Empty.USER_PICTURE_FEATURE;
	                    }

	                    return React.createElement(
	                      'li',
	                      { key: 'info-item-' + i, className: 'info-item info-item-' + i },
	                      React.createElement(
	                        'a',
	                        { href: 'info-link' },
	                        React.createElement(
	                          'figure',
	                          { className: 'info-user-thumb' },
	                          React.createElement('img', { src: icon, alt: '' })
	                        ),
	                        React.createElement(NoticeMessage, { notice: notice }),
	                        React.createElement(
	                          'p',
	                          { className: 'info-date' },
	                          notice.displayDate
	                        )
	                      )
	                    );
	                  }),
	                  React.createElement(
	                    'li',
	                    { className: 'btn-viewmore' },
	                    React.createElement(
	                      'a',
	                      { className: 'btn-viewmore-link', href: '/notifications/' },
	                      React.createElement(
	                        'span',
	                        null,
	                        'すべて見る'
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          );
	        },
	        allRead: function allRead(event) {
	          event.preventDefault();
	        }
	      });

	      // --------------------------------------------------
	      // user notice
	      var NoticeDom = React.createClass({
	        displayName: 'NoticeDom',

	        propTypes: {
	          response: React.PropTypes.object.isRequired
	        },
	        getInitialState: function getInitialState() {
	          this.timer = 0;

	          return {
	            response: this.props.response,
	            open: 'close'
	          };
	        },
	        render: function render() {

	          var response = this.state.response;
	          var notifications = response.notifications;
	          var noticeTotal = '';
	          var noticeMenu = undefined;

	          if (Array.isArray(notifications)) {

	            // 配列（正常）な時はそのデータを使用しメニューを作成する
	            noticeMenu = React.createElement(NoticeMenu, { notifications: notifications });
	            noticeTotal = React.createElement(
	              'span',
	              { className: 'notice-num' },
	              response.total
	            );
	          } else {

	            // 異常な時は
	            // 空メニューを作成する、引数に 空配列 を送る
	            noticeMenu = React.createElement(NoticeDom, { notifications: [] });
	          }

	          return React.createElement(
	            'div',
	            { className: 'notice ' + this.state.open },
	            React.createElement(
	              'a',
	              { href: '#', className: 'notice-opener', onClick: this.clickHandler },
	              React.createElement(
	                'i',
	                { className: 'notice-icon' },
	                ' '
	              ),
	              noticeTotal
	            ),
	            noticeMenu
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	        },
	        componentWillUnmount: function componentWillUnmount() {
	          this.destroy();
	        },
	        // -------------------------------------------------------
	        // 以降 custom method
	        clickHandler: function clickHandler(event) {
	          event.preventDefault();
	          this.toggleState();
	        },
	        bodyClick: function bodyClick() {
	          if (this.state.open === 'open') {

	            // document.body が a より先に反応する
	            // native event bind と React 経由の違いかも
	            // body click 後の処理を遅延させる, 多分気づかない程度
	            this.timer = setTimeout(this.toggleState, 100);
	          }
	        },
	        toggleState: function toggleState() {

	          this.destroy();

	          if (this.state.open === 'close') {
	            // close -> open
	            // document.body へ click event handler bind
	            this.setState({ open: 'open' });
	            document.body.addEventListener('click', this.bodyClick, false);
	          } else {
	            // open -> close
	            this.setState({ open: 'close' });
	          }
	        },
	        destroy: function destroy() {

	          // body click からの遅延処理を clear する
	          // timer を 0 にし error にならないようにする
	          clearTimeout(this.timer);
	          this.timer = 0;
	          // document.body からclick event handler unbind
	          document.body.removeEventListener('click', this.bodyClick);
	        },
	        updateResponse: function updateResponse(response) {
	          this.setState({ response: response });
	        }
	      });

	      // --------------------------------------------------
	      // user root
	      if (this._menu === null) {

	        this._menu = ReactDOM.render(React.createElement(NoticeDom, { response: notificationsDae }), this.element);
	      } else {

	        this._menu.updateResponse(notificationsDae);
	      }
	    }
	  }]);
	  return ViewHeaderMemberNotice;
	}(_View2.View);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 19:56
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
	exports.Notice = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _OffsetAuth2 = __webpack_require__(115);

	var _Api = __webpack_require__(90);

	var _User = __webpack_require__(78);

	var _Length = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * お知らせ(header) を表示します
	 */

	var Notice = exports.Notice = function (_OffsetAuth) {
	  (0, _inherits3.default)(Notice, _OffsetAuth);

	  /**
	   * お知らせ一覧を取得
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   * @param {Number} [offset=0] query offset 値
	   * @param {Number} [length=10] query length 値
	   */

	  function Notice() {
	    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var length = arguments.length <= 3 || arguments[3] === undefined ? _Length.Length.archive : arguments[3];
	    (0, _classCallCheck3.default)(this, Notice);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Notice).call(this, _User.User.token, _Api.Api.users('notice'), resolve, reject, offset, length));
	  }

	  return Notice;
	}(_OffsetAuth2.OffsetAuth);

/***/ },
/* 137 */
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

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * <h3>代替画像パス</h3>
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

	      return '/assets/images/common/thumb-noimage-70x70.png';
	    }
	    /**
	     * img middle 代替画像パス<br>
	     * [Ex.] 記事一覧<br>
	     * @readonly
	     * @return {string} 代替画像パス【記事一覧】
	     */

	  }, {
	    key: 'IMG_MIDDLE',
	    get: function get() {

	      return '/assets/images/common/thumb-noimage-340x150.png';
	    }
	    /**
	     * img large 代替画像パス<br>
	     * [Ex.] スライドショー<br>
	     * @readonly
	     * @return {string} 代替画像パス【スライドショー】
	     */

	  }, {
	    key: 'IMG_LARGE',
	    get: function get() {

	      // ToDo: デザインができたらパスを正しいものに変更する
	      return '/assets/images/common/xxx_slide.png';
	    }
	    /**
	     * video thumbnail 代替画像パス<br>
	     * [Ex.] sidebar video...
	     * @readonly
	     * @return {string} 代替画像パス【16 x 9】
	     */

	  }, {
	    key: 'VIDEO_THUMBNAIL',
	    get: function get() {

	      // ToDo: デザインができたらパスを正しいものに変更する
	      return '/assets/images/common/xxx.png';
	    }
	    /**
	     * video play button overlay<br>
	     * [Ex.] sidebar video...
	     * @readonly
	     * @return {string} 代替画像パス【小】
	     */

	  }, {
	    key: 'VIDEO_PLAY',
	    get: function get() {

	      return '/assets/images/common/thumb-overlay-movie-340x150.png';
	    }
	    /**
	     * **小** ユーザー・プロファイル・アイコン 代替画像パス (25x25)<br>
	     * [Ex.] コメントとか
	     * @readonly
	     * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
	     */

	  }, {
	    key: 'USER_PICTURE',
	    get: function get() {

	      return '/assets/images/common/thumb-user.png';
	    }
	    /**
	     * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)<br>
	     * [Ex.] コメントとか
	     * @readonly
	     * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
	     */

	  }, {
	    key: 'USER_PICTURE_FEATURE',
	    get: function get() {

	      return '/assets/images/common/thumb-user-feature.png';
	    }
	    /**
	     * hero-slider カバーグラデーション画像
	     * @return {string} hero-slider カバーグラデーション画像パスを返します
	     */

	  }, {
	    key: 'KV_OVERLAY',
	    get: function get() {
	      return '/assets/images/index/kv-overlay.png';
	    }
	  }]);
	  return Empty;
	}();

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 20:11
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
	exports.NotificationsDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	var _NoticeDae = __webpack_require__(139);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * お知らせ JSON response
	 */

	var NotificationsDae = exports.NotificationsDae = function () {
	  /**
	   * お知らせ JSON response
	   * @param {Object} [response={}] JSON response
	   */

	  function NotificationsDae() {
	    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, NotificationsDae);

	    response = _Safety.Safety.object(response);

	    var notifications = response.notifications;
	    notifications = _Safety.Safety.array(notifications);
	    var list = [];
	    notifications.forEach(function (notice) {

	      list.push(new _NoticeDae.NoticeDae(notice));
	    });

	    this._response = response;
	    this._notifications = list;
	  }
	  /**
	   * @return {Object|*} JSON response を返します
	   */

	  (0, _createClass3.default)(NotificationsDae, [{
	    key: 'response',
	    get: function get() {
	      return this._response;
	    }
	    /**
	     * @return {Array<NoticeDae>} JSON response.notifications を返します
	     */

	  }, {
	    key: 'notifications',
	    get: function get() {
	      return this._notifications;
	    }
	    /**
	     * @return {Number} count を返します
	     */

	  }, {
	    key: 'total',
	    get: function get() {
	      return this.response.count;
	    }
	    /**
	     * alias total
	     * @return {Number} count を返します
	     */

	  }, {
	    key: 'count',
	    get: function get() {
	      return this.total;
	    }
	  }]);
	  return NotificationsDae;
	}();

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 20:10
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
	exports.NoticeDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	var _Format = __webpack_require__(60);

	var _UserDae = __webpack_require__(126);

	var _NoticeArticleDae = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 通知単独データ
	 */

	var NoticeDae = exports.NoticeDae = function () {
	  /**
	   * 通知
	   * @param {Object} [notice={}] JSON response.notifications 配列単独データ
	   */

	  function NoticeDae() {
	    var notice = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, NoticeDae);

	    notice = _Safety.Safety.object(notice);

	    // date check
	    if (_Safety.Safety.check(notice, 'date')) {

	      this._formatDate = _Format.Format.date(notice.date);
	    }

	    this._notice = notice;

	    // user
	    this._user = new _UserDae.UserDae(notice.user);

	    // article
	    this._article = new _NoticeArticleDae.NoticeArticleDae(notice.article);
	  }
	  /**
	   * @return {Object|*} JSON response.notifications 配列単独データ を返します
	   */

	  (0, _createClass3.default)(NoticeDae, [{
	    key: 'notice',
	    get: function get() {
	      return this._notice;
	    }
	    /**
	     * @return {Number} notifications id を返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.notice.id;
	    }
	    /**
	     * @return {string} ISO8601 日付を返します
	     */

	  }, {
	    key: 'date',
	    get: function get() {
	      return this.notice.date;
	    }
	    /**
	     * @return {string} ISO8601 を日本語形式日付にし返します
	     */

	  }, {
	    key: 'formatDate',
	    get: function get() {
	      return this._formatDate;
	    }
	    /**
	     * @return {string} 相対日付返します
	     */

	  }, {
	    key: 'displayDate',
	    get: function get() {
	      return this.notice.display_date;
	    }
	    /**
	     * アクティビティの種類
	     * - reply : 返信された
	     * - good : goodされた
	     * - bad : badされた
	     * - notice : ニュース的通知
	     *
	     * @return {string} アクティビティの種類を返します
	     */

	  }, {
	    key: 'action',
	    get: function get() {
	      return this.notice.action;
	    }
	    /**
	     * @return {UserDae|*} 誰からの通知かユーザー情報を返します
	     */

	  }, {
	    key: 'user',
	    get: function get() {
	      return this._user;
	    }
	    /**
	     * @return {NoticeArticleDae|*} 対象記事情報を返します
	     */

	  }, {
	    key: 'article',
	    get: function get() {
	      return this._article;
	    }
	  }]);
	  return NoticeDae;
	}();

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 20:44
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
	exports.NoticeArticleDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	var _PopularDae = __webpack_require__(141);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * お知らせ 記事情報
	 */

	var NoticeArticleDae = exports.NoticeArticleDae = function () {
	  /**
	   * お知らせ 記事情報 JSON response.notifications.article
	   * @param {Object} [article={}] お知らせ 記事情報
	   */

	  function NoticeArticleDae() {
	    var article = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, NoticeArticleDae);

	    article = _Safety.Safety.object(article);

	    this._article = article;
	    this._comment = new _PopularDae.PopularDae(article.comment);
	    this._reply = new _PopularDae.PopularDae(article.reply);
	  }
	  /**
	   *
	   * @return {Object|*} お知らせ 記事情報 を返します
	   */

	  (0, _createClass3.default)(NoticeArticleDae, [{
	    key: 'article',
	    get: function get() {
	      return this._article;
	    }
	    /**
	     * @return {string} 記事タイトル を返します
	     */

	  }, {
	    key: 'title',
	    get: function get() {
	      return this.article.title;
	    }
	    /**
	     * @return {string} 記事 url を返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.article.url;
	    }
	    /**
	     * @return {PopularDae|*} article.comment を返します
	     */

	  }, {
	    key: 'comment',
	    get: function get() {
	      return this._comment;
	    }
	    /**
	     * @return {PopularDae|*} article.reply を返します
	     */

	  }, {
	    key: 'reply',
	    get: function get() {
	      return this._reply;
	    }
	  }]);
	  return NoticeArticleDae;
	}();

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/25 - 22:15
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
	exports.PopularDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	var _Format = __webpack_require__(60);

	var _UserDae = __webpack_require__(126);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.comments_popular 配列内 1 data
	 */

	var PopularDae = exports.PopularDae = function () {
	  /**
	   * article.comments_popular:[]
	   * @param {Object} [comment={}] response.comment Object
	   */

	  function PopularDae() {
	    var comment = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, PopularDae);

	    comment = _Safety.Safety.object(comment);

	    if (_Safety.Safety.check(comment, 'date')) {

	      this._formatDate = _Format.Format.date(comment.date);
	    }

	    // comments_popular.user
	    this._user = new _UserDae.UserDae(comment.user);
	    // property
	    this._comment = comment;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Object|*} comment Object を返します
	   */

	  (0, _createClass3.default)(PopularDae, [{
	    key: 'comment',
	    get: function get() {
	      return this._comment;
	    }
	    /**
	     * @return {Number} comment.id を返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.comment.id;
	    }
	    /**
	     * @return {string} ISO8601 日付を返します
	     */

	  }, {
	    key: 'date',
	    get: function get() {
	      return this.comment.date;
	    }
	    /**
	     * @return {string} ISO8601 を日本語形式日付にし返します
	     */

	  }, {
	    key: 'formatDate',
	    get: function get() {
	      return this._formatDate;
	    }
	    /**
	     * @return {string} 相対日付返します
	     */

	  }, {
	    key: 'displayDate',
	    get: function get() {
	      return this.comment.display_date;
	    }
	    /**
	     *
	     * @return {string} コメント本文を返します
	     */

	  }, {
	    key: 'body',
	    get: function get() {
	      return this.comment.body;
	    }
	    /**
	     *
	     * @return {boolean} 自分がGood済みかどうか を返します
	     */

	  }, {
	    key: 'isLike',
	    get: function get() {
	      return this.comment.is_like;
	    }
	    /**
	     *
	     * @return {boolean} 自分がBad済みかどうか を返します
	     */

	  }, {
	    key: 'isBad',
	    get: function get() {
	      return this.comment.is_bad;
	    }
	    /**
	     *
	     * @return {Number} Good数 を返します
	     */

	  }, {
	    key: 'good',
	    get: function get() {
	      return this.comment.like;
	    }
	    /**
	     * this.good alias
	     * @return {Number} Good数 を返します
	     */

	  }, {
	    key: 'like',
	    get: function get() {
	      return this.good;
	    }
	    /**
	     *
	     * @return {Number|number} Bad数 を返します
	     */

	  }, {
	    key: 'bad',
	    get: function get() {
	      return this.comment.bad;
	    }
	    /**
	     *
	     * @return {string} コメント詳細のURLを返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.comment.url;
	    }
	    /**
	     *
	     * @return {UserDae|*} comment した user 情報を返します
	     */

	  }, {
	    key: 'user',
	    get: function get() {
	      return this._user;
	    }
	  }]);
	  return PopularDae;
	}(); // class

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/09 - 23:12
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
	exports.NoticeAction = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _message = {
	  reply: 'コメント',
	  good: 'Good',
	  bad: 'Bad',
	  notice: '通知'
	};

	var NoticeAction = exports.NoticeAction = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function NoticeAction(target) {
	    (0, _classCallCheck3.default)(this, NoticeAction);

	    if (_symbol !== target) {

	      throw new Error('NoticeAction is static Class. not use new NoticeAction().');
	    }
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * action に対応するメッセージ
	   * - reply : 返信された
	   * - good : goodされた
	   * - bad : badされた
	   * - notice : ニュース的通知
	   *
	   * @param {string} action アクティビティの種類
	   * @return {string} action に対応するメッセージ を返します
	   */

	  (0, _createClass3.default)(NoticeAction, null, [{
	    key: 'message',
	    value: function message(action) {
	      return _message[action];
	    }
	  }]);
	  return NoticeAction;
	}();

/***/ },
/* 143 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(137);

	var _User = __webpack_require__(78);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Result = __webpack_require__(88);

	var _ArticleDae = __webpack_require__(145);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// dae
	var React = self.React;
	// action
	// import {Headline} from '../action/home/Headline';
	// data

	// view

	var ReactDOM = self.ReactDOM;
	/**
	 * <h2>View More がある 表示親クラス</h2>
	 */

	var ViewArchive = exports.ViewArchive = function (_View) {
	  (0, _inherits3.default)(ViewArchive, _View);

	  /**
	   * ページングを伴う基本クラス
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
	   * headline = new UT.view.home.ViewHeadline( document.getElementById('someId'), document.getElementById('moreId'), UT.action.home.News, option );
	   * headline.start();
	   *
	   * @param {Element} element root element, Ajax result を配置する
	   * @param {Element} moreElement more button root element, 'View More' を配置する
	   * @param {*} ActionClass Request 対象の Action Class
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewArchive(element, moreElement, ActionClass) {
	    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    (0, _classCallCheck3.default)(this, ViewArchive);

	    option = _Safety.Safety.object(option);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewArchive).call(this, element, option));

	    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._moreElement = moreElement;
	    /**
	     * 取得記事(articles)をArticleDae instance 配列として保存する
	     * @type {Array<ArticleDae>}
	     * @private
	     */
	    _this2._articles = [];
	    /**
	     * 出力左側
	     * @type {Array<ArticleDae>}
	     * @private
	     */
	    _this2._evens = [];
	    /**
	     * 出力右側
	     * @type {Array<ArticleDae>}
	     * @private
	     */
	    _this2._odds = [];

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Element|*} more button root element を返します
	   */

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
	        var error = new Error('[ARCHIVE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else if (articles.length === 0) {

	          // articles empty
	          // request, JSON 取得に問題は無かったが data が取得できなかった
	          var error = new Error('[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。');
	          this.executeSafely(_View2.View.EMPTY_ERROR, error);
	          // this.showError( error.message );
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

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

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

	      // ---
	      // 左右に分割表示のためのglobal配列
	      var evens = this._evens;
	      var odds = this._odds;
	      var articlesList = this._articles;
	      // 前回までの配列length
	      // sequence な index のために必要
	      var prevLast = this._articles.length;
	      // ---

	      // 記事挿入 root element
	      var element = this.element;
	      // 'View More' button root element
	      var moreElement = this.moreElement;
	      // offset, length を使用する Action
	      var action = this.action;
	      var _this = this;

	      // --------------------------------------------
	      // More button
	      // --------------------------------------------
	      var MoreView = React.createClass({
	        displayName: 'MoreView',

	        propTypes: {
	          show: React.PropTypes.bool
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            show: false
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            disable: false
	          };
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          // disable
	          this.setState({ disable: true });
	          action.next();
	        },
	        render: function render() {

	          // hasNext: true, button を表示する？
	          if (this.props.show) {

	            return React.createElement(
	              'div',
	              { id: 'more', className:  true ? 'disable' : '' },
	              React.createElement(
	                'a',
	                { className: 'board-btn-viewmore-link', href: '#more', onClick: this.handleClick },
	                React.createElement(
	                  'span',
	                  null,
	                  'VIEW MORE'
	                )
	              ),
	              React.createElement(
	                'span',
	                { className: 'board-btn-more-cover' },
	                ' '
	              )
	            );
	          } else {

	            return React.createElement('div', { className: 'no-more' });
	          }
	        }

	      });

	      // more button 作成関数
	      // ArchiveDom から呼び出す
	      var moreButton = function moreButton(show) {

	        ReactDOM.render(React.createElement(MoreView, { show: show }), moreElement);
	      };
	      // --------------------------------------------
	      // COMMENTS Popular second
	      // --------------------------------------------
	      var CommentsSecond = React.createClass({
	        displayName: 'CommentsSecond',

	        propType: {
	          seconds: React.PropTypes.array.isRequired,
	          articleId: React.PropTypes.string.isRequired
	        },
	        render: function render() {

	          var seconds = this.props.seconds;
	          var articleId = this.props.articleId;
	          console.log('seconds ', seconds);
	          return React.createElement(
	            'ul',
	            { className: 'comments-second' },
	            seconds.map(function (commentDae, i) {

	              var userDae = commentDae.user;
	              var picture = userDae.profilePicture ? userDae.profilePicture : _Empty.Empty.USER_PICTURE;

	              // CommentsSecond unique key は  記事Id + index + user Id を使用する
	              // 同一ユーザーが複数投稿することがあるため
	              // render 内で unique なことを保証する必要がある
	              return React.createElement(
	                'li',
	                { key: 'user-' + articleId + '-' + i + '-' + userDae.id, className: 'commented-user-item commented-user-item-' + i },
	                React.createElement(
	                  'a',
	                  { className: 'commented-user-thumb', href: userDae.url },
	                  React.createElement('img', { src: picture, alt: userDae.userName })
	                )
	              );
	            })
	          );
	        }
	      });

	      // --------------------------------------------
	      // COMMENTS Popular
	      // --------------------------------------------

	      // good link
	      var GoodLink = React.createClass({
	        displayName: 'GoodLink',

	        propType: {
	          sign: React.PropTypes.bool.isRequired,
	          comment: React.PropTypes.object.isRequired,
	          active: React.PropTypes.bool,
	          callback: React.PropTypes.func
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          this.props.callback(this.props.comment);
	          this.setState({ active: false });
	        },
	        render: function render() {

	          var sign = this.props.sign;
	          var comment = this.props.comment;
	          var active = this.props.active;
	          var activeClass = active ? ' active' : '';

	          if (sign) {

	            // login user
	            return React.createElement(
	              'a',
	              { className: 'comment-response-btn comment-response-like' + activeClass, href: '#', onClick: this.handleClick },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.good
	              )
	            );
	          } else {

	            // not login user
	            return React.createElement(
	              'span',
	              { className: 'comment-response-btn comment-response-like' },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.good
	              )
	            );
	          }
	        }
	      });

	      // bad link
	      var BadLink = React.createClass({
	        displayName: 'BadLink',

	        propType: {
	          sign: React.PropTypes.bool.isRequired,
	          comment: React.PropTypes.object.isRequired,
	          active: React.PropTypes.bool,
	          callback: React.PropTypes.func
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          this.props.callback(this.props.comment);
	          this.setState({ active: false });
	        },
	        render: function render() {

	          var sign = this.props.sign;
	          var comment = this.props.comment;
	          var active = this.props.active;
	          var activeClass = active ? ' active' : '';

	          if (sign) {

	            // login user
	            return React.createElement(
	              'a',
	              { className: 'comment-response-btn comment-response-dislike' + activeClass, href: '#', onClick: this.handleClick },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.bad
	              )
	            );
	          } else {

	            // not login user
	            return React.createElement(
	              'span',
	              { className: 'comment-response-btn comment-response-dislike' },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.bad
	              )
	            );
	          }
	        }
	      });

	      // --------------------------------------------
	      // first + second comment container
	      var PopularDom = React.createClass({
	        displayName: 'PopularDom',

	        propType: {
	          commentsPopular: React.PropTypes.object.isRequired,
	          total: React.PropTypes.number.isRequired,
	          articleId: React.PropTypes.string.isRequired
	        },
	        goodClick: function goodClick(comment) {
	          var commentId = comment.id;
	          var userId = comment.user.id;

	          console.log('goodClick', commentId, userId);
	        },
	        badClick: function badClick(comment) {
	          var commentId = comment.id;
	          var userId = comment.user.id;

	          console.log('badClick', commentId, userId);
	        },
	        render: function render() {

	          var commentsPopular = this.props.commentsPopular;
	          var total = this.props.total;
	          var articleId = this.props.articleId;

	          var emptyFirst = React.createElement('div', { className: 'comments-popular comments-empty' });
	          var second = React.createElement('div', { className: 'comments-second comments-empty' });

	          var hasFirst = commentsPopular.hasFirst;
	          var hasSecond = commentsPopular.hasSecond;
	          var firstDae = commentsPopular.first;
	          var secondsDae = commentsPopular.seconds;
	          console.log('commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae);
	          if (hasSecond) {
	            // 2件目以降も存在する
	            // 2件目以降のDomを生成する
	            second = React.createElement(CommentsSecond, { seconds: secondsDae, articleId: articleId });
	            total -= secondsDae.length;
	          }

	          if (hasFirst) {

	            // 少なくとも1件は存在する
	            total -= 1;

	            console.log('少なくとも1件は存在する ', articleId);
	            // 1件目コメントデータを取り出し
	            var first = firstDae;
	            console.log('first ', articleId, first);
	            // 1件目コメント・ユーザー
	            var firstUser = first.user;
	            // ユーザーサムネイル
	            var picture = firstUser.profilePicture ? firstUser.profilePicture : _Empty.Empty.USER_PICTURE_FEATURE;
	            // login 済かを調べる
	            var sign = _User.User.sign;

	            return React.createElement(
	              'div',
	              { className: 'comments-popular' },
	              React.createElement(
	                'div',
	                { className: 'feature-user comment-item' },
	                React.createElement(
	                  'figure',
	                  { className: 'comment-user' },
	                  React.createElement(
	                    'a',
	                    { className: 'comment-user-link', href: firstUser.url },
	                    React.createElement(
	                      'span',
	                      { className: 'comment-user-thumb' },
	                      React.createElement('img', { src: picture, alt: firstUser.userName })
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'comment-user-data' },
	                      React.createElement(
	                        'p',
	                        { className: 'comment-user-name' },
	                        firstUser.userName
	                      ),
	                      React.createElement(
	                        'p',
	                        { className: 'comment-user-job' },
	                        firstUser.bio
	                      )
	                    )
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'comment-content' },
	                  first.body
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'comment-response' },
	                  React.createElement(GoodLink, {
	                    sign: sign,
	                    comment: first,
	                    callback: this.goodClick
	                  }),
	                  React.createElement(BadLink, {
	                    sign: sign,
	                    comment: first,
	                    callback: this.badClick
	                  })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'commented-user' },
	                second,
	                React.createElement(
	                  'span',
	                  { className: 'commented-user-andmore' },
	                  total > 0 ? '+' + total : ''
	                )
	              )
	            );
	          }

	          return emptyFirst;
	        }, // render
	        componentDidMount: function componentDidMount() {
	          // mount
	        }
	      });

	      // --------------------------------------------
	      // Main Dom
	      // --------------------------------------------
	      // 個別の 記事Dom
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
	          caption: React.PropTypes.string.isRequired,
	          description: React.PropTypes.string.isRequired,
	          thumbnail: React.PropTypes.string.isRequired,
	          mediaType: React.PropTypes.string.isRequired,
	          commentsPopular: React.PropTypes.object.isRequired,
	          commentsCount: React.PropTypes.number.isRequired
	        },
	        render: function render() {
	          var p = this.props;
	          var commentsPopular = p.commentsPopular;
	          var figureTag = undefined;
	          var commentsTotal = p.commentsCount;

	          if (p.mediaType === 'image') {
	            // type: image
	            figureTag = React.createElement(
	              'figure',
	              { className: 'post-thumb post-thumb-' + p.mediaType },
	              React.createElement('img', { src: p.thumbnail, alt: p.caption || p.title })
	            );
	          } else {
	            // type: video
	            figureTag = React.createElement(
	              'figure',
	              { className: 'post-thumb post-thumb-' + p.mediaType },
	              React.createElement('img', { className: 'post-thumb-overlay-movie type-movie', src: '/assets/images/common/thumb-overlay-movie-340x150.png' }),
	              React.createElement('img', { src: p.thumbnail, alt: p.caption || p.title })
	            );
	          }

	          return React.createElement(
	            'div',
	            { className: 'board-item board-item-' + p.index },
	            React.createElement(
	              'a',
	              { className: 'post', href: p.url },
	              figureTag,
	              React.createElement(
	                'div',
	                { className: 'post-data' },
	                React.createElement(
	                  'p',
	                  { className: 'post-category post-category-' + p.slug },
	                  p.category
	                ),
	                React.createElement(
	                  'h3',
	                  { className: 'post-heading' },
	                  p.title
	                ),
	                React.createElement(
	                  'p',
	                  { className: 'post-date' },
	                  p.date
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'post-excerpt-text' },
	                  p.description
	                )
	              )
	            ),
	            React.createElement(PopularDom, { commentsPopular: commentsPopular, total: commentsTotal, articleId: p.id })
	          );
	        }
	      });

	      // ArticleDom 呼び出し用関数
	      // list.forEach での ReactDOM.render 実行記述を簡略化するため
	      var makeDom = function makeDom(dae) {

	        var thumbnail = undefined;
	        var caption = undefined;
	        if (dae.mediaType === 'image') {
	          thumbnail = dae.media.images.medium;
	          caption = dae.media.images.caption;
	        } else {
	          thumbnail = dae.media.video.thumbnail;
	          caption = dae.media.video.caption;
	        }

	        thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_MIDDLE;
	        console.log('dae ', dae.id, dae);
	        // unique key(React)にarticle id(number)記事Idを使用します
	        return React.createElement(ArchiveDom, {
	          key: 'archive-' + dae.id,
	          index: dae.index,
	          id: String(dae.id),
	          slug: dae.category.slug,
	          category: dae.category.label,
	          url: dae.url,
	          date: dae.formatDate,
	          title: dae.title,
	          caption: caption,
	          thumbnail: thumbnail,
	          mediaType: dae.mediaType,
	          description: dae.description,
	          commentsPopular: dae.commentsPopular,
	          commentsCount: dae.commentsCount
	        });
	      };

	      // ------------------------------------------------
	      // 基点 React class
	      // ------------------------------------------------

	      // React Class, Archive Dom
	      var ArticleDom = React.createClass({
	        displayName: 'ArticleDom',

	        propTypes: {
	          list: React.PropTypes.array.isRequired
	        },
	        render: function render() {

	          var list = this.props.list;

	          // even / odd setup
	          // even(left) / odd(right) へ振り分けるための配列作成
	          list.forEach(function (article, i) {

	            var dae = new _ArticleDae.ArticleDae(article);

	            dae.index = prevLast + i;
	            articlesList.push(dae);

	            if (i % 2 === 0) {
	              // even
	              evens.push(dae);
	            } else {
	              // odd
	              odds.push(dae);
	            }
	          });

	          // dom, 左右に振り分けて出力する
	          return React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'div',
	              { className: 'column1 board-column' },
	              evens.map(function (dae) {
	                return makeDom(dae);
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'column2 board-column' },
	              odds.map(function (dae) {
	                return makeDom(dae);
	              })
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {
	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	          // hasNext を元に More View button の表示非表示を決める
	          moreButton(action.hasNext());
	        }
	      }); // ArticleDom

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);

	      // save
	      // this._articles = concatArticles.splice( 0 );
	    }
	  }, {
	    key: 'moreElement',
	    get: function get() {
	      return this._moreElement;
	    }
	  }]);
	  return ViewArchive;
	}(_View2.View); // class

/***/ },
/* 144 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(132);

	var _Safety = __webpack_require__(44);

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

	    option = _Safety.Safety.object(option);
	    message = _Safety.Safety.string(message, '');

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
	          _this.executeSafely(_View2.View.ERROR_MOUNT, message);
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
/* 145 */
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

	var _Safety = __webpack_require__(44);

	var _Format = __webpack_require__(60);

	var _CategoryDae = __webpack_require__(146);

	var _MediaDae = __webpack_require__(147);

	var _UserDae = __webpack_require__(126);

	var _CommentsPopularDae = __webpack_require__(150);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * articles 記事一つのデータを管理します
	 */

	var ArticleDae = exports.ArticleDae = function () {
	  /**
	   * archive系で取得した記事配列から 1件取り出し<br>
	   * データを管理します
	   *
	   * @param {Object} [article={}] articles配列にセットされている article 記事1件データ
	   */

	  function ArticleDae() {
	    var article = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, ArticleDae);

	    article = _Safety.Safety.object(article);

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
	    // 0 になるのでコメントにします
	    // ToDo: 問題がないことを確認したらコメントブロックを削除する
	    // comments_count check
	    /*
	    if ( !Safety.check( article, 'comments_count', 'number' ) ) {
	       article.comments_count = 0;
	     }
	    */
	    var commentsCount = parseInt(article.comments_count, 10);
	    commentsCount = _Safety.Safety.integer(commentsCount, 10);

	    this._commentsCount = commentsCount;

	    // date check
	    if (_Safety.Safety.check(article, 'date')) {

	      this._formatDate = _Format.Format.date(article.date);
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
	     * alias commentsTotal
	     * @return {Number} article.comments_count
	     */

	  }, {
	    key: 'commentsCount',
	    get: function get() {
	      /*
	      console.log( 'article.comments_count', this._article.comments_count );
	      return parseInt( this.article.comments_count, 10);
	      */
	      return this.commentsTotal;
	    }

	    /**
	     * コメント総数を調べます
	     * @return {Number|*} コメント総数を返します, article.comments_count
	     */

	  }, {
	    key: 'commentsTotal',
	    get: function get() {
	      return this._commentsCount;
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
	      return this._formatDate;
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
/* 146 */
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CategoryDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.category を管理します
	 */

	var CategoryDae = exports.CategoryDae = function () {
	  /**
	   * article.category を管理します
	   * @param {Object} [category={}] article.category
	   */

	  function CategoryDae() {
	    var category = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, CategoryDae);

	    category = _Safety.Safety.object(category);
	    this._category = category;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Object|*} article.category を返します
	   */

	  (0, _createClass3.default)(CategoryDae, [{
	    key: 'category',
	    get: function get() {
	      return this._category;
	    }
	    /**
	     * @return {string|undefined} article.category.label を返します
	     */

	  }, {
	    key: 'label',
	    get: function get() {
	      return this.category.label;
	    }
	    /**
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
/* 147 */
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

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _ImagesDae = __webpack_require__(148);

	var _VideoDae = __webpack_require__(149);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.media
	 */

	var MediaDae = exports.MediaDae = function () {
	  /**
	   * responce.media を images / video にわけます
	   * @param {Object} [media={}] article.media
	   */

	  function MediaDae() {
	    var media = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, MediaDae);

	    media = _Safety.Safety.object(media);

	    this._media = media;
	    this._list = [];

	    // 記事詳細は media.images が最大5件になる
	    // 最大5件は取り消されていた
	    // JSON に配列が残っているので処理は残す
	    if (!Array.isArray(media.images)) {
	      // 1件, 配列では無い
	      this._images = new _ImagesDae.ImagesDae(media.images);
	      this._list.push(this._images);
	    } else {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {

	        for (var _iterator = (0, _getIterator3.default)(media.images), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var image = _step.value;

	          this._list.push(new _ImagesDae.ImagesDae(image));
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
	    }

	    this._video = new _VideoDae.VideoDae(media.video);
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {Object|*} article.media
	   */

	  (0, _createClass3.default)(MediaDae, [{
	    key: 'media',
	    get: function get() {
	      return this._media;
	    }
	    /**
	     * @return {ImagesDae|*} article.media.images 存在しない時はundefined を返します
	     */

	  }, {
	    key: 'images',
	    get: function get() {
	      return this._images;
	    }
	    /**
	     * @return {VideoDae|*} article.media.video
	     */

	  }, {
	    key: 'video',
	    get: function get() {
	      return this._video;
	    }
	    /**
	     * @return {Array<ImagesDae>} 記事詳細 images 配列を返します, 存在しない時はundefined を返します
	     */

	  }, {
	    key: 'list',
	    get: function get() {
	      return this._list;
	    }
	  }]);
	  return MediaDae;
	}();

/***/ },
/* 148 */
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ImagesDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.media.images
	 */

	var ImagesDae = exports.ImagesDae = function () {
	  /**
	   *
	   * @param {Object} [images={}] article.media.images
	   */

	  function ImagesDae() {
	    var images = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, ImagesDae);

	    images = _Safety.Safety.object(images);
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
	     * for slide
	     * @return {string} article.media.images.large
	     */

	  }, {
	    key: 'large',
	    get: function get() {
	      return this.images.large;
	    }
	    /**
	     * 記事一覧
	     * @return {string} article.media.images.medium
	     */

	  }, {
	    key: 'medium',
	    get: function get() {
	      return this.images.medium;
	    }
	    /**
	     * 1 x 1 small
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
/* 149 */
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VideoDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.media.video
	 */

	var VideoDae = exports.VideoDae = function () {
	  /**
	   *
	   * @param {Object} [video={}] article.media.video
	   */

	  function VideoDae() {
	    var video = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, VideoDae);

	    video = _Safety.Safety.object(video);
	    this._video = video;
	  }
	  /**
	   *
	   * @return {Object|*} article.media.video
	   */

	  (0, _createClass3.default)(VideoDae, [{
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
	    // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=1742013165
	    // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=404686668
	    // 2016-02-08 21:08:24 JSON 変更
	    ///**
	    // * 1 x 1 small size
	    // * @return {string} article.media.video.thumbnail
	    // */
	    //get thumbnail():string {
	    //  return this.video.thumbnail;
	    //}
	    ///**
	    // * for slide
	    // * @return {string} article.media.images.large
	    // */
	    //get large():string {
	    //  return this.video.large;
	    //}
	    ///**
	    // * 16 x 9 記事一覧
	    // * @return {string} article.media.images.medium
	    // */
	    //get medium():string {
	    //  return this.video.medium;
	    //}
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
/* 150 */
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CommentsPopularDae = undefined;

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _PopularDae = __webpack_require__(141);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * article.comments_popular
	 */

	var CommentsPopularDae = exports.CommentsPopularDae = function () {
	  /**
	   * article.comments_popular
	   * @param {Array} [comments=[]] article.comments_popular
	   */

	  function CommentsPopularDae() {
	    var comments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    (0, _classCallCheck3.default)(this, CommentsPopularDae);

	    comments = _Safety.Safety.array(comments);
	    this._comments = comments;

	    //let popularComments = [];
	    //for ( var comment of comments ) {
	    //  popularComments.push( new PopularDae( comment ) );
	    //}
	    //
	    //this._popularComments = popularComments;

	    this._popularComments = null;
	    this.init();
	  }
	  // ---------------------------------------------------
	  //  Method
	  // ---------------------------------------------------
	  /**
	   * PopularDae instance を作成します
	   */

	  (0, _createClass3.default)(CommentsPopularDae, [{
	    key: 'init',
	    value: function init() {
	      if (this._popularComments === null) {
	        var popularComments = [];
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = (0, _getIterator3.default)(this._comments), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var comment = _step.value;

	            popularComments.push(new _PopularDae.PopularDae(comment));
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

	        this._popularComments = popularComments;
	      }
	    }
	    // ---------------------------------------------------
	    //  GETTER / SETTER
	    // ---------------------------------------------------
	    /**
	     * @return {Array|*} article.comments_popular オリジナルを返します
	     */

	  }, {
	    key: 'original',
	    get: function get() {
	      return this._comments;
	    }
	    /**
	     * @return {Array<CommentsDae>} article.comments_popular 配列, CommentsDae型を返します
	     */

	  }, {
	    key: 'comments',
	    get: function get() {
	      return this._popularComments.slice(0);
	    }
	    /**
	     * this.total alias
	     * @return {Number} article.comments_popular.length
	     */

	  }, {
	    key: 'length',
	    get: function get() {
	      return this.total;
	    }
	    /**
	     * comments_popular 配列数
	     * @return {Number} article.comments_popular.length
	     */

	  }, {
	    key: 'total',
	    get: function get() {
	      return this.comments.length;
	    }
	    /**
	     * comment 1 件目の存在有無
	     * @return {boolean} article.comments_popular 1件目があるかないかの真偽値を返します
	     */

	  }, {
	    key: 'hasFirst',
	    get: function get() {
	      return this.total > 0;
	    }
	    /**
	     * comment 2 件目以降の存在有無
	     * @return {boolean} article.comments_popular 2件目以降があるかないかの真偽値を返します
	     */

	  }, {
	    key: 'hasSecond',
	    get: function get() {
	      return this.total > 1;
	    }
	    /**
	     * 先頭のCommentsDae
	     * @return {CommentsDae} 1件目のCommentsDaeを返します
	     */

	  }, {
	    key: 'first',
	    get: function get() {
	      this.init();
	      return this.comments[0];
	    }
	    /**
	     * 先頭以外の配列
	     * @return {Array.<CommentsDae>} 2件目以降の配列を返します
	     */

	  }, {
	    key: 'exceptFirst',
	    get: function get() {

	      var clone = undefined;

	      if (this.hasSecond) {
	        clone = this.comments.splice(0);
	        clone.shift();
	      }
	      return clone;
	    }
	    /**
	     * 先頭以外の配列, alias this.exceptFirst
	     * @return {Array.<CommentsDae>} 2件目以降の配列を返します
	     */

	  }, {
	    key: 'seconds',
	    get: function get() {
	      return this.exceptFirst;
	    }
	  }]);
	  return CommentsPopularDae;
	}();

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/01 - 22:33
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// util

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewArchiveMasonry = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Scroll = __webpack_require__(152);

	var _Empty = __webpack_require__(137);

	var _User = __webpack_require__(78);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Result = __webpack_require__(88);

	var _ArticleDae = __webpack_require__(145);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// dae
	var React = self.React;
	// action
	// import {Headline} from '../action/home/Headline';
	// data

	// view

	// app

	var ReactDOM = self.ReactDOM;

	// imagesLoaded, isotope
	var imagesLoaded = self.imagesLoaded;
	var Isotope = self.Isotope;

	/**
	 * archive 一覧を isotope で
	 */

	var ViewArchiveMasonry = exports.ViewArchiveMasonry = function (_View) {
	  (0, _inherits3.default)(ViewArchiveMasonry, _View);

	  /**
	   * archive 一覧標示後 isotope で位置調整します
	   * @param {Element} element root element, Ajax result を配置する
	   * @param {Element} moreElement more button root element, 'View More' を配置する
	   * @param {Function} [ActionClass=null] Request 対象の Action Class
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [useMasonry=true] isotope を行うかの
	   */

	  function ViewArchiveMasonry(element, moreElement) {
	    var ActionClass = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var useMasonry = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
	    (0, _classCallCheck3.default)(this, ViewArchiveMasonry);

	    option = _Safety.Safety.object(option);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewArchiveMasonry).call(this, element, option));

	    if (typeof ActionClass === 'function') {

	      _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
	    }
	    _this2._moreElement = moreElement;
	    /**
	     * 取得記事(articles)をArticleDae instance 配列として保存する
	     * @type {Array<ArticleDae>}
	     * @private
	     */
	    _this2._articles = [];
	    _this2._useMasonry = !!useMasonry;
	    _this2._top = 0;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Element|*} more button root element を返します
	   */

	  (0, _createClass3.default)(ViewArchiveMasonry, [{
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
	      console.log('ViewArchiveMasonry done ', result);
	      if (typeof articles === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[ARCHIVE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else if (articles.length === 0) {

	          // articles empty
	          // request, JSON 取得に問題は無かったが data が取得できなかった
	          var error = new Error('[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。');
	          this.executeSafely(_View2.View.EMPTY_ERROR, error);
	          // this.showError( error.message );
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

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

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

	      // ---
	      // Masonry flag
	      var useMasonry = this._useMasonry;

	      // 既存データ用のglobal配列
	      var articlesList = this._articles;

	      // 前回までの配列length
	      // sequence な index のために必要
	      var prevLast = this._articles.length;
	      // ---

	      // 記事挿入 root element
	      var element = this.element;
	      // 'View More' button root element
	      var moreElement = this.moreElement;
	      // offset, length を使用する Action
	      var action = this.action;
	      // 参照を保持
	      var _this = this;

	      // --------------------------------------------
	      // More button
	      // --------------------------------------------
	      var MoreView = React.createClass({
	        displayName: 'MoreView',

	        propTypes: {
	          show: React.PropTypes.bool
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            show: false
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            disable: false
	          };
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          // disable
	          this.setState({ disable: true });
	          action.next();
	          _this._top = _Scroll.Scroll.y;
	        },
	        render: function render() {

	          // hasNext: true, button を表示する？
	          if (this.props.show) {

	            return React.createElement(
	              'div',
	              { id: 'more', className:  true ? 'disable' : '' },
	              React.createElement(
	                'a',
	                { className: 'board-btn-viewmore-link', href: '#more', onClick: this.handleClick },
	                React.createElement(
	                  'span',
	                  null,
	                  'VIEW MORE'
	                )
	              ),
	              React.createElement(
	                'span',
	                { className: 'board-btn-more-cover' },
	                ' '
	              )
	            );
	          } else {

	            // button 表示なし
	            return React.createElement('div', { className: 'no-more' });
	          }
	        }

	      });

	      // more button 作成関数
	      // ArchiveDom から呼び出す
	      var moreButton = function moreButton(show) {

	        // moreElement 存在チェックを行う
	        // Element 型を保証する
	        if (moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement) {

	          // チェックをパスし実行する
	          ReactDOM.render(React.createElement(MoreView, { show: show }), moreElement);
	        }
	      };
	      // --------------------------------------------
	      // COMMENTS Popular second
	      // --------------------------------------------
	      var CommentsSecond = React.createClass({
	        displayName: 'CommentsSecond',

	        propType: {
	          seconds: React.PropTypes.array.isRequired,
	          articleId: React.PropTypes.string.isRequired
	        },
	        render: function render() {

	          var seconds = this.props.seconds;
	          var articleId = this.props.articleId;
	          console.log('seconds ', seconds);
	          return React.createElement(
	            'ul',
	            { className: 'comments-second' },
	            seconds.map(function (commentDae, i) {

	              var userDae = commentDae.user;
	              var picture = userDae.profilePicture ? userDae.profilePicture : _Empty.Empty.USER_PICTURE;

	              // CommentsSecond unique key は  記事Id + index + user Id を使用する
	              // 同一ユーザーが複数投稿することがあるため
	              // render 内で unique なことを保証する必要がある
	              return React.createElement(
	                'li',
	                { key: 'user-' + articleId + '-' + i + '-' + userDae.id, className: 'commented-user-item commented-user-item-' + i },
	                React.createElement(
	                  'a',
	                  { className: 'commented-user-thumb', href: userDae.url },
	                  React.createElement('img', { src: picture, alt: userDae.userName })
	                )
	              );
	            })
	          );
	        }
	      });

	      // --------------------------------------------
	      // COMMENTS Popular
	      // --------------------------------------------

	      // good link
	      var GoodLink = React.createClass({
	        displayName: 'GoodLink',

	        propType: {
	          sign: React.PropTypes.bool.isRequired,
	          comment: React.PropTypes.object.isRequired,
	          active: React.PropTypes.bool,
	          callback: React.PropTypes.func
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          this.props.callback(this.props.comment);
	          this.setState({ active: false });
	        },
	        render: function render() {

	          var sign = this.props.sign;
	          var comment = this.props.comment;
	          var active = this.props.active;
	          // active（click可能）にするかを表す
	          var activeClass = active ? ' active' : '';

	          if (sign) {

	            // login user
	            // click ずみの時は不可
	            return React.createElement(
	              'a',
	              { className: 'comment-response-btn comment-response-like' + activeClass, href: '#', onClick: this.handleClick },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.good
	              )
	            );
	          } else {

	            // not login user
	            // click 不可
	            return React.createElement(
	              'span',
	              { className: 'comment-response-btn comment-response-like' },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.good
	              )
	            );
	          }
	        }
	      });

	      // bad link
	      var BadLink = React.createClass({
	        displayName: 'BadLink',

	        propType: {
	          sign: React.PropTypes.bool.isRequired,
	          comment: React.PropTypes.object.isRequired,
	          active: React.PropTypes.bool,
	          callback: React.PropTypes.func
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          this.props.callback(this.props.comment);
	          this.setState({ active: false });
	        },
	        render: function render() {

	          var sign = this.props.sign;
	          var comment = this.props.comment;
	          var active = this.props.active;
	          var activeClass = active ? ' active' : '';

	          if (sign) {

	            // login user
	            return React.createElement(
	              'a',
	              { className: 'comment-response-btn comment-response-dislike' + activeClass, href: '#', onClick: this.handleClick },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.bad
	              )
	            );
	          } else {

	            // not login user
	            return React.createElement(
	              'span',
	              { className: 'comment-response-btn comment-response-dislike' },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.bad
	              )
	            );
	          }
	        }
	      });

	      // --------------------------------------------
	      // first + second comment container
	      var PopularDom = React.createClass({
	        displayName: 'PopularDom',

	        propType: {
	          commentsPopular: React.PropTypes.object.isRequired,
	          total: React.PropTypes.number.isRequired,
	          articleId: React.PropTypes.string.isRequired
	        },
	        goodClick: function goodClick(comment) {
	          var commentId = comment.id;
	          var userId = comment.user.id;

	          console.log('goodClick', commentId, userId);
	        },
	        badClick: function badClick(comment) {
	          var commentId = comment.id;
	          var userId = comment.user.id;

	          console.log('badClick', commentId, userId);
	        },
	        render: function render() {

	          var commentsPopular = this.props.commentsPopular;
	          var total = this.props.total;
	          var articleId = this.props.articleId;

	          var emptyFirst = React.createElement('div', { className: 'comments-popular comments-empty' });
	          var second = React.createElement('div', { className: 'comments-second comments-empty' });

	          var hasFirst = commentsPopular.hasFirst;
	          var hasSecond = commentsPopular.hasSecond;
	          var firstDae = commentsPopular.first;
	          var secondsDae = commentsPopular.seconds;
	          console.log('commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae);
	          if (hasSecond) {
	            // 2件目以降も存在する
	            // 2件目以降のDomを生成する
	            second = React.createElement(CommentsSecond, { seconds: secondsDae, articleId: articleId });
	            total -= secondsDae.length;
	          }

	          if (hasFirst) {

	            // 少なくとも1件は存在する
	            total -= 1;

	            console.log('少なくとも1件は存在する ', articleId);
	            // 1件目コメントデータを取り出し
	            var first = firstDae;
	            console.log('first ', articleId, first);
	            // 1件目コメント・ユーザー
	            var firstUser = first.user;
	            // ユーザーサムネイル
	            var picture = firstUser.profilePicture ? firstUser.profilePicture : _Empty.Empty.USER_PICTURE_FEATURE;
	            // login 済かを調べる
	            var sign = _User.User.sign;

	            return React.createElement(
	              'div',
	              { className: 'comments-popular' },
	              React.createElement(
	                'div',
	                { className: 'feature-user comment-item' },
	                React.createElement(
	                  'figure',
	                  { className: 'comment-user' },
	                  React.createElement(
	                    'a',
	                    { className: 'comment-user-link', href: firstUser.url },
	                    React.createElement(
	                      'span',
	                      { className: 'comment-user-thumb' },
	                      React.createElement('img', { src: picture, alt: firstUser.userName })
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'comment-user-data' },
	                      React.createElement(
	                        'p',
	                        { className: 'comment-user-name' },
	                        firstUser.userName
	                      ),
	                      React.createElement(
	                        'p',
	                        { className: 'comment-user-job' },
	                        firstUser.bio
	                      )
	                    )
	                  )
	                ),
	                React.createElement('div', { className: 'comment-content', dangerouslySetInnerHTML: { __html: first.body } }),
	                React.createElement(
	                  'div',
	                  { className: 'comment-response' },
	                  React.createElement(GoodLink, {
	                    sign: sign,
	                    comment: first,
	                    callback: this.goodClick
	                  }),
	                  React.createElement(BadLink, {
	                    sign: sign,
	                    comment: first,
	                    callback: this.badClick
	                  })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'commented-user' },
	                second,
	                React.createElement(
	                  'span',
	                  { className: 'commented-user-andmore' },
	                  total > 0 ? '+' + total : ''
	                )
	              )
	            );
	          }

	          return emptyFirst;
	        }, // render
	        componentDidMount: function componentDidMount() {
	          // mount
	        }
	      });

	      // ------------------------------------------------
	      // 基点 React class
	      // ------------------------------------------------

	      // 個別の 記事Dom
	      // React Class, Archive Dom
	      var ArticleDom = React.createClass({
	        displayName: 'ArticleDom',

	        propTypes: {
	          list: React.PropTypes.array.isRequired
	        },
	        getInitialState: function getInitialState() {
	          return {
	            isotope: null,
	            img: null,
	            route: null,
	            nodes: null,
	            arranged: 'prepare'
	          };
	        },
	        render: function render() {

	          var list = this.props.list;

	          // dom出力する
	          return React.createElement(
	            'div',
	            { className: this.state.arranged, ref: 'boardRout' },
	            list.map(function (dae, i) {

	              //let dae = new ArticleDae( article );
	              //articlesList.push( dae );

	              var thumbnail = undefined;
	              var caption = undefined;
	              if (dae.mediaType === 'image') {
	                thumbnail = dae.media.images.medium;
	                caption = dae.media.images.caption;
	              } else {
	                thumbnail = dae.media.video.thumbnail;
	                caption = dae.media.video.caption;
	              }

	              thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_MIDDLE;

	              var commentsPopular = dae.commentsPopular;
	              var figureTag = undefined;
	              var commentsTotal = dae.commentsCount;

	              console.log('ArchiveDom ', dae.id, dae.commentsCount, dae.commentsPopular);

	              if (dae.mediaType === 'image') {
	                // type: image
	                figureTag = React.createElement(
	                  'figure',
	                  { className: 'post-thumb post-thumb-' + dae.mediaType },
	                  React.createElement('img', { src: thumbnail, alt: caption || dae.title })
	                );
	              } else {
	                // type: video
	                figureTag = React.createElement(
	                  'figure',
	                  { className: 'post-thumb post-thumb-' + dae.mediaType },
	                  React.createElement('img', { className: 'post-thumb-overlay-movie type-movie', src: '/assets/images/common/thumb-overlay-movie-340x150.png' }),
	                  React.createElement('img', { src: thumbnail, alt: caption || dae.title })
	                );
	              }

	              // unique key(React)にarticle id(number)記事Idを使用します
	              return React.createElement(
	                'div',
	                { key: 'archive-' + dae.id, className: 'board-item board-item-' + i },
	                React.createElement(
	                  'a',
	                  { className: 'post', href: dae.url },
	                  figureTag,
	                  React.createElement(
	                    'div',
	                    { className: 'post-data' },
	                    React.createElement(
	                      'p',
	                      { className: 'post-category post-category-' + dae.category.slug },
	                      dae.category.label
	                    ),
	                    React.createElement(
	                      'h3',
	                      { className: 'post-heading' },
	                      dae.title
	                    ),
	                    React.createElement(
	                      'p',
	                      { className: 'post-date' },
	                      dae.formatDate
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'post-excerpt-text' },
	                      dae.description
	                    )
	                  )
	                ),
	                React.createElement(PopularDom, { commentsPopular: commentsPopular, total: commentsTotal, articleId: dae.id })
	              );
	            })
	          );
	        },
	        componentDidMount: function componentDidMount() {
	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	          // hasNext を元に More View button の表示非表示を決める
	          moreButton(action.hasNext());

	          // masonry flag が true の時に shouldMasonry を実行します
	          if (useMasonry) {

	            this.shouldMasonry();
	          }
	        },
	        shouldComponentUpdate: function shouldComponentUpdate() {
	          console.log('------------+++++++++++++ shouldComponentUpdate ------------');
	          // http://stackoverflow.com/questions/25135261/react-js-and-isotope-js
	          // isotope がセットアップすると呼び出されるので
	          // 常にfalseを返し無視させます
	          return false;
	        },
	        componentWillUnmount: function componentWillUnmount() {
	          console.log('************ componentWillUnmount ************');
	          // unmount 時に isotope を破棄します
	          this.state.isotope.destroy();
	        },
	        shouldMasonry: function shouldMasonry() {
	          // isotope を実行します
	          var boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
	          var childNodes = boardRout.childNodes;
	          console.log('shouldMasonry', boardRout, childNodes);

	          // imagesLoaded を使用し画像ロード完了後に isotope を実行します
	          var img = imagesLoaded(childNodes);

	          // img {imagesLoaded} always event handler unbind するためにインスタンスを state に保存します
	          // route {Element} isotope 基準 element
	          // nodes {ElementList} isotope 対象 childNodes, 現在は使用していません, ひょっとすると将来使うかも...
	          this.setState({ img: img, nodes: childNodes, route: boardRout });

	          // 画像読み込む完了 event へ bind します
	          img.on('always', this.onImages);
	        },
	        // 画像読み込む完了 event handler
	        onImages: function onImages() {

	          var img = this.state.img;
	          var route = this.state.route;

	          // event から event handler を unbind します
	          img.off('always', this.onImages);

	          // isotope を行います
	          var isotope = new Isotope(route, {
	            itemSelector: '.board-item',
	            masonry: {
	              gutter: 30
	            }
	          });

	          // ToDo: arranged: 'arranged' が効いていない様子 親コンテナの css class を変えたい
	          // state は変更されている
	          // element の class が変わらない
	          this.setState({ isotope: isotope, arranged: 'arranged' });
	          console.log('%%%%%%%%% arrangeComplete %%%%%%%%%%%', _this._top);
	          // render 時に 0 位置に戻るので
	          // click 時の pageOffsetY へ移動させる
	          _Scroll.Scroll.y = _this._top;
	        }
	      }); // ArticleDom

	      // ------------------------------------------------
	      articles.forEach(function (article, i) {

	        var dae = new _ArticleDae.ArticleDae(article);

	        dae.index = prevLast + i;
	        articlesList.push(dae);
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articlesList }), element);
	    }
	  }, {
	    key: 'moreElement',
	    get: function get() {
	      return this._moreElement;
	    }
	  }]);
	  return ViewArchiveMasonry;
	}(_View2.View);

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/03 - 14:01
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
	exports.Scroll = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher2 = __webpack_require__(77);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = null;
	var _instance = null;

	/**
	 * scroll に関する処理
	 */

	var Scroll = exports.Scroll = function (_EventDispatcher) {
	  (0, _inherits3.default)(Scroll, _EventDispatcher);

	  /**
	   * scroll に関する singleton class
	   * @param {Symbol} target Singleton を実現するための private symbol
	   * @returns {Scroll}
	   */

	  function Scroll(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, Scroll);

	    if (_symbol !== target) {

	      throw new Error('Scroll is singleton Class. not use new Scroll(). instead Scroll.factory()');
	    }

	    if (_instance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Scroll).call(this));

	      _instance = _this;
	      _this.boundScroll = _this.onScroll.bind(_this);
	    }

	    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  // ---------------------------------------------------
	  //  method
	  // ---------------------------------------------------

	  (0, _createClass3.default)(Scroll, [{
	    key: 'start',
	    value: function start() {
	      window.addEventListener('scroll', this.boundScroll, false);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      window.removeEventListener('scroll', this.boundScroll);
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll(event) {
	      this.dispatch({ type: Scroll.SCROLL, originalEvent: event, y: Scroll.y });
	    }
	    // ---------------------------------------------------
	    //  static GETTER / SETTER
	    // ---------------------------------------------------

	  }], [{
	    key: 'factory',

	    /*
	      motion( top:Number, duration:Number = 0.5, easing:Function = null ):void {
	    
	      }
	      */
	    // ---------------------------------------------------
	    //  static method
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {Scroll} Scroll instance を返します
	     */
	    value: function factory() {

	      if (_instance === null) {

	        _instance = new Scroll(_symbol);
	      }

	      return _instance;
	    }
	  }, {
	    key: 'SCROLL',
	    get: function get() {
	      return 'scroll';
	    }
	    /**
	     * scroll top 位置
	     * @return {Number} scroll top 位置を返します
	     */

	  }, {
	    key: 'y',
	    get: function get() {
	      // https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
	      return typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	    }
	    /**
	     * scroll top 位置 を設定します
	     * @param {Number} top
	     */
	    ,
	    set: function set(top) {
	      window.scrollTo(0, top);
	    }
	  }]);
	  return Scroll;
	}(_EventDispatcher2.EventDispatcher);

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/01 - 22:33
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// event

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewArchiveMasonryInfinite = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher = __webpack_require__(77);

	var _Scroll = __webpack_require__(152);

	var _Empty = __webpack_require__(137);

	var _User = __webpack_require__(78);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Result = __webpack_require__(88);

	var _Safety = __webpack_require__(44);

	var _ArticleDae = __webpack_require__(145);

	var _Rise = __webpack_require__(154);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// dae

	// data

	// view

	// app
	var React = self.React;

	// ui

	// util

	var ReactDOM = self.ReactDOM;

	// imagesLoaded, isotope
	var imagesLoaded = self.imagesLoaded;
	var Isotope = self.Isotope;

	/**
	 * archive 一覧を isotope で
	 */

	var ViewArchiveMasonryInfinite = exports.ViewArchiveMasonryInfinite = function (_View) {
	  (0, _inherits3.default)(ViewArchiveMasonryInfinite, _View);

	  /**
	   * <p>archive 一覧標示後 isotope で位置調整します<br>
	   * + infinite scroll を実装します
	   * </p>
	   * @param {Element} element root element, Ajax result を配置する
	   * @param {Element} moreElement more button root element, 'View More' を配置する
	   * @param {Function} [ActionClass=null] Request 対象の Action Class
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [useMasonry=true] isotope を行うかの
	   */

	  function ViewArchiveMasonryInfinite(element, moreElement) {
	    var ActionClass = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var useMasonry = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
	    (0, _classCallCheck3.default)(this, ViewArchiveMasonryInfinite);

	    option = _Safety.Safety.object(option);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewArchiveMasonryInfinite).call(this, element, option));

	    if (typeof ActionClass === 'function') {

	      _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
	    }
	    _this2._moreElement = moreElement;
	    /**
	     * 取得記事(articles)をArticleDae instance 配列として保存する
	     * @type {Array<ArticleDae>}
	     * @private
	     */
	    _this2._articles = [];
	    _this2._useMasonry = !!useMasonry;
	    // ArticleDom instance を保持します
	    // first render を区別するためにも使用します
	    _this2._articleRendered = null;
	    // more button instance を保持します
	    _this2._moreRendered = null;
	    // response.request object を保持する
	    _this2._request = null;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Element|*} more button root element を返します
	   */

	  (0, _createClass3.default)(ViewArchiveMasonryInfinite, [{
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
	      console.log('ViewArchiveMasonry done ', result);
	      if (typeof articles === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[ARCHIVE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else if (articles.length === 0) {

	          // articles empty
	          // request, JSON 取得に問題は無かったが data が取得できなかった
	          var error = new Error('[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。');
	          this.executeSafely(_View2.View.EMPTY_ERROR, error);
	          // this.showError( error.message );
	        } else {

	            this._request = result.request;
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

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

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

	      // Masonry flag
	      var useMasonry = this._useMasonry;

	      // 既存データ用のglobal配列
	      var articlesList = this._articles;

	      // 前回までの配列length
	      // sequence な index のために必要
	      var prevLast = this._articles.length;

	      // 記事挿入 root element
	      var element = this.element;
	      // 'View More' button root element
	      var moreElement = this.moreElement;
	      // offset, length を使用する Action
	      var action = this.action;
	      // 参照を保持
	      var _this = this;

	      // --------------------------------------------
	      // More button
	      // --------------------------------------------
	      var MoreView = React.createClass({
	        displayName: 'MoreView',

	        propTypes: {
	          show: React.PropTypes.bool.isRequired,
	          loading: React.PropTypes.string
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            loading: ''
	          };
	        },
	        getInitialState: function getInitialState() {
	          // Rise instance を保持する
	          this.rise = null;

	          return {
	            disable: false,
	            show: this.props.show,
	            loading: this.props.loading
	          };
	        },
	        render: function render() {

	          // hasNext: true, button を表示する？
	          if (this.state.show) {

	            return React.createElement(
	              'div',
	              { id: 'more', className: 'board-btn-viewmore' + this.state.loading },
	              React.createElement(
	                'a',
	                { className: 'board-btn-viewmore-link', href: '#more', onClick: this.handleClick },
	                React.createElement(
	                  'span',
	                  null,
	                  'VIEW MORE'
	                )
	              ),
	              React.createElement(
	                'span',
	                { className: 'board-btn-more-cover' },
	                ' '
	              )
	            );
	          } else {

	            // button 表示なし
	            return React.createElement('div', { className: 'no-more' });
	          }
	        },
	        componentDidMount: function componentDidMount() {

	          if (this.state.show && this.rise === null) {
	            // mount 後
	            // button が表示されているなら rise 監視を始める
	            this.rise = new _Rise.Rise(element);
	            this.rise.on(_Rise.Rise.RISE, this.onRise);
	            this.rise.start();
	          }
	        },
	        componentWillUnmount: function componentWillUnmount() {
	          // unmount 時に rise 破棄を行う
	          this.destroy();
	        },
	        // -----------------------------------------
	        // button 関連 custom method
	        // rise 関連 event を破棄する
	        destroy: function destroy() {
	          // rise 監視を破棄する
	          if (this.rise !== null) {
	            this.rise.stop();
	            this.rise.off(_Rise.Rise.RISE, this.onRise);
	            this.rise = null;
	          }
	        },
	        // 緊急用, button click を残す
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          // disable
	          // this.setState( { loading: ' loading' } );
	          // action.next();
	          this.onRise();
	        },
	        // button 表示・非表示
	        updateShow: function updateShow(show) {

	          if (!show) {
	            // button を非表示にするので rise 監視を止める
	            this.destroy();
	          } else {
	            // button 表示, loading 表示を止める
	            this.updateLoading(false);
	          }

	          this.setState({ show: show });
	        },
	        // loading 表示 on / off
	        // on: true, off: false
	        updateLoading: function updateLoading() {
	          var loading = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	          var loadingClass = '';
	          if (loading && this.rise !== null) {

	            // loading 中は監視を止める
	            loadingClass = ' loading';
	            this.rise.stop();
	            action.next();
	          } else {

	            // loading が終わると監視開始
	            this.rise.start();
	          }

	          // loading 表示のための css class を追加・削除
	          this.setState({ loading: loadingClass });
	        },
	        // Rise.RISE event handler
	        // 次 offset JSON を取得する
	        onRise: function onRise(event) {
	          console.log('========================== onRise ', event);

	          this.updateLoading(true);
	        }
	      });

	      // more button 作成関数
	      // ArchiveDom から呼び出す
	      var moreButton = function moreButton(show) {

	        show = !!show;
	        // moreElement 存在チェックを行う
	        // Element 型を保証する
	        // _moreRendered が null の時のみ, instance があれば state を update する
	        if (_Safety.Safety.isElement(moreElement) && _this._moreRendered === null) {
	          // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

	          // チェックをパスし実行する
	          _this._moreRendered = ReactDOM.render(React.createElement(MoreView, { show: show }), moreElement);
	        } else {

	          _this._moreRendered.updateShow(show);
	        }
	      };

	      // more button 表示状態を loading on / off 切替えます
	      /*
	      let loadingButton = ( loading:boolean ) => {
	         if ( _this._moreRendered !== null ) {
	          _this._moreRendered.updateLoading( !!loading );
	        }
	       };
	      */
	      // --------------------------------------------
	      // COMMENTS Popular second
	      // --------------------------------------------
	      var CommentsSecond = React.createClass({
	        displayName: 'CommentsSecond',

	        propType: {
	          seconds: React.PropTypes.array.isRequired,
	          articleId: React.PropTypes.string.isRequired
	        },
	        render: function render() {

	          var seconds = this.props.seconds;
	          var articleId = this.props.articleId;
	          // console.log( 'seconds ', seconds );
	          return React.createElement(
	            'ul',
	            { className: 'comments-second' },
	            seconds.map(function (commentDae, i) {

	              var userDae = commentDae.user;
	              var picture = userDae.profilePicture ? userDae.profilePicture : _Empty.Empty.USER_PICTURE;

	              // CommentsSecond unique key は  記事Id + index + user Id を使用する
	              // 同一ユーザーが複数投稿することがあるため
	              // render 内で unique なことを保証する必要がある
	              return React.createElement(
	                'li',
	                { key: 'user-' + articleId + '-' + i + '-' + userDae.id, className: 'commented-user-item commented-user-item-' + i },
	                React.createElement(
	                  'a',
	                  { className: 'commented-user-thumb', href: userDae.url },
	                  React.createElement('img', { src: picture, alt: userDae.userName })
	                )
	              );
	            })
	          );
	        }
	      });

	      // --------------------------------------------
	      // COMMENTS Popular
	      // --------------------------------------------

	      // good link
	      var GoodLink = React.createClass({
	        displayName: 'GoodLink',

	        propType: {
	          sign: React.PropTypes.bool.isRequired,
	          comment: React.PropTypes.object.isRequired,
	          active: React.PropTypes.bool,
	          callback: React.PropTypes.func
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        render: function render() {

	          var sign = this.props.sign;
	          var comment = this.props.comment;
	          var active = this.props.active;
	          // active（click可能）にするかを表す
	          var activeClass = active ? ' active' : '';

	          if (sign) {

	            // login user
	            // click ずみの時は不可
	            return React.createElement(
	              'a',
	              { className: 'comment-reaction-btn comment-reaction-like' + activeClass, href: '#', onClick: this.handleClick },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.good
	              )
	            );
	          } else {

	            // not login user
	            // click 不可
	            return React.createElement(
	              'span',
	              { className: 'comment-reaction-btn comment-reaction-like' },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.good
	              )
	            );
	          }
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          this.props.callback(this.props.comment);
	          this.setState({ active: false });
	        }
	      });

	      // bad link
	      var BadLink = React.createClass({
	        displayName: 'BadLink',

	        propType: {
	          sign: React.PropTypes.bool.isRequired,
	          comment: React.PropTypes.object.isRequired,
	          active: React.PropTypes.bool,
	          callback: React.PropTypes.func
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            active: false,
	            callback: function callback() {}
	          };
	        },
	        render: function render() {

	          var sign = this.props.sign;
	          var comment = this.props.comment;
	          var active = this.props.active;
	          var activeClass = active ? ' active' : '';

	          if (sign) {
	            // login user
	            return React.createElement(
	              'a',
	              { className: 'comment-reaction-btn comment-reaction-dislike' + activeClass, href: '#', onClick: this.handleClick },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.bad
	              )
	            );
	          } else {
	            // not login user
	            return React.createElement(
	              'span',
	              { className: 'comment-reaction-btn comment-reaction-dislike' },
	              React.createElement(
	                'i',
	                null,
	                ' '
	              ),
	              React.createElement(
	                'span',
	                null,
	                comment.bad
	              )
	            );
	          }
	        },
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          this.props.callback(this.props.comment);
	          this.setState({ active: false });
	        }
	      });

	      // --------------------------------------------
	      // first + second comment container
	      var PopularDom = React.createClass({
	        displayName: 'PopularDom',

	        propType: {
	          commentsPopular: React.PropTypes.object.isRequired,
	          total: React.PropTypes.number.isRequired,
	          articleId: React.PropTypes.string.isRequired
	        },
	        render: function render() {

	          var commentsPopular = this.props.commentsPopular;
	          var total = this.props.total;
	          var articleId = this.props.articleId;

	          var emptyFirst = React.createElement('div', { className: 'comments-popular comments-empty' });
	          var second = React.createElement('div', { className: 'comments-second comments-empty' });

	          var hasFirst = commentsPopular.hasFirst;
	          var hasSecond = commentsPopular.hasSecond;
	          var firstDae = commentsPopular.first;
	          var secondsDae = commentsPopular.seconds;
	          // console.log( 'commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae );
	          if (hasSecond) {
	            // 2件目以降も存在する
	            // 2件目以降のDomを生成する
	            second = React.createElement(CommentsSecond, { seconds: secondsDae, articleId: articleId });
	            total -= secondsDae.length;
	          }

	          // 1 件 comment があるかをチェクする
	          if (hasFirst) {

	            // 少なくとも1件は存在する
	            // 総件数から 1 マイナス
	            total -= 1;
	            console.log('少なくとも1件は存在する ', articleId);

	            // 1件目コメントデータを取り出し
	            var first = firstDae;
	            // 1件目コメント・ユーザー
	            var firstUser = first.user;
	            // ユーザーサムネイル
	            var picture = !!firstUser.profilePicture ? firstUser.profilePicture : _Empty.Empty.USER_PICTURE_FEATURE;
	            // login 済かを調べる
	            var sign = _User.User.sign;

	            return React.createElement(
	              'div',
	              { className: 'comments-popular' },
	              React.createElement(
	                'div',
	                { className: 'feature-user comment-item' },
	                React.createElement(
	                  'figure',
	                  { className: 'comment-user' },
	                  React.createElement(
	                    'a',
	                    { className: 'comment-user-link', href: firstUser.url },
	                    React.createElement(
	                      'span',
	                      { className: 'comment-user-thumb' },
	                      React.createElement('img', { src: picture, alt: firstUser.userName })
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'comment-user-data' },
	                      React.createElement(
	                        'p',
	                        { className: 'comment-user-name' },
	                        firstUser.userName
	                      ),
	                      React.createElement(
	                        'p',
	                        { className: 'comment-user-job' },
	                        firstUser.bio
	                      )
	                    )
	                  )
	                ),
	                React.createElement('div', { className: 'comment-content', dangerouslySetInnerHTML: { __html: first.body } }),
	                React.createElement(
	                  'div',
	                  { className: 'comment-reaction' },
	                  React.createElement(GoodLink, {
	                    sign: sign,
	                    comment: first,
	                    callback: this.goodClick
	                  }),
	                  React.createElement(BadLink, {
	                    sign: sign,
	                    comment: first,
	                    callback: this.badClick
	                  })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'commented-user' },
	                second,
	                React.createElement(
	                  'span',
	                  { className: 'commented-user-andmore' },
	                  total > 0 ? '+' + total : ''
	                )
	              )
	            );
	          }

	          return emptyFirst;
	        }, // render
	        componentDidMount: function componentDidMount() {
	          // mount
	        },
	        // -----------------------------------------
	        // good / bad 関連 custom method
	        goodClick: function goodClick(comment) {
	          var commentId = comment.id;
	          var userId = comment.user.id;

	          console.log('goodClick', commentId, userId);
	        },
	        badClick: function badClick(comment) {
	          var commentId = comment.id;
	          var userId = comment.user.id;

	          console.log('badClick', commentId, userId);
	        }
	      });

	      // ------------------------------------------------
	      // 基点 React class
	      // ------------------------------------------------

	      // 個別の 記事Dom
	      // React Class, Archive Dom
	      var ArticleDom = React.createClass({
	        displayName: 'ArticleDom',

	        propTypes: {
	          list: React.PropTypes.array.isRequired
	        },
	        getInitialState: function getInitialState() {
	          this.isotope = null;
	          this.img = null;
	          this.elements = [];

	          return {
	            arranged: 'prepare',
	            list: this.props.list
	          };
	        },
	        render: function render() {

	          console.log('****************************************** render');

	          //let list = this.props.list;

	          // dom出力する
	          return React.createElement(
	            'div',
	            { ref: 'boardRout', className: 'board-large-column' },

	            // loop start
	            this.state.list.map(function (dae, i) {

	              var commentsPopular = dae.commentsPopular;
	              var commentsTotal = dae.commentsCount;
	              var thumbnail = undefined;
	              var caption = undefined;
	              var figureTag = undefined;

	              console.log('ArchiveDom ', dae.id, dae.commentsCount, dae.commentsPopular);

	              thumbnail = dae.media.images.medium;
	              caption = dae.media.images.caption;

	              if (!thumbnail) {
	                thumbnail = _Empty.Empty.IMG_MIDDLE;
	              }
	              caption = _Safety.Safety.string(caption, '');

	              // media type で thumbnail 切替
	              if (dae.mediaType === 'image') {

	                // type: image
	                figureTag = React.createElement(
	                  'figure',
	                  { className: 'post-thumb post-thumb-' + dae.mediaType },
	                  React.createElement('img', { src: thumbnail, alt: caption })
	                );
	              } else {

	                // type: video
	                figureTag = React.createElement(
	                  'figure',
	                  { className: 'post-thumb post-thumb-' + dae.mediaType },
	                  React.createElement('img', { className: 'post-thumb-overlay-movie type-movie', src: _Empty.Empty.VIDEO_PLAY }),
	                  React.createElement('img', { src: thumbnail, alt: caption })
	                );
	              }

	              // unique key(React)にarticle id(number)記事Idを使用します
	              return React.createElement(
	                'div',
	                { key: 'archive-' + dae.id, className: 'board-item board-item-' + i },
	                React.createElement(
	                  'a',
	                  { className: 'post', href: dae.url },
	                  figureTag,
	                  React.createElement(
	                    'div',
	                    { className: 'post-data' },
	                    React.createElement(
	                      'p',
	                      { className: 'post-category post-category-' + dae.category.slug },
	                      dae.category.label
	                    ),
	                    React.createElement(
	                      'h3',
	                      { className: 'post-heading' },
	                      dae.title
	                    ),
	                    React.createElement(
	                      'p',
	                      { className: 'post-date' },
	                      dae.formatDate
	                    ),
	                    React.createElement(
	                      'div',
	                      { className: 'post-excerpt-text' },
	                      dae.description
	                    )
	                  )
	                ),
	                React.createElement(PopularDom, { key: 'comment-' + dae.id, commentsPopular: commentsPopular, total: commentsTotal, articleId: dae.id })
	              );
	              // loop end
	            })
	          );
	        },
	        // state 変更し dom が更新された後に呼び出される delegate
	        componentDidUpdate: function componentDidUpdate() {
	          console.log('+++++++++ componentDidUpdate');

	          // isotope 対象 children
	          var childNodes = this.refs.boardRout.childNodes;
	          var elements = [];
	          // 追加された Element を取得するための start / end point
	          // start は request offset
	          var i = _this._request.offset;
	          // end は request offset へ request length を加算したものと
	          // children length の小さい方
	          var limit = Math.min(i + _this._request.length, childNodes.length);
	          console.log('start ', i);
	          console.log('end ', limit);

	          // start / end から 対象 children を選別
	          for (; i < limit; i++) {
	            elements.push(childNodes[i]);
	          }

	          this.elements = elements;

	          var img = imagesLoaded(elements);
	          // 画像読み込む完了 event へ bind します
	          img.on('always', this.appendImages);
	          this.img = img;
	        },
	        // dom が表示された後に1度だけ呼び出される delegate
	        componentDidMount: function componentDidMount() {
	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	          // hasNext を元に More View button の表示非表示を決める
	          moreButton(action.hasNext());

	          // masonry flag が true の時に shouldMasonry を実行します
	          if (useMasonry) {

	            this.shouldMasonry();
	          }
	        },
	        // dom が削除される前に呼び出される delegate
	        componentWillUnmount: function componentWillUnmount() {
	          console.log('************ componentWillUnmount ************');
	          // unmount 時に isotope を破棄します
	          this.isotope.destroy();
	        },
	        // -----------------------------------------------------
	        // 以降 custom
	        // isotope 前準備
	        shouldMasonry: function shouldMasonry() {

	          // isotope 前準備を実行します
	          var boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
	          var childNodes = boardRout.childNodes;

	          // imagesLoaded を使用し画像ロード完了後に isotope を実行します
	          var img = imagesLoaded(childNodes);
	          // img {imagesLoaded} always event handler unbind するためにインスタンスを保存します
	          this.img = img;
	          // 画像読み込む完了 event へ bind します
	          img.on('always', this.onImages);
	        },
	        // 画像読み込む完了 event handler, isotope を実行
	        onImages: function onImages() {

	          // event から event handler を unbind します
	          this.img.off('always', this.onImages);

	          // isotope を行います
	          this.isotope = new Isotope(this.refs.boardRout, {
	            itemSelector: '.board-item',
	            masonry: {
	              gutter: 30
	            }
	          });
	        },
	        updateList: function updateList(list) {
	          // state を変更し appendChild + isotope を行う
	          this.setState({ list: list });
	        },
	        // didUpdate から呼び出される
	        appendImages: function appendImages() {

	          console.log('++++++++++++++++++++ appendImages');

	          // event から event handler を unbind します
	          this.img.off('always', this.appendImages);

	          // 追加とレイアウト
	          this.isotope.appended(this.elements);
	          // reload
	          // http://isotope.metafizzy.co/methods.html#reloaditems
	          this.isotope.reloadItems();
	          // isotope 再度レイアウト
	          this.isotope.layout();

	          // hasNext を元に More View button の表示非表示を決める
	          moreButton(action.hasNext());
	        }
	      }); // ArticleDom

	      // ------------------------------------------------
	      // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
	      articles.forEach(function (article, i) {

	        var dae = new _ArticleDae.ArticleDae(article);

	        dae.index = prevLast + i;
	        articlesList.push(dae);
	      });

	      // this._articleRendered が null の時だけ ReactDOM.render する
	      if (this._articleRendered === null) {

	        // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
	        this._articleRendered = ReactDOM.render(React.createElement(ArticleDom, { list: articlesList }), element);
	      } else {

	        // instance が存在するので
	        // state update でコンテナを追加する
	        this._articleRendered.updateList(articlesList);
	      }
	    } // render

	  }, {
	    key: 'moreElement',
	    get: function get() {
	      return this._moreElement;
	    }
	  }]);
	  return ViewArchiveMasonryInfinite;
	}(_View2.View); // class

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license inazumatv.com
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/08
	 *
	 * Copyright (c) 2011-2015 inazumatv.com, inc.
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Rise = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher2 = __webpack_require__(77);

	var _Dom = __webpack_require__(155);

	var _Scroll = __webpack_require__(152);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 対象 element bottom が window.bottom を超えたら Event を発生させます
	 */

	var Rise = exports.Rise = function (_EventDispatcher) {
	  (0, _inherits3.default)(Rise, _EventDispatcher);

	  /**
	   * 対象 element bottom が window.bottom window.top に contain しているかを監視します
	   * @param {Element} element 対象 element
	   * @param {Number} [offset=0] 減産数値
	   */

	  function Rise(element) {
	    var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    (0, _classCallCheck3.default)(this, Rise);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Rise).call(this));

	    _this._element = element;
	    _this._offset = offset;
	    _this._dom = new _Dom.Dom(element);
	    _this._boundScroll = _this.onScroll.bind(_this);
	    _this._scroll = _Scroll.Scroll.factory();
	    return _this;
	  }

	  /**
	   * RISE event type
	   * @returns {string} RISE event type を返します
	   */

	  (0, _createClass3.default)(Rise, [{
	    key: 'start',

	    /**
	     * 監視を始めます
	     */
	    value: function start() {
	      console.log('************************ Rise.start');

	      this._scroll.on(_Scroll.Scroll.SCROLL, this._boundScroll);
	      this._scroll.start();
	    }
	    /**
	     * 監視を止めます
	     */

	  }, {
	    key: 'stop',
	    value: function stop() {
	      console.log('------------------------ Rise.stop');

	      this._scroll.off(_Scroll.Scroll.SCROLL, this._boundScroll);
	      this._scroll.stop();
	    }
	    /**
	     * Scroll.SCROLL event handler
	     * @param {Object} event Scroll.SCROLL event object
	     */

	  }, {
	    key: 'onScroll',
	    value: function onScroll(event) {
	      // window property
	      // scrollTop
	      var y = event.y;
	      var windowHeight = window.innerHeight;
	      var windowBottom = y + windowHeight - this._offset;
	      // element property
	      var offsetRect = this._dom.offset();
	      var elementBottom = y + offsetRect.top + offsetRect.height;

	      // element.bottom が contain しているかを調べます
	      if (windowBottom > elementBottom) {
	        this.dispatch({ type: Rise.RISE, window: windowBottom, element: elementBottom });
	      }
	    }
	  }], [{
	    key: 'RISE',
	    get: function get() {
	      return 'rise';
	    }
	  }]);
	  return Rise;
	}(_EventDispatcher2.EventDispatcher);

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license inazumatv.com
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/08
	 *
	 * Copyright (c) 2011-2015 inazumatv.com, inc.
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 */
	'use strict';

	/**
	 * HTMLElement 要素にアクセスするヘルパー
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Dom = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Dom = exports.Dom = function () {
	  /**
	   * element 要素処理ヘルパー
	   * @param {Element} element 処理対象 Element
	   */

	  function Dom(element) {
	    (0, _classCallCheck3.default)(this, Dom);

	    this._element = element;
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * getBoundingClientRect を計算します
	   * @returns {ClientRect} getBoundingClientRect を返します
	   */

	  (0, _createClass3.default)(Dom, [{
	    key: 'offset',
	    value: function offset() {
	      return Dom.offset(this._element);
	    }
	    // ---------------------------------------------------
	    //  static METHOD
	    // ---------------------------------------------------
	    /**
	     * getBoundingClientRect を計算します
	     * ```https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect```
	     * {{top: Number, right: Number, left: Number, bottom: Number, width: Number, height: Number}}
	     * @param {Element} element 処理対象 Element
	     * @returns {ClientRect} getBoundingClientRect を返します
	     */

	  }], [{
	    key: 'offset',
	    value: function offset(element) {
	      return element.getBoundingClientRect();
	    }
	  }]);
	  return Dom;
	}();

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/04 - 12:39
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
	exports.ViewCategory = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Category = __webpack_require__(116);

	var _ViewArchiveMasonryInfinite = __webpack_require__(153);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * category 一覧表示
	 */

	var ViewCategory = exports.ViewCategory = function (_ViewArchiveMasonryIn) {
	  (0, _inherits3.default)(ViewCategory, _ViewArchiveMasonryIn);

	  /**
	   * category 一覧表示 要 **slug**
	   * @param {string} slug category slug, default 'all'
	   * @param {Element} element root element, Ajax result を配置する
	   * @param {Element} moreElement more button root element, 'View More' を配置する
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewCategory(slug, element, moreElement) {
	    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    (0, _classCallCheck3.default)(this, ViewCategory);

	    // Category Action を使う
	    // slug を送り 表示(render)は ViewArchiveMasonryInfinite を使う

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewCategory).call(this, element, moreElement, null, option, true));

	    _this._action = new _Category.Category(slug, '', _this.done.bind(_this), _this.fail.bind(_this));
	    return _this;
	  }

	  return ViewCategory;
	}(_ViewArchiveMasonryInfinite.ViewArchiveMasonryInfinite);

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/26 - 21:05
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// app

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewSingle = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(137);

	var _SingleInfo = __webpack_require__(158);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Single = __webpack_require__(122);

	var _Result = __webpack_require__(88);

	var _SingleDae = __webpack_require__(159);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// dae

	// action

	// view
	var React = self.React;
	// data

	var ReactDOM = self.ReactDOM;

	/**
	 * 記事詳細
	 */

	var ViewSingle = function (_View) {
	  (0, _inherits3.default)(ViewSingle, _View);

	  /**
	   * 記事ID で 記事詳細JSONを取得し表示します
	   *
	   * @example
	   * let elements = {}
	   *  related: document.getElementById('related'),
	   *  comment: {
	   *    'self': document.getElementById('self'),
	   *    'official': document.getElementById('official'),
	   *    'user': document.getElementById('user')
	   *  }
	   * }
	   *
	   * @param {Number} id article id, 記事Id
	   * @param {Element} element root element
	   * @param {Object} elements root element 関連記事, 各コメント
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewSingle(id, element, elements) {
	    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    (0, _classCallCheck3.default)(this, ViewSingle);

	    option = _Safety.Safety.object(option);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSingle).call(this, element, option));

	    _this2._action = new _Single.Single(id, _this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._elements = elements;
	    return _this2;
	  }
	  /**
	   * Ajax request を開始します
	   */

	  (0, _createClass3.default)(ViewSingle, [{
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

	      var response = result.response;

	      if (typeof response === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[SINGLE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else {

	          this.render(response);
	        }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

	      // ToDo: Error 時の表示が決まったら変更する
	      var error = new _ViewError.ViewError(this.element, this.option, message);
	      error.render();
	    }
	    /**
	     * dom を render します
	     * @param {Object} response JSON response
	     */

	  }, {
	    key: 'render',
	    value: function render(response) {

	      //console.log( 'single resoonse ', response );
	      var single = new _SingleDae.SingleDae(response);
	      // global SingleInfoへ保存
	      // SingleInfo.dae = single;

	      // beforeRender call
	      this.executeSafely(_View2.View.BEFORE_RENDER, single);

	      var element = this.element;
	      var _this = this;

	      // --------------------------------------------
	      // image dom
	      var ImageDom = React.createClass({
	        displayName: 'ImageDom',

	        propTypes: {
	          images: React.PropTypes.array.isRequired
	        },
	        render: function render() {

	          var images = this.props.images;

	          return React.createElement(
	            'div',
	            { className: 'media-type-image' },
	            images.map(function (image, i) {

	              if (typeof image.large !== 'undefined' && image.large !== '') {
	                return React.createElement(
	                  'div',
	                  { key: 'media-type-image-' + i, className: 'media-type-image-' + i },
	                  React.createElement('img', { src: image.large, alt: image.caption })
	                );
	              }
	            })
	          );
	        }
	      });

	      // --------------------------------------------
	      // React Class
	      var ArticleDom = React.createClass({
	        displayName: 'ArticleDom',

	        propTypes: {
	          article: React.PropTypes.object.isRequired
	        },
	        // isRequired なので getDefaultProps がいらない
	        // getDefaultProps: function() {
	        //  return {
	        //    list: []
	        //  };
	        // },
	        render: function render() {

	          var article = this.props.article;

	          var bodyTag = function bodyTag() {
	            return {
	              __html: article.body
	            };
	          };

	          var thumbnail = '';
	          if (article.mediaType === 'image') {

	            // media type image
	            thumbnail = React.createElement(ImageDom, { images: article.media.list });
	          } else if (article.mediaType === 'video') {

	            if (article.media.video.thumbnail !== '') {

	              thumbnail = React.createElement(
	                'div',
	                { className: 'media-type-video' },
	                React.createElement('img', { src: article.media.video.thumbnail, alt: article.media.video.caption }),
	                React.createElement('img', { src: _Empty.Empty.VIDEO_PLAY, alt: '' })
	              );
	            }
	          }

	          return React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'h1',
	              null,
	              article.title
	            ),
	            React.createElement(
	              'div',
	              null,
	              article.user.userName
	            ),
	            React.createElement(
	              'div',
	              null,
	              article.formatDate
	            ),
	            React.createElement(
	              'div',
	              null,
	              thumbnail
	            ),
	            React.createElement('div', { className: 'XXX-OUCH', dangerouslySetInnerHTML: bodyTag() }),
	            React.createElement(
	              'div',
	              null,
	              article.keywords.concat(' ')
	            )
	          );
	        },
	        componentWillMount: function componentWillMount() {

	          // after mount
	          _this.executeSafely(_View2.View.WILL_MOUNT);
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	        }
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { article: single }), element);

	      // 関連記事 もしもあるなら
	      if (single.hasRelated) {
	        this.related(single.related);
	      }

	      // comment 取得
	      // 自動化の場合はここに記述
	      // ここでコメントは取得しない
	    } // render
	    /**
	     * 関連記事（記事詳細の）
	     * @param {Array} related 配列内データ型はRelatedDom
	     */

	  }, {
	    key: 'related',
	    value: function related() {
	      var _related = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	      _related = _Safety.Safety.array(_related);

	      var element = this._elements.related;

	      // tag block
	      var RelatedDom = React.createClass({
	        displayName: 'RelatedDom',

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
	          var thumbnail = p.thumbnail ? p.thumbnail : _Empty.Empty.IMG_SMALL;

	          return React.createElement(
	            'a',
	            { href: p.url, id: 'headline-' + p.id, className: 'headline headline-' + p.index },
	            React.createElement('img', { src: thumbnail, alt: p.title }),
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
	        render: function render() {

	          var list = this.props.list;

	          return React.createElement(
	            'div',
	            null,
	            list.map(function (dae, i) {

	              var thumbnail = dae.media.images.thumbnail;
	              thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_SMALL;

	              // HeadlineDom instance を使い render
	              return React.createElement(RelatedDom, {
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
	        }
	      });

	      // 関連記事 dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: _related }), element);
	    } // related

	  }]);
	  return ViewSingle;
	}(_View2.View);

	exports.ViewSingle = ViewSingle;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/28 - 19:01
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
	exports.SingleInfo = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _SingleDae = __webpack_require__(159);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();
	var _single = undefined;

	/**
	 * <h3>記事詳細情報</h3>
	 * 全てstaticです<br>
	 * **Singleton**
	 * <p>
	 * SingleDae を保持します。
	 * </p>
	 */

	var SingleInfo = exports.SingleInfo = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SingleInfo(target) {
	    (0, _classCallCheck3.default)(this, SingleInfo);

	    if (_symbol !== target) {

	      throw new Error('Article is static Class. not use new Article().');
	    }
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * 現在表示の記事詳細情報
	   * @return {SingleDae} 現在表示の記事詳細情報 SingleDae instance を返します
	   */

	  (0, _createClass3.default)(SingleInfo, null, [{
	    key: 'dae',
	    get: function get() {
	      return _single;
	    }

	    /**
	     * @param {SingleDae} article 現在表示の記事詳細情報 SingleDae instance
	     */
	    ,
	    set: function set(article) {
	      _single = article;
	    }
	  }]);
	  return SingleInfo;
	}();

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/26 - 21:10
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
	exports.SingleDae = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Safety = __webpack_require__(44);

	var _KeywordsDae = __webpack_require__(160);

	var _RelatedDae2 = __webpack_require__(161);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事詳細の JSON.response
	 */

	var SingleDae = exports.SingleDae = function (_RelatedDae) {
	  (0, _inherits3.default)(SingleDae, _RelatedDae);

	  /**
	   * 記事詳細のresponceデータを後処理しやすいように加工します
	   *
	   * @param {Object} response JSON.response
	   */

	  function SingleDae() {
	    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, SingleDae);

	    response = _Safety.Safety.object(response);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SingleDae).call(this, response));

	    _this._keywords = new _KeywordsDae.KeywordsDae(response.keywords);

	    // related
	    var related = [];
	    if (_Safety.Safety.check(response, 'related_articles', 'array')) {

	      response.related_articles.forEach(function (article) {

	        related.push(new _RelatedDae2.RelatedDae(article));
	      });

	      console.log('related_articles ', related);
	    }

	    _this._related = related;

	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {string} 記事本文
	   */

	  (0, _createClass3.default)(SingleDae, [{
	    key: 'body',
	    get: function get() {
	      return this.response.body;
	    }
	    /**
	     *
	     * @return {boolean} 関連記事が存在するかの真偽値
	     */

	  }, {
	    key: 'hasRelated',
	    get: function get() {
	      return this._related.length > 0;
	    }
	    /**
	     *
	     * @return {Array|*} 関連記事配列を返します
	     */

	  }, {
	    key: 'related',
	    get: function get() {
	      return this._related;
	    }
	    /**
	     *
	     * @return {KeywordsDae|*} キーワードを返します
	     */

	  }, {
	    key: 'keywords',
	    get: function get() {
	      return this._keywords;
	    }
	  }]);
	  return SingleDae;
	}(_RelatedDae2.RelatedDae);

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/26 - 21:43
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
	exports.KeywordsDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * response.keywords
	 */

	var KeywordsDae = exports.KeywordsDae = function () {
	  /**
	   * 記事キーワード
	   * @param {Array} [keywords=[]] keywords 配列
	   */

	  function KeywordsDae() {
	    var keywords = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    (0, _classCallCheck3.default)(this, KeywordsDae);

	    this._keywords = keywords;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Array.<string>|*} response.keywords を返します
	   */

	  (0, _createClass3.default)(KeywordsDae, [{
	    key: 'concat',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * 連結子でキーワードをつなぎます
	     * @param {string} [concatenation=', '] 連結子
	     * @return {string} 連結子でつないだキーワードを返します
	     */
	    value: function concat() {
	      var concatenation = arguments.length <= 0 || arguments[0] === undefined ? ', ' : arguments[0];

	      concatenation = _Safety.Safety.string(concatenation, ', ');
	      return this.keywords.join(concatenation);
	    }
	  }, {
	    key: 'keywords',
	    get: function get() {
	      return this._keywords;
	    }
	    /**
	     *
	     * @return {boolean} keyword が存在するかの真偽値を返します
	     */

	  }, {
	    key: 'hasKeyword',
	    get: function get() {
	      return this.keywords.length > 0;
	    }
	  }]);
	  return KeywordsDae;
	}();

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/26 - 21:35
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// 記事詳細 関連記事結果

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RelatedDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(44);

	var _Format = __webpack_require__(60);

	var _CategoryDae = __webpack_require__(146);

	var _MediaDae = __webpack_require__(147);

	var _UserDae = __webpack_require__(126);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 記事詳細 関連記事 JSON
	 */

	var RelatedDae = exports.RelatedDae = function () {
	  /**
	   * 記事詳細 関連記事結果 JSON をセットアップします
	   * @param {Object} [response={}] JSON.response
	   */

	  function RelatedDae() {
	    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, RelatedDae);

	    response = _Safety.Safety.object(response);

	    this._response = response;
	    // response.category
	    this._category = new _CategoryDae.CategoryDae(response.category);
	    // response.media
	    this._media = new _MediaDae.MediaDae(response.media);
	    // response.user
	    this._user = new _UserDae.UserDae(response.user);

	    // date check
	    if (_Safety.Safety.check(response, 'date')) {

	      this._formatDate = _Format.Format.date(response.date);
	    }
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Object|*} JSON.response を返します
	   */

	  (0, _createClass3.default)(RelatedDae, [{
	    key: 'response',
	    get: function get() {
	      return this._response;
	    }
	    /**
	     *
	     * @return {Number} 記事 ID を返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.response.id;
	    }
	    /**
	     *
	     * @return {string} ISO8601 日付
	     */

	  }, {
	    key: 'date',
	    get: function get() {
	      return this.response.date;
	    }
	    /**
	     * @return {string} response.date を日本語日付に変換し返します
	     */

	  }, {
	    key: 'formatDate',
	    get: function get() {
	      return this._formatDate;
	    }
	    /**
	     *
	     * @return {string} article.display_date
	     */

	  }, {
	    key: 'displayDate',
	    get: function get() {
	      return this.response.display_date;
	    }
	    /**
	     *
	     * @return {string} 記事タイトル
	     */

	  }, {
	    key: 'title',
	    get: function get() {
	      return this.response.title;
	    }
	    /**
	     *
	     * @return {string} 記事概要
	     */

	  }, {
	    key: 'description',
	    get: function get() {
	      return this.response.description;
	    }
	    /**
	     *
	     * @return {CategoryDae|*} カテゴリー
	     */

	  }, {
	    key: 'category',
	    get: function get() {
	      return this._category;
	    }
	    /**
	     *
	     * @return {string} 記事URL
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      return this.response.url;
	    }
	    /**
	     *
	     * @return {boolean} response.is_bookmarked
	     */

	  }, {
	    key: 'isBookmarked',
	    get: function get() {
	      return this.response.is_bookmarked;
	    }
	    /**
	     *
	     * @return {string} response.media_type
	     */

	  }, {
	    key: 'mediaType',
	    get: function get() {
	      return this.response.media_type;
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
	     * @return {UserDae} article.user
	     */

	  }, {
	    key: 'user',
	    get: function get() {
	      return this._user;
	    }
	  }]);
	  return RelatedDae;
	}();

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/05 - 22:40
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
	exports.ViewTitle = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(132);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	var React = self.React;
	var ReactDOM = self.ReactDOM;

	/**
	 * title 表示
	 */

	var ViewTitle = exports.ViewTitle = function (_View) {
	  (0, _inherits3.default)(ViewTitle, _View);

	  /**
	   * 記事タイトルを表示します
	   * @param {string} label 表示タイトル文字
	   * @param {Element} element insert parent element
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewTitle(label, element) {
	    var option = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    (0, _classCallCheck3.default)(this, ViewTitle);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewTitle).call(this, element, option));

	    _this._label = label;
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * @return {string|*} title 文字を返します
	   */

	  (0, _createClass3.default)(ViewTitle, [{
	    key: 'render',

	    // ---------------------------------------------------
	    //  Method
	    // ---------------------------------------------------
	    /**
	     * HTMLElement を生成します
	     */
	    value: function render() {

	      var TitleDom = React.createClass({
	        displayName: 'TitleDom',

	        propType: {
	          label: React.PropTypes.string.isRequired,
	          slug: React.PropTypes.string.isRequired
	        },
	        render: function render() {

	          var label = this.props.label;

	          return React.createElement(
	            'div',
	            { className: 'category-heading' },
	            React.createElement(
	              'h1',
	              null,
	              label
	            )
	          );
	        }
	      });

	      ReactDOM.render(React.createElement(TitleDom, { label: this.label }), this.element);
	    }
	  }, {
	    key: 'label',
	    get: function get() {
	      return this._label;
	    }
	    /**
	     * title 文字を設定します
	     * @param {string} label title 文字
	     */
	    ,
	    set: function set(label) {
	      this._label = label;
	    }
	  }]);
	  return ViewTitle;
	}(_View2.View);

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/28 - 20:51
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// app

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewComments = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(137);

	var _CommentsType = __webpack_require__(84);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Comments = __webpack_require__(164);

	var _Result = __webpack_require__(88);

	var _Safety = __webpack_require__(44);

	var _CommentsListDae = __webpack_require__(165);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// action

	// view
	var React = self.React;

	// dae

	// data

	var ReactDOM = self.ReactDOM;

	/**
	 * comments sled を表示する
	 */

	var ViewComments = exports.ViewComments = function (_View) {
	  (0, _inherits3.default)(ViewComments, _View);

	  /**
	   * コメントスレッド表示（記事詳細）
	   * @param {Number} id 記事ID :article_id
	   * @param {Element} element target HTMLElement
	   * @param {Element} moreElement more button root parent
	   * @param {string} commentsType all|official|self|normal コメントリスト種類
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewComments(id, element, moreElement, commentsType) {
	    var option = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	    (0, _classCallCheck3.default)(this, ViewComments);

	    option = _Safety.Safety.object(option);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewComments).call(this, element, option));

	    _this2._action = _Comments.Comments.type(commentsType, id, _this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._articleId = id;
	    _this2._moreElement = moreElement;
	    _this2._commentsListType = commentsType;
	    /**
	     * 取得記事(articles)をArticleDae instance 配列として保存する
	     * @type {Array<ArticleDae>}
	     * @private
	     */
	    _this2._commentsList = [];
	    _this2._commentsBank = {};

	    // more button instance 用
	    _this2._moreRendered = null;
	    // CommentsDom instance を保持します
	    _this2._commentsRendered = null;
	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Element|*} more button root element を返します
	   */

	  (0, _createClass3.default)(ViewComments, [{
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

	      var response = result.response;
	      // console.log( 'response ', typeof response === 'undefined', response );
	      if (typeof response === 'undefined') {

	        // articles undefined
	        // JSON に問題がある
	        var error = new Error('[COMMENTS:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else {

	          this.render(response);
	        }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

	      // ToDo: Error 時の表示が決まったら変更する
	      var error = new _ViewError.ViewError(this.element, this.option, message);
	      error.render();
	    }
	    /**
	     * dom を render します
	     * @param {Object} response JSON response
	     */

	  }, {
	    key: 'render',
	    value: function render(response) {

	      var commentsListDae = new _CommentsListDae.CommentsListDae(response);

	      // total check
	      if (commentsListDae.total === 0) {
	        // デーが無いので処理を止める
	        console.log('(' + this._articleId + ')デーが無いので処理を止める');
	        this.executeSafely(_View2.View.EMPTY_ERROR);
	        return;
	      }

	      // previous data と新規データを合成
	      this._commentsList = this._commentsList.concat(commentsListDae.comments.list);

	      // _commentsBank へ comment.id をキーにデータをセット
	      var bank = this._commentsBank;
	      commentsListDae.comments.list.forEach(function (commentId) {

	        bank[commentId] = commentsListDae.comments.bank[commentId];
	      });

	      // 処理開始 関数振り分け
	      switch (this._commentsListType) {

	        case _CommentsType.CommentsType.SELF:
	          this.mine(commentsListDae);
	          break;

	        case _CommentsType.CommentsType.OFFICIAL:
	        case _CommentsType.CommentsType.NORMAL:
	        case _CommentsType.CommentsType.ALL:
	        default:
	          this.all(commentsListDae);
	          break;

	      }
	    } // render

	  }, {
	    key: 'mine',
	    value: function mine(commentsListDae) {}
	    /**
	     * normal, official, all をレンダリング
	     * @param {CommentsListDae} commentsListDae コメント一覧 CommentsListDae instance
	     */

	  }, {
	    key: 'all',
	    value: function all(commentsListDae) {

	      //
	      var commentsList = this._commentsList;
	      var commentsBank = this._commentsBank;

	      // comments type
	      var commentsListType = this._commentsListType;

	      var articleId = this._articleId;

	      // コメント挿入 root element
	      var element = this.element;
	      // 'View More' button root element
	      var moreElement = this.moreElement;
	      // offset, length を使用する Action
	      var action = this.action;
	      var _this = this;

	      // --------------------------------------------
	      // More button
	      // --------------------------------------------
	      var MoreView = React.createClass({
	        displayName: 'MoreView',

	        propTypes: {
	          show: React.PropTypes.bool.isRequired
	        },
	        getDefaultProps: function getDefaultProps() {
	          return {
	            show: false
	          };
	        },
	        getInitialState: function getInitialState() {
	          return {
	            loading: false,
	            show: this.props.show
	          };
	        },
	        render: function render() {

	          // hasNext: true, button を表示する？
	          if (this.state.show) {

	            return React.createElement(
	              'div',
	              { className: this.state.loading ? 'loading' : '' },
	              React.createElement(
	                'a',
	                { href: '#more', onClick: this.handleClick },
	                'More View'
	              )
	            );
	          } else {

	            // button 表示なし
	            return React.createElement('div', { className: 'no-more' });
	          }
	        },
	        // -----------------------------------------
	        // button 関連 custom method
	        handleClick: function handleClick(event) {
	          event.preventDefault();
	          // loading 表示
	          this.setState({ loading: true });
	          action.next();
	        },
	        // button 表示・非表示
	        updateShow: function updateShow(show) {

	          this.setState({ show: show });
	        }
	      });

	      // more button 作成関数
	      // CommentsDom から呼び出す
	      var moreButton = function moreButton(show) {

	        show = !!show;

	        // moreElement 存在チェックを行う
	        // Element 型を保証する
	        // _moreRendered が null の時のみ, instance があれば state を update する
	        if (_Safety.Safety.isElement(moreElement) && _this._moreRendered === null) {

	          _this._moreRendered = ReactDOM.render(React.createElement(MoreView, { show: show }), moreElement);
	        } else {

	          // instance がある, render 済み
	          // state を変更し button の表示・非表示を行う
	          _this._moreRendered.updateShow(show);
	        }
	      };

	      // --------------------------------------------
	      // COMMENT ONE
	      // --------------------------------------------
	      var CommentOne = React.createClass({
	        displayName: 'CommentOne',

	        propType: {
	          comment: React.PropTypes.object.isRequired,
	          parent: React.PropTypes.bool.isRequired
	        },
	        render: function render() {

	          var commentDae = this.props.comment;
	          var comment = commentDae.comment;
	          var isParent = this.props.parent;

	          var replyClass = '';
	          // console.log( 'comment', comment );
	          // console.log( 'comment.user', comment.user );
	          var picture = comment.user.profilePicture || _Empty.Empty.USER_PICTURE_FEATURE;
	          var commentReply = commentDae.reply;
	          var replyTotal = 0;
	          var replyTotalElement = '';
	          var replyLink = '';

	          if (isParent) {

	            if (typeof commentReply !== 'undefined' && commentReply !== null) {
	              replyTotal = commentReply.total;

	              if (replyTotal !== 0) {
	                replyTotalElement = '(' + replyTotal + ')';
	              }
	            }

	            replyLink = React.createElement(
	              'div',
	              null,
	              React.createElement(
	                'a',
	                { href: 'xxx', 'data-reply': 'reply-to-' + comment.id },
	                'コメントへ返信'
	              ),
	              replyTotalElement
	            );
	          }

	          var bodyTag = function bodyTag() {
	            return {
	              __html: comment.body
	            };
	          };

	          console.log('**** comment ', comment);

	          // ToDo: 一般ユーザーは bio がない

	          return React.createElement(
	            'div',
	            { className: 'comment-' + commentsListType + ' comment-' + commentsListType + '-' + comment.id + replyClass },
	            React.createElement(
	              'div',
	              { className: 'comment-user-' + comment.user.id },
	              React.createElement('img', { src: picture, alt: comment.user.userName })
	            ),
	            React.createElement(
	              'div',
	              null,
	              comment.user.userName
	            ),
	            React.createElement(
	              'div',
	              null,
	              comment.user.bio
	            ),
	            React.createElement(
	              'div',
	              null,
	              comment.formatDate
	            ),
	            React.createElement('div', { className: 'comment-body', dangerouslySetInnerHTML: bodyTag() }),
	            React.createElement(
	              'div',
	              null,
	              'Good: ',
	              comment.good
	            ),
	            React.createElement(
	              'div',
	              null,
	              'Bad: ',
	              comment.bad
	            ),
	            replyLink
	          );
	        }
	      });

	      // --------------------------------------------
	      // COMMENT reply loop
	      // 親コメントへ返信
	      // --------------------------------------------
	      var CommentReplyChild = React.createClass({
	        displayName: 'CommentReplyChild',

	        propType: {
	          reply: React.PropTypes.object.isRequired,
	          id: React.PropTypes.string.isRequired
	        },
	        render: function render() {

	          var reply = this.props.reply;
	          var replyList = reply.comments;
	          var commentId = this.props.id;

	          return React.createElement(
	            'div',
	            { className: 'comment-reply' },
	            replyList.comments.map(function (replyComment) {

	              /* 親コメントと子コメントのデータ形式が違う
	                 合わせるために object でラップする
	              */
	              return React.createElement(CommentOne, { key: 'reply-' + articleId + '-' + commentId + '-' + replyComment.id, comment: { comment: replyComment }, parent: false });
	            })
	          );
	        }
	      });

	      // --------------------------------------------
	      // COMMENT Parent
	      // --------------------------------------------
	      var CommentsParent = React.createClass({
	        displayName: 'CommentsParent',

	        propType: {
	          commentObject: React.PropTypes.object.isRequired,
	          total: React.PropTypes.number.isRequired
	        },
	        render: function render() {

	          var commentObject = this.props.commentObject;
	          var replyElement = '';

	          console.log('commentObject ', commentObject);

	          if (commentObject.reply.total > 0) {
	            // コメント返信
	            replyElement = React.createElement(CommentReplyChild, { id: String(commentObject.comment.id), reply: commentObject.reply });
	          }

	          return React.createElement(
	            'div',
	            { className: 'comment-parent' },
	            React.createElement(CommentOne, { comment: commentObject, parent: true }),
	            replyElement
	          );
	        }
	      });

	      // --------------------------------------------
	      // COMMENT iteration
	      // --------------------------------------------
	      var CommentsDom = React.createClass({
	        displayName: 'CommentsDom',

	        propType: {
	          commentsList: React.PropTypes.array.isRequired
	        },
	        getInitialState: function getInitialState() {
	          return {
	            commentsList: this.props.commentsList
	          };
	        },
	        render: function render() {

	          var list = this.state.commentsList;

	          return React.createElement(
	            'div',
	            { className: 'comment-' + commentsListType },
	            list.map(function (commentId, index) {

	              var commentObject = commentsBank[commentId];

	              return React.createElement(CommentsParent, {
	                key: 'comment-' + articleId + '-' + commentsListType + '-' + index,
	                commentObject: commentObject,
	                total: commentsListDae.total });
	            })
	          );
	        },
	        componentDidMount: function componentDidMount() {
	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	          // hasNext を元に More View button の表示非表示を決める
	          console.log('more has ', action.hasNext());
	          moreButton(action.hasNext());
	        },
	        updateList: function updateList(list) {
	          // state を変更し appendChild を行う
	          this.setState({ commentsList: list });
	        }
	      });

	      // --------------------------------------------
	      // COMMENT Dom build
	      // --------------------------------------------
	      // this._commentsRendered が null の時だけ CommentsDom.render する
	      if (this._commentsRendered === null) {

	        this._commentsRendered = ReactDOM.render(React.createElement(CommentsDom, { commentsList: commentsList }), element);
	      } else {

	        this._commentsRendered.updateList(commentsList);
	      }
	    } // all

	  }, {
	    key: 'moreElement',
	    get: function get() {
	      return this._moreElement;
	    }
	  }]);
	  return ViewComments;
	}(_View2.View);

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/28 - 19:41
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
	exports.Comments = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol2 = __webpack_require__(52);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _OffsetAuth2 = __webpack_require__(115);

	var _Api = __webpack_require__(90);

	var _User = __webpack_require__(78);

	var _Path = __webpack_require__(97);

	var _CommentsType = __webpack_require__(84);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	/**
	 * コメント一覧
	 */

	var Comments = function (_OffsetAuth) {
	  (0, _inherits3.default)(Comments, _OffsetAuth);

	  /**
	   * コメント一覧<br>
	   * 記事ID, token を使いコメント一覧を取得します<br>
	   * query に offset, length があります
	   *
	   * @param {Symbol} target Factory pattern のために使用
	   * @param {number} id コメントを取得する記事ID
	   * @param {string} [type=''] 取得コメント種類, ''|normal|official|self
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */

	  function Comments(target, id) {
	    var type = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	    var resolve = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	    var reject = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
	    (0, _classCallCheck3.default)(this, Comments);

	    if (_symbol !== target) {

	      throw new Error('not use new Comments(). instead Comments.all() or Comments.normal() or Comments.official() or Comments.mine()');
	    }

	    type = _Safety.Safety.string(type, '');

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Comments).call(this, _User.User.token, _Api.Api.comment(type), resolve, reject));

	    _this._id = id;
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * 記事ID
	   * @return {Number|*} 記事IDを返します
	   */

	  (0, _createClass3.default)(Comments, [{
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
	      return _Path.Path.article(this._url, this.id) + '?offset=' + this.offset + '&length=' + this.length;
	    }
	    /**
	     * @param {string} type 取得コメント種類
	     * @param {number} id コメントを取得する記事ID
	     * @param {Function} [resolve=null] Ajax 成功時の callback
	     * @param {Function} [reject=null] Ajax 失敗時の callback
	     * @return {Comments} Comments instanceを返します
	     */

	  }], [{
	    key: 'type',
	    value: function type(_type, id) {
	      var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	      var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	      switch (_type) {

	        case _CommentsType.CommentsType.SELF:
	          return Comments.min(id, resolve, reject);

	        case _CommentsType.CommentsType.NORMAL:
	          return Comments.normal(id, resolve, reject);

	        case _CommentsType.CommentsType.OFFICIAL:
	          return Comments.official(id, resolve, reject);

	        case _CommentsType.CommentsType.ALL:
	          return Comments.all(id, resolve, reject);

	        default:
	          console.warn('Comments type illegal action: ' + _type + ', instead use default');
	          return Comments.all(id, resolve, reject);

	      }
	    }
	    /**
	     * コメント一覧, 自分のコメント
	     * @param {number} id コメントを取得する記事ID
	     * @param {Function} [resolve=null] Ajax 成功時の callback
	     * @param {Function} [reject=null] Ajax 失敗時の callback
	     * @return {Comments} Comments instanceを返します
	     */

	  }, {
	    key: 'mine',
	    value: function mine(id) {
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      return new Comments(_symbol, id, _CommentsType.CommentsType.SELF, resolve, reject);
	    }
	    /**
	     * コメント一覧, 通常ユーザーのコメント
	     * @param {number} id コメントを取得する記事ID
	     * @param {Function} [resolve=null] Ajax 成功時の callback
	     * @param {Function} [reject=null] Ajax 失敗時の callback
	     * @return {Comments} Comments instanceを返します
	     */

	  }, {
	    key: 'normal',
	    value: function normal(id) {
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      return new Comments(_symbol, id, _CommentsType.CommentsType.NORMAL, resolve, reject);
	    }
	    /**
	     * コメント一覧,公式ユーザーのコメント
	     * @param {number} id コメントを取得する記事ID
	     * @param {Function} [resolve=null] Ajax 成功時の callback
	     * @param {Function} [reject=null] Ajax 失敗時の callback
	     * @return {Comments} Comments instanceを返します
	     */

	  }, {
	    key: 'official',
	    value: function official(id) {
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      return new Comments(_symbol, id, _CommentsType.CommentsType.OFFICIAL, resolve, reject);
	    }
	    /**
	     * コメント一覧, 全てのコメント
	     * @param {number} id コメントを取得する記事ID
	     * @param {Function} [resolve=null] Ajax 成功時の callback
	     * @param {Function} [reject=null] Ajax 失敗時の callback
	     * @return {Comments} Comments instanceを返します
	     */

	  }, {
	    key: 'all',
	    value: function all(id) {
	      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	      return new Comments(_symbol, id, _CommentsType.CommentsType.ALL, resolve, reject);
	    }
	  }]);
	  return Comments;
	}(_OffsetAuth2.OffsetAuth);

	exports.Comments = Comments;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/28 - 22:36
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
	exports.CommentsListDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _CommentsDae = __webpack_require__(166);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * コメント一覧表示
	 */

	var CommentsListDae = exports.CommentsListDae = function () {
	  /**
	   * コメント一覧表示 reply 含む
	   * <p>再帰的に処理する必要があったため少々複雑な処理工程を辿ります</p>
	   * <ol>
	   * <li>CommentsListDae</li>
	   * <li>CommentsDae</li>
	   * <li>PopularDae</li>
	   * <li>ReplyDae</li>
	   * <li>CommentsPopularDae</li>
	   * </ol>
	   *
	   * ToDo: @example
	   * @param {Object} response JSON.response
	   */

	  function CommentsListDae() {
	    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, CommentsListDae);

	    response = _Safety.Safety.object(response);
	    this._response = response;
	    console.log('CommentsListDae ', response, response.comments);
	    this._comments = new _CommentsDae.CommentsDae(response.comments);
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {Object|*} JSON.response を返します
	   */

	  (0, _createClass3.default)(CommentsListDae, [{
	    key: 'response',
	    get: function get() {
	      return this._response;
	    }
	    /**
	     * 総コメント数
	     * @return {Number} response.count を返します
	     */

	  }, {
	    key: 'total',
	    get: function get() {
	      return this.response.count;
	    }
	    /**
	     * alias this.total
	     * @return {Number} response.count を返します
	     */

	  }, {
	    key: 'count',
	    get: function get() {
	      return this.total;
	    }
	    /**
	     * @return {CommentsDae|*} response.comments を CommentsDae instance に内包し返します
	     */

	  }, {
	    key: 'comments',
	    get: function get() {
	      return this._comments;
	    }
	  }]);
	  return CommentsListDae;
	}();

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/28 - 21:21
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
	exports.CommentsDae = undefined;

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _PopularDae = __webpack_require__(141);

	var _ReplyDae = __webpack_require__(167);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * コメント一覧表示配列の各コメント
	 */

	// import {CommentsPopularDae} from '../CommentsPopularDae';

	var CommentsDae = exports.CommentsDae = function () {
	  /**
	   * コメント一覧表示の個別コメント, reply 含む
	   * @param {Array} [comments=[]] responce.comments
	   */

	  function CommentsDae() {
	    var comments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    (0, _classCallCheck3.default)(this, CommentsDae);

	    // comment.id を key にデータを保存します
	    var bank = {};
	    // comment.id を 順に保存します
	    var list = [];

	    comments = _Safety.Safety.array(comments);
	    console.log('CommentsDae comments ', comments);

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)(comments), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var comment = _step.value;

	        // reply の前まではこれで処理できているはず...
	        var dae = new _PopularDae.PopularDae(comment);

	        // key / value にデータを保存します
	        bank[dae.id] = {
	          comment: dae,
	          reply: new _ReplyDae.ReplyDae(comment.reply)
	        };

	        list.push(dae.id);
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

	    this._bank = bank;
	    this._list = list;

	    console.log('CommentsDae', this._bank, this._list);
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * comment を comment id をキー としたObjectに保存します
	   * <dl>
	   *   <dt>comment</dt>
	   *   <dd>PopularDae</dd>
	   *   <dt>reply</dt>
	   *   <dd>ReplyDae</dd>
	   * </dl>
	   *
	   * @return {Object|*}  comment id をキー としたObjectを返します
	   */

	  (0, _createClass3.default)(CommentsDae, [{
	    key: 'bank',
	    get: function get() {
	      return this._bank;
	    }
	    /**
	     * comment id を順に保存しています
	     * @return {Array|*} comment id を保持した配列を返します
	     */

	  }, {
	    key: 'list',
	    get: function get() {
	      return this._list.slice(0);
	    }
	  }]);
	  return CommentsDae;
	}();

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/28 - 23:11
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
	exports.ReplyDae = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _CommentsPopularDae = __webpack_require__(150);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * コメントへの返信
	 */

	var ReplyDae = exports.ReplyDae = function () {
	  /**
	   * コメントへの返信を表示するために使用します
	   * @param {Object} [reply={}] comments.reply をセットします
	   */

	  function ReplyDae() {
	    var reply = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    (0, _classCallCheck3.default)(this, ReplyDae);

	    reply = _Safety.Safety.object(reply);

	    var total = parseInt(reply.count, 10);
	    //if ( !Number.isInteger( total ) ) {
	    //  total = 0;
	    //}
	    total = _Safety.Safety.integer(total, 0);
	    this._total = total;
	    this._comments = new _CommentsPopularDae.CommentsPopularDae(reply.comments);
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * reply 総数
	   * @return {Number|*} reply 総数を返します
	   */

	  (0, _createClass3.default)(ReplyDae, [{
	    key: 'total',
	    get: function get() {
	      return this._total;
	    }
	    /**
	     * reply.comments
	     * @return {CommentsPopularDae|*} reply.comments を CommentsPopularDae instance として返します
	     */

	  }, {
	    key: 'comments',
	    get: function get() {
	      return this._comments;
	    }
	  }]);
	  return ReplyDae;
	}();

/***/ },
/* 168 */
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

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(137);

	var _User = __webpack_require__(78);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Headline = __webpack_require__(108);

	var _HeadlineAuth = __webpack_require__(113);

	var _Result = __webpack_require__(88);

	var _ArticleDae = __webpack_require__(145);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// dae
	var React = self.React;
	// data

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

	    option = _Safety.Safety.object(option);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeadline).call(this, element, option));

	    var ActionClass = _User.User.sign ? _HeadlineAuth.HeadlineAuth : _Headline.Headline;
	    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));

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
	        var error = new Error('[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else if (articles.length === 0) {

	          // articles empty
	          // request, JSON 取得に問題は無かったが data が取得できなかった
	          var error = new Error('[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。');
	          this.executeSafely(_View2.View.EMPTY_ERROR, error);
	          // this.showError( error.message );
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

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

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

	      // headline 1 記事
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
	          caption: React.PropTypes.string.isRequired,
	          thumbnail: React.PropTypes.string.isRequired
	        },
	        render: function render() {
	          var p = this.props;

	          return React.createElement(
	            'li',
	            { className: 'board-item board-item-' + p.index },
	            React.createElement(
	              'a',
	              { className: 'post', href: p.url },
	              React.createElement(
	                'figure',
	                { className: 'post-thumb' },
	                React.createElement('img', { src: p.thumbnail, alt: p.caption })
	              ),
	              React.createElement(
	                'div',
	                { className: 'post-data' },
	                React.createElement(
	                  'p',
	                  { className: 'post-category post-category-' + p.slug },
	                  p.category
	                ),
	                React.createElement(
	                  'h3',
	                  { className: 'post-heading' },
	                  p.title
	                ),
	                React.createElement(
	                  'p',
	                  { className: 'post-date' },
	                  p.date
	                )
	              )
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
	            { className: 'headline' },
	            React.createElement(
	              'div',
	              { className: 'headline-heading' },
	              React.createElement(
	                'h2',
	                { className: 'headline-heading-title' },
	                React.createElement('img', { src: '/assets/images/index/headline-heading.png', alt: 'HEADLINE NEWS' })
	              ),
	              React.createElement(
	                'span',
	                { className: 'headline-heading-ruby' },
	                '注目のニュース'
	              )
	            ),
	            React.createElement(
	              'ul',
	              { className: 'board-small column2' },
	              list.map(function (article, i) {

	                var dae = new _ArticleDae.ArticleDae(article);
	                var thumbnail = undefined,
	                    caption = undefined;

	                // mediaType データ取り出し変更
	                // 2016-02-08 JSON 変更
	                //if ( dae.mediaType === 'image' ) {
	                //  // type image
	                //  thumbnail = dae.media.images.thumbnail;
	                //  caption = dae.media.images.caption;
	                //} else {
	                //  // type video
	                //  thumbnail = dae.media.video.thumbnail;
	                //  caption = dae.media.video.caption;
	                //}

	                thumbnail = dae.media.images.thumbnail;
	                caption = dae.media.images.caption;

	                // thumbnail を check しなければ代替画像にする
	                if (!thumbnail) {
	                  thumbnail = _Empty.Empty.IMG_SMALL;
	                }
	                caption = _Safety.Safety.string(caption, '');

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
	                  caption: caption,
	                  thumbnail: thumbnail
	                });
	              })
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	        }
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
	    } // render

	  }]);
	  return ViewHeadline;
	}(_View2.View);

/***/ },
/* 169 */
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewPickup = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(137);

	var _User = __webpack_require__(78);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Pickup = __webpack_require__(107);

	var _PickupAuth = __webpack_require__(110);

	var _Result = __webpack_require__(88);

	var _ArticleDae = __webpack_require__(145);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// global object
	// React

	// dae
	var React = self.React;
	// data

	// action

	// view

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
	   * @link ViewHeadline
	   * @param {Element} element root element
	   * @param {Object} [option={}] optional event handler
	   */

	  function ViewPickup(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    (0, _classCallCheck3.default)(this, ViewPickup);

	    option = _Safety.Safety.object(option);

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewPickup).call(this, element, option));

	    var ActionClass = _User.User.sign ? _PickupAuth.PickupAuth : _Pickup.Pickup;
	    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._index = 0;
	    _this2._last = 0;
	    _this2._waiting = 1000 * 5;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * interval 間隔, milliseconds, default 5000ms
	   * @property {Number} waiting interval milliseconds
	   * @default 5000
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
	        var error = new Error('[PICKUP:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else if (articles.length === 0) {

	          // articles empty
	          // request, JSON 取得に問題は無かったが data が取得できなかった
	          var error = new Error('[PICKUP:EMPTY]サーバーレスポンスに問題が発生しました。');
	          this.executeSafely(_View2.View.EMPTY_ERROR, error);
	          // this.showError( error.message );
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

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

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

	      // interval を管理する Gasane.Polling instance
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
	          console.log('PickupPager click ' + event.target.innerHTML);
	          this.props.onPager(event.target.innerHTML);
	        },
	        render: function render() {
	          var p = this.props;

	          return React.createElement(
	            'li',
	            { className: 'pager-item pager-' + (p.index - p.length) },
	            React.createElement(
	              'a',
	              { href: '#pickup-' + p.index, className: 'pager-link',
	                onClick: this.handleClick },
	              p.index - p.length
	            )
	          );
	        }
	      });

	      // pagers 親コンポーネント
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
	          large: React.PropTypes.string.isRequired,
	          caption: React.PropTypes.string.isRequired,
	          commentsCount: React.PropTypes.number.isRequired
	        },
	        render: function render() {
	          var p = this.props;

	          return React.createElement(
	            'li',
	            { id: 'pickup-' + p.index, className: 'pickup pickup-' + p.index },
	            React.createElement(
	              'a',
	              { href: p.url },
	              React.createElement('img', { src: _Empty.Empty.KV_OVERLAY, alt: '', className: 'overlay' }),
	              React.createElement('img', { src: p.large, alt: p.caption }),
	              React.createElement(
	                'div',
	                { className: 'post-overview' },
	                React.createElement(
	                  'p',
	                  { className: 'post-category post-category-' + p.slug },
	                  p.category
	                ),
	                React.createElement(
	                  'h2',
	                  { className: 'post-heading' },
	                  p.title
	                ),
	                React.createElement(
	                  'p',
	                  { className: 'post-date' },
	                  p.date
	                ),
	                React.createElement(
	                  'p',
	                  { className: 'post-comment-num' },
	                  p.commentsCount
	                )
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
	          this.jump(n);
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
	          this.jump(n);
	        },
	        // slide を変更
	        jump: function jump(index) {
	          console.log('jump ', index);
	          // polling stop
	          polling.stop();
	          // --------------
	          // 循環アニメーションのために
	          if (index === 0) {
	            // 先頭に戻る
	            if (position === last) {
	              // 現在がラストだったらアニメーションなしで移動させる
	              this.setState({ index: 999 });
	              this.delay(index);
	            } else {
	              // 通常移動
	              this.setup(index);
	            }
	          } else if (index === last) {
	            // 最終に戻る
	            if (position === 0) {
	              // 現在が先頭だったらアニメーションなしで移動させる
	              this.setState({ index: 1999 });
	              this.delay(index);
	            } else {
	              // 通常移動
	              this.setup(index);
	            }
	          } else {

	            // 通常移動
	            this.setup(index);
	          }
	        },
	        // 最終から先頭, 先頭から最終へ戻るときに循環アニメーションのために
	        // アニメーション無しで移動させた後
	        // リフレッシュのために待機させる 1fps
	        delay: function delay(index) {
	          var me = this;
	          if (!!this.timer) {
	            clearTimeout(this.timer);
	          }
	          this.timer = setTimeout(function () {
	            me.setup(index);
	          }, 25);
	        },
	        // re position, polling restart
	        setup: function setup(index) {
	          // --------------
	          // state update
	          position = index;
	          this.setState({ index: index });
	          // polling start
	          polling.start();
	        },
	        // pager click から呼び出されます
	        onPagerClick: function onPagerClick(index) {
	          console.log('onPagerClick ', index);
	          // 子コンポーネント Pagers -> PickupPager から呼び出される
	          // innerHTML 数値を使うので
	          // Number 型へ変換する
	          this.jump(parseInt(index, 10));
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
	            var large = undefined,
	                caption = undefined;

	            // mediaType データ取り出し変更
	            // 2016-02-08 JSON 変更
	            //
	            //if ( dae.mediaType === 'image' ) {
	            //  // type image
	            //  large = dae.media.images.large;
	            //  caption = dae.media.images.caption;
	            //} else {
	            //  // type video
	            //  large = dae.media.video.large;
	            //  caption = dae.media.video.caption;
	            //}

	            large = dae.media.images.large;
	            caption = dae.media.images.caption;

	            if (!large) {
	              large = _Empty.Empty.IMG_LARGE;
	            }
	            caption = _Safety.Safety.string(caption, '');

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
	              large: large,
	              caption: caption,
	              commentsCount: dae.commentsCount
	            });
	          };

	          // JSX
	          return React.createElement(
	            'div',
	            { className: 'hero-sec' },
	            React.createElement(
	              'div',
	              { className: 'hero-slider pickup-container slide-' + this.state.index },
	              React.createElement(
	                'div',
	                { className: 'hero-slider-inner' },
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
	                { className: 'hero-slider-control' },
	                React.createElement(
	                  'div',
	                  { className: 'direction' },
	                  React.createElement(
	                    'a',
	                    { id: 'prev', className: 'direction-prev', href: '#prev', onClick: this.onPrev },
	                    'Prev'
	                  ),
	                  React.createElement(
	                    'a',
	                    { id: 'next', className: 'direction-next', href: '#next', onClick: this.onNext },
	                    'Next'
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'pager' },
	                  React.createElement(Pagers, {
	                    list: articles,
	                    offset: articles.length,
	                    onPager: this.onPagerClick
	                  })
	                )
	              )
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          // callback
	          _this.executeSafely(_View2.View.DID_MOUNT);
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

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/26 - 19:12
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// app

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewRanking = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(137);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Widget = __webpack_require__(119);

	var _Result = __webpack_require__(88);

	var _ArticleDae = __webpack_require__(145);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// dae

	// action

	// view
	var React = self.React;
	// data

	var ReactDOM = self.ReactDOM;

	/**
	 * sidebar ranking
	 */

	var ViewRanking = exports.ViewRanking = function (_View) {
	  (0, _inherits3.default)(ViewRanking, _View);

	  /**
	   * sidebar ranking 5件 を表示します
	   * @param {Element} element root element
	   * @param {Object} [option={}] optional event handler
	   * @param {string} [slug=all] category slug です
	   */

	  function ViewRanking(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var slug = arguments.length <= 2 || arguments[2] === undefined ? 'all' : arguments[2];
	    (0, _classCallCheck3.default)(this, ViewRanking);

	    option = _Safety.Safety.object(option);
	    slug = _Safety.Safety.string(slug, 'all');

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewRanking).call(this, element, option));

	    _this2._action = _Widget.Widget.ranking(slug, _this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._slug = slug;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {string|*} 捜査 slug を返します
	   */

	  (0, _createClass3.default)(ViewRanking, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
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
	        var error = new Error('[RANKING:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else if (articles.length === 0) {

	          // articles empty
	          // request, JSON 取得に問題は無かったが data が取得できなかった
	          var error = new Error('[RANKING:EMPTY]サーバーレスポンスに問題が発生しました。');
	          this.executeSafely(_View2.View.EMPTY_ERROR, error);
	          // this.showError( error.message );
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

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

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
	      var categorySlug = this.slug;
	      var _this = this;

	      // tag block
	      var RankingDom = React.createClass({
	        displayName: 'RankingDom',

	        propTypes: {
	          index: React.PropTypes.number.isRequired,
	          id: React.PropTypes.string.isRequired,
	          slug: React.PropTypes.string.isRequired,
	          category: React.PropTypes.string.isRequired,
	          url: React.PropTypes.string.isRequired,
	          date: React.PropTypes.string.isRequired,
	          title: React.PropTypes.string.isRequired,
	          caption: React.PropTypes.string.isRequired,
	          thumbnail: React.PropTypes.string.isRequired,
	          total: React.PropTypes.number.isRequired
	        },
	        render: function render() {
	          var p = this.props;
	          var n = p.index + 1;

	          return React.createElement(
	            'li',
	            { className: 'board-item rank' + n + ' ranking-' + (p.slug || categorySlug) },
	            React.createElement(
	              'a',
	              { href: p.url, className: 'post' },
	              React.createElement(
	                'figure',
	                { className: 'post-thumb' },
	                React.createElement('img', { src: p.thumbnail, alt: p.caption })
	              ),
	              React.createElement(
	                'div',
	                { className: 'post-data' },
	                React.createElement(
	                  'p',
	                  { className: 'post-category post-category-' + p.slug },
	                  p.category
	                ),
	                React.createElement(
	                  'h4',
	                  { className: 'post-heading' },
	                  p.title
	                ),
	                React.createElement(
	                  'p',
	                  { className: 'post-date' },
	                  p.date
	                )
	              )
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
	          var categoryTitle = '';

	          var categoryLabel = undefined;
	          // category api slug が `all` 以外の時に category.label をタイトルに含める
	          if (categorySlug !== 'all') {
	            categoryLabel = list[0].category.label;

	            if (categoryLabel !== '') {
	              // category.label が空でなかったら '/' と一緒に加える
	              categoryTitle = ' / ' + categoryLabel;
	            }
	          }

	          return React.createElement(
	            'div',
	            { className: 'board-small widget-ranking' },
	            React.createElement(
	              'div',
	              { className: 'widget-ranking-heading' },
	              React.createElement(
	                'h3',
	                { className: 'widget-ranking-heading-title' },
	                React.createElement('img', { src: '/assets/images/common/side-ranking-heading.png', alt: 'RANKING' })
	              ),
	              React.createElement(
	                'span',
	                { className: 'widget-ranking-heading-ruby' },
	                '人気の記事',
	                categoryTitle
	              )
	            ),
	            React.createElement(
	              'ul',
	              { className: 'post-list' },
	              list.map(function (article, i) {

	                var dae = new _ArticleDae.ArticleDae(article);
	                var thumbnail = undefined,
	                    caption = undefined;

	                // mediaType データ取り出し変更
	                // 2016-02-08 JSON 変更
	                //if ( dae.mediaType === 'image' ) {
	                //  // type image
	                //  thumbnail = dae.media.images.thumbnail;
	                //  caption = dae.media.images.caption;
	                //} else {
	                //  // type video
	                //  thumbnail = dae.media.video.thumbnail;
	                //  caption = dae.media.video.caption;
	                //}

	                thumbnail = dae.media.images.thumbnail;
	                caption = dae.media.images.caption;

	                // thumbnail を check なければ代替画像にする
	                if (!thumbnail) {
	                  thumbnail = _Empty.Empty.IMG_SMALL;
	                }
	                caption = _Safety.Safety.string(caption, '');

	                // RankingDom instance を使い render
	                return React.createElement(RankingDom, {
	                  key: 'ranking-' + dae.id,
	                  index: i,
	                  id: String(dae.id),
	                  slug: dae.category.slug,
	                  category: dae.category.label,
	                  url: dae.url,
	                  date: dae.formatDate,
	                  title: dae.title,
	                  thumbnail: thumbnail,
	                  caption: caption,
	                  total: dae.commentsCount
	                });
	              })
	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	        }
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
	    } // render

	  }, {
	    key: 'slug',
	    get: function get() {
	      return this._slug;
	    }
	  }]);
	  return ViewRanking;
	}(_View2.View);

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/26 - 20:37
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	// app

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ViewVideos = undefined;

	var _getPrototypeOf = __webpack_require__(66);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(71);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(72);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Empty = __webpack_require__(137);

	var _View2 = __webpack_require__(132);

	var _ViewError = __webpack_require__(144);

	var _Widget = __webpack_require__(119);

	var _Result = __webpack_require__(88);

	var _ArticleDae = __webpack_require__(145);

	var _Safety = __webpack_require__(44);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React

	// dae

	// action

	// view
	var React = self.React;
	// data

	var ReactDOM = self.ReactDOM;

	/**
	 * sidebar video
	 */

	var ViewVideos = exports.ViewVideos = function (_View) {
	  (0, _inherits3.default)(ViewVideos, _View);

	  /**
	   * sidebar video 5件 を表示します
	   * @param {Element} element root element
	   * @param {Object} [option={}] optional event handler
	   * @param {string} [slug=all] category slug です
	   */

	  function ViewVideos(element) {
	    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var slug = arguments.length <= 2 || arguments[2] === undefined ? 'all' : arguments[2];
	    (0, _classCallCheck3.default)(this, ViewVideos);

	    option = _Safety.Safety.object(option);
	    slug = _Safety.Safety.string(slug, 'all');

	    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewVideos).call(this, element, option));

	    _this2._action = _Widget.Widget.video(slug, _this2.done.bind(_this2), _this2.fail.bind(_this2));
	    _this2._slug = slug;

	    return _this2;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   *
	   * @return {string|*} 捜査 slug を返します
	   */

	  (0, _createClass3.default)(ViewVideos, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
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
	        var error = new Error('[VIDEOS:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else if (articles.length === 0) {

	          // articles empty
	          // request, JSON 取得に問題は無かったが data が取得できなかった
	          var error = new Error('[VIDEOS:EMPTY]サーバーレスポンスに問題が発生しました。');
	          this.executeSafely(_View2.View.EMPTY_ERROR, error);
	          // this.showError( error.message );
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

	      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
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

	      message = _Safety.Safety.string(message, '');

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
	      var categorySlug = this.slug;
	      var _this = this;

	      // tag block
	      var VideosDom = React.createClass({
	        displayName: 'VideosDom',

	        propTypes: {
	          index: React.PropTypes.number.isRequired,
	          id: React.PropTypes.string.isRequired,
	          slug: React.PropTypes.string.isRequired,
	          category: React.PropTypes.string.isRequired,
	          url: React.PropTypes.string.isRequired,
	          date: React.PropTypes.string.isRequired,
	          title: React.PropTypes.string.isRequired,
	          caption: React.PropTypes.string.isRequired,
	          thumbnail: React.PropTypes.string.isRequired
	        },
	        render: function render() {
	          var p = this.props;

	          return React.createElement(
	            'li',
	            { className: 'board-item videos-' + p.index + ' videos-' + (p.slug || categorySlug) },
	            React.createElement(
	              'a',
	              { href: p.url, className: 'post' },
	              React.createElement(
	                'figure',
	                { className: 'post-thumb' },
	                React.createElement('img', { className: 'post-thumb-overlay-movie', src: _Empty.Empty.VIDEO_PLAY }),
	                React.createElement('img', { src: p.thumbnail, alt: p.caption })
	              ),
	              React.createElement(
	                'div',
	                { className: 'post-data' },
	                React.createElement(
	                  'p',
	                  { className: 'post-category post-category-' + p.slug },
	                  p.category
	                ),
	                React.createElement(
	                  'h4',
	                  { className: 'post-heading' },
	                  p.title
	                ),
	                React.createElement(
	                  'p',
	                  { className: 'post-date' },
	                  p.date
	                )
	              )
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
	          var categoryTitle = '';

	          var categoryLabel = undefined;
	          // category api slug が `all` 以外の時に category.label をタイトルに含める
	          if (categorySlug !== 'all') {
	            categoryLabel = list[0].category.label;

	            if (categoryLabel !== '') {
	              // category.label が空でなかったら '/' と一緒に加える
	              categoryTitle = ' / ' + categoryLabel;
	            }
	          }

	          return React.createElement(
	            'div',
	            { className: 'board-small widget-recommend' },
	            React.createElement(
	              'div',
	              { className: 'widget-recommend-heading' },
	              React.createElement(
	                'h3',
	                { className: 'widget-recommend-heading-title' },
	                React.createElement('img', { src: '/assets/images/common/side-recommend-heading.png', alt: 'RECOMMEND' })
	              ),
	              React.createElement(
	                'span',
	                { className: 'widget-recommend-heading-ruby' },
	                'オススメ動画',
	                categoryTitle
	              )
	            ),
	            React.createElement(
	              'ul',
	              { className: 'board-list' },
	              list.map(function (article, i) {

	                var dae = new _ArticleDae.ArticleDae(article);
	                var thumbnail = dae.media.video.medium;
	                var caption = dae.media.video.caption;

	                // thumbnail(16x9) を check なければ代替画像にする
	                if (!thumbnail) {
	                  thumbnail = _Empty.Empty.VIDEO_THUMBNAIL;
	                }
	                caption = _Safety.Safety.string(caption, '');

	                // VideosDom instance を使い render
	                return React.createElement(VideosDom, {
	                  key: 'ranking-' + dae.id,
	                  index: i,
	                  id: String(dae.id),
	                  slug: dae.category.slug,
	                  category: dae.category.label,
	                  url: dae.url,
	                  date: dae.formatDate,
	                  title: dae.title,
	                  caption: caption,
	                  thumbnail: thumbnail
	                });
	              }) // map

	            )
	          );
	        },
	        componentDidMount: function componentDidMount() {

	          // after mount
	          _this.executeSafely(_View2.View.DID_MOUNT);
	        }
	      });

	      // dom 生成
	      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
	    } // render

	  }, {
	    key: 'slug',
	    get: function get() {
	      return this._slug;
	    }
	  }]);
	  return ViewVideos;
	}(_View2.View);

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/01/29 - 20:17
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * View callback の定型
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Receiver = undefined;

	var _classCallCheck2 = __webpack_require__(40);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(41);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Receiver = exports.Receiver = function () {
	  /**
	   * <p>View callback の定型<br>
	   * instance を作成し callback をカスタマイズします<p>
	   *
	   * @example
	   * var receiver = new Receiver();
	   * receiver.didMount = function() {}
	   * receiver.emptyError = function() {}
	   *
	   * var action = new View( element );
	   * action.on( View.DID_MOUNT, receiver.didMount );
	   * action.on( View.EMPTY_ERROR, receiver.emptyError );
	   *
	   */

	  function Receiver() {
	    (0, _classCallCheck3.default)(this, Receiver);
	  }
	  /**
	   * ReactDOM.render 前に呼び出されます
	   * @param {Object} event Event object
	   */

	  (0, _createClass3.default)(Receiver, [{
	    key: 'beforeRender',
	    value: function beforeRender(event) {}
	    /**
	     * React.componentWillMount callback
	     * @param {Object} event Event object
	     */

	  }, {
	    key: 'willMount',
	    value: function willMount(event) {}
	    /**
	     * React.componentDidMount callback
	     * @param {Object} event Event object
	     */

	  }, {
	    key: 'didMount',
	    value: function didMount(event) {}
	    /**
	     * データが見つからない時に呼び出されます
	     * @param {Error} error エラーインスタンス
	     */

	  }, {
	    key: 'undefinedError',
	    value: function undefinedError(error) {}
	    /**
	     * データが空の時に呼び出されます
	     * @param {Error} error エラーインスタンス
	     */

	  }, {
	    key: 'emptyError',
	    value: function emptyError(error) {}
	    /**
	     * 処理中にエラーが起きた時に呼び出されます
	     * @param {Error} error エラーインスタンス
	     */

	  }, {
	    key: 'responseError',
	    value: function responseError(error) {}

	    /**
	     * エラーDOMがマウントされた時に呼び出されます
	     * @param {Error} error エラーインスタンス
	     */

	  }, {
	    key: 'errorMount',
	    value: function errorMount(error) {}
	  }]);
	  return Receiver;
	}();

/***/ }
/******/ ]);