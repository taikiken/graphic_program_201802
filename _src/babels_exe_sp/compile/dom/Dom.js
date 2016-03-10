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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

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
     * category container
     * @return {Element} category-container を返します
     */

  }, {
    key: 'category',
    value: function category() {
      return Dom.get('category-container');
    }
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