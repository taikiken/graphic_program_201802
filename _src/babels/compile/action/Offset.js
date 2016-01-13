/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 16:03
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
exports.Offset = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Result = require('../data/Result');

var _Action2 = require('./Action');

var _Types = require('../net/Types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ajax 処理を行います
 * Interface として使用します
 * 各 Class で extends して下さい
 */

var Offset = exports.Offset = function (_Action) {
  (0, _inherits3.default)(Offset, _Action);

  /**
   * Ajax 処理, query
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */

  function Offset(types) {
    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var offset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var length = arguments.length <= 4 || arguments[4] === undefined ? 10 : arguments[4];
    (0, _classCallCheck3.default)(this, Offset);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Offset).call(this, types, resolve, reject));

    _this._offset = offset;
    _this._length = length;
    _this._total = -1;

    return _this;
  }

  /**
   * url を作成します
   * @returns {string} 作成した url を返します
   */

  (0, _createClass3.default)(Offset, [{
    key: 'url',
    value: function url() {
      return this._types.url + '?offset=' + this._offset + '&length=' + this._length;
    }

    /**
     * offset 値を加算します
     * @param {Number} [count] default 値は this._length になります。 Ajax 成功後 次のリクエスト前に Offset.next() し加算します。
     */

  }, {
    key: 'next',
    value: function next() {
      var count = arguments.length <= 0 || arguments[0] === undefined ? this._length : arguments[0];

      this._offset += count;
    }

    /**
     * 次があるかを調べます
     * @return {boolean} 次があるかの真偽値を返します
     */

  }, {
    key: 'hasNext',
    value: function hasNext() {

      return this._offset < this.total;
    }
    /**
     * Ajax success callback, next()を実行し offset 値をカウントアップし callback method があれば実行します
     * @param {Result} result Ajax成功結果
     */

  }, {
    key: 'success',
    value: function success(result) {

      this.next();
      // success
      (0, _get3.default)((0, _getPrototypeOf2.default)(Offset.prototype), 'success', this).call(this, result);
    }

    /**
     *
     * @return {number|*} total件数を返します
     */

  }, {
    key: 'total',
    get: function get() {
      return this._total;
    }

    /**
     * total件数を設定します
     * @param {Number} total total件数
     */
    ,
    set: function set(total) {
      this._total = total;
    }
  }]);
  return Offset;
}(_Action2.Action);