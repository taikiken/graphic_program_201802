/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/28 - 16:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../../app/const/Message';

// sp/node
// import { SPMediaNode } from '../../node/single/SPMediaNode';

// node
import { BookmarkNode } from '../../../node/bookmark/BookmarkNode';

// component
import ComponentCategoryLabelsLink from '../../../component/categories/ComponentCategoryLabelsLink';

// sp/component.singles
import { SPComponentSinglesArticleMedia } from './SPComponentSinglesArticleMedia';

// ui
import Hit from '../../../ui/Hit';

// util
import { PageTitle } from '../../../util/PageTitle';

// view
// import ViewSingle from '../../../view/ViewSingle';

import { Ga } from '../../../ga/Ga';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP: 記事詳細「次の記事」一覧を出力します
 * @since 2016-09-28
 */
export class SPComponentSinglesArticle extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @return {{single: SingleDae, sign: boolean, index: number}} React.propTypes
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentSinglesArticle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{single: SingleDae, sign: boolean}}
     * */
    this.state = {
      single: props.single,
      sign: props.sign
    };

    /**
     * Hit instance
     * @type {?Hit}
     */
    this.hit = null;
    /**
     * bind 済み onHit, Hit.COLLISION event handler
     * @type {function}
     */
    this.boundHit = this.onHit.bind(this);
    /**
     * Ga tag 送信済みフラッグ
     * @type {boolean}
     * @default false
     */
    this.sendGa = false;
    /**
     * `div,loaded-post`
     * @type {?Element}
     */
    this.singlesArticle = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * state.single 情報を更新し再描画します
   * @param {SingleDae} single state.single
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * state.sign 情報を更新し再描画します
   * @param {boolean} sign state.sign
   */
  updateSign(sign) {
    this.setState({ sign });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * - 不要かも
   */
  reload() {
    this.updateSingle(this.state.single);
  }
  // --------------------------------------------------
  /**
   * Hit.COLLISION event handler
   * @param {Object} events Hit.COLLISION event object
   */
  onHit(events) {
    if (this.sendGa) {
      return;
    }

    const rect = events.rect;
    const top = rect.top;

    if (Math.abs(top) <= 50) {
      this.sendGa = true;
      // ViewSingle.ga(this.state.single);
      // @since 2016-10-05
      const single = this.state.single;
      // 遅延実行させるために第三引数 delay: true 追加します
      // @since 2016-11-14
      Ga.single(single, `SPComponentSinglesArticle.onHit single: ${single.id}`);
      // ---------------------
      // https://github.com/undotsushin/undotsushin/issues/1151
      // @since  2016-11-15 title added
      const page = new PageTitle(single.title, single.categories.label);
      Ga.addPage(single.id, `SPComponentSinglesArticle.onHit addPage: ${single.id}`, page.title());
      // ---------------------
      this.dispose();
    }
  }
  /**
   * Hit.COLLISION event handler を unbind します
   */
  dispose() {
    const hit = this.hit;
    if (hit !== null) {
      hit.off(Hit.COLLISION, this.boundHit);
    }
  }
  /**
   * delegate, マウント後に呼び出されます, scroll 位置での Ga tag 送信準備を始めます
   * */
  componentDidMount() {
    const singlesArticle = this.singlesArticle;
    if (this.hit === null && singlesArticle) {
      const hit = new Hit(singlesArticle);
      this.hit = hit;
      hit.on(Hit.COLLISION, this.boundHit);
      hit.start();
    }
  }
  /**
   * `div.loaded-post` を出力します
   * @return {?XML} `div.loaded-post` or null を返します
   * */
  render() {
    const single = this.state.single;

    if (!single) {
      return null;
    }

    return (
      <div
        className={`loaded-post loaded-post-${single.id}`}
        ref={(element) => (this.singlesArticle = element)}
      >
        {/* div.post-kv */}
        <div className="single-visual-container" ref="visualElement">
          {/*
          <SPMediaNode
            articleId={String(single.id)}
            mediaType={single.mediaType}
            media={single.media}
            isShowImage={single.isShowImage}
          />
          */}
          <SPComponentSinglesArticleMedia
            single={single}
          />
        </div>
        <div className="post-detail">
          {/* title */}
          <div className={`post-heading post-heading-${single.id}`}>
            <h1>{single.title}</h1>
          </div>
          {/* コンテンツ情報 */}
          <div className="post-data">
            <p className="post-author">{single.user.userName}</p>

            <ComponentCategoryLabelsLink
              index={this.props.index}
              id={`single-label-${single.id}`}
              categories={single.categories.all}
              anotherCategories={single.anotherCategories}
            />

            <p className="post-date">{single.displayDate}</p>
            <BookmarkNode
              sign={this.state.sign}
              isBookmarked={single.isBookmarked}
              articleId={String(single.id)}
            />
          </div>
          {/* 本文 */}
          <div className="post-content">
            <p>{single.description}</p>
          </div>
          {/* link */}
          <div className="post-content-read-more">
            <a href={single.url} className="post-content-btn-readMore">{Message.READ_MORE}</a>
          </div>
        </div>
      </div>
    );
  }
}
