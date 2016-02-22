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
let ReactDOM = self.ReactDOM;

let Step3Form = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      categories: this.props.categories,
      step: this.props.step,
      error: {
        email: false
      }
    };
  },
  render: function() {

    var _this = this;

    return (
      <legend className="legend-step-3">
        <div className="setting-form-interest">
          <ul className="setting-form-interest-list">
            {
              this.state.categories.map( function( category, i ) {

                console.log( 'checkedValue ', category.slug, _this.state[category.slug] );
                var boundBox = _this.changeBox.bind(_this, category.slug);

                return (
                  <li key={category.slug} className={'setting-form-interest-item interest-item-' + category.slug }>
                    <input
                      type="checkbox"
                      name="interest[]"
                      id={'interest-item-' + category.slug}
                      defaultValue={category.id}
                    />
                    <label htmlFor={'interest-item-' + category.slug} className="setting-form-interest-title">
                      <span>{category.label}</span>
                    </label>
                  </li>
                );

              } )
            }
          </ul>
        </div>
        <span className="setting-form-submit mod-btnB01">
          <input type="button" value="登録する" onClick={this.nextHandler}/>
        </span>
      </legend>
    );

  },
  // ---------------------------------------------------
  // delegate
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
    this.status.off( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
    this.status.off( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
  },
  shouldComponentUpdate: function( nextProps, nextState ) {
    return this.props.step === nextState.step;
  },
  // ---------------------------------------------------
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  },
  changeBox: function( slug ) {
    let checkbox = ReactDOM.findDOMNode( this.refs[ slug ] );
    console.log( 'checkbox ', checkbox.checked, 'slug: ', slug );
    this.setState( {slug: checkbox.checked} );
  },
  /**
   * エラーがあるかを返します
   * @param {string} which form name
   * @return {string} error がある時は 'error' を返し 無い時は '' を返します
   */
  hasError: function( which:string ):string {
    return this.state.error[ which ] ? 'error' : '';
  },
  // ---------------------------------------------------
  // submit click 通知
  submitHandler: function( event:Object ) {
    let step = event.step;
    if ( step === this.props.step ) {
      this.prepareNext();
    }
  },
  // next button click
  nextHandler: function( event:Event ) {
    event.preventDefault();

  },
  prepareNext: function():void {
    // 遷移テスト
    this.next();
  },
  next: function() {

  },
  done: function() {

  },
  fail: function() {

  },
  dispose: function() {

  }
} );

export let LegendStep3 = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: 1,
      email: ''
    };
  },
  render: function() {

    return (
      <div className="legend-container legend-container-3">
        <Step3Form step={this.props.step} categories={this.props.categories} />
      </div>
    );

  },
  componentDidMount: function() {
  },
  componentWillUnMount: function() {
  }
} );
