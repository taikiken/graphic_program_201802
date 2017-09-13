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
import { ArticleDae } from '../../../dae/ArticleDae';

// React
const React = self.React;

class SPSinglesRankingCarousel extends React.Component {
  static get propTypes() {
    return {
      articles: React.PropTypes.Array(ArticleDae).isRequired,
      slug: React.PropTypes.string.isRequired,
      length: React.PropTypes.number.isRequired,
      last: React.PropTypes.number.isRequired,
    };
  }
  constructor(props) {
    super(props);
    // ---
    this.state = {
      style: {},
    };
    this.index = 0;
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
  componentDidMount() {
    if (this.props.length > 1) {
      // carousel 1 を超えていたら実装を開始する
      this.start();
    }
  }
  render() {

  }
}

const SPComponentSinglesRanking = ({ list, slug, label }) => {
  if (!Array.isArray(list) || !list.length) {
    return null;
  }
  const articles = list.map(article => (new ArticleDae(article)));
  // ---
  return (
    <div className="widget-post-carousel">
      <div className="mod-headingA01">
        <h2>${label}のよく読まれている記事</h2>
      </div>
      <SPSinglesRankingCarousel
        articles={articles}
        slug={slug}
        length={articles.length}
        last={articles.length - 1}
      />
    </div>
  );
};

export default class SPComponentSinglesRanking;
