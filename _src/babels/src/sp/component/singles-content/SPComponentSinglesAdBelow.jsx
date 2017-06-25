/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/14 - 14:04
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
 * 次の記事一覧・記事の sp下部広告
 *
 * 次の記事一覧コンテンツを全て `JS` 出力するので<br>
 * `/app/template/[desktop|mobile]/p.php` から移植しました
 * @TODO: 広告IDが同じで表示できない様子、要確認
 * @since 2016-11-14
 */
export class SPComponentSinglesAdBelow extends React.Component {
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
   * @param {Object} props React props プロパティー {@link SPComponentSinglesAdBelow.propTypes}
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
     * div.sponsor-link_commentLower
     * @type {?Element} div.sponsor-link_commentLower
     */
    this.element = null;
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
   * マウント後に script tag を挿入します
   */
  componentDidMount() {
    if (this.element !== null) {
      this.insertScript();
    }
  }
  /**
   * div でラップし script tag を挿入します
   */
  insertScript() {
    const sp = this.state.ad.sp;
    let div = document.createElement('div');
    let script = document.createElement('script');
    script.src = this.scriptSrc.split('__AD_ID__').join(sp).split('__TARGET_ID__').join(this.id);
    div.appendChild(script);
    this.element.appendChild(div);
  }
  /**
   * div.sponsor-link_commentLower を設置し script tag を挿入します
   * @return {?XML} div.sponsor-link_commentLower
   */
  render() {
    const sp = this.state.ad.sp;
    if (!sp) {
      return null;
    }
    return (
      <div className="sponsor-link_commentLower" ref={(component) => {
        this.element = component;
      }}
      />
    );
  }
}
