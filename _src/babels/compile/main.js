'use strict';

var _Api = require('./net/Api');

var _Types = require('./net/Types');

var _Codes = require('./net/Codes');

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = window.UT
 */
var UT = {
  version: '1.0.0',
  Api: _Api.Api,
  Types: _Types.Types,
  Codes: _Codes.Codes
}; /*!
    * Copyright (c) 2011-2016 inazumatv.com, Parachute.
    * @author (at)taikiken / http://inazumatv.com
    * @date 2016-01-12 15:29:15
    *
    * Distributed under the terms of the MIT license.
    * http://www.opensource.org/licenses/mit-license.html
    *
    * This notice shall be included in all copies or substantial portions of the Software.
    *
    */
// -------------------------------------
//  main
//    target for babel compile
// -------------------------------------

window.UT = UT;