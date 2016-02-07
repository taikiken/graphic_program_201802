/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 17:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Env = undefined;

var _Loc = require('../util/Loc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _mode = 'production';

/**
 * <h3>local test / develop / production を管理します</h3>
 * 全て static<br>
 * 動作モードを設定します<br>
 * <pre>
 *    production: 実行モード
 *    develop: 開発モード（ローカルからのテスト）
 *    test: ローカルテストモード
 * </pre>
 */

var Env = exports.Env = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Env(target) {
    (0, _classCallCheck3.default)(this, Env);

    if (_symbol !== target) {

      throw new Error('Env is static Class. not use new Env().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string} 現在のモードを返します
   */

  (0, _createClass3.default)(Env, null, [{
    key: 'test',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * ローカルテストモードにします
     */
    value: function test() {

      _mode = Env.TEST;
    }
    /**
     * 開発モードにします
     */

  }, {
    key: 'develop',
    value: function develop() {

      _mode = Env.DEVELOP;
    }
    /**
     * 実行モードにします
     */

  }, {
    key: 'production',
    value: function production() {

      _mode = Env.PRODUCTION;
    }
  }, {
    key: 'mode',
    get: function get() {

      return _mode;
    }

    /**
     * @readonly
     * @return {string} 文字列 production を返します
     */

  }, {
    key: 'PRODUCTION',
    get: function get() {
      return 'production';
    }
    /**
     * @readonly
     * @return {string} 文字列 production を返します
     */

  }, {
    key: 'DEVELOP',
    get: function get() {
      return 'develop';
    }
    /**
     * @readonly
     * @return {string} 文字列 test を返します
     */

  }, {
    key: 'TEST',
    get: function get() {
      return 'test';
    }
  }]);
  return Env;
}();