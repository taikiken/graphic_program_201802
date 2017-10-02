'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2016/10/26 - 14:57
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Type = require('./Type');

var _Type2 = _interopRequireDefault(_Type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Array（配列）Utility
 */
var List = function () {
  function List() {
    _classCallCheck(this, List);
  }

  _createClass(List, null, [{
    key: 'filling',

    /**
     * Array.prototype.fill, polyfill
     * @param {number} lengthData 配列長
     * @param {*} value fill する値
     * @returns {Array.<*>} fill 後の配列を返します
     * @private
     */
    value: function filling(lengthData, value) {
      var length = lengthData;
      var arr = [].slice(0);
      while (length > 0) {
        arr.push(value);
        length -= 1;
      }
      return arr;
    }
    /**
     * Array.prototype.fill を行います
     * @param {number} length 配列長
     * @param {*} value fill する値
     * @returns {Array.<*>} fill 後の配列を返しますd
     */

  }, {
    key: 'fill',
    value: function fill(length) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // 関数が使えない時は polyfill 関数を使用します
      if (!_Type2.default.method(Array.prototype.fill)) {
        return List.filling(length, value);
      }
      // native method
      return new Array(length).fill(value);
    }
  }]);

  return List;
}();

exports.default = List;