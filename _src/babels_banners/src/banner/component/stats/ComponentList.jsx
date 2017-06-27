/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 21:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const React = self.React;

/**
 * `/stats/` - バナー一覧 1 カテゴリ分を出力します
 */
export default class ComponentList extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON: bannerLists {{Array.<object>}}
   * ```
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
   * ```
   * @returns {{title: *, banners: *, sp: *}} PropTypes を返します
   */
  static get propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
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
      index: React.PropTypes.number.isRequired,
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
   * section.stats_banners__category > ul > li
   * @returns {XML} section.stats_banners__category > ul > li
   */
  render() {
    const props = this.props;
    const sp = this.props.sp;
    return (
      <section className="stats_banners__category">
        <h2 className="stats_banners__category__heading">{props.title}</h2>
        <ul className="stats_banners__category__list">
          {
            props.banners.map((banner, index) => (
              <li className="stats_banners__category__item" key={`banners-stats-${props.index}-${index}`}>
                <a href={banner.url} className="stats-link">
                  <img src={sp ? banner.image.sp : banner.image.pc} alt={banner.alt ? banner.alt : ''} className="banner-img"/>
                </a>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
}
