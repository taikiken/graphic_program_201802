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

let SignupStepNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  render: function() {

    let current = ( itemNum, stateStep ) => {
      return itemNum === stateStep ? 'current' : '';
    };

    return (
      <div className="signup-step">
        <ul className="signup-step-list">
          <li className={'signup-step-item signup-step-step1 ' + current( 1, this.props.step )}><span>基本情報設定</span></li>
          <li className={'signup-step-item signup-step-step2 ' + current( 2, this.props.step )}><span>興味のある競技</span></li>
          <li className={'signup-step-item signup-step-step3'}><span>完了</span></li>
        </ul>
      </div>
    );

  }
} );

export let SignupHeadingNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  render: function() {

    switch ( this.props.step ) {

      case 1:
        // input email
        return (
          <div className="signup-heading-container">
            <div className="signup-heading">
              <h1>新規会員登録</h1>
              <p className="btn"><a href={Url.login()}>ログインはこちら &gt;</a></p>
            </div>
          </div>
        );

      case 2:
        // input name and upload image
        return (
          <div className="signup-heading-container">
            <SignupStepNode step={1} />
            <div className="signup-heading">
              <h1>新規会員登録</h1>
            </div>
          </div>
        );

      case 3:
        // select interest sports
        return (
          <div className="signup-heading-container">
            <SignupStepNode step={2} />
            <div className="signup-heading">
              <h1>興味のある競技を選択</h1>
            </div>
          </div>
        );

      default:
        console.warn( `SignupHeading illegal step. ${this.props.step}` );
        return null;

    }

  }
} );
