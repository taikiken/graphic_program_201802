/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 21:39
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
exports.CategoryAuth = undefined;

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

var _OffsetAuth2 = require('../OffsetAuth');

var _Api = require('../../net/Api');

var _Safety = require('../../data/Safety');

var _User = require('../../app/User');

var _Length = require('../../app/const/Length');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事一覧, カテゴリー別, 全て...
 * <p>+ token</p>
 */

var CategoryAuth = exports.CategoryAuth = function (_OffsetAuth) {
  (0, _inherits3.default)(CategoryAuth, _OffsetAuth);

  /**
   * 記事一覧を取得します + token
   * @param {string} [slug=all] category slug です
   * @param {string} [type=''] request type, '' | 'ranking' | 'video' です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   * */

  function CategoryAuth() {
    var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];
    var type = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var offset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var length = arguments.length <= 5 || arguments[5] === undefined ? _Length.Length.archive : arguments[5];
    (0, _classCallCheck3.default)(this, CategoryAuth);

    slug = _Safety.Safety.string(slug, 'all');
    type = _Safety.Safety.string(type, '');

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CategoryAuth).call(this, _User.User.token, _Api.Api.category(), resolve, reject, offset, length));

    _this._slug = slug;

    if (_Safety.Safety.normalize(type, ['', 'ranking', 'video'])) {

      _this._type = type;
    } else {

      _this._type = '';
    }
    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {string|*} category slug を返します
   */

  (0, _createClass3.default)(CategoryAuth, [{
    key: 'slug',
    get: function get() {

      return this._slug;
    }
    /**
     * @return {string|*} request type('', ranking, video) を返します
     */

  }, {
    key: 'type',
    get: function get() {

      return this._type;
    }
    /**
     * Ajax API url を作成します
     * Api.category().url/all|slug[/ranking]?offset=0&length=5
     * @return {string} API url を返します
     */

  }, {
    key: 'url',
    get: function get() {

      if (this.type === '') {

        // type が empty, 新着順
        return this._url + '/' + this.slug + '?offset=' + this.offset + '&length=' + this.length;
      } else {

        // type が ranking | video
        return this._url + '/' + this.slug + '/' + this.type + '?offset=' + this.offset + '&length=' + this.length;
      }
    }
  }]);
  return CategoryAuth;
}(_OffsetAuth2.OffsetAuth);