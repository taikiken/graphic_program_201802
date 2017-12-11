/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/02 - 17:39
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
import {ModelInterest} from '../../model/settings/ModelInterest';

// dae
// import {CategoriesDae} from '../../dae/categories/CategoriesDae';

// event
import {SettingsStatus} from '../../event/SettingsStatus';

// node
import {SettingsInterestNode} from '../../node/settings/SettingsInterestNode';
import { Env } from '../../app/Env';

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
 * 設定 好きな競技
 */
export default class ViewSettingsInterest extends View {
  /**
   * 設定 好きな競技
   * @param {Element} element 基点 element
   * @param {Object} [option={}] callback methods
   */
  constructor(element, option = {}) {
    super(element, option);

    // アカウント情報
    // let boundError = this.error.bind( this );
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
     * @type {ModelInterest}
     */
    this.action = new ModelInterest(callbacks);

    const status = SettingsStatus.factory();
    status.on( SettingsStatus.INTEREST_COMPLETE, this.reload.bind(this));
  }
  /**
   * Ajax request を開始します
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewSingleTitle].start', path);
    }
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
  //   // console.warn( 'setting interest error', error );
  // }
  /**
   * form 出力
   * @param {CategoriesDae} dae 興味のあるカテゴリー
   */
  render(dae) {
    ReactDOM.render(
      <SettingsInterestNode
        dae={dae}
      />,
      this.element,
    );
  }
  /**
   * 再読み込み<br>
   * 更新後再読み込みし再セットアップします
   */
  reload() {
    this.start();
  }
}
