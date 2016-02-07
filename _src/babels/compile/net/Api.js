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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = undefined;

var _Types = require('./Types');

var _User = require('./../app/User');

var _ApiDae = require('./../app/ApiDae');

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