/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/16 - 15:59
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
let Safety = UT.data.Safety;

/**
 * <h3>React Dom insert container element</h3>
 * <p>document.getElementById で取得する element</p>
 * 全て static です
 */
export class Dom {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Dom is static Class. not use new Dom().` );

    }
  }
  /**
   * element を取得します
   * @param {string} id 取得 element id
   * @return {Element} id から取得した element を返します
   */
  static get( id:string ):Element {

    let element = document.getElementById(id);
    if ( !Safety.isElement( element ) ) {
      console.warn( `element by ${id} not found.` );
      return null;
    }

    return element;
  }

  /**
   * pageTop container
   * @return {Element} pageTop element を返します
   */
  static pageTop():Element {
    return Dom.get( 'pageTop' );
  }
  // header
  /**
   * header user profile
   * @return {Element} 'user-profile-container' element を返します
   */
  static profile():Element {
    return Dom.get( 'user-profile-container' );
  }
  /**
   * header search from
   * @return {Element} head-search-container element を返します
   */
  static search():Element {
    return Dom.get( 'head-search-container' );
  }
  // sidebar
  /**
   * sidebar ranking
   * @return {Element} widget-ranking-container element を返します
   */
  static ranking():Element {
    return Dom.get( 'widget-ranking-container' );
  }
  /**
   * sidebar video
   * @return {Element} widget-recommend-container element を返します
   */
  static video():Element {
    return Dom.get( 'widget-recommend-container' );
  }
  // home
  /**
   * home slide show(pickup)
   * @return {Element} pickup-container を返します
   */
  static pickup():Element {
    return Dom.get( 'pickup-container' );
  }
  /**
   * home headline 注目の記事
   * @return {Element} headline-container を返します
   */
  static headline():Element {
    return Dom.get( 'headline-container' );
  }
  // archive / category
  /**
   * archive container
   * @return {Element} board-container を返します
   */
  static board():Element {
    return Dom.get( 'board-container' );
  }
  /**
   * archive container: more button
   * @return {Element} board-container-more を返します
   */
  static boardMore():Element {
    return Dom.get( 'board-container-more' );
  }
  // single
  /**
   * single 関連記事
   * @return {Element} single-related-container を返します
   */
  static related():Element {
    return Dom.get( 'single-related-container' );
  }
  /**
   * single 本文下, tag とか...
   * @return {Element} single-footer-container を返します
   */
  static singleFooter():Element {
    return Dom.get( 'single-footer-container' );
  }
  /**
   * single 本文上, title, 投稿者とか...
   * @return {Element} single-header-container を返します
   */
  static singleHeader():Element {
    return Dom.get( 'single-header-container' );
  }
  /**
   * single comment, 記事へのコメント
   * @return {Element} comment-form-container を返します
   */
  static commentForm():Element {
    return Dom.get( 'comment-form-container' );
  }
  /**
   * single comment, 自分のコメント
   * @return {Element} comment-self-container を返します
   */
  static commentSelf():Element {
    return Dom.get( 'comment-self-container' );
  }
  /**
   * single comment, 公式コメント
   * @return {Element} comment-official-container を返します
   */
  static commentOfficial():Element {
    return Dom.get( 'comment-official-container' );
  }
  /**
   * single comment, みんなのコメント
   * @return {Element} comment-normal-container を返します
   */
  static commentNormal():Element {
    return Dom.get( 'comment-normal-container' );
  }

  // --------------------------------------
  static signup():Element {
    return Dom.get( 'signup-container' );
  }
}
// return Dom.get( '' );
