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
exports.ReplyForm = undefined;

var _ReplyStatus = require('../../event/ReplyStatus');

var _Form = require('../../data/Form');

// React
var React = self.React;
// let ReactDOM = self.ReactDOM;

var ReplyForm = exports.ReplyForm = React.createClass({
  displayName: 'ReplyForm',

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
  getDefaultProps: function getDefaultProps() {
    return {
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
      loading: '',
      body: ''
    };
  },
  render: function render() {

    var sign = this.props.sign;
    if (!sign) {
      // 非ログインはコメント送信できない
      // 処理中止
      return null;
    }

    var parent = this.props.parent;
    if (!parent) {
      // コメントのはコメント送信できない
      // 処理中止
      return null;
    }

    // ----------------------------
    // dom
    var message = 'コメントへ返信';
    if (this.props.commentCount > 0) {
      // コメント数を後ろに足す
      message += ' (' + this.props.commentCount + ')';
    }

    var commentForm = '';

    if (this.state.open) {

      var commentId = '';
      if (!!this.props.commentId) {
        commentId = React.createElement('input', { type: 'hidden', name: 'commend_id', value: this.props.commentId });
      }

      commentForm = React.createElement(
        'div',
        { className: 'comment-form ' + this.state.loading },
        React.createElement(
          'form',
          { onSubmit: this.submitClick, ref: 'form' },
          React.createElement(
            'i',
            { className: 'comment-form-user' },
            React.createElement('img', { src: this.props.icon, alt: '' })
          ),
          React.createElement(
            'div',
            { className: 'comment-form-comment-outer' },
            React.createElement(
              'div',
              { className: 'comment-form-comment-inner' },
              React.createElement('textarea', { value: this.state.body, onChange: this.bodyChange, name: 'body', cols: '30', rows: '6', className: 'comment-form-comment', placeholder: 'コメントを書く' })
            )
          ),
          React.createElement(
            'div',
            { className: 'comment-form-submit' },
            React.createElement('input', { type: 'submit', value: 'コメントを投稿' })
          ),
          React.createElement('input', { type: 'hidden', name: 'article_id', value: this.props.articleId }),
          commentId
        ),
        React.createElement(
          'div',
          { className: 'loading-spinner' },
          ' '
        )
      );
    }

    return React.createElement(
      'div',
      { className: 'comment-respond' },
      React.createElement(
        'a',
        { href: '#', className: 'comment-respond-opener', onClick: this.openerClick },
        React.createElement(
          'span',
          null,
          message
        )
      ),
      commentForm
    );
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
  openerClick: function openerClick(event) {
    event.preventDefault();
    this.replyStatus.open(this.props.id);
  },
  submitClick: function submitClick(event) {
    var body = this.state.body;

    if (body !== '') {

      var formNode = ReactDOM.findDOMNode(this.refs.form);
      var formData = _Form.Form.element(formNode);
    } else {

      // error
      console.error('body empty', ReactDOM.findDOMNode(this.refs.form));
    }
  },
  checkId: function checkId(event) {

    return this.props.id === event.id;
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