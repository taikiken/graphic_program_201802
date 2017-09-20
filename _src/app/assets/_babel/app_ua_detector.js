/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/20 - 23:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * @build @@buildTime
 */
'use strict';

const Sagen = self.Sagen;

/**
 * バナーを非表示にします
 * - DOMContentLoaded を待って body から `appbnr-enable` class を削除します
 */
const remove = () => {
  document.removeEventListener('DOMContentLoaded', remove);
  Sagen.Dom.removeClass(document.body, 'appbnr-enable');
};

/**
 * userAgent から `undotsushin-android`, `undotsushin-ios` を取得し html へクラスを追加します
 */
const detector = () => {
  // global object
  const ua = Sagen.Browser.ua();

  // android
  const android = ua.indexOf('undotsushin-android') !== -1;
  // ios
  const ios = ua.indexOf('undotsushin-ios') !== -1;

  if (!android && !ios) {
    return;
  }

  // html 取得
  const tags = document.getElementsByTagName('html');
  if (!tags || !tags.length) {
    return;
  }
  const html = tags[0];

  // add class
  if (android) {
    Sagen.Dom.addClass(html, 'undotsushin-android');
  } else if (ios) {
    Sagen.Dom.addClass(html, 'undotsushin-ios');
  }
  // @since 2017-09-11
  // remove app banner
  // document.addEventListener('DOMContentLoaded', onReady, false);
};

detector();

// -----------------------------
// hotfix - app banner 緊急削除 - 2017-09-15 戻す
// const remove = () => {
//   document.removeEventListener('DOMContentLoaded', remove);
//   Sagen.Dom.removeClass(document.body, 'appbnr-enable');
// };

// -----------------------------
// アプリダウンロード訴求のポップアップを表示 #2404
// @see https://github.com/undotsushin/undotsushin/issues/2404
// app banner 削除
document.addEventListener('DOMContentLoaded', remove, false);

// cookie

// url - blacklist

// script
