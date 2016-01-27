/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../data/Safety';
import {Format} from '../util/Format';
import {CategoryDae} from './CategoryDae';
import {MediaDae} from './MediaDae';
import {UserDae} from './UserDae';
import {KeywordsDae} from './single/KeywordsDae';

import {RelatedDae} from './RelatedDae';

/**
 * JSON.response
 */
export class SingleDae extends RelatedDae {
  constructor( response:Object = {} ) {

    super( response );

    this._keywords = new KeywordsDae( response.keywords );

    // related
    let related = [];
    if ( Safety.check( response, 'related_articles', 'array' ) ) {

      response.related_articles.forEach( function( article ) {

        related.push( new RelatedDae( article ) );

      } );

      console.log( 'related_articles ', related );

    }

    this._related = related;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string} 記事本文
   */
  get body():string {
    return this.response.body;
  }
  /**
   *
   * @return {boolean} 関連記事が存在するかの真偽値
   */
  get hasRelated():boolean {
    return this._related.length > 0;
  }
  /**
   *
   * @return {Array|*} 関連記事配列を返します
   */
  get related():Array<RelatedDae> {
    return this._related;
  }
  /**
   *
   * @return {KeywordsDae|*} キーワードを返します
   */
  get keywords():KeywordsDae {
    return this._keywords;
  }
}
