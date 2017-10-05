'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/04 - 22:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * title tag を見て detect する
 * ```
 * 六大学カテゴリーの記事ですが、タイトルに必ず | 六大学野球 | スポーツブル (スポブル) が入っています。
 * タイトルに 六大学野球 があれば非表示などの処理は難しいでしょうか？
 * ```
 * @see https://github.com/undotsushin/undotsushin/issues/2590#issuecomment-334146692
 */
var Title = function () {
  function Title() {
    _classCallCheck(this, Title);
  }

  _createClass(Title, null, [{
    key: 'detect',

    /**
     * title tag を見て detect する
     * @returns {boolean} true: ignore 対象
     */
    value: function detect() {
      var heads = document.getElementsByTagName('head');
      if (!heads || !heads.length) {
        return false;
      }
      var head = heads[0];
      if (!head) {
        return false;
      }
      var titles = head.getElementsByTagName('title');
      if (!titles || !titles.length) {
        return false;
      }
      var title = titles[0];
      if (!title) {
        return false;
      }
      var value = title.innerHTML;
      if (!value) {
        return false;
      }
      // console.log('value', value, Title.strong.some(text => value.indexOf(text) !== -1));
      return Title.strong.some(function (text) {
        return value.indexOf(text) !== -1;
      });
    }
    /**
     * ignore list
     * @type {[string]}
     */

  }]);

  return Title;
}();

Title.strong = ['六大学野球'];
exports.default = Title;