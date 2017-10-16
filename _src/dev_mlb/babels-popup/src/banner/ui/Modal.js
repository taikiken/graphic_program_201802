/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 15:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// /**
//  * 動的挿入する `script` tag
//  * @see https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-330758911
//  */
// class Tag {
//   /**
//    * PC script tag
//    * @returns {Element} PC script tag
//    */
//   static pc() {
//     const script = document.createElement('script');
//     // eslint-disable-next-line max-len
//     script.innerHTML = 'googletag.cmd.push(function(){googletag.display("div-gpt-ad-1505887740744-0");});';
//     return script;
//   }
//   /**
//    * SP script tag
//    * @returns {Element} SP script tag
//    */
//   static sp() {
//     const script = document.createElement('script');
//     // eslint-disable-next-line max-len
//     script.innerHTML = 'googletag.cmd.push(function(){googletag.display("div-gpt-ad-1505887822751-0");});';
//     return script;
//   }
// }

// --------------------------------------
// common element
/**
 * div.modal-bg
 * @returns {Element} div.modal-bg
 */
const bg = () => {
  const element = document.createElement('div');
  element.className = 'modal-bg';
  element.id = 'js-modal-bg';
  return element;
};

/**
 * div.modal-intro-contents
 * @returns {Element} div.modal-intro-contents
 */
const contents = () => {
  const element = document.createElement('div');
  element.className = 'modal-intro-contents';
  return element;
};

/**
 * div.modal-intro-link
 * @returns {Element} div.modal-intro-link
 */
const link = () => {
  const element = document.createElement('div');
  element.className = 'modal-intro-link';
  return element;
};

/**
 * close button
 * @returns {Element} div.modal-intro-close
 */
const button = () => {
  const element = document.createElement('div');
  element.className = 'modal-intro-close';
  const a = document.createElement('a');
  a.className = 'modal-intro-close-btn';
  a.href = '#js-modal-bg';
  a.innerHTML = '閉じる';
  element.appendChild(a);
  return element;
};

// --------------------------------------
// sp
/**
 * SP modal container を作成し `body` へ `appendChild` します
 * @param {Element} modal root HTMLElement
 * @returns {{target: Element, close: Element, bgElement: Element}}
 * script append target element, close button Element, 背景
 */
const sp = (modal) => {
  const contentsElement = contents();
  const linkElement = link();
  // const scriptElement = document.createElement('script');
  // // eslint-disable max-len
  // scriptElement.innerHTML = `googletag.cmd.push(function() {
  //         googletag.defineSlot('/531683568/download-popup/download-popup-mobile', [300, 330], 'div-gpt-ad-1505887822751-0').addService(googletag.pubads());
  //         googletag.pubads().enableSingleRequest();
  //         googletag.enableServices();
  //       });`;
  // eslint-enable max-len
  // const target = document.createElement('div');
  // target.id = 'div-gpt-ad-1505887822751-0';
  // target.style.cssText = 'height:330px; width:300px;';
  const close = button();
  // ---
  // link
  // linkElement.appendChild(scriptElement);
  // linkElement.appendChild(target);
  // @see https://github.com/undotsushin/undotsushin/issues/2688
  // @since 2017-10-16 hard code する
  const a = document.createElement('a');
  a.href = `https://app.adjust.com/bm04c5?deep_link=sportsbull://action?url=${location.href}`;
  const img = document.createElement('img');
  img.src = '/assets/images/popup/cm_popup_0929_sp-1_preview.png';
  a.appendChild(img);
  linkElement.appendChild(a);
  // contents
  contentsElement.appendChild(linkElement);
  contentsElement.appendChild(close);
  // element
  const bgElement = bg();
  modal.appendChild(bgElement);
  modal.appendChild(contentsElement);
  // body
  document.body.appendChild(modal);
  // return
  return {
    // target,
    close,
    bgElement,
  };
};

// --------------------------------------
// pc
/**
 * PC modal container を作成し `body` へ `appendChild` します
 * @param {Element} modal root HTMLElement
 * @returns {{target: Element, close: Element, bgElement: Element}}
 * script append target element, close button Element, 背景
 */
