/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/04/19 - 15:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * @@buildTime
 */
'use strict';
const document = window.document;
const Sagen = window.Sagen;
/**
 * script#js-content_single_iframe - 本JSファイルタグ data-id から記事idを取得します
 * @type {Element}
 */
const script = document.getElementById('js-content_single_iframe');
/**
 * data-id 属性値 - 記事id
 * @type {number}
 */
const id = script && script.dataset ? parseInt(script.dataset.id, 10) : 0;

// /**
//  * desktop|mobile 端末判定文字
//  * @type {string}
//  */
// const device = 'desktop';
/**
 * iframe height に加味する offset 値
 * @type {number}
 */
const offset = Sagen.Browser.Mobile.phone() ? 0 : 21;
/**
 * previos iframe height
 * @type {number}
 */
let prevHeight = -1;
/**
 * postMessage を通じ iframe height と 記事id を通知します
 * @param {number} height iframe height
 */
const sendMessage = (height) => {
  window.parent.postMessage({
    height,
    id,
  }, '/');
};
/**
 * document.body.scrollHeight, document.documentElement.clientHeight, window.innerHeight, document.body.scrollHeight, document.documentElement.clientHeight, window.innerHeight
 * から
 * iframe height を計算し前回高さと違っていれば `sentMessage` へ高さを通知実行します
 */
const resize = () => {
  const rect = document.body.getBoundingClientRect();
  const height = Math.ceil(Math.max(document.body.scrollHeight, document.documentElement.clientHeight, window.innerHeight, rect.height));
  // console.log('iFrame.resize id:', id, document.body.scrollHeight, document.documentElement.clientHeight, window.innerHeight, rect.height);
  if (prevHeight === height) {
    return;
  }
  prevHeight = height;
  sendMessage(height);
};
/**
 * div#js-single-iframe
 * @type {Element}
 */
const singleFrame = document.getElementById('js-single-iframe');
let count = 0;
/**
 * div#js-single-iframe ClientRect から高さを計算し前回高さと違っていれば `sentMessage` へ高さを通知実行します
 * 同じならば 5回だけ 1秒後に再計算します
 */
const frameHeight = () => {
  if (!singleFrame) {
    return;
  }
  const rect = singleFrame.getBoundingClientRect();
  const height = Math.ceil(rect.height + offset);

  if (prevHeight === height) {
    if (count < 5) {
      count += 1;
      setTimeout(frameHeight, 1000);
    }
    return;
  }
  // console.log('iFrame.frameHeight id:', id, height, prevHeight, document.body.scrollHeight);
  prevHeight = height;
  sendMessage(height);
};
/**
 * window.onload event handler
 * iframe 高さを計算します
 * - resize 実行
 * - frameHeight を 1秒後に実行
 */
const onLoad = () => {
  window.removeEventListener('load', onLoad);
  resize();
  setTimeout(frameHeight, 1000);
  setTimeout(() => {
    Sagen.Dom.removeClass(document.body, 'iframe-loading');
  }, 500);
};
window.addEventListener('load', onLoad, false);
// ----------------------------
/**
 * iframe 内 a tag で target 属性がない or `_self` の時に `target='_top'` にする
 */
const anchorUpdate = () => {
  const anchors = singleFrame.getElementsByTagName('a');
  for (const anchor of anchors) {
    const target = anchor.target;
    if (!target || target === '_self') {
      anchor.target = '_top';
    }
  }
};
anchorUpdate();
