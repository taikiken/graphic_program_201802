/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 14:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../View';

// app
import {User} from '../../app/User';
import {Message} from '../../app/const/Message';

// util
import {Loc} from '../../util/Loc';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * logout
 */
export class ViewLogout extends View {
  /**
   * logout します, token を削除します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * render start
   */
  start():void {
    this.render();
  }
  /**
   * フォーム生成を開始します
   */
  render():void {

    let LogoutDom = React.createClass( {
      getInitialState: function() {
        return {
          loading: ''
        };
      },
      render: function() {
        return (
          <div className="mod-btnB01 mt30 btn-withdraw">
            <div className={'loading-root ' + this.state.loading}>
              <a href="#" onClick={this.clickHandler}>{Message.SUBMIT_LOGOUT}</a>
              <div className="loading-spinner" />
            </div>
          </div>
        );
      },
      clickHandler: function( event:Event ) {
        event.preventDefault();
        this.setState( { loading: 'loading' } );

        User.logout();
        Loc.index();
      }
    } );

    ReactDOM.render(
      <LogoutDom />,
      this.element
    );
  }
}
