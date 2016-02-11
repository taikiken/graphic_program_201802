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

// React
let React = self.React;
// let ReactDOM = self.ReactDOM;

export let FormReply = React.createClass( {
  propType: {
    // unique id（識別のために必要）
    id: React.PropTypes.string.isRequired,
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
    independent: React.PropTypes.bool,
    // フォームをopen（表示）するか default false
    open: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      commentId: '',
      commentCount: 0,
      parent: false,
      independent: false,
      open: false
    };
  },
  getInitialState: function() {
    this.replyStatus = null;

    return {
      open: this.props.open,
      loading: ''
    };
  },
  render: function() {

    let sign = this.props.sign;
    if ( !sign ) {
      // 非ログインはコメント送信できない
      // 処理中止
      return null;
    }

    let parent = this.props.parent;
    if ( !parent ) {
      // コメントのはコメント送信できない
      // 処理中止
      return null;
    }

    // ----------------------------
    // dom
    let message = 'コメントへ返信';
    if ( this.props.commentCount > 0 ) {
      // コメント数を後ろに足す
      message += ` (${this.props.commentCount})`;
    }
    
    let commentForm = '';

    if ( this.state.open ) {

      let commentId = '';
      if ( !!this.props.commentId ) {
        commentId = <input type="hidden" name="commend_id" value={this.props.commentId}/>;
      }

      commentForm = <div className={'comment-form ' + this.state.loading}>
        <form action="" onSubmit={this.submitClick} ref="form">
          <i className="comment-form-user"><img src={this.props.icon} alt=""/></i>
          <div className="comment-form-comment-outer">
            <div className="comment-form-comment-inner">
              <textarea ref="commentBody" name="body" cols="30" rows="6" className="comment-form-comment" />
            </div>
          </div>
          <div className="comment-form-submit">
            <input type="submit" value="コメントを投稿"/>
          </div>
          <input type="hidden" name="article_id" value={this.props.articleId}/>
          {commentId}
        </form>
      </div>;
    }

    return (
      <div className="comment-respond">
        <a href="#" className="comment-respond-opener" onClick={this.openerClick}><span>{message}</span></a>
        {commentForm}
      </div>
    );

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
  openerClick: function( event ) {
    event.preventDefault();
    this.replyStatus.open( this.props.id );
  },
  submitClick: function( event ) {

  },
  checkId: function( event ) {

    return this.props.id === event.id;

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
