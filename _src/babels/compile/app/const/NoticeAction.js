/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 23:12
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
exports.NoticeAction = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _message = {
  comment: '返信',
  reply: '返信',
  good: 'Good',
  bad: 'Bad',
  notice: '通知'
};
/**
 * <h3>お知らせ定型文</h3>
 */

var NoticeAction = exports.NoticeAction = function () {
  /**
   *
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function NoticeAction(target) {
    (0, _classCallCheck3.default)(this, NoticeAction);

    if (_symbol !== target) {

      throw new Error('NoticeAction is static Class. not use new NoticeAction().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * action に対応するメッセージ
   * - reply : 返信された
   * - good : goodされた
   * - bad : badされた
   * - notice : ニュース的通知
   *
   * @param {string} action アクティビティの種類
   * @return {string} action に対応するメッセージ を返します
   */

  (0, _createClass3.default)(NoticeAction, null, [{
    key: 'message',
    value: function message(action) {
      return _message[action];
    }
  }]);
  return NoticeAction;
}();