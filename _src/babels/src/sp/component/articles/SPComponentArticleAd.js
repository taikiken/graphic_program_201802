/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/22 - 15:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Ad } from '../../../app/const/Ad';

// React
const React = self.React;

/**
 * 広告タグ {@link SPNewsAdNode}
 * @since 2016-09-21
 */
export class SPComponentArticleAd extends React.Component {
  /**
   * プロパティと初期変数を設定します
   * @param {Object} props React.props {@link SPViewArticleAd.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{third: boolean}}
     */
    this.state = {
      // index が 2 の時に広告をinsert
      third: props.index === 2
    };
    /**
     * 広告フラッグ（挿入済み）
     * @type {boolean}
     */
    this.ok = false;
  }

  /**
   * 3番目（添字 2）で「広告タグ」が設定されている時に出力します<br>
   * コンテンツが（添字 2）に届かない時は記事の最後に出力します
   * @return {?XML} 広告 tag を返します
   */
  render() {
    // ストリーム広告
    // ID 設定がなかったら出力しない
    if (!this.props.adSp) {
      return null;
    }
    // 出力は1回だけ
    if (this.ok) {
      return null;
    }
    // index が 2
    if (this.state.third) {
      return this.ad();
    }

    // index が 2に到達しない, コンテンツ量が少ない時にも広告を表示させる
    // index 2 未満 + 総数 と index が同じ
    // index は 0始まりなので +1 下駄を履かせて比較する
    if (this.props.index < 2 && this.props.index + 1 === this.props.length) {
      return this.ad();
    }

    // 条件外
    return null;
  }
  /**
   * 広告用のタグを作成します
   * @return {XML} 広告用のタグを返します
   */
  ad() {
    // 広告タグ親コンテナを作成し `script` tag を insert させる
    this.ok = true;
    return (
      <div className={`board-item news-ad news-ad-${this.props.index}`} ref="newsAd"></div>
    );
  }
  /**
   * 広告タグが出力されたら `Ad.makeStream` を実行し `script` tag を挿入します {@link Ad.makeStream}
   */
  componentDidMount() {
    if (this.ok && !!this.refs.newsAd) {
      // console.log('SPComponentArticleAd.componentDidMount', this.props.adSp);
      this.refs.newsAd.appendChild(Ad.makeStream(this.props.uniqueId, this.props.adSp));
    }
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{index: number, length: number, uniqueId: string, adSp: string}} React props
   */
  static get propTypes() {
    return {
      // index, 何番目
      index: React.PropTypes.number.isRequired,
      // loop list の length === 総数
      length: React.PropTypes.number.isRequired,
      // element id に使用する
      uniqueId: React.PropTypes.string.isRequired,
      // ストリーム広告
      adSp: React.PropTypes.string.isRequired
    };
  }
}
// /**
//  * プロパティ
//  * @type {{
//  *  index: number,
//  *  length: number,
//  *  uniqueId: string,
//  *  adSp: string
//  * }}
//  */
// SPComponentArticleAd.propTypes = {
//   // index, 何番目
//   index: React.PropTypes.number.isRequired,
//   // loop list の length === 総数
//   length: React.PropTypes.number.isRequired,
//   // element id に使用する
//   uniqueId: React.PropTypes.string.isRequired,
//   // ストリーム広告
//   adSp: React.PropTypes.string.isRequired
// };
