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

// app
import {Url} from '../../app/const/Url';
import {ErrorTxt} from '../../app/const/ErrorTxt';
import {Message} from '../../app/const/Message';

// event
import {SignupStatus} from '../../event/SignupStatus';

// util
import {Loc} from '../../util/Loc';
import {Validate} from '../../util/Validate';

// data
import {Result} from '../../data/Result';
import {Data} from '../../data/Data';
import {Form} from '../../data/Form';
import {ErrorMessage} from '../../data/ErrorMessage';

// model
import {Model} from '../../model/Model';
import {ModelUserDetect} from '../../model/signup/ModelUserDetect';

// node
import {ErrorNode} from '../error/ErrorNode';

// React
let React = self.React;

let Step1FormNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();
    this.errors = { errorEmail: new ErrorMessage() };
    this.callback = null;
    this.model = null;

    return {
      email: '',
      step: 1,
      errorEmail: false
    };
  },
  render: function() {

    let errorClass = ( keyName:string ) => {
      return this.state[ keyName ] ? 'error' : '';
    };
    let message = ( keyName:string ) => {
      // console.log( 'message ', this.errors[ keyName ], ';' );
      return this.errors[ keyName ].message;
    };

    return (
      <fieldset className="fieldset-step-1">
        <span className={'form-parts ' + errorClass('errorEmail')}>
          <span className="setting-form-mail form-input">
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.emailChange}
              placeholder={Message.PLACEHOLDER_EMAIL}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </span>
          <ErrorNode message={message('errorEmail')} />
        </span>
        <span className="form-parts align-right">
          <span className="setting-form-submit mod-btnB01">
            <input type="button" value={Message.PLEASE_MAKE_ACCOUNT} onClick={this.nextHandler}/>
          </span>
        </span>
      </fieldset>
    );

  },
  // ---------------------------------------------------
  // delegate
  componentDidMount: function() {
    // submit event listen
    // enter の後発生します
    this.status.on( SignupStatus.SIGNUP_SUBMIT, this.submitHandler );

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
  // ---------------------------------------------------
  // input onchange
  emailChange: function( event ) {
    this.setState( {email: event.target.value} );
  },
  // ---------------------------------------------------
  // submit click 通知
  // SignupStatus.SIGNUP_SUBMIT event handler
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
  // 入力チェック
  // ok -> this.request()
  prepareNext: function():void {
    // error 消去
    this.reset();

    // validate 開始
    let email = this.state.email;
    // email empty check
    if ( email === '' ) {
      this.error( ErrorTxt.EMAIL_EMPTY );
      return;
    }

    if ( !Validate.email( email ) ) {
      // not correct email pattern
      this.error( ErrorTxt.EMAIL_INVALID );
      return;
    }

    // validate OK
    this.request();
  },
  // server へリクエストし
  // 登録済み email かを調べます
  request: function():void {
    let data = new Data( 'email', this.state.email );
    let formData = Form.data( [ data ] );

    let model = this.model;
    if ( model === null ) {
      model = new ModelUserDetect( formData, this.callback );
      this.model = model;
    } else {
      model.data = formData;
    }

    // ajax start
    model.start();
  },
  // 登録済み email でなかったので次の step へ移動します
  next: function() {
    // next step
    // email ok
    this.status.email( this.state.email );
    // hash
    Loc.hash = Url.signupHash( this.props.step + 1 );
  },
  // ---------------------------------------------------
  error: function( message:string ) {
    // input error
    // show error
    this.errors.errorEmail.message = message;
    this.setState( { errorEmail: true } );
  },
  // ---------------------------------------------------
  // ajax
  // duplicate email check
  done: function( result:Result ) {
    // console.log( 'done ', result );
    if ( result.status.code === 200 ) {
      // OK
      this.next();
    }
  },
  fail: function( error:Error ) {
    // console.log( 'fail ', error.result.response.errors );
    this.errors.errorEmail.message = error.result.response.errors.email;
    this.setState( { errorEmail: true } );
  },
  reset: function() {
    this.errors.errorEmail.reset();
    this.setState( { errorEmail: false } );
  },
  dispose: function() {

  }
} );

/**
 * <h3>React component<h3>
 * **signup step 1**
 * 「新規会員登録」入力フォームコンテナ
 */
export let LegendStep1Node = React.createClass( {
  propTypes: {
    // 担当 step 1
    step: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();

    return {
      step: 1
    };
  },
  render: function() {

    return (
      <div className="fieldset-container fieldset-container-1">
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
          <Step1FormNode
            step={this.props.step}
          />
          <p className="note">
            <span className="note-prefix">利用開始をもって</span><a href="/about/terms/" target="_blank">利用規約</a>と<a href="/about/privacy/" target="_blank">個人情報の取扱</a>に<br/>同意したものとみなします。
          </p>
        </div>
        <div className="register-link-home">
          <a href="/">トップページへ戻る</a>
        </div>
      </div>
    );

  },
  // ---------------------------------------------------
  // delegate
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  componentWillUnMount: function() {
    this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
  },
  shouldComponentUpdate: function( nextProps, nextState ) {
    return this.props.step === nextState.step;
  },
  // ---------------------------------------------------
  // custom
  // listener step change
  stepChange: function( event:Object ):void {
    this.updateStep( event.step );
  },
  updateStep: function( step:Number ):void {
    this.setState( { step: step } );
  }
} );
