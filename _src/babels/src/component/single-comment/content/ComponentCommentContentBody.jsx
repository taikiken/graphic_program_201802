/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/07 - 18:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentContentNode
/**
 * [library] - React
 */
const React = self.React;

/**
 * コメント本文部分を表示
 * @param {string} content コメント本文
 * @param {string} commentId comment id
 * @param {string} replyClass 付与する class name
 * @returns {XML} `div.comment-content`
 * @constructor
 */
const ComponentCommentContentBody = ({
                                        content,
                                        commentId,
                                        replyClass,
                                      }) => (
  <div
    className={`comment-content comment-content-${commentId}${replyClass}`}
    dangerouslySetInnerHTML={{__html: content}}
  />
);

/**
 * React.porpTypes
 * @type {{
 *   content: string,
 *   commentId: string,
 *   replyClass: string
 * }}
 */
ComponentCommentContentBody.porpTypes = {
  content: React.PropTypes.string.isRequired,
  commentId: React.PropTypes.string.isRequired,
  replyClass: React.PropTypes.string.isRequired,
};

export default ComponentCommentContentBody;
