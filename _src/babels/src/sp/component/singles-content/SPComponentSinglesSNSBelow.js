/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/10 - 19:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { MessageSNS } from '../../../app/const/MessageSNS';


// React
const React = self.React;

/**
 * mobile: single SNS 下部
 */
export class SPComponentSinglesSNSBelow extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  single: SingleDae,
   *  index: number
   * }} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentSinglesSNSBelow.propTypes}
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
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 記事詳細SNSを更新します
   * @param {SingleDae} single 記事詳細 JSON data
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * div.post-sns_lower
   * @return {?XML} div.post-sns_lower
   * */
  render() {
    const single = this.state.single;
    const url = single.url;
    if (!url) {
      return null;
    }
    // output
    const title = single.title;
    return (
      <div className={`post-sns_lower post-sns_lower-${single.id}`}>
        <div className="post-sns-list">
          {/* Facebook */}
          <div className="post-sns-fixed">
            <div className="post-sns-item_fbgood">
              <div className="fb-like"
                 data-href={url}
                 data-layout="box_count"
                 data-action="like"
                 data-show-faces="false"
                 data-share="false"
              />
            </div>
          </div>
          {/* flex */}
          <div className="post-sns-flex">
            <div className="post-sns-flex-inner">
              <ul className="post-sns-flex-list">
                {/* Facebook */}
                <li className="post-sns-item post-sns-item_fb">
                  <a href={`http://www.facebook.com/share.php?u=${url}&t=${title}`} target="_blank">
                    <span>{MessageSNS.FACEBOOK}</span>
                  </a>
                </li>
                {/* Twitter */}
                <li className="post-sns-item post-sns-item_tw">
                  <a href={`http://twitter.com/share?text=${encodeURIComponent(title)}&url=${url}&via=${MessageSNS.VIA}`} target="_blank">
                    <span>{MessageSNS.TWEET}</span>
                  </a>
                </li>
                {/* G+ */}
                <li className="post-sns-item post-sns-item_gt">
                  <a href={`https://plus.google.com/share?url=${url}`} target="_blank">
                    <span>{MessageSNS.GOOGLE_PLUS}</span>
                  </a>
                </li>
                {/* Line */}
                <li className="post-sns-item post-sns-item_line">
                  <a href={`http://line.me/R/msg/text/?${encodeURIComponent(title + ' ' + url)}`} target="_blank">
                    <span>{MessageSNS.SEND_LINE}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* pr */}
        <div className="post-sns-pr">
          <dl className="post-sns-pr-inner">
            <dt><span>いいねして最新ニュースをチェック！</span></dt>
            <dd>
              <div className="fb-like"
               data-href={url}
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
