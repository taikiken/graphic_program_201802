/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

import {Empty} from '../../app/const/Empty';
import {Safety} from '../../data/Safety';

// node
import {ReactionNode} from './ReactionNode';
import {CommentFormNode} from './CommentFormNode';
import {CommentMenuNode} from './CommentMenuNode';
import {CommentUserNode} from './CommentUserNode';
import {CommentContentNode} from './CommentContentNode';
// import {CommentActionNode} from './CommentActionNode';

// node


// React
let React = self.React;

/*
// 通報 drop menu
let CommentMenuNode = React.createClass( {
  propTypes: {
    // unique id（識別のために必要）
    uniqueId: React.PropTypes.string.isRequired,
    // user id
    userId: React.PropTypes.string.isRequired,
    commentUserId: React.PropTypes.string.isRequired,
    articleId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string.isRequired,
    // 返信 id
    replyId: React.PropTypes.string.isRequired,
    // 親コメント? default false
    parent: React.PropTypes.bool.isRequired,

    sign: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.timer = 0;

    return {
      open: 'close',
      loading: '',
      show: true
    };
  },
  render: function() {
    if ( this.props.sign ) {
      // ログインユーザーのみ
      let others = this.props.userId === '' || this.props.userId === '0' || this.props.userId !== this.props.commentUserId;
      // console.log( 'others ', others, this.props.userId, this.props.commentUserId );
      // 通報実装なしになったので
      // 「削除」以外の表示がいらなくなった
      // && !others を追加
      if ( this.state.show && !others ) {
        return (
          <div className={`comment-menu ${this.state.open} ${this.state.loading}`}>
            <a href="#" className="comment-menu-btn" onClick={this.clickHandler}>MENU</a>
            <ul className="dropMenu">
              <CommentActionNode
                uniqueId={this.props.uniqueId}
                toggle={this.state.open}
                others={others}
                userId={this.props.userId}
                commentUserId={this.props.commentUserId}
                commentId={this.props.commentId}
                replyId={this.props.replyId}
                articleId={this.props.articleId}
                parent={this.props.parent}
                remove={this.didDelete}
                report={this.didReport}
              />
            </ul>
          </div>
        );
      } else {
        // 非表示
        return null;
      }

    } else {
      // 非ログイン 出力しない
      return null;
    }

  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {
    // event handler unbind
    // timer clear
    this.destroy();
  },
  // -------------------------------------------------------
  // 以降 custom method
  didDelete: function( type:string ) {
    console.log( 'didDelete', type );

    switch ( type ) {
      case 'click':
        this.destroy();
        break;

      case 'done':
        this.setState( {show: false} );
        break;

      case 'fail':
        this.activateBodyClick();
        break;

      default:
        this.activateBodyClick();
        break;
    }

  },
  didReport: function( type:string ) {
    console.log( 'didReport', type );

    switch ( type ) {
      case 'click':
        this.destroy();
        break;

      case 'done':
        // this.setState( {show: false} );
        this.toggleState();
        break;

      case 'fail':
        this.activateBodyClick();
        break;

      default:
        this.activateBodyClick();
        break;
    }
  },
  // -----------------------------
  // open / close control
  // icon click で drop menu open / close
  clickHandler: function( event ) {
    event.preventDefault();
    this.toggleState();
  },
  // document.body.onClick event handler
  // drop menu open 後に 領域外 click で閉じるため
  bodyClick: function() {
    if ( this.state.open === 'open' ) {

      // document.body が a より先に反応する
      // native event bind と React 経由の違いかも
      // body click 後の処理を遅延させる, 多分気づかない程度
      this.timer = setTimeout( this.toggleState, 100 );

    }
  },
  activateBodyClick: function() {
    document.body.addEventListener( 'click', this.bodyClick, false );
  },
  // open / close toggle
  toggleState: function() {

    this.destroy();

    if ( this.state.open === 'close' ) {
      // close -> open
      // document.body へ click event handler bind
      this.setState( { open: 'open' } );
      console.log( 'open click ', this.props.articleId, this.props.commentId, this.props.replyId );
      this.activateBodyClick();
    } else {
      // open -> close
      this.setState( { open: 'close' } );
    }

  },
  // timer cancel
  // body.click unbind
  // 後処理
  destroy: function() {

    // body click からの遅延処理を clear する
    // timer を 0 にし error にならないようにする
    clearTimeout( this.timer );
    this.timer = 0;
    // document.body からclick event handler unbind
    document.body.removeEventListener( 'click', this.bodyClick );

  }
} );
*/
/**
 * <h3>React class</h3>
 * 記事詳細 > コメント一覧 node を作成します
 * @class CommentNode
 * @type {Function}
 */
