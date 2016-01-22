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

/**
 * article.media.video
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoDae = exports.VideoDae = function () {
  function VideoDae() {
    (0, _classCallCheck3.default)(this, VideoDae);
  }

  (0, _createClass3.default)(VideoDae, [{
    key: 'constaructor',

    /**
     *
     * @param {Object} [video={}] article.media.video
     */
    value: function constaructor() {
      var video = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this._video = video;
    }
    /**
     *
     * @return {Object|*} article.media.video
     */

  }, {
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
    /**
     *
     * @return {string} article.media.video.thumbnail
     */

  }, {
    key: 'thumbnail',
    get: function get() {
      return this.video.thumbnail;
    }
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