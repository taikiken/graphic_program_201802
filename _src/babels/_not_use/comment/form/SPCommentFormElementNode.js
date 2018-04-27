

// app
import {Empty} from '../../../../app/const/Empty';
import {ErrorTxt} from '../../../../app/const/ErrorTxt';
import {Message} from '../../../../app/const/Message';

// data
import {Form} from '../../../../data/Form';
import {ErrorMessage} from '../../../../data/ErrorMessage';
import {Safety} from '../../../../data/Safety';

// event
import {ReplyStatus} from '../../../../event/ReplyStatus';
import {CommentStatus} from '../../../../event/CommentStatus';

// model
import {ModelComment} from '../../../../model/comment/ModelComment';
import {ModelCommentReply} from '../../../../model/comment/ModelCommentReply';
import {Model} from '../../../../model/Model';

// // node
// import {ErrorNode} from '../../../../node/error/ErrorNode';

// util
import {Loc} from '../../../../util/Loc';

// Ga
import {Ga} from '../../../../ga/Ga';
import {GaData} from '../../../../ga/GaData';
import ComponentError from '../../../../component/error/ComponentError';

// React
/**
 * [library] - React
 */
const React = self.React;
// let ReactDOM = self.ReactDOM;

// comment form
/**
 * @deprecated 2017-12-25 instead use {@link SPComponentCommentFormElement}
 * @TODO future remove
 * <p>[SP]<br>
 * コメント Form Element<br>
 * 入力(textarea)と送信(input:submit)</p>
 *
 * <pre>
 * SPCommentFormNode
 * |- SPCommentFormElementNode
 * </pre>
 * @type {ReactClass} コメント送信フォーム
 */
