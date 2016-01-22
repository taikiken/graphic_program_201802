/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 14:33
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
exports.ViewError = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = window.React;
var ReactDOM = window.ReactDOM;

/**
 * エラーメッセージを表示します
 */

var ViewError = exports.ViewError = function (_View) {
  (0, _inherits3.default)(ViewError, _View);

  /**
   * エラーメッセージを表示し, componentDidMount callback handler を実行します
   *
   * @example
   * let element = document.getElementById( 'error-dom-parent' );
   * let afterMount = () => {
   *  // componentDidMount
   * }
   * let option = {
   *  didMount: afterMount
   * };
   * let message = 'error happen.';
   * let viewError = new ViewError( element, option, message );
   *
   * @example
   * let option = {
   *  didMount: function() { // didMount },
   *  undefinedError: function() { // JSONにあるべきキーがない },
   *  emptyError: function() { // 結果セット配列が空 },
   *  responseError: function() { // Ajax Error }
   * };
   * @param {Element} element render root element
   * @param {Object} [option={}] callback handler
   * @param {string} [message=''] 表示エラーメッセージ
   */

  function ViewError(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var message = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
    (0, _classCallCheck3.default)(this, ViewError);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewError).call(this, element, option));

    _this2._message = message;

    return _this2;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string|*} error message を返します
   */

  (0, _createClass3.default)(ViewError, [{
    key: 'render',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * error dom を生成します<br>
     * <pre>
     *   <div class="error error-message"></div>
     * </pre>
     */
    value: function render() {

      var element = this.element;
      var message = this.message;
      var _this = this;

      var ErrorDom = React.createClass({
        displayName: 'ErrorDom',

        render: function render() {
          return React.createElement(
            'div',
            { className: 'error error-container' },
            React.createElement(
              'div',
              { className: 'error error-message' },
              message
            )
          );
        },
        componentDidMount: function componentDidMount() {

          // after mount
          _this.executeSafely('errorMount');
        }
      });

      ReactDOM.render(React.createElement(ErrorDom, null), element);
    }
  }, {
    key: 'message',
    get: function get() {
      return this._message;
    }
  }]);
  return ViewError;
}(_View2.View);