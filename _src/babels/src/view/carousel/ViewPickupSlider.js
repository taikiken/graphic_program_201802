/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 12:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// carousel
import { ViewCarouselArticle } from './ViewCarouselArticle';

// app
import { Empty } from '../../app/const/Empty';

// data
import { Safety } from '../../data/Safety';

// ui
import { Touching } from '../../ui/Touching';

// --------------------------------------------
// library
// // Sagen
// const Sagen = self.Sagen;

// React
const React = self.React;

// --------------------------------------------
// private
/**
 * .pickup-NN Element を作成します
 * @private
 * @static
 * @param {ArticleDae} dae Element 作成元の JSON, ArticleDae instance
 * @param {number} index react key に使用するユニークな index 数値
 * @param {boolean} clone length > 1 を超えている時のみ clone を作成するので、そのためのフラッグ
 * @param {boolean} home home（一面）か否かの真偽値
 * @return {XML} カルーセル1記事コンテナを返します
 */
const makeArticle = (dae, index, clone, home) => {
  const large = Safety.image(dae.media.images.large, Empty.IMG_LARGE);
  // console.log('makeArticle', dae, dae.date, typeof dae.date);
  // HeadlineDom instance を使い render
  // iteration key は index を使う
  // コンテナを 前後に clone するため article.id が使えない
  if (clone) {
    return (
      <ViewCarouselArticle
        key={`pickup-${index}`}
        index={index}
        id={String(dae.id)}
        slug={dae.categories.slug}
        categories={dae.categories.all}
        url={dae.url}
        date={dae.displayDate}
        title={dae.title}
        large={large}
        commentsCount={dae.commentsCount}
        mediaType={dae.mediaType}
        home={home}
      />
    );
  } else {
    return null;
  }
};

export class ViewPickupSlider extends React.Component {
  constructor(props) {
    console.log('ViewPickupSlider', props);
    super(props);
    /**
     * state option
     * @override
     * @type {{index: number}}
     */
    this.state = {
      style: {}
    };

    this.dragging = 0;

    this.boundStart = this.touchStart.bind(this);
    this.boundMove = this.touchMove.bind(this);
    this.boundEnd = this.touchEnd.bind(this);
    this.boundCancel = this.touchCancel.bind(this);
  }
  render() {
    console.log('ViewPickupSlider.render', this.state);
    const list = this.props.list;
    const needClone = list.length > 1;
    let count = 0;

    return (
      <ul className="pickup-slider" ref="pickupSlider" style={this.state.style}>
        {
          // 1.first
          list.map((article) => makeArticle(article, count++, true, this.props.home))
        }
        {
          // 2.second clone
          list.map((article) => makeArticle(article, count++, needClone, this.props.home))
        }
        {
          // 3.third clone
          list.map((article) => makeArticle(article, count++, needClone, this.props.home))
        }
      </ul>
    );
  }
  // --------------------------------------------
  // delegate
  componentDidMount() {
    // length が 1 以上なら
    if (this.props.list.length > 1) {
      // sp 端末のみスワイプ準備
      if (this.props.sp) {
        this.prepareSwipe();
      }
      //
      // // animation start
      // this.props.scope.play();
    }
  }
  // --------------------------------------------
  // swipe
  prepareSwipe() {
    const refsPickup = this.refs.pickupSlider;

    // this.elements = new Elements(refsPickup);

    // touchmove 中の `preventDefault` を Touching で行わない
    const touching = new Touching(refsPickup, false);

    touching.on(Touching.MOVE, this.boundMove);
    touching.on(Touching.END, this.boundEnd);
    touching.on(Touching.CANCEL, this.boundCancel);
    touching.init();
  }
  touchStart() {
    this.dragging = 0;
  }
  /**
   * Touching.MOVE event handler
   *
   * scrolling プロパティから scroll 処理をするかを決定します
   *
   * between.x から drag 処理を行うかを決定します
   * @param {TouchingEvents} events Touching.MOVE event object
   */
  touchMove(events) {
    if (events.scrolling) {
      return;
    }
    console.log('ViewCarousel.touchMove', events.scrolling, events.between.x);

    // touch event をキャンセルし drag 準備に入ります
    events.origin.preventDefault();
    this.props.scope.pause();
    this.dragging += events.between.x;
    this.drag(this.dragging);
  }
  /**
   * Touching.END event handler
   *
   * scrolling プロパティから scroll 処理をするかを決定します
   *
   * between.x から drag 処理を行うかを決定します
   * @param {TouchingEvents} events Touching.END event object
   */
  touchEnd(events) {
    console.log('ViewCarousel.touchEnd', events);
    if (events.scrolling) {
      return;
    }

    // touch event をキャンセルし drag 準備に入ります
    events.origin.preventDefault();
    this.props.scope.pause();

    const absX = Math.abs(events.between.x);
    // x 方向閾値 50 未満の時は元の位置に戻す
    if (absX < 50) {
      // 元に戻す
      this.reset();
    } else {
      // x の方向から next / prev 判定後にスライドを動かす
      this.move(events.between.x);
    }
  }
  touchCancel() {
    this.reset();
  }
  drag(x) {
    console.log('ViewCarousel.drag', x);

    // const style = this.elements.style;
    // style.restore();
    // style.set(`left: ${x}px;`);
    const style = { left: `${x}px` };
    this.setState({ style });
  }
  reset() {
    // this.elements.style.restore();
    this.setState({ style: {} });
    this.props.scope.play();
  }
  move(x) {
    console.log('move', x);
    if (x > 0) {
      this.props.scope.next();
    } else if (x < 0) {
      this.props.scope.prev();
    } else {
      this.reset();
    }
  }
}

/**
 * React の PropTypes をプロパティに設定します
 * @type {{list: Array<ArticleDae>}}
 */
ViewPickupSlider.propTypes = {
  // articles 配列を元にDomを作成する
  list: React.PropTypes.array.isRequired,
  sp: React.PropTypes.bool.isRequired,
  home: React.PropTypes.bool.isRequired,
  scope: React.PropTypes.object.isRequired
};
