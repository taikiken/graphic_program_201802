/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/10 - 19:12
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
 * mobile: 記事詳細・次の記事一覧 SNS 上部
 */
export class SPComponentSinglesSNSAbove extends React.Component {
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
   * @param {Object} props React props プロパティー {@link SPComponentSinglesSNSAbove.propTypes}
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
   * div.post-sns_upper
   * @return {?XML} div.post-sns_upper
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
      <div className={`post-sns post-sns-${single.id}-${this.props.index}`}>
        <div className="post-sns-list">
          <div className="post-sns-fixed">
            {/* facebook like */}
            <div
              className="fb-like"
              data-href={url}
              data-layout="box_count"
              data-action="like"
              data-show-faces="false"
              data-share="false"
            />
          </div>
        </div>
        <div className="post-sns-flex">
          <div className="post-sns-flex-inner">
            <ul className="post-sns-flex-list">
              {/* facebook share */}
              <li className="post-sns-item post-sns-item_fb">
                <a href={`http://www.facebook.com/share.php?u=${url}&t=${title}`} target="_blank">
                  {MessageSNS.FACEBOOK}
                </a>
              </li>
              {/* Twitter */}
              <li className="post-sns-item post-sns-item_tw">
                <a href={`http://twitter.com/share?text=${encodeURIComponent(title)}&url=${url}&via=${MessageSNS.VIA}`} target="_blank">
                  <span>{MessageSNS.TWEET}</span>
                </a>
              </li>
              {/* LINE */}
              <li className="post-sns-item post-sns-item_line">
                <a href={`http://line.me/R/msg/text/?${encodeURIComponent(title + ' ' + url)}`} target="_blank">
                  <span>{MessageSNS.SEND_LINE}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
