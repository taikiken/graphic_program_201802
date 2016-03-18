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

// app
import {Url} from '../../app/const/Url';
import {Empty} from '../../app/const/Empty';
import {ErrorTxt} from '../../app/const/ErrorTxt';
import {Message} from '../../app/const/Message';

// event
import {SignupStatus} from '../../event/SignupStatus';

// util
import {Loc} from '../../util/Loc';
import {Validate} from '../../util/Validate';

// ui
import {Thumbnail} from '../../ui/Thumbnail';

// data
import {Result} from '../../data/Result';
import {Form} from '../../data/Form';
import {ErrorMessage} from '../../data/ErrorMessage';

// node
import {ErrorNode} from '../error/ErrorNode';
import {ChangeAvatarNode} from '../avator/ChangeAvatorNode';

// model
import {Model} from '../../model/Model';
import {ModelSignup} from '../../model/signup/ModelSignup';

// react
let React = self.React;

// Sagen
let Sagen = self.Sagen;


// ------------------------------------------
// step 2 入力フォーム
// ------------------------------------------
/**
 * 新規登録 step 2 form parts
 * @private
 * @type {ReactClass}
 */
let Step2FormNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    avatar: React.PropTypes.string,
    getForm: React.PropTypes.func.isRequired,
    changeEmail: React.PropTypes.func.isRequired,
    email: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      avatar: Empty.SETTING_AVATAR
    };
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();
    this.thumbnail = null;
    this.model = null;
    this.errors = {
      email: new ErrorMessage(),
      password: new ErrorMessage(),
      name: new ErrorMessage(),
      profile_picture: new ErrorMessage()
    };
    this.ie = Sagen.Browser.IE.is();
    this.callback = null;

    return {
      email: this.props.email,
      step: this.props.step,
      avatar: this.props.avatar,
      entered: false,
      error: false,
      password: '',
      name: '',
      bio: '',
      picture: ''
    };
  },
  render: function() {

    let zoneEntered = this.state.entered ? 'entered' : '';

    let errorClass = ( keyName:string ) => {
      return this.errors[ keyName ].error ? 'error' : '';
    };
    let message = ( keyName:string ) => {
      return this.errors[ keyName ].message;
    };

    let stageClass = () => {
      return this.props.avatar !== this.state.avatar ? 'show-thumbnail' : '';
    };

    return (
      <fieldset className="fieldset-step-2">
        {/* email 2 */}
        <span className={'form-parts ' + errorClass('email')}>
          <span className="setting-form-mail form-input">
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailChange}
              placeholder={Message.PLACEHOLDER_EMAIL}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </span>
          <ErrorNode message={message('email')} />
        </span>
        {/* password */}
        <span className={'form-parts ' + errorClass('password')}>
          <span className="setting-form-pw form-input">
            <input
              type="password"
              placeholder={Message.PLACEHOLDER_PWD}
              name="password"
              value={this.state.password}
              onChange={this.passwordChange}
            />
          </span>
          <ErrorNode message={message('password')} />
        </span>
        {/* name */}
        <span className={'form-parts ' + errorClass('name')}>
          <span className="setting-form-name form-input">
            <input
              type="text"
              placeholder={Message.PLACEHOLDER_NAME}
              name="name"
              value={this.state.name}
              onChange={this.nameChange}
            />
          </span>
          <ErrorNode message={message('name')} />
        </span>
        {/* bio */}
        <span className="form-parts">
          <span className="setting-form-job form-input">
            <input
              type="text"
              placeholder={Message.PLACEHOLDER_BIO}
              name="bio"
              value={this.state.bio}
              onChange={this.bioChange}
            />
          </span>
        </span>

        {/* profile_picture */}
        <div className={'setting-form-avatar ' + stageClass()}>
          <h2 className="setting-form-avatar-heading">{Message.PLACEHOLDER_PICTURE}</h2>
          <div className={'form-parts ' + errorClass('profile_picture')}>
            <div
              className={'setting-form-avatar-dropArea ' + zoneEntered}
              onDragOver={this.handleDragOver}
              onDragEnter={this.handleDragEnter}
              onDragLeave={this.handleDragLeave}
              onDrop={this.handleDrop}
            >
              <div className={'avatar-stage'}>
                <sapn className="avatar-container"><img src={this.state.avatar} alt=""/></sapn>
                <ChangeAvatarNode
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
                className="setting-form-picture form-input"
              />
            </div>
            <ErrorNode message={message('profile_picture')} />
          </div>
        </div>

        {/* button */}
        <div className="form-parts">
          <span className="setting-form-submit mod-btnB01">
            <input type="button" value={Message.BUTTON_NEXT} onClick={this.nextHandler} />
          </span>
        </div>
      </fieldset>
    );

  },
  // -------------------------------------------------------
  // delegate
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );

    // this.status.on( SignupStatus.SIGNUP_FORM, this.formHandler );

    if ( this.callback === null ) {
      let callback = {};
      this.callback = callback;
      callback[ Model.COMPLETE ] = this.done;
      callback[ Model.UNDEFINED_ERROR ] = this.fail;
      callback[ Model.RESPONSE_ERROR ] = this.fail;
    }

    // email1 の変更を watch する
    this.status.on( SignupStatus.STEP1_EMAIL, this.onEmail1Change );

    // SNS 経由を watch する
    this.status.on( SignupStatus.SIGNUP_OAUTH, this.onSns );

  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
    this.dispose();
  },
  // -------------------------------------------------------
  // watch
  onSns: function( event:Object ) {
    this.setState( {
      email: event.email,
      name: event.userName,
      avatar: event.profilePicture,
      bio: event.bio
    } );
  },
  // step 1 email 入力を watch し
  // 同期させる
  onEmail1Change: function( event:Object ):void {
    this.setState( {email: event.email} );
  },
  // -------------------------------------------------------
  // input changes
  // email
  emailChange: function( event ) {
    this.setState( {email: event.target.value} );
    // email 2 に入力があったことを通知する
    this.status.email2( event.target.value );
  },
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
  handleDragOver: function( event:Event ) {
    event.preventDefault();
    console.log( 'drag start---------' );
  },
  handleDragEnter: function( event ) {
    if ( this.ie ) {
      event.preventDefault();
      return;
    }

    this.setState( { entered: true } );
  },
  handleDragLeave: function( event ) {
    if ( this.ie ) {
      event.preventDefault();
      return;
    }

    this.setState( { entered: false } );
  },
  handleDrop: function( event ) {
    console.log( 'drop ++++++++++++', event );
    if ( this.ie ) {
      event.preventDefault();
      return;
    }

    // check file type
    let files;

    if ( event.dataTransfer !== null && typeof event.dataTransfer !== 'undefined' ) {
      files = event.dataTransfer.files;
    } else if ( event.target !== null && event.target !== 'undefined' ) {
      files = event.target.files;
    }

    if ( files !== null && typeof files !== 'undefined' && typeof files.length !== 'undefined' && files.length > 0 ) {
      // files 有効
      let file = files[ 0 ];

      if ( file.type.match( /image.*/ ) ) {
        // image file,
        // input type files の drop へ event を送る
        this.setState( { entered: false } );

      } else {
        // illegal stop all
        event.preventDefault();
        this.setState( { entered: false } );
      }
    } else {
      // illegal stop all
      event.preventDefault();
      this.setState( { entered: false } );
    }

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
  // validate
  prepareNext: function():void {
    // error 消去
    this.reset();

    let count = 0;
    let errors = this.errors;

    // email
    let email = this.state.email;
    if ( email === '' ) {
      errors.email.message = ErrorTxt.EMAIL_EMPTY;
      ++count;
    } else if ( !Validate.email( email ) ) {
      errors.email.message = ErrorTxt.EMAIL_INVALID;
      ++count;
    }

    // password
    let password = this.state.password;
    if ( password === '' ) {
      errors.password.message = ErrorTxt.PASSWORD_EMPTY;
      ++count;
    } else if ( password.length < 8 ) {
      errors.password.message = ErrorTxt.PASSWORD_SHORT;
      ++count;
    } else if ( !Validate.alphaNum( password ) ) {
      errors.password.message = ErrorTxt.PASSWORD_INVALID;
      ++count;
    }

    // name
    let name = this.state.name;
    if ( name === '' ) {
      errors.name.message = ErrorTxt.NAME_EMPTY;
      ++count;
    }

    // error がない時だけ
    if ( count === 0 ) {
      this.request();
    } else {
      this.error();
    }

  },
  // request
  request: function():void {
    console.log( 'from element ', this.props.getForm() );
    let formData = Form.element( this.props.getForm() );
    // not create
    // 入力検証のみ
    formData.append( 'create', false );

    let model = this.model;
    if ( model === null ) {
      model = new ModelSignup( formData, this.callback );
      this.model = model;
    } else {
      model.data = formData;
    }

    // ajax start
    model.start();
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
    // show error
    this.setState( { error: true } );
  },
  done: function( result:Result ) {
    console.log( 'done ', result );
    if ( result.status.code === 200 ) {
      // OK -> next step
      this.next();
    }
  },
  fail: function( error:Error ) {
    console.log( 'fail ', error.result.response.errors );
    let errors = error.result.response.errors;
    if ( Array.isArray( errors ) ) {

      for ( var errorObject of errors ) {

        for ( var key in errorObject ) {

          if ( errorObject.hasOwnProperty( key ) ) {
            this.errors[ key ].message = errorObject[ key ];
          }

        }// for in

      }// for of

    }// if ( Array.isArray( errors ) )
    this.setState( { error: true } );
  },
  reset: function() {
    this.errors.password.reset();
    this.errors.name.reset();
    this.errors.profile_picture.reset();
    this.setState( { error: false } );
  },
  dispose: function() {

  }
} );

/**
 * <h3>React component<h3>
 * **signup step 2**
 * 基本情報設定
 *
 * @type {ReactClass}
 */
export let LegendStep2Node = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    getForm: React.PropTypes.func.isRequired,
    // 親 component へ email change を通知する
    changeEmail: React.PropTypes.func.isRequired,
    // 初期 email value
    email: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: 1,
      email: this.props.email,
      password: '',
      name: '',
      bio: '',
      picture: ''
    };
  },
  render: function() {

    console.log( 'render step 2 email ', this.state.email );
    return (
      <div className="fieldset-container fieldset-container-2">
        <Step2FormNode
          step={this.props.step}
          getForm={this.props.getForm}
          changeEmail={this.props.changeEmail}
          email={this.state.email}
        />
      </div>
    );

  },
  // -----------------------------------------------------------
  // delegate
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
  inputChange( /* event:Event */ ):void {
    // console.log( 'input event ', event );
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
    // console.log( 'updateEmail ', email );
    this.setState( { email: email } );
  }
} );
