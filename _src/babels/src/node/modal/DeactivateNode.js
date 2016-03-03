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
'use strict';

import {Message} from '../../app/const/Message';

// React
let React = self.React;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

export let DeactivateNode = React.createClass( {
  propTypes: {
    // ok click callback
    ok: React.PropTypes.func.isRequired,
    // cancel click callback
    cancel: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      show: false,
      css: {opacity: 0}
    };
  },
  render: function() {

    if ( this.state.show ) {
      return (
        <div className="modal-dialogue modal-dialogue_delete" ref="modalContainer" style={this.state.css}>
          <div className={'modal-dialogue-contents ' + this.props.type}>
            <a href="#" className="modal-dialogue-close" onClick={this.cancelClick}>閉じる</a>
            <p className="lead">{Message.DEACTIVATE}</p>
            <ul className="btn-block">
              <li className="btn-item"><a href="#" className="btn-link btn-link_cancel" onClick={this.cancelClick}>キャンセル</a></li>
              <li className="btn-item"><a href="#" className="btn-link btn-link_submit" onClick={this.deleteClick}>退会</a></li>
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
  updateShow: function( show:boolean ) {
    this.setState( { show: show } );
    if ( show ) {
      this.openModal();
    }
  }
} );
