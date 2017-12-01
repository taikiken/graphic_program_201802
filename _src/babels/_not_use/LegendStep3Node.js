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

// app
import {User} from '../src/app/User';
import {Message} from '../src/app/const/Message';

// model
import {Model} from '../src/model/Model';
import {ModelSignup} from '../src/model/signup/ModelSignup';

// data
import {Result} from '../src/data/Result';
import {Form} from '../src/data/Form';

// dae
import {UserDae} from '../src/dae/UserDae';
import {StatusDae} from '../src/dae/StatusDae';

// util
import {Loc} from '../src/util/Loc';

// event
import {SignupStatus} from '../src/event/SignupStatus';
import {MessageStatus} from '../src/event/MessageStatus';

// React
let React = self.React;

/**
 * 新規登録 step 3 form parts
 * @private
 * @type {ReactClass}
 */
let Step3FormNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired,
    getForm: React.PropTypes.func.isRequired,
    beforeRedirect: React.PropTypes.func.isRequired,
    // since 2017-11-07
    wow: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();
    // message status instance
    this.messageStatus = MessageStatus.factory();

    this.model = null;
    this.callback = null;

    return {
      categories: this.props.categories,
      step: this.props.step,
      error: false
    };
  },
  render: function() {

    return (
      <fieldset className="fieldset-step-3">
        <div className="setting-form-interest">
          <ul className="setting-form-interest-list">
            {
              this.state.categories.map( function( category, i ) {
                return (
                  <li key={category.slug} className={'setting-form-interest-item interest-item-' + category.slug}>
                    <input
                      className={'interest-item interest-item-' + i}
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
        <div className="form-parts">
          <span className="setting-form-submit mod-btnA01">
            <input type="button" value={Message.BUTTON_RESISTER} onClick={this.nextHandler}/>
          </span>
        </div>
      </fieldset>
    );

  },
  // ---------------------------------------------------
  // delegate
  componentDidMount: function() {
    this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
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
  /*
  changeBox: function( slug ) {
    let checkbox = ReactDOM.findDOMNode( this.refs[ slug ] );
    this.setState( {slug: checkbox.checked} );
  },
  */
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
    let formData = Form.element( this.props.getForm() );
    // create
    // 新規登録
    formData.append( 'create', true );

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
  next: function( token:string ) {
    // login
    // console.log( '----success--- ', token );
    // token setup
    if ( User.login( token ) ) {
      // redirect 通知
      // onbeforeunload を解除するため
      this.props.beforeRedirect();
      // home
      Loc.index();
    }

  },
  done: function( result:Result ) {
    // console.log( 'done ', result );
    if ( result.status.code === 200 ) {
      // wow 別処理
      if (this.props.wow) {
        this.doneWow(result);
        return;
      }
      // OK
      // token 取り出し
      const userDae = new UserDae( result.response );

      // flush message
      const status = new StatusDae( result.status );
      this.messageStatus.flush( MessageStatus.message( status.userMessage ), MessageStatus.SUCCESS );

      // -> next step
      this.next( userDae.accessToken );
    }
  },
  doneWow: function(result) {
    // OK
    // token 取り出し
    const userDae = new UserDae( result.response );
    if (User.login(userDae.accessToken)) {
      // modal open
      // console.log('Step3FormNode.doneWow');
    }
  },
  // fail: function( /* error:Error */ ) {
  //   // console.log( 'error step3', error );
  // },
  // reset: function() {
  //
  // },
  // dispose: function() {
  //
  // }
} );

/**
 * <p>「新規会員登録」入力フォームコンテナ<br>
 * 「興味のある競技」</p>
 *
 * **signup step 3**
 *
 * @type {ReactClass}
 */
export let LegendStep3Node = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired,
    getForm: React.PropTypes.func.isRequired,
    beforeRedirect: React.PropTypes.func.isRequired,
    wow: React.PropTypes.bool.isRequired,
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
      <div className="fieldset-container fieldset-container-3">
        <Step3FormNode
          step={this.props.step}
          categories={this.props.categories}
          getForm={this.props.getForm}
          beforeRedirect={this.props.beforeRedirect}
          wow={this.props.wow}
        />
      </div>
    );

  },
  // componentDidMount: function() {
  // },
  // componentWillUnMount: function() {
  // }
} );
