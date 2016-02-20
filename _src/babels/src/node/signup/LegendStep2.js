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

let Step2Form = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: this.props.step,
      entered: false,
      error: {
        password: false,
        name: false,
        bio: false,
        picture: false
      }
    };
  },
  render: function() {

    let zoneEntered = this.state.entered ? 'entered' : '';
    return (
      <legend className="legend-step-2">
        {/* password */}
            <span className="form-parts">
              <span className="setting-form-pw">
                <input
                  type="password"
                  placeholder="パスワードを入力"
                  name="password"
                  value={this.state.password}
                  onChange={this.passwordChange}
                />
              </span>
            </span>
        {/* name */}
            <span className="form-parts">
              <span className="setting-form-name">
                <input
                  type="text"
                  placeholder="ユーザー名を入力"
                  name="name"
                  value={this.state.name}
                  onChange={this.nameChange}
                />
              </span>
            </span>
        {/* bio */}
            <span className="form-parts">
              <span className="setting-form-job">
                <input
                  type="text"
                  placeholder="肩書を入力 (任意)"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.bioChange}
                />
              </span>
            </span>

        {/* profile_picture */}
        <div className="setting-form-avatar">
          <h2 className="setting-form-avatar-heading">プロフィール写真選択</h2>
          <div
            className={'setting-form-avatar-dropArea ' + zoneEntered}
            onDragOver={this.handleDragOver}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
          >
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              value={this.state.picture}
              onChange={this.pictureChange}
              className="setting-form-profile_picture"
            />
          </div>
        </div>

        {/* button */}
            <span className="setting-form-submit mod-btnB01">
              <input type="button" value="次へ" onClick={this.nextHandler} />
            </span>
      </legend>
    );

  },
  componentDidMount: function() {
    // this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  componentWillUnMount: function() {
    // this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
  },

  passwordChange: function( event ) {
    this.setState( {email: event.target.value} );
  },
  nameChange: function( event ) {
    this.setState( {email: event.target.value} );
  },
  bioChange: function( event ) {
    this.setState( {email: event.target.value} );
  },
  pictureChange: function( event ) {
    this.setState( {email: event.target.value} );
  },
  // -------------------------------------------------------
  // drag / drop
  handleDragOver: function( event ) {},
  handleDragEnter: function( event ) {},
  handleDragLeave: function( event ) {},
  handleDrop: function( event ) {},
  // -------------------------------------------------------
  /**
   * エラーがあるかを返します
   * @param {string} which form name
   * @return {string} error がある時は 'error' を返し 無い時は '' を返します
   */
  hasError: function( which:string ):string {
    return this.state.error[ which ] ? 'error' : '';
  },
// ---------------------------------------------------
  // next button click
  nextHandler: function( event ) {
    event.preventDefault();

    // 遷移テスト
    this.next();
  },
  next: function() {
    // next step
    console.log( 'Step2Form ', this.state.step );
    this.status.step( this.state.step + 1 );
  },
  // ---------------------------------------------------
  error: function() {
    // input error
    // response error
    // show error
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

export let LegendStep2 = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: this.props.step,
      email: '',
      password: '',
      name: '',
      bio: '',
      picture: ''
    };
  },
  render: function() {

    return (
      <div className="legend-container legend-container-2">
        <span className="setting-form-mail disabled">
          <input type="text" value={this.state.email}/>
          <div className="disabled"></div>
        </span>
        <Step2Form
          step={this.props.step}
        />
      </div>
    );

  },
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
    this.status.on( SignupStatus.SIGNUP_EMAIL, this.emailChange );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
    this.status.off( SignupStatus.SIGNUP_EMAIL, this.emailChange );
  },
  // -----------------------------------------------------------
  // form event handler
  inputChange( event:Event ):void {
    console.log( 'input event ', event );
  },
  // -----------------------------------------------------------
  // SignupStatus event handler
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  emailChange: function( event:Object ):void {
    this.updateEmail( event.step );
  },
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  },
  updateEmail: function( email:string ):void {
    this.setState( { email: email } );
  }
} );
