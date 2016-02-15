/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/05 - 22:40
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
exports.ViewTitle = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _View2 = require('./View');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * title 表示
 */

var ViewTitle = exports.ViewTitle = function (_View) {
  (0, _inherits3.default)(ViewTitle, _View);

  /**
   * 記事タイトルを表示します
   * @param {string} label 表示タイトル文字
   * @param {Element} element insert parent element
   * @param {Object} [option={}] optional event handler
   */

  function ViewTitle(label, element) {
    var option = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    (0, _classCallCheck3.default)(this, ViewTitle);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewTitle).call(this, element, option));

    _this._label = label;
    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {string|*} title 文字を返します
   */

  (0, _createClass3.default)(ViewTitle, [{
    key: 'render',

    // ---------------------------------------------------
    //  Method
    // ---------------------------------------------------
    /**
     * HTMLElement を生成します
     */
    value: function render() {

      var TitleDom = React.createClass({
        displayName: 'TitleDom',

        propType: {
          label: React.PropTypes.string.isRequired
        },
        render: function render() {

          return React.createElement(
            'div',
            { className: 'category-heading' },
            React.createElement(
              'h1',
              null,
              this.props.label
            )
          );
        }
      });

      ReactDOM.render(React.createElement(TitleDom, { label: this.label }), this.element);
    }
  }, {
    key: 'label',
    get: function get() {
      return this._label;
    }
    /**
     * title 文字を設定します
     * @param {string} label title 文字
     */
    ,
    set: function set(label) {
      this._label = label;
    }
  }]);
  return ViewTitle;
}(_View2.View);