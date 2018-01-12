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
import { SingleDae } from '../../dae/SingleDae';

// React
/**
 * [library] - React
 * @type {*}
 */
const React = self.React;

/**
 * 記事詳細 メインビジュアル
 * - 画像・動画 切替て表示します
 * - media_type で切り替えます
 *
 * - {@link MediaNode}
 *   - {@link MediaImageNode} or {@link MediaVideoNode}
 * @type {ReactClass}
 */
export let MediaNode = React.createClass( {
  propTypes: {
    articleId: React.PropTypes.string.isRequired,
    mediaType: React.PropTypes.string.isRequired,
    media: React.PropTypes.object.isRequired,
    // 2016-06-06 記事詳細で画像を表示するかどうか
    isShowImage: React.PropTypes.bool.isRequired,
    // 2018-01-12 - 平昌: タグで powered by 出す必要があるので追加する
    single: React.PropTypes.instanceOf(SingleDae).isRequired,
    // 記事表示位置, -1: 記事詳細先頭
    // @since 2016-11-13
    index: React.PropTypes.number
  },
  render: function() {
    const { mediaType, media, isShowImage, articleId, index, single } = this.props;

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
          single={single}
        />
      );
    } else if (mediaType === MediaType.VIDEO) {
      // may be video
      if (!media.video || (!media.video.url && !media.video.youtube && !media.video.facebook)) {
        // not correct video, instead use images
        return (
          <MediaImageNode
            images={media.images}
            single={single}
          />
        );
      } else {
        // show video
        return (
          <MediaVideoNode
            articleId={articleId}
            media={media}
            index={index}
          />
        );
      }
    }
    // else {
    //   // illegal
    //   return null;
    // }
    return null;
  }
} );
