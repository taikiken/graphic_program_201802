'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ajax2 = require('./Ajax');

var _Ajax3 = _interopRequireDefault(_Ajax2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/06/05 - 21:26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * fetch API を使用し Ajax request を行います, ref: {@link Ajax}
 * @example
 * const ajax = new Ajax();
 * // async / await 1
 * async function request() {
 *  const json = await thunk.start('https://jsonplaceholder.typicode.com/posts');
 *  const pre = document.getElementById('pre');
 *  pre.innerHTML = JSON.stringify(json);
 * }
 * request();
 * // async / await 2
 * async function request() {
 *  return await thunk.start('https://jsonplaceholder.typicode.com/posts');
 * }
 * request()
 *  .then(json => {
 *    const pre = document.getElementById('pre');
 *    pre.innerHTML = JSON.stringify(json);
 *  });
 * @see http://caniuse.com/#feat=fetch
 * @see https://github.com/github/fetch
 * @see https://github.com/taylorhakes/promise-polyfill
 * @see https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
 * @see https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
 * @see https://developer.mozilla.org/ja/docs/Web/API/Request
 * @see https://developer.mozilla.org/ja/docs/Web/API/Request/Request
 * @see https://developer.mozilla.org/ja/docs/Web/API/Headers
 * @see https://developer.mozilla.org/ja/docs/Web/API/Body
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * @see http://getmesh.io/Blog/Make%20AJAX-Requests%20Great%20Again
 * @since 0.3.4
 */
var AjaxThunk = function (_Ajax) {
  _inherits(AjaxThunk, _Ajax);

  function AjaxThunk() {
    _classCallCheck(this, AjaxThunk);

    return _possibleConstructorReturn(this, (AjaxThunk.__proto__ || Object.getPrototypeOf(AjaxThunk)).apply(this, arguments));
  }

  _createClass(AjaxThunk, [{
    key: 'start',

    // ----------------------------------------
    // METHOD
    // ----------------------------------------
    /**
     * <p>Ajax request 開始します</p>
     * <p>request 可能 / 不可能 flag が false の時は実行しません<br>
     * true の時は false にしリクエストを開始します</p>
     *
     * - resolve, reject 関数確認後実行します
     * - Promise instance を返します
     * - json / error を返します
     *
     * @param {string} path Ajax request path
     * @param {string} [method=GET] GET, POST, PUT, DELETE...etc request method
     * @param {?Headers} [headers=null] Headers option, token などを埋め込むのに使用します
     * @param {?FormData} [formData=null] フォームデータを送信するのに使用します
     * @return {Promise} ajax request を開始し fetch Promise 返します
     */
    value: function start(path) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      // ajax request 開始
      if (!this.can) {
        throw new Error('Ajax request busy: ' + this.can);
      }

      // flag off
      this.disable();

      // @type {Request} Request instance
      var request = this.option(path, method, headers, formData);

      // fetch start
      return fetch(request)
      // @param {Object} response - Ajax response
      .then(function (response) {
        // may be success
        if (response.status !== 200) {
          throw new Error('Ajax status error: (' + response.status + ')');
        }
        return response.json();
      });
    }
  }]);

  return AjaxThunk;
}(_Ajax3.default);

exports.default = AjaxThunk;