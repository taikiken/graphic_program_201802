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
/******/ 	__webpack_require__.p = "js/bundle";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Api = __webpack_require__(1);

	var _Types = __webpack_require__(7);

	var _Codes = __webpack_require__(49);

	/**
	 * global object
	 * こんな感じで使えます
	 *
	 *    var ut = window.UT
	 */
	var UT = {
	  version: '1.0.0',
	  Api: _Api.Api,
	  Types: _Types.Types,
	  Codes: _Codes.Codes
	}; /*!
	    * Copyright (c) 2011-2016 inazumatv.com, Parachute.
	    * @author (at)taikiken / http://inazumatv.com
	    * @date 2016-01-12 14:46:49
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

	window.UT = UT;

/***/ },
/* 1 */
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

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Types = __webpack_require__(7);

	var _Type = __webpack_require__(8);

	var _Permalink = __webpack_require__(9);

	var _Quries = __webpack_require__(10);

	var _Query = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _instance = null;
	var API_PATH = '/api/v1';

	/**
	 * サーバーリクエストAPIを管理します
	 */

	var Api = exports.Api = function () {
	  /**
	   * singleton なので Api.factory() でインスタンスを作成します
	   * @returns {Api} Api instance を返します
	   */

	  function Api() {
	    (0, _classCallCheck3.default)(this, Api);

	    if (_instance !== null) {

	      throw new Error('Api is singleton pattern. instead use Api.factory()');
	    }

	    _instance = this;

	    this.signOff();

	    this._api = {
	      login: new _Types.Types(new _Type.Type(API_PATH + '/oauth/token', 'POST'), new _Permalink.Permalink(), new _Quries.Queries()),
	      // home / self
	      home: new _Types.Types(new _Type.Type(API_PATH + '/articles/home'), new _Permalink.Permalink(['pickup', 'headline']), new _Quries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
	      self: new _Types.Types(new _Type.Type(API_PATH + '/articles/self'), new _Permalink.Permalink(['pickup', 'headline']), new _Quries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]))
	    };

	    return _instance;
	  }

	  /**
	   * property sign へ true をセットします
	   * sign inした
	   */

	  (0, _createClass3.default)(Api, [{
	    key: 'signIn',
	    value: function signIn() {

	      this._sign = true;
	    }
	    /**
	     * property sign へ false をセットします
	     * sign offした
	     */

	  }, {
	    key: 'signOff',
	    value: function signOff() {

	      this._sign = false;
	    }

	    /**
	     * ユーザーがsign in済みかどうかを調べます
	     * @readOnly
	     * @returns {boolean} true: sign in, false: sign offを返します
	     */

	  }, {
	    key: 'login',

	    /**
	     * LOGIN API をTypes instanceで返します
	     * @returns {Types} LOGIN API を返します
	     */
	    value: function login() {

	      return this._api.login;
	    }

	    /**
	     * @returns {*} HOME API(home / self)をTypes instanceで返します
	     */

	  }, {
	    key: 'home',
	    value: function home() {

	      return this.sign ? this._api.self : this._api.home;
	    }

	    /**
	     * @returns {Api} Api instance を返します
	     */

	  }, {
	    key: 'sign',
	    get: function get() {

	      return this._sign;
	    }
	  }], [{
	    key: 'factory',
	    value: function factory() {

	      if (_instance === null) {

	        _instance = new Api();
	      }

	      return _instance;
	    }
	  }]);
	  return Api;
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

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Type = __webpack_require__(8);

	var _Permalink = __webpack_require__(9);

	var _Quries = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * API url, path option, query 情報を保持します
	 */

	var Types = exports.Types = function () {
	  /**
	   *
	   * @param {Type} type Type instance
	   * @param {Permalink} permalink Permalink instance
	   * @param {Queries} queries Queries instabce
	   */

	  function Types(type, permalink, queries) {
	    (0, _classCallCheck3.default)(this, Types);

	    this._type = type;
	    this._permalink = permalink;
	    this._queries = queries;
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
	     *
	     * @returns {Permalink} Permalink instance を返します
	     */

	  }, {
	    key: 'permalink',
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
	  }]);
	  return Types;
	}();

