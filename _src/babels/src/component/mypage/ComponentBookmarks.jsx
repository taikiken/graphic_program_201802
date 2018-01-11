/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/15 - 14:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Empty } from '../../app/const/Empty';
import { Safety } from '../../data/Safety';
import ComponentBookmarkButton from './bookmark/ComponentBookmarkButton';
import ComponentCategoryLabels from '../categories/ComponentCategoryLabels';
import { ArticleDae } from '../../dae/ArticleDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * mypage bookmark 一覧を出力します
 * - {@link ComponentBookmarkButton}
 * - {@link ComponentCategoryLabels}
 * @since 2017-12-15
 */
export default class ComponentBookmarks extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{
   *   list: Array.<ArticleDae>,
   *   callback: function
   * }}
   * React.propTypes
   */
  static get propTypes() {
    return {
      list: React.PropTypes.arrayOf(
        React.PropTypes.instanceOf(ArticleDae).isRequired,
      ).isRequired,
      callback: React.PropTypes.func.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * mypage bookmark 一覧準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // --
    /**
     * React.state
     * @type {{list: Array.<ArticleDae>}}
     */
    this.state = {
      list: props.list,
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate - after mount
   * - props.callback を実行します
   */
  componentDidMount() {
    this.props.callback();
  }
  /**
   * delegate - before update props
   * - list 値が変化していたら `setState` 実行し表示を更新します + props.callback を実行します
   * @param {{list: Array.<ActivityDae>}} nextProps next React.props
   */
  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    this.setState({ list });
    this.props.callback();
  }
  /**
   * mypage bookmark 一覧 を出力します
   * @returns {?XML} `div.bookmarks`
   */
  render() {
    const { list } = this.state;
    if (!list.length) {
      return null;
    }
    // ---
    return (
      <div className="bookmarks">
        <ul className="board-small">
          {
            list.map((dae, idx) => {
              const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
              return (
                <li
                  key={`bookmarks-${dae.id}`}
                  className="board-stacks board-item"
                >
                  <ComponentBookmarkButton
                    id={`${dae.id}`}
                    bookmarked={dae.isBookmarked}
                  />
                  <a href={dae.url} className="post">
                    <figure className="post-thumb">
                      <img src={thumbnail} alt={dae.title}/>
                    </figure>
                    <div className="post-data">
                      <ComponentCategoryLabels
                        categories={dae.categories.all}
                        id={`bookmarks-label-${dae.id}`}
                        index={idx}
                        anotherCategories={dae.anotherCategories}
                        className="category-label-wrapper"
                      />
                      <h2 className="post-heading">{dae.title}</h2>
                      <p className="post-date">{dae.displayDate}</p>
                    </div>
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
