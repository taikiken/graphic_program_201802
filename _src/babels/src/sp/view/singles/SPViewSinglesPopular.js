/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/29 - 15:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { SPViewArchive } from '../SPViewArchive';

// app
import { User } from '../../../app/User';

// dae
import { ArticleDae } from '../../../dae/ArticleDae';

// action
import { Category } from '../../../action/archive/Category';
import { CategoryAuth } from '../../../action/archive/CategoryAuth';

// sp/component
import { SPComponentSinglesWidgetPopularList } from '../../component/singles/SPComponentSinglesWidgetPopularList';

// React
const ReactDOM = self.ReactDOM;

/**
 * SP: 記事詳細「次の記事一覧」人気記事を出力するためのデータを取得し描画します
 * @since 2016-09-28
 */
export class SPViewSinglesPopular extends SPViewArchive {
  /**
   * 必要なデータを保持します
   * @param {Element} element 出力親コンテナ
   * @param {boolean} sign ログイン済みフラッグ
   * @param {number} [offset=0] 呼び出し開始位置
   * @param {number} [length=6] 取得件数
   */
  constructor(element, sign = User.sign, offset = 0, length = 6) {
    // console.log('SPViewSinglesPopular -------------------', offset, length);
    // element, moreElement: null, actionClass: undefined, option: {}
    super(element, null);

    const slug = 'all';
    const type = '';
    const resolve = this.done.bind(this);
    const reject = this.fail.bind(this);

    /**
     * `all` すべての記事の新着順
     * @type {string}
     * @default all
     */
    this.slug = slug;
    /**
     * request type
     * @type {string}
     * @default ``(empty)
     */
    this.type = type;
    /**
     * 成功 callback
     * @type {Function}
     */
    this.resolve = resolve;
    /**
     * 失敗 callback
     * @type {Function}
     */
    this.reject = reject;
    /**
     * 呼び出し開始位置
     * @type {number}
     * @default 0
     */
    this.offset = offset;
    /**
     * 取得件数
     * @type {number}
     * @default 6
     */
    this.length = length;
    /**
     * {{length: number, offset: number}} な Ajax リクエスト
     * @type {?Object}
     */
    this.request = null;

    /**
     * データ取得 Action calss instance
     * @type {CategoryAuth|Category}
     */
    this.action = sign ?
      new CategoryAuth(slug, type, resolve, reject, offset, length) :
      new Category(slug, type, resolve, reject, offset, length);

    /**
     * `ReactDOM.render(SPComponentSinglesWidgetPopularList)` を保持します
     * @type {?Object}
     */
    this.articleRendered = null;
    /**
     * JSON response.articles を ArticleDae instance へ変換し保持します
     * @type {Array<ArticleDae>}
     */
    this.articles = [];
  }

  /**
   * 成功後に `SPComponentSinglesWidgetPopularList` を render します
   * @param {Array} articles JSON response.articles
   */
  render(articles) {
    const list = articles.map((article) => new ArticleDae(article));
    this.articles = list;

    if (this.articleRendered === null) {
      this.articleRendered = ReactDOM.render(
        <SPComponentSinglesWidgetPopularList
          list={list}
          callback={this.executeSafely.bind(this)}
        />,
        this.element
      );
    } else {
      this.articleRendered.updateList(list, this.request.offset, this.request.length);
    }
  }
  /**
   * 表示更新を行います
   * @return {boolean} 更新実行時に true を返します
   */
  reload() {
    const component = this.articleRendered;
    if (component === null) {
      return false;
    }

    component.reload();
    return true;
  }
}
