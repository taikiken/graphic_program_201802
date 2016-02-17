/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 14:45
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
exports.CommentStar = undefined;

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

var _ActionAuthBehavior2 = require('../ActionAuthBehavior');

var _Api = require('../../net/Api');

var _Path = require('../../app/const/Path');

var _Safety = require('../../data/Safety');

var _User = require('../../app/User');

var _ActionType = require('../../app/const/ActionType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * コメント GOOD / BAD を行います
 */

var CommentStar = exports.CommentStar = function (_ActionAuthBehavior) {
  (0, _inherits3.default)(CommentStar, _ActionAuthBehavior);

  /**
   * コメント GOOD / BAD を行います
   * @param {Number} commentId コメント Id
   * @param {string} type good or bad
   * @param {string} mode add or delete
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function CommentStar(target, commentId, type) {
    var resolve = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var reject = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
    (0, _classCallCheck3.default)(this, CommentStar);

    if (_symbol !== target) {

      throw new Error('CommentStar is static Class. not use new CommentStar(). instead CommentStar.add, CommentStar.remove');
    }
    // 正規化
    // type は good | bad
    // mode は add | delete
    if (!_Safety.Safety.normalize(type, [_ActionType.ActionType.GOOD, _ActionType.ActionType.BAD])) {
      throw new Error('type is not correct. ' + type);
    }

    // 登録
    var add = _Api.Api.comment(type + ':' + _ActionType.ActionType.ADD);
    // 解除
    var remove = _Api.Api.comment(type + ':' + _ActionType.ActionType.DELETE);

    // 登録用で super 実行

    // global へ( super の後 )

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CommentStar).call(this, _User.User.token, add, null, resolve, reject));

    _this._add = add;
    _this._remove = remove;
    _this._commentId = commentId;
    return _this;
  }
  /**
   * コメントId
   * @return {string} コメントIdを返します
   */

  (0, _createClass3.default)(CommentStar, [{
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

      console.error('illegal operation, use start. instead add / delete.');
    }
    /**
     * コメント Good / Bad 登録
     */

  }, {
    key: 'add',
    value: function add() {

      this._ajax.start(this.url, this._add.method, this.success.bind(this), this.fail.bind(this));
    }
    /**
     * コメント Good / Bad 解除
     */

  }, {
    key: 'remove',
    value: function remove() {

      this._ajax.start(this.url, this._remove.method, this.success.bind(this), this.fail.bind(this));
    }
    // ---------------------------------------------------
    //  static METHOD
    // ---------------------------------------------------
    /**
     * comment good instance 作成
     * @param {Number} commentId コメント Id
     * @param {Function} [resolve=null] Ajax 成功時の callback
     * @param {Function} [reject=null] Ajax 失敗時の callback
     * @return {CommentStar} comment good instance を返します
     */

  }, {
    key: 'commentId',
    get: function get() {
      return this._commentId;
    }
    /**
     * コメントId を設定
     * @param {Number} id コメントId
     */
    ,
    set: function set(id) {
      this._commentId = id;
    }
    /**
     * url を作成します
     * @return {string} 作成した url を返します
     */

  }, {
    key: 'url',
    get: function get() {
      return _Path.Path.comment(this._url, this.commentId);
    }
  }], [{
    key: 'good',
    value: function good(commentId) {
      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return new CommentStar(_symbol, commentId, _ActionType.ActionType.GOOD, resolve, reject);
    }
    /**
     * comment bad instance 作成
     * @param {Number} commentId コメント Id
     * @param {Function} [resolve=null] Ajax 成功時の callback
     * @param {Function} [reject=null] Ajax 失敗時の callback
     * @return {CommentStar} comment bad instance を返します
     */

  }, {
    key: 'bad',
    value: function bad(commentId) {
      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return new CommentStar(_symbol, commentId, _ActionType.ActionType.BAD, resolve, reject);
    }
  }]);
  return CommentStar;
}(_ActionAuthBehavior2.ActionAuthBehavior);