/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:00
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
exports.VideoDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.media.video
 */

var VideoDae = exports.VideoDae = function () {
  /**
   * article.media.video 動画情報を保存します
   * @param {Object} [video={}] article.media.video
   */

  function VideoDae() {
    var video = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, VideoDae);

    video = _Safety.Safety.object(video);
    this._video = video;
  }
  /**
   * @return {Object|*} article.media.video
   */

  (0, _createClass3.default)(VideoDae, [{
    key: 'video',
    get: function get() {
      return this._video;
    }
    /**
     * video caption
     * @ToDo 使い道がわからない
     * @return {string} article.media.video.caption
     */

  }, {
    key: 'caption',
    get: function get() {
      return this.video.caption;
    }
    /**
     * 動画パス
     * @ToDo youtube ドメインから取得する？
     * @return {string} article.media.video.url
     */

  }, {
    key: 'url',
    get: function get() {
      return this.video.return;
    }
  }]);
  return VideoDae;
}();