"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/16 - 19:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Array.from(nodeList) が Android で error になるから polyfill する
 */
var NodeLists = function () {
  function NodeLists() {
    _classCallCheck(this, NodeLists);
  }

  _createClass(NodeLists, null, [{
    key: "from",

    /**
     * Array.from 使えないので for...i iteration する
     * @param {NodeList} elements 処理対象
     * @returns {Array} 配列変換し返します
     */
    value: function from(elements) {
      var data = [];
      var limit = elements.length;
      for (var i = 0; i < limit; i += 1) {
        data.push(elements[i]);
      }
      return data;
    }
    /**
     * Array.from 使用判定を行い、
     * 使用できない時は {@link NodeLists.from} を実行します
     * @param {NodeList} elements 処理対象
     * @returns {Array} 配列変換し返します
     */

  }, {
    key: "get",
    value: function get(elements) {
      if (!Array.from) {
        return NodeLists.from(elements);
      }
      return Array.from(elements);
    }
  }]);

  return NodeLists;
}();

exports.default = NodeLists;