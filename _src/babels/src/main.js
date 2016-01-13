/*!
 * Copyright (c) 2011-@@year inazumatv.com, @@copyright.
 * @author (at)taikiken / http://inazumatv.com
 * @date @@buildTime
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

// net
import {Ajax} from './net/Ajax';
import {Api} from './net/Api';
import {Types} from './net/Types';
import {Codes} from './net/Codes';
import {User} from './net/User';

// net/types
import {Permalink} from './net/types/Permalink';
import {Query} from './net/types/Query';
import {Queries} from './net/types/Queries';
import {Type} from './net/types/Type';

// action
import {Action} from './action/Action';
import {Offset} from './action/Offset';

// action/home
import {Pickup} from './action/home/Pickup';

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = self.UT
 */
var UT = {
  version: '@@version',
  net: {
    Ajax: Ajax,
    Api: Api,
    Types: Types,
    Codes: Codes,
    User: User,
    types: {
      Permalink: Permalink,
      Query: Query,
      Queries: Queries,
      Type: Type
    }
  },
  action: {
    Action: Action,
    Offset: Offset,
    home: {
      Pickup: Pickup
    }
  }

};

self.UT = UT;
