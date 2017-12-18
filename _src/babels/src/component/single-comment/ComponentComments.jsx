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
// CommentsDom

import { Safety } from '../../data/Safety';
import View from '../../view/View';
import { CommentsType } from '../../app/const/CommentsType';
import ComponentCommentsParent from './container/ComponentCommentsParent';
import ComponentCommentMoreView from './ComponentCommentMoreView';
import { CommentsListDae } from '../../dae/CommentsListDae';
import { Comments } from '../../action/comment/Comments';
import { CommentSingle } from '../../action/comment/CommentSingle';
import { CommentSingleReply } from '../../action/comment/CommentSingleReply';


// React
const React = self.React;
// const ReactDOM = self.ReactDOM;

/**
 * コメントコンテナを出力します
 * - {@link ComponentCommentsParent}
 *   - {@link ComponentCommentsChildList}
 *     - {@link CommentMenuNode}
 *     - {@link CommentUserNode}
 *     - {@link CommentContentNode}
 *     - {@link ReactionNode}
 *     - {@link CommentFormNode}
 *   - {@link ComponentCommentsChildReply}
 *     - {@link CommentNode}
 * - {@link ComponentCommentMoreView}
 * @since 2017-12-05
 */
export default class ComponentComments extends React.Component {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * React.propTypes
   * @returns {{
   *    commentsListDae: CommentsListDae,
   *    commentsList: Array.<number>,
   *    commentsListType: string,
   *    articleId: string,
   *    execute: function,
   *    action: Comments,
   *    commentsBank: object,
   *    user: object
   * }} React.propTypes を返します
   */
  static get propTypes() {
    return {
      commentsListDae: React.PropTypes.instanceOf(CommentsListDae).isRequired,
      // commentsList: React.PropTypes.array.isRequired,
      // CommentsListDae.comments(CommentsDae).list - comment id list
      commentsList: React.PropTypes.arrayOf(
        React.PropTypes.number.isRequired
      ).isRequired,
      commentsListType: React.PropTypes.string.isRequired,
      articleId: React.PropTypes.string.isRequired,
      // executeSafely
      execute: React.PropTypes.func.isRequired,
      action: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Comments),
        React.PropTypes.instanceOf(CommentSingle),
        React.PropTypes.instanceOf(CommentSingleReply)
      ]).isRequired,
      // コメントIDをキーにコメント Object
      commentsBank: React.PropTypes.object.isRequired,
      user: React.PropTypes.object.isRequired,
    };
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * コメントコンテナを出力します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * - comment id list
     * @type {{commentsList: Array.<number>}}
     */
    this.state = {
      commentsList: props.commentsList,
    };
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * delegate - after mount
   * {@link View.DID_MOUNT} を実行します
   */
  componentDidMount() {
    // after mount
    this.props.execute(View.DID_MOUNT);
  }
  /**
   * delegate - props 更新時に呼び出されます,
   * @param {{ commentsList: Array.<number> }} nextProps 更新される props
   */
  componentWillReceiveProps(nextProps) {
    const { commentsList } = nextProps;
    // console.log('ComponentComments.componentWillReceiveProps', nextProps.commentsList, this.state.commentsList);
    if (Safety.array(commentsList) && commentsList.length !== this.state.commentsList.length) {
      this.setState({ commentsList });
    }
  }

  /**
   * 「N件を表示」リンクを作成します
   * @returns {XML} {@link ComponentCommentMoreView} component を返します
   */
  moreButton() {
    const { action } = this.props;
    // more button
    // console.log('ComponentComments.moreButton', action.hasNext(), action.rest());
    return (
      <ComponentCommentMoreView
        action={action}
        show={action.hasNext()}
        rest={action.rest()}
      />
    );
  }

  /**
   * コメントコンテナを出力します
   * @returns {XML} `div.comment > ` {@link ComponentCommentsParent} + {@link ComponentCommentMoreView}
   */
  render() {
    const { commentsList } = this.state;
    // console.log('ComponentComments.render commentsList', commentsList);
    if (!Safety.array(commentsList) || !commentsList.length) {
      return null;
    }
    const { articleId, commentsListType, user, commentsBank } = this.props;
    const userId = String(Safety.integer((user.id), 0));
    return (
      <div className={`comment-${commentsListType}`}>
        <div className="comment-heading">
          <h2>{CommentsType.title(commentsListType)}</h2>
        </div>
        {
          commentsList.map((commentId, index) => {
            const commentObject = commentsBank[commentId];
            // console.log('ComponentComments.render.map commentObject', commentId, commentObject);
            const key = `${index}-${commentsListType}-${articleId}-${commentId}-${userId}`;
            return (
              <ComponentCommentsParent
                key={key}
                commentObject={commentObject}
                uniqueId={key}
                articleId={articleId}
                commentsListType={commentsListType}
                user={user}
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
