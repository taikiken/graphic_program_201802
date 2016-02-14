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
import {ModelReply} from '../../model/comment/ModelReply';
import {Model} from '../../model/Model';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

let HiddenCommentId = React.createClass( {
  propTypes: {
    commentId: React.PropTypes.string.isRequired
  },
  render: function() {
    let commentId = this.props.commentId;
    if ( commentId === '' || commentId === '0' ) {
      return null;
    } else {
      return <input type="hidden" name="commend_id" value={this.props.commentId}/>;
    }
  }
} );

// comment form
let ReplyForm = React.createClass( {
  propTypes: {
    toggle: React.PropTypes.string.isRequired,
    independent: React.PropTypes.bool.isRequired,
    icon: React.PropTypes.string.isRequired,
    articleId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      commentId: ''
    };
  },
  getInitialState: function() {
    this.reply = null;

    return {
      loading: '',
      body: '',
      toggle: this.props.toggle
    };
  },
  render: function() {

    if ( this.state.toggle === 'open' ) {
      let picture = this.props.icon;
      if ( !picture ) {
        picture = Empty.USER_PICTURE_FEATURE;
      } else if ( !Safety.isImg(picture) ) {
        picture = Empty.USER_PICTURE_FEATURE;
      }

      return (
        <div className={'comment-form loading-root ' + this.state.loading}>
          <form onSubmit={this.onSubmit} ref="form">
            <i className="comment-form-user"><img src={picture} alt=""/></i>
            <div className="comment-form-comment-outer">
              <div className="comment-form-comment-inner">
                <textarea value={this.state.body} onChange={this.onBodyChange} name="body" cols="30" rows="6" className="comment-form-comment" placeholder="コメントを書く" />
              </div>
            </div>
            <div className="comment-form-submit">
              <input type="submit" value="コメントを投稿"/>
            </div>
            <input type="hidden" name="article_id" value={this.props.articleId}/>
            <HiddenCommentId commentId={this.props.commentId} />
          </form>
          <div className="loading-spinner">&nbsp;</div>
        </div>
      );
    } else {
      return null;
    }

  },
  componentDidMount: function() {

  },
  componentWillUnMount: function() {
    // this.setState( {loading: ''} );
  },
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
/*
    let option = {};
    option[ Model.COMPLETE ] = this.done;
    option[ Model.UNDEFINED_ERROR ] = this.done.fail;
    option[ Model.RESPONSE_ERROR ] = this.done.fail;*/

    let reply = new ModelReply( this.props.articleId, formData );
    this.reply = reply;
    reply.on( Model.COMPLETE, this.done );
    reply.on( Model.UNDEFINED_ERROR, this.fail );
    reply.on( Model.RESPONSE_ERROR, this.fail );
    reply.start();
  },
  done: function( event ) {
    console.log( 'done', event );
    this.dispose();
  },
  fail: function( event ) {
    let error = event.args[ 0 ];
    console.log( 'fail', error.message, error.result.status );
    this.dispose();
  },
  dispose: function() {
    // event unbind
    this.setState( {loading: ''} );
    let reply = this.reply;
    if ( reply !== null ) {
      reply.off( Model.COMPLETE, this.done );
      reply.off( Model.UNDEFINED_ERROR, this.fail );
      reply.off( Model.RESPONSE_ERROR, this.fail );
    }
  }
} );

// open / close anchor tag
let OpenerDom = React.createClass( {
  propTypes: {
    independent: React.PropTypes.bool.isRequired,
    staticMessage: React.PropTypes.string.isRequired,
    actionMessage: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      // reply / cancel
      toggle: 'reply'
    };
  },
  render: function() {
    if ( this.props.independent ) {
      return null;
    } else {

      if ( this.state.toggle === 'reply' ) {
        return (
          <a href="#" className="comment-respond-opener" onClick={this.openerClick}>
            <span>{this.props.actionMessage}</span>
          </a>
        );
      } else {
        return (
          <p className="comment-respond-cancel">
            <span>{this.props.staticMessage}</span>
            <a href="#" onClick={this.cancelClick}><span>キャンセル</span></a>
          </p>
        );
      }

    }
  },
  openerClick: function( event ) {
    event.preventDefault();
    this.setState( {toggle: 'cancel'} );
    this.props.callback( 'open' );
  },
  cancelClick: function( event ) {
    event.preventDefault();
    this.setState( {toggle: 'reply'} );
    this.props.callback( 'cancel' );
  }
} );

