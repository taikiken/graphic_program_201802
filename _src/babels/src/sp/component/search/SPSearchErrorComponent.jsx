/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/11 - 21:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Ad } from '../../../app/const/Ad';

/**
 * [library] - React
 */
const React = self.React;

/**
 * {@link SPViewSearch} - 検索結果が見つかりませんでした コンテナを出力します
 */
export default class SPSearchErrorComponent extends React.Component {
  /**
   * 検索結果が見つかりませんでした コンテナの準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    /**
     * `div.sponsor-link`
     * @type {?Element}
     */
    this.adContainer = null;
  }
  /**
   * delegate - after mount
   * - 広告タグを挿入します
   */
  componentDidMount() {
    if (this.adContainer) {
      this.adContainer.appendChild(Ad.make(Ad.SP_NEWS, 'sponsor-link-404'));
    }
  }

  /**
   * 検索結果が見つかりませんでした コンテナを出力します
   * @returns {XML} `div.result-notfound`
   */
  render() {
    return (
      <div className="result-notfound">
        <div
          id="sponsor-link-404"
          className="sponsor-link sponsor-link-404"
          ref={(element) => (this.adContainer = element)}
        />
        <div className="error-container result-notfound">
          <h2 className="result-notfound-heading">検索結果が見つかりませんでした</h2>
          <p className="result-notfound-lead">スペルを確認するか、他のキーワードを入力してみてください。</p>
          <div className="mod-btnA01">
            <a href="/">TOPに戻る</a>
          </div>
        </div>
      </div>
    );
  }
}
