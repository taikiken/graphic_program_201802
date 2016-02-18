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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactionNode = undefined;

var _ActionType = require('../../app/const/ActionType');

var _Good = require('../../event/comment/Good');

var _Bad = require('../../event/comment/Bad');

var _ModelCommentStar = require('../../model/comment/ModelCommentStar');

var _Model = require('../../model/Model');

// React
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
    // event Good
    this.good = null;
    // event Bad
    this.bad = null;
    // model good
    this.goodStar = null;
    // model bad
    this.badStar = null;

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
    console.log('+++++++++++++++++++++++++++++++++ ReactionNode render +++++++++++++++++++++++++++++++++', this.state.isGood, this.state.isBad);

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
          { className: 'comment-reaction-btn comment-reaction-like' + active(this.state.isGood), href: '#', onClick: this.goodClick },
          React.createElement(
            'i',
            null,
            ' '
          ),
          count(this.state.good)
        ),
        React.createElement(
          'a',
          { className: 'comment-reaction-btn comment-reaction-dislike' + active(this.state.isBad), href: '#', onClick: this.badClick },
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
  componentDidMount: function componentDidMount() {
    if (this.state.sign) {
      this.good = _Good.Good.factory();
      this.bad = _Bad.Bad.factory();

      var goodStar = new _ModelCommentStar.ModelCommentStar(this.props.commentId, _ActionType.ActionType.GOOD);
      this.goodStar = goodStar;
      goodStar.on(_Model.Model.UNDEFINED_ERROR, this.goodError);
      goodStar.on(_Model.Model.RESPONSE_ERROR, this.goodError);

      var badStar = new _ModelCommentStar.ModelCommentStar(this.props.commentId, _ActionType.ActionType.BAD);
      badStar.on(_Model.Model.UNDEFINED_ERROR, this.badError);
      badStar.on(_Model.Model.RESPONSE_ERROR, this.badError);
      this.badStar = badStar;
    }
  },
  componentWillUnMount: function componentWillUnMount() {
    if (this.state.sign) {

      var goodStar = this.goodStar;
      goodStar.off(_Model.Model.UNDEFINED_ERROR, this.goodError);
      goodStar.off(_Model.Model.RESPONSE_ERROR, this.goodError);

      var badStar = this.badStar;
      badStar.off(_Model.Model.UNDEFINED_ERROR, this.badError);
      badStar.off(_Model.Model.RESPONSE_ERROR, this.badError);

      this.good = null;
      this.bad = null;
    }
  },
  goodClick: function goodClick(event) {
    event.preventDefault();
    this.setState({ loading: 'loading', good: '...' });

    // good sequence
    if (this.state.isGood) {
      // good済み -> DELETE
      this.goodStar.on(_Model.Model.COMPLETE, this.goodDeleteDone);
      this.goodStar.start(_ActionType.ActionType.DELETE);
    } else {

      // no good -> ADD
      this.goodStar.on(_Model.Model.COMPLETE, this.goodAddDone);
      this.goodStar.start(_ActionType.ActionType.ADD);
    }
  },
  badClick: function badClick(event) {
    event.preventDefault();
    this.setState({ loading: 'loading', bad: '...' });

    // bad sequence
    if (this.state.isGood) {
      // bad -> DELETE
      this.badStar.on(_Model.Model.COMPLETE, this.badDeleteDone);
      this.badStar.start(_ActionType.ActionType.DELETE);
    } else {

      // no bad -> ADD
      this.badStar.on(_Model.Model.COMPLETE, this.badAddDone);
      this.badStar.start(_ActionType.ActionType.ADD);
    }
  },
  goodAddDone: function goodAddDone() {
    this.goodStar.off(_Model.Model.COMPLETE, this.goodAddDone);

    var good = this.state.good + 1;
    this.setState({ good: good, loading: '', isGood: true });
    // this.replaceProps( { good: good, isGood: true } );
  },
  goodDeleteDone: function goodDeleteDone() {
    this.goodStar.off(_Model.Model.COMPLETE, this.goodDeleteDone);

    var good = this.state.good - 1;
    this.setState({ good: good, loading: '', isGood: false });
    // this.replaceProps( { good: good, isGood: false } );
  },
  badAddDone: function badAddDone() {
    this.goodStar.off(_Model.Model.COMPLETE, this.badAddDone);

    var bad = this.state.bad + 1;
    this.setState({ bad: bad, loading: '', isBad: true });
    // this.replaceProps( { bad: bad, isBad: true } );
  },
  badDeleteDone: function badDeleteDone() {
    this.goodStar.off(_Model.Model.COMPLETE, this.badDeleteDone);

    var bad = this.state.bad - 1;
    this.setState({ bad: bad, loading: '', isBad: false });
    // this.replaceProps( { bad: bad, isBad: false } );
  },
  goodError: function goodError(error) {
    console.warn('goodError ', error.message);
    this.setState({ loading: '' });
  },
  badError: function badError(error) {
    console.warn('badError ', error.message);
    this.setState({ loading: '' });
  }
});