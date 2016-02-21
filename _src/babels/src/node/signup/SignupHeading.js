/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/19 - 21:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Url} from '../../app/const/Url';

// React
let React = self.React;

export let SignupHeading = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  render: function() {

    switch ( this.props.step ) {

      case 1:
        // input email
        return (
          <div className="signup-heading">
            <h1>新規会員登録</h1>
            <p className="btn"><a href={Url.login()}>ログインはこちら &gt;</a></p>
          </div>
        );

      case 2:
        // input name and upload image
        return (
          <div className="signup-heading">
            <h1>新規会員登録</h1>
          </div>
        );

      case 3:
        // select interest sports
        return (
          <div className="signup-heading">
            <h1>興味のある競技を選択</h1>
          </div>
        );

      default:
        console.warn( `SignupHeading illegal step. ${this.props.step}` );
        return null;

    }

  }
} );
