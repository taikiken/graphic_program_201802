/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 17:35
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
exports.Types = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Type = require('./types/Type');

var _Permalink = require('./types/Permalink');

var _Quries = require('./types/Quries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * API url, path option, query 情報を保持します
 */

var Types = exports.Types = function () {
  /**
   *
   * @param {Type} type Type instance
   * @param {Permalink} permalink Permalink instance
   * @param {Queries} queries Queries instabce
   */

  function Types(type, permalink, queries) {
    (0, _classCallCheck3.default)(this, Types);

    this._type = type;
    this._permalink = permalink;
    this._queries = queries;
  }

  /**
   *
   * @returns {Type} Type instance を返します
   */

  (0, _createClass3.default)(Types, [{
    key: 'type',
    value: function type() {

      return this._type;
    }

    /**
     *
     * @returns {Permalink} Permalink instance を返します
     */

  }, {
    key: 'permalink',
    value: function permalink() {

      return this._permalink;
    }

    /**
     *
     * @returns {Queries} Queries instance を返します
     */

  }, {
    key: 'queries',
    value: function queries() {

      return this._queries;
    }
  }]);
  return Types;
}();