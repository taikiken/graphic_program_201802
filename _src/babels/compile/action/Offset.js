/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 16:03
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
exports.Offset = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Result = require('../data/Result');

var _Action2 = require('./Action');

var _Types = require('../net/Types');

var _Length = require('../app/const/Length');

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends して下さい
 */

var Offset = exports.Offset = function (_Action) {
  (0, _inherits3.default)(Offset, _Action);

  /**
   * Ajax 処理, queryあり<br>
   * **Next 読込** がある時に使用します
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */

  function Offset(types) {
    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var offset = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var length = arguments.length <= 4 || arguments[4] === undefined ? _Length.Length.archive : arguments[4];
    var ResultClass = arguments.length <= 5 || arguments[5] === undefined ? _Result.Result : arguments[5];
    (0, _classCallCheck3.default)(this, Offset);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Offset).call(this, types, resolve, reject));

    _this._offset = offset;
    _this._length = length;
    _this._total = -1;
    _this._resultClass = ResultClass;

    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Number|*} total件数を返します
   */

  (0, _createClass3.default)(Offset, [{
    key: 'start',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * start を使わずに next を使用します
     * @override
     * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
     */
    value: function start() {
      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

      // this._ajax.start( this.url, method, this.success.bind( this ), this.fail.bind( this ) );
      console.warn('instead use next, ' + this.url + ', ' + method);
    }
    /**
     * offset 値を加算します
     * @param {Number} [count] default 値は this._length になります。 Ajax 成功後 次のリクエスト前に Offset.next() し加算します。
     */

  }, {
    key: 'update',
    value: function update() {
      var count = arguments.length <= 0 || arguments[0] === undefined ? this._length : arguments[0];

      this.offset += count;
    }
    /**
     * 次があるかを調べます
     * @return {boolean} 次があるかの真偽値を返します
     */

  }, {
    key: 'hasNext',
    value: function hasNext() {

      // _total === -1 の時は常に true
      // total が offset（次の読み込み開始位置）より小さい時に true
      return this._total < 0 ? true : this.offset < this.total;
    }
    /**
     * 次の読込を開始します<br>
     * start の代わりに使用します
     * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
     */

  }, {
    key: 'next',
    value: function next() {
      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

      // next data があるかないかを調べます
      // next がある時は Ajax を実行します
      if (this.hasNext()) {

        method = _Safety.Safety.string(method, this.method);
        this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass);
      }
    }
    /**
     * Ajax success callback, update()を実行し offset 値をカウントアップし callback method があれば実行します
     * @param {Result} result Ajax成功結果
     */

  }, {
    key: 'success',
    value: function success(result) {

      this.update();
      // 合計数をupdate
      this.total = result.total;
      // success
      (0, _get3.default)((0, _getPrototypeOf2.default)(Offset.prototype), 'success', this).call(this, result);
    }
  }, {
    key: 'total',
    get: function get() {
      return this._total;
    }
    /**
     * total件数を設定します
     * @param {Number} total total件数
     */
    ,
    set: function set(total) {
      this._total = total;
    }
    /**
     * @return {Number|*} lengths 取得件数を返します
     */

  }, {
    key: 'length',
    get: function get() {
      return this._length;
    }
    /**
     * length件数を設定します
     * @param {Number} length length 取得件数
     */
    ,
    set: function set(length) {
      this._length = length;
    }
    /**
     * @return {Number|*} offset 取得開始位置を返します
     */

  }, {
    key: 'offset',
    get: function get() {
      return this._offset;
    }
    /**
     * length件数を設定します
     * @param {Number} offset offset 取得開始位置
     */
    ,
    set: function set(offset) {
      this._offset = offset;
    }
    /**
     * url を作成します
     * @return {string} 作成した url を返します
     */

  }, {
    key: 'url',
    get: function get() {
      return this._url + '?offset=' + this.offset + '&length=' + this.length;
    }
  }]);
  return Offset;
}(_Action2.Action);