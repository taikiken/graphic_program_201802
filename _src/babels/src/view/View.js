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
    /**
     * react JSX を挿入する root element
     * @type {Element}
     * @protected
     */
    this._element = element;
    /**
     * event 名称をキーにしセットした event handler(callback) Object
     * @type {Object}
     * @protected
     */
    this._option = option;
    /**
     * Action Class instance
     * @type {null|*}
     * @protected
     */
    this._action = null;
    /**
     * 表示されているページが home(index) かを識別する flag
     * @since 2016-09-16
     * @type {boolean}
     * @protected
     * @default false
     */
    this._home = false;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * root element
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
   * callback handler がセットされたObject
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
   * Action instance
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
  /**
   * home flag
   * @since 2016-09-16
   * @return {boolean|*} home flag boolean を返します
   */
  get home():Boolean {
    return this._home;
  }
  /**
   * home flag
   * @since 2016-09-16
   * @param {Boolean} home flag
   */
  set home( home:Boolean ):void {
    this._home = home;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * option Object に kyeName が存在し型が function かを調べ関数を実行します
   * @param {string} keyName 存在チェックを行う関数キー名
   * @param {*} [args=] 実行関数へ渡す引数, 不特定多数
   */
  executeSafely( keyName, ...args ):void {
    let option = this.option;
    // console.log( 'executeSafely', keyName, this, args, option, option.hasOwnProperty( keyName ), typeof option[ keyName] );
    if ( option.hasOwnProperty( keyName ) && typeof option[ keyName] === 'function' ) {

      // callback 側で通常の引数として取り出せるように apply します
      option[ keyName ].apply( this, args );

    }
    // console.log( 'executeSafely after if' );
    // listen しているかもしれないので event を発火させる
    this.dispatch( { type: keyName, args: args } );
    // console.log( 'executeSafely after dispatch' );

  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * event BEFORE_RENDER<br>
   * ReactDOM.render 前
   * @return {string} viewBeforeRender を返します
   */
  static get BEFORE_RENDER():string {
    return 'viewBeforeRender';
  }
  /**
   * event WILL_MOUNT<br>
   * ReactClass.componentWillMount 後
   * @return {string} viewWillMount を返します
   */
  static get WILL_MOUNT():string {
    return 'viewWillMount';
  }
  /**
   * event DID_MOUNT<br>
   * ReactClass.componentDidMount 後
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
   * event UNDEFINED_ERROR<br>
   * Ajax は成功したが設定されるべき key 値が undefined or null の時
   * @return {string} viewUndefinedError を返します
   */
  static get UNDEFINED_ERROR():string {
    return 'viewUndefinedError';
  }
  /**
   * event EMPTY_ERROR<br>
   * Ajax は成功したが配列であるべき結果が length 0 の時
   * @return {string} viewEmptyError を返します
   */
  static get EMPTY_ERROR():string {
    return 'viewEmptyError';
  }
  /**
   * event RESPONSE_ERROR<br>
   * Ajax 失敗
   * @return {string} viewResponseError を返します
   */
  static get RESPONSE_ERROR():string {
    return 'viewResponseError';
  }
}
