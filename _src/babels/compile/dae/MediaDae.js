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

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaDae = undefined;

var _ImagesDae = require('./media/ImagesDae');

var _VideoDae = require('./media/VideoDae');

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.media
 */

var MediaDae = exports.MediaDae = function () {
  /**
   * responce.media を images / video にわけます
   * @param {Object} [media={}] article.media
   */

  function MediaDae() {
    var media = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, MediaDae);

    media = _Safety.Safety.object(media);

    this._media = media;
    this._list = [];

    // 記事詳細は media.images が最大5件になる
    // 最大5件は取り消されていた
    // JSON に配列が残っているので処理は残す
    if (!Array.isArray(media.images)) {
      // 1件, 配列では無い
      this._images = new _ImagesDae.ImagesDae(media.images);
      this._list.push(this._images);
    } else {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {

        for (var _iterator = (0, _getIterator3.default)(media.images), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var image = _step.value;

          this._list.push(new _ImagesDae.ImagesDae(image));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    this._video = new _VideoDae.VideoDae(media.video);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} article.media
   */

  (0, _createClass3.default)(MediaDae, [{
    key: 'media',
    get: function get() {
      return this._media;
    }
    /**
     * @return {ImagesDae|*} article.media.images 存在しない時はundefined を返します
     */

  }, {
    key: 'images',
    get: function get() {
      return this._images;
    }
    /**
     * @return {VideoDae|*} article.media.video
     */

  }, {
    key: 'video',
    get: function get() {
      return this._video;
    }
    /**
     * @return {Array<ImagesDae>} 記事詳細 images 配列を返します, 存在しない時はundefined を返します
     */

  }, {
    key: 'list',
    get: function get() {
      return this._list;
    }
  }]);
  return MediaDae;
}();