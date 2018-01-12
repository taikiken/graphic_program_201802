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
/**
 * [native code] - History
 * @type {History}
 */
const history = self.history;

/**
 * `push` 関数を private 扱いにするための inner symbol
 * @type {Symbol}
 * @private
 */
const pushSymbol = Symbol('private method push');

/**
 * {@link SinglesHistory} singleton instance のためのチェック用 Symbol
 * @type {Symbol}
 * @private
 */
const singlesHistorySymbol = Symbol('SinglesHistory singleton instance');
/**
 * {@link SinglesHistory} instance
 * @type {?SinglesHistory}
 * @private
 * @static
 */
let singletonInstance = null;

/**
 * singleton: 記事詳細・次の記事一覧 History API 使用を管理します
 *
 * NextPages {@link NextPages} instance を保持します<br>
 * Page {@link Page} instance を NextPages instance へ追加し<br>
 * Snap {@link Snap} SNAPPED / BEAT_UP したら `hit` 関数をコールします
 *
 * @example
 * const manager = SinglesHistory.factory();
 * const page = new Page(singleDae);
 * const snap = new Snap(element);
 * const onSnap = () => {
 *  manager.hit(page);
 * };
 * snap.on(Snap.SNAPPED, onSnap);
 * snap.on(Snap.BEAT_UP, onSnap);
 * @since 2017-06-01 location query 残す
 */
export class SinglesHistory extends EventDispatcher {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {SinglesHistory} SinglesHistory instance を返します
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new SinglesHistory( singlesHistorySymbol );
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 記事詳細・次の記事一覧 History API 使用を管理します
   * @param {Symbol} target singleton を実現するための private symbol
   * @return {SinglesHistory} singleton SinglesHistory instance を返します
   */
  constructor(target) {
    if (singlesHistorySymbol !== target) {
      throw new Error( 'SinglesHistory is static Class. not use new SinglesHistory().' );
    }
    if (singletonInstance !== null) {
      return singletonInstance;
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

    // const pages = NextPages.factory();
    /**
     * 記事一覧を管理します - NextPages instance
     * @type {NextPages}
     */
    this.pages = NextPages.factory();

    let base = '';
    /**
     * 基点 url を返します
     * @return {string} 基点 url
     */
    this.base = () => base;
    /**
     * url query が消える問題に対応する
     * @see https://github.com/undotsushin/undotsushin/issues/1982#issuecomment-305401475
     * @since 2017-06-01
     */
    this.extra = '';
    /**
     * url hash が消える問題に対応する
     * @type {string}
     * @since 2017-06-01
     */
    this.hash = '';
    /**
     * 基点 url を設定します
     * @param {string} baseUrl 基点 url
     */
    this.setBase = (baseUrl) => {
      base = baseUrl;
      const query = location.href.split(baseUrl).pop();
      const extra = query && query.substr(0, 1) === '?' ? query : '';
      // console.log('extra', extra, href, baseUrl);
      // this.hasQuery = !!extra;
      this.extra = !!extra ? extra : '';
      this.hash = location.hash;
    };
    // popstate 監視
    // window.addEventListener('popstate', this.onPop.bind(this), false);

    singletonInstance = this;
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // /**
  //  * popstate event handler
  //  * @param {Event} event popstate event
  //  */
  // onPop(event) {
  //   // const page = this.pages().pop();
  //   // // default は常に確保する
  //   // if (page.url() === this.base()) {
  //   //   this.pages().add(page);
  //   // }
  //   console.log('================== onPop event ===================', event);
  // }
  /**
   * head > meta などを書換えます
   * @param {Page} page 書換え対象のページ情報
   */
  replace(page) {
    // console.log('replace ******', page.info());
    const url = page.url();
    // 書換えURLが初期(base)URLなら `hash` を復元する
    // @since 2017-06-01
    const hash = url === this.base() ? this.hash : '';
    history.replaceState(page.info(), page.title(), `${url}${hash}${this.extra}`);
    this.head().replace(page);
  }

  /**
   * ページ情報をもとに history をupdate(replace)します
   * @param {Symbol} symbol private 扱いにするための inner Symbol
   * @param {Page} page 書換えたいページ情報
   */
  push(symbol, page) {
    if (symbol !== pushSymbol) {
      console.warn('push is inner method. instead use hit');
      return;
    }
    // console.log('------------------- pushState', page.url());
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
    const page = this.pages.get(url);
    this.replace(page);
  }
  /**
   * content がページ内で表示位置に来たら呼び出されます
   * @param {Page} page ヒットしたコンテナ・ページ情報
   */
  hit(page) {
    // @type {Object}
    const url = page.url();
    // ---
    // 複数回処理しないように現在パスと比較する
    // console.log('hit', url, this.current(), location.pathname);
    if (url === location.pathname) {
      return;
    }
    const pages = this.pages.pages();
    // this.setCurrent(url);
    // ---
    // 存在チェック
    if (Object.keys(pages).indexOf(page.url()) !== -1) {
      // url が存在する
      this.pop(url);
    } else {
      // 存在しない
      this.pages.add(page);
      if (this.base() !== url) {
        // 初期アクセス URL と異なっていたら pushstate します
        this.push(pushSymbol, page);
      }
    }
  }
}

