/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/13 - 21:18
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../View';

// app
import {Empty} from '../../app/const/Empty';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// data
import {Safety} from '../../data/Safety';

// Sagen
const Sagen = self.Sagen;

// Gasane
const Polling = self.Gasane.Polling;

// React
const React = self.React;
const ReactDOM = self.ReactDOM;

/**
 * .pickup-NN Element を作成します
 * @param {ArticleDae} dae Element 作成元の JSON, ArticleDae instance
 * @param {number} index react key に使用するユニークな index 数値
 * @return {XML} カルーセル1記事コンテナを返します
 */
const makeArticle = (dae, index) => {
  const large = Safety.image(dae.media.images.large, Empty.IMG_LARGE);

  // HeadlineDom instance を使い render
  // iteration key は index を使う
  // コンテナを 前後に clone するため article.id が使えない
  return (
    <PickupDom
      key={`pickup-${index}`}
      index={index}
      id={String(dae.id)}
      slug={dae.categories.all[0].slug}
      categories={dae.categories.all}
      url={dae.url}
      date={dae.displayDate}
      title={dae.title}
      large={large}
      commentsCount={dae.commentsCount}
      mediaType={dae.mediaType}
    />
  );
};

export class ViewCarousel extends React.Component {
  /**
   * default property を保存します
   * @param {Object} props
   * @param {Polling} polling animation するための Polling instance
   * @param {number} [index=0] スライド開始位置
   */
  constructor(props, polling, index = 0) {
    super(props);

    /**
     * state option
     * @override
     * @type {{index: number}}
     */
    this.state = {
      index
    };
    /**
     * animation するための Polling instance
     * @type {Polling}
     */
    this.polling = polling;
    /**
     * 最終から先頭, 先頭から最終へ戻るときに循環アニメーションのために<br>
     * アニメーション無しで移動させた後<br>
     * リフレッシュのために待機させる 1fps<br>
     * timeout id
     * @type {number}
     */
    this.timer = 0;

    this.boundUpdate = this.updateNext.bind(this);
    this.boundNext = this.onNext.bind(this);
    this.boundPrev = this.onPrev.bind(this);
    this.boundPager = this.onPagerClick.bind(this);
    this.last = props.list.length - 1;
    this.position = index;
  }
  render() {
    const list = this.props.list;
    let count = 0;
    // JSX
    return (
      <div className="hero-sec">
        <div className={'hero-slider pickup-container slide-' + this.state.index}>
          {/* slider */}
          <div className="hero-slider-inner">
            <ul className="pickup-slider">
              {
                // 1.first
                list.map((article) => makeArticle(new ArticleDae(article), count++))
              }
              {
                // 2.second clone
                list.map((article) => makeArticle(new ArticleDae(article), count++))
              }
              {
                // 3.third clone
                list.map((article) => makeArticle(new ArticleDae(article), count++))
              }
            </ul>
          </div>
          <div className="hero-slider-control">
            {/* prev / next */}
            <div className="direction">
              <a id="prev" className="direction-prev" href="#prev" onClick={this.boundPrev}>Prev</a>
              <a id="next" className="direction-next" href="#next" onClick={this.boundNext}>Next</a>
            </div>
            {/* pagers */}
            <div className="pager">
              <PagersDom
                list={list}
                offset={list.length}
                onPager={this.boundPager}
              />
            </div>
            {/* hero-slider-control */}
          </div>
          {/* .hero-slider */}
        </div>
        {/* #hero-sec */}
      </div>
    );
  }
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);

    this.play();
  }
  play() {
    this.pause();
    const polling = this.polling;
    polling.on(Polling.PAST, this.boundUpdate);
    polling.start();
  }
  pause() {
    const polling = this.polling;
    polling.off(Polling.PAST, this.boundUpdate);
    polling.stop();
  }
  update() {}
  onNext(event) {
    event.preventDefault();
  }
  onPrev(event) {
    event.preventDefault();
  }
  jump(index) {
    // polling 一時停止
    this.pause();

    const last = this.last;
    const position = this.position;
    // --------------
    // 循環アニメーションのために
    if (index === 0) {
      // 先頭に戻る
      if (position === last) {
        // 現在がラストだったらアニメーションなしで移動させる
        this.setState({ index: 999 });
        this.delay(index);
      } else {
        // 通常移動
        this.setup(index);
      }
    } else if (index === last) {
      // 最終に戻る
      if (position === 0) {
        // 現在が先頭だったらアニメーションなしで移動させる
        this.setState({ index: 1999 });
        this.delay(index);
      } else {
        // 通常移動
        this.setup(index);
      }
    } else {
      // 通常移動
      this.setup(index);
    }
  }
  delay(index) {
    clearTimeout(this.timer);

    // リフレッシュのために待機させる 1fps
    this.timer = setTimeout(() => this.setup(index), 25);
  }
  setup(index) {
    this.position = index;
    this.setState({ index });
    // polling 再開
    this.play();
  }
  onPagerClick(index) {
    this.jump(parseInt(index, 10));
  }
}

// property
ViewCarousel.propTypes = {
  // articles 配列を元にDomを作成する
  list: React.PropTypes.array.isRequired,
  callback: React.PropTypes.func.isRequired
};

