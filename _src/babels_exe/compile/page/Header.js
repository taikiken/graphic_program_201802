/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:39
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
exports.Header = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

var Header = exports.Header = function () {
  function Header(target) {
    (0, _classCallCheck3.default)(this, Header);

    if (_symbol !== target) {

      throw new Error('Header is static Class. not use new Header().');
    }
  }

  (0, _createClass3.default)(Header, null, [{
    key: 'start',
    value: function start() {
      // header.user
      var headerUser = new UT.view.header.ViewHeaderUser(document.getElementById('user-profile-container'));
      headerUser.start();
    }
  }]);
  return Header;
}();