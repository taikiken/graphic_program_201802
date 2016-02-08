/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:05
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
exports.ViewSingle = undefined;

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

var _SingleInfo = require('../app/info/SingleInfo');

var _View2 = require('./View');

var _ViewError = require('./error/ViewError');

var _Single = require('../action/single/Single');

var _Result = require('../data/Result');

var _SingleDae = require('../dae/SingleDae');

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// dae

// action

// view
var React = self.React;
// data

var ReactDOM = self.ReactDOM;

/**
 * 記事詳細
 */

var ViewSingle = function (_View) {
  (0, _inherits3.default)(ViewSingle, _View);

  /**
   * 記事ID で 記事詳細JSONを取得し表示します
   *
   * @example
   * let elements = {}
   *  related: document.getElementById('related'),
   *  comment: {
   *    'self': document.getElementById('self'),
   *    'official': document.getElementById('official'),
   *    'user': document.getElementById('user')
   *  }
   * }
   *
   * @param {Number} id article id, 記事Id
   * @param {Element} element root element
   * @param {Object} elements root element 関連記事, 各コメント
   * @param {Object} [option={}] optional event handler
   */

  function ViewSingle(id, element, elements) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ViewSingle);

    option = _Safety.Safety.object(option);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSingle).call(this, element, option));

    _this2._action = new _Single.Single(id, _this2.done.bind(_this2), _this2.fail.bind(_this2));
    _this2._elements = elements;
    return _this2;
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ViewSingle, [{
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
        var error = new Error('[SINGLE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
        // this.showError( error.message );
      } else {

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

      message = _Safety.Safety.string(message, '');

      // ToDo: Error 時の表示が決まったら変更する
      var error = new _ViewError.ViewError(this.element, this.option, message);
      error.render();
    }
    /**
     * dom を render します
     * @param {Object} response JSON response
     */

  }, {
    key: 'render',
    value: function render(response) {

      //console.log( 'single resoonse ', response );
      var single = new _SingleDae.SingleDae(response);
      // global SingleInfoへ保存
      // SingleInfo.dae = single;

      // beforeRender call
      this.executeSafely(_View2.View.BEFORE_RENDER, single);

      var element = this.element;
      var _this = this;

      // --------------------------------------------
      // image dom
      var ImageDom = React.createClass({
        displayName: 'ImageDom',

        propTypes: {
          images: React.PropTypes.array.isRequired
        },
        render: function render() {

          var images = this.props.images;

          return React.createElement(
            'div',
            { className: 'media-type-image' },
            images.map(function (image, i) {

              if (typeof image.large !== 'undefined' && image.large !== '') {
                return React.createElement(
                  'div',
                  { key: 'media-type-image-' + i, className: 'media-type-image-' + i },
                  React.createElement('img', { src: image.large, alt: image.caption })
                );
              }
            })
          );
        }
      });

      // --------------------------------------------
      // React Class
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        propTypes: {
          article: React.PropTypes.object.isRequired
        },
        // isRequired なので getDefaultProps がいらない
        // getDefaultProps: function() {
        //  return {
        //    list: []
        //  };
        // },
        render: function render() {

          var article = this.props.article;

          var bodyTag = function bodyTag() {
            return {
              __html: article.body
            };
          };

          var thumbnail = '';
          if (article.mediaType === 'image') {

            // media type image
            thumbnail = React.createElement(ImageDom, { images: article.media.list });
          } else if (article.mediaType === 'video') {

            if (article.media.video.thumbnail !== '') {

              thumbnail = React.createElement(
                'div',
                { className: 'media-type-video' },
                React.createElement('img', { src: article.media.video.thumbnail, alt: article.media.video.caption }),
                React.createElement('img', { src: _Empty.Empty.VIDEO_PLAY, alt: '' })
              );
            }
          }

          return React.createElement(
            'div',
            null,
            React.createElement(
              'h1',
              null,
              article.title
            ),
            React.createElement(
              'div',
              null,
              article.user.userName
            ),
            React.createElement(
              'div',
              null,
              article.formatDate
            ),
            React.createElement(
              'div',
              null,
              thumbnail
            ),
            React.createElement('div', { className: 'XXX-OUCH', dangerouslySetInnerHTML: bodyTag() }),
            React.createElement(
              'div',
              null,
              article.keywords.concat(' ')
            )
          );
        },
        componentWillMount: function componentWillMount() {

          // after mount
          _this.executeSafely(_View2.View.WILL_MOUNT);
        },
        componentDidMount: function componentDidMount() {

          // after mount
          _this.executeSafely(_View2.View.DID_MOUNT);
        }
      });

      // dom 生成
      ReactDOM.render(React.createElement(ArticleDom, { article: single }), element);

      // 関連記事 もしもあるなら
      if (single.hasRelated) {
        this.related(single.related);
      }

      // comment 取得
      // 自動化の場合はここに記述
      // ここでコメントは取得しない
    } // render
    /**
     * 関連記事（記事詳細の）
     * @param {Array} related 配列内データ型はRelatedDom
     */

  }, {
    key: 'related',
    value: function related() {
      var _related = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      _related = _Safety.Safety.array(_related);

      var element = this._elements.related;

      // tag block
      var RelatedDom = React.createClass({
        displayName: 'RelatedDom',

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
          var thumbnail = p.thumbnail ? p.thumbnail : _Empty.Empty.IMG_SMALL;

          return React.createElement(
            'a',
            { href: p.url, id: 'headline-' + p.id, className: 'headline headline-' + p.index },
            React.createElement('img', { src: thumbnail, alt: p.title }),
            React.createElement(
              'p',
              { className: 'cat cat-' + p.slug },
              p.category
            ),
            React.createElement(
              'h3',
              { className: 'headline-title' },
              p.title
            ),
            React.createElement(
              'p',
              { className: 'date' },
              p.date
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
        render: function render() {

          var list = this.props.list;

          return React.createElement(
            'div',
            null,
            list.map(function (dae, i) {

              var thumbnail = dae.media.images.thumbnail;
              thumbnail = thumbnail !== '' ? thumbnail : _Empty.Empty.IMG_SMALL;

              // HeadlineDom instance を使い render
              return React.createElement(RelatedDom, {
                key: 'headline-' + dae.id,
                index: i,
                id: String(dae.id),
                slug: dae.category.slug,
                category: dae.category.label,
                url: dae.url,
                date: dae.formatDate,
                title: dae.title,
                thumbnail: thumbnail
              });
            })
          );
        }
      });

      // 関連記事 dom 生成
      ReactDOM.render(React.createElement(ArticleDom, { list: _related }), element);
    } // related

  }]);
  return ViewSingle;
}(_View2.View);

exports.ViewSingle = ViewSingle;