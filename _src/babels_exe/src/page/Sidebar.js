/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


let _symbol = Symbol();
let _scroll;

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <p>Sidebar ranking / video 表示</p>
 * 全て static です
 */
export class Sidebar {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'Sidebar is static Class. not use new Sidebar().' );

    }
  }
  /**
   * sidebar ranking / video rendering 開始
   * @param {string} [slug=all] category slug
   * @param {Boolean} [home=false] home か否かの真偽値
   */
  static start( slug:string = 'all', home:Boolean = false ):void {
    // ranking
    let rankingElement = Dom.ranking();
    if ( rankingElement !== null ) {
      let option = {};
      option[ UT.view.View.DID_MOUNT ] = Sidebar.didRanking;
      // home のみ ranking が2つ
      if ( home ) {
        option[ UT.view.View.BEFORE_RENDER ] = Sidebar.rankingBeforeRender;
      }
      let ranking = new UT.view.sidebar.ViewRanking( rankingElement, option, slug );
      ranking.start();
    }

    // video
    let videoElement = Dom.video();
    if ( videoElement !== null ) {
      let option = {};
      option[ UT.view.View.DID_MOUNT ] = Sidebar.didVideo;
      // home のみ videos が2つ
      if ( home ) {
        option[ UT.view.View.BEFORE_RENDER ] = Sidebar.videosBeforeRender;
      }
      let videos = new UT.view.sidebar.ViewVideos( videoElement, option, slug );
      videos.start();
    }
    
    // recommend
    let recommendElement = Dom.recommend();
    if ( recommendElement !== null ) {
      let option = {};
      let recommend = new UT.view.sidebar.ViewRecommend( recommendElement, option, slug );
      recommend.start();
    }

    // sidebar
    // とりあえず home のみスクロール追随させる
    if ( home ) {
      Sidebar.prepareMoving( home );
    }
  }

  /**
   * sidebar スクロール追随させる準備
   * @param {Boolean} home home か否かの真偽値
   */
  static prepareMoving( home ):void {
    // git branch で分岐しすぎていて関数がなくエラーにならないために存在チェックを行います
    let sidebar = !!Dom.sidebar ? Dom.sidebar() : null;
    let footer = !!Dom.footer ? Dom.footer() : null;
    // sidebar element & footer element がどちらも存在する時のみ実行する
    if ( sidebar !== null && footer !== null ) {
      _scroll = UT.util.Scroll.factory();
      Sidebar.moving( sidebar, footer, home );
    }
  }
  /**
   * sidebar をスクロール追随させます
   * @param {Element} sidebar sidebar element. #sidebar-moving-container
   * @param {Element} footer footer element. #footer-container'
   * @param {Boolean} home home(index)かを表す真偽値 true: home
   */
  static moving( sidebar:Element, footer:Element, home:Boolean ):void {

    let header = Dom.header();
    let nav = Dom.nav();
    let pickup = null;

    // home のみ pickup element が存在する
    if ( home ) {
      pickup = Dom.pickup();
    }

    let move = new UT.view.sidebar.Sidebar( sidebar, footer );
    
    // topから位置計算で必要なoffset対象elementをaddします
    Sidebar.add( move, header );
    Sidebar.add( move, nav );
    Sidebar.add( move, pickup );
    move.start();

    // window.onload 時に再計算させるために event を listener します
    window.addEventListener( 'load', Sidebar.load, false );
    // 表示時点で位置計算させます
    _scroll.fire();
  }
  /**
   * offset element を追加します, null の時は追加しません
   * @param {UT.view.sidebar.Sidebar} sidebar instance
   * @param {Element} [element=null] offset に追加する Element
   */
  static add( sidebar, element ):void {
    if ( element !== null ) {
      sidebar.addOffset( element );
    }
  }
  /**
   * window.onload event handler
   * ロード後に位置計算します
   */
  static load():void {
    window.removeEventListener( 'load', Sidebar.load );
    //  window.onload で位置計算させます
    _scroll.fire();
  }
  /**
   * ranking 下広告を表示させます
   */
  static didRanking():void {
    let ad = Dom.adRanking();
    // console.log( 'didRanking', ad );
    if ( ad !== null ) {
      ad.style.cssText = 'display: block;';
    }
  }
  /**
   * オススメ動画 下広告を表示させます
   */
  static didVideo():void {
    let ad = Dom.adVideo();
    // console.log( 'didVideo', ad );
    if ( ad !== null ) {
      ad.style.cssText = 'display: block;';
    }
  }
  // -------------------------------------------------------
  /**
   * home のみ
   * ranking clone を作成します
   * @param {Array<Object>} articles clone 元生成に使用した JSON 配列
   */
  static rankingBeforeRender( articles:Array<Object> ):void {
    // ranking
    let rankingElement = Dom.ranking2();

    if ( rankingElement !== null ) {
      let option = {};
      option[ UT.view.View.DID_MOUNT ] = Sidebar.didRanking2;
      let ranking = new UT.view.sidebar.ViewRanking( rankingElement, option );
      ranking.render( articles );
    }
  }

  /**
   * home のみ
   * videos clone を作成します
   * @param {Array<Object>} articles articles clone 元生成に使用した JSON 配列
   */
  static videosBeforeRender( articles:Array<Object> ):void {
    // video
    let videoElement = Dom.video2();

    if ( videoElement !== null ) {
      let option = {};
      option[ UT.view.View.DID_MOUNT ] = Sidebar.didVide2;
      let videos = new UT.view.sidebar.ViewVideos( videoElement, option );
      videos.render( articles );
    }
  }
  /**
   * ranking 下広告を表示させます 2
   */
  static didRanking2():void {
    let ad = Dom.adRanking2();
    // console.log( 'didRanking', ad );
    if ( ad !== null ) {
      ad.style.cssText = 'display: block;';
    }
  }
  /**
   * オススメ動画 下広告を表示させます 2
   */
  static didVideo2():void {
    let ad = Dom.adVideo2();
    // console.log( 'didVideo', ad );
    if ( ad !== null ) {
      ad.style.cssText = 'display: block;';
    }
  }
}
