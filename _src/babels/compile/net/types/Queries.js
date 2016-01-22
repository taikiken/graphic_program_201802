/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 16:46
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
exports.Queries = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Query = require('./Query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Query{key: value} を配列で管理します
 */

var Queries = exports.Queries = function () {
  /**
   * Query 情報を保持します
   * @param {Array<Query>} [queries=[]] Query{key: value} 配列
   */

  function Queries() {
    var queries = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    (0, _classCallCheck3.default)(this, Queries);

    this._queries = queries;
  }

  /**
   * queries個数であるかないかの判断は可能
   * @method length
   * @return {Number} queries個数を返します
   */

  (0, _createClass3.default)(Queries, [{
    key: 'length',
    value: function length() {

      return this._queries.length;
    }

    /**
     * @method all
     * @return {Array.<Query>} 全てのqueriesを返します
     */

  }, {
    key: 'all',
    value: function all() {

      return this._queries;
    }

    /**
     * key から query を探します
     * @method search
     * @param {string} key query key name, ?start=0 の start
     * @return {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
     */

  }, {
    key: 'search',
    value: function search(key) {

      var queries = this._queries;
      var result;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(queries), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var query = _step.value;

          result = query.search(key);
          if (result !== null) {
            break;
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

      return result;
    }
  }]);
  return Queries;
}();