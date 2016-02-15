/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 20:51
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
exports.ViewComments = undefined;

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

var _CommentsType = require('../app/const/CommentsType');

var _User = require('../app/User');

var _View2 = require('./View');

var _ViewError = require('./error/ViewError');

var _Comments = require('../action/comment/Comments');

var _Result = require('../data/Result');

var _Safety = require('../data/Safety');

var _CommentsListDae = require('../dae/CommentsListDae');

var _UserDae = require('../dae/UserDae');

var _CommentNode = require('../node/comment/CommentNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React

// action

// view
var React = self.React;

// node

// dae

// data

var ReactDOM = self.ReactDOM;

/**
 * comments スレッド を表示する
 */

var ViewComments = exports.ViewComments = function (_View) {
  (0, _inherits3.default)(ViewComments, _View);

  /**
   * コメントスレッド表示（記事詳細）
   * @param {Number} id 記事ID :article_id
   * @param {Element} element target HTMLElement
   * @param {string} commentsType all|official|self|normal コメントリスト種類
   * @param {Object} [option={}] optional event handler
   */

  function ViewComments(id, element, commentsType) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ViewComments);

    option = _Safety.Safety.object(option);
    console.log('commentsType', commentsType);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewComments).call(this, element, option));

    _this2._action = _Comments.Comments.type(commentsType, id, _this2.done.bind(_this2), _this2.fail.bind(_this2));
    _this2._articleId = id;
    _this2._commentsListType = commentsType;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    _this2._commentsList = [];
    _this2._commentsBank = {};

    // more button instance 用
    _this2._moreRendered = null;
    // CommentsDom instance を保持します
    _this2._commentsRendered = null;

    // user 情報
    _this2._user = null;
    return _this2;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * ログイン user 情報
   * @return {UserDae} ログイン user 情報を返します
   */

  (0, _createClass3.default)(ViewComments, [{
    key: 'start',

    // ---------------------------------------------------
    //  Method
    // ---------------------------------------------------
    /**
     * Ajax request を開始します
     */
    value: function start() {

      if (_User.User.sign && this.user === null) {
        throw new Error('user info have to set before start.' + this._articleId + ', ' + this._commentsListType);
      }
      this.action.next();
    }
    /**
     * Ajax response success
     * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
     */

  }, {
    key: 'done',
    value: function done(result) {

      var response = result.response;
      // console.log( 'response ', typeof response === 'undefined', response );
      if (typeof response === 'undefined') {

        // articles undefined
        // JSON に問題がある
        var error = new Error('[COMMENTS:UNDEFINED]サーバーレスポンスに問題が発生しました。');
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

      var commentsListDae = new _CommentsListDae.CommentsListDae(response);

      // total check
      if (commentsListDae.total === 0) {
        // デーが無いので処理を止める
        console.log('(' + this._articleId + ', ' + this._commentsListType + ') stop rendering.');
        this.executeSafely(_View2.View.EMPTY_ERROR);
        return;
      }

      // previous data と新規データを合成
      this._commentsList = this._commentsList.concat(commentsListDae.comments.list);

      // _commentsBank へ comment.id をキーにデータをセット
      var bank = this._commentsBank;
      commentsListDae.comments.list.forEach(function (commentId) {

        bank[commentId] = commentsListDae.comments.bank[commentId];
      });

      // 処理開始 関数振り分け
      switch (this._commentsListType) {

        case _CommentsType.CommentsType.SELF:
          this.mine(commentsListDae);
          break;

        case _CommentsType.CommentsType.OFFICIAL:
        case _CommentsType.CommentsType.NORMAL:
        case _CommentsType.CommentsType.ALL:
        default:
          this.all(commentsListDae);
          break;

      }
    } // render

  }, {
    key: 'mine',
    value: function mine(commentsListDae) {}
    /**
     * normal, official, all をレンダリング
     * @param {CommentsListDae} commentsListDae コメント一覧 CommentsListDae instance
     */

  }, {
    key: 'all',
    value: function all(commentsListDae) {

      var commentsList = this._commentsList;
      var commentsBank = this._commentsBank;

      // コメント挿入 root element
      var element = this.element;
      // offset, length を使用する Action
      var action = this.action;
      var _this = this;

      // --------------------------------------------
      // More button
      // --------------------------------------------
      var MoreView = React.createClass({
        displayName: 'MoreView',

        propTypes: {
          show: React.PropTypes.bool.isRequired
        },
        getDefaultProps: function getDefaultProps() {
          return {
            show: false
          };
        },
        getInitialState: function getInitialState() {
          return {
            loading: false,
            show: this.props.show
          };
        },
        render: function render() {

          // hasNext: true, button を表示する？
          if (this.state.show) {

            return React.createElement(
              'div',
              { className: this.state.loading ? 'loading' : '' },
              React.createElement(
                'a',
                { href: '#more', onClick: this.handleClick },
                'More View'
              )
            );
          } else {

            // button 表示なし
            return React.createElement('div', { className: 'no-more' });
          }
        },
        // -----------------------------------------
        // button 関連 custom method
        handleClick: function handleClick(event) {
          event.preventDefault();
          // loading 表示
          this.setState({ loading: true });
          action.next();
        },
        // button 表示・非表示
        updateShow: function updateShow(show) {

          this.setState({ show: show });
        }
      });

      // more button 作成関数
      // CommentsDom から呼び出す
      var moreButton = function moreButton(show, moreElement) {

        show = !!show;

        // moreElement 存在チェックを行う
        // Element 型を保証する
        // _moreRendered が null の時のみ, instance があれば state を update する
        if (_Safety.Safety.isElement(moreElement)) {
          if (_this._moreRendered === null) {

            _this._moreRendered = ReactDOM.render(React.createElement(MoreView, { show: show }), moreElement);
          } else {

            // instance がある, render 済み
            // state を変更し button の表示・非表示を行う
            _this._moreRendered.updateShow(show);
          }
        }
      };

      // --------------------------------------------
      // COMMENT reply loop
      // 親コメントへ返信
      // --------------------------------------------
      var CommentReplyChild = React.createClass({
        displayName: 'CommentReplyChild',

        propType: {
          total: React.PropTypes.number.isRequired,
          sign: React.PropTypes.bool.isRequired,
          uniqueId: React.PropTypes.string.isRequired,
          userId: React.PropTypes.string.isRequired,
          articleId: React.PropTypes.string.isRequired,
          commentId: React.PropTypes.string.isRequired,
          commentsListType: React.PropTypes.object.isRequired,
          reply: React.PropTypes.object.isRequired
        },
        getInitialState: function getInitialState() {
          return {
            reply: this.props.reply
          };
        },
        render: function render() {

          if (this.props.total === 0) {
            // 描画しない
            return null;
          }

          var reply = this.state.reply;
          var replyList = reply.comments;
          var commentId = this.props.commentId;
          var userId = this.props.userId;
          var sign = this.props.sign;
          var articleId = this.props.articleId;
          var uniqueId = this.props.uniqueId;

          return React.createElement(
            'ul',
            { className: 'comment-list' },
            replyList.comments.map(function (replyComment) {

              /* 親コメントと子コメントのデータ形式が違う
                 合わせるために object でラップする {comment: replyComment}
              */
              /* independent, open, commentCount 省略 */
              return React.createElement(
                'li',
                { key: uniqueId + '-' + replyComment.id, className: 'comment-item' },
                React.createElement(_CommentNode.CommentNode, {
                  uniqueId: uniqueId + '-' + replyComment.id,
                  commentDae: { comment: replyComment },
                  userId: userId,
                  articleId: articleId,
                  commentId: commentId,
                  commentUserId: String(replyComment.user.id),
                  sign: sign,
                  parent: false
                })
              );
            })
          );
        }
      });

      // --------------------------------------------
      // COMMENT Parent
      // --------------------------------------------
      var CommentsParent = React.createClass({
        displayName: 'CommentsParent',

        propType: {
          commentObject: React.PropTypes.object.isRequired,
          uniqueId: React.PropTypes.string.isRequired,
          articleId: React.PropTypes.string.isRequired,
          commentsListType: React.PropTypes.string.isRequired,
          total: React.PropTypes.number.isRequired,
          index: React.PropTypes.number.isRequired,
          user: React.PropTypes.object
        },
        getDefaultProps: function getDefaultProps() {
          return {
            user: {}
          };
        },
        render: function render() {

          var commentObject = this.props.commentObject;
          console.log('CommentsParent commentObject ', commentObject);

          var total = _Safety.Safety.integer(commentObject.reply.total, 0);
          var sign = _User.User.sign;
          var icon = undefined;
          var userId = '';
          var commentId = String(commentObject.comment.id);
          var articleId = this.props.articleId;
          var commentsListType = this.props.commentsListType;

          if (sign) {
            var _user = this.props.user;
            icon = _user.profilePicture;
            if (!icon) {
              icon = _Empty.Empty.USER_EMPTY;
            } else if (_Safety.Safety.isImg(icon)) {
              icon = _Empty.Empty.USER_EMPTY;
            }

            // id
            userId = _user.id;
            if (!userId) {
              userId = '';
            }
          }

          console.log('================================== parent =========================');
          return React.createElement(
            'ul',
            { className: 'comment-list' },
            React.createElement(
              'li',
              { className: 'comment-item' },
              React.createElement(_CommentNode.CommentNode, {
                uniqueId: this.props.uniqueId + '-' + commentId,
                commentDae: commentObject,
                icon: icon,
                userId: userId,
                articleId: articleId,
                commentId: commentId,
                commentUserId: String(commentObject.comment.user.id),
                commentCount: commentObject.reply.total,
                sign: sign,
                parent: true
              }),
              React.createElement(CommentReplyChild, {
                uniqueId: this.props.uniqueId + '-' + commentId + '-reply',
                total: total,
                sign: sign,
                userId: userId,
                articleId: articleId,
                commentId: commentId,
                commentsListType: commentsListType,
                reply: commentObject.reply })
            )
          );
        }
      });

      // --------------------------------------------
      // COMMENT iteration
      // --------------------------------------------
      var CommentsDom = React.createClass({
        displayName: 'CommentsDom',

        propType: {
          commentsList: React.PropTypes.array.isRequired,
          commentsListType: React.PropTypes.string.isRequired,
          articleId: React.PropTypes.string.isRequired,
          user: React.PropTypes.object
        },
        getInitialState: function getInitialState() {
          return {
            commentsList: this.props.commentsList
          };
        },
        render: function render() {

          var list = this.state.commentsList;
          var articleId = this.props.articleId;
          var commentsListType = this.props.commentsListType;

          if (!_Safety.Safety.array(list) || list.length === 0) {
            // 描画しない
            console.warn('list error ', commentsListType, list);
            return null;
          }
          console.log('******************************* start render *******************************', list);
          return React.createElement(
            'div',
            { className: 'comment-' + commentsListType },
            React.createElement(
              'div',
              { className: 'comment-heading' },
              React.createElement(
                'h2',
                null,
                _CommentsType.CommentsType.title(commentsListType)
              )
            ),
            list.map(function (commentId, index) {
              var commentObject = commentsBank[commentId];
              var key = commentsListType + '-' + articleId + '-' + commentId;
              console.log('commentId ' + commentId + ', ' + key);

              return React.createElement(CommentsParent, {
                key: key,
                uniqueId: key,
                index: index,
                articleId: articleId,
                commentObject: commentObject,
                commentsListType: commentsListType,
                total: commentsListDae.total });
            }),
            React.createElement('div', { className: 'comment-more', ref: 'commentMore' })
          );
        },
        componentDidMount: function componentDidMount() {
          // after mount
          _this.executeSafely(_View2.View.DID_MOUNT);
          // hasNext を元に More View button の表示非表示を決める
          console.log('more has ', action.hasNext());
          moreButton(action.hasNext(), ReactDOM.findDOMNode(this.refs.commentMore));
        },
        updateList: function updateList(list) {
          // state を変更し appendChild を行う
          this.setState({ commentsList: list });
        }
      });

      // --------------------------------------------
      // COMMENT Dom build
      // --------------------------------------------
      var user = this.user;
      if (user === null) {
        user = {};
      }
      // this._commentsRendered が null の時だけ CommentsDom.render する
      if (this._commentsRendered === null) {

        this._commentsRendered = ReactDOM.render(React.createElement(CommentsDom, {
          commentsList: commentsList,
          articleId: String(this._articleId),
          commentsListType: this._commentsListType,
          user: user
        }), element);
      } else {

        this._commentsRendered.updateList(commentsList);
      }
    } // all

  }, {
    key: 'user',
    get: function get() {
      return this._user;
    }
    /**
     * ログイン user 情報を設定します<br>
     * start の前に設定します
     * @param {UserDae} user ログイン user 情報
     */
    ,
    set: function set(user) {
      this._user = user;
    }
  }]);
  return ViewComments;
}(_View2.View);