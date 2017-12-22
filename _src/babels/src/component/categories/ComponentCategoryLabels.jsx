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
// CategoryLabelNode
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';
import { MediaType } from '../../app/const/MediaType';
import { Message } from '../../app/const/Message';

// app
// import { Url } from '../../app/const/Url';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * オススメ記事 tag
 * @param {boolean} need オススメ記事フラッグ
 * @returns {?XML} オススメ記事 tag
 */
const recommendTag = (need) => {
  if (!need) {
    return null;
  }
  // タグが必要
  return <i className="post-label_recommend">{Message.LABEL_RECOMMEND}</i>;
};

/**
 * 動画記事 tag
 * @param {string} type media type
 * @returns {?XML} 動画記事 tag
 */
const movieTag = (type) => {
  if (type === MediaType.VIDEO) {
    return <i className="post-label_movie">Message.LABEL_MOVIE</i>;
  }
  return null;
};

/**
 * p.post-category を出力<br>
 * category 未設定に対応するように `CategoryLabelNode` を置換えます {@link CategoryLabelNode}
 * @since 2016-09-24
 * */
export default class ComponentCategoryLabels extends React.Component {
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
      // @since 2016-12-26
      mediaType: React.PropTypes.string,
      recommend: React.PropTypes.bool,
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
      className: 'post-category',
      // @since 2016-12-26
      mediaType: '',
      recommend: false,
      // @since 2017-09-13
      anotherCategories: null,
    };
  }
  // // ---------------------------------------------------
  // //  STATIC GETTER / SETTER
  // // ---------------------------------------------------
  // /**
  //  * プロパティを保存し必要な関数・変数を準備します
  //  * @param {Object} props プロパティ {@link ComponentCategoryLabels.propTypes}
  //  */
  // constructor(props) {
  //   super(props);
  //   console.log('ComponentCategoryLabels', props.categories);
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
          {regionDae.region}
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
    const {
      categories,
      anotherCategories,
      id,
      index,
      slug,
      className,
      recommend,
      mediaType,
    } = this.props;
    // const categories = props.categories;
    // const anotherCategories = props.anotherCategories;

    if (categories.length === 0 && (!anotherCategories || !anotherCategories.area.has)) {
      return null;
    }

    // const id = props.id;
    // const index = props.index;
    // const slug = props.slug || 'x';
    // const className = this.props.className;

    return (
      <p className={`post-category post-category-${slug || 'x'} ${className}`}>
        {
          recommendTag(recommend)
        }
        {
          movieTag(mediaType)
        }
        {
          /* Array<SlugDae> */
          categories.map((category, i) => {
            if (!category.label) {
              return null;
            }
            if (category.slug === 'area' && (anotherCategories && anotherCategories.area.has)) {
              return null;
            }
            const areaClassName = category.slug === 'area' ? ' category-label_area' : '';
            return (
              <span
                key={`labels-${id}-${index}-${i}`}
                className={`category-label${areaClassName}`}
              >
                {category.label}
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
// ComponentCategoryLabels.propTypes = {
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
// ComponentCategoryLabels.defaultProps = {
//   slug: ''
// };
