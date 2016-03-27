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


import {Safety} from '../data/Safety';

let _symbol = Symbol();

/**
 * <h3>React Dom を insert する element</h3>
 * <p>document.getElementById で取得する element</p>
 * 全て static です
 */
export class Dom {
  /**
   * PC / SP 共通です
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Dom is static Class. not use new Dom().` );

    }
  }
  /**
   * 引数 id を使用し document.getElementById を行い element を取得します, 取得できない時は null を返します
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
   * body > div#whole Element
   * @return {Element} whole element を返します
   */
  static whole():Element {
    return Dom.get( 'whole' );
  }
  /**
   * pageTop container
   * @return {Element} pageTop element を返します
   */
  static pageTop():Element {
    return Dom.get( 'pageTop' );
  }
  // --------------------------------------
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
  /**
   * header search from opener
   * @return {Element} search-container-opener element を返します
   */
  static searchOpener():Element {
    return Dom.get( 'search-container-opener' );
  }
  // --------------------------------------
  // synapse
  /**
   * synapse 切り替えメニュー
   * @return {Element} side-menu-service element を返します
   */
  static service():Element {
    return Dom.get( 'side-menu-service' );
  }
  /**
   * side メニュー
   * @return {Element} side-menu-container element を返します
   */
  static serviceMenu():Element {
    return Dom.get( 'side-menu-container' );
  }
  /**
   * side メニュー open / close button
   * @return {Element} menu-opener element を返します
   */
  static serviceOpener():Element {
    return Dom.get( 'menu-opener' );
  }

  // --------------------------------------
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
  // --------------------------------------

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
   * category container
   * @return {Element} category-container を返します
   */
  static category():Element {
    return Dom.get( 'category-container' );
  }
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

  // --------------------------------------
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
   * single 本文上, メインビジュアル
   * @return {Element} single-visual-container を返します
   */
  static visual():Element {
    return Dom.get( 'single-visual-container' );
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
  /**
   * single 記事 本文
   * @return {Element} post-content-container を返します
   */
  static post():Element {
    return Dom.get( 'post-content-container' );
  }
  /**
   * single 記事 本文 「続きを読む」
   * @return {Element} post-content-read-more を返します
   */
  static readMore():Element {
    return Dom.get( 'post-content-read-more' );
  }
  // --------------------------------------
  /**
   * signup 新規登録
   * @return {Element} signup-container を返します
   */
  static signup():Element {
    return Dom.get( 'signup-container' );
  }
  /**
   * login form
   * @return {Element} login-form-container を返します
   */
  static login():Element {
    return Dom.get( 'login-form-container' );
  }
  /**
   * logout form
   * @return {Element} logout-form-container を返します
   */
  static logout():Element {
    return Dom.get( 'logout-form-container' );
  }
  /**
   * パスワードをリセットする メール入力
   * @return {Element} reset_password-container
   */
  static password():Element {
    return Dom.get( 'reset_password-container' );
  }
  /**
   * パスワードをリセットする パスワード入力
   * @return {Element} reset_password-container
   */
  static passwordResetting():Element {
    return Dom.get( 'reset_password-resetting-container' );
  }
  /**
   * modal
   * @return {Element} modal-container
   */
  static modal():Element {
    return Dom.get( 'modal-container' );
  }
  /**
   * logout modal
   * @return {Element} logout-modal-container
   */
  static logoutModal():Element {
    return Dom.get( 'logout-modal-container' );
  }
  /**
   * deactivate modal
   * @return {Element} deactivate-modal-container
   */
  static deactivateModal():Element {
    return Dom.get( 'deactivate-modal-container' );
  }
  /**
   * deactivate modal
   * @return {Element} deactivate-modal-container
   */
  static flushModal():Element {
    return Dom.get( 'flush-modal-container' );
  }

  // --------------------------------------
  // mypage
  /**
   * mypage ユーザー情報, SP お知らせ
   * @return {Element} mypage-profile-container
   */
  static userProfile():Element {
    return Dom.get( 'mypage-profile-container' );
  }
  /**
   * mypage ユーザー情報, SP mypage
   * SP はお知らせとmypage系で要件が違うため
   * @return {Element} mypage-profile-container-extend
   */
  static userProfileEx():Element {
    return Dom.get( 'mypage-profile-container-extend' );
  }
  // --------------------------------------
  // nav
  /**
   * main nav, category slug を設定するために
   * @return {Element} global-nav-container
   */
  static nav():Element {
    return Dom.get( 'global-nav-container' );
  }
  /**
   * SP nav inner
   * @return {Element} gnav-sec-inner
   */
  static navInner():Element {
    return Dom.get( 'gnav-sec-inner' );
  }
  /**
   * SP nav > ul#gnav-sec-list
   * @return {Element} gnav-sec-list
   */
  static navList():Element {
    return Dom.get( 'gnav-sec-list' );
  }
  // --------------------------------------
  // settings
  /**
   * 設定 form container
   * @return {Element} setting-form-container
   */
  static settings():Element {
    return Dom.get( 'setting-form-container' );
  }
}
// return Dom.get( '' );
