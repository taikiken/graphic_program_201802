/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/04 - 20:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Safety } from '../../data/Safety';
import View from '../../view/View';
import { CommentsType } from '../../app/const/CommentsType';
import ComponentCommentsParent from './ComponentCommentsParent';
import ComponentCommentMoreView from './ComponentCommentMoreView';

// CommentsDom

// React
const React = self.React;
// const ReactDOM = self.ReactDOM;

export default class ComponentComments extends React.Component {
  static get propTypes() {
    return {
      commentsList: React.PropTypes.array.isRequired,
      commentsListType: React.PropTypes.string.isRequired,
      articleId: React.PropTypes.string.isRequired,
      execute: React.PropTypes.func.isRequired,
      action: React.PropTypes.func.isRequired,
      // コメントIDをキーにコメント Object
      commentsBank: React.PropTypes.object.isRequired,
      user: React.PropTypes.object,
    };
  }
  static get defaultProps() {
    return {
      user: null,
    };
  }
  constructor(props) {
    super(props);
    // ---
    this.state = {
      commentsList: props.commentsList,
    };
    this.commentMore = null;
  }
  componentDidMount() {
    // after mount
    this.props.execute(View.DID_MOUNT);
  }
  componentWillReceiveProps(nextProps) {
    const { commentsList } = nextProps;
    if (Safety.array(commentsList) && commentsList.length > this.state.commentsList.length) {
      this.setState({ commentsList });
    }
  }
  moreButton() {
    // more button
    const { action } = this.props;
    return (
      <ComponentCommentMoreView
        action={action}
        show={action.hasNext()}
        rest={action.rest()}
      />
    );
  }
  render() {
    const { commentsList } = this.state;
    if (!Safety.array(commentsList) || !commentsList.length) {
      return null;
    }
    const { articleId, commentsListType, user, commentsBank } = this.props;
    const usr = user ? user : Object.create({});
    const usrId = user ? String(Safety.integer((user.id), 0)) : '0';
    return (
      <div className={`comment-${commentsListType}`}>
        <div className="comment-heading">
          <h2>{CommentsType.title(commentsListType)}</h2>
        </div>
        {
          commentsList.map((commentId, index) => {
            const commentObject = commentsBank[commentId];
            const key = `${index}-${commentsListType}-${articleId}-${commentId}-${usrId}`;
            return (
              <ComponentCommentsParent
                key={key}
                commentObject={commentObject}
                uniqueId={key}
                articleId={articleId}
                commentsListType={commentsListType}
                user={usr}
              />
            );
          })
        }
        {
          this.moreButton()
        }
      </div>
    );
  }
}
