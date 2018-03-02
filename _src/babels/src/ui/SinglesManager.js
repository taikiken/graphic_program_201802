/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/02
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

import { WidgetType } from '../app/const/WidgetType';

/**
 * singleton を保証するための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('SinglesManager symbol');
// /**
//  * behaviors を保持するための Symbol
//  * @type {Symbol}
//  */
// const behaviorsSymbol = Symbol();
// /**
//  * done を保持するための Symbol
//  * @type {Symbol}
//  */
// const doneSymbol = Symbol();
// /**
//  * single を保持するための Symbol
//  * @type {Symbol}
//  */
// const singleSymbol = Symbol();
/**
 * popularNext を保持するための Symbol
 * @type {Symbol}
 */
const popularSymbol = Symbol();
// /**
//  * request を保持するための Symbol
//  * @type {Symbol}
//  */
// const requestSymbol = Symbol();
/**
 * SinglesManager instance を singleton を保証し保持します
 * @static
 * @type {?SinglesManager}
 * @private
 */
let singletonInstance = null;

/**
 * 記事詳細・次の記事一覧の間に挟む<br>
 * オススメ記事・関連記事・人気記事の表示管理を行います
 * @since 2016-10-01
 */
export default class SinglesManager {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * singleton instance を生成します
   * @param {SingleDae} [single=null] JSON single data
   * @return {SinglesManager} SinglesManager instance を返します
   */
  static factory(single):SinglesManager {
    if (singletonInstance === null) {
      singletonInstance = new SinglesManager(singletonSymbol, single);
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * singleton
   * @param {Symbol} target singleton を保証するための内部 Symbol
   * @param {?SingleDae} [single=null] 記事詳細 JSON data
   * @return {SinglesManager} 唯一の instance を返します
   */
  constructor(target, single = null) {
    if (singletonSymbol !== target) {
      throw new Error( 'SinglesManager is singleton Class. not use new SinglesManager(). instead SinglesManager.factory()' );
    }
    if (singletonInstance !== null) {
      return singletonInstance;
    }
    // ------------------
    // let singleDae = null;
    // if (single !== null) {
    //   singleDae = single;
    // }
    // this[singleSymbol] = singleDae;
    /**
     * 記事詳細 JSON data
     * @type {SingleDae}
     */
    this.single = single;

    // this[behaviorsSymbol] = [
    /**
     * オススメ記事・関連記事・人気記事を WidgetType constant で保持します
     * @type {Array.<string>}
     */
    this.behaviors = [
      WidgetType.RECOMMEND,
      WidgetType.RELATED,
      WidgetType.POPULAR
    ];

    const done = {};
    done[WidgetType.RECOMMEND] = false;
    done[WidgetType.RELATED] = false;
    done[WidgetType.POPULAR] = false;
    // this[doneSymbol] = done;
    /**
     * オススメ記事・関連記事・人気記事 の出力が終わったかをマークする Object - key: boolean
     * - {@link WidgetType}.RECOMMEND
     * - {@link WidgetType}.RELATED
     * - {@link WidgetType}.POPULAR
     * @type {*}
     */
    this.done = done;

    // this[requestSymbol] = {
    /**
     * 人気記事の `request` Object を保持します
     * - offset: 0
     * - length: 6
     * @type {{offset: number, length: number}}
     */
    this.request = {
      offset: 0,
      length: 6
    };

    this[popularSymbol] = true;

    /**
     * オススメ記事・関連記事・人気記事 を払い出すとカウントアップします<br>
     * 3 未満だと全て出力していないと判断可能です
     * @type {number}
     */
    this.count = 0;

    singletonInstance = this;
    return singletonInstance;
  }
  // behavior() {
  //
  // }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * 記事詳細 JSON data
  //  * @return {SingleDae} 記事詳細 JSON data を返します
  //  */
  // get single() {
  //   return this[singleSymbol];
  // }
  // /**
  //  * 記事詳細 JSON data を設定します
  //  * @param {SingleDae} single 記事詳細 JSON data
  //  */
  // set single(single) {
  //   this[singleSymbol] = single;
  // }
  // /**
  //  * オススメ記事・関連記事・人気記事を WidgetType constant で保持します
  //  * @return {Array<string>} オススメ記事・関連記事・人気記事 type 配列を返します
  //  */
  // get behaviors():Array {
  //   return this[behaviorsSymbol];
  // }

  // /**
  //  * オススメ記事・関連記事・人気記事 の出力が終わったかをマークする Object
  //  * @return {Object} オススメ記事・関連記事・人気記事 の出力が終わったかをマークする Object を返します
  //  */
  // get done():Object {
  //   return this[doneSymbol];
  // }

  /**
   * 人気記事の次の記事が存在するかの真偽値
   * @return {boolean} 人気記事の次の記事が存在するかの真偽値を返します
   */
  get popularNext() {
    return this[popularSymbol];
  }
  /**
   * 人気記事の次の記事が存在するかの真偽値を設定します<br>
   * true の時に `behaviors` 配列が空の時に「人気記事」 `WidgetType.POPULAR` を追加し<br>
   * 記事一覧に「人気記事」を差し込みできるようにします
   * @param {boolean} hasNext 人気記事の次の記事が存在するかの真偽値
   */
  set popularNext(hasNext) {
    this[popularSymbol] = hasNext;
    if (hasNext) {
      const behaviors = this.behaviors;
      if (behaviors.length === 0) {
        behaviors.push(WidgetType.POPULAR);
      }
    }
  }
  // /**
  //  * 人気記事の `request` Object を保持します
  //  * @return {{offset: number, length: number}} 人気記事の `request` Object を返します
  //  */
  // get request():Object {
  //   return this[requestSymbol];
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 次の差し込み記事タイプを返します<br>
   * オススメ記事・関連記事 は 1回だけ差し込みます<br>
   * 人気記事は表示できなくなるまで差し込みます
   * @return {?string} オススメ記事・関連記事・人気記事 `WidgetType` type を返します
   */
  next() {
    // @type {Array<string>}
    const behaviors = this.behaviors;
    // @type {string} - behaviors 配列からデータを取り出します
    let behavior = behaviors.shift();
    ++this.count;

    if (behavior === WidgetType.RECOMMEND) {
      // オススメ記事
      const single = this.single;
      // SingleDae.recommendArticles 配列をチェックします
      if (!single || single.recommendArticles.length === 0) {
        // 配列.length === 0 はデータがないので次の処理を取り出します
        behavior = behaviors.shift();
        ++this.count;
      }
    } else if (behavior === WidgetType.POPULAR) {
      // 人気記事
      // next が false の時は処理を行わない
      if (!this.popularNext) {
        // null set
        behaviors.shift();
        behavior = null;
      }
    } else if (behavior !== WidgetType.RELATED && this.popularNext) {
      // 関連記事でなく popularNext が true の時は強制的に WidgetType.POPULAR を設定します
      behavior = WidgetType.POPULAR;
    }

    return behavior;
  }
  /**
   * 人気記事の `request` の offset を更新します
   */
  up() {
    const request = this.request;
    request.offset += request.length;
    // console.log('SinglesManager.up', this.request);
  }
  /**
   * オススメ記事の存在チェックをします
   * @return {boolean} オススメ記事が存在する時は true を返します
   */
  hasRecommend() {
    const single = this.single;
    return !!single && single.recommendArticles.length > 0;
  }
}