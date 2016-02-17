/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/14
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = undefined;

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
 * **コメント送信**
 * FormData を送る token 付き Action
 */

var Comment = exports.Comment = function (_ActionAuthBehavior) {
  (0, _inherits3.default)(Comment, _ActionAuthBehavior);

  /**
   * <h3>コメント送信</h3>
   * FormData を送る token 付き Action
   * @param {string} articleId 記事 id
   * @param {FormData} formData body に送る FormData
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function Comment(articleId, formData) {
    var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    (0, _classCallCheck3.default)(this, Comment);

    if (!_Safety.Safety.isFormData(formData)) {
      throw new Error('need correct formData ', formData);
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Comment).call(this, _User.User.token, _Api.Api.comment('send'), formData, resolve, reject));

    _this._articleId = articleId;
    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */

  (0, _createClass3.default)(Comment, [{
    key: 'url',
    get: function get() {
      return _Path.Path.article(this._url, this._articleId);
    }
  }]);
  return Comment;
}(_ActionAuthBehavior2.ActionAuthBehavior);