/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11 - 16:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ReplyStatus} from '../../event/ReplyStatus';

import {Empty} from '../../app/const/Empty';
import {Form} from '../../data/Form';
import {Safety} from '../../data/Safety';
import {Result} from '../../data/Result';

// model
import {ModelComment} from '../../model/comment/ModelComment';
import {ModelCommentReply} from '../../model/comment/ModelCommentReply';
import {Model} from '../../model/Model';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

let CommentMessage = React.createClass( {
  propTypes: {
    message: React.PropTypes.string,
    messageClass: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      message: '',
      messageClass: ''
    };
  },
  getInitialState: function() {
    return {
      message: this.props.message,
      messageClass: this.props.messageClass
    };
  },
  render: function() {

    if ( this.state.message === '' ) {

      // 非表示
      return null;

    } else {

      return (
        <div className="comment-form-message">
          <div className={this.state.messageClass}>{this.state.message}</div>
        </div>
      );

    }

  },
  componentDidMount: function() {

  },
  componentWillUnMount: function() {

  },
  update: function( message:string, error:boolean = false ) {
    this.setState( { message: message, error: error ? 'error' : 'message' } );
  }
} );

// comment form
/**
 * コメント送信用 form
 */
let CommentForm = React.createClass( {
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

    this.message = null;

    this.mounted = false;

    return {
      loading: '',
      body: '',
      //open: this.props.toggle === 'open'
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

    if ( this.state.open ) {

      // user icon
      let picture = this.props.icon;
      if ( !picture ) {
        picture = Empty.USER_PICTURE_FEATURE;
      } else if ( !Safety.isImg( picture ) ) {
        picture = Empty.USER_PICTURE_FEATURE;
      }

      return (
        <div className={'form-root loading-root ' + this.state.loading}>
          <form onSubmit={this.onSubmit} ref="form">
            <i className="comment-form-user"><img src={picture} alt=""/></i>
            <div className="comment-form-comment-outer">
              <div className="comment-form-comment-inner">
                <textarea value={this.state.body} onChange={this.onBodyChange} name="body" cols="30" rows="6" className="comment-form-comment" placeholder="コメントを書く" autoFocus="true" />
              </div>
            </div>
            <div className="comment-form-submit">
              <input type="submit" value="コメントを投稿"/>
            </div>
          </form>
          <div ref="commentMessage"></div>
          <div className="loading-spinner">&nbsp;</div>
        </div>
      );
    } else {
      return null;
    }
    /*
    // user icon
    let picture = this.props.icon;
    if ( !picture ) {
      picture = Empty.USER_PICTURE_FEATURE;
    } else if ( !Safety.isImg( picture ) ) {
      picture = Empty.USER_PICTURE_FEATURE;
    }

    console.log( 'render form +++ ', this.state.open, this.props.uniqueId );

    return (
      <div className={this.state.open ? 'form-open' : 'form-close'}>
        <div className={'form-root loading-root ' + this.state.loading}>
          <form onSubmit={this.onSubmit} ref="form">
            <i className="comment-form-user"><img src={picture} alt=""/></i>
            <div className="comment-form-comment-outer">
              <div className="comment-form-comment-inner">
                <textarea value={this.state.body} onChange={this.onBodyChange} name="body" cols="30" rows="6" className="comment-form-comment" placeholder="コメントを書く" autoFocus="true" />
              </div>
            </div>
            <div className="comment-form-submit">
              <input type="submit" value="コメントを投稿"/>
            </div>
          </form>
          <div ref="commentMessage"></div>
          <div className="loading-spinner">&nbsp;</div>
        </div>
      </div>
    );
    */
  },
  // ----------------------------------------
  // delegate
  componentDidMount: function() {

    this.mounted = true;
    let replyStatus = this.replyStatus;
    console.log( '+++++++++++ componentDidMount ', this.props.uniqueId, replyStatus );

    if ( replyStatus === null ) {
      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;

      // 記事へのコメントは閉じない
      if ( !this.props.independent ) {

        replyStatus.on( ReplyStatus.OPEN, this.replyOpen );
        replyStatus.on( ReplyStatus.CLOSE, this.replyClose );

      }
    }

  },
  componentDidUpdate: function() {
    /*
    let replyStatus = this.replyStatus;

    if ( replyStatus === null ) {
      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;

      // 記事へのコメントは閉じない
      if ( !this.props.independent ) {

        replyStatus.on( ReplyStatus.OPEN, this.replyOpen );
        replyStatus.on( ReplyStatus.CLOSE, this.replyClose );

      }
    }
    */
  },
  componentWillUnMount: function() {
    console.log( '---------- componentWillUnMount ', this.props.uniqueId );
    this.mounted = false;
    this.dispose();
  },
  // ----------------------------------------
  // all event unbind
  dispose: function() {
    // event unbind
    this.setState( {loading: ''} );
    let comment = this.comment;
    if ( comment !== null ) {
      comment.off( Model.COMPLETE, this.done );
      comment.off( Model.UNDEFINED_ERROR, this.fail );
      comment.off( Model.RESPONSE_ERROR, this.fail );
    }

    let replyStatus = this.replyStatus;
    if ( replyStatus !== null ) {
      if ( !this.props.independent ) {
        replyStatus.off( ReplyStatus.OPEN, this.replyOpen );
        replyStatus.off( ReplyStatus.CLOSE, this.replyClose );
        this.replyStatus = null;
      }
    }
  },
  // ----------------------------------------
  checkId: function( event ) {
    return this.props.uniqueId === event.id;
  },
  // ----------------------------------------
  // listener
  replyOpen: function( event ) {
    /*
    if ( this.state ) {
      if ( !this.state.open && this.checkId( event ) ) {
        try {
          this.setState( { open: true } );
        } catch ( error ) {
          console.log( `open state error ${this.props.uniqueId}`, error );
        }
      }
    }*/
    let uniqueId = this.props.uniqueId;
    if ( this.mounted && !this.state.open && this.checkId( event ) ) {
      console.log( '*** replyOpen *** ', this.props.uniqueId, this.mounted );
      this.setState( { open: true }, function() {
        console.log( 'after setState open', uniqueId );
      } );
    }
  },
  replyClose: function( event ) {
    /*
    if ( this.state ) {
      if ( this.state.open && this.checkId( event ) ) {
        try {
          this.setState( { open: false } );
        } catch ( error ) {
          console.log( `close state error ${this.props.uniqueId}`, error );
        }
      }
    }
    */
    let uniqueId = this.props.uniqueId;
    if ( this.mounted && this.state.open && this.checkId( event ) ) {
      console.log( '*** replyClose *** ', this.props.uniqueId, this.mounted );
      this.setState( { open: false }, function() {
        console.log( 'after setState close ', uniqueId );
      } );
    }
  },
  // ----------------------------------------
  // form
  onBodyChange: function( event ) {
    this.setState( {body: event.target.value} );
  },
  onSubmit: function( event ) {
    event.preventDefault();

    var body = this.state.body;

    if ( body === '' ) {
      this.error( 'コメントは必須入力です！' );
    } else {
      // submit sequence
      this.sending();
    }
  },
  // show error
  error: function( message:string ) {
    throw new Error(message);
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
  done: function( event ) {
    console.log( 'done', event );
    this.replyStatus.complete( this.props.uniqueId, this.props.commentType );
    this.setState( { body: '' } );
    this.dispose();
  },
  fail: function( event ) {
    let error = event.args[ 0 ];
    console.log( 'fail', error.message, error.result.status );
    this.replyStatus.complete( this.props.uniqueId );
    this.dispose();
  }
} );

// open / close anchor tag
let OpenerDom = React.createClass( {
  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    independent: React.PropTypes.bool.isRequired,
    staticMessage: React.PropTypes.string.isRequired,
    actionMessage: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    this.replyStatus = null;
    this.canOpen = true;

    return {
      // reply / cancel
      toggle: 'reply'
    };
  },
  render: function() {
    // console.log( 'comment-respond-opener independent ', this.state.toggle, this.props.independent );

    if ( this.props.independent ) {
      return null;
    } else {
      // console.log( 'comment-respond-opener ', this.state.toggle, this.props.uniqueId );
      if ( this.state.toggle === 'reply' ) {
        return (
          <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.openerClick}>
            <span className="icon-comment">{this.props.actionMessage}</span>
          </a>
        );
      } else if ( this.state.toggle === 'cancel' ) {
        return (
          <p className="comment-respond-opener comment-respond-cancel">
            <span className="icon-comment">{this.props.staticMessage}</span>
            <a href="#" onClick={this.cancelClick}><i className="icon-cancel">キャンセル</i></a>
          </p>
        );
      } else {
        return null;
      }

    }
  },
  componentDidMount: function() {

    // ---------------------------
    // event bind
    let replyStatus = this.replyStatus;

    if ( replyStatus === null ) {

      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;

      if ( !this.props.independent ) {
        replyStatus.on( ReplyStatus.OPEN, this.replyOpen );
        replyStatus.on( ReplyStatus.CLOSE, this.replyClose );
      }

      replyStatus.on( ReplyStatus.START, this.replyStart );
      replyStatus.on( ReplyStatus.COMPLETE, this.replyComplete );

    }

  },
  componentWillUnmount: function() {

    let replyStatus = this.replyStatus;

    if ( replyStatus !== null ) {

      if ( !this.props.independent ) {
        replyStatus.off( ReplyStatus.OPEN, this.replyOpen );
        replyStatus.off( ReplyStatus.CLOSE, this.replyClose );
      }

      replyStatus.off( ReplyStatus.START, this.replyStart );
      replyStatus.off( ReplyStatus.COMPLETE, this.replyComplete );
      this.replyStatus = null;

    }

  },
  // ----------------------------------------
  // open / cancel click handler
  openerClick: function( event ) {
    event.preventDefault();

    console.log( '************** opener click ****************** ', this.props.uniqueId );

    if ( !this.canOpen ) {
      return;
    }

    this.willOpen();
    this.replyStatus.open( this.props.uniqueId );
  },
  cancelClick: function( event ) {
    event.preventDefault();

    if ( !this.canOpen ) {
      return;
    }

    this.willClose();
    this.replyStatus.close( this.props.uniqueId );
  },
  willOpen: function() {
    this.setState( {toggle: 'cancel'} );
    // this.props.callback( 'open' );
  },
  willClose: function() {
    this.setState( {toggle: 'reply'} );
    // this.props.callback( 'close' );
  },
  // ----------------------------------------
  checkId: function( event ) {

    return this.props.uniqueId === event.id;

  },
  // ----------------------------------------
  // listener
  replyOpen: function( event ) {

  },
  replyClose: function( event ) {

  },
  replyStart: function( event ) {
    this.cancelClick = false;
  },
  replyComplete: function( event ) {
    this.cancelClick = true;
  }
} );

