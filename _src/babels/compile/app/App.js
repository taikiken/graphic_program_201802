/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 13:39
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
exports.App = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Env = require('./Env');

var _Api = require('../net/Api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

var App = exports.App = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function App(target) {
    (0, _classCallCheck3.default)(this, App);

    if (_symbol !== target) {

      throw new Error('Env is static Class. not use Env User().');
    }
  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * @readonly
   * @return {string} 代替画像パス
   */

  (0, _createClass3.default)(App, null, [{
    key: 'test',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * ローカルテストモードにします
     */
    value: function test() {

      _Env.Env.test();
      _Api.Api.rebuild();
    }
    /**
     * 開発モードにします
     */

  }, {
    key: 'develop',
    value: function develop() {

      _Env.Env.develop();
      _Api.Api.rebuild();
    }
    /**
     * 実行モードにします
     */

  }, {
    key: 'production',
    value: function production() {

      _Env.Env.production();
      _Api.Api.rebuild();
    }
  }, {
    key: 'EMPTY_THUMBNAIL',
    get: function get() {

      return 'img/common/empty.jpg';
    }
  }]);
  return App;
}();