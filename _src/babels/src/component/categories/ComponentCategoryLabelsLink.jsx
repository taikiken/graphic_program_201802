/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/24 - 16:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Url } from '../../app/const/Url';

// dae
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';

// React
/**
 * [library] - React
 */
const React = self.React;
/**
 * p.post-category を出力<br>
 * category 未設定に対応するように `CategoryLabelNode` を置換えます {@link CategoryLabelNode}<br>
 * `ComponentCategoryLabels` {@link ComponentCategoryLabels} の category に link を追加しました
 * @since 2016-09-24
 * */
export default class ComponentCategoryLabelsLink extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  index: number,
   *  id: string,
   *  categories: Array<SlugDae>,
   *  slug: string,
   *  className: string
   * }} React props
   */
  static get propTypes() {
    return {
      index: React.PropTypes.number.isRequired,
      id: React.PropTypes.string.isRequired,
      categories: React.PropTypes.array.isRequired,
      slug: React.PropTypes.string,
      className: React.PropTypes.string,
      // @since 2017-09-13
      anotherCategories: React.PropTypes.instanceOf(AnotherCategoriesDae),
    };
  }
  /**
   * defaultProps
   * @return {{slug: string, className: string}} React props
   */
  static get defaultProps() {
    return {
      slug: '',
      className: 'post-category'
    };
  }
  /**
   * category slug `area` の時のみ `category-label_area` を与えます
   * @param {string} slug category slug
   * @returns {string} `area` 用 className
   * @since 2017-09-08
   */
  static areaClassName(slug) {
    return slug === 'area' ? ' category-label_area' : '';
  }
  // // ---------------------------------------------------
  // //  CONSTRUCTOR
  // // ---------------------------------------------------
  // /**
  //  * プロパティを保存し必要な関数・変数を準備します
  //  * @param {Object} props プロパティ {@link ComponentCategoryLabelsLink.propTypes}
  //  */
  // constructor(props) {
  //   super(props);
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 地域名称をカテゴリラベルの代わりに出力する
   * @returns {?XML} span.category-label
   * @since 2017-09-15
   */
  renderRegion() {
    const { anotherCategories, id, index } = this.props;
    if (!anotherCategories) {
      return null;
    }
    // region
    return anotherCategories.area.list.map((regionDae, i) => {
      return (
        <span
          key={`labels-area-${id}-${index}-${i}`}
          className="category-label category-label_area"
        >
          <a href={`/area/${regionDae.region}/`}>
            {regionDae.region}
          </a>
        </span>
      );
    });
  }
  /**
   * p.post-category を出力します<br>
   * category 未設定の時は null を返します
   * @return {?XML} p.post-category を返します
   */
  render() {
    const props = this.props;
    const categories = props.categories;
    if (categories.length === 0) {
      return null;
    }

    const id = props.id;
    const index = props.index;
    const slug = props.slug || 'x';
    const className = props.className;
    const anotherCategories = props.anotherCategories;

    return (
      <p className={`${className} ${className}-${slug}`}>
        {
          /* Array<SlugDae> */
          categories.map((category, i) => {
            // console.log('ComponentCategoryLabelsLink', category, anotherCategories);
            if (!category.label) {
              return null;
            }
            if (category.slug === 'area' && (anotherCategories && anotherCategories.area.has)) {
              return null;
            }
            const areaClassName = category.slug === 'area' ? ' category-label_area' : '';
            return (
              <span key={`labels-${id}-${index}-${i}`} className={`category-label${areaClassName}`}>
                <a href={Url.category(category.slug)}>{category.label}</a>
              </span>
            );
          })
        }
        {
          this.renderRegion()
        }
        {
          // pref output
        }
      </p>
    );
  }
}
//
// /**
//  * プロパティ
//  * @type {{
//  *  index: number,
//  *  id: string,
//  *  categories: Array<SlugDae>,
//  *  slug: string
//  * }}
//  */
// ComponentCategoryLabelsLink.propTypes = {
//   index: React.PropTypes.number.isRequired,
//   id: React.PropTypes.string.isRequired,
//   categories: React.PropTypes.array.isRequired,
//   slug: React.PropTypes.string
// };
//
// /**
//  * default プロパティ
//  * @type {{slug: string}}
//  */
// ComponentCategoryLabelsLink.defaultProps = {
//   slug: ''
// };