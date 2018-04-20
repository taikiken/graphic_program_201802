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


import { Types } from './Types';
import { User } from './../app/User';
import ApiDae from './../app/ApiDae';

/**
 * サーバーリクエストAPIを管理します
 * - 全て static
 */
export class Api {
  /**
   * `/api/` 前 domain を再生成します
   * - test, develop 切り替えに使用します
   * - `Api.rebuild()` を直接実行することは推奨しません
   * - `App.test()`, `App.develop()`, `App.production()` を使用してください。
   *
   * @example
   * // develop
   * App.develop();
   *
   * // production
   * App.production();
   * @param {string} [root=''] リクエスト・ドメイン
   */
  static rebuild(root = '') {
    ApiDae.rebuild(root);
  }
  // ----------------------------------
  // login / logout
  /**
   * login API を取得します
   * @return {Types} login API をTypes instanceで返します
   */
  static login() {
    return ApiDae.api('users:login');
  }
  /**
   * logout API を取得します
   * @return {Types} logout API をTypes instanceで返します
   */
  static logout() {
    return ApiDae.api('users:logout');
  }
  // ----------------------------------
  // user add / delete
  /**
   * ユーザー登録
   * @return {Types} ユーザー登録 API をTypes instanceで返します
   */
  static join() {
    return ApiDae.api('users:add');
  }
  /**
   * 退会
   * @return {Types} 退会 API をTypes instanceで返します
   */
  static leave() {
    return ApiDae.api('users:delete');
  }
  /**
   * signup 時
   * email が登録済みかを調べます
   * @return {Types} email が登録済みかを調べる API をTypes instanceで返します
   */
  static email() {
    return ApiDae.api('users:email');
  }
  // ----------------------------------
  // OAuth (sns)
  /**
   * SNS OAuth 認証のための遷移URL
   * @param {string} sns twitter or facebook どちらか
   * @return {Types} SNS OAuth 認証のための遷移URL をTypes instanceで返します
   */
  static auth(sns) {
    switch (sns) {
      case 'fb':
      case 'facebook':
        return ApiDae.api('auth:fb');

      case 'tw':
      case 'twitter':
        return ApiDae.api('auth:tw');

      default:
        throw new Error(`notice illegal action: ${sns}.`);
    }
  }

  /**
   * auth 情報を取得する API
   * @return {Types} auth 情報を取得する API をTypes instanceで返します
   */
  static sns() {
    return ApiDae.api('auth:sns');
  }

  // ----------------------------------
  // カテゴリー一覧
  /**
   * カテゴリー一覧
   * @return {Types} カテゴリー一覧 API をTypes instanceで返します
   */
  static categories() {
    return ApiDae.api('categories');
  }
  // ----------------------------------
  // 特定のカテゴリー情報
  /**
   * 特定のカテゴリー情報を取得する
   * ※主に企画モノの記事一覧ページを生成するにあたり利用する
   *
   * `/api/v1/category/[:category_slug]`
   * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
   * @returns {Types} 特定のカテゴリー情報
   */
  static categorySlug() {
    return ApiDae.api('category:slug');
  }
  // ----------------------------------
  // home / self
  /**
   * home API を user が login している / していない により取得します
   * @return {Types} home API(home / self)をTypes instanceで返します
   */
  static home() {
    return User.sign ? Api.selfAPi() : Api.homeAPi();
  }
  /**
   * ログインなしユーザーのhome API
   * @return {Types} ログインなしユーザーのhome APIをTypes instanceで返します
   */
  static homeAPi() {
    return ApiDae.api('home');
  }
  /**
   * ログイン済みユーザーのhome API
   * @return {Types} ログイン済みユーザーのhome APIをTypes instanceで返します
   */
  static selfAPi() {
    return ApiDae.api('self');
  }
  // ----------------------------------
  // 記事一覧
  /**
   * category API を取得します
   * @return {Types} category API を Types instance で取得します
   */
  static category() {
    return ApiDae.api('category');
  }
  // ----------------------------------
  // 地域別記事
  /**
   * 地域別記事: 地域 API を取得します
   * @returns {Types} 地域 API を Types instance で取得します
   * @since 2017-08-29
   */
  static area() {
    return ApiDae.api('area');
  }
  /**
   * 地域別記事: 都道府県 API を取得します
   * @returns {Types} 都道府県 API を Types instance で取得します
   * @since 2017-08-29
   */
  static pref() {
    return ApiDae.api('pref');
  }
  // ----------------------------------
  // 検索
  /**
   * search API を取得します
   * @return {Types} search API をTypes instanceで返します
   */
  static search() {
    return ApiDae.api('search');
  }
  // ----------------------------------
  // 記事詳細
  /**
   * detail API （単一記事）を取得します
   * @return {Types} detail API をTypes instanceで返します
   */
  static single() {
    return ApiDae.api('single');
  }
  /**
   * @deprecated instead use Api.single
   * @return {Types} detail API をTypes instanceで返します
   */
  static detail() {
    // console.warn( 'Api.detail deprecated. instead use Api.single.');
    return Api.single();
  }
  // ----------------------------------
  // 次の記事詳細
  /**
   * 次の記事詳細を取得します
   * @since 2016-09-24
   * @return {Types} articles/{:article_id}/next API をTypes instanceで返します
   */
  static singles() {
    return ApiDae.api('singles');
  }
  // ----------------------------------
  // bookmark
  /**
   * bookmark API を取得します
   * @param {string} action path option を指定します delete | add
   * @return {Types} bookmark API をTypes instanceで返します
   */
  static bookmark(action) {
    // bookmark は 登録 or 削除 機能のみ
    // https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=1840096099
    switch (action) {
      case 'delete':
        return ApiDae.api('bookmark:delete');

      case 'add':
        return ApiDae.api('bookmark:add');

      default:
        throw new Error(`bookmark illegal action: ${action}`);
    }
  }
  // ----------------------------------
  // comment
  /**
   * comment API を取得します
   * @param {string} action path option を指定します
   * @return {Types} comment API をTypes instanceで返します
   */
  static comment(action) {
    switch (action) {
      case 'official':
        return ApiDae.api('comment:official');

      case 'normal':
        return ApiDae.api('comment:normal');

      case 'self':
        return ApiDae.api('comment:self');

      case 'single':
        return ApiDae.api('comment:single');

      case 'send':
        return ApiDae.api('comment:send');

      case 'reply':
        return ApiDae.api('comment:reply');

      case 'delete':
      case 'send:delete':
        return ApiDae.api('comment:send:delete');

      case 'reply:delete':
        return ApiDae.api('comment:reply:delete');

      case 'good:add':
        return ApiDae.api('comment:good:add');

      case 'good:delete':
        return ApiDae.api('comment:good:delete');

      case 'bad:add':
        return ApiDae.api('comment:bad:add');

      case 'bad:delete':
        return ApiDae.api('comment:bad:delete');

      case '':
        // コメント一覧全部
        return ApiDae.api('comment');

      default:
        // console.warn( `comment illegal action: ${action}, instead use default` );
        return ApiDae.api('comment');
    }
  }
  /**
   * コメント返信 を comment 関数から抽出
   * @param {string} action path option を指定します
   * @return {Types} comment API をTypes instanceで返します
   */
  static replay(action = '') {
    switch (action) {
      case 'delete':
        return Api.comment('reply:delete');

      case '':
        return Api.comment('reply');

      default:
        // console.warn( `replay illegal action: ${action}, instead use default` );
        return Api.comment('reply');
    }
  }

