/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/08 - 18:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// net
import { Cookie } from '../../net/Cookie';

// util
import { Scroll } from '../../util/Scroll';

// Sagen
/**
 * ref: global object - Sagen
 * @type {Sagen}
 * @private
 */
const Sagen = self.Sagen;

/**
 * `.header-sticky` element
 * @type {null}
 */
let headerSticky = null;
/**
 * timer id
 * @type {number}
 */
let timer = 0;

/**
 * アプリダウンロードの動線を改善 #1009
 *
 * グノシーみたいなアプリバナーを SP の時のみに
 *
 * 仕様変更により大幅に書換える - node を react から template に移動<br>
 * `/app/templates/mobile/_header.php` - line 194
 * ```
 * <div id="js-header-appbnr-container">
 *  <div class="header-appbnr">
 *    <div class="header-appbnr-btn-close"><span>閉じる</span></div>
 *      <div class="header-appbnr-link">
 *      <!-- /531683568/sp_header_app -->
 *      <script>
 *        googletag.cmd.push(function() {
 *          googletag.defineSlot('/531683568/sp_header_app', [270, 70], 'div-gpt-ad-1494939700357-0').addService(googletag.pubads());
 *          googletag.pubads().enableSingleRequest();
 *          googletag.enableServices();
 *        });
 *      </script>
 *      <div id='div-gpt-ad-1494939700357-0' style='height:70px; width:270px;'>
 *        <script>
 *          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1494939700357-0'); });
 *        </script>
 *      </div>
 *    <!-- // /531683568/sp_header_app -->
 *    </div><!-- /.header-appbnr-link -->
 *  </div><!-- /.header-appbnr -->
 * </div>
 * ```
 * @see https://github.com/undotsushin/undotsushin/issues/1009
 * @since 2017-05-17
 */
export class AppBanner {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * Scroll.SCROLL event handler
   * @param {Object} events Scroll.SCROLL event Object
   * @see https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-332087234
   * @since 2-16-09-30 static へ変更
   * @since 2017-09-26 banner - height: 85 -> 70 変更
   */
  static onScroll(events) {
    // if (events.y >= 85) {
    // @since 2017-09-26
    //
    if (events.y >= 70) {
      AppBanner.visible(false);
    } else {
      AppBanner.visible(true);
    }
  }
  /**
   * iOS safari rendering bug 対応させるために強制再描画します
   */
  static refresh() {
    if (!headerSticky) {
      return;
    }
    clearTimeout(timer);
    headerSticky.style.cssText = 'top: 71px;';
    timer = setTimeout(() => {
      headerSticky.style.cssText = '';
    }, 16);
  }
  /**
   * document.body に `.appbnr-invisible` を追加・削除します
   * @param {boolean} view true の時に `.appbnr-invisible` を削除します
   */
  static visible(view = false) {
    if (view) {
      if (Sagen.Dom.hasClass(document.body, 'appbnr-invisible')) {
        Sagen.Dom.removeClass(document.body, 'appbnr-invisible');
        AppBanner.refresh();
      }
    } else {
      Sagen.Dom.addClass(document.body, 'appbnr-invisible');
    }
  }
  /**
   * document.body へ `.appbnr-enable` を追加します
   */
  static enable() {
    Sagen.Dom.addClass(document.body, 'appbnr-enable');
  }
  /**
   * document.body から `.appbnr-enable` を削除します
   */
  static free() {
    Sagen.Dom.removeClass(document.body, 'appbnr-enable');
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * app バナー表示コントロール
   * @param {Element} element target element
   * @param {boolean} show visible flag
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2018-04-19 vk header - flag 追加
   */
  constructor(element, show, vk = false) {
    /**
     * target element
     * @type {Element}
     */
    this.element = element;
    /**
     * bind onClose
     * @type {any}
     */
    this.onClose = this.onClose.bind(this);
    /**
     * default property
     * @type {{show: boolean}}
     */
    this.state = { show };
    /**
     * Scroll instance
     * @type {Scroll}
     */
    this.scroll = Scroll.factory();
    /**
     * VK（バーチャル甲子園）flag
     * @type {boolean}
     */
    this.vk = vk;
    const headers = document.getElementsByClassName('header-sticky');
    // console.log('AppBanner headers', headers);
    if (headers && headers.length) {
      headerSticky = headers[0];
    }
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  init() {
    // scroll 監視開始
    this.activate();
    // this.element.addEventListener('click', this.onClose, false);
  }
  /**
   * div.header-appbnr-btn-close click event handler
   * @param {Event} event div.header-appbnr-btn-close click event
   */
  onClose(event) {
    event.preventDefault();
    this.updateShow(false);
    this.dispose();
  }
  /**
   * state.show を変更します
   * @param {boolean} show show state value
   */
  updateShow(show) {
    // state が同じだったら処理しない
    if (this.state.show === show) {
      return;
    }

    if (!show) {
      // 1 week cookie save
      // ***開発時コメントにします**
      Cookie.save('1', Cookie.APP_BANNER, new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)));
      // console.log('Cookie', Cookie.APP_BANNER, Cookie.get(Cookie.APP_BANNER));
      AppBanner.free();
    } else {
      // 表示されたらスクロール監視を始める
      this.activate();
    }
    // state update
    this.state.show = show;
  }
  /**
   * Scroll.SCROLL 監視を開始します
   */
  activate() {
    this.dispose();

    const scroll = this.scroll;
    scroll.on(Scroll.SCROLL, AppBanner.onScroll);
    scroll.start();
  }
  /**
   * Scroll.SCROLL 監視を止めます
   */
  dispose() {
    this.scroll.off(Scroll.SCROLL, AppBanner.onScroll);
    this.element.removeEventListener('click', this.onClose);
  }
}

/**
 * アプリダウンロードの動線を改善 #1009,
 * グノシーみたいなアプリバナーを SP の時のみに
 *
 * 仕様変更により実装を inner class {@link AppBanner} へ移行しました
 *
 * 実行互換のために {@link SPViewAppBanner.init} のみ残し他は削除しました
 * @since 2017-05-17
 */
export default class SPViewAppBanner {
  /**
   * {@link Cookie}.APP_BANNER が無い時 SPViewAppBanner を render しマウントします
   * @param {Element} element div#js-header-appbnr-container
   * @param {boolean} [visible=false] render root Element
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {boolean} mount すると true を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static init(element, visible = false, vk = false) {
    // cookie check 止める
    // @since 2017-09-25
    const has = false;// Cookie.has(Cookie.APP_BANNER);
    if (!has && visible) {
      AppBanner.enable();
      const banner = new AppBanner(element, visible, vk);
      banner.init();
      return true;
    }
    // cookie あり または visible: false
    AppBanner.free();
    return false;
  }
}
