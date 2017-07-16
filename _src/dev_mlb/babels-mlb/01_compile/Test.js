'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2017/07/14 - 19:00
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Calendar = require('./mlb/component/calendar/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function () {
  function Test() {
    _classCallCheck(this, Test);
  }

  _createClass(Test, null, [{
    key: 'toolbar',
    value: function toolbar() {
      var _this = this;

      // @see https://github.com/intljusticemission/react-big-calendar/issues/191
      // toolbar を custom する
      // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
      // div.onClick warning
      return function (toolbar) {
        var goToBack = function goToBack() {
          toolbar.onNavigate('PREV');
        };
        var goToNext = function goToNext() {
          toolbar.onNavigate('NEXT');
        };
        var goToCurrent = function goToCurrent() {
          toolbar.onNavigate('TODAY');
        };
        return _react2.default.createElement(
          'div',
          { className: 'toolbar-container' },
          _react2.default.createElement(
            'div',
            { className: 'navigation-buttons' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-back', onClick: goToBack },
              _react2.default.createElement('p', { className: 'prev-icon' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'label-date', onClick: goToCurrent, role: 'button', tabIndex: '0' },
              _this.state.monthLabel
            ),
            _react2.default.createElement(
              'button',
              { className: 'btn btn-next', onClick: goToNext },
              _react2.default.createElement('p', { className: 'next-icon' })
            )
          )
        );
      };
    }
  }, {
    key: 'make',
    value: function make(element, option) {
      console.log('Test.make option', option);
      _reactDom2.default.render(_react2.default.createElement(_Calendar2.default, {
        events: option.events,
        today: option.today,
        selected: option.selected,
        slot: option.slot,
        view: option.view,
        navigate: option.navigate
      }), element);
    }
  }]);

  return Test;
}();

exports.default = Test;