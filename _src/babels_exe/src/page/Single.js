/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// import {Header} from './Header';
import Sidebar from './Sidebar';

// ui
import Nav from '../ui/Nav';
// let _symbol = Symbol();

// UT
/**
 * [library] - UT
 * @type {UT}
 */
const UT = self.UT;
/**
 * [library] - UT.app.Dom
 * @type {Dom}
 */
const Dom = UT.app.Dom;

/**
 * 処理終了 counter
 * @type {number}
 * @private
 */
let innerPrepared = 0;
/**
 * SingleDae
 * @type {?*}
 * @private
 */
let innerSingleDae = null;
/**
 * UserDae
 * @type {?*}
 * @private
 */
let innerUserDae = null;
/**
 * ViewSingle
 * @type {?*}
 * @private
 */
let innerViewSingle = null;
/**
 * HeaderUser
 * @type {?*}
 * @private
 */
let innerHeaderUser = null;

/**
 * Single(detail)記事詳細
 * - 全て static です
 */
export default class Single {
  // /**
  //  * 記事詳細 singleton class です
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Single is static Class. not use new Single().' );
  //
  //   }
  // }
  /**
   * 記事詳細, 上部 / 下部 rendering 開始
   * @param {number} articleId 記事 Id (:article_id)
   */
  static start(articleId) {
    // header
    // header.user
    const profileElement = Dom.profile();
    let headerUser = null;
    if (profileElement !== null) {
      headerUser = new UT.view.header.ViewHeaderUser(profileElement);
      if (UT.app.User.sign) {
        // login user はコメント投稿可能 -> 表示アイコン必要
        innerHeaderUser = headerUser;
        headerUser.on(UT.view.View.BEFORE_RENDER, Single.onHeader);
      } else {
        // 非ログインユーザーはアイコン取得いらない
        ++innerPrepared;
      }
      headerUser.start();

      const modalElement = Dom.logoutModal();
      if (modalElement !== null) {
        const modal = new UT.view.modal.ViewLogoutModal(modalElement);
        modal.start();
      }
    }

    // single page
    // related いらなくる予定
    const elements = {
      // related なしへ
      related: null, // Dom.related(),
      footer: Dom.singleFooter()
    };

    const singleHeaderElement = Dom.singleHeader();

    if (singleHeaderElement !== null && elements.footer !== null) {
      const single = new UT.view.ViewSingle(articleId, singleHeaderElement, elements);
      innerViewSingle = single;
      single.on(UT.view.View.BEFORE_RENDER, Single.before);
      single.start();
    }

  }
  /**
   * header View.BEFORE_RENDER event handler
   * - ユーザー: アイコン, Id 取得のために event を bind し情報を取得します
   * @param {Object} event event object
   */
  static onHeader(event) {
    // console.log('EX:Single.onHeader event', event);
    innerHeaderUser.off(UT.view.View.BEFORE_RENDER, Single.onHeader);
    innerUserDae = event.args[0];
    Single.comment();
  }
  /**
   * single View.BEFORE_RENDER event handler
   * - 記事所属カテゴリ取得のために event を bind
   * @param {Object} event event object
   */
  static before(event) {
    // console.log('EX:Single.before event', event);
    innerViewSingle.off(UT.view.View.BEFORE_RENDER, Single.before);

    const single = event.args[0];
    innerSingleDae = single;

    // let slug = single.category.slug;
    // let slug = single.categories.all[0].slug;
    const slug = single.categories.slug;
    // let label = single.category.label;

    // main visual
    const element = Dom.visual();
    if (element !== null) {
      // console.log( 'start main visual ', element );
      const visual = new UT.view.single.ViewSingleVisual(element, single);
      visual.start();
    }

    // title は backend output

    // sidebar
    // slug: category, is home
    Sidebar.start(slug, false);

    // nav current
    Nav.start(slug);

    Single.comment();
  }
  /**
   * **ログイン**
   * - ユーザー情報, 記事 Id 必須
   *
   * **非ログイン**
   * - 記事 Id 必須
   */
  static comment() {
    ++innerPrepared;
    // console.log('EX:Single.comment _prepared', _prepared);

    if (innerPrepared !== 2) {
      return;
    }

    // user icon
    // _userDae null check
    //  _userDae.profilePicture undefined check
    let picture = '';
    if (innerUserDae !== null && typeof innerUserDae.profilePicture !== 'undefined') {
      picture = innerUserDae.profilePicture;
    }

    // article id
    const articleId = innerSingleDae.id;
    const ViewComments = UT.view.ViewComments;

    // comment form
    const commentFormElement = Dom.commentForm();
    // console.log('EX:Single.comment commentFormElement', commentFormElement);
    if (commentFormElement !== null) {
      const commentForm = new UT.view.comment.ViewCommentForm(commentFormElement, articleId, picture);
      commentForm.start();
    }

    // self
    const selfElement = Dom.commentSelf();
    // console.log('EX:Single.comment selfElement', selfElement);
    if (selfElement !== null) {
      const commentSelf = new ViewComments(articleId, selfElement, UT.app.const.CommentsType.SELF);
      if (innerUserDae !== null) {
        commentSelf.user = innerUserDae;
      }
      commentSelf.start();
    }

    // official
    const officialElement = Dom.commentOfficial();
    // console.log('EX:Single.comment officialElement', officialElement);
    if (officialElement !== null) {
      const official = new ViewComments(articleId, officialElement, UT.app.const.CommentsType.OFFICIAL);
      if (innerUserDae !== null) {
        official.user = innerUserDae;
      }
      official.start();
    }

    // normal
    const normalElement = Dom.commentNormal();
    // console.log('EX:Single.comment normalElement', normalElement);
    if (normalElement !== null) {
      const normal = new ViewComments(articleId, normalElement, UT.app.const.CommentsType.NORMAL);
      if (innerUserDae !== null) {
        normal.user = innerUserDae;
      }
      normal.start();
    }
  }
}
