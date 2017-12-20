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
// RankingNode
// React
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';
import { GaData } from '../../ga/GaData';
import { Ga } from '../../ga/Ga';
// import { Empty } from '../../app/const/Empty';
import { ComponentCategoryLabels } from '../categories/ComponentCategoryLabels';

/**
 * [library] - React
 */
const React = self.React;

/**
 * [PC] sidebar - ranking / recommend 記事を出力します
 */
export default class ComponentSidebarRankingArticle extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * - index {number}
   * - thumbnail {string}
   * - categories {Array.<*>}
   * - title {string}
   * - anotherCategories {AnotherCategoriesDae}
   * - id {string}
   * - url {string}
   * - home {boolean}
   * - detail {boolean}
   * - thisSlug {string}
   * @returns {*} React.propTypes
   * */
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
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * [PC] sidebar - ranking / recommend 記事準備します
   * @param {*} props React.props
   * */
  constructor(props) {
    super(props);
    // ---
    /**
     * bind onClick - ga 送信します
     * @type {function}
     * */
    this.onClick = this.onClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * home - ga tag 送信します
   * */
  gaHome() {
    // ----------------------------------------------
    // GA 計測タグ
    const { url, id } = this.props;
    Ga.add(new GaData('ComponentSidebarRankingArticle.gaHome', 'home_ranking', 'click', url, parseFloat(id)));
    // ----------------------------------------------
  }
  /**
   * category - ga tag 送信します
   * */
  gaCategory() {
    // ----------------------------------------------
    // GA 計測タグ
    const { thisSlug, url, id } = this.props;
    Ga.add( new GaData('ComponentSidebarRankingArticle.gaCategory', `${thisSlug}_ranking`, 'click', url, parseFloat(id)));
    // ----------------------------------------------
  }
  /**
   * 記事詳細 - ga tag 送信します
   * */
  gaDetail() {
    // ----------------------------------------------
    // GA 計測タグ
    const { url, id } = this.props;
    Ga.add( new GaData('ComponentSidebarRankingArticle.gaDetail', 'detail_ranking', 'click', url, parseFloat(id)));
    // ----------------------------------------------
  }
  /**
   * a.onclick event handler - ga tag 送信します
   * - `gaHome`
   * - `gaCategory`
   * - `gaDetail`
   * */
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
  /**
   * sidebar - ranking / recommend 記事を出力します
   * @returns {XML} `li.board-item` 返します
   * */
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
