/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:57
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
exports.ImagesDae = undefined;

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.media.images
 */

var ImagesDae = exports.ImagesDae = function () {
  /**
   *
   * @param {Object} [images={}] article.media.images
   */

  function ImagesDae() {
    var images = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ImagesDae);

    images = _Safety.Safety.object(images);
    this._images = images;
  }
  /**
   *
   * @return {Object|*} article.media.images
   */

  (0, _createClass3.default)(ImagesDae, [{
    key: 'images',
    get: function get() {
      return this._images;
    }
    /**
     * キャプション
     * @return {string} article.media.images.caption
     */

  }, {
    key: 'caption',
    get: function get() {
      return this.images.caption;
    }
    /**
     * スライド用
     * @return {string} article.media.images.large
     */

  }, {
    key: 'large',
    get: function get() {
      return this.images.large;
    }
    /**
     * 記事一覧用 - 横長 - 16:9
     * @return {string} article.media.images.medium
     */

  }, {
    key: 'medium',
    get: function get() {
      return this.images.medium;
    }
    /**
     * 1 x 1 small
     * @return {string} article.media.images.thumbnail
     */

  }, {
    key: 'thumbnail',
    get: function get() {
      return this.images.thumbnail;
    }
    /**
     *  詳細用元比率画像
     * @return {string} article.media.images.original
     */

  }, {
    key: 'original',
    get: function get() {
      return this.images.original;
    }
  }]);
  return ImagesDae;
}();