/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 19:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSingleVideo = undefined;

var _View2 = require('../View');

var _Empty = require('../../app/const/Empty');

var _Safety = require('../../data/Safety');

var _MediaDae = require('../../dae/MediaDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * 記事詳細上部動画
 */

var ViewSingleVideo = exports.ViewSingleVideo = function (_View) {
  (0, _inherits3.default)(ViewSingleVideo, _View);

  /**
   * 記事詳細上部動画
   * @param {Element} element root element
   * @param {MediaDae} media response.media
   */

  function ViewSingleVideo(element, media) {
    (0, _classCallCheck3.default)(this, ViewSingleVideo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSingleVideo).call(this, element));

    _this._media = media;
    _this._rendered = null;
    return _this;
  }
  /**
   * render 処理を開始します
   */

  (0, _createClass3.default)(ViewSingleVideo, [{
    key: 'start',
    value: function start() {
      this.render(this._media);
    }
    /**
     * 記事詳細上部動画を生成します
     * @param {MediaDae} mediaDae response.media
     */

  }, {
    key: 'render',
    value: function render(mediaDae) {

      // データチェック
      if (!mediaDae.video || !mediaDae.video.url || !mediaDae.images || !mediaDae.images.medium) {
        return;
      }

      // -------------------------------------------------
      // 画像と動画あった
      var element = this.element;

      // --------------------------------------------
      // image dom
      var VideoDom = React.createClass({
        displayName: 'VideoDom',

        propTypes: {
          media: React.PropTypes.object.isRequired
        },
        getInitialState: function getInitialState() {
          return {
            media: this.props.media
          };
        },
        render: function render() {

          var media = this.state.media;

          if (!!media.video.youtube) {

            // youtube id found
            this.youtube(media);
          } else {

            // HTML5 video tag
            this.video(media);
          }
        },
        video: function video(media) {

          var video = media.video;
          var images = media.images;

          var captionTag = function captionTag(caption) {
            if (!!caption) {
              return React.createElement('div', { className: 'caption', dangerouslySetInnerHTML: { __html: caption } });
            } else {
              return '';
            }
          };

          var poster = images.medium;
          if (!poster) {
            poster = _Empty.Empty.VIDEO_THUMBNAIL;
          } else if (!_Safety.Safety.isImg(poster)) {
            poster = _Empty.Empty.VIDEO_THUMBNAIL;
          }

          return React.createElement(
            'div',
            { className: 'post-kv' },
            React.createElement(
              'video',
              { poster: poster, preload: 'none' },
              React.createElement('source', { src: video.url, type: 'video/mp4' })
            ),
            captionTag(video.caption)
          );
        },
        youtube: function youtube(media) {
          // <iframe width="640" height="360" src="https://www.youtube.com/embed/Ro-_cbfdrYE?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
          var video = media.video;

          return React.createElement(
            'div',
            { className: 'post-kv' },
            React.createElement('iframe', { src: 'https://www.youtube.com/embed/' + video.youtube + '?rel=0&amp;showinfo=0', width: '710', height: '400', frameborder: '0', allowfullscreen: true })
          );
        },
        updateImage: function updateImage(media) {
          this.setState({ media: media });
        }
      });

      // video dom 生成
      if (this._rendered === null) {

        this._rendered = ReactDOM.render(React.createElement(VideoDom, { media: mediaDae }), element);
      } else {

        this._rendered.updateImage(mediaDae);
      }
    }
  }]);
  return ViewSingleVideo;
}(_View2.View);