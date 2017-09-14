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
import { Safety } from '../../../data/Safety';
import { Empty } from '../../../app/const/Empty';

import { ArticleDae } from '../../../dae/ArticleDae';

// component
import { ComponentArticleThumbnail } from '../../../component/articles/ComponentArticleThumbnail';
import { ComponentCategoryLabels } from '../../../component/categories/ComponentCategoryLabels';
import { Touching } from '../../../ui/Touching';
import { EventDispatcher } from '../../../event/EventDispatcher';

// React
const React = self.React;


// ---------------------------------------------------
class Swipe extends EventDispatcher {
  static get SWIPE_LEFT() {
    return 'swipeLeft';
  }
  static get SWIPE_RIGHT() {
    return 'swipeRight';
  }
  static get DRAGGING() {
    return 'dragging';
  }
  static get CANCEL() {
    return 'swipeCancel';
  }
  constructor(element) {
    super();
    // ---
    this.touching = new Touching(element, false, 1);
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.dragging = 0;
  }
  start() {
    const touching = this.touching;
    touching.on(Touching.START, this.onStart);
    touching.init();
  }
  activate() {
    const touching = this.touching;
    touching.on(Touching.MOVE, this.onMove);
    touching.on(Touching.END, this.onEnd);
    touching.on(Touching.CANCEL, this.onCancel);
  }
  dispose() {
    const touching = this.touching;
    touching.off(Touching.MOVE, this.onMove);
    touching.off(Touching.END, this.onEnd);
    touching.off(Touching.CANCEL, this.onCancel);
  }
  reset() {
    this.dragging = 0;
  }
  drag(x) {
    this.dispatch({ type: Swipe.DRAGGING, x });
  }
  onStart() {
    this.reset();
    this.dispose();
    this.activate();
  }
  onMove(events) {
    this.dragging += events.between.x;
    this.drag(this.dragging);
  }
  onEnd() {
    this.dispose();
  }
  onCancel() {
    this.reset();
    this.dispose();
    this.dispatch({ type: Swipe.CANCEL });
  }
}
// ---------------------------------------------------

const CarouselAd = ({ slug, index, length }) => {
  if (slug === 'big6tv') {
    return null;
  }
  if ((index === 2 && index === 5) || length === 1) {
    return (
      <div className="widget-post-carousel-item widget-post-carousel-item-ad">
        ここに広告
      </div>
    );
  }
  return null;
};

const CarouselItem = ({ single, index }) => {
  const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);
  return (
    <div className="widget-post-carousel-item">
      <a href={single.url} className="post">
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
          />
          <p className="post-date">{single.displayDate}</p>
        </div>
      </a>
    </div>
  );
};

/**
 * SP: 記事詳細一覧「よく読まれている記事」carousel
 * - dead end
 * - swipe 移動
 */
class SPRankingCarousel extends React.Component {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
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
  constructor(props) {
    super(props);
    // ---
    this.state = {
      x: 0,
      left: 0,
      motion: false,
    };
    this.slide = null;
    this.index = 0;
    this.width = 150;
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onDragging = this.onDragging.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // ---------------------------------------------------
  start() {
    // TODO: swipe 設定
    console.log('SPRankingCarousel.start', this.state);
    this.jump(0);
    // ---
    const slide = this.slide;
    if (slide) {

    }
  }
  // ---------------------------------------------------
  onPrev() {
    if (this.index === 0) {
      // 先頭は prev しない
      this.prev();
    }
  }
  onNext() {
    if (this.index !== this.props.last) {
      // last は next しない
      this.next();
    }
  }
  // ---------------------------------------------------
  onStart() {

  }
  onDragging(events) {

  }
  onCancel() {

  }
  // ---------------------------------------------------
  prev() {
    let index = this.index;
    index -= 1;
    if (index >= 0) {
      this.jump(index);
    }
  }
  next() {
    let index = this.index;
    index += 1;
    if (index <= this.props.last) {
      this.jump(index);
    }
  }
  jump(index) {
    this.index = index;
    const x = this.translateX(index);
    this.setState({ x });
  }
  // ---------------------------------------------------
  // carousel move
  translateX(index) {
    return -this.width * index;
  }
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
  // swipe
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
  componentDidMount() {
    if (this.props.length > 1) {
      // carousel 1 を超えていたら実装を開始する
      this.start();
    }
  }
  render() {
    const { articles, slug, length } = this.props;
    console.log('SPRankingCarousel.render', articles, slug);
    return (
      <div
        className="widget-post-carousel-wrapper"
        style={this.transform()}
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

SPComponentSinglesRanking.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  slug: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default SPComponentSinglesRanking;
