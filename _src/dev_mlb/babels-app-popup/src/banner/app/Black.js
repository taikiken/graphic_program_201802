/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 15:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Classes from '../../moku/dom/Classes';

export default class Black {
  static list = [
    '/about',
    '/big6tv/live/2017a',
  ];
  static html() {
    const tags = document.getElementsByTagName('html');
    if (!tags || !tags.length) {
      return null;
    }
    const html = tags[0];
    if (!html) {
      return null;
    }
    return html;
  }
  static webview() {
    // check webview
    const html = Black.html();
    return html &&
      (Classes.has(html, 'undotsushin-ios') || Classes.has(html, 'undotsushin-android'));
  }
  static app() {
    // gunosy , newspass)
    return !!navigator.userAgent.match(/gunosy|newspass/);
  }
  static detect() {
    if (Black.webview() || Black.app()) {
      return true;
    }
    // check pathname with list
    const pathname = location.pathname;
    return Black.list.some(url => pathname.indexOf(url) === 0);
  }
}
