/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/20 - 15:49
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
exports.SPSignup = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

/**
 * <h3>signup wizard</h3>
 * 全て static です
 */

var SPSignup = exports.SPSignup = function () {
  /**
   * signup wizard (3 step) singleton class です
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPSignup(target) {
    (0, _classCallCheck3.default)(this, SPSignup);

    if (_symbol !== target) {

      throw new Error('SPSignup is static Class. not use new SPSignup().');
    }
  }
  /**
   * rendering 開始
   */

  (0, _createClass3.default)(SPSignup, null, [{
    key: 'start',
    value: function start() {
      var signupElement = _Dom.Dom.signup();
      if (signupElement !== null) {
        var signup = new UT.view.signup.SignupWizard(signupElement);
        signup.start();
      }
    }
  }]);
  return SPSignup;
}();