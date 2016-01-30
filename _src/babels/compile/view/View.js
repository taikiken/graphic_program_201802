'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = undefined;

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

var _EventDispatcher2 = require('../event/EventDispatcher');

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 表示を行います
 */
/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// import {Action} from '../action/Action';
// import {ViewError} from './error/ViewError';

var View = exports.View = function (_EventDispatcher) {
  (0, _inherits3.default)(View, _EventDispatcher);

  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */

  function View(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, View);

    option = _Safety.Safety.object(option);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(View).call(this));

    _this._element = element;
    _this._option = option;
    _this._action = null;

    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} render root element を返します
   */

  (0, _createClass3.default)(View, [{
    key: 'executeSafely',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * option Object に kyeName が存在し型が function かを調べ関数を実行する
     * @param {string} keyName 存在チェックを行う関数キー名
     * @param {*} [args=] 実行関数への引数
     */
    value: function executeSafely(keyName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var option = this.option;
      if (option.hasOwnProperty(keyName) && typeof option[keyName] === 'function') {

        // callback 側で通常の引数として取り出せるように apply します
        option[keyName].apply(this, args);
      }

      this.dispatch({ type: keyName, args: args });
    }
    // ---------------------------------------------------
    //  CONST
    // ---------------------------------------------------
    /**
     * event BEFORE_RENDER
     * @return {string} beforeRender を返します
     */

  }, {
    key: 'element',
    get: function get() {
      return this._element;
    }
    /**
     *
     * @return {Object|*} callback handler がセットされたObjectを返します
     */

  }, {
    key: 'option',
    get: function get() {
      return this._option;
    }
    /**
     *
     * @return {*} Action instance を返します
     */

  }, {
    key: 'action',
    get: function get() {
      return this._action;
    }
  }], [{
    key: 'BEFORE_RENDER',
    get: function get() {
      return 'beforeRender';
    }
    /**
     * event WILL_MOUNT
     * @return {string} beforeRender を返します
     */

  }, {
    key: 'WILL_MOUNT',
    get: function get() {
      return 'willMount';
    }
    /**
     * event DID_MOUNT
     * @return {string} beforeRender を返します
     */

  }, {
    key: 'DID_MOUNT',
    get: function get() {
      return 'didMount';
    }
    /**
     * event ERROR_MOUNT
     * @return {string} beforeRender を返します
     */

  }, {
    key: 'ERROR_MOUNT',
    get: function get() {
      return 'errorMount';
    }
    /**
     * event UNDEFINED_ERROR
     * @return {string} beforeRender を返します
     */

  }, {
    key: 'UNDEFINED_ERROR',
    get: function get() {
      return 'undefinedError';
    }
    /**
     * event EMPTY_ERROR
     * @return {string} beforeRender を返します
     */

  }, {
    key: 'EMPTY_ERROR',
    get: function get() {
      return 'emptyError';
    }
    /**
     * event RESPONSE_ERROR
     * @return {string} beforeRender を返します
     */

  }, {
    key: 'RESPONSE_ERROR',
    get: function get() {
      return 'responseError';
    }
  }]);
  return View;
}(_EventDispatcher2.EventDispatcher);