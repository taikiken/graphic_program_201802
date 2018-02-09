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
import Env from '../../../app/Env';

// dae
import { ArticleDae } from '../../../dae/ArticleDae';

// component
import ComponentArticleThumbnail from '../../../component/articles/ComponentArticleThumbnail';
import ComponentCategoryLabels from '../../../component/categories/ComponentCategoryLabels';

// ui
// import Touching from '../../../ui/Touching';

// event
// import { EventDispatcher } from '../../../event/EventDispatcher';

// component
// import RankingCarouselManager from './ranking-carousel/RankingCarouselManager';
import SPComponentSingleRankingAd from './ad/SPComponentSingleRankingAd';

// ga
import { Ga } from '../../../ga/Ga';

// React
/**
 * [library] - React
 */
const React = self.React;

// ---------------------------------------------------
/**
 * 広告を含む carousel length をカウントします
 * @type {number}
 */
// let containers = 0;

/**
 * carousel の 広告
 * @param {string} slug category slug - `big6tv` 出力しない
 * @param {number} index slide index - 1 or 3 出力
 * @param {number} length slide count, 1 は強制出力
 * @returns {?XML} div.widget-post-carousel-item.widget-post-carousel-item-ad
 * @constructor
 * @since 2017-09-13
 */
const CarouselAd = ({ slug, index, ad }) => {
  // console.log('CarouselAd', slug, index, length);
  if (slug === 'big6tv') {
    return null;
  }
  /**
   * @since 2018-01-15
   * design変更に伴い
   * Ad広告を一番最後だけに表示に変更
   */
  // if (index === 1 || index === 3 || (length === 1 || length === 2)) {
  if (index === 4) {
    // console.log('CarouselAd output *******');
    // containers += 1;
    return (
      <SPComponentSingleRankingAd
        index={index}
        ad={ad}
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
  // containers += 1;
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

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------

  // ---------------------------------------------------
  /**
   * mount 後 length 1 を超えていたら `start` 実行します
   */
  componentDidMount() {

  }
  /**
   * 出力します
   * - {@link CarouselItem}
   * - {@link CarouselAd}
   * @returns {XML} div.widget-post-carousel-wrapper
   */
  render() {
    // containers = 0;
    const { articles, slug, length, ad } = this.props;
    // const { articles } = this.props;
    // console.log('SPRankingCarousel.render', this.state);
    // return null;
    return (
      <div
        className="widget-post-carousel-wrapper"
        // style={this.transform()}
        ref={element => (this.wrapper = element)}
      >
        <div
          className="widget-post-carousel-list"
          // style={this.dragging(this.state.left)}
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
                    ad={ad}
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
const SPComponentSinglesRanking = ({ list, slug, label, ad }) => {
  if (!Array.isArray(list) || !list.length) {
    return null;
  }
  const articles = list.map(article => (new ArticleDae(article)));
  // console.log('SPComponentSinglesRanking', list, slug, label, Array.isArray(list), list.length, articles);
  // ---
  /**
   * @since 2018-01-15
   * design変更に伴い
   * h2を変更
   */
  return (
    <div className="widget-post-carousel">
      <div className="mod-headingA01">
        <h2>
          <img src="/assets/sp/images/detail/ttl_ranking.png" alt="RANKING"/>
          人気の記事 / {label}
        </h2>
      </div>
      <div className="widget-post-carousel-outer">
        <div className="widget-post-carousel-center">
          <SPRankingCarousel
            articles={articles}
            slug={slug}
            length={articles.length}
            last={articles.length - 1}
            ad={ad}
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
