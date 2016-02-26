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

// event
import {SignupStatus} from '../../event/SignupStatus';

// app
import {Url} from '../../app/const/Url';
import {Empty} from '../../app/const/Empty';

// util
import {Loc} from '../../util/Loc';

// ui
import {Thumbnail} from '../../ui/Thumbnail';

// data
import {Result} from '../../data/Result';
import {Form} from '../../data/Form';
import {ErrorMessage} from '../../data/ErrorMessage';

// node
import {ErrorNode} from '../error/ErrorNode';

// model
import {Model} from '../../model/Model';
import {ModelSignup} from '../../model/signup/ModelSignup';

let React = self.React;
let Sagen = self.Sagen;

// ------------------------------------------
// user picture thumbnail 作成
// ------------------------------------------
let ChangeAvatarNode = React.createClass( {
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

// ------------------------------------------
// step 2 入力フォーム
// ------------------------------------------
let Step2FormNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    avatar: React.PropTypes.string,
    getForm: React.PropTypes.func.isRequired
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
      password: new ErrorMessage(),
      name: new ErrorMessage()
    };
    this.ie = Sagen.Browser.IE.is();
    this.callback = null;

    return {
      step: this.props.step,
      avatar: this.props.avatar,
      entered: false,
      error: false
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
        {/* password */}
        <span className={'form-parts ' + errorClass('password')}>
          <span className="setting-form-pw form-input">
            <input
              type="password"
              placeholder="パスワードを入力"
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
              placeholder="ユーザー名を入力"
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
              placeholder="肩書を入力 (任意)"
              name="bio"
              value={this.state.bio}
              onChange={this.bioChange}
            />
          </span>
        </span>

        {/* profile_picture */}
        <div className={'setting-form-avatar ' + stageClass()}>
          <h2 className="setting-form-avatar-heading">プロフィール写真選択</h2>
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
        </div>

        {/* button */}
        <div className="form-parts">
          <span className="setting-form-submit mod-btnB01">
            <input type="button" value="次へ" onClick={this.nextHandler} />
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

  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );
    this.dispose();
  },
  // -------------------------------------------------------
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
  prepareNext: function():void {
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

    // error 消去
    this.reset();
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
    // response error
    // show error
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
    this.setState( { error: false } );
  },
  dispose: function() {

  }
} );

/**
 * <h3>React component<h3>
 * **signup step 2**
 * 基本情報設定
 */
export let LegendStep2Node = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    getForm: React.PropTypes.func.isRequired
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
      <div className="fieldset-container fieldset-container-2">
        <span className="setting-form-mail disabled">
          <input type="text" value={this.state.email}/>
          <div className="disabled"></div>
        </span>
        <Step2FormNode
          step={this.props.step}
          getForm={this.props.getForm}
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
