/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */


import {Empty} from '../../app/const/Empty';
import {Safety} from '../../data/Safety';

// node
import {ReactionNode} from './ReactionNode';
import {CommentFormNode} from './CommentFormNode';
import {CommentMenuNode} from './CommentMenuNode';
import {CommentUserNode} from './CommentUserNode';
import {CommentContentNode} from './CommentContentNode';

// React
let React = self.React;

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
      if ( !Safety.isGraph( picture ) ) {
        picture = Empty.USER_EMPTY;
      }
    }

    let loggedIn = picture === Empty.USER_EMPTY ? '' : 'user-logged-in';

    let replyClass = ( replyId ) => {
      return replyId === '' ? '' : ` comment-content-reply-${replyId}`;
    };

    return (
      <div className="comment-item-inner comment-root">
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
        {/* figure.comment-user */}
        <CommentUserNode
          loggedIn={loggedIn}
          picture={picture}
          userName={comment.user.userName}
          bio={comment.user.bio || ''}
          displayDate={comment.displayDate}
        />
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
