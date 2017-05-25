'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Style = require('../css/Style');

var _Style2 = _interopRequireDefault(_Style);

var _Bounding = require('./Bounding');

var _Bounding2 = _interopRequireDefault(_Bounding);

var _Classes = require('./Classes');

var _Classes2 = _interopRequireDefault(_Classes);

var _Type = require('../util/Type');

var _Type2 = _interopRequireDefault(_Type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * HTMLElement の操作を行います
 */
/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/06 - 21:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// css

var Elements = function () {
  /**
   * 操作対象 Element を保存します
   * @param {Element|Node} element 操作対象 Element
   */

  function Elements(element) {
    (0, _classCallCheck3.default)(this, Elements);

    /**
     * 対象 Element の CSS 操作を行う Style instance
     * @type {Style}
     */
    this.style = new _Style2.default(element);
    /**
     * Element class 操作のために instance を作成します - Classes instance
     * @type {Classes}
     */
    this.classes = new _Classes2.default(element);
    /**
     * 操作対象 Element
     * @type {Element}
     */
    this.element = element;
    /**
     * Element class `ClientRect` 取得のために instance を作成します
     * @type {Bounding}
     */
    this.bounding = new _Bounding2.default(element);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * `getBoundingClientRect` を使用し引数 element の offset 値を取得します
   *
   * ```
   * {{top: Number, right: Number, left: Number, bottom: Number, width: Number, height: Number}}
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
   *
   * @return {ClientRect} プロパティ element の offset 値を返します
   */


  (0, _createClass3.default)(Elements, [{
    key: 'offset',
    value: function offset() {
      return this.bounding.offset();
    }
    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * 引数の id attribute value で HTMLElement を `document.getElementById` で取得します
     * @param {string} idName id attribute value
     * @return {?Element} Element を返します, 取得できない時は null を返します
     */

  }], [{
    key: 'id',
    value: function id(idName) {
      var element = self.document.getElementById(idName);
      // 存在チェックを行います
      return _Type2.default.exist(element) ? element : null;
    }
    /**
     * querySelector を使用し Element を探します
     * @param {string} selector 探索 selector
     * @param {Element|*} [parentNode=document] 親 Node|Element
     * @return {?Element} Element or null
     */

  }, {
    key: 'select',
    value: function select(selector) {
      var parentNode = arguments.length <= 1 || arguments[1] === undefined ? self.document : arguments[1];

      return parentNode.querySelector(selector);
    }
    /**
     * querySelectorAll を使用し Element を探します
     * @param {string} selector 探索 selector
     * @param {Element|*} [parentNode=document] 親 Node|Element
     * @return {?NodeList} NodeList or null
     */

  }, {
    key: 'selects',
    value: function selects(selector) {
      var parentNode = arguments.length <= 1 || arguments[1] === undefined ? self.document : arguments[1];

      var elements = parentNode.querySelectorAll(selector);
      return elements.length > 0 ? elements : null;
    }
  }]);
  return Elements;
}();

// util


// don


exports.default = Elements;