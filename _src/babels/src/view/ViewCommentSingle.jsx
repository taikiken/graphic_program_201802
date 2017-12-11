/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 21:56
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// app
import {User} from '../app/User';
import {CommentsType} from '../app/const/CommentsType';
import {Message} from '../app/const/Message';

// view
import View from './View';
// import {ViewError} from './error/ViewError';

// action
import {CommentSingle} from '../action/comment/CommentSingle';
import {CommentSingleReply} from '../action/comment/CommentSingleReply';

// data
// import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

// dae
import {CommentsListDae} from '../dae/CommentsListDae';
// import {UserDae} from '../dae/UserDae';

// node
// import {CommentNode} from '../node/comment/CommentNode';

// event
import {ReplyStatus} from '../event/ReplyStatus';
import {CommentStatus} from '../event/CommentStatus';

// component
// import ComponentCommentsChildList from '../component/single-comment/container/ComponentCommentsChildList';
import ComponentComments from '../component/single-comment/ComponentComments';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * コメント詳細
 */
export default class ViewCommentSingle extends View {
  /**
   * コメント詳細
   * @param {number} articleId 記事 ID :article_id
   * @param {number} commentId コメント ID
   * @param {Element} element target HTMLElement
   * @param {number} [replyId=0] コメント返信 ID
   * @param {Object} [option={}] optional event handler
   */
  constructor(articleId, commentId, element, replyId = 0, option = {}) {
    option = Safety.object(option);
    super(element, option);

    replyId = Safety.integer(replyId, 0);
    /**
     * Action instance を設定します
     * @override
     * @type {CommentSingle|CommentSingleReply}
     */
    this.action = replyId !== 0 ?
      new CommentSingle(articleId, commentId, this.done.bind(this), this.fail.bind(this)) :
      new CommentSingleReply( articleId, commentId, replyId, this.done.bind(this), this.fail.bind(this));
    /**
     * 記事ID
     * @type {number}
     * @protected
     */
    this._articleId = articleId;
    /**
     * コメントID
     * @type {number}
     * @protected
     */
    this._commentId = commentId;
    /**
     * コメントタイプ, all|official|self|normal
     * @type {string}
     * @protected
     */
    this._commentsListType = CommentsType.SINGLE;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._commentsList = [];
    /**
     * コメントIDをキーにコメント Object を保存します
     * @type {{}}
     * @protected
     */
    this._commentsBank = {};
    /**
     * more button instance 用
     * @type {null|Object}
     * @protected
     */
    this._moreRendered = null;
    /**
     * user 情報
     * @type {null}
     * @protected
     */
    this._user = null;

    // コメント投稿後の再読み込み設定
    const status = ReplyStatus.factory();
    const boundComplete = this.onComplete.bind(this);
    status.on(ReplyStatus.COMPLETE, boundComplete);

    // コメント削除後の再読み込み設定
    const comment = CommentStatus.factory();
    comment.on(CommentStatus.COMMENT_DELETE, boundComplete);

    /**
     * リロードフラッグ
     * @type {boolean}
     * @protected
     */
    this._reloadFlag = false;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * ログイン user 情報
   * @return {UserDae} ログイン user 情報を返します
   */
  get user() {
    return this._user;
  }
  /**
   * ログイン user 情報を設定します<br>
   * start の前に設定します
   * @param {UserDae} user ログイン user 情報
   */
  set user(user) {
    this._user = user;
  }
  /**
   * 記事IDを取得します
   * @return {number} 記事IDを返します
   */
  get articleId() {
    return this._articleId;
  }
  /**
   * 記事IDを設定します
   * @param {number} id 記事ID
   */
  set articleId(id) {
    this._articleId = id;
  }
  /**
   * コメントタイプ, all|official|self|normal を取得します
   * @return {string} コメントタイプ, all|official|self|normal を返します
   */
  get commentListType() {
    return this._commentsListType;
  }
  /**
   * コメントタイプ, all|official|self|normal を設定します
   * @param {string} type コメントタイプ, all|official|self|normal
   */
  set commentListType(type) {
    this._commentsListType = type;
  }
  /**
   * コメントIDをキーにコメント Object を取得します
   * @return {Object} コメントIDをキーにコメント Object を返します
   */
  get commentsBank() {
    return this._commentsBank;
  }
  /**
   * コメントIDをキーにコメント Object を設定します
   * @param {Object} bank コメントIDをキーにコメント Object
   */
  set commentsBank(bank) {
    this._commentsBank = bank;
  }
  /**
   * more button instance
   * @return {null|Object} more button instance を返します
   */
  get moreRendered() {
    return this._moreRendered;
  }
  /**
   * more button instance を設定します
   * @param {null|Object} more button instance
   */
  set moreRendered(more) {
    this._moreRendered = more;
  }
  /**
   * リロードフラッグ を取得します
   * @return {boolean} リロードフラッグを返します
   */
  get reloadFlag() {
    return this._reloadFlag;
  }
  /**
   * リロードフラッグを設定します
   * @param {boolean} flag リロードフラッグ
   */
  set reloadFlag(flag) {
    this._reloadFlag = flag;
  }
  /**
   * コメントIDを取得します
   * @return {number} 記事IDを返します
   */
  get commentId() {
    return this._commentId;
  }
  /**
   * コメントIDを設定します
   * @param {number} id コメントID
   */
  set commentId(id) {
    this._commentId = id;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [path=''] path - not use
   */
  start(path = '') {
    if (User.sign && this.user === null) {
      throw new Error(`user info have to set before start.${this._articleId}`, path);
    }
    this.action.next();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    // console.log( 'response ', typeof response === 'undefined', response );
    if (typeof response === 'undefined' ) {
      // articles undefined
      // JSON に問題がある
      const error = new Error( Message.undef('[COMMENT:UNDEFINED]') );
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      this.render(response);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
  }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render(response) {
    const commentsListDae = new CommentsListDae( response );
    // total check
    if (commentsListDae.total === 0) {
      if (!this.reloadFlag) {
        // デーが無いので処理を止める
        // reload でない時
        // console.warn( `(${this._articleId}, ${this._commentsListType}) stop rendering.` );
        this.executeSafely(View.EMPTY_ERROR);
        return;
      }
    }
    // previous data と新規データを合成
    this._commentsList = this._commentsList.concat(commentsListDae.comments.list);

    // _commentsBank へ comment.id をキーにデータをセット
    const bank = this._commentsBank;
    // commentsListDae.comments.list.forEach( function( commentId ) {
    //
    //   bank[ commentId ] = commentsListDae.comments.bank[ commentId ];
    //
    // } );
    commentsListDae.comments.list.map(commentId => (bank[commentId] = commentsListDae.comments.bank[commentId]));
    // 処理開始 関数振り分け いらないんじゃないか疑惑
    this.all(commentsListDae);
  }
  /**
   * normal, official, all をレンダリング
   * @param {CommentsListDae} commentsListDae コメント一覧 CommentsListDae instance
   */
  all(commentsListDae) {
    this.reloadFlag = false;
    // let commentsList = this._commentsList;
    // let commentsBank = this._commentsBank;
    //
    // // コメント挿入 root element
    // let element = this.element;
    // // offset, length を使用する Action
    // let action = this.action;
    // let _this = this;
    //
    // // --------------------------------------------
    // // More button
    // // --------------------------------------------
    // let MoreView = React.createClass( {
    //   propTypes: {
    //     show: React.PropTypes.bool.isRequired,
    //     rest: React.PropTypes.number
    //   },
    //   getDefaultProps: function() {
    //     return {
    //       show: false,
    //       rest: 0
    //     };
    //   },
    //   getInitialState: function() {
    //     return {
    //       loading: '',
    //       show: this.props.show,
    //       rest: this.props.rest
    //     };
    //   },
    //   render: function() {
    //
    //     // hasNext: true, button を表示する？
    //     if ( this.state.show && this.state.rest > 0 ) {
    //
    //       return (
    //         <div id="more" className={'comment-andmore loading-root ' + this.state.loading}>
    //           <a href={'#more'} onClick={this.handleClick} >他{this.state.rest}件を表示</a>
    //           <span className="loading-spinner" />
    //         </div>
    //       );
    //
    //     } else {
    //
    //       // button 表示なし
    //       return (
    //         <div className="no-more">&nbsp;</div>
    //       );
    //
    //     }
    //
    //   },
    //   // -----------------------------------------
    //   // button 関連 custom method
    //   handleClick: function( event ) {
    //     event.preventDefault();
    //     // loading 表示
    //     this.setState( { loading: 'loading' } );
    //     action.next();
    //   },
    //   // button 表示・非表示
    //   updateShow: function( show:boolean, rest:number ) {
    //
    //     this.setState( { show: show, rest: rest } );
    //
    //   }
    // } );
    //
    // // more button 作成関数
    // // CommentsDom から呼び出す
    // let moreButton = ( show, rest, moreElement ) => {
    //
    //   // console.log( '========================= more button ', _this._commentsListType, action.hasNext(), action );
    //   show = !!show;
    //
    //   // とにかく render する
    //   ReactDOM.render(
    //     React.createElement( MoreView, { show: show, rest: rest } ),
    //     moreElement
    //   );
    //
    // };
    //
    // // --------------------------------------------
    // // COMMENT reply loop
    // // 親コメントへ返信
    // // --------------------------------------------
    // let CommentReplyChildDom = React.createClass( {
    //   propType: {
    //     total: React.PropTypes.number.isRequired,
    //     sign: React.PropTypes.bool.isRequired,
    //     uniqueId: React.PropTypes.string.isRequired,
    //     userId: React.PropTypes.string.isRequired,
    //     icon: React.PropTypes.string.isRequired,
    //     articleId: React.PropTypes.string.isRequired,
    //     commentId: React.PropTypes.string.isRequired,
    //     commentsListType: React.PropTypes.object.isRequired,
    //     reply: React.PropTypes.object.isRequired
    //   },
    //   getInitialState: function() {
    //     return {
    //       reply: this.props.reply
    //     };
    //   },
    //   render: function() {
    //
    //     if ( this.props.total === 0 ) {
    //       // 描画しない
    //       return null;
    //     }
    //
    //     let reply = this.state.reply;
    //     let replyList = reply.comments;
    //     let commentsListType = this.props.commentsListType;
    //     let userId = this.props.userId;
    //     let sign = this.props.sign;
    //     let articleId = this.props.articleId;
    //     let uniqueId = this.props.uniqueId;
    //     let icon = this.props.icon;
    //     let commentId = this.props.commentId;
    //
    //     return (
    //       <ul className="comment-list">
    //         {
    //           replyList.comments.map( function( replyComment ) {
    //
    //             /* 親コメントと子コメントのデータ形式が違う
    //              合わせるために object でラップする {comment: replyComment}
    //              */
    //             /* independent, open, commentCount 省略 */
    //             return (
    //               <li key={`${uniqueId}-${replyComment.id}`} className="comment-item">
    //                 {/*
    //                 <CommentNode
    //                   uniqueId={`${uniqueId}-${replyComment.id}`}
    //                   commentDae={{comment: replyComment}}
    //                   userId={userId}
    //                   icon={icon}
    //                   articleId={articleId}
    //                   commentId={commentId}
    //                   replyId={String(replyComment.id)}
    //                   commentUserId={String(replyComment.user.id)}
    //                   sign={sign}
    //                   parent={false}
    //                   commentsListType={commentsListType}
    //                 />
    //                 */}
    //                 <ComponentCommentsChildList
    //                   commentObject={{comment: replyComment}}
    //                   sign={sign}
    //                   uniqueId={`${uniqueId}-${replyComment.id}`}
    //                   articleId={articleId}
    //                   commentUserId={String(replyComment.user.id)}
    //                   commentsListType={commentsListType}
    //                   userId={userId}
    //                   icon={icon}
    //                   commentId={commentId}
    //                   replyId={String(replyComment.id)}
    //                   parent={false}
    //                 />
    //               </li>
    //             );
    //           } )
    //         }
    //       </ul>
    //     );
    //
    //   }
    // } );
    //
    // // --------------------------------------------
    // // COMMENT Parent
    // // --------------------------------------------
    // let CommentsParentDom = React.createClass( {
    //   propType: {
    //     commentObject: React.PropTypes.object.isRequired,
    //     uniqueId: React.PropTypes.string.isRequired,
    //     articleId: React.PropTypes.string.isRequired,
    //     commentsListType: React.PropTypes.string.isRequired,
    //     total: React.PropTypes.number.isRequired,
    //     index: React.PropTypes.number.isRequired,
    //     user: React.PropTypes.object
    //   },
    //   getDefaultProps: function() {
    //     return {
    //       user: {}
    //     };
    //   },
    //   render: function() {
    //
    //     let commentObject = this.props.commentObject;
    //     // console.log( 'CommentsParent commentObject ', commentObject );
    //
    //     let total = Safety.integer( commentObject.reply.total, 0 );
    //     let sign = User.sign;
    //     let icon;
    //     let userId = '';
    //     let commentId = String(commentObject.comment.id);
    //     let articleId = this.props.articleId;
    //     let commentsListType = this.props.commentsListType;
    //
    //     if ( sign ) {
    //       let user = this.props.user;
    //       icon = user.profilePicture;
    //
    //       // id
    //       userId = String( user.id );
    //       if (!userId) {
    //         userId = '';
    //       }
    //     }
    //
    //     // console.log( '================================== parent =========================', icon, this.props.user, userId, ', comment:', commentObject.comment.user.id );
    //     return (
    //
    //       <ul className={'comment-list'}>
    //         <li className="comment-item">
    //           {/* independent, open 省略 */}
    //           {/*
    //           <CommentNode
    //             uniqueId={`comment-${this.props.uniqueId}`}
    //             commentDae={commentObject}
    //             icon={icon}
    //             userId={userId}
    //             articleId={articleId}
    //             commentId={commentId}
    //             commentUserId={String(commentObject.comment.user.id)}
    //             commentCount={commentObject.reply.total}
    //             sign={sign}
    //             parent={true}
    //             commentsListType={commentsListType}
    //           />
    //           */}
    //           <ComponentCommentsChildList
    //             commentObject={commentObject}
    //             sign={sign}
    //             uniqueId={`comment-${this.props.uniqueId}`}
    //             articleId={articleId}
    //             commentUserId={String(commentObject.comment.user.id)}
    //             commentsListType={commentsListType}
    //             userId={userId}
    //             icon={icon}
    //             commentId={commentId}
    //             commentCount={commentObject.reply.total}
    //             parent={true}
    //           />
    //           {/* comment reply */}
    //           <CommentReplyChildDom
    //             uniqueId={`reply-${this.props.uniqueId}`}
    //             total={total}
    //             sign={sign}
    //             userId={userId}
    //             icon={icon}
    //             articleId={articleId}
    //             commentId={commentId}
    //             commentsListType={commentsListType}
    //             reply={commentObject.reply}
    //           />
    //         </li>
    //       </ul>
    //
    //     );
    //
    //   }
    // } );
    //
    // // --------------------------------------------
    // // COMMENT iteration
    // // --------------------------------------------
    // let CommentsDom = React.createClass( {
    //   propType: {
    //     commentsList: React.PropTypes.array.isRequired,
    //     commentsListType: React.PropTypes.string.isRequired,
    //     articleId: React.PropTypes.string.isRequired,
    //     user: React.PropTypes.object
    //   },
    //   getDefaultProps: function() {
    //     return {
    //       user: null
    //     };
    //   },
    //   getInitialState: function() {
    //     return {
    //       commentsList: this.props.commentsList
    //     };
    //   },
    //   render: function() {
    //
    //     let list = this.state.commentsList;
    //     let articleId = this.props.articleId;
    //     let commentsListType = this.props.commentsListType;
    //     let userId = '0';
    //     let user = Object.create({});
    //     if ( this.props.user !== null ) {
    //       userId = String(this.props.user.id);
    //       user = this.props.user;
    //     }
    //
    //     if ( !Safety.array( list ) || list.length === 0 ) {
    //       // 描画しない
    //       // console.warn( 'list error ', commentsListType, list );
    //       return null;
    //     }
    //
    //     // console.log( '******************************* start render *******************************', list );
    //     return (
    //       <div className={'comment-' + commentsListType}>
    //         <div className="comment-heading">
    //           <h2>選択されたコメント</h2>
    //         </div>
    //         {
    //           list.map( function( commentId, index ) {
    //             let commentObject = commentsBank[ commentId ];
    //             let key = `${index}-${commentsListType}-${articleId}-${commentId}-${userId}`;
    //             return (
    //               <CommentsParentDom
    //                 key={key}
    //                 uniqueId={key}
    //                 index={index}
    //                 articleId={articleId}
    //                 commentObject={commentObject}
    //                 commentsListType={commentsListType}
    //                 total={commentsListDae.total}
    //                 user={user}
    //               />
    //             );
    //           } )
    //         }
    //         <div className="comment-more" ref="commentMore" />
    //       </div>
    //     );
    //
    //   },
    //   // --------------------------------------------
    //   // delegate
    //   componentDidMount: function() {
    //     // after mount
    //     _this.executeSafely( View.DID_MOUNT );
    //     // hasNext を元に More View button の表示非表示を決める
    //     // console.log( 'more has ', action.hasNext() );
    //     moreButton( action.hasNext(), action.rest(), ReactDOM.findDOMNode(this.refs.commentMore) );
    //   },
    //   componentDidUpdate: function() {
    //     moreButton( action.hasNext(), action.rest(), ReactDOM.findDOMNode(this.refs.commentMore) );
    //   },
    //   // --------------------------------------------
    //   updateList: function( list ) {
    //     // state を変更し appendChild を行う
    //     this.setState( { commentsList: list } );
    //   }
    // } );
    //
    // // --------------------------------------------
    // // COMMENT Dom build
    // // --------------------------------------------
    // let user = this.user;
    // if ( user === null ) {
    //   user = Object.create( {} );
    // }
    //
    // // とにかくそのまま
    // ReactDOM.render(
    //   <CommentsDom
    //     commentsList={commentsList}
    //     articleId={String(this._articleId)}
    //     commentsListType={this._commentsListType}
    //     user={user}
    //   />,
    //   element
    // );
    const user = this.user ? this.user : Object.create({});
    ReactDOM.render(
      <ComponentComments
        commentsListDae={commentsListDae}
        commentsList={this._commentsList}
        commentsListType={this._commentsListType}
        articleId={String(this._articleId)}
        execute={this.boundSafely}
        action={this.action}
        commentsBank={this.commentsBank}
        user={user}
      />,
      this.element,
    );
  }// all
  /**
   * ReplyStatus.COMPLETE event handler
   * <p>再読み込みを行うかを決める</p>
   * @param {Object} events 記事 ID を含んだ event object
   */
  onComplete(events):void {
    if (parseInt(events.articleId, 10) === this.articleId) {
      // @since 2016-11-05
      // 記事IDをチェックし同じ時のみリロードします
      // page 内に複数の記事詳細が存在するようになるため
      // 記事IDを識別子として加える
      //
      // とにかくreloadが良さそう
      this.reload();
    }
  }
  /**
   * 再読み込み
   */
  reload():void {
    // 既存リストを空にする
    this._commentsList = [];
    // reload flag on
    this.reloadFlag = true;
    // ajax start
    this.action.reload();
  }
}
