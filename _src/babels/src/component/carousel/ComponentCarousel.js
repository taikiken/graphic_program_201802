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
import { ComponentPagers } from './ComponentPagers';
import { ComponentPickupArticles } from './ComponentPickupArticles';

// view
import { View } from '../../view/View';

// tick
import { Polling } from '../../tick/Polling';

// event
import { CarouselStatus } from '../../event/CarouselStatus';

// --------------------------------------------
// library
// Sagen
const Sagen = self.Sagen;

// Gasane
// const Polling = self.Gasane.Polling;

// React
const React = self.React;

// --------------------------------------------
// private
const direction = (length, boundPrev, boundNext) => {
  if (length < 2) {
    return null;
  }

  return (
    <div className="direction">
      <a id="prev" className="direction-prev" href="#prev" onClick={boundPrev}>Prev</a>
      <a id="next" className="direction-next" href="#next" onClick={boundNext}>Next</a>
    </div>
  );
};

/**
 * pickup コンテナ「カルーセル」スライドショーを実装します
 * ```
 * <ComponentCarousel/>
 *    <ComponentPickupSlider/>
 *      <ComponentCarouselArticle/>
 *    <ComponentPagers/>
 *      <ComponentPager/>
 * ```
 * @since 2016-09-15
 */
export class ComponentCarousel extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  list: Array<ArticleDae>,
   *  callback: Function,
   *  polling: Polling,
   *  index: number
   * }} React props
   */
  static get propTypes() {
    return {
      // articles 配列を元にDomを作成する
      list: React.PropTypes.array.isRequired,
      callback: React.PropTypes.func.isRequired,
      polling: React.PropTypes.object.isRequired,
      index: React.PropTypes.number,
      sp: React.PropTypes.bool,
      home: React.PropTypes.bool
    };
  }
  /**
   * defaultProps
   * @return {{index: number, sp: boolean, home: boolean}} React props
   */
  static get defaultProps() {
    return {
      index: 0,
      sp: Sagen.Browser.Mobile.phone(),
      home: false
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー<br>
   *  {{list: Array<Element>, callback: Function}} を保持します {@link ComponentCarousel.propTypes}
   */
  constructor(props) {
    super(props);
    // ----------------------------------------
    // test code
    // props.list.shift();
    // props.list.shift();
    // props.list.shift();
    // props.list.shift();
    // console.log('ComponentCarousel.test', props.list.length);
    // ----------------------------------------

    let length = props.list.length;
    if (length === 2) {
      // 2 件の時は3件に見立ててみる
      length = 3;
    }
    // sp: 100%, pc: 640px
    this.left = props.sp ? 100 : 640;
    this.unit = props.sp ? '%' : 'px';
    /**
     * state option
     * @override
     * @type {{index: number}}
     */
    this.state = {
      index: props.index,
      style: {},
      length: length,
      // slider 位置を動かす css value - transform: translateX();
      transform: ''
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
    this.boundUpdate = this.update.bind(this);
    /**
     * bind 済み onNext
     * @type {function}
     */
    this.boundNext = this.onNext.bind(this);
    /**
     * bind 済み onPrev
     * @type {function}
     */
    this.boundPrev = this.onPrev.bind(this);
    /**
     * bind 済み onPagerClick
     * @type {function}
     */
    this.boundPager = this.onPagerClick.bind(this);
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
    this.bindNext = this.next.bind(this);
    /**
     * bind 済み prev
     * @type {Function}
     */
    this.bindPrev = this.prev.bind(this);
    /**
     * bind 済み play
     * @type {Function}
     */
    this.bindPlay = this.play.bind(this);
    /**
     * bind 済み pause
     * @type {Function}
     */
    this.bindPause = this.pause.bind(this);
    /**
     * bind 済み updateLength, スライド数の通知を受けます
     * @type {Function}
     */
    this.bindLength = this.updateLength.bind(this);
    this.status = CarouselStatus.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // --------------------------------------------
  // carousel
  /**
   * slider 数を確定させます<br>
   * list の中に重複データが入っていることがあり `list.length` が使用できないために<br>
   * `ComponentPickupSlider` マウント後通知を受けます
   * @param {number} length slider 数
   */
  updateLength(length) {
    this.setState({ length });
  }
  /**
   * Polling.UPDATE event を bind しアニメーションを開始します
   */
  play() {
    this.pause();
    const polling = this.polling;
    polling.on(Polling.UPDATE, this.boundUpdate);
    polling.start();
  }
  /**
   * Polling.UPDATE event を unbind しアニメーションを停止します
   */
  pause() {
    const polling = this.polling;
    polling.off(Polling.UPDATE, this.boundUpdate);
    polling.stop();
  }
  /**
   * Polling.UPDATE event handler<br>
   * 一定間隔で呼び出され<br>
   * カルーセルスライドを次のスライドに切替ます
   */
  update() {
    this.next();
  }
  /**
   * next button click event handler, `this.update` を呼び出します
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
    // console.log('ComponentCarousel.jump index', index);
    // --------------
    // 循環アニメーションのために
    // if (index === 0) {
    if (index < 0) {
      // 先頭に戻る
      if (position === last) {
        // 現在がラストだったらアニメーションなしで移動させる
        // console.log('ComponentCarousel last to 999');
        this.setState({ index: 999 });
        this.delay(index);
      } else {
        // 通常移動
        this.setup(index);
      }
    } else if (index === last) {
      // 最終に戻る
      if (position === 0) {
        // 現在が先頭だったらアニメーションなしで移動させる
        // console.log('ComponentCarousel 0 to 1999');
        this.setState({ index: 1999 });
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
  // lastToFirst() {
  //
  // }
  // firstToLast() {
  //
  // }
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
   * `this.setState({ index })` を実行しスライド移動を完了します<br>
   * `this.jump` で一時停止を解除し再開します
   * @param {number} index スライドナンバー
   */
  setup(index) {
    // 現在のスライドナンバーをアップデートします
    this.position = index;
    // state update でスライド移動を完了します
    this.setState({ index });
    // polling 再開
    this.play();
    // スライドナンバー通知
    // @since 2017-03-28
    console.log('ComponentCarousel.setup index', index);
    this.status.position(index);
  }
  /**
   * ページャークリック・コールバックハンドラです<br>
   * 子コンポーネント ComponentPagers > ComponentPager からコールバックです
   * @param {string|number} index ページャーより通知された移動すべきスライドナンバー
   */
  onPagerClick(index) {
    // 文字列が返される(innerHTML)かもなので数値に型変換します
    this.jump(parseInt(index, 10));
  }
  transform(index = 0) {
    return { transform: `translateX(${(-this.left * index) - this.left}${this.unit})` };
  }
  // --------------------------------------------
  // delegate
  /**
   * delegate method, マウントした時にコールされます
   *
   * `View.DID_MOUNT` をコールバックに通知し、カルーセルアニメーションを開始します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
    // length が 1 以上なら
    // test mode, 以下 comment
    if (this.props.list.length > 1) {
      // animation start
      this.play();
      this.status.position(0);
    }
  }
  /**
   * list プロパティ（配列）の length が 0 以上の時にコンテナを出力します
   * @return {?XML} カルーセル・コンテナを返します
   */
  render() {
    const list = this.props.list;
    if (list.length === 0) {
      // データがない時は表示しない
      return null;
    }
    // JSX
    return (
      <div className="hero-sec">
        <div className={`hero-slider pickup-container pickup-slider-length-${list.length} slide-${this.state.index}`}>
          {/* slider */}
          <div className="hero-slider-inner">
            <div className="pickup-slider-wrapper" style={this.transform(this.state.index)}>
              <ComponentPickupArticles
                list={list}
                sp={this.props.sp}
                home={this.props.home}
                next={this.bindNext}
                prev={this.bindPrev}x
                play={this.bindPlay}
                pause={this.bindPause}
                length={this.bindLength}
              />
            </div>
          </div>
          <div className="hero-slider-control">
            {/* prev / next */}
            {direction(list.length, this.boundPrev, this.boundNext)}
            {/* pagers */}
            <ComponentPagers
              list={list}
              onPager={this.boundPager}
              sp={this.props.sp}
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
