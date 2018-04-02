/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/28 - 18:23
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
レコメンド内1
<script src="//i.socdm.com/sdk/js/adg-script-loader.js?id=54993&targetID=adg_54993&displayid=3&adType=INFEED&async=false&tagver=2.0.0"></script>

レコメンド内2
<script src="//i.socdm.com/sdk/js/adg-script-loader.js?id=54994&targetID=adg_54994&displayid=3&adType=INFEED&async=false&tagver=2.0.0"></script>
 */

/**
 * SP single recommend - 内広告を作成します
 * @since 2017-09-28
 * @see https://github.com/undotsushin/undotsushin/issues/2537
 */
export default class SPComponentSingleRecommendAd extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  static get propTypes() {
    return {
      index: React.PropTypes.number.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(props) {
    super(props);
    // ---
    /**
     * 親コンテナ - mount 後設定されます
     * @type {?Element}
     */
    this.container = null;
    /**
     * script.src - ad async: true 運用します
     * ```
     * adg-script-loader.js Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.
     * ```
     * @type {{first: string, second: string}}
     */
    this.src = {
      first: '//i.socdm.com/sdk/js/adg-script-loader.js?id=54993&targetID=adg_54993&displayid=3&adType=INFEED&async=true&tagver=2.0.0',
      second: '//i.socdm.com/sdk/js/adg-script-loader.js?id=54994&targetID=adg_54994&displayid=3&adType=INFEED&async=true&tagver=2.0.0',
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * mount delegate - ad 発行します
   */
  componentDidMount() {
    const { ad } = this.props;
    if (!ad) {
      return;
    }
    if (this.container) {
      // console.log('SPComponentSingleRecommendAd.componentDidMount', this.container);
      this.ad();
    }
  }
  /**
   * 広告タグ挿入
   */
  ad() {
    // console.log('SPComponentSingleRecommendAd.ad ------------');
    const container = this.container;
    const { index } = this.props;
    const div = document.createElement('div');
    const script = document.createElement( 'script' );
    script.src = index === 1 ? this.src.first : this.src.second;
    div.appendChild(script);
    container.appendChild(div);
    // console.log('SPComponentSingleRecommendAd.ad', container);
  }
  /**
   * div.widget-post-carousel-item
   * @returns {XML} div.widget-post-carousel-item + 広告タグ
   * @since 2018-01-15
   * design変更に伴いclassName="bord-item-ad"をclassName="widget-post-carousel-item widget-post-carousel-item-ad"に変更
   */
  render() {
    return (
      <div className="board-item board-item-ad-wrapper">
        <div
          className="widget-post-carousel-item widget-post-carousel-item-ad"
          ref={(element) => (this.container = element)}
        />
      </div>
    );
  }
}

