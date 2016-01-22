/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 13:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHeadline = undefined;

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

var _App = require('../../app/App');

var _View2 = require('../View');

var _ViewError = require('../error/ViewError');

var _Headline = require('../../action/home/Headline');

var _Result = require('../../data/Result');

var _ArticleDae = require('../../dae/ArticleDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = window.React;
// dae

// action

// view

var ReactDOM = window.ReactDOM;

/**
 * home > headline（注目ニュース）を表示します。
 * <ol>
 *   <li>JSON取得(Ajax)</li>
 *   <li>Dom作成 by React</li>
 * </ol>
 */

var ViewHeadline = exports.ViewHeadline = function (_View) {
  (0, _inherits3.default)(ViewHeadline, _View);

  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */

  function ViewHeadline(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, ViewHeadline);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeadline).call(this, element, option));
  }

  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ViewHeadline, [{
    key: 'start',
    value: function start() {

      var action = new _Headline.Headline(this.done.bind(this), this.fail.bind(this));
      action.start();
    }
    /**
     * Ajax response success
     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
     */

  }, {
    key: 'done',
    value: function done(result) {

      var articles = result.articles;

      if (typeof articles === 'undefined') {

        // articles undefined
        // JSON に問題がある
        this.executeSafely('undefinedError');
        this.showError('[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
      } else if (articles.length === 0) {

        // articles empty
        // request, JSON 取得に問題は無かったが data が取得できなかった
        this.executeSafely('emptyError');
        this.showError('[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。');
      } else {

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

      this.executeSafely('responseError');
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

      var error = new _ViewError.ViewError(this.element, this.option, message);
      error.render();
    }

    /**
     * dom を render します
     * @param {Array} articles JSON responce.articles
     */

  }, {
    key: 'render',
    value: function render(articles) {

      var element = this.element;
      var _this = this;
      var dummy = _App.App.EMPTY_THUMBNAIL;

      // React Class
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        propTypes: {
          list: React.PropTypes.array.isRequired
        },
        getDefaultProps: function getDefaultProps() {
          return {
            list: []
          };
        },
        render: function render() {

          var list = this.props.list;

          return React.createElement(
            'div',
            null,
            list.map(function (article, i) {

              var dae = new _ArticleDae.ArticleDae(article);
              var divClass = 'headline headline-' + i;
              var catClass = 'category category-' + dae.category.slug;
              var titleClass = 'headline-title headline-title-' + i;
              var dateClass = 'date date-' + i;
              // thumbnail が 空のことがある様子
              var thumbnail = dae.media.images.thumbnail;

              return React.createElement(
                'div',
                { key: i, className: divClass },
                React.createElement(
                  'figure',
                  null,
                  React.createElement('img', { src: thumbnail !== '' ? thumbnail : dummy, alt: dae.title })
                ),
                React.createElement(
                  'div',
                  { className: 'content' },
                  React.createElement(
                    'span',
                    { className: catClass },
                    dae.category.label
                  ),
                  React.createElement(
                    'h3',
                    { className: titleClass },
                    dae.title
                  ),
                  React.createElement(
                    'p',
                    { className: dateClass },
                    dae.formatDate
                  ),
                  React.createElement(
                    'p',
                    { className: dateClass },
                    dae.displayDate
                  )
                )
              );
            })
          );
        },
        componentDidMount: function componentDidMount() {

          // after mount
          _this.executeSafely('didMount');
        }
      });

      // dom 生成
      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
    } // render

  }]);
  return ViewHeadline;
}(_View2.View);