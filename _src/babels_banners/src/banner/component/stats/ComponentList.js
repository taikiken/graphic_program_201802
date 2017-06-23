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

export default class ComponentList extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
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
    const props = this.props;
    const sp = this.props.sp;
    return (
      <div className="stats-list-container">
        <h3 className="stats-title">{props.title}</h3>
        {
          props.banners.map(banner => (
            <div className="stats">
              <a href={banner.url} className="stats-link">
                <img src={sp ? banner.sp : banner.pc} alt="" className="stats-img"/>
              </a>
            </div>
          ))
        }
      </div>
    );
  }
}
