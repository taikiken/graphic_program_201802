/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/22 - 20:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

export class Metas {
  constructor(head) {
    // -------------------------------
    // initialize
    // tag, meta 情報を取得します
    const title = head.getElementsByTagName('title')[0];
    const meta = {};
    meta.description = head.querySelector('meta[name="description"]');
    const ogp = {};
    ogp.title = head.querySelector('meta[property="og:title"]');
    ogp.type = head.querySelector('meta[property="og:type"]');
    ogp.image = head.querySelector('meta[property="og:image"]');
    ogp.url = head.querySelector('meta[property="og:url"]');
    ogp.description = head.querySelector('meta[property="og:description"]');
    const twitter = {};
    twitter.title = head.querySelector('meta[name="twitter:title"]');
    twitter.image = head.querySelector('meta[name="twitter:image"]');
    twitter.url = head.querySelector('meta[name="twitter:url"]');
    twitter.description = head.querySelector('meta[name="twitter:description"]');
    const link = {};
    link.canonical = head.querySelector('link[rel="canonical"]');
    /**
     * head > title
     * @type {Element}
     */
    this.title = title;
    /**
     * head > meta[name=XXX]
     * @type {{
     *  description: Element
     * }}
     */
    this.meta = meta;
    /**
     * head > meta[property=og:XXX]
     * @type {{
     *  title: Element,
     *  type: Element,
     *  image: Element,
     *  url: Element,
     *  description: Element
     * }}
     */
    this.ogp = ogp;
    /**
     * head > meta[name=twitter:XXX]
     * @type {{
     *  title: Element,
     *  image: Element,
     *  url: Element,
     *  description: description,
     * }}
     */
    this.twitter = twitter;
    /**
     * head > rel[name=XXX]
     * @type {{
     *  canonical: Element
     * }}
     */
    this.link = link;

    // 初期値を保存します
    const titleText = title.innerHTML;
    /**
     * title 内文字
     * @type {string}
     */
    this.titleOriginal = titleText;
    /**
     * title, page and site 分割文字
     * @type {string}
     */
    this.titleDivide = ' | ';

    const titles = titleText.split(this.titleDivide);
    /**
     * page title text
     * @type {string}
     */
    this.titlePage = titles[0];
    /**
     * site title text
     * @type {string}
     */
    this.titleSite = titles[1];
    /**
     * head 内置き換え対象タグの初期値
     * @type {{
     *  title: {
     *    page: string,
     *    site: string,
     *    all: string
     *  },
     *  meta: {
     *    description: string
     *  },
     *  ogp: {
     *    title: string,
     *    type: string,
     *    image: string,
     *    url: string,
     *    description: string
     *  },
     *  twitter: {
     *    title: string,
     *    image: string,
     *    url: string,
     *    description: string
     *  },
     *  link: {
     *    canonical: string
     *  }
     * }}
     */
    this.default = this.current();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * head 内置き換え対象タグの現在設定値
   * @return {{
   *  title: {
   *    page: string,
   *    site: string,
   *    all: string
   *  },
   *  meta: {
   *    description: string
   *  },
   *  ogp: {
   *    title: string,
   *    type: string,
   *    image: string,
   *    url: string,
   *    description: string
   *  },
   *  twitter: {
   *    title: string,
   *    image: string,
   *    url: string,
   *    description: string
   *  },
   *  link: {
   *    canonical: string
   *  }
   * }} head 内置き換え対象タグの現在設定値を返します
   */
  current() {
    const title = this.title;
    const meta = this.meta;
    const ogp = this.ogp;
    const twitter = this.twitter;
    const link = this.link;

    const titleText = title.innerHTML;
    const titles = titleText.split(this.titleDivide);
    return {
      title: {
        page: titles[0],
        site: titles[1],
        all: titleText,
      },
      meta: {
        description: meta.description.content,
      },
      ogp: {
        title: ogp.title.content,
        type: ogp.type.content,
        image: ogp.image.content,
        url: ogp.url.content,
        description: ogp.description.content,
      },
      twitter: {
        title: twitter.title.content,
        image: twitter.image.content,
        url: twitter.url.content,
        description: twitter.description.content,
      },
      link: {
        canonical: link.canonical.content,
      },
    };
  }
}
