/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Types} from './Types';
import {Type} from './types/Type';
import {Permalink} from './types/Permalink';
import {Queries} from './types/Quries';
import {Query} from './types/Query';

let _instance = null;
const API_PATH = '/api/v1';

/**
 * サーバーリクエストAPIを管理します
 */
export class Api {
  /**
   * singleton なので Api.factory() でインスタンスを作成します
   * @returns {Api} Api instance を返します
   */
  constructor() {

    if ( _instance !== null ) {

      throw new Error( `Api is singleton pattern. instead use Api.factory()` );

    }

    _instance = this;

    this.signOff();

    this._api = {
      login: new Types( new Type( `${API_PATH}/oauth/token`, 'POST' ), new Permalink(), new Queries() ),
      // home / self
      home: new Types( new Type( `${API_PATH}/articles/home` ), new Permalink( [ 'pickup', 'headline' ] ), new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ]) ),
      self: new Types( new Type( `${API_PATH}/articles/self` ), new Permalink( [ 'pickup', 'headline' ] ), new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ]) )
    };

    return _instance;
  }

  /**
   * property sign へ true をセットします
   * sign inした
   */
  signIn() {

    this._sign = true;

  }
  /**
   * property sign へ false をセットします
   * sign offした
   */
  signOff() {

    this._sign = false;

  }

  /**
   * ユーザーがsign in済みかどうかを調べます
   * @readOnly
   * @returns {boolean} true: sign in, false: sign offを返します
   */
  get sign() {

    return this._sign;

  }

  /**
   * LOGIN API をTypes instanceで返します
   * @returns {Types} LOGIN API を返します
   */
  login():Types {

    return this._api.login;

  }

  /**
   * @returns {*} HOME API(home / self)をTypes instanceで返します
   */
  home():Types {

    return this.sign ? this._api.self : this._api.home;

  }

  /**
   * @returns {Api} Api instance を返します
   */
  static factory() {

    if ( _instance === null ) {

      _instance = new Api();

    }

    return _instance;

  }
}
