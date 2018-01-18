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
// import {VideojsImaNode} from '../media/VideojsImaNode';

// ---
// @since 2016-11-13
// component
import ComponentVideojsImaSingles from '../../component/media/ComponentVideojsImaSingles';
import { ComponentVideojsImaArticle } from '../../component/media/ComponentVideojsImaArticle';
// ---

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事詳細 メイン・動画切替
 * - YouTube
 * - Facebook
 *
 * [component]
 * - {@link HTML5VideoNode}
 * - {@link VideojsImaNode} -> {@link ComponentVideojsImaArticle}
 * - `<iframe youtube />`
 * - `<div class="fb-video" />`
 * @type {ReactClass}
 */
export let MediaVideoNode = React.createClass( {
  propTypes: {
    articleId: React.PropTypes.string.isRequired,
    media: React.PropTypes.object.isRequired,
    // 記事表示順, -1: 記事詳細先頭
    // @since 2016-11-13
    index: React.PropTypes.number.isRequired
  },
  render: function() {
    const media = this.props.media;
    // 2016-02-22
    // api JSON が最新版に対応していないので
    // やむおえずの対応
    const type = media.video.type || media.video.player;

    switch (type) {

      case VideoType.BRIGHTCOVE:
        // return this.video( media );
        return this.videojsima(media);

      case VideoType.VIDEOJSIMA:
        return this.videojsima(media);

      case VideoType.YOUTUBE:
        return this.youtube(media);

      case VideoType.FACEBOOK:
        return this.facebook(media);

      default:
        // console.warn(`illegal type and player. type: ${type}`);
        // break;
        return null;
    }
  },
  video: function(media) {
    const images = media.images;
    const video = media.video;
    const caption = video.caption || '';
    const poster = Safety.image(images.medium, Empty.VIDEO_THUMBNAIL);

    // HTML5 video
    return (
      <HTML5VideoNode
        video={video}
        poster={poster}
        caption={caption}
        playImage={Empty.VIDEO_PLAY}
      />
    );

  },
  videojsima: function( media ) {
    const images = media.images;
    const video = media.video;
    const caption = video.caption || '';
    const poster = Safety.image(images.medium, Empty.VIDEO_THUMBNAIL);

    // props.index で出力 class を切替えます
    // 次の記事一覧で動画を表示するために
    // @since 2016-11-13
    if (this.props.index < 0) {
      // 記事詳細先頭
      /*
      return (
        <VideojsImaNode
          articleId={this.props.articleId}
          video={video}
          poster={poster}
          caption={caption}
          playImage={Empty.VIDEO_PLAY}
        />
      );
      */
      // @since 2016-11-15 出力クラスを変更
      return (
        <ComponentVideojsImaArticle
          articleId={this.props.articleId}
          video={video}
          poster={poster}
          caption={caption}
          playImage={Empty.VIDEO_PLAY}
          index={this.props.index}
        />
      );
    }
    // 次の記事一覧
    return (
      <ComponentVideojsImaSingles
        articleId={this.props.articleId}
        video={video}
        poster={poster}
        caption={caption}
        playImage={Empty.VIDEO_PLAY}
      />
    );
  },
  youtube: function( media ) {
    const video = media.video;

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
  },
  facebook: function( media ) {
    const video = media.video;

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
} );
