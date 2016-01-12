'use strict';

var _Ajax = require('./net/Ajax');

var _Api = require('./net/Api');

var _Types = require('./net/Types');

var _Codes = require('./net/Codes');

var _User = require('./net/User');

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = self.UT
 */
var UT = {
  version: '1.0.0',
  Ajax: _Ajax.Ajax,
  Api: _Api.Api,
  Types: _Types.Types,
  Codes: _Codes.Codes,
  User: _User.User
}; /*!
    * Copyright (c) 2011-2016 inazumatv.com, Parachute.
    * @author (at)taikiken / http://inazumatv.com
    * @date 2016-01-12 23:06:39
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

self.UT = UT;