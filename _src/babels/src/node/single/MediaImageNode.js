/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/24 - 19:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from '../../data/Safety';
import { SingleDae } from '../../dae/SingleDae';

// React
let React = self.React;

/**
 * @deprecated 2018-01-12 instead use {@link ComponentMediaImage}
 * <p>記事詳細 メイン・画像</p>
 * <p>original から large と medium と順に探していく</p>
 *
 * @type {ReactClass}
 */
export let MediaImageNode = React.createClass( {
  propTypes: {
    images: React.PropTypes.object.isRequired,
    // 2018-01-12 - 平昌: タグで powered by 出す必要があるので追加する
    single: React.PropTypes.instanceOf(SingleDae).isRequired,
  },
  render: function() {
    let images = this.props.images;

    // 約束が違う
    // 画像がない記事の時にセットされているのは
    // large と medium と thumbnail らしい
    // original から large と medium と順に探していく

    // 1. original
    let original = Safety.image( images.original, '' );

    // 2. large
    if ( original === '' ) {
      original = Safety.image( images.large, '' );
    }

    // 3. medium
    if ( original === '' ) {
      original = Safety.image( images.medium, '' );
    }

    if ( original === '' ) {
      // no image or no correct image extension
      return null;
    }

    let caption = Safety.string( images.caption, '' );
    let figCaption = '';
    if ( caption !== '' ) {
      figCaption = <figcaption className="caption" dangerouslySetInnerHTML={{__html: caption}} />;
    }

    return (
      <div className="post-kv">
        <figure className="post-single-figure">
          <img
            src={original}
            alt=""
            className="post-single-image"
          />
          {figCaption}
        </figure>
      </div>
    );
  }
} );
