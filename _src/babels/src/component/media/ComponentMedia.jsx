/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/12 - 20:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// MediaNode
// React
import { MediaType } from '../../app/const/MediaType';
import ComponentMediaImage from './ComponentMediaImage';

/**
 * [library] - React
 */
const React = self.React;

const ComponentMedia = ({
                               articleId,
                               mediaType,
                               media,
                               isShowImage,
                               single,
                               index,
                             }) => {
  // 2016-06-06
  // 記事詳細で画像を表示しない
  if (!isShowImage) {
    return null;
  }
  // output
  switch (mediaType) {
    case MediaType.IMAGE: {
      // image type
      return (
        <ComponentMediaImage
          images={media.images}
          single={single}
        />
      );
    }
    case MediaType.VIDEO: {
      if (!media.video || (!media.video.url && !media.video.youtube && !media.video.facebook)) {
        // not correct video, instead use images
        return (
          <ComponentMediaImage
            images={media.images}
            single={single}
          />
        );
      }
      // show video
      return (
        <MediaVideoNode
          articleId={articleId}
          media={media}
          index={index}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default ComponentMediaImage;
