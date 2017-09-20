'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2016/11/22 - 13:26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Text = require('../util/Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CSS short hand pattern を管理します
 */
var Patterns = function () {
  function Patterns() {
    _classCallCheck(this, Patterns);
  }

  _createClass(Patterns, null, [{
    key: 'settings',

    /**
     * パターン調査対象の CSS class リスト
     * ```
     * {
     *  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
     *  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
     *  'border-color': [
     *    'borderTopColor',
     *    'borderRightColor',
     *    'borderBottomColor',
     *    'borderLeftColor'],
     *  'border-style': [
     *    'borderTopStyle',
     *    'borderRightStyle',
     *    'borderBottomStyle',
     *    'borderLeftStyle'],
     *  'border-width': [
     *    'borderTopWidth',
     *    'borderRightWidth',
     *    'borderBottomWidth',
     *    'borderLeftWidth'],
     * }
     * ```
     * @returns {Object} パターン調査対象の CSS class list
     */
    value: function settings() {
      return {
        padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
        margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
        'border-color': ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
        'border-style': ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
        'border-width': ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']
      };
    }
    /**
     * 引数 `str` が調査対象 className かを判定します
     * @param {string} str CSS className
     * @returns {boolean} 調査対象の時に true を返します
     */

  }, {
    key: 'match',
    value: function match(str) {
      // camel case を dash(hyphenation)へ変換します
      var key = _Text2.default.dash(str);
      // settings パターンキーと合致してるかを調査します
      return Object.keys(Patterns.settings()).indexOf(key) !== -1;
    }
    /**
     * 引数 `str` をキーにした操作対象のリストを取得します
     * @param {string} str CSS className
     * @returns {Array<string>|undefined} 引数 `str` をキーにした操作対象のリスト
     */

  }, {
    key: 'get',
    value: function get(str) {
      // camel case を dash(hyphenation)へ変換します
      var key = _Text2.default.dash(str);
      return Patterns.settings()[key];
    }
  }]);

  return Patterns;
}();

exports.default = Patterns;