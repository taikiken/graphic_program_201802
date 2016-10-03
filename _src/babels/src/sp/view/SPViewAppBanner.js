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
import { Url } from '../../app/const/Url';

// net
import { Cookie } from '../../net/Cookie';

// util
import { Scroll } from '../../util/Scroll';

// Sagen
const Sagen = self.Sagen;

// React
const React = self.React;
const ReactDOM = self.ReactDOM;

/**
 * アプリダウンロードの動線を改善 #1009
 *
 * グノシーみたいなアプリバナーを SP の時のみに
 * @see https://github.com/undotsushin/undotsushin/issues/1009
 */
export class SPViewAppBanner extends React.Component {
  /**
   * default  property を保存します
   * @param {Object} props initialState を設定する Object, show / hide を設定します
   */
  constructor(props) {
    super(props);
    /**
     * default property
     * @type {{show: boolean}}
     */
    this.state = { show: props.show };
    /**
     * bind ずみ onClose event handler<br>
     * div.header-appbnr-btn-close click に使用します
     * @type {Function}
     */
    this.boundClose = this.onClose.bind(this);
    // /**
    //  * bind ずみ Scroll.SCROLL event handler<br>
    //  * scroll を監視し header-sticky を fixed にするか relative にするかを決めます
    //  * @type {Function}
    //  */
    // this.boundScroll = this.onScroll.bind(this);
    /**
     * Scroll instance
     * @type {Scroll}
     */
    this.scroll = Scroll.factory();
    // scroll 監視開始
    this.activate();
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
      SPViewAppBanner.free();
    } else {
      // 表示されたらスクロール監視を始める
      this.activate();
    }
    // state update
    this.setState({ show });
  }
  /**
   * Scroll.SCROLL 監視を開始します
   */
  activate() {
    this.dispose();

    const scroll = this.scroll;
    scroll.on(Scroll.SCROLL, SPViewAppBanner.onScroll);
    scroll.start();
  }
  /**
   * Scroll.SCROLL 監視を止めます
   */
  dispose() {
    this.scroll.off(Scroll.SCROLL, SPViewAppBanner.onScroll);
  }
  /**
   * unmount 時に dispose します
   */
  componentWillUnmount() {
    this.dispose();
  }
  /**
   * JSX を render します
   * @return {?XML} render 結果を返します。非表示時には null を返します
   */
  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <div className="header-appbnr">
        <div className="header-appbnr-btn-close" onClick={this.boundClose}><span>閉じる</span></div>
        <a className="header-appbnr-link" href={Url.appBanner()} target="_blank">
          <img src="/assets/sp/images/common/header-app-bnr.png" alt="話題のスポーツコンテンツが満載！スポーツブルアプリをダウンロード"/>
        </a>
      </div>
    );
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * Scroll.SCROLL event handler
   * @param {Object} events Scroll.SCROLL event Object
   * @since 2-16-09-30 static へ変更
   */
  static onScroll(events) {
    if (events.y >= 85) {
      SPViewAppBanner.visible(false);
    } else {
      SPViewAppBanner.visible(true);
    }
  }
  /**
   * document.body に `.appbnr-invisible` を追加・削除します
   * @param {boolean} view true の時に `.appbnr-invisible` を削除します
   */
  static visible(view:boolean = false) {
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
  /**
   * Cookie.APP_BANNER が無い時 SPViewAppBanner を render しマウントします
   * @param {Element} element render root Element
   * @param {boolean} [visible=false] render root Element
   * @return {Boolean} mount すると true を返します
   */
  static init(element, visible = false):Boolean {
    const has = Cookie.has(Cookie.APP_BANNER);
    if (!has) {
      SPViewAppBanner.enable();
      ReactDOM.render(<SPViewAppBanner show={visible} />, element);
      return true;
    }

    SPViewAppBanner.free();
    return false;
  }
}

// property
/**
 * プロパティ
 * @static
 * @type {{show: boolean}}
 */
SPViewAppBanner.propTypes = {
  show: React.PropTypes.bool
};

// default property
/**
 * デフォルトプロパティ
 * @static
 * @type {{show: boolean}}
 */
SPViewAppBanner.defaultProps = {
  show: false
};