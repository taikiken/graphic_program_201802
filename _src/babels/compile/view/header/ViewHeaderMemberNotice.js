/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08 - 19:46
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
exports.ViewHeaderMemberNotice = undefined;

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

var _Notice = require('../../action/users/Notice');

var _Empty = require('../../app/const/Empty');

var _NotificationsDae = require('../../dae/user/NotificationsDae');

var _NoticeAction = require('../../app/const/NoticeAction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * お知らせ(header)
 */

var ViewHeaderMemberNotice = exports.ViewHeaderMemberNotice = function (_View) {
  (0, _inherits3.default)(ViewHeaderMemberNotice, _View);

  /**
   * お知らせ(header)
   * @param element
   * @param option
   */

  function ViewHeaderMemberNotice(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, ViewHeaderMemberNotice);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderMemberNotice).call(this, element, option));

    _this2._action = new _Notice.Notice(_this2.done.bind(_this2), _this2.fail.bind(_this2), 0, 5);
    return _this2;
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ViewHeaderMemberNotice, [{
    key: 'start',
    value: function start() {

      this.action.next();
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
    value: function render(responseObj) {

      var notificationsDae = new _NotificationsDae.NotificationsDae(responseObj);
      var _this = this;

      // --------------------------------------------------
      // user notice dropMenu action message
      var NoticeMessage = React.createClass({
        displayName: 'NoticeMessage',

        propTypes: {
          notice: React.PropTypes.object.isRequired
        },
        render: function render() {

          var notice = this.props.notice;
          var action = notice.action;
          var message = _NoticeAction.NoticeAction.message(action);

          if (!action) {
            return null;
          }

          var user = notice.user;
          var article = notice.article;

          var txt = user.userName + 'さんがあなたの「' + article.title + '」へのコメントに';

          return React.createElement(
            'p',
            { className: 'info-content' },
            txt,
            React.createElement(
              'strong',
              null,
              message
            ),
            'しました。'
          );
        }
      });

      // --------------------------------------------------
      // user notice dropMenu
      var NoticeMenu = React.createClass({
        displayName: 'NoticeMenu',

        propTypes: {
          notifications: React.PropTypes.object.isRequired
        },
        render: function render() {

          var notifications = this.props.notifications;
          var readAll = '';

          if (notifications.length > 0) {

            readAll = React.createElement(
              'div',
              { className: 'info-btn-readAll' },
              React.createElement(
                'a',
                { href: '#', onClick: this.allRead },
                'すべて既読にする'
              )
            );
          }

          return React.createElement(
            'nav',
            { className: 'notice-menu' },
            React.createElement(
              'div',
              { className: 'dropMenu' },
              React.createElement(
                'div',
                { className: 'info' },
                React.createElement(
                  'h2',
                  { className: 'info-heading' },
                  'お知らせ'
                ),
                readAll,
                React.createElement(
                  'ul',
                  { className: 'info-list' },
                  notifications.map(function (notice, i) {

                    var icon = notice.user.profilePicture;
                    if (!icon) {
                      icon = _Empty.Empty.USER_PICTURE;
                    }

                    return React.createElement(
                      'li',
                      { key: 'info-item-' + i, className: 'info-item info-item-' + i },
                      React.createElement(
                        'a',
                        { href: 'info-link' },
                        React.createElement(
                          'figure',
                          { className: 'info-user-thumb' },
                          React.createElement('img', { src: icon, alt: '' })
                        ),
                        React.createElement(NoticeMessage, { notice: notice }),
                        React.createElement(
                          'p',
                          { className: 'info-date' },
                          notice.displayDate
                        )
                      )
                    );
                  }),
                  React.createElement(
                    'li',
                    { 'class': 'btn-viewmore' },
                    React.createElement(
                      'a',
                      { 'class': 'btn-viewmore-link', href: '/notifications/' },
                      React.createElement(
                        'span',
                        null,
                        'すべて見る'
                      )
                    )
                  )
                )
              )
            )
          );
        },
        allRead: function allRead(event) {}
      });

      // --------------------------------------------------
      // user notice
      var NoticeDom = React.createClass({
        displayName: 'NoticeDom',

        propTypes: {
          response: React.PropTypes.object.isRequired
        },
        render: function render() {

          var response = this.props.response;
          var notifications = response.notifications;
          var noticeTotal = '';
          var noticeMenu = undefined;

          if (typeof notifications !== 'undefined' && notifications !== null) {
            if (Array.isArray(notifications) && notifications.length > 0) {
              noticeMenu = React.createElement(NoticeDom, { notifications: notifications });
              noticeTotal = React.createElement(
                'span',
                { className: 'notice-num' },
                noticeTotal
              );
            }
          } else {
            // 空メニュー
            noticeMenu = React.createElement(NoticeDom, { notifications: [] });
          }

          return React.createElement(
            'div',
            { className: 'notice' },
            React.createElement(
              'a',
              { href: '#', className: 'notice-opener', onClick: this.clickHandler },
              React.createElement(
                'i',
                { className: 'notice-icon' },
                ' '
              ),
              noticeTotal
            ),
            noticeMenu
          );
        },
        componentDidMount: function componentDidMount() {},
        componentWillUnmount: function componentWillUnmount() {},
        clickHandler: function clickHandler(event) {},
        bodyClick: function bodyClick() {},
        toggleState: function toggleState() {},
        destroy: function destroy() {}
      });

      console.log('______________ notificationsDae', notificationsDae);
      // --------------------------------------------------
      // user root
      ReactDOM.render(React.createElement(NoticeDom, { response: notificationsDae }), this.element);
    }
  }]);
  return ViewHeaderMemberNotice;
}(_View2.View);