/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 23:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

// Sagen
const Sagen = self.Sagen;

/**
 * <p>メインメニューにカテゴリースラッグを CSS class として追加します</p>
 * <p>メニューのカレント表示に使用しますs</p>
 */
export default class SPNav {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPNav is static Class. not use new SPNav().' );
  //
  //   }
  // }
  /**
   * global menu へ slug を css class として挿入
   * @param {string} slug category slug
   */
  static start(slug = 'all') {
    /*
    let nav = Dom.nav();
    if ( nav !== null && slug !== null && typeof slug !== 'undefined' ) {
      Sagen.Dom.addClass( nav, slug );
      SPNav.position( slug );
    }
    */
    // li#slug へ .current をつける
    const target = Dom.get(slug);
    if (target !== null ) {
      Sagen.Dom.addClass(target, 'current');
      SPNav.position(target);
    }
  }
  /**
   * current 位置をいい感じにする
   * @param {Element} target li element
   */
  static position(target:Element) {
    /*
    コンテナ状況

    div#gnav-sec-inner
      ul#gnav-sec-list
        li#slug
        li#slug
        li#slug
        li#slug
        li#slug
        li#slug
        li#slug
     */
    // gnav-sec-inner
    const inner = Dom.navInner();
    // ul#gnav-sec-list
    const ul = Dom.navList();
    if (inner === null || ul === null) {
      // 不正値なので処理しない
      return;
    }

    // ul -> display: table
    // 正確なwidthを取得するため
    ul.style.cssText = 'display: table;';
    // offset 取得
    const ulOffset = UT.util.Offset.offset(ul);
    // ul 元に戻す
    ul.style.cssText = '';

    // ul width
    const ulWidth = ulOffset.width;
    // li offset
    const targetOffset = UT.util.Offset.offset(target);
    // window width
    const windowWidth = window.innerWidth;

    // 移動させる距離
    const left = targetOffset.left;
    const rightEnd = targetOffset.right;

    // li全体がwindow 内なら何もしない
    if (rightEnd < windowWidth) {
      // window 内なので何もしない
      return;
    }

    // 左端につかないように調整する
    let altLeft = left - 10;

    const right = ulWidth - altLeft - windowWidth;

    // window 右端から離れ無いように調整する
    if (right < 0) {
      altLeft = altLeft + right;
      // right = 0;
    }

    // console.log( 'target ', ulWidth, left, right, windowWidth );
    // ul scroll 量で移動させる
    ul.scrollLeft = altLeft;
  }
}
