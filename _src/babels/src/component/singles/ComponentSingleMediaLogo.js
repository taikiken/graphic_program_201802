/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 23:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../view/View';

// React
const React = self.React;

/**
 * 媒体ロゴ
 * @since 2016-09-25
 */
export class ComponentSingleMediaLogo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {}
  /**
   * delegate, mount 後に呼び出され `View.DID_MOUNT` を発火します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
  /**
   * 記事詳細 媒体ロゴ を更新します
   * @param {SingleDae} single 記事詳細 JSON data
   */
  updateSingle(single) {
    this.setState({ single });
  }
}

/**
 * プロパティ
 * @type {{single: SingleDae, callback: Function}}
 */
ComponentSingleMediaLogo.propTypes = {
  single: React.PropTypes.object.isRequired,
  callback: React.PropTypes.func.isRequired
};
