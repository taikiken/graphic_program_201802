/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 22:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Dom} from '../dom/Dom';

let _symbol = Symbol();

// UT
let UT = self.UT;

export class CommentDelete {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `CommentDelete is static Class. not use new CommentDelete().` );

    }
  }
  /**
   * comment delete confirm modal 準備
   */
  static start():void {
    let element = Dom.modal();
    if ( element !== null ) {
      let commentDelete = new UT.view.modal.ViewDeleteModal( element );
      commentDelete.start();
    }
  }
}
