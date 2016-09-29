/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/28 - 15:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// parent
import { ViewSingles } from '../../../view/singles/ViewSingles';

// app
import { User } from '../../../app/User';

// dae
import { SingleDae } from '../../../dae/SingleDae';

// sp/component/singles
import { SPComponentSingles } from '../../component/singles/SPComponentSingles';

// React
const ReactDOM = self.ReactDOM;

/**
 * 記事詳細・次の記事一覧を出力します
 *
 * - オススメ記事は「記事詳細」JSON取得後の `SingleDae.recommendArticles` を使用し表示します
 * - 人気記事は 3件ごとに `Component` を挿入しそこで Ajax request を行い記事挿入します
 * @since 2016-09-26
 */
export class SPViewSingles extends ViewSingles {
  /**
   * SP: 記事詳細の次の記事ブロック表示を行います
   * @param {number} id 記事 ID
   * @param {Element} element component 挿入 Element
   * @param {Element} moreElement more button 挿入 Element
   * @param {SingleDae} single 記事詳細取得 JSON を SingleDae instance にしています
   * @param {Object} [option={}] callback を設定した Object
   */
  constructor(id, element, moreElement, single, option = {}) {
    super(id, element, moreElement, single, option);
    /**
     * `ReactDOM.render(<SPComponentSingles>)` を保持します
     * @type {?Object}
     */
    this.articleRendered = null;
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles:Array):void {
    // 既存データ用のglobal配列
    const articlesList = this.articles;

    // 前回までの配列length
    // sequence な index のために必要
    const prevLast = this.articles.length;

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach((article, i) => {
      const dae = new SingleDae(article);
      dae.index = prevLast + i;
      articlesList.push(dae);
    } );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if (this.articleRendered === null) {
      const request = this.request;

      this.articleRendered = ReactDOM.render(
        <SPComponentSingles
          list={articlesList}
          home={false}
          offset={request.offset}
          length={request.length}
          action={this.action}
          callback={this.boundSafely}
          boundMore={this.boundMore}
          single={this.single}
          sign={User.sign}
        />,
        this.element
      );
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    }
  }
}

