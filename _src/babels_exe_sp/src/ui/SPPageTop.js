/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 18:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// UT
const UT = self.UT;
const Dom = UT.app.Dom;

const TweenLite = self.TweenLite;
const easing = self.com.greensock.easing;

/**
 * page top に戻る
 */
export default class SPPageTop {
  /**
   * page top に戻る motion
   */
  constructor() {
    /**
     * <p>bind 済み this.onComplete<br>ページトップへ戻るアニメーション完了を listener します</p>
     * @type {Function}
     * @private
     */
    this._boundComplete = this.onComplete.bind( this );
    /**
     * click 不可管理フラッグ
     * @type {boolean}
     * @private
     * @default true;
     */
    this._can = true;
    /**
     * bond onClick  - page top button bind
     * @type {function(this:SPPageTop)}
     * @since 2017-10-23
     */
    this.onClick = this.onClick.bind(this);
  }
  /**
   * click event を bind します
   */
  init() {
    const element = Dom.pageTop();
    // resposive 残骸で pageTop が 2 Element 存在することがある
    // #js-page_top を sp は優先にする
    // @since 2017-10-23
    const pagetop = Dom.jsPageTop();
    // console.log('SPPageTop.init', element, pagetop);
    if (element !== null) {
      const container = pagetop || element;
      // console.log('SPPageTop.init container', container);
      container.addEventListener('click', this.onClick, false);
    }
  }
  /**
   * <p>element click event handler</p>
   * <p>click 管理フラッグが true ならフラッグを false にし<br>ページの上部(offsetY: 0)へ戻すアニメーションを開始します</p>
   *
   * @param {Event} event native event, click event
   */
  onClick(event) {
    event.preventDefault();
    // console.log('SPPageTop.onClick', this._can);
    // click 不可のときは処理しない
    if ( !this._can ) {
      return;
    }

    // const complete = this._boundComplete;
    this._can = false;

    // scrolling
    TweenLite.to(
      window,
      0.5,
      {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        // easing
        ease: easing.Power4.easeInOut,
        onComplete: () => {
          this._can = true;
        },
      }
    );
  }
  /**
   * <p>page top motion complete<br>
   * click 管理フラッグを true にします</p>
   * */
  onComplete() {
    this._can = true;
  }
  /**
   * PageTop instance を作成し init 関数をコールします
   */
  static start() {
    const pageTop = new SPPageTop();
    pageTop.init();
  }
}
