/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/31 - 21:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 選手情報に関する出力補助機能を提供します
 */
export default class Positions {
  // static category(position) {
  //   switch (position) {
  //     case '投': {
  //       return '投手';
  //     }
  //     case '捕': {
  //       return '捕手';
  //     }
  //     case '指': {
  //       return '指名打者';
  //     }
  //     case '左':
  //     case '右':
  //     case '中': {
  //       return '外野手';
  //     }
  //     default: {
  //       return '内野手';
  //     }
  //   }
  // }
  /**
   * 左・右・両 に見合う文字列を取得します
   * - badHand / hand 空のことがある
   * @param {DaePlayer} player 選手情報
   * @returns {string} 右投 / 右打, position で出力を変えます
   */
  static handStr(player) {
    let postfix = '打';
    let prefix = player.batHand;
    if (player.position === '投') {
      postfix = '投';
      prefix = player.hand;
    }
    if (prefix) {
      return `${prefix}${postfix}`;
    }
    return '';
  }
  /**
   * 試合情報・スターティングメンバー / 控え選手
   * 左・右・両 に見合う class name を取得します
   * - mlb_live__starting--[member | bench]__td--player__handed--left
   * - mlb_live__starting--[member | bench]__td--player__handed--right
   * - mlb_live__starting--[member | bench]__td--player__handed--switch
   * @param {DaePlayer} player スターティングメンバー選手情報
   * @param {string} [mode=member] class に付与する文字列 member | bench
   * @returns {string} 左・右・両 に見合う class name
   */
  static handClass(player, mode = 'member') {
    const type = player.position === '投' ? player.hand : player.batHand;
    if (!type) {
      return '';
    } else if (type === '左') {
      return `mlb_live__starting--${mode}__td--player__handed--left`;
    } else if (type === '右') {
      return `mlb_live__starting--${mode}__td--player__handed--right`;
    }
    return `mlb_live__starting--${mode}__td--player__handed--switch`;
  }
  /**
   * 予告先発投手
   * 左・右・両 に見合う class name を取得します
   * - mlb_live__starting--pitcher__handed--left
   * - mlb_live__starting--pitcher__handed--right
   * - mlb_live__starting--pitcher__handed--switch
   * @param {string} type 左・右・両
   * @returns {*} 左・右・両 に見合う class name を返します
   */
  static startingPitcher(type) {
    if (!type) {
      return '';
    } else if (type === '左') {
      return 'mlb_live__starting--pitcher__handed--left';
    } else if (type === '右') {
      return 'mlb_live__starting--pitcher__handed--right';
    }
    return 'mlb_live__starting--pitcher__handed--switch';
  }
}
