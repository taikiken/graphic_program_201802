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


import {View} from '../View';

// model
import {Model} from '../../model/Model';
import {ModelInterest} from '../../model/settings/ModelInterest';

// dae
import {CategoriesDae} from '../../dae/caegories/CategoriesDae';

// event
import {SettingsStatus} from '../../event/SettingsStatus';

// node
import {SettingsInterestNode} from '../../node/settings/SettingsInterestNode';

// React
let ReactDOM = self.ReactDOM;

/**
 * 設定 好きな競技
 */
export class ViewSettingsInterest extends View {
  /**
   * 設定 好きな競技
   * @param {Element} element 基点 element
   * @param {Object} [option={}] callback methods
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );

    // アカウント情報
    let boundError = this.error.bind( this );
    let callbacks = {};
    this._callbacks = callbacks;
    callbacks[ Model.COMPLETE ] = this.complete.bind( this );
    callbacks[ Model.UNDEFINED_ERROR ] = boundError;
    callbacks[ Model.RESPONSE_ERROR ] = boundError;
    this._action = new ModelInterest( callbacks );

    let status = SettingsStatus.factory();
    status.on( SettingsStatus.INTEREST_COMPLETE, this.reload.bind( this ) );
  }
  /**
   * Ajax request を開始します
   */
  start():void {
    this.action.start();
  }
  /**
   * Ajax response success
   * @param {CategoriesDae} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  complete( result:CategoriesDae ):void {
    this.render( result );
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  error( error ):void {
    console.log( 'Signup complete', error );
  }
  /**
   * form 出力
   * @param {CategoriesDae} dae 興味のあるカテゴリー
   */
  render( dae:CategoriesDae ):void {

    ReactDOM.render(
      <SettingsInterestNode
        dae={dae}
      />,
      this.element
    );
  }
  /**
   * 再読み込み<br>
   * 更新後再読み込みし再セットアップします
   */
  reload():void {
    this.start();
  }
}
