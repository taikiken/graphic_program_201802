/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
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
exports.Ajax = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ajax = exports.Ajax = function () {
  function Ajax() {
    (0, _classCallCheck3.default)(this, Ajax);

    this._can = true;
  }

  (0, _createClass3.default)(Ajax, [{
    key: 'start',
    value: function start(url) {

      if (!this.can) {

        return;
      }

      this.disable();
    }
  }, {
    key: 'enable',
    value: function enable() {
      this._can = true;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this._can = false;
    }
  }, {
    key: 'can',
    get: function get() {
      return this._can;
    }
  }]);
  return Ajax;
}();