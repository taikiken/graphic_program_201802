/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:10
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
exports.SingleDae = undefined;

var _Safety = require('../data/Safety');

var _KeywordsDae = require('./single/KeywordsDae');

var _RelatedDae2 = require('./RelatedDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事詳細の JSON.response
 */

var SingleDae = exports.SingleDae = function (_RelatedDae) {
  (0, _inherits3.default)(SingleDae, _RelatedDae);

  /**
   * 記事詳細のresponceデータを後処理しやすいように加工します
   *
   * @param {Object} response JSON.response
   */

  function SingleDae() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, SingleDae);

    response = _Safety.Safety.object(response);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SingleDae).call(this, response));

    _this._keywords = new _KeywordsDae.KeywordsDae(response.keywords);

    // related
    var related = [];
    if (_Safety.Safety.check(response, 'related_articles', 'array')) {

      response.related_articles.forEach(function (article) {

        related.push(new _RelatedDae2.RelatedDae(article));
      });

      console.log('related_articles ', related);
    }

    _this._related = related;

    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string} 記事本文
   */

  (0, _createClass3.default)(SingleDae, [{
    key: 'body',
    get: function get() {
      return this.response.body;
    }
    /**
     *
     * @return {boolean} 関連記事が存在するかの真偽値
     */

  }, {
    key: 'hasRelated',
    get: function get() {
      return this._related.length > 0;
    }
    /**
     *
     * @return {Array|*} 関連記事配列を返します
     */

  }, {
    key: 'related',
    get: function get() {
      return this._related;
    }
    /**
     *
     * @return {KeywordsDae|*} キーワードを返します
     */

  }, {
    key: 'keywords',
    get: function get() {
      return this._keywords;
    }
  }]);
  return SingleDae;
}(_RelatedDae2.RelatedDae);