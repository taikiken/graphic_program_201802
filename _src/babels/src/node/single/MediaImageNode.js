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
'use strict';

import {Safety} from '../../data/Safety';

// React
let React = self.React;

/**
 * 記事詳細 メイン・画像
 * @type {ReactClass}
 */
export let MediaImageNode = React.createClass( {
  propTypes: {
    images: React.PropTypes.object.isRequired
  },
  render: function() {

    let images = this.props.images;

    // 約束が違う
    // 画像がない記事の時にセットされているのは
    // large と medium と thumbnail らしい
    // original から順に探していく
    let original = images.original;

    if ( !original ) {
      original = images.large;
    } else if ( !Safety.isImg( original ) ) {
      original = '';
    }

    if ( !original ) {
      original = images.medium;
    } else if ( !Safety.isImg( original ) ) {
      original = '';
    }

    if ( !original || !Safety.isImg( original ) ) {
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
          <img src={original} alt="" className="post-single-image"/>
          {figCaption}
        </figure>
      </div>
    );

  }
} );
