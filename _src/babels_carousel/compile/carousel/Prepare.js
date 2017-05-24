'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

var document = self.document;

var Sagen = self.Sagen;

var Prepare = function () {
  function Prepare() {
    (0, _classCallCheck3.default)(this, Prepare);
  }

  (0, _createClass3.default)(Prepare, null, [{
    key: 'start',
    value: function start() {
      var element = document.getElementById('js-pickup-carousel');
      if (!element) {
        return false;
      }
      var length = Prepare.articles(element);
      if (!length) {
        return false;
      }
      Prepare.pager(element, length);
      return true;
    }
  }, {
    key: 'articles',
    value: function articles(element) {
      var articles = element.getElementsByClassName('js-pickup-article');
      if (!articles || !articles.length) {
        return 0;
      }
      var length = articles.length;
      Prepare.clone(articles, length);
      return length;
    }
  }, {
    key: 'clone',
    value: function clone(articles, length) {
      console.log('Prepare.clone', articles, length);
    }
  }, {
    key: 'pager',
    value: function pager(element, length) {
      if (Sagen.Browser.Mobile.phone()) {
        return;
      }
      console.log('Prepare.pager', element, length);
    }
  }]);
  return Prepare;
}();

exports.default = Prepare;