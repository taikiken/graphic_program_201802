/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 17:28
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
exports.Bookmark = undefined;

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

var _Action2 = require('../Action');

var _Api = require('../../net/Api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事のブックマーク登録 / 解除
 * /api/v1/articles/bookmark/{:article_id}
 */

var Bookmark = exports.Bookmark = function (_Action) {
  (0, _inherits3.default)(Bookmark, _Action);

  /**
   * 記事のブックマーク登録 / 解除 を行います
   * @param {number} id article id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function Bookmark(id) {
    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    (0, _classCallCheck3.default)(this, Bookmark);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Bookmark).call(this, _Api.Api.bookmark(), resolve, reject));

    _this._id = parseInt(id, 10);

    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------

  (0, _createClass3.default)(Bookmark, [{
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

      console.error('illegal operation, use start with method: ' + method);
    }

    /**
     * 記事のブックマーク登録
     */

  }, {
    key: 'add',
    value: function add() {

      this._ajax.start(this.url, 'POST', this.success.bind(this), this.fail.bind(this));
    }

    /**
     * 記事のブックマーク解除
     */

  }, {
    key: 'remove',
    value: function remove() {

      this._ajax.start(this.url, 'DELETE', this.success.bind(this), this.fail.bind(this));
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
    /**
     * url を作成します
     * @method url
     * @returns {string} 作成した url を返します
     */

  }, {
    key: 'url',
    get: function get() {
      return this._url + '/' + this.id;
    }
  }]);
  return Bookmark;
}(_Action2.Action);