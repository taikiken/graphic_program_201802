/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Single = undefined;

var _Action2 = require('../Action');

var _Api = require('../../net/Api');

var _Path = require('../../app/const/Path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事詳細を取得します
 */

var Single = exports.Single = function (_Action) {
  (0, _inherits3.default)(Single, _Action);

  /**
   * 記事詳細を記事IDから取得します
   * @param {Number|String} id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function Single(id) {
    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    (0, _classCallCheck3.default)(this, Single);

    // parseInt すると先頭0が消えるのでまずい気がする
    // this._id = parseInt( id, 10 );

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Single).call(this, _Api.Api.single(), resolve, reject));

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

  (0, _createClass3.default)(Single, [{
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
      // return `${this._url}/${this.id}`;
      return _Path.Path.article(this._url, this.id);
    }
  }]);
  return Single;
}(_Action2.Action);