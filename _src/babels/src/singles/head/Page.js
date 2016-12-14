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

// // app
// import { Env } from '../../app/Env';

/**
 * 記事詳細・次の記事一覧・各記事の meta 情報など書換え対象データを管理します
 * @since 2016-10-27
 */
export class Page {
  /**
   * 記事詳細・次の記事一覧・各記事の meta 情報など書換え対象データを管理します
   * @param {SingleDae} singleDae 記事データ
   */
  constructor(singleDae) {
    const host = `${location.protocol}://${location.host}`;
    /**
     * `http|https` 含む host を取得します
     * @return {string} `http|https` 含む host を返します
     */
    this.host = () => host;
    /**
     * 記事データ
     * @return {SingleDae} 記事データ
     */
    this.single = () => singleDae;
    /**
     * 記事タイトル
     * @return {string} 記事タイトル
     */
    this.title = () => singleDae.title;
    /**
     * 記事要約(description)
     * @return {string} 記事要約(description)
     */
    this.description = () => singleDae.description;
    /**
     * 記事 url<br>
     * History API 使用形式の `url`
     *
     * プロトコル・ホスト名無し
     * @return {string} 記事 url
     */
    this.url = () => {
      // if (Env.mode !== Env.PRODUCTION) {
      //   return singleDae.url.replace('https://dev.sportsbull.jp', '');
      // }
      // return singleDae.url;
      return `/p/${singleDae.id}/`;
      // return singleDae.url;
    };
    /**
     * canonical URL, Twitter / Facebook にも使用します
     * @return {string} canonical URL
     */
    this.canonical = () => `${this.host()}${this.url()}`;
    /**
     * title middle に配置する category label(Primary)
     * @return {string} 記事 category label(Primary)
     */
    this.label = () => singleDae.categories.label;
    /**
     * 記事画像, OGP:image
     * @return {string} 記事画像
     */
    this.ogImg = () => singleDae.media.images.original;
    /**
     * props, console 確認しやすい様に Object property にします
     * @type {{
     *  title: string,
     *  url: string,
     *  ogImg: string
     * }}
     */
    this.props = {
      title: singleDae.title,
      url: singleDae.url,
      ogImg: singleDae.media.images.original,
    };
    // console.log('Page', this.title(), this.url(), this.ogImg());
  }
  /**
   * pushstate 第一引数に利用する Object
   * @return {{title: string, url: string}} pushstate 第一引数に利用する Object
   */
  info() {
    return {
      title: this.title(),
      url: this.url(),
    };
  }
}
