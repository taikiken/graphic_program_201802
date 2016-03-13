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
'use strict';

// parent
import {ViewSingle} from '../../view/ViewSingle';

// view
import {View} from '../../view/View';

// dae
import {SingleDae} from '../../dae/SingleDae';

// sp
import {SPViewSingleHeader} from './single/SPViewSingleHeader';

export class SPViewSingle extends ViewSingle {
  constructor( id:number, element:Element, visualElement:Element, option:Object = {} ) {
    super( id, element, { related: null, footer: null }, option );
    this._visualElement = visualElement;

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

  }

  header( single:SingleDae ):void {
    let viewHeader;
    // header
    if ( this._header === null ) {

      viewHeader = new SPViewSingleHeader( this.element, single );
      viewHeader.on( View.DID_MOUNT, this._boundMount );
      this._header = viewHeader;
      viewHeader.start();

    } else {

      this._header.render( single );

    }
  }

  visual( single:SingleDae ):void {

  }
}
