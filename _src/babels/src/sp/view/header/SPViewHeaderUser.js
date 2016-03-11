/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 19:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view
import {View} from '../../../view/View';

import {SPViewHeaderMember} from './SPViewHeaderMember';

// app
import {User} from '../../../app/User';
import {Url} from '../../../app/const/Url';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;


export class SPViewHeaderUser extends View {
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  start():void {
    this.render();
  }
  render():void {
    if ( User.sign ) {
      this.member();
    } else {
      this.user();
    }
  }
  member():void {
    let headerMember = new SPViewHeaderMember(this.element);
    headerMember.start();
  }
  user():void {
    // 非ログインユーザー
    let UserDom = React.createClass( {
      render: function() {
        return (
          <div className="user">
            <div className="preference">
              <a href={Url.login()} className="preference-opener"><span className="preference-avatar">&nbsp;</span></a>
            </div>
          </div>
        );
      }
    } );

    ReactDOM.render(
      <UserDom/>,
      this.element
    );
  }
}
