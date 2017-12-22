/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/20 - 15:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Ad } from '../../app/const/Ad';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 一面以外の headline ad
 *
 * <pre>
 * ヘッドライン最下部に広告が設定できる
 * response.headline.ad の該当製品の値でアドジェネ広告を差し込む、この値がなければ広告は表示しない
 * </pre>
 * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
 *
 * @since 2016-09-20
 *
 * */
export default class ComponentHeadlineAd extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes`
   * @return {{browser: string, ad: HeadlineAdDae, category: CategoriesSlugDae}} React props
   */
  static get propTypes() {
    return {
      browser: React.PropTypes.string.isRequired,
      ad: React.PropTypes.object.isRequired,
      // @since 2017-03-28
      category: React.PropTypes.object
    };
  }
  /**
   * default props - 後方互換のために標準を空 Object にします
   * @return {{category: {}}} default props
   */
  static get defaultProps() {
    return {
      category: {}
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {{browser: string, ad: HeadlineAdDae}} props プロパティ
   * {@link ComponentHeadlineAd.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * div.sponsor-link 広告タグ挿入 Element
     * @type {?Element}
     */
    this.sponsorLink = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // ------------------------------------
  /**
   * big6tv を除外するために特定します
   * <pre>
   * 六大学 / 広告表示 調整（Web） #1546
   * > アドネットワーク関連の広告（ネイティブアド？）を消したい
   * </pre>
   * @return {boolean} true: big6tv
   * @see https://github.com/undotsushin/undotsushin/issues/1546
   * @since 2017-03-15
   */
  isBig6Tv() {
    const category = this.props.category;
    return category.slug === 'big6tv';
  }
  /**
   * アドジェネ広告 `script` tag を作成し wrapper div に `appendChild` します<br>
   * さらに div.sponsor-link へ `appendChild` します
   * @param {string} path アドジェネ広告パス
   */
  script(path) {
    if (this.sponsorLink) {
      const div = document.createElement('div');
      const script = document.createElement('script');
      script.src = path;
      div.appendChild(script);
      this.sponsorLink.appendChild(div);
    }
  }
  /**
   * sp: アドジェネ広告を差し込む、この値がなければ広告は表示しない
   */
  sp() {
    // big6tv は広告非表示
    if (this.isBig6Tv()) {
      return;
    }
    const id = this.props.ad.sp;
    if (!id) {
      return;
    }

    this.script(`${Ad.host()}/sdk/js/adg-script-loader.js?id=${id}&targetID=adg_${id}&displayid=2&adType=INFEED&async=true&tagver=2.0.0`);
  }
  /**
   * pc: アドジェネ広告を差し込む、この値がなければ広告は表示しない
   */
  pc() {
    // big6tv は広告非表示
    if (this.isBig6Tv()) {
      return;
    }
    const id = this.props.ad.pc;
    if (!id) {
      return;
    }

    this.script(`${Ad.host()}/sdk/js/adg-script-loader.js?id=${id}&targetID=adg_${id}&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0`);
  }
  // ------
  // delegate
  /**
   * div.sponsor-link マウント後に「アドジェネ広告」タグを作成します
   */
  componentDidMount() {
    switch (this.props.browser) {
      case 'sp': {
        this.sp();
        break;
      }
      case 'pc':
      default: {
        this.pc();
        break;
      }
    }
  }
  /**
   * アドジェネ広告を作成します
   * @return {?XML} アドジェネ広告を返す, 無い時は null を返します
   */
  render() {
    switch (this.props.browser) {
      case 'sp': {
        if (!this.props.ad.sp) {
          return null;
        }
        break;
      }
      case 'pc':
      default: {
        if (!this.props.ad.pc) {
          return null;
        }
        break;
      }
    }

    return (
      <div
        className="sponsor-link"
        ref={(component) => {
          this.sponsorLink = component;
        }}
      />
    );
  }
}
