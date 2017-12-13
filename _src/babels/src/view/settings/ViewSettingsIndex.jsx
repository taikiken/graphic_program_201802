/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 19:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../View';

// model
import {Model} from '../../model/Model';
import {ModelAccount} from '../../model/settings/ModelAccount';

// dae
// import {UserDae} from '../../dae/UserDae';

// node
import {SettingsIndexNode} from '../../node/settings/SettingsIndexNode';

// event
import {SettingsStatus} from '../../event/SettingsStatus';

// Sagen
/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

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
 * 設定 アカウント
 */
export default class ViewSettingsIndex extends View {
  /**
   * 設定 アカウント
   * @param {Element} element root element, Ajax result を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, option = {}) {
    super(element, option);

    const callbacks = {};
    callbacks[Model.COMPLETE] = this.complete.bind(this);
    // callbacks[Model.UNDEFINED_ERROR] = boundError;
    // callbacks[Model.RESPONSE_ERROR] = boundError;
    /**
     * コールバック関数を設定する Object
     * @type {{}}
     * @private
     */
    this._callbacks = callbacks;
    /**
     * Action instance を設定します
     * @override
     * @type {ModelAccount}
     */
    this.action = new ModelAccount(callbacks);

    const status = SettingsStatus.factory();
    status.on(SettingsStatus.ACCOUNT_COMPLETE, this.reload.bind(this));
  }
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.start();
  }
  /**
   * Ajax response success
   * @param {CategoriesDae} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  complete(result) {
    this.render(result);
  }
  // /**
  //  * Ajax response error
  //  * @param {Error} error Error instance
  //  */
  // error( error ):void {
  //   // console.warn( 'setting index error ', error );
  // }
  /**
   * form 出力
   * @param {UserDae} dae アカウント情報
   */
  render(dae) {
    // console.log( 'ViewSettingsIndex render ', dae, this.element );
    ReactDOM.render(
      <SettingsIndexNode
        email={dae.email}
        name={dae.userName}
        bio={dae.bio}
        picture={dae.profilePicture}
        sp={Sagen.Browser.Mobile.phone()}
      />,
      this.element
    );
  }
  /**
   * 再読み込み
   * 更新後再読み込みし再セットアップします
   */
  reload() {
    this.start();
  }
}
