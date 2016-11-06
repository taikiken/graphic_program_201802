/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 17:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { TagMeta } from './TagMeta';

/**
 * head > meta:twitter Twitter 関連 meta 情報管理します
 * @since 2016-10-27
 */
export class SnsTw {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * head > meta:twitter
   * @param {Element} head head tag
   */
  constructor(head) {
    const site = new TagMeta(head, 'meta[name="twitter:site"]');
    const title = new TagMeta(head, 'meta[name="twitter:title"]');
    const image = new TagMeta(head, 'meta[name="twitter:image"]');
    const url = new TagMeta(head, 'meta[name="twitter:url"]');
    const description = new TagMeta(head, 'meta[name="twitter:description"]');
    /**
     * name="twitter:site"
     * @return {string} name="twitter:site"
     */
    this.site = () => site;
    /**
     * name="twitter:title"
     * @return {string} name="twitter:title"
     */
    this.title = () => title;
    /**
     * name="twitter:image"
     * @return {string} name="twitter:image"
     */
    this.image = () => image;
    /**
     * name="twitter:url"
     * @return {string} name="twitter:url"
     */
    this.url = () => url;
    /**
     * name="twitter:description"
     * @return {string} name="twitter:description"
     */
    this.description = () => description;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * head 内(Twitter)項目を書換えます
   * @param {Page} page ページ情報
   * @param {string} title ページ title
   */
  replace(page, title) {
    this.title().set(title);
    this.image().set(page.ogImg());
    this.url().set(page.url());
    this.description().set(page.description());
  }
}
