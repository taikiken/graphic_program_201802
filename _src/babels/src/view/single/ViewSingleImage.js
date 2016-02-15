/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 18:59
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
import {Safety} from '../../data/Safety';

import {ImagesDae} from '../../dae/media/ImagesDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 記事詳細上部画像
 */
export class ViewSingleImage extends View {
  /**
   * 記事詳細上部画像
   * @param {Element} element root element
   * @param {ImagesDae} images response.media.images
   */
  constructor( element:Element, images:ImagesDae ) {
    super( element );
    this._images = images;
    this._rendered = null;
  }
  /**
   * render 処理を開始します
   */
  start():void {
    this.render( this._images );
  }
  /**
   * 記事詳細上部画像
   * @param {ImagesDae} images response.media.images
   */
  render( images:ImagesDae ):void {

    // JSON data に不備あり, on 2016-02-10
    // 一時コメントにする
    // ToDo: JSON が正しくなったらコメント解除
    /*
    if ( !images.original ) {
      return;
    }
    */

    console.log( 'ViewImages ', images );

    // -------------------------------------------------
    // 画像があった

    let element = this.element;

    // --------------------------------------------
    // image dom
    let ImageDom = React.createClass( {
      propTypes: {
        image: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        return {
          image: this.props.image
        };
      },
      render: function() {

        let image = this.state.image;
        let caption = image.caption;
        let tag = '';
        let original = images.original || images.medium;

        if ( !original ) {
          // no image
          return null;
        }
        if (!Safety.isImg(original)) {
          // no correct image extension
          return null;
        }

        if ( !!caption ) {

          tag = <figcaption className="caption" dangerouslySetInnerHTML={{__html: caption}} />;

        }

        return (
          <div className="post-kv">
            <figure>
              <img src={original} alt=""/>
              {tag}
            </figure>
          </div>
        );
      },
      updateImage: function( image ) {
        this.setState( { image: image } );
      }
    } );

    // 画像 dom 生成
    if ( this._rendered === null ) {

      this._rendered = ReactDOM.render(
        React.createElement( ImageDom, { image: images } ),
        element
      );

    } else {

      this._rendered.updateImage( images );

    }

  }
}
