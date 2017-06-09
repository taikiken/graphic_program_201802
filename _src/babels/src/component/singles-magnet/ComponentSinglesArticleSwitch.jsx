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
// state record
import { RecordSingleState } from '../singles-content/RecordSingleState';

// // util
import { Scroll } from '../../util/Scroll';
// since 2017-03-05
import { Validate } from '../../util/Validate';

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
    this.boundClick = this.validateClick.bind(this);
    // this.boundClick = this.anchorClick.bind(this);
    /**
     * scroll top value
     * @type {number}
     */
    this.y = 0;
    /**
     * .js-root Element
     * @type {?Element}
     */
    this.root = null;
    // this.offset = null;
    /**
     * bound excerpt - 省略文章を表示します
     * @type {function}
     */
    this.excerpt = this.excerpt.bind(this);
    /**
     * bound content - 本文を表示します
     * @type {function}
     */
    this.content = this.content.bind(this);
    /**
     * body 本文に `video` tag が存在する時は遷移する
     * SP のみ処理していたので
     * @since 2017-03-05
     */
    this.external = Validate.include(props.single.body, '<video data-video-id="');
    // ---
    // below 2017-04-17 - 「続きを読む」iframe 対応
    // recovery state
    /**
     * 情報を保持するための unique id - class name + 記事id
     * @type {string}
     * @since 2017-04-17
     */
    this.id = `ComponentSinglesArticleSwitch-${props.single.id}`;
    const record = RecordSingleState.restore(this.id);
    if (record) {
      this.state = record;
    }
  }
  // componentDidMount() {
  //   // -----------------------
  //   // element height setting
  //   const offset = Offset.offset(this.root);
  //   this.setState({ minHeight: offset.height });
  // }
  /**
   * click event handler
   * this.external が true の時は何もしない
   * @param {Event} event click
   * @since 2017-03-05
   * @see https://undo-tsushin.slack.com/archives/product-web/p1484298774000116
   * @see https://github.com/undotsushin/undotsushin/issues/1468
   * @see https://undo-tsushin.slack.com/archives/product-web/p1488679810000002
   * @see https://undo-tsushin.slack.com/archives/product-web/p1488690961000019
   */
  validateClick(event) {
    // iframe するので処理しない
    // @since 2017-04-12
    // if (!this.external) {
    //   // 記事詳細を開くための処理に移動
    //   this.anchorClick(event);
    // }
    this.anchorClick(event);
  }
  // /**
  //  * category: wbc で keywords に TBS が含まれているかを判定します
  //  * @return {boolean} true: wbc && TBS
  //  * @since 2017-03-05 - wbc && TBS 遷移する
  //  * @see https://github.com/undotsushin/undotsushin/issues/1468
  //  */
  // wbcTbs() {
  //   const single = this.state.single;
  //   // @type {Array<SlugDae>} - SlugDae: {{label: string, slug: string}}
  //   const categories = single.categories.all;
  //   let result = categories.some(category => category.slug === 'wbc');
  //   if (!result) {
  //     // false - not wbc
  //     return result;
  //   }
  //   const keywords = single.keywords;
  //   return keywords.some(keyword => keyword === 'TBS');
  // }
  // /**
  //  * 記事提供元がバーチャル高校野球 && 第89回選抜高等学校野球大会 のタグがついた記事 - id: '26'
  //  *
  //  * > 記事詳細APIのuser.idが"26"の記事が対象になります。
  //  * @return {boolean} true: 対象記事
  //  * @since 2017-03-15 - 記事提供元がバーチャル高校野球
  //  * @see https://undo-tsushin.slack.com/archives/product-web/p1489556150487078
  //  * @see https://github.com/undotsushin/undotsushin/issues/1699
  //  */
  // vk89Baseball() {
  //   // 記事提供元がバーチャル高校野球 && 第89回選抜高等学校野球大会 のタグがついた記事 - id: '26'
  //   // @type {SingleDae}
  //   const single = this.state.single;
  //   // @type {UserDae}
  //   const user = single.user;
  //   return user && parseInt(user.id, 10) === 26;
  //   // let result = user && parseInt(user.id, 10) === 26;
  //   // if (!result) {
  //   //   return false;
  //   // }
  //   // const keywords = single.keywords;
  //   // return keywords.some(keyword => keyword === '第89回選抜高等学校野球大会');
  // }
  // iframe するので処理しない
  // @since 2017-04-12
  // /**
  //  * 「続きを読む」でその場で開いて良いかの判定を行います
  //  * @return {boolean} true: その場で開く, false: 何もしない - 遷移する
  //  * @since 2017-03-05 - wbc && TBS 遷移する
  //  * @see https://github.com/undotsushin/undotsushin/issues/1468
  //  */
  // canContinue() {
  //   let can = true;
  //   // since 2017-02-22 `103250` を外部リンクにする
  //   if (this.state.single.id === 103250) {
  //     can = false;
  //   }
  //   // check wbc && tbs
  //   if (can) {
  //     // wbc && tbs の時 true が返るので「続きを読む」可能な時は反転させて使います
  //     // return !this.wbcTbs();
  //     can = !this.wbcTbs();
  //   }
  //   // check 記事提供元がバーチャル高校野球
  //   if (can) {
  //     // true が返るので「続きを読む」可能な時は反転させて使います
  //     can = !this.vk89Baseball();
  //   }
  //   return can;
  // }
  /**
   * a.onclick event handler<br>
   * 本文を表示しボタンを隠します
   * @param {Event} event a.onclick event
   * @since 2017-02-22 `103250` を外部リンクにする
   * @see https://github.com/undotsushin/undotsushin/issues/1593
   * */
  anchorClick(event) {
    // iframe するので処理しない
    // @since 2017-04-12
    // if (this.canContinue()) {
    // // if (this.state.single.id !== 103250) {
    //   event.preventDefault();
    //   // this.y = Scroll.y;
    //   const y = Scroll.y;
    //   // contents 詳細切り替え
    //   this.setState({ excerpt: !this.state.excerpt });
    //   // クリック後遅延してscroll移動
    //   // @since 2017-01-17
    //   Scroll.motion(y, 0.1, 0.25);
    // }
    event.preventDefault();
    // this.y = Scroll.y;
    const y = Scroll.y;
    // contents 詳細切り替え
    // this.setState({ excerpt: !this.state.excerpt });
    // @since 2017-04-17 - false にしかならないので変更する
    this.setState({ excerpt: false });
    // クリック後遅延してscroll移動
    // @since 2017-01-17
    Scroll.motion(y, 0.1, 0.25);
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
  // ------
  // delegate
  /**
   * unmount 時に state を保存します
   * @since 2017-04-17
   */
  componentWillUnmount() {
    // console.log('ComponentSinglesArticleSwitch.componentWillUnmount =====', this.id, this.state.excerpt);
    RecordSingleState.store(this.id, this.state);
  }
  /**
   * excerpt / 本文 のどちらかを表示します
   * @return {XML} excerpt / content を実行し出力します
   */
  render() {
    // console.log('ComponentSinglesArticleSwitch.render', this.id, this.state);
    const output = this.state.excerpt ? this.excerpt : this.content;
    return (
      <div
        className="js-root-container"
      >
        {output()}
      </div>
    );
  }
}
