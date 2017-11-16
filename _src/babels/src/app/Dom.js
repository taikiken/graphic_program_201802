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

// const _symbol = Symbol('Dom');

/**
 * <p>React Dom を insert する element</p>
 * <p>document.getElementById で element を取得します</p>
 * <p>全て static です<p>
 */
export class Dom {
  // /**
  //  * <p>PC / SP 共通です<br>
  //  * static class です, instance を作成しません</p>
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Dom is static Class. not use new Dom().' );
  //
  //   }
  // }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 引数 id を使用し document.getElementById を行い element を取得します, 取得できない時は null を返します
   * @param {string} id 取得 element id
   * @return {Element} id から取得した element を返します
   */
  static get( id:string ):Element {

    let element = document.getElementById(id);
    if ( !Safety.isElement( element ) ) {
      // console.warn( `element by ${id} not found.` );
      return null;
    }

    return element;
  }
  /**
   * <p>**PC**<br>
   * body > .whole を取得します</p>
   *
   * body > div#whole Element
   * @return {Element} whole element を返します
   */
  static whole():Element {
    return Dom.get( 'whole' );
  }
  /**
   * <p>**SP**<br>
   * body > .whole を取得します</p>
   *
   * SP -> #page<br>
   * PC -> #whole<br>
   *
   * body > div#page Element
   * @return {Element} whole element を返します
   */
  static page():Element {
    return Dom.get( 'page' );
  }
  /**
   * div#js-page_top - for sp
   * @returns {Element} div#js-page_top - for sp
   * @since 2017-10-23
   */
  static jsPageTop() {
    return Dom.get('js-page_top');
  }
  /**
   * pageTop container
   * - 2017-08-24 - `#js-page_top` を使用しているページに対応するため取得 ID を増やす
   * - `pageTop`
   * @return {Element} pageTop element を返します
   */
  static pageTop():Element {
    // return Dom.get('pageTop') || Dom.get('js-page_top');
    return Dom.get('pageTop') || Dom.jsPageTop();
  }
  // --------------------------------------
  // header
  /**
   * main header コンテンツ上部
   * @return {Element} header-container element を返します
   */
  static header():Element {
    return Dom.get( 'header-container' );
  }
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
  // footer
  /**
   * hooter
   * @return {Element} footer-container element を返します
   */
  static footer():Element {
    return Dom.get( 'footer-container' );
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
  /**
   * sidebar ranking2
   * @return {Element} widget-ranking-container-2 element を返します
   */
  static ranking2():Element {
    return Dom.get( 'widget-ranking-container-2' );
  }
  /**
   * sidebar video2
   * @return {Element} widget-recommend-container-2 element を返します
   */
  static video2():Element {
    return Dom.get( 'widget-recommend-container-2' );
  }
  /**
   * sidebar scroll 追随させるコンテナ
   * @return {Element} sidebar-moving-container element を返します
   */
  static sidebar():Element {
    return Dom.get( 'sidebar-moving-container' );
  }
  /**
   * sidebar recommend
   * @since 2016-06-29
   * @return {Element} widget-recommend-list-container element を返します
   */
  static recommend():Element {
    return Dom.get( 'widget-recommend-list-container' );
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
  /**
   * category headline 「注目の記事」
   * @return {Element} div#js-headline を返します
   */
  static headlineParent():Element {
    return Dom.get('js-headline');
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
  /**
   * 記事詳細のユーザーバナー
   * @return {Element} post-content-banner を返します
   */
  static userBanner():Element {
    return Dom.get( 'post-content-banner' );
  }
  // --------------------------------------
  // single/next
  /**
   * 記事詳細 > next container
   * @return {Element} js-singles-container を返します
   */
  static singlesNext():Element {
    return Dom.get('js-singles-container');
  }
  /**
   * 記事詳細 > next + more container
   * @return {Element} js-singles-more を返します
   */
  static singlesMore():Element {
    return Dom.get('js-singles-more');
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
  // --------------------------------------
  // sidebar ad for PC
  /**
   * sidebar ad, ranking
   * @return {Element} sponsor-link-ranking
   */
  static adRanking():Element {
    return Dom.get( 'sponsor-link-ranking' );
  }
  /**
   * sidebar ad, video
   * @return {Element} sponsor-link-recommend
   */
  static adVideo():Element {
    return Dom.get( 'sponsor-link-recommend' );
  }
  /**
   * sidebar ad, ranking 2
   * @return {Element} sponsor-link-ranking-2
   */
  static adRanking2():Element {
    return Dom.get( 'sponsor-link-ranking-2' );
  }
  /**
   * sidebar ad, video 2
   * @return {Element} sponsor-link-recommend-2
   */
  static adVideo2():Element {
    return Dom.get( 'sponsor-link-recommend-2' );
  }
  // // --------------------------------------
  // // 広告
  // // 記事詳細
  // static adSingleTop():Element {
  //   return Dom.get( 'single-top-sponsor-container' );
  // }
  // static adSidebarTop():Element {
  //   return Dom.get( 'sidebar-sponsor-top-container' );
  // }
  // static adSidebarBottom():Element {
  //   return Dom.get( 'sidebar-sponsor-bottom-container' );
  // }
  // --------------------------------------
  // SP category
  // tab 表示・非表示で class（category）を与えるために...
  /**
   * div.body-sec<br>
   * SP: tab 表示・非表示で class（category）を与えるために...
   * @return {Element} div.body-sec
   */
  static bodySection():Element {
    return Dom.get( 'body-section' );
  }
  // --------------------------------------
  // 記事詳細 / 「続きを読む」のリンク先に外部サイトも指定できるようにする #738
  /**
   * <p>記事詳細 / 「続きを読む」のリンク先に外部サイトも指定できるようにする #738</p>
   * で ga するために a#readMore-external へのクリックで送信します
   * @return {Element} a#readMore-external
   */
  static moreExternal():Element {
    return Dom.get( 'readMore-external' );
  }

  // --------------------------------------
  // exe JS ID
  /**
   * exe 系 script tag の ID
   * @return {Element} script tag #js-exe を返します
   */
  static jsExe():Element {
    return Dom.get('js-exe');
  }
  /**
   * script tag #js-exe の data-label 値を取得します
   * @return {string} script tag #js-exe の data-label 値を返します
   */
  static categoryLabel():string {
    const script = Dom.jsExe();
    if (script === null) {
      return '';
    }

    return script.dataset.label;
  }

  // --------------------------------------
  // アプリバナー
  /**
   * アプリバナー格納 Element を取得します
   * @return {Element} div#js-header-appbnr-container
   */
  static appBanner():Element {
    return Dom.get('js-header-appbnr-container');
  }
}
