/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 17:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { TagMeta } from './TagMeta';

/**
 * head > meta:og Facebook 関連 meta 情報管理します
 * @since 2016-10-27
 */
export class SnsFb {
  /**
   * head > meta:og
   * @param {Element} head head tag
   */
  constructor(head) {
    const appId = new TagMeta(head, 'meta[property="fb:app_id"]');
    const siteName = new TagMeta(head, 'meta[property="og:site_name"]');
    const type = new TagMeta(head, 'meta[property="og:type"]');
    const title = new TagMeta(head, 'meta[property="og:title"]');
    const image = new TagMeta(head, 'meta[property="og:image"]');
    const url = new TagMeta(head, 'meta[property="og:url"]');
    const description = new TagMeta(head, 'meta[property="og:description"]');
    const locale = new TagMeta(head, 'meta[property="og:locale"]');

    /**
     * meta[property="fb:app_id"]
     * @return {TagMeta} meta[property="fb:app_id"]
     */
    this.appId = () => appId;
    /**
     * meta[property="og:site_name"]
     * @return {TagMeta} meta[property="og:site_name"]
     */
    this.siteName = () => siteName;
    /**
     * meta[property="og:type"]
     * @return {TagMeta} meta[property="og:type"]
     */
    this.type = () => type;
    /**
     * meta[property="og:title"]
     * @return {TagMeta} meta[property="og:title"]
     */
    this.title = () => title;
    /**
     * meta[property="og:image"]
     * @return {TagMeta} meta[property="og:image"]
     */
    this.image = () => image;

    /**
     * meta[property="og:url"]
     * @return {TagMeta} meta[property="og:url"]
     */
    this.url = () => url;
    /**
     * meta[property="og:description"]
     * @return {TagMeta} meta[property="og:description"]
     */
    this.description = () => description;
    /**
     * meta[property="og:locale"]
     * @return {TagMeta} meta[property="og:locale"]
     */
    this.locale = () => locale;
  }
}
