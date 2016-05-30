/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';

/**
 * 仮)PC版右のバナー広告設定
 * Web版バナー広告はDFP管理に以降すれば管理画面から自在に制御できるので不要かも。調査中。
 *
 * JSON.response.ad.pc
 */
export class AdPcDae {
  /**
   * JSON.response.ad.pc
   * @param {Object} [pc={}] JSON.response.ad.pc
   */
  constructor( pc:Object = {} ) {
    pc = Safety.object( pc );
    this._pc = pc;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.ad.pc
   * <pre>
   * 仮)PC版右のバナー広告設定
   * Web版バナー広告はDFP管理に以降すれば管理画面から自在に制御できるので不要かも。調査中。
   * </pre>
   * @return {Object|*} JSON response.ad.pc を返します
   */
  get pc():Object {
    return this._pc;
  }
  /**
   * JSON.response.ad.pc['sidebar-top']
   * サイドバー右上レクタングル
   * @return {string} JSON.response.ad.pc['sidebar-top'] を返します
   */
  get sidebarTop():string {
    return this.pc['sidebar-top'];
  }
  /**
   * JSON.response.ad.pc['sidebar-bottom']
   * サイドバー右下ハーフ
   * @return {string} JSON.response.ad.pc['sidebar-bottom'] を返します
   */
  get sidebarBottom():string {
    return this.pc['sidebar-bottom'];
  }
  /**
   * JSON.response.ad.pc['single-top']
   * 記事詳細タイトル下
   * @return {string} JSON.response.ad.pc['single-top'] を返します
   */
  get singleTop():string {
    return this.pc['single-top'];
  }
  /**
   * JSON.response.ad.pc['single-bottom-left']
   * 記事詳細下部レクタングル左
   * @return {string} JSON.response.ad.pc['single-bottom-left'] を返します
   */
  get singleBottomLeft():string {
    return this.pc['single-bottom-left'];
  }
  /**
   * JSON.response.ad.pc['single-bottom-right']
   * 記事詳細下部レクタングル右
   * @return {string} JSON.response.ad.pc['single-bottom-right'] を返します
   */
  get singleBottomRight():string {
    return this.pc['single-bottom-right'];
  }
}
