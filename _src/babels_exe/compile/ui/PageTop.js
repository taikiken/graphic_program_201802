/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 18:14
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
exports.PageTop = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TweenLite = self.TweenLite;
var easing = self.com.greensock.easing;

/**
 * page top に戻る
 */

var PageTop = exports.PageTop = function () {
  /**
   * page top に戻る motion
   */

  function PageTop() {
    (0, _classCallCheck3.default)(this, PageTop);

    this._boundComplete = this.onComplete.bind(this);
    this._can = true;
  }
  /**
   * click event を bind します
   */

  (0, _createClass3.default)(PageTop, [{
    key: 'init',
    value: function init() {
      _Dom.Dom.pageTop().addEventListener('click', this.onClick.bind(this), false);
    }
    /**
     * element click event handler
     * @param {Event} event native event, click event
     */

  }, {
    key: 'onClick',
    value: function onClick(event) {
      event.preventDefault();

      // click 不可のときは処理しない
      if (!this._can) {
        return;
      }

      var complete = this._boundComplete;
      this._can = false;

      // scrolling
      TweenLite.to(window, 0.5, {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        // easing
        ease: easing.Power4.easeInOut,
        onComplete: complete
      });
    }
    /**
     * page top motion complete
     */

  }, {
    key: 'onComplete',
    value: function onComplete() {
      this._can = true;
    }
  }]);
  return PageTop;
}();