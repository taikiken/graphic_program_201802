/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/25 - 18:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';
//
// // react
// const React = self.React;

import React from 'react';

/**
 * 選手 table > th, td 出力コントロールします
 * @since 2016-10-25
 */
export default class Table {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * th tag を出力します
   * @param {boolean} bool true: output
   * @param {string} text 出力文字
   * @param {number} index `th-0` 部分の index 値
   * @return {?XML} th tag
   */
  static th(bool, text, index) {
    if (!bool) {
      return null;
    }
    return (
      <th className={`th-${index}`}>{text}</th>
    );
  }
  /**
   * td tag を出力します
   * @param {boolean} bool true: output
   * @param {string} text 出力文字
   * @param {string} [className=''] td へ付与する CSS class 名称
   * @return {?XML} td tag
   */
  static td(bool, text, className = '') {
    if (!bool) {
      return null;
    }
    if (className) {
      return (
        <td className={className}>{text}</td>
      );
    }

    return (
      <td>{text}</td>
    );
  }
}
