/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/29 - 12:26
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
import ComponentCategoryLabels from '../../../component/categories/ComponentCategoryLabels';
import ComponentArticleThumbnail from '../../../component/articles/ComponentArticleThumbnail';

// ui / snap
import { SPSnap } from '../../ui/SPSnap';

// React
const React = self.React;

/**
 * SP: 記事詳細・次の記事一覧 > オススメ記事一覧<br>
 * 記事詳細 JSON.response.recommend_articles から出力します
 * @since 2016-09-28
 */
export class SPComponentSinglesWidgetRecommend extends React.Component {
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
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentSinglesWidgetRecommend.propTypes}
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
    /**
     * 出力コンテナ
     * @type {?Element}
     * @since 2016-10-29
     */
    this.element = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます<br>
   * snap インスタンスを作成し snap scroll します
   * @since 2016-11-12
   */
  componentDidMount() {
    if (this.element !== null) {
      const snap = new SPSnap(this.element);
      snap.start();
    }
  }
  /**
   * オススメ記事一覧 `div.widget-postList` を出力します
   * @return {XML} `div.widget-postList` を返します
   * */
  build() {
    // @type {Array<SingleDae>}
    const articles = this.state.single.recommendArticles;
    // not array, 空配列 null を返します
    if (!Array.isArray(articles) || articles.length === 0) {
      return null;
    }

    return (
      <div
        className={`widget-postList widget-postList_recommend-${this.props.index} widget-postList_recommend`}
        ref={(component) => {
          this.element = component;
        }}
      >
        <div className="mod-headingA01">
          <h2>{Message.RECOMMEND_TITLE}</h2>
        </div>
        {/* オススメ記事一覧 */}
        <div className="board">
          {
            articles.map((single, i) => {
              const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);

              return (
                <div key={`singles-recommend-${single.id}`} className="board-item">
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
                        index={i}
                        id={`single-recommend-label-${single.id}`}
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
   * state.single 情報を更新し再描画します
   * @param {SingleDae} single state.single 情報
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * - 不要かも
   */
  reload() {
    this.updateSingle(this.state.single);
  }
  /**
   * state.index が 3 の時に出力します あるいは strong: true の時に<br>
   * オススメ記事一覧 `div.widget-postList` を出力します
   * @return {?XML} `div.widget-postList` を返します
   * */
  render() {
    // @type {Array<SingleDae>}
    const articles = this.state.single.recommendArticles;
    // console.log('SPComponentSinglesWidgetRecommend.render ', articles);
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
}
