'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/30 - 16:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * [native code] - document
 * @type {HTMLDocument}
 * @private
 * @static
 */
var document = self.document;
// /**
//  * CSS detector に使用する virtual CSSStyleDeclaration
//  * ```
//  * document.createElement('p').style
//  * ```
//  * @type {CSSStyleDeclaration}
//  * @private
//  * @static
//  * @see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
//  * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
//  */
// const style = document.createElement('p').style;
// /**
//  * vendor prefix list, CSS detector に使用します
//  * - '-webkit-',
//  * - '-moz-',
//  * - '-ms-',
//  * - '-o-',
//  * - ''
//  * @type {[string]}
//  * @private
//  * @static
//  */
// const vendors = [
//   '-webkit-',
//   '-moz-',
//   '-ms-',
//   '-o-',
//   '',
// ];

// /**
//  * CSS3 transition 可能フラッグ
//  * @type {boolean}
//  * @private
//  * @static
//  */
// const transition = vendors.some(prefix => typeof style[`${prefix}transition`] !== 'undefined');
// /**
//  * CSS3 transform 可能フラッグ
//  * @type {boolean}
//  * @private
//  * @static
//  */
// const transform = vendors.some(prefix => typeof style[`${prefix}transform`] !== 'undefined');

// /**
//  * touch event 使用可能フラッグ
//  * @type {boolean}
//  */
// const touch = 'ontouchstart' in document.documentElement;

// /**
//  * canvas detect flag
//  * @type {boolean}
//  */
// const canvas = !!window.CanvasRenderingContext2D;

// /**
//  * webgl detect flag
//  * @type {boolean}
//  */
// let webgl = false;
// if (canvas) {
//   try {
//     webgl = !!window.WebGLRenderingContext &&
//       !!document.createElement('canvas').getContext('experimental-webgl');
//   } catch (e) {
//     webgl = false;
//   }
// }

// /**
//  * addEventListener 第三引数 - { passive: true } : false するためのブラウザテスト・フラッグ
//  *
//  * TouchEvent#Using with addEventListener() and preventDefault()
//  * <pre>
//  * It's important to note that in many cases, both touch and mouse events get sent (in order to let non-touch-specific code still interact with the user). If you use touch events, you should call preventDefault() to keep the mouse event from being sent as well.
//  * The exception to this is Chrome, starting with version 56 (desktop, Chrome for android, and android webview), where the default value for touchstart and touchmove is true and calls to preventDefault() are not needed. To override this behavior, you simply set the passive option to false as shown in the example below. This change prevents the listener from blocking page rendering while a user is scrolling. A demo is available on the Google Developer site.
//  * </pre>
//  * @private
//  * @type {boolean}
//  * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
//  * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
//  * @see https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html
//  * @since 0.3.2
//  */
// let supportsPassive = false;
// try {
//   const opts = Object.defineProperty({}, 'passive', {
//     get() {
//       supportsPassive = true;
//     },
//   });
//   window.addEventListener('test', null, opts);
// } catch (e) {
//   supportsPassive = false;
//   // console.warn('passive test', e);
// }

/**
 * 判定結果を保持します
 * @type {{transition: ?boolean, transform: ?boolean, touch: ?boolean, canvas: ?boolean, webgl: ?boolean, passive: ?boolean}}
 */
var can = {
  transition: null,
  transform: null,
  touch: null,
  canvas: null,
  webgl: null,
  passive: null
};

/**
 * CSS3 機能使用可能かを調べます
 * @example
 * if (Can.transition()) {
 *  // can CSS3 transition
 * }
 *
 * if (Can.transform()) {
 *  // can CSS3 transform
 * }
 */

var Can = function () {
  function Can() {
    _classCallCheck(this, Can);
  }

  _createClass(Can, null, [{
    key: 'transition',

    /**
     * CSS3 transition が使用可能かを調べます
     * @returns {?boolean} true: 使用可能
     */
    value: function transition() {
      if (can.transition === null) {
        var style = document.createElement('p').style;
        // eslint-disable-next-line max-len
        can.transition = Can.vendors.some(function (prefix) {
          return typeof style[prefix + 'transition'] !== 'undefined';
        });
      }
      return can.transition;
    }
    /**
     * CSS3 transform が使用可能かを調べます
     * @returns {?boolean} true: 使用可能
     */

    /**
     * vendor prefix list, CSS detector に使用します
     * - '-webkit-',
     * - '-moz-',
     * - '-ms-',
     * - '-o-',
     * - ''
     * @type {[string,string,string,string,string]}
     */

  }, {
    key: 'transform',
    value: function transform() {
      if (can.transform === null) {
        var style = document.createElement('p').style;
        // eslint-disable-next-line max-len
        can.transform = Can.vendors.some(function (prefix) {
          return typeof style[prefix + 'transform'] !== 'undefined';
        });
      }
      return can.transform;
    }
    /**
     * addEventListener 第三引数 - { passive: true } が使用できるかを調べます
     *
     * TouchEvent#Using with addEventListener() and preventDefault()
     * <pre>
     * It's important to note that in many cases, both touch and mouse events get sent (in order to let non-touch-specific code still interact with the user). If you use touch events, you should call preventDefault() to keep the mouse event from being sent as well.
     * The exception to this is Chrome, starting with version 56 (desktop, Chrome for android, and android webview), where the default value for touchstart and touchmove is true and calls to preventDefault() are not needed. To override this behavior, you simply set the passive option to false as shown in the example below. This change prevents the listener from blocking page rendering while a user is scrolling. A demo is available on the Google Developer site.
     * </pre>
     * @returns {?boolean} true: 使用可能
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
     * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
     * @see https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html
     * @since 0.3.2
     */

  }, {
    key: 'passive',
    value: function passive() {
      if (can.passive === null) {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
              supportsPassive = true;
            }
          });
          window.addEventListener('test', null, opts);
        } catch (e) {
          supportsPassive = false;
          // console.warn('passive test', e);
        }
        can.passive = supportsPassive;
      }
      return can.passive;
    }
    /**
     * touch event 使用可能かを調べます
     * @returns {?boolean} true: 使用可能
     * @since 4.0.1
     */

  }, {
    key: 'touch',
    value: function touch() {
      if (can.touch === null) {
        can.touch = 'ontouchstart' in document.documentElement;
      }
      return can.touch;
    }
    /**
     * canvas 使用可能かを調べます
     * @returns {?boolean} true: canvas 使用可能
     * @since 4.0.1
     */

  }, {
    key: 'canvas',
    value: function canvas() {
      if (can.canvas === null) {
        can.canvas = !!window.CanvasRenderingContext2D;
      }
      return can.canvas;
    }
    /**
     * webgl 使用可能かを調べます
     * @returns {?boolean} true: webgl 使用可能
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat
     * @see https://qiita.com/tonkotsuboy_com/items/cdffcdd7bdccac371292
     * @since 4.0.1
     */

  }, {
    key: 'webgl',
    value: function webgl() {
      if (can.webgl === null) {
        var webgl = false;
        if (Can.canvas()) {
          var canvas = document.createElement('canvas');
          var webGLContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
          try {
            webgl = !!(window.WebGLRenderingContext && webGLContext && webGLContext.getShaderPrecisionFormat);
          } catch (e) {
            webgl = false;
          }
        }
        can.webgl = webgl;
      }
      return can.webgl;
    }
  }]);

  return Can;
}();

Can.vendors = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
exports.default = Can;