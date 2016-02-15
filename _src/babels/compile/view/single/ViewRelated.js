/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 17:52
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
exports.ViewRelated = undefined;

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

var _Safety = require('../../data/Safety');

var _RelatedDae = require('../../dae/RelatedDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
var React = self.React;

// view

var ReactDOM = self.ReactDOM;

/**
 * 関連記事表示
 */

var ViewRelated = exports.ViewRelated = function (_View) {
  (0, _inherits3.default)(ViewRelated, _View);

  /**
   * 関連記事, ViewSingle から呼び出されます
   * @param {Element} element root element
   * @param {Array<RelatedDae>} [related=[]] response.related_articles 配列
   */

  function ViewRelated(element) {
    var related = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    (0, _classCallCheck3.default)(this, ViewRelated);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewRelated).call(this, element));

    _this._related = _Safety.Safety.array(related);
    _this._rendered = null;
    return _this;
  }
  /**
   * render 処理を開始します
   */

  (0, _createClass3.default)(ViewRelated, [{
    key: 'start',
    value: function start() {
      this.render(this._related);
    }
    /**
     * Dom 生成します
     * @param {Array<RelatedDae>} [related=[]] response.related_articles 配列
     */

  }, {
    key: 'render',
    value: function render(related) {

      // -------------------------------------------------
      // 配列が空
      // 関連記事がないので処理中止
      if (related.length === 0) {
        return;
      }

      // -------------------------------------------------
      // 関連記事があった

      var element = this.element;

      // React Class
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        propTypes: {
          list: React.PropTypes.array.isRequired
        },
        getInitialState: function getInitialState() {
          return {
            list: this.props.list
          };
        },
        render: function render() {

          var list = this.state.list;

          return React.createElement(
            'div',
            { className: 'related-post' },
            React.createElement(
              'div',
              { className: 'comment-heading' },
              React.createElement(
                'h2',
                null,
                '関連ニュース'
              )
            ),
            React.createElement(
              'ul',
              { className: 'board-small column2' },
              list.map(function (dae, i) {

                var thumbnail = dae.media.images.thumbnail;
                // thumbnail = !!thumbnail ? thumbnail : Empty.IMG_SMALL;
                if (!thumbnail) {
                  thumbnail = _Empty.Empty.IMG_SMALL;
                } else if (!_Safety.Safety.isImg(thumbnail)) {
                  // 画像ファイル名に拡張子がないのがあったので
                  // 拡張子チェックを追加
                  thumbnail = _Empty.Empty.IMG_SMALL;
                }

                return React.createElement(
                  'li',
                  { className: 'board-item column2', key: 'related-' + dae.id },
                  React.createElement(
                    'a',
                    { href: dae.url, id: 'related-' + dae.id, className: 'post post-' + i },
                    React.createElement(
                      'figure',
                      { className: 'post-thumb' },
                      React.createElement('img', { src: thumbnail, alt: dae.title })
                    ),
                    React.createElement(
                      'div',
                      { className: 'post-data' },
                      React.createElement(
                        'p',
                        { className: 'post-category post-category-' + dae.category.slug },
                        dae.category.label
                      ),
                      React.createElement(
                        'h3',
                        { className: 'post-heading' },
                        dae.title
                      ),
                      React.createElement(
                        'p',
                        { className: 'post-date' },
                        dae.formatDate
                      )
                    )
                  )
                );
              })
            )
          );
        },
        updateList: function updateList(list) {
          this.setState({ list: list });
        }
      });

      // 関連記事 dom 生成
      if (this._rendered === null) {

        this._rendered = ReactDOM.render(React.createElement(ArticleDom, { list: related }), element);
      } else {

        this._rendered.updateList(related);
      }
    }
  }]);
  return ViewRelated;
}(_View2.View);