/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/06 - 17:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentFormOpenerNode

import { ReplyStatus } from '../../../event/ReplyStatus';

const React = self.React;

/**
 * コメント入力欄の 表示 / 非表示 するボタン出力をします
 * - {@link ComponentCommentForm} - root
 *   - ComponentCommentFormOpener
 *   - {@link ComponentCommentFormElement}
 *
 * {@link ReplyStatus} へ状態を通知します
 * @since 2017-12-06
 */
export default class ComponentCommentFormOpener extends React.Component {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * React.propTypes
   * - uniqueId {string} - 識別子
   * - independent {boolean} - 記事へのコメント flag
   * - staticMessage {string} - リンク表示テキスト
   * @returns {{
   *   uniqueId: string,
   *   independent: boolean,
   *   actionMessage: string
   * }} React.propTypes
   */
  static get propTypes() {
    return {
      uniqueId: React.PropTypes.string.isRequired,
      independent: React.PropTypes.bool.isRequired,
      actionMessage: React.PropTypes.string.isRequired,
    };
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  constructor(props) {
    super(props);
    // ---
    /**
     * コメント・リプライ状態通知マネージャー
     * @type {ReplyStatus}
     */
    this.replyStatus = ReplyStatus.factory();
    /**
     * コメント入力欄の 表示 flag
     * @type {boolean}
     */
    this.opened = false;
    /**
     * React.state
     * - toggle {string} - コメント入力欄状態 state
     * @type {{toggle: string}}
     */
    this.state = {
      toggle: 'reply',
    };
    /**
     * bind openerClick - open click event handler
     * @type {function}
     */
    this.openerClick = this.openerClick.bind(this);
    /**
     * bind cancelClick - close click event handler
     * @type {function}
     */
    this.cancelClick = this.cancelClick.bind(this);
    /**
     * bind replyComplete - コメント送信 event handler
     * @type {function}
     */
    this.replyComplete = this.replyComplete.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * close -> open click event handler
   * - `willOpen`
   * - {@link ReplyStatus}.open
   * - `opened` flag true
   * @param {Event} event click event
   */
  openerClick(event) {
    // console.log('ComponentCommentFormOpener.openerClick', this.props.uniqueId, this.opened);
    event.preventDefault();
    this.willOpen();
    this.opened = true;
    this.replyStatus.open(this.props.uniqueId);
  }
  /**
   * open -> close click event handler
   * - `willClose`
   * - {@link ReplyStatus}.close
   * - `opened` flag false
   * @param {Event} event click event
   */
  cancelClick(event) {
    // console.log('ComponentCommentFormOpener.cancelClick', this.props.uniqueId, this.opened);
    event.preventDefault();
    this.willClose();
    this.opened = false;
    this.replyStatus.close(this.props.uniqueId);
  }
  /**
   * {@link ReplyStatus}.COMPLETE event handler
   * - `opened` flag false
   */
  replyComplete() {
    this.opened = false;
  }

  /**
   * state.toggle - `cancel`
   */
  willOpen() {
    this.setState({ toggle: 'cancel' });
  }

  /**
   * state.toggle - `reply`
   */
  willClose() {
    this.setState({ toggle: 'reply' });
  }
  checkId(event) {
    return this.props.uniqueId === event.id;
  }

  /**
   * {@link ReplyStatus}.COMPLETE unbind
   */
  dispose() {
    this.replyStatus.off(ReplyStatus.COMPLETE, this.replyComplete);
  }
  // ----------------------------------------
  // delegate
  /**
   * [delegate] - {@link ReplyStatus}.COMPLETE bind
   */
  componentDidMount() {
    this.dispose();
    this.replyStatus.on(ReplyStatus.COMPLETE, this.replyComplete);
  }
  /**
   * [delegate] - `dispose` 実行し {@link ReplyStatus}.COMPLETE unbind します
   */
  componentWillUnMount() {
    this.dispose();
  }
  /**
   * opener 出力を行います
   * - 記事へのコメント `independent` true は出力しません
   * @returns {?XML} `a.comment-respond-opener`
   */
  render() {
    if (this.props.independent) {
      return null;
    }
    if (!this.opened) {
      return (
        <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.openerClick}>
          <span className="icon-comment">{this.props.actionMessage}</span>
        </a>
      );
    }
    return (
      <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.cancelClick}>
        <span className="icon-comment">{this.props.actionMessage}</span>
      </a>
    );
  }
}
