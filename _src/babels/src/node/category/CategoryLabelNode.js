/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/28 - 18:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../app/const/Message';
import { MediaType } from '../../app/const/MediaType';

// dae
import AnotherCategoriesDae from '../../dae/another-categories/AnotherCategoriesDae';

// React
const React = self.React;

/**
 * オススメ記事 tag
 * @param {boolean} need オススメ記事フラッグ
 * @returns {?XML} オススメ記事 tag
 */
const recommend = (need) => {
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
const movie = (type) => {
  if (type === MediaType.VIDEO) {
    return <i className="post-label_movie">Message.LABEL_MOVIE</i>;
  }
  return null;
};

/**
 * @deprecated 2016-09-24 instead use ComponentCategoryLabels
 * <p>記事が所属するカテゴリー名称を表示します</p>
 * <p>.category-label-wrapper カテゴリー表示</p>
 *
 * ```
 * <span class="category-label-wrapper">
 *  <span class="category-label">テニス</span>
 * </span>
 * ```
 * @since 2016-06-16
 * @type {*|Function|ReactClass}
 */
export const CategoryLabelNode = React.createClass( {
  /**
   * default props の型を指定します
   */
  propType: {
    index: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired,
    // @since 2016-12-26
    mediaType: React.PropTypes.string,
    recommend: React.PropTypes.bool,
    // @since 2017-09-13
    anotherCategories: React.PropTypes.instanceOf(AnotherCategoriesDae),
  },
  /**
   * 下位互換を保つために default 値を設定します
   * @since 2016-12-26
   */
  defaultProps: {
    mediaType: '',
    recommend: false,
    // @since 2017-09-13
    anotherCategories: null,
  },
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
          {regionDae.region}
        </span>
      );
    });
  },
  /**
   * 記事一覧の 1記事ブロック カテゴリコンテナ + 動画 + オススメ記事
   * @returns {XML} span.category-label-wrapper
   */
  render: function() {
    const { anotherCategories, categories, id, index } = this.props;
    console.log('CategoryLabelNode.render anotherCategories', anotherCategories, categories);
    if (!categories.length && (!anotherCategories || !anotherCategories.area.has)) {
      return null;
    }
    // const id = this.props.id;
    // const index = this.props.index;
    return (
      <span className="category-label-wrapper">
        {
          recommend(this.props.recommend)
        }
        {
          movie(this.props.mediaType)
        }
        {
          this.props.categories.map((category:Object, i:Number) => {
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
                {category.label}
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
