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
// import { Message } from '../../../app/const/Message';

// sp/node
// import { SPMediaNode } from '../../node/single/SPMediaNode';

// node
import { BookmarkNode } from '../../../node/bookmark/BookmarkNode';

// component
import { ComponentCategoryLabelsLink } from '../../../component/categories/ComponentCategoryLabelsLink';

// sp/component.singles
import { SPComponentSinglesArticleMedia } from '../singles/SPComponentSinglesArticleMedia';

// ui
import { Hit } from '../../../ui/Hit';

// view
// import { ViewSingle } from '../../../view/ViewSingle';

import { Ga } from '../../../ga/Ga';

// --------------------
// @since 2016-10-17
// singles
import { SinglesHistory } from '../../../singles/SinglesHistory';

// singles/head
import { Page } from '../../../singles/head/Page';

// snap
import { Snap } from '../../../ui/Snap';

// sp/ui
import { SPSnap } from '../../ui/SPSnap';

// --------------------

// from desktop
// import { ComponentSinglesArticleExcerpt } from '../../../component/singles-magnet/ComponentSinglesArticleExcerpt';

// sp/component/singles-magnet
import { SPComponentSInglesArticleSwitch } from './SPComponentSInglesArticleSwitch';

// React
const React = self.React;

/**
 * SP: 記事詳細「次の記事」一覧を出力します
 *
 * - その場で記事本文を閲覧できるようにする
 * - マグネティック・スクロール
 * - History API で url, title, meta 書換る
 * - SNS, 共有できるようにする
 *
 * 記事詳細・次の記事一覧の記事は <- 記事詳細と同等内容にする
 *
 * SPComponentSinglesArticle {@link SPComponentSinglesArticle} を拡張し<br>
 * スナップ(Snap) {@link Snap} を行うようにします
 *
 * コンテナが画面内に現れたら ga 送信を行います {@link Ga.single}
 *
 * @see https://github.com/undotsushin/undotsushin/issues/1201
 * @see https://github.com/undotsushin/undotsushin/issues/1224
 * @since 2016-11-10
 */
export class SPComponentSinglesArticleMagnet extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * - @type {SingleDae} single - 記事データ
   * - @type {boolean} sign - ログイン済みユーザーフラッグ, true: ログイン済み
   * - @type {number} index - 次の記事一覧・記事表示順序
   * @return {{single: SingleDae, sign: boolean, index: number}} React props
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
      sign: props.sign,
      index: props.index
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
    this.sended = false;
    // ---
    /**
     * SPA のための管理クラス
     * @type {SinglesHistory}
     * @since 2016-10-27
     */
    this.manager = SinglesHistory.factory();
    /**
     * ページ情報書換えデータを `SingleDae` から生成します
     * {@link SingleDae}
     * {@link Page}
     * @type {Page}
     * @since 2016-10-27
     */
    this.page = new Page(props.single);
    /**
     * div.loaded-post 次の記事一覧の「記事」
     * @type {?XML} div.loaded-post
     * @default null
     * @since 2016-10-28
     */
    this.singlesArticle = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます, scroll 位置での Ga tag 送信準備を始めます
   * */
  componentDidMount() {
    if (this.hit === null && this.singlesArticle !== null) {
      // snap
      const snap = new SPSnap(this.singlesArticle, false, this.page);
      snap.on(Snap.SNAPPED, this.onSnap.bind(this));
      snap.on(Snap.BEAT_UP, this.onBeat.bind(this));
      snap.init();
      // -- [hit]
      const hit = new Hit(this.singlesArticle);
      this.hit = hit;
      hit.on(Hit.COLLISION, this.boundHit);
      hit.start();
    }
  }
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
   * @ToDo 不要かも
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
    const rect = events.rect;
    const top = rect.top;

    // 近接 50px 以内で ga 送信します
    if (Math.abs(top) <= 50) {
      this.ga();
    }
  }
  /**
   * ga 送信
   * @since 2016-10-28 関数を分ける
   */
  ga() {
    if (this.sended) {
      return;
    }
    // @since 2016-10-05
    this.sended = true;
    // send
    const single = this.state.single;
    Ga.single(single, 'SPComponentSinglesArticle.onHit');
    // ---------------------
    // https://github.com/undotsushin/undotsushin/issues/1151
    Ga.addPage(single.id, 'SPComponentSinglesArticle.onHit');
    // ---------------------
    this.dispose();
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
  // --------------------------------------------------
  // snap scroll
  /**
   * Snap.SNAPPED event handler
   */
  onSnap() {
    console.log('onSnap', this.page.url());
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
  }
  /**
   * scroll up 時に element bottom が window.height 半分を通過したら呼び出されます
   */
  onBeat() {
    console.log('onBeat', this.page.url());
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
  }
  // --------------------------------------------------
  // render
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
      <div className={`loaded-post loaded-post-${single.id}`} ref={
        (component) => {
          this.singlesArticle = component;
        }}
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
            />

            <p className="post-date">{single.displayDate}</p>
            <BookmarkNode
              sign={this.state.sign}
              isBookmarked={single.isBookmarked}
              articleId={String(single.id)}
            />
          </div>
          {/* 本文 */}
          <SPComponentSInglesArticleSwitch
            single={single}
            sign={this.state.sign}
            index={this.state.index}
          />
        </div>
      </div>
    );
  }
}
