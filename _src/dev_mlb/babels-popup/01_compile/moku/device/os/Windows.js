'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2017/08/28 - 16:50
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _devices = require('../devices');

var _devices2 = _interopRequireDefault(_devices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * {@link devices}.props
 * {@link Windows}
 * @type {?object}
 */
var props = null;

/**
 * `userAgent` を解析します
 * {@link Windows}
 * @private
 */
var init = function init() {
  if (props) {
    return;
  }
  props = Object.assign({}, _devices2.default.props);
  var ua = _devices2.default.ua;
  var windows = !!ua.match(/windows/i);
  if (windows) {
    props.windows = true;
    props.phone = !!ua.match(/windows phone/i);
  }
};

/**
 * windows phone detector
 */

var Windows = function () {
  function Windows() {
    _classCallCheck(this, Windows);
  }

  _createClass(Windows, null, [{
    key: 'is',

    /**
     * windows OS
     * @returns {boolean} true; windows OS
     */
    value: function is() {
      init();
      return props.windows;
    }
    /**
     * windows phone
     * @returns {boolean} true: windows phone
     */

  }, {
    key: 'phone',
    value: function phone() {
      init();
      return props.phone;
    }
  }]);

  return Windows;
}();

exports.default = Windows;