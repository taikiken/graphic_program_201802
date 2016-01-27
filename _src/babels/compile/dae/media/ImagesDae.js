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

/**
 * article.media.images
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImagesDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImagesDae = exports.ImagesDae = function () {
  /**
   *
   * @param {Object} [images={}] article.media.images
   */

  function ImagesDae() {
    var images = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ImagesDae);

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
     *
     * @return {string} article.media.images.caption
     */

  }, {
    key: 'caption',
    get: function get() {
      return this.images.caption;
    }
    /**
     *
     * @return {string} article.media.images.large
     */

  }, {
    key: 'large',
    get: function get() {
      return this.images.large;
    }
    /**
     *
     * @return {string} article.media.images.medium
     */

  }, {
    key: 'medium',
    get: function get() {
      return this.images.medium;
    }
    /**
     *
     * @return {string} article.media.images.thumbnail
     */

  }, {
    key: 'thumbnail',
    get: function get() {
      return this.images.thumbnail;
    }
  }]);
  return ImagesDae;
}();