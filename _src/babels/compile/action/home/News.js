/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:49
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
exports.News = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Offset2 = require('../Offset');

var _Api = require('../../net/Api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * home 通常記事一覧
 */

var News = exports.News = function (_Offset) {
  (0, _inherits3.default)(News, _Offset);

  /**
   * home 通常記事一覧を取得します<br>
   * length は取得件数です。<b>default: 10</b>を必要なら変更します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */

  function News() {
    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var length = arguments.length <= 3 || arguments[3] === undefined ? 10 : arguments[3];
    (0, _classCallCheck3.default)(this, News);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(News).call(this, _Api.Api.home(), resolve, reject, offset, length));
  }

  return News;
}(_Offset2.Offset);