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
/******/ 	__webpack_require__.p = "assets/sp/js/bundle";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/09 - 18:34
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	'use strict';

	/**
	 * UT library を使い実行します
	 */

	var _SPPage = __webpack_require__(1);

	// Page class をキックします
	_SPPage.SPPage.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/09 - 18:36
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
	exports.SPPage = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _SPPageTop = __webpack_require__(37);

	var _SPNav = __webpack_require__(39);

	var _SPIndex = __webpack_require__(40);

	var _SPCategory = __webpack_require__(43);

	var _SPSingle = __webpack_require__(44);

	var _SPSearch = __webpack_require__(45);

	var _SPSignup = __webpack_require__(46);

	var _SPUserProfile = __webpack_require__(47);

	var _SPSidebar = __webpack_require__(42);

	var _SPHeader = __webpack_require__(41);

	var _SPBookmarks = __webpack_require__(48);

	var _SPActivities = __webpack_require__(49);

	var _SPNotifications = __webpack_require__(50);

	var _SPSettings = __webpack_require__(51);

	var _SPComment = __webpack_require__(52);

	var _SPSearchFrom = __webpack_require__(53);

	var _SPCommentDelete = __webpack_require__(54);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	var SPPage = exports.SPPage = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPPage(target) {
	    (0, _classCallCheck3.default)(this, SPPage);

	    if (_symbol !== target) {

	      throw new Error('SPPage is static Class. not use new SPPage().');
	    }
	  }

	  /**
	   * Page 初期化, UT.app.Router event を listen します
	   */

	  (0, _createClass3.default)(SPPage, null, [{
	    key: 'init',
	    value: function init() {

	      // user login check
	      UT.app.User.init();

	      // modal
	      _SPCommentDelete.SPCommentDelete.start();

	      // router
	      var Router = UT.app.Router;
	      var router = Router.factory();

	      // index
	      router.on(Router.INDEX, SPPage.index);
	      // category
	      router.on(Router.CATEGORY, SPPage.category);
	      // single(detail|p)
	      router.on(Router.SINGLE, SPPage.single);
	      // search
	      router.on(Router.SEARCH, SPPage.search);

	      // comment
	      router.on(Router.COMMENT, SPPage.comment);
	      router.on(Router.COMMENT_REPLY, SPPage.commentReply);

	      // 管理系
	      // signup
	      router.on(Router.SIGNUP, SPPage.signup);
	      // login
	      router.on(Router.LOGIN, SPPage.login);
	      // logout
	      router.on(Router.LOGOUT, SPPage.logout);
	      /*
	       // reset_password
	       router.on( Router.RESET_PASSWORD, SPPage.password );
	       // reset_password/resetting
	       router.on( Router.RESET_PASSWORD_RESETTING, SPPage.passwordResetting );
	       */
	      // mypage
	      router.on(Router.MYPAGE, SPPage.mypage);
	      // mypage/activities
	      router.on(Router.MYPAGE_ACTIVITIES, SPPage.activities);
	      // notifications
	      router.on(Router.NOTIFICATIONS, SPPage.notifications);
	      // settings
	      router.on(Router.SETTING, SPPage.settings);
	      // settings/interest
	      router.on(Router.SETTING_INTEREST, SPPage.interest);

	      // settings/social
	      router.on(Router.SETTING_SOCIAL, SPPage.social);

	      // settings/deactivate
	      router.on(Router.SETTING_DEACTIVATE, SPPage.deactivate);

	      router.route();
	    }
	    /**
	     * home, index page
	     */

	  }, {
	    key: 'index',
	    value: function index() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();
	      // index
	      _SPIndex.SPIndex.start();
	      // nav
	      _SPNav.SPNav.start('home');
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
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();
	      // category
	      _SPCategory.SPCategory.start(slug, type);
	      // nav
	      _SPNav.SPNav.start(slug);
	    }
	    /**
	     * single, detail page
	     * @param {Object} event Router event object
	     */

	  }, {
	    key: 'single',
	    value: function single(event) {

	      var articleId = event.id;
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();
	      // single
	      _SPSingle.SPSingle.start(articleId);
	    }
	    /**
	     * コメント詳細
	     * @param {Object} event Router event object
	     */

	  }, {
	    key: 'comment',
	    value: function comment(event) {

	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPComment.SPComment.user('comment', event.article, event.comment);
	    }
	    /**
	     * コメント返信 詳細
	     * @param {Object} event Router event object
	     */

	  }, {
	    key: 'commentReply',
	    value: function commentReply(event) {

	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPComment.SPComment.user('reply', event.article, event.comment, event.article);
	    }
	    /**
	     * 検索ページ
	     * @param {Object} event Router.SEARCH event object
	     */

	  }, {
	    key: 'search',
	    value: function search(event) {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSearch.SPSearch.start(event.keyword);
	    }
	    // ----------------------------------------------------
	    // header, footer いらない
	    /**
	     * signup page
	     */

	  }, {
	    key: 'signup',
	    value: function signup() {
	      _SPSignup.SPSignup.start();
	    }
	    /**
	     * login page
	     */

	  }, {
	    key: 'login',
	    value: function login() {
	      var loginElement = _Dom.Dom.login();
	      if (loginElement !== null) {
	        var _login = new UT.view.login.ViewLogin(loginElement);
	        _login.start();
	      }
	    }

	    /**
	     * logout
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();

	      if (UT.app.User.sign) {
	        var logoutElement = _Dom.Dom.logout();
	        if (logoutElement !== null) {
	          var _logout = new UT.view.login.ViewLogout(logoutElement);
	          _logout.start();
	        }
	      }
	    }
	    // ----------------------------------------------------
	    /*
	     PHP で output
	     static password():void {
	      }
	     static passwordResetting():void {
	      }
	     */
	    // ------------------------------
	    // my page
	    /**
	     * マイページ, index（ブックマーク一覧）
	     */

	  }, {
	    key: 'mypage',
	    value: function mypage() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();

	      if (UT.app.User.sign) {
	        // login only
	        _SPUserProfile.SPUserProfile.start();
	        _SPBookmarks.SPBookmarks.start();
	      }
	    }
	    /**
	     * マイページ / アクティビティーズ一覧
	     */

	  }, {
	    key: 'activities',
	    value: function activities() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();

	      if (UT.app.User.sign) {
	        // login only
	        _SPUserProfile.SPUserProfile.start();
	        _SPActivities.SPActivities.start();
	      }
	    }
	    /**
	     * マイページ / お知らせ一覧
	     */

	  }, {
	    key: 'notifications',
	    value: function notifications() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();
	      if (UT.app.User.sign) {
	        // login only
	        _SPUserProfile.SPUserProfile.start();
	        _SPNotifications.SPNotifications.start();
	      }
	    }
	    // ------------------------------
	    // settings 設定
	    /**
	     * 設定 基本情報設定
	     */

	  }, {
	    key: 'settings',
	    value: function settings() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();

	      if (UT.app.User.sign) {
	        // login only
	        _SPSettings.SPSettings.account();
	      }
	    }
	    /**
	     * 設定 パーソナライズ設定 興味のある競技
	     */

	  }, {
	    key: 'interest',
	    value: function interest() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();

	      if (UT.app.User.sign) {
	        // login only
	        _SPSettings.SPSettings.interest();
	      }
	    }
	    /**
	     * 設定 ソーシャル連携
	     */

	  }, {
	    key: 'social',
	    value: function social() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();
	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();
	    }
	    /**
	     * 退会
	     */

	  }, {
	    key: 'deactivate',
	    value: function deactivate() {
	      // page top
	      _SPPageTop.SPPageTop.start();
	      // search from
	      _SPSearchFrom.SPSearchFrom.start();

	      _SPSidebar.SPSidebar.start();
	      _SPHeader.SPHeader.start();

	      if (UT.app.User.sign) {
	        // login only
	        _SPSettings.SPSettings.deactivate();
	      }
	    }
	  }]);
	  return SPPage;
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
	exports.SPPageTop = undefined;

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

	var SPPageTop = exports.SPPageTop = function () {
	  /**
	   * page top に戻る motion
	   */

	  function SPPageTop() {
	    (0, _classCallCheck3.default)(this, SPPageTop);

	    this._boundComplete = this.onComplete.bind(this);
	    this._can = true;
	  }
	  /**
	   * click event を bind します
	   */

	  (0, _createClass3.default)(SPPageTop, [{
	    key: 'init',
	    value: function init() {
	      var element = _Dom.Dom.pageTop();
	      if (element !== null) {
	        element.addEventListener('click', this.onClick.bind(this), false);
	      }
	    }
	    /**
	     * element click event handler
	     * @param {Event} event native event, click event
	     */

	  }, {
	    key: 'onClick',
	    value: function onClick(event) {
	      event.preventDefault();

	      // click 不可のときは処理しない
	      if (!this._can) {
	        return;
	      }

	      var complete = this._boundComplete;
	      this._can = false;

	      // scrolling
	      TweenLite.to(window, 0.5, {
	        scrollTo: {
	          y: 0,
	          autoKill: false
	        },
	        // easing
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
	    /**
	     * PageTop instance を作成し開始する
	     */

	  }], [{
	    key: 'start',
	    value: function start() {
	      var pageTop = new SPPageTop();
	      pageTop.init();
	    }
	  }]);
	  return SPPageTop;
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
	        console.warn('element by ' + id + ' not found.');
	        return null;
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
	    /**
	     * header search from
	     * @return {Element} head-search-container element を返します
	     */

	  }, {
	    key: 'search',
	    value: function search() {
	      return Dom.get('head-search-container');
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

	    // --------------------------------------
	    /**
	     * signup 新規登録
	     * @return {Element} signup-container を返します
	     */

	  }, {
	    key: 'signup',
	    value: function signup() {
	      return Dom.get('signup-container');
	    }
	    /**
	     * login form
	     * @return {Element} login-form-container を返します
	     */

	  }, {
	    key: 'login',
	    value: function login() {
	      return Dom.get('login-form-container');
	    }
	    /**
	     * logout form
	     * @return {Element} logout-form-container を返します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      return Dom.get('logout-form-container');
	    }
	    /**
	     * パスワードをリセットする メール入力
	     * @return {Element} reset_password-container
	     */

	  }, {
	    key: 'password',
	    value: function password() {
	      return Dom.get('reset_password-container');
	    }
	    /**
	     * パスワードをリセットする パスワード入力
	     * @return {Element} reset_password-container
	     */

	  }, {
	    key: 'passwordResetting',
	    value: function passwordResetting() {
	      return Dom.get('reset_password-resetting-container');
	    }
	    /**
	     * modal
	     * @return {Element} modal-container
	     */

	  }, {
	    key: 'modal',
	    value: function modal() {
	      return Dom.get('modal-container');
	    }

	    // --------------------------------------
	    // mypage
	    /**
	     * mypage ユーザー情報
	     * @return {Element} mypage-profile-container
	     */

	  }, {
	    key: 'userProfile',
	    value: function userProfile() {
	      return Dom.get('mypage-profile-container');
	    }

	    // --------------------------------------
	    // nav
	    /**
	     * main nav, category slug を設定するために
	     * @return {Element} global-nav-container
	     */

	  }, {
	    key: 'nav',
	    value: function nav() {
	      return Dom.get('global-nav-container');
	    }

	    // --------------------------------------
	    // settings
	    /**
	     * 設定 form container
	     * @return {Element} setting-form-container
	     */

	  }, {
	    key: 'settings',
	    value: function settings() {
	      return Dom.get('setting-form-container');
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
	 * @date 2016/02/29 - 23:08
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
	exports.SPNav = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	var Sagen = self.Sagen;

	/**
	 * メインメニューにかテゴリースラッグを追加
	 */

	var SPNav = exports.SPNav = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPNav(target) {
	    (0, _classCallCheck3.default)(this, SPNav);

	    if (_symbol !== target) {

	      throw new Error('SPNav is static Class. not use new SPNav().');
	    }
	  }
	  /**
	   * global menu へ slug を css class として挿入
	   * @param {string} slug category slug
	   */

	  (0, _createClass3.default)(SPNav, null, [{
	    key: 'start',
	    value: function start() {
	      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

	      var nav = _Dom.Dom.nav();
	      if (nav !== null && slug !== null && typeof slug !== 'undefined') {
	        Sagen.Dom.addClass(nav, slug);
	      }
	    }
	  }]);
	  return SPNav;
	}();

/***/ },
/* 40 */
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
	exports.SPIndex = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _SPHeader = __webpack_require__(41);

	var _SPSidebar = __webpack_require__(42);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	/**
	 * <h3>Home(index)</h3>
	 * 全て static です
	 */

	var SPIndex = exports.SPIndex = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPIndex(target) {
	    (0, _classCallCheck3.default)(this, SPIndex);

	    if (_symbol !== target) {

	      throw new Error('SPIndex is static Class. not use new SPIndex().');
	    }
	  }
	  /**
	   * home rendering 開始
	   */

	  (0, _createClass3.default)(SPIndex, null, [{
	    key: 'start',
	    value: function start() {

	      // header
	      _SPHeader.SPHeader.start();

	      /*
	      sp pickup なし
	      // ---------------------------------------------------------
	      // pickup
	      let pickupElement = Dom.pickup();
	      if ( pickupElement !== null ) {
	        let pickup = new UT.view.home.ViewPickup( pickupElement );
	        pickup.start();
	      }
	      */

	      // ---------------------------------------------------------
	      // headline
	      var headlineElement = _Dom.Dom.headline();
	      if (headlineElement !== null) {
	        var headline = new UT.sp.view.home.SPViewHeadLine(headlineElement);
	        headline.start();
	      }

	      // ---------------------------------------------------------
	      // news
	      var boardElement = _Dom.Dom.board();
	      var moreElement = _Dom.Dom.boardMore();
	      if (boardElement !== null && moreElement !== null) {
	        var archive = new UT.sp.view.home.SPViewNews(boardElement, moreElement);
	        archive.start();
	      }

	      // sidebar, slug なし(=all)
	      _SPSidebar.SPSidebar.start();
	    }
	  }]);
	  return SPIndex;
	}();

/***/ },
/* 41 */
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
	exports.SPHeader = undefined;

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

	var SPHeader = exports.SPHeader = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPHeader(target) {
	    (0, _classCallCheck3.default)(this, SPHeader);

	    if (_symbol !== target) {

	      throw new Error('SPHeader is static Class. not use new SPHeader().');
	    }
	  }
	  /**
	   * header rendering 開始
	   */

	  (0, _createClass3.default)(SPHeader, null, [{
	    key: 'start',
	    value: function start() {
	      // header.user
	      var element = _Dom.Dom.profile();
	      if (element !== null) {
	        var headerUser = new UT.view.header.ViewHeaderUser(element);
	        headerUser.start();

	        var modalElement = _Dom.Dom.modal();
	        if (modalElement !== null) {
	          var modal = new UT.view.modal.ViewLogoutModal(modalElement);
	          modal.start();
	        }
	      }
	    }
	  }]);
	  return SPHeader;
	}();

/***/ },
/* 42 */
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
	exports.SPSidebar = undefined;

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

	var SPSidebar = exports.SPSidebar = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPSidebar(target) {
	    (0, _classCallCheck3.default)(this, SPSidebar);

	    if (_symbol !== target) {

	      throw new Error('SPSidebar is static Class. not use new SPSidebar().');
	    }
	  }
	  /**
	   * sidebar ranking / video rendering 開始
	   * @param {string} [slug=all] category slug
	   */

	  (0, _createClass3.default)(SPSidebar, null, [{
	    key: 'start',
	    value: function start() {
	      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

	      // ranking
	      var rankingElement = _Dom.Dom.ranking();
	      if (rankingElement !== null) {
	        var ranking = new UT.view.sidebar.ViewRanking(rankingElement, null, slug);
	        ranking.start();
	      }

	      // video
	      var videoElement = _Dom.Dom.video();
	      if (videoElement !== null) {
	        var videos = new UT.view.sidebar.ViewVideos(videoElement, null, slug);
	        videos.start();
	      }
	    }
	  }]);
	  return SPSidebar;
	}();