// wrapper dom + form
export let ReplyNode = React.createClass( {
  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    // コメント送信者（自分の）profile picture
    icon: React.PropTypes.string.isRequired,
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
    independent: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      commentId: '',
      commentCount: 0,
      parent: false,
      independent: false
    };
  },
  getInitialState: function() {
    this.replyStatus = null;

    return {
      toggle: this.props.independent ? 'open' : 'close',
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

    let message = 'コメント';
    let staticMessage = '';
    let actionMessage = '';
    if ( this.props.commentCount > 0 ) {
      // コメント数のみ表示
      staticMessage = `${message} (${this.props.commentCount})`;
      // 「返信」とコメント数を足す
      actionMessage = `${message}へ返信 (${this.props.commentCount})`;
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

      let commentClass = this.props.independent ? 'comment-form' : 'comment-respond';
      console.log( 'form render ', this.state.toggle, this.props.independent, this.props.articleId, this.props.commentId );

      return (
        <div className={commentClass + ' ' + this.state.toggle}>
          <OpenerDom
            independent={this.props.independent}
            staticMessage={staticMessage}
            actionMessage={actionMessage}
            callback={this.openerClick}
          />
          <ReplyForm
            toggle={this.state.toggle}
            independent={this.props.independent}
            icon={this.props.icon}
            articleId={this.props.articleId}
            commentId={this.props.commentId}
          />
        </div>
      );

    }//if

  },
  componentDidMount: function() {

    // ---------------------------
    // event bind
    let replyStatus = ReplyStatus.factory();
    replyStatus.on( ReplyStatus.OPEN, this.replyOpen );
    replyStatus.on( ReplyStatus.CLOSE, this.replyClose );
    replyStatus.on( ReplyStatus.START, this.replyStart );
    replyStatus.on( ReplyStatus.COMPLETE, this.replyComplete );
    this.replyStatus = replyStatus;

  },
  componentWillUnmount: function() {

    let replyStatus = this.replyStatus;
    replyStatus.off( ReplyStatus.OPEN, this.replyOpen );
    replyStatus.off( ReplyStatus.CLOSE, this.replyClose );
    replyStatus.off( ReplyStatus.START, this.replyStart );
    replyStatus.off( ReplyStatus.COMPLETE, this.replyComplete );

  },
  // ----------------------------------------
  bodyChange: function( event ) {
    let value = event.target.value;
    this.setState( { body: event.target.value } );
  },
  openerClick: function( status:string ) {

    switch (status) {

      case 'open':
        this.replyStatus.open( this.props.uniqueId );
        break;

      case 'close':
        this.replyStatus.close( this.props.uniqueId );
        break;

      default:
        console.warn(`status is illegal operation. ${status}`);
        break;

    }

  },
  checkId: function( event ) {

    return this.props.uniqueId === event.id;

  },
  // ----------------------------------------
  // listener
  replyOpen: function( event ) {
    let mine = this.checkId( event );
    this.setState( { open: mine } );
  },
  replyClose: function( event ) {
    let mine = this.checkId( event );
    if ( !mine ) {
      this.setState( { open: false } );
    }
  },
  replyStart: function( event ) {
    // let mine = this.checkId( event );
    this.setState( { loading: 'loading' } );
  },
  replyComplete: function( event ) {
    // let mine = this.checkId( event );
    this.setState( { loading: '' } );
  }
} );
