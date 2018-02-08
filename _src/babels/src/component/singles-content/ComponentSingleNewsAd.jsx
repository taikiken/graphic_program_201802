
// app
import { Ad } from '../../app/const/Ad';

// React
/**
 * [library] - React
 */
const React = self.React;

export default class ComponentSingleNewsAd extends React.Component {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
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
  script(path) {
    if (this.sponsorLink) {
      const div = document.createElement('div');
      const script = document.createElement('script');
      script.src = path;
      div.appendChild(script);
      this.sponsorLink.appendChild(div);
    }
  }
  componentDidMount() {
    const id = this.props.ad;
    this.script(`${Ad.host()}/sdk/js/adg-script-loader.js?id=${id}&targetID=adg_${id}&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0`);
  }
  /**
   * アドジェネ広告を作成します
   * @return {?XML} アドジェネ広告を返す, 無い時は null を返します
   */
  render() {
    if (!this.props.ad) {
      return null;
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
