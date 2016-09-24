/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/21 - 19:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../../view/View';

// view/categories
import { ViewHeadlineAd } from '../../../view/categories/ViewHeadlineAd';

// sp/view/headline
import { SPComponentHeadlines } from '../headline/SPComponentHeadlines';

// React
const React = self.React;

/**
 * SP: 記事一覧 headline を表示するための基本コンテナを作成します
 * @since 2016-09-20
 */
export class SPComponentHeadlineOption extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link SPComponentHeadlineOption.propTypes}
   */
  constructor(props) {
    super(props);
  }
  /**
   * 記事一覧 headline を表示するための基本コンテナを作成します
   * @return {?XML} 記事一覧 headline を表示するための基本コンテナを返します
   */
  render() {
    const list = this.props.list;
    if (list.length === 0) {
      return null;
    }

    return (
      <div className="headline-section">
        <div className="headline-outer">
          <div id="headline-container">
            <SPComponentHeadlines
              list={list}
              callback={this.props.callback}
              home={this.props.home}
            />
          </div>
          <ViewHeadlineAd
            browser={this.props.browser}
            ad={this.props.ad}
          />
        </div>
      </div>
    );
  }
  /**
   * マウント後に `View.DID_MOUNT` を callback へ通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
}

/**
 * プロパティ
 * @type {{
 *  list: Array<RelatedDae>,
 *  callback: Function,
 *  home: boolean,
 *  ad: string,
 *  browser: string
 * }}
 */
SPComponentHeadlineOption.propTypes = {
  // articles 配列を元にDomを作成する
  list: React.PropTypes.array.isRequired,
  callback: React.PropTypes.func.isRequired,
  home: React.PropTypes.bool.isRequired,
  ad: React.PropTypes.object.isRequired,
  browser: React.PropTypes.string.isRequired
};
