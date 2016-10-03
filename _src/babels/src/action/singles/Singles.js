/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/26 - 16:56
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// action
import { Offset } from '../Offset';

// app
import { Length } from '../../app/const/Length';
import { Path } from '../../app/const/Path';

// net
import { Api } from '../../net/Api';

/**
 * 記事詳細次の記事一覧を取得します
 *
 * `/api/v1/articles/{:article_id}/next?offset=NN&length=10`
 * @since 2016-09-26
 */
export class Singles extends Offset {
  /**
   * 記事詳細次の記事一覧を取得するための変数を設定します
   * @param {Number} id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=Length.list] query length 値 (10)
   */
  constructor(id:Number, resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.list) {
    super(Api.singles(), resolve, reject, offset, length);
    /**
     * 記事ID
     * @type {Number}
     */
    this.id = id;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return `${Path.article(this._url, this.id)}?offset=${this.offset}&length=${this.length}`;
  }
}
