/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/15 - 13:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../app/const/Message';
import { Empty } from '../../app/const/Empty';

// node
import { RecommendTitleNode } from '../../node/sidebar/RecommendTitleNode';
import { RankingNode } from '../../node/sidebar/RankingNode';

// dae
import { ArticleDae } from '../../dae/ArticleDae';

// data
import { Safety } from '../../data/Safety';

// React
const React = self.React;

/**
 * sidebar オススメ記事 5件を表示します
 * @since 2017-09-14 - {@link ViewRecommend} から移設
 */
export default class ComponentSidebarRecommend extends React.Component {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.props
   * @returns {{list: Array, home: boolean, detail: boolean, slug: string, categorySlug: string, did: function}}
   * React propTypes 返します
   */
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
  //  METHOD
  // ---------------------------------------------------
  /**
   * マウント後 props.did callback 実行します
   * */
  componentDidMount() {
    this.props.did();
  }
  /**
   * sidebar オススメ記事 5件出力します
   * @returns {XML} div.board-small.widget-ranking
   * */
  render() {
    // list.length > 0 が保証されている
    const { list, home, detail, slug, categorySlug } = this.props;
    // render
    return (
      <div className="board-small widget-ranking">
        {/* title */}
        <RecommendTitleNode
          slug={categorySlug}
          label=""
          title={Message.RECOMMEND_TITLE}
        />
        <ul className="post-list">
          {
            list.map((article, i) => {
              const dae = new ArticleDae(article);
              const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
              const empty = thumbnail === Empty.IMG_SMALL;
              return (
                <RankingNode
                  key={`sidebar-recommend-${dae.id}`}
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
