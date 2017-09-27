'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2017/09/20 - 15:30
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// moku/net


// moku/util


var _Cookie = require('../../moku/net/Cookie');

var _Cookie2 = _interopRequireDefault(_Cookie);

var _Times = require('../../moku/util/Times');

var _Times2 = _interopRequireDefault(_Times);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * app banner popup(modal) open check cookie を管理します
 * - modal open 24h 持続します
 * - cookie があると popup しません
 */
var Visited = function () {
  function Visited() {
    _classCallCheck(this, Visited);
  }

  _createClass(Visited, null, [{
    key: 'already',

    /**
     * cookie 存在チェック
     * @returns {string|null} 存在する時は value を返します
     */
    value: function already() {
      return _Cookie2.default.get(Visited.COOKIE);
    }
    /**
     * cookie 24h セットします
     */

    /**
     * cookie name - __app_banner_visited__
     * @type {string}
     */

  }, {
    key: 'arrive',
    value: function arrive() {
      // Cookie.set(Visited.COOKIE, '1', Times.hour(24));
      // https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-331352860
      _Cookie2.default.set(Visited.COOKIE, location.href, _Times2.default.hour(24));
    }
  }]);

  return Visited;
}();

Visited.COOKIE = '__app_banner_visited__';
exports.default = Visited;