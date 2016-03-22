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


import {Safety} from '../data/Safety';
import {Format} from '../util/Format';
import {CategoryDae} from './CategoryDae';
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

    this._article = article;
    // article.category
    this._category = new CategoryDae( article.category );
    // 2016-02-29 category2 追加になった
    // https://github.com/undotsushin/undotsushin/issues/140#issuecomment-186715283
    this._category2 = new CategoryDae( article.category2 );

    // category, category2 を配列へ
    // そのうち使うはず
    this._categories = new CategoriesDae( article );

    // article.media
    this._media = new MediaDae( article.media );
    // article.user
    this._user = new UserDae( article.user );
    // article.comments_popular
    this._popular = new CommentsPopularDae( article.comments_popular );

    // Safety.check, object に key が存在しタイプがあっているかを調べます
    // 0 になるのでコメントにします
    // ToDo: 問題がないことを確認したらコメントブロックを削除する
    // comments_count check
    /*
    if ( !Safety.check( article, 'comments_count', 'Number' ) ) {

      article.comments_count = 0;

    }
    */
    let commentsCount = parseInt( article.comments_count, 10 );
    commentsCount = Safety.integer( commentsCount, 10 );

    this._commentsCount = commentsCount;

    // date check
    if ( Safety.check( article, 'date' ) ) {

      this._formatDate = Format.date( article.date );

    }

    this._index = -1;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * index Number
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
   * @return {Object|*} article 記事単1データ
   */
  get article():Object {
    return this._article;
  }
  /**
   * category 情報
   * @return {CategoryDae|*} article.category
   */
  get category():CategoryDae {
    return this._category;
  }
  /**
   * category2 情報
   * いつの間にか追加になった
   * @return {CategoryDae|*} article.category2
   */
  get category2():CategoryDae {
    return this._category2;
  }

  /**
   * category, category2 をまとめるらしい <- 聞いてない
   * response.categories を CategoriesDae へ
   * @return {CategoriesDae|*} response.categories を CategoriesDaeにし返します
   */
  get categories():CategoriesDae {
    return this._categories;
  }
  /**
   * alias commentsTotal
   * @return {Number} article.comments_count
   */
  get commentsCount():Number {
    return this.commentsTotal;
  }

  /**
   * コメント総数を調べます
   * @return {Number|*} コメント総数を返します, article.comments_count
   */
  get commentsTotal():Number {
    return this._commentsCount;
  }
  /**
   * article.comments_popular
   * @return {CommentsPopularDae|*} article.comments_popular
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
   * article.date をフォーマット
   * 多分使わない, 代わりに displayDate を使う
   * @return {string} article.date を日本語日付に変換し返します
   */
  get formatDate():string {
    return this._formatDate;
  }
  /**
   * 画面表示日付
   * @return {string} article.display_date
   */
  get displayDate():string {
    return this.article.display_date;
  }
  /**
   * article.description
   * @return {string} article.description
   */
  get description():string {
    return this.article.description;
  }
  /**
   * article.id
   * @return {string} article.id
   */
  get id():string {
    return this.article.id;
  }
  /**
   * article.is_bookmarked
   * bookmark した / してない
   * @return {boolean} article.is_bookmarked
   */
  get isBookmarked():boolean {
    return this.article.is_bookmarked;
  }
  /**
   * パーソナライズされたニュースは is_recommend(キー名は仮） をたてて「おすすめ」アイコンを表示する
   * @return {boolean} パーソナライズされたニュース の真偽値を返します
   */
  get isRecommend():boolean {
    return this.article.is_recommend;
  }
  /**
   * article.media
   * @return {MediaDae} article.media
   */
  get media():MediaDae {
    return this._media;
  }
  /**
   * article.media_type
   * video or image のはず
   * @return {string} article.media_type
   */
  get mediaType():string {
    return this.article.media_type;
  }
  /**
   * article.title
   * @return {string} article.title
   */
  get title():string {
    return this.article.title;
  }
  /**
   * article.url
   * @return {string} article.url
   */
  get url():string {
    return this.article.url;
  }
  /**
   * article.user
   * @return {UserDae} article.user
   */
  get user():UserDae {
    return this._user;
  }
}
