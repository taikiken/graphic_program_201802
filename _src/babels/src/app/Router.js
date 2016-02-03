/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/31 - 18:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

import {Env} from './Env';
import {Loc} from '../util/Loc';

/**
 * <h3>location.pathnameから現在地を調べます</h3>
 * 全て static です
 */
export class Router {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Router is static Class. not use new Router().` );

    }

  }
  /**
   * category page かを調べます
   * @return {boolean} category page なら true を返します
   */
  static isCategory():boolean {
    return Loc.path.substr(1, 9) === 'category/';
  }
  /**
   * single page かを調べます
   * @return {boolean} single page なら true を返します
   */
  static isSingle():boolean {
    if ( Loc.path.substr(1, 2) === 'p/' ) {
      let split = Loc.path.replace( '/p/', '' ).split( '/' );
      if ( Loc.isLocal() ) {
        split.pop();
      }
      return split.length === 1;
    }
  }
  /**
   * comment page かを調べます
   * @return {boolean} comment page なら true を返します
   */
  static isComment():boolean {
    if ( Loc.path.substr(1, 2) === 'p/' ) {
      let split = Loc.path.replace( '/p/', '' ).split( '/' );
      if ( Loc.isLocal() ) {
        split.pop();
      }
      if ( split.length > 1 && split[ 1 ] === 'comment' ) {
        return split.length === 3;
      }
    }
  }
  /**
   * comment replay page かを調べます
   * @return {boolean} comment replay page なら true を返します
   */
  static isReply():boolean {
    if ( Loc.path.substr(1, 2) === 'p/' ) {
      let split = Loc.path.replace( '/p/', '' ).split( '/' );
      if ( Loc.isLocal() ) {
        split.pop();
      }
      if ( split.length > 1 && split[ 1 ] === 'comment' ) {
        return split.length === 4;
      }
    }
  }
  /**
   * search page かを調べます
   * @return {boolean} search page なら true を返します
   */
  static isSearch():boolean {
    return Loc.path.substr(1, 7) === 'search/';
  }
  /**
   * signup page かを調べます
   * @return {boolean} signup page なら true を返します
   */
  static isSignup():boolean {
    return Loc.path.substr(1, 7) === 'signup/';
  }
  /**
   * mypage page かを調べます
   * @return {boolean} mypage page なら true を返します
   */
  static isMypage():boolean {
    return Loc.path.substr(1, 7) === 'mypage/';
  }
  /**
   * category slug, type を調べます
   * @return {{slug: string, type: string}} category slug, type を返します
   */
  static category():Object {
    if ( Router.isCategory() ) {
      let [ slug, type ] = Loc.path.replace( '/category/', '' ).split('/');

      if ( slug.indexOf( '.html' ) !== -1 ) {
        slug = '';
      }

      if ( slug === '' ) {
        slug = 'all';
      }

      return {
        slug: slug,
        type: type
      };
    }
  }
  /**
   * search keyword を調べます
   * @return {string} 検索キーワードを返します
   */
  static keyword():string {
    if ( Router.isSearch() ) {
      return Loc.path.replace( '/search/', '' ).split('/').shift();
    }
  }
  /**
   * article Id を調べます
   * @return {string} article Id を返します
   */
  static articleId():string {
    if ( Router.isSingle() || Router.isComment() || Router.isReply() ) {
      return Loc.path.replace( '/p/', '' ).split('/').shift();
    }
  }
  /**
   * comment Id を調べます
   * @return {string} comment Id を返します
   */
  static commentId():string {
    if ( Router.isComment() ) {
      return Loc.path.replace( '/p/', '' ).split('/')[ 2 ];
    }
  }
  /**
   * reply Id を調べます
   * @return {string} reply Id を返します
   */
  static replyId():string {
    if ( Router.isReply() ) {
      return Loc.path.replace( '/p/', '' ).split('/')[ 3 ];
    }
  }
}
