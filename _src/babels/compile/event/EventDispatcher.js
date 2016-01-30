/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 21:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * <h2>EventDispatcher</h2>
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDispatcher = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventDispatcher = exports.EventDispatcher = function () {
  /**
   * custom event を作成し管理します<br>
   * **extends** して使います。
   */

  function EventDispatcher() {
    (0, _classCallCheck3.default)(this, EventDispatcher);

    this._listeners = {};
  }

  /**
   * event type に リスナー関数を bind します
   * @param {string} type event type
   * @param {Function} listener callback関数
   */

  (0, _createClass3.default)(EventDispatcher, [{
    key: 'on',
    value: function on(type, listener) {

      if (listener === null) {
        // listener が null
        // 処理しない
        return;
      }

      var listeners = this._listeners;

      // listeners.type が存在するかを調べます
      // if ( !listeners[ type ].hasOwnProperty( type ) ) {
      if (typeof listeners[type] === 'undefined') {

        // listeners.type が存在しない
        // listeners.type 新規配列を作成し
        // listener を配列へ登録します
        listeners[type] = [];
        listeners[type].push(listener);
      } else {

        // すでに listeners.type が存在する
        // listeners.type 配列に listener が存在しないならば登録します
        if (listeners[type].indexOf(listener) === -1) {

          listeners[type].push(listener);
        }
      }
    }

    /**
     * event type からリスナー関数を remove します
     * @param {string} type event type
     * @param {Function} listener リスナー関数
     */

  }, {
    key: 'off',
    value: function off(type, listener) {

      if (listener === null) {
        // listener が null
        // 処理しない
        return;
      }

      var listeners = this._listeners;

      if (typeof listeners[type] === 'undefined') {
        // listener.type が存在しない
        // 処理しない
        return;
      }

      var types = listeners[type];

      // listener の配列位置を調べる
      var index = types.indexOf(listener);

      if (index === -1) {
        // 配列位置が -1, 見つからなかった
        // 処理しない
        return;
      }

      // すぐに削除するのでは無く null 代入
      // loop の中で連続で off されると index 位置が変わるとまずい
      types[index] = null;

      this.clean(type, types);
    }

    /**
     * 内部関数<br>
     * リスナーの中をクリンーンにします
     * @param {string} type event type
     * @param {Array<Function>} types event type に登録されている関数配列
     */

  }, {
    key: 'clean',
    value: function clean(type, types) {

      var hasFunction = false;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(types), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listener = _step.value;

          if (listener !== null) {
            hasFunction = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!hasFunction) {

        // null 以外が無い
        this._listeners[type] = [];
      }
    }

    /**
     * event type にリスナー関数が登録されているかを調べます
     * @param {string} type event type
     * @param {Function} listener リスナー関数
     * @return {boolean} event type にリスナー関数が登録されているかの真偽値を返します
     */

  }, {
    key: 'has',
    value: function has(type, listener) {

      if (listener === null) {
        // listener が null
        // 処理しない
        return false;
      }

      var listeners = this._listeners;

      if (typeof listeners[type] === 'undefined') {
        // listener.type が存在しない
        // 処理しない
        return false;
      }

      // 存在チェック
      return listeners[type].indexOf(listener) !== -1;
    }
    /**
     * イベントを発生させリスな関数を call します
     * @param {Object} event type が必須です
     */

  }, {
    key: 'dispatch',
    value: function dispatch(event) {

      var listeners = this._listeners;

      console.log('dispatch ', event);
      // console.log( 'listeners[ event.type ] ', listeners[ event.type ] );

      if (typeof listeners[event.type] === 'undefined') {
        // listener.type が存在しない
        // 処理しない
        return;
      }

      var types = listeners[event.type];
      event.target = this;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(types), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var listener = _step2.value;

          if (listener !== null && typeof listener === 'function') {
            // callback apply
            // 第二引数がObjectの時は call する
            listener.call(this, event);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
     * alias on,
     * event type に リスナー関数を bind します
     * @param {string} type event type
     * @param {Function} listener callback関数
     */

  }, {
    key: 'addEventListener',
    value: function addEventListener(type, listener) {
      this.on(type, listener);
    }
    /**
     * alias off,
     * event type からリスナー関数を remove します
     * @param {string} type event type
     * @param {Function} listener リスナー関数
     */

  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, listener) {
      this.off(type, listener);
    }
    /**
     * alias has,
     * event type にリスナー関数が登録されているかを調べます
     * @param {string} type event type
     * @param {Function} listener リスナー関数
     * @return {boolean} event type にリスナー関数が登録されているかの真偽値を返します
     */

  }, {
    key: 'hasEventListener',
    value: function hasEventListener(type, listener) {
      return this.has(type, listener);
    }
    /**
     * alias dispatch
     * イベントを発生させリスな関数を call します
     *
     * @param {Object} event type が必須です
     */

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(event) {
      this.dispatch(event);
    }
  }]);
  return EventDispatcher;
}();