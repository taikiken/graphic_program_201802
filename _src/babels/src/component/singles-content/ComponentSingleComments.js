/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/05 - 12:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view/comment
import { ViewCommentForm } from '../../view/comment/ViewCommentForm';

// view
import { ViewComments } from '../../view/ViewComments';

// app
import { User } from '../../app/User';
import { CommentsType } from '../../app/const/CommentsType';

// React
const React = self.React;

export class ComponentSingleComments extends React.Component {
  // -------------------------- -------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      single: props.single,
      sign: props.sign,
      index: props.index
    };
  }
  componentDidMount() {
    this.start();
  }
  start() {
    const info = User.info();
    if (info === null) {
      setTimeout(() => this.start(), 25);
      return;
    }
    this.mine(info);
    this.official(info);
    this.normal(info);
    this.form(info);
  }
  mine(info) {
    const comment = new ViewComments(this.state.single.id, this.refs.commentSelf, CommentsType.SELF);
    comment.user = info;
    comment.start();
  }
  official(info) {
    const comment = new ViewComments(this.state.single.id, this.refs.commentOfficial, CommentsType.OFFICIAL);
    comment.user = info;
    comment.start();
  }
  normal(info) {
    const comment = new ViewComments(this.state.single.id, this.refs.commentNormal, CommentsType.NORMAL);
    comment.user = info;
    comment.start();
  }
  form(info) {
    const comment = new ViewCommentForm(this.refs.commentForm, this.state.single.id, info.profilePicture);
    comment.start();
  }
  render() {
    if (!this.state.sign) {
      return null;
    }
    return (
      <div className={`comment comment-${this.state.single.id}`}>
        <div className="comment-self-container" ref="commentSelf" />
        <div className="comment-official-container" ref="commentOfficial" />
        <div className="comment-normal-container" ref="commentNormal" />
        <div className="comment-form-container" ref="commentForm" />
      </div>
    );
  }
}
