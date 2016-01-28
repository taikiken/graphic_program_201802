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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>代替画像パス</h3>
 * 全て static です
 */

var Empty = exports.Empty = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Empty(target) {
    (0, _classCallCheck3.default)(this, Empty);

    if (_symbol !== target) {

      throw new Error('Empty is static Class. not use new Empty().');
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

  (0, _createClass3.default)(Empty, null, [{
    key: 'IMG_SMALL',
    get: function get() {

      return 'images/common/thumb-noimage-70x70.png';
    }
    /**
     * img thumbnail 代替画像パス<br>
     * [Ex.] 記事一覧<br>
     * @readonly
     * @return {string} 代替画像パス【中】
     */

  }, {
    key: 'IMG_MIDDLE',
    get: function get() {

      return 'images/common/thumb-noimage-340x150.png';
    }
    /**
     * video thumbnail 代替画像パス<br>
     * [Ex.] sidebar video...
     * @readonly
     * @return {string} 代替画像パス【小】
     */

  }, {
    key: 'VIDEO_SMALL',
    get: function get() {

      return 'images/common/thumb-overlay-movie-340x150.png';
    }
    /**
     * **小** ユーザー・プロファイル・アイコン 代替画像パス (25x25)<br>
     * [Ex.] コメントとか
     * @readonly
     * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
     */

  }, {
    key: 'USER_PICTURE',
    get: function get() {

      return 'img/common/thumb-user.png';
    }
    /**
     * **大** ユーザー・プロファイル・アイコン 代替画像パス(50x50)<br>
     * [Ex.] コメントとか
     * @readonly
     * @return {string} 代替画像パス ユーザー・プロファイル・アイコン
     */

  }, {
    key: 'USER_PICTURE_FEATURE',
    get: function get() {

      return 'img/common/thumb-user-feature.png';
    }
    /**
     * hero-slider カバーグラデーション画像
     * @return {string} hero-slider カバーグラデーション画像パスを返します
     */

  }, {
    key: 'KV_OVERLAY',
    get: function get() {
      return 'assets/images/index/kv-overlay.png';
    }
  }]);
  return Empty;
}();