/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:16
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
exports.Page = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Index = require('./page/Index');

var _Category = require('./page/Category');

var _Single = require('./page/Single');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;
var Router = UT.app.Router;

var Page = exports.Page = function () {
  function Page(target) {
    (0, _classCallCheck3.default)(this, Page);

    if (_symbol !== target) {

      throw new Error('Page is static Class. not use new Page().');
    }
  }

  (0, _createClass3.default)(Page, null, [{
    key: 'init',
    value: function init() {

      var router = Router.factory();

      // index
      router.on(Router.INDEX, Page.index);
      // category
      router.on(Router.CATEGORY, Page.category);
      // single(detail|p)
      router.on(Router.SINGLE, Page.single);

      router.route();
    }
  }, {
    key: 'index',
    value: function index() {
      _Index.Index.start();
    }
  }, {
    key: 'category',
    value: function category(event) {

      var slug = event.slug;
      var type = event.slugType;

      _Category.Category.start(slug, type);
    }
  }, {
    key: 'single',
    value: function single(event) {

      var articleId = event.id;

      _Single.Single.start(articleId);
    }
  }, {
    key: 'comment',
    value: function comment() {}
  }, {
    key: 'search',
    value: function search() {}
  }, {
    key: 'signup',
    value: function signup() {}
  }, {
    key: 'login',
    value: function login() {}
  }, {
    key: 'logout',
    value: function logout() {}
  }, {
    key: 'password',
    value: function password() {}
  }, {
    key: 'passwordResetting',
    value: function passwordResetting() {}
  }, {
    key: 'mypage',
    value: function mypage() {}
  }, {
    key: 'activities',
    value: function activities() {}
  }, {
    key: 'notifications',
    value: function notifications() {}
  }, {
    key: 'settings',
    value: function settings() {}
  }, {
    key: 'interest',
    value: function interest() {}
  }, {
    key: 'social',
    value: function social() {}
  }, {
    key: 'deactivate',
    value: function deactivate() {}
  }]);
  return Page;
}();