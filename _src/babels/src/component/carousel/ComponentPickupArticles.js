/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 12:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// carousel
import { ComponentPickupArticle } from './ComponentPickupArticle';

// app
import { Empty } from '../../app/const/Empty';

// data
import { Safety } from '../../data/Safety';

// ui
import { Touching } from '../../ui/Touching';

// --------------------------------------------
// library
// // Sagen
// const Sagen = self.Sagen;

// React
const React = self.React;

// --------------------------------------------
// private
// /**
//  * .pickup-NN Element を作成します
//  * @since 2016-09-19
//  * @private
//  * @static
//  * @param {ArticleDae} dae Element 作成元の JSON, ArticleDae instance
//  * @param {number} index react key に使用するユニークな index 数値
//  * @param {boolean} clone length > 1 を超えている時のみ clone を作成するので、そのためのフラッグ
//  * @param {boolean} home home（一面）か否かの真偽値
//  * @return {?XML} カルーセル1記事コンテナを返します
//  */
// const makeArticle = (dae, index, clone, home) => {
//   const large = Safety.image(dae.media.images.large, Empty.IMG_LARGE);
//   // console.log('makeArticle', dae, dae.date, typeof dae.date);
//   // HeadlineDom instance を使い render
//   // iteration key は index を使う
//   // コンテナを 前後に clone するため article.id が使えない
//   if (clone) {
//     return (
//       <ComponentPickupArticle
//         key={`pickup-${index}`}
//         index={index}
//         id={String(dae.id)}
//         slug={dae.categories.slug}
//         categories={dae.categories.all}
//         url={dae.url}
//         date={dae.displayDate}
//         title={dae.title}
//         large={large}
//         commentsCount={dae.commentsCount}
//         mediaType={dae.mediaType}
//         home={home}
//       />
//     );
//   } else {
//     return null;
//   }
// };

/**
 * ul.pickup-slider コンテナを作成し<br>
 * カルーセルコンテンツを表示します
 *
 * sp はスワイプが可能です
 *
 * 前後が見切れる仕様に対応するため前後にコピーを作成しオリジナルを挟みます
 * ```
 *  |copy|original|copy|
 * ```
 */