export let SPCommentFormElementNode = React.createClass( {
  propTypes: {
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
    // コメント詳細URL for ga
    url: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      commentId: ''
    };
  },
  getInitialState: function() {
    // ModelComment / ModelCommentReply instance
    this.comment = null;
    // ReplyStatus instance
    // form の表示非表示
    // active / inactive
    // などの UI に使用します
    this.replyStatus = null;

    this.commentStatus = null;
    // this.message = null;

    this.mounted = false;

    this.errors = {
      body: new ErrorMessage()
    };

    this.this.formElement = null;
    return {
      error: false,
      loading: '',
      body: '',
      open: this.props.open
    };
  },
  // ----------------------------------------
  listen: function() {
    let replyStatus = this.replyStatus;
    // console.log( '+++++++++++ listen ', this.props.uniqueId, replyStatus );
    if (replyStatus === null) {
      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;
      // 記事へのコメントは閉じない
      if (!this.props.independent) {
        replyStatus.on(ReplyStatus.OPEN, this.replyOpen);
        replyStatus.on(ReplyStatus.CLOSE, this.replyClose);
        // dispose しない - reload しても mount しないから - 2017-12-05
        // replyStatus.on( ReplyStatus.COMPLETE, this.beforeReload );
      }
    }
    // comment status
    let commentStatus = this.commentStatus;
    if (commentStatus === null) {
      if (!this.props.independent) {
        commentStatus = CommentStatus.factory();
        this.commentStatus = commentStatus;
        commentStatus.on(CommentStatus.COMMENT_DELETE, this.beforeReload);
      }
    }
  },
  // コメント送信成功後 reload するとき
  // 何もかも白紙にする
  beforeReload: function() {
    if ( !this.props.independent ) {
      // 記事へのコメント以外は dispose 処理をする
      // this.dispose();
      this.commentDispose();
    }
  },
  commentDispose: function() {
    const comment = this.comment;
    if (comment) {
      comment.off(Model.COMPLETE, this.done);
      comment.off(Model.UNDEFINED_ERROR, this.fail);
      comment.off(Model.RESPONSE_ERROR, this.fail);
    }
  },
  // all event unbind
  dispose: function() {
    // event unbind
    this.setState({ loading: '', open: false });
    // let comment = this.comment;
    // if ( comment !== null ) {
    //   comment.off( Model.COMPLETE, this.done );
    //   comment.off( Model.UNDEFINED_ERROR, this.fail );
    //   comment.off( Model.RESPONSE_ERROR, this.fail );
    //   // this.comment = null;
    // }
    this.commentDispose();

    const replyStatus = this.replyStatus;
    if (replyStatus !== null) {
      replyStatus.off(ReplyStatus.OPEN, this.replyOpen);
      replyStatus.off(ReplyStatus.CLOSE, this.replyClose);
      // dispose しない - reload しても mount しないから - 2017-12-05
      // replyStatus.off(ReplyStatus.COMPLETE, this.beforeReload);
      // this.replyStatus = null;
    }

    const commentStatus = this.commentStatus;
    if (commentStatus !== null) {
      commentStatus.off(CommentStatus.COMMENT_DELETE, this.beforeReload);
    }
  },
  // ----------------------------------------
  checkId: function(event) {
    return this.props.uniqueId === event.id;
  },
  // ----------------------------------------
  // listener
  replyOpen: function(event) {
    // let uniqueId = this.props.uniqueId;
    if (this.mounted && !this.state.open && this.checkId(event)) {
      // console.log( '*** replyOpen *** ', this.props.uniqueId, this.mounted );
      this.setState({ open: true });
    }
  },
  replyClose: function(event) {
    // let uniqueId = this.props.uniqueId;
    if (this.mounted && this.state.open && this.checkId(event)) {
      // console.log( '*** replyClose *** ', this.props.uniqueId, this.mounted );
      this.setState({ open: false });
    }
  },
  // ----------------------------------------
  // form
  // コメント本文入力 onChance event handler
  onBodyChange: function(event) {
    this.setState({ body: event.target.value });
  },
  // submit button click event handler
  onSubmit: function(event) {
    event.preventDefault();
    const body = this.state.body;
    this.reset();
    if (body === '') {
      this.error(`${ErrorTxt.BODY_EMPTY}`);
    } else {
      // submit sequence
      this.sending();
    }
  },
  // show error
  error: function(message) {
    this.errors.body.message = message;
    this.setState({ error: true });
  },
  // error を非表示にし error state を false にする
  reset: function() {
    this.errors.body.reset();
    this.setState({ error: false });
  },
  // ajax start
  sending: function() {
    this.setState({ loading: 'loading' });
    // const formNode = ReactDOM.findDOMNode(this.refs.form);
    const formNode = this.formElement;
    const formData = Form.element(formNode);
    // console.log( 'sending ===============', this.props.articleId, formNode, formData );

    this.replyStatus.start(this.props.uniqueId);

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
    comment.on(Model.COMPLETE, this.done);
    comment.on(Model.UNDEFINED_ERROR, this.fail);
    comment.on(Model.RESPONSE_ERROR, this.fail);
    comment.start();
  },
  // コメント送信成功
  // ReplyStatus.COMPLETE event を発火させます
  // event を受信し コメント一覧を再読み込みします
  done: function(/* event */) {
    // console.log( 'done', event );
    // @since 2016-11-05, articleId added
    this.replyStatus.complete(this.props.uniqueId, this.props.commentType, this.props.articleId);
    // this.setState( { body: '' } );
    // ----------------------------------------------
    // GA 計測タグ
    if (this.props.independent) {
      // 記事へのコメント
      Ga.add(new GaData('SPCommentFormElementNode.done', 'comment', 'post', Loc.current, parseFloat(this.props.articleId)));
    } else {
      // コメントへのコメント
      Ga.add(new GaData('SPCommentFormElementNode.done', 'comment', 'post - reply', this.props.url, parseFloat(this.props.commentId)));
    }
    // ----------------------------------------------
    // this.dispose();
    // dispose しない - reload しても mount しないから - 2017-12-05
    this.commentDispose();
    this.setState({ loading: '', open: false, body: '' });
  },
  // コメント送信失敗
  //
  fail: function(/* event */) {
    // let error = event.args[ 0 ];
    // console.log( 'fail', error.message, error.result.status );
    // this.replyStatus.complete( this.props.uniqueId );
    // this.dispose();
    // dispose しない - reload しても mount しないから - 2017-12-05
    this.commentDispose();
    this.setState({ loading: '', open: false });
  },
  // ----------------------------------------
  // delegate
  componentDidMount: function() {
    this.mounted = true;
    this.listen();
  },
  // componentDidUpdate: function() {
  // },
  componentWillUnMount: function() {
    this.mounted = false;
    this.dispose();
  },
  render: function() {
    if ( !this.props.independent ) {
      // コメントへのコメント
      const commentId = this.props.commentId;
      if (!commentId || commentId === '0') {
        throw new Error(`need comment Id ${commentId}`);
      }
    }

    if (this.state.open || this.props.independent) {
      // user icon
      const picture = Safety.image(this.props.icon, Empty.USER_EMPTY);
      const loggedIn = Safety.same(picture, Empty.USER_EMPTY);

      // inner methods
      // error 表示する？
      const errorClass = ( keyName:string ) => {
        return this.errors[ keyName ].error ? 'error' : '';
      };
      // error message を表示する？
      const message = ( keyName:string ) => {
        return this.errors[ keyName ].message;
      };

      let commentForm = this.props.independent ? '' : 'comment-form ';

      return (
        <div className={`${commentForm}form-root loading-root ${this.state.loading}`}>
          <form
            onSubmit={this.onSubmit}
            ref={(element) => (this.formElement = element)}
          >
            <div className="comment-form-inner">
              <i className={'comment-form-user ' + loggedIn}><img src={Empty.refresh(picture)} alt=""/></i>
              <div className="comment-form-comment-outer">
                <div className={'comment-form-comment-inner ' + errorClass( 'body' )}>
                  <textarea value={this.state.body} onChange={this.onBodyChange} name="body" cols="30" rows="6" className="comment-form-comment" placeholder={Message.PLACEHOLDER_COMMENT} autoFocus="true" />
                  <ComponentError message={message('body')} />
                </div>
              </div>
            </div>

            <div className="comment-form-submit">
              <button type="submit">{Message.COMMENT_SUBMIT}</button>
            </div>
          </form>
          {/* <div ref="commentMessage"></div> */}
          <div className="loading-spinner">&nbsp;</div>
        </div>
      );
    }
    return null;
  },
});
