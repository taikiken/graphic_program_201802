/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08 - 19:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';

export class ViewHeaderMemberNotice extends View {
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    // this._action = new UsersSelf( this.done.bind( this ), this.fail.bind( this ) );
  }
}
