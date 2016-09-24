/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/22 - 13:25
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

// node
import { CategoryLabelNode } from '../../../node/category/CategoryLabelNode';

// view
import { View } from '../../../view/View';
import { ViewArticleThumbnail } from '../../../view/articles/ViewArticleThumbnail';

// dara
import { Safety } from '../../../data/Safety';

// sp/view/articles
import { SPComponentArticleAd } from './SPComponentArticleAd';

// Ga
// import { Ga } from '../../../ga/Ga';
// import { GaData } from '../../../ga/GaData';

// React
const React = self.React;

/**
 * 新着記事 in SPORTS BULL
 *
 * design 変更に伴う構造変更 旧: {@link SPArchiveNode}
 * @since 2016-09-21
 */
export class SPComponentArticles extends React.Component {
  constructor(props) {
    super(props);
  }
  /**
   * `headline` コンテンツを出力します
   * @return {?XML} headline` コンテンツを返します
   */
  render() {
    const props = this.props;
    const list = props.list;
    const length = list.length;

    if (length === 0) {
      return null;
    }

    return(
      <div className="headline">
        <div className="headline-heading">
          <h2 className="headline-heading-title">{Message.LATEST_TITLE}</h2>
        </div>
        <div className="board">
          {
            list.map((dae, i) => {
              const thumbnail = Safety.image(dae.media.images.medium, Empty.IMG_MIDDLE);
              let recommend = null;
              if (!!dae.isRecommend && props.home) {
                recommend = <i className="post-label_recommend">{Message.LABEL_RECOMMEND}</i>;
              }
              const slug = dae.categories.slug || 'x';
              return (
                <div key={`latest-${dae.id}`} className="latest-line">
                  <div key={`latest-${dae.id}`} className="board-item">
                    <a href={dae.url} className="post">
                      <ViewArticleThumbnail
                        mediaType={dae.mediaType}
                        thumbnail={thumbnail}
                        title={dae.title}
                        recommend={false}
                      />
                      <div className="post-data">
                        <h3 className="post-heading">{dae.title}</h3>
                        {recommend}
                        <p className={`post-category post-category-${slug}`}>
                          <CategoryLabelNode
                            categories={dae.categories.all}
                            id={`archive-label-${dae.id}`}
                            index={i}
                          />
                        </p>
                        <p className="post-date">{props.date}</p>
                      </div>
                    </a>
                  </div>
                  <SPComponentArticleAd
                    index={i}
                    length={length}
                    uniqueId={`ad-${dae.mediaType}-${dae.id}`}
                    adSp={props.adSp}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
  /**
   * delegate method, マウントした時にコールされます
   *
   * `View.DID_MOUNT` をコールバックに通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
    // hasNext を元に More View button の表示非表示を決める
    this.props.boundMore(this.props.action.hasNext());
  }
  /**
   * 次の読み込みから表示を更新します
   * @param {Array} list 表示リスト
   * @param {number} offset 読み込み開始位置
   * @param {number} length 読み込み数
   */
  updateList(list, offset, length) {
    // state を変更し appendChild + isotope を行う
    this.setState({ list, offset, length });
    this.props.boundMore(this.props.action.hasNext());
  }
}
/**
 * プロパティ
 * @type {{
 *  list: array<ArticleDae>,
 *  offset: number,
 *  length: number,
 *  action: Object,
 *  callback: Function,
 *  boundMore: Function,
 *  home: boolean,
 *  adSp: string
 * }}
 */
SPComponentArticles.propTypes = {
  list: React.PropTypes.array.isRequired,
  // request offset
  offset: React.PropTypes.number.isRequired,
  // request length
  length: React.PropTypes.number.isRequired,
  // action instance
  action: React.PropTypes.object.isRequired,
  // executeSafely
  callback: React.PropTypes.func.isRequired,
  // more button
  boundMore: React.PropTypes.func.isRequired,
  // home or not
  home: React.PropTypes.bool.isRequired,
  // ストリーム広告
  adSp: React.PropTypes.string.isRequired
};
