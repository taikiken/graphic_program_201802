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
    console.log('SPViewAppBanner', props);
    /**
     * default property
     * @property
     * @type {{show: boolean}}
     */
    this.state = { show: props.show };
    // /**
    //  * bind ずみ onClose event handler<br>
    //  * div.header-appbnr-btn-close click に使用します
    //  * @property
    //  * @type {Function}
    //  */
    // this.boundClose = this.onClose.bind(this);
  }
  /**
   * div.header-appbnr-btn-close click event handler
   * @param {Event} event div.header-appbnr-btn-close click event
   */
  onClose(event) {
    event.preventDefault();
    console.log('onClose', event);
    this.updateShow(false);
  }
  /**
   * state.show を変更します
   * @param {boolean} show show state value
   */
  updateShow(show) {
    if (!show) {
      // 1 week cookie save
      // ***開発時コメントにします**
      // Cookie.save('1', Cookie.APP_BANNER, new Date(Date.now() * (1000 * 60 * 60 * 24 * 7)));
      Sagen.Dom.removeClass(document.body, 'appbnr-enable');
    }
    // state update
    this.setState({ show });
  }
  /**
   * JSX を render します
   * @return {?*} render 結果を返します。非表示時には null を返します
   */
  render() {
    console.log('render', this.state.show);
    if (!this.state.show) {
      return null;
    }

    return (
      <div className="header-appbnr">
        <div className="header-appbnr-btn-close" onClick={this.onClose.bind(this)}><span>閉じる</span></div>
        <a className="header-appbnr-link" href={Url.appBanner()} target="_blank">
          <img src="/assets/sp/images/common/header-app-bnr.png" alt="運動通信をアプリでサクサク楽しむ！アプリ版ダウンロード"/>
        </a>
      </div>
    );
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * Cookie.APP_BANNER が無い時 SPViewAppBanner を render しマウントします
   * @param {Element} element render root Element
   * @param {boolean} [visible=false] render root Element
   * @return {boolean} mount すると true を返します
   */
  static init(element, visible = false):boolean {
    const has = Cookie.has(Cookie.APP_BANNER);
    if (!has) {
      ReactDOM.render(<SPViewAppBanner show={visible} />, element);
      return true;
    }

    return false;
  }
}

// property
SPViewAppBanner.propTypes = {
  show: React.PropTypes.bool
};
// default property
SPViewAppBanner.defaultProps = {
  show: false
};
