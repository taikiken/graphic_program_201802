/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:50
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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Videos = undefined;

var _Category2 = require('./Category');

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 動画一覧
 */

var Videos = exports.Videos = function (_Category) {
  (0, _inherits3.default)(Videos, _Category);

  /**
   * 動画一覧を取得します
   * @param {string} [slug=all] category slug です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function Videos() {
    var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    (0, _classCallCheck3.default)(this, Videos);

    slug = _Safety.Safety.string(slug, 'all');
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Videos).call(this, slug, 'video', resolve, reject));
  }

  return Videos;
}(_Category2.Category);