  // ----------------------------------
  // my page

  /**
   * users API を取得します
   * @param {string} action path option を指定します
   * @return {Types} マイページ系 users API を Types instance で返します
   */
  static users(action) {
    switch (action) {

      case 'self':
        return ApiDae.api('users:self');


      case 'id':
        return ApiDae.api('users:id');

      case 'self:bookmark':
        return ApiDae.api('users:self:bookmark');

      /*
       無くなった様子
      case 'id:bookmark':
        return ApiDae.api('users:id:bookmark');
       */

      case 'activities':
      case 'activity':
        return ApiDae.api('users:self:activities');

      case 'notifications':
      case 'notice':
        return ApiDae.api('users:self:notifications');

      case 'notifications:read':
      case 'notice:read':
        return ApiDae.api('users:self:notifications:read');

      case 'notifications:count':
      case 'notice:count':
        console.warn('users:self:notifications:count deprecated');
        return ApiDae.api('users:self:notifications:count');

      default:
        throw new Error( `users illegal action: ${action}.` );
    }
  }
  /**
   * お知らせ API
   * @param {string} action path option を指定します read | count | ''
   * @return {Types} お知らせ系 users API を Types instance で返します
   */
  static notice(action = '') {
    switch (action) {
      case 'read':
        return Api.users(`notice:${action}`);

      case 'count':
        return Api.users(`notice:${action}`);

      case '':
        return Api.users('notice');

      default:
        throw new Error(`notice illegal action: ${action}.`);
    }
  }
  /**
   * alias Api,notice, お知らせ API
   * @param {string} action path option を指定します read | count | ''
   * @return {Types} お知らせ系 users API を Types instance で返します
   */
  static notifications(action) {
    return Api.notice(action);
  }
  /**
   * users:settings API を取得します
   * @param {string} action path option を指定します
   * @return {Types} マイページ系 users:settings API を Types instance で返します
   */
  static settings(action) {
    switch (action) {
      case 'account':
        return ApiDae.api('users:settings:account');

      case 'account:edit':
        return ApiDae.api('users:settings:account:edit');

      case 'interest':
        return ApiDae.api('users:settings:interest');

      case 'interest:edit':
        return ApiDae.api('users:settings:interest:edit');
      default:
        throw new Error(`settings illegal action: ${action}.`);
    }
  }
  /**
   * `tag:t10` tag 取得 API
   * @returns {string} tag API を返します
   * @since 2018-01-09
   */
  static tag() {
    return ApiDae.api('tag:t10');
  }
}