export let CommentNode = React.createClass( {
  propTypes: {
    // unique id（識別のために必要）
    uniqueId: React.PropTypes.string.isRequired,
    // CommentDae instance
    commentDae: React.PropTypes.object.isRequired,
    // user id（オプション）
    userId: React.PropTypes.string,
    // コメント送信者（自分の）profile picture
    icon: React.PropTypes.string,
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // コメント id（オプション）
    commentId: React.PropTypes.string,
    // 返信 id（オプション）
    replyId: React.PropTypes.string,
    // コメントした user id
    commentUserId: React.PropTypes.string.isRequired,
    // コメント数 default 0
    commentCount: React.PropTypes.number,
    // ログインの有無
    sign: React.PropTypes.bool.isRequired,
    // 親コメント? default false
    parent: React.PropTypes.bool,
    // 記事へのコメント送信 default false
    independent: React.PropTypes.bool,
    // フォームをopen（表示）するか default false
    open: React.PropTypes.bool,
    // comment type
    commentsListType: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      icon: '',
      userId: '',
      commentId: '',
      replyId: '',
      commentCount: 0,
      parent: false,
      independent: false,
      open: false
    };
  },
  getInitialState: function() {
    this.replyStatus = null;

    return {
      open: this.props.open,
      loading: ''
    };
  },
  render: function() {
    let commentDae = this.props.commentDae;
    let comment = commentDae.comment;
    let sign = this.props.sign;

    // user icon
    let picture = comment.user.profilePicture;
    if ( !picture ) {
      picture = Empty.USER_EMPTY;
    } else if ( !Safety.isImg( picture ) ) {
      // 画像ファイル名に拡張子がないのがあったので
      // 拡張子チェックを追加
      picture = Empty.USER_EMPTY;
    }

    let loggedIn = picture === Empty.USER_EMPTY ? '' : 'user-logged-in';

    let replyClass = ( replyId ) => {
      return replyId === '' ? '' : ` comment-content-reply-${replyId}`;
    };

    return (
      <div className="comment-root">
        {/* div.comment-menu */}
        <CommentMenuNode
          key={`${this.props.uniqueId}-menu`}
          uniqueId={`${this.props.uniqueId}-menu`}
          sign={sign}
          userId={this.props.userId}
          commentUserId={this.props.commentUserId}
          articleId={this.props.articleId}
          commentId={this.props.commentId}
          replyId={this.props.replyId}
          parent={this.props.parent}
        />
        {/*
        単独file にするために分離
        CommentUserNode
        <figure className="comment-user">
          <span className="comment-user-link">
            <span className={'comment-user-thumb ' + loggedIn}><img src={picture} alt={comment.user.userName}/></span>
            <div className="comment-user-data">
              <p className="comment-user-name">{comment.user.userName}</p>
              <p className="comment-user-job">{comment.user.bio || ''}</p>
              <p className="comment-date">{comment.displayDate}</p>
            </div>
          </span>
        </figure>
       */}
        {/* figure.comment-user */}
        <CommentUserNode
          loggedIn={loggedIn}
          picture={picture}
          userName={comment.user.userName}
          bio={comment.user.bio || ''}
          displayDate={comment.displayDate}
        />
        {/*
         単独file にするために分離
         CommentContentNode
        <div className={`comment-content comment-content-${this.props.commentId}${replyClass(this.props.replyId)}`} dangerouslySetInnerHTML={{__html: comment.body}} />
         */}
        {/* div.comment-content */}
        <CommentContentNode
          content={comment.body}
          commentId={this.props.commentId}
          replyClass={replyClass(this.props.replyId)}
        />
        {/* div.comment-reaction, good / bad */}
        <ReactionNode
          uniqueId={this.props.uniqueId}
          articleId={this.props.articleId}
          commentId={this.props.parent ? this.props.commentId : this.props.replyId}
          sign={sign}
          good={comment.good}
          bad={comment.bad}
          isGood={comment.isGood}
          isBad={comment.isBad}
        />
        <CommentFormNode
          uniqueId={this.props.uniqueId}
          icon={this.props.icon}
          articleId={this.props.articleId}
          commentId={this.props.commentId}
          commentCount={this.props.commentCount}
          sign={sign}
          parent={this.props.parent}
          independent={this.props.independent}
          commentType={this.props.commentsListType}
        />
      </div>
    );
  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  }
} );
