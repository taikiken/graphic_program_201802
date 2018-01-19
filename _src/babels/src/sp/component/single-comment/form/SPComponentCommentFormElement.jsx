/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/25 - 17:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// SPCommentFormElementNode
import { ErrorMessage } from '../../../../data/ErrorMessage';
import { Safety } from '../../../../data/Safety';
import { Empty } from '../../../../app/const/Empty';
import { Message } from '../../../../app/const/Message';
import ComponentError from '../../../../component/error/ComponentError';
import { ReplyStatus } from '../../../../event/ReplyStatus';
import { CommentStatus } from '../../../../event/CommentStatus';
import { ModelComment } from '../../../../model/comment/ModelComment';
import { ModelCommentReply } from '../../../../model/comment/ModelCommentReply';
import { Model } from '../../../../model/Model';
import { ErrorTxt } from '../../../../app/const/ErrorTxt';
import { Form } from '../../../../data/Form';
import { Ga } from '../../../../ga/Ga';
import { GaData } from '../../../../ga/GaData';
import { Loc } from '../../../../util/Loc';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP: コメントへのコメントを送信する `form` element を作成し管理します
 * - {@link ComponentError}
 */
export default class SPComponentCommentFormElement extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * - uniqueId - 識別用 unique Id
   * - toggle - open / close
   * - open - open flag
   * - independent - 記事へのコメント flag
   * - icon - user profile picture: icon がない（空は可）（非ログイン）は投稿できない
   * - articleId - 記事 Id
   * - commentId - コメント Id
   * - commentType - コメント種類
   * - url - コメント詳細URL - ga 送信に使用します
   * @return {{
   *   uniqueId: string,
   *   toggle: string,
   *   open: string,
   *   independent: boolean,
   *   icon: string,
   *   articleId: string,
   *   commentId: string,
   *   commentType: string,
   *   url: string
   * }} React.propTypes
   */
  static get propTypes() {
    return {
      // 識別用 unique Id
      uniqueId: React.PropTypes.string.isRequired,
      // open / close
      toggle: React.PropTypes.string.isRequired,
      // open / close を boolean で
      open: React.PropTypes.bool.isRequired,
      // 記事へのコメント？
      independent: React.PropTypes.bool.isRequired,
      // user profile picture: icon がない（空は可）（非ログイン）は投稿できない
      icon: React.PropTypes.string.isRequired,
      // 記事 Id ＊必須
      articleId: React.PropTypes.string.isRequired,
      // コメント Id
      commentId: React.PropTypes.string,
      // コメント
      commentType: React.PropTypes.string.isRequired,
      // コメント詳細URL for ga
      url: React.PropTypes.string.isRequired,
    };
  }

  /**
   * React.defaultProps
   * - commentId - ''
   * @return {{commentId: string}} React.defaultProps
   */
  static get defaultProps() {
    return {
      commentId: '',
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * SP: コメントへのコメント送信準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // -----
    /**
     * React.state
     * @type {{open, error: boolean, loading: string, body: string}}
     */
    this.state = {
      open: props.open,
      error: false,
      loading: '',
      body: '',
    };
    /**
     * コメント送信 `Model` class instance
     * @type {?ModelComment|?ModelCommentReply}
     */
    this.comment = null;
    /**
     * コメント送信 manager - `textarea` open / close します
     * @type {ReplyStatus}
     */
    this.replyStatus = ReplyStatus.factory();
    /**
     * コメント削除を監視します
     * @type {CommentStatus}
     */
    this.commentStatus = CommentStatus.factory();
    /**
     * mount flag - いる?
     * @type {boolean}
     */
    this.mounted = false;
    /**
     * コメントエラー表示を管理します
     * @type {{body: ErrorMessage}}
     */
    this.errors = {
      body: new ErrorMessage()
    };
    /**
     * `form` element コメント送信時に `FormData` 作成に使用します
     * @type {?Element}
     */
    this.formElement = null;
    /**
     * bind onReplyOpen
     * @type {function}
     */
    this.onReplyOpen = this.onReplyOpen.bind(this);
    /**
     * bind onReplyClose
     * @type {function}
     */
    this.onReplyClose = this.onReplyClose.bind(this);
    /**
     * bind onBodyChange
     * @type {function}
     */
    this.onBodyChange = this.onBodyChange.bind(this);
    /**
     * bind onSubmit
     * @type {function}
     */
    this.onSubmit = this.onSubmit.bind(this);
    /**
     * bind onDone
     * @type {function}
     */
    this.onDone = this.onDone.bind(this);
    /**
     * bind onFail
     * @type {function}
     */
    this.onFail = this.onFail.bind(this);
    /**
     * bind onBeforeReload
     * @type {function}
     */
    this.onBeforeReload = this.onBeforeReload.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * {@link ReplyStatus}.OPEN event handler
   * @param {{id: string}} event `props.uniqueId` と `event.id` を `checkId` 比較し等価の時は open します
   */
  onReplyOpen(event) {
    // console.log('SPComponentCommentFormElement.onReplyOpen', event, this.mounted, this.state.open, this.props.uniqueId, this.checkId(event));
    if (this.mounted && !this.state.open && this.checkId(event)) {
      this.setState({ open: true });
    }
  }
  /**
   * {@link ReplyStatus}.CLOSE event handler
   * @param {{id: string}} event `props.uniqueId` と `event.id` を `checkId` 比較し等価の時は close します
   */
  onReplyClose(event) {
    // console.log('SPComponentCommentFormElement.onReplyClose', event, this.mounted, this.state.open, this.props.uniqueId, this.checkId(event));
    if (this.mounted && this.state.open && this.checkId(event)) {
      this.setState({ open: false });
    }
  }
  /**
   * {@link CommentStatus}.COMMENT_DELETE event handler
   * - 記事へのコメント以外は dispose 処理をします
   */
  onBeforeReload() {
    // console.log('SPComponentCommentFormElement.onReplyClose', this.props.independent, this.props.uniqueId);
    if (!this.props.independent) {
      // 記事へのコメント以外は dispose 処理をする
      // this.dispose();
      this.commentDispose();
    }
  }
  /**
   * textarea.onchange event handler
   * - textarea.value を更新します
   * @param {Event} event textarea.onchange event `event.target.value` から `state.body` を更新します
   */
  onBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  /**
   * form.onsubmit event handler
   * - 入力有無をチェックしてコメント登録処理を行います
   * @param {Event} event form.onsubmit event
   */
  onSubmit(event) {
    event.preventDefault();
    const { body } = this.state;
    this.reset();
    if (body === '') {
      // not input -> error
      this.error(ErrorTxt.BODY_EMPTY);
    } else {
      // submit sequence
      this.sending();
    }
  }

  /**
   * `Model` Ajax success event handler
   * - loading を消します
   * - textarea 閉じます
   * - 入力内容を消去します
   * - {@link ReplyStatus}.COMPLETE event を発火させます
   */
  onDone() {
    const { uniqueId, commentType, articleId } = this.props;
    this.replyStatus.complete(uniqueId, commentType, articleId);
    this.ga();
    this.commentDispose();
    this.setState({ loading: '', open: false, body: '' });
  }
  /**
   * `Model` Ajax error event handler
   * - loading を消します
   */
  onFail() {
    this.commentDispose();
    this.setState({ loading: '' });
  }
  /**
   * `Model` Ajax 監視 event handler を unbind します
   */
  commentDispose() {
    const comment = this.comment;
    if (comment) {
      comment.off(Model.COMPLETE, this.onDone);
      comment.off(Model.UNDEFINED_ERROR, this.onFail);
      comment.off(Model.RESPONSE_ERROR, this.onFail);
    }
  }
  /**
   * ga tag 送信を行います
   */
  ga() {
    const { independent, articleId, url, commentId } = this.props;
    if (independent) {
      // 記事へのコメント
      Ga.add(new GaData('SPComponentCommentFormElement.onDone', 'comment', 'post', Loc.current, parseFloat(articleId)));
    } else {
      // コメントへのコメント
      Ga.add(new GaData('SPComponentCommentFormElement.onDone', 'comment', 'post - reply', url, parseFloat(commentId)));
    }
  }

  /**
   * 全ての event handler を unbind します
   */
  dispose() {
    this.setState({ loading: '', open: false });
    // comment dispose
    this.commentDispose();
    // reply
    const replyStatus = this.replyStatus;
    replyStatus.off(ReplyStatus.OPEN, this.onReplyOpen);
    replyStatus.off(ReplyStatus.CLOSE, this.onReplyClose);
    // comment
    const commentStatus = this.commentStatus;
    commentStatus.off(CommentStatus.COMMENT_DELETE, this.onBeforeReload);
  }

  /**
   * コメントへのコメント送信 event を bind します
   * - {@link ReplyStatus}.OPEN
   * - {@link ReplyStatus}.CLOSE
   * - {@link CommentStatus}.COMMENT_DELETE
   */
  listen() {
    // console.log('SPComponentCommentFormElement.listen', this.props.independent, this.props.articleId);
    if (this.props.independent) {
      return;
    }
    // reply
    const replyStatus = this.replyStatus;
    replyStatus.on(ReplyStatus.OPEN, this.onReplyOpen);
    replyStatus.on(ReplyStatus.CLOSE, this.onReplyClose);
    // comment
    const commentStatus = this.commentStatus;
    commentStatus.on(CommentStatus.COMMENT_DELETE, this.onBeforeReload);
  }

  /**
   * `props.uniqueId` と `event.id` を比較します
   * @param {{id: string}} event {@link ReplyStatus}.[OPEN|CLOSE] event
   * @return {boolean} true: 等価
   */
  checkId(event) {
    return this.props.uniqueId === event.id;
  }
  /**
   * error 表示を行います
   * @param {string} message error message
   */
  error(message) {
    this.errors.body.message = message;
    this.setState({ error: true });
  }
  /**
   * error 消去します
   */
  reset() {
    this.errors.body.reset();
    this.setState({ error: false });
  }

  /**
   * コメント送信 Ajax を行います
   * - 記事へのコメント - {@link ModelComment}
   * - コメントへのコメント - {@link ModelCommentReply}
   * - {@link ReplyStatus}.START 発火します
   */
  sending() {
    this.setState({ loading: 'loading' });
    const formElement = this.formElement;
    const formData = Form.element(formElement);
    const { uniqueId, independent, articleId, commentId } = this.props;
    this.replyStatus.start(uniqueId);
    this.commentDispose();
    const comment = independent ?
      new ModelComment(articleId, formData) :
      new ModelCommentReply(articleId, commentId, formData);
    // console.log('SPComponentCommentFormElement.sending', uniqueId, independent, articleId, commentId, comment);
    this.comment = comment;
    comment.on(Model.COMPLETE, this.onDone);
    comment.on(Model.UNDEFINED_ERROR, this.onFail);
    comment.on(Model.RESPONSE_ERROR, this.onFail);
    comment.start();
  }

  /**
   * delegate - after mount
   * - `listen` 実行します
   */
  componentDidMount() {
    this.mounted = true;
    this.listen();
  }

  /**
   * delegate - before unmount
   * - `dispose` 実行します
   */
  componentWillUnMount() {
    this.mounted = false;
    this.dispose();
  }

  /**
   * 出力処理を行います
   * @return {?XML} `div > form`
   */
  render() {
    const {
      independent,
      commentId,
      articleId,
      icon,
    } = this.props;
    const {
      open,
      loading,
      body,
    } = this.state;
    if (!independent && (!commentId || commentId === '0')) {
      console.error(`[SPComponentCommentFormElement]:render need comment Id, ${commentId} - ${articleId}`);
      return null;
    }
    // console.log('SPComponentCommentFormElement.render props', this.props);
    // console.log('SPComponentCommentFormElement.render state', this.state, open, independent);
    // output

    if (!open && !independent) {
      return null;
    }
    // render
    const picture = Safety.image(icon, Empty.USER_EMPTY);
    const loggedIn = Safety.same(picture, Empty.USER_EMPTY);
    const errorClass = this.errors.body.error ? 'error' : '';
    const errorMessage = this.errors.body.message;
    const commentClass = independent ? '' : 'comment-form';
    return (
      <div className={`${commentClass} form-root loading-root ${loading}`}>
        <form
          className="comment-form-input-textarea"
          onSubmit={this.onSubmit}
          ref={(element) => (this.formElement = element)}
        >
          <div className="comment-form-inner">
            <i className={`comment-form-user ${loggedIn}`}>
              <img src={Empty.refresh(picture)} alt=""/>
            </i>
            <div className="comment-form-comment-outer">
              <div className={`comment-form-comment-inner ${errorClass}`}>
                <textarea
                  value={body}
                  onChange={this.onBodyChange}
                  name="body"
                  cols="30"
                  rows="6"
                  className="comment-form-comment"
                  placeholder={Message.PLACEHOLDER_COMMENT}
                  autoFocus="true"
                />
                <ComponentError
                  message={errorMessage}
                />
              </div>
            </div>
          </div>
          <div className="comment-form-submit">
            <button type="submit">{Message.COMMENT_SUBMIT}</button>
          </div>
        </form>
        <div className="loading-spinner">&nbsp;</div>
      </div>
    );
  }
}
