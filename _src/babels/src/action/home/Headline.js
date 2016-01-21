/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Action} from '../Action';
import {Api} from '../../net/Api';

/**
 * Home headline（注目ニュース）
 */
export class Headline extends Action {
  /**
   * Home headline（注目ニュース） データを取得します<br>
   * <strong>types: Api.home()<strong> を使用します
   *
   * @constructor
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( Api.home(), resolve, reject );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * Ajax API url を作成します<br>
   * <code>Api.home().url/headline?offset=0&length=6</code>
   * @method url
   * @returns {string} headline API url を返します
   */
  get url():string {

    return `${this._url}/headline?offset=0&length=6`;

  }

}
