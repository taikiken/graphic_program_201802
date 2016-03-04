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
 * */
export let RootNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired,
    beforeRedirect: React.PropTypes.func.isRequired
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
          <SignupHeadingNode step={this.state.step} />
           <div className={stepClassSelector(this.state.step)}>
              <form ref="signup" encType="multipart/form-data" onSubmit={this.submitHandler}>
                <LegendStep1Node step={this.props.step} />
                <LegendStep2Node step={this.props.step + 1} getForm={this.getForm} />
                <LegendStep3Node step={this.props.step + 2}
                                 categories={this.props.categories}
                                 getForm={this.getForm}
                                 beforeRedirect={this.props.beforeRedirect}
                />
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
  submitHandler: function( event:Event ):void {
    event.preventDefault();
    this.status.submit( this.state.step );
  },
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  },
  getForm() {
    return ReactDOM.findDOMNode( this.refs.signup );
  }
} );
