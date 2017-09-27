'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ScrollEvents2 = require('./ScrollEvents');

var _ScrollEvents3 = _interopRequireDefault(_ScrollEvents2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/08/04 - 18:02
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * {@link Resizing} Events
 */
var ResizingEvents = function (_ScrollEvents) {
  _inherits(ResizingEvents, _ScrollEvents);

  /**
   * {@link Resizing} Events
   * @param {string} type イベント種類
   * @param {*} currentTarget current イベント発生インスタンス
   * @param {*} [target=undefined] イベント発生インスタンス
   */
  function ResizingEvents(type, currentTarget) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, ResizingEvents);

    // -----
    /**
     * body clientWidth
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (ResizingEvents.__proto__ || Object.getPrototypeOf(ResizingEvents)).call(this, type, currentTarget, target));

    _this.bodyWidth = 0;
    /**
     * body clientHeight
     * @type {number}
     */
    _this.bodyHeight = 0;
    return _this;
  }

  return ResizingEvents;
}(_ScrollEvents3.default);

exports.default = ResizingEvents;