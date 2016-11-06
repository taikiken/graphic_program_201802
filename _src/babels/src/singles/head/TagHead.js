/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 18:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// singles/head
import { SnsFb } from './SnsFb';
import { SnsTw } from './SnsTw';
import { TagMeta } from './TagMeta';
import { TagLink } from './TagLink';
import { TagTitle } from './TagTitle';

/**
 * head tag 内, meta / title 書換えを管理します
 *
 * ```
 * TagHead
 *    TagTitle
 *    SnsFb
 *    SnsTw
 *    TagLink
 *    TagMeta
 * ```
 *
 * ```
 * <!-- sns ogp -->
 * <meta property="fb:app_id" content="<?php echo $page['app_id']; ?>">
 * <meta property="og:site_name" content="<?php echo $page['site_name']; ?>">
 * <meta property="og:type" content="<?php echo $page['og_type']; ?>">
 * <meta property="og:title" content="<?php echo $page['og_title']; ?>">
 * <meta property="og:image" content="<?php echo $page['og_image']; ?>">
 * <meta property="og:url" content="<?php echo $page['og_url']; ?>">
 * <meta property="og:description" content="<?php echo $page['og_description']; ?>">
 * <meta property="og:locale" content="ja_JP" />
 *
 * <!-- twitter card -->
 * <meta name="twitter:card" content="summary">
 * <meta name="twitter:site" content="@<?php echo $page['sns']['twitter']; ?>">
 * <meta name="twitter:title" content="<?php echo $page['og_title']; ?>">
 * <meta name="twitter:image" content="<?php echo $page['og_image']; ?>">
 * <meta name="twitter:url" content="<?php echo $page['og_url']; ?>">
 * <meta name="twitter:description" content="<?php echo $page['og_description']; ?>">
 * ```
 * @since 2016-10-27
 */
export class TagHead {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * head tag 内, meta / title 書換えを管理します
   * @param {Element} head head tag
   */
  constructor(head) {
    const title = new TagTitle(head);
    const og = new SnsFb(head);
    const twitter = new SnsTw(head);
    const canonical = new TagLink(head, 'link[rel="canonical"]');
    const description = new TagMeta(head, 'meta[name="description"]');
    const host = `${location.protocol}://${location.host}`;
    /**
     * title タグを管理します
     * @return {TagTitle} TagTitle instance
     */
    this.title = () => title;
    /**
     * meta og(Facebook) 関連を管理します
     * @return {SnsFb} SnsFb instance
     */
    this.og = () => og;
    /**
     * meta twitter(Twitter) 関連を管理します
     * @return {SnsTw} SnsTw instance
     */
    this.twitter = () => twitter;
    /**
     * link.canonical を管理します
     * @return {TagLink} TagLink instance
     */
    this.canonical = () => canonical;
    /**
     * meta.description
     * @return {TagMeta} TagMeta instance
     */
    this.description = () => description;
    /**
     * `http|https` 含む host を取得します
     * @return {string} `http|https` 含む host を返します
     */
    this.host = () => host;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * head 内項目を書換えます
   * @param {Page} page ページ情報
   */
  replace(page) {
    const description = page.description();
    const url = page.url();
    // title
    const title = this.title().set(page.title(), page.label());
    // description
    this.description().set(description);
    // canonical
    this.canonical().set(`${this.host()}${url}`);
    // Twitter
    this.twitter().replace(page, title);
    // Facebook
    this.og().replace(page, title);
  }
}
