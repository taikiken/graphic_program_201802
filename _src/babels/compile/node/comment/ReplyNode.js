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
exports.ReplyNode = undefined;

var _ReplyStatus = require('../../event/ReplyStatus');

var _Empty = require('../../app/const/Empty');

var _Form = require('../../data/Form');

var _Safety = require('../../data/Safety');

var _Result = require('../../data/Result');

var _ModelReply = require('../../model/comment/ModelReply');

var _Model = require('../../model/Model');

// React

// model
var React = self.React;
var ReactDOM = self.ReactDOM;

var HiddenCommentId = React.createClass({
  displayName: 'HiddenCommentId',

  propTypes: {
    commentId: React.PropTypes.string.isRequired
  },
  render: function render() {
    var commentId = this.props.commentId;
    if (commentId === '' || commentId === '0') {
      return null;
    } else {
      return React.createElement('input', { type: 'hidden', name: 'commend_id', value: this.props.commentId });
    }
  }
});

// comment form
var ReplyForm = React.createClass({
  displayName: 'ReplyForm',

  propTypes: {
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
    this.reply = null;

    return {
      loading: '',
      body: '',
      toggle: this.props.toggle
    };
  },
  render: function render() {

    if (this.state.toggle === 'open') {
      var picture = this.props.icon;
      if (!picture) {
        picture = _Empty.Empty.USER_PICTURE_FEATURE;
      } else if (!_Safety.Safety.isImg(picture)) {
        picture = _Empty.Empty.USER_PICTURE_FEATURE;
      }

      return React.createElement(
        'div',
        { className: 'comment-form loading-root ' + this.state.loading },
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
          React.createElement(HiddenCommentId, { commentId: this.props.commentId })
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
  componentDidMount: function componentDidMount() {},
  componentWillUnMount: function componentWillUnMount() {
    // this.setState( {loading: ''} );
  },
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
    /*
        let option = {};
        option[ Model.COMPLETE ] = this.done;
        option[ Model.UNDEFINED_ERROR ] = this.done.fail;
        option[ Model.RESPONSE_ERROR ] = this.done.fail;*/

    var reply = new _ModelReply.ModelReply(this.props.articleId, formData);
    this.reply = reply;
    reply.on(_Model.Model.COMPLETE, this.done);
    reply.on(_Model.Model.UNDEFINED_ERROR, this.fail);
    reply.on(_Model.Model.RESPONSE_ERROR, this.fail);
    reply.start();
  },
  done: function done(event) {
    console.log('done', event);
    this.dispose();
  },
  fail: function fail(event) {
    var error = event.args[0];
    console.log('fail', error.message, error.result.status);
    this.dispose();
  },
  dispose: function dispose() {
    // event unbind
    this.setState({ loading: '' });
    var reply = this.reply;
    if (reply !== null) {
      reply.off(_Model.Model.COMPLETE, this.done);
      reply.off(_Model.Model.UNDEFINED_ERROR, this.fail);
      reply.off(_Model.Model.RESPONSE_ERROR, this.fail);
    }
  }
});

// open / close anchor tag
var OpenerDom = React.createClass({
  displayName: 'OpenerDom',

  propTypes: {
    independent: React.PropTypes.bool.isRequired,
    staticMessage: React.PropTypes.string.isRequired,
    actionMessage: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  getInitialState: function getInitialState() {
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
            null,
            this.props.actionMessage
          )
        );
      } else {
        return React.createElement(
          'p',
          { className: 'comment-respond-cancel' },
          React.createElement(
            'span',
            null,
            this.props.staticMessage
          ),
          React.createElement(
            'a',
            { href: '#', onClick: this.cancelClick },
            React.createElement(
              'span',
              null,
              'キャンセル'
            )
          )
        );
      }
    }
  },
  openerClick: function openerClick(event) {
    event.preventDefault();
    this.setState({ toggle: 'cancel' });
    this.props.callback('open');
  },
  cancelClick: function cancelClick(event) {
    event.preventDefault();
    this.setState({ toggle: 'reply' });
    this.props.callback('cancel');
  }
});

// wrapper dom + form
var ReplyNode = exports.ReplyNode = React.createClass({
  displayName: 'ReplyNode',

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
  getDefaultProps: function getDefaultProps() {
    return {
      commentId: '',
      commentCount: 0,
      parent: false,
      independent: false
    };
  },
  getInitialState: function getInitialState() {
    this.replyStatus = null;

    return {
      toggle: this.props.independent ? 'open' : 'close',
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

    var message = 'コメント';
    var staticMessage = '';
    var actionMessage = '';
    if (this.props.commentCount > 0) {
      // コメント数のみ表示
      staticMessage = message + ' (' + this.props.commentCount + ')';
      // 「返信」とコメント数を足す
      actionMessage = message + 'へ返信 (' + this.props.commentCount + ')';
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
        { className: commentClass + ' ' + this.state.toggle },
        React.createElement(OpenerDom, {
          independent: this.props.independent,
          staticMessage: staticMessage,
          actionMessage: actionMessage,
          callback: this.openerClick
        }),
        React.createElement(ReplyForm, {
          toggle: this.state.toggle,
          independent: this.props.independent,
          icon: this.props.icon,
          articleId: this.props.articleId,
          commentId: this.props.commentId
        })
      );
    } //if
  },
  componentDidMount: function componentDidMount() {

    // ---------------------------
    // event bind
    var replyStatus = _ReplyStatus.ReplyStatus.factory();
    replyStatus.on(_ReplyStatus.ReplyStatus.OPEN, this.replyOpen);
    replyStatus.on(_ReplyStatus.ReplyStatus.CLOSE, this.replyClose);
    replyStatus.on(_ReplyStatus.ReplyStatus.START, this.replyStart);
    replyStatus.on(_ReplyStatus.ReplyStatus.COMPLETE, this.replyComplete);
    this.replyStatus = replyStatus;
  },
  componentWillUnmount: function componentWillUnmount() {

    var replyStatus = this.replyStatus;
    replyStatus.off(_ReplyStatus.ReplyStatus.OPEN, this.replyOpen);
    replyStatus.off(_ReplyStatus.ReplyStatus.CLOSE, this.replyClose);
    replyStatus.off(_ReplyStatus.ReplyStatus.START, this.replyStart);
    replyStatus.off(_ReplyStatus.ReplyStatus.COMPLETE, this.replyComplete);
  },
  // ----------------------------------------
  bodyChange: function bodyChange(event) {
    var value = event.target.value;
    this.setState({ body: event.target.value });
  },
  openerClick: function openerClick(status) {

    switch (status) {

      case 'open':
        this.replyStatus.open(this.props.uniqueId);
        break;

      case 'close':
        this.replyStatus.close(this.props.uniqueId);
        break;

      default:
        console.warn('status is illegal operation. ' + status);
        break;

    }
  },
  checkId: function checkId(event) {

    return this.props.uniqueId === event.id;
  },
  // ----------------------------------------
  // listener
  replyOpen: function replyOpen(event) {
    var mine = this.checkId(event);
    this.setState({ open: mine });
  },
  replyClose: function replyClose(event) {
    var mine = this.checkId(event);
    if (!mine) {
      this.setState({ open: false });
    }
  },
  replyStart: function replyStart(event) {
    // let mine = this.checkId( event );
    this.setState({ loading: 'loading' });
  },
  replyComplete: function replyComplete(event) {
    // let mine = this.checkId( event );
    this.setState({ loading: '' });
  }
});