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
import {Loc} from '../../util/Loc';
import {Url} from '../../app/const/Url';
import {Empty} from '../../app/const/Empty';
import {Thumbnail} from '../../ui/Thumbnail';

let React = self.React;

let ChangeAvatar = React.createClass( {
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    handler: React.PropTypes.func.isRequired
  },
  render: function() {
    if ( this.props.show ) {
      return (
        <span className="should-change-avatar">
        <a href="#" onClick={this.clickHandler}>写真を変更する</a>
      </span>
      );
    } else {
      return null;
    }
  },
  clickHandler: function( event:Event ) {
    event.preventDefault();
    this.props.handler();
  }
} );

let Step2Form = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    avatar: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      avatar: Empty.SETTING_AVATAR
    };
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();
    this.thumbnail = null;

    return {
      step: this.props.step,
      avatar: this.props.avatar,
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
            <div className="avatar-stage">
              <sapn className="avatar-container"><img src={this.state.avatar} alt=""/></sapn>
              <ChangeAvatar
                show={this.props.avatar !== this.state.avatar}
                handler={this.avatarChangeHandler}
              />
            </div>
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
  // -------------------------------------------------------
  // delegate
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
    this.dispose();
  },
  // -------------------------------------------------------
  // custom method

  // input changes
  // password
  passwordChange: function( event ) {
    this.setState( {password: event.target.value} );
  },
  // name
  nameChange: function( event ) {
    this.setState( {name: event.target.value} );
  },
  // bio
  bioChange: function( event ) {
    this.setState( {bio: event.target.value} );
  },
  // file
  pictureChange: function( event ) {
    console.log( 'pictureChange ', event );
    this.setState( {picture: event.target.value} );
    if ( event.target.value !== '' ) {

      let files:FileList = event.target.files;

      if ( files !== null && typeof files !== 'undefined' && typeof files.length !== 'undefined' && files.length > 0 ) {
        this.thumbnail = null;
        let thumbnail = new Thumbnail( files[ 0 ] );
        this.thumbnail = thumbnail;
        thumbnail.on( Thumbnail.LOAD, this.avatarLoad );
        thumbnail.on( Thumbnail.ERROR, this.avatarError );
        thumbnail.make();

      }
    }
  },
  // -------------------------------------------------------
  // thumbnail make
  // after picture change
  avatarLoad: function( event ) {
    this.avatarDispose();
    this.setState( {avatar: event.img} );
  },
  avatarError: function( event ) {
    this.avatarDispose();
    console.log( 'avatar error ', event );
  },
  avatarDispose: function() {
    let thumbnail = this.thumbnail;
    if ( thumbnail !== null ) {
      thumbnail.off( Thumbnail.LOAD, this.avatarLoad );
      thumbnail.off( Thumbnail.ERROR, this.avatarError );
    }
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
    console.log( 'Step2Form ', this.state.step );
    // this.status.step( this.state.step + 1 );
    // hash
    Loc.hash = Url.signupHash( this.props.step + 1 );
  },
  // ---------------------------------------------------
  // avatar change click
  // from ChangeAvatar
  avatarChangeHandler: function() {
    this.setState( { picture: '', avatar: this.props.avatar } );
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

  }
} );

export let LegendStep2 = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: 1,
      email: '',
      password: '',
      name: '',
      bio: '',
      picture: ''
    };
  },
  render: function() {

    console.log( 'render step 2 email ', this.state.email );
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
  shouldComponentUpdate: function( nextProps, nextState ) {
    return this.state.email !== nextState.email || this.props.step === nextState.step;
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
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  },
  emailChange: function( event:Object ):void {
    this.updateEmail( event.email );
  },
  updateEmail: function( email:string ):void {
    console.log( 'updateEmail ', email );
    this.setState( { email: email } );
  }
} );
