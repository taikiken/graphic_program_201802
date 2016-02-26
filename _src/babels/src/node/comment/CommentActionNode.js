/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/26 - 15:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// event
import {MessageStatus} from '../../event/MessageStatus';
import {CommentStatus} from '../../event/CommentStatus';

// model
import {Model} from '../../model/Model';
import {ModelCommentDelete} from '../../model/comment/ModelCommentDelete';
import {ModelCommentReplyDelete} from '../../model/comment/ModelCommentReplyDelete';

// React
let React = self.React;

// コメント削除・通報 削除は自分のだけ, 他人のコメントは通報
// 機能満載になったので{CommentNode}から分離しました
/**
 * コメント削除・通報
 * - 通報機能 drop
 * @type {React.component} CommentActionNode
 */
export let CommentActionNode = React.createClass( {
  propTypes: {
    // menu が 開いているか閉じているか open / close
    toggle: React.PropTypes.string.isRequired,
    // mine or others, others: true
    others: React.PropTypes.bool.isRequired,
    // user id 自分
    userId: React.PropTypes.string.isRequired,
    // コメントした user id
    commentUserId: React.PropTypes.string.isRequired,
    // コメント id
    commentId: React.PropTypes.string.isRequired,
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // 返信 id
    replyId: React.PropTypes.string.isRequired,
    // callback delete
    remove: React.PropTypes.func.isRequired,
    // callback report
    report: React.PropTypes.func.isRequired,
    // 親コメント? default false
    // true の時は ModelCommentDelete
    // false の時は ModelCommentReplyDelete
    parent: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.message = MessageStatus.factory();
    this.comment = CommentStatus.factory();

    this.model = {
      remove: null
    };
    this.callback = {
      remove: null
    };

    return {
      deleteLoading: '',
      reportLoading: ''
    };
  },
  render: function() {
    console.log( '****************** render', this.props.others, this.state.reportLoading );

    if ( this.props.others ) {
      // 自分以外 & ユーザー情報が正しくは通報機能
      // 通報機能 drop 2016-02-25
      /*
       return (
       <li className={'dropMenu-item loading-root ' + this.state.reportLoading}>
       <a href="#" className="dropMenu-link-report dropMenu-link" onClick={this.reportClick}><span>このコメントを通報する</span></a>
       <div className="loading-spinner"></div>
       </li>
       );
       */
      return null;
    } else {
      // 自分のは削除機能
      return (
        <li className={'dropMenu-item loading-root ' + this.state.deleteLoading}>
          <a href="#" className="dropMenu-link-delete dropMenu-link-" onClick={this.deleteClick}><span>このコメントを削除する</span></a>
        </li>
      );
    }
  },
  componentDidMount: function() {
    // model, callback initialize
    let model = this.model;
    let callback = this.callback;

    // delete
    if ( callback.remove === null ) {
      callback.remove = {};
      callback.remove[ Model.COMPLETE ] = this.deleteDone;
      callback.remove[ Model.UNDEFINED_ERROR ] = this.deleteFail;
      callback.remove[ Model.RESPONSE_ERROR ] = this.deleteFail;
    }

    if ( model.remove === null ) {
      model.remove = this.props.parent ?
        new ModelCommentDelete( this.props.articleId, this.props.commentId, callback.remove ) :
        new ModelCommentReplyDelete( this.props.articleId, this.props.commentId, this.props.replyId, callback.remove );
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    // menu が閉じたら loading class を削除する
    if ( nextState.toggle === 'close' ) {
      if ( this.state.deleteLoading === 'loading' ) {
        this.setState( {deleteLoading: ''} );
      }
      if ( this.state.reportLoading === 'loading' ) {
        this.setState( {reportLoading: ''} );
      }
    }

    return true;
  },
  componentWillUnMount: function() {
    this.setState( {reportLoading: '', deleteLoading: ''} );
  },
  // -------------------------------------------------
  // delete
  deleteClick: function( event ) {
    event.preventDefault();
    event.stopPropagation();
    // delete action
    this.setState( { deleteLoading: 'loading'} );
    this.props.remove( 'click' );

    // modal open fire
    this.message.remove( this.shouldDelete, this.shouldCancel );
  },
  // confirm ok click
  shouldDelete: function() {
    console.log( 'comment shouldDelete' );

    // comment 削除
    if ( this.model.remove !== null ) {
      this.model.remove.start();
    }

  },
  shouldCancel: function() {
    console.log( 'shouldCancel' );
    this.props.remove( 'cancel' );
  },
  deleteDone: function(result) {
    console.log( 'deleteDone', result );

    this.props.remove( 'done' );

    // event 通知
    this.comment.remove( this.props.commentId );
  },
  deleteFail: function(error) {
    console.log( 'deleteFail', error );
    this.props.remove( 'fail' );
  },
  // -------------------------------------------------
  reportClick: function( event ) {
    event.preventDefault();
    // event.stopPropagation();
    console.log( 'reportClick', event );

    this.setState( { reportLoading: 'loading'} );
    this.props.report( 'click' );

    // test code
    /*
     setTimeout( this.reportDone, 1000 );
     setTimeout( this.reportFail, 1000 );
     */
  },
  reportDone: function(result) {
    console.log( 'reportDone', result );
    this.setState( { reportLoading: ''} );
    this.props.report( 'done' );
  },
  reportFail: function(error) {
    console.log( 'reportFail', error );
    this.setState( { reportLoading: ''} );
    this.props.report( 'fail' );
  }
} );
