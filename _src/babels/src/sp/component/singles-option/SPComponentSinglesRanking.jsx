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

// React
const React = self.React;

const CarouselAd = ({ slug, index }) => {
  if (slug === 'big6tv') {
    return null;
  }
  if (index === 2 && index === 5) {
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

class SPRankingCarousel extends React.Component {
  static get propTypes() {
    return {
      articles: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ArticleDae)).isRequired,
      slug: React.PropTypes.string.isRequired,
      length: React.PropTypes.number.isRequired,
      last: React.PropTypes.number.isRequired,
    };
  }
  constructor(props) {
    super(props);
    // ---
    this.state = {
      x: 0,
      left: 0,
    };
    this.index = 0;
    this.width = 150;
    console.log('SPRankingCarousel', this.index, this.width);
  }
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
  start() {
    // TODO: swipe 設定
    console.log('SPRankingCarousel.start', this.state);
  }
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
  }
  translateX(index) {
    return -this.width * index;
  }
  transform(index, duration = 0.32) {
    const x = this.translateX(index);
    return {
      transform: x,
      '-webkit-transform': x,
      transition: `transform ${duration}s ease-out`,
      '-webkit-transition': `-webkit-transform ${duration}s ease-out`,
    };
  }
  componentDidMount() {
    if (this.props.length > 1) {
      // carousel 1 を超えていたら実装を開始する
      this.start();
    }
  }
  render() {
    const { articles, slug } = this.props;
    console.log('SPRankingCarousel.render', articles, slug);
    return (
      <div className="widget-post-carousel-outer">
        <div className="widget-post-carousel-center">
          <div className="widget-post-carousel-wrapper">
            <div className="widget-post-carousel-list">
              {
                articles.map((single, index) => {
                  return (
                    <div
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
                      />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
  // render() {
  //   console.log('SPRankingCarousel', this.props);
  //   return (
  //     <p>XXXXXX</p>
  //   );
  // }
}

const SPComponentSinglesRanking = ({ list, slug, label }) => {
  if (!Array.isArray(list) || !list.length) {
    return null;
  }
  const articles = list.map(article => (new ArticleDae(article)));
  console.log('SPComponentSinglesRanking', list, slug, label, Array.isArray(list), list.length, articles);
  // ---
  return (
    <div className="widget-post-carousel">
      <div className="mod-headingA01">
        <h2>{label}のよく読まれている記事</h2>
      </div>
      {
      <SPRankingCarousel
        articles={articles}
        slug={slug}
        length={articles.length}
        last={articles.length - 1}
      />
      }
    </div>
  );
};

SPComponentSinglesRanking.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  slug: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default SPComponentSinglesRanking;
