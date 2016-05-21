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
  constructor( elementId:string, path:string, poster:string, vast:string = '') {
    super();

    this._id = elementId;
    this._path = path;
    this._poster = poster;
    this._vast = Safety.string( vast, '' );
    this._player = null;
  }

  static get TYPE():string {
    return 'application/x-mpegURL';
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
  set player( player ) {
    this._player = player;
  }
  get player() {
    return this._player;
  }

  init() {
    const player = videojs( this.id );
    this.player = player;

    const vast = this.vast;

    let ima3 = {
      adTechOrder: [
        'html5'
      ],
      postrollTimeout: 2000,
      prerollTimeout: 1000,
      requestMode: 'onload',
      timeout: 5000
    };

    if ( vast !== '' ) {
      ima3.serverUrl = this.vast + Date.now();
    }

    player.ready( () => {
      player.src = this.path;
      player.poster = this.poster;
      player.ima3 = ima3;
    } );

    player.on( 'adstart', this.adStart.bind( this ) );
  }

  videoElement():Element {
    let children = this.player.el();
    let element;

    for( let i = 0, limit = children.length; i < limit; i++ ) {
      let child = children[ i ];
      if ( child.nodeName.toLowerCase() === 'video' ) {
        element = child;
        break;
      }
    }

    return element;
  }

  onPlay( event:Object ):void {

  }
  onEnd( event:Object ):void {

  }
  onPause( event:Object ):void {

  }
  adStart( event:Object ):void {
    const player = this.player;

    player.controls( false );
    player.on( 'adend', this.adEnd.bind( this ) );
  }
  adEnd( event:Object ):void {
    const player = this.player;

    player.controls( true );
    player.on( 'play', this.onPlay.bind( this ) );
    player.on( 'ended', this.onEnd.bind( this ) );
    player.on( 'pause', this.onPause.bind( this ) );
  }


  dispose() {
    
  }
}
