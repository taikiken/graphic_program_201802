/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/13 - 22:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// MediaVideoNode
import { VideoType } from '../../app/const/VideoType';
import { Safety } from '../../data/Safety';
import { Empty } from '../../app/const/Empty';
import ComponentVideojsImaArticle from './ComponentVideojsImaArticle';
import ComponentVideojsImaSingles from './ComponentVideojsImaSingles';
import { Content } from '../../app/const/Content';
import { VideoDae } from '../../dae/media/VideoDae';
import { ImagesDae } from '../../dae/theme/ImagesDae';

/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事詳細 - main visual Video を出力します
 * @param {string} articleId 記事 ID
 * @param {VideoDae} video JSON video 情報
 * @param {ImagesDae} images JSON image 情報
 * @param {number} index 記事順序 -1 を先頭に表示します
 * @return {?XML} video component
 * @since 2018-01-13
 */
const ComponentMediaVideoSwitch = ({ articleId, video, images, index }) => {
  console.log('ComponentMediaVideoSwitch', articleId, images);
  // const video = media.video || {};
  const type = video.type || video.player;
  // 分岐
  switch (type) {
    case VideoType.BRIGHTCOVE:
    case VideoType.VIDEOJSIMA: {
      // const images = media.images;
      const caption = video.caption || '';
      const poster = Safety.image(images.medium, Empty.VIDEO_THUMBNAIL);
      if (index < 0) {
        return (
          <ComponentVideojsImaArticle
            articleId={articleId}
            video={video}
            poster={poster}
            caption={caption}
            playImage={Empty.VIDEO_PLAY}
            index={index}
          />
        );
      }
      // 次の記事一覧
      return (
        <ComponentVideojsImaSingles
          articleId={articleId}
          video={video}
          poster={poster}
          caption={caption}
          playImage={Empty.VIDEO_PLAY}
        />
      );
    }
    case VideoType.YOUTUBE: {
      return (
        <div className="post-kv">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtube}?rel=0&amp;showinfo=0&amp;wmode=transparent`}
            width={Content.WIDTH}
            height={Content.HD_HEIGHT}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    }
    case VideoType.FACEBOOK: {
      return (
        <div className="post-kv">
          <div
            className="fb-video"
            data-href={video.facebook}
            data-allowfullscreen="true"
            data-width={Content.WIDTH}
          />
        </div>
      );
    }
    default: {
      return null;
    }
  }
};

/**
 * React.propTypes
 * @type {{
 *   articleId: string,
 *   video: VideoDae,
 *   images: ImagesDae,
 *   index: number
 * }}
 */
ComponentMediaVideoSwitch.propTypes = {
  articleId: React.PropTypes.string.isRequired,
  video: React.PropTypes.instanceOf(VideoDae).isRequired,
  images: React.PropTypes.instanceOf(ImagesDae).isRequired,
  index: React.PropTypes.number.isRequired,
};

export default ComponentMediaVideoSwitch;
