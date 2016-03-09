/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 15:10
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
exports.SPUserProfile = undefined;

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

var SPUserProfile = exports.SPUserProfile = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPUserProfile(target) {
    (0, _classCallCheck3.default)(this, SPUserProfile);

    if (_symbol !== target) {

      throw new Error('SPUserProfile is static Class. not use new SPUserProfile().');
    }
  }
  /**
   * rendering 開始
   */

  (0, _createClass3.default)(SPUserProfile, null, [{
    key: 'start',
    value: function start() {
      var element = _Dom.Dom.userProfile();
      if (element !== null) {
        var profile = new UT.view.mypage.ViewUserProfile(element);
        profile.start();
      }
    }
  }]);
  return SPUserProfile;
}();