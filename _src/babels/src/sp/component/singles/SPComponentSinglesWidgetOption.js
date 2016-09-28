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

// component
import { SPComponentSinglesWidget } from './SPComponentSinglesWidget';

// React
const React = self.React;

export class SPComponentSinglesWidgetOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      single: props.single
    };
  }
  render() {
    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = this.props.index;
    const remainder = (index + 1) % 3;
    if (remainder !== 0) {
      return null;
    }

    const single = this.state.single;

    return (
      <SPComponentSinglesWidget
        index={index}
        single={single}
      />
    );
  }
}
