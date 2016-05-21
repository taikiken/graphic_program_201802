/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/21 - 17:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../data/Safety';
import {EventDispatcher} from '../event/EventDispatcher';

// brightcove videojs
const videojs = self.videojs;

/**
 * Brightcove 動画プレイヤー
 */
export class Brightcove extends EventDispatcher {
  constructor( accountId:string, playerId:string, elementId:string, path:string, poster:string, vast:string = '') {
    super();

    this._account = accountId;
    this._playerId = playerId;
    this._id = elementId;
    this._path = path;
    this._poster = poster;
    this._vast = Safety.string( vast, '' );
    this._video = null;
  }

  static get TYPE():string {
    return 'application/x-mpegURL';
  }
  get id():string {
    return this._id;
  }

  get path():string {
    return this._path;
  }
  get poster():string {
    return this._poster;
  }
  get vast():string {
    return this._vast;
  }
  set video( video ) {
    this._video = video;
  }
  get video() {
    return this._video;
  }


  create() {
    const video = videojs( this.id );
    const ima3 = {
      adTechOrder: [
        'html5'
      ],
      postrollTimeout: 2000,
      prerollTimeout: 1000,
      requestMode: 'onload',
      serverUrl: this.vast + Date.now(),
      timeout: 5000
    };

    video.ready( () => {
      video.src = this.path;
      video.poster = this.poster;
      video.ima3 = ima3;
    } );
  }


  dispose() {
    
  }
}
