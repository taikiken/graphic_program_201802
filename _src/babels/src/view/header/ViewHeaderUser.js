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

/**
 * header user 関連メニュー
 */
export class ViewHeaderUser extends View {
  /**
   * <p>header user 関連メニュー<br>
   * ログイン / 非ログイン でメニューを変更</p>
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * Ajax request を開始します
   */
  start():void {
    if ( User.sign ) {
      // login member
      let member = new ViewHeaderMember( this.element );
      member.start();
    } else {
      // user menu
      this.render();
    }
  }
  /**
   * 非メンバー Dom を生成します
   */
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
