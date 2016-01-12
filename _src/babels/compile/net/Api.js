/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
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
exports.Api = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Types = require('./Types');

var _Type = require('./types/Type');

var _Permalink = require('./types/Permalink');

var _Quries = require('./types/Quries');

var _Query = require('./types/Query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _instance = null;
var API_PATH = '/api/v1';

/**
 * サーバーリクエストAPIを管理します
 */

var Api = exports.Api = function () {
  /**
   * singleton なので Api.factory() でインスタンスを作成します
   * @returns {Api} Api instance を返します
   */

  function Api() {
    (0, _classCallCheck3.default)(this, Api);

    if (_instance !== null) {

      throw new Error('Api is singleton pattern. instead use Api.factory()');
    }

    _instance = this;

    this.signOff();

    this._api = {
      login: new _Types.Types(new _Type.Type(API_PATH + '/oauth/token', 'POST'), new _Permalink.Permalink(), new _Quries.Queries()),
      // home / self
      home: new _Types.Types(new _Type.Type(API_PATH + '/articles/home'), new _Permalink.Permalink(['pickup', 'headline']), new _Quries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)])),
      self: new _Types.Types(new _Type.Type(API_PATH + '/articles/self'), new _Permalink.Permalink(['pickup', 'headline']), new _Quries.Queries([new _Query.Query('offset', 'number', 0), new _Query.Query('length', 'number', 10)]))
    };

    return _instance;
  }

  /**
   * property sign へ true をセットします
   * sign inした
   */

  (0, _createClass3.default)(Api, [{
    key: 'signIn',
    value: function signIn() {

      this._sign = true;
    }
    /**
     * property sign へ false をセットします
     * sign offした
     */

  }, {
    key: 'signOff',
    value: function signOff() {

      this._sign = false;
    }

    /**
     * ユーザーがsign in済みかどうかを調べます
     * @readOnly
     * @returns {boolean} true: sign in, false: sign offを返します
     */

  }, {
    key: 'login',

    /**
     * LOGIN API をTypes instanceで返します
     * @returns {Types} LOGIN API を返します
     */
    value: function login() {

      return this._api.login;
    }

    /**
     * @returns {*} HOME API(home / self)をTypes instanceで返します
     */

  }, {
    key: 'home',
    value: function home() {

      return this.sign ? this._api.self : this._api.home;
    }

    /**
     * @returns {Api} Api instance を返します
     */

  }, {
    key: 'sign',
    get: function get() {

      return this._sign;
    }
  }], [{
    key: 'factory',
    value: function factory() {

      if (_instance === null) {

        _instance = new Api();
      }

      return _instance;
    }
  }]);
  return Api;
}();