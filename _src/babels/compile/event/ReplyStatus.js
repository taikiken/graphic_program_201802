/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11 - 16:51
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
exports.ReplyStatus = undefined;

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

var _EventDispatcher2 = require('./EventDispatcher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _instance = null;

/**
 * コメント返信フォーム
 */

var ReplyStatus = exports.ReplyStatus = function (_EventDispatcher) {
  (0, _inherits3.default)(ReplyStatus, _EventDispatcher);

  /**
   * コメント返信フォームの open, close, sending, complete を通知します。
   * @example
   * var eplyStatus = ReplyStatus.factory();
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {ReplyStatus} ReplyStatus instance を返します
   */

  function ReplyStatus(target) {
    var _ret;

    (0, _classCallCheck3.default)(this, ReplyStatus);

    if (_symbol !== target) {

      throw new Error('ReplyStatus is static Class. not use new ReplyStatus(). instead ReplyStatus.factory()');
    }

    if (_instance === null) {
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReplyStatus).call(this));

      _instance = _this;
    }
    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * event OPEN
   * @return {string} replyOpen を返します
   */

  (0, _createClass3.default)(ReplyStatus, [{
    key: 'open',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * open event を発火します
     * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
     */
    value: function open(id) {
      this.dispatch({ type: ReplyStatus.OPEN, id: id });
    }
    /**
     * close event を発火します
     * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
     */

  }, {
    key: 'close',
    value: function close(id) {
      this.dispatch({ type: ReplyStatus.CLOSE, id: id });
    }
    /**
     * start event を発火します
     * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
     */

  }, {
    key: 'start',
    value: function start(id) {
      this.dispatch({ type: ReplyStatus.START, id: id });
    }
    /**
     * complete event を発火します
     * @param {Number} id comment id, form 設置 ID, 要 Page 内ユニーク
     */

  }, {
    key: 'complete',
    value: function complete(id) {
      this.dispatch({ type: ReplyStatus.COMPLETE, id: id });
    }
    // ---------------------------------------------------
    //  static method
    // ---------------------------------------------------
    /**
     * instance を生成します
     * @return {ReplyStatus} ReplyStatus instance を返します
     */

  }], [{
    key: 'factory',
    value: function factory() {

      if (_instance === null) {

        _instance = new ReplyStatus(_symbol);
      }

      return _instance;
    }
  }, {
    key: 'OPEN',
    get: function get() {
      return 'replyOpen';
    }
    /**
     * event CLOSE
     * @return {string} replyClose を返します
     */

  }, {
    key: 'CLOSE',
    get: function get() {
      return 'replyClose';
    }
    /**
     * event START
     * @return {string} replyStart を返します
     */

  }, {
    key: 'START',
    get: function get() {
      return 'replyStart';
    }
    /**
     * event COMPLETE
     * @return {string} replyComplete を返します
     */

  }, {
    key: 'COMPLETE',
    get: function get() {
      return 'replyComplete';
    }
  }]);
  return ReplyStatus;
}(_EventDispatcher2.EventDispatcher);