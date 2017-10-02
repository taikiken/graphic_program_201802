'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/01/19 - 15:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// --------------------------------
// copy [native code]
/**
 * copy [native code] - Math.floor
 * @type {function}
 * @private
 * @static
 */
var mathFloor = Math.floor;
/**
 * copy [native code] - Math.max
 * @type {function}
 * @private
 * @static
 */
var mathMax = Math.max;
/**
 * copy [native code] - Math.min
 * @type {function}
 * @private
 * @static
 */
var mathMin = Math.min;
/**
 * copy [native code] - parseInt
 * @type {function}
 * @private
 * @static
 */
var mathInt = self.parseInt;

// --------------------------------
// constant for calculate
/**
 * 計算定数
 * ```
 * 1 / 6
 * ```
 * @type {number}
 * @private
 * @static
 */
var oneSix = 1 / 6;
/**
 * 計算定数
 * ```
 * 0.5
 * ```
 * @type {number}
 * @private
 * @static
 */
var half = 0.5;
/**
 * 計算定数
 * ```
 * 2 / 3
 * ```
 * @type {number}
 * @private
 * @static
 */
var twoThree = 2 / 3;
/**
 * 計算定数
 * ```
 * 1 / 3
 * ```
 * @type {number}
 * @private
 * @static
 */
var oneThree = 1 / 3;
/**
 * 色変換ユーティリティーです
 */

