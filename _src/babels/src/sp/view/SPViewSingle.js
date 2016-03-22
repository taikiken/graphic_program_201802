/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 18:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import {ViewSingle} from '../../view/ViewSingle';

// view
import {View} from '../../view/View';

// dae
import {SingleDae} from '../../dae/SingleDae';

// sp
import {SPViewSingleHeader} from './single/SPViewSingleHeader';
import {SPViewSingleVisual} from './single/SPViewSingleVisual';

/**
 * SP 記事詳細
 */
export class SPViewSingle extends ViewSingle {
  /**
   * SP 記事詳細
   * @param {Number} id 記事 id
   * @param {Element} element 日付とかインサートする element
   * @param {Element} visualElement メインビジュアルよう element
   * @param {Object} [option={}] callback をセットした Object
   */
  constructor( id:Number, element:Element, visualElement:Element, option:Object = {} ) {
    super( id, element, { related: null, footer: null }, option );
    this._visualElement = visualElement;
    this._visual = null;
  }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render( response:Object ):void {
    let single = new SingleDae( response );

    // beforeRender call
    this.executeSafely( View.BEFORE_RENDER, single );

    this.header( single );
    this.visual( single );

  }
  /**
   * header 部レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  header( single:SingleDae ):void {
    // header
    if ( this._header === null ) {

      let viewHeader = new SPViewSingleHeader( this.element, single );
      viewHeader.on( View.DID_MOUNT, this._boundMount );
      this._header = viewHeader;
      viewHeader.start();

    } else {

      this._header.render( single );

    }
  }
  /**
   * visual 部レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  visual( single:SingleDae ):void {
    // visual
    if ( this._visual === null ) {
      let visualNode = new SPViewSingleVisual( this._visualElement, single );
      this._visual = visualNode;
      visualNode.start();
    } else {
      this._visual.render( single );
    }
  }
}
