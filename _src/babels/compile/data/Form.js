/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 18:20
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
exports.Form = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Data = require('./Data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * Ajax request で送信する body 要素を作成します
 */

var Form = exports.Form = function () {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Form(target) {
    (0, _classCallCheck3.default)(this, Form);

    if (_symbol !== target) {

      throw new Error('Form is static Class. not use new Form().');
    }
  }

  /**
   *
   * @param {Array<Data>} option [data...] key: value 値 配列
   * @return {FormData} 引数 option（配列）から作成したFormData instance を返します
   */

  (0, _createClass3.default)(Form, null, [{
    key: 'data',
    value: function data(option) {

      // https://developer.mozilla.org/ja/docs/Web/Guide/Using_FormData_Objects
      var form = new FormData();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(option), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var data = _step.value;

          form.append(data.key, data.value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return form;
    }

    /**
     * form element から FormData を作成します
     *
     * @example
     * let data = Form.element( document.querySelector("form") )
     *
     * @param {Element} formElement form element
     * @return {FormData} elemet から FormData を作成し返します
     */

  }, {
    key: 'element',
    value: function element(formElement) {

      return new FormData(formElement);
    }
  }]);
  return Form;
}();