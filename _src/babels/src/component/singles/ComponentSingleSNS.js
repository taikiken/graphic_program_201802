/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 17:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../view/View';

// app
import { MessageSNS } from '../../app/const/MessageSNS';

// React
const React = self.React;

/**
 * 記事詳細上部 SNS ブロック<br>
 * PC版は、上部・下部とも同じなので兼用して使います
 * @since 2016-09-25
 */
export class ComponentSingleSNS extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae, callback: Function}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      callback: React.PropTypes.func.isRequired
    };
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 別ウインドウを開き Facebook share します
   * @param {Event} event click event
   * @return {boolean} false を返します
   */
  static openFacebook(event) {
    event.preventDefault();
    const target = event.target;
    const href = target.href;
    if (!href) {
      return false;
    }

    window.open(encodeURI(decodeURI(href)), 'FBwindow', 'width=650, height=470, menubar=no, toolbar=no, scrollbars=yes');
    return false;
  }
  /**
   * 別ウインドウを開き Tweet します
   * @param {Event} event click event
   * @return {boolean} false を返します
   */
  static openTwitter(event) {
    event.preventDefault();
    const target = event.target;
    const href = target.href;
    if (!href) {
      return false;
    }

    window.open(encodeURI(decodeURI(href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
    return false;
  }
  /**
   * 別ウインドウを開き LINEへ送る します
   * @param {Event} event click event
   * @return {boolean} false を返します
   */
  static openLine(event) {
    event.preventDefault();
    const target = event.target;
    const href = target.href;
    if (!href) {
      return false;
    }

    window.open(encodeURI(decodeURI(href)), 'LINEwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
    return false;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSingleSNS.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{single: SingleDae}}
     */
    this.state = {
      single: props.single
    };
    //
    // this.boundFB = this.openFacebook.bind(this);
    // this.boundTW = this.openTwitter.bind(this);
    // this.boundLine = this.openLine.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, mount 後に呼び出され `View.DID_MOUNT` を発火します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
  /**
   * 記事詳細SNSを更新します
   * @param {SingleDae} single 記事詳細 JSON data
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * `div.post-sns` を出力します, SNS block 記事上です
   * @return {?XML} `div.post-sns` を返します、出力すべきものがない時は null を返します
   */
  render() {
    const single = this.state.single;
    const url = single.url;
    if (!url) {
      return null;
    }

    const title = single.title;
    return (
      <div className="post-sns">
        <ul className="post-sns-list">
          {/* facebook like */}
          <li className="post-sns-item post-sns-item_fbgood">
            <div
              className="fb-like"
              data-href={url}
              data-layout="box_count"
              data-action="like"
              data-show-faces="false"
              data-share="false"
            />
          </li>
          {/* facebook share */}
          <li className="post-sns-item post-sns-item_fb">
            <a href={`http://www.facebook.com/share.php?u=${url}&t=${title}`} rel="nofollow" onClick={ComponentSingleSNS.openFacebook}>
              {MessageSNS.FACEBOOK}
            </a>
          </li>
          {/* Twitter */}
          <li className="post-sns-item post-sns-item_tw">
            <a href={`http://twitter.com/share?text=${title}&url=${url}&via=${MessageSNS.VIA}`} rel="nofollow" onClick={ComponentSingleSNS.openTwitter}>
              <span>{MessageSNS.TWEET}</span>
            </a>
          </li>
          {/* Google+ */}
          <li className="post-sns-item post-sns-item_gt">
            <a href={`https://plus.google.com/share?url=${url}`} rel="nofollow" onClick={ComponentSingleSNS.openLine}>
              {MessageSNS.GOOGLE_PLUS}
            </a>
          </li>
          {/* LINE */}
          <li className="post-sns-item post-sns-item_line">
            <a href="http://line.me/R/msg/text/" rel="nofollow">
              <span>{MessageSNS.SEND_LINE}</span>
            </a>
          </li>
        </ul>
        {/* facebook like 2 */}
        <div className="post-sns-pr">
          <dl className="post-sns-pr-inner">
            <dt><img src="/assets/images/detail/post-sns-lead.png" alt={MessageSNS.FB_IMG_ALT}/></dt>
            <dd>
              <div
                className="fb-like"
                data-href="https://www.facebook.com/sportsbull/"
                data-layout="box_count"
                data-action="like"
                data-show-faces="false"
                data-share="false"
              />
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
