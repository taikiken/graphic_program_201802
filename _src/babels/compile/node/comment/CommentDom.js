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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentDom = undefined;

var _Empty = require('../../app/const/Empty');

var _ReactionDom = require('./ReactionDom');

// React
var React = self.React;

// コメント削除 自分のだけ

// node
var DeleteComment = React.createClass({
  displayName: 'DeleteComment',

  propTypes: {
    // user id
    userId: React.PropTypes.string.isRequired,
    commentUserId: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  render: function render() {
    if (!this.props.userId || this.props.userId !== this.props.commentUserId) {
      return null;
    } else {
      return React.createElement(
        'li',
        { className: 'dropMenu-item' },
        React.createElement(
          'a',
          { href: '#', className: 'dropMenu-link-delete', onClick: this.props.callback },
          React.createElement(
            'span',
            null,
            'このコメントを削除する'
          )
        )
      );
    }
  }
});

// 通報 drop menu
var CommentMenu = React.createClass({
  displayName: 'CommentMenu',

  propTypes: {
    // user id
    userId: React.PropTypes.string.isRequired,
    commentUserId: React.PropTypes.string.isRequired,
    articleId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string.isRequired,
    sign: React.PropTypes.bool.isRequired
  },
  getInitialState: function getInitialState() {
    this.timer = 0;

    return {
      open: 'close',
      loading: ''
    };
  },
  render: function render() {
    if (this.props.sign) {
      // ログインユーザーのみ
      return React.createElement(
        'div',
        { className: 'comment-menu ' + this.state.open + ' ' + this.state.loading },
        React.createElement(
          'a',
          { href: '#', className: 'comment-menu-btn', onClick: this.clickHandler },
          'MENU'
        ),
        React.createElement(
          'ul',
          { className: 'dropMenu' },
          React.createElement(DeleteComment, {
            userId: this.props.userId,
            commentUserId: this.props.commentUserId,
            callback: this.deleteClick
          }),
          React.createElement(
            'li',
            { className: 'dropMenu-item' },
            React.createElement(
              'a',
              { href: '#', className: 'dropMenu-link-report', onClick: this.reportClick },
              React.createElement(
                'span',
                null,
                'このコメントを通報する'
              )
            )
          )
        ),
        React.createElement('div', { className: 'loading-spinner' })
      );
    } else {
      // 非ログイン 出力しない
      return null;
    }
  },
  componentDidMount: function componentDidMount() {},
  componentWillUnmount: function componentWillUnmount() {},
  // -------------------------------------------------------
  // 以降 custom method
  deleteClick: function deleteClick(event) {
    event.preventDefault();
  },
  reportClick: function reportClick(event) {
    event.preventDefault();
  },
  // icon click で drop menu open / close
  clickHandler: function clickHandler(event) {
    event.preventDefault();
    this.toggleState();
  },
  // document.body.onClick event handler
  // drop menu open 後に 領域外 click で閉じるため
  bodyClick: function bodyClick() {
    if (this.state.open === 'open') {

      // document.body が a より先に反応する
      // native event bind と React 経由の違いかも
      // body click 後の処理を遅延させる, 多分気づかない程度
      this.timer = setTimeout(this.toggleState, 100);
    }
  },
  // open / close toggle
  toggleState: function toggleState() {

    this.destroy();

    if (this.state.open === 'close') {
      // close -> open
      // document.body へ click event handler bind
      this.setState({ open: 'open' });
      document.body.addEventListener('click', this.bodyClick, false);
    } else {
      // open -> close
      this.setState({ open: 'close' });
    }
  },
  // timer cancel
  // body.click unbind
  // 後処理
  destroy: function destroy() {

    // body click からの遅延処理を clear する
    // timer を 0 にし error にならないようにする
    clearTimeout(this.timer);
    this.timer = 0;
    // document.body からclick event handler unbind
    document.body.removeEventListener('click', this.bodyClick);
  }
});

var CommentDom = exports.CommentDom = React.createClass({
  displayName: 'CommentDom',

  propTypes: {
    commentDae: React.PropTypes.object.isRequired,
    // unique id（識別のために必要）
    // id: React.PropTypes.string.isRequired,
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
  getDefaultProps: function getDefaultProps() {
    return {
      userId: '',
      commentId: '',
      commentCount: 0,
      parent: false,
      independent: false,
      open: false
    };
  },
  getInitialState: function getInitialState() {
    this.replyStatus = null;

    return {
      open: this.props.open,
      loading: ''
    };
  },
  render: function render() {
    var commentDae = this.props.commentDae;
    var comment = commentDae.comment;
    var parent = this.props.parent;
    var sign = this.props.sign;

    // user icon
    var picture = comment.user.profilePicture || _Empty.Empty.USER_EMPTY;

    // icon と名前

    return React.createElement(
      'div',
      null,
      React.createElement(CommentMenu, {
        sign: sign,
        userId: this.props.userId,
        commentUserId: this.props.commentUserId,
        articleId: this.props.articleId,
        commentId: this.props.commentId
      }),
      React.createElement(
        'figure',
        { className: 'comment-user' },
        React.createElement(
          'span',
          { className: 'comment-user-link' },
          React.createElement(
            'span',
            { className: 'comment-user-thumb' },
            React.createElement('img', { src: picture, alt: comment.user.userName })
          ),
          React.createElement(
            'div',
            { className: 'comment-user-data' },
            React.createElement(
              'p',
              { className: 'comment-user-name' },
              comment.user.userName
            ),
            React.createElement(
              'p',
              { className: 'comment-user-job' },
              comment.user.bio || ''
            ),
            React.createElement(
              'p',
              { className: 'comment-date' },
              comment.formatDate
            )
          )
        )
      ),
      React.createElement('div', { className: 'comment-content', dangerouslySetInnerHTML: { __html: comment.body } }),
      React.createElement(_ReactionDom.ReactionDom, {
        articleId: this.props.articleId,
        commentId: this.props.commentId,
        sign: sign,
        good: comment.good,
        bad: comment.bad,
        isGood: comment.isGood,
        isBad: comment.isBad
      })
    );
  },
  componentDidMount: function componentDidMount() {},
  componentWillUnmount: function componentWillUnmount() {}
});