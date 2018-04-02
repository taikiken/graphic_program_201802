/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/20 - 14:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Ad } from '../../../app/const/Ad';
import { AdDae } from '../../../dae/theme/AdDae';
// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP - home headline 広告専用 component
 * - 広告を出力します
 * @since 2018-01-12
 */
export default class SPComponentSingleHeadlineArticleAd extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{ad: AdDae}} React.propTypes
   */
  static get propTypes() {
    return {
      ad: React.PropTypes.instanceOf(AdDae).isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * SP - home headline 広告準備します
   * @param {*} props React.pops
   */
  constructor(props) {
    super(props);
    /**
     * div.sponsor-link 広告タグ挿入 Element
     * @type {?Element}
     */
    this.index = this.props.index;
    this.id = this.props.ad;
    this.sponsorLink = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 広告タグを挿入します
   * @param {string} id 広告タグ
   */
  ad(id) {
    const element = this.sponsorLink;
    const div = document.createElement('div');
    const script = document.createElement('script');
    script.src = `https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=${this.id}&targetID=${this.id + '_' + this.index}&displayid=2&adType=INFEED&async=true&tagver=2.0.0`;
    div.appendChild(script);
    element.appendChild(div);
  }
  /**
   * delegate - after mount
   */
  componentDidMount() {
    const element = this.sponsorLink;
    if (!element) {
      return;
    }
    const { ad } = this.props;
    if (!ad) {
      return;
    }
    // console.log('this.props', this.props);
    this.ad(ad);
  }
  /**
   * delegate 出力します
   * @return {?XML} `div.board-item.sponsor-link`
   */
  render() {
    const { ad } = this.props;
    if (ad === null) {
      return null;
    } else {
      return (
        <div className="board-item sponsor-link">
          <div ref={(element) => (this.sponsorLink = element)} />
        </div>
      );
    }
  }
}
