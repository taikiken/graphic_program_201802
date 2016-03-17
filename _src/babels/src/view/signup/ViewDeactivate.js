/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/03 - 22:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view
import {View} from '../View';

// model
import {Model} from '../../model/Model';
import {ModelSignOut} from '../../model/signup/ModelSignOut';

import {DeactivateNode} from '../../node/modal/DeactivateNode';

// app
import {User} from '../../app/User';
import {Message} from '../../app/const/Message';

// util
import {Loc} from '../../util/Loc';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 退会 表示
 */
export class ViewDeactivate extends View {
  /**
   * 退会 表示
   * @param {Element} element target HTMLElement
   * @param {Element} modalElement modal root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, modalElement:Element, option:Object = {} ) {
    super( element, option );
    this._modalElement = modalElement;
  }

  /**
   * modal root element
   * @return {Element|*} modal root element を返します
   */
  get modalElement():Element {
    return this._modalElement;
  }

  /**
   * alias render
   */
  start():void {
    this.render();
  }
  /**
   * rendering 開始
   */
  render():void {

    let modalElement = this.modalElement;

    let DeactivateDom = React.createClass( {
      propTypes: {
      },
      getInitialState: function() {
        this.modal = null;
        this.callback = null;
        this.model = null;

        return {
          loading: ''
        };
      },
      render: function() {
        return (
          <div className="mod-btnB01 mt30 btn-withdraw">
            <div className={'loading-root ' + this.state.loading}>
              <a href="#" onClick={this.clickHandler}>{Message.BUTTON_DEACTIVATE_TEXT}</a>
              <div className="loading-spinner"></div>
            </div>
          </div>
        );
      },
      componentDidMount: function() {
        let callback = this.callback;
        if ( callback === null ) {
          callback = {};
          this.callback = callback;
          callback[ Model.COMPLETE ] = this.done;
          callback[ Model.UNDEFINED_ERROR ] = this.fail;
          callback[ Model.RESPONSE_ERROR ] = this.fail;
        }

        // model
        if ( this.model === null ) {
          this.model = new ModelSignOut( callback );
        }
      },
      componentWillUnMount: function() {
      },
      clickHandler: function( event ) {
        event.preventDefault();
        let modal = this.modal;

        if ( modal === null ) {
          modal = ReactDOM.render(
            <DeactivateNode
              ok={this.okHandler}
              cancel={this.cancelHandler}
              show={true}
            />,
            modalElement
          );
          this.modal = modal;

        } else {
          // open modal
          modal.updateShow( true );
          this.setState( { loading: 'loading' } );
        }
      },
      okHandler: function() {
        this.model.start();
      },
      cancelHandler: function() {
        this.setState( { loading: '' } );
      },
      done: function( event:Object ) {
        // keep cover
        console.log( 'done event ', event );
        if ( event.code === 200 ) {
          // sign out
          User.logout();
          Loc.index();
        }

      },
      fail: function( error ) {
        console.log( 'error ', error );
        this.setState( { loading: '' } );
      }
    } );

    ReactDOM.render(
      <DeactivateDom/>,
      this.element
    );
  }
}
