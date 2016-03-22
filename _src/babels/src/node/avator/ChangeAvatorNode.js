/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 21:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Message} from '../../app/const/Message';

let React = self.React;

// ------------------------------------------
// user picture thumbnail 作成
// ------------------------------------------
/**
 * ユーザーアイコン画像選択後の変更リンク
 * @type {ReactClass}
 */
export let ChangeAvatarNode = React.createClass( {
  propTypes: {
    // 表示・非表示
    show: React.PropTypes.bool.isRequired,
    // click 通知関数
    handler: React.PropTypes.func.isRequired
  },
  render: function() {
    if ( this.props.show ) {
      return (
        <span className="should-change-avatar">
          <a href="#" onClick={this.clickHandler}>{Message.PLACEHOLDER_CHANGE_PICTURE}</a>
        </span>
      );
    } else {
      return null;
    }
  },
  // ユーザーアイコン画像選択後の変更リンク click event handler
  // 親コンポーネントへ通知する
  clickHandler: function( event:Event ) {
    event.preventDefault();
    this.props.handler();
  }
} );
