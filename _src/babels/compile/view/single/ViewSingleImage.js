/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 18:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSingleImage = undefined;

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

var _View2 = require('../View');

var _Safety = require('../../data/Safety');

var _ImagesDae = require('../../dae/media/ImagesDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * 記事詳細上部画像
 */

var ViewSingleImage = exports.ViewSingleImage = function (_View) {
  (0, _inherits3.default)(ViewSingleImage, _View);

  /**
   * 記事詳細上部画像
   * @param {Element} element root element
   * @param {ImagesDae} images response.media.images
   */

  function ViewSingleImage(element, images) {
    (0, _classCallCheck3.default)(this, ViewSingleImage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSingleImage).call(this, element));

    _this._images = images;
    _this._rendered = null;
    return _this;
  }
  /**
   * render 処理を開始します
   */

  (0, _createClass3.default)(ViewSingleImage, [{
    key: 'start',
    value: function start() {
      this.render(this._images);
    }
    /**
     * 記事詳細上部画像
     * @param {ImagesDae} images response.media.images
     */

  }, {
    key: 'render',
    value: function render(images) {

      // JSON data に不備あり, on 2016-02-10
      // 一時コメントにする
      // ToDo: JSON が正しくなったらコメント解除
      if (!images.original) {
        return;
      }

      console.log('ViewImages ', images);

      // -------------------------------------------------
      // 画像があった

      var element = this.element;

      // --------------------------------------------
      // image dom
      var ImageDom = React.createClass({
        displayName: 'ImageDom',

        propTypes: {
          image: React.PropTypes.object.isRequired
        },
        getInitialState: function getInitialState() {
          return {
            image: this.props.image
          };
        },
        render: function render() {

          var image = this.state.image;
          var caption = image.caption;
          var tag = '';
          var original = images.original || images.medium;

          if (!original) {
            // no image
            return null;
          }
          if (!_Safety.Safety.isImg(original)) {
            // no correct image extension
            return null;
          }

          if (!!caption) {

            tag = React.createElement('figcaption', { className: 'caption', dangerouslySetInnerHTML: { __html: caption } });
          }

          return React.createElement(
            'div',
            { className: 'post-kv' },
            React.createElement(
              'figure',
              { className: 'post-single-figure' },
              React.createElement('img', { src: original, alt: '', className: 'post-single-image' }),
              tag
            )
          );
        },
        updateImage: function updateImage(image) {
          this.setState({ image: image });
        }
      });

      // 画像 dom 生成
      if (this._rendered === null) {

        this._rendered = ReactDOM.render(React.createElement(ImageDom, { image: images }), element);
      } else {

        this._rendered.updateImage(images);
      }
    }
  }]);
  return ViewSingleImage;
}(_View2.View);