/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/06 - 16:18
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentFormElementNode

import { ErrorMessage } from '../../../data/ErrorMessage';
import { ReplyStatus } from '../../../event/ReplyStatus';
import { CommentStatus } from '../../../event/CommentStatus';
import { Model } from '../../../model/Model';
import { ErrorTxt } from '../../../app/const/ErrorTxt';
import { Form } from '../../../data/Form';
import { ModelCommentReply } from '../../../model/comment/ModelCommentReply';
import { ModelComment } from '../../../model/comment/ModelComment';
import { Ga } from '../../../ga/Ga';
import { GaData } from '../../../ga/GaData';
import { Loc } from '../../../util/Loc';
import { Safety } from '../../../data/Safety';
import { Message } from '../../../app/const/Message';
import { Empty } from '../../../app/const/Empty';
// error
import ComponentError from '../../error/ComponentError';

// React
const React = self.React;

/**
 * comment form を出力し送信します
 * @since 2017-12-06
 */
export default class ComponentCommentFormElement extends React.Component {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * React.propTypes
   * - uniqueId {string} - 識別子
   * - toggle {string} - open / close 状態 text
   * - open {boolean} - open flag
   * - independent {boolean} - 記事へのコメント flag
   * - icon {string} - user icon path
   * - articleId {string} - 記事 ID
   * - commentId {string} - comment ID
   * - commentType {string} - comment 種別, official / normal / self
   * @returns {{
   *   uniqueId: string,
   *   toggle: string,
   *   open: boolean,
   *   independent: boolean,
   *   icon: string,
   *   articleId: string,
   *   commentId: string,
   *   commentType: string,
   *   url
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
      // コメント Id オプション
      commentId: React.PropTypes.string,
      // コメント
      commentType: React.PropTypes.string.isRequired,
      // コメント詳細 URL
      url: React.PropTypes.string.isRequired,
    };
  }
  /**
   * React.defaultProps
   * - commentId {string} - comment ID - コメントへの返信時にしか付与されないので option 扱い
   * @returns {{commentId: string}} React.defaultProps
   */
  static get defaultProps() {
    return {
      commentId: '',
    };
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * comment form 準備を行います
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // -----
    /**
     * comment 送信 `model` instance
     * @type {?ModelComment|?ModelCommentReply}
     */
    this.comment = null;
    /**
     * 投稿欄 open / close 監視インスタンス
     * @type {ReplyStatus}
     */
    this.replyStatus = ReplyStatus.factory();
    /**
     * コメント送信状態管理インスタンス
     * @type {CommentStatus}
     */
    this.commentStatus = CommentStatus.factory();
    /**
     * did mount flag
     * @type {boolean}
     * @default false
     */
    this.mounted = false;
    /**
     * error message - no argument なので使用されていないかも
     * @type {{body: ErrorMessage}}
     */
    this.errors = {
      body: new ErrorMessage()
    };
    /**
     * React.state
     * @type {{error: boolean, loading: string, body: string, open: boolean}}
     */
    this.state = {
      error: false,
      loading: '',
      body: '',
      open: props.open,
    };
    /**
     * form element - submit 後に送信データを作成するのに使用します
     * @type {?Element}
     */
    this.form = null;
    /**
     * bind onBodyChange - textarea change event handler
     * @type {function}
     */
    this.onBodyChange = this.onBodyChange.bind(this);
    /**
     * bind onSubmit - submit event handler
     * @type {function}
     */
    this.onSubmit = this.onSubmit.bind(this);
    // /**
    //  * form comment element - submit 後に送信データを作成するのに使用します
    //  * @type {?Element}
    //  */
    // this.commentMessage = null;
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
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * 記事へのコメント以外は event watch 開始します
   * - {@link ReplyStatus}.[OPEN|CLOSE]
   * - {@link CommentStatus}.COMMENT_DELETE
   */
  listen() {
    // 記事へのコメント投稿欄は閉じないので event watch しない
    if (!this.props.independent) {
      const replyStatus = this.replyStatus;
      replyStatus.off(ReplyStatus.OPEN, this.onReplyOpen);
      replyStatus.off(ReplyStatus.CLOSE, this.onReplyClose);
      // ---
      replyStatus.on(ReplyStatus.OPEN, this.onReplyOpen);
      replyStatus.on(ReplyStatus.CLOSE, this.onReplyClose);
      // dispose しない - reload しても mount しないから - 2017-12-05
      // replyStatus.on( ReplyStatus.COMPLETE, this.onBeforeReload );
      // comment status
      const commentStatus = this.commentStatus;
      commentStatus.off(CommentStatus.COMMENT_DELETE, this.onBeforeReload);
      // ---
      commentStatus.on(CommentStatus.COMMENT_DELETE, this.onBeforeReload);
    }
  }
  /**
   * 記事へのコメント以外は {@link CommentStatus} dispose 処理をします
   * */
  onBeforeReload() {
    if (!this.props.independent) {
      // 記事へのコメント以外は dispose 処理をする
      // this.dispose();
      this.commentDispose();
    }
  }
  /**
   * {@link Model} dispose 処理をします
   * */
  commentDispose() {
    const comment = this.comment;
    if (comment) {
      comment.off(Model.COMPLETE, this.onDone);
      comment.off(Model.UNDEFINED_ERROR, this.onFail);
      comment.off(Model.RESPONSE_ERROR, this.onFail);
    }
  }
  /**
   * event unbind します
   * - {@link ReplyStatus}.[OPEN|CLOSE]
   * - {@link CommentStatus}.COMMENT_DELETE
   * - {@link Model}
   * state 更新します
   * - loading: ''
   * - open: false
   * */
  dispose() {
    // event unbind
    this.setState({ loading: '', open: false });
    this.commentDispose();
    const replyStatus = this.replyStatus;
    if (replyStatus !== null) {
      replyStatus.off(ReplyStatus.OPEN, this.onReplyOpen);
      replyStatus.off(ReplyStatus.CLOSE, this.onReplyClose);
      // dispose しない - reload しても mount しないから - 2017-12-05
      // replyStatus.off( ReplyStatus.COMPLETE, this.onBeforeReload );
    }

    const commentStatus = this.commentStatus;
    if (commentStatus !== null) {
      commentStatus.off(CommentStatus.COMMENT_DELETE, this.onBeforeReload);
    }
  }
  /**
   * uniqueId と event.id を比較し等価チェックを行います
   * @param {{id : string}} event チェック対象イベント
   * @returns {boolean} true: 等価
   * */
  checkId(event) {
    return this.props.uniqueId === event.id;
  }
  /**
   * 投稿欄を開きます
   * - mounted: true
   * - state.open: true
   * - event.id - uniqueId 等価
   * @param {{id: string}} event 通知イベント
   * */
  onReplyOpen(event) {
    // console.log('ComponentCommentFormElement.onReplyOpen', this.props.uniqueId, this.props.commentType, this.mounted, this.mounted, this.checkId(event), event);
    if (this.mounted && !this.state.open && this.checkId(event)) {
      this.setState({ open: true });
    }
  }
  /**
   * 投稿欄を閉じます
   * - mounted: true
   * - state.open: false
   * - event.id - uniqueId 等価
   * @param {{id: string}} event 通知イベント
   * */
  onReplyClose(event) {
    // console.log('ComponentCommentFormElement.onReplyClose', this.props.uniqueId, this.props.commentType, this.mounted, this.mounted, this.checkId(event), event);
    if (this.mounted && this.state.open && this.checkId(event)) {
      this.setState({ open: false });
    }
  }
  /**
   * textarea.onchange で表示を更新します
   * @param {Event} event textarea.onchange evnt
   * */
  onBodyChange(event) {
    this.setState({ body: event.target.value });
  }
  /**
   * form.onsubmit event handler
   * - 入力チェックを行います
   * - valid なら `sending` 実行し送信を行います
   * @param {Event} event submit Event
   * */
  onSubmit(event) {
    event.preventDefault();
    this.reset();
    const body = this.state.body;
    if (body === '') {
      this.error(`${ErrorTxt.BODY_EMPTY}`);
    } else {
      // submit sequence
      this.sending();
    }
  }
  /**
   * error 時の `className` を生成します
   * @param {string} keyName `body`
   * @returns {string} `error` className を返します
   */
  errorClass(keyName) {
    const errors = this.errors[keyName];
    return errors && errors.error ? 'error' : '';
  }
  /**
   * error message を取得します
   * @param {string} keyName `body`
   * @returns {string} {@link ErrorMessage} - 使われていない様子
   */
  message(keyName) {
    const errors = this.errors[keyName];
    return errors && errors.message ? errors.message : '';
  }
  /**
   * エラー表示を行います
   * @param {string} message 表示メッセージ
   * */
  error(message) {
    this.errors.body.message = message;
    this.setState({ error: true });
  }
  /**
   * 初期表示に戻します
   * */
  reset() {
    this.errors.body.reset();
    this.setState({ error: false });
  }
  /**
   * Ajax コメント送信を行います
   * - Model event を bind します
   * - 記事へのコメント - {@link ModelComment}
   * - コメントへのコメント - {@link ModelCommentReply}
   * */
  sending() {
    const formNode = this.form;
    if (!formNode) {
      return;
    }
    this.setState({ loading: 'loading' });
    const formData = Form.element(formNode);

    const replyStatus = this.replyStatus;
    if (replyStatus) {
      replyStatus.start(this.props.uniqueId);
    }

    this.commentDispose();
    let comment;
    if (this.props.independent) {
      // 記事へのコメント
      comment = new ModelComment(this.props.articleId, formData);
    } else {
      // コメントへのコメント
      comment = new ModelCommentReply(this.props.articleId, this.props.commentId, formData);
    }

    this.comment = comment;
    this.commentDispose();
    comment.on(Model.COMPLETE, this.onDone);
    comment.on(Model.UNDEFINED_ERROR, this.onFail);
    comment.on(Model.RESPONSE_ERROR, this.onFail);
    comment.start();
  }
  /**
   * GA 計測タグを送信します - {@link Ga}, {@link GaData}
   * */
  ga() {
    // ----------------------------------------------
    // GA 計測タグ
    if (this.props.independent) {
      // 記事へのコメント
      Ga.add(new GaData('CommentFormElementNode.onDone', 'comment', 'post', Loc.current, parseFloat(this.props.articleId)));
    } else {
      // コメントへのコメント
      Ga.add(new GaData('CommentFormElementNode.onDone', 'comment', 'post - reply', this.props.url, parseFloat(this.props.commentId)));
    }
    // ----------------------------------------------
  }
  /**
   * コメント送信成功,
   * {@link Model}.COMPLETE event handler
   * - `ga` GA 送信
   * - `commentDispose` event unbind
   * */
  onDone() {
    const replyStatus = this.replyStatus;
    if (replyStatus) {
      replyStatus.complete(this.props.uniqueId, this.props.commentType, this.props.articleId);
    }
    this.ga();
    // ----------------------------------------------
    // this.dispose();
    // dispose しない - reload しても mount しないから - 2017-12-05
    this.commentDispose();
    this.setState({ loading: '', open: false, body: '' });
  }
  /**
   * コメント送信成功,
   * {@link Model}.[UNDEFINED_ERROR|RESPONSE_ERROR] event handler
   * - `commentDispose` event unbind
   * */
  onFail() {
    this.commentDispose();
    this.setState({ loading: '', open: false });
  }
  // ----------------------------------------------
  // delegate
  /**
   * did mount - event 監視を開始
   * - `listen` 実行
   * - mounted: true
   * */
  componentDidMount() {
    this.mounted = true;
    this.listen();
  }
  /**
   * unmount 前に `dispose` します
   * */
  componentWillUnMount() {
    this.mounted = false;
    this.dispose();
  }
  /**
   * 投稿欄を出力します
   * @returns {?XML} `div.comment-form`
   * */
  render() {
    const {
      // uniqueId,
      // toggle,
      independent,
      icon,
      // articleId,
      commentId,
      // commentType,
      // url,
    } = this.props;
    // ---
    const {
      // error,
      loading,
      body,
      open,
    } = this.state;
    // console.log('ComponentCommentFormElement.render', this.props.uniqueId, this.props.commentType, open, independent);
    // ---
    if (!independent) {
      // コメントへのコメント
      if (!commentId || commentId === '0') {
        throw new Error(`need comment Id ${commentId}`);
      }
    }
    if (!open && !independent) {
      return null;
    }

    // user icon
    const picture = Safety.image(icon, Empty.USER_EMPTY);
    const loggedIn = Safety.same(picture, Empty.USER_EMPTY);

    // inner methods
    // error 表示する？
    // const errorClass = ( keyName:string ) => {
    //   return this.errors[ keyName ].error ? 'error' : '';
    // };
    // error message を表示する？
    // const message = ( keyName:string ) => {
    //   return this.errors[ keyName ].message;
    // };

    // @since 2016-09-01
    // https://github.com/undotsushin/undotsushin/issues/1053
    // タグ構造見直し
    return (
      <div className={`comment-form form-root loading-root ${loading}`}>
        <form
          onSubmit={this.onSubmit}
          ref={(element) => (this.form = element)}
        >
          <div className="comment-form-comment-outer1">
            <i className={'comment-form-user ' + loggedIn}><img src={Empty.refresh(picture)} alt="" /></i>
            <div className="comment-form-comment-outer2">
              <div className={`comment-form-comment-inner ${this.errorClass('body')}`}>
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
                  message={this.message('body')}
                />
              </div>
            </div>
          </div>
          <div className="comment-form-submit">
            <button type="submit" value="send">{Message.COMMENT_SUBMIT}</button>
          </div>
        </form>
        {/*
        <div ref={(element) => (this.commentMessage = element)} />
        */}
        <div className="loading-spinner">&nbsp;</div>
      </div>
    );
  }
}
