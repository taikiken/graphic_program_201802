/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 20:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from '../../data/Safety';
import {PopularDae} from '../comments/PopularDae';

/**
 * お知らせ 記事情報
 */
export class NoticeArticleDae {
  /**
   * お知らせ 記事情報 JSON response.notifications.article
   * @param {Object} [article={}] お知らせ 記事情報
   */
  constructor(article = {}) {
    const altArticle = Safety.object(article);
    /**
     * response.notifications.article
     * @type {Object}
     * @protected
     */
    this._article = altArticle;
    /**
     * response.notifications.article.comment
     * @type {PopularDae}
     * @protected
     */
    this._comment = new PopularDae(altArticle.comment);
    /**
     * response.notifications.article.comments
     * @type {PopularDae}
     * @protected
     */
    this._comments = new PopularDae(altArticle.comments);
    /**
     * response.notifications.article.reply
     * @type {PopularDae}
     * @protected
     */
    this._reply = new PopularDae(altArticle.reply);
  }
  /**
   * response.notifications.article
   * @return {Object} お知らせ 記事情報 を返します
   */
  get article() {
    return this._article;
  }
  /**
   * article.title
   * @return {string} 記事タイトル を返します
   */
  get title() {
    return this.article.title;
  }
  /**
   * article.url
   * @return {string} 記事 url を返します
   */
  get url() {
    return this.article.url;
  }
  /**
   * article.comment
   * @return {PopularDae} article.comment を返します
   */
  get comment() {
    return this._comment;
  }
  /**
   * article.comment
   * @return {PopularDae} article.comment を返します
   */
  get comments() {
    return this._comments;
  }
  /**
   * article.reply
   * @return {PopularDae} article.reply を返します
   */
  get reply() {
    return this._reply;
  }
}
