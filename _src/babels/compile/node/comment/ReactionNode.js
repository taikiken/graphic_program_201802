/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/12 - 14:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// React

Object.defineProperty(exports, "__esModule", {
  value: true
});
var React = self.React;

var ReactionNode = exports.ReactionNode = React.createClass({
  displayName: 'ReactionNode',

  propTypes: {
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // コメント id（オプション）
    commentId: React.PropTypes.string,
    // login or logout
    sign: React.PropTypes.bool.isRequired,
    // good 数
    good: React.PropTypes.number.isRequired,
    // bad 数
    bad: React.PropTypes.number.isRequired,
    // 自分がGood済みかどうか
    isGood: React.PropTypes.bool.isRequired,
    // 自分がBad済みがどうか
    isBad: React.PropTypes.bool.isRequired
  },
  getInitialState: function getInitialState() {
    return {
      loading: '',
      good: this.props.good,
      bad: this.props.bad,
      isGood: this.props.isGood,
      isBad: this.props.isBad,
      sign: this.props.sign
    };
  },
  render: function render() {

    var active = function active(mine) {
      return mine ? ' active' : '';
    };

    var count = function count() {
      var number = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return number > 0 ? number : '';
    };

    if (this.state.sign) {
      return React.createElement(
        'div',
        { className: 'comment-reaction ' + this.state.loading },
        React.createElement(
          'a',
          { className: 'comment-reaction-btn comment-reaction-like' + active(this.isGood), href: '#', onClick: this.goodClick },
          React.createElement(
            'i',
            null,
            ' '
          ),
          count(this.state.good)
        ),
        React.createElement(
          'a',
          { className: 'comment-reaction-btn comment-reaction-dislike' + active(this.isBad), href: '#', onClick: this.badClick },
          React.createElement(
            'i',
            null,
            ' '
          ),
          count(this.state.bad)
        ),
        React.createElement('div', { className: 'loading-spinner' })
      );
    } else {
      // 非ログイン
      return React.createElement(
        'div',
        { className: 'comment-reaction ' + this.state.loading },
        React.createElement(
          'span',
          { className: 'comment-reaction-btn comment-reaction-like' },
          React.createElement(
            'i',
            null,
            ' '
          ),
          count(this.state.good)
        ),
        React.createElement(
          'span',
          { className: 'comment-reaction-btn comment-reaction-dislike' },
          React.createElement(
            'i',
            null,
            ' '
          ),
          count(this.state.bad)
        ),
        React.createElement('div', { className: 'loading-spinner' })
      );
    }
  },
  goodClick: function goodClick(event) {
    event.preventDefault();
    this.setState({ loading: 'loading', good: '...' });
  },
  badClick: function badClick(event) {
    event.preventDefault();
    this.setState({ loading: 'loading', bad: '...' });
  },
  goodAddDone: function goodAddDone() {
    this.setState({ good: ++this.state.good, loading: '', isGood: true });
  },
  goodDeleteDone: function goodDeleteDone() {
    this.setState({ good: --this.state.good, loading: '', isGood: false });
  },
  badAddDone: function badAddDone() {
    this.setState({ bad: ++this.state.bad, loading: '', isBad: true });
  },
  badDeleteDone: function badDeleteDone() {
    this.setState({ bad: --this.state.bad, loading: '', isBad: false });
  },
  requestError: function requestError(error) {
    console.warn('requestError ', error.message);
    this.setState({ loading: '' });
  }
});