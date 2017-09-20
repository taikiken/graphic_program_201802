'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date 2017/09/20 - 16:13
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// moku/device


// net


// app


// ui


var _Android = require('./moku/device/os/Android');

var _Android2 = _interopRequireDefault(_Android);

var _iOS = require('./moku/device/os/iOS');

var _iOS2 = _interopRequireDefault(_iOS);

var _Visited = require('./banner/net/Visited');

var _Visited2 = _interopRequireDefault(_Visited);

var _Black = require('./banner/app/Black');

var _Black2 = _interopRequireDefault(_Black);

var _Modal = require('./banner/ui/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 条件をチェックし `app download banner` を表示します
 */
var Main = function () {
  function Main() {
    _classCallCheck(this, Main);
  }

  _createClass(Main, null, [{
    key: 'modal',

    /**
     * `app download banner` を表示します
     * - pc / sp 判定し処理分岐します
     * - modal Element 作成します
     */
    value: function modal() {
      // console.log('Main.modal');
      var element = document.createElement('div');
      element.className = 'modal-intro';
      // make modal container
      if (_Android2.default.phone() || _iOS2.default.phone()) {
        _Modal2.default.sp(element);
      } else {
        _Modal2.default.pc(element);
      }
    }
    /**
     * 条件チェックを行います -> modal 作成・表示します
     * - {@link Black}, {@link Visited}
     */

  }, {
    key: 'start',
    value: function start() {
      // console.log('Main.start', Black.detect(), Visited.already());
      // googletag 条件追加する
      if (!_Black2.default.detect() && !_Visited2.default.already() && self.googletag) {
        // Visited.arrive();
        Main.modal();
      }
    }
  }]);

  return Main;
}();

exports.default = Main;