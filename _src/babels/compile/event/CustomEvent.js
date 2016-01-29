"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomEvent = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 21:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

var CustomEvent = exports.CustomEvent = function () {
  function CustomEvent(type) {
    var scope = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
    (0, _classCallCheck3.default)(this, CustomEvent);

    this._type = type;
    this._scope = scope;
    this._taget = null;
    this._currentTarget = scope;
  }

  (0, _createClass3.default)(CustomEvent, [{
    key: "target",
    get: function get() {
      return this._taget;
    },
    set: function set(target) {
      this._taget = target;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "scope",
    get: function get() {
      return this._scope;
    }
  }, {
    key: "currentTarget",
    get: function get() {
      return this._currentTarget;
    }
  }]);
  return CustomEvent;
}();