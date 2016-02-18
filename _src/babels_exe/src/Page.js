/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {PageTop} from './ui/PageTop';

import {Index} from './page/Index';
import {Category} from './page/Category';
import {Single} from './page/Single';
import {Search} from './page/Search';

import {SearchFrom} from './header/SearchFrom';

let _symbol = Symbol();

// UT
let UT = self.UT;
let Router = UT.app.Router;

/**
 * <h3>ページ振り分け</h3>
 * 全て static です
 */
export class Page {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Page is static Class. not use new Page().` );

    }
  }
  /**
   * Page 初期化, UT.app.Router event を listen します
   */
  static init():void {

    let router = Router.factory();

    // index
    router.on( Router.INDEX, Page.index );
    // category
    router.on( Router.CATEGORY, Page.category );
    // single(detail|p)
    router.on( Router.SINGLE, Page.single );
    // search
    router.on( Router.SEARCH, Page.search );

    router.route();

    // page top
    let pageTop = new PageTop();
    pageTop.init();

    // search from
    SearchFrom.start();

  }
  /**
   * home, index page
   */
  static index():void {
    Index.start();
  }
  /**
   * category page
   * @param {Object} event Router event object
   */
  static category( event:Object ):void {

    let slug = event.slug;
    let type = event.slugType;

    Category.start( slug, type );

  }
  /**
   * single, detail page
   * @param {Object} event Router event object
   */
  static single( event ):void {

    let articleId = event.id;

    Single.start( articleId );

  }
  static comment():void {

  }
  static search( event ):void {

    Search.start( event.keyword );

  }
  static signup():void {

  }
  static login():void {

  }
  static logout():void {

  }
  static password():void {

  }
  static passwordResetting():void {

  }
  static mypage():void {

  }
  static activities():void {

  }
  static notifications():void {

  }
  static settings():void {

  }
  static interest():void {

  }
  static social():void {

  }
  static deactivate():void {

  }
}
