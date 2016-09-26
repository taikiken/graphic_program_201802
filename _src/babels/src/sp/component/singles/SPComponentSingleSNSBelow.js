/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/26 - 13:01
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
 * SP: 記事詳細下部 SNS ブロック
 * @since 2016-09-27
 */
export class SPComponentSingleSNSBelow extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentSingleSNSBelow.propTypes}
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
   * `div.post-sns_lower` を出力します, SNS block 記事下です
   * @return {?XML} `div.post-sns_lower` を返します、出力すべきものがない時は null を返します
   */
  render() {
    const single = this.state.single;
    const url = single.url;
    if (!url) {
      return null;
    }

    const title = single.title;
    return (
      <div className="post-sns_lower">
        <div className="post-sns-fixed">
          <div className="post-sns-item_fbgood"><div className="fb-like" data-href="<?php echo $page['og_url']; ?>" data-layout="box_count" data-action="like" data-show-faces="false" data-share="false"></div></div>
        </div>

        <div className="post-sns-flex">
          <div className="post-sns-flex-inner">
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
          </div>
        </div>
        {/* facebook like 2 */}
        <div className="post-sns-pr">
          <dl className="post-sns-pr-inner">
            <dt><span>{MessageSNS.FB_IMG_ALT}</span></dt>
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

