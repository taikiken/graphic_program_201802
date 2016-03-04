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
'use strict';

// import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {Dom} from '../dom/Dom';

// ui
import {Nav} from '../ui/Nav';

let _symbol = Symbol();

// UT
let UT = self.UT;

let _prepared = 0;
let _singleDae = null;
let _userDae = null;
let _viewSingle = null;
let _headerUser = null;

/**
 * <h3>Single(detail)記事詳細</h3>
 * 全て static です
 */
export class Single {
  /**
   * 記事詳細 singleton class です
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Single is static Class. not use new Single().` );

    }
  }
  /**
   * 記事詳細, 上部 / 下部 rendering 開始
   * @param {Number} articleId 記事 Id (:article_id)
   */
  static start( articleId:Number ):void {

    // header
    // header.user
    let profileElement = Dom.profile();
    let headerUser;
    if ( profileElement !== null ) {
      headerUser = new UT.view.header.ViewHeaderUser( profileElement );
      if ( UT.app.User.sign ) {

        // login user はコメント投稿可能 -> 表示アイコン必要
        _headerUser = headerUser;
        headerUser.on( UT.view.View.BEFORE_RENDER, Single.onHeader );

      } else {

        // 非ログインユーザーはアイコン取得いらない
        ++_prepared;

      }
      headerUser.start();
    }

    // single page
    // related いらなくる予定
    let elements = {
      related: Dom.related(),
      footer: Dom.singleFooter()
    };

    let singleHeaderElement = Dom.singleHeader();

    if ( singleHeaderElement !== null && elements.footer !== null ) {
      let single = new UT.view.ViewSingle( articleId, singleHeaderElement, elements );
      _viewSingle = single;
      single.on( UT.view.View.BEFORE_RENDER, Single.before );
      single.start();
    }


  }
  /**
   * header View.BEFORE_RENDER event handler
   * <p>ユーザー: アイコン, Id 取得のために event を bind し情報を取得します</p>
   * @param {Object} event event object
   */
  static onHeader( event ):void {
    _headerUser.on( UT.view.View.BEFORE_RENDER, Single.onHeader );
    _userDae = event.args[ 0 ];
    Single.comment();
  }
  /**
   * single View.BEFORE_RENDER event handler
   * <p>記事所属カテゴリ取得のために event を bind</p>
   * @param {Object} event event object
   */
  static before( event ):void {

    _viewSingle.off( UT.view.View.BEFORE_RENDER, Single.before );

    let single = event.args[ 0 ];
    _singleDae = single;

    let slug = single.category.slug;
    // let label = single.category.label;

    // title は backend output

    // sidebar
    Sidebar.start( slug );

    // nav current
    Nav.start( slug );

    Single.comment();

  }
  /**
   * **ログイン**
   * <p>ユーザー情報, 記事 Id 必須</p>
   *
   * **非ログイン**
   * <p>記事 Id 必須</p>
   */
  static comment():void {
    ++_prepared;

    if ( _prepared !== 2 ) {
      return;
    }

    // user icon
    // _userDae null check
    //  _userDae.profilePicture undefined check
    let picture = '';
    if ( _userDae !== null && typeof _userDae.profilePicture !== 'undefined' ) {
      picture = _userDae.profilePicture;
    }

    // article id
    let articleId = _singleDae.id;
    let ViewComments = UT.view.ViewComments;

    // comment form
    let commentFormElement = Dom.commentForm();
    if ( commentFormElement !== null ) {
      let commentForm = new UT.view.comment.ViewCommentForm( commentFormElement, articleId, picture );
      commentForm.start();
    }

    // self
    let selfElement = Dom.commentSelf();
    if ( selfElement !== null ) {
      let commentSelf = new ViewComments( articleId, selfElement, UT.app.const.CommentsType.SELF );
      if ( _userDae !== null ) {
        commentSelf.user = _userDae;
      }
      commentSelf.start();
    }

    // official
    let officialElement = Dom.commentOfficial();
    if ( officialElement !== null ) {
      let official = new ViewComments( articleId, officialElement, UT.app.const.CommentsType.OFFICIAL );
      if ( _userDae !== null ) {
        official.user = _userDae;
      }
      official.start();
    }

    // normal
    let normalElement = Dom.commentNormal();
    if ( normalElement !== null ) {
      let normal = new ViewComments( articleId, normalElement, UT.app.const.CommentsType.NORMAL );
      if ( _userDae !== null ) {
        normal.user = _userDae;
      }
      normal.start();
    }

  }
}
