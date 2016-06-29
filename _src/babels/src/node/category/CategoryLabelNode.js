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

// React
let React = self.React;

/**
 * <p>記事が所属するカテゴリー名称を表示します</p>
 * <p>.category-label-wrapper カテゴリー表示</p>
 *
 * ```
 * <span class="category-label-wrapper">
 *  <span class="category-label">テニス</span>
 * </span>
 * ```
 * @from 2016-06-16
 * @type {*|Function|ReactClass}
 */
export const CategoryLabelNode = React.createClass( {
  propType: {
    index: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <span className="category-label-wrapper">
        {
          this.props.categories.map( ( category:Object, i:Number ) => {
            return <span key={`ranking-${this.props.id}-${this.props.index}-${i}`} className="category-label">{category.label}</span>;
          } )
        }
      </span>
    );
  }
} );
