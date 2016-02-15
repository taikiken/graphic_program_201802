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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentFormNode = undefined;

var _ReplyStatus = require('../../event/ReplyStatus');

var _Empty = require('../../app/const/Empty');

var _Form = require('../../data/Form');

var _Safety = require('../../data/Safety');

var _Result = require('../../data/Result');

var _ModelComment = require('../../model/comment/ModelComment');

var _ModelCommentReply = require('../../model/comment/ModelCommentReply');

var _Model = require('../../model/Model');

// React
var React = self.React;

// model

var ReactDOM = self.ReactDOM;

var HiddenCommentId = React.createClass({
  displayName: 'HiddenCommentId',

  propTypes: {
    independent: React.PropTypes.bool.isRequired,
    commentId: React.PropTypes.string.isRequired
  },
  render: function render() {
    var commentId = this.props.commentId;

    if (this.props.independent || commentId === '' || commentId === '0') {
      // 記事コメント or commentId がない
      return null;
    } else {
      return React.createElement('input', { type: 'hidden', name: 'commend_id', value: this.props.commentId });
    }
  }
});

// comment form
var CommentForm = React.createClass({
  displayName: 'CommentForm',

  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    toggle: React.PropTypes.string.isRequired,
    independent: React.PropTypes.bool.isRequired,
    icon: React.PropTypes.string.isRequired,
    articleId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      commentId: ''
    };
  },
  getInitialState: function getInitialState() {
    this.comment = null;
    this.replyStatus = null;

    return {
      loading: '',
      body: '',
      open: this.props.toggle === 'open'
    };
  },
  render: function render() {

    if (!this.props.independent) {
      var commentId = this.props.commentId;
      if (!commentId || commentId === '0') {
        throw new Error('need comment Id ' + commentId);
      }
    }

    console.log('------------ Form ', this.props.uniqueId, this.state.open);
    if (this.state.open) {

      // user icon
      var picture = this.props.icon;
      if (!picture) {
        picture = _Empty.Empty.USER_PICTURE_FEATURE;
      } else if (!_Safety.Safety.isImg(picture)) {
        picture = _Empty.Empty.USER_PICTURE_FEATURE;
      }

      return React.createElement(
        'div',
        { className: 'form-root loading-root ' + this.state.loading },
        React.createElement(
          'form',
          { onSubmit: this.onSubmit, ref: 'form' },
          React.createElement(
            'i',
            { className: 'comment-form-user' },
            React.createElement('img', { src: picture, alt: '' })
          ),
          React.createElement(
            'div',
            { className: 'comment-form-comment-outer' },
            React.createElement(
              'div',
              { className: 'comment-form-comment-inner' },
              React.createElement('textarea', { value: this.state.body, onChange: this.onBodyChange, name: 'body', cols: '30', rows: '6', className: 'comment-form-comment', placeholder: 'コメントを書く' })
            )
          ),
          React.createElement(
            'div',
            { className: 'comment-form-submit' },
            React.createElement('input', { type: 'submit', value: 'コメントを投稿' })
          ),
          React.createElement('input', { type: 'hidden', name: 'article_id', value: this.props.articleId }),
          React.createElement(HiddenCommentId, { independent: this.props.independent, commentId: this.props.commentId })
        ),
        React.createElement(
          'div',
          { className: 'loading-spinner' },
          ' '
        )
      );
    } else {
      return null;
    }
  },
  componentDidMount: function componentDidMount() {
    var replyStatus = _ReplyStatus.ReplyStatus.factory();
    this.replyStatus = replyStatus;

    replyStatus.on(_ReplyStatus.ReplyStatus.OPEN, this.replyOpen);
    replyStatus.on(_ReplyStatus.ReplyStatus.CLOSE, this.replyClose);
  },
  componentWillUnMount: function componentWillUnMount() {
    this.dispose();
  },
  // ----------------------------------------
  checkId: function checkId(event) {

    return this.props.uniqueId === event.id;
  },
  // ----------------------------------------
  // listener
  replyOpen: function replyOpen(event) {
    this.setState({ open: this.checkId(event) });
  },
  replyClose: function replyClose() {
    if (this.props.independent) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  },
  // ----------------------------------------
  // form
  onBodyChange: function onBodyChange(event) {
    this.setState({ body: event.target.value });
  },
  onSubmit: function onSubmit(event) {
    event.preventDefault();

    var body = this.state.body;
    if (body === '') {
      this.error('コメントは必須入力です！');
    } else {
      // submit sequence
      this.sending();
    }
  },
  // show error
  error: function error(message) {
    throw new Error(message);
  },
  // ajax start
  sending: function sending() {
    this.setState({ loading: 'loading' });
    var formNode = ReactDOM.findDOMNode(this.refs.form);
    var formData = _Form.Form.element(formNode);
    console.log('sending ===============', this.props.articleId, formNode, formData);

    this.replyStatus.start(this.props.uniqueId);

    var comment = undefined;
    if (this.props.independent) {
      // 記事へのコメント
      comment = new _ModelComment.ModelComment(this.props.articleId, formData);
    } else {
      // コメントへのコメント
      comment = new _ModelCommentReply.ModelCommentReply(this.props.articleId, this.props.commentId, formData);
    }
    this.comment = comment;
    comment.on(_Model.Model.COMPLETE, this.done);
    comment.on(_Model.Model.UNDEFINED_ERROR, this.fail);
    comment.on(_Model.Model.RESPONSE_ERROR, this.fail);
    comment.start();
  },
  done: function done(event) {
    console.log('done', event);
    this.replyStatus.complete(this.props.uniqueId);
    this.dispose();
  },
  fail: function fail(event) {
    var error = event.args[0];
    console.log('fail', error.message, error.result.status);
    this.replyStatus.complete(this.props.uniqueId);
    this.dispose();
  },
  dispose: function dispose() {
    // event unbind
    this.setState({ loading: '' });
    var comment = this.comment;
    if (comment !== null) {
      comment.off(_Model.Model.COMPLETE, this.done);
      comment.off(_Model.Model.UNDEFINED_ERROR, this.fail);
      comment.off(_Model.Model.RESPONSE_ERROR, this.fail);
    }

    var replyStatus = this.replyStatus;
    if (replyStatus !== null) {
      replyStatus.off(_ReplyStatus.ReplyStatus.OPEN, this.replyOpen);
      replyStatus.off(_ReplyStatus.ReplyStatus.CLOSE, this.replyClose);
    }
  }
});

