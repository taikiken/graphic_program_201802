/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 12:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // app
// import { default as Text } from '../../../app/draft/Text';

// data
import Batter from './Batter';

// draft/app/draft
import Text from '../../../../draft/app/draft/Text';

/**
 * 控えメンバー の 投手以外, スタメン発表後に出現します
 * JSON.response.team[].benchmember.{catcher|infielder|outfielder}.{}
 */
export default class Fielder extends Batter {
  /**
   * 控えメンバー の 投手以外
   * @param {string} type catcher|infielder|outfielder
   * @param {Object} args JSON.response.team[].benchmember.{catcher|infielder|outfielder}.{}
   */
  constructor(type, args) {
    super(args);
    /**
     * position, catcher|infielder|outfielder
     * @type {string}
     */
    this.positionSlug = type;
    /**
     * ポジション1文字
     * @type {string}
     */
    this.position = Text.short(type);
    /**
     * ポジション・フル
     * @type {string}
     */
    this.positionLong = Text.long(type);
  }
}
