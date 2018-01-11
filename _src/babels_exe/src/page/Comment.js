/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 22:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// ui
import Nav from '../ui/Nav';

import Sidebar from './Sidebar';
// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

/**
 * <p>Comment 詳細</p>
 * 全て static です
 */
export default class Comment {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Comment is static Class. not use new Comment().' );
  //
  //   }
  // }
  /**
   * コメント詳細を表示するために事前にユーザー情報を取得する
   * @param {string} mode 記事へのコメントかコメントの返信
   * @param {number} articleId 記事 id
   * @param {number} commentId コメント id
   * @param {number} [replyId=0] 返信 id
   */
  static user(mode, articleId, commentId, replyId = 0) {
    // header.user
    const profileElement = Dom.profile();
    let headerUser = null;
    let userDae = null;

    const onHeader = ( event:Object ):void => {
      headerUser.off(UT.view.View.BEFORE_RENDER, onHeader);
      userDae = event.args[ 0 ];
      // mode check
      switch ( mode ) {
        case 'reply':
          Comment.reply(userDae, articleId, commentId, replyId);
          break;
        case 'comment':
        default:
          Comment.comment(userDae, articleId, commentId);
          break;
      }
    };

    if (profileElement !== null) {
      headerUser = new UT.view.header.ViewHeaderUser(profileElement);

      if (UT.app.User.sign) {
        headerUser.on(UT.view.View.BEFORE_RENDER, onHeader);
      } else {
        // not sign in
        switch ( mode ) {
          case 'reply':
            Comment.reply(null, articleId, commentId, replyId);
            break;

          case 'comment':
          default:
            Comment.comment(null, articleId, commentId);
            break;

        }
      }

      headerUser.start();

      const modalElement = Dom.logoutModal();
      if (modalElement !== null) {
        const modal = new UT.view.modal.ViewLogoutModal(modalElement);
        modal.start();
      }
    }

    Comment.single( articleId );
  }
  /**
   * コメント 詳細
   * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
   * @param {number} articleId 記事 ID :article_id
   * @param {number} commentId コメント ID
   */
  static comment(userDae, articleId, commentId) {
    const commentNormal = Dom.commentNormal();

    // comment 詳細
    if (commentNormal !== null) {
      const comment = new UT.view.ViewCommentSingle(articleId, commentId, commentNormal);
      comment.user = userDae;
      comment.start();
    }
  }
  /**
   * コメント返信 詳細
   * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
   * @param {number} articleId 記事 ID :article_id
   * @param {number} commentId コメント ID
   * @param {number} replyId コメント返信 ID
   */
  static reply(userDae, articleId, commentId, replyId ) {
    const commentNormal = Dom.commentNormal();

    // comment 詳細
    if (commentNormal !== null) {
      const comment = new UT.view.ViewCommentSingle(articleId, commentId, commentNormal, replyId);
      comment.user = userDae;
      comment.start();
    }
  }
  /**
   * 記事タイトル
   * @param {number} articleId 記事 ID
   */
  static single(articleId) {
    const headerElement = Dom.singleHeader();
    let title;

    const beforeRender = (event) => {
      title.off(UT.view.View.BEFORE_RENDER, beforeRender);
      const single = event.args[0];
      const slug = single.category.slug;
      // sidebar
      Sidebar.start(slug);

      // nav current
      Nav.start(slug);
    };

    if (headerElement !== null) {
      title = new UT.view.single.ViewSingleTitle(articleId, headerElement);
      title.on(UT.view.View.BEFORE_RENDER, beforeRender);
      title.start();
    }
  }
}
