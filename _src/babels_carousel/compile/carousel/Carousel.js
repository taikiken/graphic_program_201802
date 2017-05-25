'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Carousel = function () {
  function Carousel(element, pagers, prev, next) {
    (0, _classCallCheck3.default)(this, Carousel);

    this.element = element;
    this.pagers = pagers;
    this.prev = prev;
    this.next = next;
  }

  (0, _createClass3.default)(Carousel, [{
    key: 'start',
    value: function start() {
      console.log('Carousel.start', this.element);
    }
  }]);
  return Carousel;
}();

exports.default = Carousel;