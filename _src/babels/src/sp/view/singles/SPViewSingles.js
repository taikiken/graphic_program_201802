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
// import { ViewSingles } from '../../../view/singles/ViewSingles';

// view
import { View } from '../../../view/View';

// sp/view
import { SPViewArchiveInfinite } from '../SPViewArchiveInfinite';


// action
import { Singles } from '../../../action/singles/Singles';
import { SinglesAuth } from '../../../action/singles/SinglesAuth';


// app
import { User } from '../../../app/User';
import { Message } from '../../../app/const/Message';

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
export class SPViewSingles extends SPViewArchiveInfinite {
  /**
   * SP: 記事詳細の次の記事ブロック表示を行います
   * @param {number} id 記事 ID
   * @param {Element} element component 挿入 Element
   * @param {Element} moreElement more button 挿入 Element
   * @param {SingleDae} single 記事詳細取得 JSON を SingleDae instance にしています
   * @param {Object} [option={}] callback を設定した Object
   */
  constructor(id, element, moreElement, single, option = {}) {
    super(element, moreElement, single, option);
    /**
     * `ReactDOM.render(<SPComponentSingles>)` を保持します
     * @type {?Object}
     */
    this.articleRendered = null;

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

    /**
     * Ajax response.request
     * @type {{offset: number, length: number}}
     */
    this.request = {
      offset: 0,
      length: 0
    };
    /**
     * React.dom(<ComponentSingles>) を保持します
     * @type {?Object}
     */
    this.articleRendered = null;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @protected
     */
    this._articles = [];
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * API 取得 JSON.response を ArticleDae instance にし保持する配列
   * @return {Array.<ArticleDae>} API 取得 JSON.response を ArticleDae instance にし保持する配列を返します
   */
  get articlesList():Array {
    return this._articles;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
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
      const request = result.request;
      if (!request.length) {
        request.length = this.action.length;
      }
      this.request = request;
      this.render(articles);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {
    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
    // @since 2016-09-28, error で button を非表示へ
    console.warn('SPViewSingles.fail', error);
    this.moreButton(false);
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
      // console.log('SPViewSingles.render', articlesList, this.element);

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
      // console.log('******************************');
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    }
  }
}

