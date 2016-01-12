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

import {Ajax} from './net/Ajax';
import {Api} from './net/Api';
import {Types} from './net/Types';
import {Codes} from './net/Codes';
import {User} from './net/User';

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = self.UT
 */
var UT = {
  version: '@@version',
  Ajax: Ajax,
  Api: Api,
  Types: Types,
  Codes: Codes,
  User: User
};

self.UT = UT;
