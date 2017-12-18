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
 * <p>コメント入力欄の 表示 / 非表示 するボタン</p>
 *
 * <pre>
 * CommentFormNode
 * |- CommentFormOpenerNode
 * </pre>
 * TODO: future remove
 * @type {ReactClass}
 * @deprecated 2017-12-06 instead use {@link ComponentCommentFormOpener}
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
    this.opened = false;
    
    return {
      toggle: 'reply'
    };
  },
  render: function() {
    if ( this.props.independent ) {
      return null;
    }
    // console.log( 'CommentFormOpenerNode.render', this.state.toggle, this.opened, this.props.uniqueId );
    // if ( this.state.toggle === 'reply' ) {
    //   return (
    //     <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.openerClick}>
    //       <span className="icon-comment">{this.props.actionMessage}</span>
    //     </a>
    //   );
    // } else if ( this.state.toggle === 'cancel' ) {
    //   return (
    //     <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.cancelClick}>
    //       <span className="icon-comment">{this.props.actionMessage}</span>
    //     </a>
    //   );
    // } else {
    //   return null;
    // }
    if (!this.opened) {
      return (
        <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.openerClick}>
          <span className="icon-comment">{this.props.actionMessage}</span>
        </a>
      );
    }
    return (
      <a href="#" className="comment-respond-opener" data-id={this.props.uniqueId} onClick={this.cancelClick}>
        <span className="icon-comment">{this.props.actionMessage}</span>
      </a>
    );
  },
  componentDidMount: function() {
    // console.log('CommentFormOpenerNode.componentDidMount', this.props.uniqueId, this.opened);
    // ---------------------------
    // event bind
    let replyStatus = this.replyStatus;
    if (replyStatus === null) {
      replyStatus = ReplyStatus.factory();
      this.replyStatus = replyStatus;
      // replyStatus.on( ReplyStatus.START, this.replyStart );
      // replyStatus.on(ReplyStatus.COMPLETE, this.replyComplete);
    }
    this.dispose();
    replyStatus.on(ReplyStatus.COMPLETE, this.replyComplete);
  },
  // componentWillUnMount: function() {
  //   // const replyStatus = this.replyStatus;
  //   // if (replyStatus !== null) {
  //   //   // replyStatus.off( ReplyStatus.START, this.replyStart );
  //   //   replyStatus.off(ReplyStatus.COMPLETE, this.replyComplete);
  //   // }
  //   console.log('CommentFormOpenerNode.componentWillUnMount', this.props.uniqueId, this.opened);
  //   this.dispose();
  // },
  // ----------------------------------------
  dispose: function() {
    const replyStatus = this.replyStatus;
    if (replyStatus) {
      // replyStatus.off( ReplyStatus.START, this.replyStart );
      replyStatus.off(ReplyStatus.COMPLETE, this.replyComplete);
    }
  },
  // ----------------------------------------
  // open / cancel click handler
  openerClick: function( event ) {
    event.preventDefault();
    // console.log('CommentFormOpenerNode.openerClick', this.props.uniqueId, this.opened);
    this.willOpen();
    this.opened = true;
    this.replyStatus.open( this.props.uniqueId );
  },
  cancelClick: function( event ) {
    event.preventDefault();

    this.willClose();
    this.opened = false;
    this.replyStatus.close( this.props.uniqueId );
  },
  willOpen: function() {
    // console.log('CommentFormOpenerNode.willOpen', this.props.uniqueId);
    this.setState( {toggle: 'cancel'} );
  },
  willClose: function() {
    // console.log('CommentFormOpenerNode.willClose', this.props.uniqueId);
    this.setState( {toggle: 'reply'} );
  },
  // ----------------------------------------
  checkId: function( event ) {
    return this.props.uniqueId === event.id;
  },
  // // ----------------------------------------
  // // listener
  // replyStart: function() {
  //  // @bug: 関数名と同じ変数名
  //   this.cancelClick = false;
  // },
  replyComplete: function() {
    // this.cancelClick = true;
    // this.willClose();
    this.opened = false;
    // console.log('CommentFormOpenerNode.replyComplete', this.props.uniqueId, this.opened);
  }
} );
