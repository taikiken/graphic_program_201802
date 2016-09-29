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
import { ComponentCategoryLabels } from '../../../component/categories/ComponentCategoryLabels';
import { ComponentArticleThumbnail } from '../../../component/articles/ComponentArticleThumbnail';

// React
const React = self.React;

export class SPComponentSinglesWidgetRecommend extends React.Component {
  constructor(props) {
    super(props);
    console.log('SPComponentSinglesWidgetRecommend', props);
    this.state = {
      single: props.single,
      index: props.index
    };
  }
  render() {
    const props = this.props;
    console.log('SPComponentSinglesWidgetRecommend.render', props, status);
    if (props.strong) {
      return this.build();
    }

    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = this.state.index + 1;

    if (index % 3 !== 0) {
      return null;
    }

    // @type {Array<SingleDae>}
    const articles = this.state.single.recommendArticles;
    if (articles.length === 0) {
      return null;
    }

    return this.build();
  }
  build() {
    // @type {Array<SingleDae>}
    const articles = this.state.single.recommendArticles;
    console.log('SPComponentSinglesWidgetRecommend.build', articles);
    return (
      <div className="widget-postList widget-postList_recommend">
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
                    />
                    {/* コンテンツ情報 */}
                    <div className="post-data">
                      <h3 className="post-heading">{single.title}</h3>
                      <ComponentCategoryLabels
                        index={i}
                        id={`single-recommend-label-${single.id}`}
                        categories={single.categories.all}
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
  updateSingle(single) {
    this.setState({ single });
  }
  reload() {
    this.updateSingle(this.state.single);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
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
