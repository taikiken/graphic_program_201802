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

import {ActionType} from '../../app/const/ActionType';
import {Good} from '../../event/comment/Good';
import {Bad} from '../../event/comment/Bad';
import {ModelCommentStar} from '../../model/comment/ModelCommentStar';
import {Model} from '../../model/Model';

// React
let React = self.React;

/**
 * comment good / bad
 * コメントに good / bad を付けたり外したり
 * @type {ReactClass}
 */
export let ReactionNode = React.createClass( {
  propTypes: {
    // unique id
    uniqueId: React.PropTypes.string.isRequired,
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
    isBad: React.PropTypes.bool.isRequired,
    // good / bad を行うか default true: click action あり
    activate: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      activate: true
    };
  },
  getInitialState: function() {
    // event Good
    this.good = null;
    // event Bad
    this.bad = null;
    // model good
    this.goodStar = null;
    // model bad
    this.badStar = null;

    this.goodCount = this.props.good;
    this.badCount = this.props.bad;

    return {
      loading: '',
      good: this.props.good,
      bad: this.props.bad,
      isGood: this.props.isGood,
      isBad: this.props.isBad,
      sign: this.props.sign,
      activate: this.props.activate
    };
  },
  render: function() {
    // console.log( '+++++++++++++++++++++++++++++++++ ReactionNode render ', this.props.uniqueId, this.state.isGood, this.state.isBad, this.state.good, this.state.bad );

    let active = ( mine ) => {
      return mine ? ' active' : '';
    };

    let count = ( number = 0 ) => {
      return number > 0 ? number : '';
    };

    if ( this.state.activate && this.state.sign ) {
      return (
        <div className={'comment-reaction ' + this.state.loading}>
          <a className={'comment-reaction-btn comment-reaction-like' + active( this.state.isGood )} href="#" onClick={this.goodClick}><i>&nbsp;</i>{count(this.state.good)}</a>
          <a className={'comment-reaction-btn comment-reaction-dislike' + active( this.state.isBad )} href="#" onClick={this.badClick}><i>&nbsp;</i>{count(this.state.bad)}</a>
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
  componentDidMount: function() {
    if ( this.state.activate && this.state.sign ) {
      this.good = Good.factory();
      this.bad = Bad.factory();

      let goodStar = new ModelCommentStar( this.props.commentId, ActionType.GOOD );
      this.goodStar = goodStar;
      goodStar.on( Model.UNDEFINED_ERROR, this.goodError );
      goodStar.on( Model.RESPONSE_ERROR, this.goodError );

      let badStar = new ModelCommentStar( this.props.commentId, ActionType.BAD );
      badStar.on( Model.UNDEFINED_ERROR, this.badError );
      badStar.on( Model.RESPONSE_ERROR, this.badError );
      this.badStar = badStar;
    }
  },
  componentWillUnMount: function() {
    if ( this.state.activate && this.state.sign ) {

      let goodStar = this.goodStar;
      goodStar.off( Model.UNDEFINED_ERROR, this.goodError );
      goodStar.off( Model.RESPONSE_ERROR, this.goodError );

      let badStar = this.badStar;
      badStar.off( Model.UNDEFINED_ERROR, this.badError );
      badStar.off( Model.RESPONSE_ERROR, this.badError );

      this.good = null;
      this.bad = null;

    }
  },
  goodClick: function( event ) {
    event.preventDefault();
    this.setState({loading: 'loading', good: '...'});

    // good sequence
    if ( this.state.isGood ) {
      // good済み -> DELETE
      this.goodStar.on( Model.COMPLETE, this.goodDeleteDone );
      this.goodStar.start( ActionType.DELETE );

    } else {

      // no good -> ADD
      this.goodStar.on( Model.COMPLETE, this.goodAddDone );
      this.goodStar.start( ActionType.ADD );

    }

  },
  badClick: function( event ) {
    event.preventDefault();
    this.setState({loading: 'loading', bad: '...'});

    // bad sequence
    if ( this.state.isBad ) {

      console.log( 'bad -> DELETE' );
      // bad -> DELETE
      this.badStar.on( Model.COMPLETE, this.badDeleteDone );
      this.badStar.start( ActionType.DELETE );

    } else {

      console.log( ' no bad -> ADD' );
      // no bad -> ADD
      this.badStar.on( Model.COMPLETE, this.badAddDone );
      this.badStar.start( ActionType.ADD );

    }
  },
  goodAddDone: function() {
    this.goodStar.off( Model.COMPLETE, this.goodAddDone );
    console.log( '+++++ goodAddDone' );
    let good = ++this.goodCount;
    this.setState( {good: good, loading: '', isGood: true} );
  },
  goodDeleteDone: function() {
    this.goodStar.off( Model.COMPLETE, this.goodDeleteDone );
    console.log( '+++++ goodDeleteDone' );
    let good = --this.goodCount;
    this.setState( {good: good, loading: '', isGood: false} );
  },
  badAddDone: function() {
    this.badStar.off( Model.COMPLETE, this.badAddDone );
    console.log( '--- badAddDone' );
    let bad = ++this.badCount;
    this.setState( {bad: bad, loading: '', isBad: true} );
  },
  badDeleteDone: function() {
    this.badStar.off( Model.COMPLETE, this.badDeleteDone );
    console.log( '--- badDeleteDone' );
    let bad = --this.badCount;
    this.setState( {bad: bad, loading: '', isBad: false} );
  },
  goodError: function( error ) {
    console.warn( 'goodError ', error );
    this.setState({loading: ''});
  },
  badError: function( error ) {
    console.warn( 'badError ', error );
    this.setState({loading: ''});
  }
} );
