/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/04 - 20:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewsDae from '../dae/NewsDae';
import Polling from '../../moku/tick/Polling';

/**
 * 関連ニュースを表示します
 */
export class ComponentNewsContainer extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * React.propTypes
   * @type {{news: NewsDae}}
   */
  static propTypes = {
    news: PropTypes.instanceOf(NewsDae).isRequired,
  };
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * 複数カテゴリー・ラベルを ', ' で連結し終端に ' : ' を加えます
   * @param {Array<Category>} categories カテゴリー一覧
   * @return {string} 複数カテゴリー・ラベルを ', ' で連結し終端に ' : ' を加え返します
   */
  static categories(categories) {
    if (categories.length === 0) {
      return '';
    }
    const cat = categories.map(category => category.name);
    const txt = cat.join(', ');
    return `${txt} : `;
  }
  /**
   * `rotateX(0deg)` （表示）時の style object<br>
   * `z-index` を上にしカバーするように登場させます<br>
   *  `transition-delay` を設定しタイミングをずらします
   * @return {{transform: string, zIndex: number, transitionDelay: string}} style object
   */
  static zeroStyle() {
    return {
      transform: 'rotateX(0deg)',
      zIndex: 120,
      transitionDelay: '0.25s',
    };
  }
  /**
   * `rotateX(90deg)`（非表示）時の style object
   * @return {{transform: string, zIndex: number}} style object
   */
  static ninetyStyle() {
    return {
      transform: 'rotateX(90deg)',
      zIndex: 110,
    };
  }
  /**
   * 初期状態 style object を生成します
   * @param {number} index 関連記事の表示順序, 0 ~
   * @return {Object} style object
   */
  static initStyle(index) {
    // x: 90 - transform: matrix3d(1,0,0.00,0,0.00,0,1.00,0,0,-1,0,0,0,0,0,1);
    // x:  0 - transform: matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1);
    if (index === 0) {
      return ComponentNewsContainer.zeroStyle();
    }
    return ComponentNewsContainer.ninetyStyle();
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 関連ニュース出力準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * 現在の表示関連ニュース index
     * @type {number}
     */
    this.index = 0;
    /**
     * 最終 index + 1, index は last 以上にならないようにします
     * @type {number}
     */
    this.last = props.news.list.length;
    /**
     * React.state
     * - styles - news container の style 設定をリスト化します
     * @type {{styles: Array.<string>}}
     */
    this.state = {
      styles: props.news.list.map((data, index) => (ComponentNewsContainer.initStyle(index))),
    };
    // ---
    // polling
    const polling = new Polling(1000 * 5);
    polling.on(Polling.UPDATE, this.onUpdate.bind(this));
    /**
     * news 切替にしようする {@link Polling} instance
     * @type {Polling}
     */
    this.polling = polling;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * マウント後 `polling` 監視を開始します
   */
  componentDidMount() {
    // 存在するときのみ
    if (this.last > 0) {
      this.polling.start();
    }
  }
  /**
   * Polling.UPDATE event handler<br>
   * index をカウントアップし次の記事を表示します
   */
  onUpdate() {
    // count up
    this.index += 1;
    if (this.last === this.index) {
      // 終端に届いたので 0 に戻す
      this.index = 0;
    }
    const { news } = this.props;
    // 一旦全て非表示のスタイルを作成します
    const styles = news.list.map(() => ComponentNewsContainer.ninetyStyle());
    // 該当記事の index を表示にします
    styles[this.index] = ComponentNewsContainer.zeroStyle();
    // React state を update します
    this.setState({ styles });
  }
  /**
   * `div.related-news` を出力します
   * @return {?XML} `div.related-news` or null
   */
  render() {
    // 存在するときのみ
    if (this.last === 0) {
      return null;
    }
    const { news } = this.props;
    // has data
    return (
      <div className="related-news">
        <div className="container">
          <h2>関連ニュース</h2>
          <ul className="related-news-list">
            {
              news.list.map((related, index) => {
                const key = `${related.taxonomy}-${related.id}-${index}`;
                return (
                  <li
                    key={key}
                    className={`related-item related-${related.id}`}
                    style={this.state.styles[index]}
                  >
                    <a href={related.permalink}>
                      {ComponentNewsContainer.categories(related.category)}
                      {related.postTitle}
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * 関連ニュースを出力します
 * - {@link ComponentNewsContainer}
 * @param {?NewsDae} result JSON 変換データ
 * @returns {?XML} {@link ComponentNewsContainer}
 */
const ComponentNews = ({ result }) => {
  // console.log('ComponentNews', result);
  if (!result) {
    return null;
  }
  return (
    <ComponentNewsContainer news={result} />
  );
};

ComponentNews.propTypes = {
  result: PropTypes.instanceOf(NewsDae),
};

ComponentNews.defaultProps = {
  result: null,
};

export default ComponentNews;
