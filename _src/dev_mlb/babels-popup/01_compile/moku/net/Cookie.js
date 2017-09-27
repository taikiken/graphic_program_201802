'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/12/16 - 14:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// --------------------------------
// copy [native code]
/**
 * copy [native code] - decodeURIComponent
 * @type {function}
 */
var decodeURIComponent = self.decodeURIComponent;
/**
 * copy [native code] - encodeURIComponent
 * @type {function}
 */
var encodeURIComponent = self.encodeURIComponent;
/**
 * copy [native code] - RegExp
 * @type {function}
 */
var RegExp = self.RegExp;

/**
 * cookie を取得・保存・削除します
 */

var Cookie = function () {
  /**
   * cookie を処理します
   *
   * インスタンスは key 毎に作成します
   * @param {string} keyName cookie key
   * @param {?Date} [endValue=null] cookie end Date instance, null の時はプラウザ `quit` で削除されます
   * @param {string} [defaultPath='/'] cookie path
   * @param {string} [defaultDomain=''] cookie domain
   * @param {boolean} [secureSetting=false] true: https 通信のときのみ、クッキーが送信されます
   */
  function Cookie(keyName) {
    var endValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var defaultPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/';
    var defaultDomain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var secureSetting = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, Cookie);

    var key = keyName;
    var end = endValue;
    var path = defaultPath;
    var domain = defaultDomain;
    var secure = secureSetting;

    /**
     * cookie key を取得します
     * @returns {string} cookie key を返します
     */
    this.key = function () {
      return key;
    };
    /**
     * cookie key を設定します
     * @param {string} setting 設定する key name
     */
    this.setKey = function (setting) {
      key = setting;
    };
    /**
     * cookie end を取得します
     * @returns {?Date} cookie end Date instance
     */
    this.end = function () {
      return end;
    };
    /**
     * cookie end を設定します
     * @param {Date} setting cookie end Date instance
     */
    this.setEnd = function (setting) {
      end = setting;
    };
    /**
     * cookie path を取得します
     * @returns {string} cookie path を返します
     */
    this.path = function () {
      return path;
    };
    /**
     * cookie path を設定します
     * @param {string} setting 設定する path name
     */
    this.setPath = function (setting) {
      path = setting;
    };
    /**
     * cookie domain を取得します
     * @returns {string} cookie domain を返します
     */
    this.domain = function () {
      return domain;
    };
    /**
     * cookie domain を設定します
     * @param {string} setting 設定する domain name
     */
    this.setDomain = function (setting) {
      domain = setting;
    };
    /**
     * https 通信のときのみクッキー送信を行うかのフラッグを取得します
     * @returns {boolean} https 通信のときのみクッキー送信を行うかのフラッグ
     */
    this.secure = function () {
      return secure;
    };
    /**
     * https 通信のときのみクッキー送信を行うかのフラッグを設定します
     * @param {boolean} setting https 通信のときのみクッキー送信を行うかのフラッグ
     */
    this.setSecure = function (setting) {
      secure = setting;
    };
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * cookie value を取得します
   * @returns {string|null} cookie value を返します
   */


  _createClass(Cookie, [{
    key: 'get',
    value: function get() {
      return Cookie.get(this.key());
    }

    /**
     * cookie value を設定します
     * @param {string} value cookie value
     * @param {?Date} [end=null] cookie end Date instance, null の時はプラウザ `quit` で削除されます
     * @param {string} [path='/'] cookie path
     * @param {string} [domain=''] cookie domain
     * @param {boolean} [secure=false] true: https 通信のときのみ、クッキーが送信されます
     * @returns {string} 設定した cookie 文字列
     */

  }, {
    key: 'set',
    value: function set(value) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.end();
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.path();
      var domain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.domain();
      var secure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.secure();

      return Cookie.set(this.key(), value, end, path, domain, secure);
    }
    /**
     * cookie を削除します
     * @returns {boolean} true: cookie 削除成功
     */

  }, {
    key: 'remove',
    value: function remove() {
      return Cookie.remove(this.key());
    }
    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * cookie value を取得します
     * @param {string} key 取得する cookie key 名称
     * @returns {string|null} cookie value
     */

  }], [{
    key: 'get',
    value: function get(key) {
      var cookie = document.cookie;
      var escapeKey = encodeURIComponent(key).replace(/[-.+*]/g, '\\$&');
      var exp = new RegExp('(?:(?:^|.*;)\\s*' + escapeKey + '\\s*\\=\\s*([^;]*).*$)|^.*$');
      return decodeURIComponent(cookie.replace(exp, '$1')) || null;
    }
    /**
     * cookie value を設定します
     * @param {string} key cookie key
     * @param {string} value cookie value
     * @param {?Date} [end=null] cookie end date Date instance
     * @param {string} [path=/] cookie path
     * @param {string} [domain=''] cookie domain
     * @param {boolean} [secure=false] true: https 通信のときのみ、クッキーが送信されます
     * @returns {string} 設定した cookie 文字列
     */

  }, {
    key: 'set',
    value: function set(key, value) {
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
      var domain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var secure = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      if (end) {
        cookie += '; expires=' + end.toUTCString();
      }
      if (path) {
        cookie += '; path=' + path;
      }
      if (domain) {
        cookie += '; domain=' + domain;
      }
      if (secure) {
        cookie += '; secure';
      }
      document.cookie = cookie;
      return cookie;
    }
    /**
     * cookie を削除します
     *
     * 現在時間より前の時刻を設定します
     * @param {string} key cookie key
     * @returns {boolean} true: 削除成功
     */

  }, {
    key: 'remove',
    value: function remove(key) {
      if (Cookie.has(key)) {
        Cookie.set(key, '', new Date());
        return true;
      }
      return false;
    }
    /**
     * cookie key が存在するかを調べます
     * @param {string} key cookie key
     * @returns {boolean} true: cookie key が存在します
     */

  }, {
    key: 'has',
    value: function has(key) {
      return Cookie.get(key) !== null;
    }
  }]);

  return Cookie;
}();

exports.default = Cookie;