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

// moku/dom

class Tag {
  static pc() {
    const script = document.createElement('script');
    // eslint-disable-next-line max-len
    script.innerHTML = 'googletag.cmd.push(function(){googletag.display("div-gpt-ad-1505887740744-0");});';
    return script;
  }
  static sp() {
    const script = document.createElement('script');
    // eslint-disable-next-line max-len
    script.innerHTML = 'googletag.cmd.push(function(){googletag.display("div-gpt-ad-1505887822751-0");});';
    return script;
  }
}

const bg = () => {
  const element = document.createElement('div');
  element.className = 'modal-bg';
  element.id = 'js-modal-bg';
  return element;
};

const contents = () => {
  const element = document.createElement('div');
  element.className = 'modal-intro-contents';
  return element;
};

const link = () => {
  const element = document.createElement('div');
  element.className = 'modal-intro-link';
  return element;
};

const button = () => {
  const element = document.createElement('div');
  element.className = 'modal-intro-close';
  const a = document.createElement('a');
  a.className = 'modal-intro-close-btn';
  a.href = '#js-modal-bg';
  a.innerHTML = '閉じる';
  element.appendChild(a);
};

const pc = (modal) => {
  const contentsElement = contents();
  const linkElement = link();
  const scriptElement = document.createElement('script');
  // eslint-disable max-len
  scriptElement.innerHTML = `googletag.cmd.push(function() {
          googletag.defineSlot('/531683568/download-popup/download-popup-desktop', [580, 280], 'div-gpt-ad-1505887740744-0').addService(googletag.pubads());
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });`;
  // eslint-enable max-len
  const target = document.createElement('div');
  target.id = 'div-gpt-ad-1505887740744-0';
  target.style.cssText = 'height:280px; width:580px;';
  const close = button();
  // ---
  // link
  linkElement.appendChild(scriptElement);
  linkElement.appendChild(target);
  // contents
  contentsElement.appendChild(linkElement);
  contentsElement.appendChild(close);
  // element
  modal.appendChild(bg());
  modal.appendChild(contentsElement);
  // body
  document.body.appendChild(modal);
  // return
  return {
    target,
    close,
  };
};

export default class Modal {
  static sp(modal) {
    // todo make modal dom
    console.log('Modal.sp', modal);
  }
  static pc(modal) {
    // todo make modal dom
    console.log('Modal.pc', modal);
    const { close, target } = pc(modal);
    const instance = new Modal(modal, close, target, false);
    instance.start();
  }
  constructor(modal, close, target, sp) {
    this.modal = modal;
    this.close = close;
    this.target = target;
    this.onClick = this.onClick.bind(this);
    this.sp = sp;
  }
  start() {
    this.close.addEventListener('click', this.onClick, false);
    this.modal.style.cssText = 'display: block;';
    const script = this.sp ? Tag.sp : Tag.pc();
    this.target.appendChild(script);
  }
  onClick(event) {
    event.preventDefault();
    this.close.removeEventListener('click', this.onClick);
    this.modal.style.cssText = '';
  }
}
