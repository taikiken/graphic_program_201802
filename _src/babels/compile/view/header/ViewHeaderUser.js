/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/02 - 20:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

'use strict';

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

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHeaderUser = undefined;

var _View2 = require('../View');

var _User = require('../../app/User');

var _UserStatus = require('../../event/UserStatus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _instance = null;

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * <h3>header user 用メニュー</h3>
 * <p>Factory pattern です<br>
 * <code>new ViewHeaderUser()</code> はできません。<br>
 * <code>ViewHeaderUser.factory()</code> してください。<br>
 * </P>
 *
 * @ToDo user profile icon, notifications count 取得
 */

var ViewHeaderUser = exports.ViewHeaderUser = function (_View) {
  (0, _inherits3.default)(ViewHeaderUser, _View);

  /**
   * header user 用メニューを作成します
   *
   * @example
   * var headerUser = ViewHeaderUser.factory();
   * headerUser.element = document.getElementById('user-profile-nav');
   * headerUser.render();
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */

  function ViewHeaderUser(target, element) {
    var _ret;

    var option = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    (0, _classCallCheck3.default)(this, ViewHeaderUser);

    if (_symbol !== target) {

      throw new Error('UserStatus is static Class. not use new UserStatus().');
    }

    if (_instance === null) {
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderUser).call(this, element, option));

      _instance = _this;
    }
    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /**
   * ユーザーメニューを作成します<br>
   * Userのstatusでメニューをだし分けします
   */

  (0, _createClass3.default)(ViewHeaderUser, [{
    key: 'render',
    value: function render() {

      if (!this._element) {
        throw new Error('ViewHeaderUser: set root element first');
      }

      if (_User.User.sign) {

        // ログイン済み
        this.renderLogin();
      } else {

        // 非ログイン
        this.renderLogout();
      }
    }
    /**
     * ログインユーザー用メニューを作成します
     */

  }, {
    key: 'renderLogin',
    value: function renderLogin() {

      var element = this.element;

      var UserDom = React.createClass({
        displayName: 'UserDom',

        getInitialState: function getInitialState() {
          return {
            clicked: false,
            open: 'close',
            bodyTimer: 0
          };
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
        },
        render: function render() {

          return React.createElement(
            'div',
            { className: 'user signin ' + this.state.open },
            React.createElement(
              'a',
              { className: 'user-preference', href: '#', onClick: this.clickHandler },
              React.createElement(
                'span',
                { className: 'user-notice' },
                '88'
              ),
              React.createElement(
                'span',
                { className: 'user-avatar' },
                React.createElement('img', { src: '/assets/images/dummy/avatar-40x40.jpg', alt: '' })
              )
            ),
            React.createElement(
              'nav',
              { className: 'user-menu' },
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
          );
        },
        componentWillUnmount: function componentWillUnmount() {
          this.destroy();
        }
      });

      ReactDOM.render(React.createElement(UserDom, null), element);
    }
    /**
     * 非ログインユーザー用メニューを作成します
     */

  }, {
    key: 'renderLogout',
    value: function renderLogout() {

      var element = this.element;

      var UserDom = React.createClass({
        displayName: 'UserDom',

        render: function render() {

          return React.createElement(
            'div',
            { className: 'user' },
            React.createElement(
              'a',
              { className: 'user-signup', href: '/signup/' },
              '無料登録 / ログイン'
            )
          );
        }
      });

      ReactDOM.render(React.createElement(UserDom, null), element);
    }

    /**
     * UserStatus.LOGE_IN event handler
     */

  }, {
    key: 'didLogin',
    value: function didLogin() {
      this.renderLogin();
    }
    /**
     * UserStatus.LOGE_OUT event handler
     */

  }, {
    key: 'didLogout',
    value: function didLogout() {
      this.renderLogout();
    }

    /**
     * instance を生成します
     * @param {Element} element root element
     * @param {Object} [option={}] optional event handler
     * @return {UserStatus} UserStatus instance を返します
     */

  }], [{
    key: 'factory',
    value: function factory(element) {
      var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (_instance === null) {

        _instance = new ViewHeaderUser(_symbol, element, option);
        var status = _UserStatus.UserStatus.factory();
        status.on(_UserStatus.UserStatus.LOGE_IN, _instance.didLogin.bind(_instance));
        status.on(_UserStatus.UserStatus.LOGE_OUT, _instance.didLogout.bind(_instance));
      }

      return _instance;
    }
  }]);
  return ViewHeaderUser;
}(_View2.View);