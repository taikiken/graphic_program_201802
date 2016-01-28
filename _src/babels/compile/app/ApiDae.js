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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Env = require('./Env');

var _Path = require('./Path');

var _Types = require('../net/Types');

var _Type = require('../net/types/Type');

var _Permalink = require('../net/types/Permalink');

var _Queries = require('../net/types/Queries');

var _Query = require('../net/types/Query');

var _CommentType = require('../net/types/CommentType');

var _Loc = require('../util/Loc');

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
// https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=986840481
// API 一覧より
var buildPath = function buildPath() {
  // 共通パス
  // 先頭 protocol + host 部分を develop / production で変える
  var API_PATH = apiRoot(_Loc.Loc.port) + '/api/v1';

  return {
    // 登録
    'users:add': new _Types.Types(new _Type.Type(API_PATH + '/users', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),
    // login / logout
    'users:login': new _Types.Types(new _Type.Type(API_PATH + '/sessions', 'POST'), new _Permalink.Permalink(), new _Queries.Queries()),
    'users:logout': new _Types.Types(new _Type.Type(API_PATH + '/sessions', 'DELETE'), new _Permalink.Permalink(), new _Queries.Queries()),
    // カテゴリー一覧
    'categories': new _Types.Types(new _Type.Type(API_PATH + '/category'), new _Permalink.Permalink(['all', '*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
    // home / self
    // /api/v1/articles/home[/|/pickup|/headline]
    'home': new _Types.Types(new _Type.Type(API_PATH + '/articles/home'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
    'self': new _Types.Types(new _Type.Type(API_PATH + '/articles/self'), new _Permalink.Permalink(['pickup', 'headline']), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]), true),
    // 記事一覧
    // /api/v1/articles/category/{all|:category_slug}[/|/ranking|/video]
    'category': new _Types.Types(new _Type.Type(API_PATH + '/articles/category'), new _Permalink.Permalink(['all', '*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
    // 検索
    // /api/vi/articles/search/{:keywords}
    'search': new _Types.Types(new _Type.Type(API_PATH + '/articles/search'), new _Permalink.Permalink(['*'], true), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
    // 記事詳細
    // /api/v1/articles/{:article_id}
    'single': new _Types.Types(new _Type.Type(API_PATH + '/articles/' + _Path.Path.ARTICLE_ID), new _Permalink.Permalink(['*'], true), new _Queries.Queries()),
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
    'users:id:bookmark': new _Types.Types(new _Type.Type(API_PATH + '/users/' + _Path.Path.USER_ID + '/bookmark'), new _Permalink.Permalink(), new _Queries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
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
    'users:self:notifications': new _Types.Types(new _Type.Type(API_PATH + '/users/self/notifications'), new _Permalink.Permalink(), new _Queries.Queries(), true),
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
    'users:delete': new _Types.Types(new _Type.Type(API_PATH + '/users/self'), new _Permalink.Permalink(), new _Queries.Queries(), true)
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