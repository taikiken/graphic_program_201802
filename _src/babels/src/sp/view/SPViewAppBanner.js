/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/08 - 18:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
// import { Url } from '../../app/const/Url';

// net
import { Cookie } from '../../net/Cookie';

// util
import { Scroll } from '../../util/Scroll';

// Sagen
/**
 * ref: global object - Sagen
 * @type {Sagen}
 * @private
 */
const Sagen = self.Sagen;

// // React
// const React = self.React;
// const ReactDOM = self.ReactDOM;

// /**
//  * アプリダウンロードの動線を改善 #1009
//  *
//  * グノシーみたいなアプリバナーを SP の時のみに
//  * @see https://github.com/undotsushin/undotsushin/issues/1009
//  */
// export class SPViewAppBanner extends React.Component {
//   /**
//    * default  property を保存します
//    * @param {Object} props initialState を設定する Object, show / hide を設定します
//    */
//   constructor(props) {
//     super(props);
//     /**
//      * default property
//      * @type {{show: boolean}}
//      */
//     this.state = { show: props.show };
//     /**
//      * bind ずみ onClose event handler<br>
//      * div.header-appbnr-btn-close click に使用します
//      * @type {Function}
//      */
//     this.boundClose = this.onClose.bind(this);
//     // /**
//     //  * bind ずみ Scroll.SCROLL event handler<br>
//     //  * scroll を監視し header-sticky を fixed にするか relative にするかを決めます
//     //  * @type {Function}
//     //  */
//     // this.boundScroll = this.onScroll.bind(this);
//     /**
//      * Scroll instance
//      * @type {Scroll}
//      */
//     this.scroll = Scroll.factory();
//     // scroll 監視開始
//     this.activate();
//   }
//   /**
//    * div.header-appbnr-btn-close click event handler
//    * @param {Event} event div.header-appbnr-btn-close click event
//    */
//   onClose(event) {
//     event.preventDefault();
//     this.updateShow(false);
//     this.dispose();
//   }
//   /**
//    * state.show を変更します
//    * @param {boolean} show show state value
//    */
//   updateShow(show) {
//     // state が同じだったら処理しない
//     if (this.state.show === show) {
//       return;
//     }
//
//     if (!show) {
//       // 1 week cookie save
//       // ***開発時コメントにします**
//       Cookie.save('1', Cookie.APP_BANNER, new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)));
//       SPViewAppBanner.free();
//     } else {
//       // 表示されたらスクロール監視を始める
//       this.activate();
//     }
//     // state update
//     this.setState({ show });
//   }
//   /**
//    * Scroll.SCROLL 監視を開始します
//    */
//   activate() {
//     this.dispose();
//
//     const scroll = this.scroll;
//     scroll.on(Scroll.SCROLL, SPViewAppBanner.onScroll);
//     scroll.start();
//   }
//   /**
//    * Scroll.SCROLL 監視を止めます
//    */
//   dispose() {
//     this.scroll.off(Scroll.SCROLL, SPViewAppBanner.onScroll);
//   }
//   /**
//    * unmount 時に dispose します
//    */
//   componentWillUnmount() {
//     this.dispose();
//   }
//   /**
//    * JSX を render します
//    * @return {?XML} render 結果を返します。非表示時には null を返します
//    */
//   render() {
//     if (!this.state.show) {
//       return null;
//     }
//
//     return (
//       <div className="header-appbnr">
//         <div className="header-appbnr-btn-close" onClick={this.boundClose}><span>閉じる</span></div>
//         <a className="header-appbnr-link" href={Url.appBanner()} target="_blank">
//           <img src="/assets/sp/images/common/header-app-bnr.png" alt="話題のスポーツコンテンツが満載！スポーツブルアプリをダウンロード"/>
//         </a>
//       </div>
//     );
//   }
//   // ---------------------------------------------------
//   //  STATIC METHOD
//   // ---------------------------------------------------
//   /**
//    * Scroll.SCROLL event handler
//    * @param {Object} events Scroll.SCROLL event Object
//    * @since 2-16-09-30 static へ変更
//    */
//   static onScroll(events) {
//     if (events.y >= 85) {
//       SPViewAppBanner.visible(false);
//     } else {
//       SPViewAppBanner.visible(true);
//     }
//   }
//   /**
//    * document.body に `.appbnr-invisible` を追加・削除します
//    * @param {boolean} view true の時に `.appbnr-invisible` を削除します
//    */
//   static visible(view:boolean = false) {
//     if (view) {
//       Sagen.Dom.removeClass(document.body, 'appbnr-invisible');
//     } else {
//       Sagen.Dom.addClass(document.body, 'appbnr-invisible');
//     }
//   }
//   /**
//    * document.body へ `.appbnr-enable` を追加します
//    */
//   static enable() {
//     Sagen.Dom.addClass(document.body, 'appbnr-enable');
//   }
//   /**
//    * document.body から `.appbnr-enable` を削除します
//    */
//   static free() {
//     Sagen.Dom.removeClass(document.body, 'appbnr-enable');
//   }
//   /**
//    * Cookie.APP_BANNER が無い時 SPViewAppBanner を render しマウントします
//    * @param {Element} element render root Element
//    * @param {boolean} [visible=false] render root Element
//    * @return {Boolean} mount すると true を返します
//    */
//   static init(element, visible = false):Boolean {
//     const has = Cookie.has(Cookie.APP_BANNER);
//     if (!has) {
//       SPViewAppBanner.enable();
//       ReactDOM.render(<SPViewAppBanner show={visible} />, element);
//       return true;
//     }
//
//     SPViewAppBanner.free();
//     return false;
//   }
// }
//
// // property
// /**
//  * プロパティ
//  * @static
//  * @type {{show: boolean}}
//  */
// SPViewAppBanner.propTypes = {
//   show: React.PropTypes.bool
// };
//
// // default property
// /**
//  * デフォルトプロパティ
//  * @static
//  * @type {{show: boolean}}
//  */
// SPViewAppBanner.defaultProps = {
//   show: false
// };

