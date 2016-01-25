/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/25 - 10:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';
/*
View More がある Page
Home, Category, Search...
 */

// app

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewArchive = undefined;

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

var _Headline = require('../action/home/Headline');

var _Result = require('../data/Result');

var _ArticleDae = require('../dae/ArticleDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// data
var React = self.React;
// dae

// action

// view

var ReactDOM = self.ReactDOM;
/**
 * <h2>View More がある 表示親クラス</h2>
 */

var ViewArchive = exports.ViewArchive = function (_View) {
  (0, _inherits3.default)(ViewArchive, _View);

  /**
   *
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {*} ActionClass Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */

  function ViewArchive(element, moreElement, ActionClass) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ViewArchive);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewArchive).call(this, element, option));

    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
    _this2._moreElement = moreElement;

    return _this2;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------

  (0, _createClass3.default)(ViewArchive, [{
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

      this.executeSafely('responseError', error);
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
     * @param {Array} articles JSON responce.articles
     */

  }, {
    key: 'render',
    value: function render(articles) {

      var element = this.element;
      var moreElement = this.moreElement;
      var _this = this;

      // React Class
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        propTypes: {
          list: React.PropTypes.array.isRequired
        },
        render: function render() {

          var list = this.props.list;
          var even = [];
          var odd = [];

          var ArchiveDom = React.createClass({
            displayName: 'ArchiveDom',

            propTypes: {
              index: React.PropTypes.number.isRequired,
              id: React.PropTypes.string.isRequired,
              slug: React.PropTypes.string.isRequired,
              category: React.PropTypes.string.isRequired,
              url: React.PropTypes.string.isRequired,
              date: React.PropTypes.string.isRequired,
              title: React.PropTypes.string.isRequired,
              description: React.PropTypes.string.isRequired,
              thumbnail: React.PropTypes.string.isRequired,
              mediaType: React.PropTypes.string.isRequired
            },
            render: function render() {
              var p = this.props;
              console.log('ArchiveDom ', p);
              return React.createElement(
                'div',
                null,
                React.createElement(
                  'a',
                  { href: p.url, id: 'archive-' + p.id, className: 'archive archive-' + p.index },
                  React.createElement('img', { src: p.thumbnail, alt: p.title }),
                  React.createElement(
                    'p',
                    { className: 'cat cat-' + p.slug },
                    p.category
                  ),
                  React.createElement(
                    'h3',
                    { className: 'archive-title' },
                    p.title
                  ),
                  React.createElement(
                    'p',
                    { className: 'date' },
                    p.date
                  ),
                  React.createElement(
                    'p',
                    null,
                    p.mediaType
                  ),
                  React.createElement(
                    'p',
                    null,
                    p.description
                  )
                )
              );
            }
          });

          var makeDom = function makeDom(dae) {

            var thumbnail = dae.mediaType === 'image' ? dae.media.images.medium : dae.media.video.thumbnail;
            thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_MIDDLE;

            return React.createElement(ArchiveDom, {
              key: 'archive-' + dae.id,
              index: dae.index,
              id: String(dae.id),
              slug: dae.category.slug,
              category: dae.category.label,
              url: dae.url,
              date: dae.formatDate,
              title: dae.title,
              thumbnail: thumbnail,
              mediaType: dae.mediaType,
              description: dae.description
            });
          };

          // even / odd setup
          list.forEach(function (article, i) {

            var dae = new _ArticleDae.ArticleDae(article);
            dae.index = i;

            if (i % 2 === 0) {
              // even
              even.push(dae);
            } else {
              // odd
              odd.push(dae);
            }
          });

          // dom
          return React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'left' },
              even.map(function (dae) {
                return makeDom(dae);
              })
            ),
            React.createElement(
              'div',
              { className: 'right' },
              odd.map(function (dae) {
                return makeDom(dae);
              })
            )
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

  }, {
    key: 'moreElement',
    get: function get() {
      return this._moreElement;
    }
  }]);
  return ViewArchive;
}(_View2.View); // class