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
let _symbol = Symbol();

export class Ad {
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( 'Ad is static Class. not use new Ad().' );

    }

  }

  /**
   * 株式会社運動通信社 運動通信_SPWeb - 一面 - ヘッドライン下部(フリー型) 40724
   * @returns {string} ヘッドライン下部(フリー型)
   */
  static get SP_40724():string {
    return '//i.socdm.com/sdk/js/adg-script-loader.js?id=35255&targetID=adg_35255&displayid=2&adType=INFEED&async=false&tagver=2.0.0';
  }
  /**
   * 株式会社運動通信社 運動通信_SPWeb - 一覧 - 記事一覧内(フリー型) 40713
   * @returns {string} 一覧 - 記事一覧内(フリー型)
   */
  static get SP_40713():string {
    return '//i.socdm.com/sdk/js/adg-script-loader.js?id=35244&targetID=__TARGET_ID__&displayid=2&adType=INFEED&async=true&tagver=2.0.0';
  }
  /**
   * 株式会社運動通信社 運動通信_SPWeb - 詳細 - 記事下(フリー型) 40714
   * @returns {string} 詳細 - 記事下(フリー型)
   */
  static get SP_40714():string {
    return '//i.socdm.com/sdk/js/adg-script-loader.js?id=35245&targetID=adg_35245&displayid=2&adType=INFEED&async=false&tagver=2.0.0';
  }
  /**
   * 株式会社運動通信社 運動通信_SPWeb - 詳細 - 公式コメンテーター一覧下(フリー型) 40680
   * @returns {string} 詳細 - 公式コメンテーター一覧下(フリー型)
   */
  static get SP_40680():string {
    return '//i.socdm.com/sdk/js/adg-script-loader.js?id=35208&targetID=__TARGET_ID__&displayid=3&adType=INFEED&async=true&tagver=2.0.0';
  }
  /**
   * 株式会社運動通信社 運動通信_SPWeb - 詳細 - みんなのコメント一覧下(フリー型) 40681
   * @returns {string} 詳細 - みんなのコメント一覧下(フリー型)
   */
  static get SP_40681():string {
    return '//i.socdm.com/sdk/js/adg-script-loader.js?id=35209&targetID=__TARGET_ID__&displayid=3&adType=INFEED&async=true&tagver=2.0.0';
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
   * script tag を生成し返します
   * @param {string} path script.src path
   * @param {string} id target element id
   * @returns {Element} script tag を返します
   */
  static make( path:string, id:string ):Element {
    let div = document.createElement('div');
    let script = document.createElement( 'script' );
    script.src = path.split( '__TARGET_ID__' ).join( id );
    div.appendChild(script);
    // return script;
    return div;
  }
}