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


import {TypeDae} from './user/TypeDae';
import {InterestDae} from './user/InterestDae';
import {LogoDae} from './user/LogoDae';

import {BannersDae} from './banner/BannersDae';

import {Safety} from '../data/Safety';

/**
 * ユーザー情報
 * article.user
 */
export class UserDae {
  /**
   * article.user
   * @param {Object} [user={}] article.user
   */
  constructor( user:Object = {} ) {

    user = Safety.object( user );
    /**
     * article.user
     * @type {Object}
     * @protected
     */
    this._user = user;
    /**
     * user.type
     * @type {TypeDae}
     * @protected
     */
    this._type = new TypeDae( user.type );
    /**
     * user.interest
     * @type {InterestDae}
     * @protected
     */
    this._interest = new InterestDae( user.interest );
    // banner 追加
    /**
     * user.banner<br>
     * 廃止予定！？
     * @type {BannersDae}
     * @protected
     */
    this._banners = new BannersDae( user.banner );
    // from 2016-05-31
    /**
     * user.logo
     * @from 2016-05-31
     * @type {LogoDae}
     * @protected
     */
    this._logo = new LogoDae( user.logo );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * article.user
   * @return {Object|*} article.user
   */
  get user():Object {
    return this._user;
  }
  /**
   * article.user.type
   * @return {TypeDae|*} article.user.type
   */
  get type():TypeDae {
    return this._type;
  }
  /**
   * article.user.id
   * @return {Number} article.user.id ユーザーIDを返します
   */
  get id():Number {
    return this.user.id;
  }
  /**
   * article.user.name
   * @return {string} article.user.name ユーザー名を返します
   */
  get userName():string {
    // data に null 値が入っていることがあるので念のためチェックする
    return Safety.string( this.user.name, '' );
  }
  /**
   * article.user.profile_picture
   * @return {string} article.user.profile_picture ユーザーのURLを返します
   */
  get profilePicture():string {
    // data に null 値が入っていることがあるので念のためチェックする
    return Safety.string( this.user.profile_picture, '' );
  }
  /**
   * article.user.url
   * @return {string} article.user.url ユーザーのURLを返します
   */
  get url():string {
    // data に null 値が入っていることがあるので念のためチェックする
    return Safety.string( this.user.url, '' );
  }
  /**
   * article.user.bio
   * @return {string} article.user.bio ユーザーの肩書を返します
   */
  get bio():string {
    // data に null 値が入っていることがあるので念のためチェックする
    return Safety.string( this.user.bio, '' );
  }
  /**
   * article.user.email
   * @return {string} email 情報を返します
   */
  get email():string {
    // data に null 値が入っていることがあるので念のためチェックする
    return Safety.string( this.user.email, '' );
  }
  // --------------------------------------------------------------------
  // 以下リクエストによっては undefined になります
  // 登録系, ログイン系 などのリクエストの時に情報を持ちます
  /**
   * メアド、パスワードから生成されるアクセストークン
   * access_token を使い **ログイン** 処理を行います
   * @return {string} メアド、パスワードから生成されるアクセストークン を返します
   */
  get accessToken():string {
    // data に null 値が入っていることがあるので念のためチェックする
    return Safety.string( this.user.access_token, '' );
  }
  /**
   * セッションID *用途なさそうだけど一応
   * @return {string} セッションID *用途なさそうだけど一応 返します
   */
  get sessionToken():string {
    // data に null 値が入っていることがあるので念のためにチェックする
    return Safety.string( this.user.session_token, '' );
  }
  /**
   * 興味がある
   * @return {InterestDae|*} 興味がある項目を返します, undefined になることがあります
   */
  get interest():InterestDae {
    return this._interest;
  }

  // --------------------------------------------------------------------
  // banner
  /**
   * ユーザー・バナー
   * @return {BannersDae} response.user.banner を BannersDae として返します
   */
  get banner():BannersDae {
    return this._banners;
  }

  /**
   * response.user.logo
   * @return {LogoDae} response.user.logo を LogoDae instance として返します
   */
  get logo():LogoDae {
    return this._logo;
  }
}
