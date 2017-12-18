/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/29 - 15:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../../app/const/Message';
import { Empty } from '../../../app/const/Empty';

// data
import { Safety } from '../../../data/Safety';

// component
import { ComponentCategoryLabels } from '../../../component/categories/ComponentCategoryLabels';
import { ComponentArticleThumbnail } from '../../../component/articles/ComponentArticleThumbnail';

// React
const React = self.React;

/**
 * SP: 記事詳細・次の記事一覧 > 人気記事一覧<br>
 * `SPComponentSinglesWidgetPopular` mount 後<br>
 * `SPViewSinglesPopular` で AJAX request を行いレスポンス取得後出力を開始します
 * {@link SPComponentSinglesWidgetPopular}
 * {@link SPViewSinglesPopular}
 * @since 2016-09-28
 */
export class SPComponentSinglesWidgetPopularList extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentSinglesWidgetPopularList.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{list: Array<SingleDae>}}
     */
    this.state = {
      list: props.list
    };
  }
  /**
   * 人気記事一覧, `div.widget-postList_popular` を出力します
   * @return {XML} div.widget-postList_popular を返します
   */
  render() {
    // @type {Array<SingleDae>}
    const articles = this.state.list;
    // not array, 空配列 null を返します
    if (!Array.isArray(articles) || articles.length === 0) {
      return null;
    }

    return (
      <div className="widget-postList widget-postList_popular">
        <div className="mod-headingA01">
          <h2>{Message.RANKING_TITLE}</h2>
        </div>
        {/* 人気記事一覧 */}
        <div className="board">
          {
            articles.map((single, index) => {
              const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);

              return (
                <div key={`singles-popular-${single.id}`} className="board-item">
                  <a href={single.url} className="post">
                    <ComponentArticleThumbnail
                      mediaType={single.mediaType}
                      thumbnail={thumbnail}
                      title={single.title}
                      recommend={false}
                      small={true}
                    />
                    {/* コンテンツ情報 */}
                    <div className="post-data">
                      <h3 className="post-heading">{single.title}</h3>
                      <ComponentCategoryLabels
                        index={index}
                        id={`single-popular-label-${single.id}`}
                        categories={single.categories.all}
                        anotherCategories={single.anotherCategories}
                      />
                      <p className="post-date">{single.displayDate}</p>
                    </div>
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
  /**
   * 次の読み込みから表示を更新します
   * @param {Array} list 表示リスト
   */
  updateList(list) {
    // state を変更し appendChild を行う
    this.setState({ list });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * - 不要かも
   */
  reload() {
    this.updateList(this.state.list);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React props
   * @return {{list: Array<SingleDae>}} React props
   */
  static get propTypes() {
    return {
      list: React.PropTypes.array.isRequired
    };
  }
}
