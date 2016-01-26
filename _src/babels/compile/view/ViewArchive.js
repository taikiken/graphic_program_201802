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
    _this2._articles = [];

    return _this2;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} more button root element を返します
   */

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
        var error = new Error('[ARCHIVE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely('undefinedError', error);
        // this.showError( error.message );
      } else if (articles.length === 0) {

          // articles empty
          // request, JSON 取得に問題は無かったが data が取得できなかった
          var error = new Error('[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。');
          this.executeSafely('emptyError', error);
          // this.showError( error.message );
        } else {

            console.log('result.total ', result.total);
            // set total
            this.action.total = parseInt(result.total, 10);
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

      // ToDo: Optimize rendering, Dom rendering の効率化

      var concatArticles = this._articles.concat(articles);
      var element = this.element;
      var moreElement = this.moreElement;
      var action = this.action;
      var _this = this;
      console.log('********* concatArticles ', concatArticles.length);
      // --------------------------------------------
      // More button
      // --------------------------------------------
      var MoreView = React.createClass({
        displayName: 'MoreView',

        propTypes: {
          show: React.PropTypes.bool
        },
        getDefaultProps: function getDefaultProps() {
          return {
            show: false
          };
        },
        getInitialState: function getInitialState() {
          return {
            disable: false
          };
        },
        handleClick: function handleClick(event) {
          event.preventDefault();
          // disable
          this.setState({ disable: true });
          action.next();
        },
        render: function render() {

          return React.createElement(
            'div',
            null,
            this.props.show ? React.createElement(
              'div',
              { className: this.state.disable ? 'disable' : '' },
              React.createElement(
                'a',
                { href: '#more', onClick: this.handleClick },
                'More View'
              )
            ) : ''
          );
        }
      });

      // more button 作成関数
      // ArchiveDom から呼び出す
      var moreButton = function moreButton(show) {

        ReactDOM.render(React.createElement(MoreView, { show: show }), moreElement);
      };
      // --------------------------------------------
      // COMMENTS Popular second
      // --------------------------------------------
      var CommentsSecond = React.createClass({
        displayName: 'CommentsSecond',

        propType: {
          seconds: React.PropTypes.array.isRequired,
          articleId: React.PropTypes.string.isRequired
        },
        render: function render() {

          var seconds = this.props.seconds;
          var articleId = this.props.articleId;

          return React.createElement(
            'div',
            { className: 'comments-second' },
            seconds.map(function (commentDae, i) {

              var userDae = commentDae.user;
              var picture = userDae.profilePicture ? userDae.profilePicture : _Empty.Empty.USER_PICTURE;

              // CommentsSecond unique key は  記事Id + index + user Id を使用する
              // 同一ユーザーが複数投稿することがあるため
              // render 内で unique なことを保証する必要がある
              return React.createElement(
                'div',
                { key: 'user-' + articleId + '-' + i + '-' + userDae.id },
                React.createElement('img', { src: picture, alt: userDae.userName })
              );
            })
          );
        }
      });

      // --------------------------------------------
      // COMMENTS Popular
      // --------------------------------------------
      var PopularDom = React.createClass({
        displayName: 'PopularDom',

        propType: {
          commentsPopular: React.PropTypes.object.isRequired,
          total: React.PropTypes.number.isRequired,
          articleId: React.PropTypes.string.isRequired
        },
        render: function render() {

          var commentsPopular = this.props.commentsPopular;
          var total = this.props.total;
          var articleId = this.props.articleId;

          var emptyFirst = React.createElement('div', { className: 'comments-popular comments-empty' });
          var second = React.createElement('div', { className: 'comments-second comments-empty' });

          if (commentsPopular.hasSecond) {
            // 2件目以降も存在する
            // 2件目以降のDomを生成する
            second = React.createElement(CommentsSecond, { seconds: commentsPopular.seconds, articleId: articleId });
          }

          if (commentsPopular.hasFirst) {

            // 少なくとも1件は存在する

            // 1件目データを取り出し
            var first = commentsPopular.first;
            var firstUser = first.user;
            var picture = firstUser.profilePicture ? firstUser.profilePicture : _Empty.Empty.USER_PICTURE;

            return React.createElement(
              'div',
              { className: 'comments-popular' },
              React.createElement(
                'div',
                { className: 'comment-first' },
                React.createElement('img', { src: picture, alt: firstUser.userName }),
                React.createElement(
                  'div',
                  null,
                  firstUser.userName
                ),
                React.createElement(
                  'div',
                  null,
                  firstUser.bio
                ),
                React.createElement(
                  'div',
                  null,
                  first.body
                ),
                React.createElement(
                  'div',
                  null,
                  'GOOD: ',
                  first.good
                ),
                React.createElement(
                  'div',
                  null,
                  'BAD: ',
                  first.bad
                )
              ),
              React.createElement(
                'div',
                { className: 'comment-second-container' },
                second,
                React.createElement(
                  'div',
                  { className: 'comment-total' },
                  total > 0 ? 'Total: ' + total : ''
                )
              )
            );
          }

          return emptyFirst;
        } // render
      });

      // --------------------------------------------
      // Main Dom
      // --------------------------------------------
      // 個別の Dom
      // ToDo: comment など追加
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
          mediaType: React.PropTypes.string.isRequired,
          commentsPopular: React.PropTypes.object.isRequired,
          commentsCount: React.PropTypes.number.isRequired
        },
        render: function render() {
          var p = this.props;
          var commentsPopular = p.commentsPopular;

          return React.createElement(
            'div',
            { className: 'one-article' },
            React.createElement('img', { src: p.thumbnail, alt: p.title }),
            React.createElement(
              'p',
              { className: 'cat cat-' + p.slug },
              p.category
            ),
            React.createElement(
              'a',
              { href: p.url, id: 'archive-' + p.id, className: 'archive archive-' + p.index },
              React.createElement(
                'h3',
                { className: 'archive-title' },
                p.title
              )
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
            ),
            React.createElement(
              'div',
              { className: 'comments-popular-container' },
              React.createElement(PopularDom, { commentsPopular: commentsPopular, total: p.commentsCount, articleId: p.id })
            )
          );
        }
      });

      // ArticleDom 呼び出し用関数
      // list.forEach での ReactDOM.render 実行記述を簡略化するため
      var makeDom = function makeDom(dae) {

        var thumbnail = dae.mediaType === 'image' ? dae.media.images.medium : dae.media.video.thumbnail;
        thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_MIDDLE;

        // unique key(React)にarticle id(number)記事Idを使用します
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
          description: dae.description,
          commentsPopular: dae.commentsPopular,
          commentsCount: dae.commentsCount
        });
      };

      // ------------------------------------------------
      // 基点 React class
      // ------------------------------------------------

      // React Class, Archive Dom
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        propTypes: {
          list: React.PropTypes.array.isRequired
        },
        render: function render() {

          var list = this.props.list;
          var even = [];
          var odd = [];

          // even / odd setup
          // even(left) / odd(right) へ振り分けるための配列作成
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
          // hasNext を元に More View button の表示非表示を決める
          moreButton(action.hasNext());
        }
        /*
        componentDidUpdate: function() {
           // after update
          _this.executeSafely( 'didUpdate' );
          // hasNext を元に More View button の表示非表示を決める
          console.log( 'componentDidUpdate ', action.hasNext() );
          moreButton( action.hasNext() );
         }
        */
      });

      // dom 生成
      ReactDOM.render(React.createElement(ArticleDom, { list: concatArticles }), element);

      // save
      this._articles = concatArticles.splice(0);
    }
  }, {
    key: 'moreElement',
    get: function get() {
      return this._moreElement;
    }
  }]);
  return ViewArchive;
}(_View2.View); // class