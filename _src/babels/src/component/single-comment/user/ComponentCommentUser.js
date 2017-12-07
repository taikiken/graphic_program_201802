import { Empty } from '../../../app/const/Empty';

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/07 - 15:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentUserNode

const React = self.React;

/**
 * コメントのユーザー情報部分
 * @param {string} loggedIn login mark - css class に使用します
 * @param {string} picture  user icon path
 * @param {string} userName user 名前
 * @param {string} bio user 職種
 * @param {string} displayDate 投稿日付
 * @returns {XML} `figure.comment-user`
 * @constructor
 */
const ComponentCommentUser = ({ loggedIn, picture, userName, bio, displayDate }) => (
  <figure className="comment-user">
    <span className="comment-user-link">
      <span className={`comment-user-thumb ${loggedIn}`}><img src={Empty.refresh(picture)} alt={userName}/></span>
      <div className="comment-user-data">
        <p className="comment-user-name">{userName}</p>
        <p className="comment-user-job">{bio}</p>
        <p className="comment-date">{displayDate}</p>
      </div>
    </span>
  </figure>
);

/**
 * React.propTypes
 * @type {{
 *   loggedIn: string,
 *   picture: string,
 *   userName: string,
 *   bio: string,
 *   displayDate: string
 * }}
 */
ComponentCommentUser.propTypes = {
  loggedIn: React.PropTypes.string.isRequired,
  picture: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired,
  bio: React.PropTypes.string.isRequired,
  displayDate: React.PropTypes.string.isRequired,
};

export default ComponentCommentUser;
