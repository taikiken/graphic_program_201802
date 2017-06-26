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

import ComponentList from './stats/ComponentList';

const React = self.React;

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
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(props) {
    super(props);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  render() {
    return (
      this.props.map((banners, index) => (
        <ComponentList
          key={`banners-${index}`}
          top={banners.top}
          banners={banners.banners}
          sp={this.props.sp}
        />
      ))
    );
  }
}
