/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 20:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// // app
// import {CommentsType} from '../../app/const/CommentsType';
// import {User} from '../../app/User';

// view
// import View from '../../view/View';
import ViewComments from '../../view/ViewComments';

// // data
// import {Safety} from '../../data/Safety';

// // dae
// import {CommentsListDae} from '../../dae/CommentsListDae';

// // node
// import {CommentMoreViewNode} from '../../node/comment/CommentMoreViewNode';
// import {SPCommentAdNode} from '../node/ad/SPCommentAdNode';

// sp/node
// import {SPCommentNode} from '../node/comment/SPCommentNode';
import SPComponentComments from '../component/single-comment/SPComponentComments';

// React
// eslint-disable-next-line no-unused-vars
const React = self.React;
const ReactDOM = self.ReactDOM;

/**
 * SP, comments スレッド を表示する
 * - {@lnk SPComponentComments}
 *   - {@link SPComponentCommentsParent}
 *     - {@link SPComponentCommentsChildList}
 *     - {@link SPComponentCommentsChildReply}
 */
export default class SPViewComments extends ViewComments {
  /**
   * コメントスレッド表示（記事詳細）
   * @param {number} id 記事ID :article_id
   * @param {Element} element target HTMLElement
   * @param {string} commentsType all|official|self|normal コメントリスト種類
   * @param {Object} [option={}] optional event handler
   */
  constructor(id, element, commentsType, option = {}) {
    super(id, element, commentsType, option);
    /**
     * bind 済み executeSafely
     * @type {function}
     * @since 2016-09-28
     */
    this.boundSafely = this.executeSafely.bind(this);
  }
  /**
   * normal, official, all をレンダリング
   * @param {CommentsListDae} commentsListDae コメント一覧 CommentsListDae instance
   */
  all(commentsListDae) {
    // console.log('SPViewComments.all', this.commentsListType, commentsListDae);
    /**
     * reload flag
     * @override
     * @type {boolean}
     * */
    this.reloadFlag = false;

    // let commentsList = this.commentsList;
    // let commentsBank = this.commentsBank;
    //
    // // コメント挿入 root element
    // let element = this.element;
    // // offset, length を使用する Action
    // let action = this.action;
    // let _this = this;
    //
    // // more button 作成関数
    // // CommentsDom から呼び出す
    // let moreButton = ( show, rest, moreElement ) => {
    //
    //   show = !!show;
    //
    //   // とにかく render する
    //   ReactDOM.render(
    //     <CommentMoreViewNode
    //       show={show}
    //       rest={rest}
    //       action={action}
    //     />,
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
    //                合わせるために object でラップする {comment: replyComment}
    //             */
    //             /* independent, open, commentCount 省略 */
    //             return (
    //               <li key={`${uniqueId}-${replyComment.id}`} className="comment-item">
    //                 <SPCommentNode
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
    //                   url={replyComment.url}
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
    //           <SPCommentNode
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
    //             url={commentObject.comment.url}
    //           />
    //           {/* comment reply */}
    //           <CommentReplyChildDom
    //             uniqueId={`reply-${commentsListType}-${this.props.uniqueId}`}
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
    // // AD
    // // --------------------------------------------
    // // let AdDom = React.createClass( {
    // //   propTypes: {
    // //     commentsListType: React.PropTypes.string.isRequired
    // //   },
    // //   getInitialState: function() {
    // //     return {
    // //       need: this.props.commentsListType === CommentsType.OFFICIAL || this.props.commentsListType === CommentsType.NORMAL
    // //     };
    // //   },
    // //   render: function() {
    // //
    // //     if ( this.state.need ) {
    // //       return (
    // //         <div className={`comment-ad comment-${this.props.commentsListType}-ad`} ref="comment_official_ad"></div>
    // //       );
    // //     } else {
    // //       return null;
    // //     }
    // //
    // //   },
    // //   componentDidMount: function() {
    // //     if ( !this.state.need ) {
    // //       return;
    // //     }
    // //
    // //     let script;
    // //
    // //     // script insert
    // //     switch ( this.props.commentsListType ) {
    // //       case CommentsType.OFFICIAL:
    // //         script = Ad.make( Ad.SP_OFFICIAL );
    // //         break;
    // //
    // //       case CommentsType.NORMAL:
    // //       default:
    // //         script = Ad.make( Ad.SP_NORMAL );
    // //         break;
    // //     }
    // //
    // //     ReactDOM.findDOMNode( this.refs.comment_official_ad ).appendChild( script );
    // //   }
    // // } );
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
    //       userId = Safety.integer( this.props.user.id, 0 );
    //       userId = String(userId);
    //       user = this.props.user;
    //     }
    //
    //     if ( !Safety.array( list ) || list.length === 0 ) {
    //       // 描画しない
    //       // console.warn( 'list error ', commentsListType, list );
    //       return null;
    //     }
    //
    //     return (
    //       <div className={'comment-' + commentsListType}>
    //         <div className="comment-heading">
    //           <h2>{CommentsType.title( commentsListType )}</h2>
    //         </div>
    //         {
    //           list.map( function( commentId, index ) {
    //             let commentObject = commentsBank[ commentId ];
    //             let key = `${index}-${commentsListType}-${articleId}-${commentId}-${userId}`;
    //             // console.log( 'commentId ' + commentId + ', ' + key );
    //
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
    //         <SPCommentAdNode
    //           uniqueId={`ad-${commentsListType}`}
    //           commentsListType={commentsListType}
    //         />
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
    //     articleId={String(this.articleId)}
    //     commentsListType={this.commentsListType}
    //     user={user}
    //   />,
    //   element
    // );
    // since 2017-12-05 - .jsx + component
    const user = this.user ? this.user : Object.create({});
    ReactDOM.render(
      <SPComponentComments
        commentsListDae={commentsListDae}
        commentsList={this.commentsList}
        commentsListType={this.commentsListType}
        articleId={String(this.articleId)}
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
  onComplete(events) {
    // console.log('SPViewComment.onComplete', this.articleId, parseInt(events.articleId, 10) === parseInt(this.articleId, 10), events, this.commentsListType);
    // @since 2016-11-05
    // 記事IDをチェックし同じ時のみリロードします
    // page 内に複数の記事詳細が存在するようになるため
    // 記事IDを識別子として加える
    if (parseInt(events.articleId, 10) === parseInt(this.articleId, 10)) {
      // とにかくreloadが良さそう
      this.reload();
    }
  }
  /**
   * 再読み込み
   */
  reload():void {
    // console.log('SPViewComment.reload', this.articleId, this.commentsListType);
    /**
     * 既存リストを空にする
     * @override
     * @type {Array}
     */
    this.commentsList = [];
    // reload flag on
    this.reloadFlag = true;
    // ajax start
    this.action.reload();
  }
}
