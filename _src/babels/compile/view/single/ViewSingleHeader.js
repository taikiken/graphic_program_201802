/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 19:55
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
exports.ViewSingleHeader = undefined;

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

var _ViewSingleImage = require('../single/ViewSingleImage');

var _ViewSingleVideo = require('../single/ViewSingleVideo');

var _SingleDae = require('../../dae/SingleDae');

var _User = require('../../app/User');

var _Model = require('../../model/Model');

var _ModelBookmark = require('../../model/users/ModelBookmark');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// model

// dae
var React = self.React;

// app

var ReactDOM = self.ReactDOM;

/**
 * detail 上部
 */

var ViewSingleHeader = exports.ViewSingleHeader = function (_View) {
  (0, _inherits3.default)(ViewSingleHeader, _View);

  /**
   * detail 上部
   * @param {Element} element single header root element
   * @param {SingleDae} single 変換済み JSON data
   */

  function ViewSingleHeader(element, single) {
    (0, _classCallCheck3.default)(this, ViewSingleHeader);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSingleHeader).call(this, element));

    _this2._single = single;
    _this2._rendered = null;
    return _this2;
  }
  /**
   * render 処理を開始します
   */

  (0, _createClass3.default)(ViewSingleHeader, [{
    key: 'start',
    value: function start() {
      this.render(this._single);
    }
    /**
     * render します
     * @param {SingleDae} singleDae JSON 変換済みデータ
     */

  }, {
    key: 'render',
    value: function render(singleDae) {

      var element = this.element;
      var _this = this;

      var HeaderDom = React.createClass({
        displayName: 'HeaderDom',

        propTypes: {
          single: React.PropTypes.object.isRequired,
          sign: React.PropTypes.bool.isRequired
        },
        getInitialState: function getInitialState() {
          this.action = null;

          return {
            sign: this.props.sign,
            single: this.props.single,
            status: this.props.single.isBookmarked,
            bookmarked: this.props.single.isBookmarked ? 'bookmarked enable' : '',
            loading: ''
          };
        },
        render: function render() {
          console.log('----------------------- HeaderDom ', this.state.single);
          var single = this.state.single;
          var message = this.state.status ? 'ブックマーク済' : 'ブックマークする';
          var right = '';

          if (this.state.sign) {
            // login member のみ bookmark action が使える
            right = React.createElement(
              'div',
              { className: 'f-right' },
              React.createElement(
                'div',
                { className: this.state.loading + ' loading-root btn-bookmark' },
                React.createElement(
                  'a',
                  { href: '#', className: this.state.bookmarked, onClick: this.clickBookmark, ref: 'bookmarked' },
                  React.createElement(
                    'span',
                    null,
                    message
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'loading-spinner' },
                  ' '
                )
              )
            );
          }

          return React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'post-heading' },
              React.createElement(
                'h1',
                null,
                single.title
              )
            ),
            React.createElement(
              'div',
              { className: 'post-data' },
              React.createElement(
                'div',
                { className: 'f-left' },
                React.createElement(
                  'p',
                  { className: 'post-author' },
                  single.user.userName
                ),
                React.createElement(
                  'p',
                  { className: 'post-date' },
                  single.displayDate
                )
              ),
              right
            ),
            React.createElement('div', { ref: 'singleImage' })
          );
        },
        componentWillMount: function componentWillMount() {

          // will mount
          _this.executeSafely(_View2.View.WILL_MOUNT);
        },
        componentDidMount: function componentDidMount() {

          // after mount
          _this.executeSafely(_View2.View.DID_MOUNT);

          // 上部画像
          // media type check
          var single = this.state.single;
          var imageNode = ReactDOM.findDOMNode(this.refs.singleImage);
          var img = undefined;

          // media type で image / video  処理分岐
          if (single.mediaType === 'image') {

            // image
            img = new _ViewSingleImage.ViewSingleImage(imageNode, single.media.images);
          } else if (single.mediaType === 'video') {

            var mediaDae = single.media;
            if (!mediaDae.video || !mediaDae.video.url && !mediaDae.video.youtube) {
              // not movie data
              img = new _ViewSingleImage.ViewSingleImage(imageNode, single.media.images);
            } else {
              // found video data
              img = new _ViewSingleVideo.ViewSingleVideo(imageNode, mediaDae);
            }
          }

          if (typeof img !== 'undefined') {
            img.start();
          }

          // ---------------------
          // bookmark 処理
          if (this.state.sign) {
            var action = new _ModelBookmark.ModelBookmark(this.state.single.id);
            this.action = action;
            action.on(_Model.Model.COMPLETE, this.done);
            action.on(_Model.Model.UNDEFINED_ERROR, this.fail);
            action.on(_Model.Model.RESPONSE_ERROR, this.fail);
          }
        },
        componentWillUnMount: function componentWillUnMount() {
          this.dispose();
        },
        // --------------------------------------------
        // custom method
        updateSingle: function updateSingle(single, sign) {
          this.setState({ single: single, sign: sign });
        },
        clickBookmark: function clickBookmark(event) {
          event.preventDefault();

          this.setState({ loading: 'loading' });

          this.action.start(!this.state.status);
        },
        done: function done(result) {

          var bookmarked = '';
          if (!this.state.status) {
            // 現在がbookmark 済み
            bookmarked = 'bookmarked enable';
          }

          this.setState({ loading: '', status: !this.state.status, bookmarked: bookmarked });
        },
        fail: function fail(error) {

          this.setState({ loading: '' });
        },
        dispose: function dispose() {

          var action = this.action;
          if (action !== null) {
            action.off(_Model.Model.COMPLETE, this.done);
            action.off(_Model.Model.UNDEFINED_ERROR, this.fail);
            action.off(_Model.Model.RESPONSE_ERROR, this.fail);
          }
        }
      });

      if (this._rendered === null) {

        this._rendered = ReactDOM.render(React.createElement(HeaderDom, { single: singleDae, sign: _User.User.sign }), element);
      } else {

        this._rendered.updateSingle(singleDae, _User.User.sign);
      }
    } // render

  }]);
  return ViewSingleHeader;
}(_View2.View);