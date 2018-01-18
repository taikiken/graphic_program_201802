/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 16:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


let React = self.React;

/**
 * コメント本文部分を表示
 * @type {ReactClass}
 * @deprecated 2017-12-07 instead use {@link ComponentCommentContentBody}
 */
export let CommentContentNode = React.createClass( {
  propTypes: {
    content: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string.isRequired,
    replyClass: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className={`comment-content comment-content-${this.props.commentId}${this.props.replyClass}`} dangerouslySetInnerHTML={{__html: this.props.content}} />
    );
  }
} );
