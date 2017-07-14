'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2016/10/06 - 21:52
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// util


// css


var _Type = require('../util/Type');

var _Type2 = _interopRequireDefault(_Type);

var _Text = require('../util/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Patterns = require('./Patterns');

var _Patterns2 = _interopRequireDefault(_Patterns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Element の style を操作します
 */
var Style = function () {
  _createClass(Style, null, [{
    key: 'compute',

    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * element style を取得します,
     * [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) を使用します
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
     * @param {Object|Window} view Document.defaultView
     * @param {Element} element 操作対象 Element
     * @param {string} [property=''] 調査対象 CSS property name, 省略すると `CSSStyleDeclaration` 全セットを返します
     * @returns {CSSStyleDeclaration|CssStyle|string|undefined} style value を返します
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView
     */
    value: function compute(view, element) {
      var property = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var style = view.getComputedStyle(element, null);
      if (_Type2.default.exist(property)) {
        var props = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        return style.getPropertyValue(props);
      }
      return style;
    }
    /**
     * CSS 設定値の short hand をパターン {@link Patterns} から探し返します
     * @param {Object|Window} view Document.defaultView
     * @param {Element} element 操作対象 Element
     * @param {Array<string>} patterns 調査対象 CSS property name の配列
     * @returns {CssStyle|string|undefined} style value を返します
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView
     */

  }, {
    key: 'shortHand',
    value: function shortHand(view, element, patterns) {
      var top = Style.compute(view, element, patterns[0]);
      var right = Style.compute(view, element, patterns[1]);
      var bottom = Style.compute(view, element, patterns[2]);
      var left = Style.compute(view, element, patterns[3]);
      if (!top && !right && !bottom && !left) {
        return undefined;
      } else if (top === bottom) {
        // top - bottom: same
        if (right === left) {
          // top - bottom: same
          if (top === right) {
            // right - left: same - all same
            return top;
          }
          // top-bottom, left-right
          return top + ' ' + right;
        }
        // separate 4
        return top + ' ' + right + ' ' + bottom + ' ' + left;
      } else if (right === left) {
        // top - bottom: different, left- right: same
        return top + ' ' + right + ' ' + bottom;
      }
      // separate 4
      return top + ' ' + right + ' ' + bottom + ' ' + left;
    }
    // ----------------------------------------
    // CONSTRUCTOR
    // ----------------------------------------
    /**
     * 引数 element の初期 style 設定を保存し復元できるようにします
     * @param {?Element} element 操作対象 Element
     */

  }]);

  function Style(element) {
    _classCallCheck(this, Style);

    /**
     * 操作対象 Element
     * @type {Element}
     */
    this.element = element;
    // @type {string} - オリジナルの element.style.cssText を保持します
    var css = this.current();
    /**
     * 現在の inline CSS
     * @type {string}
     */
    this.css = css;
    /**
     * インスタンス作成時の inline CSS
     * @type {string}
     */
    this.original = css;
    // /**
    //  * インスタンス作成時の inline CSS を上書きします
    //  * @param {string} style 上書き用 CSS 設定
    //  * @returns {string} 上書きされた CSS
    //  */
    // this.update = (style) => {
    //   css = style;
    //   return style;
    // };
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * インスタンス作成時に保存した inline CSS を上書きします
   * @param {string} style 上書き用 CSS 設定
   * @returns {string} 上書きされた CSS
   */


  _createClass(Style, [{
    key: 'update',
    value: function update(style) {
      this.css = style;
      return style;
    }
    /**
     * style value を取得します
     * @param {string} [property=''] 調査する style property name
     * @return {string} style value を返します
     */

  }, {
    key: 'get',
    value: function get() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var element = this.element;
      var ownerDocument = element.ownerDocument;
      var defaultView = ownerDocument.defaultView;
      var style = Style.compute(defaultView, element, property);
      // firefox が css shorthand の取り扱いが違うので再度マッチテストする
      if (style === '' && property && _Patterns2.default.match(property)) {
        style = Style.shortHand(defaultView, element, _Patterns2.default.get(property));
      }
      return style;
    }
    /**
     * element へ css を設定します、設定済み css を上書きします
     * @param {string} property 設定する css property name
     * @param {string} value 設定する css value
     * @return {boolean} 変更されると true を返します
     */

  }, {
    key: 'set',
    value: function set(property, value) {
      // 存在チェック
      var element = this.element;
      if (!_Type2.default.exist(element)) {
        return false;
      }
      // 存在する時のみ処理を行います
      var prop = _Text2.default.camel(property);
      element.style[prop] = value;

      return true;
    }
    /**
     * element の inline style(style.cssText) を取得します
     * @return {string} style.cssText を返します
     */

  }, {
    key: 'current',
    value: function current() {
      var element = this.element;
      if (_Type2.default.exist(element)) {
        return element.style.cssText;
      }

      // this.element 不正の時は空文字を返します
      return '';
    }
    /**
     * element の style.cssText をインスタンス作成時点まで戻します
     * @return {string} 設定した css を返します
     */

  }, {
    key: 'restore',
    value: function restore() {
      var css = this.original;
      this.element.style.cssText = css;
      return css;
    }
    /**
     * `save` 実行時に設定されている inline style を default にします
     * @returns {string} 設定されている inline style を返します
     */

  }, {
    key: 'save',
    value: function save() {
      var style = this.current();
      return this.update(style);
    }
  }]);

  return Style;
}();

exports.default = Style;