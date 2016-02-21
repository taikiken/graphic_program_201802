/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/20 - 15:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * signup wizard status などで使用します
 */
export class SignupStatus extends EventDispatcher {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SignupStatus is static Class. not use new SignupStatus(). instead SignupStatus.factory()` );

    }

    if ( _instance === null ) {
      super();
      _instance = this;
    }
    return _instance;
  }
  // ---------------------------------------------------
  //  method
  // ---------------------------------------------------
  /**
   * 現在の step を通知
   * @param {Number} step 現在の step No.
   */
  step( step:Number ):void {
    this.dispatch( { type: SignupStatus.SIGNUP_STEP, step: step} );
  }
  /**
   * 入力 email が二重登録で無い時に call します
   * @param {string} email 入力された email
   */
  email( email:string ):void {
    this.dispatch( { type: SignupStatus.SIGNUP_EMAIL, email: email} );
  }

  /**
   * submit を通知します
   * @param {Number} step 現在の step No.
   */
  submit( step:Number ):void {
    this.dispatch( { type: SignupStatus.SIGNUP_SUBMIT, step: step} );
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * SIGNUP_STEP
   * @return {string} signupStep を返します
   */
  static get SIGNUP_STEP():string {
    return 'signupStep';
  }
  /**
   * SIGNUP_EMAIL
   * @return {string} signupEmail を返します
   */
  static get SIGNUP_EMAIL():string {
    return 'signupEmail';
  }
  /**
   * SIGNUP_SUBMIT
   * @return {string} signupSubmit を返します
   */
  static get SIGNUP_SUBMIT():string {
    return 'signupSubmit';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {UserStatus} UserStatus instance を返します
   */
  static factory():SignupStatus {

    if ( _instance === null ) {

      _instance = new SignupStatus( _symbol );

    }

    return _instance;
  }
}
