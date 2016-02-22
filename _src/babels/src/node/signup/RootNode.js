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
'use strict';

import {SignupStatus} from '../../event/SignupStatus';

import {SignupHeading} from './SignupHeading';
import {LegendStep1} from './LegendStep1';
import {LegendStep2} from './LegendStep2';
import {LegendStep3} from './LegendStep3';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * @description
 * signup main HTML
 * <code>
 *  <RootNode />
 *    <SignupHeading />
 *    <form />
 *      <LegendStep1 />
 *      <LegendStep2 />
 *      <LegendStep3 />
 * </code>
 * */
export let RootNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: this.props.step
    };
  },
  render: function() {

    let stepClassSelector = ( step ) => {
      console.log( 'stepClassSelector ', step );
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
          <SignupHeading step={this.state.step} />
           <div className={stepClassSelector(this.state.step)}>
              <form ref="signup" encType="multipart/form-data" onSubmit={this.submitHandler}>
                <LegendStep1 step={this.props.step} />
                <LegendStep2 step={this.props.step + 1} />
                <LegendStep3 step={this.props.step + 2} categories={this.props.categories} />
                <div className="submit-hidden-container"><input type="submit" /></div>
              </form>
          </div>
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
    // form 通知
    let form = ReactDOM.findDOMNode( this.refs.signup );
    this.status.form( form );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
    this.dispose();
  },
  shouldComponentUpdate: function( nextProps, nextState ) {
    return this.state.step !== nextState.step;
  },
  submitHandler: function( event:Event ):void {
    event.preventDefault();
    this.status.submit( this.state.step );
  },
  requestDone: function( event ):void {

  },
  requestError: function( event ):void {

  },
  dispose: function():void {

  },
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  }
} );
