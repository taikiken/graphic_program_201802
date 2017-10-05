/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/14 - 21:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// app
import { Dom } from '../../app/Dom';
import { Message } from '../../app/const/Message';
import { Empty } from '../../app/const/Empty';

// dae
import { ArticleDae } from '../../dae/ArticleDae';

// data
import { Safety } from '../../data/Safety';

// node
import { RankingNode } from '../../node/sidebar/RankingNode';

// React
const React = self.React;

/**
 * {@link ViewRanking} から移設
 * - sidebar ranking component
 * @since 2017-09-14
 */
export default class ComponentSidebarRanking extends React.Component {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.props
   * @returns {{
   *  list: {},
   *  home: boolean,
   *  detail: boolean,
   *  slug: string,
   *  categorySlug: string,
   *  did: function
   * }} React.props types
   * */
  static get propTypes() {
    return {
      // JSON 戻り値
      list: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
      // home or not
      home: React.PropTypes.bool.isRequired,
      // detail
      detail: React.PropTypes.bool.isRequired,
      // category.slug
      slug: React.PropTypes.string.isRequired,
      // category.slug - どうも上と同じ
      categorySlug: React.PropTypes.string.isRequired,
      // before: React.PropTypes.func.isRequired,
      did: React.PropTypes.func.isRequired,
    };
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * @param {string} categorySlug category.slug
   * @returns {XML|string} span.widget-ranking-heading-ruby-label or ''
   * */
  static title(categorySlug) {
    // category api slug が `all` 以外の時に category.label をタイトルに含める
    let categoryTitle = '';
    if ( categorySlug !== 'all' ) {
      const categoryLabel = Dom.categoryLabel();
      if (categoryLabel) {
        categoryTitle = <span className="widget-ranking-heading-ruby-label"> / {categoryLabel}</span>;
      }
    }
    console.log('ComponentSidebarRanking.title', categorySlug, Dom.categoryLabel());
    return categoryTitle;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * マウント後 props.did callback 実行します
   * */
  componentDidMount() {
    this.props.did();
  }
  /**
   * RANKING - div.board-small.widget-ranking
   * @returns {XML} div.board-small.widget-ranking
   * */
  render() {
    // list.length > 0 が保証されている
    const { list, home, detail, slug, categorySlug } = this.props;
    // // before callback
    // before();
    // title
    const categoryTitle = ComponentSidebarRanking.title(categorySlug);
    // render
    return (
      <div className="board-small widget-ranking">
        {/* title */}
        <div className="widget-ranking-heading">
          <h3 className="widget-ranking-heading-title">RANKING</h3>
          <span className="widget-ranking-heading-ruby">{Message.RANKING_TITLE}{categoryTitle}</span>
        </div>
        {/* ul */}
        <ul className="post-list">
          {
            list.map((article, i) => {
              const dae = new ArticleDae(article);
              const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
              const empty = thumbnail === Empty.IMG_SMALL;
              // console.log('ComponentSidebarRanking', dae.anotherCategories);
              // RankingNode instance を使い render
              return (
                <RankingNode
                  key={`sidebar-ranking-${dae.id}`}
                  index={i}
                  id={String( dae.id )}
                  categories={dae.categories.all}
                  url={dae.url}
                  date={dae.displayDate}
                  title={dae.title}
                  thumbnail={thumbnail}
                  empty={empty}
                  total={dae.commentsCount}
                  home={home}
                  detail={detail}
                  thisSlug={slug}
                  categorySlug={categorySlug}
                  anotherCategories={dae.anotherCategories}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
}


