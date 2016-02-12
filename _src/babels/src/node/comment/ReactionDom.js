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
let React = self.React;

export let ReactionDom = React.createClass( {
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
  getInitialState: function() {
    return {
      loading: '',
      good: this.props.good,
      bad: this.props.bad,
      isGood: this.props.isGood,
      isBad: this.props.isBad,
      sign: this.props.sign
    };
  },
  render: function() {

    let active = ( mine ) => {
      return mine ? ' active' : '';
    };

    let count = ( number = 0 ) => {
      return number > 0 ? number : '';
    };

    if ( this.state.sign ) {
      return (
        <div className={'comment-reaction ' + this.state.loading}>
          <a className={'comment-reaction-btn comment-reaction-like' + active( this.isGood )} href="#" onClick={this.goodClick}><i>&nbsp;</i>{count(this.state.good)}</a>
          <a className={'comment-reaction-btn comment-reaction-dislike' + active( this.isBad )} href="#" onClick={this.badClick}><i>&nbsp;</i>{count(this.state.bad)}</a>
          <div className="loading-spinner"></div>
        </div>
      );
    } else {
      // 非ログイン
      return (
        <div className={'comment-reaction ' + this.state.loading}>
          <span className="comment-reaction-btn comment-reaction-like"><i>&nbsp;</i>{count(this.state.good)}</span>
          <span className="comment-reaction-btn comment-reaction-dislike"><i>&nbsp;</i>{count(this.state.bad)}</span>
          <div className="loading-spinner"></div>
        </div>
      );
    }
  },
  goodClick: function( event ) {
    event.preventDefault();
    this.setState({loading: 'loading', good: '...'});
  },
  badClick: function( event ) {
    event.preventDefault();
    this.setState({loading: 'loading', bad: '...'});
  },
  goodAddDone: function() {
    this.setState( {good: ++this.state.good, loading: '', isGood: true} );
  },
  goodDeleteDone: function() {
    this.setState( {good: --this.state.good, loading: '', isGood: false} );
  },
  badAddDone: function() {
    this.setState( {bad: ++this.state.bad, loading: '', isBad: true} );
  },
  badDeleteDone: function() {
    this.setState( {bad: --this.state.bad, loading: '', isBad: false} );
  },
  requestError: function( error ) {
    console.warn( 'requestError ', error.message );
    this.setState({loading: ''});
  }
} );
