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
'use strict';

import {View} from '../View';

// model
import {Model} from '../../model/Model';
import {ModelAccount} from '../../model/settings/ModelAccount';

import {UserDae} from '../../dae/UserDae';

import {SettingIndexNode} from '../../node/settings/SettingIndexNode';

// event
import {SettingsStatus} from '../../event/SettingsStatus';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

export class ViewSettingsIndex extends View {
  constructor( element:Element, option:Object = {} ) {
    super( element, option );

    // 自分の情報
    let boundError = this.error.bind( this );
    let callbacks = {};
    this._callbacks = callbacks;
    callbacks[ Model.COMPLETE ] = this.complete.bind( this );
    callbacks[ Model.UNDEFINED_ERROR ] = boundError;
    callbacks[ Model.RESPONSE_ERROR ] = boundError;
    this._action = new ModelAccount( callbacks );

    let status = SettingsStatus.factory();
    status.on( SettingsStatus.ACCOUNT_COMPLETE, this.reload.bind( this ) );
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
  complete( result:UserDae ):void {
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
   * @param {UserDae} userDae
   */
  render( userDae:UserDae ):void {

    console.log( 'ViewSettingsIndex render ', userDae, this.element );

    ReactDOM.render(
      <SettingIndexNode
        email={userDae.email}
        name={userDae.userName}
        bio={userDae.bio}
        picture={userDae.profilePicture}
      />,
      this.element
    );
  }

  reload():void {
    this.start();
  }
}
