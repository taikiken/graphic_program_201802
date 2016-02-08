/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/04 - 12:39
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
exports.ViewCategory = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Category = require('../action/archive/Category');

var _ViewArchiveMasonryInfinite = require('./ViewArchiveMasonryInfinite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * category 一覧表示
 */

var ViewCategory = exports.ViewCategory = function (_ViewArchiveMasonryIn) {
  (0, _inherits3.default)(ViewCategory, _ViewArchiveMasonryIn);

  /**
   * category 一覧表示 要 **slug**
   * @param {string} slug category slug, default 'all'
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */

  function ViewCategory(slug, element, moreElement) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ViewCategory);

    // Canvas Action を使う
    // slug を送り 表示(render)は ViewArchiveMasonry を使う

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewCategory).call(this, element, moreElement, null, option, true));

    _this._action = new _Category.Category(slug, '', _this.done.bind(_this), _this.fail.bind(_this));
    return _this;
  }

  return ViewCategory;
}(_ViewArchiveMasonryInfinite.ViewArchiveMasonryInfinite);