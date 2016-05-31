/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/24 - 19:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {MediaType} from '../../../app/const/MediaType';

import {MediaImageNode} from '../../../node/single/MediaImageNode';
import {SPMediaVideoNode} from './SPMediaVideoNode';

// React
let React = self.React;

/**
 * SP 記事詳細 上部 メインビジュアル（画像・動画）
 * @type {ReactClass}
 */
export let SPMediaNode = React.createClass( {
  propTypes: {
    // response.id (記事 Id)
    articleId: React.PropTypes.string.isRequired,

    mediaType: React.PropTypes.string.isRequired,
    media: React.PropTypes.object.isRequired
  },
  render: function() {

    let mediaType = this.props.mediaType;
    let media = this.props.media;

    if ( mediaType === MediaType.IMAGE ) {
      // image type
      return (
        <MediaImageNode
          images={media.images}
        />
      );
    } else if ( mediaType === MediaType.VIDEO ) {
      // may be video
      if ( !media.video || ( !media.video.url && !media.video.youtube && !media.video.facebook ) ) {
        // not correct video, instead use images
        return (
          <MediaImageNode
            images={media.images}
          />
        );
      } else {
        // show video
        return (
          <SPMediaVideoNode
            articleId={this.props.articleId}
            media={media}
          />
        );
      }
    } else {
      // illegal
      return null;
    }
  }
} );
