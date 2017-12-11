/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/29 - 12:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { SPViewSinglesPopular } from '../../view/singles/SPViewSinglesPopular';

// ui
import { SinglesManager } from '../../../ui/SinglesManager';

// ui / snap
import { SPSnap } from '../../ui/SPSnap';

// React
const React = self.React;

/**
 * SP: 記事詳細「次の記事一覧」人気記事を出力します
 * @since 2016-09-28
 */
export class SPComponentSinglesWidgetPopular extends React.Component {
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
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentSinglesWidgetPopular.propTypes}
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
     * element id, componentDidMount 発火しない問題が解決したのでいらなくなったけど... 残しておく
     * @type {string}
     */
    this.id = '';

    /**
     * script tag をインサートする `this.refs.popular` Element<br>
     * componentDidMount 発火しない問題が解決したのでいらなくなったけど... 残しておく
     * @type {?Element}
     */
    this.popular = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます<br>
   * `SPViewSinglesPopular` instance を作成し `start` を実行します {@link SPViewSinglesPopular}
   * */
  componentDidMount() {
    if (this.view === null && !!this.refs.popular) {
      // @since 2016-10-03
      // @type {{offset: number, length: number}}
      const request = this.manager.request;
      const offset = request.offset;

      // console.log('SPComponentSinglesWidgetPopular.componentDidMount', this.props.index, offset);
      const view = new SPViewSinglesPopular(this.refs.popular, this.props.sign, offset);
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
   * @since 2016-11-12
   */
  onMount() {
    const snap = new SPSnap(this.refs.popular);
    snap.start();
  }
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
    const id = `singles-popular-containers-${this.props.index}`;
    this.id = id;
    // console.log('SPComponentSinglesWidgetPopular.build', this.props.index, this.props.strong, id);
    // this.getPopular();
    // AJAX 取得データ出力コンテナを用意
    return (
      <div id={id} className={`singles-popular-containers singles-popular-containers-${this.props.index}`} ref="popular" />
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
    return this.build();
  }
}
