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

import {Index} from './page/Index';
import {Category} from './page/Category';
import {Single} from './page/Single';

let _symbol = Symbol();

// UT
let UT = self.UT;
let Router = UT.app.Router;

export class Page {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Page is static Class. not use new Page().` );

    }
  }
  static init():void {

    let router = Router.factory();

    // index
    router.on( Router.INDEX, Page.index );
    // category
    router.on( Router.CATEGORY, Page.category );
    // single(detail|p)
    router.on( Router.SINGLE, Page.single );


    router.route();

  }
  static index():void {
    Index.start();
  }
  static category( event ):void {

    let slug = event.slug;
    let type = event.slugType;

    Category.start( slug, type );

  }
  static single( event ):void {

    let articleId = event.id;

    Single.start( articleId );

  }
  static comment():void {

  }
  static search():void {

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
