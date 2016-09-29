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

// view
import { View } from '../../../view/View';

// app
import { Message } from '../../../app/const/Message';

// sp/node
import { SPMediaNode } from '../../node/single/SPMediaNode';

// sp/component
import { ComponentCategoryLabelsLink } from '../../../component/categories/ComponentCategoryLabelsLink';

// React
const React = self.React;

export class SPComponentSinglesWidgetPopularList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: props.list
    };
  }
  render() {
    const articles = this.state.list;

    return (
      <div className="widget-postList widget-postList_popular">
        <div className="mod-headingA01">
          <h2>{Message.RANKING_TITLE}</h2>
        </div>
        {/* 人気記事一覧 */}
        <div className="board">
          {
            articles.map((single, index) => {
              console.log('SPComponentSinglesWidgetPopularList.render single', single);
              return (
                <div key={`singles-popular-${single.id}`} className="board-item">
                  <a href={single.url} className="post">
                    <SPMediaNode
                      articleId={String(single.id)}
                      mediaType={single.mediaType}
                      media={single.media}
                      isShowImage={single.isShowImage}
                    />
                    {/* コンテンツ情報 */}
                    <div className="post-data">
                      <h3 className="post-heading">{single.title}</h3>
                      <ComponentCategoryLabelsLink
                        index={index}
                        id={`single-popular-label-${single.id}`}
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
  // /**
  //  * delegate method, マウントした時にコールされます
  //  *
  //  * `View.DID_MOUNT` をコールバックに通知します
  //  */
  // componentDidMount() {
  //   this.props.callback(View.DID_MOUNT);
  // }
  /**
   * 次の読み込みから表示を更新します
   * @param {Array} list 表示リスト
   */
  updateList(list) {
    // state を変更し appendChild を行う
    this.setState({ list });
  }
  reload() {
    this.updateList(this.state.list);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  static get propTypes() {
    return {
      list: React.PropTypes.array.isRequired
    };
  }
}
