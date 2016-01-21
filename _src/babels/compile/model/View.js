/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 16:20
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
exports.View = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * React.createClass と ReactDOM.render DOM 生成を行う
 */

var View = exports.View = function () {
  /**
   *
   * @param {Element} rootElement renter root element
   * @param {ReactClass} reactClass React.createClass instance
   */

  function View(rootElement, reactClass) {
    (0, _classCallCheck3.default)(this, View);

    this._element = rootElement;
    this._react = reactClass;
  }

  /**
   * element へ Dom を生成します
   * @param {Object} [option={}] props option
   * @return {ReactComponent} ReactDOM.render 戻り値を返します
   */

  (0, _createClass3.default)(View, [{
    key: 'render',
    value: function render() {
      var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return ReactDOM.render(React.createElement(this._react, option), this._element);
    }
  }]);
  return View;
}();