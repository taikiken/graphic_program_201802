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


import {Safety} from '../data/Safety';
import {KeywordsDae} from './single/KeywordsDae';

import {RelatedDae} from './RelatedDae';

/**
 * 記事詳細の JSON.response
 */
export class SingleDae extends RelatedDae {
  /**
   * 記事詳細のresponceデータを後処理しやすいように加工します
   *
   * @param {Object} response JSON.response
   */
  constructor( response:Object = {} ) {

    response = Safety.object( response );
    super( response );
    /**
     * response.keywords を KeywordsDae instance にします
     * @type {KeywordsDae}
     * @protected
     */
    this._keywords = new KeywordsDae( response.keywords );
    // console.log( 'SingleDae _keywords' );
    // related
    let related = [];
    if ( Safety.check( response, 'related_articles', 'array' ) ) {
      //
      // response.related_articles.forEach( function( article ) {
      //
      //   related.push( new RelatedDae( article ) );
      //
      // } );
      related = response.related_articles.map((article) => new RelatedDae(article));
    }
    /**
     * 関連記事 response.related
     * @type {Array<RelatedDae>}
     * @protected
     */
    this._related = related;
    // console.log( 'SingleDae related_articles', related );

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * response.body
   * @return {string} 記事本文
   */
  get body():string {
    return this.response.body;
  }
  /**
   * 関連記事が存在するかの真偽値
   * @return {Boolean} 関連記事が存在するかの真偽値を返します
   */
  get hasRelated():Boolean {
    return this._related.length > 0;
  }
  /**
   * 関連記事配列
   * @return {Array<RelatedDae>} 関連記事配列を返します
   */
  get related():Array<RelatedDae> {
    return this._related;
  }
  /**
   * キーワード
   * @return {KeywordsDae|*} キーワードを返します
   */
  get keywords():KeywordsDae {
    return this._keywords;
  }
  /**
   * response.is_show_image<br>
   *
   * 記事詳細 / 任意の記事詳細での画像非表示( e-player埋め込み対応 )<br>
   * https://github.com/undotsushin/undotsushin/issues/721
   * <pre>
   * 記事詳細で画像を表示するかどうか
   * - true  : 表示する
   * - false : 表示しない
   * * Web版ではtrueの場合記事詳細ページで画像を表示しない
   * * アプリ版では記事詳細冒頭に必ず画像を表示するので参照する必要なし
   * </pre>
   * @since 2016-06-06
   * @return {Boolean} 記事詳細で画像を表示するかどうかの真偽値を返します
   */
  get isShowImage():Boolean {
    return this.response.is_show_image;
  }
}
