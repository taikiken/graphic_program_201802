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
import {ApiDae} from './dae/ApiDae';

let _symbol = Symbol();

/**
 * <h3>サーバーリクエストAPIを管理します</h3>
 * 全て static
 */
export class Api {
  /**
   * static class です、instance を作成できません
   * @constructor
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Api is not new Api().` );

    }

  }

  /**
   * login API を取得します
   * @method login
   * @returns {Types} login API をTypes instanceで返します
   */
  static login():Types {

    return ApiDae.api( 'login' );

  }

  /**
   * home API を login している / していない に合わせ取得します
   * @method home
   * @returns {Types} home API(home / self)をTypes instanceで返します
   */
  static home():Types {

    return User.sign ? ApiDae.api( 'self' ) : ApiDae.api( 'home' );

  }

  /**
   * ログインなしユーザーのhome API
   * @method homeAPi
   * @return {Types} ログインなしユーザーのhome APIをTypes instanceで返します
   */
  static homeAPi():Types {

    return ApiDae.api( 'home' );

  }

  /**
   * ログイン済みユーザーのhome API
   * @method selfAPi
   * @return {Types} ログイン済みユーザーのhome APIをTypes instanceで返します
   */
  static selfAPi():Types {

    return ApiDae.api( 'self' );

  }

  /**
   * category API を取得します
   * @method category
   * @returns {Types} category API を Types instance で取得します
   */
  static category():Types {

    return ApiDae.api( 'category' );

  }

  /**
   * search API を取得します
   * @method search
   * @returns {Types} category API をTypes instanceで返します
   */
  static search():Types {

    return ApiDae.api( 'search' );

  }

  /**
   * category API を取得します
   * @method detail
   * @returns {Types} category API をTypes instanceで返します
   */
  static detail():Types {

    return ApiDae.api( 'detail' );

  }

  /**
   * bookmark API を取得します
   * @method bookmark
   * @param {string} [action=add] path option を指定します
   * @returns {Types} bookmark API をTypes instanceで返します
   */
  static bookmark( action:string = 'add' ):Types {

    switch ( action ) {
      case 'delete':
        return ApiDae.api( 'bookmark:delete' );

      case 'add':
        return ApiDae.api( 'bookmark:add' );

      default:
        console.warn( `bookmark illegal action: ${action}, instead use default` );
        return ApiDae.api( 'bookmark:add' );
    }

  }

  /**
   * comment API を取得します
   * @method comment
   * @param {string} [action=''] path option を指定します
   * @returns {Types} comment API をTypes instanceで返します
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
        return ApiDae.api( 'comment' );

      default:
        console.warn( `comment illegal action: ${action}, instead use default` );
        return ApiDae.api( 'comment' );
    }

  }

  /**
   * users API を取得します
   * @method users
   * @param {string} [action=''] path option を指定します
   * @returns {Types} category users をTypes instanceで返します
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
        return ApiDae.api( 'users' );

      default:
        console.warn( `users illegal action: ${action}, instead use default` );
        return ApiDae.api( 'users' );

    }
  }

}
