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

var _Empty = require('../app/const/Empty');

var _User = require('../app/User');

var _View2 = require('./View');

var _ViewError = require('./error/ViewError');

var _Result = require('../data/Result');

var _ArticleDae = require('../dae/ArticleDae');

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// dae
var React = self.React;
// action
// import {Headline} from '../action/home/Headline';
// data

// view

var ReactDOM = self.ReactDOM;
/**
 * <h2>View More がある 表示親クラス</h2>
 */

var ViewArchive = exports.ViewArchive = function (_View) {
  (0, _inherits3.default)(ViewArchive, _View);

  /**
   * ページングを伴う基本クラス
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
   * headline = new UT.view.home.ViewHeadline( document.getElementById('someId'), document.getElementById('moreId'), UT.action.home.News, option );
   * headline.start();
   *
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {*} ActionClass Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */

  function ViewArchive(element, moreElement, ActionClass) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ViewArchive);

    option = _Safety.Safety.object(option);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewArchive).call(this, element, option));

    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
    _this2._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    _this2._articles = [];
    /**
     * 出力左側
     * @type {Array<ArticleDae>}
     * @private
     */
    _this2._evens = [];
    /**
     * 出力右側
     * @type {Array<ArticleDae>}
     * @private
     */
    _this2._odds = [];

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
        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
        // this.showError( error.message );
      } else if (articles.length === 0) {

          // articles empty
          // request, JSON 取得に問題は無かったが data が取得できなかった
          var error = new Error('[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。');
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

      // ---
      // 左右に分割表示のためのglobal配列
      var evens = this._evens;
      var odds = this._odds;
      var articlesList = this._articles;
      // 前回までの配列length
      // sequence な index のために必要
      var prevLast = this._articles.length;
      // ---

      // 記事挿入 root element
      var element = this.element;
      // 'View More' button root element
      var moreElement = this.moreElement;
      // offset, length を使用する Action
      var action = this.action;
      var _this = this;

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

          // hasNext: true, button を表示する？
          if (this.props.show) {

            return React.createElement(
              'div',
              { id: 'more', className: 'board-btn-viewmore' + this.state.disable ? 'disable' : '' },
              React.createElement(
                'a',
                { className: 'board-btn-viewmore-link', href: '#more', onClick: this.handleClick },
                React.createElement(
                  'span',
                  null,
                  'VIEW MORE'
                )
              ),
              React.createElement(
                'span',
                { className: 'board-btn-more-cover' },
                ' '
              )
            );
          } else {

            return React.createElement('div', { className: 'no-more' });
          }
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
            'ul',
            { className: 'comments-second' },
            seconds.map(function (commentDae, i) {

              var userDae = commentDae.user;
              var picture = userDae.profilePicture ? userDae.profilePicture : _Empty.Empty.USER_PICTURE;

              // CommentsSecond unique key は  記事Id + index + user Id を使用する
              // 同一ユーザーが複数投稿することがあるため
              // render 内で unique なことを保証する必要がある
              return React.createElement(
                'li',
                { key: 'user-' + articleId + '-' + i + '-' + userDae.id, className: 'commented-user-item commented-user-item-' + i },
                React.createElement(
                  'a',
                  { className: 'commented-user-thumb', href: userDae.url },
                  React.createElement('img', { src: picture, alt: userDae.userName })
                )
              );
            })
          );
        }
      });

      // --------------------------------------------
      // COMMENTS Popular
      // --------------------------------------------

      // good link
      var GoodLink = React.createClass({
        displayName: 'GoodLink',

        propType: {
          sign: React.PropTypes.bool.isRequired,
          comment: React.PropTypes.object.isRequired,
          active: React.PropTypes.bool,
          callback: React.PropTypes.func
        },
        getDefaultProps: function getDefaultProps() {
          return {
            active: false,
            callback: function callback() {}
          };
        },
        getInitialState: function getInitialState() {
          return {
            active: false,
            callback: function callback() {}
          };
        },
        handleClick: function handleClick(event) {
          event.preventDefault();
          this.props.callback(this.props.comment);
          this.setState({ active: false });
        },
        render: function render() {

          var sign = this.props.sign;
          var comment = this.props.comment;
          var active = this.props.active;
          var activeClass = active ? ' active' : '';

          if (sign) {

            // login user
            return React.createElement(
              'a',
              { className: 'comment-response-btn comment-response-like' + activeClass, href: '#', onClick: this.handleClick },
              React.createElement(
                'i',
                null,
                ' '
              ),
              React.createElement(
                'span',
                null,
                comment.good
              )
            );
          } else {

            // not login user
            return React.createElement(
              'span',
              { className: 'comment-response-btn comment-response-like' },
              React.createElement(
                'i',
                null,
                ' '
              ),
              React.createElement(
                'span',
                null,
                comment.good
              )
            );
          }
        }
      });

      // bad link
      var BadLink = React.createClass({
        displayName: 'BadLink',

        propType: {
          sign: React.PropTypes.bool.isRequired,
          comment: React.PropTypes.object.isRequired,
          active: React.PropTypes.bool,
          callback: React.PropTypes.func
        },
        getDefaultProps: function getDefaultProps() {
          return {
            active: false,
            callback: function callback() {}
          };
        },
        getInitialState: function getInitialState() {
          return {
            active: false,
            callback: function callback() {}
          };
        },
        handleClick: function handleClick(event) {
          event.preventDefault();
          this.props.callback(this.props.comment);
          this.setState({ active: false });
        },
        render: function render() {

          var sign = this.props.sign;
          var comment = this.props.comment;
          var active = this.props.active;
          var activeClass = active ? ' active' : '';

          if (sign) {

            // login user
            return React.createElement(
              'a',
              { className: 'comment-response-btn comment-response-dislike' + activeClass, href: '#', onClick: this.handleClick },
              React.createElement(
                'i',
                null,
                ' '
              ),
              React.createElement(
                'span',
                null,
                comment.bad
              )
            );
          } else {

            // not login user
            return React.createElement(
              'span',
              { className: 'comment-response-btn comment-response-dislike' },
              React.createElement(
                'i',
                null,
                ' '
              ),
              React.createElement(
                'span',
                null,
                comment.bad
              )
            );
          }
        }
      });

      // --------------------------------------------
      // first + second comment container
      var PopularDom = React.createClass({
        displayName: 'PopularDom',

        propType: {
          commentsPopular: React.PropTypes.object.isRequired,
          total: React.PropTypes.number.isRequired,
          articleId: React.PropTypes.string.isRequired
        },
        goodClick: function goodClick(comment) {
          var commentId = comment.id;
          var userId = comment.user.id;

          console.log('goodClick', commentId, userId);
        },
        badClick: function badClick(comment) {
          var commentId = comment.id;
          var userId = comment.user.id;

          console.log('badClick', commentId, userId);
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

            // 1件目コメントデータを取り出し
            var first = commentsPopular.first;
            // 1件目コメント・ユーザー
            var firstUser = first.user;
            // ユーザーサムネイル
            var picture = firstUser.profilePicture ? firstUser.profilePicture : _Empty.Empty.USER_PICTURE_FEATURE;

            // login 済かを調べる
            var sign = _User.User.sign;

            return React.createElement(
              'div',
              { className: 'comments-popular' },
              React.createElement(
                'div',
                { className: 'feature-user comment-item' },
                React.createElement(
                  'figure',
                  { className: 'comment-user' },
                  React.createElement(
                    'a',
                    { className: 'comment-user-link', href: firstUser.url },
                    React.createElement(
                      'span',
                      { className: 'comment-user-thumb' },
                      React.createElement('img', { src: picture, alt: firstUser.userName })
                    ),
                    React.createElement(
                      'div',
                      { className: 'comment-user-data' },
                      React.createElement(
                        'p',
                        { className: 'comment-user-name' },
                        firstUser.userName
                      ),
                      React.createElement(
                        'p',
                        { className: 'comment-user-job' },
                        firstUser.bio
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'comment-content' },
                  first.body
                ),
                React.createElement(
                  'div',
                  { className: 'comment-response' },
                  React.createElement(GoodLink, {
                    sign: sign,
                    comment: first,
                    callback: this.goodClick
                  }),
                  React.createElement(BadLink, {
                    sign: sign,
                    comment: first,
                    callback: this.badClick
                  })
                )
              ),
              React.createElement(
                'div',
                { className: 'commented-user' },
                second,
                React.createElement(
                  'span',
                  { className: 'commented-user-andmore' },
                  total > 0 ? total : ''
                )
              )
            );
          }

          return emptyFirst;
        }, // render
        componentDidMount: function componentDidMount() {
          // mount
        }
      });

      // --------------------------------------------
      // Main Dom
      // --------------------------------------------
      // 個別の 記事Dom
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
          caption: React.PropTypes.string.isRequired,
          description: React.PropTypes.string.isRequired,
          thumbnail: React.PropTypes.string.isRequired,
          mediaType: React.PropTypes.string.isRequired,
          commentsPopular: React.PropTypes.object.isRequired,
          commentsCount: React.PropTypes.number.isRequired
        },
        render: function render() {
          var p = this.props;
          var commentsPopular = p.commentsPopular;
          var figureTag = undefined;

          if (p.mediaType === 'image') {
            // type: image
            figureTag = React.createElement(
              'figure',
              { className: 'post-thumb' },
              React.createElement('img', { src: p.thumbnail, alt: p.caption || p.title })
            );
          } else {
            // type: video
            figureTag = React.createElement(
              'figure',
              { className: 'post-thumb' },
              React.createElement('img', { className: 'post-thumb-overlay-movie type-movie', src: '/assets/images/common/thumb-overlay-movie-340x150.png' }),
              React.createElement('img', { src: p.thumbnail, alt: p.caption || p.title })
            );
          }

          return React.createElement(
            'div',
            { className: 'board-column column' + p.index + ' column-' + p.mediaType },
            React.createElement(
              'div',
              { className: 'board-item' },
              React.createElement(
                'a',
                { className: 'post', href: p.url },
                figureTag,
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
                  ),
                  React.createElement(
                    'div',
                    { className: 'post-excerpt-text' },
                    p.description
                  )
                )
              )
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

        var thumbnail = undefined;
        var caption = undefined;
        if (dae.mediaType === 'image') {
          thumbnail = dae.media.images.medium;
          caption = dae.media.images.caption;
        } else {
          thumbnail = dae.media.video.thumbnail;
          caption = dae.media.video.caption;
        }

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
          caption: caption,
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

          // even / odd setup
          // even(left) / odd(right) へ振り分けるための配列作成
          list.forEach(function (article, i) {

            var dae = new _ArticleDae.ArticleDae(article);

            dae.index = prevLast + i;
            articlesList.push(dae);

            if (i % 2 === 0) {
              // even
              evens.push(dae);
            } else {
              // odd
              odds.push(dae);
            }
          });

          // dom, 左右に振り分けて出力する
          return React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'left' },
              evens.map(function (dae) {
                return makeDom(dae);
              })
            ),
            React.createElement(
              'div',
              { className: 'right' },
              odds.map(function (dae) {
                return makeDom(dae);
              })
            )
          );
        },
        componentDidMount: function componentDidMount() {
          // after mount
          _this.executeSafely(_View2.View.DID_MOUNT);
          // hasNext を元に More View button の表示非表示を決める
          moreButton(action.hasNext());
        }
      }); // ArticleDom

      // dom 生成
      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);

      // save
      // this._articles = concatArticles.splice( 0 );
    }
  }, {
    key: 'moreElement',
    get: function get() {
      return this._moreElement;
    }
  }]);
  return ViewArchive;
}(_View2.View); // class