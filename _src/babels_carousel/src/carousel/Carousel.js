/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

export default class Carousel {
  constructor(element, pagers, prev, next) {
    this.element = element;
    this.pagers = pagers;
    this.prev = prev;
    this.next = next;
  }
  start() {
    console.log('Carousel.start', this.element);
  }
}
