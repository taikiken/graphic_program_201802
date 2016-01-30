/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 21:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

'use strict';

import {PopularDae} from './PopularDae';
// import {CommentsPopularDae} from '../CommentsPopularDae';
import {ReplyDae} from './ReplyDae';
import {Safety} from '../../data/Safety';

/**
 * コメント一覧表示配列の各コメント
 */
export class CommentsDae {
  /**
   * コメント一覧表示の個別コメント, reply 含む
   * @param {Array} [comments=[]] responce.comments
   */
  constructor( comments:Array = [] ) {
    // comment.id を key にデータを保存します
    let bank = {};
    // comment.id を 順に保存します
    let list = [];

    comments = Safety.array( comments );
    console.log( 'CommentsDae comments ', comments );

    for ( var comment of comments ) {
      // reply の前まではこれで処理できているはず...
      let dae = new PopularDae( comment );

      // key / value にデータを保存します
      bank[ dae.id ] = {
        comment: dae,
        reply: new ReplyDae( comment.reply )
      };

      list.push(dae.id);
    }

    this._bank = bank;
    this._list = list;

    console.log( 'CommentsDae', this._bank, this._list );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * comment を comment id をキー としたObjectに保存します
   * <dl>
   *   <dt>comment</dt>
   *   <dd>PopularDae</dd>
   *   <dt>reply</dt>
   *   <dd>ReplyDae</dd>
   * </dl>
   *
   * @return {Object|*}  comment id をキー としたObjectを返します
   */
  get bank():Object {
    return this._bank;
  }
  /**
   * comment id を順に保存しています
   * @return {Array|*} comment id を保持した配列を返します
   */
  get list():Array {
    return this._list;
  }
}
