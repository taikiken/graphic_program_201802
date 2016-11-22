/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/12 - 15:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// net
import {Cookie} from '../net/Cookie';

// event
// import {Env} from './Env';
import {UserStatus} from '../event/UserStatus';

// data
import {Safety} from '../data/Safety';

//
// let _symbol = Symbol();
// // let _sign = false;

/**
 * ログインユーザー情報
 * @type {?UserDae}
 * @private
 * @since 2016-11-05
 */
let information = null;

/**
 * <p>ユーザー情報を管理します</p>
 * <p>全てstaticです</p>
 */
export class User {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'User is static Class. not use new User().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * sign in / out 状態を表します
   * @return {Boolean} sign in / out 状態を返します
   */
  static get sign():Boolean {

    // return _sign;
    // 開発フェーズは簡易的に変数管理していたが
    // cookie token 管理へ移行する
    return User.token !== null;

  }
  /**
   * sign in / out 状態を表します<br>
   * true: sign in です
   * @param {Boolean} bool sign in / out 状態の真偽値, true: sign in
   */
  static set sign( bool:Boolean ) {

    bool = !!bool;

    //
    if ( bool ) {

      UserStatus.factory().login();

    } else {

      UserStatus.factory().logout();

    }

  }
  /**
   * cookie より user token を取り出します<br>
   * 見つからない時は null になります
   * @return {string|null} token を返します, 見つからない時はnullを返します
   */
  static get token():string {
    return Cookie.get( Cookie.TARGET );
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * ログイン設定をします
   * @param {string} token 開発中の引数はオプション扱いです
   * @return {Boolean} login が成功したかを返します
   */
  static login( token:string ):Boolean {
    token = Safety.string( token, '' );

    // token が正常値なのかを調べる
    // 少なくとも, 文字型で空でない
    let altToken = Safety.string( token, '' );
    if ( altToken === '' ) {
      // token が不正値
      // console.warn( `illegal token. [${token}]` );
      return false;
    }

    let result = Cookie.save( token );
    // console.log( 'login ', result );
    User.sign = result;
    
    return result;
  }
  /**
   * ログアウト処理を行います<br>
   * token を cookie から削除します
   */
  static logout():void {
    Cookie.remove( Cookie.TARGET );
    User.sign = false;
  }
  /**
   * ログイン・非ログインを確認します
   * <p>ログイン（token発見）時は login 処理を行います</p>
   */
  static init():void {
    let token = User.token;
    // console.log( `user init token [${token !== ''}]` );
    if ( token === null || typeof token === 'undefined' || token === '' ) {
      User.sign = false;
    } else {
      User.login( token );
    }
  }

  /**
   * ログインユーザー情報
   * @return {UserDae} ログインユーザー情報を返します
   * @since 2016-11-05
   */
  static info() {
    return information;
  }
  /**
   * ログインユーザー情報を設定します
   * @param {UserDae} info ログインユーザー情報
   * @since 2016-11-05
   */
  static setInfo(info) {
    information = info;
  }
}
