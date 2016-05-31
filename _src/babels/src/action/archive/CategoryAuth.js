/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 21:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {OffsetAuth} from '../OffsetAuth';
import {Api} from '../../net/Api';
import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {Length} from '../../app/const/Length';

/**
 * 記事一覧, カテゴリー別, 全て...<br>
 * token 付き<br>
 *
 * <p>認証ユーザー（ログイン済み）は固有の情報を取得可能になります</p>
 *
 * <pre>
 * すべて & カテゴリーごとの記事一覧
 * - 各カテゴリーごとの記事一覧
 * - ホームでのすべてのランキング/おすすめ動画もこれで取得
 * - ランキングはアクセス順で返す
 * - 動画ランキングもアクセス順で返す
 * </pre>
 *
 *
 * ```
 * GET
 * /api/v1/articles/category/{all|:category_slug}[/type][?[offset=n][&[length=m]]]
 * ```
 * <pre>
 * /api/v1/articles/category/all
 * - すべての記事の新着順
 *
 * /api/v1/articles/category/soccer/ranking
 * - サッカーのランキング
 *
 * /api/v1/articles/category/baseball/video
 * - 野球の動画
 * </pre>
 *
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=2055838625
 */
export class CategoryAuth extends OffsetAuth {
  /**
   * **要認証** 記事一覧を取得します + token
   * @param {string} [slug=all] category slug です
   * @param {string} [type=''] request type, '' | 'ranking' | 'video' です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値, Length.archive を default value に使用します
   * */
  constructor( slug:string = 'all', type:string = '', resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.archive ) {
    slug = Safety.string( slug, 'all' );
    type = Safety.string( type, '' );

    super( User.token, Api.category(), resolve, reject, offset, length );
    /**
     * リクエスト・クエリに使用する category slug
     * @type {string}
     * @protected
     */
    this._slug = slug;
    /**
     * リクエスト・クエリに使用するタイプ値, '' | 'ranking' | 'video' の3種類です
     * @type {string}
     * @protected
     */
    this._type = '';

    if ( Safety.normalize( type, [ '', 'ranking', 'video' ] ) ) {

      this._type = type;

    }/* else {

      this._type = '';

    }*/
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
   * category request 種類('', ranking, video)
   * @return {string|*} request type('', ranking, video) を返します
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

      // type が ranking | video
      return `${this._url}/${this.slug}/${this.type}?offset=${this.offset}&length=${this.length}`;

    }

  }
}
