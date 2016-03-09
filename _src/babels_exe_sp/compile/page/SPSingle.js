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
exports.SPSingle = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _SPSidebar = require('./SPSidebar');

var _Dom = require('../dom/Dom');

var _SPNav = require('../ui/SPNav');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT

// ui
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

var SPSingle = exports.SPSingle = function () {
  /**
   * 記事詳細 singleton class です
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPSingle(target) {
    (0, _classCallCheck3.default)(this, SPSingle);

    if (_symbol !== target) {

      throw new Error('SPSingle is static Class. not use new SPSingle().');
    }
  }
  /**
   * 記事詳細, 上部 / 下部 rendering 開始
   * @param {Number} articleId 記事 Id (:article_id)
   */

  (0, _createClass3.default)(SPSingle, null, [{
    key: 'start',
    value: function start(articleId) {

      // header
      // header.user
      var profileElement = _Dom.Dom.profile();
      var headerUser = undefined;
      if (profileElement !== null) {
        headerUser = new UT.view.header.ViewHeaderUser(profileElement);
        if (UT.app.User.sign) {

          // login user はコメント投稿可能 -> 表示アイコン必要
          _headerUser = headerUser;
          headerUser.on(UT.view.View.BEFORE_RENDER, SPSingle.onHeader);
        } else {

          // 非ログインユーザーはアイコン取得いらない
          ++_prepared;
        }
        headerUser.start();

        var modalElement = _Dom.Dom.modal();
        if (modalElement !== null) {
          var modal = new UT.view.modal.ViewLogoutModal(modalElement);
          modal.start();
        }
      }

      // single page
      // related いらなくる予定
      var elements = {
        related: _Dom.Dom.related(),
        footer: _Dom.Dom.singleFooter()
      };

      var singleHeaderElement = _Dom.Dom.singleHeader();

      if (singleHeaderElement !== null && elements.footer !== null) {
        var single = new UT.view.ViewSingle(articleId, singleHeaderElement, elements);
        _viewSingle = single;
        single.on(UT.view.View.BEFORE_RENDER, SPSingle.before);
        single.start();
      }
    }
    /**
     * header View.BEFORE_RENDER event handler
     * <p>ユーザー: アイコン, Id 取得のために event を bind し情報を取得します</p>
     * @param {Object} event event object
     */

  }, {
    key: 'onHeader',
    value: function onHeader(event) {
      _headerUser.off(UT.view.View.BEFORE_RENDER, SPSingle.onHeader);
      _userDae = event.args[0];
      SPSingle.comment();
    }
    /**
     * single View.BEFORE_RENDER event handler
     * <p>記事所属カテゴリ取得のために event を bind</p>
     * @param {Object} event event object
     */

  }, {
    key: 'before',
    value: function before(event) {

      _viewSingle.off(UT.view.View.BEFORE_RENDER, SPSingle.before);

      var single = event.args[0];
      _singleDae = single;

      var slug = single.category.slug;
      // let label = single.category.label;

      // title は backend output

      // sidebar
      _SPSidebar.SPSidebar.start(slug);

      // nav current
      _SPNav.SPNav.start(slug);

      SPSingle.comment();
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
      var commentFormElement = _Dom.Dom.commentForm();
      if (commentFormElement !== null) {
        var commentForm = new UT.view.comment.ViewCommentForm(commentFormElement, articleId, picture);
        commentForm.start();
      }

      // self
      var selfElement = _Dom.Dom.commentSelf();
      if (selfElement !== null) {
        var commentSelf = new ViewComments(articleId, selfElement, UT.app.const.CommentsType.SELF);
        if (_userDae !== null) {
          commentSelf.user = _userDae;
        }
        commentSelf.start();
      }

      // official
      var officialElement = _Dom.Dom.commentOfficial();
      if (officialElement !== null) {
        var official = new ViewComments(articleId, officialElement, UT.app.const.CommentsType.OFFICIAL);
        if (_userDae !== null) {
          official.user = _userDae;
        }
        official.start();
      }

      // normal
      var normalElement = _Dom.Dom.commentNormal();
      if (normalElement !== null) {
        var normal = new ViewComments(articleId, normalElement, UT.app.const.CommentsType.NORMAL);
        if (_userDae !== null) {
          normal.user = _userDae;
        }
        normal.start();
      }
    }
  }]);
  return SPSingle;
}();