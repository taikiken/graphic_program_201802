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
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * Copyright (c) 2011-2018 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2018/04/19 - 12:41
	 * buildTime: 2018-4-20 16:19:15
	 * @license MIT
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 * @requires React, Sagen.js. es5-promise
	 */
	'use strict';

	var _vk = __webpack_require__(1);

	var _vk2 = _interopRequireDefault(_vk);

	var _VK = __webpack_require__(164);

	var _VK2 = _interopRequireDefault(_VK);

	var _Url = __webpack_require__(105);

	var _User = __webpack_require__(109);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// -----------------------------------------------
	// VK 用の header 機能を提供します
	// -----------------------------------------------

	var device = function device(Sagen) {
	  // execute
	  if (Sagen.Browser.Mobile.is()) {
	    _vk2.default.mobile();
	  } else {
	    _vk2.default.desktop();
	  }
	};

	var user = function user() {
	  // login check
	  _User.User.init();
	};

	var sagen = function sagen(Sagen, selector) {
	  Sagen.start(selector);
	  Sagen.Device.init();
	};

	var init = function init(selector) {
	  var script = document.getElementById(selector);
	  if (!script) {
	    return false;
	  }
	  // ---
	  var domain = script.dataset.domain || '';
	  var prefix = script.dataset.prefix || '';
	  _Url.Url.host = domain;
	  _VK2.default.prefix = prefix;
	  return true;
	};

	/**
	 * VK - header 対応
	 * - `script#SPBL_header` 必須 - 引数 `selector` での対応も可能
	 * - script[data-domain] - option, default: '', リクエスト絶対パス使用
	 * - script[data-prefix] - option, default: '', css className prefix
	 * @param {string} [selector=SPBL_header] script tag ID
	 */
	var main = function main() {
	  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SPBL_header';

	  if (!init(selector)) {
	    return;
	  }
	  var Sagen = self.Sagen;
	  sagen(Sagen, selector);
	  user();
	  device(Sagen);
	};

	main();

	/**
	 * global 出力セット
	 * @type {{build: string, main: main}}
	 */
	var SPBL_VK = {
	  build: '2018-4-20 16:19:15',
	  main: main
	};

	self.SPBL_VK = SPBL_VK;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _exe = __webpack_require__(2);

	var _exe2 = _interopRequireDefault(_exe);

	var _exe3 = __webpack_require__(145);

	var _exe4 = _interopRequireDefault(_exe3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2018 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2018/04/19 - 14:54
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var vk = {
	  desktop: _exe2.default,
	  mobile: _exe4.default
	};

	exports.default = vk;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Dom = __webpack_require__(3);

	var _Dom2 = _interopRequireDefault(_Dom);

	var _ViewHeaderSearch = __webpack_require__(84);

	var _ViewHeaderSearch2 = _interopRequireDefault(_ViewHeaderSearch);

	var _ViewHeaderUser = __webpack_require__(107);

	var _ViewHeaderUser2 = _interopRequireDefault(_ViewHeaderUser);

	var _PageTop = __webpack_require__(141);

	var _PageTop2 = _interopRequireDefault(_PageTop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// VK desktop 実行ファイル

	/**
	 * 検索フォーム
	 */

	// import ViewDeleteModal from '../../view/modal/ViewDeleteModal';
	// import ViewFlushModal from '../../view/modal/ViewFlushModal';
	/**
	 * Copyright (c) 2011-2018 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2018/04/19 - 12:48
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	var search = function search() {
	  var element = _Dom2.default.search();
	  if (element) {
	    // vk flag: true でリクエストする
	    var view = new _ViewHeaderSearch2.default(element, {}, true);
	    view.start();
	  }
	};

	// ログインユーザー表示無しなので何もしない
	// /**
	//  * ログインユーザーのログアウトモーダル
	//  */
	// const modalLogout = () => {
	//   const element = Dom.logoutModal();
	//   if (element) {
	//     const view = new ViewLogoutModal(element, null, null, true);
	//     view.start();
	//   }
	// };

	/**
	 * ユーザーインフォメーション
	 */

	// import ViewLogoutModal from '../../view/modal/ViewLogoutModal';
	var header = function header() {
	  var element = _Dom2.default.profile();
	  if (element) {
	    var view = new _ViewHeaderUser2.default(element, {}, true);
	    view.start();
	    // modal
	    // modalLogout();
	  }
	};

	// /**
	//  * コメント削除モーダル
	//  */
	// const modalDelete = () => {
	//   const element = Dom.modal();
	//   if (element) {
	//     // vk flag: true でリクエストする
	//     const view = new ViewDeleteModal(element, {}, true);
	//     view.start();
	//   }
	// };

	// API 叩かないので flush modal いらない
	// /**
	//  * 実行後の flush modal
	//  */
	// const modalFlush = () => {
	//   const element = Dom.flushModal();
	//   if (element) {
	//     const view = new ViewFlushModal(element, {}, true);
	//     view.start();
	//   }
	// };

	/**
	 * vk - desktop 実行します
	 */
	var desktop = function desktop() {
	  // page top
	  var pageTop = new _PageTop2.default();
	  pageTop.init();
	  // modal 準備
	  // modalDelete();
	  // modalFlush();
	  // header - user
	  header();
	  // 検索フォーム
	  search();
	};

	exports.default = desktop;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// const _symbol = Symbol('Dom');

	/**
	 * React Dom を insert する起点 element を取得します
	 * - `document.getElementById` で element を取得します
	 * - 全て static です
	 */
	var Dom = function () {
	  function Dom() {
	    (0, _classCallCheck3.default)(this, Dom);
	  }

	  (0, _createClass3.default)(Dom, null, [{
	    key: 'get',

	    // /**
	    //  * <p>PC / SP 共通です<br>
	    //  * static class です, instance を作成しません</p>
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Dom is static Class. not use new Dom().' );
	    //
	    //   }
	    // }
	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * 引数 id を使用し document.getElementById を行い element を取得します, 取得できない時は null を返します
	     * @param {string} id 取得 element id
	     * @return {?Element} id から取得した element を返します
	     */
	    value: function get(id) {
	      var element = document.getElementById(id);
	      if (!_Safety.Safety.isElement(element)) {
	        // console.warn( `element by ${id} not found.` );
	        return null;
	      }
	      return element;
	    }
	    /**
	     * **PC**
	     * - body > .whole を取得します
	     * - body > div#whole Element
	     * @return {?Element} whole element を返します
	     */

	  }, {
	    key: 'whole',
	    value: function whole() {
	      return Dom.get('whole');
	    }
	    /**
	     * body > .whole を取得します
	     * - SP -> #page
	     * - PC -> #whole
	     * body > div#page Element
	     * @return {?Element} whole element を返します
	     */

	  }, {
	    key: 'page',
	    value: function page() {
	      return Dom.get('page');
	    }
	    /**
	     * div#js-page_top - for sp
	     * @returns {?Element} div#js-page_top - for sp
	     * @since 2017-10-23
	     */

	  }, {
	    key: 'jsPageTop',
	    value: function jsPageTop() {
	      return Dom.get('js-page_top');
	    }
	    /**
	     * pageTop container
	     * - 2017-08-24 - `#js-page_top` を使用しているページに対応するため取得 ID を増やす
	     * - `pageTop`
	     * @return {?Element} pageTop element を返します
	     */

	  }, {
	    key: 'pageTop',
	    value: function pageTop() {
	      // return Dom.get('pageTop') || Dom.get('js-page_top');
	      return Dom.get('pageTop') || Dom.jsPageTop();
	    }
	    // --------------------------------------
	    // header
	    /**
	     * main header コンテンツ上部
	     * @return {?Element} header-container element を返します
	     */

	  }, {
	    key: 'header',
	    value: function header() {
	      return Dom.get('header-container');
	    }
	    /**
	     * header user profile
	     * @return {?Element} 'user-profile-container' element を返します
	     */

	  }, {
	    key: 'profile',
	    value: function profile() {
	      return Dom.get('user-profile-container');
	    }
	    /**
	     * header search from
	     * @return {?Element} head-search-container element を返します
	     */

	  }, {
	    key: 'search',
	    value: function search() {
	      return Dom.get('head-search-container');
	    }
	    /**
	     * header search from opener
	     * @return {?Element} search-container-opener element を返します
	     */

	  }, {
	    key: 'searchOpener',
	    value: function searchOpener() {
	      return Dom.get('search-container-opener');
	    }
	    // --------------------------------------
	    // footer
	    /**
	     * hooter
	     * @return {?Element} footer-container element を返します
	     */

	  }, {
	    key: 'footer',
	    value: function footer() {
	      return Dom.get('footer-container');
	    }
	    // --------------------------------------
	    // synapse
	    /**
	     * synapse 切り替えメニュー
	     * @return {?Element} side-menu-service element を返します
	     */

	  }, {
	    key: 'service',
	    value: function service() {
	      return Dom.get('side-menu-service');
	    }
	    /**
	     * side メニュー
	     * @return {?Element} side-menu-container element を返します
	     */

	  }, {
	    key: 'serviceMenu',
	    value: function serviceMenu() {
	      return Dom.get('side-menu-container');
	    }
	    /**
	     * side メニュー open / close button
	     * @return {?Element} menu-opener element を返します
	     */

	  }, {
	    key: 'serviceOpener',
	    value: function serviceOpener() {
	      return Dom.get('menu-opener');
	    }

	    // --------------------------------------
	    // sidebar
	    /**
	     * sidebar ranking
	     * @return {?Element} widget-ranking-container element を返します
	     */

	  }, {
	    key: 'ranking',
	    value: function ranking() {
	      return Dom.get('widget-ranking-container');
	    }
	    /**
	     * sidebar video
	     * @return {?Element} widget-recommend-container element を返します
	     */

	  }, {
	    key: 'video',
	    value: function video() {
	      return Dom.get('widget-recommend-container');
	    }
	    /**
	     * sidebar ranking2
	     * @return {?Element} widget-ranking-container-2 element を返します
	     */

	  }, {
	    key: 'ranking2',
	    value: function ranking2() {
	      return Dom.get('widget-ranking-container-2');
	    }
	    /**
	     * sidebar video2
	     * @return {?Element} widget-recommend-container-2 element を返します
	     */

	  }, {
	    key: 'video2',
	    value: function video2() {
	      return Dom.get('widget-recommend-container-2');
	    }
	    /**
	     * sidebar scroll 追随させるコンテナ
	     * @return {?Element} sidebar-moving-container element を返します
	     */

	  }, {
	    key: 'sidebar',
	    value: function sidebar() {
	      return Dom.get('sidebar-moving-container');
	    }
	    /**
	     * sidebar recommend
	     * @since 2016-06-29
	     * @return {?Element} widget-recommend-list-container element を返します
	     */

	  }, {
	    key: 'recommend',
	    value: function recommend() {
	      return Dom.get('widget-recommend-list-container');
	    }
	    // --------------------------------------

	    // home
	    /**
	     * home slide show(pickup)
	     * @return {?Element} pickup-container を返します
	     */

	  }, {
	    key: 'pickup',
	    value: function pickup() {
	      return Dom.get('pickup-container');
	    }
	    /**
	     * home headline 注目の記事
	     * @return {?Element} headline-container を返します
	     */

	  }, {
	    key: 'headline',
	    value: function headline() {
	      return Dom.get('headline-container');
	    }
	    /**
	     * home headline - last （大きく表示させる）
	     * @returns {?Element} `div#js-headline-last-container` home headline - last
	     * @since 2017-12-18
	     */

	  }, {
	    key: 'headlineLast',
	    value: function headlineLast() {
	      return Dom.get('js-headline-last-container');
	    }
	    /**
	     * category headline 「注目の記事」
	     * @return {?Element} div#js-headline を返します
	     */

	  }, {
	    key: 'headlineParent',
	    value: function headlineParent() {
	      return Dom.get('js-headline');
	    }
	    // archive / category
	    /**
	     * category container
	     * @return {?Element} category-container を返します
	     */

	  }, {
	    key: 'category',
	    value: function category() {
	      return Dom.get('category-container');
	    }
	    /**
	     * archive container
	     * @return {?Element} board-container を返します
	     */

	  }, {
	    key: 'board',
	    value: function board() {
	      return Dom.get('board-container');
	    }
	    /**
	     * archive container: more button
	     * @return {?Element} board-container-more を返します
	     */

	  }, {
	    key: 'boardMore',
	    value: function boardMore() {
	      return Dom.get('board-container-more');
	    }

	    // --------------------------------------
	    // single
	    /**
	     * single 関連記事
	     * @return {?Element} single-related-container を返します
	     */

	  }, {
	    key: 'related',
	    value: function related() {
	      return Dom.get('single-related-container');
	    }
	    /**
	     * single 本文下, tag とか...
	     * @return {?Element} single-footer-container を返します
	     */

	  }, {
	    key: 'singleFooter',
	    value: function singleFooter() {
	      return Dom.get('single-footer-container');
	    }
	    /**
	     * single 本文上, title, 投稿者とか...
	     * @return {?Element} single-header-container を返します
	     */

	  }, {
	    key: 'singleHeader',
	    value: function singleHeader() {
	      return Dom.get('single-header-container');
	    }
	    /**
	     * single 本文上, メインビジュアル
	     * @return {?Element} single-visual-container を返します
	     */

	  }, {
	    key: 'visual',
	    value: function visual() {
	      return Dom.get('single-visual-container');
	    }
	    /**
	     * single comment, 記事へのコメント
	     * @return {?Element} comment-form-container を返します
	     */

	  }, {
	    key: 'commentForm',
	    value: function commentForm() {
	      return Dom.get('comment-form-container');
	    }
	    /**
	     * single comment, 自分のコメント
	     * @return {?Element} comment-self-container を返します
	     */

	  }, {
	    key: 'commentSelf',
	    value: function commentSelf() {
	      return Dom.get('comment-self-container');
	    }
	    /**
	     * single comment, 公式コメント
	     * @return {?Element} comment-official-container を返します
	     */

	  }, {
	    key: 'commentOfficial',
	    value: function commentOfficial() {
	      return Dom.get('comment-official-container');
	    }
	    /**
	     * single comment, みんなのコメント
	     * @return {?Element} comment-normal-container を返します
	     */

	  }, {
	    key: 'commentNormal',
	    value: function commentNormal() {
	      return Dom.get('comment-normal-container');
	    }
	    /**
	     * single 記事 本文
	     * @return {?Element} post-content-container を返します
	     */

	  }, {
	    key: 'post',
	    value: function post() {
	      return Dom.get('post-content-container');
	    }
	    /**
	     * single 記事 本文 「続きを読む」
	     * @return {?Element} post-content-read-more を返します
	     */

	  }, {
	    key: 'readMore',
	    value: function readMore() {
	      return Dom.get('post-content-read-more');
	    }
	    /**
	     * 記事詳細のユーザーバナー
	     * @return {?Element} post-content-banner を返します
	     */

	  }, {
	    key: 'userBanner',
	    value: function userBanner() {
	      return Dom.get('post-content-banner');
	    }
	    // --------------------------------------
	    // single/next
	    /**
	     * 記事詳細 > next container
	     * @return {?Element} js-singles-container を返します
	     */

	  }, {
	    key: 'singlesNext',
	    value: function singlesNext() {
	      return Dom.get('js-singles-container');
	    }
	    /**
	     * 記事詳細 > next + more container
	     * @return {?Element} js-singles-more を返します
	     */

	  }, {
	    key: 'singlesMore',
	    value: function singlesMore() {
	      return Dom.get('js-singles-more');
	    }
	    // --------------------------------------
	    /**
	     * signup 新規登録
	     * @return {?Element} signup-container を返します
	     */

	  }, {
	    key: 'signup',
	    value: function signup() {
	      return Dom.get('signup-container');
	    }
	    /**
	     * login form
	     * @return {?Element} login-form-container を返します
	     */

	  }, {
	    key: 'login',
	    value: function login() {
	      return Dom.get('login-form-container');
	    }
	    /**
	     * logout form
	     * @return {?Element} logout-form-container を返します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      return Dom.get('logout-form-container');
	    }
	    /**
	     * パスワードをリセットする メール入力
	     * @return {?Element} reset_password-container
	     */

	  }, {
	    key: 'password',
	    value: function password() {
	      return Dom.get('reset_password-container');
	    }
	    /**
	     * パスワードをリセットする パスワード入力
	     * @return {?Element} reset_password-container
	     */

	  }, {
	    key: 'passwordResetting',
	    value: function passwordResetting() {
	      return Dom.get('reset_password-resetting-container');
	    }
	    /**
	     * modal
	     * @return {?Element} modal-container
	     */

	  }, {
	    key: 'modal',
	    value: function modal() {
	      return Dom.get('modal-container');
	    }
	    /**
	     * logout modal
	     * @return {?Element} logout-modal-container
	     */

	  }, {
	    key: 'logoutModal',
	    value: function logoutModal() {
	      return Dom.get('logout-modal-container');
	    }
	    /**
	     * deactivate modal
	     * @return {?Element} deactivate-modal-container
	     */

	  }, {
	    key: 'deactivateModal',
	    value: function deactivateModal() {
	      return Dom.get('deactivate-modal-container');
	    }
	    /**
	     * deactivate modal
	     * @return {?Element} deactivate-modal-container
	     */

	  }, {
	    key: 'flushModal',
	    value: function flushModal() {
	      return Dom.get('flush-modal-container');
	    }

	    // --------------------------------------
	    // mypage
	    /**
	     * mypage ユーザー情報, SP お知らせ
	     * @return {?Element} mypage-profile-container
	     */

	  }, {
	    key: 'userProfile',
	    value: function userProfile() {
	      return Dom.get('mypage-profile-container');
	    }
	    /**
	     * mypage ユーザー情報, SP mypage
	     * SP はお知らせとmypage系で要件が違うため
	     * @return {?Element} mypage-profile-container-extend
	     */

	  }, {
	    key: 'userProfileEx',
	    value: function userProfileEx() {
	      return Dom.get('mypage-profile-container-extend');
	    }
	    // --------------------------------------
	    // nav
	    /**
	     * main nav, category slug を設定するために
	     * @return {?Element} global-nav-container
	     */

	  }, {
	    key: 'nav',
	    value: function nav() {
	      return Dom.get('global-nav-container');
	    }
	    /**
	     * SP nav inner
	     * @return {?Element} gnav-sec-inner
	     */

	  }, {
	    key: 'navInner',
	    value: function navInner() {
	      return Dom.get('gnav-sec-inner');
	    }
	    /**
	     * SP nav > ul#gnav-sec-list
	     * @return {?Element} gnav-sec-list
	     */

	  }, {
	    key: 'navList',
	    value: function navList() {
	      return Dom.get('gnav-sec-list');
	    }
	    // --------------------------------------
	    // settings
	    /**
	     * 設定 form container
	     * @return {?Element} setting-form-container
	     */

	  }, {
	    key: 'settings',
	    value: function settings() {
	      return Dom.get('setting-form-container');
	    }
	    // --------------------------------------
	    // sidebar ad for PC
	    /**
	     * sidebar ad, ranking
	     * @return {?Element} sponsor-link-ranking
	     */

	  }, {
	    key: 'adRanking',
	    value: function adRanking() {
	      return Dom.get('sponsor-link-ranking');
	    }
	    /**
	     * sidebar ad, video
	     * @return {?Element} sponsor-link-recommend
	     */

	  }, {
	    key: 'adVideo',
	    value: function adVideo() {
	      return Dom.get('sponsor-link-recommend');
	    }
	    /**
	     * sidebar ad, ranking 2
	     * @return {?Element} sponsor-link-ranking-2
	     */

	  }, {
	    key: 'adRanking2',
	    value: function adRanking2() {
	      return Dom.get('sponsor-link-ranking-2');
	    }
	    /**
	     * sidebar ad, video 2
	     * @return {?Element} sponsor-link-recommend-2
	     */

	  }, {
	    key: 'adVideo2',
	    value: function adVideo2() {
	      return Dom.get('sponsor-link-recommend-2');
	    }
	    // // --------------------------------------
	    // // 広告
	    // // 記事詳細
	    // static adSingleTop() {
	    //   return Dom.get( 'single-top-sponsor-container' );
	    // }
	    // static adSidebarTop() {
	    //   return Dom.get( 'sidebar-sponsor-top-container' );
	    // }
	    // static adSidebarBottom() {
	    //   return Dom.get( 'sidebar-sponsor-bottom-container' );
	    // }
	    // --------------------------------------
	    // SP category
	    // tab 表示・非表示で class（category）を与えるために...
	    /**
	     * div.body-sec<br>
	     * SP: tab 表示・非表示で class（category）を与えるために...
	     * @return {?Element} div.body-sec
	     */

	  }, {
	    key: 'bodySection',
	    value: function bodySection() {
	      return Dom.get('body-section');
	    }
	    // --------------------------------------
	    // 記事詳細 / 「続きを読む」のリンク先に外部サイトも指定できるようにする #738
	    /**
	     * <p>記事詳細 / 「続きを読む」のリンク先に外部サイトも指定できるようにする #738</p>
	     * で ga するために a#readMore-external へのクリックで送信します
	     * @return {?Element} a#readMore-external
	     */

	  }, {
	    key: 'moreExternal',
	    value: function moreExternal() {
	      return Dom.get('readMore-external');
	    }

	    // --------------------------------------
	    // exe JS ID
	    /**
	     * exe 系 script tag の ID
	     * @return {?Element} script tag #js-exe を返します
	     */

	  }, {
	    key: 'jsExe',
	    value: function jsExe() {
	      return Dom.get('js-exe');
	    }
	    /**
	     * script tag #js-exe の data-label 値を取得します
	     * @return {string} script tag #js-exe の data-label 値を返します
	     */

	  }, {
	    key: 'categoryLabel',
	    value: function categoryLabel() {
	      var script = Dom.jsExe();
	      if (script === null) {
	        return '';
	      }
	      return script.dataset && script.dataset.label ? script.dataset.label : '';
	    }

	    // --------------------------------------
	    // アプリバナー
	    /**
	     * アプリバナー格納 Element を取得します
	     * @return {?Element} div#js-header-appbnr-container
	     */

	  }, {
	    key: 'appBanner',
	    value: function appBanner() {
	      return Dom.get('js-header-appbnr-container');
	    }
	    // --------------------------------------
	    // announce - 2017-12-18
	    /**
	     * 「お知らせ」表示コンテナ を取得します
	     * @returns {Element} `div#js-announce-container`
	     * @since 2017-12-18
	     */

	  }, {
	    key: 'announce',
	    value: function announce() {
	      return Dom.get('js-announce-container');
	    }
	  }]);
	  return Dom;
	}(); /**
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

	exports.default = Dom;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(6);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	var $Object = __webpack_require__(11).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(19), 'Object', { defineProperty: __webpack_require__(15).f });


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10);
	var core = __webpack_require__(11);
	var ctx = __webpack_require__(12);
	var hide = __webpack_require__(14);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.3' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(13);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(15);
	var createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(19) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(16);
	var IE8_DOM_DEFINE = __webpack_require__(18);
	var toPrimitive = __webpack_require__(22);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(19) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(19) && !__webpack_require__(20)(function () {
	  return Object.defineProperty(__webpack_require__(21)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(20)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	var document = __webpack_require__(10).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(17);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Safety = undefined;

	var _isInteger = __webpack_require__(25);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _create = __webpack_require__(29);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(50);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// let _symbol = Symbol();

	/**
	 * データが安全かを調べます
	 * - 全て static
	 */
	var Safety = exports.Safety = function () {
	  function Safety() {
	    (0, _classCallCheck3.default)(this, Safety);
	  }

	  (0, _createClass3.default)(Safety, null, [{
	    key: 'check',

	    /**
	     * object に keyName が存在することと type があっているかを調べます
	     * @param {Object} object 調査対象 Object
	     * @param {string} keyName 調査対象キー名称
	     * @param {string} [type=string] 調査対象型
	     * @return {boolean} 調べた結果を真偽値で返します
	     */
	    value: function check(object, keyName) {
	      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'string';

	      var altType = Safety.string(type, 'string');
	      altType = altType.toLowerCase();
	      if (altType === 'array') {
	        return object.hasOwnProperty(keyName) && Array.isArray(object[keyName]);
	      }
	      // else {
	      //   return object.hasOwnProperty( keyName ) && typeof object[ keyName ] === altType;
	      // }
	      return object.hasOwnProperty(keyName) && (0, _typeof3.default)(object[keyName]) === altType;
	    }
	    /**
	     * 配列かを調べ必ず Array 型を返します
	     * @param {*} [value=[]] 配列かを調べる対象
	     * @return {Array} 必ず配列を返します。引数が配列で無い時は空配列を返します
	     */

	  }, {
	    key: 'array',
	    value: function array() {
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      if (!Array.isArray(value)) {
	        // 参照が残らないように返します
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
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (value === null || typeof value === 'undefined') {
	        // 参照が残らないように返します
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
	     * @param {number} value 調査対象
	     * @param {number} defaultValue null の時にセットする値
	     * @return {number} number 型を返します
	     */

	  }, {
	    key: 'integer',
	    value: function integer(value, defaultValue) {
	      if (!(0, _isInteger2.default)(value)) {
	        return defaultValue;
	      }
	      return value;
	    }
	    /**
	     * Element かどうかを調べます
	     * @param {Element} element 調査対象 Element
	     * @returns {boolean} Element かどうかの真偽値を返します
	     */

	  }, {
	    key: 'isElement',
	    value: function isElement(element) {
	      return element !== null && typeof element !== 'undefined' && 'appendChild' in element;
	    }
	    /**
	     * FormData かどうかを調べます
	     * @param {FormData} formData 調査対象 FormData
	     * @returns {boolean} FormData かどうかの真偽値を返します
	     */

	  }, {
	    key: 'isFormData',
	    value: function isFormData(formData) {
	      return formData !== null && typeof formData !== 'undefined' && 'append' in formData;
	    }
	    /**
	     * ファイル名から拡張子を取得します
	     * - ファイル名にクエリが付くことがあるの消去後拡張子を取得します - 2018-02-15
	     * @param {string} fileName 取得したいファイル名称
	     * @returns {string} ファイル名の拡張子を返します
	     * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-452
	     * @since 2018-02-15 path query clean
	     */

	  }, {
	    key: 'getExtension',
	    value: function getExtension(fileName) {
	      // @since 2018-02-15
	      // 画像パスにクエリが付くことがあるので消去する
	      var cleanPath = fileName.replace(/\?.*$/, '');
	      // http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
	      var split = cleanPath.split('.');
	      if (split.length === 1 || split[0] === '' && split.length === 2) {
	        // console.warn( `not correct file name. ${fileName}` );
	        return '';
	      }
	      return split.pop().toLowerCase();
	    }
	    // ----------------------------------------------------------
	    // 画像パスが正規かチェックする
	    /**
	     * 使用可能な base64 file かを調べます
	     * @param {string} fileName 調査対象ファイル名
	     * @return {boolean} jpeg / png / jpg / gif の時に true を返します
	     */

	  }, {
	    key: 'isBase64',
	    value: function isBase64(fileName) {
	      return fileName.indexOf('data:image/jpeg;base64') !== -1 || fileName.indexOf('data:image/png;base64') !== -1 || fileName.indexOf('data:image/jpg;base64') !== -1 || fileName.indexOf('data:image/gif;base64') !== -1;
	    }
	    /**
	     * 拡張子から画像ファイルかを調べます
	     * @param {string} fileName 調査対象ファイル名
	     * @returns {boolean} 'jpg', 'png', 'jpeg', 'gif' のいづれかに該当するかの真偽値を返します
	     */

	  }, {
	    key: 'isImg',
	    value: function isImg(fileName) {
	      // base64
	      if (Safety.isBase64(fileName)) {
	        return true;
	      }
	      // 拡張子チェック
	      return ['jpg', 'png', 'jpeg', 'gif'].indexOf(Safety.getExtension(fileName)) !== -1;
	    }
	    /**
	     * path に `graph.facebook.com` が含まれているかを調べます
	     * @param {string} path 調査対象パス
	     * @return {boolean} ath に `graph.facebook.com` が含まれているかの真偽値を返します
	     */

	  }, {
	    key: 'isGraph',
	    value: function isGraph(path) {
	      return path.indexOf('graph.facebook.com') !== -1;
	    }

	    /**
	     * 引数 path が画像パスかを調べます
	     * @param {string} path 調査対象画像パス
	     * @param {string} defaultPath 代替画像パス
	     * @return {string} pathを調べ正しいと推測されるパスを返します
	     */

	  }, {
	    key: 'image',
	    value: function image(path, defaultPath) {
	      // string check
	      var altPath = Safety.string(path, '');
	      if (altPath === '') {
	        return defaultPath;
	      }

	      if (!Safety.isImg(altPath)) {
	        // 拡張子チェック・アウト
	        if (!Safety.isGraph(altPath)) {
	          return defaultPath;
	        }
	        return altPath;
	      }
	      return altPath;
	    }
	    /**
	     * path と empty を比較し異なっていれば notSame を返します
	     * @param {string} path 調査対象 1
	     * @param {string} empty 調査対象 2
	     * @param {string} [notSame=Safety.NOT_EMPTY] 異なってる時に返す文字
	     * @return {string} '' か notSame を返します
	     */

	  }, {
	    key: 'same',
	    value: function same(path, empty) {
	      var notSame = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Safety.NOT_EMPTY;

	      return path === empty ? '' : notSame;
	    }
	    // ----------------------------------------------------------
	    /**
	     * 引数が正規なものかをチェックします
	     * @param {string} target 調査対象
	     * @param {Array.<string>} allowed 正しい対象値
	     * @return {boolean} 引数が正規なものかをチェックし true / false を返します
	     */

	  }, {
	    key: 'normalize',
	    value: function normalize(target, allowed) {
	      return allowed.some(function (value) {
	        return target === value;
	      });
	    }
	    /**
	     * 引数(target)が null かを調べます
	     * @since 2-16-09-15
	     * @param {*} target 調査対象
	     * @return {boolean} 引数(target)が null かを調べ結果を返します、true: null
	     */

	  }, {
	    key: 'nil',
	    value: function nil(target) {
	      return target === null;
	    }
	    /**
	     * 引数(target)を `!!` で調べます
	     *
	     * false になるもの
	     * - false
	     * - ''
	     * - 0
	     * - undefined
	     * - null
	     *
	     * @since 2-16-09-15
	     * @param {*} target 調査対象
	     * @return {boolean} 引数(target)を `!!` で調べ結果を返します
	     */

	  }, {
	    key: 'exist',
	    value: function exist(target) {
	      return !!target;
	    }
	  }, {
	    key: 'NOT_EMPTY',

	    // /**
	    //  * データが安全かを調べます
	    //  * static class です、instance を作成できません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Safety is static Class. not use new Safety().' );
	    //
	    //   }
	    //
	    // }
	    /**
	     * NOT_EMPTY, 登録済みデータある時の className
	     * @return {string} user-logged-in を返します
	     */
	    get: function get() {
	      return 'user-logged-in';
	    }
	  }]);
	  return Safety;
	}();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	module.exports = __webpack_require__(11).Number.isInteger;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(9);

	$export($export.S, 'Number', { isInteger: __webpack_require__(28) });


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(17);
	var floor = Math.floor;
	module.exports = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(31);
	var $Object = __webpack_require__(11).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(32) });


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(16);
	var dPs = __webpack_require__(33);
	var enumBugKeys = __webpack_require__(48);
	var IE_PROTO = __webpack_require__(45)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(21)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(49).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(15);
	var anObject = __webpack_require__(16);
	var getKeys = __webpack_require__(34);

	module.exports = __webpack_require__(19) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(35);
	var enumBugKeys = __webpack_require__(48);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(36);
	var toIObject = __webpack_require__(37);
	var arrayIndexOf = __webpack_require__(41)(false);
	var IE_PROTO = __webpack_require__(45)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38);
	var defined = __webpack_require__(40);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37);
	var toLength = __webpack_require__(42);
	var toAbsoluteIndex = __webpack_require__(44);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(43);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(43);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(46)('keys');
	var uid = __webpack_require__(47);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(10).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(51);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(64);
	module.exports = __webpack_require__(68).f('iterator');


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(54)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(55)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(43);
	var defined = __webpack_require__(40);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(56);
	var $export = __webpack_require__(9);
	var redefine = __webpack_require__(57);
	var hide = __webpack_require__(14);
	var has = __webpack_require__(36);
	var Iterators = __webpack_require__(58);
	var $iterCreate = __webpack_require__(59);
	var setToStringTag = __webpack_require__(60);
	var getPrototypeOf = __webpack_require__(62);
	var ITERATOR = __webpack_require__(61)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ }),
/* 58 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(32);
	var descriptor = __webpack_require__(23);
	var setToStringTag = __webpack_require__(60);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(14)(IteratorPrototype, __webpack_require__(61)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(15).f;
	var has = __webpack_require__(36);
	var TAG = __webpack_require__(61)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(46)('wks');
	var uid = __webpack_require__(47);
	var Symbol = __webpack_require__(10).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(36);
	var toObject = __webpack_require__(63);
	var IE_PROTO = __webpack_require__(45)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(40);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	var global = __webpack_require__(10);
	var hide = __webpack_require__(14);
	var Iterators = __webpack_require__(58);
	var TO_STRING_TAG = __webpack_require__(61)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(66);
	var step = __webpack_require__(67);
	var Iterators = __webpack_require__(58);
	var toIObject = __webpack_require__(37);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(55)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(61);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(83);
	module.exports = __webpack_require__(11).Symbol;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(10);
	var has = __webpack_require__(36);
	var DESCRIPTORS = __webpack_require__(19);
	var $export = __webpack_require__(9);
	var redefine = __webpack_require__(57);
	var META = __webpack_require__(72).KEY;
	var $fails = __webpack_require__(20);
	var shared = __webpack_require__(46);
	var setToStringTag = __webpack_require__(60);
	var uid = __webpack_require__(47);
	var wks = __webpack_require__(61);
	var wksExt = __webpack_require__(68);
	var wksDefine = __webpack_require__(73);
	var enumKeys = __webpack_require__(74);
	var isArray = __webpack_require__(77);
	var anObject = __webpack_require__(16);
	var isObject = __webpack_require__(17);
	var toIObject = __webpack_require__(37);
	var toPrimitive = __webpack_require__(22);
	var createDesc = __webpack_require__(23);
	var _create = __webpack_require__(32);
	var gOPNExt = __webpack_require__(78);
	var $GOPD = __webpack_require__(80);
	var $DP = __webpack_require__(15);
	var $keys = __webpack_require__(34);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(79).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(76).f = $propertyIsEnumerable;
	  __webpack_require__(75).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(56)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(47)('meta');
	var isObject = __webpack_require__(17);
	var has = __webpack_require__(36);
	var setDesc = __webpack_require__(15).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(20)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(10);
	var core = __webpack_require__(11);
	var LIBRARY = __webpack_require__(56);
	var wksExt = __webpack_require__(68);
	var defineProperty = __webpack_require__(15).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(34);
	var gOPS = __webpack_require__(75);
	var pIE = __webpack_require__(76);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37);
	var gOPN = __webpack_require__(79).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(35);
	var hiddenKeys = __webpack_require__(48).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(76);
	var createDesc = __webpack_require__(23);
	var toIObject = __webpack_require__(37);
	var toPrimitive = __webpack_require__(22);
	var has = __webpack_require__(36);
	var IE8_DOM_DEFINE = __webpack_require__(18);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(19) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(73)('asyncIterator');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(73)('observable');


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(95);

	var _View3 = _interopRequireDefault(_View2);

	var _ComponentHeaderSearchForm = __webpack_require__(102);

	var _ComponentHeaderSearchForm2 = _interopRequireDefault(_ComponentHeaderSearchForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/18 - 15:01
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var React = self.React;
	/* eslint-enable no-unused-vars */
	/**
	 * [library] - ReactDOM
	 */


	// node
	// import {HeaderSearchNode} from '../../node/header/HeaderSearchNode';
	var ReactDOM = self.ReactDOM;

	/**
	 * 検索フォーム
	 */

	var ViewHeaderSearch = function (_View) {
	  (0, _inherits3.default)(ViewHeaderSearch, _View);

	  function ViewHeaderSearch() {
	    (0, _classCallCheck3.default)(this, ViewHeaderSearch);
	    return (0, _possibleConstructorReturn3.default)(this, (ViewHeaderSearch.__proto__ || (0, _getPrototypeOf2.default)(ViewHeaderSearch)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ViewHeaderSearch, [{
	    key: 'start',

	    // /**
	    //  * 検索フォーム + ロケーション遷移
	    //  * @param {Element} element insert parent element
	    //  * @param {Object} [option={}] optional event handler
	    //  */
	    // constructor(element, option = {}) {
	    //   super(element, option);
	    // }
	    // ---------------------------------------------------
	    //  Method
	    // ---------------------------------------------------
	    /**
	     * render 実行
	     */
	    value: function start() {
	      this.render();
	    }
	    /**
	     * HTMLElement を生成します
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      // ReactDOM.render(
	      //   <HeaderSearchNode />,
	      //   this.element
	      // );
	      ReactDOM.render(React.createElement(_ComponentHeaderSearchForm2.default, {
	        vk: this.vk
	      }), this.element);
	    }
	  }]);
	  return ViewHeaderSearch;
	}(_View3.default);

	exports.default = ViewHeaderSearch;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	module.exports = __webpack_require__(11).Object.getPrototypeOf;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(63);
	var $getPrototypeOf = __webpack_require__(62);

	__webpack_require__(88)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(9);
	var core = __webpack_require__(11);
	var fails = __webpack_require__(20);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(50);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(91);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(29);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(50);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	module.exports = __webpack_require__(11).Object.setPrototypeOf;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(9);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(94).set });


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(17);
	var anObject = __webpack_require__(16);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(12)(Function.call, __webpack_require__(80).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher2 = __webpack_require__(96);

	var _Safety = __webpack_require__(24);

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
	// import ViewError from './error/ViewError';

	var View = function (_EventDispatcher) {
	  (0, _inherits3.default)(View, _EventDispatcher);
	  (0, _createClass3.default)(View, null, [{
	    key: 'BEFORE_RENDER',

	    // ---------------------------------------------------
	    //  STATIC CONST
	    // ---------------------------------------------------
	    /**
	     * event BEFORE_RENDER<br>
	     * ReactDOM.render 前
	     * @return {string} viewBeforeRender を返します
	     */
	    get: function get() {
	      return 'viewBeforeRender';
	    }
	    /**
	     * event WILL_MOUNT<br>
	     * ReactClass.componentWillMount 後
	     * @return {string} viewWillMount を返します
	     */

	  }, {
	    key: 'WILL_MOUNT',
	    get: function get() {
	      return 'viewWillMount';
	    }
	    /**
	     * event DID_MOUNT<br>
	     * ReactClass.componentDidMount 後
	     * @return {string} viewDidMount を返します
	     */

	  }, {
	    key: 'DID_MOUNT',
	    get: function get() {
	      return 'viewDidMount';
	    }
	    /**
	     * event ERROR_MOUNT
	     * @return {string} viewErrorMount を返します
	     */

	  }, {
	    key: 'ERROR_MOUNT',
	    get: function get() {
	      return 'viewErrorMount';
	    }
	    /**
	     * event UNDEFINED_ERROR<br>
	     * Ajax は成功したが設定されるべき key 値が undefined or null の時
	     * @return {string} viewUndefinedError を返します
	     */

	  }, {
	    key: 'UNDEFINED_ERROR',
	    get: function get() {
	      return 'viewUndefinedError';
	    }
	    /**
	     * event EMPTY_ERROR<br>
	     * Ajax は成功したが配列であるべき結果が length 0 の時
	     * @return {string} viewEmptyError を返します
	     */

	  }, {
	    key: 'EMPTY_ERROR',
	    get: function get() {
	      return 'viewEmptyError';
	    }
	    /**
	     * event RESPONSE_ERROR<br>
	     * Ajax 失敗
	     * @return {string} viewResponseError を返します
	     */

	  }, {
	    key: 'RESPONSE_ERROR',
	    get: function get() {
	      return 'viewResponseError';
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * action/Headline を使い Ajax request 後 element へ dom を作成します
	     * @param {Element} element root element
	     * @param {Object} [option={}] optional event handler
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	     * @since 2-18-04-19 vk header - flag 追加
	     */

	  }]);

	  function View(element) {
	    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    (0, _classCallCheck3.default)(this, View);

	    option = _Safety.Safety.object(option);

	    /**
	     * react JSX を挿入する root element
	     * @type {Element}
	     * @protected
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (View.__proto__ || (0, _getPrototypeOf2.default)(View)).call(this));

	    _this._element = element;
	    /**
	     * event 名称をキーにしセットした event handler(callback) Object
	     * @type {Object}
	     * @protected
	     */
	    _this._option = option;
	    /**
	     * Action Class instance
	     * @type {null|*}
	     * @protected
	     */
	    _this._action = null;
	    /**
	     * 表示されているページが home(index) かを識別する flag
	     * @since 2016-09-16
	     * @type {boolean}
	     * @protected
	     * @default false
	     */
	    _this._home = false;

	    /**
	     * bind 済み executeSafely
	     * @type {function}
	     * @since 2016-09-28
	     */
	    _this.boundSafely = _this.executeSafely.bind(_this);
	    /**
	     * VK（バーチャル甲子園）flag
	     * @type {boolean}
	     * @since 2018-04-19 - VK header
	     */
	    _this.vk = vk;
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * root element
	   * @return {Element} render root element を返します
	   */


	  (0, _createClass3.default)(View, [{
	    key: 'executeSafely',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * option Object に kyeName が存在し型が function かを調べ関数を実行します
	     * @param {string} keyName 存在チェックを行う関数キー名
	     * @param {*} [args=] 実行関数へ渡す引数, 不特定多数
	     */
	    value: function executeSafely(keyName) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var option = this.option;
	      // console.log( 'executeSafely', keyName, this, args, option, option.hasOwnProperty( keyName ), typeof option[ keyName] );
	      if (option.hasOwnProperty(keyName) && typeof option[keyName] === 'function') {
	        // callback 側で通常の引数として取り出せるように apply します
	        option[keyName].apply(this, args);
	      }
	      // console.log( 'executeSafely after if' );
	      // listen しているかもしれないので event を発火させる
	      this.dispatch({ type: keyName, args: args });
	      // console.log( 'executeSafely after dispatch' );
	    }
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
	     * callback handler がセットされたObject
	     * @return {Object} callback handler がセットされたObjectを返します
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
	     * Action instance
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
	    /**
	     * home flag
	     * @since 2016-09-16
	     * @return {boolean} home flag boolean を返します
	     */

	  }, {
	    key: 'home',
	    get: function get() {
	      return this._home;
	    }
	    /**
	     * home flag
	     * @since 2016-09-16
	     * @param {boolean} home flag
	     */
	    ,
	    set: function set(home) {
	      this._home = home;
	    }
	  }]);
	  return View;
	}(_EventDispatcher2.EventDispatcher);

	exports.default = View;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EventDispatcher = undefined;

	var _getIterator2 = __webpack_require__(97);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	/**
	 * <h2>EventDispatcher</h2>
	 * Custom Event の作成は本クラスを **extends** します。
	 *
	 * ```
	 * class Example extends EventDispatcher {
	 *  constructor() {
	 *    super();
	 *  }
	 * }
	 * ```
	 * */
	var EventDispatcher = exports.EventDispatcher = function () {
	  /**
	   * custom event を作成し管理します
	   */
	  function EventDispatcher() {
	    (0, _classCallCheck3.default)(this, EventDispatcher);

	    /**
	     * <p>event listener を設定します</p>
	     * <p>Event.TYPE をキーに listener 関数を配列で設定します</p>
	     * @type {{}}
	     * @protected
	     */
	    this._listeners = {};
	  }

	  /**
	   * event listener リストを取得します
	   * @return {{}} event listener リストを返します
	   */


	  (0, _createClass3.default)(EventDispatcher, [{
	    key: 'on',

	    /**
	     * event type に リスナー関数を bind します
	     * @param {string} type event type
	     * @param {Function} listener callback関数
	     */
	    value: function on(type, listener) {

	      if (listener === null) {
	        // listener が null
	        // 処理しない
	        // console.warn( `have to need listener, listener is null on ${type}` );
	        return;
	      }

	      var listeners = this._listeners;

	      // listeners.type が存在するかを調べます
	      if (!listeners.hasOwnProperty(type)) {
	        // if ( typeof listeners[ type ] === 'undefined' ) {

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
	      // if (type === 'replyComplete') {
	      //   console.log('replyComplete - listener', listener);
	      // }
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

	      if (!listeners.hasOwnProperty(type)) {
	        // if ( typeof listeners[ type ] === 'undefined' ) {
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
	        // console.warn( 'not found k=listener ', type, types );
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

	        // null 以外が無いので空にする
	        this._listeners[type] = [];
	      }
	    }
	    /**
	     * event type にリスナー関数が登録されているかを調べます
	     * @param {string} type event type
	     * @param {Function} listener リスナー関数
	     * @return {Boolean} event type にリスナー関数が登録されているかの真偽値を返します
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

	      // typeof でなく hasOwnProperty で調べるように変更した
	      if (!listeners.hasOwnProperty(event.type)) {
	        // if ( typeof listeners[ event.type ] === 'undefined' ) {
	        // listener.type が存在しない
	        // 処理しない
	        return;
	      }

	      var types = listeners[event.type];
	      event.target = this;

	      // callback を実行する
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
	     * **alias on**
	     * <p>event type に リスナー関数を bind します</p>
	     * @param {string} type event type
	     * @param {Function} listener callback関数
	     */

	  }, {
	    key: 'addEventListener',
	    value: function addEventListener(type, listener) {
	      this.on(type, listener);
	    }
	    /**
	     * **alias off**
	     * <p>event type からリスナー関数を remove します</p>
	     * @param {string} type event type
	     * @param {Function} listener リスナー関数
	     */

	  }, {
	    key: 'removeEventListener',
	    value: function removeEventListener(type, listener) {
	      this.off(type, listener);
	    }
	    /**
	     * **alias has**
	     * <p>event type にリスナー関数が登録されているかを調べます</p>
	     * @param {string} type event type
	     * @param {Function} listener リスナー関数
	     * @return {Boolean} event type にリスナー関数が登録されているかの真偽値を返します
	     */

	  }, {
	    key: 'hasEventListener',
	    value: function hasEventListener(type, listener) {
	      return this.has(type, listener);
	    }
	    /**
	     * **alias dispatch**
	     * <p>イベントを発生させリスな関数を call します</p>
	     * @param {Object} event type が必須です
	     */

	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(event) {
	      this.dispatch(event);
	    }
	  }, {
	    key: 'listeners',
	    get: function get() {
	      return this._listeners;
	    }
	  }]);
	  return EventDispatcher;
	}();

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(53);
	module.exports = __webpack_require__(99);


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(16);
	var get = __webpack_require__(100);
	module.exports = __webpack_require__(11).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(101);
	var ITERATOR = __webpack_require__(61)('iterator');
	var Iterators = __webpack_require__(58);
	module.exports = __webpack_require__(11).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39);
	var TAG = __webpack_require__(61)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ErrorMessage = __webpack_require__(103);

	var _SearchStatus = __webpack_require__(104);

	var _Url = __webpack_require__(105);

	var _Message = __webpack_require__(106);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	/**
	 * [library] - React
	 */
	/**
	 * Copyright (c) 2011-2017 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2017/12/12 - 15:48
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	var React = self.React;

	/**
	 * header - 検索フォームを出力します
	 */

	var ComponentHeaderSearchForm = function (_React$Component) {
	  (0, _inherits3.default)(ComponentHeaderSearchForm, _React$Component);
	  (0, _createClass3.default)(ComponentHeaderSearchForm, null, [{
	    key: 'propTypes',

	    // ---------------------------------------------------
	    //  STATIC METHODS
	    // ---------------------------------------------------
	    /**
	     * React.propTypes
	     * - vk: since 2018-04-19 - vk header
	     * @returns {{listen: boolean, show: boolean, vk: boolean}} React.propTypes
	     */
	    get: function get() {
	      return {
	        listen: React.PropTypes.bool,
	        show: React.PropTypes.bool,
	        vk: React.PropTypes.bool
	      };
	    }
	    /**
	     * React.defaultProps
	     * - vk: since 2018-04-19 - vk header
	     * @returns {{listen: boolean, show: boolean, vk: boolean}} listen: false, show: true
	     */

	  }, {
	    key: 'defaultProps',
	    get: function get() {
	      return {
	        listen: false,
	        show: true,
	        vk: false
	      };
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * header - 検索フォームの準備をします
	     * @param {*} props React.props
	     */

	  }]);

	  function ComponentHeaderSearchForm(props) {
	    (0, _classCallCheck3.default)(this, ComponentHeaderSearchForm);

	    // ---
	    /**
	     * React.state
	     * @type {{show: boolean, focus: string, keyword: string, enable: string, error: boolean}}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentHeaderSearchForm.__proto__ || (0, _getPrototypeOf2.default)(ComponentHeaderSearchForm)).call(this, props));

	    _this.state = {
	      show: props.show,
	      focus: '',
	      keyword: '',
	      enable: '',
	      error: false
	    };
	    /**
	     * error state
	     * @type {{keyword: ErrorMessage}}
	     */
	    _this.errors = {
	      keyword: new _ErrorMessage.ErrorMessage()
	    };
	    /**
	     * sp search form open / close マネージャー
	     * @type {?SearchStatus}
	     */
	    _this.status = props.listen ? _SearchStatus.SearchStatus.factory() : null;
	    /**
	     * bind onOpen
	     * @type {function}
	     */
	    _this.onOpen = _this.onOpen.bind(_this);
	    /**
	     * bind onClose
	     * @type {function}
	     */
	    _this.onClose = _this.onClose.bind(_this);
	    /**
	     * bind onSubmit
	     * @type {function}
	     */
	    _this.onSubmit = _this.onSubmit.bind(_this);
	    /**
	     * bind onChange
	     * @type {function}
	     */
	    _this.onChange = _this.onChange.bind(_this);
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  METHODS
	  // ---------------------------------------------------
	  /**
	   * SearchStatus event を unwatch します
	   */


	  (0, _createClass3.default)(ComponentHeaderSearchForm, [{
	    key: 'dispose',
	    value: function dispose() {
	      var status = this.status;
	      if (status) {
	        status.off(_SearchStatus.SearchStatus.OPEN, this.onOpen);
	        status.off(_SearchStatus.SearchStatus.CLOSE, this.onClose);
	      }
	    }
	    /**
	     * error をリセットします
	     */

	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.errors.keyword.reset();
	      this.setState({ error: false });
	    }

	    /**
	     * form.onsubmit event handler - search location へ遷移します
	     * @param {Event} event submit event
	     */

	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(event) {
	      event.preventDefault();
	      this.reset();

	      if (this.state.keyword === '') {
	        this.errors.keyword.message = '***';
	        this.setState({ error: true });
	      } else {
	        location.href = _Url.Url.search(this.state.keyword, this.props.vk);
	      }
	    }
	    /**
	     * input.onchange event handler - input.balue を書き換えます
	     * @param {Event} event input.onchange event
	     */

	  }, {
	    key: 'onChange',
	    value: function onChange(event) {
	      this.setState({ keyword: event.target.value });
	    }
	    /**
	     * SearchStatus.OPEN event handler
	     * - SP: form open します
	     */

	  }, {
	    key: 'onOpen',
	    value: function onOpen() {
	      this.reset();
	      this.setState({ enable: 'enable', show: true });
	    }
	    /**
	     * SearchStatus.CLOSE event handler
	     * - SP: form close します
	     */

	  }, {
	    key: 'onClose',
	    value: function onClose() {
	      this.setState({ enable: '', show: false });
	    }

	    /**
	     * delegate, after - mount
	     * - SP, {@link SearchStatus}.[OPEN|CLOSE] event bind します
	     */

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var status = this.status;
	      if (status) {
	        this.dispose();
	        status.on(_SearchStatus.SearchStatus.OPEN, this.onOpen);
	        status.on(_SearchStatus.SearchStatus.CLOSE, this.onClose);
	      }
	    }

	    /**
	     * `dispose` 実行します
	     */

	  }, {
	    key: 'componentWillUnMount',
	    value: function componentWillUnMount() {
	      this.dispose();
	    }

	    /**
	     * header 検索フォームを出力します
	     * @returns {?XML} `div.head-search` 出力します
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state,
	          show = _state.show,
	          enable = _state.enable,
	          keyword = _state.keyword;

	      if (!show) {
	        return null;
	      }

	      var listen = this.props.listen;

	      var errorClass = this.errors.keyword.error ? 'error' : '';

	      return React.createElement(
	        'div',
	        {
	          className: 'head-search form-parts ' + errorClass + ' ' + enable
	        },
	        React.createElement(
	          'form',
	          { onSubmit: this.onSubmit },
	          React.createElement('input', {
	            type: 'text',
	            ref: 'searchText',
	            placeholder: _Message.Message.PLACEHOLDER_SEARCH,
	            value: keyword,
	            onChange: this.onChange,
	            autoFocus: listen
	          }),
	          React.createElement('input', { type: 'submit', value: _Message.Message.SUBMIT_SEARCH })
	        )
	      );
	    }
	  }]);
	  return ComponentHeaderSearchForm;
	}(React.Component);

	exports.default = ComponentHeaderSearchForm;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ErrorMessage = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/22 - 0:26
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// import {Safety} from './Safety';

	/**
	 * form error 表示用の 管理クラスです
	 *
	 * ```
	 * const email = new ErrorMessage();
	 *
	 * // error set
	 * email.message = 'エラーがありました';
	 *
	 * // 判定
	 * if (email.error) {
	 *  // error あり
	 * }
	 * ```
	 */
	var ErrorMessage = exports.ErrorMessage = function () {
	  /**
	   * form error 表示
	   * @param {string} [message=''] 初期設定エラーメッセージ
	   */
	  function ErrorMessage() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    (0, _classCallCheck3.default)(this, ErrorMessage);

	    /**
	     * エラーメッセージ
	     * @type {string}
	     */
	    this.message = message;
	  }
	  /**
	   * エラー有無を取得します
	   * @return {boolean} エラー有無を返します。 エラーあり: true
	   */


	  (0, _createClass3.default)(ErrorMessage, [{
	    key: 'reset',

	    // /**
	    //  * エラーメッセージ
	    //  * @return {string|*} エラーメッセージ を返します
	    //  */
	    // get message():string {
	    //   return this._message;
	    // }
	    // /**
	    //  * エラーメッセージ を設定します
	    //  * @param {string} message エラーメッセージ
	    //  */
	    // set message( message:string ):void {
	    //   this._message = Safety.string( message, '' );
	    // }
	    /**
	     * エラーなしにします
	     */
	    value: function reset() {
	      this.message = '';
	    }
	  }, {
	    key: 'error',
	    get: function get() {
	      return this.message !== '';
	    }
	  }]);
	  return ErrorMessage;
	}();

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SearchStatus = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link SearchStatus} inner symbol
	 * @type {symbol}
	 */
	var searchStatusSymbol = (0, _symbol2.default)('SearchStatus symbol');
	/**
	 * {@link SearchStatus} singleton instance
	 * @type {?SearchStatus}
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/08 - 21:34
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	/* eslint constructor-super: 0 */

	var singletonInstance = null;

	/**
	 * sp search form open / close するための custom Event
	 */

	var SearchStatus = exports.SearchStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(SearchStatus, _EventDispatcher);
	  (0, _createClass3.default)(SearchStatus, null, [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {SearchStatus} SearchStatus instance を返します
	     */
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new SearchStatus(searchStatusSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * 検索 form の表示・非表示を行います
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @return {SearchStatus} SearchStatus instance を返します
	     */

	  }, {
	    key: 'OPEN',

	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * OPEN
	     * @return {string} logoutOpen を返します
	     */
	    get: function get() {
	      return 'searchOpen';
	    }
	    /**
	     * CLOSE
	     * @return {string} logoutClose を返します
	     */

	  }, {
	    key: 'CLOSE',
	    get: function get() {
	      return 'searchClose';
	    }
	  }]);

	  function SearchStatus(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, SearchStatus);

	    if (searchStatusSymbol !== target) {
	      throw new Error('SearchStatus is static Class. not use new SearchStatus(). instead SearchStatus.factory()');
	    }
	    if (singletonInstance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (SearchStatus.__proto__ || (0, _getPrototypeOf2.default)(SearchStatus)).call(this));

	      singletonInstance = _this;
	    }
	    return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * OPEN event kick
	   */


	  (0, _createClass3.default)(SearchStatus, [{
	    key: 'open',
	    value: function open() {
	      this.dispatch({ type: SearchStatus.OPEN });
	    }
	    /**
	     * CLOSE event kick
	     */

	  }, {
	    key: 'close',
	    value: function close() {
	      this.dispatch({ type: SearchStatus.CLOSE });
	    }
	  }]);
	  return SearchStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Url = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/11 - 13:48
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var Browser = self.Sagen.Browser;

	/**
	 * request host(protocol + host)
	 * - 実行ファイルから全ての処理に先んじて設定します
	 * @private
	 * @type {string}
	 * @since 2018-04-19 - vk header
	 */
	var host = '';

	/**
	 * Page 遷移 URL
	 * - 全て static です
	 * - a tag href へハードコードされる URL 定義
	 * - [参照](https://docs.google.com/spreadsheets/d/1raMO0x5aeG-bk45PK528ib9HUU-Q4DbHq56oxDQ1h7c/)
	 * */

	var Url = exports.Url = function () {
	  function Url() {
	    (0, _classCallCheck3.default)(this, Url);
	  }

	  (0, _createClass3.default)(Url, null, [{
	    key: 'index',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * URL index
	     * @return {string} index url を返します
	     */
	    value: function index() {
	      return '/';
	    }
	    /**
	     * category url
	     * @param {string} [slug=all] category slug
	     * @return {string} category url を返します
	     */

	  }, {
	    key: 'category',
	    value: function category() {
	      var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

	      return Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug);
	    }
	    /**
	     * category ranking url
	     * @param {string} [slug=all] category slug
	     * @return {string} category ranking url を返します
	     */

	  }, {
	    key: 'ranking',
	    value: function ranking() {
	      var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

	      return Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug) + 'ranking/';
	    }
	    /**
	     * category video url
	     * @param {string} [slug=all] category slug
	     * @return {string} category video url を返します
	     */

	  }, {
	    key: 'video',
	    value: function video() {
	      var slug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

	      return Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug) + 'video/';
	    }
	    /**
	     * 検索ページ url
	     * @param {string} keyword 検索ワード
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
	     * @return {*|string} 検索ページ url を返します
	     */

	  }, {
	    key: 'search',
	    value: function search(keyword) {
	      var vk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      // vk - 絶対パスを返す
	      if (!vk) {
	        Url.host = '';
	      }
	      return Url.host + '/search/' + keyword;
	      // return `/search/${keyword}`;
	    }
	    /**
	     * signup url
	     * @param {string} [path=''] path option
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
	     * @return {string} signup url を返します
	     */

	  }, {
	    key: 'signup',
	    value: function signup() {
	      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var vk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      // vk - 絶対パスを返す
	      if (!vk) {
	        Url.host = '';
	      }
	      var base = Url.host + '/signup/';
	      switch (path) {
	        case 'account':
	          return base + 'account';

	        case 'interest':
	          return base + 'interest';

	        case '':
	          return base;

	        default:
	          // console.warn( `signup illegal value: ${path}, instead use default` );
	          return base;
	      }
	    }
	    /**
	     * step Number から hash を取得します
	     * @param {number} step wizard step Number, 現在位置
	     * @return {string} location hash にセットする文字列を返します
	     */

	  }, {
	    key: 'signupHash',
	    value: function signupHash() {
	      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	      switch (step) {

	        case 2:
	          return 'account';

	        case 3:
	          return 'interest';

	        case 1:
	          return '';

	        default:
	          // console.warn( `signup illegal value: ${step}, instead use default` );
	          return '';
	      }
	    }

	    /**
	     * location.hash から signup step Number を取得します
	     * @param {string} [hash=''] location.hash #付き
	     * @return {number} step Number
	     */

	  }, {
	    key: 'signupStepByHash',
	    value: function signupStepByHash() {
	      var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      switch (hash) {

	        case '#account':
	          return 2;

	        case '#interest':
	          return 3;

	        case '#':
	        case '':
	          return 1;

	        default:
	          // console.warn( `signup illegal value: ${hash}, instead use default` );
	          return 1;
	      }
	    }
	    /**
	     * login url
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
	     * @return {string} login url を返します
	     */

	  }, {
	    key: 'login',
	    value: function login() {
	      var vk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      // vk - 絶対パスを返す
	      if (!vk) {
	        Url.host = '';
	      }
	      return Url.host + '/login/';
	    }

	    /**
	     * logout url
	     * @return {string} logout url を返します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      return '/logout/';
	    }
	    /**
	     * SP 専用
	     * https://github.com/undotsushin/undotsushin/commit/6a99fb16401dd80f5ac1a5c9174b9b93a13408af
	     * @return {string} signup_login url を返します
	     */

	  }, {
	    key: 'signupLogin',
	    value: function signupLogin() {
	      return '/signup_login/';
	    }
	    /**
	     * reset_password url
	     * @param {string} [path=''] path option
	     * @return {*} reset_password url を返します
	     */

	  }, {
	    key: 'password',
	    value: function password() {
	      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      var base = '/reset_password/';

	      switch (path) {
	        case 'resetting':
	          return base + 'resetting';

	        case '':
	          return base;

	        default:
	          // console.warn( `password illegal value: ${path}, instead use default` );
	          return base;
	      }
	    }
	    /**
	     * mypage url
	     * @param {string} [path=''] path option
	     * @return {*} mypage url を返します
	     */

	  }, {
	    key: 'mypage',
	    value: function mypage() {
	      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      var base = '/mypage/';

	      switch (path) {
	        case 'activities':
	          return base + 'activities';

	        case '':
	          return base;

	        default:
	          // console.warn( `mypage illegal value: ${path}, instead use default` );
	          return base;
	      }
	    }
	    /**
	     * notifications url
	     * @return {string} notifications url を返します
	     */

	  }, {
	    key: 'notifications',
	    value: function notifications() {
	      return '/notifications/';
	    }
	    /**
	     * settings url
	     * @param {string} [path=''] path option
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
	     * @return {*} settings url を返します
	     */

	  }, {
	    key: 'settings',
	    value: function settings() {
	      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var vk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      // vk - 絶対パスを返す
	      if (!vk) {
	        Url.host = '';
	      }
	      var base = Url.host + '/settings/';
	      // const base = '/settings/';

	      switch (path) {
	        case 'interest':
	          return base + 'interest';

	        case 'social':
	          return base + 'social';

	        case 'deactivate':
	          return base + 'deactivate';

	        case '':
	          return base;

	        default:
	          // console.warn( `settings illegal value: ${path}, instead use default` );
	          return base;
	      }
	    }
	    /**
	     * about url
	     * @param {string} [path=''] path option
	     * @return {*} about url を返します
	     */

	  }, {
	    key: 'about',
	    value: function about() {
	      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      var base = '/about/';
	      switch (path) {
	        case 'company':
	          return base + 'company';

	        case 'privacy':
	          return base + 'privacy';

	        case 'terms':
	          return base + 'terms';

	        case 'faq':
	          return base + 'faq';

	        case 'ads':
	          return base + 'ads';

	        case 'contact':
	          return base + 'contact';

	        case '':
	          return base;

	        default:
	          // console.warn( `settings illegal value: ${path}, instead use default` );
	          return base;
	      }
	    }
	    /**
	     * アプリダウンロード URL を取得します
	     * ```
	     *   ダウンロード先URLは
	     *   iOS : https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8
	     *   Android : https://play.google.com/store/apps/details?id=com.undotsushin
	     * ```
	     * @see https://github.com/undotsushin/undotsushin/issues/1009
	     * @return {?string} app banner URL
	     */

	  }, {
	    key: 'appBanner',
	    value: function appBanner() {
	      if (Browser.iOS.is()) {
	        return 'https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8';
	      } else if (Browser.Android.is()) {
	        return 'https://play.google.com/store/apps/details?id=com.undotsushin';
	      }
	      return null;
	    }
	    /**
	     * ref: #1023 Syn.extension, SP「関連記事」script tag
	     * - React に script を埋め込むのが困難なため外部スクリプト化しインサートします
	     * @return {string} Syn.extension JS path を返します
	     * @since 2016-09-28
	     */

	  }, {
	    key: 'synExtension',
	    value: function synExtension() {
	      return '/assets/js/syn.extension-recommend_articles.js';
	    }
	    /**
	     * ref: #1023 Syn.extension, SP「関連記事」script tag
	     * - `script` tag 下 `so_dmp.js` ロードパス
	     * @return {string} script` tag 下 `so_dmp.js` パスを返します
	     * @since 2016-09-28
	     */

	  }, {
	    key: 'soDmp',
	    value: function soDmp() {
	      return '//i.socdm.com/s/so_dmp.js?service_id=un_sports';
	    }
	    /**
	     * desktop/p.php line.288 ~ 299, JS で出力のために外部JS file へ
	     * - React に script を埋め込むのが困難なため外部スクリプト化しインサートします
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
	     * @return {string} `/assets/js/pc_popin-recommend.js` を返します
	     * @since 2016-09-30
	     */

	  }, {
	    key: 'popin',
	    value: function popin() {
	      var vk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      // vk - 絶対パスを返す
	      if (!vk) {
	        Url.host = '';
	      }
	      return Url.host + '/assets/js/pc_popin-recommend.js';
	      // return '/assets/js/pc_popin-recommend.js';
	    }
	  }, {
	    key: 'CATEGORY_SLUG',

	    // ---------------------------------------------------
	    //  CONST 代わり
	    // ---------------------------------------------------
	    /**
	     * category slug を置き換えるための定義定数
	     * @return {string} category/slug 置き換え文字定数
	     */
	    get: function get() {
	      return '__SLUG__';
	    }
	    /**
	     * category slug を使用した url を置き換えるための定義定数
	     * @return {string} category url base
	     */

	  }, {
	    key: 'CATEGORY',
	    get: function get() {
	      return '/category/' + Url.CATEGORY_SLUG + '/';
	    }
	    // ---------------------------------------------------
	    /**
	     * request host(protocol + host) 取得します
	     * @returns {string} protocol + host
	     * @since 2018-04-19 - vk header
	     */

	  }, {
	    key: 'host',
	    get: function get() {
	      return host;
	    }
	    /**
	     * request host(protocol + host) を設定します
	     * - 実行ファイルから全ての処理に先んじて設定します
	     * @param {string} hostname request host(protocol + host)
	     * @since 2018-04-19 - vk header
	     */
	    ,
	    set: function set(hostname) {
	      host = hostname;
	    }
	  }]);
	  return Url;
	}();

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Message = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/21 - 12:37
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	// let _symbol = Symbol();

	/**
	 * 表示文章定義
	 * - 全て static です
	 */
	var Message = exports.Message = function () {
	  function Message() {
	    (0, _classCallCheck3.default)(this, Message);
	  }

	  (0, _createClass3.default)(Message, null, [{
	    key: 'undef',

	    /**
	     * undefined error message を作成します
	     * @param {string} prefix メッセージへ加えたい文言
	     * @returns {string} prefix+message を返します
	     */
	    value: function undef() {
	      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      return '' + prefix + Message.NET_UNDEFINED;
	    }
	    /**
	     * empty error message を作成します
	     * @param {string} prefix メッセージへ加えたい文言
	     * @returns {string} prefix+message を返します
	     */

	  }, {
	    key: 'empty',
	    value: function empty() {
	      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      return '' + prefix + Message.NET_EMPTY;
	    }
	    // -----------------------------------
	    // 完了系
	    /**
	     * LOGIN_COMPLETE
	     * ログイン 完了 flush message 使用想定
	     * @returns {string} ログインしました
	     */

	  }, {
	    key: 'RANKING_TITLE',

	    // /**
	    //  * <p>表示文章定義</p>
	    //  * <p>error, 注意などの文章を定義します</p>
	    //  * <p>static class です, instance を作成しません</P>
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target:Symbol ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Message is static Class. not use new Message().' );
	    //
	    //   }
	    //
	    // }
	    // ---------------------------------------------------
	    //  CONST 代わり
	    // ---------------------------------------------------
	    /**
	     * RANKING_TITLE 人気の記事
	     * @returns {string} 人気の記事
	     */
	    get: function get() {
	      return '人気の記事';
	    }
	    /**
	     * VIDEOS_TITLE オススメ動画
	     * @returns {string} オススメ動画
	     */

	  }, {
	    key: 'VIDEOS_TITLE',
	    get: function get() {
	      return 'オススメ動画';
	    }
	    /**
	     * RECOMMEND_TITLE オススメ記事
	     * @since 2016-06-29
	     * @returns {string} オススメ記事
	     */

	  }, {
	    key: 'RECOMMEND_TITLE',
	    get: function get() {
	      return 'オススメ記事';
	    }
	    // /**
	    //  * HEADLINE_TITLE 注目のニュース
	    //  * @returns {string} 注目のニュース
	    //  */
	    // static get HEADLINE_TITLE() {
	    //   return '注目のニュース';
	    // }
	    /**
	     * HEADLINE_TITLE ヘッドラインニュース
	     * @since 2016-09-21 `注目のニュース` -> `ヘッドラインニュース`
	     * @returns {string} ヘッドラインニュース
	     */

	  }, {
	    key: 'HEADLINE_TITLE',
	    get: function get() {
	      return 'ヘッドラインニュース';
	    }
	    /**
	     * LATEST_TITLE 新着記事
	     * @since 2016-09-21
	     * @returns {string} 新着記事
	     */

	  }, {
	    key: 'LATEST_TITLE',
	    get: function get() {
	      return '新着記事';
	    }
	    /**
	     * RELATED_TITLE 関連記事
	     * @since 2016-09-27
	     * @returns {string} 関連記事
	     */

	  }, {
	    key: 'RELATED_TITLE',
	    get: function get() {
	      return '関連記事';
	    }
	    /**
	     * TAGS_TITLE TAGS
	     * @since 2016-09-27
	     * @returns {string} TAGS
	     */

	  }, {
	    key: 'TAGS_TITLE',
	    get: function get() {
	      return 'TAGS';
	    }
	    /**
	     * UNLOAD, 入力内容が取消しされます
	     * onbeforeunload message に使用します
	     * @returns {string} 入力内容が取消しされます
	     */

	  }, {
	    key: 'UNLOAD',
	    get: function get() {
	      return '入力内容が取消しされます！';
	    }
	    /**
	     * DELETE このコメントを削除しますか
	     * コメント削除モーダルで使用します
	     * @returns {string} このコメントを削除しますか
	     */

	  }, {
	    key: 'DELETE',
	    get: function get() {
	      return 'このコメントを削除しますか？';
	    }
	    /**
	     * DELETE_WILL, このコメントを削除する
	     * コメント drop down menu 表示に使用します
	     * @returns {string} このコメントを削除する
	     */

	  }, {
	    key: 'DELETE_WILL',
	    get: function get() {
	      return 'このコメントを削除する';
	    }

	    /**
	     * DEACTIVATE 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
	     * 退会form, モーダルで使用します
	     * @returns {string} 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
	     */

	  }, {
	    key: 'DEACTIVATE',
	    get: function get() {
	      return '退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります。';
	    }
	    /**
	     * LOGOUT ログアウトしますか
	     * ログアウトモーダルで使用します
	     * @returns {string} ログアウトしますか？
	     */

	  }, {
	    key: 'LOGOUT',
	    get: function get() {
	      return 'ログアウトしますか？';
	    }
	    /**
	     * BOOKMARK_WILL ブックマークする
	     * 記事一覧のbookmark button で使用します
	     * @returns {string} ブックマークする
	     */

	  }, {
	    key: 'BOOKMARK_WILL',
	    get: function get() {
	      return 'ブックマークする';
	    }
	    /**
	     * BOOKMARK_DID ブックマーク解除
	     * 記事一覧のbookmark button で使用します
	     * @returns {string} ブックマーク解除
	     */

	  }, {
	    key: 'BOOKMARK_DID',
	    get: function get() {
	      return 'ブックマーク解除';
	    }
	    /**
	     * COMMENT_SUBMIT コメントを投稿
	     * コメント投稿 submit button value 値
	     * @returns {string} コメントを投稿
	     */

	  }, {
	    key: 'COMMENT_SUBMIT',
	    get: function get() {
	      return 'コメントを投稿';
	    }
	    // search
	    /**
	     * PLACEHOLDER_SEARCH 記事を検索
	     * 検索 placeholder
	     * @returns {string} 記事を検索
	     */

	  }, {
	    key: 'PLACEHOLDER_SEARCH',
	    get: function get() {
	      return '記事を検索';
	    }
	    /**
	     * SUBMIT_SEARCH 検索
	     * 検索 submit button value 値
	     * @returns {string} 検索
	     */

	  }, {
	    key: 'SUBMIT_SEARCH',
	    get: function get() {
	      return '検索';
	    }
	    /**
	     * OPENER_SEARCH 記事検索
	     * SP, 検索 form を表示する button に使用
	     * @returns {string} 記事検索
	     */

	  }, {
	    key: 'OPENER_SEARCH',
	    get: function get() {
	      return '記事検索';
	    }
	    // login
	    /**
	     * PLACEHOLDER_EMAIL, メールアドレスを入力
	     * @returns {string} メールアドレスを入力
	     */

	  }, {
	    key: 'PLACEHOLDER_EMAIL',
	    get: function get() {
	      return 'メールアドレスを入力';
	    }
	    /**
	     * PLACEHOLDER_PWD, パスワードを入力
	     * @returns {string} パスワードを入力
	     */

	  }, {
	    key: 'PLACEHOLDER_PWD',
	    get: function get() {
	      return 'パスワードを入力';
	    }
	    /**
	     * PLACEHOLDER_NAME, ユーザー名を入力
	     * @returns {string} ユーザー名を入力
	     */

	  }, {
	    key: 'PLACEHOLDER_NAME',
	    get: function get() {
	      return 'ユーザー名を入力';
	    }
	    /**
	     * PLACEHOLDER_BIO, 肩書を入力 (任意)
	     * @returns {string} 肩書を入力 (任意)
	     */

	  }, {
	    key: 'PLACEHOLDER_BIO',
	    get: function get() {
	      return '肩書を入力 (任意)';
	    }
	    /**
	     * PLACEHOLDER_PICTURE, プロフィール写真選択
	     * @returns {string} プロフィール写真選択
	     */

	  }, {
	    key: 'PLACEHOLDER_PICTURE',
	    get: function get() {
	      return 'プロフィール写真選択';
	    }
	    /**
	     * PLACEHOLDER_CHANGE_PICTURE, 写真を変更する
	     * @returns {string} 写真を変更する
	     */

	  }, {
	    key: 'PLACEHOLDER_CHANGE_PICTURE',
	    get: function get() {
	      return '写真を変更する';
	    }
	    /**
	     * PLACEHOLDER_COMMENT, コメントを書く
	     * @returns {string} コメントを書く
	     */

	  }, {
	    key: 'PLACEHOLDER_COMMENT',
	    get: function get() {
	      return 'コメントを書く';
	    }
	    /**
	     * SUBMIT_LOGIN, ログイン
	     * @returns {string} ログイン
	     */

	  }, {
	    key: 'SUBMIT_LOGIN',
	    get: function get() {
	      return 'ログイン';
	    }
	    /**
	     * SUBMIT_LOGOUT, ログアウト
	     * @returns {string} ログアウト
	     */

	  }, {
	    key: 'SUBMIT_LOGOUT',
	    get: function get() {
	      return 'ログアウト';
	    }
	    // ----
	    // single
	    /**
	     * READ_MORE, 続きを読む
	     * @returns {string} 続きを読む
	     */

	  }, {
	    key: 'READ_MORE',
	    get: function get() {
	      return '続きを読む';
	    }
	    /**
	     * READ_MORE_EXTERNAL 続きを読む(外部サイトへ)
	     * @returns {string} 続きを読む(外部サイトへ) を返します
	     */

	  }, {
	    key: 'READ_MORE_EXTERNAL',
	    get: function get() {
	      return '続きを読む(外部サイトへ)';
	    }
	    /**
	     * WEBSITE ウェブサイト
	     * @since 2-16-09-27
	     * @returns {string} ウェブサイト を返します
	     */

	  }, {
	    key: 'WEBSITE',
	    get: function get() {
	      return 'ウェブサイト';
	    }
	    // ----
	    // button

	    // logout
	    /**
	     * button BUTTON_CLOSE, 閉じる
	     * @returns {string} 閉じる
	     */

	  }, {
	    key: 'BUTTON_CLOSE',
	    get: function get() {
	      return '閉じる';
	    }
	    /**
	     * button BUTTON_YES, はい
	     * @returns {string} はい
	     */

	  }, {
	    key: 'BUTTON_YES',
	    get: function get() {
	      return 'はい';
	    }
	    /**
	     * button BUTTON_NO, いいえ
	     * @returns {string} いいえ
	     */

	  }, {
	    key: 'BUTTON_NO',
	    get: function get() {
	      return 'いいえ';
	    }

	    // remove account
	    /**
	     * button BUTTON_CANCEL, キャンセル
	     * @returns {string} キャンセル
	     */

	  }, {
	    key: 'BUTTON_CANCEL',
	    get: function get() {
	      return 'キャンセル';
	    }
	    /**
	     * button BUTTON_DELETE, 削除
	     * @returns {string} 削除
	     */

	  }, {
	    key: 'BUTTON_DELETE',
	    get: function get() {
	      return '削除';
	    }

	    // 退会
	    /**
	     * button BUTTON_DEACTIVATE, 退会
	     * @returns {string} 退会
	     */

	  }, {
	    key: 'BUTTON_DEACTIVATE',
	    get: function get() {
	      return '退会';
	    }
	    /**
	     * button BUTTON_DEACTIVATE_TEXT, スポーツブルから退会する
	     * @returns {string} スポーツブルから退会する
	     */

	  }, {
	    key: 'BUTTON_DEACTIVATE_TEXT',
	    get: function get() {
	      return 'スポーツブルから退会する';
	    }

	    // profile picture
	    /**
	     * button BUTTON_SAVE, 保存する
	     * @returns {string} 保存する
	     */

	  }, {
	    key: 'BUTTON_SAVE',
	    get: function get() {
	      return '保存する';
	    }
	    /**
	     * button BUTTON_NEXT, 次へ
	     * @returns {string} 次へ
	     */

	  }, {
	    key: 'BUTTON_NEXT',
	    get: function get() {
	      return '次へ';
	    }
	    /**
	     * button BUTTON_RESISTER, 登録する
	     * @returns {string} 登録する
	     */

	  }, {
	    key: 'BUTTON_RESISTER',
	    get: function get() {
	      return '登録する';
	    }
	    /**
	     * button BUTTON_VIEW_MORE, VIEW MORE
	     * @returns {string} VIEW MORE
	     * @since 2017-12-18 `もっと見る` update
	     */

	  }, {
	    key: 'BUTTON_VIEW_MORE',
	    get: function get() {
	      // return 'VIEW MORE';
	      return 'もっと見る';
	    }

	    // ----
	    /**
	     * PLEASE_MAKE_ACCOUNT, アカウント作成 (無料)
	     * @returns {string} アカウント作成 (無料)
	     */

	  }, {
	    key: 'PLEASE_MAKE_ACCOUNT',
	    get: function get() {
	      return 'アカウント作成 (無料)';
	    }

	    // -----------------------------------
	    // ユーザー登録 step information
	    /**
	     * SIGNUP_STEP_1, 基本情報設定
	     * @returns {string} 基本情報設定
	     */

	  }, {
	    key: 'SIGNUP_STEP_1',
	    get: function get() {
	      return '基本情報設定';
	    }
	    /**
	     * SIGNUP_STEP_2, 興味のある競技
	     * @returns {string} 興味のある競技
	     */

	  }, {
	    key: 'SIGNUP_STEP_2',
	    get: function get() {
	      return '興味のある競技';
	    }
	    /**
	     * SIGNUP_STEP_3, 完了
	     * @returns {string} 完了
	     */

	  }, {
	    key: 'SIGNUP_STEP_3',
	    get: function get() {
	      return '完了';
	    }

	    // ログインはこちら
	    /**
	     * HERE_TO_LOGIN
	     * @returns {string} ログインはこちら &gt;
	     */

	  }, {
	    key: 'HERE_TO_LOGIN',
	    get: function get() {
	      return 'ログインはこちら';
	    }

	    // ユーザー登録 section title
	    /**
	     * TITLE_ENTRY_MEMBER, 新規会員登録
	     * @returns {string} 新規会員登録
	     */

	  }, {
	    key: 'TITLE_ENTRY_MEMBER',
	    get: function get() {
	      return '新規会員登録';
	    }
	    /**
	     * TITLE_INTEREST_SPORTS, 興味のある競技を選択
	     * @returns {string} 興味のある競技を選択
	     */

	  }, {
	    key: 'TITLE_INTEREST_SPORTS',
	    get: function get() {
	      return '興味のある競技を選択';
	    }

	    // -----------------------------------
	    // カテゴリ表示の横に付くアイコンぽいやつ
	    /**
	     * LABEL_RECOMMEND, おすすめ記事
	     * @returns {string} おすすめ記事
	     */

	  }, {
	    key: 'LABEL_RECOMMEND',
	    get: function get() {
	      return 'おすすめ記事';
	    }
	    /**
	     * LABEL_MOVIE, 動画
	     * @returns {string} 動画
	     * @since 2016-12-26
	     */

	  }, {
	    key: 'LABEL_MOVIE',
	    get: function get() {
	      return '動画';
	    }
	    /**
	     * LABEL_LATEST - NEW
	     * @returns {string} NEW
	     * @since 2017-12-22
	     */

	  }, {
	    key: 'LABEL_LATEST',
	    get: function get() {
	      return 'NEW';
	    }
	    // -----------------------------------
	    // mypage
	    /**
	     * FAVORITE_SPORTS, 好きな競技
	     * @returns {string} 好きな競技
	     */

	  }, {
	    key: 'FAVORITE_SPORTS',
	    get: function get() {
	      return '好きな競技';
	    }
	    // -----------------------------------
	    // ajax
	    /**
	     * NET_UNDEFINED, サーバーレスポンスに問題が発生しました
	     * @returns {string} サーバーレスポンスに問題が発生しました
	     */

	  }, {
	    key: 'NET_UNDEFINED',
	    get: function get() {
	      return 'サーバーレスポンスに問題が発生しました。';
	    }
	    /**
	     * NET_EMPTY, レスポンスが空でした
	     * @returns {string} レスポンスが空でした
	     */

	  }, {
	    key: 'NET_EMPTY',
	    get: function get() {
	      return 'レスポンスが空でした。';
	    }
	  }, {
	    key: 'LOGIN_COMPLETE',
	    get: function get() {
	      return 'ログインしました。';
	    }
	    /**
	     * DEACTIVATE_COMPLETE
	     * 退会 完了 flush message 使用想定
	     * @returns {string} 退会しました
	     */

	  }, {
	    key: 'DEACTIVATE_COMPLETE',
	    get: function get() {
	      return '退会しました。';
	    }
	    // ----------------------------------
	    // 一覧種類
	    /**
	     * NEWS
	     * 一覧種類 最新記事
	     * @returns {string} news
	     */

	  }, {
	    key: 'NEWS',
	    get: function get() {
	      return 'news';
	    }
	    /**
	     * RANKING
	     * 一覧種類 ランキング
	     * @returns {string} ranking
	     */

	  }, {
	    key: 'RANKING',
	    get: function get() {
	      return 'ranking';
	    }
	    /**
	     * VIDEO
	     * 一覧種類 オススメ動画
	     * @returns {string} video
	     */

	  }, {
	    key: 'VIDEO',
	    get: function get() {
	      return 'video';
	    }
	  }]);
	  return Message;
	}();

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(95);

	var _View3 = _interopRequireDefault(_View2);

	var _ViewHeaderMember = __webpack_require__(108);

	var _ViewHeaderMember2 = _interopRequireDefault(_ViewHeaderMember);

	var _Url = __webpack_require__(105);

	var _User = __webpack_require__(109);

	var _UserStatus = __webpack_require__(111);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */


	// view/header
	var React = self.React;
	/* eslint-enable no-unused-vars */
	/**
	 * [library] - ReactDOM
	 */


	// event


	// app
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

	// view
	var ReactDOM = self.ReactDOM;

	/**
	 * {@link ViewHeaderUser} - header user 関連メニュー - ログイン / 非ログイン でメニューを変更
	 * @param {string} signup signup url
	 * @param {string} login login url
	 * @returns {?XML} `div.user`
	 * @constructor
	 * @since 2017-12-08 - update element
	 */
	var HeaderUserComponent = function HeaderUserComponent(_ref) {
	  var signup = _ref.signup,
	      login = _ref.login;
	  return React.createElement(
	    'div',
	    { className: 'user' },
	    React.createElement(
	      'div',
	      { className: 'user-signup-btn' },
	      React.createElement(
	        'a',
	        { href: login, className: 'user-signup-btn--login' },
	        '\u30ED\u30B0\u30A4\u30F3'
	      ),
	      React.createElement(
	        'a',
	        { href: signup, className: 'user-signup-btn--signup' },
	        '\u7121\u6599\u4F1A\u54E1\u767B\u9332'
	      )
	    )
	  );
	};

	/**
	 * React.propTypes
	 * @type {{signup: string, login: string}}
	 */
	HeaderUserComponent.propTypes = {
	  signup: React.PropTypes.string.isRequired,
	  login: React.PropTypes.string.isRequired
	};

	/**
	 * header user 関連メニュー
	 */

	var ViewHeaderUser = function (_View) {
	  (0, _inherits3.default)(ViewHeaderUser, _View);

	  /**
	   * header user 関連メニュー,
	   * ログイン / 非ログイン でメニューを変更
	   * @param {Element} element insert root element
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	   * @since 2-18-04-19 vk header - flag 追加
	   */
	  function ViewHeaderUser(element) {
	    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    (0, _classCallCheck3.default)(this, ViewHeaderUser);

	    /**
	     * bind 済み this.memberCallback
	     * @type {Function}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ViewHeaderUser.__proto__ || (0, _getPrototypeOf2.default)(ViewHeaderUser)).call(this, element, option, vk));

	    _this._boundCallback = _this.memberCallback.bind(_this);
	    /**
	     * login user view instance
	     * @type {?ViewHeaderMember}
	     * @private
	     */
	    _this._member = null;
	    // User.sign boolean
	    /**
	     * User.sign boolean, ログイン済みかの真偽値
	     * @type {boolean}
	     * @private
	     */
	    _this._sign = _User.User.sign;
	    var userStatus = _UserStatus.UserStatus.factory();
	    var boundSign = _this.onSign.bind(_this);
	    userStatus.on(_UserStatus.UserStatus.LOG_IN, boundSign);
	    userStatus.on(_UserStatus.UserStatus.LOG_OUT, boundSign);
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * ViewHeaderMember instance
	   * @return {?ViewHeaderMember} ViewHeaderMember instance を返します
	   */


	  (0, _createClass3.default)(ViewHeaderUser, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * Ajax request を開始します
	     */
	    value: function start() {
	      if (_User.User.sign) {
	        // login member
	        var member = this._member;
	        if (member !== null) {
	          this.dispose();
	        }
	        // since 2018-04-20
	        // VK - login user メニュー無し
	        if (!this.vk) {
	          var boundCallback = this._boundCallback;
	          // @since 2018-04-19 vk flag 追加
	          member = new _ViewHeaderMember2.default(this.element, {}, this.vk);
	          // member = new ViewHeaderMember(this.element);
	          this._member = member;
	          member.on(_View3.default.BEFORE_RENDER, boundCallback);
	          member.on(_View3.default.WILL_MOUNT, boundCallback);
	          member.on(_View3.default.DID_MOUNT, boundCallback);
	          member.on(_View3.default.ERROR_MOUNT, boundCallback);
	          member.on(_View3.default.UNDEFINED_ERROR, boundCallback);
	          member.on(_View3.default.EMPTY_ERROR, boundCallback);
	          member.on(_View3.default.RESPONSE_ERROR, boundCallback);
	          member.start();
	        }
	      } else {
	        // not member - user menu
	        this.render();
	        this.dispose();
	      }
	    }
	    /**
	     * 非メンバー Dom を生成します
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      ReactDOM.render(React.createElement(HeaderUserComponent, {
	        signup: _Url.Url.signup('', this.vk),
	        login: _Url.Url.login(this.vk),
	        vk: this.vk
	      }), this.element);
	      // execute
	      this.executeSafely(_View3.default.DID_MOUNT);
	    }
	    /**
	     * ViewHeaderMember callback 中継
	     * @param {Object} event event object
	     */

	  }, {
	    key: 'memberCallback',
	    value: function memberCallback(event) {
	      var member = this._member;
	      var callback = this._boundCallback;
	      if (member !== null) {
	        member.off(event.type, callback);
	      }
	      // console.log('ViewHeaderUser.memberCallback', event);
	      this.dispatch(event);

	      if (event.type === _View3.default.RESPONSE_ERROR || event.type === _View3.default.UNDEFINED_ERROR || event.type === _View3.default.EMPTY_ERROR) {
	        // token はあるけどユーザー情報が取得できなかった
	        // 処理を止めて一般ユーザー扱いにする
	        // console.log('ViewHeaderUser.memberCallback', event);
	        this.dispose();
	        this.render();
	      }
	    }
	    /**
	     * member event handler dispose
	     */

	  }, {
	    key: 'dispose',
	    value: function dispose() {
	      var member = this._member;
	      if (member !== null) {
	        var boundCallback = this._boundCallback;
	        member.off(_View3.default.BEFORE_RENDER, boundCallback);
	        member.off(_View3.default.WILL_MOUNT, boundCallback);
	        member.off(_View3.default.DID_MOUNT, boundCallback);
	        member.off(_View3.default.ERROR_MOUNT, boundCallback);
	        member.off(_View3.default.UNDEFINED_ERROR, boundCallback);
	        member.off(_View3.default.EMPTY_ERROR, boundCallback);
	        member.off(_View3.default.RESPONSE_ERROR, boundCallback);
	        this._member = null;
	      }
	    }
	    /**
	     * UserStatus event handler, LOG_IN / LOG_OUT
	     * @param {Object} event UserStatus event object
	     */

	  }, {
	    key: 'onSign',
	    value: function onSign(event) {
	      var sign = event.sign;
	      if (sign !== this._sign) {
	        this._sign = sign;
	        this.start();
	      }
	    }
	  }, {
	    key: 'member',
	    get: function get() {
	      return this._member;
	    }
	  }]);
	  return ViewHeaderUser;
	}(_View3.default);

	exports.default = ViewHeaderUser;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(95);

	var _View3 = _interopRequireDefault(_View2);

	var _User = __webpack_require__(109);

	var _Message = __webpack_require__(106);

	var _UsersSelf = __webpack_require__(112);

	var _UserDae = __webpack_require__(129);

	var _SettingsStatus = __webpack_require__(135);

	var _ComponentHeaderMemberSetting = __webpack_require__(136);

	var _ComponentHeaderMemberSetting2 = _interopRequireDefault(_ComponentHeaderMemberSetting);

	var _Empty = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */


	// component


	// dae
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

	var React = self.React;
	/* eslint-enable no-unused-vars */
	/**
	 * [library] - ReactDOM
	 */


	// event


	// action


	// app
	var ReactDOM = self.ReactDOM;

	/**
	 * header ログイン・メンバー 関連メニュー
	 * @since 2018-04-19 VK（バーチャル甲子園）flag
	 */

	var ViewHeaderMember = function (_View) {
	  (0, _inherits3.default)(ViewHeaderMember, _View);

	  /**
	   * header ログイン・メンバー 関連メニュー
	   * - アイコン+drop down menu 表示
	   *
	   * @param {Element} element insert root element
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
	   */
	  function ViewHeaderMember(element) {
	    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    (0, _classCallCheck3.default)(this, ViewHeaderMember);

	    /**
	     * Action instance を設定します
	     * - vk flag: true の時は作成しない
	     * @override
	     * @type {?UsersSelf}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ViewHeaderMember.__proto__ || (0, _getPrototypeOf2.default)(ViewHeaderMember)).call(this, element, option, vk));

	    _this.action = !vk ? new _UsersSelf.UsersSelf(_this.done.bind(_this), _this.fail.bind(_this)) : null;
	    // this.action = new UsersSelf(this.done.bind(this), this.fail.bind(this));
	    /**
	     * SettingDom instance
	     * @type {null|Object}
	     * @protected
	     */
	    _this._component = null;
	    // SettingsStatus complete を listen しリロードする
	    /**
	     * SettingsStatus instance
	     * @type {SettingsStatus}
	     */
	    _this.settingStatus = _SettingsStatus.SettingsStatus.factory();
	    // this._settingStatus = SettingsStatus.factory();
	    /**
	     * bind 済み this.onComplete
	     * @type {Function}
	     * @protected
	     */
	    _this._boundComplete = _this.onComplete.bind(_this);
	    /**
	     * リロードフラッグ
	     * @type {boolean}
	     * @protected
	     */
	    _this._reloadFlag = false;
	    /**
	     * timeout ID
	     * @type {number}
	     * @protected
	     */
	    _this._timer = 0;
	    /**
	     * bind 済み this.reload
	     * @type {Function}
	     * @protected
	     */
	    _this._boundReload = _this.reload.bind(_this);
	    /**
	     * bind 済み executeSafely
	     * @type {function}
	     * @since 2016-09-28
	     */
	    _this.boundSafely = _this.executeSafely.bind(_this);
	    /**
	     * bound didMount
	     * @type {function}
	     */
	    _this.boundMount = _this.didMount.bind(_this);
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * リロードフラッグ を取得します
	   * @return {boolean} リロードフラッグを返します
	   */


	  (0, _createClass3.default)(ViewHeaderMember, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  Method
	    // ---------------------------------------------------
	    /**
	     * Ajax request を開始します
	     */
	    value: function start() {
	      // console.log('ViewHeaderMember.start');
	      // this.action.start();
	      // vk flag true の時は実行しない
	      if (this.action) {
	        this.action.start();
	      } else if (this.vk) {
	        this.vkRender();
	      }
	    }
	    /**
	     * Ajax response success
	     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
	     */

	  }, {
	    key: 'done',
	    value: function done(result) {
	      var response = result.response;
	      // console.log('ViewHeaderMember.done', result);
	      if (typeof response === 'undefined') {
	        // articles undefined
	        // JSON に問題がある
	        var error = new Error(_Message.Message.undef('[MEMBER:UNDEFINED]'));
	        this.executeSafely(_View3.default.UNDEFINED_ERROR, error);
	        // this.showError( error.message );
	      } else {
	        // @since 2016-11-05
	        // 一旦ローカル変数へ確保します
	        var information = new _UserDae.UserDae(response);
	        // User class へ保管し他で使えるようにします
	        _User.User.setInfo(information);
	        // ---------[/since]
	        this.render(information);
	      }
	    }
	    /**
	     * Ajax response error
	     * @param {Error} error Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {
	      // console.log('ViewHeaderMember.error', error);
	      this.executeSafely(_View3.default.RESPONSE_ERROR, error);
	      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
	      // this.showError( error.message );
	    }
	    /**
	     * Dom を生成します
	     * @param {UserDae} response JSON UserDae instance
	     */

	  }, {
	    key: 'render',
	    value: function render(response) {
	      // --------------------------------------------------
	      this.executeSafely(_View3.default.BEFORE_RENDER, response);
	      // --------------------------------------------------
	      // when reload
	      if (this.reloadFlag) {
	        this.reloadFlag = false;
	        clearTimeout(this._timer);
	        this._timer = setTimeout(this._boundReload, 1000);
	      }
	      // component
	      ReactDOM.render(React.createElement(_ComponentHeaderMemberSetting2.default, {
	        icon: response.profilePicture,
	        userName: response.userName,
	        safely: this.boundSafely,
	        did: this.boundMount,
	        vk: this.vk
	      }), this.element);
	    }
	    /**
	     * componentDidMount で SettingsStatus event を監視する
	     */

	  }, {
	    key: 'didMount',
	    value: function didMount() {
	      var settingStatus = this.settingStatus;
	      settingStatus.off(_SettingsStatus.SettingsStatus.ACCOUNT_COMPLETE, this._boundComplete);
	      settingStatus.on(_SettingsStatus.SettingsStatus.ACCOUNT_COMPLETE, this._boundComplete);
	    }

	    /**
	     * 画像生成がサーバーで遅延するので 1sec 後にリロードする
	     */

	  }, {
	    key: 'reload',
	    value: function reload() {
	      clearTimeout(this._timer);
	      this.start();
	    }
	    /**
	     * 設定変更で読み込み直す
	     */

	  }, {
	    key: 'onComplete',
	    value: function onComplete() {
	      // 再読み込み
	      // console.log( 'SettingsStatus.ACCOUNT_COMPLETE reload' );
	      clearTimeout(this._timer);
	      this.reloadFlag = true;
	      this.start();
	    }
	    /**
	     * VK 専用・ログインユーザーheader 表示
	     * @since 2018-04-19 VK（バーチャル甲子園）flag
	     */

	  }, {
	    key: 'vkRender',
	    value: function vkRender() {
	      ReactDOM.render(React.createElement(_ComponentHeaderMemberSetting2.default, {
	        icon: _Empty.Empty.USER_EMPTY,
	        userName: '',
	        safely: this.boundSafely,
	        did: this.boundMount,
	        vk: this.vk
	      }), this.element);
	    }
	  }, {
	    key: 'reloadFlag',
	    get: function get() {
	      return this._reloadFlag;
	    }
	    /**
	     * リロードフラッグを設定します
	     * @param {boolean} flag リロードフラッグ
	     */
	    ,
	    set: function set(flag) {
	      this._reloadFlag = flag;
	    }
	    /**
	     * timeout ID を取得します
	     * @return {number} timeout ID を返します
	     */

	  }, {
	    key: 'timer',
	    get: function get() {
	      return this._timer;
	    }
	    /**
	     * timeout ID を設定します
	     * @param {number} timer timeout ID
	     */
	    ,
	    set: function set(timer) {
	      this._timer = timer;
	    }
	    /**
	     * bind 済み this.reload 取得します
	     * @return {Function} bind 済み this.reload を返します
	     */

	  }, {
	    key: 'boundReload',
	    get: function get() {
	      return this._boundReload;
	    }
	  }]);
	  return ViewHeaderMember;
	}(_View3.default);

	exports.default = ViewHeaderMember;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.User = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Cookie = __webpack_require__(110);

	var _UserStatus = __webpack_require__(111);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	// let _symbol = Symbol();
	// // let _sign = false;

	/**
	 * ログインユーザー情報 - {@link User}
	 * @type {?UserDae}
	 * @private
	 * @since 2016-11-05
	 * @since 2018-04-19 val header - sub domain 取得可能な cookie set
	 */


	// event
	// import {Env} from './Env';
	var information = null;

	/**
	 * ユーザー情報を管理します
	 * - 全てstaticです
	 */


	// data
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

	// net

	var User = exports.User = function () {
	  function User() {
	    (0, _classCallCheck3.default)(this, User);
	  }

	  (0, _createClass3.default)(User, null, [{
	    key: 'login',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * ログイン設定をします
	     * - since 2018-04-19 subdomain 取得可能なように domain 指定する
	     * @param {string} token 開発中の引数はオプション扱いです
	     * @return {boolean} login が成功したかを返します
	     * @since 2018-04-19 vk header - domain 指定 `.sportsbull.jp`
	     */
	    value: function login(token) {
	      // token = Safety.string(token, '');
	      // token が正常値なのかを調べる
	      // 少なくとも, 文字型で空でない
	      var altToken = _Safety.Safety.string(token, '');
	      if (altToken === '') {
	        // token が不正値
	        console.warn('illegal token. [' + token + ']');
	        return false;
	      }
	      // save
	      // @since 2018-04-19 subdomain 取得可能なように domain 指定する
	      var result = _Cookie.Cookie.save(token, _Cookie.Cookie.TARGET, new Date(Date.now() + 1000 * 60 * 60 * 24 * 90), '/', '.sportsbull.jp');
	      // console.log('User.login ', result, token);
	      User.sign = result;
	      return result;
	    }
	    /**
	     * ログアウト処理を行います
	     * - token を cookie から削除します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      _Cookie.Cookie.remove(_Cookie.Cookie.TARGET);
	      User.sign = false;
	    }
	    /**
	     * ログイン・非ログインを確認します
	     * - ログイン（token発見）時は login 処理を行います
	     */

	  }, {
	    key: 'init',
	    value: function init() {
	      var token = User.token;
	      // console.log( `user init token [${token !== ''}]` );
	      if (token === null || typeof token === 'undefined' || token === '') {
	        User.sign = false;
	      } else {
	        User.login(token);
	      }
	    }
	    /**
	     * ログインユーザー情報
	     * @return {UserDae} ログインユーザー情報を返します
	     * @since 2016-11-05
	     */

	  }, {
	    key: 'info',
	    value: function info() {
	      return information;
	    }
	    /**
	     * ログインユーザー情報を設定します
	     * @param {UserDae} info ログインユーザー情報
	     * @since 2016-11-05
	     */

	  }, {
	    key: 'setInfo',
	    value: function setInfo(info) {
	      information = info;
	    }
	  }, {
	    key: 'sign',

	    // /**
	    //  * static class です, instance を作成しません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'User is static Class. not use new User().' );
	    //
	    //   }
	    //
	    // }
	    // ---------------------------------------------------
	    //  GETTER / SETTER
	    // ---------------------------------------------------
	    /**
	     * sign in / out 状態を表します
	     * @return {boolean} sign in / out 状態を返します
	     */
	    get: function get() {
	      // return _sign;
	      // 開発フェーズは簡易的に変数管理していたが
	      // cookie token 管理へ移行する
	      return User.token !== null;
	    }
	    /**
	     * sign in / out 状態を表します
	     * - true: sign in です
	     * @param {boolean} bool sign in / out 状態の真偽値, true: sign in
	     */
	    ,
	    set: function set(bool) {
	      // bool = !!bool;
	      //
	      if (bool) {
	        _UserStatus.UserStatus.factory().login();
	      } else {
	        _UserStatus.UserStatus.factory().logout();
	      }
	    }
	    /**
	     * cookie より user token を取り出します<br>
	     * 見つからない時は null になります
	     * @return {string|null} token を返します, 見つからない時はnullを返します
	     */

	  }, {
	    key: 'token',
	    get: function get() {
	      return _Cookie.Cookie.get(_Cookie.Cookie.TARGET);
	    }
	  }]);
	  return User;
	}();

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Cookie = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// let _symbol = Symbol();

	/**
	 * cookie を取得・削除・設定します
	 * - 全て static です
	 */
	var Cookie = exports.Cookie = function () {
	  function Cookie() {
	    (0, _classCallCheck3.default)(this, Cookie);
	  }

	  (0, _createClass3.default)(Cookie, null, [{
	    key: 'get',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * cookie value を取得します
	     * @param {string} keyName cookie key name
	     * @return {string|null} cookie 値を返します、取得できない時は null を返します
	     */
	    value: function get(keyName) {
	      // console.log( 'get ', keyName, document.cookie.replace( new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent( keyName ).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1') );
	      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(keyName).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
	    }
	    /**
	     * cookie を保存します
	     * @param {string} value 保存値
	     * @param {string} [keyName=Cookie.TARGET] cookie 名称
	     * @param {Date} [end] expires date 90days 1000 * 60 * 60 * 24 * 90
	     * @param {string} [path='/'] cookie 指定したパスが設定されます
	     * @param {string} [domain=''] ドメイン, 特定するときは example.com or subdomain.example.com と指定します。 default は **現在のドメイン**
	     * @param {boolean} [secure=false] https通信のときのみ、クッキーが送信されます
	     * @return {boolean} 保存 成功か否かの真偽値 を返します
	     */

	  }, {
	    key: 'save',
	    value: function save(value) {
	      var keyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Cookie.TARGET;
	      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date(Date.now() + 1000 * 60 * 60 * 24 * 90);
	      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
	      var domain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
	      var secure = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

	      value = _Safety.Safety.string(value, '');
	      keyName = _Safety.Safety.string(keyName, Cookie.TARGET);
	      path = _Safety.Safety.string(path, '/');
	      domain = _Safety.Safety.string(domain, '');

	      path = path !== '' ? '; path=' + path : '';
	      domain = domain !== '' ? '; domain=' + domain : '';
	      var secureSetting = secure ? '; secure' : '';

	      // cookie へ保存
	      // console.log( 'save ', value, keyName, end.toUTCString(), domain, path, secure );
	      document.cookie = encodeURIComponent(keyName) + '=' + encodeURIComponent(value) + '; expires=' + end.toUTCString() + domain + path + secureSetting;
	      return true;
	    }
	    /**
	     * 指定名称の cookie が存在するかを調べます
	     * @param {string} keyName 調査対象 cookie 名称
	     * @return {boolean} cookie が存在するかの真偽値 を返します
	     */

	  }, {
	    key: 'has',
	    value: function has(keyName) {
	      return Cookie.get(keyName) !== null;
	    }
	    /**
	     * 指定名称の cookie を削除します
	     * @param {string} keyName cookie 名称
	     * @param {string} [path='/'] cookie 指定したパスが設定されます
	     * @param {string} [domain=''] ドメイン, 特定するときは example.com or subdomain.example.com と指定します。 default は **現在のドメイン**
	     * @return {boolean} 削除 成功か否かの真偽値 を返します
	     */

	  }, {
	    key: 'remove',
	    value: function remove() {
	      var keyName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Cookie.TARGET;
	      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
	      var domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	      if (Cookie.has(keyName)) {
	        return Cookie.save('', keyName, new Date(), path, domain);
	      }
	      return false;
	    }
	  }, {
	    key: 'TARGET',

	    // /**
	    //  * cookie を取得・削除・設定します
	    //  * static class です, instance を作成しません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Cookie is static Class. not use new Cookie().' );
	    //
	    //   }
	    //
	    // }
	    // ---------------------------------------------------
	    //  GETTER / SETTER
	    // ---------------------------------------------------
	    /**
	     * token cookie name
	     * @const TARGET
	     * @return {string} cookie key name を返します
	     */
	    get: function get() {
	      return 'auth_token';
	    }
	    /**
	     * Syn. menu を開いた時にセットする cookie name
	     * @const SYN
	     * @return {string} Syn. menu を開いた時にセットする cookie name を返します
	     */

	  }, {
	    key: 'SYN',
	    get: function get() {
	      return 'visited';
	    }
	    /**
	     * 初めての訪問 cookie name
	     * @const EVER_BEEN
	     * @return {string} been 初めての訪問 cookie name を返します
	     */

	  }, {
	    key: 'EVER_BEEN',
	    get: function get() {
	      return 'been';
	    }

	    /**
	     * @const APP_BANNER
	     * @return {string} app_banner アプリバーアナー cookie name を返します
	     */

	  }, {
	    key: 'APP_BANNER',
	    get: function get() {
	      return 'app_banner';
	    }
	  }]);
	  return Cookie;
	}(); /**
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

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserStatus = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Singleton を保証するための Symbol
	/**
	 * {@link UserStatus} inner symbol
	 * @type {symbol}
	 */
	var userStatusSymbol = (0, _symbol2.default)('UserStatus singleton Symbol');
	// Singleton instance
	/**
	 * {@link UserStatus} singleton instance
	 * @type {?UserStatus}
	 */
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

	var singletonInstance = null;

	/**
	 * ログイン / ログアウト を通知
	 *
	 * Singleton class です `new` 演算子での instance 作成はできません
	 *
	 * @example
	 * const userStatus = UserStatus.factory();
	 *
	 *  */

	var UserStatus = exports.UserStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(UserStatus, _EventDispatcher);
	  (0, _createClass3.default)(UserStatus, null, [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {UserStatus} UserStatus instance を返します
	     */
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new UserStatus(userStatusSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * ログイン / ログアウト を通知する SingleTon
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @return {UserStatus} UserStatus インスタンスを返します
	     */

	  }, {
	    key: 'LOG_IN',

	    // ---------------------------------------------------
	    //  STATIC CONST
	    // ---------------------------------------------------
	    /**
	     * LOG_IN event
	     * @event LOG_IN
	     * @return {string} LOG_IN event type を返します
	     */
	    get: function get() {
	      return 'logIn';
	    }
	    /**
	     * LOG_OUT event
	     * @event LOG_OUT
	     * @return {string} LOG_OUT event type を返します
	     */

	  }, {
	    key: 'LOG_OUT',
	    get: function get() {
	      return 'logOut';
	    }
	  }]);

	  function UserStatus(target) {
	    var _ret2;

	    (0, _classCallCheck3.default)(this, UserStatus);

	    if (userStatusSymbol !== target) {
	      throw new Error('UserStatus is static Class. not use new UserStatus().');
	    }
	    if (singletonInstance !== null) {
	      var _ret;

	      return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	    }
	    // ------
	    // do once

	    var _this = (0, _possibleConstructorReturn3.default)(this, (UserStatus.__proto__ || (0, _getPrototypeOf2.default)(UserStatus)).call(this));

	    singletonInstance = _this;

	    return _ret2 = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret2);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * UserStatus.LOG_IN event を fire します
	   */


	  (0, _createClass3.default)(UserStatus, [{
	    key: 'login',
	    value: function login() {
	      this.dispatch({ type: UserStatus.LOG_IN, sign: true });
	    }
	    /**
	     * UserStatus.LOG_OUT event を fire します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.dispatch({ type: UserStatus.LOG_OUT, sign: false });
	    }
	  }]);
	  return UserStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UsersSelf = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ActionAuth2 = __webpack_require__(113);

	var _Api = __webpack_require__(121);

	var _User = __webpack_require__(109);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * <p>ユーザー情報・マイページの表示に利用</p>
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
	    var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    (0, _classCallCheck3.default)(this, UsersSelf);
	    return (0, _possibleConstructorReturn3.default)(this, (UsersSelf.__proto__ || (0, _getPrototypeOf2.default)(UsersSelf)).call(this, _User.User.token, _Api.Api.users('self'), resolve, reject));
	  }

	  return UsersSelf;
	}(_ActionAuth2.ActionAuth); /**
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

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ActionAuth = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Action2 = __webpack_require__(114);

	var _User = __webpack_require__(109);

	var _Token = __webpack_require__(119);

	var _Safety = __webpack_require__(24);

	var _Result = __webpack_require__(115);

	var _Types = __webpack_require__(120);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * <p>Ajax 処理を行います</p>
	 *
	 * <p>token あり（要認証） Ajax 処理を行います</p>
	 *
	 * <p>Template Pattern として使用します<br>
	 * 各 Class で extends して下さい</p>
	 */
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
	    var resolve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    var reject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	    var ResultClass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Result.Result;
	    (0, _classCallCheck3.default)(this, ActionAuth);

	    if (!_User.User.sign) {
	      // not login
	      throw new Error('Authorization required.');
	    }

	    /**
	     * <p>token ありリクエストに使用する Fetch.Header object</p>
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	     * @type {Object}
	     * @protected
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionAuth.__proto__ || (0, _getPrototypeOf2.default)(ActionAuth)).call(this, types, resolve, reject, ResultClass));

	    _this._headers = _Token.Token.token(token);
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * <p>token ありリクエストに使用する Fetch.Header object</p>
	   * <p>{@link Token} Class `Token.token` 関数で作成します</p>
	   * @return {Object} headers へセットする Object を返します
	   */


	  (0, _createClass3.default)(ActionAuth, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * Ajax request を開始します
	     * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
	     */
	    value: function start() {
	      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.method;

	      method = _Safety.Safety.string(method, this.method);
	      this.ajax.start(this.url, method, this.boundSuccess, this.boundFail, this.resultClass, this.headers);
	    }
	  }, {
	    key: 'headers',
	    get: function get() {
	      return this._headers;
	    }
	  }]);
	  return ActionAuth;
	}(_Action2.Action);

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Action = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Result = __webpack_require__(115);

	var _Safety = __webpack_require__(24);

	var _Ajax = __webpack_require__(116);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {Types} from '../net/Types';

	// interface
	// 基本機能を設定し Interface として使用します

	/**
	 * Ajax 処理を行います
	 *
	 * Ajax 処理を行う Template Pattern として使用し
	 * 各実装 Class で extends （継承）します
	 *
	 * - token（認証）が必要な場合は {@link ActionAuth} を使用します
	 * - データ送信を伴う (POST, PUT, DELETE)場合は {@link ActionBehavior}, {@link ActionAuthBehavior} を使用します
	 * - リクエストに offset, length が必要な時は {@link Offset} Class を継承します
	 *
	 * @example
	 * class Offset extends Action {
	 *  constructor(types, resolve = null, reject = null, offset = 0, length = Length.archive, ResultClass = Result) {
	 *    super(types, resolve, reject);
	 *  }
	 * }
	 */
	var Action = exports.Action = function () {
	  /**
	   * Ajax 処理, query なし<br>
	   * 1回だけのリクエストに使用します
	   * @param {Types} types Types instance, Ajax request に使用します
	   * @param {?Function} [resolve=null] Ajax 成功時の callback
	   * @param {?Function} [reject=null] Ajax 失敗時の callback
	   * @param {Result} [ResultClass=Result] 成功結果をセットします
	   */
	  function Action(types) {
	    var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    var ResultClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Result.Result;
	    (0, _classCallCheck3.default)(this, Action);

	    /**
	     * API url, path option, query 情報を引数から保持します
	     * @type {Types}
	     * @protected
	     */
	    this._types = types;
	    /**
	     * Ajax 成功時の callback を引数から保持します
	     * @type {?Function}
	     * @protected
	     */
	    this._resolve = resolve;
	    /**
	     * Ajax 失敗時の callback を引数から保持します
	     * @type {?Function}
	     * @protected
	     */
	    this._reject = reject;
	    /**
	     * <p>Ajax instance を保持します<br>
	     * `start` 時に各種パラメタを設定します</p>
	     * @type {Ajax}
	     * @protected
	     */
	    this._ajax = new _Ajax.Ajax();
	    /**
	     * API path を types 引数から取り出します
	     * @type {string}
	     * @protected
	     */
	    this._url = types.url;
	    /**
	     * API path を types 引数から取り出します
	     * - alias - `this._url`
	     * @type {string}
	     * @since 2018-01-11
	     */
	    this.path = types.url;
	    /**
	     * API リクエスト時の method( GET, POST, PUT, DELETE )を types 引数から取り出します
	     * @type {string}
	     * @protected
	     */
	    this._method = types.method;
	    /**
	     * Ajax 成功時に処理する Class を保持します
	     * @type {*|Result}
	     * @protected
	     */
	    this._resultClass = ResultClass;
	    /**
	     * <p>Ajax 成功時の callback<br>
	     * this.success を bind します</p>
	     * @type {Function}
	     * @protected
	     */
	    this._boundSuccess = this.success.bind(this);
	    /**
	     * <p>Ajax 失敗時の callback<br>
	     * this.fail を bind します</p>
	     * @type {Function}
	     * @protected
	     */
	    this._boundFail = this.fail.bind(this);
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
	      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.method;

	      method = _Safety.Safety.string(method, this.method);
	      this.ajax.start(this.url, method, this.boundSuccess, this.boundFail, this.resultClass);
	    }
	    /**
	     * Ajax success callback
	     * @param {Result} result Ajax成功結果 data
	     */

	  }, {
	    key: 'success',
	    value: function success(result) {
	      // success
	      var resolve = this.resolve;
	      if (typeof resolve === 'function') {
	        resolve(result);
	      }
	    }
	    /**
	     * Ajax error callback
	     * @param {Error} error Ajax失敗結果 Error instance
	     */

	  }, {
	    key: 'fail',
	    value: function fail(error) {
	      // error
	      var reject = this.reject;
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
	     * url をを設定します
	     * @param {string} url API path
	     */
	    ,
	    set: function set(url) {
	      this._url = url;
	      this.path = url;
	    }
	    /**
	     * GET|POST|DELETE|PUT form method を返します
	     * @return {string|*} method, GET|POST|DELETE|PUT... を返します
	     */

	  }, {
	    key: 'method',
	    get: function get() {
	      return this._method;
	    }
	    /**
	     * Types instance, Ajax request に使用します
	     * - path, method 情報などが格納されています
	     * @return {Types} Ajax request に使用する Types instance を返します
	     */

	  }, {
	    key: 'types',
	    get: function get() {
	      return this._types;
	    }
	    /**
	     * 引数 resolve から設定された Ajax 成功時のコールバック関数
	     * - 成功時に call します
	     * @return {?Function} 引数 resolve から設定された Ajax 成功時のコールバック関数を返します
	     */

	  }, {
	    key: 'resolve',
	    get: function get() {
	      return this._resolve;
	    }
	    /**
	     * 引数 reject から設定された Ajax 失敗時のコールバック関数
	     * - 失敗時に call します
	     * @return {?Function} 引数 reject から設定された Ajax 失敗時のコールバック関数を返します
	     */

	  }, {
	    key: 'reject',
	    get: function get() {
	      return this._reject;
	    }
	    /**
	     * Ajax instance
	     * API リクエスト時に使用します
	     * @example
	     * this.ajax.start(url, method, resolve, reject, ResultClass, headers, formData);
	     *
	     * @return {Ajax} API リクエスト時に使用する Ajax instance を返します
	     */

	  }, {
	    key: 'ajax',
	    get: function get() {
	      return this._ajax;
	    }
	    // /**
	    //  * Ajax instance を設定します
	    //  * @param {Ajax} ajax
	    //  */
	    // set ajax( ajax:Ajax ):void {
	    //   this._ajax = ajax;
	    // }
	    /**
	     * このクラスの Ajax 成功時のコールバック関数
	     * - Ajax Class から成功時に call されます
	     * @return {Function} このクラスの Ajax 成功時のコールバック関数を返します
	     */

	  }, {
	    key: 'boundSuccess',
	    get: function get() {
	      return this._boundSuccess;
	    }
	    /**
	     * このクラスの Ajax 失敗時のコールバック関数
	     * - Ajax Class から失敗時に call されます
	     * @return {Function} このクラスの Ajax 失敗時のコールバック関数を返します
	     */

	  }, {
	    key: 'boundFail',
	    get: function get() {
	      return this._boundFail;
	    }
	    /**
	     * 成功結果をセットする data Class
	     * @return {Result} 成功結果をセットする data Class を返します
	     */

	  }, {
	    key: 'resultClass',
	    get: function get() {
	      return this._resultClass;
	    }
	  }]);
	  return Action;
	}();

	// net
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

	// data

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Result = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	/**
	 * Ajax 結果を成功時に保存します
	 * - success event handler で結果(Result instance)を受け取れます
	 *
	 * ```
	 * const success = (result) => {
	 *   // response section 取得
	 *   response.response
	 *   // status section 取得
	 *   response.status
	 * }
	 * ```
	 * */
	var Result =
	/**
	 * Ajax 成功時にdataを保存します<br>
	 *
	 * @param {{status: *, response: *}} [json={}] json パース後データ
	 */
	exports.Result = function Result() {
	  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  (0, _classCallCheck3.default)(this, Result);

	  /**
	   * json パース後データ
	   * @type {{status: *, response: *}}
	   */
	  this.json = json;
	  /**
	   * alias `json`
	   * - parsed JSON プロパティ
	   * @type {{status: *, response: *}}
	   */
	  this.data = json;
	  var response = json.response;
	  /**
	   * 取得 JSON response section
	   * - 見つからない時は undefined になります
	   * @type {*}
	   */
	  this.response = response;
	  /**
	   * response.articles
	   * @type {?Array.<*>}
	   */
	  this.articles = response && Array.isArray(response.articles) ? response.articles : null;
	  var count = response && response.count ? response.count : 0;
	  var total = parseInt(count, 10);
	  /**
	   * alias count - response.count - 件数
	   * @type {number}
	   */
	  this.total = isNaN(total) ? 0 : total;
	  /**
	   * response.count - 件数 - number 保証しません - total を使用してください
	   * @type {number}
	   */
	  this.count = count;
	  /**
	   * JSON.status
	   * @type {{code: number, user_massage: string, developer_message: string}}
	   */
	  this.status = json.status;
	  /**
	   * JSON.request
	   * @type {{offset: Number, length: number}}
	   */
	  this.request = json.request;
	}
	// ---------------------------------------------------
	//  GETTER / SETTER
	// ---------------------------------------------------
	// /**
	//  * parsed JSON プロパティ
	//  * @return {Object} パース済み JSON(Object) を返します
	//  */
	// get data():Object {
	//   return this._json;
	// }
	// /**
	//  * 取得 JSON response section
	//  * @return {Object|undefined} 取得 JSON response section を返します、見つからない時は undefined を返します
	//  */
	// get response():Object {
	//   return this.data.response;
	// }
	// /**
	//  * 取得 JSON response.articles
	//  * @return {Array|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
	//  */
	// get articles():Array {
	//   let response = this.response;
	//   let articles;
	//   // response.articles を調べる
	//   // 1. response 存在チェック
	//   // 2. response に articles key が存在する
	//   // 3. response.articles が配列
	//   if ( !!response && response.hasOwnProperty( 'articles' ) && Array.isArray( response.articles ) ) {
	//     articles = response.articles;
	//   }
	//
	//   return articles;
	// }
	// /**
	//  * 取得 JSON response.count
	//  * @return {Number|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
	//  */
	// get total():Number {
	//   const response = this.response;
	//   // let total;
	//
	//   // if ( !!response && response.hasOwnProperty( 'count' ) ) {
	//   //   total = parseInt( response.count, 10 );
	//   // }
	//   if (!response || !response.count) {
	//     return 0;
	//   }
	//
	//   return parseInt(response.count, 10);
	// }
	// /**
	//  * alias total, 取得 JSON response.count
	//  * @return {Number|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
	//  */
	// get count():Number {
	//   return this.total;
	// }
	// /**
	//  * 取得 JSON status section
	//  * @return {{code: Number, user_massage: string,developer_message: string}|undefined} response.status を返します、見つからない時は undefined を返します
	//  */
	// get status():Object {
	//   return this.data.status;
	// }
	// /**
	//  * request offset, length を返します
	//  * @return {{offset: Number, length: Number}|undefined} 取得 JSON request section を返します、見つからない時は undefined を返します
	//  */
	// get request():Object {
	//   return this.data.request;
	// }
	;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ajax = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Codes = __webpack_require__(117);

	var _Codes2 = _interopRequireDefault(_Codes);

	var _Result = __webpack_require__(115);

	var _StatusDae = __webpack_require__(118);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 非同期通信でJSONを取得します
	 * - Fetch API を使用し通信を行います
	 * - Action 系 Class で extends し使用します - **直接実行することはありません**
	 * @see https://github.com/github/fetch
	 * @see https://developers.google.com/web/updates/2015/03/introduction-to-fetch
	 */

	// data
	var Ajax = exports.Ajax = function () {
	  /**
	   * Ajax instanceを作成し、実行可能プロパティを可能に設定します
	   */
	  function Ajax() {
	    (0, _classCallCheck3.default)(this, Ajax);

	    /**
	     * Ajax request 実行可否判断 flag
	     * - 二重送信を防止するために使用します
	     * - true: 実行可能
	     * - false: 実行不可
	     * @type {boolean}
	     * @private
	     */
	    this._can = true;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * リクエストが可能かを取得します
	   * - W click などで二重送信になるのを防ぎます
	   * @return {boolean} 実行可否 flag を返します
	   */


	  (0, _createClass3.default)(Ajax, [{
	    key: 'start',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * Ajax request を開始します
	     * @param {string} url request URL
	     * @param {string} method POST|GET...
	     * @param {Function} resolve success callback
	     * @param {Function} reject fail callback
	     * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
	     * @param {Object} [headers=null] headers option, Authorization token など...
	     * @param {FormData} [formData=null] FormData Object
	     */
	    value: function start(url, method, resolve, reject) {
	      var ResultClass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Result.Result;

	      var _this = this;

	      var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
	      var formData = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

	      var fetch = self.fetch;
	      // let _this = this;

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
	        cache: 'no-cache',
	        // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
	        // credentials: 'include'
	        credentials: 'same-origin'
	      };

	      // body へ FormData をセット
	      if (formData !== null && typeof formData !== 'undefined') {
	        option.body = formData;
	      }

	      // headers option
	      // headers が null or undefined の時は 追加しません
	      if (headers !== null && typeof headers !== 'undefined') {
	        option.headers = headers;
	      }

	      // console.log(`Ajax.start: ${url}, ${method}`, option);

	      // https://github.com/github/fetch
	      // request を開始します
	      fetch(url, option).then(function (response) {
	        // check status (Server)
	        var status = response.status;
	        // console.log('Ajax.then response', response);
	        if (status >= 200 && status < 300) {
	          // may be ok
	          return response;
	        }
	        // bad response, サーバーからのエラーメッセージ
	        var error = new Error('status:' + status + ', message:' + response.statusText);

	        error.result = new ResultClass(response.json());
	        error.status = new _StatusDae.StatusDae(status);
	        throw error;
	      }).then(function (response) {
	        // parse JSON
	        return response.json();
	      }).then(function (json) {
	        // parsed JSON
	        var result = new ResultClass(json);
	        // console.log('Ajax.then result', result);
	        if (!_Codes2.default.status(result.status.code)) {
	          // something bad
	          var code = result.status.code;
	          var _error = new Error('status:' + code + ', user:' + result.status.user_message + ', dev:' + result.status.developer_message);
	          _error.result = result;
	          _error.status = new _StatusDae.StatusDae(result.status);
	          throw _error;
	        }

	        // success callback
	        _this.enable();
	        resolve(result);
	        return result;
	      }).catch(function (error) {
	        // 何か問題発生
	        // 注意！Promise が永遠に続くので Dom rendering error でもここに戻る
	        // error callback
	        // console.log('Ajax.then error', error);
	        _this.enable();
	        reject(error);
	        return error;
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
	// dae
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

	// import {Env} from '../app/Env';

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CodesStatus = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// /**
	//  * Ajax コードステータス: English
	//  * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
	//  * @private
	//  */
	// const en = {
	//   200: 'OK',
	//   201: 'Created',
	//   202: 'Accepted',
	//   204: 'No Content',
	//
	//   400: 'Bad Request',
	//   401: 'Unauthorized',
	//   403: 'Forbidden',
	//   404: 'Not Found',
	//   405: 'Method Not Allowed',
	//   409: 'Conflict',
	//   415: 'Unsupported Media Type',
	//   429: 'Too Many Requests',
	//   500: 'Internal Server Error',
	//   502: 'Service Unavailable'
	// };
	// /**
	//  * Ajax コードステータス: Japanese
	//  * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
	//  * @private
	//  */
	// const jp = {
	//   200: '成功',
	//   201: '新しいリソースを作成した',
	//   202: 'リクエストを受け付けた',
	//   204: '内容なし',
	//
	//   400: 'エラー',
	//   401: '認証エラー',
	//   403: 'アクセス禁止',
	//   404: 'リソースが存在しない',
	//   405: 'メソッドが間違っている',
	//   409: 'リソースが競合している',
	//   415: '指定されたメディアタイプがサポートされていない',
	//   429: 'リクエストの回数制限に引っかかる',
	//   500: 'サーバ側の問題',
	//   502: '一時的にサービス出来ない'
	// };

	// let _symbol = Symbol();

	/**
	 * Ajax status code message - code No. 対応メッセージを管理します
	 */
	var CodesStatus = exports.CodesStatus = function () {
	  function CodesStatus() {
	    (0, _classCallCheck3.default)(this, CodesStatus);
	  }

	  (0, _createClass3.default)(CodesStatus, null, [{
	    key: 'en',

	    /**
	     * Ajax コードステータス: English
	     * @return {{'200': string, '201': string, '202': string, '204': string, '400': string, '401': string, '403': string, '404': string, '405': string, '409': string, '415': string, '429': string, '500': string, '502': string}}
	     * Ajax コードステータス: English リスト
	     */
	    get: function get() {
	      return {
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
	    }

	    /**
	     * Ajax コードステータス: Japanese
	     * @return {{'200': string, '201': string, '202': string, '204': string, '400': string, '401': string, '403': string, '404': string, '405': string, '409': string, '415': string, '429': string, '500': string, '502': string}}
	     * Ajax コードステータス: Japanese リスト
	     */

	  }, {
	    key: 'jp',
	    get: function get() {
	      return {
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
	  }]);
	  return CodesStatus;
	}();

	/**
	 * API Response Code を管理します
	 * - ステータスコード・メッセージを日本語と英語で保存しています
	 */


	var Codes = function () {
	  function Codes() {
	    (0, _classCallCheck3.default)(this, Codes);
	  }

	  (0, _createClass3.default)(Codes, null, [{
	    key: 'status',

	    // /**
	    //  * ステータスコード・メッセージを日本語と英語で保存しています
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Codes is static Class. not use new Codes().' );
	    //
	    //   }
	    //
	    // }
	    /**
	     * status codeからリクエストの成功・失敗を判断します
	     * - status code が >= 200 < 300 の間が成功です。
	     * @param {number} statusCode サーバーからのレスポンスコード int型
	     * @return {boolean} statusCodeが成功したか(true)失敗(false)を調べ返します
	     */
	    value: function status(statusCode) {
	      return statusCode >= 200 && statusCode < 300;
	    }
	    /**
	     * status codeの意味（メッセージ）を調べます
	     * @param {number} code サーバーからのresponse status code
	     * @return {{jP: string, en: string}} status codeの意味を返します {en: string|*, jp: string|*}
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
	     * @param {number} code status code
	     * @return {*} 日本語メッセージを返します
	     */

	  }, {
	    key: 'jp',
	    value: function jp(code) {
	      return CodesStatus.jp[code];
	    }

	    /**
	     * code から 英語メッセージを調べます
	     * @param {number} code status code
	     * @return {*} 英語メッセージを返します
	     */

	  }, {
	    key: 'en',
	    value: function en(code) {
	      return CodesStatus.en[code];
	    }
	  }]);
	  return Codes;
	}();

	exports.default = Codes;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StatusDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * JSON.status
	 */
	var StatusDae = exports.StatusDae = function () {
	  /**
	   * JSON.status
	   * @param {Object} [status={}] JSON.status
	   */
	  function StatusDae() {
	    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, StatusDae);

	    status = _Safety.Safety.object(status);
	    /**
	     * JSON.status
	     * @type {Object}
	     * @protected
	     */
	    this._status = status;
	  }
	  /**
	   * JSON.status
	   * @return {Object|*} JSON.status を返します
	   */


	  (0, _createClass3.default)(StatusDae, [{
	    key: 'status',
	    get: function get() {
	      return this._status;
	    }
	    /**
	     * status.code
	     * @return {Number} status.code を返します
	     */

	  }, {
	    key: 'code',
	    get: function get() {
	      return this.status.code;
	    }
	    /**
	     * status.user_message
	     * @return {string} status.user_message を返します
	     */

	  }, {
	    key: 'userMessage',
	    get: function get() {
	      return this.status.user_message;
	    }
	    /**
	     * status.developer_message
	     * @return {string} status.developer_message を返します
	     */

	  }, {
	    key: 'developerMessage',
	    get: function get() {
	      return this.status.developer_message;
	    }
	  }]);
	  return StatusDae;
	}(); /**
	      * Copyright (c) 2011-2016 inazumatv.com, inc.
	      * @author (at)taikiken / http://inazumatv.com
	      * @date 2016/02/25 - 17:35
	      *
	      * Distributed under the terms of the MIT license.
	      * http://www.opensource.org/licenses/mit-license.html
	      *
	      * This notice shall be included in all copies or substantial portions of the Software.
	      *
	      */

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Token = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// let _symbol = Symbol();

	/**
	 * `Fetch` Request Headers [token] を作成します
	 * - 全て static
	 */
	var Token = function () {
	  function Token() {
	    (0, _classCallCheck3.default)(this, Token);
	  }

	  (0, _createClass3.default)(Token, null, [{
	    key: 'token',

	    // /**
	    //  * <p>Authorization token を作成します</p>
	    //  * static class です、instance を作成できません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Api is static Class. not use new Api().' );
	    //
	    //   }
	    //
	    // }
	    /**
	     * Ajax request の時に Fetch.Header にセットする Authorization を作成します
	     * @param {string} token auth token
	     * @param {Object} [option={}] headers object, ない時は新規に作ります
	     * @return {*} headers へセットする Object を返します
	     */
	    value: function token(_token) {
	      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      // token が正しい形式でない時は null を返します
	      if (_token === null || typeof _token === 'undefined' || _token === '') {
	        return null;
	      }

	      var altOption = _Safety.Safety.object(option);
	      altOption.Authorization = 'OAuth realm=undotsushin.com, oautn_token=' + _token;
	      // option.Accept = 'application/json';
	      // option[ 'Access-Control-Allow-Origin"' ] = '*';
	      /*
	          option = new Headers();
	          option.append( 'Authorization', `OAuth realm=undotsushin.com, oautn_token=${token}` );
	          option.append( 'Access-Control-Allow-Origin', '*' );
	      */
	      return altOption;
	    }
	  }]);
	  return Token;
	}(); /**
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

	exports.Token = Token;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Types = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// import {Type} from './types/Type';
	// import {Permalink} from './types/Permalink';
	// import {Queries} from './types/Queries';

	/**
	 * API url, path option, query 情報を保持します
	 */
	var Types = exports.Types = function () {
	  /**
	   * API url, path option, query 情報
	   * @param {Type} type Type instance, url, method を 保持します
	   * @param {Permalink} permalink Permalink instance, Types.url へ追加可能なpathがあるかどうかを管理します
	   * @param {Queries} queries Queries instance, Query{key: value} を配列で管理します
	   * @param {boolean} [auth=false] 認証が必要か否かの真偽値
	   */
	  function Types(type, permalink, queries) {
	    var auth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    (0, _classCallCheck3.default)(this, Types);

	    /**
	     * url, method を 保持する Type instance
	     * @type {Type}
	     */
	    this.type = type;
	    /**
	     * Permalink instance, Types.url へ追加可能なpathがあるかどうかを管理します
	     * @type {Permalink}
	     */
	    this.permalink = permalink;
	    /**
	     * Queries instance, Query{key: value} を配列で管理します
	     * @type {Queries}
	     */
	    this.queries = queries;
	    /**
	     * 認証が必要か否かの真偽値
	     * @type {boolean}
	     */
	    this.auth = auth;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  // /**
	  //  * Type instance
	  //  * @return {Type} Type instance を返します
	  //  */
	  // get type() {
	  //   return this._type;
	  // }

	  /**
	   * Ajax request url
	   * @return {string} url を返します
	   */


	  (0, _createClass3.default)(Types, [{
	    key: "url",
	    get: function get() {
	      return this.type.url;
	    }
	    /**
	     * request method
	     * POST|GET|PUT|DELETE
	     * @return {string} method を返します
	     */

	  }, {
	    key: "method",
	    get: function get() {
	      return this.type.method;
	    }

	    // /**
	    //  * Permalink instance
	    //  * @return {Permalink} Permalink instance を返します
	    //  */
	    // get permalink() {
	    //   return this._permalink;
	    // }

	    // /**
	    //  * Queries instance
	    //  * @return {Queries} Queries instance を返します
	    //  */
	    // get queries() {
	    //   return this._queries;
	    // }

	    // /**
	    //  * 認証が必要か否
	    //  * @return {boolean} 認証が必要か否かの真偽値を返します。 true: 必要
	    //  */
	    // get auth() {
	    //   return this._auth;
	    // }

	  }]);
	  return Types;
	}();

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Api = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Types = __webpack_require__(120);

	var _User = __webpack_require__(109);

	var _ApiDae = __webpack_require__(122);

	var _ApiDae2 = _interopRequireDefault(_ApiDae);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// const _symbol = Symbol('');

	/**
	 * サーバーリクエストAPIを管理します
	 * - 全て static
	 */
	var Api = exports.Api = function () {
	  function Api() {
	    (0, _classCallCheck3.default)(this, Api);
	  }

	  (0, _createClass3.default)(Api, null, [{
	    key: 'rebuild',

	    // /**
	    //  * サーバーリクエストAPI
	    //  * static class です、instance を作成できません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Api is static Class. not use new Api().');
	    //
	    //   }
	    //
	    // }
	    /**
	     * `/api/` 前 domain を再生成します
	     * - test, develop 切り替えに使用します
	     * - `Api.rebuild()` を直接実行することは推奨しません
	     * - `App.test()`, `App.develop()`, `App.production()` を使用してください。
	     *
	     * @example
	     * // develop
	     * App.develop();
	     *
	     * // production
	     * App.production();
	     * @param {string} [root=''] リクエスト・ドメイン
	     */
	    value: function rebuild() {
	      var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      _ApiDae2.default.rebuild(root);
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
	      return _ApiDae2.default.api('users:login');
	    }
	    /**
	     * logout API を取得します
	     * @return {Types} logout API をTypes instanceで返します
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
	      return _ApiDae2.default.api('users:logout');
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
	      return _ApiDae2.default.api('users:add');
	    }
	    /**
	     * 退会
	     * @return {Types} 退会 API をTypes instanceで返します
	     */

	  }, {
	    key: 'leave',
	    value: function leave() {
	      return _ApiDae2.default.api('users:delete');
	    }
	    /**
	     * signup 時
	     * email が登録済みかを調べます
	     * @return {Types} email が登録済みかを調べる API をTypes instanceで返します
	     */

	  }, {
	    key: 'email',
	    value: function email() {
	      return _ApiDae2.default.api('users:email');
	    }
	    // ----------------------------------
	    // OAuth (sns)
	    /**
	     * SNS OAuth 認証のための遷移URL
	     * @param {string} sns twitter or facebook どちらか
	     * @return {Types} SNS OAuth 認証のための遷移URL をTypes instanceで返します
	     */

	  }, {
	    key: 'auth',
	    value: function auth(sns) {
	      switch (sns) {
	        case 'fb':
	        case 'facebook':
	          return _ApiDae2.default.api('auth:fb');

	        case 'tw':
	        case 'twitter':
	          return _ApiDae2.default.api('auth:tw');

	        default:
	          throw new Error('notice illegal action: ' + sns + '.');
	      }
	    }

	    /**
	     * auth 情報を取得する API
	     * @return {Types} auth 情報を取得する API をTypes instanceで返します
	     */

	  }, {
	    key: 'sns',
	    value: function sns() {
	      return _ApiDae2.default.api('auth:sns');
	    }

	    // ----------------------------------
	    // カテゴリー一覧
	    /**
	     * カテゴリー一覧
	     * @return {Types} カテゴリー一覧 API をTypes instanceで返します
	     */

	  }, {
	    key: 'categories',
	    value: function categories() {
	      return _ApiDae2.default.api('categories');
	    }
	    // ----------------------------------
	    // 特定のカテゴリー情報
	    /**
	     * 特定のカテゴリー情報を取得する
	     * ※主に企画モノの記事一覧ページを生成するにあたり利用する
	     *
	     * `/api/v1/category/[:category_slug]`
	     * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
	     * @returns {Types} 特定のカテゴリー情報
	     */

	  }, {
	    key: 'categorySlug',
	    value: function categorySlug() {
	      return _ApiDae2.default.api('category:slug');
	    }
	    // ----------------------------------
	    // home / self
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
	      return _ApiDae2.default.api('home');
	    }
	    /**
	     * ログイン済みユーザーのhome API
	     * @return {Types} ログイン済みユーザーのhome APIをTypes instanceで返します
	     */

	  }, {
	    key: 'selfAPi',
	    value: function selfAPi() {
	      return _ApiDae2.default.api('self');
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
	      return _ApiDae2.default.api('category');
	    }
	    // ----------------------------------
	    // 地域別記事
	    /**
	     * 地域別記事: 地域 API を取得します
	     * @returns {Types} 地域 API を Types instance で取得します
	     * @since 2017-08-29
	     */

	  }, {
	    key: 'area',
	    value: function area() {
	      return _ApiDae2.default.api('area');
	    }
	    /**
	     * 地域別記事: 都道府県 API を取得します
	     * @returns {Types} 都道府県 API を Types instance で取得します
	     * @since 2017-08-29
	     */

	  }, {
	    key: 'pref',
	    value: function pref() {
	      return _ApiDae2.default.api('pref');
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
	      return _ApiDae2.default.api('search');
	    }
	    // ----------------------------------
	    // 記事詳細
	    /**
	     * detail API （単一記事）を取得します
	     * @return {Types} detail API をTypes instanceで返します
	     */

	  }, {
	    key: 'single',
	    value: function single() {
	      return _ApiDae2.default.api('single');
	    }
	    /**
	     * @deprecated instead use Api.single
	     * @return {Types} detail API をTypes instanceで返します
	     */

	  }, {
	    key: 'detail',
	    value: function detail() {
	      // console.warn( 'Api.detail deprecated. instead use Api.single.');
	      return Api.single();
	    }
	    // ----------------------------------
	    // 次の記事詳細
	    /**
	     * 次の記事詳細を取得します
	     * @since 2016-09-24
	     * @return {Types} articles/{:article_id}/next API をTypes instanceで返します
	     */

	  }, {
	    key: 'singles',
	    value: function singles() {
	      return _ApiDae2.default.api('singles');
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
	          return _ApiDae2.default.api('bookmark:delete');

	        case 'add':
	          return _ApiDae2.default.api('bookmark:add');

	        default:
	          throw new Error('bookmark illegal action: ' + action);
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
	          return _ApiDae2.default.api('comment:official');

	        case 'normal':
	          return _ApiDae2.default.api('comment:normal');

	        case 'self':
	          return _ApiDae2.default.api('comment:self');

	        case 'single':
	          return _ApiDae2.default.api('comment:single');

	        case 'send':
	          return _ApiDae2.default.api('comment:send');

	        case 'reply':
	          return _ApiDae2.default.api('comment:reply');

	        case 'delete':
	        case 'send:delete':
	          return _ApiDae2.default.api('comment:send:delete');

	        case 'reply:delete':
	          return _ApiDae2.default.api('comment:reply:delete');

	        case 'good:add':
	          return _ApiDae2.default.api('comment:good:add');

	        case 'good:delete':
	          return _ApiDae2.default.api('comment:good:delete');

	        case 'bad:add':
	          return _ApiDae2.default.api('comment:bad:add');

	        case 'bad:delete':
	          return _ApiDae2.default.api('comment:bad:delete');

	        case '':
	          // コメント一覧全部
	          return _ApiDae2.default.api('comment');

	        default:
	          // console.warn( `comment illegal action: ${action}, instead use default` );
	          return _ApiDae2.default.api('comment');
	      }
	    }
	    /**
	     * コメント返信 を comment 関数から抽出
	     * @param {string} action path option を指定します
	     * @return {Types} comment API をTypes instanceで返します
	     */

	  }, {
	    key: 'replay',
	    value: function replay() {
	      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      switch (action) {
	        case 'delete':
	          return Api.comment('reply:delete');

	        case '':
	          return Api.comment('reply');

	        default:
	          // console.warn( `replay illegal action: ${action}, instead use default` );
	          return Api.comment('reply');
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
	          return _ApiDae2.default.api('users:self');

	        case 'id':
	          return _ApiDae2.default.api('users:id');

	        case 'self:bookmark':
	          return _ApiDae2.default.api('users:self:bookmark');

	        /*
	         無くなった様子
	        case 'id:bookmark':
	          return ApiDae.api('users:id:bookmark');
	         */

	        case 'activities':
	        case 'activity':
	          return _ApiDae2.default.api('users:self:activities');

	        case 'notifications':
	        case 'notice':
	          return _ApiDae2.default.api('users:self:notifications');

	        case 'notifications:read':
	        case 'notice:read':
	          return _ApiDae2.default.api('users:self:notifications:read');

	        case 'notifications:count':
	        case 'notice:count':
	          return _ApiDae2.default.api('users:self:notifications:count');

	        default:
	          throw new Error('users illegal action: ' + action + '.');
	      }
	    }
	    /**
	     * お知らせ API
	     * @param {string} action path option を指定します read | count | ''
	     * @return {Types} お知らせ系 users API を Types instance で返します
	     */

	  }, {
	    key: 'notice',
	    value: function notice() {
	      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      switch (action) {
	        case 'read':
	          return Api.users('notice:' + action);

	        case 'count':
	          return Api.users('notice:' + action);

	        case '':
	          return Api.users('notice');

	        default:
	          throw new Error('notice illegal action: ' + action + '.');
	      }
	    }
	    /**
	     * alias Api,notice, お知らせ API
	     * @param {string} action path option を指定します read | count | ''
	     * @return {Types} お知らせ系 users API を Types instance で返します
	     */

	  }, {
	    key: 'notifications',
	    value: function notifications(action) {
	      return Api.notice(action);
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
	          return _ApiDae2.default.api('users:settings:account');

	        case 'account:edit':
	          return _ApiDae2.default.api('users:settings:account:edit');

	        case 'interest':
	          return _ApiDae2.default.api('users:settings:interest');

	        case 'interest:edit':
	          return _ApiDae2.default.api('users:settings:interest:edit');
	        default:
	          throw new Error('settings illegal action: ' + action + '.');
	      }
	    }
	    /**
	     * `tag:t10` tag 取得 API
	     * @returns {string} tag API を返します
	     * @since 2018-01-09
	     */

	  }, {
	    key: 'tag',
	    value: function tag() {
	      return _ApiDae2.default.api('tag:t10');
	    }
	  }]);
	  return Api;
	}(); /**
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

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildPath = exports.apiRoot = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Env = __webpack_require__(123);

	var _Env2 = _interopRequireDefault(_Env);

	var _Path = __webpack_require__(124);

	var _Types = __webpack_require__(120);

	var _Type = __webpack_require__(125);

	var _Permalink = __webpack_require__(126);

	var _Queries = __webpack_require__(127);

	var _Query = __webpack_require__(128);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {Loc} from '../util/Loc';

	// test mode 時に api アクセス先を 0.0.0.0: + (port +2) へ
	// develop mode
	// - IP: 52.69.203.137
	// - HOST: undotsushin.com
	/**
	 * API リクエストの ホストをどこにするかを {@link Env}.mode を元に決定します
	 *  - 本番サーバーでは ホスト名は不要になります
	 *
	 * @return {string} API リクエストの ホストをプロトコル付で返します
	 * @private
	 * @static
	 */
	var apiRoot = exports.apiRoot = function apiRoot() {
	  // let n = parseInt( port, 10 );
	  switch (_Env2.default.mode) {
	    case _Env2.default.LOCAL:
	      return 'http://192.168.33.50';
	    case _Env2.default.TEST:
	      return 'http://www.undotsushin.local';
	    case _Env2.default.DEVELOP:
	      // return 'http://dev2.undotsushin.com';
	      // dev2 から正常値が返らなくなった 2016-04-25
	      return 'https://dev.sportsbull.jp';
	    // online
	    case _Env2.default.PRODUCTION:
	      return '';
	    // online
	    case _Env2.default.DEV:
	      return '';
	    // online
	    case _Env2.default.STG:
	      return '';
	    default:
	      // console.warn( `illegal option: ${Env.mode}. instead use production.` );
	      return '';
	  }
	};
	// https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=986840481
	// API 一覧より
	/**
	 * API リクエスト先を一元管理します
	 * - users:add
	 * - users:login
	 * - users:logout
	 * - users:email
	 * - auth:sns
	 * - auth:fb
	 * - auth:tw
	 * - categories
	 * - home
	 * - self
	 * - category
	 * - search
	 * - single
	 * - bookmark:add
	 * - bookmark:delete
	 * - comment
	 * - comment:official
	 * - comment:normal
	 * - comment:self
	 * - comment:single
	 * - comment:send
	 * - comment:reply
	 * - comment:reply:reply
	 * - comment:send:delete
	 * - comment:reply:delete
	 * - comment:good:add
	 * - comment:good:delete
	 * - comment:bad:add
	 * - comment:bad:delete
	 * - users:self
	 * - users:id
	 * - users:self:bookmark
	 * - users:self:activities
	 * - users:self:notifications
	 * - users:self:notifications:read
	 * - users:self:notifications:count
	 * - users:settings:account
	 * - users:settings:account:edit
	 * - users:settings:interest
	 * - users:settings:interest:edit
	 * - users:delete
	 * @param {string} [root=''] '/api/v1' 前につけるプロトコル+ホスト名
	 * @return {Types} Types instance を返します
	 * @private
	 */
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

	var buildPath = exports.buildPath = function buildPath() {
	  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  // 共通パス
	  // 先頭 protocol + host 部分を develop / production で変える
	  var API_ROOT = root === '' ? apiRoot() : root;
	  var API_PATH = API_ROOT + '/api/v1';

	  return {
	    // --------------------------------------------
	    // 登録
	    'users:add': new _Types.Types(new _Type.Type(API_PATH + '/users/', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // login / logout
	    'users:login': new _Types.Types(new _Type.Type(API_PATH + '/sessions/', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),
	    'users:logout': new _Types.Types(new _Type.Type(API_PATH + '/sessions/', 'DELETE'), new _Permalink.Permalink(), new _Queries.Queries()),

	    // email 登録済み? を調べる
	    'users:email': new _Types.Types(new _Type.Type(API_PATH + '/users/email/', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),

	    // ----------------------------------
	    // OAuth (sns)

	    // login by SNS
	    // API から auth 情報を取得する
	    'auth:sns': new _Types.Types(new _Type.Type(API_PATH + '/sessions/social'), new _Permalink.Permalink(), new _Queries.Queries()),

	    // https://github.com/undotsushin/undotsushin/issues/334#issuecomment-197198817
	    // 登録 by sns - Facebook
	    // auth 遷移するURL
	    'auth:fb': new _Types.Types(new _Type.Type(API_ROOT + '/api/v1/auth/facebook'),
	    /*
	    new Type( `${API_ROOT}/api/auth_facebook.php` ),
	    new Type( `http://www.undotsushin.com/api/auth_facebook.php` ),
	    */
	    new _Permalink.Permalink(), new _Queries.Queries()),
	    // 登録 by sns - Twitter
	    'auth:tw': new _Types.Types(new _Type.Type(API_ROOT + '/api/v1/auth/twitter'),
	    /*
	    new Type( `${API_ROOT}/api/v1/auth/twitter` ),
	    new Type( `http://www.undotsushin.com/api/auth_twitter.php` ),
	    */
	    new _Permalink.Permalink(), new _Queries.Queries()),

	    // --------------------------------------------
	    // カテゴリー一覧
	    'categories': new _Types.Types(new _Type.Type(API_PATH + '/category'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // --------------------------------------------
	    // 記事カテゴリー一覧
	    // /api/v1/category/[:category_slug]
	    // http://dev.undotsushin.com/api/v1/category/crazy
	    // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
	    // @since 2016-09-16
	    'category:slug': new _Types.Types(new _Type.Type(API_PATH + '/category'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // --------------------------------------------
	    // /area/地域/
	    // @since 2017-08-29
	    'area': new _Types.Types(new _Type.Type(API_PATH + '/articles/area'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // /area/地域/
	    // @since 2017-08-29
	    'pref': new _Types.Types(new _Type.Type(API_PATH + '/articles/pref'), new _Permalink.Permalink(), new _Queries.Queries()),
	    // --------------------------------------------
	    // home / self
	    // /api/v1/articles/home[/|/pickup|/headline]
	    'home': new _Types.Types(new _Type.Type(API_PATH + '/articles/home'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    'self': new _Types.Types(new _Type.Type(API_PATH + '/articles/self'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]), true),
	    // --------------------------------------------
	    // 記事一覧
	    // /api/v1/articles/category/{all|:category_slug}[/|/ranking|/video]
	    'category': new _Types.Types(new _Type.Type(API_PATH + '/articles/category'), new _Permalink.Permalink(['all', '*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    // --------------------------------------------
	    // 検索
	    // /api/vi/articles/search/{:keywords}
	    'search': new _Types.Types(new _Type.Type(API_PATH + '/articles/search'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    // --------------------------------------------
	    // 記事詳細
	    // /api/v1/articles/{:article_id}
	    'single': new _Types.Types(new _Type.Type(API_PATH + '/articles/' + _Path.Path.ARTICLE_ID), new _Permalink.Permalink(['*'], true), new _Queries.Queries()),
	    // --------------------------------------------
	    // 次の記事詳細
	    // /api/v1/articles/{:article_id}/next?offset=NN&length=10
	    // @since 2016-09-24
	    'singles': new _Types.Types(new _Type.Type(API_PATH + '/articles/' + _Path.Path.ARTICLE_ID + '/next'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
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
	    'comment': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    // 記事への公式コメントを人気順で取得する
	    // /api/v1/comments/article/{:article_id}/official
	    'comment:official': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/official'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    // 記事へのみんなのコメントを人気順で取得する
	    // /api/v1/comments/article/{:article_id}/normal
	    'comment:normal': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/normal'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    // 自分のコメントを取得する
	    // /api/v1/comments/article/{:article_id}/self
	    'comment:self': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/self'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
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
	    // コメント返信
	    // /api/v1/comments/article/{:article_id}/{:comment_id}
	    'comment:reply:reply': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/' + _Path.Path.COMMENT_ID + '/' + _Path.Path.REPLY_ID, 'POST'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('body', 'number', '', true)]), true),
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
	    'comment:reply:delete': new _Types.Types(new _Type.Type(API_PATH + '/comments/article/' + _Path.Path.ARTICLE_ID + '/' + _Path.Path.COMMENT_ID + '/' + _Path.Path.REPLY_ID, 'DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
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
	    'users:self:bookmark': new _Types.Types(new _Type.Type(API_PATH + '/users/self/bookmark'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    // user_idに該当するユーザーのブックマークを取得する
	    // /api/v1/users/{:user_id}/bookmark
	    /*
	    2016-02-04 drop した模様
	    'users:id:bookmark': new Types(
	      new Type( `${API_PATH}/users/${Path.USER_ID}/bookmark` ),
	      new Permalink(),
	      new Queries( [ new Query( 'offset', 'Number', 0 ), new Query( 'length', 'Number', 10 ) ] )
	    ),
	    */
	    // -----------------
	    // activities
	    // -----------------
	    // アクティビティを取得する
	    // /api/v1/users/self/activities
	    'users:self:activities': new _Types.Types(new _Type.Type(API_PATH + '/users/self/activities'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)])),
	    // -----------------
	    // notifications
	    // -----------------
	    // お知らせを取得する, 自分のアクション(成果物)への他人からのアクション通知
	    // /api/v1/users/self/notifications
	    'users:self:notifications': new _Types.Types(new _Type.Type(API_PATH + '/users/self/notifications'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'Number', 10)]), true),
	    // お知らせ 既読, お知らせウインドウを表示すると呼び出す
	    // /api/v1/users/self/notifications/read
	    'users:self:notifications:read': new _Types.Types(new _Type.Type(API_PATH + '/users/self/notifications/read', 'PUT'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // 知らない間に追加されてた on 2016-03-03
	    // 他人からの通知数を取得する
	    // /api/v1/users/self/notifications/count
	    'users:self:notifications:count': new _Types.Types(new _Type.Type(API_PATH + '/users/self/notifications/count'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // settings/account
	    // -----------------
	    // アカウント情報の取得と更新
	    // アカウント情報を取得
	    // /api/v1/users/self/settings/account
	    'users:settings:account': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/account'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // アカウント情報を更新
	    // /api/v1/users/self/settings/account
	    'users:settings:account:edit': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/account', 'POST'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // settings/interest
	    // -----------------
	    // 興味のある競技を取得
	    // /api/v1/users/self/settings/interest
	    'users:settings:interest': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/interest'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // 興味のある競技を取得
	    // /api/v1/users/self/settings/interest
	    'users:settings:interest:edit': new _Types.Types(new _Type.Type(API_PATH + '/users/self/settings/interest', 'POST'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // 退会
	    // -----------------
	    // アカウントを削除する
	    // /api/v1/users/self
	    'users:delete': new _Types.Types(new _Type.Type(API_PATH + '/users/self', 'DELETE'), new _Permalink.Permalink(), new _Queries.Queries(), true),
	    // -----------------
	    // tag select
	    // -----------------
	    // `http://dev.sportsbull.jp/api/v1/articles/tag/?t10=%E5%B9%B3%E6%98%8C%E4%BA%94%E8%BC%AA2018%E3%83%8F%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88`
	    // @since 2018-01-09
	    'tag:t10': new _Types.Types(new _Type.Type(API_PATH + '/articles/tag/?t10='), new _Permalink.Permalink(), new _Queries.Queries(), true)
	  };
	};

	// let _symbol = Symbol();
	/**
	 * API リクエスト先
	 * @type {{users:add, users:login, users:logout, users:email, auth:sns, auth:fb, auth:tw, categories, home, self, category, search, single, bookmark:add, bookmark:delete, comment, comment:official, comment:normal, comment:self, comment:single, comment:send, comment:reply, comment:reply:reply, comment:send:delete, comment:reply:delete, comment:good:add, comment:good:delete, comment:bad:add, comment:bad:delete, users:self, users:id, users:self:bookmark, users:self:activities, users:self:notifications, users:self:notifications:read, users:self:notifications:count, users:settings:account, users:settings:account:edit, users:settings:interest, users:settings:interest:edit, users:delete}|{users: add, : Types, users: add, : Types, users: add, : Types, users: add, : Types, auth: sns, : Types, auth: sns, : Types, auth: sns, : Types, categories: Types, home: Types, self: Types, category: Types, search: Types, single: Types, bookmark: add, : Types, bookmark: add, : Types, comment: Types, comment: Types, : Types, comment: Types, : Types, comment: Types, : Types, comment: Types, : Types, comment: Types, : Types, comment: Types, : Types, comment: Types, : Types, : Types, comment: Types, : Types, : Types, comment: Types, : Types, : Types, comment: Types, : Types, : Types, comment: Types, : Types, : Types, comment: Types, : Types, : Types, comment: Types, : Types, : Types, users: add, : Types, users: add, : Types, users: add, : Types, : Types, users: add, : Types, : Types, users: add, : Types, : Types, users: add, : Types, : Types, : Types, users: add, : Types, : Types, : Types, users: add, : Types, : Types, users: add, : Types, : Types, : Types, users: add, : Types, : Types, users: add, : Types, : Types, : Types, users: add, : Types}}
	 * @private
	 */
	var apiData = buildPath();

	/**
	 * Api 詳細情報
	 * - 全てstaticです
	 * - {@link Api} が呼び出します。
	 * - 直接呼び出し使うことは想定されていません。
	 *
	 * `ApiDae.someMethod` を実行しなくてはいけない時は関数設計を見直した方が良いでしょう
	 *
	 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=986840481
	 */

	var ApiDae = function () {
	  function ApiDae() {
	    (0, _classCallCheck3.default)(this, ApiDae);
	  }

	  (0, _createClass3.default)(ApiDae, null, [{
	    key: 'rebuild',

	    // /**
	    //  * static class です, instance を作成しません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target:Symbol ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'ApiDae is static Class. not use new ApiDae().' );
	    //
	    //   }
	    //
	    // }
	    /**
	     * `/api/` 前 domain を再生成します
	     * - develop, production 切り替えに使用します
	     * - **注意** 変更の必要がある時は {@link App} 関数を使用してください
	     *
	     * **開発環境**
	     * `App.develop()`
	     *
	     * **本番環境**
	     * `App.production()`
	     *
	     * @param {string} [root=''] リクエスト・ドメイン
	     */
	    value: function rebuild() {
	      var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      apiData = buildPath(root);
	    }
	    /**
	     * api list を取得します
	     * @return {Object} 全ての API list を返します
	     */

	  }, {
	    key: 'all',
	    value: function all() {
	      return apiData;
	    }
	    /**
	     * 指定キー情報を取得します
	     * @param {string} key api key を指定します
	     * @return {Types} key に基づいた Types instance を返します
	     */

	  }, {
	    key: 'api',
	    value: function api(key) {
	      return apiData[key];
	    }
	  }]);
	  return ApiDae;
	}();

	exports.default = ApiDae;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// const _symbol = Symbol();
	var modeValue = 'production';

	/**
	 * local test / develop / production を管理します
	 * - 全て static
	 * - 動作モードを設定します
	 *
	 * - production: 実行モード
	 * - develop: 開発モード（ローカルからのテスト）
	 * - test: ローカルテストモード
	 */

	var Env = function () {
	  function Env() {
	    (0, _classCallCheck3.default)(this, Env);
	  }

	  (0, _createClass3.default)(Env, null, [{
	    key: 'local',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * ローカルテスト(vagrant)モードにします
	     */
	    value: function local() {
	      modeValue = Env.LOCAL;
	    }
	    /**
	     * ローカルテストモードにします
	     */

	  }, {
	    key: 'test',
	    value: function test() {
	      modeValue = Env.TEST;
	    }
	    /**
	     * 開発モードにします
	     */

	  }, {
	    key: 'develop',
	    value: function develop() {
	      modeValue = Env.DEVELOP;
	    }
	    /**
	     * 実行モードにします
	     */

	  }, {
	    key: 'production',
	    value: function production() {
	      modeValue = Env.PRODUCTION;
	    }
	    /**
	     * dev 環境にします
	     */

	  }, {
	    key: 'dev',
	    value: function dev() {
	      modeValue = Env.DEV;
	    }
	    /**
	     * stg 環境にします
	     */

	  }, {
	    key: 'stg',
	    value: function stg() {
	      modeValue = Env.STG;
	    }
	  }, {
	    key: 'mode',

	    // /**
	    //  * static class です, instance を作成しません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Env is static Class. not use new Env().' );
	    //
	    //   }
	    //
	    // }
	    // ---------------------------------------------------
	    //  GETTER / SETTER
	    // ---------------------------------------------------
	    /**
	     * 現在のモード
	     * @return {string} 現在のモードを返します
	     */
	    get: function get() {
	      return modeValue;
	    }
	    /**
	     * PRODUCTION
	     * @readonly
	     * @return {string} 文字列 production を返します
	     */

	  }, {
	    key: 'PRODUCTION',
	    get: function get() {
	      return 'production';
	    }
	    /**
	     * DEVELOP
	     * @readonly
	     * @return {string} 文字列 production を返します
	     */

	  }, {
	    key: 'DEVELOP',
	    get: function get() {
	      return 'develop';
	    }
	    /**
	     * TEST
	     * @readonly
	     * @return {string} 文字列 test を返します
	     */

	  }, {
	    key: 'TEST',
	    get: function get() {
	      return 'test';
	    }
	    /**
	     * LOCAL
	     * @readonly
	     * @return {string} 文字列 local を返します
	     */

	  }, {
	    key: 'LOCAL',
	    get: function get() {
	      return 'local';
	    }

	    // ---
	    // dev / stg 追加
	    /**
	     * DEV, dev.undotsushin.com
	     * @return {string} 文字列 dev を返します
	     */

	  }, {
	    key: 'DEV',
	    get: function get() {
	      return 'dev';
	    }
	    /**
	     * STG, stg.undotsushin.com
	     * @return {string} 文字列 stg を返します
	     */

	  }, {
	    key: 'STG',
	    get: function get() {
	      return 'stg';
	    }
	    /**
	     * process.env.NODE_ENV を取得します
	     * @returns {string} develop / production
	     */

	  }, {
	    key: 'NODE_ENV',
	    get: function get() {
	      return 'development';
	    }
	  }]);
	  return Env;
	}();

	exports.default = Env;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Path = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// let _symbol = Symbol();

	/**
	 * API URL を正規化します
	 * - 全て static です
	 */
	var Path = exports.Path = function () {
	  function Path() {
	    (0, _classCallCheck3.default)(this, Path);
	  }

	  (0, _createClass3.default)(Path, null, [{
	    key: 'article',

	    // ---------------------------------------------------
	    //  METHOD
	    // ---------------------------------------------------
	    /**
	     * article id 挿入し url を完成させます
	     * @param {string} url 置き換え元 URL
	     * @param {number} id article id
	     * @return {string} 置き換え後のURLを返します
	     */
	    value: function article(url, id) {
	      return url.replace(Path.ARTICLE, String(id));
	    }
	    /**
	     * comment id 挿入し url を完成させます
	     * @param {string} url 置き換え元 URL
	     * @param {number} id comment id
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
	     * @param {number} id reply id
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
	     * @param {number} id user id
	     * @return {string} 置き換え後のURLを返します
	     */

	  }, {
	    key: 'user',
	    value: function user(url, id) {
	      return url.replace(Path.USER, String(id));
	    }
	  }, {
	    key: 'ARTICLE_ID',

	    // /**
	    //  * <p>API Path 定数</p>
	    //  * <p>API Path 内で使われる Const 名称を定義します</p>
	    //  * <p>URLを正規化します</p>
	    //  * <p>static class です, instance を作成しません</p>
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target:Symbol ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Path is static Class. not use new Path().' );
	    //
	    //   }
	    //
	    // }
	    // ---------------------------------------------------
	    //  CONST 代わり
	    // ---------------------------------------------------
	    /**
	     * 記事 id
	     * @return {string} ARTICLE_ID を返します
	     */
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
	     * コメント id
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
	     * コメント返信 id
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
	     * ユーザー id
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
	    /**
	     * TAG_DATE - 平昌オリンピック tag select
	     * @returns {string} TAG_DATE を返します
	     * @since 2018-01-09 平昌オリンピック tag select
	     */

	  }, {
	    key: 'TAG_DATE',
	    get: function get() {
	      return 'TAG_DATE';
	    }
	  }]);
	  return Path;
	}();

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Type = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * method / url 2つのpropertyを持ちます
	 * - method: POST | GET
	 * - utl: API request先
	 */
	var Type = exports.Type = function () {
	  /**
	   * url, method を保存します
	   * @param {string} url API request先
	   * @param {string} [method=GET] 'GET', 'POST', 'PUT', 'DELETE'...
	   */
	  function Type(url) {
	    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
	    (0, _classCallCheck3.default)(this, Type);

	    // method = Safety.string(method, 'GET');
	    /**
	     * API request先
	     * @type {string}
	     */
	    this.url = url;
	    // this._url = url;
	    /**
	     * Ajax request method, 'GET', 'POST', 'PUT', 'DELETE'... **全て大文字** に変換し保存します
	     * @type {string}
	     * @private
	     */
	    this._method = _Safety.Safety.string(method, 'GET').toUpperCase();
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  // /**
	  //  * API request先
	  //  * @return {string} API request先を返します
	  //  */
	  // get url() {
	  //   return this._url;
	  // }
	  //
	  // /**
	  //  * API request先を設定します
	  //  * @param {string} url API request先
	  //  */
	  // set url(url) {
	  //   this._url = url;
	  // }
	  /**
	   * method POST|GET|PUT|DELETE
	   * @return {string} POST | GET を返します
	   */


	  (0, _createClass3.default)(Type, [{
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
	}(); /**
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

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Permalink = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	/**
	 * Types.url へ追加可能なpathがあるかどうかを管理します
	 *
	 * ```
	 * new Permalink( [ 'category', '' ] );
	 * ```
	 *
	 * searchのようにどんなワードでも良い場合は "*" を指定します
	 *
	 * ```
	 * new Permalink(['*']);
	 * ```
	 */
	var Permalink = exports.Permalink = function () {
	  /**
	   * パスオプションを指定、ない時は空配列
	   *
	   * @param {Array.<string>} [paths=[]] 追加 path を配列で設定
	   * @param {boolean} [need=false] 追加 path が必須かを設定します。 true: 必須, false: オプション
	   */
	  function Permalink() {
	    var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var need = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    (0, _classCallCheck3.default)(this, Permalink);

	    /**
	     * 追加 path を配列で設定
	     * @type {Array.<string>}
	     * @protected
	     */
	    this._paths = paths;
	    /**
	     * 追加 path が必須かを設定します
	     * @type {boolean}
	     * @private
	     */
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
	     * @return {number} paths数を返します
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

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Queries = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// import {Query} from './Query';

	/**
	 * Query{key: value} を配列で管理します
	 */
	var Queries = exports.Queries = function () {
	  /**
	   * Query 情報を保持します
	   * @param {Array<Query>} [queries=[]] Query{key: value} 配列
	   */
	  function Queries() {
	    var queries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    (0, _classCallCheck3.default)(this, Queries);

	    /**
	     * Query{key: value} 配列
	     * @type {Array.<Query>}
	     * @private
	     */
	    this._queries = queries;
	  }
	  /**
	   * queries個数であるかないかの判断は可能
	   * @return {umber} queries個数を返します
	   */


	  (0, _createClass3.default)(Queries, [{
	    key: "length",
	    value: function length() {
	      return this._queries.length;
	    }
	    /**
	     * 全てのqueries
	     * @return {Array.<Query>} 全てのqueriesを返します
	     */

	  }, {
	    key: "all",
	    value: function all() {
	      return this._queries;
	    }
	    /**
	     * key から query を探します
	     * @param {string} key query key name, ?start=0 の start
	     * @return {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
	     */

	  }, {
	    key: "search",
	    value: function search(key) {
	      var queries = this._queries;
	      // var result;
	      //
	      // for ( var query of queries ) {
	      //
	      //   result = query.search( key );
	      //   if ( result !== null ) {
	      //     break;
	      //   }
	      //
	      // }
	      //
	      // return result;
	      return queries.some(function (query) {
	        return query.search(key) !== null;
	      });
	    }
	  }]);
	  return Queries;
	}();

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Query = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	/**
	 * Api query option を key ごとに管理します
	 *
	 * `?key=value`
	 *
	 * key, value型, default値, 必須情報...
	 * */
	var Query = exports.Query = function () {
	  /**
	   * Api query option 情報を保持します
	   *
	   * @param {string} key query key
	   * @param {string} type query value type
	   * @param {string|Number|null} [defaultValue=null] default value, あれば...
	   * @param {boolean} [require=false] 必須フラグ
	   */
	  function Query(key, type) {
	    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	    var require = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	    (0, _classCallCheck3.default)(this, Query);

	    /**
	     * query key
	     * @type {string}
	     * @protected
	     */
	    this._key = key;
	    /**
	     * query value type
	     * @type {string}
	     * @protected
	     */
	    this._type = type;
	    /**
	     * 必須フラグ
	     * @type {boolean}
	     * @protected
	     */
	    this._require = require;
	    /**
	     * default value あれば...
	     * @type {?string|?number}
	     * @private
	     * @protected
	     */
	    this._value = defaultValue;
	  }
	  /**
	   * query key が存在するかを調べ真偽値を返します
	   * @param {string} key query key
	   * @return {boolean} query key が存在するかを返します
	   */


	  (0, _createClass3.default)(Query, [{
	    key: "has",
	    value: function has(key) {
	      return this._key === key;
	    }
	    /**
	     * 引数 key が存在すれば Object を返します
	     * @param {string} key query key
	     * @return {?{key: string, type: string, require: boolean, value: *}} 現在値を返します
	     */

	  }, {
	    key: "search",
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

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _TypeDae = __webpack_require__(130);

	var _InterestDae = __webpack_require__(131);

	var _LogoDae = __webpack_require__(132);

	var _BannersDae = __webpack_require__(133);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * ユーザー情報
	 * article.user
	 */
	var UserDae = exports.UserDae = function () {
	  /**
	   * article.user
	   * @param {Object} [user={}] article.user
	   */
	  function UserDae() {
	    var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, UserDae);


	    user = _Safety.Safety.object(user);
	    /**
	     * article.user
	     * @type {Object}
	     * @protected
	     */
	    this._user = user;
	    /**
	     * user.type
	     * @type {TypeDae}
	     * @protected
	     */
	    this._type = new _TypeDae.TypeDae(user.type);
	    /**
	     * user.interest
	     * @type {InterestDae}
	     * @protected
	     */
	    this._interest = new _InterestDae.InterestDae(user.interest);
	    // banner 追加
	    /**
	     * user.banner<br>
	     * 廃止予定！？
	     * @type {BannersDae}
	     * @protected
	     */
	    this._banners = new _BannersDae.BannersDae(user.banner);
	    // from 2016-05-31
	    /**
	     * user.logo
	     * @since 2016-05-31
	     * @type {LogoDae}
	     * @protected
	     */
	    this._logo = new _LogoDae.LogoDae(user.logo);
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * article.user
	   * @return {Object|*} article.user
	   */


	  (0, _createClass3.default)(UserDae, [{
	    key: 'user',
	    get: function get() {
	      return this._user;
	    }
	    /**
	     * article.user.type
	     * @return {TypeDae|*} article.user.type
	     */

	  }, {
	    key: 'type',
	    get: function get() {
	      return this._type;
	    }
	    /**
	     * article.user.id
	     * @return {Number} article.user.id ユーザーIDを返します
	     */

	  }, {
	    key: 'id',
	    get: function get() {
	      return this.user.id;
	    }
	    /**
	     * article.user.name
	     * @return {string} article.user.name ユーザー名を返します
	     */

	  }, {
	    key: 'userName',
	    get: function get() {
	      // data に null 値が入っていることがあるので念のためチェックする
	      return _Safety.Safety.string(this.user.name, '');
	    }
	    /**
	     * article.user.profile_picture
	     * @return {string} article.user.profile_picture ユーザーのURLを返します
	     */

	  }, {
	    key: 'profilePicture',
	    get: function get() {
	      // data に null 値が入っていることがあるので念のためチェックする
	      return _Safety.Safety.string(this.user.profile_picture, '');
	    }
	    /**
	     * article.user.url
	     * @return {string} article.user.url ユーザーのURLを返します
	     */

	  }, {
	    key: 'url',
	    get: function get() {
	      // data に null 値が入っていることがあるので念のためチェックする
	      return _Safety.Safety.string(this.user.url, '');
	    }
	    /**
	     * article.user.bio
	     * @return {string} article.user.bio ユーザーの肩書を返します
	     */

	  }, {
	    key: 'bio',
	    get: function get() {
	      // data に null 値が入っていることがあるので念のためチェックする
	      return _Safety.Safety.string(this.user.bio, '');
	    }
	    /**
	     * article.user.email
	     * @return {string} email 情報を返します
	     */

	  }, {
	    key: 'email',
	    get: function get() {
	      // data に null 値が入っていることがあるので念のためチェックする
	      return _Safety.Safety.string(this.user.email, '');
	    }
	    // --------------------------------------------------------------------
	    // 以下リクエストによっては undefined になります
	    // 登録系, ログイン系 などのリクエストの時に情報を持ちます
	    /**
	     * メアド、パスワードから生成されるアクセストークン
	     * access_token を使い **ログイン** 処理を行います
	     * @return {string} メアド、パスワードから生成されるアクセストークン を返します
	     */

	  }, {
	    key: 'accessToken',
	    get: function get() {
	      // data に null 値が入っていることがあるので念のためチェックする
	      return _Safety.Safety.string(this.user.access_token, '');
	    }
	    /**
	     * セッションID *用途なさそうだけど一応
	     * @return {string} セッションID *用途なさそうだけど一応 返します
	     */

	  }, {
	    key: 'sessionToken',
	    get: function get() {
	      // data に null 値が入っていることがあるので念のためにチェックする
	      return _Safety.Safety.string(this.user.session_token, '');
	    }
	    /**
	     * 興味がある
	     * @return {InterestDae|*} 興味がある項目を返します, undefined になることがあります
	     */

	  }, {
	    key: 'interest',
	    get: function get() {
	      return this._interest;
	    }

	    // --------------------------------------------------------------------
	    // banner
	    /**
	     * ユーザー・バナー
	     * @return {BannersDae} response.user.banner を BannersDae として返します
	     */

	  }, {
	    key: 'banner',
	    get: function get() {
	      return this._banners;
	    }

	    /**
	     * response.user.logo
	     * @return {LogoDae} response.user.logo を LogoDae instance として返します
	     */

	  }, {
	    key: 'logo',
	    get: function get() {
	      return this._logo;
	    }
	  }]);
	  return UserDae;
	}(); /**
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

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TypeDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

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
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, TypeDae);


	    type = _Safety.Safety.object(type);
	    /**
	     * article.user.type
	     * @type {Object}
	     * @protected
	     */
	    this._type = type;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * article.user.type
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
	     * <pre>
	     * 6 : 一般ユーザー
	     * 5 : 公式ユーザー
	     * 4 : 編集部ユーザ
	     * 3 : メディアユーザー(ex. ニッカンスポーツ)
	     * </pre>
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
	}(); /**
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

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.InterestDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * ユーザーの興味がある競技
	 */
	var InterestDae = exports.InterestDae = function () {
	  /**
	   * ユーザーの興味がある競技
	   * @param {Object} [interest={}] response.interest
	   */
	  function InterestDae() {
	    var interest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, InterestDae);

	    interest = _Safety.Safety.object(interest);
	    /**
	     * response.interest
	     * @type {Object|Array}
	     * @protected
	     */
	    this._interest = interest;
	  }
	  /**
	   * response.interest
	   * @return {Array|*} response.interest を返します
	   */


	  (0, _createClass3.default)(InterestDae, [{
	    key: 'interest',
	    get: function get() {
	      return this._interest;
	    }
	    /**
	     * response.interest.category
	     * @return {Array} response.interest.category を返します
	     */

	  }, {
	    key: 'category',
	    get: function get() {
	      // let category = this.interest.category;
	      // API 戻り値がどうも変わった様子
	      // interest: [{id:int, slug:text, label:text},{}]
	      var category = this.interest;
	      if (!Array.isArray(category)) {
	        category = [this.interest];
	      }
	      return category;
	    }
	  }]);
	  return InterestDae;
	}(); /**
	      * Copyright (c) 2011-2016 inazumatv.com, inc.
	      * @author (at)taikiken / http://inazumatv.com
	      * @date 2016/02/24 - 0:14
	      *
	      * Distributed under the terms of the MIT license.
	      * http://www.opensource.org/licenses/mit-license.html
	      *
	      * This notice shall be included in all copies or substantial portions of the Software.
	      *
	      */

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LogoDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * response.user.logo<br>
	 * from 2016-05-31
	 *
	 * 追加になった記事詳細・レスポンス user.logo
	 */
	var LogoDae = exports.LogoDae = function () {
	  /**
	   * response.user.logo
	   * @param {Object} [logo={}] response.user.logo
	   */
	  function LogoDae() {
	    var logo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, LogoDae);

	    logo = _Safety.Safety.object(logo);
	    /**
	     * response.user.logo
	     * @type {Object}
	     * @protected
	     */
	    this._logo = logo;
	  }
	  /**
	   * response.user.logo
	   * @return {Object|*} response.user.logo を返します
	   */


	  (0, _createClass3.default)(LogoDae, [{
	    key: 'logo',
	    get: function get() {
	      return this._logo;
	    }
	    /**
	     * 媒体ロゴ画像URL<br>
	     * response.user.logo.img
	     * @return {string} response.user.logo.img を返します
	     */

	  }, {
	    key: 'img',
	    get: function get() {
	      return this.logo.img;
	    }
	    /**
	     * 媒体ロゴリンク先<br>
	     * response.user.logo.link
	     * @return {string} response.user.logo.link を返します
	     */

	  }, {
	    key: 'link',
	    get: function get() {
	      return this.logo.link;
	    }
	  }]);
	  return LogoDae;
	}(); /**
	      * Copyright (c) 2011-2016 inazumatv.com, inc.
	      * @author (at)taikiken / http://inazumatv.com
	      * @date 2016/05/31 - 14:37
	      *
	      * Distributed under the terms of the MIT license.
	      * http://www.opensource.org/licenses/mit-license.html
	      *
	      * This notice shall be included in all copies or substantial portions of the Software.
	      *
	      */

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BannersDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _BannerDae = __webpack_require__(134);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * response.user.banner データ<br>
	 * あるいは response.banner
	 *
	 * `http://dev.undotsushin.com/api/v1/category/crazy`
	 *
	 * <p>特定のカテゴリー情報を取得する<br>
	 ※ 主に企画モノの記事一覧ページを生成するにあたり利用する</p>
	 * <p>カテゴリータイトル横に表示する画像</p>
	 *
	 * `title_img`, `title_img_link` が廃止される
	 *
	 * 記事閲覧 / powered by エリアの追加（App, Web-Mobile） #1211
	 * @see https://github.com/undotsushin/undotsushin/issues/1211
	 * @since 2016-11-02
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/04/13 - 17:10
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var BannersDae = exports.BannersDae = function () {
	  /**
	   * @param {Object} banner response.user.banner あるいは response.banner
	   */
	  function BannersDae() {
	    var banner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, BannersDae);

	    banner = _Safety.Safety.object(banner);
	    var pc = _Safety.Safety.object(banner.pc);
	    var sp = _Safety.Safety.object(banner.sp);
	    /**
	     * banner.pc
	     * @type {BannerDae}
	     * @protected
	     */
	    this._pc = new _BannerDae.BannerDae(pc.text, pc.image, pc.link);
	    /**
	     * banner.sp
	     * @type {BannerDae}
	     * @protected
	     */
	    this._sp = new _BannerDae.BannerDae(sp.text, sp.image, sp.link);
	    /**
	     * response.user.banner あるいは response.banner
	     * @type {Object}
	     * @protected
	     */
	    this._banner = banner;
	  }
	  /**
	   * response.user.banner
	   * @return {Object|*} response.user.banner を返します
	   */


	  (0, _createClass3.default)(BannersDae, [{
	    key: 'banner',
	    get: function get() {
	      return this._banner;
	    }
	    /**
	     * response.user.banner.pc
	     * @return {BannerDae} response.user.banner.pc を BannerDae instance で返します
	     */

	  }, {
	    key: 'pc',
	    get: function get() {
	      return this._pc;
	    }
	    /**
	     * response.user.banner.sp
	     * @return {BannerDae} response.user.banner.sp を BannerDae instance で返します
	     */

	  }, {
	    key: 'sp',
	    get: function get() {
	      return this._sp;
	    }
	  }]);
	  return BannersDae;
	}();

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BannerDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/04/13 - 17:11
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	/**
	 * 記事詳細, banner pc / sp 各データ
	 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=229180023
	 *
	 * 2016-10-02 使用先追加, category でも
	 * 記事閲覧 / powered by エリアの追加（App, Web-Mobile） #1211
	 * @see https://github.com/undotsushin/undotsushin/issues/1211
	 */
	var BannerDae =
	/**
	 * 記事詳細, banner pc / sp
	 * @param {string} text 画像のALT
	 * @param {string} image バナーのURL
	 * @param {string} link リンク先
	 */
	exports.BannerDae = function BannerDae(text, image, link) {
	  (0, _classCallCheck3.default)(this, BannerDae);

	  /**
	   * 画像のALT
	   * @type {string}
	   */
	  this.text = text;
	  /**
	   * バナーのURL
	   * @type {string}
	   */
	  this.image = image;
	  /**
	   * リンク先
	   * @type {string}
	   */
	  this.link = link;
	};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SettingsStatus = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link SettingsStatus} inner symbol
	 * @type {symbol}
	 */
	var settingsStatusSymbol = (0, _symbol2.default)('SettingsStatus symbol');
	/**
	 * {@link SettingsStatus} singleton instance
	 * @type {?SettingsStatus}
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/01 - 23:05
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	/* eslint constructor-super: 0 */

	var singletonInstance = null;

	/**
	 * 設定
	 * ユーザー情報更新の custom Event
	 * - ACCOUNT_COMPLETE
	 * - ACCOUNT_ERROR
	 * - INTEREST_COMPLETE
	 * - INTEREST_ERROR
	 * @example
	 * var settingsStatus = SettingsStatus.factory();
	 */

	var SettingsStatus = exports.SettingsStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(SettingsStatus, _EventDispatcher);
	  (0, _createClass3.default)(SettingsStatus, null, [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {SettingsStatus} SettingsStatus instance を返します
	     */
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new SettingsStatus(settingsStatusSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * 設定 - ユーザー情報更新の custom Event
	     *
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @return {ReplyStatus} ReplyStatus instance を返します
	     */

	  }, {
	    key: 'ACCOUNT_COMPLETE',

	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * ACCOUNT_COMPLETE
	     * @return {string} settingsAccountComplete
	     */
	    get: function get() {
	      return 'settingsAccountComplete';
	    }
	    /**
	     * ACCOUNT_ERROR
	     * @return {string} settingsAccountError
	     */

	  }, {
	    key: 'ACCOUNT_ERROR',
	    get: function get() {
	      return 'settingsAccountError';
	    }
	    /**
	     * INTEREST_COMPLETE
	     * @return {string} settingsInterestComplete
	     */

	  }, {
	    key: 'INTEREST_COMPLETE',
	    get: function get() {
	      return 'settingsInterestComplete';
	    }
	    /**
	     * INTEREST_ERROR
	     * @return {string} settingsInterestError
	     */

	  }, {
	    key: 'INTEREST_ERROR',
	    get: function get() {
	      return 'settingsInterestError';
	    }
	  }]);

	  function SettingsStatus(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, SettingsStatus);

	    if (settingsStatusSymbol !== target) {
	      throw new Error('SettingsStatus is static Class. not use new SettingsStatus(). instead SettingsStatus.factory()');
	    }
	    if (singletonInstance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (SettingsStatus.__proto__ || (0, _getPrototypeOf2.default)(SettingsStatus)).call(this));

	      singletonInstance = _this;
	    }
	    return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  return SettingsStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _LogoutStatus = __webpack_require__(137);

	var _CommentStatus = __webpack_require__(138);

	var _View = __webpack_require__(95);

	var _View2 = _interopRequireDefault(_View);

	var _User = __webpack_require__(109);

	var _Loc = __webpack_require__(139);

	var _Env = __webpack_require__(123);

	var _Env2 = _interopRequireDefault(_Env);

	var _Safety = __webpack_require__(24);

	var _Empty = __webpack_require__(140);

	var _Url = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * [library] - React
	 */

	// import ViewHeaderMemberNotice from '../../view/header/ViewHeaderMemberNotice';
	var React = self.React;

	/**
	 * header - member setting menu
	 * - for login user
	 */
	/**
	 * Copyright (c) 2011-2017 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2017/12/12 - 18:26
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var ComponentHeaderMemberSetting = function (_React$Component) {
	  (0, _inherits3.default)(ComponentHeaderMemberSetting, _React$Component);
	  (0, _createClass3.default)(ComponentHeaderMemberSetting, null, [{
	    key: 'propTypes',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * React.propTypes
	     * @returns {{
	     *    userName: string,
	     *    icon: string,
	     *    safely: function,
	     *    did: function,
	     *    vk: boolean
	     * }}
	     * React.propTypes
	     */
	    get: function get() {
	      return {
	        userName: React.PropTypes.string.isRequired,
	        icon: React.PropTypes.string.isRequired,
	        safely: React.PropTypes.func.isRequired,
	        did: React.PropTypes.func.isRequired,
	        vk: React.PropTypes.bool.isRequired
	      };
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * header - member setting menu 出力準備をします
	     * @param {*} props React.props
	     */

	  }]);

	  function ComponentHeaderMemberSetting(props) {
	    (0, _classCallCheck3.default)(this, ComponentHeaderMemberSetting);

	    // -----
	    /**
	     * React.state
	     * @type {{open: string, userName: string, icon: string}}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ComponentHeaderMemberSetting.__proto__ || (0, _getPrototypeOf2.default)(ComponentHeaderMemberSetting)).call(this, props));

	    _this.state = {
	      open: 'close',
	      userName: props.userName,
	      icon: props.icon
	    };
	    // /**
	    //  * ViewLogoutModal instance
	    //  * @private
	    //  * @type {?ViewLogoutModal}
	    //  */
	    // this.modal = null;
	    /**
	     * LogoutStatus instance
	     * @private
	     * @type {LogoutStatus}
	     */
	    _this.status = _LogoutStatus.LogoutStatus.factory();
	    /**
	     * CommentStatus instance
	     * @private
	     * @type {CommentStatus}
	     */
	    _this.commentStatus = _CommentStatus.CommentStatus.factory();
	    /**
	     * time out id
	     * @private
	     * @type {number}
	     */
	    _this.timer = 0;
	    /**
	     * bind onClick
	     * @type {function}
	     * */
	    _this.onClick = _this.onClick.bind(_this);
	    /**
	     * bound onBodyClick
	     * @type {any}
	     */
	    _this.onBodyClick = _this.onBodyClick.bind(_this);
	    /**
	     * bound onLogoutClick
	     * @type {any}
	     */
	    _this.onLogoutClick = _this.onLogoutClick.bind(_this);
	    /**
	     * bound onOk
	     * @type {any}
	     */
	    _this.onOk = _this.onOk.bind(_this);
	    /**
	     * bound onCancel
	     * @type {any}
	     */
	    _this.onCancel = _this.onCancel.bind(_this);
	    /**
	     * bound onOtherModalOpen
	     * @type {any}
	     */
	    _this.onOtherModalOpen = _this.onOtherModalOpen.bind(_this);
	    /**
	     * `div.notice-container`
	     * @type {?Element}
	     */
	    _this.noticeElement = null;
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * a.onclick event handler - drop down menu open / close します
	   * @param {Event} event click event
	   * */


	  (0, _createClass3.default)(ComponentHeaderMemberSetting, [{
	    key: 'onClick',
	    value: function onClick(event) {
	      event.preventDefault();
	      this.toggle();
	    }
	    /**
	     * document.body.onclick event handler - dropdown menu close します
	     * */

	  }, {
	    key: 'onBodyClick',
	    value: function onBodyClick() {
	      var _this2 = this;

	      if (this.state.open === 'open') {
	        // document.body が a より先に反応する
	        // native event bind と React 経由の違いかも
	        // body click 後の処理を遅延させる, 多分気づかない程度
	        this.timer = setTimeout(function () {
	          _this2.toggle();
	        }, 100);
	      }
	    }
	    /**
	     * 「ログアウト」.onclick event handler - logout modal を開くために {@link LogoutStatus}.open 通知します
	     * @param {Event} event click event
	     * */

	  }, {
	    key: 'onLogoutClick',
	    value: function onLogoutClick(event) {
	      event.preventDefault();
	      event.stopPropagation();
	      this.destroy();
	      this.status.open(this.onOk, this.onCancel);
	    }
	    /**
	     * logout [OK] click event handler
	     * - logout します - {@link User}.logout
	     * - top へ遷移します - {@link Loc}.index
	     * */

	  }, {
	    key: 'onOk',
	    value: function onOk() {
	      if (_Env2.default.NODE_ENV === 'develop') {
	        console.warn('[ComponentHeaderMemberSetting].onOk', this.state.icon);
	      }
	      _User.User.logout();
	      _Loc.Loc.index();
	    }
	    /**
	     * logout [CANCEL] click event handler
	     * */

	  }, {
	    key: 'onCancel',
	    value: function onCancel() {
	      this.destroy();
	      this.activate();
	    }
	    /**
	     * [notice] drop down 開くと閉じるようにするための event handler - {@link CommentStatus}.COMMENT_DELETE_MODAL_OPEN
	     * */

	  }, {
	    key: 'onOtherModalOpen',
	    value: function onOtherModalOpen() {
	      // 他のmodalが開いたので閉じる
	      if (this.state.open === 'open') {
	        // open -> close
	        this.destroy();
	        this.setState({ open: 'close' });
	      }
	    }
	    /**
	     * body click からの遅延処理を clear します
	     * */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // body click からの遅延処理を clear する
	      // timer を 0 にし error にならないようにする
	      clearTimeout(this.timer);
	      this.timer = 0;
	      document.body.removeEventListener('click', this.onBodyClick);
	    }
	    /**
	     * document.body.onclick 監視をします
	     * */

	  }, {
	    key: 'activate',
	    value: function activate() {
	      document.body.addEventListener('click', this.onBodyClick, false);
	    }
	    /**
	     * dropdown menu toggle 処理を行います
	     * */

	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this.destroy();
	      if (this.state.open === 'close') {
	        // close -> open
	        // document.body へ click event handler bind
	        this.setState({ open: 'open' });
	        this.activate();
	      } else {
	        // open -> close
	        this.setState({ open: 'close' });
	      }
	    }
	    /**
	     * delegate - after mount
	     * - props callback function を実行します
	     * - {@link ViewHeaderMemberNotice} を mount します
	     * - {@link CommentStatus}.COMMENT_DELETE_MODAL_OPEN 監視します
	     * */

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props = this.props,
	          safely = _props.safely,
	          did = _props.did;

	      safely(_View2.default.DID_MOUNT);
	      // 判定追加する - 2018-04-19
	      if (did) {
	        did();
	      }
	      // ---
	      // 2018-04-18 トルツメ - display: none になってる
	      // const noticeElement = this.noticeElement;
	      // if (noticeElement) {
	      //   const notice = new ViewHeaderMemberNotice(noticeElement, {}, this.props.vk);
	      //   // const notice = new ViewHeaderMemberNotice(noticeElement);
	      //   notice.start();
	      // }
	      // ---
	      var commentStatus = this.commentStatus;
	      commentStatus.off(_CommentStatus.CommentStatus.COMMENT_DELETE_MODAL_OPEN, this.onOtherModalOpen);
	      commentStatus.on(_CommentStatus.CommentStatus.COMMENT_DELETE_MODAL_OPEN, this.onOtherModalOpen);
	    }
	    /**
	     * delegate - will mount - `destroy` 実行します
	     * */

	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.destroy();
	    }
	    /**
	     * delegate - 更新 props を state と比較し更新するかを決定します
	     * @param {{icon: string, userName: string}} nextProps 更新 props
	     * */

	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var icon = nextProps.icon,
	          userName = nextProps.userName;

	      if (icon !== this.state.icon || userName !== this.state.userName) {
	        this.setState({ icon: icon, userName: userName });
	      }
	    }
	    /**
	     * member setting menu を出力します
	     * @returns {XML} `div.user`
	     * */

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _state = this.state,
	          userName = _state.userName,
	          icon = _state.icon,
	          open = _state.open;
	      // vk 絶対パス - 2018-04-19

	      var iconImg = '' + _Url.Url.host + _Safety.Safety.image(icon, _Empty.Empty.USER_EMPTY);
	      var loggedIn = _Safety.Safety.same(iconImg, '' + _Url.Url.host + _Empty.Empty.USER_EMPTY);
	      // console.log('ComponentHeaderMemberSetting.render', userName, icon, open);
	      return React.createElement(
	        'div',
	        { className: 'user' },
	        React.createElement('div', {
	          className: 'notice-container',
	          ref: function ref(element) {
	            return _this3.noticeElement = element;
	          }
	        }),
	        React.createElement(
	          'div',
	          { className: 'preference ' + open },
	          React.createElement(
	            'a',
	            { className: 'preference-opener', href: '#', onClick: this.onClick },
	            React.createElement(
	              'span',
	              { className: 'preference-avatar ' + loggedIn },
	              React.createElement('img', { src: _Empty.Empty.refresh(iconImg), alt: userName })
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
	                  { className: 'dropMenu-link', href: '#' },
	                  '\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF',
	                  React.createElement('br', null),
	                  '\u30A2\u30AF\u30C6\u30A3\u30D3\u30C6\u30A3'
	                )
	              ),
	              React.createElement(
	                'li',
	                { className: 'dropMenu-item' },
	                React.createElement(
	                  'a',
	                  { className: 'dropMenu-link', href: _Url.Url.settings('', this.props.vk) },
	                  '\u8A2D\u5B9A'
	                )
	              ),
	              React.createElement(
	                'li',
	                { className: 'dropMenu-item' },
	                React.createElement(
	                  'a',
	                  { className: 'dropMenu-link', href: '#', onClick: this.onLogoutClick },
	                  '\u30ED\u30B0\u30A2\u30A6\u30C8'
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return ComponentHeaderMemberSetting;
	}(React.Component);

	exports.default = ComponentHeaderMemberSetting;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LogoutStatus = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link LogoutStatus} inner symbol
	 * @type {symbol}
	 */
	var logoutStatusSymbol = (0, _symbol2.default)('LogoutStatus symbol');
	/**
	 * {@link LogoutStatus} singleton instance
	 * @type {?LogoutStatus}
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/08 - 21:34
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	/* eslint constructor-super: 0 */

	var singletonInstance = null;

	/**
	 * Logout modal を open / close するための custom Event
	 */

	var LogoutStatus = exports.LogoutStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(LogoutStatus, _EventDispatcher);
	  (0, _createClass3.default)(LogoutStatus, null, [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {LogoutStatus} LogoutStatus instance を返します
	     */
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new LogoutStatus(logoutStatusSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * Logout modal 用 custom Event
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @return {LogoutStatus} LogoutStatus instance を返します
	     */

	  }, {
	    key: 'OPEN',

	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * OPEN
	     * @return {string} logoutOpen を返します
	     */
	    get: function get() {
	      return 'logoutOpen';
	    }
	    /**
	     * CLOSE
	     * @return {string} logoutClose を返します
	     */

	  }, {
	    key: 'CLOSE',
	    get: function get() {
	      return 'logoutClose';
	    }
	  }]);

	  function LogoutStatus(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, LogoutStatus);

	    if (logoutStatusSymbol !== target) {
	      throw new Error('LogoutStatus is static Class. not use new LogoutStatus(). instead LogoutStatus.factory()');
	    }
	    if (singletonInstance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (LogoutStatus.__proto__ || (0, _getPrototypeOf2.default)(LogoutStatus)).call(this));

	      singletonInstance = _this;
	    }
	    return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * OPEN event kick
	   * @param {Function} [ok=null] ok / yes callback
	   * @param {Function} [cancel=null] cancel callback
	   */


	  (0, _createClass3.default)(LogoutStatus, [{
	    key: 'open',
	    value: function open() {
	      var ok = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      var cancel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	      this.dispatch({ type: LogoutStatus.OPEN, ok: ok, cancel: cancel });
	    }
	    /**
	     * CLOSE event kick
	     */

	  }, {
	    key: 'close',
	    value: function close() {
	      this.dispatch({ type: LogoutStatus.CLOSE });
	    }
	  }]);
	  return LogoutStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CommentStatus = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link CommentStatus} inner symbol
	 * @type {symbol}
	 */
	var commentStatusSymbol = (0, _symbol2.default)('CommentStatus symbol');
	/**
	 * {@link CommentStatus} singleton instance
	 * @type {?CommentStatus}
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/18 - 18:00
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	/* eslint constructor-super: 0 */

	var singletonInstance = null;

	/**
	 * コメントの good / bad / delete / notice  Event
	 * - Singleton
	 */

	var CommentStatus = exports.CommentStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(CommentStatus, _EventDispatcher);
	  (0, _createClass3.default)(CommentStatus, null, [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {CommentStatus} CommentStatus instance を返します
	     */
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new CommentStatus(commentStatusSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * コメントの good / bad / delete / notice  Event
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @return {CommentStatus} CommentStatus instance を返します
	     */

	  }, {
	    key: 'GOOD_ADD',

	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * event GOOD_ADD
	     * @return {string} goodAdd を返します
	     */
	    get: function get() {
	      return 'goodAdd';
	    }
	    /**
	     * event GOOD_DELETE
	     * @return {string} goodDelete を返します
	     */

	  }, {
	    key: 'GOOD_DELETE',
	    get: function get() {
	      return 'goodDelete';
	    }
	    /**
	     * event BAD_ADD
	     * @return {string} badAdd を返します
	     */

	  }, {
	    key: 'BAD_ADD',
	    get: function get() {
	      return 'badAdd';
	    }
	    /**
	     * event BAD_DELETE
	     * @return {string} badDelete を返します
	     */

	  }, {
	    key: 'BAD_DELETE',
	    get: function get() {
	      return 'badDelete';
	    }
	    /**
	     * event COMMENT_DELETE 削除
	     * @return {string} commentDelete を返します
	     */

	  }, {
	    key: 'COMMENT_DELETE',
	    get: function get() {
	      return 'commentDelete';
	    }
	    /**
	     * event NOTICE 通報
	     * @return {string} commentNotice を返します
	     */

	  }, {
	    key: 'NOTICE',
	    get: function get() {
	      return 'commentNotice';
	    }
	    /**
	     * event COMMENT_WILL_DELETE 削除
	     * @return {string} commentWillDelete を返します
	     */

	  }, {
	    key: 'COMMENT_WILL_DELETE',
	    get: function get() {
	      return 'commentWillDelete';
	    }
	    /**
	     * event COMMENT_DELETE_MODAL_OPEN, コメント削除モーダルオープン
	     * @return {string} commentDeleteModalOpen を返します
	     */

	  }, {
	    key: 'COMMENT_DELETE_MODAL_OPEN',
	    get: function get() {
	      return 'commentDeleteModalOpen';
	    }
	  }]);

	  function CommentStatus(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, CommentStatus);

	    if (commentStatusSymbol !== target) {
	      throw new Error('CommentStatus is static Class. not use new CommentStatus(). instead CommentStatus.factory()');
	    }
	    if (singletonInstance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (CommentStatus.__proto__ || (0, _getPrototypeOf2.default)(CommentStatus)).call(this));

	      singletonInstance = _this;
	    }
	    return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * イベント強制発火
	   * @param {string} type コメントタイプ
	   * @param {string|Number} commentId コメント Id
	   */


	  (0, _createClass3.default)(CommentStatus, [{
	    key: 'fire',
	    value: function fire(type, commentId) {
	      this.dispatch({ type: type, commentId: commentId });
	    }
	    // /**
	    //  * コメント削除
	    //  * @param {string|Number} commentId コメント Id
	    //  */
	    // remove( commentId:string ):void {
	    //   this.fire( CommentStatus.COMMENT_DELETE, commentId );
	    // }
	    /**
	     * コメント削除
	     * @param {string|Number} commentId コメント Id
	     * @param {string|Number} articleId 記事 Id
	     * @since 2017-04-17, 記事id 加える
	     */

	  }, {
	    key: 'remove',
	    value: function remove(commentId, articleId) {
	      // this.fire( CommentStatus.COMMENT_DELETE, commentId );
	      this.dispatch({ commentId: commentId, articleId: articleId, type: CommentStatus.COMMENT_DELETE });
	    }
	    /**
	     * 通報
	     * @param {string|Number} commentId コメント Id
	     */

	  }, {
	    key: 'notice',
	    value: function notice(commentId) {
	      this.fire(CommentStatus.NOTICE, commentId);
	    }
	    /**
	     * コメント削除モーダルを開くことを通知します
	     * @param {string} commentId コメント Id
	     */

	  }, {
	    key: 'modal',
	    value: function modal(commentId) {
	      this.fire(CommentStatus.COMMENT_DELETE_MODAL_OPEN, commentId);
	    }
	  }]);
	  return CommentStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Loc = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Url = __webpack_require__(105);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * location に関する utility
	 */
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

	var Loc = exports.Loc = function () {
	  (0, _createClass3.default)(Loc, null, [{
	    key: 'hashClean',

	    /**
	     * hash を消去します
	     */
	    value: function hashClean() {
	      Loc.hash = '';
	      var path = Loc.path;
	      var hashIndex = path.lastIndexOf('#');
	      if (hashIndex !== -1) {
	        Loc.path = path.substring(0, hashIndex - 1);
	      }
	    }
	    /**
	     * url の query 文字列
	     * @return {string} url ? 以降の query 文字列を返します, a=xxx&b=yyy
	     */

	  }, {
	    key: 'hashStrip',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * hash(#example)から`#`をとります
	     * @param {string} hash hash文字列
	     * @return {string} hash文字列から#を削除した文字列を返します
	     */
	    value: function hashStrip() {
	      var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Loc.hash;

	      hash = _Safety.Safety.string(hash, Loc.hash);
	      return hash.replace(/^[#\/]|\s+$/g, '');
	    }
	    /**
	     * pathnameを/で分解します
	     * @param {string} [pathname=Loc.pathname] location.pathname, host なしの path
	     * @return {Array.<string>} pathname を `/` で分解し配列にし返します
	     */

	  }, {
	    key: 'resolve',
	    value: function resolve() {
	      var pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Loc.path;

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
	      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Loc.search;

	      search = _Safety.Safety.string(search, Loc.search);
	      // 引数が文字でない時は処理しない
	      if (typeof search !== 'string' || search.length === 0) {
	        return null;
	      }

	      search = search.replace('&amp;', '&');
	      var vars = search.split('&');
	      var results = {};

	      // for ( let val of vars ) {
	      //
	      //   let pair = val.split( '=' );
	      //   if ( Array.isArray( pair ) && pair.length === 2 ) {
	      //
	      //     results[ pair[ 0 ] ] = pair[ 1 ];
	      //
	      //   }
	      //
	      // }
	      vars.map(function (val) {
	        var pair = val.split('=');
	        if (Array.isArray(pair) && pair.length === 2) {
	          results[pair[0]] = pair[1];
	        }
	      });
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
	    /**
	     * index(home) へ遷移します
	     */

	  }, {
	    key: 'index',
	    value: function index() {
	      Loc.current = _Url.Url.index();
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * search を調べたい時に instance を作成します
	     */

	  }, {
	    key: 'current',

	    // ---------------------------------------------------
	    //  GETTER / SETTER
	    // ---------------------------------------------------
	    /**
	     * location.href
	     * @return {string} location.href を返します
	     */
	    get: function get() {
	      return self.location.href;
	    }
	    /**
	     * location.href へ href をセット遷移させます
	     * @param {string} href 遷移先パス
	     */
	    ,
	    set: function set(href) {
	      self.location.href = href;
	    }
	    /**
	     * @return {string} location.pathname(urlからprotocol+hostを除く)を返します
	     */

	  }, {
	    key: 'path',
	    get: function get() {
	      return self.location.pathname;
	    }
	    /**
	     * location.pathname をセットします
	     * @param {string} path 設定する pathname
	     */
	    ,
	    set: function set(path) {
	      self.location.pathname = path;
	    }
	    /**
	     * location.hash
	     * @return {string} location.hashを返します
	     */

	  }, {
	    key: 'hash',
	    get: function get() {
	      return self.location.hash;
	    }
	    /**
	     * location.hashを設定します
	     * @param {string} hash 設定する hash
	     */
	    ,
	    set: function set(hash) {
	      self.location.hash = hash;
	    }
	  }, {
	    key: 'search',
	    get: function get() {
	      return self.location.search.substring(1);
	    }
	    /**
	     * location.host
	     * @return {string} host name + port number を返します
	     */

	  }, {
	    key: 'host',
	    get: function get() {
	      // host + port number
	      return self.location.host;
	    }
	    /**
	     * location.hostname
	     * @return {string} host name だけを返します
	     */

	  }, {
	    key: 'hostname',
	    get: function get() {
	      // host only
	      return self.location.hostname;
	    }
	    /**
	     * location.port
	     * @return {string} port number を返します
	     */

	  }, {
	    key: 'port',
	    get: function get() {
	      // port number
	      return self.location.port;
	    }
	    /**
	     * location.protocol
	     * @return {string} ocation.protocol を返します
	     */

	  }, {
	    key: 'protocol',
	    get: function get() {
	      return location.protocol;
	    }
	  }]);

	  function Loc() {
	    (0, _classCallCheck3.default)(this, Loc);

	    /**
	     * url の query 文字列
	     * @type {null|string}
	     */
	    this.search = null;
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * 文字列を query 型として parse します
	   * @param {string} [search=''] key: value にしたい search型 文字列
	   * @return {Loc} instance を返します
	   */


	  (0, _createClass3.default)(Loc, [{
	    key: 'parse',
	    value: function parse() {
	      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      search = _Safety.Safety.string(search, '');
	      this.search = Loc.parse(search);
	      return this;
	    }
	    /**
	     * search value を keyから探します
	     * @param {string} key search name
	     * @return {?string} string|undefined|null で結果を返します
	     */

	  }, {
	    key: 'find',
	    value: function find(key) {
	      var search = this.search;
	      // if (search === null) {
	      //   return null;
	      // }
	      //
	      // return search[key];
	      return search ? search[key] : null;
	    }
	  }]);
	  return Loc;
	}();

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Empty = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	//
	//
	// let _symbol = Symbol();

	/**
	 * 代替画像パスを取得します
	 * - 記事画像、ユーザーアイコンなど未設定時の代替画像パス
	 * - 全て static です
	 */
	var Empty = exports.Empty = function () {
	  function Empty() {
	    (0, _classCallCheck3.default)(this, Empty);
	  }

	  (0, _createClass3.default)(Empty, null, [{
	    key: 'refresh',

	    /**
	     * キャッシュさせないパスを生成します
	     * @param {string} path 元のパス
	     * @returns {string} パスに?Date.now()をつけて返します
	     */
	    value: function refresh(path) {
	      return path + '?' + Date.now();
	    }
	  }, {
	    key: 'THUMB_EMPTY',

	    // /**
	    //  * 代替画像パス
	    //  * static class です, instance を作成しません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //
	    //   if ( _symbol !== target ) {
	    //
	    //     throw new Error( 'Empty is static Class. not use new Empty().' );
	    //
	    //   }
	    //
	    // }
	    // ---------------------------------------------------
	    //  CONST 代わり
	    // ---------------------------------------------------
	    // --------------
	    // image
	    /**
	     * img thumbnail 代替画像パス 100x100
	     * - [Ex.] sidebar ranking
	     * @return {string} 代替画像パス【sidebar ranking】
	     */
	    get: function get() {
	      return '/assets/images/common/thumb-empty-100x100.png';
	    }
	    /**
	     * img thumbnail 代替画像パス 70x70
	     * - [Ex.] headline, sidebar image...
	     * @return {string} 代替画像パス【小】
	     */

	  }, {
	    key: 'IMG_SMALL',
	    get: function get() {
	      return '/assets/images/common/thumb-noimage-70x70.png';
	    }
	    /**
	     * img middle 代替画像パス - 記事一覧用 - 横長 - 16:9
	     * - [Ex.] 記事一覧
	     * @return {string} 代替画像パス【記事一覧】
	     */

	  }, {
	    key: 'IMG_MIDDLE',
	    get: function get() {
	      // return '/assets/images/common/thumb-noimage-340x150.png';
	      // @since 2016-09-01
	      // https://github.com/undotsushin/undotsushin/issues/1053
	      return '/assets/images/common/thumb-noimage-16x9-s.png';
	    }
	    /**
	     * img large 代替画像パス
	     * - [Ex.] スライドショー
	     * @deprecated 2017-12-18 instead use {@link Empty.IMG_CAROUSEL}
	     * @return {string} 代替画像パス【スライドショー】
	     */

	  }, {
	    key: 'IMG_LARGE',
	    get: function get() {
	      return '/assets/images/common/thumb-pickup-empty.png';
	    }
	    /**
	     * img large 代替画像パス - 750x320
	     * - [Ex.] スライドショー
	     * @return {string} 代替画像パス【スライドショー】
	     * @since 2017-12-18
	     */

	  }, {
	    key: 'IMG_CAROUSEL',
	    get: function get() {
	      // 正規画像に差し替える - 2017-12-22
	      return '/assets/images/common/thumb-750x320.png';
	    }
	    // --------------
	    // video
	    /**
	     * video thumbnail 代替画像パス【16 x 9】
	     * - [Ex.] sidebar video...
	     * @return {string} 代替画像パス【16 x 9】
	     */

	  }, {
	    key: 'VIDEO_THUMBNAIL',
	    get: function get() {
	      return '/assets/images/common/thumb-16x9.png';
	    }
	    /**
	     * video play button overlay【16 x 9】
	     * - [Ex.] sidebar video...
	     * @return {string} Video Play画像パス【16 x 9】
	     */

	  }, {
	    key: 'VIDEO_PLAY',
	    get: function get() {
	      return '/assets/images/common/thumb-16x9-play.png';
	    }
	    /**
	     * video play button overlay sidebar small【16 x 9】
	     * - [Ex.] sidebar video...
	     * @return {string} Video Play画像パス【小】【16 x 9】
	     */

	  }, {
	    key: 'VIDEO_PLAY_SMALL',
	    get: function get() {
	      return '/assets/images/common/thumb-16x9-play-s.png';
	    }
	    /**
	     * SP: video play button overlay【16 x 9】 - `/assets/sp/images/common/thumb-16x9-play.png`
	     * @return {string} Video Play画像パス【16 x 9】 for SP
	     * @since 2017-12-28
	     */

	  }, {
	    key: 'VIDEO_PLAY_SP',
	    get: function get() {
	      return '/assets/sp/images/common/thumb-16x9-play.png';
	    }
	    /**
	     * SP: video play button overlay【16 x 9】 small - `/assets/sp/images/common/thumb-16x9-play-s.png`
	     * @return {string} Video Play画像パス【16 x 9】 for SP
	     * @since 2017-12-28
	     */

	  }, {
	    key: 'VIDEO_PLAY_SP_SMALL',
	    get: function get() {
	      return '/assets/sp/images/common/thumb-16x9-play-s.png';
	    }
	    /**
	     * video play button overlay【640 x 400】
	     * - [Ex.] pickup video...
	     * @return {string} Video Play画像パス【Pickup】【640 x 400】
	     */

	  }, {
	    key: 'VIDEO_PICKUP_PLAY',
	    get: function get() {
	      // 正規画像に差し替える - update 2017-12-22
	      // return '/assets/images/common/thumb-640x400-play.png';
	      return '/assets/images/common/thumb-750x320-play.png';
	    }
	    /**
	     * video play button overlay sidebar small【1 x 1】
	     * - [Ex.] headline video...
	     * @return {string} Video Play画像パス【小】【1x1】
	     */

	  }, {
	    key: 'VIDEO_PLAY_SMALL_1X1',
	    get: function get() {
	      return '/assets/images/common/thumb-1x1-play-s.png';
	    }
	    // --------------
	    // user
	    /**
	     * **小** ユーザー・プロファイル・アイコン 代替画像パス (25x25)
	     * - [Ex.] コメントとか
	     * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
	     */

	  }, {
	    key: 'USER_PICTURE',
	    get: function get() {
	      return '/assets/images/common/thumb-user.png';
	    }
	    /**
	     * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)
	     * - [Ex.] コメントとか
	     * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
	     */

	  }, {
	    key: 'USER_PICTURE_FEATURE',
	    get: function get() {
	      return '/assets/images/common/thumb-user-feature.png';
	    }
	    /**
	     * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)透明
	     * - [Ex.] コメントとか
	     * @return {string} 代替透明画像パス ユーザー・プロファイル・アイコン
	     */

	  }, {
	    key: 'USER_EMPTY',
	    get: function get() {
	      return '/assets/images/common/thumb-user-empty.png';
	    }
	    /**
	     * ユーザー登録 sample avatar
	     * @return {string} sample avatar image path
	     */

	  }, {
	    key: 'SETTING_AVATAR',
	    get: function get() {
	      return '/assets/images/setting/thumb-avatar.png';
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

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Dom = __webpack_require__(3);

	var _Dom2 = _interopRequireDefault(_Dom);

	var _Scroll = __webpack_require__(142);

	var _Offset = __webpack_require__(143);

	var _TopButton = __webpack_require__(144);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TweenMax
	/**
	 * [library] - gsap.TweenLite
	 */
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

	// babels_exe から移植

	// app
	var TweenLite = self.TweenLite;

	// Sagen
	/**
	 * [library] - Sagen
	 */


	// ui


	// util
	var Sagen = self.Sagen;

	/**
	 * page top に戻る
	 */

	var PageTop = function () {
	  (0, _createClass3.default)(PageTop, null, [{
	    key: 'start',

	    /**
	     * PageTop instance を作成し init 関数をコールします
	     */
	    value: function start() {
	      var pageTop = new PageTop();
	      pageTop.init();
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * page top に戻る motion
	     */

	  }]);

	  function PageTop() {
	    (0, _classCallCheck3.default)(this, PageTop);

	    /**
	     * bind 済み this.onScroll
	     * @type {Function}
	     * @since 2016-09-01
	     */
	    this.boundScroll = this.onScroll.bind(this);
	    /**
	     * div#pageTop Element
	     * @type {?Element}
	     * @since 2016-09-01
	     */
	    this.element = null;
	    /**
	     * div#pageTop Sagen.Dom instance
	     * @type {?Sagen.Dom}
	     * @since 2016-09-01
	     */
	    this.dom = null;
	    /**
	     * div#footer-container Element
	     * @type {?Element}
	     * @since 2016-09-01
	     */
	    this.footer = null;
	    /**
	     * div#footer-container Offset instance
	     * @type {?Offset}
	     * @since 2016-09-01
	     */
	    this.footerOffset = null;
	    /**
	     * Scroll instance
	     * @type {Scroll}
	     * @since 2016-09-01
	     */
	    this.scroll = _Scroll.Scroll.factory();

	    /**
	     * Dom.whole() を Offset instance として保存します
	     * @type {?Offset}
	     */
	    this.wholeOffset = null;

	    /**
	     * fade animation 中フラッグ
	     * @type {boolean}
	    \     * @default false
	     */
	    this.inFade = false;

	    /**
	     * click で top へ戻るアニメーションを
	     * @type {TopButton}開始します
	     * @since 2016-10-28
	     */
	    this.topButton = _TopButton.TopButton.factory();
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * click event を bind します
	   */


	  (0, _createClass3.default)(PageTop, [{
	    key: 'init',
	    value: function init() {
	      var element = _Dom2.default.pageTop();
	      if (element === null) {
	        return;
	      }
	      // element.addEventListener( 'click', this.onClick.bind( this ), false );
	      this.element = element;
	      this.topButton.init(element);

	      var footer = _Dom2.default.footer();
	      if (footer === null) {
	        return;
	      }

	      this.footer = footer;

	      this.initRise();
	    }
	    /**
	     * fixed / absolute 切替表示初期処理
	     * @since 2016-09-01
	     */

	  }, {
	    key: 'initRise',
	    value: function initRise() {
	      // @type {Sagen.Dom}
	      this.dom = new Sagen.Dom(this.element);
	      // @type {Offset} - footer offset
	      this.footerOffset = new _Offset.Offset(this.footer);
	      // @type {Offset} - whole offset
	      this.wholeOffset = new _Offset.Offset(_Dom2.default.whole());

	      // scroll event 監視開始
	      var scroll = this.scroll;
	      scroll.on(_Scroll.Scroll.SCROLL, this.boundScroll);
	      scroll.start();
	    }
	    /**
	     * Scroll.SCROLL event handler
	     * @param {Object} event Scroll.SCROLL event object
	     * @since 2016-09-01
	     */

	  }, {
	    key: 'onScroll',
	    value: function onScroll(event) {
	      // @type {number} - scrollTop
	      var y = event.y;
	      // @type {number} - window height
	      var height = window.innerHeight;
	      // @type {number} - browser 下端
	      var bottom = y + height;

	      // scrollTop 280px 以上でボタン表示
	      if (y >= 280) {
	        this.show();
	      } else {
	        this.hide();
	        return;
	      }

	      // fixed / free
	      // whole の高さから footer の高さを引い値が 下端 以下になったら absolute にする
	      // footer よりボタンが飛び出ている 30px を加算する
	      var offset = this.footerOffset.offset();
	      var whole = this.wholeOffset.offset();
	      var checkHeight = whole.height - offset.height + 30;

	      // console.log('offset', checkHeight, bottom, checkHeight <= bottom);
	      if (checkHeight <= bottom) {
	        this.free();
	      } else {
	        this.sticky();
	      }
	    }
	    /**
	     * ボタンを表示します - fadein
	     * @return {boolean} 表示すると true を返します
	     */

	  }, {
	    key: 'show',
	    value: function show() {
	      var _this = this;

	      if (this.inFade) {
	        return false;
	      }

	      var dom = this.dom;
	      if (!dom.hasClass('blind')) {
	        return false;
	      }

	      this.inFade = true;
	      var element = this.element;

	      element.style.cssText = 'opacity: 0;';
	      var target = {
	        step: 0
	      };

	      TweenLite.to(target, 0.5, {
	        step: 1,
	        onStart: function onStart() {
	          dom.removeClass('blind');
	        },
	        onUpdate: function onUpdate() {
	          element.style.cssText = 'opacity: ' + target.step + ';';
	        },
	        onComplete: function onComplete() {
	          element.style.cssText = '';
	          _this.inFade = false;
	        }
	      });

	      return true;
	    }
	    /**
	     * ボタンを非表示にします - fadeout
	     * @return {boolean} 非表示にすると true を返します
	     */

	  }, {
	    key: 'hide',
	    value: function hide() {
	      var _this2 = this;

	      if (this.inFade) {
	        return false;
	      }

	      var dom = this.dom;
	      if (dom.hasClass('blind')) {
	        return false;
	      }

	      this.inFade = true;
	      var element = this.element;
	      var target = {
	        step: 1
	      };

	      TweenLite.to(target, 0.5, {
	        step: 0,
	        onUpdate: function onUpdate() {
	          element.style.cssText = 'opacity: ' + target.step + ';';
	        },
	        onComplete: function onComplete() {
	          dom.addClass('blind');
	          if (!dom.hasClass('fixed')) {
	            dom.addClass('fixed');
	          }
	          element.style.cssText = '';
	          _this2.inFade = false;
	        }
	      });

	      return true;
	    }
	    /**
	     * absolute にします
	     * @return {boolean} absolute にすると true を返します
	     */

	  }, {
	    key: 'free',
	    value: function free() {
	      var dom = this.dom;
	      if (dom.hasClass('fixed')) {
	        dom.removeClass('fixed');
	        return true;
	      }

	      return false;
	    }
	    /**
	     * fixed にします
	     * @return {boolean} fixed にすると true を返します
	     */

	  }, {
	    key: 'sticky',
	    value: function sticky() {
	      var dom = this.dom;
	      if (!dom.hasClass('fixed')) {
	        dom.addClass('fixed');
	        return true;
	      }

	      return true;
	    }
	  }]);
	  return PageTop;
	}();

	exports.default = PageTop;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Scroll = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// tween
	/**
	 * [library] - gsap.greensock
	 */
	var greensock = self.com.greensock;
	/**
	 * [library] - gsap.greensock.TweenLite
	 */
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
	/* eslint constructor-super: 0 */

	var TweenLite = greensock.TweenLite;
	/**
	 * [library] - gsap.greensock.easing
	 */
	var easing = greensock.easing;

	/**
	 * {@link Scroll} Singleton を保証するために constructor 引数にする Symbol
	 * @type {Symbol}
	 * @private
	 */
	var scrollSymbol = (0, _symbol2.default)('singleton Scroll instance');

	/**
	 * {@link Scroll} instance
	 * @type {?Scroll}
	 * @static
	 * @private
	 */
	var singletonInstance = null;
	/**
	 * {@link Scroll} - window.onscroll 監視を始めたかの真偽値
	 * @type {boolean}
	 * @static
	 * @private
	 */
	var watched = false;

	/**
	 * scroll に関する処理
	 */

	var Scroll = exports.Scroll = function (_EventDispatcher) {
	  (0, _inherits3.default)(Scroll, _EventDispatcher);
	  (0, _createClass3.default)(Scroll, null, [{
	    key: 'motion',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * scroll animation を行います
	     * @param {number} top 目標位置
	     * @param {number} [duration=0.5] motion 時間 sec.
	     * @param {number} [delay=0] delay 時間 sec.
	     * @param {Function} [easingFunc=Power3.easeOut] easing function
	     * @param {Function} [complete=null] complete callback function
	     * @param {boolean} [autoKill=false] autoKill flag
	     */
	    value: function motion(top) {
	      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
	      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var easingFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : easing.Power3.easeOut;
	      var complete = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
	      var autoKill = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

	      if (easingFunc === null || typeof easingFunc !== 'function') {
	        easingFunc = easing.Power3.easeOut;
	      }

	      TweenLite.to(window, duration, {
	        scrollTo: {
	          y: top,
	          autoKill: autoKill
	        },
	        delay: delay,
	        easing: easingFunc,
	        onComplete: function onComplete() {
	          if (typeof complete === 'function') {
	            complete.call(this);
	          }
	        }
	      });
	    }
	    /**
	     * y 0 にし、ユーザースクロールアクションで動作をキャンセルします
	     * @param {number} [duration=0.5] motion 時間 sec.
	     * @param {number} [delay=0] delay 時間 sec.
	     * @param {Function} [start=null] onStart callback function
	     * @param {Function} [complete=null] onComplete callback function
	     * @param {boolean} [autoKill=true] autoKill flag
	     * @return {TweenLite} TweenLite instance を返します
	     */

	  }, {
	    key: 'sticky',
	    value: function sticky() {
	      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
	      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	      var complete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	      var autoKill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

	      return TweenLite.to(window, duration, {
	        scrollTo: {
	          y: 0,
	          autoKill: autoKill,
	          onAutoKill: function onAutoKill() {
	            // console.log( 'onAutoKill', complete );
	            if (typeof complete === 'function') {
	              complete.call(this);
	            }
	          }
	        },
	        delay: delay,
	        easing: easing.Power3.easeOut,
	        onStart: function onStart() {
	          if (typeof start === 'function') {
	            start.call(this);
	          }
	        },
	        onComplete: function onComplete() {
	          if (typeof complete === 'function') {
	            complete.call(this);
	          }
	        }
	      });
	    }
	    /**
	     * singleton instance を生成します
	     * @return {Scroll} Scroll instance を返します
	     */

	  }, {
	    key: 'factory',
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new Scroll(scrollSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  enable / disable scroll
	    /**
	     * scroll を一時的に無効化します
	     * @see http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
	     * @since 2016-10-28
	     */

	  }, {
	    key: 'disable',
	    value: function disable() {
	      window.addEventListener('wheel', Scroll.disableScroll, false);
	      window.addEventListener('mousewheel', Scroll.disableScroll, false);
	      document.addEventListener('mousewheel', Scroll.disableScroll, false);
	      window.addEventListener('touchmove', Scroll.disableScroll, false);
	      document.addEventListener('keydown', Scroll.keyDown, false);
	    }

	    /**
	     * scroll を遅延させて回復します
	     * @param {number} [delay=500] 遅延時間(ms)
	     * @since 2016-10-28
	     */

	  }, {
	    key: 'enable',
	    value: function enable() {
	      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

	      setTimeout(Scroll.activate, delay);
	      singletonInstance.fire();
	    }
	    /**
	     * scroll 関連イベントハンドラ, 全て止めます
	     * @param {Event} event scroll 関連イベント
	     * @since 2016-10-28
	     */

	  }, {
	    key: 'disableScroll',
	    value: function disableScroll(event) {
	      event.preventDefault();
	      event.stopPropagation();
	    }
	    /**
	     * key down event handler<br>
	     * 37, 38, 39, 40 を無効にします
	     *
	     * - 32 - spacebar
	     * - 33 - pageup
	     * - 34 - pagedown
	     * - 35 - end
	     * - 36 - home
	     * - 37 - left
	     * - 38 - up
	     * - 39 - right
	     * - 49 - down
	     * @param {Event} event key dwon event
	     * @since 2016-10-28
	     */

	  }, {
	    key: 'keyDown',
	    value: function keyDown(event) {
	      var code = event.keyCode;
	      if ([37, 38, 39, 40].indexOf(code) !== -1) {
	        event.preventDefault();
	        event.stopPropagation();
	      }
	    }
	    /**
	     * scroll を回復します
	     * @since 2016-10-28
	     */

	  }, {
	    key: 'activate',
	    value: function activate() {
	      window.removeEventListener('wheel', Scroll.disableScroll);
	      window.removeEventListener('mousewheel', Scroll.disableScroll);
	      document.removeEventListener('mousewheel', Scroll.disableScroll);
	      window.removeEventListener('touchmove', Scroll.disableScroll);
	      document.removeEventListener('keydown', Scroll.keyDown);
	      // 初期化します
	      singletonInstance.distance = 0;
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * scroll に関する singleton class
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @returns {Scroll} Scroll instance を返します
	     */

	  }, {
	    key: 'SCROLL',

	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * SCROLL event
	     * @return {string} scrollScroll
	     */
	    get: function get() {
	      return 'scrollScroll';
	    }
	    // ---------------------------------------------------
	    //  STATIC GETTER / SETTER
	    // ---------------------------------------------------
	    /**
	     * scroll top 位置
	     * @return {number} scroll top 位置を返します
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
	     * @param {number} top スクロール位置(px)
	     */
	    ,
	    set: function set(top) {
	      // time out 内でないと有効にならない
	      // @since 2017-01-17 timeout でラップする
	      setTimeout(function () {
	        window.scrollTo(0, top);
	      }, 0);
	    }
	  }]);

	  function Scroll(target) {
	    var _ret2;

	    (0, _classCallCheck3.default)(this, Scroll);

	    if (scrollSymbol !== target) {
	      throw new Error('Scroll is singleton Class. not use new Scroll(). instead Scroll.factory()');
	    }

	    if (singletonInstance !== null) {
	      var _ret;

	      return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	    }
	    // -----

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Scroll.__proto__ || (0, _getPrototypeOf2.default)(Scroll)).call(this));

	    singletonInstance = _this;
	    /**
	     * onScroll 関数 を bind しpublic 変数にします
	     * @type {Function}
	     */
	    _this.boundScroll = _this.onScroll.bind(_this);

	    /**
	     * 前回{y}値
	     * @type {number}
	     * @default -1
	     */
	    _this.previous = -1;
	    /**
	     * 移動 px
	     * @type {number}
	     */
	    _this.distance = 0;
	    /**
	     * 移動方向, scroll 方向が変わったら distance を 0 にする
	     * @type {number}
	     */
	    _this.direction = -1;

	    return _ret2 = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret2);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * window scroll 監視を開始します
	   */


	  (0, _createClass3.default)(Scroll, [{
	    key: 'start',
	    value: function start() {
	      if (!watched) {
	        watched = true;
	        window.addEventListener('scroll', this.boundScroll, false);
	      }
	    }
	    /**
	     * window scroll 監視を止めます
	     */

	  }, {
	    key: 'stop',
	    value: function stop() {
	      // 2016-09-16
	      // listener がいなかったら止める
	      watched = false;
	      window.removeEventListener('scroll', this.boundScroll);
	    }
	    /**
	     * window.onscroll event handler<br>
	     * window scroll event 発生後に scroll top 位置をもたせた Scroll.SCROLL custom event を発火します<br>
	     * {{type: string, originalEvent: Event, y: number, height: number, moving: number, changed: boolean}} event object
	     * @param {Event} originalEvent window scroll event
	     */

	  }, {
	    key: 'onScroll',
	    value: function onScroll(originalEvent) {
	      // this.dispatch( { type: Scroll.SCROLL, originalEvent: event, y: Scroll.y } );
	      // @since 2016-09-30, 戻り値に window.innerHeight, moving, changed 追加
	      var previous = this.previous;
	      var type = Scroll.SCROLL;
	      var y = Scroll.y;
	      var height = window.innerHeight;
	      var bottom = y + height;
	      // @type {number} - 正の時: scroll down
	      var moving = previous - y;
	      var changed = moving !== 0;
	      var direction = Math.sqrt(moving * moving) / moving;
	      // scroll 方向が変わったら distance を 0 にする
	      if (direction !== this.direction) {
	        this.distance = 0;
	        this.direction = direction;
	      }
	      var distance = this.distance + moving;
	      this.distance = distance;
	      this.previous = y;
	      this.dispatch({
	        type: type,
	        originalEvent: originalEvent,
	        y: y,
	        height: height,
	        bottom: bottom,
	        moving: moving,
	        distance: distance,
	        changed: changed
	      });
	    }
	    /**
	     * 強制的に scroll event を発生させます
	     */

	  }, {
	    key: 'fire',
	    value: function fire() {
	      // this.dispatch( { type: Scroll.SCROLL, originalEvent: null, y: Scroll.y } );
	      // @since 2016-09-30, 戻り値に window.innerHeight, moving, changed 追加
	      var previous = this.previous;
	      var type = Scroll.SCROLL;
	      var y = Scroll.y;
	      var height = window.innerHeight;
	      var bottom = y + height;
	      // @type {number} - 正の時: scroll down
	      // on 2016-10-28, 下記式だと 負の時: scroll down, かなり長いこと使ってるのでこのままにします
	      var moving = previous - y;
	      // const direction = Math.sqrt(moving * moving) / moving;
	      // // scroll 方向が変わったら distance を 0 にする
	      // if (direction !== this.direction) {
	      //   this.distance = 0;
	      //   this.direction = direction;
	      // }
	      var distance = this.distance + moving;
	      this.distance = distance;

	      // this.previous = y;
	      this.dispatch({
	        type: type,
	        y: y,
	        height: height,
	        bottom: bottom,
	        moving: moving,
	        distance: distance,
	        originalEvent: null,
	        changed: true
	      });
	    }
	  }]);
	  return Scroll;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Offset = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/08
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 */

	/**
	 * HTMLElement 要素にアクセスするヘルパー
	 */
	var Offset = exports.Offset = function () {
	  (0, _createClass3.default)(Offset, null, [{
	    key: "offset",

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * getBoundingClientRect を計算します
	     *
	     * ```
	     * {{top: Number, right: Number, left: Number, bottom: Number, width: Number, height: Number}}
	     * ```
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
	     * @param {Element} element 処理対象 Element
	     * @returns {ClientRect} getBoundingClientRect を返します
	     */
	    value: function offset(element) {
	      return element.getBoundingClientRect();
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * element 要素処理ヘルパー
	     * @param {Element} element 処理対象 Element
	     */

	  }]);

	  function Offset(element) {
	    (0, _classCallCheck3.default)(this, Offset);

	    /**
	     * element 処理対象 Element
	     * @type {Element}
	     */
	    this.element = element;
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * getBoundingClientRect を計算します
	   * @returns {ClientRect} getBoundingClientRect を返します
	   */


	  (0, _createClass3.default)(Offset, [{
	    key: "offset",
	    value: function offset() {
	      return Offset.offset(this.element);
	    }
	  }]);
	  return Offset;
	}();

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TopButton = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link TopButton} singleton instance のためのチェック用 Symbol
	 * @type {Symbol}
	 * @private
	 */
	var topButtonSymbol = (0, _symbol2.default)('TopButton singleton instance');
	/**
	 * {@link TopButton} instance
	 * @type {?TopButton}
	 * @private
	 * @static
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/10/28 - 23:57
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var singletonInstance = null;

	/**
	 * button element - {@link TopButton}
	 * @type {?Element}
	 * @default null
	 */
	var element = null;

	// TweenMax
	/**
	 * [library] - gsap.TweenLite
	 */
	var TweenLite = self.TweenLite;
	/**
	 * [library] - gsap.com.greensock.easing
	 */
	var easing = self.com.greensock.easing;

	/**
	 * ページの先頭へ移動するアニメーションを実装します
	 * @since 2016-10-28
	 */

	var TopButton = exports.TopButton = function (_EventDispatcher) {
	  (0, _inherits3.default)(TopButton, _EventDispatcher);
	  (0, _createClass3.default)(TopButton, null, [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {TopButton} TopButton instance を返します
	     */
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new TopButton(topButtonSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * singleton
	     * @param {Symbol} target singleton を保証する inner Symbol
	     * @return {?TopButton} singleton instance
	     */

	  }, {
	    key: 'START',

	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * top へ戻る scroll animation start event
	     * @event START
	     * @return {string} topButtonStart
	     */
	    get: function get() {
	      return 'topButtonStart';
	    }
	    /**
	     * top へ戻る scroll animation complete event
	     * @event COMPLETE
	     * @return {string} topButtonStart
	     */

	  }, {
	    key: 'COMPLETE',
	    get: function get() {
	      return 'topButtonComplete';
	    }
	  }]);

	  function TopButton(target) {
	    var _ret2;

	    (0, _classCallCheck3.default)(this, TopButton);

	    if (topButtonSymbol !== target) {
	      throw new Error('TopButton is static Class. not use new TopButton().');
	    }
	    if (singletonInstance !== null) {
	      var _ret;

	      return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	    }

	    // -------------------
	    // one time setting
	    /**
	     * animation 可能かの flag
	     * @type {boolean}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (TopButton.__proto__ || (0, _getPrototypeOf2.default)(TopButton)).call(this));

	    _this.can = true;
	    /**
	     * bind onClick
	     * @type {function}
	     */
	    _this.onClick = _this.onClick.bind(_this);

	    singletonInstance = _this;
	    return _ret2 = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret2);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * click event を target element へ設定します
	   * @param {Element} target page top animation を設定する element
	   */


	  (0, _createClass3.default)(TopButton, [{
	    key: 'init',
	    value: function init(target) {
	      if (element !== null) {
	        return;
	      }
	      element = target;
	      element.addEventListener('click', this.onClick, false);
	    }
	    /**
	     * click event handler
	     * animation が可能なら開始する
	     * @param {Event} event click event
	     */

	  }, {
	    key: 'onClick',
	    value: function onClick(event) {
	      event.preventDefault();
	      if (this.can) {
	        this.go();
	      }
	    }
	    /**
	     * scroll animation を開始します
	     */

	  }, {
	    key: 'go',
	    value: function go() {
	      var _this2 = this;

	      if (!this.can) {
	        return;
	      }
	      this.can = false;
	      // scrolling
	      TweenLite.to(window, 0.5, {
	        scrollTo: {
	          y: 0,
	          autoKill: false
	        },
	        // easing
	        ease: easing.Power4.easeInOut,
	        onStart: function onStart() {
	          _this2.dispatch({ type: TopButton.START });
	        },
	        onComplete: function onComplete() {
	          _this2.can = true;
	          _this2.dispatch({ type: TopButton.COMPLETE });
	        }
	      });
	    }
	  }]);
	  return TopButton;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Dom = __webpack_require__(3);

	var _Dom2 = _interopRequireDefault(_Dom);

	var _ViewFlushModal = __webpack_require__(146);

	var _ViewFlushModal2 = _interopRequireDefault(_ViewFlushModal);

	var _SPViewAppBanner = __webpack_require__(149);

	var _SPViewAppBanner2 = _interopRequireDefault(_SPViewAppBanner);

	var _SPViewHeaderSearch = __webpack_require__(150);

	var _SPViewHeaderSearch2 = _interopRequireDefault(_SPViewHeaderSearch);

	var _SPViewHeaderUser = __webpack_require__(152);

	var _SPViewHeaderUser2 = _interopRequireDefault(_SPViewHeaderUser);

	var _SPPageTop = __webpack_require__(163);

	var _SPPageTop2 = _interopRequireDefault(_SPPageTop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// vk mobile 実行ファイル
	/**
	 * header
	 */
	/**
	 * Copyright (c) 2011-2018 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2018/04/19 - 12:49
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	var header = function header() {
	  var element = _Dom2.default.profile();
	  if (element) {
	    var view = new _SPViewHeaderUser2.default(element, {}, true);
	    view.start();
	  }
	};

	/**
	 * 検索フォーム
	 */
	var search = function search() {
	  var element = _Dom2.default.search();
	  var opener = _Dom2.default.searchOpener();
	  if (element && opener) {
	    var view = new _SPViewHeaderSearch2.default(element, opener, {}, true);
	    view.start();
	  }
	};

	/**
	 * アプリケーションバナー
	 */
	var appBanner = function appBanner() {
	  var element = _Dom2.default.appBanner();
	  if (element) {
	    _SPViewAppBanner2.default.init(element, true, true);
	  }
	};

	/**
	 * 実行後の flush modal
	 */
	var modalFlush = function modalFlush() {
	  var element = _Dom2.default.flushModal();
	  if (element) {
	    var view = new _ViewFlushModal2.default(element, {}, true);
	    view.start();
	  }
	};

	/**
	 * page top 戻るアニメーション
	 */
	var pageTop = function pageTop() {
	  // responsive 残骸で pageTop が 2 Element 存在することがある
	  // #js-page_top を sp は優先にする
	  // @since 2017-10-23
	  var element = _Dom2.default.jsPageTop() || _Dom2.default.pageTop();
	  if (element) {
	    var ui = new _SPPageTop2.default(element);
	    ui.start();
	  }
	};

	/**
	 * SP - vk 実行
	 */
	var mobile = function mobile() {
	  // page top
	  pageTop();
	  // modal 準備
	  modalFlush();
	  // app banner
	  appBanner();
	  // header
	  header();
	  // 検索フォーム
	  search();
	};

	exports.default = mobile();

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(95);

	var _View3 = _interopRequireDefault(_View2);

	var _MessageStatus = __webpack_require__(147);

	var _FlushNode = __webpack_require__(148);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */
	var React = self.React;
	/* eslint-enable no-unused-vars */
	/**
	 * [library] - ReactDOM
	 */


	// node
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/26 - 13:17
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var ReactDOM = self.ReactDOM;

	/**
	 * フラッシュ・メッセージ・モーダル
	 */

	var ViewFlushModal = function (_View) {
	  (0, _inherits3.default)(ViewFlushModal, _View);

	  /**
	   * フラッシュ・メッセージ・モーダル
	   * @param {Element} element target HTMLElement
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	   * @since 2-18-04-19 vk header - flag 追加
	   */
	  function ViewFlushModal(element) {
	    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    (0, _classCallCheck3.default)(this, ViewFlushModal);

	    /**
	     * modal instance
	     * @type {null|Object}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ViewFlushModal.__proto__ || (0, _getPrototypeOf2.default)(ViewFlushModal)).call(this, element, option, vk));

	    _this._render = null;
	    /**
	     * bind onModal
	     * @type {function}
	     */
	    _this.onModal = _this.onModal.bind(_this);
	    /**
	     * 完了・注意など一時表示メッセージイベント instance
	     * @type {MessageStatus}
	     */
	    _this.status = _MessageStatus.MessageStatus.factory();
	    return _this;
	  }
	  /**
	   * 初期化
	   */


	  (0, _createClass3.default)(ViewFlushModal, [{
	    key: 'start',
	    value: function start() {
	      this.render();

	      var status = this.status;
	      status.off(_MessageStatus.MessageStatus.FLUSH, this.onModal);
	      status.on(_MessageStatus.MessageStatus.FLUSH, this.onModal);
	    }
	    /**
	     * component 作成
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      this._render = ReactDOM.render(React.createElement(_FlushNode.FlushNode, {
	        vk: this.vk
	      }), this.element);
	    }
	    /**
	     * MessageStatus.FLUSH event handler,
	     * modal window を open します
	     * @param {Object} event MessageStatus.FLUSH event instance
	     */

	  }, {
	    key: 'onModal',
	    value: function onModal(event) {
	      // console.log( 'flush modal event ', event );
	      this._render.updateShow(true, event.message, event.kind, event.sp);
	    }
	  }]);
	  return ViewFlushModal;
	}(_View3.default);

	exports.default = ViewFlushModal;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MessageStatus = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link MessageStatus} inner symbol
	 * @type {symbol}
	 */
	var messageStatusSymbol = (0, _symbol2.default)('MessageStatus symbol');
	/**
	 * {@link MessageStatus} singleton instance
	 * @type {?MessageStatus}
	 * @private
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/02/24 - 14:31
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	/* eslint constructor-super: 0 */

	var singletonInstance = null;

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */
	var React = self.React;
	/* eslint-enable no-unused-vars */

	/**
	 * flush message
	 * - 完了・注意など一時表示メッセージイベント
	 */

	var MessageStatus = exports.MessageStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(MessageStatus, _EventDispatcher);
	  (0, _createClass3.default)(MessageStatus, null, [{
	    key: 'message',

	    /**
	     * Flush modal に表示するメッセージを作成します
	     * @param {string} txt 表示テキスト
	     * @return {XML} JSX を返します
	     */
	    value: function message() {
	      var txt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      return React.createElement(
	        'div',
	        { className: 'messageText' },
	        txt
	      );
	    }
	    // ---------------------------------------------------
	    //  static method
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {MessageStatus} MessageStatus instance を返します
	     */

	  }, {
	    key: 'factory',
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new MessageStatus(messageStatusSymbol);
	      }
	      return singletonInstance;
	    }
	    /**
	     * flush message
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @return {MessageStatus} MessageStatus instance を返します
	     */

	  }, {
	    key: 'FLUSH',

	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * FLUSH message のみ
	     * @return {string} messageFlush を返します
	     */
	    get: function get() {
	      return 'messageFlush';
	    }
	    /**
	     * CONFIRM confirm window
	     * @return {string} messageConfirm を返します
	     */

	  }, {
	    key: 'CONFIRM',
	    get: function get() {
	      return 'messageConfirm';
	    }
	    /**
	     * ALERT alert window
	     * @return {string} messageAlert を返します
	     */

	  }, {
	    key: 'ALERT',
	    get: function get() {
	      return 'messageAlert';
	    }
	    /**
	     * comment delete confirm
	     * @return {string} messageDelete を返します
	     */

	  }, {
	    key: 'DELETE',
	    get: function get() {
	      return 'messageDelete';
	    }
	    /**
	     * OK_CLICK
	     * @return {string} messageOkClick
	     */

	  }, {
	    key: 'OK_CLICK',
	    get: function get() {
	      return 'messageOkClick';
	    }
	    /**
	     * CANCEL_CLICK
	     * @return {string} messageCancelClick
	     */

	  }, {
	    key: 'CANCEL_CLICK',
	    get: function get() {
	      return 'messageCancelClick';
	    }
	    // ---------------------------------------------------
	    //  CONST
	    // ---------------------------------------------------
	    /**
	     * メッセージ種類 INFO
	     * @return {string} info
	     */

	  }, {
	    key: 'INFO',
	    get: function get() {
	      return 'info';
	    }
	    /**
	     * メッセージ種類 ERROR
	     * @return {string} error
	     */

	  }, {
	    key: 'ERROR',
	    get: function get() {
	      return 'error';
	    }
	    /**
	     * メッセージ種類 SUCCESS
	     * @return {string} success
	     */

	  }, {
	    key: 'SUCCESS',
	    get: function get() {
	      return 'success';
	    }
	  }]);

	  function MessageStatus(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, MessageStatus);

	    if (messageStatusSymbol !== target) {
	      throw new Error('MessageStatus is static Class. not use new MessageStatus(). instead MessageStatus.factory()');
	    }
	    if (singletonInstance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (MessageStatus.__proto__ || (0, _getPrototypeOf2.default)(MessageStatus)).call(this));

	      singletonInstance = _this;
	    }
	    return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * flush message event を発火します
	   * @param {XML} message 表示 Element
	   * @param {string} [type=info] flush message 種類 - {@link MessageStatus}.FLUSH
	   * @param {boolean} [sp=false] sp or PC | Tablet
	   */


	  (0, _createClass3.default)(MessageStatus, [{
	    key: 'flush',
	    value: function flush(message) {
	      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MessageStatus.INFO;
	      var sp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      this.dispatch({ type: MessageStatus.FLUSH, message: message, kind: type, sp: sp });
	    }
	    /**
	     * confirm window event を発火します
	     * @param {string} message 表示文字列
	     * @param {Function} ok ok click callback
	     * @param {Function} cancel cancel click callback
	     * @param {string} [type=info] flush message 種類 - {@link MessageStatus}.INFO
	     */

	  }, {
	    key: 'alert',
	    value: function alert(message, ok, cancel) {
	      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MessageStatus.INFO;

	      this.dispatch({ type: MessageStatus.ALERT, message: message, ok: ok, cancel: cancel, kind: type });
	    }
	    /**
	     * alert window event を発火します
	     * @param {string} message 表示文字列
	     * @param {Function} ok ok click callback
	     * @param {Function} cancel cancel click callback
	     * @param {string} [type=info] flush message 種類 - {@link MessageStatus}.INFO
	     */

	  }, {
	    key: 'confirm',
	    value: function confirm(message, ok, cancel) {
	      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MessageStatus.INFO;

	      this.dispatch({ type: MessageStatus.CONFIRM, message: message, ok: ok, cancel: cancel, kind: type });
	    }
	    /**
	     * 削除モーダル
	     * @param {string} id unique id
	     * @param {Function} [ok] ok callback
	     * @param {Function} [cancel] cancel callback
	     * @param {string} [type=MessageStatus.INFO] message type MessageStatus.INFO | MessageStatus.ERROR | MessageStatus.SUCCESS
	     */

	  }, {
	    key: 'remove',
	    value: function remove(id, ok, cancel) {
	      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : MessageStatus.INFO;

	      if (!ok) {
	        ok = function ok() {};
	      }
	      if (!cancel) {
	        cancel = function cancel() {};
	      }
	      this.dispatch({ type: MessageStatus.DELETE, id: id, ok: ok, cancel: cancel, kind: type });
	    }
	  }]);
	  return MessageStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FlushNode = undefined;

	var _MessageStatus = __webpack_require__(147);

	var _Scroll = __webpack_require__(142);

	//
	// // Sagen
	// let Sagen = self.Sagen;

	// React
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/26 - 13:24
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var React = self.React;

	// tween

	// import {Message} from '../../app/const/Message';

	// util
	var greensock = self.com.greensock;
	var TweenLite = greensock.TweenLite;
	var easing = greensock.easing;

	/**
	 * Flush modal を表示します
	 * @type {*|Function|ReactClass}
	 */
	var FlushNode = exports.FlushNode = React.createClass({
	  displayName: 'FlushNode',

	  propTypes: {
	    show: React.PropTypes.bool,
	    type: React.PropTypes.string,
	    message: React.PropTypes.element,
	    vk: React.PropTypes.bool
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      show: false,
	      // info | error | success の 3種類
	      type: 'info',
	      message: React.createElement(
	        'p',
	        null,
	        '\xA0'
	      ),
	      vk: false
	    };
	  },
	  getInitialState: function getInitialState() {
	    // this.status = null;
	    // this.sp = Sagen.Browser.Mobile.phone();
	    this.top = 0;

	    return {
	      show: this.props.show,
	      type: this.props.type,
	      message: this.props.message,
	      css: { opacity: 0 }
	    };
	  },
	  openModal: function openModal() {
	    var object = { opacity: 0 };
	    var _this = this;

	    TweenLite.to(object, 0.1, {
	      opacity: 1,
	      easing: easing.Linear.easeNone,
	      onUpdate: function onUpdate() {
	        _this.setState({ css: { opacity: object.opacity } });
	      },
	      onComplete: function onComplete() {
	        _this.setState({ css: { opacity: 1 } });
	        _this.closeModal(0.25 * 3);
	      }
	    });
	  },
	  closeModal: function closeModal() {
	    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    var object = { opacity: 1 };
	    var _this = this;

	    TweenLite.to(object, 0.5, {
	      delay: delay,
	      opacity: 0,
	      easing: easing.Linear.easeNone,
	      onUpdate: function onUpdate() {
	        _this.setState({ css: { opacity: object.opacity } });
	      },
	      onComplete: function onComplete() {
	        _this.setState({ css: { opacity: 0 }, show: false });
	        _this.top = 0;
	      }
	    });
	  },
	  updateShow: function updateShow(show, message) {
	    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MessageStatus.MessageStatus.INFO;
	    var sp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	    // console.log( 'updateShow ', show, message, type, sp );
	    if (sp) {
	      this.top = _Scroll.Scroll.y;
	    } else {
	      this.top = 0;
	    }
	    this.setState({ show: show, message: message, type: type });
	    if (show) {
	      this.openModal();
	    }
	  },
	  render: function render() {
	    var _this2 = this;

	    var position = function position() {
	      if (_this2.top !== 0) {
	        return { top: _this2.top + 'px' };
	      } else {
	        return { opacity: 1 };
	      }
	    };
	    // console.log( 'render ', this.state.show, position() );
	    if (!this.state.show) {
	      return null;
	    } else {
	      return React.createElement(
	        'div',
	        { className: 'modal-dialogue modal-dialogue_delete', style: this.state.css },
	        React.createElement('div', { className: 'flush-modal-bg modal-bg' }),
	        React.createElement(
	          'div',
	          { className: 'flush-dialogue dialogue-notice ' + this.state.type, style: position() },
	          React.createElement(
	            'div',
	            { className: 'dialogue-notice-inner' },
	            React.createElement(
	              'div',
	              { className: 'dialogue-notice-info' },
	              this.state.message
	            )
	          )
	        )
	      );
	    }
	  }
	});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AppBanner = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Cookie = __webpack_require__(110);

	var _Scroll = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Sagen
	/**
	 * ref: global object - Sagen
	 * @type {Sagen}
	 * @private
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/09/08 - 18:10
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// net
	var Sagen = self.Sagen;

	/**
	 * `.header-sticky` element
	 * @type {null}
	 */


	// util
	var headerSticky = null;
	/**
	 * timer id
	 * @type {number}
	 */
	var timer = 0;

	/**
	 * アプリダウンロードの動線を改善 #1009
	 *
	 * グノシーみたいなアプリバナーを SP の時のみに
	 *
	 * 仕様変更により大幅に書換える - node を react から template に移動<br>
	 * `/app/templates/mobile/_header.php` - line 194
	 * ```
	 * <div id="js-header-appbnr-container">
	 *  <div class="header-appbnr">
	 *    <div class="header-appbnr-btn-close"><span>閉じる</span></div>
	 *      <div class="header-appbnr-link">
	 *      <!-- /531683568/sp_header_app -->
	 *      <script>
	 *        googletag.cmd.push(function() {
	 *          googletag.defineSlot('/531683568/sp_header_app', [270, 70], 'div-gpt-ad-1494939700357-0').addService(googletag.pubads());
	 *          googletag.pubads().enableSingleRequest();
	 *          googletag.enableServices();
	 *        });
	 *      </script>
	 *      <div id='div-gpt-ad-1494939700357-0' style='height:70px; width:270px;'>
	 *        <script>
	 *          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1494939700357-0'); });
	 *        </script>
	 *      </div>
	 *    <!-- // /531683568/sp_header_app -->
	 *    </div><!-- /.header-appbnr-link -->
	 *  </div><!-- /.header-appbnr -->
	 * </div>
	 * ```
	 * @see https://github.com/undotsushin/undotsushin/issues/1009
	 * @since 2017-05-17
	 */

	var AppBanner = exports.AppBanner = function () {
	  (0, _createClass3.default)(AppBanner, null, [{
	    key: 'onScroll',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * Scroll.SCROLL event handler
	     * @param {Object} events Scroll.SCROLL event Object
	     * @see https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-332087234
	     * @since 2-16-09-30 static へ変更
	     * @since 2017-09-26 banner - height: 85 -> 70 変更
	     */
	    value: function onScroll(events) {
	      // if (events.y >= 85) {
	      // @since 2017-09-26
	      //
	      if (events.y >= 70) {
	        AppBanner.visible(false);
	      } else {
	        AppBanner.visible(true);
	      }
	    }
	    /**
	     * iOS safari rendering bug 対応させるために強制再描画します
	     */

	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      if (!headerSticky) {
	        return;
	      }
	      clearTimeout(timer);
	      headerSticky.style.cssText = 'top: 71px;';
	      timer = setTimeout(function () {
	        headerSticky.style.cssText = '';
	      }, 16);
	    }
	    /**
	     * document.body に `.appbnr-invisible` を追加・削除します
	     * @param {boolean} view true の時に `.appbnr-invisible` を削除します
	     */

	  }, {
	    key: 'visible',
	    value: function visible() {
	      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      if (view) {
	        if (Sagen.Dom.hasClass(document.body, 'appbnr-invisible')) {
	          Sagen.Dom.removeClass(document.body, 'appbnr-invisible');
	          AppBanner.refresh();
	        }
	      } else {
	        Sagen.Dom.addClass(document.body, 'appbnr-invisible');
	      }
	    }
	    /**
	     * document.body へ `.appbnr-enable` を追加します
	     */

	  }, {
	    key: 'enable',
	    value: function enable() {
	      Sagen.Dom.addClass(document.body, 'appbnr-enable');
	    }
	    /**
	     * document.body から `.appbnr-enable` を削除します
	     */

	  }, {
	    key: 'free',
	    value: function free() {
	      Sagen.Dom.removeClass(document.body, 'appbnr-enable');
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * app バナー表示コントロール
	     * @param {Element} element target element
	     * @param {boolean} show visible flag
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	     * @since 2018-04-19 vk header - flag 追加
	     */

	  }]);

	  function AppBanner(element, show) {
	    var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    (0, _classCallCheck3.default)(this, AppBanner);

	    /**
	     * target element
	     * @type {Element}
	     */
	    this.element = element;
	    /**
	     * bind onClose
	     * @type {any}
	     */
	    this.onClose = this.onClose.bind(this);
	    /**
	     * default property
	     * @type {{show: boolean}}
	     */
	    this.state = { show: show };
	    /**
	     * Scroll instance
	     * @type {Scroll}
	     */
	    this.scroll = _Scroll.Scroll.factory();
	    /**
	     * VK（バーチャル甲子園）flag
	     * @type {boolean}
	     */
	    this.vk = vk;
	    var headers = document.getElementsByClassName('header-sticky');
	    // console.log('AppBanner headers', headers);
	    if (headers && headers.length) {
	      headerSticky = headers[0];
	    }
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------


	  (0, _createClass3.default)(AppBanner, [{
	    key: 'init',
	    value: function init() {
	      // scroll 監視開始
	      this.activate();
	      // this.element.addEventListener('click', this.onClose, false);
	    }
	    /**
	     * div.header-appbnr-btn-close click event handler
	     * @param {Event} event div.header-appbnr-btn-close click event
	     */

	  }, {
	    key: 'onClose',
	    value: function onClose(event) {
	      event.preventDefault();
	      this.updateShow(false);
	      this.dispose();
	    }
	    /**
	     * state.show を変更します
	     * @param {boolean} show show state value
	     */

	  }, {
	    key: 'updateShow',
	    value: function updateShow(show) {
	      // state が同じだったら処理しない
	      if (this.state.show === show) {
	        return;
	      }

	      if (!show) {
	        // 1 week cookie save
	        // ***開発時コメントにします**
	        _Cookie.Cookie.save('1', _Cookie.Cookie.APP_BANNER, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));
	        // console.log('Cookie', Cookie.APP_BANNER, Cookie.get(Cookie.APP_BANNER));
	        AppBanner.free();
	      } else {
	        // 表示されたらスクロール監視を始める
	        this.activate();
	      }
	      // state update
	      this.state.show = show;
	    }
	    /**
	     * Scroll.SCROLL 監視を開始します
	     */

	  }, {
	    key: 'activate',
	    value: function activate() {
	      this.dispose();

	      var scroll = this.scroll;
	      scroll.on(_Scroll.Scroll.SCROLL, AppBanner.onScroll);
	      scroll.start();
	    }
	    /**
	     * Scroll.SCROLL 監視を止めます
	     */

	  }, {
	    key: 'dispose',
	    value: function dispose() {
	      this.scroll.off(_Scroll.Scroll.SCROLL, AppBanner.onScroll);
	      this.element.removeEventListener('click', this.onClose);
	    }
	  }]);
	  return AppBanner;
	}();

	/**
	 * アプリダウンロードの動線を改善 #1009,
	 * グノシーみたいなアプリバナーを SP の時のみに
	 *
	 * 仕様変更により実装を inner class {@link AppBanner} へ移行しました
	 *
	 * 実行互換のために {@link SPViewAppBanner.init} のみ残し他は削除しました
	 * @since 2017-05-17
	 */


	var SPViewAppBanner = function () {
	  function SPViewAppBanner() {
	    (0, _classCallCheck3.default)(this, SPViewAppBanner);
	  }

	  (0, _createClass3.default)(SPViewAppBanner, null, [{
	    key: 'init',

	    /**
	     * {@link Cookie}.APP_BANNER が無い時 SPViewAppBanner を render しマウントします
	     * @param {Element} element div#js-header-appbnr-container
	     * @param {boolean} [visible=false] render root Element
	     * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	     * @return {boolean} mount すると true を返します
	     * @since 2018-04-19 vk header - flag 追加
	     */
	    value: function init(element) {
	      var visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      // cookie check 止める
	      // @since 2017-09-25
	      var has = false; // Cookie.has(Cookie.APP_BANNER);
	      if (!has && visible) {
	        AppBanner.enable();
	        var banner = new AppBanner(element, visible, vk);
	        banner.init();
	        return true;
	      }
	      // cookie あり または visible: false
	      AppBanner.free();
	      return false;
	    }
	  }]);
	  return SPViewAppBanner;
	}();

	exports.default = SPViewAppBanner;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ViewHeaderSearch2 = __webpack_require__(84);

	var _ViewHeaderSearch3 = _interopRequireDefault(_ViewHeaderSearch2);

	var _SPComponentHeaderSearchOpener = __webpack_require__(151);

	var _SPComponentHeaderSearchOpener2 = _interopRequireDefault(_SPComponentHeaderSearchOpener);

	var _ComponentHeaderSearchForm = __webpack_require__(102);

	var _ComponentHeaderSearchForm2 = _interopRequireDefault(_ComponentHeaderSearchForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// // Sagen
	// let Sagen = self.Sagen;

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */


	// // app
	// import {Message} from '../../../app/const/Message';
	//
	// // event
	// import {SearchStatus} from '../../../event/SearchStatus';

	// // node
	// import {HeaderSearchNode} from '../../../node/header/HeaderSearchNode';

	// util
	// import {Scroll} from '../../../util/Scroll';
	var React = self.React;
	/* eslint-enable no-unused-vars */
	/**
	 * [library] - ReactDOM
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/13 - 22:57
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// parent
	var ReactDOM = self.ReactDOM;

	/**
	 * SP 検索フォーム
	 */

	var SPViewHeaderSearch = function (_ViewHeaderSearch) {
	  (0, _inherits3.default)(SPViewHeaderSearch, _ViewHeaderSearch);

	  /**
	   * 検索フォーム + ロケーション遷移
	   * @param {Element} element insert parent element
	   * @param {Element} buttonElement opener button
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	   * @since 2-18-04-19 vk header - flag 追加
	   */
	  function SPViewHeaderSearch(element, buttonElement) {
	    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var vk = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	    (0, _classCallCheck3.default)(this, SPViewHeaderSearch);

	    /**
	     * opener button
	     * @type {Element}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (SPViewHeaderSearch.__proto__ || (0, _getPrototypeOf2.default)(SPViewHeaderSearch)).call(this, element, option, vk));

	    _this.button = buttonElement;
	    return _this;
	  }
	  /**
	   * header 検索フォームを生成します
	   * - {@link ComponentHeaderSearchForm}
	   * - {@link SPComponentHeaderSearchOpener}
	   */


	  (0, _createClass3.default)(SPViewHeaderSearch, [{
	    key: 'render',
	    value: function render() {
	      // search form
	      ReactDOM.render(React.createElement(_ComponentHeaderSearchForm2.default, {
	        listen: true,
	        show: false,
	        vk: this.vk
	      }), this.element);
	      // search form opener button
	      ReactDOM.render(React.createElement(_SPComponentHeaderSearchOpener2.default, {
	        vk: this.vk
	      }), this.button);
	    }
	  }]);
	  return SPViewHeaderSearch;
	}(_ViewHeaderSearch3.default);

	exports.default = SPViewHeaderSearch;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _SearchStatus = __webpack_require__(104);

	var _Scroll = __webpack_require__(142);

	var _Message = __webpack_require__(106);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * [library] - Sagen
	 */
	var Sagen = self.Sagen;

	// React
	/**
	 * [library] - React
	 */
	/**
	 * Copyright (c) 2011-2017 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2017/12/12 - 15:09
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	var React = self.React;

	/**
	 * SP: header - 検索フォーム open / close button
	 */

	var SPComponentHeaderSearchOpener = function (_React$Component) {
	  (0, _inherits3.default)(SPComponentHeaderSearchOpener, _React$Component);
	  (0, _createClass3.default)(SPComponentHeaderSearchOpener, null, [{
	    key: 'restore',

	    /**
	     * 検索フォームを閉じる時に scroll 値を復元します
	     * @param {number} y target scroll top px value
	     */
	    value: function restore(y) {
	      // scrollY が 0 でない時は 復元 しない
	      // ユーザーが scroll している可能性がある
	      if (_Scroll.Scroll.y !== 0) {
	        return;
	      }
	      _Scroll.Scroll.motion(y, 0.1, 0.025);
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * SP: header - 検索フォーム open / close button 準備します
	     * @param {*} props React.props
	     */

	  }, {
	    key: 'propTypes',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * React.propTypes
	     * - vk: since 2018-04-19 - vk header
	     * @returns {{vk: boolean}} React.propTypes
	     */
	    get: function get() {
	      return {
	        vk: React.PropTypes.bool.isRequired
	      };
	    }
	  }]);

	  function SPComponentHeaderSearchOpener(props) {
	    (0, _classCallCheck3.default)(this, SPComponentHeaderSearchOpener);

	    // -----
	    /**
	     * document.body - Sagen.Dom instance
	     * @type {*}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (SPComponentHeaderSearchOpener.__proto__ || (0, _getPrototypeOf2.default)(SPComponentHeaderSearchOpener)).call(this, props));

	    _this.body = new Sagen.Dom(document.body);
	    /**
	     * 開いているか真偽値
	     * @private
	     * @type {Boolean}
	     */
	    _this.open = false;
	    /**
	     * SearchStatus instance
	     * @private
	     * @type {SearchStatus}
	     */
	    _this.status = _SearchStatus.SearchStatus.factory();
	    /**
	     * scroll top
	     * @default 0
	     * @private
	     * @type {number}
	     */
	    _this.y = 0;
	    /**
	     * bind onClick
	     * @type {function}
	     */
	    _this.onClick = _this.onClick.bind(_this);
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * a.onclick event handler - search container open / close します
	   * @param {Event} event click event
	   */


	  (0, _createClass3.default)(SPComponentHeaderSearchOpener, [{
	    key: 'onClick',
	    value: function onClick(event) {
	      event.preventDefault();
	      // iOS
	      // fixed 内の input に focus すると
	      // fixed -> absolute に変わる
	      // どうも仕様な様子
	      // そのため blur 後の scroll 位置が 0 になるのを元に戻すために
	      // open 時の scroll 位置を保存し復元する
	      // console.log('SPComponentHeaderSearchOpener.onClick', this.open);
	      if (this.open) {
	        // open -> close
	        this.open = false;
	        this.body.removeClass('search-form-open');
	        this.status.close();
	        // scroll 位置を復元する
	        // Scroll.motion( this.y, 0.1, 0.025 );
	        SPComponentHeaderSearchOpener.restore(this.y);
	      } else {
	        // close -> open
	        this.open = true;
	        // scroll 位置を保存する
	        this.y = _Scroll.Scroll.y;
	        this.body.addClass('search-form-open');
	        this.status.open();
	      }
	    }

	    /**
	     * `a.head-search-opener` 検索フォーム open = close button
	     * @returns {XML} `a.head-search-opener`
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'a',
	        { className: 'head-search-opener', href: '#', onClick: this.onClick },
	        _Message.Message.OPENER_SEARCH
	      );
	    }
	  }]);
	  return SPComponentHeaderSearchOpener;
	}(React.Component);

	exports.default = SPComponentHeaderSearchOpener;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SPHeaderNormalUserComponent = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View2 = __webpack_require__(95);

	var _View3 = _interopRequireDefault(_View2);

	var _SPViewHeaderMember = __webpack_require__(153);

	var _SPViewHeaderMember2 = _interopRequireDefault(_SPViewHeaderMember);

	var _User = __webpack_require__(109);

	var _Url = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */


	// app
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/11 - 19:32
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// view
	var React = self.React;
	/* eslint-enable no-unused-vars */
	/**
	 * [library] - ReactDOM
	 */
	var ReactDOM = self.ReactDOM;

	/**
	 * SP - 非ログインユーザー header area Element
	 * - login / ユーザー登録リンクを出力します
	 * @returns {XML} `div.user`
	 * @constructor
	 */
	var SPHeaderNormalUserComponent = exports.SPHeaderNormalUserComponent = function SPHeaderNormalUserComponent() {
	  return React.createElement(
	    'div',
	    { className: 'user' },
	    React.createElement(
	      'div',
	      { className: 'preference' },
	      React.createElement(
	        'a',
	        { href: _Url.Url.signupLogin(), className: 'preference-opener' },
	        React.createElement(
	          'span',
	          { className: 'preference-avatar' },
	          '\xA0'
	        )
	      )
	    )
	  );
	};

	/**
	 * SP header user 関連メニュー
	 */

	var SPViewHeaderUser = function (_View) {
	  (0, _inherits3.default)(SPViewHeaderUser, _View);

	  /**
	   * SP header user 関連メニュー
	   * - ログイン / 非ログイン でメニューを変更
	   * @param {Element} element insert root element
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	   * @since 2-18-04-19 vk header - flag 追加
	   */
	  function SPViewHeaderUser(element) {
	    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    (0, _classCallCheck3.default)(this, SPViewHeaderUser);

	    /**
	     * bind 済み this.memberCallback
	     * @type {Function}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (SPViewHeaderUser.__proto__ || (0, _getPrototypeOf2.default)(SPViewHeaderUser)).call(this, element, option, vk));

	    _this._boundCallback = _this.memberCallback.bind(_this);
	    /**
	     * login user view instance(SPViewHeaderMember)
	     * @type {null|Object|SPViewHeaderMember}
	     * @private
	     */
	    _this._member = null;
	    return _this;
	  }
	  /**
	   * rendering 開始
	   */


	  (0, _createClass3.default)(SPViewHeaderUser, [{
	    key: 'start',
	    value: function start() {
	      this.render();
	    }
	    /**
	     * rendering
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      if (_User.User.sign) {
	        this.member();
	      } else {
	        this.user();
	      }
	    }
	    /**
	     * ログインユーザー
	     */

	  }, {
	    key: 'member',
	    value: function member() {
	      var headerMember = new _SPViewHeaderMember2.default(this.element, {}, this.vk);
	      this._member = headerMember;

	      var boundCallback = this._boundCallback;
	      headerMember.on(_View3.default.BEFORE_RENDER, boundCallback);
	      headerMember.on(_View3.default.WILL_MOUNT, boundCallback);
	      headerMember.on(_View3.default.DID_MOUNT, boundCallback);
	      headerMember.on(_View3.default.ERROR_MOUNT, boundCallback);
	      headerMember.on(_View3.default.UNDEFINED_ERROR, boundCallback);
	      headerMember.on(_View3.default.EMPTY_ERROR, boundCallback);
	      headerMember.on(_View3.default.RESPONSE_ERROR, boundCallback);
	      headerMember.start();
	    }
	    /**
	     * 非ログインユーザー
	     */

	  }, {
	    key: 'user',
	    value: function user() {
	      // 非ログインユーザー
	      ReactDOM.render(React.createElement(SPHeaderNormalUserComponent, {
	        vk: this.vk
	      }), this.element);
	    }
	    /**
	     * ViewHeaderMember callback 中継
	     * @param {Object} event event object
	     */

	  }, {
	    key: 'memberCallback',
	    value: function memberCallback(event) {
	      var member = this._member;
	      var callback = this._boundCallback;
	      if (member !== null) {
	        member.off(event.type, callback);
	      }
	      this.dispatch(event);

	      if (event.type === _View3.default.RESPONSE_ERROR || event.type === _View3.default.UNDEFINED_ERROR || event.type === _View3.default.EMPTY_ERROR) {
	        // token はあるけどユーザー情報が取得できなかった
	        // 処理を止めて一般ユーザー扱いにする
	        this.dispose();
	        // this.render();
	        this.user();
	      }
	    }
	    /**
	     * member event handler dispose
	     */

	  }, {
	    key: 'dispose',
	    value: function dispose() {
	      var member = this._member;
	      if (member !== null) {
	        var boundCallback = this._boundCallback;
	        member.off(_View3.default.BEFORE_RENDER, boundCallback);
	        member.off(_View3.default.WILL_MOUNT, boundCallback);
	        member.off(_View3.default.DID_MOUNT, boundCallback);
	        member.off(_View3.default.ERROR_MOUNT, boundCallback);
	        member.off(_View3.default.UNDEFINED_ERROR, boundCallback);
	        member.off(_View3.default.EMPTY_ERROR, boundCallback);
	        member.off(_View3.default.RESPONSE_ERROR, boundCallback);
	        this._member = null;
	      }
	    }
	  }]);
	  return SPViewHeaderUser;
	}(_View3.default);

	exports.default = SPViewHeaderUser;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _View = __webpack_require__(95);

	var _View2 = _interopRequireDefault(_View);

	var _ViewHeaderMember2 = __webpack_require__(108);

	var _ViewHeaderMember3 = _interopRequireDefault(_ViewHeaderMember2);

	var _SPComponentHeaderMemberSetting = __webpack_require__(154);

	var _SPComponentHeaderMemberSetting2 = _interopRequireDefault(_SPComponentHeaderMemberSetting);

	var _Empty = __webpack_require__(140);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// React
	/* eslint-disable no-unused-vars */
	/**
	 * [library] - React
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/11 - 20:11
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	// view
	var React = self.React;
	/* eslint-enable no-unused-vars */
	/**
	 * [library] - ReactDOM
	 */
	var ReactDOM = self.ReactDOM;

	// Sagen
	// let Gasane = self.Gasane;

	/**
	 * SP header ログイン・メンバー 関連メニュー
	 * @since 2018-04-19 vk header - flag 追加
	 */

	var SPViewHeaderMember = function (_ViewHeaderMember) {
	  (0, _inherits3.default)(SPViewHeaderMember, _ViewHeaderMember);

	  /**
	   * SP header ログイン・メンバー 関連メニュー
	   * - アイコン+drop down menu 表示
	   *
	   * @param {Element} element insert root element
	   * @param {Object} [option={}] optional event handler
	   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
	   * @since 2018-04-19 vk header - flag 追加
	   */
	  function SPViewHeaderMember(element) {
	    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var vk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    (0, _classCallCheck3.default)(this, SPViewHeaderMember);

	    /**
	     * bind 済み executeSafely
	     * @type {function}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (SPViewHeaderMember.__proto__ || (0, _getPrototypeOf2.default)(SPViewHeaderMember)).call(this, element, option, vk));

	    _this.boundSafely = _this.executeSafely.bind(_this);
	    /**
	     * bound didMount
	     * @type {function}
	     */
	    _this.boundMount = _this.didMount.bind(_this);
	    return _this;
	  }
	  /**
	   * Dom を生成します
	   * @param {UserDae} response JSON UserDae instance
	   */


	  (0, _createClass3.default)(SPViewHeaderMember, [{
	    key: 'render',
	    value: function render(response) {
	      // --------------------------------------------------
	      this.executeSafely(_View2.default.BEFORE_RENDER, response);
	      // --------------------------------------------------
	      // when reload
	      if (this.reloadFlag) {
	        this.reloadFlag = false;
	        clearTimeout(this._timer);
	        this.timer = setTimeout(this.boundReload, 1000);
	      }
	      // component
	      ReactDOM.render(React.createElement(_SPComponentHeaderMemberSetting2.default, {
	        icon: response.profilePicture,
	        userName: response.userName,
	        safely: this.boundSafely,
	        did: this.boundMount,
	        vk: this.vk
	      }), this.element);
	    }
	    /**
	     * VK 専用・ログインユーザーheader 表示
	     * @since 2018-04-19 VK（バーチャル甲子園）flag
	     */

	  }, {
	    key: 'vkRender',
	    value: function vkRender() {
	      ReactDOM.render(React.createElement(_SPComponentHeaderMemberSetting2.default, {
	        icon: _Empty.Empty.USER_EMPTY,
	        userName: '',
	        safely: this.boundSafely,
	        did: this.boundMount,
	        vk: this.vk
	      }), this.element);
	    }
	  }]);
	  return SPViewHeaderMember;
	}(_ViewHeaderMember3.default);

	exports.default = SPViewHeaderMember;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isInteger = __webpack_require__(25);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Length = __webpack_require__(155);

	var _Polling = __webpack_require__(156);

	var _Polling2 = _interopRequireDefault(_Polling);

	var _Model = __webpack_require__(158);

	var _ModelNoticeCount = __webpack_require__(159);

	var _NoticeStatus = __webpack_require__(162);

	var _View = __webpack_require__(95);

	var _View2 = _interopRequireDefault(_View);

	var _Safety = __webpack_require__(24);

	var _Empty = __webpack_require__(140);

	var _Url = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * [library] - React
	 */
	var React = self.React;

	/**
	 * SP: header - member setting menu
	 */
	/**
	 * Copyright (c) 2011-2017 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2017/12/12 - 21:44
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var SPComponentHeaderMemberSetting = function (_React$Component) {
	  (0, _inherits3.default)(SPComponentHeaderMemberSetting, _React$Component);
	  (0, _createClass3.default)(SPComponentHeaderMemberSetting, null, [{
	    key: 'propTypes',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * React.propTypes
	     * @returns {{userName: string, icon: string, safely: function, did: function}}
	     * React.propTypes
	     */
	    get: function get() {
	      return {
	        userName: React.PropTypes.string.isRequired,
	        icon: React.PropTypes.string.isRequired,
	        safely: React.PropTypes.func.isRequired,
	        did: React.PropTypes.func.isRequired,
	        vk: React.PropTypes.bool.isRequired
	      };
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * SP: header - member setting menu 出力準備をします
	     * @param {*} props React.props
	     */

	  }]);

	  function SPComponentHeaderMemberSetting(props) {
	    (0, _classCallCheck3.default)(this, SPComponentHeaderMemberSetting);

	    // ---
	    /**
	     * React.state
	     * @type {{total: number, userName: string, icon: string}}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (SPComponentHeaderMemberSetting.__proto__ || (0, _getPrototypeOf2.default)(SPComponentHeaderMemberSetting)).call(this, props));

	    _this.state = {
	      total: 0,
	      userName: props.userName,
	      icon: props.icon
	    };
	    var onDone = _this.onDone.bind(_this);
	    var onFail = _this.onFail.bind(_this);
	    var callbacks = {};
	    callbacks[_Model.Model.COMPLETE] = onDone;
	    callbacks[_Model.Model.UNDEFINED_ERROR] = onFail;
	    callbacks[_Model.Model.RESPONSE_ERROR] = onFail;
	    /**
	     * callback list
	     * @type {*}
	     * */
	    _this.callbacks = callbacks;
	    /**
	     * bind onUpdate
	     * @type {function}
	     * */
	    _this.onUpdate = _this.onUpdate.bind(_this);
	    /**
	     * bind onDone
	     * @type {function}
	     * */
	    _this.onDone = onDone;
	    /**
	     * bind onFail
	     * @type {function}
	     * */
	    _this.onFail = onFail;
	    /**
	     * Polling instance - 定期的に {@link ModelNoticeCount} を実行します
	     * @type {Polling}
	     * */
	    _this.polling = new _Polling2.default(_Length.Length.interval);
	    /**
	     * notice count を取得しバッジ表示します
	     * @type {ModelNoticeCount}
	     * */
	    _this.model = new _ModelNoticeCount.ModelNoticeCount(callbacks);
	    /**
	     * お知らせ更新を通知する管理マネージャー
	     * @type {NoticeStatus}
	     * */
	    _this.status = _NoticeStatus.NoticeStatus.factory();
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * {@link Polling}.UPDATE event handler
	   * */


	  (0, _createClass3.default)(SPComponentHeaderMemberSetting, [{
	    key: 'onUpdate',
	    value: function onUpdate() {
	      this.polling.off(_Polling2.default.UPDATE, this.onUpdate);
	      this.model.start();
	    }
	    /**
	     * {@link ModelNoticeCount} success callback
	     * @param {Result} result Ajax JSON
	     * */

	  }, {
	    key: 'onDone',
	    value: function onDone(result) {
	      var total = result.count;
	      if ((0, _isInteger2.default)(total) && total !== this.state.total) {
	        this.updateTotal(total);
	      }
	      this.restart();
	    }
	    /**
	     * {@link ModelNoticeCount} fail callback
	     * */

	  }, {
	    key: 'onFail',
	    value: function onFail() {
	      this.restart();
	    }
	    /**
	     * お知らせ件数を update します
	     * @param {number} total notice 件数
	     * */

	  }, {
	    key: 'updateTotal',
	    value: function updateTotal(total) {
	      this.setState({ total: total });
	      this.status.update(total);
	    }
	    /**
	     * event を unbind します
	     * */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var polling = this.polling;
	      polling.off(_Polling2.default.UPDATE, this.onUpdate);
	    }
	    /**
	     * {@link Polling} を restart します
	     * */

	  }, {
	    key: 'restart',
	    value: function restart() {
	      var polling = this.polling;
	      polling.off(_Polling2.default.UPDATE, this.onUpdate);
	      polling.on(_Polling2.default.UPDATE, this.onUpdate);
	      polling.setPolling(_Length.Length.interval);
	    }
	    /**
	     * delegate - after mount
	     * - props callback function を実行します
	     * - {@link Polling} を  開始します
	     * */

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props = this.props,
	          safely = _props.safely,
	          did = _props.did;

	      safely(_View2.default.DID_MOUNT);
	      did();
	      // ----
	      this.model.start();
	      // -----
	      var polling = this.polling;
	      polling.off(_Polling2.default.UPDATE, this.onUpdate);
	      polling.on(_Polling2.default.UPDATE, this.onUpdate);
	      polling.start();
	    }
	    /**
	     * delegate - will mount - `destroy` 実行します
	     * */

	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.destroy();
	    }
	    /**
	     * delegate - 更新 props を state と比較し更新するかを決定します
	     * @param {{icon: string, userName: string}} nextProps 更新 props
	     * */

	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var icon = nextProps.icon,
	          userName = nextProps.userName;

	      if (icon !== this.state.icon || userName !== this.state.userName) {
	        this.setState({ icon: icon, userName: userName });
	      }
	    }
	    /**
	     * SP: member setting menu を出力します
	     * @returns {XML} `div.user`
	     * */

	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state,
	          total = _state.total,
	          icon = _state.icon,
	          userName = _state.userName;

	      var noticeStyle = total === 0 ? { display: 'none' } : { display: 'block' };
	      // const iconImg = Safety.image(icon, Empty.USER_EMPTY);
	      // const loggedIn = Safety.same(iconImg, Empty.USER_EMPTY);
	      // vk 絶対パス - 2018-04-19
	      var iconImg = '' + _Url.Url.host + _Safety.Safety.image(icon, _Empty.Empty.USER_EMPTY);
	      var loggedIn = _Safety.Safety.same(iconImg, '' + _Url.Url.host + _Empty.Empty.USER_EMPTY);
	      return React.createElement(
	        'div',
	        { className: 'user' },
	        React.createElement(
	          'div',
	          { className: 'preference' },
	          React.createElement(
	            'a',
	            { href: _Url.Url.settings(), className: 'preference-opener' },
	            React.createElement(
	              'span',
	              { className: 'preference-avatar ' + loggedIn },
	              React.createElement('img', { src: _Empty.Empty.refresh(icon), alt: userName })
	            )
	          ),
	          React.createElement(
	            'span',
	            { className: 'preference-num', style: noticeStyle },
	            total
	          )
	        )
	      );
	    }
	  }]);
	  return SPComponentHeaderMemberSetting;
	}(React.Component);

	exports.default = SPComponentHeaderMemberSetting;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Length = undefined;

	var _isInteger = __webpack_require__(25);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// let _symbol = Symbol();
	// let _pickup = 5;
	/**
	 * PICKUP - Carousel articles, 記事数無制限変更になったのでリクエスト数を変更する
	 * @type {number}
	 * @private
	 * @default 9999
	 * @since 2017-04-10
	 */
	var valuePickup = 9999;
	// 最終データ(last 1)を CM にするために 6件 -> 5件 にする
	/**
	 * headline 件数
	 * @type {number}
	 * @private
	 * @default 5
	 */
	var valueHeadline = 5;
	/**
	 * sidebar ranking 件数
	 * @type {number}
	 * @private
	 * @default 5
	 */
	var valueRanking = 5;
	/**
	 * sidebar recommend video 件数
	 * @type {number}
	 * @private
	 * @default 5
	 */
	var valueVideo = 5;
	/**
	 * 一覧出力件数
	 * @type {number}
	 * @private
	 * @default 16
	 */
	var valueArchive = 16;
	// データが少ない時用
	// let _archive = 2;
	/**
	 * mypage 一覧件数
	 * @type {number}
	 * @private
	 * @default 10
	 */
	var valueList = 10;
	/**
	 * 最大値
	 * @type {number}
	 * @private
	 * @default 999
	 */
	var valueMax = 999;

	/**
	 * polling 間隔
	 * @type {number}
	 * @private
	 * @default 1000 * 60 (1m.)
	 */
	var valueInterval = 1000 * 60;

	/**
	 * offset length default value
	 * - Ajax request 時の query, length の default value です
	 * - 全て static です
	 */

	var Length = exports.Length = function () {
	  function Length() {
	    (0, _classCallCheck3.default)(this, Length);
	  }

	  (0, _createClass3.default)(Length, null, [{
	    key: "pickup",

	    // /**
	    //  * static class です, instance を作成しません
	    //  * @param {Symbol} target Singleton を実現するための private symbol
	    //  */
	    // constructor( target ) {
	    //   if (_symbol !== target) {
	    //     throw new Error( 'Length is static Class. not use new Length().' );
	    //   }
	    // }
	    // ---------------------------------------------------
	    //  GETTER / SETTER
	    // ---------------------------------------------------
	    // --- pickup
	    /**
	     * home pickup
	     * @default 5
	     * @return {number} pickup default 取得数を返します
	     */
	    get: function get() {
	      return valuePickup;
	    }
	    /**
	     * home pickup, length を設定します
	     * @param {number} value pickup default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        valuePickup = value;
	      } else {
	        throw new Error("pickup: integer required. " + value);
	      }
	    }
	    // --- headline
	    /**
	     * home headline
	     * @default 5
	     * @return {number} headline default 取得数を返します
	     */

	  }, {
	    key: "headline",
	    get: function get() {
	      return valueHeadline;
	    }
	    /**
	     * home headline, length を設定します
	     * @param {number} value headline default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        valueHeadline = value;
	      } else {
	        throw new Error("headline: integer required. " + value);
	      }
	    }
	    // --- ranking
	    /**
	     * sidebar ranking
	     * @default 5
	     * @return {number} ranking default 取得数を返します
	     */

	  }, {
	    key: "ranking",
	    get: function get() {
	      return valueRanking;
	    }
	    /**
	     * sidebar ranking, length を設定します
	     * @param {number} value ranking default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        valueRanking = value;
	      } else {
	        throw new Error("ranking: integer required. " + value);
	      }
	    }

	    // sp single ranking
	    /**
	     * SP, 記事詳細「人気記事」表示件数<br>
	     * default: 10
	     * @since 2016-06-16
	     * @return {number} SP, 記事詳細「人気記事」表示件数を返します
	     */

	  }, {
	    key: "spRanking",
	    get: function get() {
	      return 10;
	    }
	    // --- video
	    /**
	     * sidebar video
	     * @default 5
	     * @return {number} video default 取得数を返します
	     */

	  }, {
	    key: "video",
	    get: function get() {
	      return valueVideo;
	    }
	    /**
	     * sidebar video, length を設定します
	     * @param {number} value video default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        valueVideo = value;
	      } else {
	        throw new Error("video: integer required. " + value);
	      }
	    }
	    // --- archive
	    /**
	     * 記事一覧
	     * @default 16
	     * @return {number} archive default 取得数を返します
	     */

	  }, {
	    key: "archive",
	    get: function get() {
	      return valueArchive;
	    }
	    /**
	     * 記事一覧, length を設定します
	     * @param {number} value archive default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        valueArchive = value;
	      } else {
	        throw new Error("archive: integer required. " + value);
	      }
	    }
	    // --- list
	    /**
	     * mypage 一覧
	     * @default 10
	     * @return {number} archive default 取得数を返します
	     */

	  }, {
	    key: "list",
	    get: function get() {
	      return valueList;
	    }
	    /**
	     * mypage 一覧, length を設定します
	     * @param {number} value archive default 取得数
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        valueList = value;
	      } else {
	        throw new Error("archive: integer required. " + value);
	      }
	    }
	    // --- max
	    /**
	     * 最大値
	     * @return {number} length 最大値を返します
	     */

	  }, {
	    key: "max",
	    get: function get() {
	      return valueMax;
	    }
	    // --- interval
	    /**
	     * polling 間隔(ms)
	     * @default 1000 * 60
	     * @return {number} interval(ms) を返します
	     */

	  }, {
	    key: "interval",
	    get: function get() {
	      return valueInterval;
	    }
	    /**
	     * polling 間隔(ms) を設定します
	     * @param {number} value interval ms
	     */
	    ,
	    set: function set(value) {
	      if ((0, _isInteger2.default)(value)) {
	        valueInterval = value;
	      } else {
	        throw new Error("interval: integer required. " + value);
	      }
	    }
	  }]);
	  return Length;
	}();

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher2 = __webpack_require__(96);

	var _Cycle = __webpack_require__(157);

	var _Cycle2 = _interopRequireDefault(_Cycle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// /**
	//  * private property key, this.update.bind(this) を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const updateSymbol = Symbol('Polling singleton symbol');
	// /**
	//  * private property key, Cycle.UPDATE 監視を開始したかを表す真偽値を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const startSymbol = Symbol('Cycle.UPDATE has watched flag');
	// /**
	//  * private property key, Fps.start 時間を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const beginSymbol = Symbol('already called Fps.start flag');
	// /**
	//  * private property key, polling を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const pollingSymbol = Symbol('keep polling instance');
	// /**
	//  * Polling.UPDATE event を発火する時の Events instance を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const eventsSymbol = Symbol('Polling.UPDATE Events instance');

	/**
	 * 一定間隔毎に UPDATE イベントを発生させます
	 * @since 2016-11-16
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/07/04 - 16:46
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// event
	var Polling = function (_EventDispatcher) {
	  (0, _inherits3.default)(Polling, _EventDispatcher);
	  (0, _createClass3.default)(Polling, null, [{
	    key: 'UPDATE',

	    // ----------------------------------------
	    // EVENT
	    // ----------------------------------------
	    /**
	     * 一定間隔(milliseconds)毎に発生するイベント type を取得します
	     * @return {string} event, pollingUpdate を返します
	     */
	    get: function get() {
	      return 'pollingUpdate';
	    }
	    // ----------------------------------------
	    // CONSTRUCTOR
	    // ----------------------------------------
	    /**
	     * 引数の polling に合わせ UPDATE イベントを発生させます
	     * @param {number} [polling=1000] polling milliseconds
	     */

	  }]);

	  function Polling() {
	    var polling = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
	    (0, _classCallCheck3.default)(this, Polling);

	    // @type {Cycle} - Cycle instance
	    // const cycle = Cycle.factory();
	    // public property
	    // /**
	    //  * @property {Cycle} this.cycle - Cycle instance
	    //  */
	    // Object.assign(this, { cycle });
	    //
	    // // private property
	    // // @type {number} - polling rate(milliseconds), default: 1000(1 sec.)
	    // this[pollingSymbol] = polling;
	    // // @type {function} - Cycle.UPDATE event handler
	    // this[updateSymbol] = this.update.bind(this);
	    // // @type {boolean} - started flag
	    // this[startSymbol] = false;
	    // // @type {number} - 開始時間
	    // this[beginSymbol] = 0;
	    // let begin = 0;
	    // this.begin = () => begin;
	    // this.setBegin = (time) => {
	    //   begin = time;
	    // };
	    // @type {Events} - Events
	    // this[eventsSymbol] = new Events(Polling.UPDATE, this, this);
	    // this[eventsSymbol] = {
	    //   type: Polling.UPDATE,
	    //   target: this,
	    //   currentTarget: this
	    // };

	    /**
	     * {@link Cycle} instance
	     * @type {Cycle}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Polling.__proto__ || (0, _getPrototypeOf2.default)(Polling)).call(this));

	    _this.cycle = _Cycle2.default.factory();
	    /**
	     * polling milliseconds
	     * @type {number}
	     */
	    _this.polling = polling;
	    /**
	     * bind update - {@link Cycle}.UPDATE - event handler
	     * @type {function}
	     */
	    _this.boundUpdate = _this.update.bind(_this);
	    /**
	     * start flag
	     * @type {boolean}
	     * @default false
	     */
	    _this.started = false;
	    /**
	     * 開始時間
	     * @type {number}
	     * @default 0
	     */
	    _this.begin = 0;
	    /**
	     * Polling.UPDATE - events
	     * @type {{type: string, target: Polling, currentTarget: Polling}}
	     */
	    _this.events = {
	      type: Polling.UPDATE,
	      target: _this,
	      currentTarget: _this
	    };
	    return _this;
	  }
	  // ----------------------------------------
	  // GETTER / SETTER
	  // ----------------------------------------
	  // fps
	  // /**
	  //  * polling(milliseconds) を取得します
	  //  * @return {number} polling(milliseconds) を返します
	  //  */
	  // get polling() {
	  //   return this[pollingSymbol];
	  // }
	  // /**
	  //  * polling(milliseconds) を設定します
	  //  * @param {number} rate polling(milliseconds)
	  //  */
	  // set polling(rate) {
	  //   this[pollingSymbol] = rate;
	  // }
	  // begin
	  // /**
	  //  * 開始時間を取得します
	  //  * @return {number} 開始時間を返します
	  //  */
	  // get begin() {
	  //   return this[beginSymbol];
	  // }
	  // /**
	  //  * 開始時間を設定します
	  //  * @param {number} time 開始時間
	  //  */
	  // set begin(time) {
	  //   this[beginSymbol] = time;
	  // }
	  // events
	  // /**
	  //  * Events instance を取得します
	  //  * @return {Events} Events instance を返します
	  //  */
	  // get events() {
	  //   return this[eventsSymbol];
	  // }
	  // /**
	  //  * Events instance を設定します
	  //  * @param {Events} events Events instance
	  //  */
	  // set events(events) {
	  //   this[eventsSymbol] = events;
	  // }
	  // // flag
	  // /**
	  //  * started flag 状態を取得します
	  //  * @readonly
	  //  * @return {boolean} 現在の started flag 状態を返します
	  //  */
	  // get started() {
	  //   return this[startSymbol];
	  // }
	  // ----------------------------------------
	  // METHOD
	  // ----------------------------------------
	  /**
	   * started flag を反転させ現在の started flag 状態を取得します
	   * @return {boolean} 現在の started flag 状態を返します
	   */


	  (0, _createClass3.default)(Polling, [{
	    key: 'turnOver',
	    value: function turnOver() {
	      // this[startSymbol] = !this[startSymbol];
	      this.started = !this.started;
	      return this.started;
	    }
	    /**
	     * events object を発火前に作成します
	     * @param {number} begin 開始時間: 前回の発火時間
	     * @param {number} present 現在時間
	     * @return {Events} アップデートした Events を返します
	     */

	  }, {
	    key: 'updateEvents',
	    value: function updateEvents(begin, present) {
	      // this.begin = begin;
	      // @type {Events} - start event
	      var events = this.events;
	      events.begin = begin;
	      events.present = present;
	      events.polling = this.polling;
	      return events;
	    }
	    /**
	     * cycle ループを開始します<br>
	     * watch Cycle.UPDATE event
	     * @return {Cycle} cycle ループを開始しインスタンスを返します
	     */

	  }, {
	    key: 'initCycle',
	    value: function initCycle() {
	      // cycle
	      var cycle = this.cycle;
	      // bind Cycle.UPDATE
	      // cycle.on(Cycle.UPDATE, this[updateSymbol]);
	      cycle.on(_Cycle2.default.UPDATE, this.boundUpdate);
	      // cycle 開始
	      cycle.start();
	      return cycle;
	    }
	    /**
	     * polling を開始します
	     * @return {boolean} start に成功すると true を返します
	     */

	  }, {
	    key: 'start',
	    value: function start() {
	      if (this.started) {
	        // already start
	        return false;
	      }
	      // begin
	      // @since 2017-03-28 - 基準値を start 時に更新する
	      this.begin = Date.now();
	      // flag -> true
	      // this[startSymbol] = true;
	      this.turnOver();
	      // cycle
	      this.initCycle();
	      // // @type {number} - 開始時間
	      // const present = Date.now();
	      // 強制的に1回目を実行
	      // this.fire(this.updateEvents(present, present));

	      return true;
	    }
	    /**
	     * polling を止めます
	     * @return {boolean} stop に成功すると true を返します
	     */

	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (!this.started) {
	        // not start
	        return false;
	      }
	      // this.cycle.off(Cycle.UPDATE, this[updateSymbol]);
	      this.cycle.off(_Cycle2.default.UPDATE, this.boundUpdate);
	      // this[startSymbol] = false;
	      this.turnOver();
	      return true;
	    }
	    /**
	     * Cycle.UPDATE event handler, polling を計測しイベントを発火するかを判断します
	     *
	     * @listens {Cycle.UPDATE} Cycle.UPDATE が発生すると実行されます
	     * @return {boolean} Polling.UPDATE event が発生すると true を返します
	     */
	    // onUpdate() {

	  }, {
	    key: 'update',
	    value: function update() {
	      // 現在時間
	      // @type {number}
	      var present = Date.now();
	      // @type {number} - polling 間隔
	      var polling = this.polling;
	      // @type {number} - 開始時間
	      var begin = this.begin;
	      // 現在時間 が interval より大きくなったか
	      if (present - begin >= polling) {
	        // event 発火
	        this.fire(this.updateEvents(begin, present));
	        // 開始時間を update
	        this.begin = present;
	        // event 発生
	        return true;
	      }
	      return false;
	    }
	    /**
	     * Polling.UPDATE event を発生します
	     * @param {Events} events Polling.UPDATE event object
	     * @return {undefined} no-return
	     */

	  }, {
	    key: 'fire',
	    value: function fire(events) {
	      this.dispatch(events);
	    }
	    /**
	     * 開始時間をリセットします
	     */

	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.begin = Date.now();
	    }
	    /**
	     * polling を再設定し現在時間をスタートに置き換えます
	     * @param {number} polling 時間間隔(ms)
	     * @return {Polling} chainable instance
	     */

	  }, {
	    key: 'setPolling',
	    value: function setPolling(polling) {
	      this.begin = Date.now();
	      this.polling = polling;
	      return this;
	    }
	    /**
	     * alias setPolling
	     * @param {number} polling 時間間隔(ms)
	     * @return {Polling} chainable instance
	     */

	  }, {
	    key: 'changePolling',
	    value: function changePolling(polling) {
	      return this.setPolling(polling);
	    }
	  }]);
	  return Polling;
	}(_EventDispatcher2.EventDispatcher);
	// import { default as Events } from '../event/Events';

	// tick


	exports.default = Polling;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import { Events } from '../event/Events';

	/**
	 * new を許可しないための Symbol
	 * @type {Symbol}
	 * @private
	 */
	var singletonSymbol = (0, _symbol2.default)('Cycle singleton SYmbol');
	/**
	 * singleton instance, nullable
	 * @type {?Cycle}
	 * @private
	 */
	/**
	 * @license inazumatv.com
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/07/03
	 *
	 * Copyright (c) 2011-2015 inazumatv.com, inc.
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 */

	// event
	var instance = null;

	// /**
	//  * private property key, requestAnimationFrame ID を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const requestSymbol = Symbol('requestAnimationFrame ID');
	// /**
	//  * private property key, this.update.bind(this) を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const updateSymbol = Symbol('bound update');
	// /**
	//  * private property key, requestAnimationFrame を開始したかを表す真偽値を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const startSymbol = Symbol('has started requestAnimationFrame flag');
	// /**
	//  * Cycle.UPDATE event を発火する時の Events instance を保存するための Symbol
	//  * @type {Symbol}
	//  * @private
	//  */
	// const eventsSymbol = Symbol('Cycle.UPDATE Events instance');

	/**
	 * requestAnimationFrame でループイベントを発生させます
	 * - singleton なので new ではなく factory を使用し instance を作成します
	 * - requestAnimationFrame は browser tab が active(focus) な時のみ発生します
	 *
	 * ```
	 * const loop = Cycle.factory();
	 * ```
	 *
	 * @since 2016-11-16
	 */

	var Cycle = function (_EventDispatcher) {
	  (0, _inherits3.default)(Cycle, _EventDispatcher);
	  (0, _createClass3.default)(Cycle, null, [{
	    key: 'factory',

	    // ----------------------------------------
	    // STATIC METHOD
	    // ----------------------------------------
	    /**
	     * Cycle instance を singleton を保証し作成します
	     * @return {Cycle} Cycle instance を返します
	     */
	    value: function factory() {
	      if (!instance) {
	        instance = new Cycle(singletonSymbol);
	      }
	      return instance;
	      // return new Cycle(singletonSymbol);
	    }
	    // ----------------------------------------
	    // CONSTRUCTOR
	    // ----------------------------------------
	    /**
	     * singleton です
	     * @param {Symbol} checkSymbol singleton を保証するための private instance
	     * @return {Cycle} singleton instance を返します
	     */

	  }, {
	    key: 'UPDATE',

	    // ----------------------------------------
	    // EVENT
	    // ----------------------------------------
	    /**
	     * requestAnimationFrame 毎に発生するイベントを取得します
	     * @event UPDATE
	     * @return {string} event, cycleUpdate を返します
	     * @default cycleUpdate
	     */
	    get: function get() {
	      return 'cycleUpdate';
	    }
	  }]);

	  function Cycle(checkSymbol) {
	    var _ret2;

	    (0, _classCallCheck3.default)(this, Cycle);

	    // checkSymbol と singleton が等価かをチェックします
	    if (checkSymbol !== singletonSymbol) {
	      throw new Error('don\'t use new, instead use static factory method.');
	    }
	    // instance 作成済みかをチェックし instance が null の時 this を設定します
	    if (instance !== null) {
	      var _ret;

	      return _ret = instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	    }
	    // ----

	    // onetime setting
	    // instance = this;
	    // // @type {Events} - Events
	    // // this[eventsSymbol] = new Events(Cycle.UPDATE, this, this);
	    // this[eventsSymbol] = {
	    //   type: Cycle.UPDATE,
	    //   target: this,
	    //   currentTarget: this
	    // };
	    //
	    // // @type {number} - requestAnimationFrame return id
	    // this[requestSymbol] = 0;
	    // // @type {function} - update bind function
	    // this[updateSymbol] = this.update.bind(this);
	    // // @type {boolean} - started flag
	    // this[startSymbol] = false;
	    /**
	     * Cycle.UPDATE event を発火する時の Event object - {@link Cycle}.UPDATE
	     * @type {{type: string, target: Cycle, currentTarget: Cycle}}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Cycle.__proto__ || (0, _getPrototypeOf2.default)(Cycle)).call(this));

	    _this.events = {
	      type: Cycle.UPDATE,
	      target: _this,
	      currentTarget: _this
	    };
	    /**
	     * requestAnimationFrame ID
	     * @type {number}
	     * @default 0
	     */
	    _this.animationId = 0;
	    /**
	     * requestAnimationFrame を開始したかを表す真偽値
	     * @type {boolean}
	     * @default false;
	     */
	    _this.started = false;
	    /**
	     * bind onUpdate - `requestAnimationFrame` 実行します
	     * @type {function}
	     */
	    _this.onUpdate = _this.onUpdate.bind(_this);

	    // 設定済み instance を返します
	    return _ret2 = _this, (0, _possibleConstructorReturn3.default)(_this, _ret2);
	  }
	  // // ----------------------------------------
	  // // GETTER / SETTER
	  // // ----------------------------------------
	  // /**
	  //  * Events instance を取得します
	  //  * @return {Object} Events instance
	  //  */
	  // get events() {
	  //   return this[eventsSymbol];
	  // }
	  // ----------------------------------------
	  // METHOD
	  // ----------------------------------------
	  /**
	   * loop(requestAnimationFrame) を開始します
	   * @return {boolean} start に成功すると true を返します
	   */


	  (0, _createClass3.default)(Cycle, [{
	    key: 'start',
	    value: function start() {
	      // if (this[startSymbol]) {
	      if (this.started) {
	        // already start
	        // console.warn('Cycle.start already start', this[startSymbol]);
	        return false;
	      }
	      // this[startSymbol] = true;
	      this.started = true;
	      // this.update();
	      this.onUpdate();

	      // @return
	      return true;
	    }
	    /**
	     * loop を止めます `cancelAnimationFrame` を実行します - 全ての `loop` を止めます
	     * @param {number} [id=this.animationId] requestAnimationFrame id を使い cancelAnimationFrame をします
	     * @return {boolean} stop に成功すると true を返します
	     */

	  }, {
	    key: 'stop',
	    value: function stop() {
	      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.animationId;

	      // stop(id = this[requestSymbol]) {
	      if (!this.started) {
	        // if (!this[startSymbol]) {
	        // not start
	        return false;
	      }

	      cancelAnimationFrame(id);
	      // this[startSymbol] = false;
	      this.started = false;

	      // @return
	      return true;
	    }
	    // ----------------------------------------
	    // PRIVATE METHOD
	    // ----------------------------------------
	    /**
	     * loop(requestAnimationFrame)コールバック関数<br>Cycle.UPDATE event を発火します
	       */

	  }, {
	    key: 'onUpdate',
	    value: function onUpdate() {
	      // update() {
	      // @type {number} - requestAnimationFrame id
	      var id = requestAnimationFrame(this.onUpdate);
	      // const id = requestAnimationFrame(this[updateSymbol]);
	      this.animationId = id;
	      // this[requestSymbol] = id;

	      // @type {Object} - events
	      var events = this.events;
	      events.id = id;
	      // event fire
	      this.dispatch(events);
	    }
	  }]);
	  return Cycle;
	}(_EventDispatcher2.EventDispatcher);

	exports.default = Cycle;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Model = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _EventDispatcher2 = __webpack_require__(96);

	var _Safety = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * <p>View がない Api request<p>
	 * <p>action Class を実行し option に設定された callback を実行します</p>
	 *
	 * @example
	 * let option = {
	 *  Model.UNDEFINED_ERROR: () => {},
	 *  Model.EMPTY_ERROR: () => {},
	 *  Model.RESPONSE_ERROR: () => {},
	 *  Model.COMPLETE: () => {}
	 * };
	 *
	 * let model = new Model( option );
	 * model.start();
	 */
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

	var Model = exports.Model = function (_EventDispatcher) {
	  (0, _inherits3.default)(Model, _EventDispatcher);

	  /**
	   * View がない Api request, 親クラス
	   * @param {?Object} [option={}] optional event handler
	   */
	  function Model() {
	    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Model);

	    var safetyOption = _Safety.Safety.object(option);

	    /**
	     * callback をセットした Object
	     *
	     * @example
	     * const option = {
	     *  Model.UNDEFINED_ERROR: () => {},
	     *  Model.EMPTY_ERROR: () => {},
	     *  Model.RESPONSE_ERROR: () => {},
	     *  Model.COMPLETE: () => {}
	     * };
	     *
	     * @type {Object}
	     * @protected
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Model.__proto__ || (0, _getPrototypeOf2.default)(Model)).call(this));

	    _this._option = safetyOption;
	    /**
	     * action Class が設定されます
	     * @type {*}
	     * @protected
	     * @default null
	     */
	    _this._action = null;
	    return _this;
	  }
	  // ---------------------------------------------------
	  //  GETTER / SETTER
	  // ---------------------------------------------------
	  /**
	   * callback handler がセットされたObject
	   * @return {Object} callback handler がセットされたObjectを返します
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
	      // console.log( 'executeSafely ', keyName, option.hasOwnProperty( keyName ), option, args );
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
	     * event UNDEFINED_ERROR<br>
	     * Ajax は成功, 存在すべき key が無い or 値が null
	     * @return {string} modelUndefinedError を返します
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
	     * Action instance
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
	      return 'modelUndefinedError';
	    }
	    /**
	     * event EMPTY_ERROR<br>
	     * Ajax は成功, 存在すべき値は配列で存在するが length 0
	     * @return {string} modelEmptyError を返します
	     */

	  }, {
	    key: 'EMPTY_ERROR',
	    get: function get() {
	      return 'modelEmptyError';
	    }
	    /**
	     * event RESPONSE_ERROR<br>
	     * Ajax 失敗
	     * @return {string} modelResponseError を返します
	     */

	  }, {
	    key: 'RESPONSE_ERROR',
	    get: function get() {
	      return 'modelResponseError';
	    }
	    /**
	     * event COMPLETE<br>
	     * Ajax 成功
	     * action 終了後 success 時に使用します
	     * @return {string} modelComplete を返します
	     */

	  }, {
	    key: 'COMPLETE',
	    get: function get() {
	      return 'modelComplete';
	    }
	  }]);
	  return Model;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ModelNoticeCount = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Model2 = __webpack_require__(158);

	var _Result = __webpack_require__(115);

	var _NoticeCount = __webpack_require__(160);

	var _NoticeCountDae = __webpack_require__(161);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * お知らせ未読数を取得します
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/03 - 15:18
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var ModelNoticeCount = exports.ModelNoticeCount = function (_Model) {
	  (0, _inherits3.default)(ModelNoticeCount, _Model);

	  /**
	   * お知らせ未読数を取得します
	   * @param {Object} [option={}] optional event handler
	   */
	  function ModelNoticeCount() {
	    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ModelNoticeCount);

	    /**
	     * Action instance を設定します
	     * @override
	     * @type {NoticeCount}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ModelNoticeCount.__proto__ || (0, _getPrototypeOf2.default)(ModelNoticeCount)).call(this, option));

	    _this.action = new _NoticeCount.NoticeCount(_this.done.bind(_this), _this.fail.bind(_this));
	    return _this;
	  }
	  /**
	   * Ajax request を開始します
	   */


	  (0, _createClass3.default)(ModelNoticeCount, [{
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
	        var error = new Error('[MODEL_NOTICE_COUNT:UNDEFINED]サーバーレスポンスに問題が発生しました。');
	        this.executeSafely(_Model2.Model.UNDEFINED_ERROR, error);
	      } else {

	        // 成功 callback
	        this.executeSafely(_Model2.Model.COMPLETE, new _NoticeCountDae.NoticeCountDae(result));
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
	  return ModelNoticeCount;
	}(_Model2.Model);

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NoticeCount = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _ActionAuth2 = __webpack_require__(113);

	var _Api = __webpack_require__(121);

	var _User = __webpack_require__(109);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * お知らせ未読数を取得します
	 */
	var NoticeCount = exports.NoticeCount = function (_ActionAuth) {
	  (0, _inherits3.default)(NoticeCount, _ActionAuth);

	  /**
	   * お知らせ未読数を取得します
	   * @param {Function} [resolve=null] Ajax 成功時の callback
	   * @param {Function} [reject=null] Ajax 失敗時の callback
	   */
	  function NoticeCount() {
	    var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    (0, _classCallCheck3.default)(this, NoticeCount);
	    return (0, _possibleConstructorReturn3.default)(this, (NoticeCount.__proto__ || (0, _getPrototypeOf2.default)(NoticeCount)).call(this, _User.User.token, _Api.Api.notice('count'), resolve, reject));
	  }

	  return NoticeCount;
	}(_ActionAuth2.ActionAuth); /**
	                             * Copyright (c) 2011-2016 inazumatv.com, inc.
	                             * @author (at)taikiken / http://inazumatv.com
	                             * @date 2016/03/03 - 14:59
	                             *
	                             * Distributed under the terms of the MIT license.
	                             * http://www.opensource.org/licenses/mit-license.html
	                             *
	                             * This notice shall be included in all copies or substantial portions of the Software.
	                             *
	                             */

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NoticeCountDae = undefined;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _StatusDae = __webpack_require__(118);

	var _Result = __webpack_require__(115);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 他人からの通知数を取得する
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/03 - 15:27
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// import {Safety} from '../../data/Safety';
	var NoticeCountDae = exports.NoticeCountDae = function () {
	  /**
	   * 他人からの通知数を取得する
	   * @param {Object} [result={}] JSON result
	   */
	  function NoticeCountDae(result) {
	    (0, _classCallCheck3.default)(this, NoticeCountDae);

	    /**
	     * JSON result
	     * @type {Result}
	     * @private
	     */
	    this._result = result;
	    /**
	     * result.response
	     * @type {Object}
	     * @private
	     */
	    this._response = result.response;
	    /**
	     * result.status
	     * @type {StatusDae}
	     * @private
	     */
	    this._status = new _StatusDae.StatusDae(result.status);
	  }
	  /**
	   * JSON.response
	   * @return {Object|*} JSON response を返します
	   */


	  (0, _createClass3.default)(NoticeCountDae, [{
	    key: 'response',
	    get: function get() {
	      return this._response;
	    }
	    /**
	     * JSON.status
	     * @return {StatusDae|*} JSON status を返します
	     */

	  }, {
	    key: 'status',
	    get: function get() {
	      return this._status;
	    }
	    /**
	     * response.count
	     * @return {Number} response.count を返します
	     */

	  }, {
	    key: 'count',
	    get: function get() {
	      return this.response.count;
	    }
	    /**
	     * alias count
	     * response.count
	     * @return {Number} response.count を返します
	     */

	  }, {
	    key: 'total',
	    get: function get() {
	      return this.count;
	    }
	  }]);
	  return NoticeCountDae;
	}();

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NoticeStatus = undefined;

	var _getPrototypeOf = __webpack_require__(85);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(89);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _inherits2 = __webpack_require__(90);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _symbol = __webpack_require__(69);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _EventDispatcher2 = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * {@link NoticeStatus} singleton instance を保証するための inner Symbol
	 * @type {symbol}
	 * @private
	 */
	var noticeStatusSymbol = (0, _symbol2.default)('NoticeStatus singleton instance');
	/**
	 * {@link NoticeStatus} singleton instance
	 * @type {?NoticeStatus}
	 * @private
	 */
	/**
	 * Copyright (c) 2011-2016 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2016/03/03 - 17:06
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */
	/* eslint constructor-super: 0 */

	var singletonInstance = null;

	/**
	 * お知らせ更新を通知するための custom Event
	 * @example
	 * var status = NoticeStatus.factory();
	 * */

	var NoticeStatus = exports.NoticeStatus = function (_EventDispatcher) {
	  (0, _inherits3.default)(NoticeStatus, _EventDispatcher);
	  (0, _createClass3.default)(NoticeStatus, null, [{
	    key: 'factory',

	    // ---------------------------------------------------
	    //  STATIC METHOD
	    // ---------------------------------------------------
	    /**
	     * instance を生成します
	     * @return {NoticeStatus} NoticeStatus instance を返します
	     */
	    value: function factory() {
	      if (singletonInstance === null) {
	        singletonInstance = new NoticeStatus(noticeStatusSymbol);
	      }
	      return singletonInstance;
	    }
	    // ---------------------------------------------------
	    //  EVENT
	    // ---------------------------------------------------
	    /**
	     * UPDATE_COUNT, お知らせが更新された Event
	     * @return {string} noticeUpdateCount を返します
	     */

	  }, {
	    key: 'UPDATE_COUNT',
	    get: function get() {
	      return 'noticeUpdateCount';
	    }
	    // ---------------------------------------------------
	    //  CONSTRUCTOR
	    // ---------------------------------------------------
	    /**
	     * お知らせ更新 を通知する SingleTon
	     *
	     * @param {Symbol} target Singleton を実現するための private symbol
	     * @return {UserStatus} UserStatus インスタンスを返します
	     */

	  }]);

	  function NoticeStatus(target) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, NoticeStatus);

	    if (noticeStatusSymbol !== target) {
	      throw new Error('NoticeStatus is static Class. not use new NoticeStatus().');
	    }
	    if (singletonInstance === null) {
	      var _this = (0, _possibleConstructorReturn3.default)(this, (NoticeStatus.__proto__ || (0, _getPrototypeOf2.default)(NoticeStatus)).call(this));

	      singletonInstance = _this;
	    }
	    return _ret = singletonInstance, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	  // ---------------------------------------------------
	  //  METHOD
	  // ---------------------------------------------------
	  /**
	   * お知らせが更新 Event を発火させます
	   * @param {Number} count お知らせ件数
	   */


	  (0, _createClass3.default)(NoticeStatus, [{
	    key: 'update',
	    value: function update(count) {
	      this.dispatch({ type: NoticeStatus.UPDATE_COUNT, count: count });
	    }
	  }]);
	  return NoticeStatus;
	}(_EventDispatcher2.EventDispatcher);

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2018 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2018/04/19 - 18:20
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	// TweenMax
	/**
	 * [library] - gsap.TweenLite
	 */
	var TweenLite = self.TweenLite;
	/**
	 * [library] - gsap.easing
	 */
	var easing = self.com.greensock.easing;

	/**
	 * SP page top に戻るボタンの実装 - 移植 `exe-sp` から
	 * @since 2018-04-19 vk header
	 */

	var SPPageTop = function () {
	  /**
	   * SP page top に戻るボタン
	   * @param {Element} element click target
	   */
	  function SPPageTop(element) {
	    (0, _classCallCheck3.default)(this, SPPageTop);

	    /**
	     * click target
	     * @type {Element}
	     */
	    this.element = element;
	    // this.onComplete = this.onComplete.bind(this);
	    /**
	     * bind onClick
	     * @type {any}
	     */
	    this.onClick = this.onClick.bind(this);
	    /**
	     * motion 可能 flag
	     * @type {boolean}
	     */
	    this.can = true;
	  }

	  /**
	   * click event handler - page top 戻るアニメーション開始
	   * @param {Event} event click Event
	   */


	  (0, _createClass3.default)(SPPageTop, [{
	    key: 'onClick',
	    value: function onClick(event) {
	      event.preventDefault();
	      this.move();
	    }
	    // onComplete() {
	    //   this.can = true;
	    // }
	    /**
	     * page top 戻るアニメーション開始
	     * - `can` flag チェックし可能なら開始します
	     */

	  }, {
	    key: 'move',
	    value: function move() {
	      var _this = this;

	      if (!this.can) {
	        return;
	      }
	      this.can = false;
	      // scrolling
	      TweenLite.to(window, 0.5, {
	        scrollTo: {
	          y: 0,
	          autoKill: false
	        },
	        // easing
	        ease: easing.Power4.easeInOut,
	        onComplete: function onComplete() {
	          _this.can = true;
	        }
	      });
	    }
	    /**
	     * click event を監視します
	     */

	  }, {
	    key: 'start',
	    value: function start() {
	      this.element.addEventListener('click', this.onClick, false);
	    }
	  }]);
	  return SPPageTop;
	}();

	exports.default = SPPageTop;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(5);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (c) 2011-2018 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2018/04/19 - 19:20
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 */

	var prefix = '';

	/**
	 * VK - 設定ファイル
	 */

	var VK = function () {
	  function VK() {
	    (0, _classCallCheck3.default)(this, VK);
	  }

	  (0, _createClass3.default)(VK, null, [{
	    key: 'prefix',
	    get: function get() {
	      return prefix;
	    },
	    set: function set(dataPrefix) {
	      prefix = dataPrefix;
	    }
	  }]);
	  return VK;
	}();

	exports.default = VK;

/***/ })
/******/ ]);