var Iro = function () {
  function Iro() {
    _classCallCheck(this, Iro);
  }

  _createClass(Iro, null, [{
    key: 'rgb2hsl',

    // ----------------------------------------
    // HSL
    // ----------------------------------------
    /**
     * RGB を HSL 変換します
     * @see http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
     * @see http://www.rapidtables.com/convert/color/rgb-to-hsl.htm
     * @param {number} red RGB.red 0 ~ 255
     * @param {number} green RGB.green 0 ~ 255
     * @param {number} blue RGB.blue 0 ~ 255
     * @returns {{h: number, s: number, l: number}}
     * {hue, saturation, luminance} object を返します, それぞれ 0 ~ 1
     * hue: 0 ~ 360 を 360 で正規化されます
     */
    value: function rgb2hsl(red, green, blue) {
      var r = red / 255;
      var g = green / 255;
      var b = blue / 255;
      var maxValue = mathMax(r, g, b);
      var minValue = mathMin(r, g, b);
      // luminance
      var l = (maxValue + minValue) * 0.5;
      // hue
      var h = 0;
      // saturation
      var s = 0;
      if (maxValue === minValue) {
        // achromatic: 〘光学〙無色の; 色消しの
        return {
          h: h,
          s: s,
          l: l
        };
      }
      // ---
      var d = maxValue - minValue;
      s = l > 0.5 ? d / (2 - maxValue - minValue) : d / (maxValue + minValue);
      switch (maxValue) {
        case r:
          {
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          }
        case g:
          {
            h = (b - r) / d + 2;
            break;
          }
        case b:
          {
            h = (r - g) / d + 4;
            break;
          }
        default:
          {
            h = 0;
            break;
          }
      }
      h /= 6;
      // return value
      return {
        h: h,
        s: s,
        l: l
      };
    } // rgb2hsl
    /**
     * HSL to RGB で `saturation !== 0` な時の R, G, B 変換 helper です
     * @param {number} point `(2 * l) - q`
     * @param {number} q `l < 0.5 ? l * (1 + s) : (l + s) - (l * s)`
     * @param {number} hue hue
     * @returns {number} 0 ~ 1 な値を返します
     */

  }, {
    key: 'hue2rgb',
    value: function hue2rgb(point, q, hue) {
      var t = hue;
      if (t < 0) {
        t += 1;
      } else if (t > 1) {
        t -= 1;
      }
      if (t < oneSix) {
        return point + (q - point) * 6 * t;
      } else if (t < half) {
        return q;
      } else if (t < twoThree) {
        return point + (q - point) * (twoThree - t) * 6;
      }
      return point;
    }
    /**
     * HSL to RGB 変換します
     * @param {number} h hue 0 ~ 1 degree / 360 正規化
     * @param {number} s saturation 0 ~ 1
     * @param {number} l luminance 0 ~ 1
     * @returns {{r: number, g: number, b: number}} r, g, b: 0 ~ 255 object を返します
     */

  }, {
    key: 'hsl2rgb',
    value: function hsl2rgb(h, s, l) {
      var r = l;
      var g = l;
      var b = l;
      if (s !== 0) {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var point = 2 * l - q;
        r = Iro.hue2rgb(point, q, h + oneThree);
        g = Iro.hue2rgb(point, q, h);
        b = Iro.hue2rgb(point, q, h - oneThree);
      }
      return {
        r: mathInt(r * 255, 10),
        g: mathInt(g * 255, 10),
        b: mathInt(b * 255, 10)
      };
    }
    // ----------------------------------------
    // HSV
    // ----------------------------------------
    /**
     * RGB to HSV(HSB) 変換
     * @param {number} r RGB.red 0 ~ 255
     * @param {number} g RGB.green 0 ~ 255
     * @param {number} b RGB.blue 0 ~ 255
     * @returns {{h: number, s: number, v: number}} 各 0 ~ 1
     */

  }, {
    key: 'rgb2hsv',
    value: function rgb2hsv(r, g, b) {
      // 正規化
      var red = r / 255;
      var green = g / 255;
      var blue = b / 255;

      var maxValue = mathMax(red, green, blue);
      var minValue = mathMin(red, green, blue);
      var v = maxValue;
      var d = maxValue - minValue;
      var s = maxValue === 0 ? 0 : d / maxValue;
      var h = 0;
      if (maxValue === minValue) {
        // achromatic: 〘光学〙無色の; 色消しの
        return {
          h: h,
          s: s,
          v: v
        };
      }
      // ---
      switch (maxValue) {
        case red:
          {
            h = (green - blue) / d + (green < blue ? 6 : 0);
            break;
          }
        case green:
          {
            h = (blue - red) / d + 2;
            break;
          }
        case blue:
          {
            h = (red - green) / d + 4;
            break;
          }
        default:
          {
            h = 0;
            break;
          }
      }
      h /= 6;
      return {
        h: h,
        s: s,
        v: v
      };
    }
    /**
     * HSV(HSB) to RGB 変換します
     * @param {number} h hue 0 ~ 1
     * @param {number} s saturation 0 ~ 1
     * @param {number} v value(bright) 0 ~ 1
     * @returns {{r: Number, g: Number, b: Number}} 各 0 ~ 255
     */

  }, {
    key: 'hsv2rgb',
    value: function hsv2rgb(h, s, v) {
      var i = mathFloor(h * 6);
      var f = h * 6 - i;
      var point = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var r = 0;
      var g = 0;
      var b = 0;
      // ---
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = point;
          break;

        case 1:
          r = q;
          g = v;
          b = point;
          break;

        case 2:
          r = point;
          g = v;
          b = t;
          break;

        case 3:
          r = point;
          g = q;
          b = v;
          break;

        case 4:
          r = t;
          g = point;
          b = v;
          break;

        case 5:
          r = v;
          g = point;
          b = q;
          break;

        default:
          r = 0;
          g = 0;
          b = 0;
          break;
      }
      // ---
      return {
        r: mathInt(r * 255, 10),
        g: mathInt(g * 255, 10),
        b: mathInt(b * 255, 10)
      };
    }
    // ----------------------------------------
    // HEX
    // ----------------------------------------
    /**
     * CSS shorthand 色指定をフル変換します
     * @param {string} hex `#f00` な CSS 色形式
     * @returns {?string} `ff0000` フル変換し返します
     * @see http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     */

  }, {
    key: 'shorthand',
    value: function shorthand(hex) {
      if (typeof hex !== 'string') {
        return null;
      }
      var pattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      var color = hex.replace(pattern, function (m, r, g, b) {
        return '' + r + r + g + g + b + b;
      });
      return color.length === 7 ? color : '#' + color;
    }
    /**
     * CSS 色指定を RGB 変換します
     * @param {string} hex CSS 色形式 `#f00` or `#ff0000`
     * @returns {?{r: number, g: number, b: number}} nullable で返します
     */

  }, {
    key: 'hex2rgb',
    value: function hex2rgb(hex) {
      var hexString = Iro.shorthand(hex);
      if (typeof hexString !== 'string') {
        return null;
      }
      // ---
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
      return Array.isArray(result) && result.length === 4 ? {
        r: mathInt(result[1], 16),
        g: mathInt(result[2], 16),
        b: mathInt(result[3], 16)
      } : null;
    }
    /**
     * 0 ~ 255 RGB color number を `00` な 16進形式に変換します
     * @param {number} colorNumber 変換する RGB color number
     * @returns {string} 2桁を保証し 16進 変換後文字列を返します
     */

  }, {
    key: 'int16',
    value: function int16(colorNumber) {
      var hex = colorNumber.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }
    /**
     * RGB を CSS形式 hex 変換します
     * @param {number} r red 0 ~ 255
     * @param {number} g green 0 ~ 255
     * @param {number} b blue 0 ~ 255
     * @returns {string} CSS形式 hex `#ff0000` を返します
     */

  }, {
    key: 'rgb2hex',
    value: function rgb2hex(r, g, b) {
      return '#' + Iro.int16(r) + Iro.int16(g) + Iro.int16(b);
    }
    /**
     * 0 ~ 16777215 数値を `#ffffff` な CSS 16進色形式に変換します
     * @param {number} rgb 0 ~ 16777215 名数値
     * @returns {string} `#ffffff` な CSS 16進色形式を返します
     */

  }, {
    key: 'int2hex',
    value: function int2hex(rgb) {
      var hex = mathFloor(rgb).toString(16);
      var length = hex.length;
      if (length === 6) {
        return '#' + hex;
      }
      var step = 6 - length;
      while (step) {
        hex = '0' + hex;
        step -= 1;
      }
      return '#' + hex;
    }
    /**
     * `#ffffff` な CSS 16進色形式を 10進数変換します
     * @param {string} hex `#f00` or `#ff0000` な CSS 16進色形式
     * @returns {?number} 10進数へ変換し返します
     */

  }, {
    key: 'hex2int',
    value: function hex2int(hex) {
      var hexString = Iro.shorthand(hex);
      if (typeof hexString !== 'string') {
        return null;
      }
      return mathInt(hexString.replace('#', ''), 16);
    }
    /**
     * #FFFFFF な CSS 16進を 0xFFFFFF 変換し 10進数にします
     * @param {string} hex #FFFFFF な CSS 16進
     * @return {Number} 10進数変換後の色ナンバーを返します
     */

  }, {
    key: 'toInt',
    value: function toInt(hex) {
      return parseInt(hex.replace('#', '0x'), 16);
    }
  }]);

  return Iro;
}();

exports.default = Iro;