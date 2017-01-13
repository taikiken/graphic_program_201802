/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/11 - 22:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../../app/const/Message';

// component/singles
import { ComponentSinglesArticleExcerpt } from '../../../component/singles-magnet/ComponentSinglesArticleExcerpt';

// component/singles-content
import { SPComponentSingleContent } from '../singles-content/SPComponentSingleContent';
import { SPComponentSinglesSNSBelow } from '../singles-content/SPComponentSinglesSNSBelow';

// // util
import { Scroll } from '../../../util/Scroll';
import { Validate } from '../../../util/Validate';

// React
const React = self.React;

/**
 * mobile: 記事詳細・次の記事一覧の記事表示<br>
 * 「続きを読む」クリックで本文を表示します
 * @since 2016-11-11
 */
export class SPComponentSinglesArticleSwitch extends React.Component {
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
     * bound validateClick
     * @type {function}
     */
    this.boundClick = this.validateClick.bind(this);
    /**
     * scroll top value
     * @type {number}
     */
    this.y = 0;
    /**
     * body 本文に `video` tag が存在する時は遷移する
     * @since 2017-01-13
     */
    this.external = Validate.include(props.single.body, '<video data-video-id="');
  }
  /**
   * click event handler
   * this.external が true の時は何もしない
   * @param {Event} event click
   * @since 2017-01-13
   * @see https://undo-tsushin.slack.com/archives/product-web/p1484298774000116
   */
  validateClick(event) {
    if (!this.external) {
      // 記事詳細を開くための処理に移動
      this.anchorClick(event);
    }
  }
  /**
   * a.onclick event handler<br>
   * 本文を表示しボタンを隠します
   * @param {Event} event a.onclick event
   * */
  anchorClick(event) {
    event.preventDefault();
    this.y = Scroll.y;
    this.setState({ excerpt: !this.state.excerpt });
  }
  /**
   * 省略文章を表示します
   * @return {XML} ComponentSingleSNS + a を返します
   * */
  excerpt() {
    const single = this.state.single;
    return (
      <div className="js-root">
        <ComponentSinglesArticleExcerpt
          single={single}
          index={this.state.index}
        />
        {/* SNS */}
        <SPComponentSinglesSNSBelow
          single={single}
          index={this.state.index}
        />
        {/* link */}
        <div className="post-content-read-more">
          <a href={single.url} className="post-content-btn-readMore" onClick={this.boundClick}>{Message.READ_MORE}</a>
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
    Scroll.motion(this.y, 0.1, 0.25);
    // XML
    return (
      <SPComponentSingleContent
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
    if (this.state.excerpt) {
      return this.excerpt();
    } else {
      return this.content();
    }
  }
}
