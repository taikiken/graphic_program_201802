/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/20 - 13:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {SignupStatus} from '../../event/SignupStatus';
import {Loc} from '../../util/Loc';
import {Url} from '../../app/const/Url';

let React = self.React;
let ReactDOM = self.ReactDOM;

let Step1Form = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      email: '',
      step: 1,
      error: {
        email: false
      }
    };
  },
  render: function() {

    return (
      <legend className="legend-step-1">
          <span className={'form-parts '}>
            <span className="setting-form-mail">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.emailChange}
                placeholder="メールアドレスを入力"
              />
            </span>
          </span>
          <span className="setting-form-submit mod-btnB01">
            <input type="button" value="アカウント作成 (無料)" onClick={this.nextHandler}/>
          </span>
      </legend>
    );

  },
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
  },
  // ---------------------------------------------------
  // input onchange
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

    this.prepareNext();

  },
  prepareNext: function():void {
    // 遷移テスト
    this.next();
  },
  next: function() {
    // next step
    // this.status.step( this.props.step + 1 );
    // email ok
    this.status.email( this.state.email );
    // hash
    Loc.hash = Url.signupHash( this.props.step + 1 );
  },
  // ---------------------------------------------------
  error: function() {
    // input error
    // response error
    // show error
  },
  // ---------------------------------------------------
  // ajax
  // duplicate email check
  done: function() {

  },
  fail: function() {

  },
  dispose: function() {

  }
} );

export let LegendStep1 = React.createClass( {
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
      <div className="legend-container legend-container-1">
        <div className="linkage-sns">
          <ul className="linkage-sns-list">
            <li className="linkage-sns-item">
              <a href="#" className="linkage-sns-link linkage-sns-tw"><span>twitterでログイン</span></a>
            </li>
            <li className="linkage-sns-item">
              <a href="#" className="linkage-sns-link linkage-sns-fb"><span>facebookでログイン</span></a>
            </li>
          </ul>
        </div>
        <p className="register-or">または</p>
        <div className="register-mail setting-form">
          <Step1Form
            step={this.props.step}
          />
          <p className="note">
            <a href="hoge" target="_blank">利用規約</a>と<a href="hoge" target="_blank">個人情報の取扱</a>に同意したものとみなします。
          </p>
        </div>
      </div>
    );

  },
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  shouldComponentUpdate: function( nextProps, nextState ) {
    return this.props.step === nextState.step;
  },
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  updateStep: function( step:Number ):void {
    console.log( 'updateStep 2 ', this.state.email );
    this.setState( { step: step } );
  }
} );
