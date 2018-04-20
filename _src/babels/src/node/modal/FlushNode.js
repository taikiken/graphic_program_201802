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

import { MessageStatus } from '../../event/MessageStatus';
// import {Message} from '../../app/const/Message';

// util
import { Scroll } from '../../util/Scroll';
//
// // Sagen
// let Sagen = self.Sagen;

// React
const React = self.React;

// tween
const greensock = self.com.greensock;
const TweenLite = greensock.TweenLite;
const easing = greensock.easing;

/**
 * Flush modal を表示します
 * @type {*|Function|ReactClass}
 */
export const FlushNode = React.createClass( {
  propTypes: {
    show: React.PropTypes.bool,
    type: React.PropTypes.string,
    message: React.PropTypes.element,
    vk: React.PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      show: false,
      // info | error | success の 3種類
      type: 'info',
      message: <p>&nbsp;</p>,
      vk: false,
    };
  },
  getInitialState: function() {
    // this.status = null;
    // this.sp = Sagen.Browser.Mobile.phone();
    this.top = 0;

    return {
      show: this.props.show,
      type: this.props.type,
      message: this.props.message,
      css: {opacity: 0}
    };
  },
  openModal: function() {
    const object = { opacity: 0 };
    const _this = this;

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
          _this.closeModal( 0.25 * 3 );
        }
      }
    );
  },
  closeModal: function( delay:Number = 0 ) {
    const object = { opacity: 1 };
    const _this = this;

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
          _this.top = 0;
        }
      }
    );
  },
  updateShow: function( show:Boolean, message, type:string = MessageStatus.INFO, sp:Boolean = false ) {
    // console.log( 'updateShow ', show, message, type, sp );
    if ( sp ) {
      this.top = Scroll.y;
    } else {
      this.top = 0;
    }
    this.setState( { show: show, message: message, type: type } );
    if ( show ) {
      this.openModal();
    }
  },
  render: function() {
    const position = () => {
      if ( this.top !== 0 ) {
        return { top: `${this.top}px` };
      } else {
        return { opacity: 1 };
      }
    };
    // console.log( 'render ', this.state.show, position() );
    if ( !this.state.show ) {
      return null;
    } else {
      return (
        <div className="modal-dialogue modal-dialogue_delete" style={this.state.css}>
          <div className="flush-modal-bg modal-bg" />
          <div className={`flush-dialogue dialogue-notice ${this.state.type}`} style={position()}>
            <div className="dialogue-notice-inner">
              <div className="dialogue-notice-info">{this.state.message}</div>
            </div>
          </div>
        </div>
      );
    }
  },
});
