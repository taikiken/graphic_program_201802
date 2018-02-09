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
import SPComponentSinglesWidget from './SPComponentSinglesWidget';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * @deprecated dont use
 * @TODO future remove
 * SP: 記事詳細「次の記事一覧」 > オススメ記事・関連記事・人気記事<br>
 * 出力 Component を「記事詳細」index を元に判断します
 * @since 2016-09-28
 */
export class SPComponentSinglesWidgetOption extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React props
   * @return {{single: SingleDae, sign: boolean, index: number}} React props
   */
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
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentSinglesWidgetOption.propTypes}
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
  /**
   * 表示を更新します
   * @param {SingleDae} single 更新する SingleDae
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * - 不要かも
   */
  reload() {
    this.updateSingle(this.state.single);
  }
  /**
   * state.index が 3 の倍数の時に `SPComponentSinglesWidget` {@link SPComponentSinglesWidget} を使用します
   *
   *  - 3: オススメ記事
   *  - 6: 関連記事
   *  - 9以上の 3 の倍数: 人気記事
   * @return {?XML} null or SPComponentSinglesWidget を返します
   */
  render() {
    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = this.state.index + 1;
    const remainder = index % 3;

    // 3 の倍数でない時は null
    if (remainder !== 0) {
      return null;
    }

    // type を決める
    let type = WidgetType.POPULAR;
    if (index === 3) {
      type = WidgetType.RECOMMEND;
    } else if (index === 6) {
      type = WidgetType.RELATED;
    }

    const single = this.state.single;

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
}
