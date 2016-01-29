'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewComments = undefined;

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

var _Empty = require('../app/Empty');

var _View2 = require('./View');

var _ViewError = require('./error/ViewError');

var _Comments = require('../action/comment/Comments');

var _Result = require('../data/Result');

var _CommentsListDae = require('../dae/CommentsListDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// data
/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 20:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
var React = self.React;
// dae

// action

// view

var ReactDOM = self.ReactDOM;

/**
 * comments sled を表示する
 */

var ViewComments = exports.ViewComments = function (_View) {
  (0, _inherits3.default)(ViewComments, _View);

  /**
   * コメントスレッド表示（記事詳細）
   * @param {Number} id 記事ID :article_id
   * @param {Element} element target HTMLElement
   * @param {Element} moreElement more button root parent
   * @param {string} commentsType all|official|self|normal コメントリスト種類
   * @param {Object} option optional event handler
   */

  function ViewComments(id, element, moreElement, commentsType) {
    var option = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
    (0, _classCallCheck3.default)(this, ViewComments);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewComments).call(this, element, option));

    _this._action = _Comments.Comments.type(commentsType, id, _this.done.bind(_this), _this.fail.bind(_this));
    _this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    _this._comments = [];
    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} more button root element を返します
   */

  (0, _createClass3.default)(ViewComments, [{
    key: 'start',

    // ---------------------------------------------------
    //  Method
    // ---------------------------------------------------
    /**
     * Ajax request を開始します
     */
    value: function start() {

      this.action.next();
    }
    /**
     * Ajax response success
     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
     */

  }, {
    key: 'done',
    value: function done(result) {

      var response = result.response;
      console.log('response ', typeof response === 'undefined', response);
      if (typeof response === 'undefined') {

        // articles undefined
        // JSON に問題がある
        var error = new Error('[COMMENTS:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
        // this.showError( error.message );
      } else {

          console.log('call render ', response);
          this.render(response);
        }
    }
    /**
     * Ajax response error
     * @param {Error} error Error instance
     */

  }, {
    key: 'fail',
    value: function fail(error) {

      this.executeSafely(_View2.View.RESPONSE_ERROR, error);
      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
      // this.showError( error.message );
    }
    /**
     * ViewError でエラーコンテナを作成します
     * @param {string} message エラーメッセージ
     */

  }, {
    key: 'showError',
    value: function showError() {
      var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      // ToDo: Error 時の表示が決まったら変更する
      var error = new _ViewError.ViewError(this.element, this.option, message);
      error.render();
    }
    /**
     * dom を render します
     * @param {Object} responce JSON responce
     */

  }, {
    key: 'render',
    value: function render(responce) {

      var comments = new _CommentsListDae.CommentsListDae(responce);

      // total check
      if (comments.total === 0) {
        // デーが無いので処理を止める
        this.executeSafely(_View2.View.EMPTY_ERROR);
        return;
      }

      // 処理開始
    } // render

  }, {
    key: 'moreElement',
    get: function get() {
      return this._moreElement;
    }
  }]);
  return ViewComments;
}(_View2.View);