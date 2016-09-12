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

// event
import {SignupStatus} from '../../event/SignupStatus';

// app
import {Url} from '../../app/const/Url';

// React
const React = self.React;

// Sagen
const Sagen = self.Sagen;

// lead 文
// step 1 だけ表示
/**
 * <p>ユーザー登録ウイザード</p>
 * <p>lead 文,  step 1 だけ表示</p>
 * @private
 * @type {ReactClass}
 */
let LeadNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  render: function() {
    // sp なし
    // @since 2016-09-12
    if (this.props.step === 1 && !Sagen.Browser.Mobile.phone()) {
      return (
        <p className="lead">
          会員登録は無料です。<br />
          あなたの興味のあるニュースをお届けします。
        </p>
      );
    } else {
      // それ以外は空にする
      return null;
    }
  }
} );
/**
 * <p>ユーザー登録ウイザード</p>
 * <p>signup page 内 title<br>
 * .signup-header</p>
 *
 * ```
 * <header className="signup-header">
 *  <h1 className="heading">SPORTS BULL</h1>
 *  <LeadNode step={this.state.step} />
 * </header>
 * ```
 *
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
        <h1 className="heading"><a href={Url.index()}>SPORTS BULL</a></h1>
        <LeadNode step={this.state.step} />
      </header>
    );
    // @since 2016-09-12
    // トルツメをキャンセル
    // // .signup-header 内の p.lead はトルツメ
    // // https://paper.dropbox.com/doc/SPORTS-BULL-DRIEolzKHNECwXGwZDYM2
    // // @since 2016-09-09
    // return (
    //   <header className="signup-header">
    //     <h1 className="heading"><a href={Url.index()}>SPORTS BULL</a></h1>
    //   </header>
    // );
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
