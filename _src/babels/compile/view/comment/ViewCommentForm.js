/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewCommentForm = undefined;

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

var _View2 = require('../View');

var _User = require('../../app/User');

var _Empty = require('../../app/const/Empty');

var _Safety = require('../../data/Safety');

var _CommentFormNode = require('../../node/comment/CommentFormNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React
// let React = self.React;
var ReactDOM = self.ReactDOM;

/**
 * 記事へのコメント
 */

var ViewCommentForm = exports.ViewCommentForm = function (_View) {
  (0, _inherits3.default)(ViewCommentForm, _View);

  /**
   * 記事へのコメントフォーム
   * @param {Element} element root element
   * @param {Number} articleId 記事Id
   * @param {string} icon ユーザー画像パス
   */

  function ViewCommentForm(element, articleId, icon) {
    (0, _classCallCheck3.default)(this, ViewCommentForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewCommentForm).call(this, element));

    _this._articleId = String(articleId);
    if (!icon) {
      icon = _Empty.Empty.USER_EMPTY;
    } else if (!_Safety.Safety.isImg(icon)) {
      icon = _Empty.Empty.USER_EMPTY;
    }
    _this._icon = icon;
    return _this;
  }
  /**
   * render start
   */

  (0, _createClass3.default)(ViewCommentForm, [{
    key: 'start',
    value: function start() {
      this.render(this._articleId);
    }
    /**
     * フォーム生成を開始します
     * @param {string} id 記事Id
     */

  }, {
    key: 'render',
    value: function render(id) {
      ReactDOM.render(React.createElement(_CommentFormNode.CommentFormNode, {
        uniqueId: 'comment-to-' + id,
        icon: this._icon,
        articleId: id,
        sign: _User.User.sign,
        independent: true
      }), this.element);
    }
  }]);
  return ViewCommentForm;
}(_View2.View);