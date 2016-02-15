/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 16:39
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
exports.ModelCommentReply = undefined;

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

var _Model2 = require('../Model');

var _Result = require('../../data/Result');

var _CommentReply = require('../../action/comment/CommentReply');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * コメントへのコメント送信
 */

var ModelCommentReply = exports.ModelCommentReply = function (_Model) {
  (0, _inherits3.default)(ModelCommentReply, _Model);

  /**
   * コメントへのコメント送信
   * @param {string} articleId 記事 id
   * @param commentID
   * @param {FormData} formData comment form FormData
   * @param {Object} [option={}] optional event handler
   */

  function ModelCommentReply(articleId, commentID, formData) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ModelCommentReply);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ModelCommentReply).call(this, option));

    _this._action = new _CommentReply.CommentReply(articleId, commentID, formData, _this.done.bind(_this), _this.fail.bind(_this));
    return _this;
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ModelCommentReply, [{
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
        var error = new Error('[MODEL_COMMENT_REPLY:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_Model2.Model.UNDEFINED_ERROR, error);
      } else {

        // 成功 callback
        this.executeSafely(_Model2.Model.COMPLETE, result);
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
  return ModelCommentReply;
}(_Model2.Model);