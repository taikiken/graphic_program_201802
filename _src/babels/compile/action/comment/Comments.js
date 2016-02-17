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

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _OffsetAuth2 = require('../OffsetAuth');

var _Api = require('../../net/Api');

var _User = require('../../app/User');

var _Path = require('../../app/const/Path');

var _CommentsType = require('../../app/const/CommentsType');

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>コメント一覧<h3>
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
          return Comments.mine(id, resolve, reject);

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