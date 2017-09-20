'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/22 - 13:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 文字列操作の utility
 */
var Text = function () {
  function Text() {
    _classCallCheck(this, Text);
  }

  _createClass(Text, null, [{
    key: 'dash',

    /**
     * camel case を hyphenation に変換します
     * @param {string} str 操作対象文字列
     * @returns {string} キャメルケースをハイフネーションに変換後文字列を返します
     */
    value: function dash(str) {
      return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
    /**
     * camel case へ変換します
     * @param {string} str 操作対象文字列
     * @returns {*|void|string|XML} キャメルケース文字列を返します
     */

  }, {
    key: 'camel',
    value: function camel(str) {
      // return str.replace(/^\s+|\s+$/g, '');
      return str.replace(/-([a-z])/g, function (g) {
        var first = g[1];
        return first.toUpperCase();
      });
    }
    /**
     * 数値に3桁区切りの `,` カンマを挿入します
     * @param {number} number カンマを挿入する数値
     * @param {string} [locale=js-JP] ロケール
     * @returns {string} カンマ挿入後の文字列, 小数点なし
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
     * @see http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
     */

  }, {
    key: 'comma',
    value: function comma(number) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ja-JP';

      var numbered = '';
      if (number.toLocaleString) {
        numbered = number.toLocaleString(locale);
      } else {
        numbered = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      // IE 8 `NN.00` にするので `.` 以下削除
      return numbered.split('.').shift();
    }
    /**
     * 文字列の単語を置き換えます
     * @param {string} targetText 置換え対象文字列
     * @param {string} targetWord 置換え元単語
     * @param {string} replaceWord 置換える単語
     * @returns {string} 置換え後の文字列を返します
     */

  }, {
    key: 'replace',
    value: function replace(targetText, targetWord, replaceWord) {
      return targetText.split(targetWord).join(replaceWord);
    }
    /**
     * 文字列から単語を削除します
     * @param {string} targetText 置換え対象文字列
     * @param {string} targetWord 削除する単語
     * @returns {string} 削除後の文字列を返します
     */

  }, {
    key: 'remove',
    value: function remove(targetText, targetWord) {
      return Text.replace(targetText, targetWord, '');
    }
    /**
     * 文字列の `&` を `&amp;` へ置換えます
     * @param {string} targetText 操作対象文字列
     * @returns {string} `&amp;` 置換え後の文字列を返します
     */

  }, {
    key: 'amp',
    value: function amp(targetText) {
      return Text.replace(targetText, '&', '&amp;');
    }
    /**
     * 文字列の `&amp;` を `&` へ置換えます
     * @param {string} targetText 操作対象文字列
     * @returns {string} `&` 置換え後の文字列を返します
     */

  }, {
    key: 'and',
    value: function and(targetText) {
      return Text.replace(targetText, '&amp;', '&');
    }
  }]);

  return Text;
}();

exports.default = Text;