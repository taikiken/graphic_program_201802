/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/26 - 19:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { ViewArchiveMasonryInfinite } from '../ViewArchiveMasonryInfinite';
import { View } from '../View';


// app
import { User } from '../../app/User';
import { Message } from '../../app/const/Message';

// action
import { Singles } from '../../action/singles/Singles';
import { SinglesAuth } from '../../action/singles/SinglesAuth';

// dae
import { SingleDae } from '../../dae/SingleDae';

// component
import { ComponentSingles } from '../../component/singles/ComponentSingles';

// React
const ReactDOM = self.ReactDOM;

/**
 * 記事詳細・次の記事一覧を出力します
 * <pre>
 *   3件続きを読むの記事ブロック
 *   ↓
 *   関連記事一覧を表示
 *   ↓
 *   3件続きを読むの記事ブロック
 *   ↓
 *   人気記事一覧1を表示
 *   ↓
 *   3件続きを読むの記事ブロック
 *   ↓
 *   人気記事一覧2を表示
 *   ↓
 *   3件続きを読むの記事ブロック
 *   ↓
 *   人気記事一覧3を表示
 *   ↓
 *   ...
 *
 *   人気記事は、表示のたびに次のN件、次のN件、次のN件... と、違う内容を出力したいと考えています。
 *
 *   カテゴリー縛りなしですべてのカテゴリーの人気記事を表示する
 *   表示は6件
 *
 *   ※ オススメ記事は、展開されてる記事に紐付いて1回だけ表示する形（CRAZYカテゴリのサイドバーに実装したやつ。なければ詰める）
 *   APIは、記事詳細側の「"recommend_articles"」をつかって表示する
 * </pre>
 *
 * - オススメ記事は「記事詳細」JSON取得後の `SingleDae.recommendArticles` を使用し表示します
 * - 人気記事は 3件ごとに `Component` を挿入しそこで Ajax request を行い記事挿入します
 * @since 2016-09-26
 */
export class ViewSingles extends ViewArchiveMasonryInfinite {
  /**
   * 記事詳細の次の記事ブロック表示を行います
   * @param {number} id 記事 ID
   * @param {Element} element component 挿入 Element
   * @param {Element} moreElement more button 挿入 Element
   * @param {SingleDae} single 記事詳細取得 JSON を SingleDae instance にしています
   * @param {Object} [option={}] callback を設定した Object
   */
  constructor(id, element, moreElement, single, option = {}) {
    // element, moreElement, ActionClass, option, isotope
    super(element, moreElement, null, option, false);

    const boundDone = this.done.bind(this);
    const boundFail = this.fail.bind(this);

    /**
     * Ajax request action instance<br>
     * @type {SinglesAuth|Singles}
     * @override
     */
    this.action = User.sign ?
      new SinglesAuth(id, boundDone, boundFail) :
      new Singles(id, boundDone, boundFail);

    /**
     * 記事詳細取得 JSON を SingleDae instance
     * @type {SingleDae}
     */
    this.single = single;

    /**
     * 記事 ID
     * @type {number}
     */
    this.id = id;
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result):void {
    const articles = result.articles;
    if (!Array.isArray(articles) || typeof articles === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[ARCHIVE:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
    } else if (articles.length === 0) {
      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      const error = new Error(Message.empty('[ARCHIVE:EMPTY]'));
      this.executeSafely(View.EMPTY_ERROR, error);
    } else {
      // data 取得成功
      this.request = result.request;
      this.render(articles);
    }
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
    if (this.articleRendered === null ) {
      this.articleRendered = ReactDOM.render(
        <ComponentSingles
          list={articlesList}
          home={false}
          offset={this.request.offset}
          length={this.request.length}
          action={this.action}
          callback={this.boundSafely}
          boundMore={this.boundMore}
          single={this.single}
        />,
        this.element
      );
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    }
  }
  /**
   * 外部クラスから呼び出されます、既存のリストを使い再描画を行います
   * */
  update() {
    if (this.articleRendered !== null ) {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(this.articles, this.request.offset, this.request.length);
    }
  }
}
