/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 18:29
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
exports.HeadersOption = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>Fetch Request Headers を作成します</h3>
 * 全て static
 */

var HeadersOption = function () {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function HeadersOption(target) {
    (0, _classCallCheck3.default)(this, HeadersOption);

    if (_symbol !== target) {

      throw new Error('Api is static Class. not use new Api().');
    }
  }
  /**
   *
   * @param {string} token auth token
   * @param {Object} [option={}] headers object, ない時は新規に作ります
   * @return {*} headers へセットする Object を返します
   */

  (0, _createClass3.default)(HeadersOption, null, [{
    key: 'token',
    value: function token(_token) {
      var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      option = _Safety.Safety.object(option);
      option.Authorization = 'OAuth realm=undotsushin.com, oautn_token=' + _token;
      // option.Accept = 'application/json';
      // option[ 'Access-Control-Allow-Origin"' ] = '*';
      /*
          option = new Headers();
          option.append( 'Authorization', `OAuth realm=undotsushin.com, oautn_token=${token}` );
          option.append( 'Access-Control-Allow-Origin', '*' );
      */
      return option;
    }
  }]);
  return HeadersOption;
}();

exports.HeadersOption = HeadersOption;