// wrapper dom + form
export let CommentFormNode = React.createClass( {
  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    // open / close, default close
    toggle: React.PropTypes.string,
    // コメント送信者（自分の）profile picture
    icon: React.PropTypes.string,
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // コメント id（オプション）
    commentId: React.PropTypes.string,
    // コメント数 default 0
    commentCount: React.PropTypes.number,
    // ログインの有無
    sign: React.PropTypes.bool.isRequired,
    // 親コメント? default false
    parent: React.PropTypes.bool,
    // 記事へのコメント送信 default false
    independent: React.PropTypes.bool,
    // コメント種類
    commentType: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      toggle: 'close',
      icon: '',
      commentId: '',
      commentCount: 0,
      parent: false,
      independent: false
    };
  },
  getInitialState: function() {
    this.replyStatus = null;
    this.canOpen = true;

    return {
      // form 表示初期値, 記事コメント以外は閉じる
      // toggle: this.props.independent ? 'open' : 'close',
      loading: '',
      body: ''
    };
  },
  render: function() {

    let sign = this.props.sign;
    // ----------------------------
    // dom

    if ( !sign || (!this.props.parent && !this.props.independent) ) {
      // not parent, not independent
      // 表示しない, 下に空きを作るための空タグのみ
      return <div className="comment-respond"></div>;
    }

    // -------------------------
    // prent or independent 何かを表示する
    let toggle = this.props.toggle;
    if ( this.props.independent ) {
      toggle = 'open';
    }

    let message = 'コメント';
    // コメント数のみ表示
    let staticMessage = '';
    // 返信アクション付きコメント数
    let actionMessage = `${message}へ返信`;
    if ( this.props.commentCount > 0 ) {
      // コメント数のみ表示
      staticMessage = `${message} (${this.props.commentCount})`;
      // 「返信」とコメント数
      actionMessage = `${actionMessage} (${this.props.commentCount})`;
    }

    if ( !sign ) {
      // 非ログイン
      return (
        <div className="comment-respond">
          <p className="comment-respond-opener"><span>{staticMessage}</span></p>
        </div>
      );
    } else {
      // ログイン
      // ログインユーザーのみフォームを表示する

      let commentClass = this.props.independent ? 'comment-form' : 'comment-respond';

      return (
        <div className={commentClass + ' comment-root'}>
          <OpenerDom
            uniqueId={this.props.uniqueId}
            independent={this.props.independent}
            staticMessage={staticMessage}
            actionMessage={actionMessage}
            callback={this.openerClick}
          />
          <CommentForm
            uniqueId={this.props.uniqueId}
            toggle={toggle}
            open={toggle === 'open'}
            independent={this.props.independent}
            icon={this.props.icon}
            articleId={this.props.articleId}
            commentId={this.props.commentId}
            commentType={this.props.commentType}
          />
        </div>
      );

    }//if

  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  // ----------------------------------------
  bodyChange: function( event ) {
    // textarea value
    this.setState( { body: event.target.value } );
  },
  openerClick: function( status:string ) {
    console.log( '********** root openerClick ', this.props.uniqueId, status );
    // open / close が opener から送られてくる
    // this.setState( { toggle: status } );

  }
} );
