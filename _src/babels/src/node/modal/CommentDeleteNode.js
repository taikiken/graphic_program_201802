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
    type: React.PropTypes.string,
    ok: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      type: MessageStatus.INFO
    };
  },
  getInitialState: function() {
    this.status = MessageStatus.factory();

    return {
      show: true,
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
    this.props.cancel();
    this.closeModal();
  },
  deleteClick: function( event:Event ) {
    event.preventDefault();
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
  updateShow: function( show:boolean ) {
    this.setState( { show: show } );
    if ( show ) {
      this.openModal();
    }
  }
} );
