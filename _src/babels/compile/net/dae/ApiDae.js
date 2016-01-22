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

var _Env = require('../../app/Env');

var _Types = require('../Types');

var _Type = require('../types/Type');

var _Permalink = require('../types/Permalink');

var _Queries = require('../types/Queries');

var _Query = require('../types/Query');

var _CommentType = require('../comment/CommentType');

var _Loc = require('../../util/Loc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// develop mode 時に api アクセス先を 0.0.0.0: + (port +2) へ
// IP: 52.69.203.137
// HOST: undotsushin.com
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
    'bookmark': new _Types.Types(new _Type.Type(API_PATH + '/articles/bookmark', 'POST|DELETE'), new _Permalink.Permalink(['*'], true), new _Queries.Queries(), true),
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
 */

var ApiDae = exports.ApiDae = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function ApiDae(target) {
    (0, _classCallCheck3.default)(this, ApiDae);

    if (_symbol !== target) {

      throw new Error('User is static Class. not use new User().');
    }
  }
  /**
   * /api/ 前 domain を再生成します
   * test, develop 切り替えに使用します
   */

  (0, _createClass3.default)(ApiDae, null, [{
    key: 'rebuild',
    value: function rebuild() {
      _api = buildPath();
    }

    /**
     * api list を取得します
     * @method all
     * @return {{login: Types, home: Types, self: Types, category: Types, search: Types, detail: Types, bookmark:add: Types, bookmark:delete: Types, comment: Types, comment:send: Types, comment:reply: Types, comment:send:edit: Types, comment:reply:edit: Types, comment:send:delete: Types, comment:reply:delete: Types, comment:good:add: Types, comment:good:delete: Types, comment:bad:add: Types, comment:bad:delete: Types, users:notice: Types, users:notice:read: Types, users: Types, users:bookmark: Types, users:activity: Types}}
     * 全ての API list を返します
     */

  }, {
    key: 'all',
    value: function all() {

      return _api;
    }

    /**
     * 指定キー情報を取得します
     * @method api
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