/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 16:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Url } from '../../app/const/Url';

// ui / snap
import Snap from '../../ui/Snap';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * PC: 記事詳細・次の記事一覧 > 関連記事一覧
 * - `popin.js` を使用し出力します
 * @since 2016-09-28
 */
export default class ComponentSinglesWidgetRelated extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes - プロパティ
   * - index - 記事表示順序
   * - strong - 記事出力順番に関係なく出力するかのフラッグ
   * - single - 記事詳細該当記事の {@link SingleDae}
   * @return {{index: number, strong: boolean, single: SingleDae}} React.propTypes
   */
  static get propTypes() {
    return {
      // 記事表示順序
      index: React.PropTypes.number.isRequired,
      // 記事出力順番に関係なく出力するかのフラッグ
      strong: React.PropTypes.bool.isRequired,
      // SingleDae <- 記事詳細該当記事の
      single: React.PropTypes.object.isRequired
    };
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React dom へ script tag を appendChild します
   * @param {Element} element appendChild する親 Element
   */
  static insert(element) {
    element.innerHTML = '';

    const div = document.createElement('div');
    const script = document.createElement('script');
    script.src = Url.popin();
    div.appendChild(script);

    element.appendChild(div);
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSinglesWidgetRelated.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{index: number, single: SingleDae}}
     */
    this.state = {
      index: props.index,
      single: props.single
    };
    /**
     * `div.singles-related-scripts`
     * @type {?Element}
     */
    this.relatedElement = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出され script tag をインサートします
   * */
  componentDidMount() {
    const relatedElement = this.relatedElement;
    if (relatedElement) {
      ComponentSinglesWidgetRelated.insert(relatedElement);
      // snap
      const snap = new Snap(relatedElement);
      snap.start();
    }
  }
  /**
   * 関連記事一覧 `div.singles-related-containers` を出力します
   * @return {XML} 関連記事一覧 `div.singles-related-containers`
   */
  build() {
    // AJAX 取得データ出力コンテナを用意
    return (
      <div className={`widget-postList widget-postList_related widget-postList_related-${this.props.index} singles-related-containers`}>
        <div id="_popIn_category" style={{display: 'none'}}>{this.state.single.categories.labels}</div>
        <div id="_popIn_recommend" />
        <div
          className="singles-related-scripts"
          ref={(element) => (this.relatedElement = element)}
        />
      </div>
    );
  }
  /**
   * state.index 情報を更新し再描画します
   * @param {number} index state.index
   */
  updateIndex(index) {
    this.setState({ index });
  }
  /**
   * state.single 情報を更新し再描画します
   * @param {SingleDae} single state.single
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * - 不要かも
   */
  reload() {
    this.updateIndex(this.state.index);
  }
  /**
   * state.index が 6 あるいは strong: true の時に<br>
   * 関連記事一覧 `div.singles-recommend-containers` を出力します
   * @return {?XML} `div.singles-recommend-containers` or null を返します
   */
  render() {
    const { strong, index } = this.props;

    if (strong) {
      return this.build();
    }

    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const addedIndex = index + 1;

    if (addedIndex % 3 !== 0) {
      return null;
    }

    // return null;
    return this.build();
  }
}
