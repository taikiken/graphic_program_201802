/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/20 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {SignupStatus} from '../../event/SignupStatus';

let React = self.React;
//
//let Step3List = React.createClass( {
//
//} );

let Step3Form = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      email: '',
      step: this.props.step,
      error: {
        email: false
      }
    };
  },
  render: function() {

    switch (this.state.step) {

      case 3:
        return (
          <legend className="legend-step-3">
            ここに step 3のフォーム
          </legend>
        );

      case 1:
      case 2:
      default:
        return (
          <legend className="legend-step-3">
            ここに step 3のフォーム見えてはいけない
          </legend>
        );
    }

  },
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  emailChange: function( event ) {
    this.setState( {email: event.target.value} );
  },
  /**
   * エラーがあるかを返します
   * @param {string} which form name
   * @return {string} error がある時は 'error' を返し 無い時は '' を返します
   */
  hasError: function( which:string ):string {
    return this.state.error[ which ] ? 'error' : '';
  },
  clickHandler: function( event ) {
    event.preventDefault();

  },
  done: function() {

  },
  fail: function() {

  },
  dispose: function() {

  },
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  }
} );

export let LegendStep3 = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: this.props.step,
      email: ''
    };
  },
  render: function() {

    return (
      <div className="legend-container legend-container-3">
        <Step3Form step={this.state.step} />
      </div>
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
  },
  updateEmail: function( email:string ):void {
    this.setState( { email: email } );
  }
} );
