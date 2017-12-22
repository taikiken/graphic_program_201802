/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/13 - 18:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// data
import { Safety } from '../../../data/Safety';

// app
import { Empty } from '../../../app/const/Empty';
import { Env } from '../../../app/Env';

// dae
import { ArticleDae } from '../../../dae/ArticleDae';

// component
import ComponentArticleThumbnail from '../../../component/articles/ComponentArticleThumbnail';
import ComponentCategoryLabels from '../../../component/categories/ComponentCategoryLabels';

// ui
import { Touching } from '../../../ui/Touching';

// event
import { EventDispatcher } from '../../../event/EventDispatcher';

// component
import RankingCarouselManager from './ranking-carousel/RankingCarouselManager';
import SPComponentSingleRankingAd from './ad/SPComponentSingleRankingAd';

// ga
import { Ga } from '../../../ga/Ga';

// React
const React = self.React;

// ---------------------------------------------------
/**
 * swipe 処理を行います
 * - {@link Touching}
 * @since 2017-09-13
 */
export class Swipe extends EventDispatcher {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * SWIPE_LEFT
   * @returns {string} swipeLeft
   */
  static get SWIPE_LEFT() {
    return 'swipeLeft';
  }
  /**
   * SWIPE_RIGHT
   * @returns {string} swipeRight
   */
  static get SWIPE_RIGHT() {
    return 'swipeRight';
  }
  /**
   * DRAGGING
   * @returns {string} dragging
   */
  static get DRAGGING() {
    return 'dragging';
  }
  /**
   * CANCEL
   * @returns {string} swipeCancel
   */
  static get CANCEL() {
    return 'swipeCancel';
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * swipe 処理を始めます
   * @param {Element} element target element
   * @param {number} limit 移動限界 px
   */
  constructor(element, limit = 140) {
    super();
    // ---
    /**
     * touch event 処理インスタンス
     * @type {Touching}
     */
    this.touching = new Touching(element, false, 1);
    /**
     * bind onStart - Touching.START event handler
     * @type {function}
     */
    this.onStart = this.onStart.bind(this);
    /**
     * bind onMove - Touching.MOVE event handler
     * @type {function}
     */
    this.onMove = this.onMove.bind(this);
    /**
     * bind onEnd - Touching.END event handler
     * @type {function}
     */
    this.onEnd = this.onEnd.bind(this);
    /**
     * bind onCancel - Touching.CANCEL event handler
     * @type {function}
     */
    this.onCancel = this.onCancel.bind(this);
    /**
     * drag 移動 px - 積算
     * @type {number}
     */
    this.dragging = 0;
    /**
     * 移動限界 px
     * @type {number}
     */
    this.limit = limit;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 処理開始します
   * - Touching.START watch
   */
  start() {
    const touching = this.touching;
    touching.on(Touching.START, this.onStart);
    touching.init();
  }
  /**
   * {@link Touching} event 監視します
   * - MOVE
   * - END
   * - CANCEL
   */
  activate() {
    const touching = this.touching;
    touching.on(Touching.MOVE, this.onMove);
    touching.on(Touching.END, this.onEnd);
    touching.on(Touching.CANCEL, this.onCancel);
  }
  /**
   * {@link Touching} event 監視「解除」します
   * - MOVE
   * - END
   * - CANCEL
   */
  dispose() {
    const touching = this.touching;
    touching.off(Touching.MOVE, this.onMove);
    touching.off(Touching.END, this.onEnd);
    touching.off(Touching.CANCEL, this.onCancel);
  }
  /**
   * リセット - drag 積算 0 にします
   */
  reset() {
    this.dragging = 0;
  }
  /**
   * drag 通知します - Swipe.DRAGGIN
   * @param {number} x 移動 px 積算
   */
  drag(x) {
    this.dispatch({ type: Swipe.DRAGGING, x });
  }
  /**
   * Touching.END 後の swipe 判定します
   */
  move() {
    const x = this.dragging;
    let type = Swipe.SWIPE_LEFT;
    if (x > 0) {
      // prev
      type = Swipe.SWIPE_RIGHT;
    }
    // console.log('Swipe.move', type, x);
    this.dispatch({ type, x });
  }
  /**
   * Touching.START event handler
   * - reset
   * - dispose
   * - activate
   */
  onStart() {
    this.reset();
    this.dispose();
    this.activate();
  }
  /**
   * Touching.MOVE event handler
   * - `events.between.x` を `dragging` へ加算します
   * - drag 通知します
   * @param {{between: {x: number}}} events Touching.MOVE event
   */
  onMove(events) {
    let dragging = this.dragging;
    dragging += events.between.x;
    if (Math.abs(dragging) > this.limit) {
      this.onEnd();
      return;
    }
    this.dragging = dragging;
    this.drag(this.dragging);
  }
  /**
   * Touching.END event handelr
   * - 閾値チェックし `onCancel` or `move` を実行します
   */
  onEnd() {
    this.dispose();
    const absX = Math.abs(this.dragging);
    // 閾値チェック
    if (absX < 10) {
      // 元に戻す
      this.onCancel();
    } else {
      // swipe
      this.move();
    }
  }
  /**
   * Touching.CANCEL event handler
   * - drag 処理中止を通知します
   */
  onCancel() {
    this.reset();
    this.dispose();
    this.dispatch({ type: Swipe.CANCEL });
  }
}
// ---------------------------------------------------
/**
 * 広告を含む carousel length をカウントします
 * @type {number}
 */
let containers = 0;

/**
 * carousel の 広告
 * @param {string} slug category slug - `big6tv` 出力しない
 * @param {number} index slide index - 1 or 3 出力
 * @param {number} length slide count, 1 は強制出力
 * @returns {?XML} div.widget-post-carousel-item.widget-post-carousel-item-ad
 * @constructor
 * @since 2017-09-13
 */
const CarouselAd = ({ slug, index, length }) => {
  // console.log('CarouselAd', slug, index, length);
  if (slug === 'big6tv') {
    return null;
  }
  if (index === 1 || index === 3 || (length === 1 || length === 2)) {
    // console.log('CarouselAd output *******');
    containers += 1;
    return (
      <SPComponentSingleRankingAd
        index={index}
      />
    );
  }
  return null;
};

/**
 * React.propTypes
 * @type {{slug: string, index: number, length: number}}
 */
CarouselAd.propTypes = {
  slug: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
};

// -------------------------------------------------------------------
// Ga 追加
/**
 * Ga tag 送信します
 * ```
 * onclick="UT.Ga.click('under_article_ranking', '[読んでいる記事URL]', 'click', '[リンク先記事URL]', true);"
 * ```
 * @param {string} href リンク先記事URL
 * @param {Event} [event=null] click event
 * @since 2017-09-25
 */
const ga = (href, event = null) => {
  if (Env.mode !== Env.PRODUCTION) {
    event.preventDefault();
  }
  // event.preventDefault();
  Ga.click('SPComponentSinglesRanking.ga', 'under_article_ranking', location.href, 'click', href, true);
};
// -------------------------------------------------------------------

/**
 * recommend - carousel article
 * - {@link ComponentArticleThumbnail}
 * - {@link ComponentCategoryLabels}
 * Ga 追加 on 2017-09-25 - https://github.com/undotsushin/undotsushin/issues/2381#issuecomment-331775622
 * ```
 * 記事下ランキング記事
 * onclick="UT.Ga.click('under_article_ranking', '[読んでいる記事URL]', 'click', '[リンク先記事URL]', true);"
 * ```
 * @param {ArticleDae} single 記事データ
 * @param {number} index slide index {@link ComponentCategoryLabels} 引数に使用します
 * @returns {XML} div.widget-post-carousel-item
 * @constructor
 * @since 2017-09-13
 */
const CarouselItem = ({ single, index }) => {
  containers += 1;
  const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);
  return (
    <div className="widget-post-carousel-item">
      <a
        href={single.url}
        className="post"
        onClick={(event) => (ga(single.url, event))}
      >
        <ComponentArticleThumbnail
          mediaType={single.mediaType}
          thumbnail={thumbnail}
          title={single.title}
          recommend={false}
          small={true}
        />
        <div className="post-data">
          <h3 className="post-heading">{single.title}</h3>
          <ComponentCategoryLabels
            index={index}
            id={`single-popular-label-${single.id}`}
            categories={single.categories.all}
            anotherCategories={single.anotherCategories}
          />
          <p className="post-date">{single.displayDate}</p>
        </div>
      </a>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{single: ArticleDae, index: number}}
 */
CarouselItem.propTypes = {
  single: React.PropTypes.instanceOf(ArticleDae).isRequired,
  index: React.PropTypes.number.isRequired,
};

/**
 * SP: 記事詳細一覧「よく読まれている記事」carousel
 * - dead end
 * - swipe 移動
 * @since 2017-09-13
 */
class SPRankingCarousel extends React.Component {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.props
   * @returns {{articles: Array.<SingleDae>, slug: string, length: number, last: number}}
   * React.PropTypes を返します
   */
  static get propTypes() {
    return {
      articles: React.PropTypes.arrayOf(
        React.PropTypes.instanceOf(ArticleDae)
      ).isRequired,
      slug: React.PropTypes.string.isRequired,
      length: React.PropTypes.number.isRequired,
      last: React.PropTypes.number.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * SP: 記事詳細一覧「よく読まれている記事」carousel 準備します
   * @param {Object} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * - x: slide motion - transform value
     * - left: swipe value
     * - motion: left style - transition flag
     * @type {{x: number, left: number, motion: boolean}}
     */
    this.state = {
      x: 0,
      left: 0,
      motion: false,
    };
    /**
     * slide last No.
     * @type {number}
     */
    this.last = props.last;
    /**
     * slide count
     * @type {number}
     */
    this.length = props.length;
    /**
     * div.widget-post-carousel-list
     * @type {?Element}
     */
    this.slide = null;
    /**
     * div.widget-post-carousel-wrapper
     * @type {?Element}
     */
    this.wrapper = null;
    /**
     * current slide No.
     * @type {number}
     */
    this.index = 0;
    /**
     * slide width
     * @type {number}
     */
    this.width = 150;
    /**
     * bind onPrev - Swipe.SWIPE_RIGHT event handler
     * @type {function}
     */
    this.onPrev = this.onPrev.bind(this);
    /**
     * bind onNext - Swipe.SWIPE_LEFT event handler
     * @type {function}
     */
    this.onNext = this.onNext.bind(this);
    // this.onStart = this.onStart.bind(this);
    /**
     * bind onDragging - Swipe.DRAGGING event handler
     * @type {function}
     */
    this.onDragging = this.onDragging.bind(this);
    /**
     * bind onCancel - Swipe.CANCEL event handler
     * @type {function}
     */
    this.onCancel = this.onCancel.bind(this);
    // console.log('SPRankingCarousel', props);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * carousel 処理を開始します
   * - 初期値 (0) へ移動します
   * - carousel 関連イベントを watch します
   * - 広告を含めた実際数へ `length`, `last` update します
   * TODO: RankingCarouselManager 移行確認後に削除する
   */
  start() {
    this.jump(0);
    // ---
    const slide = this.slide;
    if (slide) {
      const swipe = new Swipe(slide);
      swipe.on(Swipe.DRAGGING, this.onDragging);
      swipe.on(Swipe.CANCEL, this.onCancel);
      swipe.on(Swipe.SWIPE_LEFT, this.onNext);
      swipe.on(Swipe.SWIPE_RIGHT, this.onPrev);
      swipe.start();
    }
    // ---
    this.length = containers;
    this.last = containers - 1;
    // console.log('SPRankingCarousel.start', this.state, containers);
  }
  // ---------------------------------------------------
  /**
   * Swipe.SWIPE_RIGHT event handler
   * - slide index 0: `onCancel` 実行
   * - `prev` 実行
   */
  onPrev() {
    // console.log('SPRankingCarousel.onPrev', this.index);
    if (this.index !== 0) {
      // 先頭は prev しない
      this.prev();
    } else {
      this.onCancel();
    }
  }
  /**
   * Swipe.SWIPE_LEFT event handler
   * - slide index `last`: `onCancel` 実行
   * - `next` 実行
   */
  onNext() {
    // console.log('SPRankingCarousel.onNext', this.index, this.last);
    if (this.index !== this.last) {
      // last は next しない
      this.next();
    } else {
      this.onCancel();
    }
  }
  // ---------------------------------------------------
  /**
   * Swipe.DRAGGING event handler - drag 処理をします
   * - state: left update します - motion: false
   * @param {{x: number}} events Swipe.DRAGGING event
   */
  onDragging(events) {
    const left = events.x;
    this.setState( { left, motion: false } );
  }
  /**
   * drag cancel - left: 0, motion: true します
   */
  onCancel() {
    this.setState( { left: 0, motion: true } );
  }
  // ---------------------------------------------------
  /**
   * 前のスライド処理
   * - index: 0 - `onCancel`
   * - `jump`
   */
  prev() {
    let index = this.index;
    index -= 1;
    // console.log('SPRankingCarousel.prev', index);
    if (index >= 0) {
      this.jump(index);
    } else {
      this.onCancel();
    }
  }
  /**
   * 次のスライド処理
   * - index: last - `onCancel`
   * - `jump`
   */
  next() {
    let index = this.index;
    index += 1;
    // console.log('SPRankingCarousel.next', index);
    if (index <= this.last) {
      this.jump(index);
    } else {
      this.onCancel();
    }
  }
  /**
   * スライド移動
   * - index update
   * - `translateX` - x value 計算
   * - setState: x, left: 0, motion: true
   * @param {number} index 移動先
   */
  jump(index) {
    this.index = index;
    const x = this.translateX(index);
    // console.log('SPRankingCarousel.jump', index, x);
    this.setState({ x, left: 0, motion: true });
  }
  // ---------------------------------------------------
  // carousel move
  /**
   * スライド移動 x value を計算します
   * @param {number} index 移動先スライド番号
   * @returns {number} x value
   */
  translateX(index) {
    return -this.width * index;
  }
  /**
   * transform style を作成します
   * @param {number} [duration=0.32] transition duration second
   * @returns {{transform: string, transition: string}} transform style
   */
  transform(duration = 0.32) {
    const x = `translateX(${this.state.x}px)`;
    return {
      transform: x,
      // WebkitTransform: x,
      transition: `transform ${duration}s ease-out`,
      // WebkitTransition: `-webkit-transform ${duration}s ease-out`,
    };
  }
  // ---------------------------------------------------
  // swipe - before drag
  /**
   * drag style を作成します
   * @param {number} left 移動量 px
   * @param {number} [duration=0.31] transition duration second
   * @returns {{left: string}} drag style
   */
  dragging(left, duration = 0.31) {
    const style = {
      left: `${left}px`,
    };
    if (this.state.motion) {
      style.transition = `left ${duration}s linear`;
    }
    return style;
  }
  // ---------------------------------------------------
  /**
   * mount 後 length 1 を超えていたら `start` 実行します
   */
  componentDidMount() {
    if (this.props.length > 1) {
      // carousel 1 を超えていたら実装を開始する
      // this.start();
      // -------------------------------
      // React.state 使用しない
      const slide = this.slide;
      const swipe = new Swipe(slide);
      RankingCarouselManager.setup(this.wrapper, slide, swipe, containers);
      swipe.start();
    }
  }
  /**
   * 出力します
   * - {@link CarouselItem}
   * - {@link CarouselAd}
   * @returns {XML} div.widget-post-carousel-wrapper
   */
  render() {
    containers = 0;
    const { articles, slug, length } = this.props;
    // const { articles } = this.props;
    // console.log('SPRankingCarousel.render', this.state);
    // return null;
    return (
      <div
        className="widget-post-carousel-wrapper"
        style={this.transform()}
        ref={element => (this.wrapper = element)}
      >
        <div
          className="widget-post-carousel-list"
          style={this.dragging(this.state.left)}
          ref={element => (this.slide = element)}
        >
          {
            articles.map((single, index) => {
              return (
                <span
                  key={`widget-post-carousel-item-root-${single.id}`}
                  className="widget-post-carousel-item-root"
                >
                  <CarouselItem
                    single={single}
                    index={index}
                  />
                  <CarouselAd
                    slug={slug}
                    index={index}
                    length={length}
                  />
                </span>
              );
            })
          }
        </div>
      </div>
    );
  }
}

/**
 * SP: 記事詳細一覧「よく読まれている記事」carousel container
 * - SPComponentSinglesRanking
 *   - {@link SPRankingCarousel}
 *     - {@link CarouselItem}
 *     - {@link CarouselAd}
 * 記事ページの最適化 #2381
 * @see https://github.com/undotsushin/undotsushin/issues/2381
 * @param {Array.<object>} list JSON result
 * @param {string} slug category slug
 * @param {string} label category label - title 使用
 * @returns {?XML} div.widget-post-carousel or null
 * @constructor
 * @since 2017-09-13
 */
const SPComponentSinglesRanking = ({ list, slug, label }) => {
  if (!Array.isArray(list) || !list.length) {
    return null;
  }
  const articles = list.map(article => (new ArticleDae(article)));
  // console.log('SPComponentSinglesRanking', list, slug, label, Array.isArray(list), list.length, articles);
  // ---
  return (
    <div className="widget-post-carousel">
      <div className="mod-headingA01">
        <h2>{label}のよく読まれている記事</h2>
      </div>
      <div className="widget-post-carousel-outer">
        <div className="widget-post-carousel-center">
          <SPRankingCarousel
            articles={articles}
            slug={slug}
            length={articles.length}
            last={articles.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{list: Array.<object>, slug: string, label: string}}
 */
SPComponentSinglesRanking.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  slug: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default SPComponentSinglesRanking;
