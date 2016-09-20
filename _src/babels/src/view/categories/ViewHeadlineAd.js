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

// React
const React = self.React;

/**
 * 一面以外の headline ad
 * @since 2016-09-20
 * <pre>
 * ヘッドライン最下部に広告が設定できる
 * response.headline.ad の該当製品の値でアドジェネ広告を差し込む、この値がなければ広告は表示しない
 * </pre>
 * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
 * */
export class ViewHeadlineAd extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ViewHeadlineAd.propTypes}
   */
  constructor(props) {
    super(props);
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
      <div className="sponsor-link" ref="sponsorLink"></div>
    );
  }
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
   * アドジェネ広告 `script` tag を作成し wrapper div に `appendChild` します<br>
   * さらに div.sponsor-link へ `appendChild` します
   * @param {string} path アドジェネ広告パス
   */
  script(path) {
    const div = document.createElement('div');
    const script = document.createElement('script');
    script.src = path;
    div.appendChild(script);

    this.refs.sponsorLink.appendChild(div);
  }
  /**
   * sp: アドジェネ広告を差し込む、この値がなければ広告は表示しない
   */
  sp() {
    const id = this.props.ad.sp;
    if (!id) {
      return;
    }

    this.script(`https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=${id}&targetID=adg_${id}&displayid=2&adType=INFEED&async=true&tagver=2.0.0`);
  }
  /**
   * pc: アドジェネ広告を差し込む、この値がなければ広告は表示しない
   */
  pc() {
    const id = this.props.ad.pc;
    if (!id) {
      return;
    }

    this.script(`https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=${id}&targetID=adg_${id}&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0`);
  }
}

/**
 * プロパティ
 * @static
 * @type {{browser: string, sp: string, pc: string}}
 */
ViewHeadlineAd.propTypes = {
  browser: React.PropTypes.string.isRequired,
  ad: React.PropTypes.object.isRequired
};
