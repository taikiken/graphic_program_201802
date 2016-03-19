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
 * <h3>代替画像パス</h3>
 * 全て static です
 * 記事画像、ユーザーアイコンなど未設定時の代替画像パス
 */
export class Empty {
  /**
   * 代替画像パス
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
   * @return {string} 代替画像パス【小】
   */
  static get IMG_SMALL():string {

    return '/assets/images/common/thumb-noimage-70x70.png';

  }
  /**
   * img middle 代替画像パス<br>
   * [Ex.] 記事一覧<br>
   * @return {string} 代替画像パス【記事一覧】
   */
  static get IMG_MIDDLE():string {

    return '/assets/images/common/thumb-noimage-340x150.png';

  }
  /**
   * img large 代替画像パス<br>
   * [Ex.] スライドショー<br>
   * @return {string} 代替画像パス【スライドショー】
   */
  static get IMG_LARGE():string {

    // ToDo: デザインができたらパスを正しいものに変更する
    return '/assets/images/common/thumb-pickup-empty.png';

  }
  /**
   * video thumbnail 代替画像パス【16 x 9】<br>
   * [Ex.] sidebar video...
   * @return {string} 代替画像パス【16 x 9】
   */
  static get VIDEO_THUMBNAIL():string {

    // ToDo: デザインができたらパスを正しいものに変更する
    return '/assets/images/common/thumb-16x9.png';

  }
  /**
   * video play button overlay【16 x 9】<br>
   * [Ex.] sidebar video...
   * @return {string} 代替画像パス【小】【16 x 9】
   */
  static get VIDEO_PLAY():string {

    return '/assets/images/common/thumb-16x9-play.png';

  }
  /**
   * video play button overlay sidebar small【16 x 9】<br>
   * [Ex.] sidebar video...
   * @return {string} 代替画像パス【小】【16 x 9】
   */
  static get VIDEO_PLAY_SMALL():string {

    return '/assets/images/common/thumb-16x9-play-s.png';

  }
  /**
   * **小** ユーザー・プロファイル・アイコン 代替画像パス (25x25)<br>
   * [Ex.] コメントとか
   * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
   */
  static get USER_PICTURE():string {

    return '/assets/images/common/thumb-user.png';

  }
  /**
   * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)<br>
   * [Ex.] コメントとか
   * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
   */
  static get USER_PICTURE_FEATURE():string {

    return '/assets/images/common/thumb-user-feature.png';

  }
  /**
   * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)透明<br>
   * [Ex.] コメントとか
   * @return {string} 代替透明画像パス ユーザー・プロファイル・アイコン
   */
  static get USER_EMPTY():string {
    return '/assets/images/common/thumb-user-empty.png';
  }
  /**
   * ユーザー登録 sample avatar
   * @return {string} sample avatar image path
   */
  static get SETTING_AVATAR():string {
    return '/assets/images/setting/thumb-avatar.png';
  }
  /**
   * hero-slider カバーグラデーション画像
   * @return {string} hero-slider カバーグラデーション画像パスを返します
   */
  static get KV_OVERLAY():string {
    return '/assets/images/index/kv-overlay.png';
  }
}
