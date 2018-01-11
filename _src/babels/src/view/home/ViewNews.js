/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 22:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../View';
import ViewArchiveMasonryInfinite from '../ViewArchiveMasonryInfinite';

// app
import {User} from '../../app/User';
// @since 2016-10-04
import { Message } from '../../app/const/Message';
import { Length } from '../../app/const/Length';

// action
import {NewsAuth} from '../../action/home/NewsAuth';
import {News} from '../../action/home/News';

/**
 * home news 一覧表示
 */
// export class ViewNews extends ViewArchiveMasonry {
export default class ViewNews extends ViewArchiveMasonryInfinite {
  /**
   * home news, token 付き・無し を切替
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [useMasonry=true] isotope を行うかの
   */
  constructor(element, moreElement, option = {}, useMasonry = true) {
    super(element, moreElement, null, option, useMasonry);
    /**
     * Action instance を設定します
     * @override
     * @type {NewsAuth|News}
     */
    this.action = User.sign ?
      new NewsAuth(this.done.bind(this), this.fail.bind(this), 0, 30) :
      new News(this.done.bind(this), this.fail.bind(this), 0, 30);

    // home flag on
    /**
     * home flag, おすすめ ラベル表示するかしないかに使用
     * @type {boolean}
     */
    this.home = true;
    /**
     * 初回無限スクロールにしないパターン, クリック後に開始します
     * <pre>
     * 対応は PC版ホームに限り
     * 初回ロード時はVIEW MORE表示
     * VIEW MOREクリックで今の無限スクロールの形（VIEW MORE押す必要なくなる）
     * </pre>
     *
     * @see https://github.com/undotsushin/undotsushin/issues/1141
     * @type {boolean}
     * @default true
     * @since 2016-10-04
     */
    this.afterClick = true;
    /**
     * JSON response, Result.request を保存します
     * @type {?Object}
     */
    this.request = null;
  }
  /**
   * Ajax response success<br>
   * 初回ロードが 30 件になるのでここで length を標準に戻します
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   * @since 2016-10-04
   */
  done(result) {
    const articles = result.articles;
    /**
     * 読み込み件数を標準 (Length.archive) に戻します {@link Length}
     * @type {Number}
     * @since 2016-10-04
     */
    this.action.length = Length.archive;
    // console.log( 'ViewArchiveMasonry done ', result );
    if (typeof articles === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[ARCHIVE:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);
    } else if (articles.length === 0) {
      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      const error = new Error(Message.empty('[ARCHIVE:EMPTY]'));
      this.executeSafely(View.EMPTY_ERROR, error);
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);
    } else {
      this.request = result.request;
      this.render(articles);
    }
  }
}
