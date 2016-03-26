/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/26 - 13:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {MessageStatus} from '../../event/MessageStatus';
// import {Message} from '../../app/const/Message';

// React
let React = self.React;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

/**
 * Flush modal を表示します
 * @type {*|Function|ReactClass}
 */
export let FlushNode = React.createClass( {
  propTypes: {
    show: React.PropTypes.bool,
    type: React.PropTypes.string,
    message: React.PropTypes.element
  },
  getDefaultProps: function() {
    return {
      show: false,
      // info | error | success の 3種類
      type: 'info',

      message: <p>&nbsp;</p>
    };
  },
  getInitialState: function() {
    this.status = null;

    return {
      show: this.props.show,
      type: this.props.type,
      message: this.props.message,
      css: {opacity: 0}
    };
  },
  render: function() {
    if ( !this.state.show ) {
      return null;
    } else {
      return (
        <div className="modal-dialogue modal-dialogue_delete" ref="modalContainer" style={this.state.css}>
          <div className="flush-modal-bg modal-bg"></div>
          <div className={`flush-dialogue dialogue-notice ${this.state.type}`}>
            <div className="dialogue-notice-inner">
              <div className="dialogue-notice-info">{this.state.message}</div>
            </div>
          </div>
        </div>
      );
    }
  },
  componentDidMount: function() {
    if ( this.status === null ) {
      this.status = MessageStatus.factory();
    }
  },
  openModal: function() {
    let object = { opacity: 0 };
    let _this = this;

    TweenLite.to(
      object,
      0.1,
      {
        opacity: 1,
        easing: easing.Linear.easeNone,
        onUpdate: function() {
          _this.setState( { css: {opacity: object.opacity} } );
        },
        onComplete: function() {
          _this.setState( { css: {opacity: 1} } );
          _this.closeModal( 0.25 );
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
  updateShow: function( show:Boolean, message, type:string = MessageStatus.INFO ) {
    this.setState( { show: show, message: message, type: type } );
    if ( show ) {
      this.openModal();
    }
  }
} );
