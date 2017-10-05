/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 22:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Queries from '../../moku/net/Queries';

/**
 * `app=` `ios`, `android` ignore する
 * @since 2017-10-05
 */
export default class Query {
  /**
   * app=` `ios`, `android` ignore する
   * @returns {boolean} true: ignore 対象
   */
  static detect() {
    const app = Queries.get('app');
    // console.log('Query.detect app', app);
    return app === 'ios' || app === 'android';
  }
}
