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

// data
import {Safety} from '../data/Safety';

// dae
import {KeywordsDae} from './single/KeywordsDae';
import {RelatedDae} from './RelatedDae';
// @since 2016-09-25
import { CanonicalDae } from './single/CanonicalDae';
import { PickupDae } from './caegories/PickupDae';

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
    // --------------------------------
    // @since 2016-09-25
    /**
     * カノニカル, response.canonical を CanonicalDae instance として管理します
     * @since 2016-09-25
     * @type {CanonicalDae}
     * @private
     */
    this._canonical = new CanonicalDae(response.canonical);
    /**
     * response.recommend_articles を PickupDae instance として管理します
     * @since 2016-09-25
     * @type {PickupDae}
     * @private
     */
    this._recommendArticles = new PickupDae(response.recommend_articles);
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
   * response.body_escape<br>
   * 記事本文(htmlなし）
   * @since 2016-09-25
   * @return {string} response.body_escape 記事本文(htmlなし）を返します
   */
  get bodyEscape():string {
    return Safety.string(this.response.body_escape, '');
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
  /**
   * カノニカル
   * @since 2016-09-25
   * @return {CanonicalDae} response.canonical を CanonicalDae instance として返します
   */
  get canonical():CanonicalDae {
    return this._canonical;
  }
  /**
   * バーチャル高校野球brightcove動画用refID
   * <pre>
   * # バーチャル高校野球brightcove動画用refID
   * - APIにはふくめずdb.helperからWebのみで取得できる
   * - この値があればWebではバーチャル甲子園埋め込みコードをつかって記事冒頭に動画をレンダリングする（この時記事冒頭に画像は表示しない）
   * </pre>
   *
   * `koya98_homerun1_hls`
   * @return {string} バーチャル高校野球brightcove動画用refID を返します
   * @since 2016-09-25
   */
  get mediaVkRefid():string {
    return this.response.media_vk_refid;
  }

  /**
   * この記事のオススメ記事
   * <pre>
   * この記事のオススメ記事 *アプリ版のみ利用
   * ※ このカテゴリーのオススメ記事、という扱いになりますが、アプリではリクエスト数削減のため関連記事同様、記事のレスポンスに含めてしまいます。
   * </pre>
   *
   * @example
   * const recommendArticles = pickupDae.recommendArticles;
   * // @type {Array<ArticleDae>}
   * const articles = recommendArticles.articles;
   * // @type {ArticleDae}
   * const article = articles.article;
   * console.log(article.date);// 2016-09-25
   *
   * @return {PickupDae} この記事のオススメ記事 を返します
   */
  get recommendArticles():PickupDae {
    return this._recommendArticles;
  }
}
