/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSingle = undefined;

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

var _View2 = require('./View');

var _ViewError = require('./error/ViewError');

var _ViewRelated = require('./single/ViewRelated');

var _ViewSingleHeader = require('./single/ViewSingleHeader');

var _ViewSingleFooter = require('./single/ViewSingleFooter');

var _Single = require('../action/single/Single');

var _Result = require('../data/Result');

var _Safety = require('../data/Safety');

var _SingleDae = require('../dae/SingleDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事詳細
 */

// action

var ViewSingle = function (_View) {
  (0, _inherits3.default)(ViewSingle, _View);

  /**
   * 記事ID で 記事詳細JSONを取得し表示します
   *
   * @example
   * let elements = {}
   *  related: document.getElementById('related'),
   *  footer: document.getElementById('footer')
   * }
   *
   * @param {Number} id article id, 記事Id
   * @param {Element} element root element
   * @param {Object} elements root element 関連記事, 各コメント
   * @param {Object} [option={}] optional event handler
   */

  function ViewSingle(id, element, elements) {
    var option = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    (0, _classCallCheck3.default)(this, ViewSingle);

    option = _Safety.Safety.object(option);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ViewSingle).call(this, element, option));

    _this._action = new _Single.Single(id, _this.done.bind(_this), _this.fail.bind(_this));
    if (!_Safety.Safety.isElement(elements.related)) {
      console.warn('un accessible elements.related . ' + elements.related);
    }
    if (!_Safety.Safety.isElement(elements.footer)) {
      console.warn('un accessible elements.footer . ' + elements.footer);
    }

    _this._elements = elements;
    // mount event handler
    _this._boundMount = _this.headerMount.bind(_this);
    // related instance
    _this._viewRelated = null;
    // header instance
    _this._header = null;
    // footer instance
    _this._footer = null;

    return _this;
  }
  /**
   * Ajax request を開始します
   */

  (0, _createClass3.default)(ViewSingle, [{
    key: 'start',
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

      var response = result.response;

      if (typeof response === 'undefined') {

        // articles undefined
        // JSON に問題がある
        var error = new Error('[SINGLE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
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

      var single = new _SingleDae.SingleDae(response);

      // beforeRender call
      this.executeSafely(_View2.View.BEFORE_RENDER, single);

      var header = undefined,
          footer = undefined;

      // header
      if (this._header === null) {

        header = new _ViewSingleHeader.ViewSingleHeader(this.element, single);
        header.on(_View2.View.DID_MOUNT, this._boundMount);
        this._header = header;
        header.start();
      } else {

        this._header.render(single);
      }

      // footer
      if (this._footer === null) {

        footer = new _ViewSingleFooter.ViewSingleFooter(this._elements.footer, single);
        this._footer = footer;
        footer.start();
      } else {

        this._footer.render(single);
      }

      // 関連記事 もしもあるなら
      if (single.hasRelated) {

        this.related(single.related);
      }
    } // render
    /**
     * header View.DID_MOUNT event handler
     */

  }, {
    key: 'headerMount',
    value: function headerMount() {

      this._header.off(_View2.View.DID_MOUNT, this._boundMount);
      this.executeSafely(_View2.View.DID_MOUNT);
    }
    /**
     * 関連記事（記事詳細の）
     * @param {Array} related 配列内データ型はRelatedDom
     */

  }, {
    key: 'related',
    value: function related() {
      var _related = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      _related = _Safety.Safety.array(_related);

      // 効率化のために
      // ViewRelated instance が null の時は instance を作成し start を実行する
      // instance が存在するときは render する
      if (this._viewRelated === null) {

        var viewRelated = new _ViewRelated.ViewRelated(this._elements.related, _related);
        viewRelated.start();
        this._viewRelated = viewRelated;
      } else {

        this._viewRelated.render(_related);
      }
    } // related

  }]);
  return ViewSingle;
}(_View2.View);

// dae

// data

exports.ViewSingle = ViewSingle;