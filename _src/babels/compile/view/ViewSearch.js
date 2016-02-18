/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:48
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
exports.ViewSearch = undefined;

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

var _SearchAuth = require('../action/search/SearchAuth');

var _Search = require('../action/search/Search');

var _ViewArchiveMasonryInfinite = require('./ViewArchiveMasonryInfinite');

var _View = require('./View');

var _Result = require('../data/Result');

var _Safety = require('../data/Safety');

var _User = require('../app/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// view
var React = self.React;
// import {ViewError} from './error/ViewError';
// data

var ReactDOM = self.ReactDOM;

/**
 * 検索ページ
 */

var ViewSearch = exports.ViewSearch = function (_ViewArchiveMasonryIn) {
  (0, _inherits3.default)(ViewSearch, _ViewArchiveMasonryIn);

  /**
   * 検索ページ 表示
   * @param {string} word 検索キーワード
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */

  function ViewSearch(word, element, moreElement) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ViewSearch);

    // keyword 検索

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSearch).call(this, element, moreElement, null, option, true));

    _this._action = _User.User.sign ? new _SearchAuth.SearchAuth(word, _this.done.bind(_this), _this.fail.bind(_this)) : new _Search.Search(word, _this.done.bind(_this), _this.fail.bind(_this));
    return _this;
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */

  (0, _createClass3.default)(ViewSearch, [{
    key: 'done',
    value: function done(result) {

      var articles = result.articles;
      console.log('ViewArchiveMasonry done ', result);
      if (typeof articles === 'undefined') {

        // articles undefined
        // JSON に問題がある
        var error = new Error('[SEARCH:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View.View.UNDEFINED_ERROR, error);
        this.showError(error.message);
      } else if (articles.length === 0) {

        // articles empty
        // request, JSON 取得に問題は無かったが data が取得できなかった
        var error = new Error('[SEARCH:EMPTY]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View.View.EMPTY_ERROR, error);
        this.showError(error.message);
      } else {

        this._request = result.request;
        this.render(articles);
      }
    }
    /**
     * Ajax response error
     * @param {Error} error Error instance
     */

  }, {
    key: 'fail',
    value: function fail(error) {

      this.executeSafely(_View.View.RESPONSE_ERROR, error);
      // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
      this.showError(error.message);
    }
    /**
     * ViewError でエラーコンテナを作成します
     * @param {string} message エラーメッセージ
     */

  }, {
    key: 'showError',
    value: function showError() {
      var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      message = _Safety.Safety.string(message, '');
      console.warn('search error ', message);

      var ErrorDom = React.createClass({
        displayName: 'ErrorDom',

        render: function render() {

          return React.createElement(
            'div',
            { className: 'error-container' },
            React.createElement(
              'h2',
              { className: 'mt80 f20 bold' },
              '検索結果が見つかりませんでした'
            ),
            React.createElement(
              'p',
              { className: 'mt04' },
              'スペルを確認するか、他のキーワードを入力してみてください。'
            ),
            React.createElement(
              'div',
              { className: 'mod-btnA01 mt40' },
              React.createElement(
                'a',
                { href: '/' },
                'TOPに戻る'
              )
            )
          );
        }
      });

      ReactDOM.render(React.createElement(ErrorDom, null), this.element);
    }
  }]);
  return ViewSearch;
}(_ViewArchiveMasonryInfinite.ViewArchiveMasonryInfinite);