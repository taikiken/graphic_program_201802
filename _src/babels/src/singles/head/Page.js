/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/22 - 22:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 記事詳細・次の記事一覧・各記事の meta 情報など書換え対象データを管理します
 */
export class Page {
  /**
   * 記事詳細・次の記事一覧・各記事の meta 情報など書換え対象データを管理します
   * @param {SingleDae} singleDae 記事データ
   */
  constructor(singleDae) {
    this.single = () => singleDae;
    this.title = () => singleDae.title;
    this.description = () => singleDae.description;
    this.canonical = () => singleDae.canonical.url;
    // 'og_image'       => $post['media']['images']['original']
    this.ogImg = () => singleDae.media.images.original;
  }
}
