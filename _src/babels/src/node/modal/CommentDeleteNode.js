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
'use strict';

import {MessageStatus} from '../../event/MessageStatus';
import {Message} from '../../app/const/Message';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

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
        <div className="modal-container opaque" ref="modalContainer" style={this.state.css}>
          <div className="modal-container-bg"></div>
          <div className={'modal-container-content ' + this.props.type}>
            <div className="modal-container-message">
              <p>{Message.DELETE}</p>
            </div>
            <div className="modal-container-buttons">
              <div className="button-cancel">
                <span className="setting-form-submit mod-btnB01">
                  <input type="button" value="キャンセル" onClick={this.cancelClick}/>
                </span>
              </div>
              <div className="button-ok">
                <span className="setting-form-submit mod-btnB01">
                  <input type="button" value="削除" onClick={this.deleteClick}/>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
  componentDidMount: function() {
    console.log( '----mount modal' );
    this.openModal();
  },
  componentWillUnMount: function() {
  },
  cancelClick: function( event:Event ) {
    event.preventDefault();
    console.log( 'cancelClick ', this.props.id );
    this.status.dispatch( {type: MessageStatus.CANCEL_CLICK, id: this.state.id} );
    this.props.cancel();
    this.closeModal();
  },
  deleteClick: function( event:Event ) {
    event.preventDefault();
    console.log( 'deleteClick ', this.props.id );
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
          _this.setState( { css: {opacity: 0} } );
          _this.setState( { show: false } );
        }
      }
    );
  },
  updateShow: function( show:boolean, id, ok, cancel, type ) {
    this.setState( { show: show, id: id, ok: ok, cancel: cancel, type: type } );
    if ( show ) {
      this.openModal();
    }
  }
} );
