/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/23 - 15:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

/**
 * <h3> 代替画像パス</h3>
 * 全て static です
 */
export class Empty {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Empty is static Class. not use new Empty().` );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * img thumbnail 代替画像パス<br>
   * [Ex.] headline, sidebar image...
   * @readonly
   * @return {string} 代替画像パス【小】
   */
  static get IMG_SMALL():string {

    return 'img/common/empty.jpg';

  }
  /**
   * img thumbnail 代替画像パス<br>
   * [Ex.] 記事一覧<br>
   * @readonly
   * @return {string} 代替画像パス【中】
   */
  static get IMG_MIDDLE():string {

    return 'img/common/empty.jpg';

  }
  /**
   * video thumbnail 代替画像パス<br>
   * [Ex.] sidebar video...
   * @readonly
   * @return {string} 代替画像パス【小】
   */
  static get VIDEO_SMALL():string {

    return 'img/common/empty.jpg';

  }
  /**
   *  ユーザー・プロファイル・アイコン 代替画像パス<br>
   * [Ex.] コメントとか
   * @readonly
   * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
   */
  static get USER_PICTURE():string {

    return 'img/common/user_empty.jpg';

  }
}
