'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPSettings = undefined;

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
/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 22:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

var UT = self.UT;

var SPSettings = exports.SPSettings = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPSettings(target) {
    (0, _classCallCheck3.default)(this, SPSettings);

    if (_symbol !== target) {

      throw new Error('SPSettings is static Class. not use new SPSettings().');
    }
  }
  /**
   * 基本情報設定
   */

  (0, _createClass3.default)(SPSettings, null, [{
    key: 'account',
    value: function account() {
      var settings = _Dom.Dom.settings();

      if (settings !== null) {
        var setting = new UT.view.settings.ViewSettingsIndex(settings);
        setting.start();
      }
    }
    /**
     * パーソナライズ設定
     */

  }, {
    key: 'interest',
    value: function interest() {
      var settings = _Dom.Dom.settings();

      if (settings !== null) {
        var setting = new UT.view.settings.ViewSettingsInterest(settings);
        setting.start();
      }
    }
    /**
     * 退会
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      var settings = _Dom.Dom.settings();
      var modal = _Dom.Dom.modal();
      if (settings !== null && modal !== null) {
        var _deactivate = new UT.view.signup.ViewDeactivate(settings, modal);
        _deactivate.start();
      }
    }
  }]);
  return SPSettings;
}();