/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 22:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPComment = undefined;

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

/**
 * <h3>Comment 詳細</h3>
 * 全て static です
 */

var SPComment = exports.SPComment = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPComment(target) {
    (0, _classCallCheck3.default)(this, SPComment);

    if (_symbol !== target) {

      throw new Error('SPComment is static Class. not use new SPComment().');
    }
  }
  /**
   * コメント詳細を表示するために事前にユーザー情報を取得する
   * @param {string} mode 記事へのコメントかコメントの返信
   * @param {Number} articleId 記事 id
   * @param {Number} commentId コメント id
   * @param {Number} [replyId=0] 返信 id
   */

  (0, _createClass3.default)(SPComment, null, [{
    key: 'user',
    value: function user(mode, articleId, commentId) {
      var replyId = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

      // header.user
      var profileElement = _Dom.Dom.profile();
      var headerUser = undefined;
      var userDae = undefined;

      var onHeader = function onHeader(event) {
        headerUser.off(UT.view.View.BEFORE_RENDER, onHeader);
        userDae = event.args[0];

        switch (mode) {
          case 'reply':
            SPComment.reply(userDae, articleId, commentId, replyId);
            break;

          case 'comment':
          default:
            SPComment.comment(userDae, articleId, commentId);
            break;

        }
      };

      if (profileElement !== null) {
        headerUser = new UT.view.header.ViewHeaderUser(profileElement);

        if (UT.app.User.sign) {
          headerUser.on(UT.view.View.BEFORE_RENDER, onHeader);
        } else {
          // not sign in
          switch (mode) {
            case 'reply':
              SPComment.reply(null, articleId, commentId, replyId);
              break;

            case 'comment':
            default:
              SPComment.comment(null, articleId, commentId);
              break;

          }
        }

        headerUser.start();

        var modalElement = _Dom.Dom.modal();
        if (modalElement !== null) {
          var modal = new UT.view.modal.ViewLogoutModal(modalElement);
          modal.start();
        }
      }

      Comment.single(articleId);
    }
    /**
     * コメント 詳細
     * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
     * @param {Number} articleId 記事 ID :article_id
     * @param {Number} commentId コメント ID
     */

  }, {
    key: 'comment',
    value: function comment(userDae, articleId, commentId) {
      var commentNormal = _Dom.Dom.commentNormal();

      // comment 詳細
      if (commentNormal !== null) {
        var _comment = new UT.view.ViewCommentSingle(articleId, commentId, commentNormal);
        _comment.user = userDae;
        _comment.start();
      }
    }
    /**
     * コメント返信 詳細
     * @param {UserDae} userDae ユーザー情報 UT.dae.UserDae
     * @param {Number} articleId 記事 ID :article_id
     * @param {Number} commentId コメント ID
     * @param {Number} replyId コメント返信 ID
     */

  }, {
    key: 'reply',
    value: function reply(userDae, articleId, commentId, replyId) {
      var commentNormal = _Dom.Dom.commentNormal();

      // comment 詳細
      if (commentNormal !== null) {
        var comment = new UT.view.ViewCommentSingle(articleId, commentId, commentNormal, replyId);
        comment.user = userDae;
        comment.start();
      }
    }
    /**
     * 記事タイトル
     * @param {Number} articleId 記事 ID
     */

  }, {
    key: 'single',
    value: function single(articleId) {
      var headerElement = _Dom.Dom.singleHeader();
      var title = undefined;

      var beforeRender = function beforeRender(event) {
        title.off(UT.view.View.BEFORE_RENDER, beforeRender);
        var single = event.args[0];
        var slug = single.category.slug;
        // sidebar
        _SPSidebar.SPSidebar.start(slug);

        // nav current
        _SPNav.SPNav.start(slug);
      };

      if (headerElement !== null) {
        title = new UT.view.single.ViewSingleTitle(articleId, headerElement);
        title.on(UT.view.View.BEFORE_RENDER, beforeRender);
        title.start();
      }
    }
  }]);
  return SPComment;
}();