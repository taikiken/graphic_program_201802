/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 21:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {MessageStatus} from '../../event/MessageStatus';
import {Message} from '../../app/const/Message';

// React
let React = self.React;
// let ReactDOM = self.ReactDOM;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

/**
 * 削除 モーダル
 * @type {ReactClass}
 */
export let CommentDeleteNode = React.createClass( {
  propTypes: {
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    ok: React.PropTypes.func,
    cancel: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      type: MessageStatus.INFO,
      ok: function() {},
      cancel: function() {}
    };
  },
  getInitialState: function() {
    this.status = MessageStatus.factory();

    return {
      show: true,
      id: this.props.id,
      ok: this.props.ok,
      cancel: this.props.cancel,
      type: this.props.type,
      css: {opacity: 0}
    };
  },
  render: function() {
    if ( !this.state.show ) {
      return null;
    } else {
      return (
        <div className="modal-dialogue modal-dialogue_delete" ref="modalContainer" style={this.state.css}>
          <div className="modal-bg" onClick={this.cancelClick} />
          <div className={'modal-dialogue-contents ' + this.props.type}>
            <a href="#" className="modal-dialogue-close" onClick={this.cancelClick}>{Message.BUTTON_CLOSE}</a>
            <p className="lead">{Message.DELETE}</p>
            <ul className="btn-block">
              <li className="btn-item"><a href="#" className="btn-link btn-link_cancel" onClick={this.cancelClick}>{Message.BUTTON_CANCEL}</a></li>
              <li className="btn-item"><a href="#" className="btn-link btn-link_submit" onClick={this.deleteClick}>{Message.BUTTON_DELETE}</a></li>
            </ul>
          </div>
        </div>
      );
    }
  },
  componentDidMount: function() {
    // console.log( '----mount modal' );
    this.openModal();
  },
  /*
  componentWillUnMount: function() {
  },
  */
  cancelClick: function( event:Event ) {
    event.preventDefault();
    // console.log( 'cancelClick ', this.props.id );
    this.status.dispatch( {type: MessageStatus.CANCEL_CLICK, id: this.state.id} );
    this.props.cancel();
    this.closeModal();
  },
  deleteClick: function( event:Event ) {
    event.preventDefault();
    // console.log( 'deleteClick ', this.props.id );
    this.status.dispatch( {type: MessageStatus.OK_CLICK, id: this.state.id} );
    this.props.ok();
    this.closeModal( 0.5 );
  },
  openModal: function() {
    let object = { opacity: 0 };
    let _this = this;

    TweenLite.to(
      object,
      0.5,
      {
        opacity: 1,
        easing: easing.Linear.easeNone,
        onUpdate: function() {
          _this.setState( { css: {opacity: object.opacity} } );
        },
        onComplete: function() {
          _this.setState( { css: {opacity: 1} } );
        }
      }
    );
  },
  closeModal: function( delay:Number = 0 ) {
    let object = { opacity: 1 };
    let _this = this;

    TweenLite.to(
      object,
      0.5,
      {
        delay: delay,
        opacity: 0,
        easing: easing.Linear.easeNone,
        onUpdate: function() {
          _this.setState( { css: {opacity: object.opacity} } );
        },
        onComplete: function() {
          _this.setState( { css: {opacity: 0}, show: false } );
        }
      }
    );
  },
  updateShow: function( show:Boolean, id, ok, cancel, type ) {
    this.setState( { show: show, id: id, ok: ok, cancel: cancel, type: type } );
    if ( show ) {
      this.openModal();
    }
  }
} );
