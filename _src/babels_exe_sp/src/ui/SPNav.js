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
'use strict';

let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

// Sagen
let Sagen = self.Sagen;

/**
 * メインメニューにかテゴリースラッグを追加
 */
export class SPNav {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SPNav is static Class. not use new SPNav().` );

    }
  }
  /**
   * global menu へ slug を css class として挿入
   * @param {string} slug category slug
   */
  static start( slug:string = 'all' ):void {
    let nav = Dom.nav();
    if ( nav !== null && slug !== null && typeof slug !== 'undefined' ) {
      Sagen.Dom.addClass( nav, slug );
      // SPNav.position( slug );
    }
  }

  static position( slug:string ):void {
    let inner = Dom.navInner();
    let target = Dom.get( slug );
    let ul = Dom.navList();
    if ( target === null || inner === null || ul === null ) {
      // 不正値なので処理しない
      return;
    }

    // ul -> display: table
    // 正確なwidthを取得するため
    ul.style.cssText = 'display: table;';
    let ulOffset = UT.util.Offset.offset( ul );
    // ul 元に戻す
    ul.style.cssText = '';

    let ulWidth = ulOffset.width;

    let targetOffset = UT.util.Offset.offset( target );
    let windowWidth = window.innerWidth;

    let left = targetOffset.left;
    if ( left < windowWidth ) {
      // window 内なので何もしない
      return;
    }

    let right = ulWidth - left - windowWidth;

    if ( right < 0 ) {
      left = left + right;
      right = 0;
    }

    console.log( 'target ', ulWidth, left, right, windowWidth );
    // inner.style.cssText = `position: relative; transform: translateX(${-left}px); overflow: visible;`;
    // inner.style.cssText = `padding-right: ${left}px`;
    // ul を変更する
    // ul.style.cssText = `width: auto; position: relative; transform: translateX(${-left}px)`;
    // ul.style.cssText = `width: auto; position: relative; left: ${-left}px`;
    // ul.style.cssText = `width: auto; position: relative; left: ${-left}px; margin-left: ${-left}px;`;
    // ul.style.cssText = `width: auto; margin-left: ${-left}px`;
    // ul.style.cssText = `width: auto; margin-left: ${-left}px; margin-right: ${-left}px;`;
  }
}
