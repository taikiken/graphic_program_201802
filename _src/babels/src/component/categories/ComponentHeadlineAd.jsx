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
// import { HeadlineAdDae } from '../../dae/categories/HeadlineAdDae';
import { CategoriesSlugDae } from '../../dae/categories/CategoriesSlugDae';
import { AdDae } from '../../dae/theme/AdDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 一面以外の headline ad
 *
 * ```
 * ヘッドライン最下部に広告が設定できる
 * response.headline.ad の該当製品の値でアドジェネ広告を差し込む、この値がなければ広告は表示しない
 * ```
 *
 * - big6tv を除外
 * ```
 * 六大学 / 広告表示 調整（Web） #1546
 * > アドネットワーク関連の広告（ネイティブアド？）を消したい
 * ```
 * [ad] 構成変更 - [#1554](https://github.com/undotsushin/undotsushin/issues/1544#issuecomment-286534040)
 * - 記事一覧：article_list
 * - 記事詳細：article_detail
 * - ヘッドラインニュース：headline_list
 * - オススメ記事：popular_list
 * - 人気記事：reccomend_list
 * ```
 * "ad":{
 * "ios"     : "33504",
 * "android" : "34424",
 * "sp"      : "35244",
 * "pc"      : {
 *   "sidebar_top"    : "pc_sidebar_top",
 *   "sidebar_bottom" : "pc_sidebar_bottom"
 * },
 * "mobile"  : {
 *   "sp" : {
 *     "article_list"   : "35244",
 *     "article_detail" : "35245",
 *     "headline_list"  : "35244",
 *     "popular_list"   : "35244","reccomend_list" : "35244"
 *   },
 *   "ios" : {
 *     "article_list"   : "33504",
 *     "article_detail" : "33505",
 *     "headline_list"  : "33504",
 *     "popular_list"   : "33504",
 *     "reccomend_list" : "33504"
 *   },
 *   "android" : {
 *     "article_list"   : "34424",
 *     "article_detail" : "34425",
 *     "headline_list"  : "34424",
 *     "popular_list"   : "34424",
 *     "reccomend_list" : "34424"
 *   },
 *  }
 * }
 * ```
 * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
 *
 * @since 2016-09-20
 * */
export default class ComponentHeadlineAd extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes`
   * @return {{browser: string, ad: AdDae, category: CategoriesSlugDae}} React props
   */
  static get propTypes() {
    return {
      browser: React.PropTypes.string.isRequired,
      // ad: React.PropTypes.object.isRequired,
      ad: React.PropTypes.instanceOf(AdDae).isRequired,
      // @since 2017-03-28
      // category: React.PropTypes.object,
      category: React.PropTypes.instanceOf(CategoriesSlugDae),
    };
  }
  /**
   * default props - 後方互換のために標準を空 Object にします
   * @return {{category: {}}} default props
   */
  static get defaultProps() {
    return {
      category: new CategoriesSlugDae({}),
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
   * ```
   * 六大学 / 広告表示 調整（Web） #1546
   * > アドネットワーク関連の広告（ネイティブアド？）を消したい
   * ```
   * @return {boolean} true: big6tv
   * @see https://github.com/undotsushin/undotsushin/issues/1546
   * @since 2017-03-15
   */
  isBig6Tv() {
    const { category } = this.props;
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
    const { ad } = this.props;
    // console.log('ComponentHeadlineAd.sp ad', ad);
    const id = ad.mobile.sp.headline;
    if (!id) {
      return;
    }
    this.script(`${Ad.host()}/sdk/js/adg-script-loader.js?id=${id}&targetID=adg_${id}&displayid=2&adType=INFEED&async=true&tagver=2.0.0`);
  }
  /**
   * pc: アドジェネ広告を差し込む、この値がなければ広告は表示しない
   * @deprecated dont use this - pc headline 広告 API 経由でデータはこない
   */
  pc() {
    console.warn('ComponentHeadlineAd.pc deprecated - dont use this', this.props.category);
    // // big6tv は広告非表示
    // if (this.isBig6Tv()) {
    //   return;
    // }
    // const id = this.props.ad.pc;
    // // console.log('ComponentHeadlineAd.pc id', id, this.props);
    // if (!id) {
    //   return;
    // }
    //
    // this.script(`${Ad.host()}/sdk/js/adg-script-loader.js?id=${id}&targetID=adg_${id}&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0`);
  }
  // ------
  // delegate
  /**
   * div.sponsor-link マウント後に「アドジェネ広告」タグを作成します
   */
  componentDidMount() {
    // switch (this.props.browser) {
    //   case 'sp': {
    //     this.sp();
    //     break;
    //   }
    //   case 'pc':
    //   default: {
    //     this.pc();
    //     break;
    //   }
    // }
    // 2018-01-12 - sp 専用に変更する
    if (this.props.browser === 'sp') {
      this.sp();
    }
  }
  /**
   * アドジェネ広告を作成します
   * @return {?XML} アドジェネ広告を返す, 無い時は null を返します
   */
  render() {
    // switch (this.props.browser) {
    //   case 'sp': {
    //     if (!this.props.ad.sp) {
    //       return null;
    //     }
    //     break;
    //   }
    //   case 'pc':
    //   default: {
    //     if (!this.props.ad.pc) {
    //       return null;
    //     }
    //     break;
    //   }
    // }

    return (
      <div
        className="sponsor-link"
        ref={(component) => (this.sponsorLink = component)}
      />
    );
  }
}
