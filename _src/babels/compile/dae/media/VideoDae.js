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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoDae = undefined;

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.media.video
 */

var VideoDae = exports.VideoDae = function () {
  /**
   *
   * @param {Object} [video={}] article.media.video
   */

  function VideoDae() {
    var video = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, VideoDae);

    video = _Safety.Safety.object(video);
    this._video = video;
  }
  /**
   *
   * @return {Object|*} article.media.video
   */

  (0, _createClass3.default)(VideoDae, [{
    key: 'video',
    get: function get() {
      return this._video;
    }
    /**
     *
     * @return {string} article.media.video.caption
     */

  }, {
    key: 'caption',
    get: function get() {
      return this.video.caption;
    }
    // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=1742013165
    // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=404686668
    // 2016-02-08 21:08:24 JSON 変更
    ///**
    // * 1 x 1 small size
    // * @return {string} article.media.video.thumbnail
    // */
    //get thumbnail():string {
    //  return this.video.thumbnail;
    //}
    ///**
    // * for slide
    // * @return {string} article.media.images.large
    // */
    //get large():string {
    //  return this.video.large;
    //}
    ///**
    // * 16 x 9 記事一覧
    // * @return {string} article.media.images.medium
    // */
    //get medium():string {
    //  return this.video.medium;
    //}
    /**
     *
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