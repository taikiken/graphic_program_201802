/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/28 - 16:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { WidgetType } from '../../../app/const/WidgetType';

// component
import { SPComponentSinglesWidget } from './SPComponentSinglesWidget';

// React
const React = self.React;

export class SPComponentSinglesWidgetOption extends React.Component {
  constructor(props) {
    super(props);
    console.log('SPComponentSinglesWidgetOption', props);
    this.state = {
      single: props.single,
      sign: props.sign,
      index: props.index
    };
  }
  render() {
    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = this.state.index + 1;
    const remainder = index % 3;
    console.log('SPComponentSinglesWidgetOption.render', index, remainder);
    if (remainder !== 0) {
      return null;
    }

    const single = this.state.single;

    let type = WidgetType.POPULAR;
    if (index === 3) {
      type = WidgetType.RECOMMEND;
    } else if (index === 6) {
      type = WidgetType.RELATED;
    }

    return (
      <SPComponentSinglesWidget
        index={index - 1}
        single={single}
        sign={this.state.sign}
        strong={false}
        type={type}
      />
    );
  }
  updateSingle(single) {
    this.setState({ single });
  }
  reload() {
    this.updateSingle(this.state.single);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  static get propTypes() {
    return {
      // SingleDae - 記事詳細データ recommend_articles 抽出
      single: React.PropTypes.object.isRequired,
      // ログイン済みかのフラッグ
      sign: React.PropTypes.bool.isRequired,
      // 記事表示順序
      index: React.PropTypes.number.isRequired
    };
  }
}