// open / close anchor tag
var OpenerDom = React.createClass({
  displayName: 'OpenerDom',

  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    independent: React.PropTypes.bool.isRequired,
    staticMessage: React.PropTypes.string.isRequired,
    actionMessage: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  getInitialState: function getInitialState() {
    this.replyStatus = null;
    this.canOpen = true;

    return {
      // reply / cancel
      toggle: 'reply'
    };
  },
  render: function render() {
    if (this.props.independent) {
      return null;
    } else {

      if (this.state.toggle === 'reply') {
        return React.createElement(
          'a',
          { href: '#', className: 'comment-respond-opener', onClick: this.openerClick },
          React.createElement(
            'span',
            { className: 'icon-comment' },
            this.props.actionMessage
          )
        );
      } else {
        return React.createElement(
          'p',
          { className: 'comment-respond-opener comment-respond-cancel' },
          React.createElement(
            'span',
            { className: 'icon-comment' },
            this.props.staticMessage
          ),
          React.createElement(
            'a',
            { href: '#', onClick: this.cancelClick },
            React.createElement(
              'i',
              { className: 'icon-cancel' },
              'キャンセル'
            )
          )
        );
      }
    }
  },
  componentDidMount: function componentDidMount() {

    // ---------------------------
    // event bind
    var replyStatus = _ReplyStatus.ReplyStatus.factory();

    if (!this.props.independent) {
      replyStatus.on(_ReplyStatus.ReplyStatus.OPEN, this.replyOpen);
      replyStatus.on(_ReplyStatus.ReplyStatus.CLOSE, this.replyClose);
    }

    replyStatus.on(_ReplyStatus.ReplyStatus.START, this.replyStart);
    replyStatus.on(_ReplyStatus.ReplyStatus.COMPLETE, this.replyComplete);
    this.replyStatus = replyStatus;
  },
  componentWillUnmount: function componentWillUnmount() {

    var replyStatus = this.replyStatus;

    if (!this.props.independent) {
      replyStatus.off(_ReplyStatus.ReplyStatus.OPEN, this.replyOpen);
      replyStatus.off(_ReplyStatus.ReplyStatus.CLOSE, this.replyClose);
    }

    replyStatus.off(_ReplyStatus.ReplyStatus.START, this.replyStart);
    replyStatus.off(_ReplyStatus.ReplyStatus.COMPLETE, this.replyComplete);
  },
  // ----------------------------------------
  // open / cancel click handler
  openerClick: function openerClick(event) {
    event.preventDefault();

    if (!this.canOpen) {
      return;
    }

    this.willOpen();
    this.replyStatus.open(this.props.uniqueId);
  },
  cancelClick: function cancelClick(event) {
    event.preventDefault();

    if (!this.canOpen) {
      return;
    }

    this.willClose();
    this.replyStatus.close(this.props.uniqueId);
  },
  willOpen: function willOpen() {
    // this.props.callback( 'open' );
    this.setState({ toggle: 'cancel' });
  },
  willClose: function willClose() {
    this.setState({ toggle: 'reply' });
    // this.props.callback( 'close' );
  },
  // ----------------------------------------
  checkId: function checkId(event) {

    return this.props.uniqueId === event.id;
  },
  // ----------------------------------------
  // listener
  replyOpen: function replyOpen(event) {
    var mine = this.checkId(event);
    if (!mine) {
      console.log('replyOpen handler to close', this.props.uniqueId);
      this.willClose();
    }
  },
  replyClose: function replyClose(event) {},
  replyStart: function replyStart(event) {
    this.cancelClick = false;
  },
  replyComplete: function replyComplete(event) {
    this.cancelClick = true;
  }
});

