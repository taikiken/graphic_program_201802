/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */


import View from '../View';

// app
import {User} from '../../app/User';
import {Empty} from '../../app/const/Empty';
import {CommentsType} from '../../app/const/CommentsType';

import {Safety} from '../../data/Safety';

// import {CommentFormNode} from '../../node/comment/CommentFormNode';
import ComponentCommentForm from '../../component/single-comment/form/ComponentCommentForm';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * 記事へのコメント
 */
export default class ViewCommentForm extends View {
  /**
   * 記事へのコメントフォーム
   * @param {Element} element root element
   * @param {number} articleId 記事Id
   * @param {string} [icon=''] ユーザー画像パス
   */
  constructor(element, articleId, icon = '') {
    super(element);
    // ----
    /**
     * 記事ID
     * @type {string}
     * @private
     */
    this._articleId = String(articleId);
    /**
     * ユーザー画像パス
     * @type {string}
     * @private
     */
    this._icon = Safety.image(icon, Empty.USER_EMPTY);
  }
  /**
   * render start
   */
  start() {
    this.render(this._articleId);
  }
  /**
   * フォーム生成を開始します
   * @param {string} id 記事Id
   */
  render(id) {
    // ReactDOM.render(
    //   <CommentFormNode
    //     uniqueId={'comment-to-' + id}
    //     toggle="open"
    //     icon={this._icon}
    //     articleId={id}
    //     sign={User.sign}
    //     independent={true}
    //     parent={false}
    //     commentType={CommentsType.INDEPENDENT}
    //     url=""
    //   />,
    //   this.element
    // );
    // console.log('ViewCommentForm.render', id);
    ReactDOM.render(
      <ComponentCommentForm
        uniqueId={`comment-to-${id}`}
        toggle="open"
        icon={this._icon}
        articleId={id}
        sign={User.sign}
        independent={true}
        parent={false}
        commentType={CommentsType.INDEPENDENT}
        url=""
      />,
      this.element,
    );
  }
}
