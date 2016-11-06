/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/22 - 14:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { EventDispatcher } from '../event/EventDispatcher';

// singles/head
import { TagHead } from './head/TagHead';
import { NextPages } from './head/NextPages';

// History API
const history = self.history;

/**
 * `push` 関数を private 扱いにするための inner symbol
 * @type {Symbol}
 * @private
 */
const pushSymbol = Symbol('private method push');

/**
 * singleton instance のためのチェック用 Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('SinglesHistory singleton instance');
/**
 * SinglesHistory instance
 * @type {?SinglesHistory}
 * @private
 * @static
 */
let _instance = null;

/**
 * singleton: 記事詳細・次の記事一覧 History API 使用を管理します
 */
export class SinglesHistory extends EventDispatcher {
  /**
   * 記事詳細・次の記事一覧 History API 使用を管理します
   * @param {Symbol} target singleton を実現するための private symbol
   * @return {SinglesHistory} singleton SinglesHistory instance を返します
   */
  constructor(target) {
    if (_symbol !== target) {
      throw new Error( 'SinglesHistory is static Class. not use new SinglesHistory().' );
    }
    if (_instance !== null) {
      return _instance;
    }
    super();
    // head 情報
    const head = document.getElementsByTagName('head')[0];
    const tagHead = new TagHead(head);
    /**
     * head tag 情報を取得します
     * @return {TagHead} head tag 情報を返します
     */
    this.head = () => tagHead;
    const twitterSite = tagHead.twitter().site();
    /**
     * twitter:site content を取得します
     * @return {string} twitter:site content を返します
     */
    this.twitterSite = () => twitterSite;

    const pages = NextPages.factory();
    /**
     * 記事一覧を管理します
     * @return {NextPages} NextPages instance
     */
    this.pages = () => pages;

    let current = '';
    let base = '';
    /**
     * 基点 url を返します
     * @return {string} 基点 url
     */
    this.base = () => base;
    /**
     * 基点 url を設定します
     * @param {string} baseUrl 基点 url
     */
    this.setBase = (baseUrl) => {
      current = baseUrl;
      base = baseUrl;
    };
    this.current = () => current;
    this.setCurrent = (path) => {
      current = path;
    };
    // popstate 監視
    window.addEventListener('popstate', this.onPop.bind(this), false);

    _instance = this;
    return _instance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * popstate event handler
   * @param {Event} event popstate event
   */
  onPop(event) {
    // const page = this.pages().pop();
    // // default は常に確保する
    // if (page.url() === this.base()) {
    //   this.pages().add(page);
    // }
    console.log('================== onPop event ===================', event);
  }
  /**
   * head > meta などを書換えます
   * @param {Page} page 書換え対象のページ情報
   */
  replace(page) {
    console.log('replace ******', page.info());
    history.replaceState(page.info(), page.title(), page.url());
    this.head().replace(page);
  }

  /**
   * ページ情報をもとに history をupdate(replace)します
   * @param {Symbol} symbol private 扱いにするための innner Symbol
   * @param {Page} page 書換えたいページ情報
   */
  push(symbol, page) {
    if (symbol !== pushSymbol) {
      console.warn('push is inner method. instead use hit');
      return;
    }
    console.log('------------------- pushState', page.url());
    // history.pushState(page.info(), page.title(), page.url());
    // wired.jp も replaceState だったよ
    this.replace(page);
  }
  /**
   * ページ情報を戻す
   * @param {string} url キーになるページ url
   */
  pop(url) {
    // this.pages().pop();
    // history.back();
    const page = this.pages().get(url);
    this.replace(page);
  }
  /**
   * content がページ内で表示位置に来たら呼び出されます
   * @param {Page} page ヒットしたコンテナ・ページ情報
   */
  hit(page) {
    // @type {Object}
    const pages = this.pages().pages();
    const url = page.url();
    // ---
    // 複数回処理しないように現在パスと比較する
    console.log('hit', url, this.current());
    if (url === this.current()) {
      return;
    }
    this.setCurrent(url);
    // ---
    // 存在チェック
    if (Object.keys(pages).indexOf(page.url()) !== -1) {
      // url が存在する
      this.pop(url);
    } else {
      // 存在しない
      this.pages().add(page);
      if (this.base() !== url) {
        // 初期アクセス URL と異なっていたら pushstate します
        this.push(pushSymbol, page);
      }
    }
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {SinglesHistory} SinglesHistory instance を返します
   */
  static factory():SinglesHistory {
    if (_instance === null) {
      _instance = new SinglesHistory( _symbol );
    }
    return _instance;
  }
}

