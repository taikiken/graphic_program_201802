/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 14:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view
import {View} from '../../view/View';

// app
import {User} from '../../app/User';
import {Env} from '../../app/Env';

// util
import {Scroll} from '../../util/Scroll';
import {Loc} from '../../util/Loc';

// node
import {SPSynItemNode} from '../node/SPSynItemNode';
import {LogoutNode} from '../../node/modal/LogoutNode';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

// jQuery
let $ = self.jQuery;

// Synapse
let Synapse = self.Synapse;

// Sagen
let Sagen = self.Sagen;

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
class Syn {
  /**
   * Syn. menu を作成し open / close animation を実装します
   * @param {Element} button #menu-opener element
   * @param {Element} side #side-menu-container element
   */
  constructor( button:Element, side:Element ) {
    this._button = button;
    this._side = side;
    this._sideDom = new Sagen.Dom( side );
    this._menu = null;
    this._motion = false;
    this._y = 0;
    this._interval = 0;
    this._ready = false;
  }
  /**
   * 初期処理, after DOMReady で実行のこと
   */
  init():void {
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
  /**
   * service_list_load event listener
   */
  onLoad():void {
    let menu = this._menu;
    let serviceList = document.getElementById( parts.service );
    this._ready = true;

    console.log( 'service_list_load ', menu.serviceList.serviceListItems );

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
    } else {
      // close -> open
      this.open( side, sideDom );
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
  }
  /**
   * side menu を開く
   * @param {Element} side side-menu-container element
   * @param {Sagen.Dom} sideDom side-menu-container Dom instance
   */
  open( side:Element, sideDom:Sagen.Dom ):void {
    this._motion = true;
    let _this = this;

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
  }

  setHeight( side:Element ):void {
    // wrapper ul の高さ px 付き
    let heightPx = this._listDom.style( 'height' );
    let height = parseInt( heightPx, 10 );
    let windowHeight = parseInt( window.innerHeight, 10 );

    console.log( 'height ', height, windowHeight );

    if ( height < windowHeight || !this._ready ) {
      // Syn.menu が読み込まれない or menu 高さが window 高さ以下の時は
      // window 高さ + 100px にする
      height = windowHeight + 100;
      heightPx = height + 'px';

      console.log( 'height, heightPx ', height, heightPx );

    }

    // 高さをセット
    side.style.cssText = `height: ${heightPx}`;
    // 本体の高さを同じにする
    // this._page.style.cssText = `position: fixed; left: 0; top: 0; overflow: hidden; width: 100%; height: ${height}`;
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

    Scroll.motion( _this._y, 0, 0.4 );

    setTimeout( function() {
      _this._motion = false;
      sideDom.removeClass( 'closing' );
      sideDom.removeClass( 'open' );
      side.style.cssText = '';
      _this._page.style.cssText = '';
    }, 400 );

  }

  /**
   * 自身の script tag src query syn を探し '1' か否かを調べ真偽値を返します
   * @return {boolean} syn=1 かの真偽値を返します
   */
  static test():boolean {
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
}

/**
 * Syn. menu
 * <pre>
 * https://github.com/undotsushin/undotsushin/tree/feature/195-syn_menu_sp
 * https://github.com/undotsushin/undotsushin/issues/195
 * https://github.com/bitcellar/synapse-sdk/tree/master/javascript
 * http://www.undotsushin.com/syn-demo/
 * </pre>
 */
export class SPViewSyn extends View {
  /**
   * Syn. menu と slide in 機能を実装します
   * @param {Element} element login の有無で切り替える menu の基点
   * @param {Element} button menu opener element, menu-opener
   * @param {Element} menu slide in する menu element, side-menu-container
   * @param {Element} modal modal 基点 Element, logout modal 表示にしよう
   */
  constructor( element:Element, button:Element, menu:Element, modal:Element ) {
    super( element );
    this._button = button;
    this._menu = menu;
    this._modal = modal;
  }
  /**
   * rendering 開始
   */
  start():void {
    this.render();
  }
  /**
   * rendering
   */
  render():void {

    let modal = ReactDOM.render(
      <LogoutNode />,
      this._modal
    );

    ReactDOM.render(
      <SPSynItemNode
        sign={User.sign}
        modal={modal}
        callback={this.synapse.bind(this)}
      />,
      this.element
    );
  }
  /**
   * Syn. menu setup
   */
  synapse():void {
    let syn = new Syn( this._button, this._menu );
    syn.init();
  }
}
