/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 16:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../app/const/Message';
import { Empty } from '../../app/const/Empty';

// data
import { Safety } from '../../data/Safety';

// component
import { ComponentCategoryLabels } from '../../component/categories/ComponentCategoryLabels';
import { ComponentArticleThumbnail } from '../../component/articles/ComponentArticleThumbnail';

// React
const React = self.React;

/**
 * PC: 記事詳細・次の記事一覧 > オススメ記事一覧<br>
 * 記事詳細 JSON.response.recommend_articles から出力します
 * @since 2016-09-30
 */
export class ComponentSinglesWidgetRecommend extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSinglesWidgetRecommend.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{single: SingleDae, index: number}}
     * */
    this.state = {
      single: props.single,
      index: props.index
    };
  }
  /**
   * state.index が 3 の時に出力します あるいは strong: true の時に<br>
   * オススメ記事一覧 `div.widget-postList` を出力します
   * @return {?XML} `div.widget-postList` を返します
   * */
  render() {
    // @type {Array<SingleDae>}
    const articles = this.state.single.recommendArticles;
    console.log('ComponentSinglesWidgetRecommend.render ', articles);
    if (articles.length === 0) {
      return null;
    }

    const props = this.props;
    if (props.strong) {
      return this.build();
    }

    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = this.state.index + 1;

    if (index !== 3) {
      return null;
    }

    return this.build();
  }
  /**
   * オススメ記事一覧 `div.widget-postList` を出力します
   * @return {XML} `div.widget-postList` を返します
   * */
  build() {
    // @type {Array<SingleDae>}
    const articles = this.state.single.recommendArticles;

    return (
      <div className="widget-postList widget-postList_recommend">
        <div className="widget-postList-heading">
          <h2>{Message.RECOMMEND_TITLE}</h2>
        </div>
        {/* オススメ記事一覧 */}
        <ul className="board-small column2">
          {
            articles.map((single, i) => {
              const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);

              return (
                <li key={`singles-recommend-${single.id}`} className="board-item">
                  <a href={single.url} className="post">
                    <ComponentArticleThumbnail
                      mediaType={single.mediaType}
                      thumbnail={thumbnail}
                      title={single.title}
                      recommend={false}
                    />
                    {/* コンテンツ情報 */}
                    <div className="post-data">
                      <ComponentCategoryLabels
                        index={i}
                        id={`single-recommend-label-${single.id}`}
                        categories={single.categories.all}
                      />
                      <h3 className="post-heading">{single.title}</h3>
                      <p className="post-date">{single.displayDate}</p>
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
  /**
   * state.single 情報を更新し再描画します
   * @param {SingleDae} single state.single 情報
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * @ToDo 不要かも
   */
  reload() {
    this.updateSingle(this.state.single);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React props
   * @return {{index: number, single: SingleDae, strong: boolean, sign: boolean}} React props
   */
  static get propTypes() {
    return {
      // 記事表示順序
      index: React.PropTypes.number.isRequired,
      // SingleDae - 記事詳細データ recommend_articles 抽出
      single: React.PropTypes.object.isRequired,
      // 記事出力順番に関係なく出力するかのフラッグ
      strong: React.PropTypes.bool.isRequired,
      // ログイン済みかのフラッグ
      sign: React.PropTypes.bool.isRequired
    };
  }
}
