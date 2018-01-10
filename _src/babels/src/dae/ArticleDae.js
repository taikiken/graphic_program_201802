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
// // util
// import {Format} from '../util/Format';
// dae
// import {CategoryDae} from './CategoryDae';
import MediaDae from './MediaDae';
import {UserDae} from './UserDae';
import {CommentsPopularDae} from './CommentsPopularDae';
import {CategoriesDae} from './categories/CategoriesDae';
import AnotherCategoriesDae from './another-categories/AnotherCategoriesDae';

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
  constructor(article = {}) {
    const altArticle = Safety.object(article);
    /**
     * 取得 JSON articles 配列にセットされている article 記事1件データ
     * @type {Object}
     */
    this.article = altArticle;
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
     */
    this.categories = new CategoriesDae(altArticle);
    /**
     * article.media
     * @type {MediaDae}
     */
    this.media = new MediaDae(altArticle.media);
    /**
     * article.user
     * @type {UserDae}
     */
    this.user = new UserDae(altArticle.user);
    /**
     * article.comments_popular
     * @type {CommentsPopularDae}
     */
    this.commentsPopular = new CommentsPopularDae(altArticle.comments_popular);
    
    // 整数へ型変換, Safety.integer が number型のみ受け付けるため
    let commentsCount = parseInt(altArticle.comments_count, 10);
    // // 数値を保証
    // commentsCount = Safety.integer(commentsCount, 0);
    /**
     * article.comments_count
     * - コメント総数を調べます
     * @type {number}
     */
    this.commentsCount = Safety.integer(commentsCount, 0);
    /**
     * a;ias - article.comments_count
     * - コメント総数を調べます
     * @type {number}
     */
    this.commentsTotal = this.commentsCount;
    // this._commentsCount = commentsCount;

    // // date check
    // if (Safety.check(article, 'date')) {
    //
    //   /**
    //    * <p>出力形式日付</p>
    //    * article.date
    //    * @deprecated instead use article.display_date
    //    * @type {string}
    //    * @protected
    //    */
    //   this._formatDate = Format.date( article.date );
    //
    // }
    /**
     * フラッグ
     * @type {number}
     */
    this.index = -1;
    // 2017-09-14
    /**
     * `another_categories` value - 地域の詳細
     * @type {AnotherCategoriesDae}
     * @since 2017-09-14
     */
    this.anotherCategories = new AnotherCategoriesDae(altArticle.another_categories);
    // ----
    /**
     * article.date
     * @type {string}
     */
    this.date = altArticle.date;
    /**
     * 画面表示日付 - article.display_date
     * @type {string}
     */
    this.displayDate = altArticle.display_date;
    /**
     * article.description
     * @type {string}
     */
    this.description = altArticle.description;
    /**
     * article.id
     * @type {string}
     */
    this.id = altArticle.id;
    /**
     * article.is_bookmarked
     * - bookmark した / してない
     * @type {boolean}
     */
    this.isBookmarked = altArticle.isBookmarked || altArticle.is_bookmarked;
    /**
     * article.is_recommend
     * - パーソナライズされたニュースは is_recommend(キー名は仮）をたてて「おすすめ」アイコンを表示する
     * @type {boolean}
     */
    this.isRecommend = altArticle.is_recommend;
    /**
     * article.is_new
     * - New Flag, ※現在は常にFlagがたつように30日に設定
     * @type {boolean}
     * @since 2016-05-21
     */
    this.isNew = altArticle.is_new;
    /**
     * article.media_type
     * - video or image
     * @type {string}
     */
    this.mediaType = altArticle.mediaType || altArticle.media_type;
    /**
     * article.title
     * @type {string}
     */
    this.title = altArticle.title;
    /**
     * article.url
     * @type {string}
     */
    this.url = altArticle.url;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // /**
  //  * index number<br>
  //  * -1 の時は未設定なので使用してはいけない
  //  * @default -1
  //  * @return {number} index number を返します
  //  */
  // get index() {
  //   return this._index;
  // }
  // /**
  //  * index number を設定します
  //  * @param {number} index index number
  //  */
  // set index(index) {
  //   this._index = index;
  // }
  // /**
  //  * 記事単1データ
  //  * @return {Object} article 記事単1データ を返します
  //  */
  // get article() {
  //   return this._article;
  // }
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
  // /**
  //  * response.categories を CategoriesDae へ
  //  * @return {CategoriesDae} response.categories を CategoriesDae instance にし返します
  //  */
  // get categories() {
  //   return this._categories;
  // }
  // /**
  //  * alias commentsTotal
  //  * @return {number} article.comments_count を返します
  //  */
  // get commentsCount() {
  //   return this.commentsTotal;
  // }
  // /**
  //  * コメント総数を調べます
  //  * @return {number} コメント総数を返します, article.comments_count を返します
  //  */
  // get commentsTotal() {
  //   return this.commentsCount;
  // }
  // /**
  //  * article.comments_popular
  //  * @return {CommentsPopularDae} article.comments_popular を返します
  //  */
  // get commentsPopular() {
  //   return this._popular;
  // }
  // /**
  //  * article.date
  //  * @return {string} article.date
  //  */
  // get date() {
  //   return this.article.date;
  // }
  // /**
  //  * article.date をフォーマット<br>
  //  * 多分使わない, 代わりに displayDate を使う
  //  *
  //  * @deprecated instead use displayDate
  //  * @return {string} article.date を日本語日付に変換し返します
  //  */
  // get formatDate():string {
  //   return this._formatDate;
  // }
  // /**
  //  * 画面表示日付
  //  * @return {string} article.display_date を返します
  //  */
  // get displayDate() {
  //   return this.article.display_date;
  // }
  // /**
  //  * article.description
  //  * @return {string} article.description を返します
  //  */
  // get description() {
  //   return this.article.description;
  // }
  // /**
  //  * article.id
  //  * @return {string} article.id を返します
  //  */
  // get id():string {
  //   return this.article.id;
  // }
  // /**
  //  * article.is_bookmarked<br>
  //  * bookmark した / してない
  //  * @return {boolean} article.is_bookmarked を返します
  //  */
  // get isBookmarked() {
  //   return this.article.is_bookmarked;
  // }
  // /**
  //  * パーソナライズされたニュースは is_recommend(キー名は仮） をたてて「おすすめ」アイコンを表示する
  //  * @return {boolean} パーソナライズされたニュース の真偽値を返します
  //  */
  // get isRecommend() {
  //   return this.article.is_recommend;
  // }
  // // -------------------------
  // // 2016-05-21 added
  // /**
  //  * New Flag, ※現在は常にFlagがたつように30日に設定
  //  * @since 2016-05-21
  //  * @return {boolean} New Flag の真偽値を返します
  //  */
  // get isNew() {
  //   return this.article.is_new;
  // }
  // isNew 追加
  // -------------------------
  // /**
  //  * article.media
  //  * @return {MediaDae} article.media を返します
  //  */
  // get media() {
  //   return this._media;
  // }
  // /**
  //  * article.media_type<br>
  //  * video or image のはず
  //  * @return {string} article.media_type を返します
  //  */
  // get mediaType() {
  //   return this.article.media_type;
  // }
  // /**
  //  * article.title
  //  * @return {string} article.title を返します
  //  */
  // get title() {
  //   return this.article.title;
  // }
  // /**
  //  * article.url
  //  * @return {string} article.url を返します
  //  */
  // get url() {
  //   return this.article.url;
  // }
  // /**
  //  * article.user
  //  * @return {UserDae} article.user を返します
  //  */
  // get user() {
  //   return this._user;
  // }
}
