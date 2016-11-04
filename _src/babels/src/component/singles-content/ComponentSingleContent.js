/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/02 - 22:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// component/singles-content
import { ComponentSinglePost } from './ComponentSinglePost';
import { ComponentSingleSNS } from './ComponentSingleSNS';
import { ComponentSingleAd } from './ComponentSingleAd';

// component/singles
import { ComponentSingleFooter } from '../singles/ComponentSingleFooter';

// util
import { Fb } from '../../util/Fb';

// React
const React = self.React;

/**
 * 次の記事一覧の本文を表示します
 * @since 2016-11-04
 */
export class ComponentSingleContent extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae, sign: boolean, index: number}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSingleContent.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{single: SingleDae, sign: boolean, index: number}}
     */
    this.state = {
      single: props.single,
      sign: props.sign,
      index: props.index
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  componentDidMount() {
    Fb.init();
  }
  /**
   * state.single 情報を更新し再描画します
   * @param {SingleDae} single state.single
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * div.singles-content, 本文を
   * @return {XML} div.singles-content
   */
  render() {
    return (
      <div className={`singles-content singles-content-${this.state.index}`}>
        <ComponentSingleSNS
          single={this.state.single}
          index={this.state.index}
        />
        <ComponentSinglePost
          single={this.state.single}
          index={this.state.index}
        />
        <ComponentSingleFooter
          single={this.state.single}
          callback={() => {}}
        />
        <ComponentSingleSNS
          single={this.state.single}
          index={this.state.index}
        />
        <ComponentSingleAd
          ad={this.state.single.ad.pc}
          index={this.state.index}
        />
      </div>
    );
  }
}
