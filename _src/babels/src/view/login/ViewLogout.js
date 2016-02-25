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
'use strict';

import {View} from '../View';

import {User} from '../../app/User';

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
      render: function() {
        return (
          <div className="logout-button">
            <a href="#" onClick={this.clickHandler}>ログアウト</a>
          </div>
        );
      },
      clickHandler: function( event:Event ) {
        event.preventDefault();
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
