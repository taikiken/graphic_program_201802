/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 19:51
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
exports.HeadlineAuth = undefined;

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

var _ActionAuth2 = require('../ActionAuth');

var _Api = require('../../net/Api');

var _User = require('../../app/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * **認証**（ログイン）<br>
 * Home headline（注目ニュース）
 */

var HeadlineAuth = exports.HeadlineAuth = function (_ActionAuth) {
  (0, _inherits3.default)(HeadlineAuth, _ActionAuth);

  /**
   * <p>Home headline（注目ニュース） データを取得します<br>
   * ** types: Api.home() ** を使用します</p>
   *
   * **認証**（ログイン）
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function HeadlineAuth() {
    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    (0, _classCallCheck3.default)(this, HeadlineAuth);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HeadlineAuth).call(this, _User.User.token, _Api.Api.home(), resolve, reject));
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * Ajax API url を作成します<br>
   * <code>Api.home().url/headline?offset=0&length=6</code>
   * @return {string} headline API url を返します
   */

  (0, _createClass3.default)(HeadlineAuth, [{
    key: 'url',
    get: function get() {

      return this._url + '/headline?offset=0&length=6';
    }
  }]);
  return HeadlineAuth;
}(_ActionAuth2.ActionAuth);