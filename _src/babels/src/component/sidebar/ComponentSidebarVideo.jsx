/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/15 - 14:14
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
// import { RecommendTitleNode } from '../../node/sidebar/RecommendTitleNode';
// import { RankingNode } from '../../node/sidebar/RankingNode';
// import { CategoryLabelNode } from '../../node/category/CategoryLabelNode';

// dae
import { ArticleDae } from '../../dae/ArticleDae';

// data
import { Safety } from '../../data/Safety';
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';
import ComponentCategoryLabels from '../categories/ComponentCategoryLabels';
import ComponentSidebarTitle from './ComponentSidebarTitle';

// React
/**
 * [library] - React
 */
const React = self.React;
// ----------------------------------------------

/**
 * 記事 click callback - `ga` tag 送信します
 * @param {boolean} home home flag
 * @param {boolean} detail 記事詳細 flag
 * @param {string} url 記事 URL
 * @param {number} id 記事 ID
 * @param {string} thisSlug category slug
 */
const gaSend = (home, detail, url, id, thisSlug) => {
  if (home) {
    // GA 計測タグ
    Ga.add(new GaData('ComponentSidebarVideo gaSend', 'home_movie', 'click', url, parseFloat(id)));
  } else if (detail) {
    // GA 計測タグ
    Ga.add(new GaData('ComponentSidebarVideo gaSend', `${thisSlug}_movie`, 'click', url, parseFloat(id)));
  } else {
    // GA 計測タグ
    Ga.add( new GaData('ComponentSidebarVideo gaSend', 'detail_movie', 'click', url, parseFloat(id)));
  }
};

/**
 * sidebar おすすめ動画 - 1件
 * @param {number} index 記事 index
 * @param {number} id 記事 ID
 * @param {string} slug category.slug
 * @param {Array} categories Array.<SlugDae>
 * @param {string} url 記事 url
 * @param {string} date 記事日付
 * @param {string} title 記事タイトル
 * @param {string} thumbnail 記事サムネイル tag
 * @param {boolean} home home flag
 * @param {boolean} detail 記事詳細 flag
 * @param {string} thisSlug category slug
 * @param {AnotherCategoriesDae} anotherCategories 地域名称
 * @param {string} categorySlug category.slug
 * @returns {XML} li.board-item
 */
const ComponentVideoDom = ({
                             index,
                             id,
                             slug,
                             categories,
                             url,
                             date,
                             title,
                             thumbnail,
                             home,
                             detail,
                             thisSlug,
                             anotherCategories,
                             categorySlug,
                           }) => {
  return (
    <li className={`board-item videos-${index} videos-${slug || categorySlug}`}>
      <a
        href={url}
        className="post"
        onClick={() => (gaSend(home, detail, url, id, thisSlug))}
      >
        <figure className="post-thumb post-thumb-video">
          <img className="video-thumbnail" src={thumbnail} alt={title}/>
          <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY_SMALL} alt="" />
        </figure>
        <div className="post-data">
          <h4 className="post-heading">{title}</h4>
          {/*
          <p className={`post-category post-category-${slug}`}>
            <CategoryLabelNode
              categories={categories}
              id={`videos-label-${id}`}
              index={index}
              anotherCategories={anotherCategories}
            />
          </p>
          */}
          <ComponentCategoryLabels
            categories={categories}
            id={`videos-label-${id}`}
            index={index}
            anotherCategories={anotherCategories}
          />
          <p className="post-date">{date}</p>
        </div>
      </a>
    </li>
  );
};
// ----------------------------------------------

/**
 * sidebar おすすめ動画 5件 - {@link ViewVideos} 移設
 */
export default class ComponentSidebarVideo extends React.Component {
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
   * sidebar おすすめ動画 5件
   * @returns {XML} div.board-small.widget-recommend
   * */
  render() {
    // list.length > 0 が保証されている
    const { list, home, detail, slug, categorySlug } = this.props;
    // render
    return (
      <div className="board-small widget-recommend">
        {/* title */}
        {/*
        <RecommendTitleNode
          slug={categorySlug}
          label=""
          title={Message.RECOMMEND_TITLE}
        />
        */}
        <ComponentSidebarTitle
          title={Message.RECOMMEND_TITLE}
        />
        <ul className="board-list">
          {
            list.map((article, i) => {
              const dae = new ArticleDae(article);
              const thumbnail = Safety.image(dae.media.images.medium, Empty.VIDEO_THUMBNAIL);
              return (
                <ComponentVideoDom
                  key={`sidebar-ranking-${dae.id}`}
                  index={i}
                  id={String(dae.id)}
                  slug={dae.categories.slug}
                  categories={dae.categories.all}
                  url={dae.url}
                  date={dae.displayDate}
                  title={dae.title}
                  thumbnail={thumbnail}
                  home={home}
                  detail={detail}
                  thisSlug={slug}
                  anotherCategories={dae.anotherCategories}
                  categorySlug={categorySlug}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
}
