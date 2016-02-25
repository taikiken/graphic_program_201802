/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 14:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';

import {User} from '../../app/User';

// data
import {Result} from '../../data/Result';
import {Form} from '../../data/Form';
import {ErrorMessage} from '../../data/ErrorMessage';
import {Data} from '../../data/Data';

import {ErrorDae} from '../../dae/error/ErrorDae';

// node
import {ErrorNode} from '../../node/error/ErrorNode';

// dae
import {UserDae} from '../../dae/UserDae';

// model
import {Model} from '../../model/Model';
import {ModelLogin} from '../../model/login/ModelLogin';

// util
import {Loc} from '../../util/Loc';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * Login from を表示します
 */
export class ViewLogin extends View {
  /**
   * login form を表示し action/login/Login を行います
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * render start
   */
  start():void {
    this.render();
  }
  /**
   * フォーム生成を開始します
   */
  render():void {

    let LoginDom = React.createClass( {
      getInitialState: function() {
        this.model = null;
        this.callback = null;

        this.errors = {
          password: new ErrorMessage(),
          email: new ErrorMessage(),
          user: new ErrorMessage()
        };

        return {
          error: false,
          email: '',
          password: '',
          user: ''
        };
      },
      render: function() {

        let errorClass = ( keyName:string ) => {
          return this.errors[ keyName ].error ? 'error' : '';
        };
        let message = ( keyName:string ) => {
          return this.errors[ keyName ].message;
        };

        return (
          <form onSubmit={this.submitHandler} ref="signup" encType="application/x-www-form-urlencoded">
            <span className={'form-parts ' + errorClass('email')}>
              <span className="setting-form-mail form-input">
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.emailChange}
                  placeholder="メールアドレスを入力"
                />
              </span>
              <ErrorNode message={message('email')} />
            </span>
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
            {/* button */}
            <div className={'form-parts form-submit-parts ' + errorClass('user')}>
              <span className="setting-form-submit mod-btnB01">
                <input type="submit" value="ログイン" />
              </span>
              <ErrorNode message={message('user')} />
            </div>
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

      },
      // -------------------------------------------------------
      // custom

      // input change
      emailChange: function( event ) {
        this.setState( {email: event.target.value} );
      },
      passwordChange: function( event ) {
        this.setState( {password: event.target.value} );
      },
      // -------------------------------------------------------
      // submit
      submitHandler: function( event:Event ) {
        event.preventDefault();
        let form = ReactDOM.findDOMNode( this.refs.signup );
        let formData = Form.element( form );

        let model = this.model;
        if ( model === null ) {
          model = new ModelLogin( formData, this.callback );
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
        // token setup
        if ( User.login( token ) ) {
          // home
          Loc.index();
        } else {
          console.log( 'fail login ...', token );
        }

      },
      done: function( result:Result ) {
        if ( result.status.code === 200 ) {
          // OK
          // token 取り出し
          let userDae = new UserDae( result.response );
          // -> next step
          this.next( userDae.accessToken );
        }
      },
      fail: function( error:Error ) {
        /*
        API: error の設定方法が signup と違うので 使えない
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
        */
        let errorDae = new ErrorDae( error.result );
        if ( errorDae.errors.hasErrors() ) {
          // errors あり
          let errors =  errorDae.errors;
          let list = errors.list;

          for ( var key of list ) {
            this.errors[ key ].message = errors.message( key );
          }

        } else {
          // errors なし
          // status error を表示
          this.errors.user.message = errorDae.status.userMessage;
        }

        this.setState( { error: true } );
      },
      reset: function() {
        this.errors.email.reset();
        this.errors.password.reset();
        this.errors.user.reset();
        this.setState( { error: false } );
      }
    } );

    // create component
    ReactDOM.render(
      <LoginDom />,
      this.element
    );

  }
}
