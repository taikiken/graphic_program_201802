/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/18 - 15:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * buildTime: @@buildTime
 */
// ----------------------------------------
// プライバシーポリシーをプラットフォームごとに分ける #2504
// https://github.com/undotsushin/undotsushin/issues/2504
// ----------------------------------------

/**
 * ```
 * # /about/privacy/index.html がリクエストされた時
 *
 * Android なら : /about/privacy/android.html へリダイレクト
 * iOS なら : /about/privacy/ios.html へリダイレクト
 * 上記以外 : そのまま表示
 *
 * # /about/privacy/summary.html がリクエストされた時
 *
 * Android なら : /about/privacy/android-summary.html へリダイレクト
 * iOS なら : /about/privacy/ios-summary.html へリダイレクト
 * 上記以外 : そのまま表示
 * ```
 */

/**
 * [native code] - navigator.userAgent
 * @type {string}
 */
const ua = navigator.userAgent;
/**
 * true: android app by userAgent
 * @type {boolean}
 */
const android = !!ua.match(/undotsushin-android/i);
/**
 * true: ios app by userAgent
 * @type {boolean}
 */
const ios = !!ua.match(/undotsushin-ios/i);

// summary
if (android) {
  location.href = '/about/privacy/android-summary.html';
} else if (ios) {
  location.href = '/about/privacy/ios-summary.html';
}
