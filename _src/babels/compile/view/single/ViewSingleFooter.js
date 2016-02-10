/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 21:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSingleFooter = undefined;

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

var _SingleDae = require('../../dae/SingleDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * detail 下部(tag)
 */

var ViewSingleFooter = exports.ViewSingleFooter = function (_View) {
  (0, _inherits3.default)(ViewSingleFooter, _View);

  /**
   * detail 下部(tag)
   * @param {Element} element single footer root element
   * @param {SingleDae} single 変換済み JSON data
   */

  function ViewSingleFooter(element, single) {
    (0, _classCallCheck3.default)(this, ViewSingleFooter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSingleFooter).call(this, element));

    _this._single = single;
    _this._rendered = null;
    return _this;
  }
  /**
   * render 処理を開始します
   */

  (0, _createClass3.default)(ViewSingleFooter, [{
    key: 'start',
    value: function start() {
      this.render(this._single);
    }
    /**
     * render します
     * @param {SingleDae} singleDae JSON 変換済みデータ
     */

  }, {
    key: 'render',
    value: function render(singleDae) {

      var element = this.element;

      var FooterDom = React.createClass({
        displayName: 'FooterDom',

        propTypes: {
          single: React.PropTypes.object.isRequired
        },
        getInitialState: function getInitialState() {
          return {
            single: this.props.single
          };
        },
        render: function render() {

          var single = this.state.single;
          var keywords = single.keywords;

          if (keywords.hasKeyword) {

            return React.createElement(
              'div',
              { className: 'post-tags' },
              React.createElement(
                'h2',
                { className: 'post-tags-heading' },
                'TAGS'
              ),
              React.createElement(
                'ul',
                { className: 'post-tags-list' },
                keywords.keywords.map(function (keyword, i) {

                  return React.createElement(
                    'li',
                    { key: 'keyword-' + i, className: 'post-tags-item' },
                    React.createElement(
                      'a',
                      { href: '/search/' + keyword },
                      keyword
                    )
                  );
                })
              )
            );
          } else {

            return null;
          }
        },
        updateSingle: function updateSingle(single) {
          this.setState({ single: single });
        }
      });

      if (this._rendered === null) {

        this._rendered = ReactDOM.render(React.createElement(FooterDom, { single: singleDae }), element);
      } else {

        this._rendered.updateSingle(singleDae);
      }
    }
  }]);
  return ViewSingleFooter;
}(_View2.View);