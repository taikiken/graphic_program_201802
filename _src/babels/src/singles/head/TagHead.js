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
 * @since 2016-10-27
 */
export class TagHead {
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
  }
}
