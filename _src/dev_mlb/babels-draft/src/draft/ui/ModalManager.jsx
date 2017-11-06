/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/09
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */


// react
import React from 'react';
import ReactDOM from 'react-dom';

// moku/event
import EventDispatcher from '../../moku/event/EventDispatcher';
import Events from '../../moku/event/Events';

// // event
// import { default as EventDispatcher } from '../event/EventDispatcher';
// import { default as Events } from '../event/Events';

// component
import ComponentModal from '../component/players/ComponentModal';

// // React
// const ReactDOM = self.ReactDOM;
// const React = self.React;

/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('ModalManager singleton instance');
/**
 * singleton instance, nullable
 * @type {?ModalManager}
 * @private
 * @static
 */
let instance = null;

/**
 * 選手モーダル表示を管理します<br>
 * 選手一覧とモーダルの仲介をします
 * @example
 * // 選手一覧 {ComponentPlayer}
 * const playersManager = ModalManager.factory();
 * const onClick = (event) => {
 *  event.preventDefault();
 *  playersManager.prepare(player, position, identity);
 * };
 *
 * // モーダル
 * const onPrepare = (events) => {
 *  const player = events.player;
 *  const position = events.position;
 *  const identity = events.identity;
 *  // ... open modal
 * };
 * const modalsManager = Manager.factory();
 * modalsManager.on(ModalManager.PREPARE_OPEN, this.onPrepare.bind(this));
 */
export default class ModalManager extends EventDispatcher {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * `ComponentModal` をマウントします
   * @param {Element} element ComponentModal をマウントする起点 Element
   */
  static render(element) {
    ReactDOM.render(
      <ComponentModal />,
      element,
    );
  }
  /**
   * ModalManager instance を singleton を保証し作成します
   * @return {ModalManager} ModalManager instance を返します
   */
  static factory() {
    if (instance === null) {
      instance = new ModalManager(singletonSymbol);
    }
    return instance;
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * singleton です
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @return {ModalManager} ModalManager instance を返します
   */
  constructor(checkSymbol) {
    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    // instance 作成済みかをチェックし instance が null の時 this を設定します
    if (instance !== null) {
      return instance;
    }
    super();
    // ----
    return this;
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * modal open 準備の event type
   * @event PREPARE_OPEN
   * @return {string} modalPrepareOpen を返します
   */
  static get PREPARE_OPEN() {
    return 'modalPrepareOpen';
  }
  /**
   * modal open 後の event type
   * @event OPEN
   * @return {string} modalOpen を返します
   */
  static get OPEN() {
    return 'modalOpen';
  }
  /**
   * modal close 後の event type
   * @event CLOSE
   * @return {string} modalClose を返します
   */
  static get CLOSE() {
    return 'modalClose';
  }
  /**
   * modal open animation 前の event type
   * @event BEFORE_OPEN
   * @return {string} modalBeforeOpen を返します
   */
  static get BEFORE_OPEN() {
    return 'modalBeforeOpen';
  }
  /**
   * modal close animation 前の event type
   * @event BEFORE_CLOSE
   * @return {string} modalBeforeClose を返します
   */
  static get BEFORE_CLOSE() {
    return 'modalBeforeClose';
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * `ComponentPlayer` click event でキックされます<br>
   * ModalManager.PREPARE_OPEN event を発火させモーダルを開きます
   * @param {Player} player JSON 選手データ
   * @param {string} position ポジション
   * @param {string} identity 出身
   */
  prepare(player, position, identity) {
    const events = new Events(ModalManager.PREPARE_OPEN, this, this);
    events.player = player;
    events.position = position;
    events.identity = identity;
    // console.log('ModalManager.prepare', events);
    this.dispatch(events);
  }
  /**
   * モーダルが閉じるとキックされます<br>
   * ModalManager.CLOSE event を発火させます
   */
  closed() {
    this.dispatch(new Events(ModalManager.CLOSE, this, this));
  }
  /**
   * モーダルが開き始める前にキックされます<br>
   * ModalManager.BEFORE_OPEN event を発火させます
   */
  beforeOpen() {
    this.dispatch(new Events(ModalManager.BEFORE_OPEN, this, this));
  }
}
