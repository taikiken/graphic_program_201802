'use strict';

var _Loc = require('./util/Loc');

var _Ajax = require('./net/Ajax');

var _Api = require('./net/Api');

var _Types = require('./net/Types');

var _Codes = require('./net/Codes');

var _User = require('./net/User');

var _Permalink = require('./net/types/Permalink');

var _Query = require('./net/types/Query');

var _Queries = require('./net/types/Queries');

var _Type = require('./net/types/Type');

var _Action = require('./action/Action');

var _Offset = require('./action/Offset');

var _Pickup = require('./action/home/Pickup');

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = self.UT
 */

// net
var UT = {
  version: '1.0.0',
  util: {
    Loc: _Loc.Loc
  },
  net: {
    Ajax: _Ajax.Ajax,
    Api: _Api.Api,
    Types: _Types.Types,
    Codes: _Codes.Codes,
    User: _User.User,
    types: {
      Permalink: _Permalink.Permalink,
      Query: _Query.Query,
      Queries: _Queries.Queries,
      Type: _Type.Type
    }
  },
  action: {
    Action: _Action.Action,
    Offset: _Offset.Offset,
    home: {
      Pickup: _Pickup.Pickup
    }
  }

};

// action/home

// action

// net/types
/*!
 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016-01-13 23:08:05
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

// util

self.UT = UT;