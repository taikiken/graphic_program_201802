/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {TypeDae} from './user/TypeDae';
import {Safety} from '../data/Safety';

/**
 * article.user
 */
export class UserDae {
  /**
   * article.user
   * @param {Object} [user={}] article.user
   */
  constructor( user:Object = {} ) {

    user = Safety.object( user );

    this._user = user;
    this._type = new TypeDae( user.type );

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} article.user
   */
  get user():Object {
    return this._user;
  }
  /**
   * @return {TypeDae|*} article.user.type
   */
  get type():TypeDae {
    return this._type;
  }
  /**
   * @return {string} article.user.id ユーザーIDを返します
   */
  get id():string {
    return this.user.id;
  }
  /**
   * @return {string} article.user.name ユーザー名を返します
   */
  get userName():string {
    return this.user.name;
  }
  /**
   * @return {string} article.user.profile_picture ユーザーのURLを返します
   */
  get profilePicture():string {
    return this.user.profile_picture;
  }
  /**
   * @return {string} article.user.url ユーザーのURLを返します
   */
  get url():string {
    return this.user.url;
  }
  /**
   * @return {string} article.user.bio ユーザーの肩書を返します
   */
  get bio():string {
    return this.user.bio;
  }

}
