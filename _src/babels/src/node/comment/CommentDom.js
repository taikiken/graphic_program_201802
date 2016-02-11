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

// React
let React = self.React;

// 通報 drop menu
let CommentMenu = React.createClass( {
  propTypes: {
    articleId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string.isRequired,
    sign: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.timer = 0;

    return {
      open: 'close',
      loading: ''
    };
  },
  render: function() {

    if ( this.props.sign ) {
      // ログインユーザーのみ
      return (
        <div className={`comment-menu ${this.state.open} ${this.state.loading}`}>
          <a href="#" className="comment-menu-btn" onClick={this.clickHandler}>MENU</a>
          <ul className="dropMenu">
            <li className="dropMenu-item">
              <a href="#" className="dropMenu-link-delete" onClick={this.deleteClick}><span>このコメントを削除する</span></a>
            </li>
            <li className="dropMenu-item">
              <a href="#" className="dropMenu-link-report" onClick={this.reportClick}><span>このコメントを通報する</span></a>
            </li>
          </ul>
          <div className="loading-spinner"></div>
        </div>
      );
    } else {
      // 非ログイン 出力しない
      return null;
    }

  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  // -------------------------------------------------------
  // 以降 custom method
  deleteClick: function( event ) {
    event.preventDefault();
  },
  reportClick: function( event ) {
    event.preventDefault();
  },
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
  // open / close toggle
  toggleState: function() {

    this.destroy();

    if ( this.state.open === 'close' ) {
      // close -> open
      // document.body へ click event handler bind
      this.setState( { open: 'open' } );
      document.body.addEventListener( 'click', this.bodyClick, false );
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

let ReactionDom = React.createClass( {
  propTypes: {
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // コメント id（オプション）
    commentId: React.PropTypes.string,
    sign: React.PropTypes.bool.isRequired,
    good: React.PropTypes.number.isRequired,
    bad: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      loading: '',
      good: this.props.good,
      bad: this.props.bad,
      activate: this.props.sign
    };
  },
  render: function() {
    let good = this.state.good !== 0 ? this.state.good : '';
    let bad = this.state.bad !== 0 ? this.state.bad : '';

    if ( this.state.activate ) {
      return (
        <div className={'comment-reaction ' + this.state.loading}>
          <a className="comment-reaction-btn comment-reaction-like active" href="#" onClick={this.goodClick}><i>&nbsp;</i>{good}</a>
          <a className="comment-reaction-btn comment-reaction-dislike" href="#" onClick={this.badClick}><i>&nbsp;</i>{bad}</a>
          <div className="loading-spinner"></div>
        </div>
      );
    } else {
      // 非ログイン
      return (
        <div className={'comment-reaction ' + this.state.loading}>
          <span className="comment-reaction-btn comment-reaction-like active"><i>&nbsp;</i>{good}</span>
          <span className="comment-reaction-btn comment-reaction-dislike"><i>&nbsp;</i>{bad}</span>
          <div className="loading-spinner"></div>
        </div>
      );
    }
  },
  goodClick: function( event ) {
    event.preventDefault();
    this.setState({loading: 'loading'});
  },
  badClick: function( event ) {
    event.preventDefault();
    this.setState({loading: 'loading'});
  },
  goodDone: function() {
    this.setState( {good: ++this.state.good, bad: --this.state.bad, loading: ''} );
  },
  badDone: function() {
    this.setState( {good: --this.state.good, bad: ++this.state.bad, loading: ''} );
  },
  requestError: function( error ) {
    console.warn( 'requestError ', error.message );
    this.setState({loading: ''});
  }
} );

export let CommentDom = React.createClass( {
  propTypes: {
    commentDae: React.PropTypes.object.isRequired,
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
    let commentDae = this.props.commentDae;
    let comment = commentDae.comment;
    let parent = this.props.parent;
    let sign = this.props.sin;

    // user icon
    let picture = comment.user.profilePicture || Empty.USER_EMPTY;

    // icon と名前

    return (
      <li className="comment-item">
        <CommentMenu
          sign={sign}
          articleId={this.props.articleId}
          commentId={this.props.commentId}
        />
        <figure className="comment-user">
          <a href={comment.user.url} className="comment-user-link">
            <span className="comment-user-thumb"><img src={picture} alt={comment.user.userName}/></span>
            <div className="comment-user-data">
              <p className="comment-user-name">{comment.user.userName}</p>
              <p className="comment-user-job">{comment.user.bio || ''}</p>
              <p className="comment-date">{comment.formatDate}</p>
            </div>
          </a>
        </figure>
        <div className="comment-content" dangerouslySetInnerHTML={{__html: comment.body}} />
        <ReactionDom
          articleId={this.props.articleId}
          commentId={this.props.commentId}
          sign={sign}
          good={comment.good}
          bad={comment.bad}
        />
      </li>
    );
  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  }
} );
