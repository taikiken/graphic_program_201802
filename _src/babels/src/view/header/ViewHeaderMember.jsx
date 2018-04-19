/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08 - 19:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import View from '../View';

// app
import { User } from '../../app/User';
import { Message } from '../../app/const/Message';

// action
import { UsersSelf } from '../../action/users/UsersSelf';

// dae
import { UserDae } from '../../dae/UserDae';

// event
import { SettingsStatus } from '../../event/SettingsStatus';

// component
import ComponentHeaderMemberSetting from '../../component/header/ComponentHeaderMemberSetting';

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
 * header ログイン・メンバー 関連メニュー
 * @since 2018-04-19 VK（バーチャル甲子園）flag
 */
export default class ViewHeaderMember extends View {
  /**
   * header ログイン・メンバー 関連メニュー
   * - アイコン+drop down menu 表示
   *
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   */
  constructor(element, option = {}, vk = false) {
    super(element, option, vk);
    /**
     * Action instance を設定します
     * - vk flag: true の時は作成しない
     * @override
     * @type {?UsersSelf}
     */
    this.action = !vk ?
      new UsersSelf(this.done.bind(this), this.fail.bind(this)) :
      null;
    // this.action = new UsersSelf(this.done.bind(this), this.fail.bind(this));
    /**
     * SettingDom instance
     * @type {null|Object}
     * @protected
     */
    this._component = null;
    // SettingsStatus complete を listen しリロードする
    /**
     * SettingsStatus instance
     * @type {SettingsStatus}
     */
    this.settingStatus = SettingsStatus.factory();
    // this._settingStatus = SettingsStatus.factory();
    /**
     * bind 済み this.onComplete
     * @type {Function}
     * @protected
     */
    this._boundComplete = this.onComplete.bind(this);
    /**
     * リロードフラッグ
     * @type {boolean}
     * @protected
     */
    this._reloadFlag = false;
    /**
     * timeout ID
     * @type {number}
     * @protected
     */
    this._timer = 0;
    /**
     * bind 済み this.reload
     * @type {Function}
     * @protected
     */
    this._boundReload = this.reload.bind(this);
    /**
     * bind 済み executeSafely
     * @type {function}
     * @since 2016-09-28
     */
    this.boundSafely = this.executeSafely.bind(this);
    /**
     * bound didMount
     * @type {function}
     */
    this.boundMount = this.didMount.bind(this);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * リロードフラッグ を取得します
   * @return {boolean} リロードフラッグを返します
   */
  get reloadFlag() {
    return this._reloadFlag;
  }
  /**
   * リロードフラッグを設定します
   * @param {boolean} flag リロードフラッグ
   */
  set reloadFlag(flag) {
    this._reloadFlag = flag;
  }
  /**
   * timeout ID を取得します
   * @return {number} timeout ID を返します
   */
  get timer() {
    return this._timer;
  }
  /**
   * timeout ID を設定します
   * @param {number} timer timeout ID
   */
  set timer(timer) {
    this._timer = timer;
  }
  /**
   * bind 済み this.reload 取得します
   * @return {Function} bind 済み this.reload を返します
   */
  get boundReload() {
    return this._boundReload;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    // console.log('ViewHeaderMember.start');
    // this.action.start();
    // vk flag true の時は実行しない
    if (this.action) {
      this.action.start();
    }
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    // console.log('ViewHeaderMember.done', result);
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[MEMBER:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      // @since 2016-11-05
      // 一旦ローカル変数へ確保します
      const information = new UserDae(response);
      // User class へ保管し他で使えるようにします
      User.setInfo(information);
      // ---------[/since]
      this.render(information);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    // console.log('ViewHeaderMember.error', error);
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
  }
  /**
   * Dom を生成します
   * @param {UserDae} response JSON UserDae instance
   */
  render(response) {
    // --------------------------------------------------
    this.executeSafely(View.BEFORE_RENDER, response);
    // --------------------------------------------------
    // when reload
    if (this.reloadFlag) {
      this.reloadFlag = false;
      clearTimeout(this._timer);
      this._timer = setTimeout(this._boundReload, 1000);
    }
    // component
    ReactDOM.render(
      <ComponentHeaderMemberSetting
        icon={response.profilePicture}
        userName={response.userName}
        safely={this.boundSafely}
        did={this.boundMount}
        vk={this.vk}
      />,
      this.element,
    );
  }
  /**
   * componentDidMount で SettingsStatus event を監視する
   */
  didMount() {
    const settingStatus = this.settingStatus;
    settingStatus.off(SettingsStatus.ACCOUNT_COMPLETE, this._boundComplete);
    settingStatus.on(SettingsStatus.ACCOUNT_COMPLETE, this._boundComplete);
  }

  /**
   * 画像生成がサーバーで遅延するので 1sec 後にリロードする
   */
  reload() {
    clearTimeout(this._timer);
    this.start();
  }
  /**
   * 設定変更で読み込み直す
   */
  onComplete() {
    // 再読み込み
    // console.log( 'SettingsStatus.ACCOUNT_COMPLETE reload' );
    clearTimeout(this._timer);
    this.reloadFlag = true;
    this.start();
  }
}
