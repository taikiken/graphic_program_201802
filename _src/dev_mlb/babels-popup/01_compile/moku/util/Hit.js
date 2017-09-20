"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/29 - 22:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 衝突判定を行います
 */
var Hit = function () {
  function Hit() {
    _classCallCheck(this, Hit);
  }

  _createClass(Hit, null, [{
    key: "test",

    /**
     * element と window.top(0) window.bottom(height) のヒットテストを行います
     * @param {number} height 衝突対象物の高さ window.innerHeight
     * @param {ClientRect|Object} offset 比較対象物の element ClientRect または同等の Object
     * @returns {{
     *  top: boolean,
     *  bottom: boolean,
     *  contain: boolean,
     *  include: boolean,
     *  result: boolean
     * }} hit check object を返します
     */
    value: function test(height, offset) {
      // hit test
      var hit = {
        result: false,
        top: false,
        bottom: false,
        contain: false,
        include: false
      };

      // top
      if (offset.top <= height && offset.top >= 0) {
        hit.top = true;
      }

      // bottom
      if (offset.bottom <= height && offset.bottom >= 0) {
        hit.bottom = true;
      }

      // contain check を行います
      if (offset.top <= 0 && offset.bottom >= height) {
        hit.contain = true;
      }

      // include check を行います
      if (offset.top >= 0 && offset.top <= height && offset.bottom >= 0 && offset.bottom <= height) {
        hit.include = true;
      }
      // return
      // return hit.top || hit.bottom || hit.contain || hit.include;
      hit.result = hit.top || hit.bottom || hit.contain || hit.include;
      return hit;
    }
  }]);

  return Hit;
}();

exports.default = Hit;