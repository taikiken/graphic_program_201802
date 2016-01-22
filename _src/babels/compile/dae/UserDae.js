/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:17
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
exports.UserDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _TypeDae = require('./user/TypeDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.user
 */

var UserDae = exports.UserDae = function () {
  /**
   * article.user
   * @param {Object} [user={}] article.user
   */

  function UserDae() {
    var user = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, UserDae);

    this._user = user;
    this._type = new _TypeDae.TypeDae(user.type);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} article.user
   */

  (0, _createClass3.default)(UserDae, [{
    key: 'user',
    get: function get() {
      return this._user;
    }
    /**
     * @return {TypeDae|*} article.user.type
     */

  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
    /**
     * @return {string} article.user.id
     */

  }, {
    key: 'id',
    get: function get() {
      return this.user.id;
    }
    /**
     * @return {string} article.user.name
     */

  }, {
    key: 'userName',
    get: function get() {
      return this.user.name;
    }
    /**
     * @return {string} article.user.profile_picture
     */

  }, {
    key: 'profilePicture',
    get: function get() {
      return this.user.profile_picture;
    }
    /**
     * @return {string} article.user.url
     */

  }, {
    key: 'url',
    get: function get() {
      return this.user.url;
    }
  }]);
  return UserDae;
}();