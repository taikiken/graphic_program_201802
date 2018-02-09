import { User } from '../../../../app/User';
import { PopularDae } from '../../../../dae/comments/PopularDae';
import { ReplyDae } from '../../../../dae/comments/ReplyDae';
import { UserDae } from '../../../../dae/UserDae';
import { Safety } from '../../../../data/Safety';

// component
import SPComponentCommentsChildList from './SPComponentCommentsChildList';
import SPComponentCommentsChildReply from './SPComponentCommentsChildReply';

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/06 - 13:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentsParentDom

// React
const React = self.React;

/**
 * コメントリスト `ul.comment-list` を作成します
 * - {@link ComponentCommentsChildList}
 * - {@link ComponentCommentsChildReply}
 * @param {{comment: PopularDae, reply: ReplyDae}} commentObject JSON コメントデータ
 * @param {string} uniqueId 識別子
 * @param {string} articleId 記事 ID
 * @param {string} commentsListType コメント種別 normal / official / self
 * @param {UserDae} user ユーザー情報
 * @returns {XML} `ul.comment-list` + {@link ComponentCommentsChildList}, {@link ComponentCommentsChildReply}
 * @constructor
 */
const SPComponentCommentsParent = ({
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
        <SPComponentCommentsChildList
          uniqueId={`comment-${uniqueId}`}
          commentObject={commentObject}
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
        <SPComponentCommentsChildReply
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

/**
 * React.propTypes
 * @type {{
 *   commentObject: {comment: PopularDae, reply: ReplyDae},
 *   uniqueId: string,
 *   articleId: string,
 *   commentsListType: string,
 *   user: *
 * }}
 */
SPComponentCommentsParent.propTypes = {
  commentObject: React.PropTypes.shape({
    comment: React.PropTypes.instanceOf(PopularDae).isRequired,
    reply: React.PropTypes.instanceOf(ReplyDae).isRequired
  }).isRequired,
  uniqueId: React.PropTypes.string.isRequired,
  articleId: React.PropTypes.string.isRequired,
  commentsListType: React.PropTypes.string.isRequired,
  user: React.PropTypes.instanceOf(UserDae).isRequired,
};

export default SPComponentCommentsParent;
