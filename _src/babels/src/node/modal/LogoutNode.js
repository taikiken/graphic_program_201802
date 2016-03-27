/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/08 - 19:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import {Message} from '../../app/const/Message';
import {User} from '../../app/User';

// util
import {Loc} from '../../util/Loc';

// event
import {LogoutStatus} from '../../event/LogoutStatus';

// React
let React = self.React;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

/**
 * Logout modal
 * @type {ReactClass}
 */
export let LogoutNode = React.createClass( {
  propTypes: {
    // ok click callback
    ok: React.PropTypes.func,
    // cancel click callback
    cancel: React.PropTypes.func,
    // LogoutStatus event handler を bind する
    listen: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      ok: null,
      cancel: null,
      type: 'logout',
      // PC: 不要(false), SP: 要(true)
      // 設計が悪く PC, SP で実装方法が変わってしまった
      // PC true にすると二重にマウントされる...かも
      listen: false
    };
  },
  getInitialState: function() {
    this.status = null;
    this.ok = null;
    this.cancel = null;

    return {
      show: false,
      css: {opacity: 0}
    };
  },
  render: function() {

    if ( this.state.show ) {
      return (
        <div className="modal-dialogue modal-dialogue_delete" ref="modalContainer" style={this.state.css}>
          <div className="modal-bg" onClick={this.cancelClick}></div>
          <div className={'modal-dialogue-contents ' + this.props.type}>
            <a href="#" className="modal-dialogue-close" onClick={this.cancelClick}>{Message.BUTTON_CLOSE}</a>
            <p className="lead">{Message.LOGOUT}</p>
            <ul className="btn-block">
              <li className="btn-item"><a href="#" className="btn-link btn-link_cancel" onClick={this.cancelClick}>{Message.BUTTON_NO}</a></li>
              <li className="btn-item"><a href="#" className="btn-link btn-link_submit" onClick={this.okClick}>{Message.BUTTON_YES}</a></li>
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
    if ( this.props.listen ) {
      let status = LogoutStatus.factory();
      this.status = status;
      status.on( LogoutStatus.OPEN, this.onOpen );
      status.on( LogoutStatus.CLOSE, this.onClose );
    }
  },
  componentWillUnMount: function() {
    let status = this.status;
    if ( status !== null ) {
      status.off( LogoutStatus.OPEN, this.onOpen );
      status.off( LogoutStatus.CLOSE, this.onClose );
      this.status = null;
    }
  },
  cancelClick: function( event:Event ) {
    event.preventDefault();
    if ( typeof this.cancel === 'function' ) {
      this.cancel();
    } else if ( typeof this.props.cancel === 'function' ) {
      this.props.cancel();
    }
    this.closeModal();
  },
  okClick: function( event:Event ) {
    event.preventDefault();
    if ( typeof this.ok === 'function' ) {
      this.ok();
    } else if ( typeof this.props.ok === 'function' ) {
      this.props.ok();
    } else {
      // this.ok, this.props.ok どちらも function でなかったら
      // logout 処理を行う
      User.logout();
      Loc.index();
    }
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
  },
  onOpen: function( event:Object ):void {
    this.ok = event.ok;
    this.cancel = event.cancel;
    this.updateShow( true );
  },
  onClose: function():void {
    this.ok = null;
    this.cancel = null;
  }
} );
