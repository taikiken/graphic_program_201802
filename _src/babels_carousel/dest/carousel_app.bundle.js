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

	var _Prepare = __webpack_require__(1);

	var _Prepare2 = _interopRequireDefault(_Prepare);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ---init
	_Prepare2.default.start(); /**
	                            * Copyright (c) 2011-2017 inazumatv.com, inc.
	                            * @author (at)taikiken / http://inazumatv.com
	                            * @date 2017/05/24 - 20:01
	                            *
	                            * Distributed under the terms of the MIT license.
	                            * http://www.opensource.org/licenses/mit-license.html
	                            *
	                            * This notice shall be included in all copies or substantial portions of the Software.
	                            *
	                            */

	console.log('carousel');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(2);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _from = __webpack_require__(40);

	var _from2 = _interopRequireDefault(_from);

	var _classCallCheck2 = __webpack_require__(48);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(49);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _List = __webpack_require__(52);

	var _List2 = _interopRequireDefault(_List);

	var _Carousel = __webpack_require__(62);

	var _Carousel2 = _interopRequireDefault(_Carousel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * [native code] - document
	 * @private
	 * @type {HTMLDocument}
	 */
	/**
	 * Copyright (c) 2011-2017 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2017/05/24 - 20:54
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// moku/util
	var document = self.document;

	/**
	 * Sagen
	 * @private
	 * @type {Sagen}
	 */


	// // moku/dom
	// import Classes from '../moku/dom/Classes';

	// carousel
	var Sagen = self.Sagen;

	/**
	 * carousel を HTMLElement が存在する状態で実装する準備を行います
	 *
	 * 必要なタグを増やします
	 * - slide コンテナを複製します
	 * - pager 中身を作成します
	 *
	 * スライドが 2 の時は便宜的に 4 として運用します
	 */

	var Prepare = function () {
	  function Prepare() {
	    (0, _classCallCheck3.default)(this, Prepare);
	  }

	  (0, _createClass3.default)(Prepare, null, [{
	    key: 'start',

	    /**
	     * 準備を始めます
	     * ul#js-pickup-slider 存在を確認します
	     *
	     * データによっては存在しないことがあります
	     * @returns {boolean} true: 実装します
	     */
	    value: function start() {
	      console.log('Prepare.start', document.getElementById);
	      // ul#js-pickup-slider
	      var element = document.getElementById('js-pickup-slider');
	      console.log('Prepare.start element', element);
	      if (!element) {
	        return false;
	      }
	      // li.js-pickup 数
	      var length = Prepare.articles(element);
	      console.log('Prepare.start length', length);
	      if (!length) {
	        // li が 0 の時は実装しない
	        return false;
	      }

	      var _Prepare$pager = Prepare.pager(length);

	      var pagers = _Prepare$pager.pagers;

	      var _Prepare$direction = Prepare.direction(length);

	      var prev = _Prepare$direction.prev;
	      var next = _Prepare$direction.next;

	      var carousel = new _Carousel2.default(element, pagers, prev, next);
	      carousel.start();
	      return true;
	    }
	    /**
	     * carousel slide 複製を行います
	     * @param {Element|Document} element ul#js-pickup-slider
	     * @returns {number} ul > li の初期数 === スライド数を返します
	     */

	  }, {
	    key: 'articles',
	    value: function articles(element) {
	      // ul#js-pickup-slider > li.js-pickup
	      var nodeList = element.getElementsByClassName('js-pickup');
	      if (!nodeList || !nodeList.length) {
	        return 0;
	      }
	      var articles = (0, _from2.default)(nodeList);
	      // li 数を取得します
	      var length = articles.length;
	      // スライド数 2 の時は複製を2回増やします
	      var needFourth = length === 2;
	      // 真ん中のグループにマーキングするためのフラッグ
	      var center = true;
	      // スライド数 1 を超えている時に複製を行います
	      if (length > 1) {
	        if (needFourth) {
	          Prepare.clone(element, articles);
	          Prepare.clone(element, articles, center);
	          center = false;
	        }
	        Prepare.clone(element, articles, center);
	        Prepare.clone(element, articles);
	      }
	      // スライド数を返します
	      return length;
	    }
	    /**
	     * スライド複製を行います
	     * @param {Element} element ul#js-pickup-slider
	     * @param {Array<Element>} articles ul#js-pickup-slider > li.js-pickup
	     * @param {boolean} [center=false] 真ん中のグループフラッグ
	     */

	  }, {
	    key: 'clone',
	    value: function clone(element, articles) {
	      var center = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      console.log('clone element', element);
	      var fragment = document.createDocumentFragment();
	      var isCurrent = true;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(articles), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var article = _step.value;

	          var clone = article.cloneNode(true);
	          if (center) {
	            clone.className += ' view-pickup';
	            if (isCurrent) {
	              clone.className += ' current';
	              isCurrent = false;
	            }
	          }
	          fragment.appendChild(clone);
	          console.log('clone', clone);
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

	      element.appendChild(fragment);
	    }
	    /**
	     * pager element を作成します
	     * - div#js-pager-container'
	     *  - div.pager
	     *    - ul.pager-list
	     *      - li.pager-item
	     *        - a.pager-link
	     * @param {number} length スライド数
	     * @returns {?object} {{pagers: Array<Element>}} - pagers: li.pager-item
	     */

	  }, {
	    key: 'pager',
	    value: function pager(length) {
	      // mobile phone pager なし
	      // 1件 pager なし
	      if (Sagen.Browser.Mobile.phone() || length === 1) {
	        return null;
	      }
	      // pager root element
	      var container = document.getElementById('js-pager-container');
	      if (!container) {
	        return null;
	      }
	      // div.pager
	      var pager = document.createElement('div');
	      pager.className = 'pager';
	      // ul.pager-list
	      var element = document.createElement('ul');
	      element.className = 'pager-list';
	      // map するためのダミー配列
	      var list = _List2.default.fill(length, 0);
	      var isCurrent = true;
	      var pagers = list.map(function (value, index) {
	        var li = document.createElement('li');
	        li.className = 'pager-item pager-' + index;
	        if (isCurrent) {
	          li.className += ' current';
	          isCurrent = false;
	        }
	        var a = document.createElement('a');
	        a.className = 'pager-link';
	        a.href = '#pickup-' + index;
	        a.innerHTML = String(index);
	        li.appendChild(a);
	        element.appendChild(li);
	        return li;
	      });
	      // appendChild
	      pager.appendChild(element);
	      container.appendChild(pager);
	      // return ul
	      return {
	        // element,
	        pagers: pagers
	      };
	    }
	    /**
	     * prev / next nav element を作成します
	     * - div#js-direction-container
	     *  - div
	     *    - a#prev
	     *    - a#next
	     * @param {number} length スライド数
	     * @returns {?object} {{prev: a#prev, next: a#next}}
	     */

	  }, {
	    key: 'direction',
	    value: function direction(length) {
	      if (length === 1) {
	        return null;
	      }
	      // direction root element
	      var container = document.getElementById('js-direction-container');
	      if (!container) {
	        return null;
	      }
	      var div = document.createElement('div');
	      div.className = 'direction';
	      var prev = document.createElement('a');
	      prev.className = 'direction-prev';
	      prev.href = '#prev';
	      prev.id = 'prev';
	      var next = document.createElement('a');
	      next.className = 'direction-next';
	      next.href = '#next';
	      next.id = 'next';
	      // appendChild
	      div.appendChild(prev);
	      div.appendChild(next);
	      container.appendChild(div);
	      // return div.direction
	      return {
	        prev: prev,
	        next: next
	      };
	    }
	  }]);
	  return Prepare;
	}();

	exports.default = Prepare;

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
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	__webpack_require__(42);
	module.exports = __webpack_require__(17).Array.from;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(18)
	  , $export     = __webpack_require__(15)
	  , toObject    = __webpack_require__(43)
	  , call        = __webpack_require__(44)
	  , isArrayIter = __webpack_require__(45)
	  , toLength    = __webpack_require__(46)
	  , getIterFn   = __webpack_require__(38);
	$export($export.S + $export.F * !__webpack_require__(47)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(36);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(8)
	  , ITERATOR   = __webpack_require__(29)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(34)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(29)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(50);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
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
	}();

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(48);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(49);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Type = __webpack_require__(53);

	var _Type2 = _interopRequireDefault(_Type);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Array（配列）Utility
	 */

	var List = function () {
	  function List() {
	    (0, _classCallCheck3.default)(this, List);
	  }

	  (0, _createClass3.default)(List, null, [{
	    key: 'filling',

	    /**
	     * Array.prototype.fill, polyfill
	     * @param {number} lengthData 配列長
	     * @param {*} value fill する値
	     * @returns {Array.<*>} fill 後の配列を返します
	     * @private
	     */
	    value: function filling(lengthData, value) {
	      var length = lengthData;
	      var arr = [].slice(0);
	      while (length > 0) {
	        arr.push(value);
	        length -= 1;
	      }
	      return arr;
	    }
	    /**
	     * Array.prototype.fill を行います
	     * @param {number} length 配列長
	     * @param {*} value fill する値
	     * @returns {Array.<*>} fill 後の配列を返しますd
	     */

	  }, {
	    key: 'fill',
	    value: function fill(length) {
	      var value = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	      // 関数が使えない時は polyfill 関数を使用します
	      if (!_Type2.default.method(Array.prototype.fill)) {
	        return List.filling(length, value);
	      }
	      // native method
	      return new Array(length).fill(value);
	    }
	  }]);
	  return List;
	}(); /**
	      * Copyright (c) 2011-2016 inazumatv.com, inc.
	      * @author (at)taikiken / http://inazumatv.com
	      * @date 2016/10/26 - 14:57
	      *
	      * Distributed under the terms of the MIT license.
	      * http://www.opensource.org/licenses/mit-license.html
	      *
	      * This notice shall be included in all copies or substantial portions of the Software.
	      *
	      */

	exports.default = List;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(54);

	var _keys2 = _interopRequireDefault(_keys);

	var _isInteger = __webpack_require__(58);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _classCallCheck2 = __webpack_require__(48);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(49);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/07/12 - 18:24
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	/**
	 * 型チェックを行います
	 * @static
	 */

	var Type = function () {
	  function Type() {
	    (0, _classCallCheck3.default)(this, Type);
	  }

	  (0, _createClass3.default)(Type, null, [{
	    key: 'method',

	    /**
	     * 引数(target)が関数かを調べます
	     * @param {Function|*} target 調査対象
	     * @returns {boolean} 引数(target)が関数かを調べ結果を返します、true: 関数
	     */
	    value: function method(target) {
	      return typeof target === 'function';
	    }
	    /**
	     * 引数(target)を `!!` で調べます
	     * @param {*} target 調査対象
	     * @returns {boolean} 引数(target)を `!!` で調べ結果を返します
	     */

	  }, {
	    key: 'exist',
	    value: function exist(target) {
	      return !!target;
	    }
	    /**
	     * 引数(target)が number かを調べます
	     * @param {*} target 調査対象
	     * @returns {boolean} 引数(target)が number かを調べ結果を返します、true: number
	     */

	  }, {
	    key: 'number',
	    value: function number(target) {
	      // [参考] jQuery 2.x, jQuery 2 関数は文字列 "2" も true にするので type check を追加した
	      return typeof target === 'number' && !Type.array(target) && target - parseFloat(target) + 1 >= 0;
	    }
	    /**
	     * 引数(target)が int かを `Number.isInteger` を使用し調べます
	     * @param {*} target 調査対象
	     * @returns {boolean} 引数(target)が int かを調べ結果を返します、true: int
	     */

	  }, {
	    key: 'int',
	    value: function int(target) {
	      return (0, _isInteger2.default)(target);
	    }
	    /**
	     * 引数(target)が string かを調べます
	     * @param {*} target 調査対象
	     * @returns {boolean} 引数(target)が string かを調べ結果を返します、true: string
	     */

	  }, {
	    key: 'string',
	    value: function string(target) {
	      return typeof target === 'string';
	    }
	    /**
	     * 引数(target)を `Array.isArray` で配列かを調べます
	     * @param {*} target 調査対象
	     * @returns {boolean} 引数(target)が 配列 かを調べ結果を返します、true: 配列
	     */

	  }, {
	    key: 'array',
	    value: function array(target) {
	      return Array.isArray(target);
	    }
	    /**
	     * 引数(target)が null かを調べます
	     * @param {*} target 調査対象
	     * @returns {boolean} 引数(target)が null かを調べ結果を返します、true: null
	     */

	  }, {
	    key: 'nil',
	    value: function nil(target) {
	      return target === null;
	    }
	    /**
	     * Object型 引数 `object` は String型 引数 `key` を [key] として所持しているかを調べます
	     * @deprecated instead use Type.has
	     * @param {Object} target 調査対象
	     * @param {string} key Object.key 名称
	     * @returns {boolean} 存在する時は true を返します
	     */

	  }, {
	    key: 'hasKey',
	    value: function hasKey(target, key) {
	      return Type.has(target, key);
	    }
	    /**
	     * Object型 引数 `object` は String型 引数 `key` を [key] として所持しているかを調べます
	     * @param {Object} target 調査対象
	     * @param {string} key Object.key 名称
	     * @returns {boolean} 存在する時は true を返します
	     */

	  }, {
	    key: 'has',
	    value: function has(target, key) {
	      return (0, _keys2.default)(target).indexOf(key) !== -1;
	    }
	    /**
	     * target が undefined かを調べます
	     * @param {*} target 調査対象
	     * @returns {boolean} true: undefined
	     * @since 2016-10-25
	     */

	  }, {
	    key: 'undef',
	    value: function undef(target) {
	      return typeof target === 'undefined';
	    }
	    /**
	     * ファイル名から拡張子を取得します
	     * @deprecated instead use Type.extension
	     * @param {string} fileName 取得したいファイル名称
	     * @returns {string} ファイル名の拡張子を返します
	     */

	  }, {
	    key: 'getExtension',
	    value: function getExtension(fileName) {
	      return Type.extension(fileName);
	    }
	    /**
	     * ファイル名から拡張子を取得します
	     * @param {string} fileName 取得したいファイル名称
	     * @returns {string} ファイル名の拡張子を返します
	     */

	  }, {
	    key: 'extension',
	    value: function extension(fileName) {
	      if (typeof fileName !== 'string') {
	        return '';
	      }
	      var splits = fileName.split('.');
	      if (splits.length === 1) {
	        return '';
	      }
	      return splits.pop().toLowerCase();
	    }
	    // ----------------------------------------------------------
	    // 画像パスが正規かチェックする
	    /**
	     * 使用可能なbase64 file かを調べます
	     * @param {string} fileName 調査対象ファイル名
	     * @returns {boolean} jpeg / png の時に true を返します
	     */

	  }, {
	    key: 'base64',
	    value: function base64(fileName) {
	      if (!Type.exist(fileName)) {
	        return false;
	      }
	      return fileName.indexOf('data:image/jpeg;base64') !== -1 || fileName.indexOf('data:image/png;base64') !== -1 || fileName.indexOf('data:image/jpg;base64') !== -1 || fileName.indexOf('data:image/gif;base64') !== -1;
	    }
	    /**
	     * 拡張子から画像ファイルかを調べます
	     * @param {string} fileName 調査対象ファイル名
	     * @returns {Boolean} 'jpg', 'png', 'jpeg', 'gif' のいづれかに該当するかの真偽値を返します
	     */

	  }, {
	    key: 'img',
	    value: function img(fileName) {
	      if (!Type.exist(fileName)) {
	        return false;
	      }
	      // base64
	      if (Type.base64(fileName)) {
	        return true;
	      }
	      // 拡張子チェック
	      return ['jpg', 'png', 'jpeg', 'gif'].indexOf(Type.extension(fileName)) !== -1;
	    }
	  }]);
	  return Type;
	}();

	exports.default = Type;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	module.exports = __webpack_require__(17).Object.keys;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(43);

	__webpack_require__(57)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	module.exports = __webpack_require__(17).Number.isInteger;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(15);

	$export($export.S, 'Number', {isInteger: __webpack_require__(61)});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(37)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(48);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(49);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2017 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2017/05/24 - 20:02
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var Carousel = function () {
	  function Carousel(element, pagers, prev, next) {
	    (0, _classCallCheck3.default)(this, Carousel);

	    this.element = element;
	    this.pagers = pagers;
	    this.prev = prev;
	    this.next = next;
	  }

	  (0, _createClass3.default)(Carousel, [{
	    key: 'start',
	    value: function start() {
	      console.log('Carousel.start', this.element);
	    }
	  }]);
	  return Carousel;
	}();

	exports.default = Carousel;

/***/ }
/******/ ]);