/***/ },
/* 8 */
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

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Type = exports.Type = function () {
	  /**
	   * @param {string} url API request先
	   * @param {string=GET} [method] POST | GET
	   */

	  function Type(url) {
	    var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
	    (0, _classCallCheck3.default)(this, Type);

	    this._url = url;
	    this._method = method;
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
	     * POST | GET を設定します
	     * @param {string} method POST | GETの値
	     */
	    ,
	    set: function set(method) {

	      var methodUpper = method.toUpperCase();

	      if (methodUpper !== 'GET' && methodUpper !== 'POST') {

	        methodUpper = 'GET';
	      }

	      this._method = methodUpper;
	    }
	  }]);
	  return Type;
	}();

/***/ },
/* 9 */
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

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

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
	   * @param {boolean} [need] 追加 path が必須かを設定。true: 必須, false: オプション
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
/* 10 */
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

	var _getIterator2 = __webpack_require__(11);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Query = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Query{key: value} を配列で管理します
	 */

	var Queries = exports.Queries = function () {
	  /**
	   * @param {Array<Query>} [queries] Query{key: value} 配列
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	__webpack_require__(40);
	module.exports = __webpack_require__(43);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	var Iterators = __webpack_require__(17);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(15)
	  , step             = __webpack_require__(16)
	  , Iterators        = __webpack_require__(17)
	  , toIObject        = __webpack_require__(18);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(22)(Array, 'Array', function(iterated, kind){
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
/* 15 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(19)
	  , defined = __webpack_require__(21);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(20);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(23)
	  , $export        = __webpack_require__(24)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(30)
	  , has            = __webpack_require__(34)
	  , Iterators      = __webpack_require__(17)
	  , $iterCreate    = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(36)
	  , getProto       = __webpack_require__(6).getProto
	  , ITERATOR       = __webpack_require__(37)('iterator')
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
/* 23 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(25)
	  , core      = __webpack_require__(26)
	  , ctx       = __webpack_require__(27)
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
/* 25 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 26 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(28);
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
/* 28 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , createDesc = __webpack_require__(31);
	module.exports = __webpack_require__(32) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(33)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(6)
	  , descriptor     = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(36)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(30)(IteratorPrototype, __webpack_require__(37)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(6).setDesc
	  , has = __webpack_require__(34)
	  , TAG = __webpack_require__(37)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(38)('wks')
	  , uid    = __webpack_require__(39)
	  , Symbol = __webpack_require__(25).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(25)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(41)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(22)(String, 'String', function(iterated){
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , defined   = __webpack_require__(21);
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
/* 42 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(44)
	  , get      = __webpack_require__(46);
	module.exports = __webpack_require__(26).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(45);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(47)
	  , ITERATOR  = __webpack_require__(37)('iterator')
	  , Iterators = __webpack_require__(17);
	module.exports = __webpack_require__(26).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(20)
	  , TAG = __webpack_require__(37)('toStringTag')
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
/* 48 */
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

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Query = exports.Query = function () {
	  /**
	   *
	   * @param {string} key query key
	   * @param {string} type query value type
	   * @param {*=null} [defaultValue] default value, あれば...
	   * @param {boolean=false} [require] 必須フラグ
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
/* 49 */
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

	/**
	 * API Response Code を管理します
	 * @class Codes
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Codes = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Codes = exports.Codes = function () {
	  /**
	   * @constructor
	   */

	  function Codes() {
	    (0, _classCallCheck3.default)(this, Codes);

	    /**
	     * ステータスコード：英語
	     * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
	     */
	    this.en = {
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
	    /**
	     * ステータスコード：日本語
	     * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
	     */
	    this.jp = {
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
	  }

	  /**
	   * @method status
	   * @param {int} statusCode サーバーからのレスポンスコード int型
	   * @returns {boolean} statusCodeが成功したか(true)失敗(false)を調べ返します
	   */

	  (0, _createClass3.default)(Codes, null, [{
	    key: 'status',
	    value: function status(statusCode) {

	      return statusCode >= 200 && statusCode < 400;
	    }

	    /**
	     * status codeの意味を調べます
	     * @param {Number} code {int},サーバーからのresponse status code
	     * @returns {{en: string|*, jp: string|*}} status codeの意味を返します
	     */

	  }, {
	    key: 'message',
	    value: function message(code) {

	      var me = Codes.factory();

	      return {
	        en: me.en[code],
	        jp: me.jp[code]
	      };
	    }

	    /**
	     * @static
	     * @returns {Codes} Codes instance を返します
	     */

	  }, {
	    key: 'factory',
	    value: function factory() {

	      return new Codes();
	    }
	  }]);
	  return Codes;
	}();

/***/ }
/******/ ]);