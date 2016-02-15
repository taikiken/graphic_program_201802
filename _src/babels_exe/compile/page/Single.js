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

var _Header = require('./Header');

var _Sidebar = require('./Sidebar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

var _prepared = 0;
var _singleDae = null;
var _userDae = null;
var _viewSingle = null;

var Single = exports.Single = function () {
  function Single(target) {
    (0, _classCallCheck3.default)(this, Single);

    if (_symbol !== target) {

      throw new Error('Single is static Class. not use new Single().');
    }
  }

  (0, _createClass3.default)(Single, null, [{
    key: 'start',
    value: function start(articleId) {

      // header
      // header.user
      var headerUser = new UT.view.header.ViewHeaderUser(document.getElementById('user-profile-container'));
      if (UT.app.User.sign) {

        // login user はコメント投稿可能 -> 表示アイコン必要
        headerUser.on(UT.view.View.BEFORE_RENDER, Single.onHeader);
      } else {

        // 非ログインユーザーはアイコン取得いらない
        ++_prepared;
      }

      headerUser.start();

      // single page
      var elements = {
        related: document.getElementById('single-related-container'),
        footer: document.getElementById('single-footer-container')
      };

      var single = new UT.view.ViewSingle(articleId, document.getElementById('single-header-container'), elements);
      _viewSingle = single;
      single.on(UT.view.View.BEFORE_RENDER, Single.before);
      single.start();
    }
  }, {
    key: 'onHeader',
    value: function onHeader(event) {
      _userDae = event.args[0];
      Single.comment();
    }
  }, {
    key: 'before',
    value: function before(event) {

      _viewSingle.off(UT.view.View.BEFORE_RENDER, Single.before);

      var single = event.args[0];
      _singleDae = single;

      var slug = single.category.slug;
      var label = single.category.label;

      // title
      var title = new UT.view.ViewTitle(label, document.getElementById('page-title-container'));
      title.render();

      // sidebar
      _Sidebar.Sidebar.start(slug);

      Single.comment();
    }
  }, {
    key: 'comment',
    value: function comment() {
      ++_prepared;

      if (_prepared !== 2) {
        return;
      }

      // comment form
      var commentForm = new UT.view.comment.ViewCommentForm(document.getElementById('comment-form-container'), _singleDae.id, _userDae.profilePicture);
      commentForm.start();

      // self

      // official
      var official = new UT.view.ViewComments(_singleDae.id, document.getElementById('comment-official-container'), UT.app.const.CommentsType.OFFICIAL);
      if (_userDae !== null) {
        official.user = _userDae;
      }
      official.start();

      // normal
      var normal = new UT.view.ViewComments(_singleDae.id, document.getElementById('comment-normal-container'), UT.app.const.CommentsType.NORMAL);
      if (_userDae !== null) {
        normal.user = _userDae;
      }
      normal.start();
    }
  }]);
  return Single;
}();