/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 18:34
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
exports.Bad = undefined;

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

var _EventDispatcher2 = require('../EventDispatcher');

var _CommentStatus = require('../CommentStatus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _instance = null;

/**
 * コメントの bad
 */

var Bad = exports.Bad = function (_EventDispatcher) {
  (0, _inherits3.default)(Bad, _EventDispatcher);

  /**
   * <h3>Singleton</h3>
   * コメントの bad
   * @return {*}
   */

  function Bad() {
    var _ret;

    (0, _classCallCheck3.default)(this, Bad);

    if (_instance === null) {
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Bad).call(this));

      _instance = _this;
    }

    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * bad する
   * @param {string} commentId コメントId
   */

  (0, _createClass3.default)(Bad, [{
    key: 'add',
    value: function add(commentId) {
      this.fire(_CommentStatus.CommentStatus.BAD_ADD, commentId);
    }
    /**
     * bad を外す
     * @param {string} commentId コメントId
     */

  }, {
    key: 'remove',
    value: function remove(commentId) {
      this.fire(_CommentStatus.CommentStatus.BAD_DELETE, commentId);
    }
    // ---------------------------------------------------
    //  static method
    // ---------------------------------------------------
    /**
     * instance を生成します
     * @return {Bad} Bad instance を返します
     */

  }], [{
    key: 'factory',
    value: function factory() {

      if (_instance === null) {

        _instance = new Bad();
      }

      return _instance;
    }
  }]);
  return Bad;
}(_EventDispatcher2.EventDispatcher);