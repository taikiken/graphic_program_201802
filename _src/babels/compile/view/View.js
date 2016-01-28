'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * 表示を行います
 */

var View = exports.View = function () {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */

  function View(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, View);

    this._element = element;
    this._option = option;
    this._action = null;
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

      var option = this.option;
      if (option.hasOwnProperty(keyName) && typeof option[keyName] === 'function') {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // callback 側で通常の引数として取り出せるように apply します
        option[keyName].apply(this, args);
      }
    }
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
  }]);
  return View;
}();