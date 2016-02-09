/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08 - 19:45
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
exports.ViewHeaderMember = undefined;

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

var _ViewHeaderMemberNotice = require('./ViewHeaderMemberNotice');

var _Empty = require('../../app/const/Empty');

var _UserDae = require('../../dae/UserDae');

var _UsersSelf = require('../../action/users/UsersSelf');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 *
 */

var ViewHeaderMember = exports.ViewHeaderMember = function (_View) {
  (0, _inherits3.default)(ViewHeaderMember, _View);

  function ViewHeaderMember(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, ViewHeaderMember);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderMember).call(this, element, option));

    _this2._action = new _UsersSelf.UsersSelf(_this2.done.bind(_this2), _this2.fail.bind(_this2));
    return _this2;
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ViewHeaderMember, [{
    key: 'start',
    value: function start() {

      this.action.start();
    }
    /**
     * Ajax response success
     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
     */

  }, {
    key: 'done',
    value: function done(result) {

      var response = result.response;

      if (typeof response === 'undefined') {

        // articles undefined
        // JSON に問題がある
        var error = new Error('[MEMBER:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
        // this.showError( error.message );
      } else {

          this.render(response);
        }
    }
    /**
     * Ajax response error
     * @param {Error} error Error instance
     */

  }, {
    key: 'fail',
    value: function fail(error) {

      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
      // this.showError( error.message );
    }
  }, {
    key: 'render',
    value: function render(response) {

      var dae = new _UserDae.UserDae(response);
      var _this = this;

      // --------------------------------------------------
      // user setting
      var SettingDom = React.createClass({
        displayName: 'SettingDom',

        propTypes: {
          userName: React.PropTypes.string.isRequired,
          icon: React.PropTypes.string.isRequired
        },
        getInitialState: function getInitialState() {
          return {
            clicked: false,
            open: 'close',
            bodyTimer: 0
          };
        },
        render: function render() {

          var icon = this.props.icon;
          var userName = this.props.userName;

          if (!icon) {
            icon = _Empty.Empty.USER_PICTURE;
          }

          return React.createElement(
            'div',
            { className: 'user' },
            React.createElement('div', { className: 'notice-container', ref: 'notice' }),
            React.createElement(
              'div',
              { className: 'preference ' + this.state.open },
              React.createElement(
                'a',
                { className: 'preference-opener', href: '#', onClick: this.clickHandler },
                React.createElement(
                  'span',
                  { className: 'user-avatar' },
                  React.createElement('img', { src: icon, alt: userName })
                )
              ),
              React.createElement(
                'nav',
                { className: 'preference-menu' },
                React.createElement(
                  'ul',
                  { className: 'dropMenu' },
                  React.createElement(
                    'li',
                    { className: 'dropMenu-item' },
                    React.createElement(
                      'a',
                      { className: 'dropMenu-link', href: '/mypage/' },
                      'ブックマーク',
                      React.createElement('br', null),
                      'アクティビティ'
                    )
                  ),
                  React.createElement(
                    'li',
                    { className: 'dropMenu-item' },
                    React.createElement(
                      'a',
                      { className: 'dropMenu-link', href: '/settings/' },
                      '設定'
                    )
                  ),
                  React.createElement(
                    'li',
                    { className: 'dropMenu-item' },
                    React.createElement(
                      'a',
                      { className: 'dropMenu-link', href: '/logout/' },
                      'ログアウト'
                    )
                  )
                )
              )
            )
          );
        },
        componentDidMount: function componentDidMount() {

          // callback
          _this.executeSafely(_View2.View.DID_MOUNT);

          // notice make
          var notice = new _ViewHeaderMemberNotice.ViewHeaderMemberNotice(this.refs.notice);
          notice.start();
        },
        componentWillUnmount: function componentWillUnmount() {
          this.destroy();
        },
        clickHandler: function clickHandler(event) {

          event.preventDefault();
          this.toggleState();
        },
        bodyClick: function bodyClick() {

          if (this.state.open === 'open') {

            // document.body が a より先に反応する
            // native event bind と React 経由の違いかも
            // body click 後の処理を遅延させる, 多分気づかない程度
            var timer = setTimeout(this.toggleState, 100);
            this.setState({ bodyTimer: timer });
          }
        },
        toggleState: function toggleState() {

          this.destroy();

          if (this.state.open === 'close') {
            // close -> open
            // document.body へ click event handler bind
            this.setState({ open: 'open' });
            document.body.addEventListener('click', this.bodyClick, false);
          } else {
            // open -> close
            this.setState({ open: 'close' });
          }
        },
        // timer cancel
        // body.click unbind
        // 後処理
        destroy: function destroy() {

          // body click からの遅延処理を clear する
          // timer を 0 にし error にならないようにする
          clearTimeout(this.state.bodyTimer);
          this.setState({ bodyTimer: 0 });
          // document.body からclick event handler unbind
          document.body.removeEventListener('click', this.bodyClick);
        }
      });

      // --------------------------------------------------
      // user root
      ReactDOM.render(React.createElement(SettingDom, { icon: dae.profilePicture, userName: dae.userName }), this.element);
    }
  }]);
  return ViewHeaderMember;
}(_View2.View);