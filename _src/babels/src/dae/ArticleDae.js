/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// data
import {Safety} from '../data/Safety';
// util
import {Format} from '../util/Format';
// dae
// import {CategoryDae} from './CategoryDae';
import {MediaDae} from './MediaDae';
import {UserDae} from './UserDae';
import {CommentsPopularDae} from './CommentsPopularDae';
import {CategoriesDae} from './caegories/CategoriesDae';

/**
 * articles 記事一つのデータを管理します
 */
export class ArticleDae {
  /**
   * archive系で取得した記事配列から 1件取り出し<br>
   * データを管理します
   *
   * @param {Object} [article={}] articles配列にセットされている article 記事1件データ
   */
  constructor( article:Object = {} ) {

    article = Safety.object( article );
    /**
     * 取得 JSON articles 配列にセットされている article 記事1件データ
     * @type {Object}
     * @protected
     */
    this._article = article;
    // /**
    //  * article.category
    //  *
    //  * @deprecated instead use categories
    //  * @type {CategoryDae}
    //  * @protected
    //  */
    // this._category = new CategoryDae( article.category );
    // /**
    //  * category2 追加になった<br>
    //  * article.category
    //  *
    //  * https://github.com/undotsushin/undotsushin/issues/140#issuecomment-186715283
    //  *
    //  * @deprecated instead use categories
    //  * @since 2016-02-29
    //  * @type {CategoryDae}
    //  * @protected
    //  */
    // this._category2 = new CategoryDae( article.category2 );
    /**
     * article.categories
     *
     * @type {CategoriesDae}
     * @protected
     */
    this._categories = new CategoriesDae( article );
    /**
     * article.media
     * @type {MediaDae}
     * @protected
     */
    this._media = new MediaDae( article.media );
    /**
     * article.user
     * @type {UserDae}
     * @protected
     */
    this._user = new UserDae( article.user );
    /**
     * article.comments_popular
     * @type {CommentsPopularDae}
     * @protected
     */
    this._popular = new CommentsPopularDae( article.comments_popular );
    
    // 整数へ型変換, Safety.integer が Number型のみ受け付けるため
    let commentsCount = parseInt( article.comments_count, 10 );
    // 数値を保証
    commentsCount = Safety.integer( commentsCount, 0 );
    /**
     * <p>コメント数</p>
     * article.comments_count
     * @type {Number}
     * @protected
     */
    this._commentsCount = commentsCount;

    // date check
    if ( Safety.check( article, 'date' ) ) {

      /**
       * <p>出力形式日付</p>
       * article.date
       * @deprecated instead use article.display_date
       * @type {string}
       * @protected
       */
      this._formatDate = Format.date( article.date );

    }
    /**
     * フラッグ<br>
     * **未使用**
     * @type {number}
     * @protected
     */
    this._index = -1;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * index Number<br>
   * -1 の時は未設定なので使用してはいけない
   * @default -1
   * @return {Number|*|Number} index Number を返します
   */
  get index():Number {
    return this._index;
  }

  /**
   * index Number を設定します
   * @param {Number} index index Number
   */
  set index( index:Number ):void {
    this._index = index;
  }
  /**
   * 記事単1データ
   * @return {Object|*} article 記事単1データ を返します
   */
  get article():Object {
    return this._article;
  }
  // /**
  //  * <p>category 情報</p>
  //  * @deprecated instead use categories
  //  * @return {CategoryDae|*} article.category を返します
  //  */
  // get category():CategoryDae {
  //   return this._category;
  // }
  // /**
  //  * category2 情報<br>
  //  * いつの間にか追加になった
  //  * @deprecated instead use categories
  //  * @return {CategoryDae|*} article.category2 を返します
  //  */
  // get category2():CategoryDae {
  //   return this._category2;
  // }
  /**
   * response.categories を CategoriesDae へ
   * @return {CategoriesDae|*} response.categories を CategoriesDae instance にし返します
   */
  get categories():CategoriesDae {
    return this._categories;
  }
  /**
   * alias commentsTotal
   * @return {Number} article.comments_count を返します
   */
  get commentsCount():Number {
    return this.commentsTotal;
  }
  /**
   * コメント総数を調べます
   * @return {Number|*} コメント総数を返します, article.comments_count を返します
   */
  get commentsTotal():Number {
    return this._commentsCount;
  }
  /**
   * article.comments_popular
   * @return {CommentsPopularDae|*} article.comments_popular を返します
   */
  get commentsPopular():CommentsPopularDae {
    return this._popular;
  }
  /**
   * article.date
   * @return {string} article.date
   */
  get date():string {
    return this.article.date;
  }
  /**
   * article.date をフォーマット<br>
   * 多分使わない, 代わりに displayDate を使う
   *
   * @deprecated instead use displayDate
   * @return {string} article.date を日本語日付に変換し返します
   */
  get formatDate():string {
    return this._formatDate;
  }
  /**
   * 画面表示日付
   * @return {string} article.display_date を返します
   */
  get displayDate():string {
    return this.article.display_date;
  }
  /**
   * article.description
   * @return {string} article.description を返します
   */
  get description():string {
    return this.article.description;
  }
  /**
   * article.id
   * @return {string} article.id を返します
   */
  get id():string {
    return this.article.id;
  }
  /**
   * article.is_bookmarked<br>
   * bookmark した / してない
   * @return {Boolean} article.is_bookmarked を返します
   */
  get isBookmarked():Boolean {
    return this.article.is_bookmarked;
  }
  /**
   * パーソナライズされたニュースは is_recommend(キー名は仮） をたてて「おすすめ」アイコンを表示する
   * @return {Boolean} パーソナライズされたニュース の真偽値を返します
   */
  get isRecommend():Boolean {
    return this.article.is_recommend;
  }
  // -------------------------
  // 2016-05-21 added
  /**
   * New Flag, ※現在は常にFlagがたつように30日に設定
   * @since 2016-05-21
   * @return {Boolean} New Flag の真偽値を返します
   */
  get isNew():Boolean {
    return this.article.is_new;
  }
  // isNew 追加
  // -------------------------
  /**
   * article.media
   * @return {MediaDae} article.media を返します
   */
  get media():MediaDae {
    return this._media;
  }
  /**
   * article.media_type<br>
   * video or image のはず
   * @return {string} article.media_type を返します
   */
  get mediaType():string {
    return this.article.media_type;
  }
  /**
   * article.title
   * @return {string} article.title を返します
   */
  get title():string {
    return this.article.title;
  }
  /**
   * article.url
   * @return {string} article.url を返します
   */
  get url():string {
    return this.article.url;
  }
  /**
   * article.user
   * @return {UserDae} article.user を返します
   */
  get user():UserDae {
    return this._user;
  }
}
