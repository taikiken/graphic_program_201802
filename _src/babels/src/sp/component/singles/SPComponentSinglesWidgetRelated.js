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

/**
 * SP: 記事詳細・次の記事一覧 > 関連記事一覧<br>
 * Syn.extension.js を使用し出力します
 * @since 2016-09-28
 */
export class SPComponentSinglesWidgetRelated extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentSinglesWidgetRelated.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{index: number}}
     */
    this.state = {
      index: props.index
    };
  }
  /**
   * state.index が 6 あるいは strong: true の時に<br>
   * 関連記事一覧 `div.singles-recommend-containers` を出力します
   * @return {?XML} `div.singles-recommend-containers` or null を返します
   */
  render() {
    const props = this.props;

    if (props.strong) {
      return SPComponentSinglesWidgetRelated.build();
    }

    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = props.index + 1;

    if (index % 3 !== 0) {
      return null;
    }

    return SPComponentSinglesWidgetRelated.build();
  }
  /**
   * delegate, マウント後に呼び出され script tag をインサートします
   * */
  componentDidMount() {
    if (!!this.refs.related) {
      SPComponentSinglesWidgetRelated.insert(this.refs.related);
    }
  }
  /**
   * state.index 情報を更新し再描画します
   * @param {number} index state.index
   */
  updateIndex(index) {
    this.setState({ index });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * @ToDo 不要かも
   */
  reload() {
    this.updateIndex(this.state.index);
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 関連記事一覧 `div.singles-related-containers` を出力します
   * @return {XML} 関連記事一覧 `div.singles-related-containers`
   */
  static build() {
    // AJAX 取得データ出力コンテナを用意
    return (
      <div className="singles-recommend-containers">
        <div id="logly-lift-4247222" className="recommend_articles"></div>
        <div className="singles-related-scripts" ref="related"></div>
      </div>
    );
  }
  /**
   * React dom へ script tag を appendChild します
   * @param {Element} element appendChild する親 Element
   */
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
  /**
   * プロパティ
   * @return {{index: number, strong: boolean}} React.props
   */
  static get propTypes() {
    return {
      // 記事表示順序
      index: React.PropTypes.number.isRequired,
      // 記事出力順番に関係なく出力するかのフラッグ
      strong: React.PropTypes.bool.isRequired
    };
  }
}
