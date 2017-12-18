/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/24 - 18:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../View';

// app
import {Message} from '../../app/const/Message';
import {User} from '../../app/User';
// import {Empty} from '../../app/const/Empty';
// import {MediaType} from '../../app/const/MediaType';

// action
import {Pickup} from '../../action/home/Pickup';
import {PickupAuth} from '../../action/home/PickupAuth';

// data
// import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// carousel
import ComponentCarousel from '../../component/carousel/ComponentCarousel';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// // node
// import {CategoryLabelNode} from '../../node/category/CategoryLabelNode';

// // Ga
// import {Ga} from '../../ga/Ga';
// import {GaData} from '../../ga/GaData';

// tick
import { Polling } from '../../tick/Polling';

// global object
// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

// Gasane
// let Polling = self.Gasane.Polling;

/**
 * home > pickup（スライダー）を表示します。
 *
 * 1. JSON取得(Ajax)
 * 1. Dom作成 by React
 */
export default class ViewPickup extends View {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * action/Pickup を使い Ajax request 後 element へ dom を作成します
   * @link ViewHeadline
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, option = {}) {
    option = Safety.object(option);
    super(element, option);
    const ActionClass = User.sign ? PickupAuth : Pickup;
    /**
     * Action instance を設定します
     * @override
     * @type {PickupAuth|Pickup}
     */
    this.action = new ActionClass(this.done.bind(this), this.fail.bind(this));
    /**
     * 最後のナンバー
     * @type {number}
     * @private
     */
    this._last = 0;
    const waiting = 1000 * 5;
    /**
     * interval 間隔
     * @type {number}
     * @private
     * @default 5000
     */
    this._waiting = waiting;
    /**
     * bind executeSafely
     * @type {function}
     */
    this.boundSafely = this.executeSafely.bind(this);
    /**
     * Polling instance
     * @type {Polling}
     */
    this.polling = new Polling(waiting);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * interval 間隔, milliseconds, default 5000ms
   * @property {Number} waiting interval milliseconds
   * @default 5000
   * @return {number} slideshow interval milliseconds を返します
   */
  get waiting() {
    return this._waiting;
  }
  /**
   * slideshow interval milliseconds を設定します
   * @param {number} milliseconds slideshow interval milliseconds
   */
  set waiting(milliseconds) {
    this._waiting = milliseconds;
    this.polling.changePolling(milliseconds);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.start();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const articles = result.articles;

    if ( typeof articles === 'undefined' ) {
      // articles undefined
      // JSON に問題がある
      let error = new Error(Message.undef('[PICKUP:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else if (articles.length === 0) {
      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error(Message.empty('[PICKUP:EMPTY]'));
      this.executeSafely(View.EMPTY_ERROR, error);
      // this.showError( error.message );
    } else {
      this.render( articles );
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    console.warn('ViewPickup.fail', error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
  }
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError( message:string = '' ):void {
  //
  //   message = Safety.string( message, '' );
  //
  //   // Error 時の表示が決まったら変更する
  //   let error = new ViewError( this.element, this.option, message );
  //   error.render();
  //
  // }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles) {
    const list = articles.map((article) => new ArticleDae(article));

    ReactDOM.render(
      <ComponentCarousel
        list={list}
        callback={this.boundSafely}
        polling={this.polling}
        index={0}
        home={this.home}
      />,
      this.element,
    );
  }// render
}// class
