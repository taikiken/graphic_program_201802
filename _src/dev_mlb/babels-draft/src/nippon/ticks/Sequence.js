/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/19 - 23:18
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/ticks
import Polling from '../../moku/tick/Polling';

// async
import Creator from '../async/Creator';

// draft/app
import Env from '../../draft/app/Env';

// event
import RefreshEvent from '../event/RefreshEvent';

/**
 * 一定間隔で JSON を取得します
 * @since 2017-1020
 */
export default class Sequence {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * {@link Creator}.games を実行し JSON を取得します
   */
  static load() {
    Creator.games();
  }
  /**
   * {@link Polling}.UPDATE event handler
   * - {@link Sequence}.load を実行します
   */
  static onUpdate() {
    Sequence.load();
  }
  /**
   * {@link RefreshEvent}.REFRESH event handler
   * - {@link Sequence}.load を実行します
   */
  static onRefresh() {
    Sequence.load();
  }

  /**
   * 強制的に JSON を取得します
   */
  static fire() {
    Sequence.load();
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * interval 処理準備をします
   * - {@link Polling}
   * - {@link RefreshEvent}
   */
  constructor() {
    const interval = Env.nipponInterval;
    /**
     * interval 処理エンジン
     * @type {Polling}
     */
    this.polling = interval > 0 ? new Polling(interval * 1000) : null;
    /**
     * load 管理 event
     * @type {RefreshEvent}
     */
    this.refresh = RefreshEvent.factory();
    /**
     * bind onDrive - RefreshEvent.DRIVE event handler
     * @type {function(this:Sequence)}
     */
    this.onDrive = this.onDrive.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);
    // this.onRefresh = this.onRefresh.bind(this);
    // console.log('Sequence polling', this.polling);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * {@link RefreshEvent}.DRIVE event を unbind します
   */
  dispose() {
    this.refresh.off(RefreshEvent.DRIVE, this.onDrive);
  }
  /**
   * `polling` property が存在する時は
   * {@link Polling}.UPDATE event を unbind します
   */
  stop() {
    if (!this.polling) {
      return;
    }
    this.polling.off(Polling.UPDATE, Sequence.onUpdate);
  }
  /**
   * {@link Polling} を開始します
   */
  start() {
    if (!this.polling) {
      return;
    }
    // console.log('Sequence start');
    // can start
    this.stop();
    this.dispose();
    // ----
    const polling = this.polling;
    polling.on(Polling.UPDATE, Sequence.onUpdate);
    polling.start();
    // ---
    const refresh = this.refresh;
    refresh.on(RefreshEvent.DRIVE, this.onDrive);
    refresh.on(RefreshEvent.REFRESH, Sequence.onRefresh);
    // kick
    Sequence.fire();
  }
  /**
   * 手動 / 自動 切り替えにより処理を変更します
   * @param {string} kind manual / auto 設定値
   */
  onDrive({ kind }) {
    if (kind === 'manual') {
      this.stop();
    } else if (kind === 'auto') {
      this.start();
    }
  }
}
