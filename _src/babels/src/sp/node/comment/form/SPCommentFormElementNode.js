

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

// node
import {ErrorNode} from '../../../../node/error/ErrorNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// comment form
/**
 * [SP]
 * コメント Form Element
 * 入力(textarea)と送信(input:submit)
 *
 * SPCommentFormNode
 * |- SPCommentFormElementNode
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
    commentType: React.PropTypes.string.isRequired
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

    return {
      error: false,
      loading: '',
      body: '',
      open: this.props.open
    };
  },
  render: function() {

    if ( !this.props.independent ) {
      // コメントへのコメント
      let commentId = this.props.commentId;

      if ( !commentId || commentId === '0' ) {
        throw new Error( `need comment Id ${commentId}` );
      }

    }

    if ( this.state.open || this.props.independent ) {

      // user icon
      /*
      let picture = this.props.icon;
      if ( !picture ) {
        picture = Empty.USER_EMPTY;
      } else if ( !Safety.isImg( picture ) ) {
        // 画像ファイル名に拡張子がないのがあったので
        // 拡張子チェックを追加
        if ( !Safety.isGraph( picture ) ) {
          picture = Empty.USER_EMPTY;
        }
      }

      let loggedIn = picture === Empty.USER_EMPTY ? '' : 'user-logged-in';
      */
      let picture = Safety.image( this.props.icon, Empty.USER_EMPTY );
      let loggedIn = Safety.same( picture, Empty.USER_EMPTY );

      let errorClass = ( keyName:string ) => {
        return this.errors[ keyName ].error ? 'error' : '';
      };

      let message = ( keyName:string ) => {
        return this.errors[ keyName ].message;
      };

      let commentForm = this.props.independent ? '' : 'comment-form ';

      return (
        <div className={`${commentForm}form-root loading-root ${this.state.loading}`}>
          <form onSubmit={this.onSubmit} ref="form">
            <div className="comment-form-inner">
              <i className={'comment-form-user ' + loggedIn}><img src={picture} alt=""/></i>
              <div className="comment-form-comment-outer">
                <div className={'comment-form-comment-inner ' + errorClass( 'body' )}>
                  <textarea value={this.state.body} onChange={this.onBodyChange} name="body" cols="30" rows="6" className="comment-form-comment" placeholder={Message.PLACEHOLDER_COMMENT} autoFocus="true" />
                  <ErrorNode message={message('body')} />
                </div>
              </div>
            </div>

            <div className="comment-form-submit">
              <input type="submit" value={Message.COMMENT_SUBMIT}/>
            </div>
          </form>
          {/* <div ref="commentMessage"></div> */}
          <div className="loading-spinner">&nbsp;</div>
        </div>
      );
    } else {
      return null;
    }
  },
  // ----------------------------------------
  // delegate
  componentDidMount: function() {

    this.mounted = true;
    this.listen();

  },
  componentDidUpdate: function() {
  },
  componentWillUnMount: function() {
    // console.log( '+++++++++++ componentWillUnMount +++++++++++', this.props.uniqueId );

    this.mounted = false;
    this.dispose();
  },
  // ----------------------------------------
  listen: function() {
    let replyStatus = this.replyStatus;
    // console.log( '+++++++++++ listen ', this.props.uniqueId, replyStatus );

    if ( replyStatus === null ) {

      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;

      // 記事へのコメントは閉じない
      if ( !this.props.independent ) {

        replyStatus.on( ReplyStatus.OPEN, this.replyOpen );
        replyStatus.on( ReplyStatus.CLOSE, this.replyClose );
        replyStatus.on( ReplyStatus.COMPLETE, this.beforeReload );

      }

    }

    let commentStatus = this.commentStatus;

    if ( commentStatus === null ) {
      if ( !this.props.independent ) {
        commentStatus = CommentStatus.factory();
        this.commentStatus = commentStatus;
        commentStatus.on( CommentStatus.COMMENT_DELETE, this.beforeReload );
      }
    }
  },
  // コメント送信成功後 reload するとき
  // 何もかも白紙にする
  beforeReload: function() {
    if ( !this.props.independent ) {
      // 記事へのコメント以外は dispose 処理をする
      this.dispose();
    }
  },
  // all event unbind
  dispose: function() {
    // event unbind
    this.setState( {loading: '', open: false} );
    let comment = this.comment;
    if ( comment !== null ) {
      comment.off( Model.COMPLETE, this.done );
      comment.off( Model.UNDEFINED_ERROR, this.fail );
      comment.off( Model.RESPONSE_ERROR, this.fail );
      this.comment = null;
    }

    let replyStatus = this.replyStatus;
    if ( replyStatus !== null ) {
      replyStatus.off( ReplyStatus.OPEN, this.replyOpen );
      replyStatus.off( ReplyStatus.CLOSE, this.replyClose );
      replyStatus.off( ReplyStatus.COMPLETE, this.beforeReload );
      this.replyStatus = null;
    }

    let commentStatus = this.commentStatus;
    if ( commentStatus !== null ) {
      commentStatus.off( CommentStatus.COMMENT_DELETE, this.beforeReload );
    }
  },
  // ----------------------------------------
  checkId: function( event ) {
    return this.props.uniqueId === event.id;
  },
  // ----------------------------------------
  // listener
  replyOpen: function( event ) {
    // let uniqueId = this.props.uniqueId;
    if ( this.mounted && !this.state.open && this.checkId( event ) ) {
      console.log( '*** replyOpen *** ', this.props.uniqueId, this.mounted );
      this.setState( { open: true } );
    }
  },
  replyClose: function( event ) {
    // let uniqueId = this.props.uniqueId;
    if ( this.mounted && this.state.open && this.checkId( event ) ) {
      console.log( '*** replyClose *** ', this.props.uniqueId, this.mounted );
      this.setState( { open: false } );
    }
  },
  // ----------------------------------------
  // form

  // コメント本文入力 onChance event handler
  onBodyChange: function( event ) {
    this.setState( {body: event.target.value} );
  },
  // submit button click event handler
  onSubmit: function( event ) {
    event.preventDefault();

    var body = this.state.body;
    this.reset();

    if ( body === '' ) {
      this.error( `${ErrorTxt.BODY_EMPTY}` );
    } else {
      // submit sequence
      this.sending();
    }
  },
  // show error
  error: function( message:string ) {
    this.errors.body.message = message;
    this.setState( { error: true } );
  },
  // error を非表示にし error state を false にする
  reset: function() {
    this.errors.body.reset();
    this.setState( { error: false } );
  },
  // ajax start
  sending: function() {
    this.setState( {loading: 'loading'} );
    let formNode = ReactDOM.findDOMNode(this.refs.form);
    let formData = Form.element( formNode );
    console.log( 'sending ===============', this.props.articleId, formNode, formData );

    this.replyStatus.start( this.props.uniqueId );

    let comment;
    if ( this.props.independent ) {
      // 記事へのコメント
      comment = new ModelComment( this.props.articleId, formData );
    } else {
      // コメントへのコメント
      comment = new ModelCommentReply( this.props.articleId, this.props.commentId, formData );
    }

    this.comment = comment;
    comment.on( Model.COMPLETE, this.done );
    comment.on( Model.UNDEFINED_ERROR, this.fail );
    comment.on( Model.RESPONSE_ERROR, this.fail );
    comment.start();
  },
  // コメント送信成功
  // ReplyStatus.COMPLETE event を発火させます
  // event を受信し コメント一覧を再読み込みします
  done: function( event ) {
    console.log( 'done', event );
    this.replyStatus.complete( this.props.uniqueId, this.props.commentType );
    this.setState( { body: '' } );
    this.dispose();
  },
  // コメント送信失敗
  //
  fail: function( event ) {
    let error = event.args[ 0 ];
    console.log( 'fail', error.message, error.result.status );
    // this.replyStatus.complete( this.props.uniqueId );
    this.dispose();
  }
} );
