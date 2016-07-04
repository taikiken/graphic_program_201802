/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 16:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Empty} from '../../app/const/Empty';

let React = self.React;

/**
 * <p>コメントのユーザー情報部分</p>
 *
 * <pre>
 * CommentNode
 * |- CommentUserNode
 * </pre>
 *
 * @type {ReactClass}
 */
export let CommentUserNode = React.createClass( {
  propTypes: {
    loggedIn: React.PropTypes.string.isRequired,
    picture: React.PropTypes.string.isRequired,
    userName: React.PropTypes.string.isRequired,
    bio: React.PropTypes.string.isRequired,
    displayDate: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <figure className="comment-user">
        <span className="comment-user-link">
          <span className={'comment-user-thumb ' + this.props.loggedIn}><img src={Empty.refresh(this.props.picture)} alt={this.props.userName}/></span>
          <div className="comment-user-data">
            <p className="comment-user-name">{this.props.userName}</p>
            <p className="comment-user-job">{this.props.bio}</p>
            <p className="comment-date">{this.props.displayDate}</p>
          </div>
        </span>
      </figure>
    );
  }
} );
