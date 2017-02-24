/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/04 - 14:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../app/const/Message';

// component/singles
import { ComponentSinglesArticleExcerpt } from './ComponentSinglesArticleExcerpt';

// component/singles-content
import { ComponentSingleContent } from '../singles-content/ComponentSingleContent';
import { ComponentSingleSNS } from '../singles-content/ComponentSingleSNS';

// // util
import { Scroll } from '../../util/Scroll';
// import { Offset } from '../../util/Offset';

// React
const React = self.React;

/**
 * 記事詳細・次の記事一覧の記事表示<br>
 * 「続きを読む」クリックで本文を表示します
 * @since 2016-11-04
 */
export class ComponentSinglesArticleSwitch extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   *
   * - @type {SingleDae} single - 記事データ
   * - @type {boolean} sign - ログイン済みユーザーフラッグ, true: ログイン済み
   * - @type {number} index - 次の記事一覧・記事表示順序
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
  // ここで FB.init すると複数回発生し効率が悪いのでやめる
  // componentDidMount() {
  //   Fb.init();
  // }
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSinglesArticleSwitch.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{
     *  single: SingleDae,
     *  index: number,
     *  sign: boolean,
     *  excerpt: boolean
     * }}
     * */
    this.state = {
      single: props.single,
      index: props.index,
      sign: props.sign,
      excerpt: true
    };
    /**
     * bound anchorClick
     * @type {function}
     */
    this.boundClick = this.anchorClick.bind(this);
    /**
     * scroll top value
     * @type {number}
     */
    this.y = 0;
    this.root = null;
    this.offset = null;
    this.excerpt = this.excerpt.bind(this);
    this.content = this.content.bind(this);
  }
  // componentDidMount() {
  //   // -----------------------
  //   // element height setting
  //   const offset = Offset.offset(this.root);
  //   this.setState({ minHeight: offset.height });
  // }
  /**
   * a.onclick event handler<br>
   * 本文を表示しボタンを隠します
   * @param {Event} event a.onclick event
   * @since 2017-02-22 `103250` を外部リンクにする
   * @see https://github.com/undotsushin/undotsushin/issues/1593
   * */
  anchorClick(event) {
    if (this.state.single.id !== 103250) {
      event.preventDefault();
      // this.y = Scroll.y;
      const y = Scroll.y;
      // contents 詳細切り替え
      this.setState({ excerpt: !this.state.excerpt });
      // クリック後遅延してscroll移動
      // @since 2017-01-17
      Scroll.motion(y, 0.1, 0.25);
    }
  }
  /**
   * 省略文章を表示します
   * @return {XML} ComponentSingleSNS + a を返します
   * */
  excerpt() {
    const single = this.state.single;
    return (
      <div
        className="js-root"
        ref={(component) => {
          this.root = component;
        }}
      >
        <ComponentSinglesArticleExcerpt
          single={single}
          index={this.state.index}
        />
        {/* SNS */}
        <ComponentSingleSNS
          single={single}
          index={this.state.index}
        />
        {/* link */}
        <div className="btn-readmore">
          <a href={single.url} className="btn-readmore-link" onClick={this.boundClick}>
            <span className="btn-readmore-label">{Message.READ_MORE}</span>
          </a>
        </div>
      </div>
    );
  }
  /**
   * 本文を表示します
   * @return {XML} ComponentSingleContent {@link ComponentSingleContent} を返します
   */
  content() {
    // scroll 位置が下がるので元に戻す
    // ここまずい何度も反応する - 2017-01-17
    // Scroll.motion(this.y, 0.1, 0.25);
    // Scroll.y = this.y;
    // XML
    return (
      <ComponentSingleContent
        single={this.state.single}
        sign={this.state.sign}
        index={this.state.index}
      />
    );
  }
  /**
   * excerpt / 本文 のどちらかを表示します
   * @return {XML} excerpt / content を実行し出力します
   */
  render() {
    const output = this.state.excerpt ? this.excerpt : this.content;
    return (
      <div
        className="js-root-container"
      >
        {output()}
      </div>
    );
    // if (this.state.excerpt) {
    //   return this.excerpt();
    // } else {
    //   return this.content();
    // }
  }
}
