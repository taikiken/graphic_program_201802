/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/28 - 16:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
// import { Message } from '../../app/const/Message';

// node
import { BookmarkNode } from '../../node/bookmark/BookmarkNode';
import { MediaNode } from '../../node/single/MediaNode';

// component/categories
import { ComponentCategoryLabelsLink } from '../categories/ComponentCategoryLabelsLink';

// component/singles
// import { ComponentSinglesArticleMedia } from '../singles/ComponentSinglesArticleMedia';

// since 2016-11-04
import { ComponentSinglesArticleSwitch } from './ComponentSinglesArticleSwitch';

// ui
import { Hit } from '../../ui/Hit';

// Ga
import { Ga } from '../../ga/Ga';

// --------------------
// @since 2016-10-17
// singles
import { SinglesHistory } from '../../singles/SinglesHistory';

// singles/head
import { Page } from '../../singles/head/Page';
// --------------------

// // @since 2016-10-28
// import { Scroll } from '../../util/Scroll';
// import { TopButton } from '../../ui/button/TopButton';

// util
import { PageTitle } from '../../util/PageTitle';

// snap
import { Snap } from '../../ui/Snap';

// React
const React = self.React;

/**
 * PC: 記事詳細「次の記事」一覧を出力します
 *
 * - その場で記事本文を閲覧できるようにする
 * - マグネティック・スクロール
 * - History API で url, title, meta 書換る
 * - SNS, 共有できるようにする
 *
 * 記事詳細・次の記事一覧の記事は <- 記事詳細と同等内容にする
 *
 * ComponentSinglesArticle {@link ComponentSinglesArticle} を拡張し<br>
 * スナップ(Snap) {@link Snap} を行うようにします
 *
 * コンテナが画面内に現れたら ga 送信を行います {@link Ga.single}
 *
 * 2秒以上見た記事だけ、計測イベントを送信したい に変更されたので待機機能を追加します
 * @see https://github.com/undotsushin/undotsushin/issues/1274
 * ```
 * <ComponentSinglesArticleMagnet/>
 *  <ComponentCategoryLabelsLink/>
 *  <BookmarkNode/>
 *  <MediaNode/>
 *  or
 *  <ComponentSinglesArticleMedia/>
 *  <ComponentSinglesArticleSwitch/>
 * ```
 * {@link ComponentCategoryLabelsLink},
 * {@link BookmarkNode},
 * {@link MediaNode},
 * {@link ComponentSinglesArticleMedia},
 * {@link ComponentSinglesArticleSwitch}
 *
 * @see https://github.com/undotsushin/undotsushin/issues/1201
 * @see https://github.com/undotsushin/undotsushin/issues/1224
 * @since 2016-10-28
 *
 * @since 2016-11-14 wait ga send
 */
