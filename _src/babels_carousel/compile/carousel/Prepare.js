'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _List = require('../moku/util/List');

var _List2 = _interopRequireDefault(_List);

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [native code] - document
 * @private
 * @type {HTMLDocument}
 */
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

// moku/util
var document = self.document;

/**
 * Sagen
 * @private
 * @type {Sagen}
 */


// // moku/dom
// import Classes from '../moku/dom/Classes';

// carousel
var Sagen = self.Sagen;

/**
 * carousel を HTMLElement が存在する状態で実装する準備を行います
 *
 * 必要なタグを増やします
 * - slide コンテナを複製します
 * - pager 中身を作成します
 *
 * スライドが 2 の時は便宜的に 4 として運用します
 */

var Prepare = function () {
  function Prepare() {
    (0, _classCallCheck3.default)(this, Prepare);
  }

  (0, _createClass3.default)(Prepare, null, [{
    key: 'start',

    /**
     * 準備を始めます
     * ul#js-pickup-slider 存在を確認します
     *
     * データによっては存在しないことがあります
     * @returns {boolean} true: 実装します
     */
    value: function start() {
      // ul#js-pickup-slider
      var element = document.getElementById('js-pickup-slider');
      if (!element) {
        return false;
      }
      // li.js-pickup 数
      var length = Prepare.articles(element);
      console.log('Prepare.start length', length);
      if (!length) {
        // li が 0 の時は実装しない
        return false;
      }

      var _Prepare$pager = Prepare.pager(length);

      var pagers = _Prepare$pager.pagers;

      var _Prepare$direction = Prepare.direction(length);

      var prev = _Prepare$direction.prev;
      var next = _Prepare$direction.next;

      var carousel = new _Carousel2.default(element, pagers, prev, next);
      carousel.start();
      return true;
    }
    /**
     * carousel slide 複製を行います
     * @param {Element|Document} element ul#js-pickup-slider
     * @returns {number} ul > li の初期数 === スライド数を返します
     */

  }, {
    key: 'articles',
    value: function articles(element) {
      // ul#js-pickup-slider > li.js-pickup
      var nodeList = element.getElementsByClassName('js-pickup');
      if (!nodeList || !nodeList.length) {
        return 0;
      }
      var articles = (0, _from2.default)(nodeList);
      // li 数を取得します
      var length = articles.length;
      // スライド数 2 の時は複製を2回増やします
      var needFourth = length === 2;
      // 真ん中のグループにマーキングするためのフラッグ
      var center = true;
      var isCurrent = true;
      // スライド数 1 を超えている時に複製を行います
      if (length > 1) {
        if (needFourth) {
          Prepare.clone(element, articles);
          Prepare.clone(element, articles, center, isCurrent);
          isCurrent = false;
        }
        Prepare.clone(element, articles, center, isCurrent);
        Prepare.clone(element, articles);
      }
      // スライド数を返します
      return length;
    }
    /**
     * スライド複製を行います
     * @param {Element} element ul#js-pickup-slider
     * @param {Array<Element>} articles ul#js-pickup-slider > li.js-pickup
     * @param {boolean} [center=false] 真ん中のグループフラッグ
     * @param {boolean} [current=false] current class つける
     */

  }, {
    key: 'clone',
    value: function clone(element, articles) {
      var center = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var current = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      // 一旦 fragment へ appendChild する
      var fragment = document.createDocumentFragment();
      var isCurrent = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(articles), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var article = _step.value;

          var clone = article.cloneNode(true);
          // 表示するコンテンツのみ
          if (center) {
            clone.className += ' view-pickup';
            if (current && isCurrent) {
              clone.className += ' current';
              isCurrent = false;
            }
          }
          fragment.appendChild(clone);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      element.appendChild(fragment);
    }
    /**
     * pager element を作成します
     * - div#js-pager-container'
     *  - div.pager
     *    - ul.pager-list
     *      - li.pager-item
     *        - a.pager-link
     * @param {number} length スライド数
     * @returns {?object} {{pagers: Array<Element>}} - pagers: li.pager-item
     */

  }, {
    key: 'pager',
    value: function pager(length) {
      // mobile phone pager なし
      // 1件 pager なし
      if (Sagen.Browser.Mobile.phone() || length === 1) {
        return null;
      }
      // pager root element
      var container = document.getElementById('js-pager-container');
      if (!container) {
        return null;
      }
      // div.pager
      var pager = document.createElement('div');
      pager.className = 'pager';
      // ul.pager-list
      var element = document.createElement('ul');
      element.className = 'pager-list';
      // map するためのダミー配列
      var list = _List2.default.fill(length, 0);
      var isCurrent = true;
      var pagers = list.map(function (value, index) {
        var li = document.createElement('li');
        li.className = 'pager-item pager-' + index;
        if (isCurrent) {
          li.className += ' current';
          isCurrent = false;
        }
        var a = document.createElement('a');
        a.className = 'pager-link';
        a.href = '#pickup-' + index;
        a.innerHTML = String(index);
        li.appendChild(a);
        element.appendChild(li);
        return li;
      });
      // appendChild
      pager.appendChild(element);
      container.appendChild(pager);
      // return ul
      return {
        // element,
        pagers: pagers
      };
    }
    /**
     * prev / next nav element を作成します
     * - div#js-direction-container
     *  - div
     *    - a#prev
     *    - a#next
     * @param {number} length スライド数
     * @returns {?object} {{prev: a#prev, next: a#next}}
     */

  }, {
    key: 'direction',
    value: function direction(length) {
      if (length === 1) {
        return null;
      }
      // direction root element
      var container = document.getElementById('js-direction-container');
      if (!container) {
        return null;
      }
      var div = document.createElement('div');
      div.className = 'direction';
      var prev = document.createElement('a');
      prev.className = 'direction-prev';
      prev.href = '#prev';
      prev.id = 'prev';
      var next = document.createElement('a');
      next.className = 'direction-next';
      next.href = '#next';
      next.id = 'next';
      // appendChild
      div.appendChild(prev);
      div.appendChild(next);
      container.appendChild(div);
      // return div.direction
      return {
        prev: prev,
        next: next
      };
    }
  }]);
  return Prepare;
}();

exports.default = Prepare;