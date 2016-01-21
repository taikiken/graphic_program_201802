/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * Types.url へ追加可能なpathがあるかどうかを管理します
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Permalink = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Permalink = exports.Permalink = function () {
  /**
   * パスオプションを指定、ない時は空配列
   *
   *      // example
   *      new Permalink( [ 'category', '' ] );
   *
   *      // searchのようにどんなワードでも良い場合は "*" を指定する
   *      new Permalink( [ '*' ] );
   *
   * @constructor
   * @param {Array} [paths] 追加 path を配列で設定
   * @param {boolean} [need=false] 追加 path が必須かを設定。true: 必須, false: オプション
   */

  function Permalink() {
    var paths = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var need = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    (0, _classCallCheck3.default)(this, Permalink);

    this._paths = paths;
    this._need = need;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * オプションパスが必須かのプロパティ
   * @method require
   * @returns {boolean} オプションパスが必須かどうかを返します true: 必須
   */

  (0, _createClass3.default)(Permalink, [{
    key: 'length',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * option path 数
     * @method length
     * @returns {Number} paths数を返します
     */
    value: function length() {

      return this._paths.length;
    }

    /**
     * @method has
     * @param {string} path 調べたいオプションパス
     * @returns {boolean} 指定パスが存在するかの真偽値を返します
     */

  }, {
    key: 'has',
    value: function has(path) {

      var paths = this._paths;
      var result = paths.indexOf(path) !== -1;

      if (!result) {

        result = paths.indexOf('*') !== -1;
      }

      return result;
    }
  }, {
    key: 'require',
    get: function get() {

      return this._need;
    }
  }]);
  return Permalink;
}();