/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 17:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';
import {ViewHeaderMember} from './ViewHeaderMember';
import {User} from '../../app/User';
import {UserStatus} from '../../event/UserStatus';


// React
let React = self.React;
let ReactDOM = self.ReactDOM;

export class ViewHeaderUser extends View {
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this.init();
  }

  init():void {
    if ( User.sign ) {
      // login member
      let member = new ViewHeaderMember( this.element );
      member.start();
    } else {
      // normal user
      this.render();
    }
  }

  render():void {

    let _this = this;

    let UserDom = React.createClass( {
      render: function() {

        return (
          <div className="user">
            <a className="user-signup" href="/signup/">無料登録 / ログイン</a>
          </div>
        );
      },
      componentDidMount: function() {

        _this.executeSafely( View.DID_MOUNT );

      }
    } );

    ReactDOM.render(
      <UserDom />,
      this.element
    );
  }
}
