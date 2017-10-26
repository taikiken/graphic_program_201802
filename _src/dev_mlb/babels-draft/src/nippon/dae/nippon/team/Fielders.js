/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 11:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../../util/Type';

// app
// import { default as Text } from '../../../app/draft/Text';

// data
import Fielder from './Fielder';

// draft/app/draft
import Text from '../../../../draft/app/draft/Text';

/**
 * 控えメンバー の 投手以外, スタメン発表後に出現します
 * JSON.response.team[].benchmember.{catcher|infielder|outfielder}
 */
export default class Fielders {
  /**
   * 控えメンバー の 投手以外
   * @param {string} type catcher|infielder|outfielder
   * @param {Array<Object>} args JSON.response.team[].benchmember.{catcher|infielder|outfielder}
   */
  constructor(type, args) {
    let data = args;
    let has = true;
    if (!Array.isArray(data)) {
      data = [];
      has = false;
    }
    if (data.length === 0) {
      has = false;
    }
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    const fielders = data.map(fielder => new Fielder(type, fielder));
    /**
     * 控えメンバー の 投手以外: 野手
     * @type {Array<Fielder>}
     */
    this.fielder = fielders;
    /**
     * alias fielder, 控えメンバー の 投手以外: 野手
     * @type {Array<Fielder>}
     */
    this.fielders = fielders;
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
