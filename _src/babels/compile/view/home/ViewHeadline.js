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
// import {App} from '../../app/App';

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

var _Empty = require('../../app/const/Empty');

var _User = require('../../app/User');

var _View2 = require('../View');

var _ViewError = require('../error/ViewError');

var _Headline = require('../../action/home/Headline');

var _HeadlineAuth = require('../../action/home/HeadlineAuth');

var _Result = require('../../data/Result');

var _ArticleDae = require('../../dae/ArticleDae');

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// dae
var React = self.React;
// data

// action

// view

var ReactDOM = self.ReactDOM;

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
   *
   * @example
   * let headline;
   *
   * function didMount() {
   *    console.log( 'dom mount' );
   *  }
   * function errorMount( error ) {
   *    console.log( 'dom errorMount', error );
   *  }
   * function undefinedError( error ) {
   *    console.log( 'undefinedError', error );
   *  }
   * function emptyError( error ) {
   *    console.log( 'emptyError', error );
   *  }
   * function responseError( error ) {
   *    console.log( 'responseError', error );
   *
   *    headline.showError( 'error message ' + error.name + ', ' + error.message );
   * }
   * let option = {
   *    didMount: didMount,
   *    errorMount: errorMount,
   *    undefinedError: undefinedError,
   *    emptyError: emptyError,
   *    responseError: responseError
   *  };
   *
   * headline = new UT.view.home.ViewHeadline( document.getElementById('someId'), option );
   * headline.start();
   *
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */

  function ViewHeadline(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, ViewHeadline);

    option = _Safety.Safety.object(option);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewHeadline).call(this, element, option));

    var ActionClass = _User.User.sign ? _HeadlineAuth.HeadlineAuth : _Headline.Headline;
    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));

    return _this2;
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ViewHeadline, [{
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

      var articles = result.articles;

      if (typeof articles === 'undefined') {

        // articles undefined
        // JSON に問題がある
        var error = new Error('[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
        // this.showError( error.message );
      } else if (articles.length === 0) {

          // articles empty
          // request, JSON 取得に問題は無かったが data が取得できなかった
          var error = new Error('[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。');
          this.executeSafely(_View2.View.EMPTY_ERROR, error);
          // this.showError( error.message );
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

      message = _Safety.Safety.string(message, '');

      // ToDo: Error 時の表示が決まったら変更する
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

      // headline 1 記事
      var HeadlineDom = React.createClass({
        displayName: 'HeadlineDom',

        propTypes: {
          index: React.PropTypes.number.isRequired,
          id: React.PropTypes.string.isRequired,
          slug: React.PropTypes.string.isRequired,
          category: React.PropTypes.string.isRequired,
          url: React.PropTypes.string.isRequired,
          date: React.PropTypes.string.isRequired,
          title: React.PropTypes.string.isRequired,
          thumbnail: React.PropTypes.string.isRequired
        },
        render: function render() {
          var p = this.props;

          return React.createElement(
            'li',
            { className: 'board-item board-item-' + p.index },
            React.createElement(
              'a',
              { className: 'post', href: p.url },
              React.createElement(
                'figure',
                { className: 'post-thumb' },
                React.createElement('img', { src: p.thumbnail, alt: p.title })
              ),
              React.createElement(
                'div',
                { className: 'post-data' },
                React.createElement(
                  'p',
                  { className: 'post-category post-category-' + p.slug },
                  p.category
                ),
                React.createElement(
                  'h3',
                  { className: 'post-heading' },
                  p.title
                ),
                React.createElement(
                  'p',
                  { className: 'post-date' },
                  p.date
                )
              )
            )
          );
        }
      });

      // React Class
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        propTypes: {
          list: React.PropTypes.array.isRequired
        },
        // isRequired なので getDefaultProps がいらない
        // getDefaultProps: function() {
        //  return {
        //    list: []
        //  };
        // },
        render: function render() {

          var list = this.props.list;

          return React.createElement(
            'div',
            { className: 'headline' },
            React.createElement(
              'div',
              { className: 'headline-heading' },
              React.createElement(
                'h2',
                { className: 'headline-heading-title' },
                React.createElement('img', { src: '/assets/images/index/headline-heading.png', alt: 'HEADLINE NEWS' })
              ),
              React.createElement(
                'span',
                { className: 'headline-heading-ruby' },
                '注目のニュース'
              )
            ),
            React.createElement(
              'ul',
              { className: 'board-small column2' },
              list.map(function (article, i) {

                var dae = new _ArticleDae.ArticleDae(article);
                var thumbnail = dae.media.images.thumbnail;

                // thumbnail を check しなければ代替画像にする
                if (!thumbnail) {
                  thumbnail = _Empty.Empty.IMG_SMALL;
                } else if (!_Safety.Safety.isImg(thumbnail)) {
                  // 画像ファイル名に拡張子がないのがあったので
                  // 拡張子チェックを追加
                  thumbnail = _Empty.Empty.IMG_SMALL;
                }

                // HeadlineDom instance を使い render
                return React.createElement(HeadlineDom, {
                  key: 'headline-' + dae.id,
                  index: i,
                  id: String(dae.id),
                  slug: dae.category.slug,
                  category: dae.category.label,
                  url: dae.url,
                  date: dae.displayDate,
                  title: dae.title,
                  thumbnail: thumbnail
                });
              })
            )
          );
        },
        componentDidMount: function componentDidMount() {

          // after mount
          _this.executeSafely(_View2.View.DID_MOUNT);
        }
      });

      // dom 生成
      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
    } // render

  }]);
  return ViewHeadline;
}(_View2.View);