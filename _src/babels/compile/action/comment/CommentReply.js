/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 16:31
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
exports.CommentReply = undefined;

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

var _ActionAuthBehavior2 = require('../ActionAuthBehavior');

var _Api = require('../../net/Api');

var _Safety = require('../../data/Safety');

var _User = require('../../app/User');

var _Path = require('../../app/const/Path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * コメント返信
 */

var CommentReply = exports.CommentReply = function (_ActionAuthBehavior) {
  (0, _inherits3.default)(CommentReply, _ActionAuthBehavior);

  /**
   * コメント返信
   * @param {string} articleId 記事 id
   * @param {string} commentId コメント id
   * @param {FormData} formData body に送る FormData
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function CommentReply(articleId, commentId, formData) {
    var resolve = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var reject = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
    (0, _classCallCheck3.default)(this, CommentReply);

    if (!_Safety.Safety.isFormData(formData)) {
      throw new Error('need correct formData ', formData);
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CommentReply).call(this, _User.User.token, _Api.Api.comment('reply'), formData, resolve, reject));

    _this._articleId = articleId;
    _this._commentId = commentId;
    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */

  (0, _createClass3.default)(CommentReply, [{
    key: 'url',
    get: function get() {
      return _Path.Path.comment(_Path.Path.article(this._url, this._articleId), this._commentId);
    }
  }]);
  return CommentReply;
}(_ActionAuthBehavior2.ActionAuthBehavior);