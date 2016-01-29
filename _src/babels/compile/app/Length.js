/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 16:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/*
// Proxy は使えない
// https://babeljs.io/docs/learn-es2015/#proxies
// babel not support

export let Length = new Proxy(
  {
    headline: 6
  },
  {
    has: function( target, property ) {
      return property in target;
    },
    set: function( target, property, value, receiver ) {
      if ( Number.isInteger( value ) ) {
        target[ property ] = value;
        return true;
      } else {
        throw new Error( `${property} integer required. ${value}` );
      }
    },
    get: function( target, property, receiver ) {
      console.log(receiver);

      if ( property in target ) {
        console.log(receiver);
        return target[property];
      } else {
        return 'Not Found';
      }
    }
  }
);
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Length = undefined;

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _pickup = 5;
var _headline = 6;
var _ranking = 5;
var _video = 5;
var _archive = 10;

/**
 * <h3>offset length default value</h3>
 * 全て static です
 */

var Length = exports.Length = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Length(target) {
    (0, _classCallCheck3.default)(this, Length);

    if (_symbol !== target) {

      throw new Error('Length is static Class. not use new Length().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Number} pickup default 取得数を返します
   */

  (0, _createClass3.default)(Length, null, [{
    key: 'pickup',
    get: function get() {
      return _pickup;
    }

    /**
     * @param {Number} value pickup default 取得数
     */
    ,
    set: function set(value) {
      if ((0, _isInteger2.default)(value)) {
        _pickup = value;
      } else {
        throw new Error('pickup: integer required. ' + value);
      }
    }

    /**
     * @return {Number} headline default 取得数を返します
     */

  }, {
    key: 'headline',
    get: function get() {
      return _headline;
    }
    /**
     * @param {Number} value headline default 取得数
     */
    ,
    set: function set(value) {
      if ((0, _isInteger2.default)(value)) {
        _headline = value;
      } else {
        throw new Error('headline: integer required. ' + value);
      }
    }
    /**
     * @return {Number} ranking default 取得数を返します
     */

  }, {
    key: 'ranking',
    get: function get() {
      return _ranking;
    }
    /**
     *
     * @param {Number} value ranking default 取得数
     */
    ,
    set: function set(value) {
      if ((0, _isInteger2.default)(value)) {
        _ranking = value;
      } else {
        throw new Error('ranking: integer required. ' + value);
      }
    }
    /**
     * @return {Number} video default 取得数を返します
     */

  }, {
    key: 'video',
    get: function get() {
      return _video;
    }
    /**
     * @param {Number} value video default 取得数
     */
    ,
    set: function set(value) {
      if ((0, _isInteger2.default)(value)) {
        _video = value;
      } else {
        throw new Error('video: integer required. ' + value);
      }
    }
    /**
     * @return {Number} archive default 取得数を返します
     */

  }, {
    key: 'archive',
    get: function get() {
      return _archive;
    }
    /**
     * @param {Number} value archive default 取得数
     */
    ,
    set: function set(value) {
      if ((0, _isInteger2.default)(value)) {
        _archive = value;
      } else {
        throw new Error('archive: integer required. ' + value);
      }
    }
  }]);
  return Length;
}();