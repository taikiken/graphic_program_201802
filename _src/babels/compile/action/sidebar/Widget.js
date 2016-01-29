/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 17:16
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
exports.Widget = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Ranking = require('../archive/Ranking');

var _Videos = require('../archive/Videos');

var _Length = require('../../app/Length');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>Sidebar, ranking / video 一覧表示</h3>
 * 全て static
 * <p><code>Ranking</code>, <code>Videos</code>インスタンスを作成します</p>
 *
 * @example
 * // ranking instance
 * let ranking = Widget.ranking();
 * // video instance
 * let video = Widget.video();
 */

var Widget = exports.Widget = function () {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Widget(target) {
    (0, _classCallCheck3.default)(this, Widget);

    if (_symbol !== target) {

      throw new Error('Widget is not new Widget().');
    }
  }

  /**
   * Ranking instance を作成し length を 5にセットします
   * @param {string} [slug=all] category slug です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Ranking} Ranking instance を返します
   */

  (0, _createClass3.default)(Widget, null, [{
    key: 'ranking',
    value: function ranking() {
      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var rankings = new _Ranking.Ranking(slug, resolve, reject);
      rankings.length = _Length.Length.ranking;
      return rankings;
    }

    /**
     * Videos instance を作成し length を 5にセットします
     * @param {string} [slug=all] category slug です
     * @param {Function} [resolve=null] Ajax 成功時の callback
     * @param {Function} [reject=null] Ajax 失敗時の callback
     * @return {Videos} Videos instance を返します
     */

  }, {
    key: 'video',
    value: function video() {
      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
      var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var videos = new _Videos.Videos(slug, resolve, reject);
      videos.length = _Length.Length.video;
      return videos;
    }
  }]);
  return Widget;
}();