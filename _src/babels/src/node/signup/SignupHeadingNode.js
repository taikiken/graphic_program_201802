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
import {Message} from '../../app/const/Message';

// React
let React = self.React;

/**
 * 新規登録 ナビ部分
 * @private
 * @type {React.component}
 */
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
          <li className={'signup-step-item signup-step-step1 ' + current( 1, this.props.step )}><span>{Message.SIGNUP_STEP_1}</span></li>
          <li className={'signup-step-item signup-step-step2 ' + current( 2, this.props.step )}><span>{Message.SIGNUP_STEP_2}</span></li>
          <li className={'signup-step-item signup-step-step3'}><span>{Message.SIGNUP_STEP_3}</span></li>
        </ul>
      </div>
    );

  }
} );

/**
 * 新規登録 タイトル部分
 * @type {React.component}
 */
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
              <h1>{Message.TITLE_ENTRY_MEMBER}</h1>
              <p className="btn"><a href={Url.login()}>{Message.HERE_TO_LOGIN}&gt;</a></p>
            </div>
          </div>
        );

      case 2:
        // input name and upload image
        return (
          <div className="signup-heading-container">
            <SignupStepNode step={1} />
            <div className="signup-heading">
              <h1>{Message.TITLE_ENTRY_MEMBER}</h1>
            </div>
          </div>
        );

      case 3:
        // select interest sports
        return (
          <div className="signup-heading-container">
            <SignupStepNode step={2} />
            <div className="signup-heading">
              <h1>{Message.TITLE_INTEREST_SPORTS}</h1>
            </div>
          </div>
        );

      default:
        console.warn( `SignupHeading illegal step. ${this.props.step}` );
        return null;

    }

  }
} );