export class ComponentSinglesArticleMagnet extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   *
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
   * @param {Object} props React props プロパティー {@link ComponentSinglesArticle.propTypes}
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
     * Hit instance, コンテナがブラウザウインドウ内に表示されているかを調べます<br>
     * ウインドウ内で top が +- 50px 以内だと Ga tag 送信します
     * @type {?Hit}
     * @default null
     */
    this.hit = null;
    /**
     * bind 済み hitIn, Hit.COLLISION event handler
     * @type {Function}
     */
    this.boundIn = this.hitIn.bind(this);
    /**
     * Ga tag 送信済みフラッグ
     * @type {boolean}
     * @default false
     */
    this.sended = false;
    // ---
    // @see https://github.com/undotsushin/undotsushin/issues/1274
    // 2秒以上見た記事だけ、計測イベントを送信したい
    // @since 2016-11-14
    /**
     * bound hitOut, Hit.NO_COLLISION event handler
     * @type {Function}
     * @since 2016-11-14
     */
    this.boundOut = this.hitOut.bind(this);
    /**
     * 送信予約フラッグ
     * @type {boolean}
     * @default false
     * @since 2016-11-14
     */
    this.waiting = false;
    /**
     * 遅延タイマーID
     * @type {number}
     * @default 0
     * @since 2016-11-14
     */
    this.timer = 0;
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
    // Hit instance を作成し監視を開始します
    if (this.hit === null && this.singlesArticle !== null) {
      // snap
      const snap = new Snap(this.singlesArticle, false, this.page);
      snap.on(Snap.SNAPPED, this.onSnap.bind(this));
      snap.on(Snap.BEAT_UP, this.onBeat.bind(this));
      snap.init();
      // -- [hit]
      const hit = new Hit(this.singlesArticle);
      this.hit = hit;
      hit.on(Hit.COLLISION, this.boundIn);
      hit.on(Hit.NO_COLLISION, this.boundOut);
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
  // hit
  /**
   * Hit.COLLISION event handler<br>
   * ウインドウ内にコンテナが表示された時に通知されます<br>
   * コンテナ top が +- 50px 以内だと Ga tag 送信「予約」します
   * @param {{
   *  rect: ClientRect,
   *  events: object,
   *  type: string
   * }} events Hit events
   */
  hitIn(events) {
    const rect = events.rect;
    const top = rect.top;

    // 近接 50px 以内で ga 送信します
    if (Math.abs(top) <= 50) {
      // 予約します
      // @since 2016-11-14
      this.reserve();
    }
  }
  /**
   * Hit.NO_COLLISION event handler<br>
   * 遅延待機をキャンセルします
   * @since 2016-11-14
   */
  hitOut() {
    this.cancel();
  }
  /**
   * 2秒後に ga 送信する予約を行います
   * @since 2016-11-14
   */
  reserve() {
    if (this.sended || this.waiting) {
      return;
    }
    this.waiting = true;
    this.timer = setTimeout(() => {
      this.ga();
    }, 1000 * 2);
  }
  /**
   * 表示されなくなったので ga 送信をキャンセルします
   * @since 2016-11-14
   */
  cancel() {
    if (this.sended || !this.waiting) {
      return;
    }
    clearTimeout(this.timer);
    this.waiting = false;
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
    Ga.single(single, 'ComponentSinglesArticle.ga');
    // ---------------------
    // https://github.com/undotsushin/undotsushin/issues/1151
    // @since  2016-11-15 title added
    const page = new PageTitle(single.title, single.categories.label);
    Ga.addPage(single.id, 'ComponentSinglesArticle.ga', page.title());
    // ---------------------
    this.dispose();
  }
  /**
   * Hit.COLLISION event handler を unbind します
   */
  dispose() {
    const hit = this.hit;
    if (hit !== null) {
      hit.off(Hit.COLLISION, this.boundIn);
      hit.off(Hit.NO_COLLISION, this.boundOut);
    }
  }
  // --------------------------------------------------
  // snap scroll
  /**
   * Snap.SNAPPED event handler
   */
  onSnap() {
    // console.log('onSnap', this.page.url());
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
    this.reserve();
  }
  /**
   * scroll up 時に element bottom が window.height 半分を通過したら呼び出されます
   */
  onBeat() {
    // console.log('onBeat', this.page.url());
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
  }
  // --------------------------------------------------
  // render
  /**
   * 記事詳細・次の記事一覧 > 記事を出力します
   * @return {?XML} div.loaded-post or null を返します
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
        <div className="post-detail">
          {/* header */}
          <div className="single-header-root">
            <div className={`post-heading post-heading-${single.id}`}>
              <h1>{single.title}</h1>
            </div>

            <ComponentCategoryLabelsLink
              index={this.props.index}
              id={`single-label-${single.id}`}
              categories={single.categories.all}
              className="category-heading"
            />

            <div className="post-data">
              <div className="f-left">
                <p className="post-author">{single.user.userName}</p>
                <p className="post-date">{single.displayDate}</p>
              </div>
              {/* div.f-right (bookmark: on / off) */}
              <BookmarkNode
                sign={this.state.sign}
                isBookmarked={single.isBookmarked}
                articleId={String(single.id)}
              />
            </div>
          </div>
          {/* media */}
           <MediaNode
             articleId={String(single.id)}
             mediaType={single.mediaType}
             media={single.media}
             isShowImage={single.isShowImage}
             index={this.state.index}
           />
          {/*
          <ComponentSinglesArticleMedia
            single={single}
          />
           */}
          {/* 本文 */}
          <ComponentSinglesArticleSwitch
            single={single}
            sign={this.state.sign}
            index={this.props.index}
          />
        </div>
      </div>
    );
  }
}