/***/ },
/* 43 */
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
	exports.SPCategory = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _SPHeader = __webpack_require__(41);

	var _SPSidebar = __webpack_require__(42);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	/**
	 * <h3>category 一覧</h3>
	 * 全て static です
	 */

	var SPCategory = exports.SPCategory = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPCategory(target) {
	    (0, _classCallCheck3.default)(this, SPCategory);

	    if (_symbol !== target) {

	      throw new Error('SPCategory is static Class. not use new SPCategory().');
	    }
	  }
	  /**
	   * rendering 開始
	   * @param {string} slug category slug
	   * @param {string} [type=''] ranking | video \ '' の 3つ
	   */

	  (0, _createClass3.default)(SPCategory, null, [{
	    key: 'start',
	    value: function start(slug) {
	      var type = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	      // header
	      _SPHeader.SPHeader.start();

	      var element = _Dom.Dom.board();
	      var elementMore = _Dom.Dom.boardMore();

	      if (element !== null && elementMore !== null) {

	        // list
	        var archive = new UT.view.ViewCategory(slug, element, elementMore);
	        archive.start();

	        // sidebar
	        _SPSidebar.SPSidebar.start(slug);

	        // title
	        // console.log( 'type', slug, type );
	      }
	    }
	  }]);
	  return SPCategory;
	}();

