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

const detector = () => {
  // html 取得
  const tags = document.getElementsByTagName('html');
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
