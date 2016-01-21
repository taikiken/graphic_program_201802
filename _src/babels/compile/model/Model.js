/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 18:49
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
exports.Model = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = self.React;

// template pattern のような class
/**
 * React.createClass を行います
 */

var Model = exports.Model = function () {
  /**
   * 継承しReact.createClassを行います
   */

  function Model() {
    (0, _classCallCheck3.default)(this, Model);

    this._react = null;
  }

  (0, _createClass3.default)(Model, [{
    key: 'willMount',
    value: function willMount() {}
  }, {
    key: 'didMount',
    value: function didMount() {}
  }, {
    key: 'willUpdate',
    value: function willUpdate() {}
  }, {
    key: 'didUpdate',
    value: function didUpdate() {}
  }, {
    key: 'willUnmount',
    value: function willUnmount() {}
  }, {
    key: 'react',
    get: function get() {
      return this._react;
    }
  }]);
  return Model;
}();