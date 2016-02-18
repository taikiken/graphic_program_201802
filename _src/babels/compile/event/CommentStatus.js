/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 18:00
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
exports.CommentStatus = undefined;

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

var _EventDispatcher2 = require('./EventDispatcher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _instance = null;

/**
 * コメントの good / bad / delete / notice  Event
 */

var CommentStatus = exports.CommentStatus = function (_EventDispatcher) {
  (0, _inherits3.default)(CommentStatus, _EventDispatcher);

  /**
   * <h3>Singleton</h3>
   * <p>コメントの good / bad / delete / notice  Event</p>
   * @return {*}
   */

  function CommentStatus() {
    var _ret;

    (0, _classCallCheck3.default)(this, CommentStatus);

    if (_instance === null) {
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CommentStatus).call(this));

      _instance = _this;
    }

    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * event GOOD_ADD
   * @return {string} goodAdd を返します
   */

  (0, _createClass3.default)(CommentStatus, [{
    key: 'fire',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    value: function fire(type, commentId) {
      this.dispatch({ type: type, commentId: commentId });
    }
  }, {
    key: 'remove',
    value: function remove(commentId) {
      this.fire(CommentStatus.DELETE, commentId);
    }
  }, {
    key: 'notice',
    value: function notice(commentId) {
      this.fire(CommentStatus.NOTICE, commentId);
    }
    // ---------------------------------------------------
    //  static method
    // ---------------------------------------------------
    /**
     * instance を生成します
     * @return {CommentStatus} CommentStatus instance を返します
     */

  }], [{
    key: 'factory',
    value: function factory() {

      if (_instance === null) {

        _instance = new CommentStatus();
      }

      return _instance;
    }
  }, {
    key: 'GOOD_ADD',
    get: function get() {
      return 'goodAdd';
    }
    /**
     * event GOOD_DELETE
     * @return {string} goodDelete を返します
     */

  }, {
    key: 'GOOD_DELETE',
    get: function get() {
      return 'goodDelete';
    }
    /**
     * event BAD_ADD
     * @return {string} badAdd を返します
     */

  }, {
    key: 'BAD_ADD',
    get: function get() {
      return 'badAdd';
    }
    /**
     * event BAD_DELETE
     * @return {string} badDelete を返します
     */

  }, {
    key: 'BAD_DELETE',
    get: function get() {
      return 'badDelete';
    }
    /**
     * event COMMENT_DELETE 削除
     * @return {string}
     */

  }, {
    key: 'COMMENT_DELETE',
    get: function get() {
      return 'commentDelete';
    }
    /**
     * event NOTICE 通報
     * @return {string}
     */

  }, {
    key: 'NOTICE',
    get: function get() {
      return 'commentNotice';
    }
  }]);
  return CommentStatus;
}(_EventDispatcher2.EventDispatcher);