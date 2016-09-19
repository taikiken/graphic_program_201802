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
import { ViewPagers } from './ViewPagers';
import { ViewPickupSlider } from './ViewPickupSlider';

// view
import { View } from '../View';

// --------------------------------------------
// library
// Sagen
const Sagen = self.Sagen;

// Gasane
const Polling = self.Gasane.Polling;

// React
const React = self.React;

/**
 * pickup コンテナ「カルーセル」スライドショーを実装します
 * ```
 * <ViewCarousel/>
 *    <ViewPickupSlider/>
 *      <ViewCarouselArticle/>
 *    <ViewPagers/>
 *      <ViewPager/>
 * ```
 * @since 2016-09-15
 */
export class ViewCarousel extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー<br>
   *  {{list: Array<Element>, callback: Function}} を保持します {@link ViewCarousel.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * state option
     * @override
     * @type {{index: number}}
     */
    this.state = {
      index: props.index,
      style: {}
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
    this.last = props.list.length - 1;
    /**
     * スライドの現在ナンバー
     * @type {number}
     */
    this.position = props.index;

    this.bindNext = this.next.bind(this);
    this.bindPrev = this.prev.bind(this);
    this.bindPlay = this.play.bind(this);
    this.bindPause = this.pause.bind(this);
  }
  /**
   * list プロパティ（配列）の length が 0 以上の時にコンテナを出力します
   * @return {?XML} カルーセル・コンテナを返します
   */
  render() {
    const list = this.props.list;
    // const needClone = list.length > 1;
    // let count = 0;

    // return null;
    if (list.length > 0) {
      // JSX
      return (
        <div className="hero-sec">
          <div className={`hero-slider pickup-container slide-${this.state.index}`}>
            {/* slider */}
            <div className="hero-slider-inner">
              <ViewPickupSlider
                list={list}
                sp={this.props.sp}
                home={this.props.home}
                next={this.bindNext}
                prev={this.bindPrev}
                play={this.bindPlay}
                pause={this.bindPause}
              />
            </div>
            <div className="hero-slider-control">
              {/* prev / next */}
              <div className="direction">
                <a id="prev" className="direction-prev" href="#prev" onClick={this.boundPrev}>Prev</a>
                <a id="next" className="direction-next" href="#next" onClick={this.boundNext}>Next</a>
              </div>
              {/* pagers */}
              <div className="pager">
                <ViewPagers
                  list={list}
                  offset={list.length}
                  onPager={this.boundPager}
                  sp={this.props.sp}
                />
              </div>
              {/* hero-slider-control */}
            </div>
            {/* .hero-slider */}
          </div>
          {/* #hero-sec */}
        </div>
      );
    } else {
      // データがない時は表示しない
      return null;
    }
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
    if (this.props.list.length > 1) {
      // animation start
      this.play();
    }
  }
  // --------------------------------------------
  // carousel
  /**
   * Polling.PAST event を bind しアニメーションを開始します
   */
  play() {
    this.pause();
    const polling = this.polling;
    polling.on(Polling.PAST, this.boundUpdate);
    polling.start();
  }
  /**
   * Polling.PAST event を unbind しアニメーションを停止します
   */
  pause() {
    const polling = this.polling;
    polling.off(Polling.PAST, this.boundUpdate);
    polling.stop();
  }
  /**
   * Polling.PAST event handler<br>
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
  next() {
    // count up します
    let index = this.position + 1;
    // last を超えたら 0 に戻す
    if (index > this.last) {
      index = 0;
    }
    // change slide
    this.jump(index);
  }
  prev() {
    // count down
    let index = this.position - 1;
    // 0 未満になったら last へ戻す
    if (index < 0) {
      index = this.last;
    }
    // change slide
    this.jump( index );
  }
  nextNext() {
    // count up します
    let index = this.position + 2;
    // last を超えたら 0 に戻す
    if (index > this.last) {
      index = this.last - index - 1;
    }
    // change slide
    this.jump( index );
  }
  prevPrev() {
    // count down
    let index = this.position - 2;
    // 0 未満になったら last へ戻す
    if (index < 0) {
      index = this.last + index + 1;
    }
    // change slide
    this.jump( index );
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
    // --------------
    // 循環アニメーションのために
    if (index === 0) {
      // 先頭に戻る
      if (position === last) {
        // 現在がラストだったらアニメーションなしで移動させる
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
  }
  /**
   * ページャークリック・コールバックハンドラです<br>
   * 子コンポーネント ViewPagers > ViewPager からコールバックです
   * @param {string|number} index ページャーより通知された移動すべきスライドナンバー
   */
  onPagerClick(index) {
    // 文字列が返される(innerHTML)かもなので数値に型変換します
    this.jump(parseInt(index, 10));
  }
}

// property
/**
 * this.props type を設定します, React の PropTypes をプロパティに設定します
 * @static
 * @type {{
 *  list: Array<ArticleDae>,
 *  callback: Function,
 *  polling: Polling,
 *  index: number
 * }}
 */
ViewCarousel.propTypes = {
  // articles 配列を元にDomを作成する
  list: React.PropTypes.array.isRequired,
  callback: React.PropTypes.func.isRequired,
  polling: React.PropTypes.object.isRequired,
  index: React.PropTypes.number,
  sp: React.PropTypes.bool,
  home: React.PropTypes.bool
};

/**
 * デフォルト・プロパティ, home を false 設定します
 * @static
 * @type {{index: number, sp: boolean, home: boolean}}
 */
ViewCarousel.defaultProps = {
  index: 0,
  sp: Sagen.Browser.Mobile.phone(),
  home: false
};
