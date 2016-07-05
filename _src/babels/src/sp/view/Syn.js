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
import {Scroll} from '../../util/Scroll';
import {Loc} from '../../util/Loc';
import {Time} from '../../util/Time';

// net
import {Cookie} from '../../net/Cookie';

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// jQuery
let $ = self.jQuery;

// Synapse
let Synapse = self.Synapse;

// Sagen
let Sagen = self.Sagen;

// Gasane
let Gasane = self.Gasane;

let parts = {
  page: 'page',
  service: 'synapse-service-list',
  box: 'synapse-service-list-outer-box',
  logo: 'synapse-logo-box',
  sideMenu: 'side-menu',
  bg: 'side-menu-bg',
  list: 'side-menu-list',
  // button
  toggle: 'side-menu-toggle',
  // modal
  modal: 'modal-container'
};

// inner class
/**
 * Syn.menu
 */
export class Syn {
  /**
   * Syn. menu を作成し open / close animation を実装します
   * @param {Element} button #menu-opener element
   * @param {Element} side #side-menu-container element
   */
  constructor( button:Element, side:Element ) {
    /**
     * element#menu-opener, menu を開くボタン
     * @type {Element}
     * @private
     */
    this._button = button;
    /**
     * #side-menu-container element, サイドバーメニュー
     * @type {Element}
     * @private
     */
    this._side = side;
    /**
     * side element を jQuery object へ
     * @type {HTMLElement|jQuery}
     * @private
     */
    this._$side = $( side );
    /**
     * #side-menu-container element を Sagen.Dom instance へ
     * addClass とか getStyle とかできるから
     * @type {Sagen.Dom}
     * @private
     */
    this._sideDom = new Sagen.Dom( side );
    /**
     * Synapse.Menu instance, Syn. menu のコントローラー（多分）
     * @type {null|Synapse.Menu}
     * @private
     */
    this._menu = null;
    /**
     * open / close の animation 中フラッグ
     * @type {boolean}
     * @private
     */
    this._motion = false;
    /**
     * スクロール位置
     * open 時にその前の scroll 位置を保存し close で復元するために使用します
     * @type {number}
     * @private
     */
    this._y = 0;
    /**
     * Syn. のイベント: service_list_load が発火しメニュー関連の準備ができた時に true にセットされます
     * @type {boolean}
     * @private
     */
    this._ready = false;

    // fps
    // whole(#page) style が消える???対策
    /**
     * update event handler を bind this し this 参照をキープします
     * @type {Function}
     * @private
     */
    this._boundUpdate = this.update.bind( this );
    /**
     * 連続実行(update)するための Fps instance
     * fps 1 で実行されます
     * @type {Gasane.Fps}
     * @private
     */
    this._fps = new Gasane.Fps( 1 );
    /**
     * $adg.ads.trackShowEvent を 1回だけ行うためのフラッグ
     * @type {boolean}
     * @private
     */
    this._firstAd = false;
    /**
     * $adg.listener.loaded 完了用の flag
     * @type {boolean}
     * @private
     */
    this._$adgComing = false;
    /**
     * $adg.listener event handler
     * @type {{loaded: *, fail: *}}
     * @private
     */
    this._adg = {
      loaded: this.adgLoaded.bind( this ),
      failed: this.adgFailed.bind( this )
    };
    /**
     * element#side-menu-list を Sagen.dom instance にします
     * @type {null|Sagen.Dom}
     * @private
     */
    this._listDom = null;
    /**
     * element#side-menu-toggle を Sagen.dom instance にします
     * @type {null|Sagen.Dom}
     * @private
     */
    this._toggleDom = null;
    /**
     * element#page を Sagen.dom instance にします
     * @type {null|Sagen.Dom}
     * @private
     */
    this._page = null;
    /**
     * element#side-menu-bg を Sagen.dom instance にします
     * @type {null|Sagen.Dom}
     * @private
     */
    this._bg = null;
  }
  /**
   * 初期処理, after DOMReady で実行のこと
   */
  init():void {
    // $adg.listener event handler set
    this.initAd();

    // -------------------------------------------------------------------------
    // 以下通常処理
    this._listDom = new Sagen.Dom( document.getElementById( parts.list ) );
    this._toggleDom = new Sagen.Dom( document.getElementById( parts.toggle ) );
    this._page = document.getElementById( parts.page );
    this._bg = document.getElementById( parts.bg );

    if ( Syn.test() ) {
      // ログレベルの指定。出荷時は指定しない
      Synapse.Logger.logLevel = Synapse.Logger.DEBUG;

      // エンドポイントの指定。出荷時は指定しない
      Synapse.endpoint = 'https://synapse-api.stg.bitcellar.net';
    }

    // メニューインスタンスの作成
    // name: undotsushin_side_menu で作成
    let menu = new Synapse.Menu('undotsushin_side_menu');
    this._menu = menu;
    menu.addListener( 'service_list_load', this.onLoad.bind( this ) );
    menu.addListener( 'service_notification_load', this.onNotice.bind( this ) );

    menu.init();

    // open / close
    // button
    this._button.addEventListener( 'click', this.buttonClick.bind( this ), false );

    // bg
    this._bg.addEventListener( 'click', this.bgClick.bind( this ), false );
  }
  // ---------------------------------------------------------------------------------
  /**
   * $adg.listener event handler を設定する
   * https://github.com/bitcellar/synapse-sdk/blob/master/ad/Browser/Readme.md#%E5%AE%9F%E8%A3%85%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
   */
  initAd():void {
    const $adg = self.$adg;

    // $adg 存在チェック
    if ( !$adg || !$adg.listener ) {
      setTimeout( () => {
        this.initAd();
      }, 25 );
      return;
    }

    const adg = this._adg;
    window.addEventListener( $adg.listener.loaded, adg.loaded, false );
    window.addEventListener( $adg.listener.failed, adg.failed, false );
  }

