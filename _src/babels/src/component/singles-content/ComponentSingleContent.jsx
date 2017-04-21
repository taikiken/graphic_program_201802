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
import { ComponentSingleComments } from './ComponentSingleComments';
import { ComponentSingleProvider } from './ComponentSingleProvider';

// component/singles
import { ComponentSingleFooter } from '../singles/ComponentSingleFooter';

// util
// import { Fb } from '../../util/Fb';

// React
const React = self.React;

/**
 * 次の記事一覧の本文を表示します
 *
 * ```
 * <ComponentSinglesArticleMagnet/>
 *  <ComponentSinglesArticleSwitch/>
 *    // this class
 *    <ComponentSingleContent/>
 *      <ComponentSingleSNS/>
 *      <ComponentSinglePost/>
 *      <ComponentSingleProvider/>
 *      <ComponentSingleFooter/>
 *      <ComponentSingleSNS/>
 *      <ComponentSingleAd/>
 *      <ComponentSingleComments/>
 *        ViewComments
 *        ViewCommentForm
 * ```
 * {@link ComponentSingleContent},
 * {@link ComponentSingleSNS},
 * {@link ComponentSinglePost},
 * {@link ComponentSingleProvider},
 * {@link ComponentSingleFooter},
 * {@link ComponentSingleAd},
 * {@link ComponentSingleComments},
 * {@link ViewComments},
 * {@link ViewCommentForm},
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
    this.id = parseInt(props.single.id, 10);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // /**
  //  * マウント後に Facebook like button を活性化するために `FB.init` を行います
  //  */
  // componentDidMount() {
  //   Fb.init();
  // }
  // /**
  //  * state.single 情報を更新し再描画します
  //  * @param {SingleDae} single state.single
  //  */
  // updateSingle(single) {
  //   this.setState({ single });
  // }
  componentWillUnmount() {
    console.log('ComponentSingleContent.componentWillUnmount ========', this.id);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ComponentSingleContent.shouldComponentUpdate ========', this.id, this.state.index, nextState.index);
    // return this.state.height !== nextState.height;
    return true;
  }
  /**
   * div.singles-content, 本文を
   * @return {XML} div.singles-content
   */
  render() {
    const single = this.state.single;
    const index = this.state.index;
    return (
      <div className={`singles-content singles-content-${index}`}>
        <ComponentSingleSNS
          single={single}
          index={index}
        />
        <ComponentSinglePost
          single={single}
          index={index}
        />
        <ComponentSingleProvider
          single={single}
          index={index}
        />
        <ComponentSingleFooter
          single={single}
          callback={() => {}}
        />
        <ComponentSingleSNS
          single={single}
          index={index}
        />
        <ComponentSingleAd
          ad={single.ad.pc}
          index={index}
        />
        <ComponentSingleComments
          single={single}
          index={index}
          sign={this.state.sign}
        />
      </div>
    );
  }
}
