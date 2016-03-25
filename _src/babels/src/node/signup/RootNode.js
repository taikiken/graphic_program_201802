/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/19 - 21:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {SignupStatus} from '../../event/SignupStatus';

import {SignupHeadingNode} from './SignupHeadingNode';
import {LegendStep1Node} from './LegendStep1Node';
import {LegendStep2Node} from './LegendStep2Node';
import {LegendStep3Node} from './LegendStep3Node';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * @description
 * signup main HTML
 * <code>
 *  <RootNode />
 *    <SignupHeadingNode />
 *    <form />
 *      <LegendStep1 />
 *      <LegendStep2 />
 *      <LegendStep3 />
 * </code>
 *
 * @type {ReactClass}
 * */
export let RootNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired,
    beforeRedirect: React.PropTypes.func.isRequired,
    sp: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: this.props.step,
      email1: '',
      email2: ''
    };
  },
  render: function() {

    let stepClassSelector = ( step ) => {
      // console.log( 'stepClassSelector ', step );
      switch (step) {
        case 2:
          return 'basic-setting setting-form';

        case 3:
          return 'interest-setting setting-form';

        case 1:
        default:
          return 'register';
      }
    };

    return (
      <div className="body-sec">
        <div className="body-sec-inner">
          <SignupHeadingNode step={this.state.step} />
           <div className={stepClassSelector(this.state.step)}>
              <form ref="signup" encType="multipart/form-data" onSubmit={this.submitHandler}>
                <LegendStep1Node
                  step={this.props.step}
                  changeEmail={this.email1Change}
                  email={this.state.email1}
                />
                <LegendStep2Node
                  step={this.props.step + 1}
                  getForm={this.getForm}
                  changeEmail={this.email2Change}
                  email={this.state.email2}
                  sp={this.props.sp}
                />
                <LegendStep3Node
                  step={this.props.step + 2}
                  categories={this.props.categories}
                  getForm={this.getForm}
                  beforeRedirect={this.props.beforeRedirect}
                />

                {/* submit button, 非表示 */}
                <div className="submit-hidden-container"><input type="submit" /></div>
              </form>
          </div>
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
    this.dispose();
  },
  shouldComponentUpdate: function( nextProps, nextState ) {
    return this.state.step !== nextState.step;
  },
  // submit / button が押された時の Event handler
  // SignupHeadingNode の表示状態を切り替えるため
  submitHandler: function( event:Event ):void {
    event.preventDefault();
    this.status.submit( this.state.step );
  },
  // SIGNUP_STEP event handler
  // form 表示切り替えるため
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  // state.step を切り替える
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  },
  // from node を返します
  getForm: function():Element {
    return ReactDOM.findDOMNode( this.refs.signup );
  },
  // -----------------------------------------------
  // email を step1 と step2 で同じする
  email1Change: function( email:string ):void {
    // email 1 が変更されたので email 2 へ通知する
    console.log( 'email1Change ', email );
    this.setState( { email2: email } );
  },
  email2Change: function( email:string ):void {
    // email 2 が変更されたので email 1 へ通知する
    console.log( 'email2Change ', email );
    this.setState( { email1: email } );
  }
} );
