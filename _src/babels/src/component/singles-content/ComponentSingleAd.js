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

export class ComponentSingleAd extends React.Component {
  static get propTypes() {
    return {
      // @type {AdPcDae}
      ad: React.PropTypes.object.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      ad: props.ad,
      index: props.index
    };
    this.scriptSrc = 'https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=__AD_ID__&targetID=adg___AD_ID__&displayid=3&adType=PC&width=300&height=250&sdkType=3&async=true&tagver=2.0.0';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  componentDidMount() {
    if (this.refs.leftContainer) {
      this.leftScript();
    }
    if (this.refs.rightContainer) {
      this.rightScript();
    }
  }
  leftScript() {
    const left = this.state.ad.singleBottomLeft;
    let div = document.createElement('div');
    let script = document.createElement('script');
    script.src = this.scriptSrc.split('__AD_ID__').join(left);
    div.appendChild(script);
    this.refs.leftContainer.appendChild(div);
  }
  rightScript() {
    const right = this.state.ad.singleBottomRight;
    let div = document.createElement('div');
    let script = document.createElement('script');
    script.src = this.scriptSrc.split('__AD_ID__').join(right);
    div.appendChild(script);
    this.refs.rightContainer.appendChild(div);
  }
  left() {
    const left = this.state.ad.singleBottomLeft;
    if (!left) {
      return null;
    }
    return (
      <div className="sponsor-link-item" ref="leftContainer"></div>
    );
  }
  right() {
    const right = this.state.ad.singleBottomRight;
    if (!right) {
      return null;
    }
    return (
      <div className="sponsor-link-item" ref="rightContainer"></div>
    );
  }
  render() {
    const ad = this.state.ad;
    const left = ad.singleBottomLeft;
    const right = ad.singleBottomRight;
    console.log('ad', ad);
    if (!left && !right) {
      return null;
    }
    return (
      <div className="sponsor-link">
        <div className="sponsor-link">
          {this.left()}
          {this.right()}
        </div>
      </div>
    );
  }
}