const pc = (modal) => {
  const contentsElement = contents();
  const linkElement = link();
  // const scriptElement = document.createElement('script');
  // // eslint-disable max-len
  // scriptElement.innerHTML = `googletag.cmd.push(function() {
  //         googletag.defineSlot('/531683568/download-popup/download-popup-desktop', [580, 280], 'div-gpt-ad-1505887740744-0').addService(googletag.pubads());
  //         googletag.pubads().enableSingleRequest();
  //         googletag.enableServices();
  //       });`;
  // // eslint-enable max-len
  // const target = document.createElement('div');
  // target.id = 'div-gpt-ad-1505887740744-0';
  // target.style.cssText = 'height:280px; width:580px;';
  const close = button();
  // ---
  // link
  // linkElement.appendChild(scriptElement);
  // linkElement.appendChild(target);
  // @see https://github.com/undotsushin/undotsushin/issues/2688
  // @since 2017-10-16 hard code する
  const a = document.createElement('a');
  a.href = 'https://sportsbull.jp/about/';
  const img = document.createElement('img');
  img.src = '/assets/images/popup/cm_popup_0929_pc-1_preview.png';
  a.appendChild(img);
  linkElement.appendChild(a);
  // contents
  contentsElement.appendChild(linkElement);
  contentsElement.appendChild(close);
  // element
  const bgElement = bg();
  modal.appendChild(bgElement);
  modal.appendChild(contentsElement);
  // body
  document.body.appendChild(modal);
  // return
  return {
    // target,
    close,
    bgElement,
  };
};

// --------------------------------------
/**
 * modal 表示を準備します
 */
export default class Modal {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * SP modal element を作成し `Modal` instance を作成・実行します
   * @param {Element} modal root HTMLElement
   */
  static sp(modal) {
    // console.log('Modal.sp', modal);
    // sp make dom
    const { close, bgElement } = sp(modal);
    // instance
    // const instance = new Modal(modal, close, target, true, bgElement);
    const instance = new Modal(modal, close, true, bgElement);
    instance.start();
  }
  /**
   * PC modal element を作成し `Modal` instance を作成・実行します
   * @param {Element} modal root HTMLElement
   */
  static pc(modal) {
    // console.log('Modal.pc', modal);
    // pc make dom
    const { close, bgElement } = pc(modal);
    // instance
    // const instance = new Modal(modal, close, target, false, bgElement);
    const instance = new Modal(modal, close, false, bgElement);
    instance.start();
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * modal を準備します
   * @param {Element} modal root HTMLElement
   * @param {Element} close close button HTMLElement
   * @param {boolean} mobile sp flag
   * @param {Element} bgElement 背景 HTMLElement
   * @param {?Element} [target=null] script tag insert target HTMLElement
   */
  constructor(modal, close, mobile, bgElement, target = null) {
    /**
     * root HTMLElement
     * @type {Element}
     */
    this.modal = modal;
    /**
     * close button HTMLElement
     * @type {Element}
     */
    this.close = close;
    /**
     * script tag insert target HTMLElement
     * @type {?Element}
     */
    this.target = target;
    /**
     * sp flag
     * @type {boolean}
     */
    this.mobile = mobile;
    /**
     * 背景 HTMLElement
     * @type {Element}
     */
    this.bg = bgElement;
    /**
     * bind onClick - close button click event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * modal を開きます
   * - close button click event bind します
   * - {@link Tag} script を `target` property Element へ挿入します
   */
  start() {
    this.close.addEventListener('click', this.onClick, false);
    this.bg.addEventListener('click', this.onClick, false);
    this.modal.style.cssText = 'display: block;';
    // const script = this.mobile ? Tag.sp() : Tag.pc();
    // this.target.appendChild(script);
  }
  /**
   * close button click event handler
   * - modal 閉じます
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    this.close.removeEventListener('click', this.onClick);
    this.bg.removeEventListener('click', this.onClick);
    this.modal.style.cssText = '';
  }
}
