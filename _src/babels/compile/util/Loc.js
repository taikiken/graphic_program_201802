/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 21:40
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

'use strict';

// window.location に関する Utility

/**
 * location に関する utility
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loc = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loc = exports.Loc = function () {
  /**
   * search を調べたい時に instance を作成します
   */

  function Loc() {
    (0, _classCallCheck3.default)(this, Loc);

    this._search = null;
  }

  /**
   *
   * @param {string} [search=''] key: value にしたい search型 文字列
   * @returns {Loc} instance を返します
   */

  (0, _createClass3.default)(Loc, [{
    key: 'parse',
    value: function parse() {
      var search = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      this._search = Loc.parse(search);
      return this;
    }

    /**
     * search value を keyから探します
     * @param {string} key search name
     * @returns {*} string|undefined|null で結果を返します
     */

  }, {
    key: 'find',
    value: function find(key) {

      var search = this._search;
      if (search === null) {
        return null;
      }

      return search[key];
    }

    /**
     *
     * @returns {string} location.hrefを返します
     */

  }], [{
    key: 'hashStrip',

    /**
     * hash(#example)から`#`をとります
     * @param {string} hash hash文字列
     * @returns {string} hash文字列から#を削除した文字列を返します
     */
    value: function hashStrip() {
      var hash = arguments.length <= 0 || arguments[0] === undefined ? Loc.hash : arguments[0];

      return hash.replace(/^[#\/]|\s+$/g, '');
    }

    /**
     * pathnameを/で分解します
     * @param {string} [pathname=Loc.pathname] location.pathname, hostなしのpath
     * @returns {Array} pathnameを/で分解し配列にし返します
     */

  }, {
    key: 'resolve',
    value: function resolve() {
      var pathname = arguments.length <= 0 || arguments[0] === undefined ? Loc.path : arguments[0];

      return pathname.split('/');
    }

    /**
     * location.search を key: value へ分解します
     * @param {string} search location.search型文字列
     * @returns {*} search を key: value へ分解し Object で返します
     */

  }, {
    key: 'parse',
    value: function parse() {
      var search = arguments.length <= 0 || arguments[0] === undefined ? Loc.search : arguments[0];

      // 引数が文字でない時は処理しない
      if (typeof search !== 'string' || search.length === 0) {

        return null;
      }

      search = search.replace('&amp;', '&');
      var vars = search.split('&');
      var results = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(vars), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var val = _step.value;

          var pair = val.split('=');
          if (Array.isArray(pair) && pair.length === 2) {

            results[pair[0]] = pair[1];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return results;
    }
  }, {
    key: 'current',
    get: function get() {

      return self.location.href;
    }

    /**
     *
     * @returns {string} location.pathname(urlからprotocol+hostを除く)を返します
     */

  }, {
    key: 'path',
    get: function get() {

      return self.location.pathname;
    }

    /**
     *
     * @returns {string} location.hashを返します
     */

  }, {
    key: 'hash',
    get: function get() {

      return self.location.hash;
    }

    /**
     * url の query 文字列
     * @returns {string} url ? 以降の query 文字列を返します, a=xxx&b=yyy
     */

  }, {
    key: 'search',
    get: function get() {

      return self.location.search.substring(1);
    }
  }]);
  return Loc;
}();