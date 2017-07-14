'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Events2 = require('../Events');

var _Events3 = _interopRequireDefault(_Events2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/11/20 - 10:54
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * {@link Scroll} Events
 */
var ScrollEvents = function (_Events) {
  _inherits(ScrollEvents, _Events);

  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * custom Event Object
   * @param {string} type イベント種類
   * @param {*} currentTarget current イベント発生インスタンス
   * @param {*} [target=undefined] イベント発生インスタンス
   * */
  function ScrollEvents(type, currentTarget) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, ScrollEvents);

    /**
     * scroll top 前回位置(px)
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (ScrollEvents.__proto__ || Object.getPrototypeOf(ScrollEvents)).call(this, type, currentTarget, target));

    _this.previous = -1;
    /**
     * オリジナルイベント(window.onscroll)
     * @type {?Event}
     */
    _this.original = null;
    /**
     * scroll top 現在位置(px)
     * @type {number}
     */
    _this.y = 0;
    /**
     * window innerHeight
     * @type {number}
     */
    _this.height = 0;
    /**
     * window innerWidth
     * @type {number}
     */
    _this.width = 0;
    /**
     * window 下端位置(scroll top + window height)
     * @type {number}
     */
    _this.bottom = 0;
    /**
     * scroll top 位置が前回と違うかを表すフラッグ, true: 違う
     * @type {boolean}
     */
    _this.changed = false;
    /**
     * UP / DOWN と前回からの移動距離(px), 正(+): scroll down
     * @type {number}
     */
    _this.moving = 0;
    return _this;
  }

  return ScrollEvents;
}(_Events3.default);

exports.default = ScrollEvents;