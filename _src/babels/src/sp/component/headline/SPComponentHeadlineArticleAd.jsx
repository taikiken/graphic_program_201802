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
// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP - 記事に広告を挿入します
 */
export default class SPComponentHeadlineArticleAd extends React.Component {
  /**
   * React.propTypes
   * @returns {{home: boolean, archive: boolean}} React.propTypes
   */
  static get propTypes() {
    return {
      home: React.PropTypes.bool.isRequired,
      archive: React.PropTypes.bool.isRequired,
    };
  }
  /**
   * SP - 記事に広告を挿入します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    /**
     * div.sponsor-link 広告タグ挿入 Element
     * @type {?Element}
     */
    this.sponsorLink = null;
  }
  /**
   * delegate - after mount
   * - 広告 tag `script` 挿入します
   */
  componentDidMount() {
    const element = this.sponsorLink;
    if (!element) {
      return;
    }
    const div = document.createElement('div');
    const script = document.createElement( 'script' );
    script.src = `${Ad.ssl()}/sdk/js/adg-script-loader.js?id=42707&targetID=adg_42707&displayid=2&adType=INFEED&async=false&async=true&tagver=2.0.0`;
    div.appendChild(script);
    element.appendChild(div);
  }
  /**
   * 広告用コンテナを作成します
   * @returns {?XML} `div.board-item.sponsor-link`
   */
  render() {
    const { home, archive } = this.props;
    if (home || archive) {
      return null;
    }
    return (
      <div className="board-item sponsor-link">
        <div ref={(element) => (this.sponsorLink = element)} />
      </div>
    );
  }
}
