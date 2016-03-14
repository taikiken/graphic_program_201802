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
'use strict';

import {SPSidebar} from './SPSidebar';
import {Dom} from '../dom/Dom';

// ui
import {SPNav} from '../ui/SPNav';

let _symbol = Symbol();

// UT
let UT = self.UT;

/**
 * <h3>Comment 詳細</h3>
 * 全て static です
 */
export class SPComment {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SPComment is static Class. not use new SPComment().` );

    }
  }
  /**
   * コメント詳細を表示するために事前にユーザー情報を取得する
   * @param {string} mode 記事へのコメントかコメントの返信
   * @param {Number} articleId 記事 id
   * @param {Number} commentId コメント id
   * @param {Number} [replyId=0] 返信 id
   */
  static user( mode:string, articleId:Number, commentId:Number, replyId:Number = 0 ):void {
    // header.user
    let profileElement = Dom.profile();
    let headerUser;
    let userDae;

    let onHeader = ( event:Object ):void => {
      headerUser.off( UT.view.View.BEFORE_RENDER, onHeader );
      userDae = event.args[ 0 ];

      switch ( mode ) {
        case 'reply':
          SPComment.reply( userDae, articleId, commentId, replyId );
          break;

        case 'comment':
        default:
          SPComment.comment( userDae, articleId, commentId );
          break;

      }

    };

    if ( profileElement !== null ) {
      headerUser = new UT.sp.view.header.SPViewHeaderUser( profileElement );

      if ( UT.app.User.sign ) {
        headerUser.on( UT.view.View.BEFORE_RENDER, onHeader );
      } else {
        // not sign in
        switch ( mode ) {
          case 'reply':
            SPComment.reply( null, articleId, commentId, replyId );
            break;

          case 'comment':
          default:
            SPComment.comment( null, articleId, commentId );
            break;

        }
      }

      headerUser.start();

      /*
      let modalElement = Dom.modal();
      if ( modalElement !== null ) {
        let modal = new UT.view.modal.ViewLogoutModal( modalElement );
        modal.start();
      }
      */
    }

    SPComment.single( articleId );

  }
  /**
   * コメント 詳細
   * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
   * @param {Number} articleId 記事 ID :article_id
   * @param {Number} commentId コメント ID
   */
  static comment( userDae, articleId:Number, commentId:Number ):void {
    let commentNormal = Dom.commentNormal();

    // comment 詳細
    if ( commentNormal !== null ) {
      let comment = new UT.view.ViewCommentSingle( articleId, commentId, commentNormal );
      comment.user = userDae;
      comment.start();
    }
  }
  /**
   * コメント返信 詳細
   * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
   * @param {Number} articleId 記事 ID :article_id
   * @param {Number} commentId コメント ID
   * @param {Number} replyId コメント返信 ID
   */
  static reply( userDae, articleId:Number, commentId:Number, replyId:Number ):void {
    let commentNormal = Dom.commentNormal();

    // comment 詳細
    if ( commentNormal !== null ) {
      let comment = new UT.view.ViewCommentSingle( articleId, commentId, commentNormal, replyId );
      comment.user = userDae;
      comment.start();
    }
  }
  /**
   * 記事タイトル
   * @param {Number} articleId 記事 ID
   */
  static single( articleId:Number ):void {
    let headerElement = Dom.singleHeader();
    let title;

    let beforeRender = ( event ):void => {
      title.off( UT.view.View.BEFORE_RENDER, beforeRender );
      let single = event.args[ 0 ];
      let slug = single.category.slug;
      // sidebar
      SPSidebar.start( slug );

      // nav current
      SPNav.start( slug );
    };

    if ( headerElement !== null ) {
      title = new UT.view.single.ViewSingleTitle( articleId, headerElement );
      title.on( UT.view.View.BEFORE_RENDER, beforeRender );
      title.start();
    }
  }
}
