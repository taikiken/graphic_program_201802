/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 20:37
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
exports.ViewVideos = undefined;

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

var _View2 = require('../View');

var _ViewError = require('../error/ViewError');

var _Widget = require('../../action/sidebar/Widget');

var _Result = require('../../data/Result');

var _ArticleDae = require('../../dae/ArticleDae');

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// dae

// action

// view
var React = self.React;
// data

var ReactDOM = self.ReactDOM;

/**
 * sidebar video
 */

var ViewVideos = exports.ViewVideos = function (_View) {
  (0, _inherits3.default)(ViewVideos, _View);

  /**
   * sidebar video 5件 を表示します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   * @param {string} [slug=all] category slug です
   */

  function ViewVideos(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var slug = arguments.length <= 2 || arguments[2] === undefined ? 'all' : arguments[2];
    (0, _classCallCheck3.default)(this, ViewVideos);

    option = _Safety.Safety.object(option);
    slug = _Safety.Safety.string(slug, 'all');

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewVideos).call(this, element, option));

    _this2._action = _Widget.Widget.video(slug, _this2.done.bind(_this2), _this2.fail.bind(_this2));
    _this2._slug = slug;

    return _this2;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string|*} 捜査 slug を返します
   */

  (0, _createClass3.default)(ViewVideos, [{
    key: 'start',

    // ---------------------------------------------------
    //  METHOD
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
        var error = new Error('[VIDEOS:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
        // this.showError( error.message );
      } else if (articles.length === 0) {

          // articles empty
          // request, JSON 取得に問題は無かったが data が取得できなかった
          var error = new Error('[VIDEOS:EMPTY]サーバーレスポンスに問題が発生しました。');
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
      var categorySlug = this.slug;
      var _this = this;

      // tag block
      var VideosDom = React.createClass({
        displayName: 'VideosDom',

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
            { className: 'board-item videos-' + p.index + ' videos-' + (p.slug || categorySlug) },
            React.createElement(
              'a',
              { href: p.url, className: 'post' },
              React.createElement(
                'figure',
                { className: 'post-thumb post-thumb-video' },
                React.createElement('img', { className: 'video-thumbnail', src: p.thumbnail, alt: p.title }),
                React.createElement('img', { className: 'post-thumb-overlay-movie type-movie', src: _Empty.Empty.VIDEO_PLAY })
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
                  'h4',
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
          var categoryTitle = '';

          var categoryLabel = undefined;
          // category api slug が `all` 以外の時に category.label をタイトルに含める
          if (categorySlug !== 'all') {
            categoryLabel = list[0].category.label;

            if (categoryLabel !== '') {
              // category.label が空でなかったら '/' と一緒に加える
              categoryTitle = ' / ' + categoryLabel;
            }
          }

          return React.createElement(
            'div',
            { className: 'board-small widget-recommend' },
            React.createElement(
              'div',
              { className: 'widget-recommend-heading' },
              React.createElement(
                'h3',
                { className: 'widget-recommend-heading-title' },
                React.createElement('img', { src: '/assets/images/common/side-recommend-heading.png', alt: 'RECOMMEND' })
              ),
              React.createElement(
                'span',
                { className: 'widget-recommend-heading-ruby' },
                'オススメ動画',
                categoryTitle
              )
            ),
            React.createElement(
              'ul',
              { className: 'board-list' },
              list.map(function (article, i) {

                var dae = new _ArticleDae.ArticleDae(article);
                var thumbnail = dae.media.images.medium;

                // thumbnail(16x9) を check なければ代替画像にする
                if (!thumbnail) {
                  thumbnail = _Empty.Empty.VIDEO_THUMBNAIL;
                } else if (!_Safety.Safety.isImg(thumbnail)) {
                  // 画像ファイル名に拡張子がないのがあったので
                  // 拡張子チェックを追加
                  thumbnail = _Empty.Empty.VIDEO_THUMBNAIL;
                }

                // VideosDom instance を使い render
                return React.createElement(VideosDom, {
                  key: 'ranking-' + dae.id,
                  index: i,
                  id: String(dae.id),
                  slug: dae.category.slug,
                  category: dae.category.label,
                  url: dae.url,
                  date: dae.formatDate,
                  title: dae.title,
                  thumbnail: thumbnail
                });
              }) // map

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

  }, {
    key: 'slug',
    get: function get() {
      return this._slug;
    }
  }]);
  return ViewVideos;
}(_View2.View);