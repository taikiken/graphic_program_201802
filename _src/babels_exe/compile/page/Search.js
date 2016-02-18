/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:42
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
exports.Search = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Header = require('./Header');

var _Sidebar = require('./Sidebar');

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _search = null;

// UT
var UT = self.UT;

var Search = exports.Search = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Search(target) {
    (0, _classCallCheck3.default)(this, Search);

    if (_symbol !== target) {

      throw new Error('Category is static Class. not use new Category().');
    }
  }

  (0, _createClass3.default)(Search, null, [{
    key: 'start',
    value: function start(keyword) {

      // header
      _Header.Header.start();

      // list
      var search = new UT.view.ViewSearch(keyword, _Dom.Dom.board(), _Dom.Dom.boardMore());
      _search = search;
      search.on(UT.view.View.BEFORE_RENDER, Search.onBefore);
      search.on(UT.view.View.UNDEFINED_ERROR, Search.onError);
      search.on(UT.view.View.EMPTY_ERROR, Search.onError);
      search.on(UT.view.View.RESPONSE_ERROR, Search.onError);
      search.start();
    }
  }, {
    key: 'dispose',
    value: function dispose() {

      var search = _search;
      search.off(UT.view.View.BEFORE_RENDER, Search.onBefore);
      search.off(UT.view.View.UNDEFINED_ERROR, Search.onError);
      search.off(UT.view.View.EMPTY_ERROR, Search.onError);
      search.off(UT.view.View.RESPONSE_ERROR, Search.onError);
    }
  }, {
    key: 'onBefore',
    value: function onBefore(event) {

      Search.dispose();

      var articles = event.args[0];
      var article = articles[0];
      Search.sidebar(article.category.slug);
    }
  }, {
    key: 'onError',
    value: function onError() {

      Search.dispose();
      Search.sidebar();
    }
  }, {
    key: 'sidebar',
    value: function sidebar() {
      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

      // sidebar
      _Sidebar.Sidebar.start(slug);
    }
  }]);
  return Search;
}();