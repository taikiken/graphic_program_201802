/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 12:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../../app/const/Message';

// view
import { View } from '../../../view/View';

// React
const React = self.React;

/**
 * SP: 記事詳細本文および省略分を表示します
 * @since 2016-09-25
 */
export class SPComponentSingleBody extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentSingleBody.propTypes}
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
   * `div.post-content` を出力します
   * @return {?XML} `div.post-content` を返します、出力すべきものがない時は null を返します
   */
  render() {
    const single = this.state.single;
    const body = single.body;
    if (!body) {
      return null;
    }

    if (single.readmore.isReadmore) {
      return SPComponentSingleBody.excerpt(single);
    } else {
      return SPComponentSingleBody.body(body);
    }
  }
  /**
   * 記事詳細本文を更新します
   * @param {SingleDae} single 記事詳細 JSON data
   */
  updateSingle(single) {
    this.setState({ single });
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 省略本文とリンクを出力します
   * @param {SingleDae} single 記事詳細 JSON data
   * @return {?XML} `div.post-content` を返します、出力すべきものがない時は null を返します
   */
  static excerpt(single) {
    const description = single.description;
    // data 不正
    if (!description) {
      return null;
    }

    return (
      <div id="post-content-container" className="post-content">
        <p>{description}</p>
        <p>
          <a href={single.readmore.url} target="_blank">{Message.READ_MORE_EXTERNAL}</a>
        </p>
      </div>
    );
  }
  /**
   * 記事詳細本文を出力します
   * @param {string} body 記事詳細本文(HTML)
   * @return {XML} 記事詳細本文を返します
   */
  static body(body) {
    return (
      <div className="sp_post-content">
        <div id="post-content-container" className="post-content excerpt hidden" dangerouslySetInnerHTML={{__html: body}} />
        <div id="post-content-read-more" className="post-content-read-more" />
      </div>
    );
  }
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
}
// /**
//  * プロパティ
//  * @type {{single: SingleDae, callback: Function}}
//  */
// SPComponentSingleBody.propTypes = {
//   single: React.PropTypes.object.isRequired,
//   callback: React.PropTypes.func.isRequired
// };
