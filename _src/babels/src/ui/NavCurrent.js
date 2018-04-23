/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/10 - 21:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Dom from '../app/Dom';
import { Offset } from '../util/Offset';

/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

/**
 * global object - 環境設定
 * ```
 * var SPBL_ENV = {
 *  'env'      : 'development',
 *  'platform' : 'web_desktop',
 *  'page'     : 'category',
 *  'category' : 'pyeongchang2018',
 *  'p'        : '',
 *  'provider' : ''
 * };
 * ```
 * @type {{}}
 */
const SPBL_ENV = self.SPBL_ENV || {};

/**
 * navigation をいい感じに current させます
 * @since 2018-01-10 - `exe` 系から移植
 */
export default class NavCurrent {
  /**
   * navigation をいい感じに current させるを開始します
   * @param {string} argSlug category slug
   * @param {boolean} [sp=false] sp flag
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   */
  static init(argSlug, sp = false, vk = false) {
    const slug = argSlug ? argSlug : SPBL_ENV.category;
    NavCurrent.current(slug, sp, vk);
  }
  /**
   * `.current` を付与します
   * @param {slug} [slug=all] category slug
   * @param {boolean} [sp=false] sp flag
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   */
  static current(slug = 'all', sp = false, vk = false) {
    const target = Dom.get(slug);
    console.log('NavCurrent.current', slug, sp, target);
    if (!target) {
      return;
    }
    Sagen.Dom.addClass(target, 'current');
    if (sp) {
      NavCurrent.setPosition(target, vk);
    }
  }
  /**
   * SP - current 位置をいい感じにする
   * ```
   * div#gnav-sec-inner
   *   ul#gnav-sec-list
   *     li#slug
   *     li#slug
   *     li#slug
   *     li#slug
   *     li#slug
   *     li#slug
   *     li#slug
   * ```
   * @param {Element} target `li` element
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   */
  static setPosition(target, vk = false) {
    // gnav-sec-inner
    const inner = Dom.navInner(vk);
    // ul#gnav-sec-list
    const ul = Dom.navList(vk);
    if (!inner || !ul) {
      // 不正値なので処理しない
      return;
    }
    // ul -> display: table
    // 正確なwidthを取得するため
    ul.style.cssText = 'display: table;';
    // offset 取得
    const ulOffset = Offset.offset(ul);
    // ul 元に戻す
    ul.style.cssText = '';
    // ul width
    const ulWidth = ulOffset.width;
    // li offset
    const targetOffset = Offset.offset(target);
    // window width
    const windowWidth = window.innerWidth;
    // 移動させる距離
    const left = targetOffset.left;
    const rightEnd = targetOffset.right;
    // li全体がwindow 内なら何もしない
    if (rightEnd < windowWidth) {
      // window 内なので何もしない
      return;
    }
    // 左端につかないように調整する
    let altLeft = left - 10;
    const right = ulWidth - altLeft - windowWidth;
    // window 右端から離れ無いように調整する
    if (right < 0) {
      altLeft = altLeft + right;
    }
    // ul scroll 量で移動させる
    ul.scrollLeft = altLeft;
  }
}