  /**
   * $adg.listener.loaded event handler
   */
  adgLoaded():void {
    this.adgDispose();
    // flag ON
    this._$adgComing = true;

    // https://github.com/undotsushin/undotsushin/issues/704#issuecomment-221199981
    // inview event を追加する
    this._$side.on( 'inview', ( event, isInView ) => {
      if (isInView) {
        this.adTrack();
      }
    } );
  }
  /**
   * $adg.listener.failed event handler
   */
  adgFailed():void {
    this.adgDispose();
  }
  /**
   * $adg.listener event handler を removeEventListener する
   */
  adgDispose():void {
    const $adg = self.$adg;
    const adg = this._adg;
    window.removeEventListener( $adg.listener.loaded, adg.loaded );
    window.removeEventListener( $adg.listener.failed, adg.failed );
  }
  // ---------------------------------------------------------------------------------
  /**
   * service_list_load event listener
   */
  onLoad():void {
    let menu = this._menu;
    let serviceList = document.getElementById( parts.service );
    this._ready = true;

    // console.log( 'service_list_load ', menu.serviceList.serviceListItems.length );

    menu.serviceList.serviceListItems.forEach( function( item ) {
      var listElement = document.createElement( 'li' );
      var itemElement = item.toHTMLElement();

      // inview は、オブジェクトの各辺が描画領域に入ると報告されるが、そのうち最初の1回だけ
      // 受け取れるようにフラグを立てて管理する。
      var firstInView = false;

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
    let listItems = menu.serviceList.serviceListItems;

    if ( listItems !== null && typeof listItems !== 'undefined' && listItems.length > 0 ) {

      document.getElementById( parts.box ).style.cssText = 'display: block;';
      document.getElementById( parts.logo ).style.cssText = 'display: block;';

    }

    // 訪問経験があるかを調べる
    this.visitCheck();

  }
  /**
   * 訪問経験があるかを調べ, cookie がなかったら menu を開く
   */
  visitCheck() {
    if ( !Syn.visited() ) {
      // cookie が無いので menu を open する
      this.open( this._side, this._sideDom );
    }
  }
  /**
   * service_notification_load event listener
   */
  onNotice():void {
    // 通知が存在する場合としない場合で、通知ボタンのクラスを変える
    if ( this._menu.serviceNotification.serviceNotificationItems.length > 0 ) {

      this._toggleDom.addClass('has-notification');

    } else {

      this._toggleDom.removeClass('has-notification');

    }
  }
  /**
   * button click event handler
   * @param {Event} event click event
   */
  buttonClick( event:Event ):void {
    event.preventDefault();

    if ( this._motion ) {
      // animation 中 -> 何もしない
      return;
    }

    let side = this._side;
    let sideDom = this._sideDom;

    if ( sideDom.hasClass( 'open' ) ) {
      // open -> close
      this.close( side, sideDom );
      // ga
      Syn.gaSend('close');
    } else {
      // close -> open
      this.open( side, sideDom );
      // ga
      Syn.gaSend('open');
    }

  }
  /**
   * bg click event handler
   * @param {Event} event bg click event
   */
  bgClick( event:Event ):void {
    event.preventDefault();
    // open -> close
    this.close( this._side, this._sideDom );
    // ga
    Syn.gaSend('close');
  }
  /**
   * side menu を開く
   * @param {Element} side side-menu-container element
   * @param {Sagen.Dom} sideDom side-menu-container Dom instance
   */
  open( side:Element, sideDom:Sagen.Dom ):void {
    this._motion = true;
    let _this = this;

    // cookie set
    // menu を開くと cookie expire を延長
    Syn.visit();

    // 500ms 後に motion flag を false にします
    setTimeout( function() {
      _this._motion = false;
    }, 500 );

    // open 時の scroll y position 保存
    this._y = Scroll.y;

    // scroll 0 位置に移動
    // menu top を表示するため
    Scroll.motion( 0, 0.4 );

    // メニューを開いたことをトラッキングする
    this._menu.trackShowEvent();

    // open
    sideDom.addClass( 'open' );
    // 外側のコンテナをでっかくする
    side.style.cssText = 'height: 9999px';
    // height 設定
    this.setHeight( side );

    // $adg.ads.trackShowEvent を 1回だけ実行
    this.adTrack();

    // fps start
    this._fps.on( Gasane.Fps.ENTER_FRAME, this._boundUpdate );
    this._fps.start();
  }
  /**
   * $adg.ads.trackShowEvent を 1回だけ実行
   * https://github.com/bitcellar/synapse-sdk/blob/master/ad/Browser/Readme.md
   * https://github.com/undotsushin/undotsushin/issues/704#issuecomment-219010900
   */
  adTrack():void {
    // $adg.listener.loaded を待つ
    if ( !this._$adgComing ) {
      return;
    }
    // 1回だけ
    if( this._firstAd ) {
      return;
    }

    const $adg = self.$adg;

    if ( !$adg || !$adg.ads || typeof $adg.ads.trackShowEvent !== 'function' ) {
      return;
    }

    // https://github.com/bitcellar/synapse-sdk/blob/master/ad/Browser/Readme.md
    // https://github.com/undotsushin/undotsushin/issues/704#issuecomment-219010900
    this._firstAd = true;
    $adg.ads.trackShowEvent();

    // track 送ったので inview event を unbind します
    this._$side.off( 'inview' );
  }
  /**
   * menu open 時に高さをセットします
   * @param {Element} side side menu
   */
  setHeight( side:Element ):void {
    // wrapper ul の高さ px 付き
    let heightPx = this._listDom.style( 'height' );
    let height = parseInt( heightPx, 10 );
    let windowHeight = parseInt( window.innerHeight, 10 );

    if ( height < windowHeight || !this._ready ) {
      // Syn.menu が読み込まれない or menu 高さが window 高さ以下の時は
      // window 高さ + 100px にする
      height = windowHeight + 100;
      heightPx = height + 'px';
    }

    // 高さをセット
    side.style.cssText = `height: ${heightPx}`;
    // 本体の高さを同じにする
    this._page.style.cssText = `overflow: hidden; width: 100%; height: ${heightPx}`;
  }
  /**
   * side menu を閉じる
   * @param {Element} side side-menu-container element
   * @param {Sagen.Dom} sideDom side-menu-container Dom instance
   */
  close( side:Element, sideDom:Sagen.Dom ):void {
    this._motion = true;
    let _this = this;

    sideDom.addClass( 'closing' );

    Scroll.motion( _this._y, 0.2, 0.2 );

    setTimeout( function() {
      _this._motion = false;
      sideDom.removeClass( 'closing' );
      sideDom.removeClass( 'open' );
      side.style.cssText = '';
      _this._page.style.cssText = '';
    }, 400 );

    this._fps.off( Gasane.Fps.ENTER_FRAME, this._boundUpdate );

  }

  /**
   * Fps.ENTER_FRAME handler
   * 高さを計算します
   */
  update():void {
    this.setHeight( this._side );
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 自身の script tag src query syn を探し '1' か否かを調べ真偽値を返します
   * @return {Boolean} syn=1 かの真偽値を返します
   */
  static test():Boolean {
    let scripts = document.getElementsByTagName( 'head' )[ 0 ].getElementsByTagName( 'script' );
    let search;

    for ( let script of scripts ) {
      if ( !script.src || script.src.indexOf( 'main.bundle.js' ) === -1 ) {
        continue;
      }

      let src = script.src;
      search = src.split('?' ).pop();
    }
    // console.log( 'test search ', search );
    if ( typeof search === 'undefined' || search === '' ) {
      return false;
    }

    let queries = Loc.parse( search );
    // console.log( 'test queries ', queries );
    if ( !queries.hasOwnProperty( 'syn' ) ) {
      return false;
    } else {
      return queries.syn === '1';
    }

  }
  /**
   * 訪問経験があるかを cookie から調べます
   * @return {Boolean} 訪問経験があるかの真偽値を返します
   */
  static visited():Boolean {
    return parseInt( Cookie.get( Cookie.SYN ), 10 ) === 1;
  }
  /**
   * 訪問 cookie をセットします
   * @return {Boolean} セット成功可否を返します
   */
  static visit():Boolean {
    // 2 weeks set
    return Cookie.save( '1', Cookie.SYN, Time.later( 14 ) );
  }
  /**
   * GA 計測タグ を送信します
   * @param {string} mode open | close どちらk
   */
  static gaSend( mode:string ):void {
    // ----------------------------------------------
    // GA 計測タグ
    // Syn.menu表示 / Syn.menuクローズ
    Ga.add( new GaData('Syn.gaSend', 'sidemenu', mode, '', 0, true ) );
    // ----------------------------------------------
  }
}
