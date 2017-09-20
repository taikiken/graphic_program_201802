'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2016/12/23
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2015 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Text = require('../util/Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * URL query をパースします
 */
var Queries = function () {
  /**
   * URL query を受取パースします
   * @param {string} [queryString=location.search] パースする URL 文字列
   */
  function Queries() {
    var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;

    _classCallCheck(this, Queries);

    var _Queries$parse = Queries.parse(queryString),
        _Queries$parse2 = _slicedToArray(_Queries$parse, 2),
        data = _Queries$parse2[0],
        keys = _Queries$parse2[1];

    var naked = Queries.naked(queryString);
    /**
     * query key を取得します - query key array
     * @type {Array<string>}
     */
    this.keys = keys;
    /**
     * key: value 形式を取得します - URL query を key: value 形式で返します
     * @type {Object}
     */
    this.data = data;
    /**
     * query 文字列を取得します - パースする query 文字列
     * @type {string}
     */
    this.queryString = queryString;
    /**
     * パースしやすいように正規化した query 文字列 - `?` 以降文字 + `&amp;` を `&` へ置換えます
     * @type {string}
     */
    this.naked = naked;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * key が存在するかを調べます
   * @param {string} keyName 調査対象 key 名称
   * @returns {boolean} true: 存在する
   */


  _createClass(Queries, [{
    key: 'has',
    value: function has(keyName) {
      return this.keys.indexOf(keyName) !== -1;
    }
    /**
     * key 値を取得します
     * @param {string} keyName 調査対象 key 名称
     * @returns {string|undefined} 見つかると文字列で返します, 見つからない時は undefined を返します
     */

  }, {
    key: 'get',
    value: function get(keyName) {
      return this.data[keyName];
    }
    /**
     * key: value 形式を取得します
     * @returns {Object} URL query を key: value 形式で返します
     */

  }, {
    key: 'getAll',
    value: function getAll() {
      return this.data;
    }
    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    // /**
    //  * `&amp;` を `&` へ置換えます
    //  * @param {string} targetText 操作対象文字列
    //  * @returns {string} `&amp;` を `&` へ置換え返します
    //  */
    // static amp(targetText) {
    //   return targetText.split('&amp;').join('&');
    // }
    /**
     * 文字列先頭に `?` があればそれ以降の文字列を返し {@link Text.and} を実行し `&amp;` を `&` 変換します
     * @param {string} targetText 操作対象文字列
     * @returns {string} query を正規化します
     */

  }], [{
    key: 'naked',
    value: function naked(targetText) {
      // const queryString = Queries.amp(targetText);
      var queryString = _Text2.default.and(targetText);
      return queryString.substr(0, 1) === '?' ? queryString.substring(1) : targetText;
    }
    /**
     * query を kye: value 形式にします
     * @param {string} targetText 操作対象文字列
     * @returns {[Object, Array]} data, keys を返します
     */

  }, {
    key: 'parse',
    value: function parse(targetText) {
      var query = Queries.naked(targetText);
      var pairs = query.split('&');
      var data = {};
      var keys = [];
      pairs.map(function (pair) {
        var keyName = '';
        if (pair && pair.indexOf('=') !== -1) {
          // @type {Array<string>} - `key=value` を `=` で分割する
          var keyValue = pair.split('=');
          // @type {string} keyName
          var key = keyValue.shift();
          // data object へ keyName を key に値をセットする
          data[key] = keyValue.shift();
          keyName = key;
          // key 名称配列へ追加する
          keys.push(key);
        }
        return keyName;
      });

      return [data, keys];
    }
    /**
     * 引数 targetText (query) から引数 keyName 値を取得します
     * @param {string} keyName key 名称
     * @param {string} targetText query
     * @returns {string|undefined} 見つかると文字列で返します, 見つからない時は undefined を返します
     */

  }, {
    key: 'get',
    value: function get(keyName) {
      var targetText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.search;

      var _Queries$parse3 = Queries.parse(targetText),
          _Queries$parse4 = _slicedToArray(_Queries$parse3, 1),
          data = _Queries$parse4[0];

      return data[keyName];
    }
    /**
     * URL query の key: value 形式を取得します
     * @param {string} targetText query
     * @returns {[Object, Array]} URL query を key: value 形式で返します
     */

  }, {
    key: 'getAll',
    value: function getAll() {
      var targetText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;

      // const [data] = Queries.parse(targetText);
      return Queries.parse(targetText);
    }
  }]);

  return Queries;
}();

exports.default = Queries;