/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/09 - 15:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import Env from '../Env';

/**
 * 代替画像パス
 * @static
 */
export default class Empty {
  /**
   * PC 選手代替画像パス
   * @const PLAYER_THUMBNAIL_PC
   * @return {string} PC 選手代替画像パス `player-transparent.png` を返します
   */
  static get PLAYER_THUMBNAIL_PC() {
    return '/draft/2017/assets/pc/images/player-transparent.png';
  }
  /**
   * SP 選手代替画像パス
   * @const PLAYER_THUMBNAIL_SP
   * @return {string} SP 選手代替画像パス `player-transparent@2x.png` を返します
   */
  static get PLAYER_THUMBNAIL_SP() {
    return '/draft/2017/assets/sp/images/player-transparent@2x.png';
  }

  /**
   * PC / SP 代替画像パスを `Env.sp` フラッグより決定します {@link Env.sp}
   * @return {string} PC / SP 代替画像パスを `Env.sp` フラッグより決定し返します
   */
  static thumbnail() {
    if (Env.sp) {
      // sp
      return Empty.PLAYER_THUMBNAIL_SP;
    }
    // pc
    return Empty.PLAYER_THUMBNAIL_PC;
  }
}
