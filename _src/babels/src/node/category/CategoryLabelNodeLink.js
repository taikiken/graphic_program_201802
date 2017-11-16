/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/28 - 20:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Url} from '../../app/const/Url';

// dae
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';

// React
const React = self.React;

/**
 * <p>記事が所属するカテゴリー名称を表示します</p>
 * <p>.category-label-wrapper カテゴリー表示</p>
 * <p>CategoryLabelNode にリンクを追加</p>
 *
 * ```
 * <span class="category-label-wrapper">
 *  <span class="category-label"><a href="/category/tennis/">テニス</a></span>
 * </span>
 * ```
 * @since 2016-06-16
 * @type {*|Function|ReactClass}
 */
export const CategoryLabelNodeLink = React.createClass( {
  propType: {
    index: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired,
    // @since 2017-09-13
    anotherCategories: React.PropTypes.instanceOf(AnotherCategoriesDae),
  },
  /**
   * span.category-label - 地域名称をカテゴリーラベルの代わりに表示する
   * @returns {?XML} span.category-label
   * @since 2-17-09-13
   */
  renderRegion: function() {
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
  },
  render: function() {
    // return (
    //   <span className="category-label-wrapper">
    //     {
    //       this.props.categories.map( ( category:Object, i:Number ) => {
    //         return <span key={`ranking-${this.props.id}-${this.props.index}-${i}`} className="category-label"><a href={Url.category(category.slug)}>{category.label}</a></span>;
    //       } )
    //     }
    //   </span>
    // );
    // @since 2-17-09-13 - 地域名称表示のために改造する
    const { anotherCategories, categories, id, index } = this.props;
    // console.log('CategoryLabelNodeLink.render anotherCategories', anotherCategories, categories);
    if (!categories.length && (!anotherCategories || !anotherCategories.area.has)) {
      return null;
    }
    return (
      <span className="category-label-wrapper">
        {
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
                key={`ranking-${id}-${index}-${i}`}
                className={`category-label${areaClassName}`}
              >
                <a href={Url.category(category.slug)}>
                  {category.label}
                </a>
              </span>
            );
          })
        }
        {
          // region
          this.renderRegion()
        }
        {
          // pref output
        }
      </span>
    );
  }
} );
