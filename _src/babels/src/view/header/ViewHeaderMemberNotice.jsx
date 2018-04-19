/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08 - 19:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import View from '../View';

// app
import {Message} from '../../app/const/Message';

// action
import {Notice} from '../../action/users/Notice';

// dae
import {NotificationsDae} from '../../dae/user/NotificationsDae';

// event
import {NoticeStatus} from '../../event/NoticeStatus';

// tick
// import { Polling } from '../../tick/Polling';
import ComponentHeaderNotice from '../../component/header/ComponentHeaderNotice';

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

/**
 * お知らせ(header)
 * - バッジ
 * - お知らせ一覧 + リンク
 */
export default class ViewHeaderMemberNotice extends View {
  /**
   * お知らせ(header) for login member
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2-18-04-19 vk header - flag 追加
   */
  constructor(element, option = {}, vk = false) {
    super(element, option, vk);
    // ----
    /**
     * Action instance を設定します
     * @override
     * @type {Notice}
     */
    this.action = new Notice(this.done.bind(this), this.fail.bind(this), 0, 5);
    /**
     * bind 済み this.onNoticeUpdate event handler
     * @type {Function}
     */
    this.onNoticeUpdate = this.onNoticeUpdate.bind(this);
    /**
     * bind onMount
     * @type {function}
     */
    this.onMount = this.onMount.bind(this);
    /**
     * bind dispose
     * @type {function}
     */
    this.dispose = this.dispose.bind(this);
    /**
     * bind executeSafely
     * @type {function}
     */
    this.executeSafely = this.executeSafely.bind(this);
    /**
     * お知らせ更新通知マネージャー instance
     * @type {NoticeStatus}
     */
    this.status = NoticeStatus.factory();
  }
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.next();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[MEMBER:NOTICE:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      this.render(response);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
  }
  /**
   * お知らせ  ログインメンバー Dom を生成します
   * @param {Object} responseObj JSON response
   */
  render(responseObj) {
    const notificationsDae = new NotificationsDae(responseObj);
    ReactDOM.render(
      <ComponentHeaderNotice
        response={notificationsDae}
        safely={this.executeSafely}
        mount={this.onMount}
        dispose={this.dispose}
        vk={this.vk}
      />,
      this.element,
    );
  }
  /**
   * NoticeStatus.UPDATE_COUNT unbind
   */
  dispose() {
    this.status.off(NoticeStatus.UPDATE_COUNT, this.onNoticeUpdate);
  }
  /**
   * main dom が mount されたら呼び出されます
   * componentDidMount callback
   */
  onMount() {
    // const status = NoticeStatus.factory();
    const status = this.status;
    // this._status = status;
    status.off(NoticeStatus.UPDATE_COUNT, this.onNoticeUpdate);
    status.on(NoticeStatus.UPDATE_COUNT, this.onNoticeUpdate);
  }
  /**
   * NoticeStatus.UPDATE_COUNT event handler
   * @param {Object} event NoticeStatus.UPDATE_COUNT event object, event.count が 0 以外の時に reload します
   */
  onNoticeUpdate(event) {
    // お知らせ件数が0の時はreloadしない
    if (event.count !== 0) {
      this.reload();
    }
  }
  /**
   * 再読み込み
   */
  reload() {
    // ajax start
    this.action.reload();
  }
}
