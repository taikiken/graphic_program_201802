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

const history = self.history;

/**
 * singleton instance のためのチェック用 Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('SingleManager singleton instance');
/**
 * SingleManager instance
 * @type {?SingleManager}
 * @private
 * @static
 */
let _instance = null;

/**
 * singleton: 記事詳細・次の記事一覧 History API 使用を管理します
 */
export class SingleManager extends EventDispatcher {
  /**
   * 記事詳細・次の記事一覧 History API 使用を管理します
   * @param {Symbol} target singleton を実現するための private symbol
   * @return {SingleManager} singleton SingleManager instance を返します
   */
  constructor(target) {
    if (_symbol !== target) {
      throw new Error( 'SingleManager is static Class. not use new SingleManager().' );
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

    // let id = 0;
    // /**
    //  * page ID
    //  * @return {number} id page id
    //  */
    // this.id = () => id;
    // /**
    //  * page ID を設定します
    //  * @param {number} idNum page ID
    //  */
    // this.setId = (idNum) => {
    //   id = idNum;
    // };
    // popstate 監視
    window.addEventListener('popstate', this.onPop.bind(this), false);

    _instance = this;
    return _instance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // onPush(event) {
  //   console.log('onPush event', event, this);
  // }
  onPop(event) {
    console.log('onPop event', event, this);
  }
  push(page) {
    // this.pages().add(page);
    history.pushState(page, page.title(), page.canonical());
  }
  pop() {
    // this.pages().pop();
    history.back(-1);
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {SingleManager} SingleManager instance を返します
   */
  static factory():SingleManager {
    if (_instance === null) {
      _instance = new SingleManager( _symbol );
    }
    return _instance;
  }
}

