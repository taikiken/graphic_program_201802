/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 22:06
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
exports.ViewNews = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ViewArchiveMasonryInfinite = require('../ViewArchiveMasonryInfinite');

var _User = require('../../app/User');

var _NewsAuth = require('../../action/home/NewsAuth');

var _News = require('../../action/home/News');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * home news
 */

var ViewNews = exports.ViewNews = function (_ViewArchiveMasonryIn) {
  (0, _inherits3.default)(ViewNews, _ViewArchiveMasonryIn);

  /**
   * home news, token 付き・無し を切替
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [useMasonry=true] isotope を行うかの
   */

  function ViewNews(element, moreElement) {
    var option = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var useMasonry = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
    (0, _classCallCheck3.default)(this, ViewNews);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewNews).call(this, element, moreElement, null, option, useMasonry));

    _this._action = _User.User.sign ? new _NewsAuth.NewsAuth(_this.done.bind(_this), _this.fail.bind(_this)) : new _News.News(_this.done.bind(_this), _this.fail.bind(_this));
    return _this;
  }

  return ViewNews;
}(_ViewArchiveMasonryInfinite.ViewArchiveMasonryInfinite);