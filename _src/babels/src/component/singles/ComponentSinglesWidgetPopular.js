/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 16:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { ViewSinglesPopular } from '../../view/singles/ViewSinglesPopular';

// React
const React = self.React;

/**
 * PC: 記事詳細「次の記事一覧」人気記事を出力します
 * @since 2016-09-30
 */
export class ComponentSinglesWidgetPopular extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSinglesWidgetPopular.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * SPViewSinglesPopular instance を保持します
     * @type {?SPViewSinglesPopular}
     */
    this.view = null;
  }
  /**
   * 9 以上の 3 の倍数で `div.singles-popular-containers` 親コンテナ出力します
   * @return {?XML} `div.singles-popular-containers` or null を返します
   */
  render() {
    const props = this.props;

    // 強制出力フラッグ ON
    if (props.strong) {
      return ComponentSinglesWidgetPopular.build();
    }

    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = props.index + 1;

    // 3 の倍数必須
    if (index % 3 !== 0) {
      return null;
    }

    // 9未満では出力しない
    if (index < 9) {
      return null;
    }

    return ComponentSinglesWidgetPopular.build();
  }
  /**
   * delegate, マウント後に呼び出されます<br>
   * `ViewSinglesPopular` instance を作成し `start` を実行します {@link ViewSinglesPopular}
   * */
  componentDidMount() {
    // this.props.callback(View.DID_MOUNT);
    if (this.view === null && !!this.refs.popular) {
      // 人気記事は「次の記事」 9 件以降で 3件毎に登場する
      const index = this.props.index + 1;
      // 人気記事は 6件表示する
      let offset = (index - 9) / 3 * 6;
      // 負の数値の時は 0 にする
      if (offset < 0) {
        offset = 0;
      }

      console.log('ComponentSinglesWidgetPopular.componentDidMount', index, offset);
      const view = new ViewSinglesPopular(this.refs.popular, this.props.sign, offset);
      this.view = view;
      view.start();
    }
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * @ToDo 不要かも
   */
  reload() {
    if (!!this.view && !!this.view.reload) {
      this.view.reload();
    }
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * `div.singles-popular-containers` 親コンテナ出力
   * @return {XML} div.singles-popular-containers を返します
   */
  static build() {
    // AJAX 取得データ出力コンテナを用意
    return (
      <div className="singles-popular-containers" ref="popular"></div>
    );
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React props
   * @return {{index: number, strong: boolean, sign: boolean}} React props
   */
  static get propTypes() {
    return {
      // 記事表示順序
      index: React.PropTypes.number.isRequired,
      // 記事出力順番に関係なく出力するかのフラッグ
      strong: React.PropTypes.bool.isRequired,
      // ログイン済みかのフラッグ
      sign: React.PropTypes.bool.isRequired
    };
  }
}
