/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 18:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {EventDispatcher} from '../EventDispatcher';
import {CommentStatus} from '../CommentStatus';

let _instance = null;

/**
 * コメントの good
 */
export class Good extends EventDispatcher {
  /**
   * <h3>Singleton</h3>
   * コメントの good
   * @return {*}
   */
  constructor() {

    if ( _instance === null ) {
      super();
      _instance = this;
    }

    return _instance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * good する
   * @param {string} commentId コメントId
   */
  add( commentId:string ):void {
    this.fire( CommentStatus.GOOD_ADD, commentId );
  }
  /**
   * good を外す
   * @param {string} commentId コメントId
   */
  remove( commentId:string ):void {
    this.fire( CommentStatus.GOOD_DELETE, commentId );
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {Good} Good instance を返します
   */
  static factory():Good {

    if ( _instance === null ) {

      _instance = new Good();

    }

    return _instance;
  }
}
