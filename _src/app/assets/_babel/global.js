/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/02/09 - 19:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build @@buildTime
 */

'use strict';

// NPB sidebar ranking

const UT = self.UT;

// UT
const PageTop = UT.ui.PageTop;

// init @see babels_exe Page.category
// page top
PageTop.start();

// -----------------------------------------------
// responsive image

// gulp single:dev:lint
// gulp single:dev
// gulp single:build

/**
 * [native code] window.document
 * @private
 * @type {HTMLDocument}
 */
const document = window.document;

/**
 * 画像ファイル `img.responsive` の画像ファイル名を, load / resize 時に window 幅によって置き換えます行います
 * - 対象 img tag へ処理対象 CSS class name (default: responsive) を設置します
 * - Responsive.init します - load / resize 時に処理を行います
 * @static
 */
class Responsive {
  /**
   * window 最小幅 - break point
   * @cont MIN_WIDTH
   * @returns {number} 768: break point を返します
   */
  static get MIN_WIDTH() {
    return 768;
  }
  /**
   * 初期処理を行います
   * - window.onload bind - Responsive.replace 実行
   * - window.onresize bind - Responsive.replace 実行
   */
  static init() {
    window.addEventListener('load', Responsive.onLoad, false);
    window.addEventListener('resize', Responsive.onResize, false);
  }
  /**
   * window.onresize event handler - Responsive.replace 実行
   */
  static onResize() {
    Responsive.replace();
  }
  /**
   * window.onload event handler - Responsive.replace 実行
   */
  static onLoad() {
    window.removeEventListener('load', Responsive.onResize);
    Responsive.replace();
  }
  /**
   * img tag 引数 class のタグを取得します、
   * `document.querySelectorAll` を使用し取得します [caniuse](http://caniuse.com/#feat=queryselector)
   * @param {string} [className=responsive] 取得する CSS class name
   * @returns {NodeList} 取得リストを返します
   */
  static search(className = 'responsive') {
    return document.querySelectorAll(`img.${className}`);
  }
  /**
   * img.src 置換えの正規表現
   * @returns {RegExp} `new RegExp('@2', 'g')` を返します
   */
  static reg() {
    return new RegExp('@2', 'g');
  }
  /**
   * window 幅を取得します
   * @returns {Number} `window.innerWidth` を返します
   */
  static width() {
    return window.innerWidth;
  }
  /**
   * window 幅が {@link Responsive.MIN_WIDTH} より大きい時の処理
   * @param {Element} img 処理対象 img tag
   * @param {RegExp} reg 置換えの正規表現 {@link Responsive.reg}
   */
  static wide(img, reg) {
    const src = img.src;
    if (!src) {
      // src 不正
      return;
    }
    // 正規表現チェック
    if (src.match(reg)) {
      img.src = src.replace('@2x', '');
    }
    // いる？
    img.style.display = 'block';
  }
  /**
   * window 幅が {@link Responsive.MIN_WIDTH} 以下時の処理
   * @param {Element} img 処理対象 img tag
   * @param {RegExp} reg 置換えの正規表現 {@link Responsive.reg}
   */
  static tint(img, reg) {
    const src = img.src;
    if (!src) {
      // src 不正
      return;
    }
    // 正規表現チェック
    if (!src.match(reg)) {
      img.src = src.replace(/(\.gif|\.jpg|\.png)/g, '@2x$1');
    }
  }
  /**
   * 置換え処理を行います
   */
  static replace() {
    const images = Responsive.search();
    if (!Array.from) {
      Responsive.from(images);
      return;
    }
    const reg = Responsive.reg();
    const width = Responsive.width();
    const wide = width > Responsive.MIN_WIDTH;
    const tint = width <= Responsive.MIN_WIDTH;
    Array.from(images).map((img) => {
      if (wide) {
        Responsive.wide(img, reg);
      } else if (tint) {
        Responsive.tint(img, reg);
      }
      return img;
    });
  }
  /**
   * `Array.from` が使用できないブラウザのための置換え処理を行います
   * @param {NodeList} images 置換え対象 `img` tag list
   */
  static from(images) {
    const limit = images.length;
    const reg = Responsive.reg();
    const width = Responsive.width();
    const wide = width > Responsive.MIN_WIDTH;
    const tint = width <= Responsive.MIN_WIDTH;
    // Array.from が使用できないので for...i iterator を
    for (let i = 0; i < limit; i += 1) {
      const img = images[i];
      if (wide) {
        Responsive.wide(img, reg);
      } else if (tint) {
        Responsive.tint(img, reg);
      }
    }
  }
}

Responsive.init();
