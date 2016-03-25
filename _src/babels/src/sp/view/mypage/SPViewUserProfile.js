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


import {View} from '../../../view/View';
import {ViewUserProfile} from '../../../view/mypage/ViewUserProfile';

// app
import {Empty} from '../../../app/const/Empty';

// data
import {Safety} from '../../../data/Safety';

// dae
import {UserDae} from '../../../dae/UserDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP ユーザー情報 設定画面上
 */
export class SPViewUserProfile extends ViewUserProfile {
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
    let userDae = new UserDae( response );
    let _this = this;

    let SPUserProfileDom = React.createClass( {
      propTypes: {
        dae: React.PropTypes.object.isRequired
      },
      render: function() {
        let dae = this.props.dae;

        /*
        let loggedIn = 'user-logged-in';

        let icon = dae.profilePicture;

        if ( !icon ) {
          icon = Empty.USER_EMPTY;
          loggedIn = '';
        } else if ( !Safety.isImg( icon ) ) {
          if ( !Safety.isGraph( icon ) ) {
            icon = Empty.USER_EMPTY;
          }
          loggedIn = '';
        }
        */
        let icon = Safety.image( dae.profilePicture, Empty.USER_EMPTY );
        let loggedIn = Safety.same( icon, Empty.USER_EMPTY );

        return (
          <div className="user-profile">
            <figure className={'user-profile-avatar ' + loggedIn}>
              <img src={icon} alt={dae.userName}/>
            </figure>
            <div className="user-profile-data">
              <p className="user-profile-name">{dae.userName}</p>
            </div>
          </div>
        );
      },
      componentDidMount: function() {
        // callback
        _this.executeSafely( View.DID_MOUNT );
      }
    } );

    ReactDOM.render(
      <SPUserProfileDom dae={userDae} />,
      this.element
    );

  }
}
