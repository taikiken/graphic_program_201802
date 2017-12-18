/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/03 - 22:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Message} from '../../app/const/Message';

// React
let React = self.React;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

/**
 * 退会モーダル node
 * @type {ReactClass}
 * @deprecated 2017-12-13 instead use {@link DeactivateNode}
 * TODO future remove
 */
export let DeactivateNode = React.createClass( {
  propTypes: {
    // ok click callback
    ok: React.PropTypes.func.isRequired,
    // cancel click callback
    cancel: React.PropTypes.func.isRequired,
    // show / no
    show: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      show: false,
      type: 'deactivate'
    };
  },
  getInitialState: function() {
    return {
      show: this.props.show,
      css: {opacity: 0}
    };
  },
  render: function() {

    if ( this.state.show ) {
      return (
        <div className="modal-dialogue modal-dialogue_delete" ref="modalContainer" style={this.state.css}>
          <div className="modal-bg" onClick={this.cancelClick} />
          <div className={'modal-dialogue-contents ' + this.props.type}>
            <a href="#" className="modal-dialogue-close" onClick={this.cancelClick}>{Message.BUTTON_CLOSE}</a>
            <p className="lead">{Message.DEACTIVATE}</p>
            <ul className="btn-block">
              <li className="btn-item"><a href="#" className="btn-link btn-link_cancel" onClick={this.cancelClick}>{Message.BUTTON_CANCEL}</a></li>
              <li className="btn-item"><a href="#" className="btn-link btn-link_submit" onClick={this.deleteClick}>{Message.BUTTON_DEACTIVATE}</a></li>
            </ul>
          </div>
        </div>
      );
    } else {
      // not show
      return null;
    }
  },
  componentDidMount: function() {
    if ( this.state.show ) {
      this.openModal();
    }
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
          _this.setState( { css: {opacity: 0}, show: false } );

        }
      }
    );
  },
  updateShow: function( show:Boolean ) {
    this.setState( { show: show } );
    if ( show ) {
      this.openModal();
    }
  }
} );
