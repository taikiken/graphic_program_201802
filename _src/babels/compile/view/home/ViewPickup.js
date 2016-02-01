/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/24 - 18:05
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
exports.ViewPickup = undefined;

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

var _Pickup = require('../../action/home/Pickup');

var _PickupAuth = require('../../action/home/PickupAuth');

var _Result = require('../../data/Result');

var _ArticleDae = require('../../dae/ArticleDae');

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// global object
// React

// dae
var React = self.React;
// data

// action

// view

var ReactDOM = self.ReactDOM;

// Gasane
var Polling = self.Gasane.Polling;

/**
 * home > pickup（スライダー）を表示します。
 * <ol>
 *   <li>JSON取得(Ajax)</li>
 *   <li>Dom作成 by React</li>
 * </ol>
 */

var ViewPickup = exports.ViewPickup = function (_View) {
  (0, _inherits3.default)(ViewPickup, _View);

  /**
   * action/Pickup を使い Ajax request 後 element へ dom を作成します
   * @see ViewHeadline
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */

  function ViewPickup(element) {
    var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    (0, _classCallCheck3.default)(this, ViewPickup);

    option = _Safety.Safety.object(option);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewPickup).call(this, element, option));

    var ActionClass = _User.User.sign ? _PickupAuth.PickupAuth : _Pickup.Pickup;
    _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
    _this2._index = 0;
    _this2._last = 0;
    _this2._waiting = 1000 * 5;

    return _this2;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * interval 間隔, milliseconds, default 5000ms
   * @property {Number} waiting interval milliseconds
   * @default 5000
   * @return {number|*|Number} slideshow interval milliseconds を返します
   */

  (0, _createClass3.default)(ViewPickup, [{
    key: 'start',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * Ajax request を開始します
     */
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
        var error = new Error('[PICKUP:UNDEFINED]サーバーレスポンスに問題が発生しました。');
        this.executeSafely(_View2.View.UNDEFINED_ERROR, error);
        // this.showError( error.message );
      } else if (articles.length === 0) {

          // articles empty
          // request, JSON 取得に問題は無かったが data が取得できなかった
          var error = new Error('[PICKUP:EMPTY]サーバーレスポンスに問題が発生しました。');
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
      var last = articles.length - 1;

      var position = 0;

      // interval を管理する Gasane.Polling instance
      var polling = new Polling(this.waiting);
      var _this = this;

      // --------------------------------------------
      // pager
      // --------------------------------------------
      var PickupPager = React.createClass({
        displayName: 'PickupPager',

        propTypes: {
          index: React.PropTypes.number.isRequired,
          id: React.PropTypes.string.isRequired,
          length: React.PropTypes.number.isRequired,
          onPager: React.PropTypes.func.isRequired
        },
        handleClick: function handleClick(event) {
          event.preventDefault();
          console.log('click ' + event.target.innerHTML);
          this.props.onPager(event.target.innerHTML);
        },
        render: function render() {
          var p = this.props;

          return React.createElement(
            'li',
            { className: 'pager-item pager-' + (p.index - p.length) },
            React.createElement(
              'a',
              { href: '#pickup-' + p.index, className: 'pager-link',
                onClick: this.handleClick },
              p.index - p.length
            )
          );
        }
      });

      // pagers 親コンポーネント
      var Pagers = React.createClass({
        displayName: 'Pagers',

        propTypes: {
          offset: React.PropTypes.number.isRequired,
          list: React.PropTypes.array.isRequired,
          onPager: React.PropTypes.func.isRequired
        },
        render: function render() {
          var list = this.props.list;
          var length = list.length;
          var offset = this.props.offset;
          var onPager = this.props.onPager;

          return React.createElement(
            'ul',
            { className: 'pager-list' },
            list.map(function (article) {

              var dae = new _ArticleDae.ArticleDae(article);

              return React.createElement(PickupPager, {
                key: 'pager-' + dae.id,
                id: String(dae.id),
                index: offset++,
                length: length,
                onPager: onPager
              });
            })
          );
        }
      });

      // --------------------------------------------
      // Main Dom
      // --------------------------------------------

      // pickup slider images
      var PickupDom = React.createClass({
        displayName: 'PickupDom',

        propTypes: {
          index: React.PropTypes.number.isRequired,
          id: React.PropTypes.string.isRequired,
          slug: React.PropTypes.string.isRequired,
          category: React.PropTypes.string.isRequired,
          url: React.PropTypes.string.isRequired,
          date: React.PropTypes.string.isRequired,
          title: React.PropTypes.string.isRequired,
          large: React.PropTypes.string.isRequired,
          commentsCount: React.PropTypes.number.isRequired
        },
        render: function render() {
          var p = this.props;

          return React.createElement(
            'li',
            { id: 'pickup-' + p.index, className: 'pickup pickup-' + p.index },
            React.createElement(
              'a',
              { href: p.url },
              React.createElement('img', { src: _Empty.Empty.KV_OVERLAY, alt: '', className: 'overlay' }),
              React.createElement('img', { src: p.large, alt: p.title }),
              React.createElement(
                'div',
                { className: 'post-overview' },
                React.createElement(
                  'p',
                  { className: 'post-category cat-' + p.slug },
                  p.category
                ),
                React.createElement(
                  'h2',
                  { className: 'post-heading' },
                  p.title
                ),
                React.createElement(
                  'p',
                  { className: 'post-date' },
                  p.date
                ),
                React.createElement(
                  'p',
                  { className: 'post-comment-num' },
                  p.commentsCount
                )
              )
            )
          );
        }
      });

      // React Class, pickup dom container
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        // articles 配列を元にDomを作成する
        propTypes: {
          list: React.PropTypes.array.isRequired
        },
        // initial state を設定します
        getInitialState: function getInitialState() {
          return {
            // default 0
            index: position
          };
        },
        // next slide
        updateNext: function updateNext() {
          // last を超えたら 0 に戻す
          var n = position + 1;
          if (n > last) {
            n = 0;
          }
          // change slide
          this.jump(n);
        },
        // next button click
        onNext: function onNext(event) {
          event.preventDefault();
          console.log('next click');
          // next action は polling からも使うので関数化し共通化する
          this.updateNext();
        },
        // prev button click
        onPrev: function onPrev(event) {
          event.preventDefault();
          console.log('prev click');
          // 0 未満になったら last へ戻す
          var n = position - 1;
          if (n < 0) {
            n = last;
          }
          // change slide
          this.jump(n);
        },
        // slide を変更
        jump: function jump(index) {
          console.log('jump ', index);
          // polling stop
          polling.stop();
          // --------------
          // 循環アニメーションのために
          if (index === 0) {
            // 先頭に戻る
            if (position === last) {
              // 現在がラストだったらアニメーションなしで移動させる
              this.setState({ index: 999 });
              this.delay(index);
            } else {
              // 通常移動
              this.setup(index);
            }
          } else if (index === last) {
            // 最終に戻る
            if (position === 0) {
              // 現在が先頭だったらアニメーションなしで移動させる
              this.setState({ index: 1999 });
              this.delay(index);
            } else {
              // 通常移動
              this.setup(index);
            }
          } else {

            // 通常移動
            this.setup(index);
          }
        },
        // 最終から先頭, 先頭から最終へ戻るときに循環アニメーションのために
        // アニメーション無しで移動させた後
        // リフレッシュのために待機させる 1fps
        delay: function delay(index) {
          var me = this;
          if (!!this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(function () {
            me.setup(index);
          }, 25);
        },
        // re position, polling restart
        setup: function setup(index) {
          // --------------
          // state update
          position = index;
          this.setState({ index: index });
          // polling start
          polling.start();
        },
        // pager click から呼び出されます
        onPagerClick: function onPagerClick(index) {
          console.log('onPagerClick ', index);
          // 子コンポーネント Pagers -> PickupPager から呼び出される
          // innerHTML 数値を使うので
          // Number 型へ変換する
          this.jump(parseInt(index, 10));
        },

        // --------------------------------------------
        // RENDER
        // --------------------------------------------
        render: function render() {

          var list = this.props.list;
          var count = 0;

          // slide一つのコンテナ
          var make = function make(article, i) {

            var dae = new _ArticleDae.ArticleDae(article);

            // HeadlineDom instance を使い render
            // iteration key は index を使う
            // コンテナを 前後に clone するため article.id が使えない
            return React.createElement(PickupDom, {
              key: 'pickup-' + i,
              index: i,
              id: String(dae.id),
              slug: dae.category.slug,
              category: dae.category.label,
              url: dae.url,
              date: dae.formatDate,
              title: dae.title,
              large: dae.media.images.large,
              commentsCount: dae.commentsCount
            });
          };

          // JSX
          return React.createElement(
            'div',
            { className: 'hero-slider pickup-container slide-' + this.state.index },
            React.createElement(
              'div',
              { className: 'hero-slider-inner' },
              React.createElement(
                'ul',
                { className: 'pickup-slider' },

                // 1.first
                list.map(function (article) {

                  return make(article, count++);
                }),

                // 2.second clone
                list.map(function (article) {

                  return make(article, count++);
                }),

                // 3.third clone
                list.map(function (article) {

                  return make(article, count++);
                })
              )
            ),
            React.createElement(
              'div',
              { className: 'hero-slider-control' },
              React.createElement(
                'div',
                { className: 'direction' },
                React.createElement(
                  'a',
                  { id: 'prev', className: 'direction-prev', href: '#prev', onClick: this.onPrev },
                  'Prev'
                ),
                React.createElement(
                  'a',
                  { id: 'next', className: 'direction-next', href: '#next', onClick: this.onNext },
                  'Next'
                )
              ),
              React.createElement(
                'div',
                { className: 'pager' },
                React.createElement(Pagers, {
                  list: articles,
                  offset: articles.length,
                  onPager: this.onPagerClick
                })
              )
            )
          );
        },
        componentDidMount: function componentDidMount() {

          // after mount
          // callback
          _this.executeSafely(_View2.View.DID_MOUNT);
          // interval animation
          // mount 後 animation を開始します
          // bind はreactが内部的にする（様子） `this.updateNext.bind(this)` は不要
          polling.on(Polling.PAST, this.updateNext);
          polling.start();
        }
      });

      // dom 生成
      ReactDOM.render(React.createElement(ArticleDom, { list: articles }), element);
    } // render

  }, {
    key: 'waiting',
    get: function get() {
      return this._waiting;
    }
    /**
     * slideshow interval milliseconds を設定します
     * @param {Number} milliseconds slideshow interval milliseconds
     */
    ,
    set: function set(milliseconds) {
      this._waiting = milliseconds;
    }
  }]);
  return ViewPickup;
}(_View2.View); // class