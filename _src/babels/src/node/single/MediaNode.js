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


import {MediaType} from '../../app/const/MediaType';

import {MediaImageNode} from './MediaImageNode';
import {MediaVideoNode} from './MediaVideoNode';

// React
let React = self.React;

/**
 * <p>記事詳細 メインビジュアル<br>
 * 画像・動画 切替て表示します</p>
 *
 * <p>media_type で切り替えます</p>
 *
 * ```
 * <MediaNode/>
 *  <MediaImageNode />
 *  or
 *  <MediaVideoNode />
 * ```
 * @type {ReactClass}
 */
export let MediaNode = React.createClass( {
  propTypes: {
    articleId: React.PropTypes.string.isRequired,
    mediaType: React.PropTypes.string.isRequired,
    media: React.PropTypes.object.isRequired,
    // 2016-06-06 記事詳細で画像を表示するかどうか
    isShowImage: React.PropTypes.bool.isRequired,
    // 記事表示位置, -1: 記事詳細先頭
    // @since 2016-11-13
    index: React.PropTypes.number,
    // @since 2017-01-17
    complete: React.PropTypes.func
  },
  // @default -1
  // @since 2016-11-13
  getDefaultProps: function() {
    return {
      index: -1,
      complete: null,
    };
  },
  render: function() {

    let mediaType = this.props.mediaType;
    let media = this.props.media;

    // 2016-06-06
    // 記事詳細で画像を表示しない
    if ( !this.props.isShowImage ) {
      return null;
    }

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
          <MediaVideoNode
            articleId={this.props.articleId}
            media={media}
            index={this.props.index}
          />
        );
      }
    } else {
      // illegal
      return null;
    }
  }
} );
