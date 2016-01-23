/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Types} from './Types';
import {User} from './User';
import {ApiDae} from './../app/ApiDae';

let _symbol = Symbol();

/**
 * <h3>サーバーリクエストAPIを管理します</h3>
 * 全て static
 */
export class Api {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Api is static Class. not use new Api().` );

    }

  }
  /**
   * <p>/api/ 前 domain を再生成します<br>
   * test, develop 切り替えに使用します</p>
   * <p><code>Api.rebuild()</code>を直接実行することは推奨しません</p>
   * <code>App.test(), App.develop(), App.production()</code>を使用してください。
   *
   * @example
   * // develop
   * App.develop();
   *
   * // production
   * App.production();
   */
  static rebuild():void {

    ApiDae.rebuild();

  }
  /**
   * login API を取得します
   * @return {Types} login API をTypes instanceで返します
   */
  static login():Types {

    return ApiDae.api( 'login' );

  }
  /**
   * home API を user が login している / していない により取得します
   * @return {Types} home API(home / self)をTypes instanceで返します
   */
  static home():Types {

    return User.sign ? Api.selfAPi() : Api.homeAPi();

  }
  /**
   * ログインなしユーザーのhome API
   * @return {Types} ログインなしユーザーのhome APIをTypes instanceで返します
   */
  static homeAPi():Types {

    return ApiDae.api( 'home' );

  }
  /**
   * ログイン済みユーザーのhome API
   * @return {Types} ログイン済みユーザーのhome APIをTypes instanceで返します
   */
  static selfAPi():Types {

    return ApiDae.api( 'self' );

  }
  /**
   * category API を取得します
   * @return {Types} category API を Types instance で取得します
   */
  static category():Types {

    return ApiDae.api( 'category' );

  }
  /**
   * search API を取得します
   * @return {Types} search API をTypes instanceで返します
   */
  static search():Types {

    return ApiDae.api( 'search' );

  }
  /**
   * detail API （単一記事）を取得します
   * @return {Types} detail API をTypes instanceで返します
   */
  static detail():Types {

    return ApiDae.api( 'detail' );

  }
  /**
   * bookmark API を取得します
   * @param {string} [action=add] path option を指定します delete | add
   * @return {Types} bookmark API をTypes instanceで返します
   */
  static bookmark( action:string = 'add' ):Types {

    // bookmark は 登録 or 削除 機能のみ
    // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=1840096099
    switch ( action ) {
      case 'delete':
        return ApiDae.api( 'bookmark:delete' );

      case 'add':
        return ApiDae.api( 'bookmark:add' );

      // add | delete 以外の機能をコメントへ
      // case '':
      //  return ApiDae.api( 'bookmark' );

      default:
        console.warn( `bookmark illegal action: ${action}, instead use default` );
        return ApiDae.api( 'bookmark:add' );
    }

  }
  /**
   * comment API を取得します
   * @param {string} [action=''] path option を指定します
   * @return {Types} comment API をTypes instanceで返します
   */
  static comment( action:string = '' ):Types {

    switch ( action ) {
      case 'send':
        return ApiDae.api( 'comment:send' );

      case 'reply':
        return ApiDae.api( 'comment:reply' );

      case 'send:edit':
        return ApiDae.api( 'comment:send:edit' );

      case 'reply:edit':
        return ApiDae.api( 'comment:reply:edit' );

      case 'send:delete':
        return ApiDae.api( 'comment:send:delete' );

      case 'reply:delete':
        return ApiDae.api( 'comment:reply:delete' );

      case 'good:add':
        return ApiDae.api( 'comment:good:add' );

      case 'good:delete':
        return ApiDae.api( 'comment:good:delete' );

      case 'bad:add':
        return ApiDae.api( 'comment:bad:add' );

      case 'bad:delete':
        return ApiDae.api( 'comment:bad:delete' );

      case '':
        // 記事詳細でのコメント一覧表示
        return ApiDae.api( 'comment' );

      default:
        console.warn( `comment illegal action: ${action}, instead use default` );
        return ApiDae.api( 'comment' );
    }

  }
  /**
   * users API を取得します
   * @param {string} [action=''] path option を指定します
   * @return {Types} category users をTypes instanceで返します
   */
  static users( action:string = '' ):Types {

    switch ( action ) {
      case 'notice':
        return ApiDae.api( 'users:notice' );

      case 'notice:read':
        return ApiDae.api( 'users:notice:read' );

      case 'bookmark':
        return ApiDae.api( 'users:bookmark' );

      case 'activity':
        return ApiDae.api( 'users:activity' );

      case '':
        // ユーザー詳細
        return ApiDae.api( 'users' );

      default:
        console.warn( `users illegal action: ${action}, instead use default` );
        return ApiDae.api( 'users' );

    }
  }

}
