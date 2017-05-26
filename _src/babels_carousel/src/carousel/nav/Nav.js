/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Controller from '../Controller';

export default class Nav {
  constructor(prev, next) {
    this.prev = prev;
    this.next = next;
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.controller = Controller.factory();
  }
  start() {
    this.prev.addEventListener('click', this.onPrev, false);
    this.next.addEventListener('click', this.onNext, false);
  }
  onPrev(event) {
    event.preventDefault();
    this.controller.prev();
  }
  onNext(event) {
    event.preventDefault();
    this.controller.next();
  }
}
