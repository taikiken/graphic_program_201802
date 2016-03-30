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


import {Empty} from '../../app/const/Empty';
import {VideoType} from '../../app/const/VideoType';
import {Content} from '../../app/const/Content';
import {Safety} from '../../data/Safety';

// node
import {HTML5VideoNode} from '../media/HTML5VideoNode';

// React
let React = self.React;

/**
 * 記事詳細 メイン・動画切替
 * YouTube, Facebook
 * @type {ReactClass}
 */
export let MediaVideoNode = React.createClass( {
  propTypes: {
    media: React.PropTypes.object.isRequired
  },
  render: function() {

    let media = this.props.media;

    // 2016-02-22
    // api JSON が最新版に対応していないので
    // やむおえずの対応
    let type = media.video.type || media.video.player;

    switch ( type ) {

      case VideoType.BRIGHTCOVE:
        return this.video( media );

      case VideoType.YOUTUBE:
        return this.youtube( media );

      case VideoType.FACEBOOK:
        return this.facebook( media );

      default:
        // console.warn(`illegal type and player. type: ${type}`);
        break;

    }

  },
  video: function( media ) {

    let images = media.images;
    let video = media.video;
    let caption = video.caption || '';

    /*
    let poster = images.medium;
    if ( !poster ) {
      poster = Empty.VIDEO_THUMBNAIL;
    } else if (!Safety.isImg(poster)) {
      // 画像ファイル名に拡張子がないのがあったので
      // 拡張子チェックを追加
      if ( !Safety.isGraph( poster ) ) {
        poster = Empty.VIDEO_THUMBNAIL;
      }
    }
    */

    let poster = Safety.image( images.medium, Empty.VIDEO_THUMBNAIL );

    // HTML5 video
    return <HTML5VideoNode
      video={video}
      poster={poster}
      caption={caption}
      playImage={Empty.VIDEO_PLAY}
    />;

  },
  brightcove: function() {
    // ToDo: 2016-06-01 ~
  },
  youtube: function( media ) {
    let video = media.video;

    return (
      <div className="post-kv">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtube}?rel=0&amp;showinfo=0&amp;wmode=transparent`}
          width={Content.WIDTH}
          height={Content.HD_HEIGHT}
          frameBorder="0"
          allowFullScreen></iframe>
      </div>
    );
  },
  facebook: function( media ) {
    let video = media.video;

    return (
      <div className="post-kv">
        <div className="fb-video"
             data-href={video.facebook}
             data-allowfullscreen="true"
             data-width={Content.WIDTH}>
        </div>
      </div>
    );
  }
} );
