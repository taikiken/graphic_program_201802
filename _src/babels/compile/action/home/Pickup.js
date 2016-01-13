/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:49
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
exports.Pickup = undefined;

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

var _Action2 = require('../Action');

var _Api = require('../../net/Api');

var _Result = require('../../data/Result');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Home pickup(slider)
 */

var Pickup = exports.Pickup = function (_Action) {
  (0, _inherits3.default)(Pickup, _Action);

  /**
   * Home pickup(slider) データを取得します
   * types: Api.home() を使用します
   */

  function Pickup() {
    (0, _classCallCheck3.default)(this, Pickup);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Pickup).call(this, _Api.Api.home()));
  }

  /**
   * Ajax API url を作成します
   * Api.home().url/pickup?offset=0&length=5
   * @returns {string} pickup API url を返します
   */

  (0, _createClass3.default)(Pickup, [{
    key: 'url',
    value: function url() {

      return this._types.url + '/pickup?offset=0&length=5';
    }

    /**
     * Ajax success callback
     * @param {Result} result Ajax成功結果
     */

  }, {
    key: 'success',
    value: function success(result) {

      // success
      console.log('result: ' + result);
    }

    /**
     * Ajax error callback
     * @param {Error} error Ajax失敗結果
     */

  }, {
    key: 'fail',
    value: function fail(error) {

      // error
      console.log('error: ' + error);
    }
  }]);
  return Pickup;
}(_Action2.Action);