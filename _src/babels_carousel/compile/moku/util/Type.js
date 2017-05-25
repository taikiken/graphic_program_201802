'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/07/12 - 18:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 型チェックを行います
 * @static
 */

var Type = function () {
  function Type() {
    (0, _classCallCheck3.default)(this, Type);
  }

  (0, _createClass3.default)(Type, null, [{
    key: 'method',

    /**
     * 引数(target)が関数かを調べます
     * @param {Function|*} target 調査対象
     * @returns {boolean} 引数(target)が関数かを調べ結果を返します、true: 関数
     */
    value: function method(target) {
      return typeof target === 'function';
    }
    /**
     * 引数(target)を `!!` で調べます
     * @param {*} target 調査対象
     * @returns {boolean} 引数(target)を `!!` で調べ結果を返します
     */

  }, {
    key: 'exist',
    value: function exist(target) {
      return !!target;
    }
    /**
     * 引数(target)が number かを調べます
     * @param {*} target 調査対象
     * @returns {boolean} 引数(target)が number かを調べ結果を返します、true: number
     */

  }, {
    key: 'number',
    value: function number(target) {
      // [参考] jQuery 2.x, jQuery 2 関数は文字列 "2" も true にするので type check を追加した
      return typeof target === 'number' && !Type.array(target) && target - parseFloat(target) + 1 >= 0;
    }
    /**
     * 引数(target)が int かを `Number.isInteger` を使用し調べます
     * @param {*} target 調査対象
     * @returns {boolean} 引数(target)が int かを調べ結果を返します、true: int
     */

  }, {
    key: 'int',
    value: function int(target) {
      return (0, _isInteger2.default)(target);
    }
    /**
     * 引数(target)が string かを調べます
     * @param {*} target 調査対象
     * @returns {boolean} 引数(target)が string かを調べ結果を返します、true: string
     */

  }, {
    key: 'string',
    value: function string(target) {
      return typeof target === 'string';
    }
    /**
     * 引数(target)を `Array.isArray` で配列かを調べます
     * @param {*} target 調査対象
     * @returns {boolean} 引数(target)が 配列 かを調べ結果を返します、true: 配列
     */

  }, {
    key: 'array',
    value: function array(target) {
      return Array.isArray(target);
    }
    /**
     * 引数(target)が null かを調べます
     * @param {*} target 調査対象
     * @returns {boolean} 引数(target)が null かを調べ結果を返します、true: null
     */

  }, {
    key: 'nil',
    value: function nil(target) {
      return target === null;
    }
    /**
     * Object型 引数 `object` は String型 引数 `key` を [key] として所持しているかを調べます
     * @deprecated instead use Type.has
     * @param {Object} target 調査対象
     * @param {string} key Object.key 名称
     * @returns {boolean} 存在する時は true を返します
     */

  }, {
    key: 'hasKey',
    value: function hasKey(target, key) {
      return Type.has(target, key);
    }
    /**
     * Object型 引数 `object` は String型 引数 `key` を [key] として所持しているかを調べます
     * @param {Object} target 調査対象
     * @param {string} key Object.key 名称
     * @returns {boolean} 存在する時は true を返します
     */

  }, {
    key: 'has',
    value: function has(target, key) {
      return (0, _keys2.default)(target).indexOf(key) !== -1;
    }
    /**
     * target が undefined かを調べます
     * @param {*} target 調査対象
     * @returns {boolean} true: undefined
     * @since 2016-10-25
     */

  }, {
    key: 'undef',
    value: function undef(target) {
      return typeof target === 'undefined';
    }
    /**
     * ファイル名から拡張子を取得します
     * @deprecated instead use Type.extension
     * @param {string} fileName 取得したいファイル名称
     * @returns {string} ファイル名の拡張子を返します
     */

  }, {
    key: 'getExtension',
    value: function getExtension(fileName) {
      return Type.extension(fileName);
    }
    /**
     * ファイル名から拡張子を取得します
     * @param {string} fileName 取得したいファイル名称
     * @returns {string} ファイル名の拡張子を返します
     */

  }, {
    key: 'extension',
    value: function extension(fileName) {
      if (typeof fileName !== 'string') {
        return '';
      }
      var splits = fileName.split('.');
      if (splits.length === 1) {
        return '';
      }
      return splits.pop().toLowerCase();
    }
    // ----------------------------------------------------------
    // 画像パスが正規かチェックする
    /**
     * 使用可能なbase64 file かを調べます
     * @param {string} fileName 調査対象ファイル名
     * @returns {boolean} jpeg / png の時に true を返します
     */

  }, {
    key: 'base64',
    value: function base64(fileName) {
      if (!Type.exist(fileName)) {
        return false;
      }
      return fileName.indexOf('data:image/jpeg;base64') !== -1 || fileName.indexOf('data:image/png;base64') !== -1 || fileName.indexOf('data:image/jpg;base64') !== -1 || fileName.indexOf('data:image/gif;base64') !== -1;
    }
    /**
     * 拡張子から画像ファイルかを調べます
     * @param {string} fileName 調査対象ファイル名
     * @returns {Boolean} 'jpg', 'png', 'jpeg', 'gif' のいづれかに該当するかの真偽値を返します
     */

  }, {
    key: 'img',
    value: function img(fileName) {
      if (!Type.exist(fileName)) {
        return false;
      }
      // base64
      if (Type.base64(fileName)) {
        return true;
      }
      // 拡張子チェック
      return ['jpg', 'png', 'jpeg', 'gif'].indexOf(Type.extension(fileName)) !== -1;
    }
  }]);
  return Type;
}();

exports.default = Type;