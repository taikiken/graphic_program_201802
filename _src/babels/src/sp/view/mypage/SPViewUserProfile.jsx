/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 14:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../../../view/View';
import ViewUserProfile from '../../../view/mypage/ViewUserProfile';

// app
import {Empty} from '../../../app/const/Empty';

// data
import {Safety} from '../../../data/Safety';

// dae
import {UserDae} from '../../../dae/UserDae';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * SP - ユーザー情報 設定画面上 - HTML 出力します - 「お知らせ一覧」・「お気に入りカテゴリ無し」
 * @param {string} loggedIn login 済み class name
 * @param {string} icon user avatar path
 * @param {string} userName user name
 * @returns {XML} `div.user-profile`
 * @constructor
 */
export const SPUserProfileComponent = ({ loggedIn, icon, userName }) => (
  <div className="user-profile">
    <figure className={`user-profile-avatar ${loggedIn}`}>
      <img src={Empty.refresh(icon)} alt={userName}/>
    </figure>
    <div className="user-profile-data">
      <p className="user-profile-name">{userName}</p>
    </div>
  </div>
);

/**
 * React.propTypes
 * @type {{loggedIn: string, icon: string, userName: string}}
 */
SPUserProfileComponent.propTypes = {
  loggedIn: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired,
};

/**
 * SP ユーザー情報 設定画面上- 「お知らせ一覧」・「お気に入りカテゴリ無し」
 */
export default class SPViewUserProfile extends ViewUserProfile {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * Dom を生成します
   * @param {Object} response JSON response object
   */
  render( response:Object ):void {
    // let userDae = new UserDae( response );
    // let _this = this;
    //
    // let SPUserProfileDom = React.createClass( {
    //   propTypes: {
    //     dae: React.PropTypes.object.isRequired
    //   },
    //   render: function() {
    //     let dae = this.props.dae;
    //
    //     let icon = Safety.image( dae.profilePicture, Empty.USER_EMPTY );
    //     let loggedIn = Safety.same( icon, Empty.USER_EMPTY );
    //
    //     return (
    //       <div className="user-profile">
    //         <figure className={'user-profile-avatar ' + loggedIn}>
    //           <img src={Empty.refresh(icon)} alt={dae.userName}/>
    //         </figure>
    //         <div className="user-profile-data">
    //           <p className="user-profile-name">{dae.userName}</p>
    //         </div>
    //       </div>
    //     );
    //   },
    //   componentDidMount: function() {
    //     // callback
    //     _this.executeSafely( View.DID_MOUNT );
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <SPUserProfileDom dae={userDae} />,
    //   this.element
    // );

    const userDae = new UserDae(response);
    const icon = Safety.image(userDae.profilePicture, Empty.USER_EMPTY);
    const loggedIn = Safety.same(icon, Empty.USER_EMPTY);
    ReactDOM.render(
      <SPUserProfileComponent
        loggedIn={loggedIn}
        icon={icon}
        userName={userDae.userName}
      />,
      this.element,
    );
    // 通知
    this.executeSafely(View.DID_MOUNT);
  }
}
