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

// ga
import {Ga} from '../../ga/Ga';

// React
let React = self.React;

/**
 * <p>記事詳細 user banner<br>
 * 記事本文とタグの間</p>
 *
 * ```
 * <div data-reactroot="" class="post-footer">
 *  <div class="sponsor-link editor-bnr">
 *    <a href=""><img src=""></a>
 *  </div>
 *  <div class="post-tags">
 *    <h2 class="post-tags-heading">TAGS</h2>
 *    <ul class="post-tags-list">
 *      <li class="post-tags-item"><a href="/search/アマ野球">アマ野球</a></li>
 *    </ul>
 *  </div>
 * </div>
 * ```
 *
 * @type {*|Function|ReactClass}
 */
export let BannerNode = React.createClass( {
  propTypes: {
    banner: React.PropTypes.object.isRequired,
    pc: React.PropTypes.bool
  },
  getDefaultProps: function() {
    /**
     * banner link
     * @since 2016-06-22
     * @protected
     * @type {string}
     */
    this.link = '';

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

    // if ( banner.link === '' || banner.link === null ) {
    //   // illegal link
    //   return null;
    // }

    let link = Safety.string( banner.link, '' );
    if ( link === '' ) {
      return null;
    }

    this.link = link;
    // pc の時のみ w728
    return (
      <div className={`sponsor-link editor-bnr${this.props.pc ? ' w728' : ''}`}>
        <a href={link} target="_blank" onClick={this.bannerClick}><img src={banner.image} alt={banner.text}/></a>
      </div>
    );

  },
  // @since 2016-06-22
  // GA / CRAZY系コンテンツ用トラッキングを追加 - バナー & 動画 / Web版 #842
  bannerClick: function() {
    // ----------------------------------------------
    // GA 計測タグ
    // 記事一覧のバナーリンク
    Ga.click( 'BannerNode.bannerClick', 'banner_link', 'click', this.link, true );
    // ----------------------------------------------
  }
} );
