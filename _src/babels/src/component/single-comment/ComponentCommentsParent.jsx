/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/04 - 20:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Safety } from '../../data/Safety';
import { User } from '../../app/User';
import ComponentCommentsChildList from './ComponentCommentsChildList';
import ComponentCommentsChildReply from './ComponentCommentsChildReply';

// CommentsParentDom

// React
const React = self.React;

const ComponentCommentsParent = ({
                                   commentObject,
                                   uniqueId,
                                   articleId,
                                   commentsListType,
                                   user,
                                 }) => {
  const replyTotal = Safety.integer(commentObject.reply.total, 0);
  const commentId = String(commentObject.comment.id);
  const sign = User.sign;
  const icon = sign && user ? user.profilePicture : '';
  const userId = sign && user ? String(user.id) : '';
  // ---
  return (
    <ul className={'comment-list'}>
      <li className="comment-item">
        {/* independent, open 省略 */}
        <ComponentCommentsChildList
          uniqueId={`comment-${uniqueId}`}
          commentDae={commentObject}
          icon={icon}
          userId={userId}
          articleId={articleId}
          commentId={commentId}
          commentUserId={String(commentObject.comment.user.id)}
          commentCount={commentObject.reply.total}
          sign={sign}
          parent={true}
          commentsListType={commentsListType}
          url={commentObject.comment.url}
        />
        {/* comment reply */}
        {/* unique を確保するため comment type を追加 2016-04-27 */}
        <ComponentCommentsChildReply
          uniqueId={`reply-${commentsListType}-${uniqueId}`}
          total={replyTotal}
          sign={sign}
          userId={userId}
          icon={icon}
          articleId={articleId}
          commentId={commentId}
          commentsListType={commentsListType}
          reply={commentObject.reply}
        />
      </li>
    </ul>
  );
};

export default ComponentCommentsParent;
