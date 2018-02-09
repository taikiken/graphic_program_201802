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
import ViewSinglesPopular from '../../view/singles/ViewSinglesPopular';

// ui
import SinglesManager from '../../ui/SinglesManager';

// ui / snap
import Snap from '../../ui/Snap';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * PC: 記事詳細「次の記事一覧」人気記事を出力します
 * @since 2016-09-30
 */
export default class ComponentSinglesWidgetPopular extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @return {{index: number, strong: boolean, sign: boolean}} React.propTypes
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
  // // ---------------------------------------------------
  // //  STATIC METHOD
  // // ---------------------------------------------------
  // /**
  //  * `div.singles-popular-containers` 親コンテナ出力
  //  * @return {XML} div.singles-popular-containers を返します
  //  */
  // static build() {
  //   // AJAX 取得データ出力コンテナを用意
  //   return (
  //     <div className="singles-popular-containers" ref="popular" />
  //   );
  // }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
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

    /**
     * SinglesManager instance
     * @type {SinglesManager}
     */
    this.manager = SinglesManager.factory();
    /**
     * `div.singles-popular-containers` container
     * @type {?Element}
     */
    this.popularElement = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます<br>
   * `ViewSinglesPopular` instance を作成し `start` を実行します {@link ViewSinglesPopular}
   * */
  componentDidMount() {
    // this.props.callback(View.DID_MOUNT);
    const popularElement = this.popularElement;
    if (this.view === null && popularElement) {
      // // 人気記事は「次の記事」 9 件以降で 3件毎に登場する
      // const index = this.props.index + 1;
      // // 人気記事は 6件表示する
      // let offset = (index - 9) / 3 * 6;
      // // 負の数値の時は 0 にする
      // if (offset < 0) {
      //   offset = 0;
      // }

      // @since 2016-10-01
      // @type {{offset: number, length: number}}
      const request = this.manager.request;
      const offset = request.offset;

      // console.log('ComponentSinglesWidgetPopular.componentDidMount', this.props.index, offset);
      const view = new ViewSinglesPopular(popularElement, this.props.sign, offset, request.length);
      // view.callback = this.onMount.bind(this);
      this.view = view;
      view.start();

      // request.offset を更新する
      this.manager.up();
      // snap
      this.onMount();
    }
  }
  /**
   * ViewSinglesPopular Ajax load しコンテナがマウントされました
   * @since 2016-10-29
   */
  onMount() {
    // this.view.callback = null;
    const snap = new Snap(this.popularElement);
    // snap.on(Snap.SNAPPED, this.onSnap.bind(this));
    snap.start();
  }
  // /**
  //  * snap scroll, 一時停止中
  //  */
  // onSnap() {
  //   console.log('popular snap', this.props.index);
  // }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * - 不要かも
   */
  reload() {
    if (!!this.view && !!this.view.reload) {
      this.view.reload();
    }
  }
  /**
   * `div.singles-popular-containers` 親コンテナ出力
   * @return {XML} div.singles-popular-containers を返します
   */
  build() {
    // AJAX 取得データ出力コンテナを用意
    return (
      <div
        className={`singles-popular-containers singles-popular-containers-${this.props.index}`}
        ref={(element) => (this.popularElement = element)}
      />
    );
  }
  /**
   * 9 以上の 3 の倍数で `div.singles-popular-containers` 親コンテナ出力します
   * @return {?XML} `div.singles-popular-containers` or null を返します
   */
  render() {
    const props = this.props;

    // 強制出力フラッグ ON
    if (props.strong) {
      return this.build();
    }

    // 0 始まり index を
    // 3 の倍数チェックのために 1 足します
    // `x % 3 === 0` するために
    const index = props.index + 1;

    // 3 の倍数必須
    if (index % 3 !== 0) {
      return null;
    }

    // // 9未満では出力しない
    // if (index < 9) {
    //   return null;
    // }

    return this.build();
  }
}
