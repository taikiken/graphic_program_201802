/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 21:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * <h2>EventDispatcher</h2>
 */
export class EventDispatcher {
  /**
   * custom event を作成し管理します<br>
   * **extends** して使います。
   */
  constructor() {
    this._listeners = {};
  }

  /**
   * event type に リスナー関数を bind します
   * @param {string} type event type
   * @param {Function} listener callback関数
   */
  on( type:string, listener:Function ):void {

    if ( listener === null ) {
      // listener が null
      // 処理しない
      return;
    }

    let listeners = this._listeners;

    // listeners.type が存在するかを調べます
    // if ( !listeners[ type ].hasOwnProperty( type ) ) {
    if ( typeof listeners[ type ] === 'undefined' ) {

      // listeners.type が存在しない
      // listeners.type 新規配列を作成し
      // listener を配列へ登録します
      listeners[ type ] = [];
      listeners[ type ].push( listener );

    } else {

      // すでに listeners.type が存在する
      // listeners.type 配列に listener が存在しないならば登録します
      if ( listeners[ type ].indexOf( listener ) === -1 ) {

        listeners[ type ].push( listener );

      }

    }

  }

  /**
   * event type からリスナー関数を remove します
   * @param {string} type event type
   * @param {Function} listener リスナー関数
   */
  off( type:string, listener:Function ):void {

    if ( listener === null ) {
      // listener が null
      // 処理しない
      return;
    }

    let listeners = this._listeners;

    if ( typeof listeners[ type ] === 'undefined' ) {
      // listener.type が存在しない
      // 処理しない
      return;
    }

    let types = listeners[ type ];

    // listener の配列位置を調べる
    let index = types.indexOf( listener );

    if ( index === -1 ) {
      // 配列位置が -1, 見つからなかった
      // 処理しない
      return;
    }

    // すぐに削除するのでは無く null 代入
    // loop の中で連続で off されると index 位置が変わるとまずい
    types[ index ] = null;

    this.clean( type, types );

  }

  /**
   * 内部関数<br>
   * リスナーの中をクリンーンにします
   * @param {string} type event type
   * @param {Array<Function>} types event type に登録されている関数配列
   */
  clean( type:string, types:Array ):void {

    var hasFunction = false;

    for ( var listener of types ) {

      if ( listener !== null ) {
        hasFunction = true;
        break;
      }

    }

    if ( !hasFunction ) {

      // null 以外が無い
      this._listeners[ type ] = [];

    }

  }

  /**
   * event type にリスナー関数が登録されているかを調べます
   * @param {string} type event type
   * @param {Function} listener リスナー関数
   * @return {boolean} event type にリスナー関数が登録されているかの真偽値を返します
   */
  has( type:string, listener:Function ):boolean {

    if ( listener === null ) {
      // listener が null
      // 処理しない
      return false;
    }

    let listeners = this._listeners;

    if ( typeof listeners[ type ] === 'undefined' ) {
      // listener.type が存在しない
      // 処理しない
      return false;
    }

    // 存在チェック
    return listeners[ type ].indexOf( listener ) !== -1;

  }
  /**
   * イベントを発生させリスな関数を call します
   * @param {Object} event type が必須です
   */
  dispatch( event:Object ):void {

    let listeners = this._listeners;

    console.log( 'dispatch ', event );
    // console.log( 'listeners[ event.type ] ', listeners[ event.type ] );

    if ( typeof listeners[ event.type ] === 'undefined' ) {
      // listener.type が存在しない
      // 処理しない
      return;
    }

    let types = listeners[ event.type ];
    event.target = this;

    for ( var listener of types ) {

      if ( listener !== null && typeof listener === 'function' ) {
        // callback apply
        // 第二引数がObjectの時は call する
        listener.call( this, event );
      }

    }

  }

  /**
   * alias on,
   * event type に リスナー関数を bind します
   * @param {string} type event type
   * @param {Function} listener callback関数
   */
  addEventListener( type:string, listener:Function ):void {
    this.on( type, listener );
  }
  /**
   * alias off,
   * event type からリスナー関数を remove します
   * @param {string} type event type
   * @param {Function} listener リスナー関数
   */
  removeEventListener( type:string, listener:Function ):void {
    this.off( type, listener );
  }
  /**
   * alias has,
   * event type にリスナー関数が登録されているかを調べます
   * @param {string} type event type
   * @param {Function} listener リスナー関数
   * @return {boolean} event type にリスナー関数が登録されているかの真偽値を返します
   */
  hasEventListener( type:string, listener:Function ):boolean {
    return this.has( type, listener );
  }
  /**
   * alias dispatch
   * イベントを発生させリスな関数を call します
   *
   * @param {Object} event type が必須です
   */
  dispatchEvent( event:CustomEvent ):void {
    this.dispatch( event );
  }
}
