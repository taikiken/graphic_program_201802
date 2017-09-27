"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/07/12 - 19:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * custom Event のリスナー関数引数に送られる Event Object
 *
 * EventDispatcher.dispatch する時の引数として使用します
 *
 * 3つのプロパティは必須項目です、イベントにあわせプロパティを追加します
 *
 * - type: string, イベント種類
 * - target: *, イベント発生インスタンス
 * - currentTarget: *, current イベント発生インスタンス
 */
var Events = function () {
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * custom Event Object
   * @param {string} type イベント種類
   * @param {*} [currentTarget=this] current イベント発生インスタンス
   * @param {*} [target=this] イベント発生インスタンス
   * */
  function Events(type) {
    var currentTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    _classCallCheck(this, Events);

    /**
     * イベント種類
     * @type {string}
     */
    this.type = type;
    /**
     * target instance
     * @type {*}
     */
    this.target = target;
    /**
     * currentTarget instance
     * @type {*}
     */
    this.currentTarget = currentTarget;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * 複製を作成します
   * @returns {Events|*} 複製を返します
   */


  _createClass(Events, [{
    key: "clone",
    value: function clone() {
      // return new Events(this.type, this.currentTarget, this.target);
      return Object.assign({}, this);
    }
  }]);

  return Events;
}();

exports.default = Events;