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

import {Api} from './net/Api';
import {Types} from './net/Types';
import {Codes} from './net/Codes';

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = window.UT
 */
var UT = {
  version: '@@version',
  Api: Api,
  Types: Types,
  Codes: Codes
};

window.UT = UT;
