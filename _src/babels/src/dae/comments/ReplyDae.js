/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 23:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {CommentsPopularDae} from '../CommentsPopularDae';

export class ReplyDae {
  constructor( reply:Object = {} ) {
    this._total = parseInt( reply.count, 10 );
    this._comments = new CommentsPopularDae( reply.comments );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * reply 総数
   * @return {Number|*} reply 総数を返します
   */
  get total():Number {
    return this._total;
  }
  /**
   * reply.comments
   * @return {CommentsPopularDae|*} reply.comments を CommentsPopularDae instance として返します
   */
  get comments():CommentsPopularDae {
    return this._comments;
  }
}
