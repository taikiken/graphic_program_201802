/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/19 - 20:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {SignupStatus} from '../../event/SignupStatus';

import {Url} from '../../app/const/Url';

// React
let React = self.React;

// lead 文
// step 1 だけ表示
/**
 * lead 文
 * @private
 * @type {ReactClass}
 */
let LeadNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  render: function() {

    if ( this.props.step === 1 ) {
      return (
        <p className="lead">
          会員登録は無料です。<br />
          あなたの興味のあるニュースをお届けします。
        </p>
      );
    } else {

      return null;

    }

  }
} );
/**
 * signup page 内 title
 * .signup-header
 * ```
 * <header className="signup-header">
 *  <h1 className="heading">運動通信</h1>
 *  <LeadNode step={this.state.step} />
 * </header>
 * ```
 * @type {ReactClass}
 */
export let HeadingNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: this.props.step
    };
  },
  render: function() {

    return (
      <header className="signup-header">
        <h1 className="heading"><a href={Url.index()}>運動通信</a></h1>
        <LeadNode step={this.state.step} />
      </header>
    );
  },
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  }
} );
