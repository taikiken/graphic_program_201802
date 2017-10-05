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
export default class Title {
  /**
   * ignore list
   * @type {[string]}
   */
  static strong = [
    '六大学野球',
  ];
  /**
   * title tag を見て detect する
   * @returns {boolean} true: ignore 対象
   */
  static detect() {
    const heads = document.getElementsByTagName('head');
    if (!heads || !heads.length) {
      return false;
    }
    const head = heads[0];
    if (!head) {
      return false;
    }
    const titles = head.getElementsByTagName('title');
    if (!titles || !titles.length) {
      return false;
    }
    const title = titles[0];
    if (!title) {
      return false;
    }
    const value = title.innerHTML;
    if (!value) {
      return false;
    }
    // console.log('value', value, Title.strong.some(text => value.indexOf(text) !== -1));
    return Title.strong.some(text => value.indexOf(text) !== -1);
  }
}
