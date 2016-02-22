/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 14:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ActionBehavior} from '../ActionBehavior';
import {Api} from '../../net/Api';

export class Signup extends ActionBehavior {
  constructor( formData:FormData, resolve:Function = null, reject:Function = null ) {
    super( Api.join(), formData, resolve, reject );
  }
}
