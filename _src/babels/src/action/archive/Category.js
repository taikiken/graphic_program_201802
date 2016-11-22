/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 15:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// action
import {Offset} from '../Offset';
// net
import {Api} from '../../net/Api';
// data
import {Safety} from '../../data/Safety';
// app
import {Length} from '../../app/const/Length';
import {ArchiveType} from '../../app/const/ArchiveType';

/**
 * 記事一覧, カテゴリー別, 全て...<br>
 *
 * ***すべて & カテゴリーごとの記事一覧***
 *
 * - 各カテゴリーごとの記事一覧
 * - ホームでのすべてのランキング/おすすめ動画もこれで取得
 * - ランキングはアクセス順で返す
 * - 動画ランキングもアクセス順で返す
 *
 * *** リクエストサンプル ***
 *
 * <pre>
 * GET
 * /api/v1/articles/category/{all|:category_slug}[/type][?[offset=n][&[length=m]]]
 * </pre>
 *
 * ```
 * /api/v1/articles/category/all
 * ```
 *
 * - すべての記事の新着順
 *
 * ```
 * /api/v1/articles/category/soccer/ranking
 * ```
 *
 * - サッカーのランキング
 *
 * ```
 * /api/v1/articles/category/baseball/video
 * ```
 *
 * - 野球の動画
 *
 * <p>from 2016-06-29<br>
 * recommend 追加</p>
 *
 * - なし : 新着順
 * - ranking : 人気順
 * - video : 動画の人気順 = おすすめ動画
 * - recommend : おすすめ記事
 *
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=2055838625
 */
export class Category extends Offset {
  /**
   * category の **記事一覧** を取得します
   * @param {string} [slug=all] category slug です
   * @param {string} [type=''] request type, '' | 'ranking' | 'video' です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=Length.archive] query length 値 (16)
   * */
  constructor( slug:string = 'all', type:string = '', resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.archive ) {

    slug = Safety.string( slug, 'all' );
    // type = Safety.string( type, '' );

    super( Api.category(), resolve, reject, offset, length );
    /**
     * category slug
     * @type {string}
     * @protected
     */
    this._slug = slug;
    // /**
    //  * <p>Ajax リクエストオプションの type 値<br>
    //  * ''（空）, ranking, video の 3種類です</p>
    //  * @type {string}
    //  * @protected
    //  */
    // this._type = '';

    // @since 2016-06-29
    // recommend 追加
    if ( !Safety.normalize( type, [ ArchiveType.DEFAULT, ArchiveType.RANKING, ArchiveType.VIDEO, ArchiveType.RECOMMEND ] ) ) {

      type = '';

    }
    /**
     * <p>Ajax リクエストオプションの type 値<br>
     * ''（空）, ranking, video の 3種類です</p>
     * <p>2016-06-29 recommend が追加になりました</p>
     * @type {string}
     * @protected
     */
    this._type = type;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * category slug
   * @return {string|*} category slug を返します
   */
  get slug():string {

    return this._slug;

  }
  /**
   * category request 種類('', ranking, video, recommend)
   * @return {string} request type('', ranking, video, recommend) を返します
   */
  get type():string {

    return this._type;

  }
  /**
   * Ajax API url を作成します
   * Api.category().url/all|slug[/ranking]?offset=0&length=5
   * @return {string} API url を返します
   */
  get url():string {

    if ( this.type === '' ) {

      // type が empty, 新着順
      return `${this._url}/${this.slug}?offset=${this.offset}&length=${this.length}`;

    } else {

      // type が ranking | video | recommend
      return `${this._url}/${this.slug}/${this.type}?offset=${this.offset}&length=${this.length}`;

    }

  }
}
