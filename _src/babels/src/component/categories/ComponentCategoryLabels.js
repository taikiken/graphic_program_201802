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

// React
const React = self.React;
/**
 * p.post-category を出力<br>
 * category 未設定に対応するように `CategoryLabelNode` を置換えます {@link CategoryLabelNode}
 * @since 2016-09-24
 * */
export class ComponentCategoryLabels extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentCategoryLabels.propTypes}
   */
  constructor(props) {
    super(props);
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

    return (
      <p className={`post-category post-category-${props.slug}`}>
        {
          /* Array<SlugDae> */
          categories.map((dae, i) => {
            return (
              <span key={`labels-${id}-${index}-${i}`} className="category-label">
                {dae.label}
              </span>
            );
          })
        }
      </p>
    );
  }
}

/**
 * プロパティ
 * @type {{
 *  index: number,
 *  id: string,
 *  categories: Array<SlugDae>,
 *  slug: string
 * }}
 */
ComponentCategoryLabels.propTypes = {
  index: React.PropTypes.number.isRequired,
  id: React.PropTypes.string.isRequired,
  categories: React.PropTypes.array.isRequired,
  slug: React.PropTypes.string
};

/**
 * default プロパティ
 * @type {{slug: string}}
 */
ComponentCategoryLabels.defaultProps = {
  slug: ''
};
