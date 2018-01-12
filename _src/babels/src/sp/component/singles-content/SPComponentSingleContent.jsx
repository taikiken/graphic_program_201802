/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/11 - 22:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// sp/component/singles-content
import { SPComponentSinglesSNSAbove } from './SPComponentSinglesSNSAbove';
// import { SPComponentSinglesSNSBelow } from './SPComponentSinglesSNSBelow';
import { SPComponentSingleComments } from './SPComponentSingleComments';


// component/singles-content
import { ComponentSinglePost } from '../../../component/singles-content/ComponentSinglePost';
// import { ComponentSingleAd } from '../../../component/singles-content/ComponentSingleAd';
import { ComponentSingleProvider } from '../../../component/singles-content/ComponentSingleProvider';

// component/singles
import ComponentSingleFooter from '../../../component/singles/ComponentSingleFooter';

// util
// import { Fb } from '../../../util/Fb';

// React
const React = self.React;

/**
 * mobile: div.singles-content を出力します
 *
 * 記事詳細・次の記事一覧の「記事」を出力します
 * ```
 * <SPComponentSingleContent/>
 *  <SPComponentSinglesSNSAbove/>
 *  <ComponentSinglePost/>
 *    <ComponentSinglePostBody/>
 *  <ComponentSingleProvider/>
 *  <ComponentSingleFooter/>
 *  <SPComponentSinglesSNSBelow/>
 *  <SPComponentSingleComments/>
 *    SPViewComments
 *    <SPComponentSinglesAdBelow/>
 * ```
 * {@link SPComponentSinglesSNSAbove},
 * {@link ComponentSinglePost},
 * {@link ComponentSinglePostBody},
 * {@link ComponentSingleProvider},
 * {@link ComponentSingleFooter},
 * {@link SPComponentSinglesSNSBelow},
 * {@link SPComponentSingleComments},
 * {@link SPComponentSinglesAdBelow},
 * {@link SPViewComments},
 */
export class SPComponentSingleContent extends React.Component {
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
   * @param {Object} props React props プロパティー {@link SPComponentSingleContent.propTypes}
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
  // /**
  //  * マウント後に Facebook like button を活性化するために `FB.init` を行います
  //  */
  // componentDidMount() {
  //   // Fb.init();
  //   // Fb.delay(500);
  //   // default 1000 へ
  //   // @see https://github.com/undotsushin/undotsushin/issues/1458
  //   // @since 2017-01-10
  //   Fb.delay();
  // }
  // /**
  //  * state.single 情報を更新し再描画します
  //  * @param {SingleDae} single state.single
  //  */
  // updateSingle(single) {
  //   this.setState({ single });
  // }
  /**
   * div.singles-content, 本文を出力します
   * @return {XML} div.singles-content
   */
  render() {
    const single = this.state.single;
    const index = this.state.index;
    return (
      <div className={`singles-content singles-content-${index}`}>
        <SPComponentSinglesSNSAbove
          single={single}
          index={index}
        />
        <ComponentSinglePost
          single={single}
          index={index}
          sp={true}
        />
        <ComponentSingleProvider
          single={single}
          index={index}
        />
        <ComponentSingleFooter
          single={single}
          callback={() => {}}
        />
        {/*
        <SPComponentSinglesSNSBelow
          single={single}
          index={index}
        />
        */}
        <SPComponentSinglesSNSAbove
          single={single}
          index={index}
        />
        {/*
        <ComponentSingleAd
          ad={single.ad.pc}
          index={index}
        />
       */}
        <SPComponentSingleComments
          single={single}
          index={index}
          sign={this.state.sign}
        />
      </div>
    );
  }
}
