/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 17:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// event
import {ReplyStatus} from '../../../event/ReplyStatus';

let React = self.React;

// open / close anchor tag
/**
 * コメント入力欄の 表示 / 非表示 するボタン
 *
 * CommentFormNode
 * |- CommentFormOpenerNode
 *
 * @type {ReactClass}
 */
export let CommentFormOpenerNode = React.createClass( {
  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    independent: React.PropTypes.bool.isRequired,
    staticMessage: React.PropTypes.string.isRequired,
    actionMessage: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    // ReplyStatus instance
    this.replyStatus = null;

    // this.canOpen = true;

    return {
      // reply / cancel
      toggle: 'reply'
    };
  },
  render: function() {

    if ( this.props.independent ) {
      return null;
    } else {
      // console.log( 'comment-respond-opener ', this.state.toggle, this.props.uniqueId );
      if ( this.state.toggle === 'reply' ) {
        return (
          <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.openerClick}>
            <span className="icon-comment">{this.props.actionMessage}</span>
          </a>
        );
      } else if ( this.state.toggle === 'cancel' ) {
        return (
          <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.cancelClick}>
            <span className="icon-comment">{this.props.actionMessage}</span>
          </a>
        );
      } else {
        return null;
      }

    }
  },
  componentDidMount: function() {

    // ---------------------------
    // event bind
    let replyStatus = this.replyStatus;

    if ( replyStatus === null ) {

      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;

      /*
       if ( !this.props.independent ) {
       replyStatus.on( ReplyStatus.OPEN, this.replyOpen );
       replyStatus.on( ReplyStatus.CLOSE, this.replyClose );
       }*/

      replyStatus.on( ReplyStatus.START, this.replyStart );
      replyStatus.on( ReplyStatus.COMPLETE, this.replyComplete );

    }

  },
  componentWillUnmount: function() {

    let replyStatus = this.replyStatus;

    if ( replyStatus !== null ) {

      /*
       if ( !this.props.independent ) {
       replyStatus.off( ReplyStatus.OPEN, this.replyOpen );
       replyStatus.off( ReplyStatus.CLOSE, this.replyClose );
       }
       */

      replyStatus.off( ReplyStatus.START, this.replyStart );
      replyStatus.off( ReplyStatus.COMPLETE, this.replyComplete );
      this.replyStatus = null;

    }

  },
  // ----------------------------------------
  // open / cancel click handler
  openerClick: function( event ) {
    event.preventDefault();

    // console.log( '************** opener click ****************** ', this.props.uniqueId );

    this.willOpen();
    this.replyStatus.open( this.props.uniqueId );
  },
  cancelClick: function( event ) {
    event.preventDefault();

    this.willClose();
    this.replyStatus.close( this.props.uniqueId );
  },
  willOpen: function() {
    this.setState( {toggle: 'cancel'} );
  },
  willClose: function() {
    this.setState( {toggle: 'reply'} );
  },
  // ----------------------------------------
  checkId: function( event ) {
    return this.props.uniqueId === event.id;
  },
  // ----------------------------------------
  // listener
  /*
   replyOpen: function( event ) {

   },
   replyClose: function( event ) {

   },
   */
  replyStart: function() {
    this.cancelClick = false;
  },
  replyComplete: function() {
    this.cancelClick = true;
  }
} );
