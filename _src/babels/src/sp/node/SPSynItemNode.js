/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 14:40
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
import {Url} from '../../app/const/Url';

// event
import {LogoutStatus} from '../../event/LogoutStatus';

// React
let React = self.React;

/**
 * side menu login / logout 切り替えメニュー
 * @type {React.component}
 */
export let SPSynItemNode = React.createClass( {
  propTypes: {
    // sign in ずみ真偽値 true sign in
    sign: React.PropTypes.bool.isRequired,
    // did mount を通知する callback method
    callback: React.PropTypes.func.isRequired,
    // LogoutNode instance
    modal: React.PropTypes.object.isRequired
  },
  render: function() {
    if ( this.props.sign ) {

      // login
      return (
        <ul>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-home" href={Url.index()}><i>&nbsp;</i>運動通信トップへ</a></li>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-mypage" href={Url.mypage()}><i>&nbsp;</i>マイページ</a></li>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-config" href={Url.settings()}><i>&nbsp;</i>設定</a></li>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-logout" href="#" onClick={this.logoutClick}><i>&nbsp;</i>ログアウト</a></li>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-about" href={Url.about()}><i>&nbsp;</i>運動通信とは</a></li>
        </ul>
      );

    } else {

      // not login
      return (
        <ul>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-home" href={Url.index()}><i>&nbsp;</i>運動通信トップへ</a></li>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-login" href={Url.login()}><i>&nbsp;</i>無料登録・ログイン</a></li>
          <li className="side-menu-ut-nav"><a className="side-menu-ut-nav-link side-menu-ut-nav-about" href={Url.about()}><i>&nbsp;</i>運動通信とは</a></li>
        </ul>
      );

    }
  },
  componentDidMount: function() {
    this.props.callback();
    this.status = LogoutStatus.factory();
  },
  logoutClick: function( event:Event ):void {
    event.preventDefault();
    this.status.open();
  }
} );
