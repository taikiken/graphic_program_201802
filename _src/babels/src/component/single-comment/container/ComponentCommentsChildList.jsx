/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/04 - 20:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentNode

// import { CommentsDae } from '../../../dae/comments/CommentsDae';
import { Safety } from '../../../data/Safety';
import { Empty } from '../../../app/const/Empty';

// node
import { ReactionNode } from '../../../node/comment/ReactionNode';
import { CommentFormNode } from '../../../node/comment/CommentFormNode';
import { CommentMenuNode } from '../../../node/comment/CommentMenuNode';
import { CommentUserNode } from '../../../node/comment/CommentUserNode';
import { CommentContentNode } from '../../../node/comment/CommentContentNode';
import { ReplyDae } from '../../../dae/comments/ReplyDae';
import { PopularDae } from '../../../dae/comments/PopularDae';

// React
const React = self.React;

/**
 * reply container class name を作成します
 * @param {number} replyId comment reply id
 * @returns {string} class name を返します
 */
const replyClass = (replyId) => (replyId ? ` comment-content-reply-${replyId}` : '');

/**
 * `div.comment-item-inner.comment-root` を出力します
 * - {@link CommentMenuNode}
 * - {@link CommentUserNode}
 * - {@link CommentContentNode}
 * - {@link ReactionNode}
 * - {@link CommentFormNode}
 *
 * @param {{comment: PopularDae, reply: ReplyDae}} commentObject JSON コメントデータ
 * @param {boolean} sign ログインの有無 flag
 * @param {string} uniqueId 識別のために使用します
 * @param {string} articleId コメントした記事 id
 * @param {string} commentUserId コメントした user id
 * @param {string} commentsListType comment type, normal / self / official
 * @param {string} [userId=''] user id
 * @param {string} [icon=''] コメント送信者（自分の）profile picture
 * @param {string} [commentId=''] comment id
 * @param {string} [replyId=''] replay id
 * @param {number} [commentCount=0] コメント数
 * @param {boolean} [parent=false] 親コメント flag
 * @param {boolean} [independent=false] 記事へのコメント
 * @param {string} [url=''] comment 詳細への path
 * @returns {XML} `div.comment-item-inner.comment-root` コメントコンテナを返します
 * @constructor
 */
const ComponentCommentsChildList = ({
                                      commentObject: commentObject,
                                      sign,
                                      uniqueId,
                                      articleId,
                                      commentUserId,
                                      commentsListType,
                                      userId,
                                      icon,
                                      commentId,
                                      replyId,
                                      commentCount,
                                      parent,
                                      independent,
                                      url,
                                    }) => {
  // console.log('ComponentCommentsChildList commentObject', commentObject);
  const comment = commentObject.comment;
  const picture = Safety.image(comment.user.profilePicture, Empty.USER_EMPTY);
  const loggedIn = Safety.same(picture, Empty.USER_EMPTY);
  // ---
  return (
    <div className="comment-item-inner comment-root">
      {/* div.comment-menu */}
      <CommentMenuNode
        key={`${uniqueId}-menu`}
        uniqueId={`${uniqueId}-menu`}
        sign={sign}
        userId={userId}
        commentUserId={commentUserId}
        articleId={articleId}
        commentId={commentId}
        replyId={replyId}
        parent={parent}
        url={url}
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
        commentId={commentId}
        replyClass={replyClass(replyId)}
      />
      {/* div.comment-reaction, good / bad */}
      <ReactionNode
        uniqueId={uniqueId}
        articleId={articleId}
        commentId={parent ? commentId : replyId}
        sign={sign}
        good={comment.good}
        bad={comment.bad}
        isGood={comment.isGood}
        isBad={comment.isBad}
        url={url}
      />
      <CommentFormNode
        uniqueId={uniqueId}
        icon={icon}
        articleId={articleId}
        commentId={commentId}
        commentCount={commentCount}
        sign={sign}
        parent={parent}
        independent={independent}
        commentType={commentsListType}
        url={url}
      />
    </div>
  );
};

/**
 * React.propTypes
 * @type {{
 *   commentObject: {comment: PopularDae, reply: ReplyDae},
 *   sign: boolean,
 *   uniqueId: string,
 *   articleId: string,
 *   commentUserId: string,
 *   commentsListType: string,
 *   userId: string,
 *   icon: string,
 *   commentId: string,
 *   replyId: string,
 *   commentCount: number,
 *   parent: boolean,
 *   independent: boolean,
 *   url: string
 * }}
 */
ComponentCommentsChildList.propTypes = {
  commentObject: React.PropTypes.shape({
    comment: React.PropTypes.instanceOf(PopularDae).isRequired,
    reply: React.PropTypes.instanceOf(ReplyDae).isRequired
  }).isRequired,
  // ログインの有無
  sign: React.PropTypes.bool.isRequired,
  // unique id（識別のために必要）
  uniqueId: React.PropTypes.string.isRequired,
  // 記事 id
  articleId: React.PropTypes.string.isRequired,
  // コメントした user id
  commentUserId: React.PropTypes.string.isRequired,
  // comment type
  commentsListType: React.PropTypes.string.isRequired,
  // user id（オプション）
  userId: React.PropTypes.string,
  // コメント送信者（自分の）profile picture
  icon: React.PropTypes.string,
  // コメント id（オプション）
  commentId: React.PropTypes.string,
  // 返信 id（オプション）
  replyId: React.PropTypes.string,
  // コメント数 default 0
  commentCount: React.PropTypes.number,
  // 親コメント? default false
  parent: React.PropTypes.bool,
  // 記事へのコメント送信 default false
  independent: React.PropTypes.bool,
  // // フォームをopen（表示）するか default false
  // open: React.PropTypes.bool,
  // comment 詳細 url
  url: React.PropTypes.string,
};

/**
 * React.defaultProps
 * @type {{userId: string, icon: string, commentId: string, replyId: string, commentCount: number, parent: boolean, independent: boolean, url: string}}
 */
ComponentCommentsChildList.defaultProps = {
  userId: '',
  icon: '',
  commentId: '',
  replyId: '',
  commentCount: 0,
  parent: false,
  independent: false,
  // open: false,
  url: '',
};

export default ComponentCommentsChildList;
