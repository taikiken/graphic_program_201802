/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/28 - 14:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
/**
 * [library] - React
 */
const React = self.React;

/*
@see https://github.com/undotsushin/undotsushin/issues/2537
<script src="//i.socdm.com/sdk/js/adg-script-loader.js?id=54991&targetID=adg_54991&displayid=3&adType=INFEED&async=false&tagver=2.0.0"></script>
<script src="//i.socdm.com/sdk/js/adg-script-loader.js?id=54992&targetID=adg_54992&displayid=3&adType=INFEED&async=false&tagver=2.0.0"></script>
 */

/**
 * SP single ranking - carousel 内広告を作成します
 * @since 2017-09-28
 * @see https://github.com/undotsushin/undotsushin/issues/2537
 */
export default class SPComponentSingleRankingAd extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{index: number}} React.propTypes
   */
  static get propTypes() {
    return {
      index: React.PropTypes.number.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 初期設定を行います
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * 親コンテナ - mount 後設定されます
     * @type {?Element}
     */
    this.container = null;
    /**
     * script.src - ad - async: true 運用します
     * ```
     * adg-script-loader.js Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.
     * ```
     * @type {{first: string, second: string}}
     */
    this.src = `https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=${this.props.ad}&targetID=${this.props.ad + '_0'}&displayid=2&adType=INFEED&async=true&tagver=2.0.0`;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * mount delegate - ad 発行します
   */
  componentDidMount() {
    if (this.container) {
      // console.log('SPComponentSingleRankingAd.componentDidMount', this.container);
      this.ad();
    }
  }
  /**
   * 広告タグ挿入
   */
  ad() {
    // console.log('SPComponentSingleRankingAd.ad ------------');
    const container = this.container;
    // const { index } = this.props;
    const div = document.createElement('div');
    const script = document.createElement( 'script' );
    // script.src = index === 1 ? this.src.first : this.src.second;
    script.src = this.src;
    div.appendChild(script);
    container.appendChild(div);
    // console.log('SPComponentSingleRankingAd.ad', container);
  }
  /**
   * div.widget-post-carousel-item
   * @returns {XML} div.widget-post-carousel-item + 広告タグ
   */
  render() {
    return (
      <div
        className="widget-post-carousel-item widget-post-carousel-item-ad"
        ref={(element) => (this.container = element)}
      />
    );
  }
}

