"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require("babel-runtime/core-js/symbol");

var _symbol3 = _interopRequireDefault(_symbol2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Format = undefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 23:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// 日付フォーマットなど...

var _symbol = (0, _symbol3.default)();

/**
 * <h3>文字フォーマットに関するUtilityです</h3>
 * 全て static<br>
 * ** 文字を定型に変換します **
 */

var Format = exports.Format = function () {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Format(target) {
    (0, _classCallCheck3.default)(this, Format);

    if (_symbol !== target) {

      throw new Error("Format is static Class. not use new Format().");
    }
  }
  /**
   * ISO8601 日付を 日本語形式に変換します
   * @param {string} iso ISO8601 日付 "2016-01-14T18:25:45+09:00"
   * @return {string} 2016年1月14日8時25分45秒 日本語へ変換し返します
   */

  (0, _createClass3.default)(Format, null, [{
    key: "date",
    value: function date(iso) {

      // ["2016-01-14T18:25:45", "2016", "01", "14", "18", "25", "45"] 分解
      var nums = iso.match(/(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)?/);
      // 先頭"2016-01-14T18:25:45"除去
      nums.shift();
      // 数値へ変換し 頭 0 除去, 01 -> 1
      var numbers = nums.map(function (num) {
        return parseInt(num, 10);
      });
      return numbers[0] + "年" + numbers[1] + "月" + numbers[2] + "日" + numbers[3] + "時" + numbers[4] + "分" + numbers[5] + "秒";
    }
  }]);
  return Format;
}();