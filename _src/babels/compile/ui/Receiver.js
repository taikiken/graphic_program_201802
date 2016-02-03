/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 20:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * View callback の定型
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Receiver = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Receiver = exports.Receiver = function () {
  /**
   * <p>View callback の定型<br>
   * instance を作成し callback をカスタマイズします<p>
   *
   * @example
   * var receiver = new Receiver();
   * receiver.didMount = function() {}
   * receiver.emptyError = function() {}
   *
   * var action = new View( element );
   * action.on( View.DID_MOUNT, receiver.didMount );
   * action.on( View.EMPTY_ERROR, receiver.emptyError );
   *
   */

  function Receiver() {
    (0, _classCallCheck3.default)(this, Receiver);
  }
  /**
   * ReactDOM.render 前に呼び出されます
   * @param {Object} event Event object
   */

  (0, _createClass3.default)(Receiver, [{
    key: 'beforeRender',
    value: function beforeRender(event) {}
    /**
     * React.componentWillMount callback
     * @param {Object} event Event object
     */

  }, {
    key: 'willMount',
    value: function willMount(event) {}
    /**
     * React.componentDidMount callback
     * @param {Object} event Event object
     */

  }, {
    key: 'didMount',
    value: function didMount(event) {}
    /**
     * データが見つからない時に呼び出されます
     * @param {Error} error エラーインスタンス
     */

  }, {
    key: 'undefinedError',
    value: function undefinedError(error) {}
    /**
     * データが空の時に呼び出されます
     * @param {Error} error エラーインスタンス
     */

  }, {
    key: 'emptyError',
    value: function emptyError(error) {}
    /**
     * 処理中にエラーが起きた時に呼び出されます
     * @param {Error} error エラーインスタンス
     */

  }, {
    key: 'responseError',
    value: function responseError(error) {}

    /**
     * エラーDOMがマウントされた時に呼び出されます
     * @param {Error} error エラーインスタンス
     */

  }, {
    key: 'errorMount',
    value: function errorMount(error) {}
  }]);
  return Receiver;
}();