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


// ui
import SPNav from '../ui/SPNav';

// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

let _prepared = 0;
// let _singleDae = null;
let _userDae = null;
let _viewSingle = null;
let _headerUser = null;
let _articleId = 0;

/**
 * <p>Single(detail)記事詳細</p>
 * 全て static です
 */
export default class SPSingle {
  // /**
  //  * 記事詳細 singleton class です
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPSingle is static Class. not use new SPSingle().' );
  //
  //   }
  // }
  /**
   * 記事詳細, 上部 / 下部 rendering 開始
   * @param {Number} articleId 記事 Id (:article_id)
   */
  static start(articleId) {
    _articleId = articleId;
    // header
    // header.user
    const profileElement = Dom.profile();
    let headerUser = null;
    if (profileElement !== null) {
      headerUser = new UT.sp.view.header.SPViewHeaderUser(profileElement);
      if (UT.app.User.sign) {
        // login user はコメント投稿可能 -> 表示アイコン必要
        _headerUser = headerUser;
        headerUser.on(UT.view.View.BEFORE_RENDER, SPSingle.onHeader);
      } else {
        // 非ログインユーザーはアイコン取得いらない
        ++_prepared;
      }
      if (headerUser) {
        headerUser.start();
      }
    }
    // ----------------------------
    const singleHeaderElement = Dom.singleHeader();
    if (singleHeaderElement !== null) {
      const single = new UT.sp.view.SPViewSingle(articleId, singleHeaderElement, Dom.visual(), Dom.userBanner());
      _viewSingle = single;
      single.on(UT.view.View.BEFORE_RENDER, SPSingle.before);
      single.start();
    } else {
      SPSingle.comment();
    }
    // ----------------------------
    // read more
    const post = Dom.post();
    const readMore = Dom.readMore();
    if (post !== null && readMore !== null) {
      const more = new UT.sp.view.single.SPViewContinueRead( post, readMore );
      more.start();
    }
  }
  /**
   * header View.BEFORE_RENDER event handler
   * <p>ユーザー: アイコン, Id 取得のために event を bind し情報を取得します</p>
   * @param {Object} event event object
   */
  static onHeader(event) {
    _headerUser.off(UT.view.View.BEFORE_RENDER, SPSingle.onHeader);
    _userDae = event.args[0];
    SPSingle.comment();
  }
  /**
   * single View.BEFORE_RENDER event handler
   * <p>記事所属カテゴリ取得のために event を bind</p>
   * @param {Object} event event object
   */
  static before(event) {
    _viewSingle.off(UT.view.View.BEFORE_RENDER, SPSingle.before);
    if (!event || !event.args) {
      return;
    }
    const single = event.args[0];
    if (!single || !single.categories || !single.categories.slug) {
      return;
    }
    const slug = single.categories.slug;
    const label = single.categories.label;

    // nav current
    SPNav.start(slug);
    // comment
    SPSingle.comment();
    // -----------------------
    // 2016-09-28 記事詳細の次の記事のために以下削除
    // @see `/app/template/mobile/p.php#L.289`
    // // 記事詳細・人気記事
    // SPSingle.singleRanking(slug);
    // // 記事詳細・オススメ記事
    // SPSingle.singleRecommend(slug);
    // -----------------------
    // since 2017-09-13
    SPSingle.optionRecommend(slug);
    SPSingle.optionRanking(slug, label);
  }
  // /**
  //  * 記事詳細下部・人気記事
  //  * @param {string} slug category slug
  //  */
  // static singleRanking( slug:string ):void {
  //   let rankingElement = Dom.ranking();
  //
  //   if ( rankingElement !== null ) {
  //     let ranking = new UT.sp.view.single.SPViewSingleRanking( rankingElement, null, slug );
  //     ranking.start();
  //   }
  // }
  //
  // /**
  //  * 記事詳細・オススメ記事
  //  * <pre>
  //  * Mobileでは関連記事上
  //  * </pre>
  //  *
  //  * @see https://github.com/undotsushin/undotsushin/issues/862
  //  * @since 2016-06-16
  //  * @param {string} slug category slug
  //  */
  // static singleRecommend( slug:string ):void {
  //   let recommendElement = Dom.recommend();
  //   if ( recommendElement !== null ) {
  //     let recommend = new UT.sp.view.single.SPViewSingleRecommend( recommendElement, null, slug );
  //     recommend.start();
  //   }
  // }
  /**
   * **ログイン**
   * <p>ユーザー情報, 記事 Id 必須</p>
   *
   * **非ログイン**
   * <p>記事 Id 必須</p>
   */
  static comment() {
    ++_prepared;

    if (_prepared !== 2) {
      return;
    }

    // user icon
    // _userDae null check
    //  _userDae.profilePicture undefined check
    let picture = '';
    if (_userDae !== null && typeof _userDae.profilePicture !== 'undefined') {
      picture = _userDae.profilePicture;
    }

    // article id
    const articleId = _articleId;
    const SPViewComments = UT.sp.view.SPViewComments;

    // comment form
    const commentFormElement = Dom.commentForm();
    if (commentFormElement !== null) {
      const commentForm = new UT.sp.view.comment.SPViewCommentForm(commentFormElement, articleId, picture);
      commentForm.start();
    }

    // self
    const selfElement = Dom.commentSelf();
    if (selfElement !== null) {
      const commentSelf = new SPViewComments(articleId, selfElement, UT.app.const.CommentsType.SELF);
      if ( _userDae !== null ) {
        commentSelf.user = _userDae;
      }
      commentSelf.start();
    }

    // official
    const officialElement = Dom.commentOfficial();
    if (officialElement !== null) {
      const official = new SPViewComments(articleId, officialElement, UT.app.const.CommentsType.OFFICIAL);
      if (_userDae !== null) {
        official.user = _userDae;
      }
      official.start();
    }

    // normal
    const normalElement = Dom.commentNormal();
    if (normalElement !== null) {
      const normal = new SPViewComments(articleId, normalElement, UT.app.const.CommentsType.NORMAL);
      if (_userDae !== null) {
        normal.user = _userDae;
      }
      normal.start();
    }
  }
  /**
   * single のおすすめ記事
   * @param {string} slug category.slug
   * @since 2017-09-13
   */
  static optionRecommend(slug) {
    // console.log('SPSingle.optionRecommend', slug);
    const recommendElement = Dom.recommend();
    if (recommendElement) {
      const recommend = new UT.sp.view.singles.SPViewSinglesRecommend(recommendElement, slug);
      recommend.start();
    }
  }
  /**
   * single のよく読まれている記事 carousel
   * @param {string} slug category.slug
   * @param {string} label category.label
   * @since 2017-09-13
   */
  static optionRanking(slug, label) {
    // console.log('SPSingle.optionRecommend', slug, label);
    const rankingElement = Dom.ranking();
    if (rankingElement) {
      const ranking = new UT.sp.view.singles.SPViewSinglesRanking(rankingElement, slug, label);
      ranking.start();
    }
  }
}
