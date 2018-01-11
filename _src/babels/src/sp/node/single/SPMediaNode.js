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
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP 記事詳細 上部 メインビジュアル（画像・動画）
 * @type {ReactClass}
 */
export const SPMediaNode = React.createClass( {
  propTypes: {
    // response.id (記事 Id)
    articleId: React.PropTypes.string.isRequired,
    mediaType: React.PropTypes.string.isRequired,
    media: React.PropTypes.object.isRequired,
    // 2016-06-06 記事詳細で画像を表示するかどうか
    isShowImage: React.PropTypes.bool.isRequired,
    // 記事表示位置, -1: 記事詳細先頭
    // @since 2016-11-13
    index: React.PropTypes.number
  },
  // @default -1
  // @since 2016-11-13
  getDefaultProps: function() {
    return {
      index: -1
    };
  },
  render: function() {
    // let mediaType = this.props.mediaType;
    // let media = this.props.media;
    const { mediaType, media, isShowImage, articleId, index } = this.props;

    // 2016-06-06
    // 記事詳細で画像を表示しない
    if (!isShowImage) {
      return null;
    }
    if (mediaType === MediaType.IMAGE) {
      // image type
      return (
        <MediaImageNode
          images={media.images}
        />
      );
    } else if (mediaType === MediaType.VIDEO) {
      // may be video
      if (!media.video || (!media.video.url && !media.video.youtube && !media.video.facebook)) {
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
            articleId={articleId}
            media={media}
            index={index}
          />
        );
      }
    } else {
      // illegal
      return null;
    }
  }
} );