/***/ },
/* 44 */
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
	exports.SPSingle = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _SPSidebar = __webpack_require__(42);

	var _Dom = __webpack_require__(38);

	var _SPNav = __webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT

	// ui
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

	var SPSingle = exports.SPSingle = function () {
	  /**
	   * 記事詳細 singleton class です
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPSingle(target) {
	    (0, _classCallCheck3.default)(this, SPSingle);

	    if (_symbol !== target) {

	      throw new Error('SPSingle is static Class. not use new SPSingle().');
	    }
	  }
	  /**
	   * 記事詳細, 上部 / 下部 rendering 開始
	   * @param {Number} articleId 記事 Id (:article_id)
	   */

	  (0, _createClass3.default)(SPSingle, null, [{
	    key: 'start',
	    value: function start(articleId) {

	      // header
	      // header.user
	      var profileElement = _Dom.Dom.profile();
	      var headerUser = undefined;
	      if (profileElement !== null) {
	        headerUser = new UT.view.header.ViewHeaderUser(profileElement);
	        if (UT.app.User.sign) {

	          // login user はコメント投稿可能 -> 表示アイコン必要
	          _headerUser = headerUser;
	          headerUser.on(UT.view.View.BEFORE_RENDER, SPSingle.onHeader);
	        } else {

	          // 非ログインユーザーはアイコン取得いらない
	          ++_prepared;
	        }
	        headerUser.start();

	        var modalElement = _Dom.Dom.modal();
	        if (modalElement !== null) {
	          var modal = new UT.view.modal.ViewLogoutModal(modalElement);
	          modal.start();
	        }
	      }

	      // single page
	      // related いらなくる予定
	      var elements = {
	        related: _Dom.Dom.related(),
	        footer: _Dom.Dom.singleFooter()
	      };

	      var singleHeaderElement = _Dom.Dom.singleHeader();

	      if (singleHeaderElement !== null && elements.footer !== null) {
	        var single = new UT.view.ViewSingle(articleId, singleHeaderElement, elements);
	        _viewSingle = single;
	        single.on(UT.view.View.BEFORE_RENDER, SPSingle.before);
	        single.start();
	      }
	    }
	    /**
	     * header View.BEFORE_RENDER event handler
	     * <p>ユーザー: アイコン, Id 取得のために event を bind し情報を取得します</p>
	     * @param {Object} event event object
	     */

	  }, {
	    key: 'onHeader',
	    value: function onHeader(event) {
	      _headerUser.off(UT.view.View.BEFORE_RENDER, SPSingle.onHeader);
	      _userDae = event.args[0];
	      SPSingle.comment();
	    }
	    /**
	     * single View.BEFORE_RENDER event handler
	     * <p>記事所属カテゴリ取得のために event を bind</p>
	     * @param {Object} event event object
	     */

	  }, {
	    key: 'before',
	    value: function before(event) {

	      _viewSingle.off(UT.view.View.BEFORE_RENDER, SPSingle.before);

	      var single = event.args[0];
	      _singleDae = single;

	      var slug = single.category.slug;
	      // let label = single.category.label;

	      // title は backend output

	      // sidebar
	      _SPSidebar.SPSidebar.start(slug);

	      // nav current
	      _SPNav.SPNav.start(slug);

	      SPSingle.comment();
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
	      var commentFormElement = _Dom.Dom.commentForm();
	      if (commentFormElement !== null) {
	        var commentForm = new UT.view.comment.ViewCommentForm(commentFormElement, articleId, picture);
	        commentForm.start();
	      }

	      // self
	      var selfElement = _Dom.Dom.commentSelf();
	      if (selfElement !== null) {
	        var commentSelf = new ViewComments(articleId, selfElement, UT.app.const.CommentsType.SELF);
	        if (_userDae !== null) {
	          commentSelf.user = _userDae;
	        }
	        commentSelf.start();
	      }

	      // official
	      var officialElement = _Dom.Dom.commentOfficial();
	      if (officialElement !== null) {
	        var official = new ViewComments(articleId, officialElement, UT.app.const.CommentsType.OFFICIAL);
	        if (_userDae !== null) {
	          official.user = _userDae;
	        }
	        official.start();
	      }

	      // normal
	      var normalElement = _Dom.Dom.commentNormal();
	      if (normalElement !== null) {
	        var normal = new ViewComments(articleId, normalElement, UT.app.const.CommentsType.NORMAL);
	        if (_userDae !== null) {
	          normal.user = _userDae;
	        }
	        normal.start();
	      }
	    }
	  }]);
	  return SPSingle;
	}();

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/18 - 15:42
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
	exports.SPSearch = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _SPHeader = __webpack_require__(41);

	var _SPSidebar = __webpack_require__(42);

	var _Dom = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT
	var UT = self.UT;

	var SPSearch = exports.SPSearch = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPSearch(target) {
	    (0, _classCallCheck3.default)(this, SPSearch);

	    if (_symbol !== target) {

	      throw new Error('SPSearch is static Class. not use new SPSearch().');
	    }
	  }
	  /**
	   * 検索ページ rendering 開始
	   * @param {string} keyword 検索キーワード
	   */

	  (0, _createClass3.default)(SPSearch, null, [{
	    key: 'start',
	    value: function start(keyword) {

	      // header
	      _SPHeader.SPHeader.start();

	      // list
	      // 検索キーワードで page 取得
	      // 結果セットを使い sidebar を rendering
	      var boardElement = _Dom.Dom.board();
	      var moreElement = _Dom.Dom.boardMore();
	      if (boardElement !== null && moreElement !== null) {
	        var search = new UT.view.ViewSearch(keyword, boardElement, moreElement);
	        search.start();
	      }

	      // 検索結果が同じカテゴリーとは限らないので all で表示します
	      _SPSidebar.SPSidebar.start();
	    }
	  }]);
	  return SPSearch;
	}();

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/20 - 15:49
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
	exports.SPSignup = undefined;

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
	 * <h3>signup wizard</h3>
	 * 全て static です
	 */

	var SPSignup = exports.SPSignup = function () {
	  /**
	   * signup wizard (3 step) singleton class です
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPSignup(target) {
	    (0, _classCallCheck3.default)(this, SPSignup);

	    if (_symbol !== target) {

	      throw new Error('SPSignup is static Class. not use new SPSignup().');
	    }
	  }
	  /**
	   * rendering 開始
	   */

	  (0, _createClass3.default)(SPSignup, null, [{
	    key: 'start',
	    value: function start() {
	      var signupElement = _Dom.Dom.signup();
	      if (signupElement !== null) {
	        var signup = new UT.view.signup.SignupWizard(signupElement);
	        signup.start();
	      }
	    }
	  }]);
	  return SPSignup;
	}();

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/29 - 15:10
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
	exports.SPUserProfile = undefined;

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

	var SPUserProfile = exports.SPUserProfile = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPUserProfile(target) {
	    (0, _classCallCheck3.default)(this, SPUserProfile);

	    if (_symbol !== target) {

	      throw new Error('SPUserProfile is static Class. not use new SPUserProfile().');
	    }
	  }
	  /**
	   * rendering 開始
	   */

	  (0, _createClass3.default)(SPUserProfile, null, [{
	    key: 'start',
	    value: function start() {
	      var element = _Dom.Dom.userProfile();
	      if (element !== null) {
	        var profile = new UT.view.mypage.ViewUserProfile(element);
	        profile.start();
	      }
	    }
	  }]);
	  return SPUserProfile;
	}();

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/29 - 15:46
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
	exports.SPBookmarks = undefined;

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
	 * ブックマーク一覧
	 */

	var SPBookmarks = exports.SPBookmarks = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPBookmarks(target) {
	    (0, _classCallCheck3.default)(this, SPBookmarks);

	    if (_symbol !== target) {

	      throw new Error('SPBookmarks is static Class. not use new SPBookmarks().');
	    }
	  }
	  /**
	   * rendering 開始
	   */

	  (0, _createClass3.default)(SPBookmarks, null, [{
	    key: 'start',
	    value: function start() {
	      var element = _Dom.Dom.board();
	      var elementMore = _Dom.Dom.boardMore();
	      if (element !== null && elementMore !== null) {
	        // list
	        var archive = new UT.view.mypage.ViewBookmarks(element, elementMore);
	        archive.start();
	      }
	    }
	  }]);
	  return SPBookmarks;
	}();

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/29 - 15:46
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
	exports.SPActivities = undefined;

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
	 * アクティビティーズ
	 */

	var SPActivities = exports.SPActivities = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPActivities(target) {
	    (0, _classCallCheck3.default)(this, SPActivities);

	    if (_symbol !== target) {

	      throw new Error('SPActivities is static Class. not use new SPActivities().');
	    }
	  }
	  /**
	   * rendering 開始
	   */

	  (0, _createClass3.default)(SPActivities, null, [{
	    key: 'start',
	    value: function start() {
	      var element = _Dom.Dom.board();
	      var elementMore = _Dom.Dom.boardMore();
	      if (element !== null && elementMore !== null) {
	        // list
	        var archive = new UT.view.mypage.ViewActivities(element, elementMore);
	        archive.start();
	      }
	    }
	  }]);
	  return SPActivities;
	}();

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/29 - 15:46
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
	exports.SPNotifications = undefined;

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
	 * お知らせ
	 */

	var SPNotifications = exports.SPNotifications = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPNotifications(target) {
	    (0, _classCallCheck3.default)(this, SPNotifications);

	    if (_symbol !== target) {

	      throw new Error('SPNotifications is static Class. not use new SPNotifications().');
	    }
	  }
	  /**
	   * rendering 開始
	   */

	  (0, _createClass3.default)(SPNotifications, null, [{
	    key: 'start',
	    value: function start() {
	      var element = _Dom.Dom.board();
	      var elementMore = _Dom.Dom.boardMore();

	      if (element !== null && elementMore !== null) {
	        // list
	        var archive = new UT.view.mypage.ViewNotifications(element, elementMore);
	        archive.start();
	      }
	    }
	  }]);
	  return SPNotifications;
	}();

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SPSettings = undefined;

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
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/01 - 22:25
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var UT = self.UT;

	var SPSettings = exports.SPSettings = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPSettings(target) {
	    (0, _classCallCheck3.default)(this, SPSettings);

	    if (_symbol !== target) {

	      throw new Error('SPSettings is static Class. not use new SPSettings().');
	    }
	  }
	  /**
	   * 基本情報設定
	   */

	  (0, _createClass3.default)(SPSettings, null, [{
	    key: 'account',
	    value: function account() {
	      var settings = _Dom.Dom.settings();

	      if (settings !== null) {
	        var setting = new UT.view.settings.ViewSettingsIndex(settings);
	        setting.start();
	      }
	    }
	    /**
	     * パーソナライズ設定
	     */

	  }, {
	    key: 'interest',
	    value: function interest() {
	      var settings = _Dom.Dom.settings();

	      if (settings !== null) {
	        var setting = new UT.view.settings.ViewSettingsInterest(settings);
	        setting.start();
	      }
	    }
	    /**
	     * 退会
	     */

	  }, {
	    key: 'deactivate',
	    value: function deactivate() {
	      var settings = _Dom.Dom.settings();
	      var modal = _Dom.Dom.modal();
	      if (settings !== null && modal !== null) {
	        var _deactivate = new UT.view.signup.ViewDeactivate(settings, modal);
	        _deactivate.start();
	      }
	    }
	  }]);
	  return SPSettings;
	}();

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/04 - 22:47
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
	exports.SPComment = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(3);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _symbol2 = __webpack_require__(7);

	var _symbol3 = _interopRequireDefault(_symbol2);

	var _SPSidebar = __webpack_require__(42);

	var _Dom = __webpack_require__(38);

	var _SPNav = __webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _symbol = (0, _symbol3.default)();

	// UT

	// ui
	var UT = self.UT;

	/**
	 * <h3>Comment 詳細</h3>
	 * 全て static です
	 */

	var SPComment = exports.SPComment = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPComment(target) {
	    (0, _classCallCheck3.default)(this, SPComment);

	    if (_symbol !== target) {

	      throw new Error('SPComment is static Class. not use new SPComment().');
	    }
	  }

	  (0, _createClass3.default)(SPComment, null, [{
	    key: 'user',
	    value: function user(mode, articleId, commentId) {
	      var replyId = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	      // header.user
	      var profileElement = _Dom.Dom.profile();
	      var headerUser = undefined;
	      var userDae = undefined;

	      var onHeader = function onHeader(event) {
	        headerUser.off(UT.view.View.BEFORE_RENDER, onHeader);
	        userDae = event.args[0];

	        switch (mode) {
	          case 'reply':
	            SPComment.reply(userDae, articleId, commentId, replyId);
	            break;

	          case 'comment':
	          default:
	            SPComment.comment(userDae, articleId, commentId);
	            break;

	        }
	      };

	      if (profileElement !== null) {
	        headerUser = new UT.view.header.ViewHeaderUser(profileElement);

	        if (UT.app.User.sign) {
	          headerUser.on(UT.view.View.BEFORE_RENDER, onHeader);
	        } else {
	          // not sign in
	          switch (mode) {
	            case 'reply':
	              SPComment.reply(null, articleId, commentId, replyId);
	              break;

	            case 'comment':
	            default:
	              SPComment.comment(null, articleId, commentId);
	              break;

	          }
	        }

	        headerUser.start();

	        var modalElement = _Dom.Dom.modal();
	        if (modalElement !== null) {
	          var modal = new UT.view.modal.ViewLogoutModal(modalElement);
	          modal.start();
	        }
	      }

	      Comment.single(articleId);
	    }
	    /**
	     * コメント 詳細
	     * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
	     * @param {Number} articleId 記事 ID :article_id
	     * @param {Number} commentId コメント ID
	     */

	  }, {
	    key: 'comment',
	    value: function comment(userDae, articleId, commentId) {
	      var commentNormal = _Dom.Dom.commentNormal();

	      // comment 詳細
	      if (commentNormal !== null) {
	        var _comment = new UT.view.ViewCommentSingle(articleId, commentId, commentNormal);
	        _comment.user = userDae;
	        _comment.start();
	      }
	    }
	    /**
	     * コメント返信 詳細
	     * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
	     * @param {Number} articleId 記事 ID :article_id
	     * @param {Number} commentId コメント ID
	     * @param {Number} replyId コメント返信 ID
	     */

	  }, {
	    key: 'reply',
	    value: function reply(userDae, articleId, commentId, replyId) {
	      var commentNormal = _Dom.Dom.commentNormal();

	      // comment 詳細
	      if (commentNormal !== null) {
	        var comment = new UT.view.ViewCommentSingle(articleId, commentId, commentNormal, replyId);
	        comment.user = userDae;
	        comment.start();
	      }
	    }
	    /**
	     * 記事タイトル
	     * @param {Number} articleId 記事 ID
	     */

	  }, {
	    key: 'single',
	    value: function single(articleId) {
	      var headerElement = _Dom.Dom.singleHeader();
	      var title = undefined;

	      var beforeRender = function beforeRender(event) {
	        title.off(UT.view.View.BEFORE_RENDER, beforeRender);
	        var single = event.args[0];
	        var slug = single.category.slug;
	        // sidebar
	        _SPSidebar.SPSidebar.start(slug);

	        // nav current
	        _SPNav.SPNav.start(slug);
	      };

	      if (headerElement !== null) {
	        title = new UT.view.single.ViewSingleTitle(articleId, headerElement);
	        title.on(UT.view.View.BEFORE_RENDER, beforeRender);
	        title.start();
	      }
	    }
	  }]);
	  return SPComment;
	}();

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/18 - 15:22
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
	exports.SPSearchFrom = undefined;

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

	var SPSearchFrom = exports.SPSearchFrom = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPSearchFrom(target) {
	    (0, _classCallCheck3.default)(this, SPSearchFrom);

	    if (_symbol !== target) {

	      throw new Error('SPSearchFrom is static Class. not use new SPSearchFrom().');
	    }
	  }
	  /**
	   * search form rendering 開始
	   */

	  (0, _createClass3.default)(SPSearchFrom, null, [{
	    key: 'start',
	    value: function start() {
	      // header.user
	      var searchElement = _Dom.Dom.search();
	      if (searchElement !== null) {
	        var searchFrom = new UT.view.header.ViewHeaderSearch(searchElement);
	        searchFrom.start();
	      }
	    }
	  }]);
	  return SPSearchFrom;
	}();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/25 - 22:54
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
	exports.SPCommentDelete = undefined;

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
	 * コメント削除モーダル
	 */

	var SPCommentDelete = exports.SPCommentDelete = function () {
	  /**
	   * static class です, instance を作成しません
	   * @param {Symbol} target Singleton を実現するための private symbol
	   */

	  function SPCommentDelete(target) {
	    (0, _classCallCheck3.default)(this, SPCommentDelete);

	    if (_symbol !== target) {

	      throw new Error('SPCommentDelete is static Class. not use new SPCommentDelete().');
	    }
	  }
	  /**
	   * comment delete confirm modal 準備
	   */

	  (0, _createClass3.default)(SPCommentDelete, null, [{
	    key: 'start',
	    value: function start() {
	      var element = _Dom.Dom.modal();
	      if (element !== null) {
	        var commentDelete = new UT.view.modal.ViewDeleteModal(element);
	        commentDelete.start();
	      }
	    }
	  }]);
	  return SPCommentDelete;
	}();

/***/ }
/******/ ]);