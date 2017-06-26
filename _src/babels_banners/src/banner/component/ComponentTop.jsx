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

const React = self.React;


export default class ComponentTop extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON: topBanners {{Array.<object>}}
   * ```
   * [
   *    {
   *       "image": {
   *         "pc": "PCバナー画像URL",
   *         "sp": "PCバナー画像URL"
   *       },
   *       "url": "リンクURL"
   *     },
   * ]
   * ```
   * @returns {{banners: *}} PropTypes を返します
   */
  static get propTypes() {
    return {
      // JSON: topBanners {{Array.<object>}}
      banners: React.PropTypes.arrayOf(React.PropTypes.shape({
        image: React.PropTypes.shape({
          pc: React.PropTypes.string.isRequired,
          sp: React.PropTypes.string.isRequired,
        }),
        url: React.PropTypes.string.isRequired,
        alt: React.PropTypes.string,
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
    const sp = this.props.sp;
    return (
      <ul className="stats_banner-list">
        {
          this.props.banners.map((banner, index) => (
            <li className="stats_banner-item" key={`banners-top-${index}`}>
              <a href={banner.url} className="banner-link">
                <img src={sp ? banner.image.sp : banner.image.pc} alt={banner.alt ? banner.alt : ''} className="banner-img"/>
              </a>
            </li>
          ))
        }
      </ul>
    );
  }
}
