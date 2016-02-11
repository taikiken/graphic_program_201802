/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/03 - 16:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelUsersSelf = undefined;

var _Model2 = require('../Model');

var _UsersSelf = require('../../action/users/UsersSelf');

var _UserDae = require('../../dae/UserDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 自分の情報
 */

var ModelUsersSelf = exports.ModelUsersSelf = function (_Model) {
  (0, _inherits3.default)(ModelUsersSelf, _Model);

  /**
   * マイページの表示に利用, 自分の情報
   * @param {Object} [option={}] optional event handler
   */

  function ModelUsersSelf() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ModelUsersSelf);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ModelUsersSelf).call(this, option));

    _this._action = new _UsersSelf.UsersSelf(_this.done.bind(_this), _this.fail.bind(_this));
    return _this;
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ModelUsersSelf, [{
    key: 'start',
    value: function start() {

      this.action.start();
    }
    /**
     * Ajax response success
     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
     */

  }, {
    key: 'done',
    value: function done(result) {

      var response = result.response;

      if (typeof response === 'undefined') {

        // articles undefined
        // JSON に問題がある
        var error = new Error('[USER_SELF:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_Model2.Model.UNDEFINED_ERROR, error);
      } else {

        // 成功 callback
        this.executeSafely(_Model2.Model.COMPLETE, new _UserDae.UserDae(response));
      }
    }
    /**
     * Ajax response error
     * @param {Error} error Error instance
     */

  }, {
    key: 'fail',
    value: function fail(error) {

      this.executeSafely(_Model2.Model.RESPONSE_ERROR, error);
    }
  }]);
  return ModelUsersSelf;
}(_Model2.Model);