// ------------------------------------------------------------------
// 仕様変更により大幅に書換える
// node を template に書く
// ```
// <!-- /531683568/sp_header_app -->
// <script>
//   googletag.cmd.push(function() {
//   googletag.defineSlot('/531683568/sp_header_app', [270, 70], 'div-gpt-ad-1494939700357-0').addService(googletag.pubads());
//   googletag.pubads().enableSingleRequest();
//   googletag.enableServices();
// });
// </script>
// <div id='div-gpt-ad-1494939700357-0' style='height:70px; width:270px;'>
//   <script>
//   googletag.cmd.push(function() { googletag.display('div-gpt-ad-1494939700357-0'); });
// </script>
// </div>
// <!-- // /531683568/sp_header_app -->
// ```
// @see https://github.com/undotsushin/undotsushin/issues/1906#issuecomment-301979040
// @since 2017-05-17

/**
 * アプリダウンロードの動線を改善 #1009
 *
 * グノシーみたいなアプリバナーを SP の時のみに
 *
 * 仕様変更により大幅に書換える - node を react から template に移動<br>
 * `/app/templates/mobile/_header.php` - line 194
 * ```
 * <div id="js-header-appbnr-container">
 *  <div class="header-appbnr">
 *    <div class="header-appbnr-btn-close"><span>閉じる</span></div>
 *      <div class="header-appbnr-link">
 *      <!-- /531683568/sp_header_app -->
 *      <script>
 *        googletag.cmd.push(function() {
 *          googletag.defineSlot('/531683568/sp_header_app', [270, 70], 'div-gpt-ad-1494939700357-0').addService(googletag.pubads());
 *          googletag.pubads().enableSingleRequest();
 *          googletag.enableServices();
 *        });
 *      </script>
 *      <div id='div-gpt-ad-1494939700357-0' style='height:70px; width:270px;'>
 *        <script>
 *          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1494939700357-0'); });
 *        </script>
 *      </div>
 *    <!-- // /531683568/sp_header_app -->
 *    </div><!-- /.header-appbnr-link -->
 *  </div><!-- /.header-appbnr -->
 * </div>
 * ```
 * @see https://github.com/undotsushin/undotsushin/issues/1009
 * @since 2017-05-17
 */
