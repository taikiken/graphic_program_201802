/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/01 - 22:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// event

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewArchiveMasonryInfinite = undefined;

var _EventDispatcher = require('../event/EventDispatcher');

var _Scroll = require('../util/Scroll');

var _Empty = require('../app/const/Empty');

var _User = require('../app/User');

var _View2 = require('./View');

var _ViewError = require('./error/ViewError');

var _Result = require('../data/Result');

var _Safety = require('../data/Safety');

var _ArticleDae = require('../dae/ArticleDae');

var _Rise = require('../ui/Rise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// dae

// data

// view

// app
var React = self.React;

// ui

// util

var ReactDOM = self.ReactDOM;

// imagesLoaded, isotope
var imagesLoaded = self.imagesLoaded;
var Isotope = self.Isotope;

/**
 * archive 一覧を isotope で
 */

var ViewArchiveMasonryInfinite = exports.ViewArchiveMasonryInfinite = function (_View) {
  (0, _inherits3.default)(ViewArchiveMasonryInfinite, _View);

  /**
   * <p>archive 一覧標示後 isotope で位置調整します<br>
   * + infinite scroll を実装します
   * </p>
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [useMasonry=true] isotope を行うかの
   */

  function ViewArchiveMasonryInfinite(element, moreElement) {
    var ActionClass = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var useMasonry = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
    (0, _classCallCheck3.default)(this, ViewArchiveMasonryInfinite);

    option = _Safety.Safety.object(option);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewArchiveMasonryInfinite).call(this, element, option));

    if (typeof ActionClass === 'function') {

      _this2._action = new ActionClass(_this2.done.bind(_this2), _this2.fail.bind(_this2));
    }
    _this2._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    _this2._articles = [];
    _this2._useMasonry = !!useMasonry;
    // ArticleDom instance を保持します
    // first render を区別するためにも使用します
    _this2._articleRendered = null;
    // more button instance を保持します
    _this2._moreRendered = null;
    // response.request object を保持する
    _this2._request = null;

    return _this2;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} more button root element を返します
   */

  (0, _createClass3.default)(ViewArchiveMasonryInfinite, [{
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
      console.log('ViewArchiveMasonry done ', result);
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

      // Masonry flag
      var useMasonry = this._useMasonry;

      // 既存データ用のglobal配列
      var articlesList = this._articles;

      // 前回までの配列length
      // sequence な index のために必要
      var prevLast = this._articles.length;

      // 記事挿入 root element
      var element = this.element;
      // 'View More' button root element
      var moreElement = this.moreElement;
      // offset, length を使用する Action
      var action = this.action;
      // 参照を保持
      var _this = this;

      // --------------------------------------------
      // More button
      // --------------------------------------------
      var MoreView = React.createClass({
        displayName: 'MoreView',

        propTypes: {
          show: React.PropTypes.bool.isRequired,
          loading: React.PropTypes.string
        },
        getDefaultProps: function getDefaultProps() {
          return {
            loading: ''
          };
        },
        getInitialState: function getInitialState() {
          this.rise = null;

          return {
            disable: false,
            show: this.props.show,
            loading: this.props.loading
          };
        },
        render: function render() {

          // hasNext: true, button を表示する？
          if (this.state.show) {

            return React.createElement(
              'div',
              { id: 'more', className: 'board-btn-viewmore' + this.state.loading },
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

            // button 表示なし
            return React.createElement('div', { className: 'no-more' });
          }
        },
        componentDidMount: function componentDidMount() {

          if (this.state.show && this.rise === null) {
            // mount 後
            // button が表示されているなら rise 監視を始める
            this.rise = new _Rise.Rise(element, 100);
            this.rise.on(_Rise.Rise.RISE, this.onRise);
            this.rise.start();
          }
        },
        componentWillUnmount: function componentWillUnmount() {
          // unmount 時に rise 破棄を行う
          this.destroy();
        },
        destroy: function destroy() {
          // rise 監視を破棄する
          if (this.rise !== null) {
            this.rise.stop();
            this.rise.off(_Rise.Rise.RISE, this.onRise);
            this.rise = null;
          }
        },
        handleClick: function handleClick(event) {
          event.preventDefault();
          // disable
          // this.setState( { loading: ' loading' } );
          // action.next();
          this.onRise();
        },
        updateShow: function updateShow(show) {
          if (!show) {
            // button を非表示にするので rise 監視を止める
            this.destroy();
          } else {
            // button 表示, loading 表示を止める
            this.updateLoading(false);
          }
          this.setState({ show: show });
        },
        updateLoading: function updateLoading() {
          var loading = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

          var loadingClass = '';
          if (loading && this.rise !== null) {
            // loading 中は監視を止める
            loadingClass = ' loading';
            this.rise.stop();
            action.next();
          } else {
            // loading が終わると監視開始
            this.rise.start();
          }
          this.setState({ loading: loadingClass });
        },
        onRise: function onRise(event) {
          console.log('========================== onRise ', event);

          this.updateLoading(true);
        }
      });

      // more button 作成関数
      // ArchiveDom から呼び出す
      var moreButton = function moreButton(show) {

        show = !!show;
        // moreElement 存在チェックを行う
        // Element 型を保証する
        // _moreRendered が null の時のみ, instance があれば state を update する
        if (_Safety.Safety.element(moreElement) && _this._moreRendered === null) {
          // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

          // チェックをパスし実行する
          _this._moreRendered = ReactDOM.render(React.createElement(MoreView, { show: show }), moreElement);
        } else {

          _this._moreRendered.updateShow(show);
        }
      };

      // more button 表示状態を loading on / off 切替えます
      /*
      let loadingButton = ( loading:boolean ) => {
         if ( _this._moreRendered !== null ) {
          _this._moreRendered.updateLoading( !!loading );
        }
       };
      */
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
          // console.log( 'seconds ', seconds );
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
          // active（click可能）にするかを表す
          var activeClass = active ? ' active' : '';

          if (sign) {

            // login user
            // click ずみの時は不可
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
            // click 不可
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

          var hasFirst = commentsPopular.hasFirst;
          var hasSecond = commentsPopular.hasSecond;
          var firstDae = commentsPopular.first;
          var secondsDae = commentsPopular.seconds;
          // console.log( 'commentsPopular', articleId, total, hasFirst, hasSecond, firstDae, secondsDae );
          if (hasSecond) {
            // 2件目以降も存在する
            // 2件目以降のDomを生成する
            second = React.createElement(CommentsSecond, { seconds: secondsDae, articleId: articleId });
            total -= secondsDae.length;
          }

          if (hasFirst) {

            // 少なくとも1件は存在する
            total -= 1;

            console.log('少なくとも1件は存在する ', articleId);
            // 1件目コメントデータを取り出し
            var first = firstDae;
            // console.log( 'first ', articleId, first );
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
                React.createElement('div', { className: 'comment-content', dangerouslySetInnerHTML: { __html: first.body } }),
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
                  total > 0 ? '+' + total : ''
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

      // ------------------------------------------------
      // 基点 React class
      // ------------------------------------------------

      // 個別の 記事Dom
      // React Class, Archive Dom
      var ArticleDom = React.createClass({
        displayName: 'ArticleDom',

        propTypes: {
          list: React.PropTypes.array.isRequired
        },
        getInitialState: function getInitialState() {
          this.isotope = null;
          this.img = null;
          this.elements = [];

          return {
            arranged: 'prepare',
            list: this.props.list
          };
        },
        render: function render() {

          console.log('****************************************** render');

          //let list = this.props.list;

          // dom出力する
          return React.createElement(
            'div',
            { className: this.state.arranged },
            React.createElement(
              'div',
              { ref: 'boardRout' },

              // loop start
              this.state.list.map(function (dae, i) {

                //let dae = new ArticleDae( article );
                //articlesList.push( dae );

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

                var commentsPopular = dae.commentsPopular;
                var figureTag = undefined;
                var commentsTotal = dae.commentsCount;

                console.log('ArchiveDom ', dae.id, dae.commentsCount, dae.commentsPopular);

                if (dae.mediaType === 'image') {
                  // type: image
                  figureTag = React.createElement(
                    'figure',
                    { className: 'post-thumb post-thumb-' + dae.mediaType },
                    React.createElement('img', { src: thumbnail, alt: caption || dae.title })
                  );
                } else {
                  // type: video
                  figureTag = React.createElement(
                    'figure',
                    { className: 'post-thumb post-thumb-' + dae.mediaType },
                    React.createElement('img', { className: 'post-thumb-overlay-movie type-movie', src: '/assets/images/common/thumb-overlay-movie-340x150.png' }),
                    React.createElement('img', { src: thumbnail, alt: caption || dae.title })
                  );
                }

                // unique key(React)にarticle id(number)記事Idを使用します
                return React.createElement(
                  'div',
                  { key: 'archive-' + dae.id, className: 'board-item board-item-' + i },
                  React.createElement(
                    'a',
                    { className: 'post', href: dae.url },
                    figureTag,
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
                      ),
                      React.createElement(
                        'div',
                        { className: 'post-excerpt-text' },
                        dae.description
                      )
                    )
                  ),
                  React.createElement(PopularDom, { commentsPopular: commentsPopular, total: commentsTotal, articleId: dae.id })
                );
                // loop end
              })
            )
          );
        },
        // state 変更し dom が更新された後に呼び出される delegate
        componentDidUpdate: function componentDidUpdate() {
          console.log('+++++++++ componentDidUpdate');

          // hasNext を元に More View button の表示非表示を決める
          moreButton(action.hasNext());

          // isotope 対象 children
          var childNodes = this.refs.boardRout.childNodes;
          var elements = [];
          // 追加された Element を取得するための start / end point
          // start は request offset
          var i = _this._request.offset;
          // end は request offset へ request length を加算したものと
          // children length の小さい方
          var limit = Math.min(i + _this._request.length, childNodes.length);
          console.log('start ', i);
          console.log('end ', limit);

          // start / end から 対象 children を選別
          for (; i < limit; i++) {
            elements.push(childNodes[i]);
          }

          this.elements = elements;

          var img = imagesLoaded(elements);
          // 画像読み込む完了 event へ bind します
          img.on('always', this.appendImages);
          this.img = img;
        },
        //// state 変更時に呼び出される delegate
        //shouldComponentUpdate: function() {
        //  console.log( '------------+++++++++++++ shouldComponentUpdate ------------' );
        //  // http://stackoverflow.com/questions/25135261/react-js-and-isotope-js
        //  // isotope がセットアップすると呼び出されるので
        //  // 常にfalseを返し無視させます
        //  //return false;
        //
        //  // state update で更新するので true にする, React 内部更新メソッドが実行される
        //  return true;
        //},
        // dom が表示された後に1度だけ呼び出される delegate
        componentDidMount: function componentDidMount() {
          // after mount
          _this.executeSafely(_View2.View.DID_MOUNT);
          // hasNext を元に More View button の表示非表示を決める
          moreButton(action.hasNext());

          // masonry flag が true の時に shouldMasonry を実行します
          if (useMasonry) {

            this.shouldMasonry();
          }
        },
        // dom が削除される前に呼び出される delegate
        componentWillUnmount: function componentWillUnmount() {
          console.log('************ componentWillUnmount ************');
          // unmount 時に isotope を破棄します
          this.isotope.destroy();
        },
        // -----------------------------------------------------
        // 以降 custom
        // isotope 前準備
        shouldMasonry: function shouldMasonry() {
          // isotope 前準備を実行します
          var boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
          var childNodes = boardRout.childNodes;
          console.log('shouldMasonry', boardRout, childNodes);

          // imagesLoaded を使用し画像ロード完了後に isotope を実行します
          var img = imagesLoaded(childNodes);

          // img {imagesLoaded} always event handler unbind するためにインスタンスを state に保存します
          // route {Element} isotope 基準 element
          // nodes {ElementList} isotope 対象 childNodes, 現在は使用していません, ひょっとすると将来使うかも...
          //this.setState( { img: img, nodes: childNodes, route: boardRout } );
          this.img = img;

          // 画像読み込む完了 event へ bind します
          img.on('always', this.onImages);
        },
        // 画像読み込む完了 event handler, isotope を実行
        onImages: function onImages() {

          //let img = this.state.img;
          var img = this.img;

          // event から event handler を unbind します
          img.off('always', this.onImages);

          // isotope を行います
          var isotope = new Isotope(this.refs.boardRout, {
            itemSelector: '.board-item',
            masonry: {
              gutter: 30
            }
          });

          // ToDo: arranged: 'arranged' が効いていない様子 親コンテナの css class を変えたい
          // 変えなくてもいいかなぁ〜

          // state は変更されている
          // element の class が変わらない
          //this.setState( { isotope: isotope, arranged: 'arranged' } );

          // state に保存しなくても良い気がする...
          this.isotope = isotope;
          //console.log( '%%%%%%%%% arrangeComplete %%%%%%%%%%%', _this._top );
          // render 時に 0 位置に戻るので
          // click 時の pageOffsetY へ移動させる
          //Scroll.y = _this._top;
        },
        //updateList: function( event ) {
        updateList: function updateList(list) {
          //let list = event.list;
          console.log('%%%%%%%%%%%%%%%%%%%%% updateList', event);
          // state を変更し appendChild + isotope を行う
          this.setState({ list: list });
        },
        appendImages: function appendImages() {

          console.log('++++++++++++++++++++ appendImages');

          // event から event handler を unbind します
          this.img.off('always', this.appendImages);

          // 追加とレイアウト
          this.isotope.appended(this.elements);
          // reload
          // http://isotope.metafizzy.co/methods.html#reloaditems
          this.isotope.reloadItems();
          // isotope 再度レイアウト
          this.isotope.layout();
        }
      }); // ArticleDom

      // ------------------------------------------------
      // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
      articles.forEach(function (article, i) {

        var dae = new _ArticleDae.ArticleDae(article);

        dae.index = prevLast + i;
        articlesList.push(dae);
      });

      // this._articleRendered が null の時だけ ReactDOM.render する
      if (this._articleRendered === null) {

        // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
        this._articleRendered = ReactDOM.render(React.createElement(ArticleDom, { list: articlesList }), element);
      } else {

        // instance が存在するので
        // state update でコンテナを追加する
        this._articleRendered.updateList(articlesList);
      }
    } // render

  }, {
    key: 'moreElement',
    get: function get() {
      return this._moreElement;
    }
  }]);
  return ViewArchiveMasonryInfinite;
}(_View2.View); // class