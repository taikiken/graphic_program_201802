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

import {Header} from './Header';
import {Sidebar} from './Sidebar';

let _symbol = Symbol();

// UT
let UT = self.UT;

let _prepared = 0;
let _singleDae = null;
let _userDae = null;
let _viewSingle = null;

export class Single {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Single is static Class. not use new Single().` );

    }
  }
  static start( articleId:Number ):void {

    // header
    // header.user
    var headerUser = new UT.view.header.ViewHeaderUser( document.getElementById('user-profile-container') );
    if ( UT.app.User.sign ) {

      // login user はコメント投稿可能 -> 表示アイコン必要
      headerUser.on( UT.view.View.BEFORE_RENDER, Single.onHeader );

    } else {

      // 非ログインユーザーはアイコン取得いらない
      ++_prepared;

    }

    headerUser.start();

    // single page
    let elements = {
      related: document.getElementById('single-related-container'),
      footer: document.getElementById('single-footer-container')
    };

    let single = new UT.view.ViewSingle( articleId, document.getElementById('single-header-container'), elements );
    _viewSingle = single;
    single.on( UT.view.View.BEFORE_RENDER, Single.before );
    single.start();

  }
  static onHeader( event ):void {
    _userDae = event.args[ 0 ];
    Single.comment();
  }
  static before( event ):void {

    _viewSingle.off( UT.view.View.BEFORE_RENDER, Single.before );

    let single = event.args[ 0 ];
    _singleDae = single;

    let slug = single.category.slug;
    let label = single.category.label;

    // title
    let title = new UT.view.ViewTitle( label, document.getElementById( 'page-title-container' ) );
    title.render();

    // sidebar
    Sidebar.start( slug );

    Single.comment();

  }
  static comment():void {
    ++_prepared;

    if ( _prepared !== 2 ) {
      return;
    }

    // comment form
    var commentForm = new UT.view.comment.ViewCommentForm(document.getElementById('comment-form-container'), _singleDae.id, _userDae.profilePicture );
    commentForm.start();

    // self

    // official
    var official = new UT.view.ViewComments( _singleDae.id, document.getElementById('comment-official-container'), UT.app.const.CommentsType.OFFICIAL );
    if ( _userDae !== null ) {
      official.user = _userDae;
    }
    official.start();

    // normal
    var normal = new UT.view.ViewComments( _singleDae.id, document.getElementById('comment-normal-container'), UT.app.const.CommentsType.NORMAL );
    if ( _userDae !== null ) {
      normal.user = _userDae;
    }
    normal.start();

  }
}
