/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/31 - 18:03
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
exports.Router = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Env = require('./Env');

var _Loc = require('../util/Loc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>location.pathnameから現在地を調べます</h3>
 * 全て static です
 */

var Router = exports.Router = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Router(target) {
    (0, _classCallCheck3.default)(this, Router);

    if (_symbol !== target) {

      throw new Error('Router is static Class. not use new Router().');
    }
  }
  /**
   * category page かを調べます
   * @return {boolean} category page なら true を返します
   */

  (0, _createClass3.default)(Router, null, [{
    key: 'isCategory',
    value: function isCategory() {
      return _Loc.Loc.path.substr(1, 9) === 'category/';
    }
    /**
     * single page かを調べます
     * @return {boolean} single page なら true を返します
     */

  }, {
    key: 'isSingle',
    value: function isSingle() {
      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
        var split = _Loc.Loc.path.replace('/p/', '').split('/');
        if (_Loc.Loc.isLocal()) {
          split.pop();
        }
        return split.length === 1;
      }
    }
    /**
     * comment page かを調べます
     * @return {boolean} comment page なら true を返します
     */

  }, {
    key: 'isComment',
    value: function isComment() {
      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
        var split = _Loc.Loc.path.replace('/p/', '').split('/');
        if (_Loc.Loc.isLocal()) {
          split.pop();
        }
        if (split.length > 1 && split[1] === 'comment') {
          return split.length === 3;
        }
      }
    }
    /**
     * comment replay page かを調べます
     * @return {boolean} comment replay page なら true を返します
     */

  }, {
    key: 'isReply',
    value: function isReply() {
      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
        var split = _Loc.Loc.path.replace('/p/', '').split('/');
        if (_Loc.Loc.isLocal()) {
          split.pop();
        }
        if (split.length > 1 && split[1] === 'comment') {
          return split.length === 4;
        }
      }
    }
    /**
     * search page かを調べます
     * @return {boolean} search page なら true を返します
     */

  }, {
    key: 'isSearch',
    value: function isSearch() {
      return _Loc.Loc.path.substr(1, 7) === 'search/';
    }
    /**
     * signup page かを調べます
     * @return {boolean} signup page なら true を返します
     */

  }, {
    key: 'isSigneup',
    value: function isSigneup() {
      return _Loc.Loc.path.substr(1, 7) === 'signup/';
    }
    /**
     * mypage page かを調べます
     * @return {boolean} mypage page なら true を返します
     */

  }, {
    key: 'isMypage',
    value: function isMypage() {
      return _Loc.Loc.path.substr(1, 7) === 'mypage/';
    }
    /**
     * category slug を調べます
     * @return {string} category slug を返します
     */

  }, {
    key: 'slug',
    value: function slug() {
      if (Router.isCategory()) {
        return _Loc.Loc.path.replace('/category/', '').split('/').shift();
      }
    }
    /**
     * search keyword を調べます
     * @return {string} 検索キーワードを返します
     */

  }, {
    key: 'keyword',
    value: function keyword() {
      if (Router.isSearch()) {
        return _Loc.Loc.path.replace('/search/', '').split('/').shift();
      }
    }
    /**
     * article Id を調べます
     * @return {string} article Id を返します
     */

  }, {
    key: 'articleId',
    value: function articleId() {
      if (Router.isSingle() || Router.isComment() || Router.isReply()) {
        return _Loc.Loc.path.replace('/p/', '').split('/').shift();
      }
    }
    /**
     * comment Id を調べます
     * @return {string} comment Id を返します
     */

  }, {
    key: 'commentId',
    value: function commentId() {
      if (Router.isComment()) {
        return _Loc.Loc.path.replace('/p/', '').split('/')[2];
      }
    }
    /**
     * reply Id を調べます
     * @return {string} reply Id を返します
     */

  }, {
    key: 'replyId',
    value: function replyId() {
      if (Router.isReply()) {
        return _Loc.Loc.path.replace('/p/', '').split('/')[3];
      }
    }
  }]);
  return Router;
}();