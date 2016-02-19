/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 19:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view
import {View} from '../View';
import {Empty} from '../../app/const/Empty';
import {Safety} from '../../data/Safety';

import {MediaDae} from '../../dae/MediaDae';

// node
import {VideoNode} from '../../node/media/VideoNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 記事詳細上部動画
 */
export class ViewSingleVideo extends View {
  /**
   * 記事詳細上部動画
   * @param {Element} element root element
   * @param {MediaDae} media response.media
   */
  constructor( element:Element, media:MediaDae ) {
    super( element );
    this._media = media;
    this._rendered = null;
  }
  /**
   * render 処理を開始します
   */
  start():void {
    this.render( this._media );
  }
  /**
   * 記事詳細上部動画を生成します
   * @param {MediaDae} mediaDae response.media
   */
  render( mediaDae:MediaDae ) {

    // データチェック
    if ( !mediaDae.video || (!mediaDae.video.url && !mediaDae.video.youtube) ) {
      return;
    }

    // -------------------------------------------------
    // 画像と動画あった
    let element = this.element;

    // --------------------------------------------
    // video dom

    let VideoDom = React.createClass( {
      propTypes: {
        media: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        return {
          media: this.props.media
        };
      },
      render: function() {

        let media = this.state.media;
        let yt = media.video.youtube;

        if ( typeof yt !== 'undefined' && yt !== '' && yt.length > 10 ) {

          // youtube id found
          return this.youtube( media );

        } else {

          // HTML5 video tag
          return this.video( media );

        }

      },
      // video
      video: function( media:MediaDae ) {

        let video = media.video;
        let images = media.images;
        let poster = images.medium;
        let caption = video.caption || '';

        if ( !poster ) {
          poster = Empty.VIDEO_THUMBNAIL;
        } else if (!Safety.isImg(poster)) {
          poster = Empty.VIDEO_THUMBNAIL;
        }

        return <VideoNode
          video={video}
          poster={poster}
          caption={caption}
          playImage={Empty.VIDEO_PLAY}
        />;

      },
      // youtube
      youtube: function( media:MediaDae ) {
        // <iframe width="640" height="360" src="https://www.youtube.com/embed/Ro-_cbfdrYE?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
        let video = media.video;

        return (
          <div className="post-kv">
            <iframe src={`https://www.youtube.com/embed/${video.youtube}?rel=0&amp;showinfo=0`} width="710" height="400" frameBorder="0" allowFullScreen></iframe>
          </div>
        );
      },
      updateImage: function( media ) {
        this.setState( { media: media } );
      }
    } );

    // video dom 生成
    if ( this._rendered === null ) {

      this._rendered = ReactDOM.render(
        React.createElement( VideoDom, { media: mediaDae } ),
        element
      );

    } else {

      this._rendered.updateImage( mediaDae );

    }

  }
}
