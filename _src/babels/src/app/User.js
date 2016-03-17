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
'use strict';

import {Cookie} from '../net/Cookie';
// import {Env} from './Env';
import {UserStatus} from '../event/UserStatus';
import {Safety} from '../data/Safety';

let _symbol = Symbol();
// let _sign = false;

/**
 * <h3>ユーザー情報を管理します</h3>
 * 全てstaticです
 */
export class User {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `User is static Class. not use new User().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * sign in / out 状態を表します
   * @return {boolean} sign in / out 状態を返します
   */
  static get sign():boolean {

    // return _sign;
    // 開発フェーズは簡易的に変数管理していたが
    // cookie token 管理へ移行する
    return User.token !== null;

  }
  /**
   * sign in / out 状態を表します
   * @param {boolean} bool sign in / out 状態の真偽値, true: sign in
   */
  static set sign( bool:boolean ) {

    /*
     // 開発フェーズは簡易的に変数管理していたが
     // cookie token 管理へ変更する
    _sign = bool;
    */
    bool = !!bool;

    //
    if ( bool ) {

      UserStatus.factory().login();

    } else {

      UserStatus.factory().logout();

    }

  }
  /**
   *
   * @return {string|null} token を返します, 見つからない時はnullを返します
   */
  static get token():string {
    return Cookie.get( Cookie.TARGET );
  }

  /*
   開発用 method
   @ToDo 本番環境で削除 or コメント
   @return {string} 開発 token
  static fake():string {
    return '608c8868d866a46fa3ae6566ce62e0be';
  }
  */
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * ログイン設定をします
   * @param {string} token 開発中の引数はオプション扱いです
   * @return {boolean} login が成功したかを返します
   */
  static login( token:string ):boolean {
    token = Safety.string( token, '' );
    console.log( 'token ', token );

    // 開発中は token が cookie になくても default user でログインさせちゃう
    /*
    if ( token === '' ) {
      if ( Env.mode === Env.PRODUCTION ) {
        throw new Error( 'token have to need.', token );
      } else {
        token = User.fake();
        console.warn( `illegal token instead use fake. ${token}` );
      }
    }*/

    // token が正常値なのかを調べる
    // 少なくとも, 文字型で空でない
    let altToken = Safety.string( token, '' );
    if ( altToken === '' ) {
      // token が不正値
      console.warn( `illegal token. [${token}]` );
      return false;
    }

    let result = Cookie.save( token );
    User.sign = result;
    return result;
  }
  /**
   * ログアウト設定をします
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
    console.log( `user init token [${token}]` );
    if ( token === null || typeof token === 'undefined' || token === '' ) {
      User.sign = false;
    } else {
      User.login( token );
    }
  }
}
