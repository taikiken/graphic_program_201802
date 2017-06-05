/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/04 - 19:30
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
 * 次の記事一覧・記事の PC下部広告
 *
 * 次の記事一覧コンテンツを全て `JS` 出力するので<br>
 * `/app/template/[desktop|mobile]/p.php` から移植しました
 * @TODO: 広告IDが同じで表示できない様子、要確認
 * @since 2016-11-04
 */
export class ComponentSingleAd extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{ad: AdPcDae, index: number}} React props
   */
  static get propTypes() {
    return {
      // @type {AdPcDae}
      ad: React.PropTypes.object.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSingleAd.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{ad: AdPcDae, index: number}}
     */
    this.state = {
      ad: props.ad,
      index: props.index
    };
    /**
     * 広告 script src 共通部分, 広告IDで書替えます
     * @type {string}
     */
    this.scriptSrc = 'https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=__AD_ID__&targetID=__TARGET_ID__&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=true&tagver=2.0.0';
    /**
     * script 挿入タグ ID
     * @type {string}
     */
    this.id = `adg_${props.ad.sp}_${props.index}`;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます<br>
   * `JSON.response.ad.pc.single_bottom_left`,
   * `JSON.response.ad.pc.single_bottom_right` を使用し<br>
   * script tag を挿入します
   */
  componentDidMount() {
    // 左広告
    if (this.refs.leftContainer) {
      this.leftScript();
    }
    // 右広告
    if (this.refs.rightContainer) {
      this.rightScript();
    }
  }
  /**
   * 左広告, `JSON.response.ad.pc.single_bottom_left`<br>
   * componentDidMount からコールされます
   */
  leftScript() {
    // 広告ID
    const left = this.state.ad.singleBottomLeft;
    // script tag を appendChild する div tag
    let div = document.createElement('div');
    // 広告ID をセットする script tag
    let script = document.createElement('script');
    // 広告IDを定数 `__AD_ID__` と置換え
    script.src = this.scriptSrc.split('__AD_ID__').join(left)
      .split('__TARGET_ID__').join(`${this.id}_left`);
    // div tag へ script tag を挿入
    div.appendChild(script);
    // React が script tag の appendChild を許可しないので
    // div tag でラップして挿入しています
    this.refs.leftContainer.appendChild(div);
  }
  /**
   * 右広告, `JSON.response.ad.pc.single_bottom_right`<br>
   * componentDidMount からコールされます
   */
  rightScript() {
    const right = this.state.ad.singleBottomRight;
    let div = document.createElement('div');
    let script = document.createElement('script');
    script.src = this.scriptSrc.split('__AD_ID__').join(right)
      .split('__TARGET_ID__').join(`${this.id}_right`);
    div.appendChild(script);
    this.refs.rightContainer.appendChild(div);
  }
  /**
   * 左：広告タグ(script)挿入用親コンテナを生成します
   * @return {?XML} div.sponsor-link-item or null
   */
  left() {
    const left = this.state.ad.singleBottomLeft;
    if (!left) {
      return null;
    }
    return (
      <div id={`${this.id}_left`} className="sponsor-link-item" ref="leftContainer"/>
    );
  }
  /**
   * 右：広告タグ(script)挿入用親コンテナを生成します
   * @return {?XML} div.sponsor-link-item or null
   */
  right() {
    const right = this.state.ad.singleBottomRight;
    if (!right) {
      return null;
    }
    return (
      <div id={`${this.id}_right`} className="sponsor-link-item" ref="rightContainer"/>
    );
  }
  /**
   * 記事本文下広告, div.sponsor-link
   * @return {?XML} div.sponsor-link or null
   */
  render() {
    const ad = this.state.ad;
    const left = ad.singleBottomLeft;
    const right = ad.singleBottomRight;
    if (!left && !right) {
      return null;
    }
    return (
      <div className="sponsor-link">
        <div className="sponsor-link column2">
          {this.left()}
          {this.right()}
        </div>
      </div>
    );
  }
}
