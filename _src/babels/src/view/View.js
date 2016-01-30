/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// import {Action} from '../action/Action';
// import {ViewError} from './error/ViewError';

import {EventDispatcher} from '../event/EventDispatcher';
import {Safety} from '../data/Safety';

/**
 * 表示を行います
 */
export class View extends EventDispatcher {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {

    option = Safety.object( option );

    super();
    this._element = element;
    this._option = option;
    this._action = null;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} render root element を返します
   */
  get element():Element {
    return this._element;
  }
  /**
   *
   * @return {Object|*} callback handler がセットされたObjectを返します
   */
  get option():Object {
    return this._option;
  }
  /**
   *
   * @return {*} Action instance を返します
   */
  get action() {
    return this._action;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * option Object に kyeName が存在し型が function かを調べ関数を実行する
   * @param {string} keyName 存在チェックを行う関数キー名
   * @param {*} [args=] 実行関数への引数
   */
  executeSafely( keyName, ...args ):void {

    let option = this.option;
    if ( option.hasOwnProperty( keyName ) && typeof option[ keyName] === 'function' ) {

      // callback 側で通常の引数として取り出せるように apply します
      option[ keyName ].apply( this, args );

    }

    this.dispatch( { type: keyName, args: args } );

  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * event BEFORE_RENDER
   * @return {string} beforeRender を返します
   */
  static get BEFORE_RENDER():string {
    return 'beforeRender';
  }
  /**
   * event WILL_MOUNT
   * @return {string} beforeRender を返します
   */
  static get WILL_MOUNT():string {
    return 'willMount';
  }
  /**
   * event DID_MOUNT
   * @return {string} beforeRender を返します
   */
  static get DID_MOUNT():string {
    return 'didMount';
  }
  /**
   * event ERROR_MOUNT
   * @return {string} beforeRender を返します
   */
  static get ERROR_MOUNT():string {
    return 'errorMount';
  }
  /**
   * event UNDEFINED_ERROR
   * @return {string} beforeRender を返します
   */
  static get UNDEFINED_ERROR():string {
    return 'undefinedError';
  }
  /**
   * event EMPTY_ERROR
   * @return {string} beforeRender を返します
   */
  static get EMPTY_ERROR():string {
    return 'emptyError';
  }
  /**
   * event RESPONSE_ERROR
   * @return {string} beforeRender を返します
   */
  static get RESPONSE_ERROR():string {
    return 'responseError';
  }
}
