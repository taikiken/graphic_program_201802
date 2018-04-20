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

// // node
// import { CategoryLabelNode } from '../../../node/category/CategoryLabelNode';

// view
import View from '../../../view/View';

// component
import ComponentArticleThumbnail from '../../../component/articles/ComponentArticleThumbnail';

// dara
import { Safety } from '../../../data/Safety';

// sp/view/articles
import SPComponentArticleAd from './SPComponentArticleAd';
import ComponentCategoryLabels from '../../../component/categories/ComponentCategoryLabels';
import { CategoriesSlugDae } from '../../../dae/categories/CategoriesSlugDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * home と isREcommend flag が true の時に `recommend` 表示します
 * @param {boolean} isRecommend recommend flag
 * @param {boolean} home home flag
 * @return {?XML} `i.post-label_recommend`
 */
export const SPComponentRecommend = ({ isRecommend, home }) => {
  if (!isRecommend || !home) {
    return null;
  }
  return (
    <i className="post-label_recommend">
      {Message.LABEL_RECOMMEND}
    </i>
  );
};

/**
 * React.propTypes
 * @type {{isRecommend: boolean, home: boolean}}
 */
SPComponentRecommend.propTypes = {
  isRecommend: React.PropTypes.bool.isRequired,
  home: React.PropTypes.bool.isRequired,
};

/**
 * 新着記事 in SPORTS BULL
 *
 * design 変更に伴う構造変更 旧: {@link SPArchiveNode}
 * @since 2016-09-21
 */
export default class SPComponentArticles extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{list: Array<ArticleDae>, offset: number, length: number, action: Object, callback: Function, boundMore: Function, home: boolean, adSp: string}} React props
   */
  static get propTypes() {
    return {
      // @type {Array<ArticleDae>}
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
      // adSp: React.PropTypes.string.isRequired,
      // adSp: React.PropTypes.instanceOf(CategoriesSlugDae).isRequired,
      adSp: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.instanceOf(CategoriesSlugDae),
      ]).isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentArticles.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{list: Array<ArticleDae>, offset: number, length: number}}
     */
    this.state = {
      list: props.list,
      offset: props.offset,
      length: props.length
    };
    // console.log('SPComponentArticles props', props);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
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
  /**
   * delegate - before props update
   * @param {{list: Array.<ArticleDae>, offset: number, length: number}} nextProps React next props
   */
  componentWillReceiveProps(nextProps) {
    const { list, offset, length } = nextProps;
    if (list || offset !== this.state.offset || length !== this.state.length) {
      this.setState({ list, offset, length });
      this.props.boundMore(this.props.action.hasNext());
    }
  }
  /**
  /**
   * `headline` コンテンツを出力します
   * @return {?XML} headline` コンテンツを返します
   */
  render() {
    // const props = this.props;
    // const state = this.state;
    // const list = state.list;
    // const length = list.length;
    const { list } = this.state;
    const length = list.length;
    if (length === 0) {
      return null;
    }
    const { home, adSp } = this.props;
    const adId = adSp.ad ? adSp.ad.sp : adSp;

    return(
      <div className="latest">
        {/*
        // 2017-12-18 トルツメ
        <div className="latest-heading">
          <h2 className="latest-heading-title">{Message.LATEST_TITLE}</h2>
        </div>
        */}
        <div className="board">
          {
            list.map((dae, i) => {
              const thumbnail = Safety.image(dae.media.images.medium, Empty.IMG_MIDDLE);
              // let recommend = null;
              // if (dae.isRecommend && props.home) {
              //   recommend = <i className="post-label_recommend">{Message.LABEL_RECOMMEND}</i>;
              // }
              // const recommend = (dae.isRecommend && home) ?
              //   <i className="post-label_recommend">{Message.LABEL_RECOMMEND}</i> :
              //   null;
              // const slug = dae.categories.slug || 'x';
              /*
               @since 2016-12-26
               design 変更に伴い
               CategoryLabelNode へ追加
               mediaType={dae.mediaType}
               recommend={dae.isRecommend && this.props.home}

               sp は recommend 位置が PC と元々異なっていたので今回の変更から除外、
               recommend: false 固定にし対応します
               */
              return (
                <div key={`latest-${dae.id}`} className={`latest-line latest-line-${i}`}>
                  <div key={`latest-${dae.id}`} className="board-item">
                    <a href={dae.url} className="post">
                      <ComponentArticleThumbnail
                        mediaType={dae.mediaType}
                        thumbnail={thumbnail}
                        title={dae.title}
                        recommend={false}
                        small={true}
                      />
                      <div className="post-data">
                        <h3 className="post-heading">{dae.title}</h3>
                        {/* recommend */}
                        {/*
                        <p className={`post-category post-category-${slug}`}>
                          <CategoryLabelNode
                            categories={dae.categories.all}
                            id={`archive-label-${dae.id}`}
                            index={i}
                            mediaType={dae.mediaType}
                            recommend={false}
                            anotherCategories={dae.anotherCategories}
                          />
                        </p>
                        */}
                        <SPComponentRecommend
                          isRecommend={dae.isRecommend}
                          home={home}
                        />
                        <ComponentCategoryLabels
                          categories={dae.categories.all}
                          id={`archive-label-${dae.id}`}
                          index={i}
                          mediaType={dae.mediaType}
                          recommend={false}
                          anotherCategories={dae.anotherCategories}
                        />
                        <p className="post-date">{dae.displayDate}</p>
                      </div>
                    </a>
                  </div>
                  <SPComponentArticleAd
                    index={i}
                    length={length}
                    uniqueId={`ad-${dae.mediaType}-${dae.id}`}
                    adSp={adId || ''}
                    categories={dae.categories}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
