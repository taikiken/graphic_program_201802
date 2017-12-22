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
//
//
// let _symbol = Symbol();

/**
 * 代替画像パスを取得します
 * - 記事画像、ユーザーアイコンなど未設定時の代替画像パス
 * - 全て static です
 */
export class Empty {
  // /**
  //  * 代替画像パス
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Empty is static Class. not use new Empty().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  // --------------
  // image
  /**
   * img thumbnail 代替画像パス 100x100
   * - [Ex.] sidebar ranking
   * @return {string} 代替画像パス【sidebar ranking】
   */
  static get THUMB_EMPTY() {
    return '/assets/images/common/thumb-empty-100x100.png';
  }
  /**
   * img thumbnail 代替画像パス 70x70
   * - [Ex.] headline, sidebar image...
   * @return {string} 代替画像パス【小】
   */
  static get IMG_SMALL() {
    return '/assets/images/common/thumb-noimage-70x70.png';
  }
  /**
   * img middle 代替画像パス - 記事一覧用 - 横長 - 16:9
   * - [Ex.] 記事一覧
   * @return {string} 代替画像パス【記事一覧】
   */
  static get IMG_MIDDLE() {
    // return '/assets/images/common/thumb-noimage-340x150.png';
    // @since 2016-09-01
    // https://github.com/undotsushin/undotsushin/issues/1053
    return '/assets/images/common/thumb-noimage-16x9-s.png';
  }
  /**
   * img large 代替画像パス
   * - [Ex.] スライドショー
   * @deprecated 2017-12-18 instead use {@link Empty.IMG_CAROUSEL}
   * @return {string} 代替画像パス【スライドショー】
   */
  static get IMG_LARGE() {
    return '/assets/images/common/thumb-pickup-empty.png';
  }
  /**
   * img large 代替画像パス - 750x320
   * - [Ex.] スライドショー
   * @return {string} 代替画像パス【スライドショー】
   * @since 2017-12-18
   */
  static get IMG_CAROUSEL() {
    // 正規画像に差し替える - 2017-12-22
    return '/assets/images/common/thumb-750x320.png';
  }
  // --------------
  // video
  /**
   * video thumbnail 代替画像パス【16 x 9】
   * - [Ex.] sidebar video...
   * @return {string} 代替画像パス【16 x 9】
   */
  static get VIDEO_THUMBNAIL() {
    return '/assets/images/common/thumb-16x9.png';
  }
  /**
   * video play button overlay【16 x 9】
   * - [Ex.] sidebar video...
   * @return {string} Video Play画像パス【16 x 9】
   */
  static get VIDEO_PLAY() {
    return '/assets/images/common/thumb-16x9-play.png';
  }
  /**
   * video play button overlay【640 x 400】
   * - [Ex.] pickup video...
   * @return {string} Video Play画像パス【Pickup】【640 x 400】
   */
  static get VIDEO_PICKUP_PLAY() {
    // 正規画像に差し替える - update 2017-12-22
    // return '/assets/images/common/thumb-640x400-play.png';
    return '/assets/images/common/thumb-750x320-play.png';
  }
  /**
   * video play button overlay sidebar small【16 x 9】
   * - [Ex.] sidebar video...
   * @return {string} Video Play画像パス【小】【16 x 9】
   */
  static get VIDEO_PLAY_SMALL() {
    return '/assets/images/common/thumb-16x9-play-s.png';
  }
  /**
   * video play button overlay sidebar small【1 x 1】
   * - [Ex.] headline video...
   * @return {string} Video Play画像パス【小】【1x1】
   */
  static get VIDEO_PLAY_SMALL_1X1() {
    return '/assets/images/common/thumb-1x1-play-s.png';
  }
  // --------------
  // user
  /**
   * **小** ユーザー・プロファイル・アイコン 代替画像パス (25x25)
   * - [Ex.] コメントとか
   * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
   */
  static get USER_PICTURE() {
    return '/assets/images/common/thumb-user.png';
  }
  /**
   * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)
   * - [Ex.] コメントとか
   * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
   */
  static get USER_PICTURE_FEATURE() {
    return '/assets/images/common/thumb-user-feature.png';
  }
  /**
   * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)透明
   * - [Ex.] コメントとか
   * @return {string} 代替透明画像パス ユーザー・プロファイル・アイコン
   */
  static get USER_EMPTY() {
    return '/assets/images/common/thumb-user-empty.png';
  }
  /**
   * ユーザー登録 sample avatar
   * @return {string} sample avatar image path
   */
  static get SETTING_AVATAR() {
    return '/assets/images/setting/thumb-avatar.png';
  }
  /**
   * hero-slider カバーグラデーション画像
   * @return {string} hero-slider カバーグラデーション画像パスを返します
   */
  static get KV_OVERLAY() {
    return '/assets/images/index/kv-overlay.png';
  }
  /**
   * キャッシュさせないパスを生成します
   * @param {string} path 元のパス
   * @returns {string} パスに?Date.now()をつけて返します
   */
  static refresh(path) {
    return `${path}?${Date.now()}`;
  }
}
