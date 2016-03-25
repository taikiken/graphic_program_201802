/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */


import {View} from '../View';

// app
import {User} from '../../app/User';
import {Empty} from '../../app/const/Empty';
import {CommentsType} from '../../app/const/CommentsType';

import {Safety} from '../../data/Safety';

import {CommentFormNode} from '../../node/comment/CommentFormNode';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 記事へのコメント
 */
export class ViewCommentForm extends View {
  /**
   * 記事へのコメントフォーム
   * @param {Element} element root element
   * @param {Number} articleId 記事Id
   * @param {string} [icon=''] ユーザー画像パス
   */
  constructor( element:Element, articleId:Number, icon:string = '' ) {

    super( element );

    this._articleId = String(articleId);

    /*
    if ( !icon ) {
      icon = Empty.USER_EMPTY;
    } else if ( !Safety.isImg( icon ) ) {
      // 画像ファイル名に拡張子がないのがあったので
      // 拡張子チェックを追加
      if ( !Safety.isGraph( icon ) ) {
        icon = Empty.USER_EMPTY;
      }
    }
    this._icon = icon;
     */
    this._icon = Safety.image( icon, Empty.USER_EMPTY );

  }
  /**
   * render start
   */
  start():void {
    this.render( this._articleId );
  }
  /**
   * フォーム生成を開始します
   * @param {string} id 記事Id
   */
  render( id:string ):void {
    ReactDOM.render(
      <CommentFormNode
        uniqueId={'comment-to-' + id}
        toggle="open"
        icon={this._icon}
        articleId={id}
        sign={User.sign}
        independent={true}
        parent={false}
        commentType={CommentsType.INDEPENDENT}
      />,
      this.element
    );
  }
}
