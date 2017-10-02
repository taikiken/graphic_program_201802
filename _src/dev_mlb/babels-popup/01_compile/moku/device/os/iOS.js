'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2017/08/28 - 17:39
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
 * {@link iOS}
 * @type {?object}
 */
var props = null;

/**
 * version 情報を計算します
 * {@link iOS}
 */
var version = function version() {
  var app = _devices2.default.app;
  var numbers = app.match(/os (\d+)_(\d+)_?(\d+)?/i);
  if (!Array.isArray(numbers)) {
    return;
  }
  // iOS N.N.N 削除
  numbers.shift();
  var versions = numbers.map(function (number) {
    var int = parseInt(number, 10);
    return isNaN(int) ? 0 : int;
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
 * iOS 判定を行います
 * {@link iOS}
 */
var init = function init() {
  if (props) {
    return;
  }
  props = Object.assign({}, _devices2.default.props);
  var ua = _devices2.default.ua;
  var ipad = !!ua.match(/ipad/i);
  var ipod = !!ua.match(/ipod/i);
  var iphone = !!ua.match(/iphone/i) && !ipad && !ipod;
  var ios = ipad || ipod || iphone;
  if (!ios) {
    return;
  }
  var standalone = !!navigator.standalone;
  props.stanalone = standalone;
  props.ios = ios;
  props.ipad = ipad;
  props.ipod = ipod;
  props.iphone = iphone;
  props.phone = iphone || ipod;
  props.tablet = ipad;
  // アプリ内コンテンツ
  props.webView = ios && !standalone && !_devices2.default.safari;
  // version check
  version();
};

/**
 * iOS detector
 */

var iOS = function () {
  function iOS() {
    _classCallCheck(this, iOS);
  }

  _createClass(iOS, null, [{
    key: 'is',

    /**
     * iOS
     * @returns {boolean} true: iOS
     */
    value: function is() {
      init();
      return props.android;
    }
    /**
     * iOS && iPhone or iPod
     * @returns {boolean} true: iOS && iPhone or iPod
     */

  }, {
    key: 'phone',
    value: function phone() {
      init();
      return props.phone;
    }
    /**
     * iOS && iPad
     * @returns {boolean} true: iOS && iPad
     */

  }, {
    key: 'tablet',
    value: function tablet() {
      init();
      return props.tablet;
    }
    /**
     * iOS && iPhone
     * @returns {boolean} true: iOS && iPhone
     */

  }, {
    key: 'iphone',
    value: function iphone() {
      init();
      return props.iphone;
    }
    /**
     * iOS && iPad
     * @returns {boolean} true: iOS && iPad
     */

  }, {
    key: 'ipad',
    value: function ipad() {
      init();
      return props.ipad;
    }
    /**
     * iOS && iPod
     * @returns {boolean} true: iOS && iPod
     */

  }, {
    key: 'ipod',
    value: function ipod() {
      init();
      return props.ipod;
    }
    /**
     * iOS version
     * @returns {number} iOS version, not iOS -1
     */

  }, {
    key: 'version',
    value: function version() {
      init();
      return props.version;
    }
    /**
     * iOS major version
     * @returns {number} iOS major version, not iOS -1
     */

  }, {
    key: 'major',
    value: function major() {
      init();
      return props.major;
    }
    /**
     * iOS version `major.minor.build`
     * @returns {string} iOS version NN.NN.NN 型（文字）で返します, not iOS 空文字列
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
     * iOS webView - 標準 UA のみ対応
     * @returns {boolean} true: iOS webView
     */

  }, {
    key: 'webView',
    value: function webView() {
      init();
      return props.webView;
    }
    /**
     * iOS standalone - app mode
     * @returns {boolean} true: iOS app mode
     */

  }, {
    key: 'standalone',
    value: function standalone() {
      return props.standalone;
    }
  }]);

  return iOS;
}();

exports.default = iOS;