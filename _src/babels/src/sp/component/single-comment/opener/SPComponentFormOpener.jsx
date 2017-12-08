/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/06 - 14:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// SPCommentFormOpenerDom
import { Message } from '../../../../app/const/Message';
import { Url } from '../../../../app/const/Url';

// sp
import { SPCommentFormNode } from '../../../node/comment/SPCommentFormNode';

// React
const React = self.React;
// const ReactDOM = self.ReactDOM;

/**
 * 記事への「コメント」投稿用フォームを開くリンク
 */
export default class SPComponentFormOpener extends React.Component {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * React.propTypes
   * - uniqueId {string} - 識別値
   * - toggle {string} - open / close state
   * - icon {string} - icon path
   * - articleId {string} - 記事 ID
   * - sign {boolean} - ログイン済み flag
   * - independent {boolean} - 記事フォーム flag
   * - parent {boolean} - 親記事
   * - commentType {string} - comment type, normal / official / self
   * - url {string} - コメントへの path
   * @returns {{
   *   uniqueId: string,
   *   toggle: string,
   *   icon: string,
   *   articleId: string,
   *   sign: boolean,
   *   independent: boolean,
   *   parent: boolean,
   *   commentType: string,
   *   url: string
   * }} React.propTypes
   */
  static get propTypes() {
    return {
      uniqueId: React.PropTypes.string.isRequired,
      toggle: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      articleId: React.PropTypes.string.isRequired,
      sign: React.PropTypes.bool.isRequired,
      independent: React.PropTypes.bool.isRequired,
      parent: React.PropTypes.bool.isRequired,
      commentType: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
    };
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 記事への「コメント」投稿用フォームを開くリンク
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    /**
     * React.state
     * @type {{open: boolean}}
     */
    this.state = {
      open: false,
    };
    /**
     * bind onClick - a.onclick event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * a.onclick event handler - コメントフォームを開きます
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    this.setState({ open: true });
  }
  /**
   * 記事への「コメント」投稿用フォームを開くリンク / 投稿フォームを表示します
   * @returns {XML} {@link SPCommentFormNode} / `div.comment-form-opener`
   */
  render() {
    const { open } = this.state;
    const {
      uniqueId,
      toggle,
      icon,
      articleId,
      sign,
      independent,
      parent,
      commentType,
      url,
    } = this.props;
    if (sign) {
      if (open) {
        // open state
        return (
          <SPCommentFormNode
            uniqueId={uniqueId}
            toggle={toggle}
            icon={icon}
            articleId={articleId}
            sign={sign}
            independent={independent}
            parent={parent}
            commentType={commentType}
            url={url}
          />
        );
      } else {
        // close state
        return (
          <div className="comment-form-opener">
            <a
              className="comment-form-opener-trigger"
              href="#"
              onClick={this.onClick}
            >
              {Message.COMMENT_SUBMIT}
            </a>
          </div>
        );
      }
    } else {
      // not sign-in
      // 非ログインユーザーはログイン画面へ
      return (
        <div className="comment-form-opener">
          <a className="comment-form-opener-trigger" href={Url.login()}>{Message.COMMENT_SUBMIT}</a>
        </div>
      );
    }
  }
}
