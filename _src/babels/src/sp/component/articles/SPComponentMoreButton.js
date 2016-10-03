/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/18 - 15:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import {Message} from '../../../app/const/Message';

// ui
import { Rise } from '../../../ui/Rise';

// Ga
import { Ga } from '../../../ga/Ga';
import { GaData } from '../../../ga/GaData';

// React
const React = self.React;

/**
 * SP: view more button<br>
 * window.bottom が button を超えたら次の読み込みを開始します
 * @since 2016-09-16
 */
export class SPComponentMoreButton extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentMoreButton.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React.state プロパティ
     * @type {{disable: boolean, show: boolean, loading: string}}
     */
    this.state = {
      disable: false,
      show: props.show,
      loading: props.loading
    };
    /**
     * Rise instance を保持する
     * @protected
     * @type {?Rise}
     * */
    this.rise = null;
    /**
     * bind 済み onRise 関数
     * @type {function}
     */
    this.boundRise = this.onRise.bind(this);
    /**
     * bind 済み onClick 関数
     * @type {function}
     */
    this.boundClick = this.onClick.bind(this);
    /**
     * 現在のページナンバー<br>
     * 計測タグへ次の（表示する）ページナンバーを送信するために使用します
     * @type {number}
     * @default 1
     */
    this.page = 1;
  }
  /**
   * div.board-btn-viewmore を出力します
   * @return {?XML} div.board-btn-viewmore を返します
   */
  render() {
    // hasNext: true, button を表示する？
    if ( this.state.show ) {
      return (
        <div id="more" className={`board-btn-viewmore loading-root ${this.state.loading}`}>
          <a className="board-btn-viewmore-link" href={'#more'} onClick={this.handleClick} ><span>{Message.BUTTON_VIEW_MORE}</span></a>
          <span className="loading-spinner">&nbsp;</span>
        </div>
      );
    }

    // button 表示なし
    return null;
  }
  // -----------------------------------------
  // delegate
  /**
   * delegate method, マウントした時にコールされます
   *
   * rise instance が未作成なら作成し監視を始めます
   */
  componentDidMount() {
    let rise = this.rise;

    if (this.state.show && rise === null ) {
      // mount 後
      // button が表示されているなら rise 監視を始める
      rise = new Rise(this.props.element);
      this.rise = rise;
      rise.on(Rise.RISE, this.boundRise);
      rise.start();
    }
  }
  /**
   * unmount 時に rise 破棄を行います
   */
  componentWillUnmount() {
    // unmount 時に rise 破棄を行う
    this.destroy();
  }
  // -----------------------------------------
  // button 関連 custom method
  /**
   * a.onclick event handler<br>
   * 次の読み込みを開始します
   * @param {Event} event a.onclick event
   */
  onClick(event) {
    event.preventDefault();
    // 読み込み開始
    this.onRise();
  }
  /**
   * rise 監視を破棄する
   */
  destroy() {
    // rise 監視を破棄する
    let rise = this.rise;
    if (rise !== null) {
      rise.stop();
      rise.off(Rise.RISE, this.boundRise);
      rise = null;
    }
  }
  /**
   * loading 表示 on / off します<br>
   * on: true, off: false
   * @param {string} loading CSS class name 'loading' || ''
   */
  updateLoading(loading) {
    let rise = this.rise;
    let loadingClass = '';
    if (loading && rise !== null) {
      // loading 中は監視を止める
      loadingClass = 'loading';

      rise.stop();
      // next 読み込み開始
      this.props.action.next();
    } else {
      // loading が終わると監視開始
      rise.start();
    }

    // loading 表示のための css class を追加・削除
    this.setState({ loading: loadingClass });
  }

  /**
   * button 表示・非表示 します
   * @param {boolean} show button 表示・非表示 フラッグ false: 非表示
   */
  updateShow(show) {
    if (!show) {
      // button を非表示にするので rise 監視を止める
      this.destroy();
    } else {
      // button 表示, loading 表示を止める
      this.updateLoading(false);
    }

    this.setState({ show });
  }
  /**
   * Rise.RISE event handler<br>
   * 次 offset JSON を取得する
   */
  onRise() {
    this.updateLoading(true);
    // Ga
    if (this.props.type !== '') {
      // ----------------------------------------------
      // GA 計測タグ
      // PC/スマホカテゴリー一覧の新着記事, movie, ranking
      Ga.add( new GaData('SPComponentMoreButton.onRise', `${this.props.slug}_articles`, `view - ${this.props.type}`, String(++this.page), 0, true) );
      // ----------------------------------------------
    } else {
      if (this.props.home) {
        this.gaHome();
      } else {
        this.gaCategory();
      }
    }
  }
  /**
   * GA 計測タグ, home 用
   */
  gaHome() {
    // ----------------------------------------------
    // GA 計測タグ
    // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
    Ga.add( new GaData('SPComponentMoreButton.gaHome', 'home_articles', 'view - new', String(++this.page), 0, true) );
    // ----------------------------------------------
  }
  /**
   * GA 計測タグ, category 用
   */
  gaCategory() {
    // ----------------------------------------------
    // GA 計測タグ
    // PC/スマホカテゴリー一覧の新着記事
    Ga.add( new GaData('SPComponentMoreButton.gaCategory', `${this.props.slug}_articles`, 'view - new', String(++this.page), 0, true) );
    // ----------------------------------------------
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{show: boolean, action: Object, element: Element, home: boolean, slug: string, loading: string, type: string}} React props
   */
  static get propTypes() {
    return {
      show: React.PropTypes.bool.isRequired,
      action: React.PropTypes.object.isRequired,
      // 監視コンテナ
      element: React.PropTypes.object.isRequired,
      home: React.PropTypes.bool.isRequired,
      slug: React.PropTypes.string.isRequired,
      // option, default ''
      loading: React.PropTypes.string,
      // ranking | movie
      type: React.PropTypes.string
    };
  }
  /**
   * defaultProps
   *
   * - [loading='']
   * - [type='']
   * @return {{loading: string, type: string}} React props
   */
  static get defaultProps() {
    return {
      loading: '',
      type: ''
    };
  }
}
//
// /**
//  * プロパティ
//  * @type {{
//  *  home: boolean,
//  *  show: boolean,
//  *  action: object,
//  *  element: Element,
//  *  slug: string,
//  *  loading: string,
//  *  type: string
//  * }}
//  */
// SPComponentMoreButton.propTypes = {
//   show: React.PropTypes.bool.isRequired,
//   action: React.PropTypes.object.isRequired,
//   // 監視コンテナ
//   element: React.PropTypes.object.isRequired,
//   home: React.PropTypes.bool.isRequired,
//   slug: React.PropTypes.string.isRequired,
//   // option, default ''
//   loading: React.PropTypes.string,
//   // ranking | movie
//   type: React.PropTypes.string
// };
//
// /**
//  * デフォルトプロパティ
//  * @type {{
//  *  loading: string,
//  *  type: string
//  * }}
//  */
// SPComponentMoreButton.defaultProps = {
//   loading: '',
//   type: ''
// };