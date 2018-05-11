/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/14 - 13:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
import { Scroll } from '../../util/Scroll';
import { Loc } from '../../util/Loc';
// import { Time } from '../../util/Time';
//
// // net
// import { Cookie } from '../../net/Cookie';

// Ga
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';
import VK from '../../vk/VK';

// jQuery
/**
 * [library] - jQuery
 */
const $ = self.jQuery || {};

// Synapse
/**
 * [library] - Synapse
 */
const Synapse = self.Synapse;

// Sagen
/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

// Gasane
/**
 * [library] - Gasane
 */
const Gasane = self.Gasane;

/**
 * class names
 * @type {{
 *    page: string,
 *    service: string,
 *    box: string,
 *    logo: string,
 *    sideMenu: string,
 *    bg: string,
 *    list: string,
 *    toggle: string
 * }}
 */
const parts = {
  page: 'page',
  service: 'synapse-service-list',
  box: 'synapse-service-list-outer-box',
  logo: 'synapse-logo-box',
  sideMenu: 'side-menu',
  bg: 'side-menu-bg',
  list: 'side-menu-list',
  // button
  toggle: 'side-menu-toggle',
  // // modal
  // modal: 'modal-container',
};

/**
 * VK - id / class name prefix 対応するための 取得中間クラス
 * @since 2018-04-23 vk prefix
 */
export class SynParts {
  /**
   * `#page`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static page(vk = false) {
    return `${VK.prefix(vk)}${parts.page}`;
  }
  /**
   * `#synapse-service-list`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static service(vk = false) {
    return `${VK.prefix(vk)}${parts.service}`;
  }
  /**
   * `#synapse-service-list-outer-box`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static box(vk = false) {
    return `${VK.prefix(vk)}${parts.box}`;
  }
  /**
   * `#synapse-logo-box`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static logo(vk = false) {
    return `${VK.prefix(vk)}${parts.logo}`;
  }
  /**
   * `#side-menu`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static sideMenu(vk = false) {
    return `${VK.prefix(vk)}${parts.sideMenu}`;
  }
  /**
   * `#side-menu-bg`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static bg(vk = false) {
    return `${VK.prefix(vk)}${parts.bg}`;
  }
  /**
   * `#side-menu-list`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static list(vk = false) {
    return `${VK.prefix(vk)}${parts.list}`;
  }
  /**
   * `#side-menu-toggle`
   * @param {boolean} [vk=false] true: VK - flag
   * @returns {string} prefix 有無の属性名称を返します
   */
  static toggle(vk = false) {
    return `${VK.prefix(vk)}${parts.toggle}`;
  }
  // /**
  //  * `#modal-container`
  //  * @param {boolean} [vk=false] true: VK - flag
  //  * @returns {string} prefix 有無の属性名称を返します
  //  */
  // static modal(vk = false) {
  //   return `${VK.prefix(vk)}${parts.modal}`;
  // }
}

// inner class
/**
 * Syn.menu
 */
