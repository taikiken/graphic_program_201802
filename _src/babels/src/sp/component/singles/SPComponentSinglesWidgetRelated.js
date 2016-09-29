/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/29 - 16:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Url } from '../../../app/const/Url';

// React
const React = self.React;

export class SPComponentSinglesWidgetRelated extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index
    };
  }
  render() {
    const props = this.props;

    if (props.strong) {
      return SPComponentSinglesWidgetRelated.build();
    }

    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = props.index + 1;

    if (index !== 6) {
      return null;
    }

    return SPComponentSinglesWidgetRelated.build();
  }
  /**
   * delegate, マウント後に呼び出され、 `View.DID_MOUNT` を発火します
   * */
  componentDidMount() {
    if (!!this.refs.recommend) {
      return;
    }

    SPComponentSinglesWidgetRelated.insert(this.refs.recommend);
  }
  updateIndex(index) {
    this.setState({ index });
  }
  reload() {
    this.updateIndex(this.state.index);
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  static build() {
    // AJAX 取得データ出力コンテナを用意
    return (
      <div className="singles-recommend-containers">
        <div id="logly-lift-4227758" className="recommend_articles"></div>
        <div className="singles-recommend-scripts" ref="recommend"></div>
      </div>
    );
  }
  static insert(element) {
    element.innerHTML = '';

    const div = document.createElement('div');
    const syn = document.createElement('script');
    syn.src = Url.synExtension();
    const so = document.createElement('script');
    so.src = Url.soDmp();
    div.appendChild(syn);
    div.appendChild(so);

    element.appendChild(div);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  static get propTypes() {
    return {
      // 記事表示順序
      index: React.PropTypes.number.isRequired,
      // 記事出力順番に関係なく出力するかのフラッグ
      strong: React.PropTypes.bool.isRequired
    };
  }
}
