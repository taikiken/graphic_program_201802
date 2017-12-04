/*!
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 18:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * build @@buildTime
 * version @@version
 */
'use strict';

/**
 * UT library を使い実行します
 */
import SPPage from './SPPage';

/**
 * app アクセスの時に特別な className を html tag に追加します
 * - ios - undotsushin-ios
 * - android - undotsushin-android
 *
 *  = ではなく、含まれる、になります。match で判定してください
 * - iOS : undotsushin-ios
 * - Android : undotsushin-android
 * @see https://github.com/undotsushin/undotsushin/issues/2031
 * @see https://github.com/undotsushin/wiki/blob/master/%E4%BB%95%E6%A7%98/webview.md
 * @since 2017-07-10 BULL'S PICKS の表示切り替えをUA判定に切り替える #2031
 */
const detector = () => {
  // html 取得
  const tags = document.getElementsByTagName('html');
  // console.log('tags', tags, tags.length);
  if (!tags || !tags.length) {
    return;
  }
  const html = tags[0];
  // global object
  const Sagen = self.Sagen;
  const ua = Sagen.Browser.ua();

  // android
  const android = ua.indexOf('undotsushin-android') !== -1;
  // ios
  const ios = ua.indexOf('undotsushin-ios') !== -1;
  // add class
  if (android) {
    Sagen.Dom.addClass(html, 'undotsushin-android');
  } else if (ios) {
    Sagen.Dom.addClass(html, 'undotsushin-ios');
  }
};

detector();

// Page class をキックします
SPPage.init();
