/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/02/09 - 19:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build @@buildTime
 */
'use strict';

// ushi

// UT
const UT = self.UT;
const Offset = UT.util.Offset;
// const Scroll = UT.util.Scroll;
const Elements = UT.util.Elements;

let container = null;
let elements = null;
let mom = null;

/**
 * scroll event handler, banner `fixed` or not
 */
const onScroll = () => {
  // console.log('onScroll', container.offset(), window.innerHeight, mom.offset());
  const offset = container.offset();
  const bottom = window.innerHeight;
  const momOffset = mom.offset();
  if (!elements.dom.hasClass('fixed')) {
    if (offset.bottom <= bottom) {
      elements.dom.addClass('fixed');
    }
  } else if (momOffset.top >= offset.top) {
    elements.dom.removeClass('fixed');
  }
};

/**
 * watch event
 */
const watch = () => {
  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', onScroll, false);
};

// banner
const target = document.getElementById('js-ushi__pr_app');
const targetMom = document.getElementById('js-ushi__mom');
if (target && targetMom) {
  container = new Offset(target);
  elements = new Elements(target);
  mom = new Offset(targetMom);
  watch();
}

// for only app webview
const flushMessage = () => {
  const message = document.getElementById('js-ushi__message');
  if (!message) {
    return;
  }
  const html = document.getElementsByTagName('html')[0];
  if (!html) {
    return;
  }
  const htmlElements = new Elements(html);
  // detect webview
  if (!htmlElements.dom.hasClass('undotsushin-ios') && !htmlElements.dom.hasClass('undotsushin-android')) {
    return;
  }
  if (location.search === '?display=entry') {
    const messageElements = new Elements(message);
    messageElements.dom.addClass('enable');
  }
};

flushMessage();
