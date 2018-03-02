/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/17 - 22:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import {Message} from '../../app/const/Message';

// ui
import Rise from '../../ui/Rise';

// Ga
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * view more button<br>
 * window.bottom が button を超えたら次の読み込みを開始します
 * @since 2016-09-16
 */
export default class ComponentMoreButton extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  show: boolean,
   *  action: Object,
   *  element: Element,
   *  loading: string,
   *  afterClick: boolean
   * }} React props
   */
  static get propTypes() {
    return {
      home: React.PropTypes.bool.isRequired,
      show: React.PropTypes.bool.isRequired,
      action: React.PropTypes.object.isRequired,
      // 監視コンテナ
      element: React.PropTypes.object.isRequired,
      slug: React.PropTypes.string.isRequired,
      // option, default ''
      loading: React.PropTypes.string.isRequired,
      afterClick: React.PropTypes.bool
    };
  }
  /**
   * defaultProps
   *
   * ```
   * {
   *    loading: '',
   *    afterClick: false
   *  };
   * ```
   *
   * afterClick: true の時は `click` 後に無限スクロールを始める
   * @return {{loading: string, afterClick: boolean}} React props
   */
  static get defaultProps() {
    return {
      // loading: '',
      afterClick: false,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentMoreButton.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React.state プロパティ
     * @type {{show: boolean, loading: string}}
     */
    this.state = {
      // disable: false,
      show: props.show,
      loading: props.loading
    };
    /**
     * Rise instance を保持する
     * @type {Rise}
     * */
    this.rise = new Rise(props.element);
    /**
     * bind 済み onRise 関数
     * @type {function}
     */
    this.onRise = this.onRise.bind(this);
    /**
     * bind 済み onClick 関数
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * page No. Ga に使用します<br>
     * 初期表示がないかもしれないので page 1 は親で処理します
     * @type {number}
     * @default 1
     */
    this.page = 1;
    /**
     * 初回無限スクロールにしないパターンありの setTimeout id
     * - home(index)無限スクロールは button click 後に行う
     * @type {number}
     */
    this.timer = 0;
    /**
     * rise 監視を `click` の後に行う flag - pops.afterClick 値を移植
     * @yupe {boolean}
     * @since 2017-12-04
     */
    this.afterClick = props.afterClick;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // -----------------------------------------
  // button 関連 custom method
  /**
   * a.onclick event handler<br>
   * 次の読み込みを開始します
   * @param {Event} event a.onclick event
   */
  onClick(event) {
    // console.log('ComponentMoreButton.onClick', event);
    event.preventDefault();
    // flag off
    this.afterClick = false;
    // 読み込み開始
    this.onRise();
  }
  /**
   * rise 監視を破棄する
   */
  destroy() {
    // rise 監視を破棄する
    const rise = this.rise;
    rise.stop();
    rise.off(Rise.RISE, this.onRise);
  }
  /**
   * loading 表示 on / off します<br>
   * on: true, off: false
   * @param {string} requireLoading CSS class name 'loading' || ''
   */
  updateLoading(requireLoading) {
    // console.log('ComponentMoreButton.updateLoading', requireLoading);
    const rise = this.rise;
    let loading = '';
    // if (loading && rise !== null) {
    // 条件見直し
    // @since 2017-04-17
    if (requireLoading) {
      // loading 中は監視を止める
      loading = 'loading';
      rise.stop();
      // next 読み込み開始
      this.props.action.next();
    } else if (rise && !this.afterClick) {
      // loading が終わると監視開始 + afterClick flag 条件加味する(2017-12-04)
      rise.start();
    }

    // loading 表示のための css class を追加・削除
    this.setState({ loading });
  }
  // /**
  //  * button 表示・非表示 します
  //  * @param {boolean} show button 表示・非表示 フラッグ false: 非表示
  //  */
  // updateShow(show) {
  //   // destroy 処理戻す - 2017-12-01
  //   if (!show) {
  //     // button を非表示にするので rise 監視を止める
  //     this.destroy();
  //   }
  //  // else {
  //  //    // button 表示, loading 表示を止める
  //  //    this.updateLoading(false);
  //  // }
  //   // 意図不明修正されてた - lint error になるので indent 修正
  //   this.updateLoading(false);
  //   this.setState({ show });
  // }
  /**
   * Rise.RISE event handler<br>
   * 次 offset JSON を取得する
   */
  onRise() {
    // clearTimeout(this.timer);
    this.updateLoading(true);
    // Ga
    if (this.props.home) {
      this.gaHome();
    } else {
      this.gaCategory();
    }
  }
  /**
   * GA 計測タグ, home 用
   */
  gaHome() {
    // ----------------------------------------------
    // GA 計測タグ
    // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
    Ga.add( new GaData('ComponentMoreButton.gaHome', 'home_articles', 'view - new', String(++this.page), 0, true) );
    // ----------------------------------------------
  }
  /**
   * GA 計測タグ, category 用
   */
  gaCategory() {
    // ----------------------------------------------
    // GA 計測タグ
    // PC/スマホカテゴリー一覧の新着記事
    Ga.add( new GaData('ComponentMoreButton.gaCategory', `${this.props.slug}_articles`, 'view - new', String(++this.page), 0, true) );
    // ----------------------------------------------
  }
  // -----------------------------------------
  // delegate
  /**
   * delegate method, マウントした時にコールされます
   *
   * rise instance が未作成なら作成し監視を始めます
   */
  componentDidMount() {
    // // let rise = this.rise;
    // // console.log('ComponentMoreButton.componentDidMount', this.props);
    // if (this.state.show && this.rise === null) {
    //   // mount 後
    //   // button が表示されているなら rise 監視を始める
    //   const rise = new Rise(this.props.element);
    //   this.rise = rise;
    //   rise.on(Rise.RISE, this.onRise);
    //   // @since 2016-10-04
    //   // https://github.com/undotsushin/undotsushin/issues/1141
    //   // 初回無限スクロールにしないパターンあり
    //   // if (!this.props.afterClick) {
    //   if (!this.afterClick) {
    //     // 初回に限り delay させる
    //     // this.timer = setTimeout(() => rise.start(), 500);
    //     // rise.start();
    //     rise.delayStart(0.5);
    //   }
    // }
    const { show } = this.state;
    if (show) {
      const rise = this.rise;
      rise.on(Rise.RISE, this.onRise);
      // @since 2016-10-04
      // https://github.com/undotsushin/undotsushin/issues/1141
      // 初回無限スクロールにしないパターンあり
      // if (!this.props.afterClick) {
      if (!this.afterClick) {
        // 初回に限り delay させる
        // this.timer = setTimeout(() => rise.start(), 500);
        // rise.start();
        rise.delayStart(0.5);
      }
    }
  }
  /**
   * unmount 時に rise 破棄を行います
   */
  componentWillUnmount() {
    // unmount 時に rise 破棄を行う
    this.destroy();
  }
  /**
   * delegate - before update props
   * - show property が `state` と違っていたら update します
   * @param {{show: boolean, loading: string}} nextProps React.props
   */
  componentWillReceiveProps(nextProps) {
    const { show, loading } = nextProps;
    // console.log('ComponentMoreButton.componentWillReceiveProps', nextProps);
    if (show !== this.state.show || loading !== this.state.loading) {
      this.setState({ show, loading });
      this.rise.start();
    }
  }
  /**
   * div.board-btn-viewmore を出力します
   * @return {?XML} `div.board-btn-viewmore` を返します
   */
  render() {
    const { show, loading } = this.state;
    // hasNext: true, button を表示する？
    if (!show || !this.props.action.hasNext()) {
      // button 表示なし
      this.destroy();
      return null;
    }
    // else {
    // //     return (
    // //         <div id="more" className={`board-btn-viewmore loading-root ${this.state.loading}`}>
    // // <a className="board-btn-viewmore-link" href={'#more'} onClick={this.onClick} >
    // // <span>{Message.BUTTON_VIEW_MORE}</span>
    // //     </a>
    // //     <span className="loading-spinner">&nbsp;</span>
    // //     </div>
    // // );
    //   // lint error になる indent 修正
    //   return (
    //     <div id="more" className={`board-btn-viewmore loading-root ${this.state.loading}`}>
    //       <a className="board-btn-viewmore-link" href={'#more'} onClick={this.onClick} >
    //         <span>{Message.BUTTON_VIEW_MORE}</span>
    //       </a>
    //       <span className="loading-spinner">&nbsp;</span>
    //     </div>
    //   );
    // }
    // コード最適化する - 2017-12-01
    return (
      <div id="more" className={`board-btn-viewmore loading-root ${loading}`}>
        <a
          className="board-btn-viewmore-link"
          href={'#more'}
          onClick={this.onClick}
        >
          <span>{Message.BUTTON_VIEW_MORE}</span>
        </a>
        <span className="loading-spinner">&nbsp;</span>
      </div>
    );
  }
}