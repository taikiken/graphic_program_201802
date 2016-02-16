/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

import {Empty} from '../../app/const/Empty';
import {Safety} from '../../data/Safety';

// node
import {ReactionNode} from './ReactionNode';
import {CommentFormNode} from './CommentFormNode';

// React
let React = self.React;

// コメント削除・通報 削除は自分のだけ, 他人のコメントは通報
let CommentAction = React.createClass( {
  propTypes: {
    // menu が 開いているか閉じているか open / close
    toggle: React.PropTypes.string.isRequired,
    // mine or others, others: true
    others: React.PropTypes.bool.isRequired,
    // user id
    userId: React.PropTypes.string.isRequired,
    commentUserId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string.isRequired,
    delete: React.PropTypes.func.isRequired,
    report: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      deleteLoading: '',
      reportLoading: ''
    };
  },
  render: function() {
    console.log( '****************** render', this.props.others, this.state.reportLoading );

    if ( this.props.others ) {
      // 自分以外 & ユーザー情報が正しくは通報機能
      return (
        <li className={'dropMenu-item loading-root ' + this.state.reportLoading}>
          <a href="#" className="dropMenu-link-report dropMenu-link" onClick={this.reportClick}><span>このコメントを通報する</span></a>
          <div className="loading-spinner"></div>
        </li>
      );
    } else {
      // 自分のは削除機能
      return (
        <li className={'dropMenu-item loading-root ' + this.state.deleteLoading}>
          <a href="#" className="dropMenu-link-delete dropMenu-link-" onClick={this.deleteClick}><span>このコメントを削除する</span></a>
        </li>
      );
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
  deleteClick: function( event ) {
    event.preventDefault();
    event.stopPropagation();
    // delete action
    this.setState( { deleteLoading: 'loading'} );
    this.props.delete( 'click' );
  },
  deleteDone: function(result) {
    console.log( 'deleteDone', result );
    this.props.delete( 'done' );
  },
  deleteFail: function(error) {
    console.log( 'deleteFail', error );
    this.props.delete( false );
    this.props.delete( 'fail' );
  },
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

// 通報 drop menu
let CommentMenu = React.createClass( {
  propTypes: {
    // user id
    userId: React.PropTypes.string.isRequired,
    commentUserId: React.PropTypes.string.isRequired,
    articleId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string.isRequired,
    sign: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.timer = 0;

    return {
      open: 'close',
      loading: '',
      show: true
    };
  },
  render: function() {
    if ( this.props.sign ) {
      // ログインユーザーのみ
      let others = this.props.userId === '' || this.props.userId === '0' || this.props.userId !== this.props.commentUserId;
      // console.log( 'others ', others, this.props.userId, this.props.commentUserId );
      if ( this.state.show ) {
        return (
          <div className={`comment-menu ${this.state.open} ${this.state.loading}`}>
            <a href="#" className="comment-menu-btn" onClick={this.clickHandler}>MENU</a>
            <ul className="dropMenu">
              <CommentAction
                toggle={this.state.open}
                others={others}
                userId={this.props.userId}
                commentUserId={this.props.commentUserId}
                commentId={this.props.commentId}
                delete={this.didDelete}
                report={this.didReport}
              />
            </ul>
          </div>
        );
      } else {
        // 非表示
        return null;
      }

    } else {
      // 非ログイン 出力しない
      return null;
    }

  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {
    // event handler unbind
    // timer clear
    this.destroy();
  },
  // -------------------------------------------------------
  // 以降 custom method
  didDelete: function( type:string ) {
    console.log( 'didDelete', type );

    switch ( type ) {
      case 'click':
        this.destroy();
        break;

      case 'done':
        this.setState( {show: false} );
        break;

      case 'fail':
        this.activateBodyClick();
        break;

      default:
        this.activateBodyClick();
        break;
    }

  },
  didReport: function( type:string ) {
    console.log( 'didReport', type );

    switch ( type ) {
      case 'click':
        this.destroy();
        break;

      case 'done':
        this.setState( {show: false} );
        this.toggleState();
        break;

      case 'fail':
        this.activateBodyClick();
        break;

      default:
        this.activateBodyClick();
        break;
    }
  },
  // -----------------------------
  // open / close control
  // icon click で drop menu open / close
  clickHandler: function( event ) {
    event.preventDefault();
    this.toggleState();
  },
  // document.body.onClick event handler
  // drop menu open 後に 領域外 click で閉じるため
  bodyClick: function() {
    if ( this.state.open === 'open' ) {

      // document.body が a より先に反応する
      // native event bind と React 経由の違いかも
      // body click 後の処理を遅延させる, 多分気づかない程度
      this.timer = setTimeout( this.toggleState, 100 );

    }
  },
  activateBodyClick: function() {
    document.body.addEventListener( 'click', this.bodyClick, false );
  },
  // open / close toggle
  toggleState: function() {

    this.destroy();

    if ( this.state.open === 'close' ) {
      // close -> open
      // document.body へ click event handler bind
      this.setState( { open: 'open' } );
      this.activateBodyClick();
    } else {
      // open -> close
      this.setState( { open: 'close' } );
    }

  },
  // timer cancel
  // body.click unbind
  // 後処理
  destroy: function() {

    // body click からの遅延処理を clear する
    // timer を 0 にし error にならないようにする
    clearTimeout( this.timer );
    this.timer = 0;
    // document.body からclick event handler unbind
    document.body.removeEventListener( 'click', this.bodyClick );

  }
} );
/**
 * <h3>React class</h3>
 * 記事詳細 > コメント一覧 node を作成します
 * @class CommentNode
 * @type {Function}
 */
export let CommentNode = React.createClass( {
  propTypes: {
    commentDae: React.PropTypes.object.isRequired,
    // unique id（識別のために必要）
    uniqueId: React.PropTypes.string.isRequired,
    // コメント送信者（自分の）profile picture
    icon: React.PropTypes.string,
    // user id（オプション）
    userId: React.PropTypes.string,
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // コメント id（オプション）
    commentId: React.PropTypes.string,
    // コメントした user id
    commentUserId: React.PropTypes.string.isRequired,
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
      icon: '',
      userId: '',
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
    let commentDae = this.props.commentDae;
    let comment = commentDae.comment;
    let sign = this.props.sign;

    // user icon
    let picture = comment.user.profilePicture;
    if ( !picture ) {
      picture = Empty.USER_EMPTY;
    } else if ( !Safety.isImg( picture ) ) {
      picture = Empty.USER_EMPTY;
    }

    return (
      <div className="comment-root">
        <CommentMenu
          key={`${this.props.uniqueId}-menu`}
          sign={sign}
          userId={this.props.userId}
          commentUserId={this.props.commentUserId}
          articleId={this.props.articleId}
          commentId={this.props.commentId}
        />
        <figure className="comment-user">
          <span className="comment-user-link">
            <span className="comment-user-thumb"><img src={picture} alt={comment.user.userName}/></span>
            <div className="comment-user-data">
              <p className="comment-user-name">{comment.user.userName}</p>
              <p className="comment-user-job">{comment.user.bio || ''}</p>
              <p className="comment-date">{comment.formatDate}</p>
            </div>
          </span>
        </figure>
        <div className="comment-content" dangerouslySetInnerHTML={{__html: comment.body}} />
        <ReactionNode
          articleId={this.props.articleId}
          commentId={this.props.commentId}
          sign={sign}
          good={comment.good}
          bad={comment.bad}
          isGood={comment.isGood}
          isBad={comment.isBad}
        />
        <CommentFormNode
          uniqueId={this.props.uniqueId}
          icon={this.props.icon}
          articleId={this.props.articleId}
          commentId={this.props.commentId}
          commentCount={this.props.commentCount}
          sign={sign}
          parent={this.props.parent}
          independent={this.props.independent}
        />
      </div>
    );
  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  }
} );
