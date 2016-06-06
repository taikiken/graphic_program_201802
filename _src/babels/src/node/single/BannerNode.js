/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/13 - 18:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// data
import {Safety} from '../../data/Safety';

// React
let React = self.React;

/**
 * 記事詳細 user banner
 * @type {*|Function|ReactClass}
 */
export let BannerNode = React.createClass( {
  propTypes: {
    banner: React.PropTypes.object.isRequired,
    pc: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      pc: true
    };
  },
  render: function() {
    let banner = this.props.banner;
    // console.log( 'banner ', banner );
    if ( typeof banner.text === 'undefined' || typeof banner.image === 'undefined' || typeof banner.link === 'undefined' ) {
      return null;
    }

    if ( !Safety.isImg( banner.image ) ) {
      // not image
      return null;
    }

    if ( banner.link === '' || banner.link === null ) {
      // illegal link
      return null;
    }
    // pc の時のみ w728
    return (
      <div className={`sponsor-link editor-bnr${this.props.pc ? ' w728' : ''}`}>
        <a href={banner.link} target="_blank"><img src={banner.image} alt={banner.text}/></a>
      </div>
    );

  }
} );
