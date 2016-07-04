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
/*
機能修正
2016-03-23
https://docs.google.com/spreadsheets/d/1rmuygL6ZqndMbgtIxiMRgxEb4n3-yIkAQEj9msjoJcs/edit#gid=288230754
デバッグシート[PC]
No.2
Good / Badを外した際にボタンが非アクティブにならない

> - Good するとBad 済みだと Bad 外す
> - Bad するとGood 済みだと Good 外す
> - = Good も Bad も両方するのは許さない
 */

import {ActionType} from '../../app/const/ActionType';

// event
import {Good} from '../../event/comment/Good';
import {Bad} from '../../event/comment/Bad';

// model
import {ModelCommentStar} from '../../model/comment/ModelCommentStar';
import {Model} from '../../model/Model';

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// React
let React = self.React;

/**
 * <p>comment good / bad>br>
 * コメントに good / bad を付けたり外したり</p>
 *
 * <p>Good / Bad は ON / OFF スイッチの様に片方だけ +1 される</p>
 *
 * - Good すると Good +1 Bad -1
 * - Bad すると Good -1 Bad +1
 *
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
    activate: React.PropTypes.bool,
    // コメント詳細 URL
    url: React.PropTypes.string.isRequired
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
  loadingStart: function() {
    this.setState({loading: 'loading'});
  },
  loadingStop: function() {
    this.setState({loading: ''});
  },
  goodClick: function( event ) {
    event.preventDefault();

    // good sequence
    if ( this.state.isGood ) {
      // good済み -> DELETE
      this.goodDelete();
    } else {
      // no good -> ADD
      this.goodAdd();
    }

  },
  badClick: function( event ) {
    event.preventDefault();

    // bad sequence
    if ( this.state.isBad ) {
      // bad -> DELETE
      this.badDelete();
    } else {
      // no bad -> ADD
      this.badAdd();
    }
  },
  // -----------------------------------------------
  // good action
  // good済み -> DELETE
  goodDelete: function() {
    this.loadingStart();
    this.goodStar.on( Model.COMPLETE, this.goodDeleteDone );
    this.goodStar.start( ActionType.DELETE );
  },
  // goodしていない -> ADD
  goodAdd: function() {
    this.loadingStart();
    this.goodStar.on( Model.COMPLETE, this.goodAddDone );
    this.goodStar.start( ActionType.ADD );
  },

  // bad -> DELETE
  badDelete: function() {
    this.loadingStart();
    this.badStar.on( Model.COMPLETE, this.badDeleteDone );
    this.badStar.start( ActionType.DELETE );
  },
  // no bad -> ADD
  badAdd: function() {
    this.loadingStart();
    this.badStar.on( Model.COMPLETE, this.badAddDone );
    this.badStar.start( ActionType.ADD );
  },
  // -----------------------------------------------
  // good add complete handler
  goodAddDone: function() {
    this.goodStar.off( Model.COMPLETE, this.goodAddDone );
    let good = ++this.goodCount;

    if ( this.state.isBad ) {
      // bad しているので bad DELETE する
      let bad = --this.badCount;
      this.setState( {good: good, isGood: true, bad: bad, loading: '', isBad: false} );
    } else {
      // bad していない時はここまで
      this.setState( { good: good, isGood: true, loading: '' } );
    }

    // Good add event fire
    this.good.add( this.props.commentId );
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData('ReactionNode.goodAddDone', 'comment', 'reaction - good', this.props.url, parseFloat(this.props.commentId)) );
    // ----------------------------------------------
  },
  // bad delete
  goodDeleteDone: function() {
    this.goodStar.off( Model.COMPLETE, this.goodDeleteDone );
    // Good remove event fire
    this.good.remove( this.props.commentId );

    let good = --this.goodCount;
    this.setState( {good: good, loading: '', isGood: false} );
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData('ReactionNode.goodAddDone', 'comment', 'reaction - bad', this.props.url, parseFloat(this.props.commentId)) );
    // ----------------------------------------------
  },
  // -----------------------------------------------
  // bad add complete handler
  badAddDone: function() {
    this.badStar.off( Model.COMPLETE, this.badAddDone );
    let bad = ++this.badCount;

    if ( this.state.isGood ) {
      // good しているので good DELETE する
      let good = --this.goodCount;
      this.setState( {bad: bad, isBad: true, good: good, loading: '', isGood: false} );
    } else {
      // good していない時はここまで
      this.setState( {bad: bad, isBad: true, loading: ''} );

    }

    // Bad add event fire
    this.bad.add( this.props.commentId );
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData('ReactionNode.goodAddDone', 'comment', 'reaction - bad', this.props.url, parseFloat(this.props.commentId)) );
    // ----------------------------------------------
  },
  // bad delete
  badDeleteDone: function() {
    this.badStar.off( Model.COMPLETE, this.badDeleteDone );
    // Bad remove event fire
    this.bad.remove( this.props.commentId );

    let bad = --this.badCount;
    this.setState( {bad: bad, loading: '', isBad: false} );
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData('ReactionNode.goodAddDone', 'comment', 'reaction - good', this.props.url, parseFloat(this.props.commentId)) );
    // ----------------------------------------------
  },
  // good error
  goodError: function( /* error */ ) {
    this.loadingStop();
  },
  // bad error
  badError: function(/* error */) {
    this.loadingStop();
  }
} );
