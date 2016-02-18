/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:01
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
exports.ViewHeaderSearch = undefined;

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

var _View2 = require('../View');

var _Url = require('../../app/const/Url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * 検索フォーム
 */

var ViewHeaderSearch = exports.ViewHeaderSearch = function (_View) {
  (0, _inherits3.default)(ViewHeaderSearch, _View);

  /**
   * 検索フォーム + ロケーション遷移
   * @param {Element} element insert parent element
   * @param {Object} [option={}] optional event handler
   */

  function ViewHeaderSearch(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, ViewHeaderSearch);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeaderSearch).call(this, element, option));
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * render 実行
   */

  (0, _createClass3.default)(ViewHeaderSearch, [{
    key: 'start',
    value: function start() {
      this.render();
    }
    /**
     * HTMLElement を生成します
     */

  }, {
    key: 'render',
    value: function render() {

      var SearchDom = React.createClass({
        displayName: 'SearchDom',

        getInitialState: function getInitialState() {
          return {
            keyword: ''
          };
        },
        render: function render() {

          return React.createElement(
            'form',
            { onSubmit: this.submitHandler },
            React.createElement('input', { type: 'text', placeholder: '記事を探す', value: this.state.keyword, onChange: this.changeHandler }),
            React.createElement('input', { type: 'submit' })
          );
        },
        changeHandler: function changeHandler(event) {
          this.setState({ keyword: event.target.value });
        },
        submitHandler: function submitHandler(event) {
          event.preventDefault();

          if (this.state.keyword === '') {
            throw new Error('not input keyword');
          } else {

            location.href = _Url.Url.search(this.state.keyword);
          }
        }
      });

      ReactDOM.render(React.createElement(SearchDom, null), this.element);
    }
  }]);
  return ViewHeaderSearch;
}(_View2.View);