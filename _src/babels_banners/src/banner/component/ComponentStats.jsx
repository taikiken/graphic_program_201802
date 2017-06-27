/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 21:30
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// stats
import ComponentList from './stats/ComponentList';

const React = self.React;

/**
 * バナー一覧出力親
 * - ComponentStats
 *   - {@link ComponentList}
 */
export default class ComponentStats extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON: bannerLists {{Array.<object>}}
   * ```
   * [
   * {
   *   "title": "サッカー",
   *   "banners": [
   *     {
   *       "image": "PCバナー画像URL",
   *       "url": "リンクURL"
   *     },
   *     {
   *     "image": "PCバナー画像URL",
   *     "url": "リンクURL"
   *     }
   *   ]
   * },
   *  {
   *   "title": "野球",
   *   "banners": [
   *     {
   *       "image": "PCバナー画像URL",
   *       "url": "リンクURL"
   *     },
   *     {
   *     "image": "PCバナー画像URL",
   *     "url": "リンクURL"
   *     }
   *   ]
   * }
   ]
   * ```
   * @returns {{banners: *, sp: *}} PropTypes を返します
   */
  static get propTypes() {
    return {
      banners: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        banners: React.PropTypes.arrayOf(React.PropTypes.shape({
          image: React.PropTypes.shape({
            pc: React.PropTypes.string.isRequired,
            sp: React.PropTypes.string.isRequired,
          }),
          url: React.PropTypes.string.isRequired,
          alt: React.PropTypes.string,
        })).isRequired,
      })).isRequired,
      sp: React.PropTypes.bool.isRequired,
    };
  }
  // // ---------------------------------------------------
  // //  CONSTRUCTOR
  // // ---------------------------------------------------
  // constructor(props) {
  //   super(props);
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * div.js-banners-root > {@link ComponentList}
   * @returns {XML} {@link ComponentList}
   */
  render() {
    // {Array.<ComponentList>} - 出力 component list
    const components = [];
    // props.banners から ComponentList を出力リストへ追加します
    this.props.banners.map((banners, index) => (
      components.push(
        <ComponentList
          key={`banners-${index}`}
          title={banners.title}
          banners={banners.banners}
          sp={this.props.sp}
          index={index}
        />
      )
    ));
    // ダミー親コンテナ + 出力リスト
    return (
      <div className="js-banners-root">
        {components}
      </div>
    );
  }
}
