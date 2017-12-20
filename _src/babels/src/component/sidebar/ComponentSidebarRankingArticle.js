/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/20 - 18:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// React
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';
import { GaData } from '../../ga/GaData';
import { Ga } from '../../ga/Ga';
import { Empty } from '../../app/const/Empty';
import { ComponentCategoryLabels } from '../categories/ComponentCategoryLabels';

/**
 * [library] - React
 */
const React = self.React;

export default class ComponentSidebarRankingArticle extends React.Component {
  static get propTypes() {
    return {
      index: React.PropTypes.number.isRequired,
      thumbnail: React.PropTypes.string.isRequired,
      categories: React.PropTypes.array.isRequired,
      title: React.PropTypes.string.isRequired,
      // anotherCategories - 2017-09-14
      anotherCategories: React.PropTypes.instanceOf(AnotherCategoriesDae).isRequired,
      id: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      home: React.PropTypes.bool.isRequired,
      detail: React.PropTypes.bool.isRequired,
      thisSlug: React.PropTypes.string.isRequired,

      // slug: React.PropTypes.string,
      // date: React.PropTypes.string.isRequired,
      // empty: React.PropTypes.bool.isRequired,
      // total: React.PropTypes.number.isRequired,
      // categorySlug: React.PropTypes.string.isRequired,
    };
  }
  constructor(props) {
    super(props);
    // ---
    this.onClick = this.onClick.bind(this);
  }
  gaHome() {
    // ----------------------------------------------
    // GA 計測タグ
    const { url, id } = this.props;
    Ga.add(new GaData('RankingNode.gaHome', 'home_ranking', 'click', url, parseFloat(id)));
    // ----------------------------------------------
  }
  gaCategory() {
    // ----------------------------------------------
    // GA 計測タグ
    const { thisSlug, url, id } = this.props;
    Ga.add( new GaData('RankingNode.gaCategory', `${thisSlug}_ranking`, 'click', url, parseFloat(id)));
    // ----------------------------------------------
  }
  gaDetail() {
    // ----------------------------------------------
    // GA 計測タグ
    const { url, id } = this.props;
    Ga.add( new GaData('RankingNode.gaDetail', 'detail_ranking', 'click', url, parseFloat(id)));
    // ----------------------------------------------
  }
  onClick() {
    const { home, detail } = this.props;
    if (home) {
      this.gaHome();
    } else if (detail) {
      this.gaDetail();
    } else {
      this.gaCategory();
    }
  }
  render() {
    const {
      index,
      thumbnail,
      categories,
      title,
      anotherCategories,
      id,
      url,
      // date,
    } = this.props;
    const standing = index + 1;
    const slugs = categories.map(category => category.slug);

    return (
      <li className={`board-item rank-${standing} ranking-${slugs.join('__')}`}>
        <a
          href={url}
          className="post"
          onClick={this.onClick}
        >
          <figure className="post-thumb">
            <img src={thumbnail} alt="" />
          </figure>
          <div className="post-data">
            <h4 className="post-heading">{title}</h4>
            <ComponentCategoryLabels
              categories={categories}
              id={id}
              index={index}
              anotherCategories={anotherCategories}
            />
            {/*
            // トルツメ
            <p className="post-date">{p.date}</p>
            */}
          </div>
        </a>
      </li>
    );
  }
}
