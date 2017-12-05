/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/04 - 20:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentReplyChildDom

import { CommentNode } from '../../../node/comment/CommentNode';

// React
const React = self.React;

const ComponentCommentsChildReply = ({
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
  console.log('ComponentCommentsChildReply total', total, commentsListType, reply.comments);
  const replyList = reply.comments;
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
              <CommentNode
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

ComponentCommentsChildReply.propTypes = {
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

export default ComponentCommentsChildReply;
