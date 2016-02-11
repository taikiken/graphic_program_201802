/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 20:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationsDae = undefined;

var _Safety = require('../../data/Safety');

var _NoticeDae = require('./NoticeDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * お知らせ JSON response
 */

var NotificationsDae = exports.NotificationsDae = function () {
  /**
   * お知らせ JSON response
   * @param {Object} [response={}] JSON response
   */

  function NotificationsDae() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, NotificationsDae);

    response = _Safety.Safety.object(response);

    var notifications = response.notifications;
    notifications = _Safety.Safety.array(notifications);
    var list = [];
    notifications.forEach(function (notice) {

      list.push(new _NoticeDae.NoticeDae(notice));
    });

    this._response = response;
    this._notifications = list;
  }
  /**
   * @return {Object|*} JSON response を返します
   */

  (0, _createClass3.default)(NotificationsDae, [{
    key: 'response',
    get: function get() {
      return this._response;
    }
    /**
     * @return {Array<NoticeDae>} JSON response.notifications を返します
     */

  }, {
    key: 'notifications',
    get: function get() {
      return this._notifications;
    }
    /**
     * @return {Number} count を返します
     */

  }, {
    key: 'total',
    get: function get() {
      return this.response.count;
    }
    /**
     * alias total
     * @return {Number} count を返します
     */

  }, {
    key: 'count',
    get: function get() {
      return this.total;
    }
  }]);
  return NotificationsDae;
}();