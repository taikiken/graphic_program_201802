/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */


import {ActionAuthBehavior} from '../ActionAuthBehavior';
import {Api} from '../../net/Api';
import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {Path} from '../../app/const/Path';

/**
 * **コメント送信**
 * FormData を送る token 付き Action
 */
export class Comment extends ActionAuthBehavior {
  /**
   * <h3>コメント送信</h3>
   * FormData を送る token 付き Action
   * @param {string} articleId 記事 id
   * @param {FormData} formData body に送る FormData
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:string, formData:FormData, resolve:Function = null, reject:Function = null ) {
    if ( !Safety.isFormData( formData ) ) {
      throw new Error( 'need correct formData ', formData );
    }
    super( User.token, Api.comment( 'send' ), formData, resolve, reject );
    this._articleId = articleId;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return Path.article( this._url, this._articleId );
  }
}
