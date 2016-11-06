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
import { Message } from '../../app/const/Message';
//
// // view
// import { View } from '../../view/View';

// ga
import { GaData } from '../../ga/GaData';
import { Ga } from '../../ga/Ga';

// React
const React = self.React;

/**
 * 記事詳細本文および省略分を表示します
 *
 * 次の記事一覧コンテンツを全て `JS` 出力するので<br>
 * `/app/template/[desktop|mobile]/p.php` から移植しました
 * @since 2016-09-25
 */
export class ComponentSinglePost extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired
    };
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------

  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSingleBody.propTypes}
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

    this.boundMore = this.onReadMore.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, mount 後に呼び出され `View.DID_MOUNT` を発火します
   */
  componentDidMount() {
    // this.props.callback(View.DID_MOUNT);
  }
  /**
   * 記事詳細本文を更新します
   * @param {SingleDae} single 記事詳細 JSON data
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * external read more click で ga tag を送信します<br>
   * `ViewSingle.onExternal` {@link ViewSingle.onExternal} と同じです
   */
  onReadMore() {
    const category = 'external_link';
    const action = 'click';
    const label = this.state.single.readmore.url;
    const method = 'ComponentSinglePost.onReadMore';
    // ----------------------------------------------
    // GA 計測タグ
    // 記事詳細で続きを読むのリンク先トラッキング
    Ga.add(new GaData(method, category, action, label, 0, true));
    // ----------------------------------------------
  }
  /**
   * 省略本文とリンクを出力します<br>
   * 「続きを読む」（提供元サイトへ別ウインドウ遷移）します<br>
   *  リンククリックで ga 送信を行います
   * @return {?XML} `div.post-content` を返します、出力すべきものがない時は null を返します
   */
  excerpt() {
    const single = this.state.single;
    const description = single.description;
    // data 不正
    if (!description) {
      return null;
    }
    // 続きを読む コンテナ
    return (
      <div className="post-content">
        <p>{description}</p>
        <p>
          <a href={single.readmore.url} target="_blank" onClick={this.boundMore}>
            {Message.READ_MORE_EXTERNAL}
          </a>
        </p>
      </div>
    );
  }
  /**
   * 記事詳細本文を出力します
   * @return {?XML} 記事詳細本文を返します
   */
  body() {
    const single = this.state.single;
    const body = single.body;
    // data 不正
    if (!body) {
      return null;
    }
    // 本文
    return (
      <div className="post-content" dangerouslySetInnerHTML={{__html: body}} />
    );
  }
  /**
   * `div.post-content` を出力します
   * @return {?XML} `div.post-content` を返します、出力すべきものがない時は null を返します
   */
  render() {
    const single = this.state.single;
    // const body = single.body;
    if (!single) {
      return null;
    }

    // 「続きを読む」（提供元サイトへ別ウインドウ遷移）フラッグ ON の時は `excerpt` をコールします
    if (single.readmore.isReadmore) {
      return this.excerpt();
    } else {
      return this.body();
    }
  }
}
