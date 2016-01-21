/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/12 - 17:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// comment 取得 [type]

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentType = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Query2 = require('../types/Query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事詳細でのコメント一覧表示のリクエスト・オプションです
 */

var CommentType = exports.CommentType = function (_Query) {
  (0, _inherits3.default)(CommentType, _Query);

  /**
   * <code>/api/1/comments/artice/{:article_id}[/type]</code>
   * <pre>
   * 取得するコメントタイプ
   * - なし    : すべてのユーザーのコメント
   * - normal : 通常ユーザーのコメント
   * - official : 公式ユーザーのコメント
   * - self : 自分のコメント
   * - [commend_id] : 特定のコメントのみ
   * </pre>
   * @param {string} key dog|cat|food のように | 区切りでオプションをつなげます
   * @param {boolean} [require=false] 必須真偽値
   */

  function CommentType(key) {
    var require = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    (0, _classCallCheck3.default)(this, CommentType);

    // 'dog|cat' を分割する

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CommentType).call(this, key, 'string', '', require));

    _this._keys = key.split('|');

    return _this;
  }

  /**
   * Query override して使います
   * @method has
   * @param {string} key query key
   * @returns {boolean} query key が存在するかを返します
   */

  (0, _createClass3.default)(CommentType, [{
    key: 'has',
    value: function has(key) {

      return this._keys.indexOf(key) !== -1;
    }
  }]);
  return CommentType;
}(_Query2.Query);