export class ComponentPickupArticles extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  list: Array<ArticleDae>,
   *  sp: boolean,
   *  home: boolean,
   *  next: Function,
   *  prev: Function,
   *  play: Function,
   *  pause: Function
   * }} React props
   */
  static get propTypes() {
    return {
      // articles 配列を元にDomを作成する
      list: React.PropTypes.array.isRequired,
      sp: React.PropTypes.bool.isRequired,
      home: React.PropTypes.bool.isRequired,
      next: React.PropTypes.func.isRequired,
      prev: React.PropTypes.func.isRequired,
      play: React.PropTypes.func.isRequired,
      pause: React.PropTypes.func.isRequired,
      length: React.PropTypes.func.isRequired,
      // 現在 スライドNo.
      // @since 2017-03-28
      position: React.PropTypes.number.isRequired
    };
  }
  /**
   * .pickup-NN Element を作成します
   * @since 2016-09-19
   * @param {ArticleDae} dae Element 作成元の JSON, ArticleDae instance
   * @param {number} index react key に使用するユニークな index 数値
   * @param {boolean} clone length > 1 を超えている時のみ clone を作成するので、そのためのフラッグ
   * @param {boolean} home home（一面）か否かの真偽値
   * @param {number} position 現在のスライドNo.
   * @return {?XML} カルーセル1記事コンテナを返します
   */
  static makeArticle = (dae, index, clone, home, position) => {
    const large = Safety.image(dae.media.images.large, Empty.IMG_LARGE);
    // console.log('makeArticle', dae, dae.date, typeof dae.date);
    // HeadlineDom instance を使い render
    // iteration key は index を使う
    // コンテナを 前後に clone するため article.id が使えない
    if (clone) {
      return (
        <ComponentPickupArticle
          key={`pickup-${index}`}
          index={index}
          id={String(dae.id)}
          slug={dae.categories.slug}
          categories={dae.categories.all}
          url={dae.url}
          date={dae.displayDate}
          title={dae.title}
          large={large}
          commentsCount={dae.commentsCount}
          mediaType={dae.mediaType}
          home={home}
          position={position}
        />
      );
    } else {
      return null;
    }
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * React property を設定します
   *
   * スワイプ関連イベントハンドラなど変数を初期化します
   * @param {Object} props React props プロパティー {@link ComponentPickupArticles.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * state option
     * @override
     * @type {{style: {}}}
     */
    this.state = {
      style: {}
    };

    /**
     * drag 移動量(px)
     * @type {number}
     */
    this.dragging = 0;
    /**
     * スライドを next / prev 移動時に drag で設定した style を遅延し削除するための timeOut ID
     * @type {number}
     */
    this.timer = 0;
    /**
     * bind 済み touchStart
     * @type {function}
     */
    this.boundStart = this.touchStart.bind(this);
    /**
     * bind 済み touchMove
     * @type {function}
     */
    this.boundMove = this.touchMove.bind(this);
    /**
     * bind 済み touchEnd
     * @type {function}
     */
    this.boundEnd = this.touchEnd.bind(this);
    /**
     * bind 済み touchCancel
     * @type {function}
     */
    this.boundCancel = this.touchCancel.bind(this);
    /**
     * Touching instance, swipe 実装に使用します<br>
     * scroll を可能にしつつ side swipe(drag) を実現します
     * @type {?Touching}
     */
    this.touching = null;
    // ---------------------------------
    // refs
    /**
     * ul.pickup-slider Element
     * @type {?Element}
     */
    this.pickupSlider = null;
    /**
     * component state
     * - position {number} - slide position
     * @type {{position: number}}
     * @since 2017-03-28 JS control
     */
    this.state = {
      position: props.position
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // --------------------------------------------
  /**
   * pickupSlider > li length を親コンテナに通知します
   */
  dispatchLength() {
    const items = this.pickupSlider.getElementsByTagName('li');
    // if (items.length === 1) {
    //   // 親コンテナに slider 数の正確な値を
    //   this.props.length(1);
    // } else {
    //   this.props.length(items.length / 3);
    // }
    // 親コンテナに slider 数の正確な値を通知します
    this.props.length(items.length);
  }
  // --------------------------------------------
  // swipe
  /**
   * スワイプ関連のイベントを bind します
   */
  prepareSwipe() {
    // const refsPickup = this.refs.pickupSlider;
    const refsPickup = this.pickupSlider;
    // 存在チェック
    if (!refsPickup) {
      return;
    }

    // touchmove 中の `preventDefault` を Touching で行わない
    const touching = new Touching(refsPickup, false, 1);
    this.touching = touching;
    touching.on(Touching.START, this.boundStart);
    touching.init();
  }
  /**
   * Touching.START event handler<br>
   * スワイプ用変数を初期化し move, end, cancel event を bind します
   *
   * - Touching.MOVE
   * - Touching.END
   * - Touching.CANCEL
   */
  touchStart() {
    this.dragging = 0;
    this.setState({ style: {} });
    clearTimeout(this.timer);

    const touching = this.touching;
    touching.on(Touching.MOVE, this.boundMove);
    touching.on(Touching.END, this.boundEnd);
    touching.on(Touching.CANCEL, this.boundCancel);
  }
  /**
   * Touching.MOVE event handler
   *
   * scrolling プロパティから scroll 処理をするかを決定します
   *
   * between.x から drag 処理を行うかを決定します
   * @param {TouchingEvents} events Touching.MOVE event object
   * @return {boolean} touchmove で scroll を行うときは true を返します
   */
  touchMove(events) {
    // scroll している判定
    if (events.scrolling) {
      return true;
    }

    // touch event をキャンセルし drag 準備に入ります
    // events.origin.preventDefault();
    this.props.pause();

    this.dragging += events.between.x;
    this.drag(this.dragging);

    return false;
  }
  /**
   * Touching.END event handler
   *
   * scrolling プロパティから scroll 処理をするかを決定します
   *
   * between.x から drag 処理を行うかを決定します
   * @return {boolean} touchmove で scroll を行うときは true を返します
   */
  touchEnd() {
    const absX = Math.abs(this.dragging);
    const movable = !!absX;
    this.dispose();

    if (!movable) {
      this.reset();
      return true;
    }

    // touch event をキャンセルし drag 準備に入ります
    // events.origin.preventDefault();
    this.props.pause();

    // x 方向閾値 50 未満の時は元の位置に戻す
    if (absX < 10) {
      // 元に戻す
      this.reset();
    } else {
      // x の方向から next / prev 判定後にスライドを動かす
      this.move(this.dragging);
    }

    return false;
  }

  /**
   * Touching.CANCEL event handler
   *
   * スワイプ変数を初期化するため reset を実行します
   */
  touchCancel() {
    this.reset();
  }
  /**
   * ドラッグ処理を行います<br>
   * setStyle を実行し inline style を更新します
   * @param {number} x ドラッグする x(px)値
   */
  drag(x) {
    // カルーセルアニメーションは translateX で動かしています
    // 計算を簡略化するためドラッグは left を使用します
    const style = { left: `${x}px`, transitionDuration: '0s' };
    this.setState({ style });
  }
  /**
   * Touching.END の後スライドをどちらに動かすかを判定します
   *
   * - 正: prev
   * - 負: next
   *
   * @param {number} x 正・負 で prev / next を判定します
   */
  move(x) {
    this.dragging = 0;
    // かくつく（一瞬戻る）を制御するために 0px へ transition する <- CSS animation `sp/module/_motion_slider.scss`
    this.setState({ style: { left: '0px' } });

    if (x > 0) {
      // <- drag: prev
      this.props.prev();
    } else if (x < 0) {
      // -> drag: next
      this.props.next();
    }
  }
  /**
   * スワイプ用変数を初期化します<br>
   * `this.dispose` を実行します
   */
  reset() {
    this.dispose();
    this.props.play();
    this.setState({ style: {} });
    this.dragging = 0;
  }
  /**
   * bind した event handler, move, end cancel を unbind します
   */
  dispose() {
    const touching = this.touching;
    touching.off(Touching.MOVE, this.boundMove);
    touching.off(Touching.END, this.boundEnd);
    touching.off(Touching.CANCEL, this.boundCancel);
  }
  // --------------------------------------------
  /**
   * carousel 用記事データ複製を作成します
   * @param {boolean} needClone 複製が必要かフラッグ, true: 複製必要
   * @param {number} count 記事番号
   * @param {Array<ArticleDae>} list 記事配列
   * @param {number} index 記事配列添字
   * @return {?XML} .pickup-NN Element(ComponentPickupArticle) を作成します
   */
  makeClone(needClone, count, list, index) {
    if (!needClone) {
      return null;
    }
    return ComponentPickupArticles.makeArticle(list[index], count, true, this.props.home);
  }
  // --------------------------------------------
  // delegate
  /**
   * SP のみマウント後にスライドが1枚以上ならスワイプできるように準備します
   */
  componentDidMount() {
    // length が 2 以上なら
    if (this.props.list.length > 1) {
      // sp 端末のみスワイプ準備
      if (this.props.sp) {
        this.prepareSwipe();
      }
    }
    // 親コンテナに slider 数の正確な値を通知します
    this.dispatchLength();
  }
  /**
   * property 変更をキャチし `state` を変更するかを決定します
   * - nextProps.position が 0 以上 - 循環アニメーションのために負数(index)を使用することがある
   * - 現在ポシションと次プロパティ・ポジションが違うと変更する
   * @param {Object} nextProps 更新されたプロパティ
   * @since 2017-03-28 JS control
   */
  componentWillReceiveProps(nextProps) {
    const position = nextProps.position;
    // console.log('ComponentPickupArticles.componentWillReceiveProps', position, this.state.position);
    if (position >= 0 && position !== this.state.position) {
      this.setState({ position });
    }
  }
  /**
   * ul.pickup-slider を作成します<br>
   * 循環スライドのためにクローンコンテナを作成します
   * @return {XML} カルーセル・コンテナを返します
   */
  render() {
    const list = this.props.list;
    const needClone = list.length > 1;
    const needFourth = list.length === 2;
    const home = this.props.home;
    const position = this.state.position;
    // let count = 0;
    return (
      <ul
        className="pickup-slider"
        id="js-pickup-slider"
        ref={(element) => {
          this.pickupSlider = element;
        }}
        style={this.state.style}
      >
        {
          // clone previous - fourth
          list.map((article, index) => ComponentPickupArticles.makeArticle(article, 10000 + index, needFourth, home, position))
        }
        {
          // clone previous
          list.map((article, index) => ComponentPickupArticles.makeArticle(article, 1000 + index, needClone, home, position))
        }
        {
          // 1.first
          list.map((article, index) => ComponentPickupArticles.makeArticle(article, index, true, home, position))
        }
        {
          // clone post
          list.map((article, index) => ComponentPickupArticles.makeArticle(article, 2000 + index, needClone, home, position))
        }
        {
          // clone post - fourth
          list.map((article, index) => ComponentPickupArticles.makeArticle(article, 20000 + index, needFourth, home, position))
        }
      </ul>
    );
  }
}
