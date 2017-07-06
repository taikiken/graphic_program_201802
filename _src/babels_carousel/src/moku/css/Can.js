/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/30 - 16:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * [native code] - document
 * @type {HTMLDocument}
 * @private
 * @static
 */
const document = self.document;
/**
 * CSS detector に使用する virtual CSSStyleDeclaration
 * ```
 * document.createElement('p').style
 * ```
 * @type {CSSStyleDeclaration}
 * @private
 * @static
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
 */
const style = document.createElement('p').style;
/**
 * vendor prefix list, CSS detector に使用します
 * - '-webkit-',
 * - '-moz-',
 * - '-ms-',
 * - '-o-',
 * - ''
 * @type {[string]}
 * @private
 * @static
 */
const vendors = [
  '-webkit-',
  '-moz-',
  '-ms-',
  '-o-',
  '',
];
// /**
//  * 確認用関数
//  * - transition - @return {boolean}
//  * - transform - @return {boolean}
//  * @private
//  * @static
//  * @type {{transition: (()), transform: (())}}
//  */
// const check = {
//   transition() {
//     const p = document.createElement('p');
//     return typeof p.style.transition !== 'undefined' ||
//       typeof p.style.WebkitTransition !== 'undefined' ||
//       typeof p.style.MozTransition !== 'undefined' ||
//       typeof p.style.msTransition !== 'undefined' ||
//       typeof p.style.OTransition !== 'undefined';
//   },
//   transform() {
//     const p = document.createElement('p');
//     return typeof p.style.transform !== 'undefined' ||
//       typeof p.style.WebkitTransform !== 'undefined' ||
//       typeof p.style.MozTransform !== 'undefined' ||
//       typeof p.style.msTransform !== 'undefined' ||
//       typeof p.style.OTransform !== 'undefined';
//   },
// };

/**
 * CSS3 transition 可能フラッグ
 * @type {boolean}
 * @private
 * @static
 */
const transition = vendors.some(prefix => typeof style[`${prefix}transition`] !== 'undefined');
/**
 * CSS3 transform 可能フラッグ
 * @type {boolean}
 * @private
 * @static
 */
const transform = vendors.some(prefix => typeof style[`${prefix}transform`] !== 'undefined');

/**
 * CSS3 機能使用可能かを調べます
 * @example
 * if (Can.transition()) {
 *  // can CSS3 transition
 * }
 *
 * if (Can.transform()) {
 *  // can CSS3 transform
 * }
 */
export default class Can {
  /**
   * CSS3 transition が使用可能かを調べます
   * @returns {boolean} true: 使用可能
   */
  static transition() {
    return transition;
  }
  /**
   * CSS3 transform が使用可能かを調べます
   * @returns {boolean} true: 使用可能
   */
  static transform() {
    return transform;
  }
}
