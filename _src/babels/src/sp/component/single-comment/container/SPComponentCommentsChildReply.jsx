/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/06 - 12:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { SPCommentNode } from '../../../node/comment/SPCommentNode';

// React
const React = self.React;

/**
 * コメント返信コンテナを出力します
 * - {@link CommentNode}
 * @param {number} total 返信件数
 * @param {boolean} sign login flag
 * @param {string} uniqueId 識別子
 * @param {string} userId user id
 * @param {string} icon user profile picture path
 * @param {string} articleId 記事 ID
 * @param {string} commentId comment ID
 * @param {string} commentsListType comment 種別, normal / official / self
 * @param {{comments: Array.<*>}} reply コメント返信リスト
 * @returns {XML} `ul.comment-list` > {@link CommentNode}
 * @constructor
 */
const SPComponentCommentsChildReply = ({
                                       total,
                                       sign,
                                       uniqueId,
                                       userId,
                                       icon,
                                       articleId,
                                       commentId,
                                       commentsListType,
                                       reply,
                                     }) => {
  // console.log('SPComponentCommentsChildReply total', total, commentsListType, reply.comments);
  const replyList = reply.comments;
  // data が存在しない時は出力しない
  // total 件数入っていても配列が空の時がある
  if (!total || !replyList.length) {
    return null;
  }
  return (
    <ul className="comment-list">
      {
        replyList.comments.map((replyComment) => {
          /* 親コメントと子コメントのデータ形式が違う
             合わせるために object でラップする {comment: replyComment}
          */
          /* independent, open, commentCount 省略 */
          return (
            <li key={`${uniqueId}-${replyComment.id}`} className="comment-item">
              <SPCommentNode
                uniqueId={`${uniqueId}-${replyComment.id}`}
                commentDae={{comment: replyComment}}
                userId={userId}
                icon={icon}
                articleId={articleId}
                commentId={commentId}
                replyId={String(replyComment.id)}
                commentUserId={String(replyComment.user.id)}
                sign={sign}
                parent={false}
                commentsListType={commentsListType}
                url={replyComment.url}
              />
            </li>
          );
        } )
      }
    </ul>
  );
};

/**
 * React.propTypes
 * @type {{
 *   total: number,
 *   sign: boolean,
 *   uniqueId: string,
 *   userId: string,
 *   icon: string,
 *   articleId: string,
 *   commentId: string,
 *   commentsListType: string,
 *   reply: *
 * }}
 */
SPComponentCommentsChildReply.propTypes = {
  total: React.PropTypes.number.isRequired,
  sign: React.PropTypes.bool.isRequired,
  uniqueId: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  articleId: React.PropTypes.string.isRequired,
  commentId: React.PropTypes.string.isRequired,
  commentsListType: React.PropTypes.string.isRequired,
  reply: React.PropTypes.object.isRequired,
};

export default SPComponentCommentsChildReply;
