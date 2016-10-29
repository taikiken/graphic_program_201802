/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 16:31
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
import { MediaType } from '../../app/const/MediaType';

// data
import { Safety } from '../../data/Safety';

// component
import { ComponentCategoryLabels } from '../categories/ComponentCategoryLabels';
// import { ComponentArticleThumbnail } from '../articles/ComponentArticleThumbnail';

// React
const React = self.React;
// ----------------------------------------

/**
 * mediaType で play button を表示するかを判断しタグを返します
 * @param {string} mediaType media type, video / image...
 * @return {?XML} play button を表示する時は img tag をそうでない時は null を返します
 */
const playMark = (mediaType) => {
  if (mediaType === MediaType.VIDEO) {
    return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
  }

  return null;
};

/**
 * PC: 記事詳細・人気の記事一覧を出力します
 * @since 2016-09-30
 */
export class ComponentSinglesWidgetPopularList extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React props
   * @return {{list: Array<SingleDae>}} React props
   */
  static get propTypes() {
    return {
      list: React.PropTypes.array.isRequired,
      callback: React.PropTypes.func.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSinglesWidgetPopularList.propTypes}
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
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます<br>
   * callback 関数を実行します
   */
  componentDidMount() {
    const callback = this.props.callback;
    if (typeof callback === 'function') {
      callback.call(this);
    }
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
   * @ToDo 不要かも
   */
  reload() {
    this.updateList(this.state.list);
  }
  /**
   * 記事詳細・人気の記事一覧を出力します
   * @return {XML} div.widget-postList.widget-postList_popular を返します
   * */
  render() {
    // @type {Array<SingleDae>}
    const articles = this.state.list;

    return (
      <div className="widget-postList widget-postList_popular">
        <div className="widget-postList-heading">
          <h2>{Message.RANKING_TITLE}</h2>
        </div>
        {/* 人気記事一覧
         @since 2016-09-30 thumbnail 出力方法を変更
         const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);
        */}
        <ul className="board-small column2">
          {
            articles.map((single, index) => {
              const thumbnail = Safety.image(single.media.images.thumbnail, Empty.IMG_SMALL);

              return (
                <li key={`singles-popular-${single.id}`} className="board-item">
                  <a href={single.url} className="post">
                    {/*
                    <ComponentArticleThumbnail
                      mediaType={single.mediaType}
                      thumbnail={thumbnail}
                      title={single.title}
                      recommend={false}
                    />
                     */}
                    <figure className="post-thumb post-thumb-headline">
                      <img src={thumbnail} alt={single.title}/>
                      {playMark(single.mediaType)}
                    </figure>
                    {/* コンテンツ情報 */}
                    <div className="post-data">
                      <h3 className="post-heading">{single.title}</h3>
                      <ComponentCategoryLabels
                        index={index}
                        id={`single-popular-label-${single.id}`}
                        categories={single.categories.all}
                      />
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
}
