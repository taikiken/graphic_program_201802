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

// node
import { MediaVideoNode } from '../../node/single/MediaVideoNode';
// import { ImagesDae } from '../../dae/theme/ImagesDae';
// import { VideoDae } from '../../dae/media/VideoDae';

/**
 * [library] - React
 */
const React = self.React;

const ComponentMedia = ({
                          articleId,
                          mediaType,
                          // images,
                          // video,
                          media,
                          isShowImage,
                          single,
                          index,
                          sp,
                             }) => {
  console.log('ComponentMedia', articleId, isShowImage, mediaType, sp, single);
  // 2016-06-06
  // 記事詳細で画像を表示しない
  if (!isShowImage) {
    return null;
  }
  // @type {ImagesDae}
  const images = media.images;
  // @type {VideoDae}
  const video = media.video;
  // output
  switch (mediaType) {
    case MediaType.IMAGE: {
      // image type
      return (
        <ComponentMediaImage
          images={images}
          single={single}
          sp={sp}
        />
      );
    }
    case MediaType.VIDEO: {
      if (!video || (!video.url && !video.youtube && !video.facebook)) {
        // not correct video, instead use images
        return (
          <ComponentMediaImage
            images={images}
            single={single}
            sp={sp}
          />
        );
      }
      // show video
      return (
        <MediaVideoNode
          articleId={articleId}
          media={media}
          index={index}
          sp={sp}
        />
      );
    }
    default: {
      return null;
    }
  }
};

ComponentMedia.propTypes = {
  articleId: React.PropTypes.string.isRequired,
  mediaType: React.PropTypes.string.isRequired,
  media: React.PropTypes.object.isRequired,
  // 2016-06-06 記事詳細で画像を表示するかどうか
  isShowImage: React.PropTypes.bool.isRequired,
  // 記事表示位置, -1: 記事詳細先頭
  // @since 2016-11-13
  index: React.PropTypes.number.isRequired,
  sp: React.PropTypes.bool.isRequired,
  // images: React.PropTypes.instanceOf(ImagesDae).isRequired,
  // video: React.PropTypes.instanceOf(VideoDae).isRequired,
};

export default ComponentMedia;
