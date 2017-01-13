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
import { Validate } from '../../util/Validate';

// singles/head
import { SinglesHistory } from '../../singles/SinglesHistory';


// React
const React = self.React;


// History API
// const history = self.history;

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
      index: React.PropTypes.number.isRequired,
      // Page instance
      // @since 2017-01-13
      page: React.PropTypes.object.isRequired,
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
      excerpt: true,
      opened: false,
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
    /**
     * 起点URLを取得するために使用します
     * @type {SinglesHistory}
     */
    this.manager = SinglesHistory.factory();
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
    // else {
    //   const url = this.manager.base();
    //   console.log('validateClick url ++++++++', url, !!url);
    //   if (!!url) {
    //     console.log('validateClick url', url);
    //     const page = this.props.page;
    //     history.pushState(page.info(), page.title(), page.url());
    //     // this.manager.replace(this.props.page);
    //     // location.href = url;
    //     // event.preventDefault();
    //   }
    // }
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
   * 「続きを読む」のないHTML
   * @returns {XML} ComponentSingleSNS
   */
  opened() {
    const single = this.state.single;
    return (
      <div className="js-root">
        <ComponentSinglesArticleExcerpt
          single={single}
          index={this.state.index}
        />
        {/* SNS */}
        <ComponentSingleSNS
          single={single}
          index={this.state.index}
        />
      </div>
    );
  }
  /**
   * 省略文章を表示します
   * @return {XML} ComponentSingleSNS + a を返します
   * */
  excerpt() {
    const single = this.state.single;
    // 遷移すると browser back で click 記事に戻るので _blank させる
    // @since 2017-01-13
    const blank = this.external ? '_blank' : '_self';

    return (
      <div className="js-root">
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
          <a href={single.url} className="btn-readmore-link" onClick={this.boundClick} target={blank}>
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
    Scroll.motion(this.y, 0.1, 0.25);
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
    if (this.state.opened) {
      return this.opened();
    } else if (this.state.excerpt) {
      return this.excerpt();
    } else {
      return this.content();
    }
  }
}
