/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 15:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * Ajax 結果を成功時に保存します
 */
export class Result {
  /**
   * Ajax 成功時にdataを保存します
   * @constructor
   * @param {{status: *, responce: *}} json json パース後データ
   */
  constructor( json ) {

    this._json = json;

  }

  /**
   * parsed JSON プロパティ
   * @method data
   * @returns {*} パース済みJSON(Object)を返します
   */
  get data():Object {

    return this._json;

  }

  /**
   * 取得 JSON responce section
   * @method responce
   * @returns {*} 取得 JSON responce section を返します
   */
  get responce():JSON {

    return this.data.responce;

  }

  /**
   * 取得 JSON status section
   * @method status
   * @returns {{code: number, user_massage: string,developer_message: string}} responce.status を返します
   */
  get status():Object {

    return this.data.status;

  }

}
