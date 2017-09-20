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
import Elements from '../../moku/dom/Elements';

// net
import Visited from '../net/Visited';

export default class Modal {
  static sp(parent) {
    // todo make modal dom
    console.log('Modal.sp', parent);
  }
  static pc(parent) {
    // todo make modal dom
    console.log('Modal.pc', parent);
  }
  constructor(target, close) {
    this.elements = new Elements(target);
    this.close = close;
    this.onClick = this.onClick.bind(this);
  }
  start() {
    this.close.addEventListener('click', this.onClick, false);
    this.elements.classes.add('open');
  }
  onClick(event) {
    event.preventDefault();
    this.close.removeEventListener('click', this.onClick);
    Visited.arrive();
    this.elements.classes.remove('open');
  }
}
