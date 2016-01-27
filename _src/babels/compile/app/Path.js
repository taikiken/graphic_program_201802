/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 15:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>代替画像パス</h3>
 * 全て static です
 */

var Path = exports.Path = function () {
  /**
   * <h4>API Path 定数</h4>
   * <p>API Path 内で使われる Const 名称を定義します</p>
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Path(target) {
    (0, _classCallCheck3.default)(this, Path);

    if (_symbol !== target) {

      throw new Error('Path is static Class. not use new Path().');
    }
  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * @return {string} ARTICLE_ID を返します
   */

  (0, _createClass3.default)(Path, null, [{
    key: 'article',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * article id 挿入し url を完成させます
     * @param {string} url 置き換え元 URL
     * @param {Number} id article id
     * @return {string} 置き換え後のURLを返します
     */
    value: function article(url, id) {
      return url.replace(Path.ARTICLE, String(id));
    }
    /**
     * comment id 挿入し url を完成させます
     * @param {string} url 置き換え元 URL
     * @param {Number} id comment id
     * @return {string} 置き換え後のURLを返します
     */

  }, {
    key: 'comment',
    value: function comment(url, id) {
      return url.replace(Path.COMMENT, String(id));
    }
    /**
     * reply id 挿入し url を完成させます
     * @param {string} url 置き換え元 URL
     * @param {Number} id reply id
     * @return {string} 置き換え後のURLを返します
     */

  }, {
    key: 'reply',
    value: function reply(url, id) {
      return url.replace(Path.REPLY, String(id));
    }
    /**
     * user id 挿入し url を完成させます
     * @param {string} url 置き換え元 URL
     * @param {Number} id user id
     * @return {string} 置き換え後のURLを返します
     */

  }, {
    key: 'user',
    value: function user(url, id) {
      return url.replace(Path.USER, String(id));
    }
  }, {
    key: 'ARTICLE_ID',
    get: function get() {
      return 'ARTICLE_ID';
    }
    /**
     * alias Path.ARTICLE_ID
     * @return {string} ARTICLE_ID を返します
     */

  }, {
    key: 'ARTICLE',
    get: function get() {
      return Path.ARTICLE_ID;
    }
    /**
     * @return {string} COMMENT_ID を返します
     */

  }, {
    key: 'COMMENT_ID',
    get: function get() {
      return 'COMMENT_ID';
    }
    /**
     * alias Path.COMMENT_ID
     * @return {string} COMMENT_ID を返します
     */

  }, {
    key: 'COMMENT',
    get: function get() {
      return Path.COMMENT_ID;
    }
    /**
     * @return {string} REPLY_ID を返します
     */

  }, {
    key: 'REPLY_ID',
    get: function get() {
      return 'REPLY_ID';
    }
    /**
     * alias Path.REPLY_ID
     * @return {string} REPLY_ID を返します
     */

  }, {
    key: 'REPLY',
    get: function get() {
      return Path.REPLY_ID;
    }
    /**
     * @return {string} USER_ID を返します
     */

  }, {
    key: 'USER_ID',
    get: function get() {
      return 'USER_ID';
    }
    /**
     * alias Path.USER_ID
     * @return {string} USER_ID を返します
     */

  }, {
    key: 'USER',
    get: function get() {
      return Path.USER_ID;
    }
  }]);
  return Path;
}();