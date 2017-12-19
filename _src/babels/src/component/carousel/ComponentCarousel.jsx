/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/13 - 21:18
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// carousel
import ComponentPagers from './ComponentPagers';
import ComponentPickupArticles from './ComponentPickupArticles';

// view
import View from '../../view/View';

// tick
import { Polling } from '../../tick/Polling';
import { ArticleDae } from '../../dae/ArticleDae';

// --------------------------------------------
// library
// // Sagen
// /**
//  * [library] - Sagen
//  */
// const Sagen = self.Sagen;

// React
/**
 * [library] - React
 */
const React = self.React;

// const document = self.document;

/**
 * {@link ComponentCarousel} - next / prev container
 * - length が 1 以下の時は表示しません
 * - sp 表示しません
 * @param {boolean} sp sp flag
 * @param {number} length carousel 総数
 * @param {function} prev prev handler
 * @param {function} next next handler
 * @returns {?XML} `div.direction`
 * @since 2017-12-18 component
 */
const ComponentCarouselDirection = ({ sp, length, prev, next }) => {
  console.log('ComponentCarouselDirection sp', sp, length);
  if (sp || length <= 1) {
    return null;
  }
  return (
    <div className="direction">
      <a id="prev" className="direction-prev" href="#prev" onClick={prev}>Prev</a>
      <a id="next" className="direction-next" href="#next" onClick={next}>Next</a>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{
 *   sp: boolean,
 *   length: number,
 *   prev: function,
 *   next: function
 * }}
 */
ComponentCarouselDirection.propTypes = {
  sp: React.PropTypes.bool.isRequired,
  length: React.PropTypes.number.isRequired,
  prev: React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
};

/**
 * pickup コンテナ「カルーセル」スライドショーを実装します
 * ```
 * <ComponentCarousel/>
 *    <ComponentPickupArticles/>
 *      <ComponentPickupArticle/>
 *    <ComponentPagers/>
 *      <ComponentPager/>
 * ```
 * - 本クラス `ComponentCarousel` がコントローラーとして機能します
 * - {@link ComponentPickupArticles} が `swipe` 管理を行います
 * @since 2016-09-15
 */
export default class ComponentCarousel extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * - list: pickup articles 配列を元に carousel Dom を作成します
   * - safely: View.DID_MOUNT を通知するコールバック関数
   * - polling: interval 管理をします
   * - index: slider 初期値, [default=0]
   * - sp: Sagen.Browser.Mobile.phone 真偽値, true: スマホ
   * - home: true: home（トップページ）, carousel が全ての一覧記事に設置されトップページと微妙に用件が違うためのフラッグ
   * @return {{
   *  list: Array<ArticleDae>,
   *  safely: Function,
   *  polling: Polling,
   *  index: number
   * }} React props
   */
  static get propTypes() {
    return {
      // @type {Array<ArticleDae>} - pickup articles 配列を元に carousel Dom を作成します
      // list: React.PropTypes.array.isRequired,
      list: React.PropTypes.arrayOf(
        React.PropTypes.instanceOf(ArticleDae).isRequired,
      ).isRequired,
      // @type {function} - View.DID_MOUNT を通知するコールバック関数
      safely: React.PropTypes.func.isRequired,
      // @type {Polling} - interval 管理をします
      polling: React.PropTypes.object.isRequired,
      // @type {number} - [index=0] slider 初期値
      index: React.PropTypes.number.isRequired,
      // @type {boolean} - Sagen.Browser.Mobile.phone 真偽値, true: スマホ
      sp: React.PropTypes.bool.isRequired,
      // @type {boolean} - true: home（トップページ）, carousel が全ての一覧記事に設置されたため
      home: React.PropTypes.bool.isRequired,
    };
  }
  // /**
  //  * defaultProps
  //  * @return {{index: number, sp: boolean, home: boolean}} React props
  //  */
  // static get defaultProps() {
  //   return {
  //     index: 0,
  //     // sp: Sagen.Browser.Mobile.phone(),
  //     home: false
  //   };
  // }
  // /**
  //  * prev / next button container を作成します<br>
  //  * length が 1 以下の時は表示しません
  //  * @param {number} length スライド総数
  //  * @param {Function} onPrev bind 済み onPrev
  //  * @param {Function} onNext bind 済み onNext
  //  * @return {?XML} div.direction or null を返します
  //  */
  // static direction(length, onPrev, onNext) {
  //   if (length <= 1) {
  //     return null;
  //   }
  //
  //   return (
  //     <div className="direction">
  //       <a id="prev" className="direction-prev" href="#prev" onClick={onPrev}>Prev</a>
  //       <a id="next" className="direction-next" href="#next" onClick={onNext}>Next</a>
  //     </div>
  //   );
  // }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー<br>
   *  {{list: Array<Element>, safely: Function}} を保持します {@link ComponentCarousel.propTypes}
   */
  constructor(props) {
    super(props);
    // ----------------------------------------
    // test code - 減産
    // props.list.shift();
    // props.list.shift();
    // props.list.shift();
    // props.list.shift();
    // ===
    // props.list.push(props.list[0]);
    // props.list.push(props.list[1]);
    // props.list.push(props.list[2]);
    // props.list.push(props.list[3]);
    // props.list.push(props.list[4]);
    //
    // props.list.push(props.list[0]);
    // props.list.push(props.list[1]);
    // props.list.push(props.list[2]);
    // props.list.push(props.list[3]);
    // props.list.push(props.list[4]);
    //
    // props.list.push(props.list[0]);
    // props.list.push(props.list[1]);
    // props.list.push(props.list[2]);
    // props.list.push(props.list[3]);
    // props.list.push(props.list[4]);
    //
    // props.list.push(props.list[0]);
    // props.list.push(props.list[1]);
    // props.list.push(props.list[2]);
    // props.list.push(props.list[3]);
    // props.list.push(props.list[4]);
    //
    // props.list.push(props.list[0]);
    // props.list.push(props.list[1]);
    // props.list.push(props.list[2]);
    // props.list.push(props.list[3]);
    // props.list.push(props.list[4]);
    //
    // props.list.push(props.list[0]);
    // props.list.push(props.list[1]);
    // props.list.push(props.list[2]);
    // props.list.push(props.list[3]);
    // props.list.push(props.list[4]);
    // console.log('ComponentCarousel.test', props.list.length);
    // ----------------------------------------

    let length = props.list.length;
    if (length === 2) {
      // 2 件の時は4件としてコード運用する - 循環アニメーション実現のため
      length = 4;
    }
    // const length = props.list.length;
    /**
     * slide の総数
     * @type {number}
     * @since 2017-03-28 JS control。
     */
    this.length = length;
    // sp: 100%, pc: 640px
    /**
     * 移動量設定値, PC / SP で異なります - SP がレスポンシブ対応するため
     * - PC: 640(px) -> 540 on 2017-12-18 ref: UNDO_SPBL-281 【Web】一面のリニューアル / Web - Desktop対応
     * - SP: 280(px)
     * update 2017-12-18
     * - PC: 540px
     * - SP 100%
     * @type {number}
     */
    this.left = props.sp ? 100 : 540;
    // this.left = props.sp ? 280 : 640;
    /**
     * 移動量単位, PC / SP で異なります - SP がレスポンシブ対応するため
     * - PC: px
     * - SP: % -> px -> vw
     * @type {string}
     */
    this.unit = props.sp ? 'vw' : 'px';
    // this.unit = props.sp ? 'px' : 'px';
    /**
     * state option
     * - index - {number} スライド位置 0 ~ ...
     * - length - {number} スライド総数 - remove
     * - style - {object} スライドを動かすための CSS 設定 - remove
     * @type {{index: number}}
     */
    this.state = {
      // length,
      index: props.index,
      // style: {},
    };
    /**
     * animation するための Polling instance
     * @type {Polling}
     */
    this.polling = props.polling;
    /**
     * 最終から先頭, 先頭から最終へ戻るときに循環アニメーションのために<br>
     * アニメーション無しで移動させた後<br>
     * リフレッシュのために待機させる 1fps<br>
     * timeout id
     * @type {number}
     */
    this.timer = 0;
    /**
     * bind 済み updateNext
     * @type {function}
     */
    this.onUpdate = this.onUpdate.bind(this);
    /**
     * bind 済み onNext
     * @type {function}
     */
    this.onNext = this.onNext.bind(this);
    /**
     * bind 済み onPrev
     * @type {function}
     */
    this.onPrev = this.onPrev.bind(this);
    /**
     * bind 済み onPagerClick
     * @type {function}
     */
    this.onPagerClick = this.onPagerClick.bind(this);
    /**
     * スライドの最終ナンバー
     * @type {number}
     */
    this.last = length - 1;
    /**
     * スライドの現在ナンバー
     * @type {number}
     */
    this.position = -1;
    // this.position = props.index;
    /**
     * bind 済み next
     * @type {Function}
     */
    this.boundNext = this.next.bind(this);
    /**
     * bind 済み prev
     * @type {Function}
     */
    this.boundPrev = this.prev.bind(this);
    /**
     * bind 済み play
     * @type {Function}
     */
    this.boundPlay = this.play.bind(this);
    /**
     * bind 済み pause
     * @type {Function}
     */
    this.boundPause = this.pause.bind(this);
    /**
     * bind 済み updateLength, スライド数の通知を受けます
     * @type {Function}
     */
    this.boundLength = this.updateLength.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // --------------------------------------------
  // carousel
  /**
   * `ComponentPickupSlider` マウント後通知を受けスライダーコンテナの幅を設定します
   * @param {number} length slider 数
   */
  updateLength(length) {
    const style = document.createElement('style');
    const rule = document.createTextNode(`#js-pickup-slider{width: ${length * this.left}${this.unit};}`);
    style.media = 'screen';
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = rule.nodeValue;
    } else {
      style.appendChild(rule);
    }
    // console.log('ComponentCarousel.updateLength', length, style);
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  /**
   * Polling.UPDATE event を bind しアニメーションを開始します
   */
  play() {
    // console.log('ComponentCarousel.play', this.position);
    this.pause();
    const polling = this.polling;
    polling.on(Polling.UPDATE, this.onUpdate);
    polling.start();
  }
  /**
   * Polling.UPDATE event を unbind しアニメーションを停止します
   */
  pause() {
    const polling = this.polling;
    polling.off(Polling.UPDATE, this.onUpdate);
    polling.stop();
  }
  /**
   * Polling.UPDATE event handler
   * - 一定間隔で呼び出されます
   * - カルーセルスライドを次のスライドに切替ます
   */
  onUpdate() {
    // console.log('ComponentCarousel.onUpdate', this.position);
    this.next();
  }
  /**
   * next button click event handler, `this.next` を呼び出します
   * @param {Event} event next button click event
   */
  onNext(event) {
    event.preventDefault();
    this.next();
  }
  /**
   * prev button click event handler, 前のスライドに移動します
   * @param {Event} event prev button click event
   */
  onPrev(event) {
    event.preventDefault();
    this.prev();
  }
  /**
   * 次のスライドへ移動します
   */
  next() {
    // count up します
    let index = this.position + 1;
    // console.log('ComponentCarousel.next index', index, this.last, index > this.last);
    // last を超えたら 0 に戻す
    if (index > this.last) {
      index = 0;
    }
    // change slide
    this.jump(index);
  }
  /**
   * 前のスライドへ移動します
   */
  prev() {
    // count down
    let index = this.position - 1;
    // 0 未満になったら last へ戻す
    if (index < 0) {
      index = this.last;
    }
    // change slide
    this.jump(index);
  }
  /**
   * 指定 index スライドに移動します<br>
   * `this.pause()` し一時停止します<br>
   * スライド位置を調整し `this.setup` を実行しスライド移動を完結します
   * @param {number} index 移動するスライドナンバー
   */
  jump(index) {
    // polling 一時停止
    this.pause();

    // @type {number}
    const last = this.last;
    // @type {number}
    const position = this.position;
    // console.log('ComponentCarousel.jump index', index, position);
    // --------------
    // 循環アニメーションのために
    // if (index === 0) {
    if (index <= 0) {
      // 先頭に戻る
      if (position === last) {
        // 現在がラストだったらアニメーションなしで移動させる
        this.setState({ index: -1000 });
        // 1fps 遅延させて animation 開始
        this.delay(index);
      } else {
        // 通常移動
        this.setup(index);
      }
    } else if (index === last) {
      // 最終に戻る
      if (position === 0) {
        // 現在が先頭だったらアニメーションなしで移動させる
        this.setState({ index: -2000 });
        // 1fps 遅延させて animation 開始
        this.delay(index);
      } else {
        // 通常移動
        this.setup(index);
      }
    } else {
      // 通常移動
      this.setup(index);
    }
  }
  /**
   * 最終から先頭, 先頭から最終へ戻るときに循環アニメーションのためにアニメーション無しで移動させた後リフレッシュのために待機させる 1fps
   * @param {number} index スライドナンバー
   */
  delay(index) {
    clearTimeout(this.timer);

    // リフレッシュのために待機させる 1fps
    this.timer = setTimeout(() => this.setup(index), 25);
  }
  /**
   * `this.setState({ index })` を実行しスライド移動します<br>
   * `this.jump` で一時停止を解除し再開します
   * @param {number} index スライドナンバー
   */
  setup(index) {
    // 現在のスライドナンバーをアップデートします
    this.position = index;
    // state update でスライド移動を完了します
    this.setState({ index });
    // polling 再開
    // test mode - comment 外す
    this.play();
  }
  /**
   * ページャークリック・コールバックハンドラです<br>
   * 子コンポーネント ComponentPagers > ComponentPager からコールバックです
   * @param {string|number} index ページャーより通知された移動すべきスライドナンバー
   */
  onPagerClick(index) {
    // 文字列が返される(innerHTML)ので数値に型変換します
    this.jump(parseInt(index, 10));
  }
  /**
   * translateX CSS value を計算します - slide を動かします
   * @param {number} index 移動位置
   * @return {string} CSS transform value(translateX) を返します
   * @since 2017-03-28 JS control
   */
  translateX(index) {
    if (this.length <= 1) {
      return 'translateX(0)';
    }
    // duplicate | スライド | duplicate, なので left 方向へ負（マイナス）オフセットする
    return `translateX(${(-this.left * index) - (this.left * this.length)}${this.unit})`;
  }
  /**
   * CSS transform style を計算します
   * @param {number} index 移動位置
   * @return {Object} CSS transform + transition（必要であれば）を返します
   * @since 2017-03-28 JS control
   */
  transform(index = 0) {
    if (index === -1000) {
      return this.lastToFirst();
    } else if (index === -2000) {
      return this.firstToLast();
    }
    // CSS animation あり
    return {
      transform: this.translateX(index),
      transition: 'transform 0.5s linear'
    };
  }
  /**
   * 循環アニメーションするために CSS animation なしで移動させます<br>
   * CSS transform style を計算します - 最終から先頭へ移動するつなぎ
   * @return {{transform: string}} CSS transform(transition 無し)を返します
   * @since 2017-03-28 JS control
   */
  lastToFirst() {
    return {
      transform: this.translateX(-1)
    };
  }
  /**
   * 循環アニメーションするために CSS animation なしで移動させます<br>
   * CSS transform style を計算します - 先頭から最終へ移動するつなぎ
   * @return {{transform: string}} CSS transform(transition 無し)を返します
   * @since 2017-03-28 JS control
   */
  firstToLast() {
    return {
      transform: this.translateX(this.length)
    };
  }
  // --------------------------------------------
  // delegate
  /**
   * delegate method, マウントした時にコールされます
   *
   * `View.DID_MOUNT` をコールバックに通知し、カルーセルアニメーションを開始します
   */
  componentDidMount() {
    const { safely, list } = this.props;
    safely(View.DID_MOUNT);
    // length が 1 以上なら
    // test mode - comment 外す
    if (list.length > 1) {
      // this.setup(0);
      // this.play();
      this.jump(0);
    }
  }
  /**
   * list プロパティ（配列）の length が 0 以上の時にコンテナを出力します
   * @return {?XML} カルーセル・コンテナを返します - データがない時は null を返します
   */
  render() {
    // const list = this.props.list;
    const { list, sp, home } = this.props;
    if (list.length === 0) {
      // データがない時は表示しない
      return null;
    }
    const { index } = this.state;
    // JSX
    return (
      <div className="hero-sec">
        <div className={`hero-slider pickup-container pickup-slider-length-${list.length} slide-${index}`}>
          {/* slider */}
          <div className="hero-slider-inner">
            <div className="pickup-slider-wrapper" style={this.transform(index)}>
              <ComponentPickupArticles
                list={list}
                sp={sp}
                home={home}
                next={this.boundNext}
                prev={this.boundPrev}
                play={this.boundPlay}
                pause={this.boundPause}
                length={this.boundLength}
                position={index}
              />
            </div>
          </div>
          <div className="hero-slider-control">
            {/* prev / next */}
            {/* ComponentCarousel.direction(list.length, this.onPrev, this.onNext) */}
            <ComponentCarouselDirection
              sp={sp}
              length={list.length}
              prev={this.onPrev}
              next={this.onNext}
            />
            {/* pagers */}
            <ComponentPagers
              list={list}
              onPager={this.onPagerClick}
              sp={sp}
              position={index}
            />
            {/* hero-slider-control */}
          </div>
          {/* .hero-slider */}
        </div>
        {/* #hero-sec */}
      </div>
    );
  }
}
