/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:54
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
exports.MediaDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ImagesDae = require('./media/ImagesDae');

var _VideoDae = require('./media/VideoDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.media
 */

var MediaDae = exports.MediaDae = function () {
  /**
   *
   * @param {Object} [media={}] article.media
   */

  function MediaDae() {
    var media = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, MediaDae);

    this._media = media;
    this._images = new _ImagesDae.ImagesDae(media.images);
    this._video = new _VideoDae.VideoDae(media.video);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} article.media
   */

  (0, _createClass3.default)(MediaDae, [{
    key: 'media',
    get: function get() {
      return this._media;
    }
    /**
     *
     * @return {ImagesDae|*} article.media.images
     */

  }, {
    key: 'images',
    get: function get() {
      return this._images;
    }
    /**
     *
     * @return {VideoDae|*} article.media.video
     */

  }, {
    key: 'video',
    get: function get() {
      return this._video;
    }
  }]);
  return MediaDae;
}();