'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2017/08/28 - 16:36
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _devices = require('../devices');

var _devices2 = _interopRequireDefault(_devices);

var _Windows = require('./Windows');

var _Windows2 = _interopRequireDefault(_Windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * {@link devices}.props
 * {@link Android}
 * @type {?object}
 */
var props = null;

/**
 * version 情報を計算します
 * {@link Android}
 */
var version = function version() {
  var app = _devices2.default.app;
  var numbers = app.match(/android (\d+)\.(\d+)\.?(\d+)?/i);
  if (!Array.isArray(numbers)) {
    return;
  }
  // 先頭の Android 4.3 削除
  numbers.shift();
  var versions = numbers.map(function (number, index) {
    var int = parseInt(number, 10);
    if (index < 3) {
      return isNaN(int) ? 0 : int;
    }
    return null;
  });
  props.build = versions.join('.');
  var major = parseInt(versions[0], 10);
  var minor = 0;
  if (versions.length >= 2) {
    minor = versions[1];
  }
  var build = '';
  if (versions.length >= 3) {
    build = versions[2];
  }
  props.major = major;
  props.version = parseFloat(major + '.' + minor + build);
  props.numbers = versions;
};

/**
 * - Android standard browser
 * `Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13`,
 * `Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
 * - Windows phone
 * `Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.<OS build number>`
 *
 * ## MSDN
 * [MSDN](https://msdn.microsoft.com/ja-jp/library/hh869301(v=vs.85).aspx)
 * {@link Android}
 * @see http://googlewebmastercentral.blogspot.jp/2011/03/mo-better-to-also-detect-mobile-user.html
 */
var init = function init() {
  if (props) {
    return;
  }
  props = Object.assign({}, _devices2.default.props);
  var ua = _devices2.default.ua;
  // windows phone ua に `Android` が入っている
  var android = !_Windows2.default.phone() && !!ua.match(/android/i);
  if (android) {
    props.android = true;
    props.phone = !!ua.match(/mobile/i);
    // phone / tablet
    if (!props.phone) {
      props.tablet = true;
    }
    // Android 標準 browser
    props.standard = _devices2.default.safari && (!!ua.match(/version/i) || !!ua.match(/samsungbrowser/i));
    // hd
    props.hd = Math.max(window.innerWidth, window.innerHeight) > 1024;
    // version check
    version();
  }
};

/**
 * Android OS detector
 */

var Android = function () {
  function Android() {
    _classCallCheck(this, Android);
  }

  _createClass(Android, null, [{
    key: 'is',

    /**
     * Android OS
     * @returns {boolean} true: Android OS
     */
    value: function is() {
      init();
      return props.android;
    }
    /**
     * Android OS && standard browser
     * @returns {boolean} true: Android standard browser
     */

  }, {
    key: 'standard',
    value: function standard() {
      init();
      return props.standard;
    }
    /**
     * Android OS && phone
     * @returns {boolean} true: Android phone
     */

  }, {
    key: 'phone',
    value: function phone() {
      init();
      return props.phone;
    }
    /**
     * Android OS && tablet
     * @returns {boolean} true: Android tablet
     */

  }, {
    key: 'tablet',
    value: function tablet() {
      init();
      return props.tablet;
    }
    /**
     * Android OS && HD window
     * @returns {boolean} true: Android HD window
     */

  }, {
    key: 'hd',
    value: function hd() {
      init();
      return props.hd;
    }
    /**
     * Android OS version
     * @returns {number} Android OS version, not Android -1
     */

  }, {
    key: 'version',
    value: function version() {
      init();
      return props.version;
    }
    /**
     * Android OS major version
     * @returns {number} Android OS major version, not Android -1
     */

  }, {
    key: 'major',
    value: function major() {
      init();
      return props.major;
    }
    /**
     * Android OS version `major.minor.build`
     * @returns {string} Android OS version NN.NN.NN 型（文字）で返します, not Android ''
     */

  }, {
    key: 'build',
    value: function build() {
      init();
      return props.build;
    }
    /**
     * version を配列形式で取得します
     * @returns {Array.<number>} {{major: int, minor: int, build: int}} 形式で返します
     */

  }, {
    key: 'numbers',
    value: function numbers() {
      init();
      return props.numbers;
    }
    /**
     * Android 4.3 ~ 4.4 && standard browser
     * - touchend が未実装
     * @returns {boolean} true: Android 4.3 ~ 4.4
     */

  }, {
    key: 'kitKat',
    value: function kitKat() {
      // no touchend - standard browser 4.3 ~ 4.4
      var v = Android.version();
      return Android.standard() && v > 4.2 && v < 4.5;
    }
  }]);

  return Android;
}();

exports.default = Android;