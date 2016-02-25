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

// app
import {User} from '../../app/User';

// model
import {Model} from '../../model/Model';
import {ModelSignup} from '../../model/signup/ModelSignup';

// data
import {Result} from '../../data/Result';
import {Form} from '../../data/Form';

// dae
import {UserDae} from '../../dae/UserDae';

// util
import {Loc} from '../../util/Loc';

// React
let React = self.React;

let Step3FormNode = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired,
    getForm: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    this.status = SignupStatus.factory();
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
      <legend className="legend-step-3">
        <div className="setting-form-interest">
          <ul className="setting-form-interest-list">
            {
              this.state.categories.map( function( category, i ) {
                return (
                  <li key={category.slug} className={'setting-form-interest-item interest-item-' + category.slug }>
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
          <span className="setting-form-submit mod-btnB01">
            <input type="button" value="登録する" onClick={this.nextHandler}/>
          </span>
        </div>
      </legend>
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
    console.log( '----success--- ', token );
    // token setup
    if ( User.login( token ) ) {
      // home
      Loc.index();
    } else {
      console.log( 'fail login ...', token );
    }

  },
  done: function( result:Result ) {
    console.log( 'done ', result );
    if ( result.status.code === 200 ) {
      // OK
      // token 取り出し
      let userDae = new UserDae( result.response );
      // -> next step
      this.next( userDae.accessToken );
    }
  },
  fail: function( error:Error ) {
    console.log( 'error step3', error );
  },
  reset: function() {

  },
  dispose: function() {

  }
} );

/**
 * <h3>React component<h3>
 * **signup step 3**
 * 「興味のある競技」入力フォームコンテナ
 */
export let LegendStep3Node = React.createClass( {
  propTypes: {
    step: React.PropTypes.number.isRequired,
    categories: React.PropTypes.array.isRequired,
    getForm: React.PropTypes.func.isRequired
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
        <Step3FormNode
          step={this.props.step}
          categories={this.props.categories}
          getForm={this.props.getForm}
        />
      </div>
    );

  },
  componentDidMount: function() {
  },
  componentWillUnMount: function() {
  }
} );
