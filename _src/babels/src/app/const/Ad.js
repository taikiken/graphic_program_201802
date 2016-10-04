/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2016/03/31
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
import {Loc} from '../../util/Loc';

let _symbol = Symbol();

/**
 * 広告接続先
 */
export class Ad {
  /**
   * <p>広告接続先 を管理します</p>
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( 'Ad is static Class. not use new Ad().' );

    }

  }
  /**
   * ID
   * @return {string} __TARGET_ID__ を返します
   */
  static get ID():string {
    return '__TARGET_ID__';
  }
  // /**
  //  * 株式会社運動通信社 運動通信_SPWeb - 一面 - ヘッドライン下部(フリー型) 40724
  //  * @returns {string} ヘッドライン下部(フリー型)
  //  */
  // static get SP_40724():string {
  //   return `${Ad.host()}/sdk/js/adg-script-loader.js?id=35255&targetID=adg_35255&displayid=2&adType=INFEED&async=true&tagver=2.0.0`;
  // }
  /**
   * 株式会社運動通信社 運動通信_SPWeb - 一覧 - 記事一覧内(フリー型) 40713
   * @returns {string} 一覧 - 記事一覧内(フリー型)
   */
  static get SP_40713():string {
    return `${Ad.host()}/sdk/js/adg-script-loader.js?id=35244&targetID=${Ad.ID}&displayid=2&adType=INFEED&async=true&tagver=2.0.0`;
  }
  // /**
  //  * 株式会社運動通信社 運動通信_SPWeb - 詳細 - 記事下(フリー型) 40714
  //  * @returns {string} 詳細 - 記事下(フリー型)
  //  */
  // static get SP_40714():string {
  //   return `${Ad.host()}/sdk/js/adg-script-loader.js?id=35245&targetID=adg_35245&displayid=2&adType=INFEED&async=true&tagver=2.0.0`;
  // }
  /**
   * 株式会社運動通信社 運動通信_SPWeb - 詳細 - 公式コメンテーター一覧下(フリー型) 40680
   * @returns {string} 詳細 - 公式コメンテーター一覧下(フリー型)
   */
  static get SP_40680():string {
    return `${Ad.host()}/sdk/js/adg-script-loader.js?id=35208&targetID=${Ad.ID}&displayid=3&adType=INFEED&async=true&tagver=2.0.0`;
  }
  /**
   * 株式会社運動通信社 運動通信_SPWeb - 詳細 - みんなのコメント一覧下(フリー型) 40681
   * @returns {string} 詳細 - みんなのコメント一覧下(フリー型)
   */
  static get SP_40681():string {
    return `${Ad.host()}/sdk/js/adg-script-loader.js?id=35209&targetID=${Ad.ID}&displayid=3&adType=INFEED&async=true&tagver=2.0.0`;
  }
  // ----------------
  // alias
  /**
   * alias SP_40713
   * 記事一覧内
   * @returns {string} 記事一覧内 Ad
   */
  static get SP_NEWS():string {
    return Ad.SP_40713;
  }
  /**
   * alias SP_40680
   * 公式コメンテーター一覧下
   * @returns {string} 公式コメンテーター一覧下 Ad
   */
  static get SP_OFFICIAL():string {
    return Ad.SP_40680;
  }
  /**
   * alias SP_40681
   * みんなのコメント一覧下
   * @returns {string} みんなのコメント一覧下 Ad
   */
  static get SP_NORMAL():string {
    return Ad.SP_40681;
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 接続ホストの プロトコル で socdm の接続先を変えます
   * @return {string} http / https 接続先を返します
   */
  static host():string {
    switch ( Loc.protocol ) {
      case 'https:':
        return Ad.ssl();
      case 'http:':
      default:
        return 'http://i.socdm.com';
    }
  }
  /**
   * `socdm` ssl 接続先を取得します
   * @return {string} `socdm` ssl 接続先 `https://ssl.socdm.com` を返します
   */
  static ssl():string {
    return 'https://ssl.socdm.com';
  }
  /**
   * script tag を生成し返します
   * @param {string} path script.src path
   * @param {string} id target element id
   * @returns {Element} script tag を返します
   */
  static make( path:string, id:string ):Element {
    let div = document.createElement('div');
    let script = document.createElement( 'script' );
    script.src = path.split( Ad.ID ).join( id );
    div.appendChild(script);
    // return script;
    return div;
  }

  /**
   * ストリーム広告をscript tag を生成し返します
   * @since 2016-06-06
   * @param {string} id target element id
   * @param {string} ad ストリーム広告 ID
   * @return {Element} div でラップし script tag を返します
   */
  static makeStream( id:string, ad:string ):Element {
    let div = document.createElement('div');
    let script = document.createElement( 'script' );
    script.src = `${Ad.host()}/sdk/js/adg-script-loader.js?id=${ad}&targetID=${id}&displayid=2&adType=INFEED&async=true&tagver=2.0.0`;
    // @since 2016-10-03 changed
    // @see https://github.com/undotsushin/undotsushin/issues/1125#issuecomment-251032265
    // script.src = 'http://i.socdm.com/sdk/js/adg-script-loader.js?id=42708&targetID=adg_42708&displayid=2&adType=INFEED&async=false&tagver=2.0.0';
    div.appendChild(script);
    // return script;
    return div;
  }
}