// wrapper dom + form
var CommentFormNode = exports.CommentFormNode = React.createClass({
  displayName: 'CommentFormNode',

  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
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
    independent: React.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      toggle: 'close',
      icon: '',
      commentId: '',
      commentCount: 0,
      parent: false,
      independent: false
    };
  },
  getInitialState: function getInitialState() {
    this.replyStatus = null;
    this.canOpen = true;

    return {
      // form 表示初期値, 記事コメント以外は閉じる
      // toggle: this.props.independent ? 'open' : 'close',
      loading: '',
      body: ''
    };
  },
  render: function render() {

    var sign = this.props.sign;
    // ----------------------------
    // dom

    if (!sign || !this.props.parent && !this.props.independent) {
      // not parent, not independent
      // 表示しない, 下に空きを作るための空タグのみ
      return React.createElement('div', { className: 'comment-respond' });
    }

    // -------------------------
    // prent or independent 何かを表示する
    var toggle = this.props.toggle;
    if (this.props.independent) {
      toggle = 'open';
    }

    var message = 'コメント';
    var staticMessage = '';
    var actionMessage = message + 'へ返信';
    if (this.props.commentCount > 0) {
      // コメント数のみ表示
      staticMessage = message + ' (' + this.props.commentCount + ')';
      // 「返信」とコメント数
      actionMessage = actionMessage + ' (' + this.props.commentCount + ')';
    }

    if (!sign) {
      // 非ログイン
      return React.createElement(
        'div',
        { className: 'comment-respond' },
        React.createElement(
          'p',
          { className: 'comment-respond-opener' },
          React.createElement(
            'span',
            null,
            staticMessage
          )
        )
      );
    } else {
      // ログイン

      var commentClass = this.props.independent ? 'comment-form' : 'comment-respond';
      console.log('form render ', this.state.toggle, this.props.independent, this.props.articleId, this.props.commentId);

      return React.createElement(
        'div',
        { className: commentClass + ' comment-root' },
        React.createElement(OpenerDom, {
          uniqueId: this.props.uniqueId,
          independent: this.props.independent,
          staticMessage: staticMessage,
          actionMessage: actionMessage,
          callback: this.openerClick
        }),
        React.createElement(CommentForm, {
          uniqueId: this.props.uniqueId,
          toggle: toggle,
          independent: this.props.independent,
          icon: this.props.icon,
          articleId: this.props.articleId,
          commentId: this.props.commentId
        })
      );
    } //if
  },
  componentDidMount: function componentDidMount() {},
  componentWillUnmount: function componentWillUnmount() {},
  // ----------------------------------------
  bodyChange: function bodyChange(event) {
    // textarea value
    this.setState({ body: event.target.value });
  },
  openerClick: function openerClick(status) {
    console.log('********** root openerClick ', this.props.uniqueId, status);
    // open / close が opener から送られてくる
    // this.setState( { toggle: status } );
  }
});