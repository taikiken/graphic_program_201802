/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/20 - 20:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// RecommendTitleNode
// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * sidebar recommend title
 * - オススメ動画 / おすすめ記事 で共通 title
 * @param {string} title タイトル
 * @return {?XML} `div.widget-recommend-heading`
 * @since 2017-12-18
 */
const ComponentSidebarTitle = ({ title }) => (
  <div className="widget-recommend-heading">
    <h3 className="widget-recommend-heading-title">RECOMMEND</h3>
    <span className="widget-recommend-heading-ruby">{title}</span>
  </div>
);

/**
 * React.propTypes
 * @type {{title: string}}
 */
ComponentSidebarTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default ComponentSidebarTitle;
