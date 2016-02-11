/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 17:44
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHeaderUser = undefined;

var _View2 = require('../View');

var _ViewHeaderMember = require('./ViewHeaderMember');

var _Url = require('../../app/const/Url');

var _User = require('../../app/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * header user 関連メニュー
 */

var ViewHeaderUser = exports.ViewHeaderUser = function (_View) {
  (0, _inherits3.default)(ViewHeaderUser, _View);

  /**
   * <p>header user 関連メニュー<br>
   * ログイン / 非ログイン でメニューを変更</p>
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */

  function ViewHeaderUser(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, ViewHeaderUser);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderUser).call(this, element, option));
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ViewHeaderUser, [{
    key: 'start',
    value: function start() {
      if (_User.User.sign) {
        // login member
        var boundCallback = this.memberCallback.bind(this);
        var member = new _ViewHeaderMember.ViewHeaderMember(this.element);
        member.on(_View2.View.BEFORE_RENDER, boundCallback);
        member.on(_View2.View.WILL_MOUNT, boundCallback);
        member.on(_View2.View.DID_MOUNT, boundCallback);
        member.on(_View2.View.ERROR_MOUNT, boundCallback);
        member.on(_View2.View.UNDEFINED_ERROR, boundCallback);
        member.on(_View2.View.EMPTY_ERROR, boundCallback);
        member.on(_View2.View.RESPONSE_ERROR, boundCallback);
        member.start();
      } else {
        // user menu
        this.render();
      }
    }
    /**
     * 非メンバー Dom を生成します
     */

  }, {
    key: 'render',
    value: function render() {

      var _this = this;

      var UserDom = React.createClass({
        displayName: 'UserDom',

        render: function render() {

          return React.createElement(
            'div',
            { className: 'user' },
            React.createElement(
              'a',
              { className: 'btn-signup', href: _Url.Url.signup() },
              '無料登録 / ログイン'
            )
          );
        },
        componentDidMount: function componentDidMount() {

          _this.executeSafely(_View2.View.DID_MOUNT);
        }
      });

      ReactDOM.render(React.createElement(UserDom, null), this.element);
    }
    /**
     * ViewHeaderMember callback 中継
     * @param {Object} event event object
     */

  }, {
    key: 'memberCallback',
    value: function memberCallback(event) {

      this.dispatch(event);
    }
  }]);
  return ViewHeaderUser;
}(_View2.View);