class AppBanner {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * Scroll.SCROLL event handler
   * @param {Object} events Scroll.SCROLL event Object
   * @see https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-332087234
   * @since 2-16-09-30 static へ変更
   * @since 2017-09-26 banner - height: 85 -> 70 変更
   */
  static onScroll(events) {
    // if (events.y >= 85) {
    // @since 2017-09-26
    //
    if (events.y >= 70) {
      AppBanner.visible(false);
    } else {
      AppBanner.visible(true);
    }
  }
  /**
   * document.body に `.appbnr-invisible` を追加・削除します
   * @param {boolean} view true の時に `.appbnr-invisible` を削除します
   */
  static visible(view = false) {
    if (view) {
      Sagen.Dom.removeClass(document.body, 'appbnr-invisible');
    } else {
      Sagen.Dom.addClass(document.body, 'appbnr-invisible');
    }
  }
  /**
   * document.body へ `.appbnr-enable` を追加します
   */
  static enable() {
    Sagen.Dom.addClass(document.body, 'appbnr-enable');
  }
  /**
   * document.body から `.appbnr-enable` を削除します
   */
  static free() {
    Sagen.Dom.removeClass(document.body, 'appbnr-enable');
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(element, show) {
    this.element = element;
    this.onClose = this.onClose.bind(this);
    /**
     * default property
     * @type {{show: boolean}}
     */
    this.state = { show };
    /**
     * Scroll instance
     * @type {Scroll}
     */
    this.scroll = Scroll.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  init() {
    // scroll 監視開始
    this.activate();
    // this.element.addEventListener('click', this.onClose, false);
  }
  /**
   * div.header-appbnr-btn-close click event handler
   * @param {Event} event div.header-appbnr-btn-close click event
   */
  onClose(event) {
    event.preventDefault();
    this.updateShow(false);
    this.dispose();
  }
  /**
   * state.show を変更します
   * @param {boolean} show show state value
   */
  updateShow(show) {
    // state が同じだったら処理しない
    if (this.state.show === show) {
      return;
    }

    if (!show) {
      // 1 week cookie save
      // ***開発時コメントにします**
      Cookie.save('1', Cookie.APP_BANNER, new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)));
      // console.log('Cookie', Cookie.APP_BANNER, Cookie.get(Cookie.APP_BANNER));
      AppBanner.free();
    } else {
      // 表示されたらスクロール監視を始める
      this.activate();
    }
    // state update
    this.state.show = show;
  }
  /**
   * Scroll.SCROLL 監視を開始します
   */
  activate() {
    this.dispose();

    const scroll = this.scroll;
    scroll.on(Scroll.SCROLL, AppBanner.onScroll);
    scroll.start();
  }
  /**
   * Scroll.SCROLL 監視を止めます
   */
  dispose() {
    this.scroll.off(Scroll.SCROLL, AppBanner.onScroll);
    this.element.removeEventListener('click', this.onClose);
  }
}

/**
 * アプリダウンロードの動線を改善 #1009,
 * グノシーみたいなアプリバナーを SP の時のみに
 *
 * 仕様変更により実装を inner class {@link AppBanner} へ移行しました
 *
 * 実行互換のために {@link SPViewAppBanner.init} のみ残し他は削除しました
 * @since 2017-05-17
 */
export class SPViewAppBanner {
  /**
   * {@link Cookie.APP_BANNER} が無い時 SPViewAppBanner を render しマウントします
   * @param {Element} element div#js-header-appbnr-container
   * @param {boolean} [visible=false] render root Element
   * @return {boolean} mount すると true を返します
   */
  static init(element, visible = false) {
    // cookie check 止める
    // @since 2017-09-25
    const has = false;// Cookie.has(Cookie.APP_BANNER);
    if (!has && visible) {
      AppBanner.enable();
      const banner = new AppBanner(element, visible);
      banner.init();
      return true;
    }
    // cookie あり または visible: false
    AppBanner.free();
    return false;
  }
}
