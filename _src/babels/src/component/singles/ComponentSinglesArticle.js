/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 17:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../app/const/Message';

// node
import { BookmarkNode } from '../../node/bookmark/BookmarkNode';
// import { MediaNode } from '../../node/single/MediaNode';

// component/categories
import { ComponentCategoryLabelsLink } from '../categories/ComponentCategoryLabelsLink';

// component/singles
import { ComponentSinglesArticleMedia } from './ComponentSinglesArticleMedia';

// ui
import { Hit } from '../../ui/Hit';

// util
import { PageTitle } from '../../util/PageTitle';

// view
// import ViewSingle from '../../view/ViewSingle';

// Ga
import { Ga } from '../../ga/Ga';
// import { GaData } from '../../ga/GaData';

// --------------------
// @since 2016-10-17
// // singles
// import { SinglesHistory } from '../../singles/SinglesHistory';

// singles/head
import { Page } from '../../singles/head/Page';
// --------------------

// React
const React = self.React;

/**
 * PC: 記事詳細「次の記事」一覧を出力します
 *
 * <pre>
 *   <ComponentSinglesArticle/>
 *      <MediaNode/>
 *      <ComponentSinglesArticleSwitch/>
 *        <ComponentSinglesArticleExcerpt/>
 *          or
 *        <ComponentSingleContent/>
 * </pre>
 * @since 2016-09-30
 */
export class ComponentSinglesArticle extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   *
   * - @type {SingleDae} single - 記事データ
   * - @type {boolean} sign - ログイン済みユーザーフラッグ, true: ログイン済み
   * - @type {number} index - 次の記事一覧・記事表示順序
   * @return {{single: SingleDae, sign: boolean, index: number}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSinglesArticle.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{single: SingleDae, sign: boolean}}
     * */
    this.state = {
      single: props.single,
      sign: props.sign
    };

    /**
     * Hit instance, コンテナがブラウザウインドウ内に表示されているかを調べます<br>
     * ウインドウ内で top が +- 50px 以内だと Ga tag 送信します
     * @type {?Hit}
     */
    this.hit = null;
    /**
     * bind 済み onHit
     * @type {Function}
     */
    this.boundHit = this.onHit.bind(this);
    /**
     * Ga tag 送信済みフラッグ
     * @type {boolean}
     */
    this.sendGa = false;
    //
    // /**
    //  * SPA のための管理クラス
    //  * @type {SinglesHistory}
    //  * @since 2016-10-27
    //  */
    // this.manager = SinglesHistory.factory();
    /**
     * ページ情報書換えデータを `SingleDae` から生成します
     * {@link SingleDae}
     * {@link Page}
     * @type {Page}
     * @since 2016-10-27
     */
    this.page = new Page(props.single);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます, scroll 位置での Ga tag 送信準備を始めます
   * */
  componentDidMount() {
    // Hit instance を作成し監視を開始します
    if (this.hit === null && !!this.refs.singlesArticle) {
      const hit = new Hit(this.refs.singlesArticle);
      this.hit = hit;
      hit.on(Hit.COLLISION, this.boundHit);
      hit.start();
    }
  }
  /**
   * state.single 情報を更新し再描画します
   * @param {SingleDae} single state.single
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * state.sign 情報を更新し再描画します
   * @param {boolean} sign state.sign
   */
  updateSign(sign) {
    this.setState({ sign });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * - 不要かも
   */
  reload() {
    this.updateSingle(this.state.single);
  }
  // --------------------------------------------------
  // hit
  /**
   * Hit.COLLISION event handler<br>
   * ウインドウ内にコンテナが表示された時に通知されます<br>
   * コンテナ top が +- 50px 以内だと Ga tag 送信します
   * @param {{
   *  type: string,
   *  originalEvent: events,
   *  y: number,
   *  height: number,
   *  moving: number,
   *  changed: boolean,
   *  rect: Object}} events Hit events
   */
  onHit(events) {
    if (this.sendGa) {
      return;
    }

    const rect = events.rect;
    const top = rect.top;

    if (Math.abs(top) <= 50) {
      this.sendGa = true;
      // ViewSingle.ga(this.state.single);
      // @since 2016-10-05
      const single = this.state.single;
      Ga.single(single, `ComponentSinglesArticle.onHit single: ${single.id}`);
      // ---------------------
      // https://github.com/undotsushin/undotsushin/issues/1151
      // @since  2016-11-15 title added
      const page = new PageTitle(single.title, single.categories.label);
      Ga.addPage(single.id, `ComponentSinglesArticle.onHit addPage: ${single.id}`, page.title());
      // ---------------------
      this.dispose();
    }
  }
  /**
   * Hit.COLLISION event handler を unbind します
   */
  dispose() {
    const hit = this.hit;
    if (hit !== null) {
      hit.off(Hit.COLLISION, this.boundHit);
    }
  }
  /**
   * 記事詳細・次の記事一覧 > 記事を出力します
   * @return {?XML} div.loaded-post or null を返します
   * */
  render() {
    const single = this.state.single;

    if (!single) {
      return null;
    }

    return (
      <div className="loaded-post" ref="singlesArticle">
        <div className="post-detail">
          {/* header */}
          <div className="single-header-root">
            <div className={`post-heading post-heading-${single.id}`}>
              <h1>{single.title}</h1>
            </div>

            <ComponentCategoryLabelsLink
              index={this.props.index}
              id={`single-label-${single.id}`}
              categories={single.categories.all}
              className="category-heading"
              anotherCategories={single.anotherCategories}
            />

            <div className="post-data">
              <div className="f-left">
                <p className="post-author">{single.user.userName}</p>
                <p className="post-date">{single.displayDate}</p>
              </div>
              {/* div.f-right (bookmark: on / off) */}
              <BookmarkNode
                sign={this.state.sign}
                isBookmarked={single.isBookmarked}
                articleId={String(single.id)}
              />
            </div>
          </div>
          {/* media */}
          {/*
          <MediaNode
            articleId={String(single.id)}
            mediaType={single.mediaType}
            media={single.media}
            isShowImage={single.isShowImage}
          />
           */}
          <ComponentSinglesArticleMedia
            single={single}
          />
          {/* 本文 */}
          <div className="post-content">
            <p>{single.description}</p>
          </div>
          {/* link */}
          <div className="btn-readmore">
            <a href={single.url} className="btn-readmore-link">
              <span className="btn-readmore-label">{Message.READ_MORE}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
