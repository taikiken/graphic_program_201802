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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Home pickup(slider)
 */

var Pickup = exports.Pickup = function (_Action) {
  (0, _inherits3.default)(Pickup, _Action);

  /**
   * Home pickup(slider) データを取得します<br>
   * <b>types: Api.home()</b> を使用します
   *
   * @example
   * function done( result ) {
   *    console.log( 'success', result.response );
   *    console.log( 'success', result.status );
   *    console.log( 'success', result.request );
   *  }
   *
   * function fail( error ) {
   *    console.log( 'error', error );
   *  }
   *
   * var headline = new Headline( done, fail );
   * headline.start();
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function Pickup() {
    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    (0, _classCallCheck3.default)(this, Pickup);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Pickup).call(this, _Api.Api.home(), resolve, reject));
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * Ajax API url を作成します<br>
   * <code>Api.home().url/pickup?offset=0&length=5</code>
   * @method url
   * @return {string} pickup API url を返します
   */

  (0, _createClass3.default)(Pickup, [{
    key: 'url',
    get: function get() {

      return this._url + '/pickup?offset=0&length=5';
    }
  }]);
  return Pickup;
}(_Action2.Action);