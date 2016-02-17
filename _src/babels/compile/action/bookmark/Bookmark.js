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

var _ActionAuthBehavior2 = require('../ActionAuthBehavior');

var _Api = require('../../net/Api');

var _Path = require('../../app/const/Path');

var _Form = require('../../data/Form');

var _Data = require('../../data/Data');

var _User = require('../../app/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事のブックマーク登録 / 解除<br>
 * <code>/api/v1/articles/bookmark/{:article_id}</code>
 */

var Bookmark = exports.Bookmark = function (_ActionAuthBehavior) {
  (0, _inherits3.default)(Bookmark, _ActionAuthBehavior);

  /**
   * 記事のブックマーク登録 / 解除 を行います
   * @param {Number|string} articleId article id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function Bookmark(articleId) {
    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    (0, _classCallCheck3.default)(this, Bookmark);

    // send form data 作成 article_id: article id
    var data = new _Data.Data(_Path.Path.ARTICLE_ID.toLowerCase(), String(articleId));
    var formData = _Form.Form.data([data]);

    // 登録
    var add = _Api.Api.bookmark('add');
    // 解除
    var remove = _Api.Api.bookmark('delete');

    // 登録用で super 実行

    // global へ( super の後 )

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Bookmark).call(this, _User.User.token, add, formData, resolve, reject));

    _this._add = add;
    _this._remove = remove;
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

      console.error('illegal operation, use start. instead add / delete.');
    }
    /**
     * 記事のブックマーク登録
     */

  }, {
    key: 'add',
    value: function add() {

      this._ajax.start(this.url, this._add.method, this.success.bind(this), this.fail.bind(this));
    }
    /**
     * 記事のブックマーク解除
     */

  }, {
    key: 'remove',
    value: function remove() {

      this._ajax.start(this.url, this._remove.method, this.success.bind(this), this.fail.bind(this));
    }
  }, {
    key: 'url',
    get: function get() {
      // 登録 / 解除 の URL は同じ
      return _Path.Path.article(this._url, this._articleId);
    }
  }]);
  return Bookmark;
}(_ActionAuthBehavior2.ActionAuthBehavior);