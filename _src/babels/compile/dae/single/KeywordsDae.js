/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:43
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
exports.KeywordsDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * response.keywords
 */

var KeywordsDae = exports.KeywordsDae = function () {
  /**
   * 記事キーワード
   * @param {Array} [keywords=[]] keywords 配列
   */

  function KeywordsDae() {
    var keywords = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    (0, _classCallCheck3.default)(this, KeywordsDae);

    this._keywords = keywords;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Array.<string>|*} response.keywords を返します
   */

  (0, _createClass3.default)(KeywordsDae, [{
    key: 'concat',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * 連結子でキーワードをつなぎます
     * @param {string} [concatenation=', '] 連結子
     * @return {string} 連結子でつないだキーワードを返します
     */
    value: function concat() {
      var concatenation = arguments.length <= 0 || arguments[0] === undefined ? ', ' : arguments[0];

      concatenation = _Safety.Safety.string(concatenation, ', ');
      return this.keywords.join(concatenation);
    }
  }, {
    key: 'keywords',
    get: function get() {
      return this._keywords;
    }
    /**
     *
     * @return {boolean} keyword が存在するかの真偽値を返します
     */

  }, {
    key: 'hasKeyword',
    get: function get() {
      return this.keywords.length > 0;
    }
  }]);
  return KeywordsDae;
}();