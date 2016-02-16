/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// import {Header} from './Header';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Single = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Sidebar = require('./Sidebar');

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

var _prepared = 0;
var _singleDae = null;
var _userDae = null;
var _viewSingle = null;
var _headerUser = null;

/**
 * <h3>Single(detail)記事詳細</h3>
 * 全て static です
 */

var Single = exports.Single = function () {
  function Single(target) {
    (0, _classCallCheck3.default)(this, Single);

    if (_symbol !== target) {

      throw new Error('Single is static Class. not use new Single().');
    }
  }
  /**
   * 記事詳細, 上部 / 下部 rendering 開始
   * @param {Number} articleId 記事 Id (:article_id)
   */

  (0, _createClass3.default)(Single, null, [{
    key: 'start',
    value: function start(articleId) {

      // header
      // header.user
      var headerUser = new UT.view.header.ViewHeaderUser(_Dom.Dom.profile());
      if (UT.app.User.sign) {

        // login user はコメント投稿可能 -> 表示アイコン必要
        _headerUser = headerUser;
        headerUser.on(UT.view.View.BEFORE_RENDER, Single.onHeader);
      } else {

        // 非ログインユーザーはアイコン取得いらない
        ++_prepared;
      }

      headerUser.start();

      // single page
      var elements = {
        related: _Dom.Dom.related(),
        footer: _Dom.Dom.singleFooter()
      };

      var single = new UT.view.ViewSingle(articleId, _Dom.Dom.singleHeader(), elements);
      _viewSingle = single;
      single.on(UT.view.View.BEFORE_RENDER, Single.before);
      single.start();
    }
    /**
     * header View.BEFORE_RENDER event handler
     * <p>ユーザー: アイコン, Id 取得のために event を bind し情報を取得します</p>
     * @param {Object} event event object
     */

  }, {
    key: 'onHeader',
    value: function onHeader(event) {
      _headerUser.on(UT.view.View.BEFORE_RENDER, Single.onHeader);
      _userDae = event.args[0];
      Single.comment();
    }
    /**
     * single View.BEFORE_RENDER event handler
     * <p>記事所属カテゴリ取得のために event を bind</p>
     * @param {Object} event event object
     */

  }, {
    key: 'before',
    value: function before(event) {

      _viewSingle.off(UT.view.View.BEFORE_RENDER, Single.before);

      var single = event.args[0];
      _singleDae = single;

      var slug = single.category.slug;
      // let label = single.category.label;

      // title は backend output

      // sidebar
      _Sidebar.Sidebar.start(slug);

      Single.comment();
    }
    /**
     * **ログイン**
     * <p>ユーザー情報, 記事 Id 必須</p>
     *
     * **非ログイン**
     * <p>記事 Id 必須</p>
     */

  }, {
    key: 'comment',
    value: function comment() {
      ++_prepared;

      if (_prepared !== 2) {
        return;
      }

      // user icon
      // _userDae null check
      //  _userDae.profilePicture undefined check
      var picture = '';
      if (_userDae !== null && typeof _userDae.profilePicture !== 'undefined') {
        picture = _userDae.profilePicture;
      }

      // article id
      var articleId = _singleDae.id;
      var ViewComments = UT.view.ViewComments;

      // comment form
      var commentForm = new UT.view.comment.ViewCommentForm(_Dom.Dom.commentForm(), articleId, picture);
      commentForm.start();

      // self
      var commentSelf = new ViewComments(articleId, _Dom.Dom.commentSelf(), UT.app.const.CommentsType.SELF);
      if (_userDae !== null) {
        commentSelf.user = _userDae;
      }
      commentSelf.start();

      // official
      var official = new ViewComments(articleId, _Dom.Dom.commentOfficial(), UT.app.const.CommentsType.OFFICIAL);
      if (_userDae !== null) {
        official.user = _userDae;
      }
      official.start();

      // normal
      var normal = new ViewComments(articleId, _Dom.Dom.commentNormal(), UT.app.const.CommentsType.NORMAL);
      if (_userDae !== null) {
        normal.user = _userDae;
      }
      normal.start();
    }
  }]);
  return Single;
}();