export default class Syn {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 自身の script tag src query syn を探し '1' か否かを調べ真偽値を返します
   * @return {boolean} syn=1 かの真偽値を返します
   */
  static test() {
    const scripts = document.getElementsByTagName('head')[0].getElementsByTagName('script');
    let search;

    for (let script of scripts) {
      if (!script.src || script.src.indexOf('main.bundle.js') === -1) {
        continue;
      }

      const src = script.src;
      search = src.split('?').pop();
    }
    // console.log( 'test search ', search );
    if (typeof search === 'undefined' || search === '') {
      return false;
    }

    const queries = Loc.parse(search);
    // console.log( 'test queries ', queries );
    if (!queries.hasOwnProperty('syn')) {
      return false;
    } else {
      return queries.syn === '1';
    }
  }
  // /**
  //  * 訪問経験があるかを cookie から調べます
  //  * @return {boolean} 訪問経験があるかの真偽値を返します
  //  */
  // static visited() {
  //   return parseInt(Cookie.get( Cookie.SYN ), 10) === 1;
  // }
  // /**
  //  * 訪問 cookie をセットします
  //  * @return {boolean} セット成功可否を返します
  //  */
  // static visit() {
  //   // 2 weeks set
  //   return Cookie.save('1', Cookie.SYN, Time.later(14));
  // }
  /**
   * GA 計測タグ を送信します
   * @param {string} mode open | close どちらk
   */
  static gaSend(mode) {
    // ----------------------------------------------
    // GA 計測タグ
    // Syn.menu表示 / Syn.menuクローズ
    Ga.add(new GaData('Syn.gaSend', 'sidemenu', mode, '', 0, true));
    // ----------------------------------------------
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * Syn. menu を作成し open / close animation を実装します
   * @param {Element} button #menu-opener element
   * @param {Element} side #side-menu-container element
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2018-04-19 vk header - flag 追加
   */
  constructor(button, side, vk = false) {
    /**
     * element#menu-opener, menu を開くボタン
     * @type {Element}
     * @private
     */
    this.button = button;
    /**
     * #side-menu-container element, サイドバーメニュー
     * @type {Element}
     * @private
     */
    this.side = side;
    /**
     * side element を jQuery object へ - `#side-menu-container`
     * @type {HTMLElement|jQuery}
     * @private
     */
    this.$side = $(side);
    /**
     * #side-menu-container element を Sagen.Dom instance へ
     * addClass とか getStyle とかできるから
     * @type {Sagen.Dom}
     * @private
     */
    this.sideDom = new Sagen.Dom(side);
    /**
     * Synapse.Menu instance, Syn. menu のコントローラー（多分）
     * @type {null|Synapse.Menu}
     * @private
     */
    this.menu = null;
    /**
     * open / close の animation 中フラッグ
     * @type {boolean}
     * @private
     */
    this.motion = false;
    /**
     * スクロール位置
     * open 時にその前の scroll 位置を保存し close で復元するために使用します
     * @type {number}
     * @private
     */
    this.scrollTop = 0;
    /**
     * Syn. のイベント: service_list_load が発火しメニュー関連の準備ができた時に true にセットされます
     * @type {boolean}
     * @private
     */
    this.ready = false;

    // fps
    // whole(#page) style が消える???対策
    /**
     * update event handler を bind this し this 参照をキープします
     * @type {Function}
     * @private
     */
    this.onUpdate = this.onUpdate.bind(this);
    /**
     * 連続実行(update)するための Fps instance
     * fps 1 で実行されます
     * @type {Gasane.Fps}
     * @private
     */
    this.fps = new Gasane.Fps(1);
    /**
     * $adg.ads.trackShowEvent を 1回だけ行うためのフラッグ
     * @type {boolean}
     * @private
     */
    this.firstAd = false;
    /**
     * $adg.listener.loaded 完了用の flag
     * @type {boolean}
     * @private
     */
    this.$adgComing = false;
    /**
     * $adg.listener event handler
     * @type {{loaded: *, fail: *}}
     * @private
     */
    this.adg = {
      loaded: this.adgLoaded.bind(this),
      failed: this.adgFailed.bind(this)
    };
    /**
     * element#side-menu-list を Sagen.dom instance にします
     * @type {?Sagen.Dom}
     * @private
     */
    this.listDom = null;
    /**
     * element#side-menu-toggle を Sagen.dom instance にします
     * @type {?Sagen.Dom}
     * @private
     */
    this.toggleDom = null;
    /**
     * element#page を Sagen.dom instance にします
     * @type {?Sagen.Dom}
     * @private
     */
    this.page = null;
    /**
     * element#side-menu-bg を Sagen.dom instance にします
     * @type {null|Sagen.Dom}
     * @private
     */
    this.bg = null;
    /**
     * bind onSynLoad
     * @type {function}
     */
    this.onSynLoad = this.onSynLoad.bind(this);
    /**
     * bind onSynNotice
     * @type {function}
     */
    this.onSynNotice = this.onSynNotice.bind(this);
    /**
     * bind onButtonClick
     * @type {function}
     */
    this.onButtonClick = this.onButtonClick.bind(this);
    /**
     * bind onBgClick
     * @type {function}
     */
    this.onBgClick = this.onBgClick.bind(this);
    /**
     * timer id - motion
     * @type {number}
     */
    this.motionTimer = 0;
    /**
     * timer id - scroll
     * @type {number}
     */
    this.scrollTImer = 0;
    /**
     * VK（バーチャル甲子園）flag
     * @type {boolean}
     * @since 2018-04-19 vk header - flag 追加
     */
    this.vk = vk;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 初期処理, after DOMReady で実行のこと
   */
  init() {
    // $adg.listener event handler set
    this.initAd();
    // -------------------------------------------------------------------------
    // 以下通常処理
    // this.listDom = new Sagen.Dom(document.getElementById(parts.list));
    // this.toggleDom = new Sagen.Dom(document.getElementById(parts.toggle));
    // this.page = document.getElementById(parts.page);
    // this.bg = document.getElementById(parts.bg);
    // since 2018-04-23 prefix
    this.listDom = new Sagen.Dom(document.getElementById(SynParts.list(this.vk)));
    this.toggleDom = new Sagen.Dom(document.getElementById(SynParts.toggle(this.vk)));
    this.page = document.getElementById(SynParts.page(this.vk));
    this.bg = document.getElementById(SynParts.bg(this.vk));
    if (Syn.test()) {
      // ログレベルの指定。出荷時は指定しない
      Synapse.Logger.logLevel = Synapse.Logger.DEBUG;
      // エンドポイントの指定。出荷時は指定しない
      Synapse.endpoint = 'https://synapse-api.stg.bitcellar.net';
    }

    // メニューインスタンスの作成
    // name: undotsushin_side_menu で作成
    const menu = new Synapse.Menu('undotsushin_side_menu');
    this.menu = menu;
    menu.addListener('service_list_load', this.onSynLoad);
    menu.addListener('service_notification_load', this.onSynNotice);
    menu.init();
    // open / close
    // button
    this.button.addEventListener('click', this.onButtonClick, false);
    // bg
    this.bg.addEventListener('click', this.onBgClick, false);
  }
  // ---------------------------------------------------------------------------------
  /**
   * $adg.listener event handler を設定する
   * https://github.com/bitcellar/synapse-sdk/blob/master/ad/Browser/Readme.md#%E5%AE%9F%E8%A3%85%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
   */
  initAd() {
    const $adg = self.$adg;

    // $adg 存在チェック
    if (!$adg || !$adg.listener) {
      setTimeout( () => {
        this.initAd();
      }, 25 );
      return;
    }
    const adg = this.adg;
    window.addEventListener($adg.listener.loaded, adg.loaded, false);
    window.addEventListener($adg.listener.failed, adg.failed, false);
  }
  /**
   * $adg.listener.loaded event handler
   */
  adgLoaded() {
    this.adgDispose();
    // flag ON
    this.$adgComing = true;

    // https://github.com/undotsushin/undotsushin/issues/704#issuecomment-221199981
    // inview event を追加する
    this.$side.on('inview', (event, isInView) => {
      if (isInView) {
        this.adTrack();
      }
    });
  }
  /**
   * $adg.listener.failed event handler
   */
  adgFailed() {
    this.adgDispose();
  }
  /**
   * $adg.listener event handler を removeEventListener する
   */
  adgDispose() {
    const $adg = self.$adg;
    const adg = this.adg;
    window.removeEventListener($adg.listener.loaded, adg.loaded);
    window.removeEventListener($adg.listener.failed, adg.failed);
  }
  // ---------------------------------------------------------------------------------
  /**
   * service_list_load event listener
   */
  onSynLoad() {
    const menu = this.menu;
    // const serviceList = document.getElementById( parts.service );
    const serviceList = document.getElementById(SynParts.service(this.vk));
    this.ready = true;

    // console.log( 'service_list_load ', menu.serviceList.serviceListItems.length );

    menu.serviceList.serviceListItems.forEach(function(item) {
      const listElement = document.createElement('li');
      const itemElement = item.toHTMLElement();

      // inview は、オブジェクトの各辺が描画領域に入ると報告されるが、そのうち最初の1回だけ
      // 受け取れるようにフラグを立てて管理する。
      let firstInView = false;

      // メニューの各アイテムがビューに入ったことをトラッキングする
      $(itemElement).on('inview', function(event, isInView) {
        if (isInView) {
          if (!firstInView) {
            item.trackShowEvent();
          }
          firstInView = true;
        } else {
          firstInView = false;
        }
      });

      listElement.appendChild(itemElement);
      serviceList.appendChild(listElement);
    });

    // メニューがあるときだけメニューエリアとロゴを表示させる
    const listItems = menu.serviceList.serviceListItems;
    if (listItems !== null && typeof listItems !== 'undefined' && listItems.length > 0) {
      // const box = document.getElementById(parts.box);
      const box = document.getElementById(SynParts.box(this.vk));
      if (box) {
        box.style.cssText = 'display: block;';
      }
      // const logo = document.getElementById(parts.logo);
      const logo = document.getElementById(SynParts.logo(this.vk));
      if (logo) {
        logo.style.cssText = 'display: block;';
      }
      // document.getElementById(parts.box).style.cssText = 'display: block;';
      // document.getElementById(parts.logo).style.cssText = 'display: block;';
    }
    // @since 2016-11-10
    // https://github.com/undotsushin/undotsushin/issues/1290
    // Syn.menu の自動オープンやめる（Web） #1290
    // とのことなのでチェックをやめる
    // ---
    // 訪問経験があるかを調べる
    // this.visitCheck();
  }
  // /**
  //  * 訪問経験があるかを調べ, cookie がなかったら menu を開く
  //  */
  // visitCheck() {
  //   if (!Syn.visited()) {
  //     // cookie が無いので menu を open する
  //     this.open( this.side, this.sideDom );
  //   }
  // }
  /**
   * service_notification_load event listener
   */
  onSynNotice() {
    // 通知が存在する場合としない場合で、通知ボタンのクラスを変える
    if (this.menu.serviceNotification.serviceNotificationItems.length > 0) {
      this.toggleDom.addClass('has-notification');
    } else {
      this.toggleDom.removeClass('has-notification');
    }
  }
  /**
   * button click event handler
   * @param {Event} event click event
   */
  onButtonClick(event) {
    event.preventDefault();
    if ( this.motion ) {
      // animation 中 -> 何もしない
      return;
    }
    const side = this.side;
    const sideDom = this.sideDom;

    if (sideDom.hasClass('open')) {
      // open -> close
      this.close(side, sideDom);
      // ga
      Syn.gaSend('close');
    } else {
      // close -> open
      this.open(side, sideDom);
      // ga
      Syn.gaSend('open');
    }
  }
  /**
   * bg click event handler
   * @param {Event} event bg click event
   */
  onBgClick(event) {
    event.preventDefault();
    // open -> close
    this.close(this.side, this.sideDom);
    // ga
    Syn.gaSend('close');
  }
  /**
   * side menu を開く
   * @param {Element} side side-menu-container element
   * @param {Sagen.Dom} sideDom side-menu-container Dom instance
   */
  open(side, sideDom) {
    this.motion = true;
    // let _this = this;

    // cookie set
    // menu を開くと cookie expire を延長
    // @since 2016-11-10
    // https://github.com/undotsushin/undotsushin/issues/1290
    // Syn.menu の自動オープンやめる（Web） #1290
    // とのことなので cookie set をやめる
    // Syn.visit();

    // 500ms 後に motion flag を false にします
    // setTimeout( function() {
    //   _this.motion = false;
    // }, 500 );
    clearTimeout(this.motionTimer);
    this.motionTimer = setTimeout(() => {
      this.motion = false;
    }, 500);

    // open 時の scroll y position 保存
    this.scrollTop = Scroll.y;

    // scroll 0 位置に移動
    // menu top を表示するため
    Scroll.motion(0, 0.4);

    // メニューを開いたことをトラッキングする
    this.menu.trackShowEvent();

    // open
    sideDom.addClass('open');
    // 外側のコンテナをでっかくする
    side.style.cssText = 'height: 9999px';
    // height 設定
    this.setHeight(side);

    // $adg.ads.trackShowEvent を 1回だけ実行
    this.adTrack();

    // fps start
    this.fps.on(Gasane.Fps.ENTER_FRAME, this.onUpdate);
    this.fps.start();
  }
  /**
   * $adg.ads.trackShowEvent を 1回だけ実行
   * https://github.com/bitcellar/synapse-sdk/blob/master/ad/Browser/Readme.md
   * https://github.com/undotsushin/undotsushin/issues/704#issuecomment-219010900
   */
  adTrack() {
    // $adg.listener.loaded を待つ
    if (!this.$adgComing) {
      return;
    }
    // 1回だけ
    if(this.firstAd) {
      return;
    }
    const $adg = self.$adg;
    if (!$adg || !$adg.ads || typeof $adg.ads.trackShowEvent !== 'function') {
      return;
    }
    // https://github.com/bitcellar/synapse-sdk/blob/master/ad/Browser/Readme.md
    // https://github.com/undotsushin/undotsushin/issues/704#issuecomment-219010900
    this.firstAd = true;
    $adg.ads.trackShowEvent();
    // track 送ったので inview event を unbind します
    this.$side.off('inview');
  }
  /**
   * menu open 時に高さをセットします
   * @param {Element} side side menu
   */
  setHeight(side) {
    // 存在チェック追加 - 2018-04-23
    if (!side && !this.page) {
      return;
    }
    // wrapper ul の高さ px 付き
    let heightPx = this.listDom ? this.listDom.style('height') : '0';
    let height = parseInt(heightPx, 10);
    const windowHeight = parseInt(window.innerHeight, 10);

    if (height < windowHeight || !this.ready) {
      // Syn.menu が読み込まれない or menu 高さが window 高さ以下の時は
      // window 高さ + 100px にする
      height = windowHeight + 100;
      // heightPx = height + 'px';
      heightPx = `${height}px`;
    }

    // 高さをセット
    // 存在チェック追加 - 2018-04-23
    if (side) {
      side.style.cssText = `height: ${heightPx}`;
    }
    // 本体の高さを同じにする
    // 存在チェック追加 - 2018-04-23
    if (this.page) {
      this.page.style.cssText = `overflow: hidden; width: 100%; height: ${heightPx}`;
    }
  }
  /**
   * side menu を閉じる
   * @param {Element} side side-menu-container element
   * @param {Sagen.Dom} sideDom `side-menu-container` Dom instance
   */
  close(side, sideDom) {
    this.motion = true;
    // let _this = this;
    const scrollTop = this.scrollTop;
    sideDom.addClass('closing');

    Scroll.motion(scrollTop, 0.2, 0.2);
    // Scroll.motion(_this.scrollTop, 0.2, 0.2);

    clearTimeout(this.scrollTImer);
    this.scrollTImer = setTimeout(() => {
      this.motion = false;
      sideDom.removeClass('closing');
      sideDom.removeClass('open');
      side.style.cssText = '';
      if (this.page) {
        this.page.style.cssText = '';
      }
    }, 400);

    this.fps.off(Gasane.Fps.ENTER_FRAME, this.onUpdate);
  }

  /**
   * Fps.ENTER_FRAME handler
   * 高さを計算します
   */
  onUpdate() {
    this.setHeight(this.side);
  }
}
