/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 20:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// app
import {Empty} from '../../app/const/Empty';
import {ErrorTxt} from '../../app/const/ErrorTxt';
import {Message} from '../../app/const/Message';

// util
import {Validate} from '../../util/Validate';

// ui
import {Thumbnail} from '../../ui/Thumbnail';

// data
import {Result} from '../../data/Result';
import {Form} from '../../data/Form';
import {ErrorMessage} from '../../data/ErrorMessage';
// import {Safety} from '../../data/Safety';

// node
import {ErrorNode} from '../error/ErrorNode';
import {ChangeAvatarNode} from '../avator/ChangeAvatorNode';

// event
import {SettingsStatus} from '../../event/SettingsStatus';

// model
import {Model} from '../../model/Model';
import {ModelAccountEdit} from '../../model/settings/ModelAccountEdit';

// react
let React = self.React;
let ReactDOM = self.ReactDOM;

// Sagen
let Sagen = self.Sagen;

// ------------------------------------------
// 設定 基本情報 表示 / 変更
// ------------------------------------------
let SettingInputNode = React.createClass( {
  propTypes: {
    empty: React.PropTypes.string,
    avatar: React.PropTypes.string,
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    bio: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      avatar: Empty.SETTING_AVATAR,
      empty: Empty.SETTING_AVATAR
    };
  },
  getInitialState: function() {
    this.status = SettingsStatus.factory();

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
    this.icon = null;

    return {
      entered: false,
      error: false,

      email: this.props.email,
      password: this.props.password,
      name: this.props.name,
      bio: this.props.bio,
      // input[type="file"] 入力値
      picture: '',
      // 入力済みの profile picture path
      avatar: this.props.avatar,

      loading: ''
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
      // return this.props.avatar !== this.state.avatar ? 'show-thumbnail' : '';
      // input:file を常に有効にする
      return '';
    };

    // 登録済み avatar
    let avatar = this.state.avatar;
    if ( !avatar ) {
      avatar = Empty.USER_EMPTY;
    }

    let loggedIn = avatar === Empty.USER_EMPTY ? '' : 'user-logged-in';

    return (
      <form ref="settings" className={'loading-root ' + this.state.loading} encType="multipart/form-data" onSubmit={this.submitHandler}>
        <fieldset className="fieldset-step-2">
          {/* email */}
          <span className={`form-parts ${errorClass('email')}`}>
            <span className="setting-form-mail form-input">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.emailChange}
                placeholder={Message.PLACEHOLDER_EMAIL}
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
            <span className={'setting-form-job form-input'}>
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
                  <sapn className={`avatar-container ${loggedIn}`}>
                    <span className="avatar-block">
                      <img src={avatar} alt=""/>
                    </span>
                  </sapn>
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
        </fieldset>
        {/* button */}
        <div className="form-parts">
          <span className="setting-form-submit mod-btnB01">
            <input type="submit" value={Message.BUTTON_SAVE} />
          </span>
        </div>
        <div className="loading-spinner"></div>
      </form>
    );

  },
  // -------------------------------------------------------
  // delegate
  componentDidMount: function() {
    if ( this.callback === null ) {
      let callback = {};
      this.callback = callback;
      callback[ Model.COMPLETE ] = this.done;
      callback[ Model.UNDEFINED_ERROR ] = this.fail;
      callback[ Model.RESPONSE_ERROR ] = this.fail;
    }
  },
  componentWillUnMount: function() {
    this.dispose();
  },
  // -------------------------------------------------------
  // input changes
  // password
  emailChange: function( event ) {
    this.setState( {email: event.target.value} );
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
  submitHandler: function( event:Event ) {
    event.preventDefault();
    this.setState( { loading: 'loading' } );
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
    if ( password !== '' ) {
      // 入力があった時だけ validate します
      if ( password.length < 8 ) {
        errors.password.message = ErrorTxt.PASSWORD_SHORT;
        ++count;
      } else if ( !Validate.alphaNum( password ) ) {
        errors.password.message = ErrorTxt.PASSWORD_INVALID;
        ++count;
      }
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
    let formData = Form.element( ReactDOM.findDOMNode( this.refs.settings ) );

    let model = this.model;
    if ( model === null ) {
      model = new ModelAccountEdit( formData, this.callback );
      this.model = model;
    } else {
      model.data = formData;
    }

    // ajax start
    model.start();
  },
  next: function() {
    // next step
    this.status.dispatch( { type: SettingsStatus.ACCOUNT_COMPLETE } );
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
    this.setState( { error: true, loading: '' } );
  },
  done: function( result:Result ) {
    console.log( 'done ', result );
    this.setState( { loading: '' } );

    if ( result.status.code === 200 ) {
      // OK -> next step
      this.next();
    }
  },
  fail: function( error:Object ) {
    console.log( 'fail ', error.errors, error.result );
    this.setState( { loading: '' } );

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
    this.errors.email.reset();
    this.errors.password.reset();
    this.errors.name.reset();
    this.errors.profile_picture.reset();
    this.setState( { error: false } );
  },
  dispose: function() {

  }
} );

/**
 * 基本情報設定
 * @type {ReactClass}
 */
export let SettingsIndexNode = React.createClass( {
  propTypes: {
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    bio: React.PropTypes.string.isRequired,
    picture: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      password: ''
    };
  },
  render: function() {
    // console.log( 'SettingsIndexNode render', this.props.email );
    return (
      <div className="basic-setting setting-form">
        <SettingInputNode
          email={this.props.email}
          password={this.props.password}
          name={this.props.name}
          bio={this.props.bio}
          avatar={this.props.picture}
        />
      </div>
    );

  }/* ,
  // -----------------------------------------------------------
  // delegate
  componentDidMount: function() {
  },
  componentWillUnMount: function() {
  }
  */
} );
