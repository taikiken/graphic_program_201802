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
'use strict';

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

    /*
    if ( !Safety.isElement( element ) ) {
      console.warn( `un accessible element. ${element}` );
    }
    */
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
   * render root element を設定します
   * @param {Element} element render root element
   */
  set element( element:Element ):void {
    this._element = element;
  }
  /**
   *
   * @return {Object|*} callback handler がセットされたObjectを返します
   */
  get option():Object {
    return this._option;
  }

  /**
   * callback handler をセットします
   * @param {Object} option callback handler がセットされた Object
   */
  set option( option:Object ):void {
    this._option = option;
  }
  /**
   *
   * @return {*} Action instance を返します
   */
  get action() {
    return this._action;
  }
  /**
   * Action instance を設定します
   * @param {*} action Action instance
   */
  set action( action ):void {
    this._action = action;
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
   * @return {string} viewBeforeRender を返します
   */
  static get BEFORE_RENDER():string {
    return 'viewBeforeRender';
  }
  /**
   * event WILL_MOUNT
   * @return {string} viewWillMount を返します
   */
  static get WILL_MOUNT():string {
    return 'viewWillMount';
  }
  /**
   * event DID_MOUNT
   * @return {string} viewDidMount を返します
   */
  static get DID_MOUNT():string {
    return 'viewDidMount';
  }
  /**
   * event ERROR_MOUNT
   * @return {string} viewErrorMount を返します
   */
  static get ERROR_MOUNT():string {
    return 'viewErrorMount';
  }
  /**
   * event UNDEFINED_ERROR
   * @return {string} viewUndefinedError を返します
   */
  static get UNDEFINED_ERROR():string {
    return 'viewUndefinedError';
  }
  /**
   * event EMPTY_ERROR
   * @return {string} viewEmptyError を返します
   */
  static get EMPTY_ERROR():string {
    return 'viewEmptyError';
  }
  /**
   * event RESPONSE_ERROR
   * @return {string} viewResponseError を返します
   */
  static get RESPONSE_ERROR():string {
    return 'viewResponseError';
  }
}
