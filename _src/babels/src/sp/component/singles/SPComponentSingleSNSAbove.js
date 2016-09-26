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
 * SP: 記事詳細上部 SNS ブロック
 * @since 2016-09-25
 */
export class SPComponentSingleSNSAbove extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentSingleSNSAbove.propTypes}
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
  }
  /**
   * `div.post-sns_upper` を出力します, SNS block 記事上です
   * @return {?XML} `div.post-sns_upper` を返します、出力すべきものがない時は null を返します
   */
  render() {
    const single = this.state.single;
    const url = single.url;
    if (!url) {
      return null;
    }

    const title = single.title;
    return (
      <div className="post-sns_upper">
        <ul className="post-sns-list">
          {/* facebook share */}
          <li className="post-sns-item post-sns-item_fb">
            <a href={`http://www.facebook.com/share.php?u=${url}&t=${title}`} rel="nofollow" target="_blank">
              <span>{MessageSNS.FACEBOOK}</span>
            </a>
          </li>
          {/* Twitter スマホ版はTwitter textをencodeする */}
          <li className="post-sns-item post-sns-item_tw">
            <a href={`http://twitter.com/share?text=${encodeURIComponent(title)}&url=${url}&via=${MessageSNS.VIA}`} rel="nofollow" target="_blank">
              <span>{MessageSNS.TWEET}</span>
            </a>
          </li>
          {/* Google+ */}
          <li className="post-sns-item post-sns-item_gt">
            <a href={`https://plus.google.com/share?url=${url}`} rel="nofollow" target="_blank">
              {MessageSNS.GOOGLE_PLUS}
            </a>
          </li>
          {/* LINE */}
          <li className="post-sns-item post-sns-item_line">
            <a href={`http://line.me/R/msg/text/?${encodeURIComponent(title)} ${url}`} rel="nofollow" target="_blank">
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
                data-href="https://facebook.com/undotsushin/"
                data-layout="box_count"
                data-action="like"
                data-show-faces="false"
                data-share="false"
              >
              </div>
            </dd>
          </dl>
        </div>
      </div>
    );
  }
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
  // ---------------------------------------------------
  //  STATIC METHOD
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
}
// /**
//  * プロパティ
//  * @type {{single: SingleDae, callback: Function}}
//  */
// SPComponentSingleSNSAbove.propTypes = {
//   single: React.PropTypes.object.isRequired,
//   callback: React.PropTypes.func.isRequired
// };
