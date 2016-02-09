/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 14:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Action} from '../Action';
import {Api} from '../../net/Api';
import {Path} from '../../app/const/Path';

export class Categories extends Action {
  constructor( resolve:Function = null, reject:Function = null ) {
    super( Api.categories(), resolve, reject );
  }
}
